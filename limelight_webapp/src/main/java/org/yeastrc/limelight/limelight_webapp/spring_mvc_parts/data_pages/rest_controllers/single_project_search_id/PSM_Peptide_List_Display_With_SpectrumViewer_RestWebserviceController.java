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
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

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
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPositionDTO;
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
import org.yeastrc.limelight.limelight_webapp.searchers.OpenModificationMasses_PsmLevel_ForPsmIds_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.OpenModificationPositions_PsmLevel_ForOpenModIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.PeptideStringForSearchIdReportedPeptideIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmDynamicModification_For_PsmId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmsWithSameScanNumberScanFilenameIdSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ReporterIonMasses_PsmLevel_ForPsmIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchHasScanDataForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SrchRepPept_DynamicMod_For_SearchIdReportedPeptideId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ReporterIonMasses_PsmLevel_ForPsmIds_Searcher.ReporterIonMasses_PsmLevel_ForPsmIds_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmsForScanNumberScanFilenameIdSearchId_Result;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
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
	private OpenModificationMasses_PsmLevel_ForPsmIds_SearcherIF openModificationMasses_PsmLevel_ForPsmIds_Searcher;
	
	@Autowired
	private OpenModificationPositions_PsmLevel_ForOpenModIds_Searcher_IF openModificationPositions_PsmLevel_ForOpenModIds_Searcher;
	
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
					.getPsmsWithSameScanNumberScanFilenameIdSearchId( psmIdFromWebserviceRequest, searchId );
			
    		List<WebserviceResult_Item> resultList = new ArrayList<>( psmsFromDBList.size() );
    		
    		for ( PsmsForScanNumberScanFilenameIdSearchId_Result psmFromDBItem : psmsFromDBList ) {
    			
    			final long psmIdForDbItem = psmFromDBItem.getPsmId(); 
    			final int reportedPeptideId = psmFromDBItem.getReportedPeptideId();
    			
    			WebserviceResult_Item result = new WebserviceResult_Item();
    			
    			result.psmId = psmFromDBItem.getPsmId();
    			result.charge = psmFromDBItem.getCharge();
    			result.reportedPeptideId = reportedPeptideId;
    			
    			result.psm_precursor_RetentionTime = psmFromDBItem.getPrecursor_RetentionTime();
    			result.psm_precursor_MZ = psmFromDBItem.getPrecursor_MZ();
    			
    			result.psmIs_IndependentDecoy = psmFromDBItem.isPsmIs_IndependentDecoy();
    			
    			result.scanNumber = psmFromDBItem.getScanNumber();

    			PsmDTO psmDTOForFoundPsmId = psmDAO.getById( psmIdForDbItem );
    			if ( psmDTOForFoundPsmId == null ) {
    				String msg = "No psmDTOForFoundPsmId for psmId: " + psmIdForDbItem;
    				log.warn( msg );
        			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}
    			
    			result.hasReporterIons = psmDTOForFoundPsmId.isHasReporterIons();
    			result.hasOpenModifications = psmDTOForFoundPsmId.isHasOpenModifications();
    			
    			ReportedPeptideDTO reportedPeptideDTO = reportedPeptideDAO.getForId( reportedPeptideId );
    			if ( reportedPeptideDTO == null ) {
    				String msg = "Unable to find reportedPeptideDTO for reportedPeptideId = " + reportedPeptideId;
    				log.error( msg );
    			    throw new LimelightInternalErrorException( msg );
    			}
    			result.reportedPeptideString = reportedPeptideDTO.getSequence();
    			
    			String peptideSequence = 
    					peptideStringForSearchIdReportedPeptideIdSearcher
    					.getPeptideSequenceStringForSearchIdReportedPeptideId( searchId, reportedPeptideId );
    			if ( peptideSequence == null ) {
    				String msg = "Unable to find peptide string for searchId: " + searchId
    						+ ", reportedPeptideId = " + reportedPeptideId;
    				log.error( msg );
    			    throw new LimelightInternalErrorException( msg );
    			}
    			result.peptideSequence = peptideSequence;

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
    	        
    	        result.variableMods = variableMods;

    	        result.ntermMod = ntermMod;
    	        result.ctermMod = ctermMod;

    			
    	        List<AnnotationDataItem_ForPage> psmAnnotationList = null;
    	        
    			//   TODO  Optimize this
    			{
    				//  Add in PSM Annotation data for Ann Type Display
    				{
    					List<Long> psmList = new ArrayList<>( 1 );
    					psmList.add( psmFromDBItem.getPsmId() );
    					
    					//  Filterable Ann Types
    					List<PsmFilterableAnnotationDTO> psmFilterableAnnotationDTOList =
    							psm_FilterableAnnotationData_Searcher
    							.getPsmFilterableAnnotationDTOList( 
    									psmList, annTypeIdsToRetrieve );
    					
    					psmAnnotationList = new ArrayList<>( psmFilterableAnnotationDTOList.size() );

    					for ( PsmFilterableAnnotationDTO item : psmFilterableAnnotationDTOList ) {

    						AnnotationDataItem_ForPage annotationDataItem_ForPage = new AnnotationDataItem_ForPage();
    						annotationDataItem_ForPage.setAnnotationTypeId( item.getAnnotationTypeId() );
    						annotationDataItem_ForPage.setValueString( item.getValueString() );
    						annotationDataItem_ForPage.setValueDouble( item.getValueDouble() );
    						psmAnnotationList.add( annotationDataItem_ForPage );
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
    						psmAnnotationList.add( annotationDataItem_ForPage );
    					}
    				}
    			}
    			
    			result.psmAnnotationList = psmAnnotationList;
    			
    			resultList.add( result );
    		}
    		
    		populateReporterIonMassesForPSMs( resultList );
    		
    		populateOpenModificationMassesForPSMs( resultList );

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
    private void populateReporterIonMassesForPSMs( List<WebserviceResult_Item> psm_ResultList ) throws SQLException {

    	if ( psm_ResultList.isEmpty() ) {
    		//  No Input entries so return 
    		return; // EARLY RETURN
    	}
    	
    	List<Long> psmIds_ContainingReporterIonMasses = new ArrayList<>( psm_ResultList.size() );
    	
    	for ( WebserviceResult_Item entry : psm_ResultList ) {
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
    	
    	for ( WebserviceResult_Item entry : psm_ResultList ) {
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
    				entry.reporterIonMassList = reporterIonMassesList;
    			}
    		}
    	}
    }

	//////////////////////////////////////


    /**
     * @param psmWebDisplayList
     * @return 
     * @throws SQLException 
     */
    private void populateOpenModificationMassesForPSMs( List<WebserviceResult_Item> psmWebDisplayList ) throws SQLException {

    	if ( psmWebDisplayList.isEmpty() ) {
    		//  No Input entries so return 
    		return; // EARLY RETURN
    	}
    	
    	List<Long> psmIds_Containing_OpenModification_Masses = new ArrayList<>( psmWebDisplayList.size() );
    	
    	for ( WebserviceResult_Item entry : psmWebDisplayList ) {
    		if ( entry.isHasOpenModifications() ) {
    			psmIds_Containing_OpenModification_Masses.add( entry.getPsmId() );
    		}
    	}

    	List<PsmOpenModificationDTO> openModificationMassesSearcherResult = 
    			openModificationMasses_PsmLevel_ForPsmIds_Searcher
    			.get_OpenModificationMasses_PsmLevel_ForPsmIds( psmIds_Containing_OpenModification_Masses );
    	
    	List<Long> psmOpenModificationIdList = new ArrayList<>( openModificationMassesSearcherResult.size() );
    	for ( PsmOpenModificationDTO item : openModificationMassesSearcherResult ) {
    		psmOpenModificationIdList.add( item.getId() );
    	}
    	
    	List<PsmOpenModificationPositionDTO> psmOpenModificationPositionDTOList =
    			openModificationPositions_PsmLevel_ForOpenModIds_Searcher
    			.get_OpenModificationMasses_PsmLevel_For_psmOpenModificationIds( psmOpenModificationIdList );
    	
    	Map<Long,List<PsmOpenModificationPositionDTO>> psmOpenModificationPositionDTOList_Map_Key_psmOpenModificationId = new HashMap<>();
    	for ( PsmOpenModificationPositionDTO item : psmOpenModificationPositionDTOList ) {
    		Long psmOpenModificationId = item.getPsmOpenModificationId();
    		List<PsmOpenModificationPositionDTO> psmOpenModificationPositionDTOList_InMap = 
    				psmOpenModificationPositionDTOList_Map_Key_psmOpenModificationId.get( psmOpenModificationId );
    		if ( psmOpenModificationPositionDTOList_InMap == null ) {
    			psmOpenModificationPositionDTOList_InMap = new ArrayList<>();
    			psmOpenModificationPositionDTOList_Map_Key_psmOpenModificationId.put( psmOpenModificationId, psmOpenModificationPositionDTOList_InMap );
    		}
    		psmOpenModificationPositionDTOList_InMap.add( item );
    	}

    	//  Copy into List in Map in Map
    	
    	Map<Long, Map<Double,List<WebserviceResult_Item_OpenMod__OpenModPosition_SubPart>>> openModificationPositionsList_Key_OpenModMass_Key_PsmId = new HashMap<>();
    	
    	for ( PsmOpenModificationDTO item : openModificationMassesSearcherResult ) {
    		
    		Long psmOpenModificationId = item.getId();
    		Long psmId = item.getPsmId();
    		Double openModMass = item.getMass();
    		Map<Double,List<WebserviceResult_Item_OpenMod__OpenModPosition_SubPart>> openModificationPositionsList_Key_OpenModMass_For_PsmId = openModificationPositionsList_Key_OpenModMass_Key_PsmId.get( psmId );
    		if ( openModificationPositionsList_Key_OpenModMass_For_PsmId == null ) {
    			openModificationPositionsList_Key_OpenModMass_For_PsmId = new HashMap<>();
    			openModificationPositionsList_Key_OpenModMass_Key_PsmId.put( psmId, openModificationPositionsList_Key_OpenModMass_For_PsmId );
    		}
    		List<WebserviceResult_Item_OpenMod__OpenModPosition_SubPart> openModificationPositionsList = openModificationPositionsList_Key_OpenModMass_For_PsmId.get( openModMass );
    		if ( openModificationPositionsList == null ) {
    			openModificationPositionsList = new ArrayList<>();
    			openModificationPositionsList_Key_OpenModMass_For_PsmId.put( openModMass, openModificationPositionsList );
    		}
    		
    		//  get positions (optional)
    		List<PsmOpenModificationPositionDTO> psmOpenModificationPositionDTOList_MapEntry = psmOpenModificationPositionDTOList_Map_Key_psmOpenModificationId.get( psmOpenModificationId );
    		if ( psmOpenModificationPositionDTOList_MapEntry != null ) {
    			for ( PsmOpenModificationPositionDTO psmOpenModificationPositionDTOList_Entry : psmOpenModificationPositionDTOList_MapEntry ) {
    				WebserviceResult_Item_OpenMod__OpenModPosition_SubPart webserviceResponse_PSM_OpenModItem_PositionItem = new WebserviceResult_Item_OpenMod__OpenModPosition_SubPart();
    				webserviceResponse_PSM_OpenModItem_PositionItem.position = psmOpenModificationPositionDTOList_Entry.getPosition();
    				webserviceResponse_PSM_OpenModItem_PositionItem.is_N_Terminal = psmOpenModificationPositionDTOList_Entry.isIs_N_Terminal();
    				webserviceResponse_PSM_OpenModItem_PositionItem.is_C_Terminal = psmOpenModificationPositionDTOList_Entry.isIs_C_Terminal();
    				openModificationPositionsList.add( webserviceResponse_PSM_OpenModItem_PositionItem );
    			}
    		}
    	}
    	
    	for ( WebserviceResult_Item entry : psmWebDisplayList ) {
    		if ( entry.isHasOpenModifications() ) {
    			Long psmId = entry.getPsmId();
    			Map<Double,List<WebserviceResult_Item_OpenMod__OpenModPosition_SubPart>> openModificationPositionsList_Key_OpenModMass_For_PsmId = openModificationPositionsList_Key_OpenModMass_Key_PsmId.get( psmId );
    			if ( openModificationPositionsList_Key_OpenModMass_For_PsmId == null ) {
    				log.warn( "No entry in openModificationPositionsList_Key_OpenModMass_Key_PsmId when entry.isHasOpenModifications() is true. psmId: "
    						+ psmId );
    			}
    			if ( openModificationPositionsList_Key_OpenModMass_Key_PsmId != null ) {
    				List<Map.Entry<Double,List<WebserviceResult_Item_OpenMod__OpenModPosition_SubPart>>> openModificationMassesMapEntriesList = new ArrayList<>( openModificationPositionsList_Key_OpenModMass_For_PsmId.entrySet() );
    				Collections.sort(openModificationMassesMapEntriesList, new Comparator<Map.Entry<Double,List<WebserviceResult_Item_OpenMod__OpenModPosition_SubPart>>>() {

						@Override
						public int compare(Entry<Double, List<WebserviceResult_Item_OpenMod__OpenModPosition_SubPart>> o1, Entry<Double, List<WebserviceResult_Item_OpenMod__OpenModPosition_SubPart>> o2) {
							if ( o1.getKey() < o2.getKey() )
								return -1;
							if ( o1.getKey() > o2.getKey() )
								return 1;
							return 0;
						}
					});
    				List<WebserviceResult_Item_OpenMod_SubPart> openModificationMassAndPositionsList = new ArrayList<>( openModificationMassesMapEntriesList.size() );

    				for ( Map.Entry<Double,List<WebserviceResult_Item_OpenMod__OpenModPosition_SubPart>> mapEntry : openModificationMassesMapEntriesList ) {
    					
    					WebserviceResult_Item_OpenMod_SubPart webserviceResponse_PSM_OpenModItem = new WebserviceResult_Item_OpenMod_SubPart();
    					webserviceResponse_PSM_OpenModItem.openModMass = mapEntry.getKey();
    					if ( ! mapEntry.getValue().isEmpty() ) {
    						//  Only populate if not empty
    						webserviceResponse_PSM_OpenModItem.positionEntries_Optional = mapEntry.getValue();
    					}
    					openModificationMassAndPositionsList.add( webserviceResponse_PSM_OpenModItem );
    				}
    				
    				if ( openModificationMassAndPositionsList.isEmpty() ) {
    					String msg = "openModificationMassAndPositionsList.isEmpty(). psmId: " + psmId;
    					log.warn(msg);
    				}
    				
    				if ( ! openModificationMassAndPositionsList.isEmpty() ) {
    					entry.openModificationMassAndPositionsList = openModificationMassAndPositionsList;
    				}
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

    	List<WebserviceResult_Item> resultList;

		public List<WebserviceResult_Item> getResultList() {
			return resultList;
		}

    }


    /**
     * 
     *
     */
    public static class WebserviceResult_Item {

    	private long psmId;

    	private int charge;
    	private BigDecimal psm_precursor_RetentionTime; // precursor_retention_time
    	private BigDecimal psm_precursor_MZ;            // precursor_m_z
    	
    	private boolean psmIs_IndependentDecoy;     //  NOT return 'is_decoy' since Excluded in SQL
    	
    	private int scanNumber;

    	private List<AnnotationDataItem_ForPage> psmAnnotationList;

    	private int reportedPeptideId;

    	private String reportedPeptideString;
    	private String peptideSequence;

    	private List<BigDecimal> reporterIonMassList;
    	private boolean hasReporterIons;

    	private List<WebserviceResult_Item_OpenMod_SubPart> openModificationMassAndPositionsList;
    	private boolean hasOpenModifications;


    	/**
    	 * Variable Mods / Dynamic Mods
    	 */
    	private List<LorikeetVariableMod> variableMods; 

    	private double ntermMod = 0; // additional mass to be added to the n-term
    	private double ctermMod = 0; // additional mass to be added to the c-term
    	
    	private String label;		// stable isotope label name
    	
		public long getPsmId() {
			return psmId;
		}
		public int getCharge() {
			return charge;
		}
		public BigDecimal getPsm_precursor_RetentionTime() {
			return psm_precursor_RetentionTime;
		}
		public BigDecimal getPsm_precursor_MZ() {
			return psm_precursor_MZ;
		}
		public int getScanNumber() {
			return scanNumber;
		}
		public int getReportedPeptideId() {
			return reportedPeptideId;
		}
		public String getReportedPeptideString() {
			return reportedPeptideString;
		}
		public String getPeptideSequence() {
			return peptideSequence;
		}
		public List<BigDecimal> getReporterIonMassList() {
			return reporterIonMassList;
		}
		public boolean isHasReporterIons() {
			return hasReporterIons;
		}
		public List<WebserviceResult_Item_OpenMod_SubPart> getOpenModificationMassAndPositionsList() {
			return openModificationMassAndPositionsList;
		}
		public boolean isHasOpenModifications() {
			return hasOpenModifications;
		}
		public List<LorikeetVariableMod> getVariableMods() {
			return variableMods;
		}
		public double getNtermMod() {
			return ntermMod;
		}
		public double getCtermMod() {
			return ctermMod;
		}
		public String getLabel() {
			return label;
		}
		public List<AnnotationDataItem_ForPage> getPsmAnnotationList() {
			return psmAnnotationList;
		}
		public boolean isPsmIs_IndependentDecoy() {
			return psmIs_IndependentDecoy;
		}

    }

    public static class WebserviceResult_Item_OpenMod_SubPart {

    	private double openModMass;
    	private List<WebserviceResult_Item_OpenMod__OpenModPosition_SubPart> positionEntries_Optional;
    	
		public double getOpenModMass() {
			return openModMass;
		}
		public List<WebserviceResult_Item_OpenMod__OpenModPosition_SubPart> getPositionEntries_Optional() {
			return positionEntries_Optional;
		}
    }
    
    public static class WebserviceResult_Item_OpenMod__OpenModPosition_SubPart {
    	
    	private int position;
    	private boolean is_N_Terminal;
    	private boolean is_C_Terminal;
    	
		public int getPosition() {
			return position;
		}
		public boolean isIs_N_Terminal() {
			return is_N_Terminal;
		}
		public boolean isIs_C_Terminal() {
			return is_C_Terminal;
		}
    }
}


