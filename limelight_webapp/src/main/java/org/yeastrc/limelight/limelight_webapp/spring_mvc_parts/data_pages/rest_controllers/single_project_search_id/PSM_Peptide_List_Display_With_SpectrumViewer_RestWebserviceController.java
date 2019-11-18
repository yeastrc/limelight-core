/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.single_project_search_id;


import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.dto.PsmDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDynamicModificationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SrchRepPeptDynamicModDTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.dao.PsmDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ReportedPeptideDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dto_lorikeet.LorikeetVariableMod;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.objects.AnnotationDataItem_ForPage;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.Psm_DescriptiveAnnotationData_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.Psm_FilterableAnnotationData_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PeptideStringForSearchIdReportedPeptideIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmDynamicModification_For_PsmId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmsWithSameScanNumberScanFilenameIdSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ReporterIonMasses_PsmLevel_ForPsmIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchHasScanDataForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SrchRepPept_DynamicMod_For_SearchIdReportedPeptideId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ReporterIonMasses_PsmLevel_ForPsmIds_Searcher.ReporterIonMasses_PsmLevel_ForPsmIds_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmsForScanNumberScanFilenameIdSearchId_Result;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_response_parts.PSM_Peptide_List_Display_With_SpectrumViewer_Item;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * PSMs and Peptides for a PSM Id (And Project Search Id for Auth)
 * 
 * Result contains everything needed by the spectrum viewer Lorikeet outside of the scan spectrum
 * 
 * These will be displayed below the spectrum viewer Lorikeet and the user will be able to switch between them.
 * 
 *             Need to validate Project Search ID values in URL with values in POST JSON
 *
 *
 * !!!!!!!!!!!   WARNING:  Many changes to this would also require changes to 
 * 								Spectrum_For_Lorikeet_For_PSM_Id_RestWebserviceController
 * 								since that data is used for initial Lorikeet display. 
*/
@RestController
public class PSM_Peptide_List_Display_With_SpectrumViewer_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( PSM_Peptide_List_Display_With_SpectrumViewer_RestWebserviceController.class );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private PsmDAO_IF psmDAO;
	
	@Autowired
	private PeptideStringForSearchIdReportedPeptideIdSearcherIF peptideStringForSearchIdReportedPeptideIdSearcher;
	
	@Autowired
	private ReportedPeptideDAO_IF reportedPeptideDAO;
	
	@Autowired
	private SearchHasScanDataForSearchIdSearcherIF searchHasScanDataForSearchIdSearcher;
	
	@Autowired
	private PsmsWithSameScanNumberScanFilenameIdSearchIdSearcherIF psmsWithSameScanNumberScanFilenameIdSearchIdSearcher;

	@Autowired
	private PsmDynamicModification_For_PsmId_SearcherIF psmDynamicModification_For_PsmId_Searcher;

	@Autowired
	private ReporterIonMasses_PsmLevel_ForPsmIdSearcherIF reporterIonMasses_PsmLevel_ForPsmIds_Searcher;
	
	@Autowired
	private SrchRepPept_DynamicMod_For_SearchIdReportedPeptideId_SearcherIF srchRepPept_DynamicMod_For_SearchIdReportedPeptideId_Searcher;
	
	@Autowired
	private Psm_FilterableAnnotationData_SearcherIF psm_FilterableAnnotationData_Searcher;
	
	@Autowired
	private Psm_DescriptiveAnnotationData_SearcherIF psm_DescriptiveAnnotationData_Searcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public PSM_Peptide_List_Display_With_SpectrumViewer_RestWebserviceController() {
		super();
//		log.warn( "constructor no params called" );
	}
	
	//  Convert result object graph to JSON in byte[] in the controller body so can cache it

	//  These 2 annotations work the same
	
	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.PSM_PEPTIDE_LIST_DISPLAY_WITH_SPECTRUM_VIEWER_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  psmList(

    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    	try {
//    		log.warn( "peptideView(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs
    		
    		if ( postBody == null || postBody.length == 0 ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );
    		
    		List<Integer> psmAnnotationTypeIdsForSorting = webserviceRequest.getPsmAnnotationTypeIdsForSorting();
    				
    		Long psmIdFromWebserviceRequest = webserviceRequest.getPsmId();
    		
    		if ( psmIdFromWebserviceRequest == null ) {
    			String msg = "psm id is empty.";
    			log.warn(msg);
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		

    		Integer projectSearchId = webserviceRequest.getProjectSearchId();

    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		List<Integer> projectSearchIdsForValidate = new ArrayList<>( 1 );
    		projectSearchIdsForValidate.add( projectSearchId );

    		////////////////
    		
    		//  AUTH - validate access
    		
    		//  throws an exception if access is not valid that is turned into a webservice response by Spring
    		
    		//  Comment out result since not use it
//    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    		validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIdsForValidate, httpServletRequest );
    		
    		////////////////
   		
    		
    		Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
			if ( searchId == null ) {
				String msg = "No searchId for projectSearchId: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
						

			PsmDTO psmDTOForInitialPsmId = psmDAO.getById( psmIdFromWebserviceRequest );
			if ( psmDTOForInitialPsmId == null ) {
				String msg = "No psmDTOForInitialPsmId for psmId: " + psmIdFromWebserviceRequest;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			//  Validate that searchId is on psm_tbl record for psmId
			if ( psmDTOForInitialPsmId.getSearchId() != searchId ) {
				String msg = "psmDTO.getSearchId() != searchId. psmId: " + psmIdFromWebserviceRequest + ", searchId: " + searchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			if ( psmDTOForInitialPsmId.getSearchScanFileId() == null ) {
				String msg = "psmDTO.getSearchScanFileId() == null (no value). psmId: " + psmIdFromWebserviceRequest + ", searchId: " + searchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			Boolean searchHasScanData = searchHasScanDataForSearchIdSearcher.getSearchHasScanDataForSearchId( searchId );
			if ( searchHasScanData == null ) {
				String msg = "No searchHasScanData for searchId: " + searchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

    		if ( ! searchHasScanData ) {
				String msg = "searchHasScanData is false for searchId: " + searchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		
			//  PSM Annotation data for Ann Type Display
			
			Set<Integer> annTypeIdsToRetrieve = new HashSet<>();
			
			annTypeIdsToRetrieve.addAll( webserviceRequest.getPsmAnnTypeDisplay() );
			if ( psmAnnotationTypeIdsForSorting != null ) {
				annTypeIdsToRetrieve.addAll( psmAnnotationTypeIdsForSorting );
			}
			
			//  Get all PSMs for this PSM Id with same scan number and scan filename id
			
			List<PsmsForScanNumberScanFilenameIdSearchId_Result> psmsFromDBList = 
					psmsWithSameScanNumberScanFilenameIdSearchIdSearcher
					.getPsmsWithSameScanNumberScanFilenameIdSearchId( psmIdFromWebserviceRequest );
			
    		List<PSM_Peptide_List_Display_With_SpectrumViewer_Item> resultList = new ArrayList<>( psmsFromDBList.size() );
    		
    		for ( PsmsForScanNumberScanFilenameIdSearchId_Result psmFromDBItem : psmsFromDBList ) {
    			
    			final long psmIdForDbItem = psmFromDBItem.getPsmId(); 
    			final int reportedPeptideId = psmFromDBItem.getReportedPeptideId();
    			
    			PSM_Peptide_List_Display_With_SpectrumViewer_Item result = new PSM_Peptide_List_Display_With_SpectrumViewer_Item();
    			
    			result.setPsmId( psmFromDBItem.getPsmId() );
    			result.setCharge( psmFromDBItem.getCharge() );
    			
    			result.setPsm_precursor_RetentionTime( psmFromDBItem.getPrecursor_RetentionTime() );
    			result.setPsm_precursor_MZ( psmFromDBItem.getPrecursor_MZ() );
    			
    			result.setScanNumber( psmFromDBItem.getScanNumber() );

    			PsmDTO psmDTOForFoundPsmId = psmDAO.getById( psmIdForDbItem );
    			if ( psmDTOForFoundPsmId == null ) {
    				String msg = "No psmDTOForFoundPsmId for psmId: " + psmIdForDbItem;
    				log.warn( msg );
        			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}
    			
    			result.setHasReporterIons( psmDTOForFoundPsmId.isHasReporterIons() );
    			
    			ReportedPeptideDTO reportedPeptideDTO = reportedPeptideDAO.getForId( reportedPeptideId );
    			if ( reportedPeptideDTO == null ) {
    				String msg = "Unable to find reportedPeptideDTO for reportedPeptideId = " + reportedPeptideId;
    				log.error( msg );
    			    throw new LimelightInternalErrorException( msg );
    			}
    			result.setReportedPeptideString( reportedPeptideDTO.getSequence() );
    			
    			String peptideSequence = 
    					peptideStringForSearchIdReportedPeptideIdSearcher
    					.getPeptideSequenceStringForSearchIdReportedPeptideId( searchId, reportedPeptideId );
    			if ( peptideSequence == null ) {
    				String msg = "Unable to find peptide string for searchId: " + searchId
    						+ ", reportedPeptideId = " + reportedPeptideId;
    				log.error( msg );
    			    throw new LimelightInternalErrorException( msg );
    			}
    			result.setPeptideSequence( peptideSequence );

    	        // Variable Mods, N and C terminus Mods
    			
    			List<LorikeetVariableMod> variableMods = null;

    			double ntermMod = 0; // additional mass to be added to the n-term
    			double ctermMod = 0; // additional mass to be added to the c-term
    			
    			if ( psmDTOForFoundPsmId.isHasModifications() ) {
    				
    				//  Use Dynamic Mod records at PSM level

    				List<PsmDynamicModificationDTO> srchRepPeptDynamicModDTOList = 
    						psmDynamicModification_For_PsmId_Searcher
    						.getPsmDynamicModification_For_PsmId( psmIdForDbItem );

    				variableMods = new ArrayList<>( srchRepPeptDynamicModDTOList.size() );
    				
    				for ( PsmDynamicModificationDTO psmDynamicModificationDTO : srchRepPeptDynamicModDTOList ) {
    				
    					if ( psmDynamicModificationDTO.isIs_N_Terminal() && psmDynamicModificationDTO.isIs_C_Terminal() ) {
    						String msg = "psmDynamicModificationDTO has both Is_N_Terminal and Is_C_Terminal true. id: " + psmDynamicModificationDTO.getId();
    						log.error( msg );
    						throw new LimelightInternalErrorException(msg);
    					}
    					if ( psmDynamicModificationDTO.isIs_N_Terminal() ) {
    						ntermMod += psmDynamicModificationDTO.getMass();
    					} else if ( psmDynamicModificationDTO.isIs_C_Terminal() ) {
    						ctermMod += psmDynamicModificationDTO.getMass();
    					} else {
	    					int dynamicModPosition = psmDynamicModificationDTO.getPosition();
	    					String aminoAcid = peptideSequence.substring( dynamicModPosition - 1 /* chg to zero based */, dynamicModPosition );
	    					LorikeetVariableMod lorikeetVariableMod = new LorikeetVariableMod();
	    					lorikeetVariableMod.setIndex( psmDynamicModificationDTO.getPosition() );
	    					lorikeetVariableMod.setModMass( psmDynamicModificationDTO.getMass() );
	    					lorikeetVariableMod.setAminoAcid( aminoAcid );
	    					variableMods.add( lorikeetVariableMod );
    					}
    				}
    				
    			} else {

    				//  Use Dynamic Mod records at Reported Peptide level

    				List<SrchRepPeptDynamicModDTO> srchRepPeptDynamicModDTOList = 
    						srchRepPept_DynamicMod_For_SearchIdReportedPeptideId_Searcher
    						.getSrchRepPept_DynamicMod_For_SearchIdReportedPeptideId( searchId, reportedPeptideId );

    				variableMods = new ArrayList<>( srchRepPeptDynamicModDTOList.size() );
    				
    				for ( SrchRepPeptDynamicModDTO srchRepPeptDynamicModDTO : srchRepPeptDynamicModDTOList ) {
    					
    					if ( srchRepPeptDynamicModDTO.isIs_N_Terminal() && srchRepPeptDynamicModDTO.isIs_C_Terminal() ) {
    						String msg = "SrchRepPeptDynamicModDTO has both Is_N_Terminal and Is_C_Terminal true. id: " + srchRepPeptDynamicModDTO.getId();
    						log.error( msg );
    						throw new LimelightInternalErrorException(msg);
    					}
    					if ( srchRepPeptDynamicModDTO.isIs_N_Terminal() ) {
    						ntermMod += srchRepPeptDynamicModDTO.getMass();
    					} else if ( srchRepPeptDynamicModDTO.isIs_C_Terminal() ) {
    						ctermMod += srchRepPeptDynamicModDTO.getMass();
    					} else {
	    					int dynamicModPosition = srchRepPeptDynamicModDTO.getPosition();
	    					String aminoAcid = peptideSequence.substring( dynamicModPosition - 1 /* chg to zero based */, dynamicModPosition );
	    					LorikeetVariableMod lorikeetVariableMod = new LorikeetVariableMod();
	    					lorikeetVariableMod.setIndex( srchRepPeptDynamicModDTO.getPosition() );
	    					lorikeetVariableMod.setModMass( srchRepPeptDynamicModDTO.getMass() );
	    					lorikeetVariableMod.setAminoAcid( aminoAcid );
	    					variableMods.add( lorikeetVariableMod );
    					}
    				}
    			}
    	        
    	        result.setVariableMods( variableMods );

    	        result.setNtermMod( ntermMod );
    	        result.setCtermMod( ctermMod );

    			
    			Map<Integer, AnnotationDataItem_ForPage> psmAnnotationMap = new HashMap<>();
    			
    			//   TODO  Optimize this
    			{
    				//  Add in PSM Annotation data for Ann Type Display
    				{
    					//  Filterable Ann Types
    					List<PsmFilterableAnnotationDTO> psmFilterableAnnotationDTOList =
    							psm_FilterableAnnotationData_Searcher
    							.getPsmFilterableAnnotationDTOList( 
    									psmFromDBItem.getPsmId(), annTypeIdsToRetrieve );

    					for ( PsmFilterableAnnotationDTO item : psmFilterableAnnotationDTOList ) {

    						AnnotationDataItem_ForPage annotationDataItem_ForPage = new AnnotationDataItem_ForPage();
    						annotationDataItem_ForPage.setAnnotationTypeId( item.getAnnotationTypeId() );
    						annotationDataItem_ForPage.setValueString( item.getValueString() );
    						annotationDataItem_ForPage.setValueDouble( item.getValueDouble() );
    						psmAnnotationMap.put( item.getAnnotationTypeId(), annotationDataItem_ForPage );
    					}
    				}
    				
    				{
    					//  Descriptive Ann Types
    					List<PsmDescriptiveAnnotationDTO> psmDescriptiveAnnotationDTOList =
    							psm_DescriptiveAnnotationData_Searcher
    							.getPsmDescriptiveAnnotationDTOList( 
    									psmFromDBItem.getPsmId(),  annTypeIdsToRetrieve );

    					for ( PsmDescriptiveAnnotationDTO item : psmDescriptiveAnnotationDTOList ) {

    						AnnotationDataItem_ForPage annotationDataItem_ForPage = new AnnotationDataItem_ForPage();
    						annotationDataItem_ForPage.setAnnotationTypeId( item.getAnnotationTypeId() );
    						annotationDataItem_ForPage.setValueString( item.getValueString() );
    						psmAnnotationMap.put( item.getAnnotationTypeId(), annotationDataItem_ForPage );
    					}
    				}
    			}
    			
    			result.setPsmAnnotationMap( psmAnnotationMap );
    			
    			resultList.add( result );
    		}
    		
    		populateReporterIonMassesForPSMs( resultList );

    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.resultList = resultList;

    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );
    		
    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

    	} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
    		
    		//  only rethrow Error Response Exceptions 
    		throw e;
    		
    	} catch ( Exception e ) {
    		String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
    	}
    }

    /**
     * @param psm_ResultList
     * @return 
     * @throws SQLException 
     */
    private void populateReporterIonMassesForPSMs( List<PSM_Peptide_List_Display_With_SpectrumViewer_Item> psm_ResultList ) throws SQLException {

    	if ( psm_ResultList.isEmpty() ) {
    		//  No Input entries so return 
    		return; // EARLY RETURN
    	}
    	
    	List<Long> psmIds_ContainingReporterIonMasses = new ArrayList<>( psm_ResultList.size() );
    	
    	for ( PSM_Peptide_List_Display_With_SpectrumViewer_Item entry : psm_ResultList ) {
    		if ( entry.isHasReporterIons() ) {
    			psmIds_ContainingReporterIonMasses.add( entry.getPsmId() );
    		}
    	}

    	List<ReporterIonMasses_PsmLevel_ForPsmIds_Searcher_ResultItem> reporterIonMassesSearcherResult = 
    			reporterIonMasses_PsmLevel_ForPsmIds_Searcher
    			.get_ReporterIonMasses_PsmLevel_ForPsmIds( psmIds_ContainingReporterIonMasses );

    	//  Copy into Set in Map
    	
    	Map<Long, Set<BigDecimal>> reporterIonMassesSet_Key_PsmId = new HashMap<>();
    	
    	for ( ReporterIonMasses_PsmLevel_ForPsmIds_Searcher_ResultItem item : reporterIonMassesSearcherResult ) {
    		
    		Long psmId = item.getPsmId();
    		Set<BigDecimal> reporterIonMassesSet_For_PsmId = reporterIonMassesSet_Key_PsmId.get( psmId );
    		if ( reporterIonMassesSet_For_PsmId == null ) {
    			reporterIonMassesSet_For_PsmId = new HashSet<>();
    			reporterIonMassesSet_Key_PsmId.put( psmId, reporterIonMassesSet_For_PsmId );
    		}
    		reporterIonMassesSet_For_PsmId.add( item.getReporterIonMass() );
    	}
    	
    	for ( PSM_Peptide_List_Display_With_SpectrumViewer_Item entry : psm_ResultList ) {
    		if ( entry.isHasReporterIons() ) {
    			Long psmId = entry.getPsmId();
    			Set<BigDecimal> reporterIonMassesSet_For_PsmId = reporterIonMassesSet_Key_PsmId.get( psmId );
    			if ( reporterIonMassesSet_For_PsmId == null ) {
    				log.warn( "No entry in reporterIonMassesSet_Key_PsmId when entry.isHasReporterIons() is true. psmId: "
    						+ psmId );
    			}
    			if ( reporterIonMassesSet_For_PsmId != null ) {
    				List<BigDecimal> reporterIonMassesList = new ArrayList<>( reporterIonMassesSet_For_PsmId );
    				Collections.sort( reporterIonMassesList );
    				entry.setReporterIonMassList( reporterIonMassesList );
    			}
    		}
    	}
    }

    /**
     * 
     *
     */
    public static class WebserviceRequest {
    	
    	private Long psmId;

    	private Integer projectSearchId;
    	List<Integer> psmAnnTypeDisplay;
    	private List<Integer> psmAnnotationTypeIdsForSorting;
    	
		public Long getPsmId() {
			return psmId;
		}
		public void setPsmId(Long psmId) {
			this.psmId = psmId;
		}
		public Integer getProjectSearchId() {
			return projectSearchId;
		}
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public List<Integer> getPsmAnnotationTypeIdsForSorting() {
			return psmAnnotationTypeIdsForSorting;
		}
		public void setPsmAnnotationTypeIdsForSorting(List<Integer> psmAnnotationTypeIdsForSorting) {
			this.psmAnnotationTypeIdsForSorting = psmAnnotationTypeIdsForSorting;
		}
		public List<Integer> getPsmAnnTypeDisplay() {
			return psmAnnTypeDisplay;
		}
		public void setPsmAnnTypeDisplay(List<Integer> psmAnnTypeDisplay) {
			this.psmAnnTypeDisplay = psmAnnTypeDisplay;
		}
    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult {

    	List<PSM_Peptide_List_Display_With_SpectrumViewer_Item> resultList;

		public List<PSM_Peptide_List_Display_With_SpectrumViewer_Item> getResultList() {
			return resultList;
		}

    }
}


