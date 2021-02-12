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
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.dto.PsmDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPositionDTO;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.dao.ScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.objects.AnnotationDataItem_ForPage;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.Psm_DescriptiveAnnotationData_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.Psm_FilterableAnnotationData_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValues_Factory;
import org.yeastrc.limelight.limelight_webapp.searchers.OpenModificationMasses_PsmLevel_ForPsmIds_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.OpenModificationPositions_PsmLevel_ForOpenModIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmWebDisplaySearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ReporterIonMasses_PsmLevel_ForPsmIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ReporterIonMasses_PsmLevel_ForPsmIds_Searcher.ReporterIonMasses_PsmLevel_ForPsmIds_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmWebDisplayWebServiceResult;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanDataFromScanNumbers_IncludeParentScans;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_ExcludeReturnScanPeakData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScan_SubResponse;


/**
 * Display PSMs for a project search id and reported peptide id
 * 
 *             Need to validate Project Search ID values in URL with values in POST JSON
 *               Already done for Ann Type Cutoffs in called code that translates cutoffs to objects sent to searcher
 *
 */
@RestController
public class PSM_List_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( PSM_List_RestWebserviceController.class );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
	
	@Autowired
	private SearchFlagsForSearchIdSearcherIF searchFlagsForSearchIdSearcher;

	@Autowired
	private SearcherCutoffValues_Factory searcherCutoffValuesRootLevel_Factory;
	
	@Autowired
	private PsmWebDisplaySearcherIF psmWebDisplaySearcher;
	
	@Autowired
	private ScanFileDAO_IF scanFileDAO;
	
	@Autowired
	private Psm_FilterableAnnotationData_SearcherIF psm_FilterableAnnotationData_Searcher;
	
	@Autowired
	private Psm_DescriptiveAnnotationData_SearcherIF psm_DescriptiveAnnotationData_Searcher;
	
	@Autowired
	private ReporterIonMasses_PsmLevel_ForPsmIdSearcherIF reporterIonMasses_PsmLevel_ForPsmIds_Searcher;

	@Autowired
	private OpenModificationMasses_PsmLevel_ForPsmIds_SearcherIF openModificationMasses_PsmLevel_ForPsmIds_Searcher;
	
	@Autowired
	private OpenModificationPositions_PsmLevel_ForOpenModIds_Searcher_IF openModificationPositions_PsmLevel_ForOpenModIds_Searcher;
	
	@Autowired
	private Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public PSM_List_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.PSM_LIST_REST_WEBSERVICE_CONTROLLER
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

    		WebserviceRequestRoot webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequestRoot.class );

    		Integer projectSearchId = webserviceRequest.getProjectSearchId();

    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Id" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId = webserviceRequest.getSearchDataLookupParams_For_Single_ProjectSearchId();
    		List<Integer> psmAnnotationTypeIdsForSorting = webserviceRequest.getPsmAnnotationTypeIdsForSorting();
    		
    		Integer reportedPeptideId = webserviceRequest.getReportedPeptideId();
    		Integer searchSubGroupId = webserviceRequest.searchSubGroupId;  // Optional
    				
    		List<Long> psmIds_Include = webserviceRequest.getPsmIds_Include();
    		List<Long> psmIds_Exclude = webserviceRequest.getPsmIds_Exclude();

    		if ( reportedPeptideId == null && ( psmIds_Include == null || psmIds_Include.isEmpty() ) ) {
    			String msg = "reported peptide id is null and ( psmIds_Include is null or empty ).";
    			log.warn(msg);
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		if ( reportedPeptideId == null && searchSubGroupId != null ) {
    			String msg = "reported peptide id is null and searchSubGroupId != null.";
    			log.warn(msg);
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
			
			SearchFlagsForSearchIdSearcher_Result searchFlagsForSearchIdSearcher_Result = searchFlagsForSearchIdSearcher.getSearchHasScanDataForSearchId( searchId );
			if ( searchFlagsForSearchIdSearcher_Result == null ) {
				String msg = "No searchFlagsForSearchIdSearcher_Result for searchId: " + searchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
    		Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
    		projectSearchIdMapToSearchId.put( projectSearchId, searchId );
    		
    		SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel =
    				searcherCutoffValuesRootLevel_Factory
    				.createSearcherCutoffValuesSearchLevel(
    						projectSearchIdMapToSearchId, 
    						searchDataLookupParams_For_Single_ProjectSearchId );

			//  PSM Annotation data for Ann Type Display
			
			Set<Integer> annTypeIdsToRetrieve = new HashSet<>();
			
			annTypeIdsToRetrieve.addAll( searchDataLookupParams_For_Single_ProjectSearchId.getPsmAnnTypeDisplay() );
			if ( psmAnnotationTypeIdsForSorting != null ) {
				annTypeIdsToRetrieve.addAll( psmAnnotationTypeIdsForSorting );
			}
			
    		List<PsmWebDisplayWebServiceResult> psmWebDisplayList = 
    				psmWebDisplaySearcher.getPsmsWebDisplay( searchId, reportedPeptideId, searchSubGroupId, psmIds_Include, psmIds_Exclude, searcherCutoffValuesSearchLevel );

    		Map<Integer, Map<Integer, SingleScan_SubResponse>> scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId = new HashMap<>();
			
    		if ( searchFlagsForSearchIdSearcher_Result.isHasScanData() ) {

    			//  Get Scan Info from Spectral Storage Service
    			
    			//   First get scan file ids and assoc scan numbers
    			
    			
    			Map<Integer, Set<Integer>> scanNumbers_KeyedOn_ScanFileId = new HashMap<>();

        		for ( PsmWebDisplayWebServiceResult psmWebDisplay : psmWebDisplayList ) {
        			

    				if ( psmWebDisplay.getPsm_precursor_RetentionTime() != null && psmWebDisplay.getPsm_precursor_MZ() != null ) {
    					
    					//  Skip if already have both values in PSM record

        				continue;
    				}
        			
        			
        			Integer scanFileId = psmWebDisplay.getScanFileId();
        			Integer scanNumber = psmWebDisplay.getScanNumber();
        			if ( scanFileId != null && scanNumber != null ) {
        				Set<Integer> scanNumbers = scanNumbers_KeyedOn_ScanFileId.get( scanFileId );
        				if ( scanNumbers == null ) {
        					scanNumbers = new HashSet<>();
        					scanNumbers_KeyedOn_ScanFileId.put( scanFileId, scanNumbers );
        				}
        				scanNumbers.add( scanNumber );
        			}
        		}
        		
        		for ( Map.Entry<Integer, Set<Integer>> entry : scanNumbers_KeyedOn_ScanFileId.entrySet() ) {
        			
        			Integer scanFileId = entry.getKey();
        			Set<Integer> scanNumbersSet = entry.getValue();
        			
        			String scanFileAPIKey = scanFileDAO.getSpectralStorageAPIKeyById( scanFileId );
        			if ( StringUtils.isEmpty( scanFileAPIKey ) ) {
        				String msg = "No value for scanFileAPIKey for scan file id: " + scanFileId;
        				log.error( msg );
        				throw new LimelightInternalErrorException( msg );
        			}
        			
        			List<Integer> scanNumbersList = new ArrayList<>( scanNumbersSet );
        			
        			List<SingleScan_SubResponse> scans = 
        					call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice
        					.getScanDataFromSpectralStorageService(
        							scanNumbersList, 
        							Get_ScanDataFromScanNumbers_IncludeParentScans.NO,
        							Get_ScanData_ExcludeReturnScanPeakData.YES,
        							scanFileAPIKey );
        			
        			Set<Integer> scanNumbersSetForConfirmRetrieved = new HashSet<>( scanNumbersSet );

        			Map<Integer, SingleScan_SubResponse> scanData_KeyedOn_ScanNumber = new HashMap<>();
        			
        			for ( SingleScan_SubResponse scan : scans ) {
        				Integer scanNumber = scan.getScanNumber();
        				scanData_KeyedOn_ScanNumber.put( scanNumber, scan );
        				//  Validate all scan numbers found:
        				if( ! scanNumbersSetForConfirmRetrieved.remove( scanNumber ) ) {
        					String msg = "Scan number in result but not in request or is in result more than once: scanNumber: " + scanNumber
        							+ ", scanFileId: " + scanFileId;
        					log.error(msg);
        					throw new LimelightInternalErrorException(msg);
        				}
        			}
        			
        			if ( ! scanNumbersSetForConfirmRetrieved.isEmpty() ) {
    					String msg = "Scan numbers are in request but not in result: scanFileId: " + scanFileId
    							+ ", Scan numbers are in request but not in result: " + scanNumbersSetForConfirmRetrieved;
    							;
    					log.error(msg);
    					throw new LimelightInternalErrorException(msg);
        			}
        			
    				scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId.put( scanFileId, scanData_KeyedOn_ScanNumber );
        		}
    		}
    		
    		List<WebserviceResponse_PSM_Item> resultList = new ArrayList<>( psmWebDisplayList.size() );
    		
    		for ( PsmWebDisplayWebServiceResult psmWebDisplay : psmWebDisplayList ) {
    			
    			WebserviceResponse_PSM_Item result = new WebserviceResponse_PSM_Item();
    			result.setPsmId( psmWebDisplay.getPsmId() );
    			result.setSearchId( psmWebDisplay.getSearchId() );
    			result.setCharge( psmWebDisplay.getCharge() );
    			result.setScanNumber( psmWebDisplay.getScanNumber() );
    			result.setScanFilename( psmWebDisplay.getScanFilename() );
    			
    			result.setHasReporterIons( psmWebDisplay.isHasReporterIons() );
    			result.setHasOpenModifications( psmWebDisplay.isHasOpenModifications() );
    			
    			if ( ! ( psmWebDisplay.getPsm_precursor_RetentionTime() != null && psmWebDisplay.getPsm_precursor_MZ() != null ) ) {
    				
    				//  Execute ONLY if one or both of PSM not populated for RT or M/Z
	
	    			if ( searchFlagsForSearchIdSearcher_Result.isHasScanData() ) {
	    				
	    				Map<Integer, SingleScan_SubResponse> scanData_KeyedOn_ScanNumber =
	    						scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId.get( psmWebDisplay.getScanFileId() );
	    				if ( scanData_KeyedOn_ScanNumber == null ) {
	    					String msg = "ScanFileId not found in lookup map: " + psmWebDisplay.getScanFileId();
	    					log.error(msg);
	    					throw new LimelightInternalErrorException(msg);
	    				}
	    				SingleScan_SubResponse scan = scanData_KeyedOn_ScanNumber.get( psmWebDisplay.getScanNumber() );
	    				if ( scan == null ) {
	    					String msg = "ScanNumber not found in lookup map: ScanNumber: " + psmWebDisplay.getScanNumber()
	    							+ ", ScanFileId: " + psmWebDisplay.getScanFileId();
	    					log.error(msg);
	    					throw new LimelightInternalErrorException(msg);
	    				}
	    				
	    				result.setRetentionTimeSeconds( scan.getRetentionTime() );
	    				result.setPrecursor_M_Over_Z( scan.getPrecursor_M_Over_Z() );
	    			}
    			}
    			
				if ( psmWebDisplay.getPsm_precursor_RetentionTime() != null ) {
    			
					result.setRetentionTimeSeconds( psmWebDisplay.getPsm_precursor_RetentionTime().floatValue() );
				}
				if ( psmWebDisplay.getPsm_precursor_MZ() != null ) {

    				result.setPrecursor_M_Over_Z( psmWebDisplay.getPsm_precursor_MZ().doubleValue() );
				}
    			
    			Map<Integer, AnnotationDataItem_ForPage> psmAnnotationMap = new HashMap<>();
    			
    			//   TODO  Optimize this
    			{
    				//  Add in PSM Annotation data for Ann Type Display
    				{
    					List<Long> psmList = new ArrayList<>( 1 );
    					psmList.add( psmWebDisplay.getPsmId() );
    					
    					//  Filterable Ann Types
    					List<PsmFilterableAnnotationDTO> psmFilterableAnnotationDTOList =
    							psm_FilterableAnnotationData_Searcher
    							.getPsmFilterableAnnotationDTOList( psmList, annTypeIdsToRetrieve );

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
    									psmWebDisplay.getPsmId(),  annTypeIdsToRetrieve );

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
    		
    		populateOpenModificationMassesForPSMs( resultList );

    		WebserviceResult webserviceResult = new WebserviceResult();
    		
    		webserviceResult.resultList = resultList;
    		
    		webserviceResult.searchHasScanData = searchFlagsForSearchIdSearcher_Result.isHasScanData();

    		webserviceResult.search_hasScanFilenames = searchFlagsForSearchIdSearcher_Result.isHasScanFilenames();
    		webserviceResult.search_hasIsotopeLabel = searchFlagsForSearchIdSearcher_Result.isHasIsotopeLabel();
    		webserviceResult.search_anyPsmHas_DynamicModifications = searchFlagsForSearchIdSearcher_Result.isAnyPsmHas_DynamicModifications();
    		webserviceResult.search_anyPsmHas_OpenModifications = searchFlagsForSearchIdSearcher_Result.isAnyPsmHas_OpenModifications();
    		webserviceResult.search_anyPsmHas_ReporterIons = searchFlagsForSearchIdSearcher_Result.isAnyPsmHas_ReporterIons();
    	

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
    private void populateReporterIonMassesForPSMs( List<WebserviceResponse_PSM_Item> psm_ResultList ) throws SQLException {

    	if ( psm_ResultList.isEmpty() ) {
    		//  No Input entries so return 
    		return; // EARLY RETURN
    	}
    	
    	List<Long> psmIds_ContainingReporterIonMasses = new ArrayList<>( psm_ResultList.size() );
    	
    	for ( WebserviceResponse_PSM_Item entry : psm_ResultList ) {
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
    	
    	for ( WebserviceResponse_PSM_Item entry : psm_ResultList ) {
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

	//////////////////////////////////////


    /**
     * @param psmWebDisplayList
     * @return 
     * @throws SQLException 
     */
    private void populateOpenModificationMassesForPSMs( List<WebserviceResponse_PSM_Item> psmWebDisplayList ) throws SQLException {

    	if ( psmWebDisplayList.isEmpty() ) {
    		//  No Input entries so return 
    		return; // EARLY RETURN
    	}
    	
    	List<Long> psmIds_Containing_OpenModification_Masses = new ArrayList<>( psmWebDisplayList.size() );
    	
    	for ( WebserviceResponse_PSM_Item entry : psmWebDisplayList ) {
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
    	
    	Map<Long, Map<Double,List<WebserviceResponse_PSM_OpenModItem_PositionItem>>> openModificationPositionsList_Key_OpenModMass_Key_PsmId = new HashMap<>();
    	
    	for ( PsmOpenModificationDTO item : openModificationMassesSearcherResult ) {
    		
    		Long psmOpenModificationId = item.getId();
    		Long psmId = item.getPsmId();
    		Double openModMass = item.getMass();
    		Map<Double,List<WebserviceResponse_PSM_OpenModItem_PositionItem>> openModificationPositionsList_Key_OpenModMass_For_PsmId = openModificationPositionsList_Key_OpenModMass_Key_PsmId.get( psmId );
    		if ( openModificationPositionsList_Key_OpenModMass_For_PsmId == null ) {
    			openModificationPositionsList_Key_OpenModMass_For_PsmId = new HashMap<>();
    			openModificationPositionsList_Key_OpenModMass_Key_PsmId.put( psmId, openModificationPositionsList_Key_OpenModMass_For_PsmId );
    		}
    		List<WebserviceResponse_PSM_OpenModItem_PositionItem> openModificationPositionsList = openModificationPositionsList_Key_OpenModMass_For_PsmId.get( openModMass );
    		if ( openModificationPositionsList == null ) {
    			openModificationPositionsList = new ArrayList<>();
    			openModificationPositionsList_Key_OpenModMass_For_PsmId.put( openModMass, openModificationPositionsList );
    		}
    		
    		//  get positions (optional)
    		List<PsmOpenModificationPositionDTO> psmOpenModificationPositionDTOList_MapEntry = psmOpenModificationPositionDTOList_Map_Key_psmOpenModificationId.get( psmOpenModificationId );
    		if ( psmOpenModificationPositionDTOList_MapEntry != null ) {
    			for ( PsmOpenModificationPositionDTO psmOpenModificationPositionDTOList_Entry : psmOpenModificationPositionDTOList_MapEntry ) {
    				WebserviceResponse_PSM_OpenModItem_PositionItem webserviceResponse_PSM_OpenModItem_PositionItem = new WebserviceResponse_PSM_OpenModItem_PositionItem();
    				webserviceResponse_PSM_OpenModItem_PositionItem.position = psmOpenModificationPositionDTOList_Entry.getPosition();
    				webserviceResponse_PSM_OpenModItem_PositionItem.is_N_Terminal = psmOpenModificationPositionDTOList_Entry.isIs_N_Terminal();
    				webserviceResponse_PSM_OpenModItem_PositionItem.is_C_Terminal = psmOpenModificationPositionDTOList_Entry.isIs_C_Terminal();
    				openModificationPositionsList.add( webserviceResponse_PSM_OpenModItem_PositionItem );
    			}
    		}
    	}
    	
    	for ( WebserviceResponse_PSM_Item entry : psmWebDisplayList ) {
    		if ( entry.isHasOpenModifications() ) {
    			Long psmId = entry.getPsmId();
    			Map<Double,List<WebserviceResponse_PSM_OpenModItem_PositionItem>> openModificationPositionsList_Key_OpenModMass_For_PsmId = openModificationPositionsList_Key_OpenModMass_Key_PsmId.get( psmId );
    			if ( openModificationPositionsList_Key_OpenModMass_For_PsmId == null ) {
    				log.warn( "No entry in openModificationPositionsList_Key_OpenModMass_Key_PsmId when entry.isHasOpenModifications() is true. psmId: "
    						+ psmId );
    			}
    			if ( openModificationPositionsList_Key_OpenModMass_Key_PsmId != null ) {
    				List<Map.Entry<Double,List<WebserviceResponse_PSM_OpenModItem_PositionItem>>> openModificationMassesMapEntriesList = new ArrayList<>( openModificationPositionsList_Key_OpenModMass_For_PsmId.entrySet() );
    				Collections.sort(openModificationMassesMapEntriesList, new Comparator<Map.Entry<Double,List<WebserviceResponse_PSM_OpenModItem_PositionItem>>>() {

						@Override
						public int compare(Entry<Double, List<WebserviceResponse_PSM_OpenModItem_PositionItem>> o1, Entry<Double, List<WebserviceResponse_PSM_OpenModItem_PositionItem>> o2) {
							if ( o1.getKey() < o2.getKey() )
								return -1;
							if ( o1.getKey() > o2.getKey() )
								return 1;
							return 0;
						}
					});
    				List<WebserviceResponse_PSM_OpenModItem> openModificationMassAndPositionsList = new ArrayList<>( openModificationMassesMapEntriesList.size() );

    				for ( Map.Entry<Double,List<WebserviceResponse_PSM_OpenModItem_PositionItem>> mapEntry : openModificationMassesMapEntriesList ) {
    					
    					WebserviceResponse_PSM_OpenModItem webserviceResponse_PSM_OpenModItem = new WebserviceResponse_PSM_OpenModItem();
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
	 * Root object for JSON request
	 * 
	 * This is the representation that the Javascript code uses
	 *
	 */
	public static class WebserviceRequestRoot {
	
		private Integer projectSearchId;
		private List<Long> psmIds_Include; // Optional
		private List<Long> psmIds_Exclude; // Optional - Not Currently Used
		private Integer reportedPeptideId; // Optional
		private Integer searchSubGroupId;  // Optional
		private SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId;
		private List<Integer> psmAnnotationTypeIdsForSorting;
		
		public Integer getReportedPeptideId() {
			return reportedPeptideId;
		}
	
		public void setReportedPeptideId(Integer reportedPeptideId) {
			this.reportedPeptideId = reportedPeptideId;
		}
	
		public Integer getProjectSearchId() {
			return projectSearchId;
		}
	
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
	
		public SearchDataLookupParams_For_Single_ProjectSearchId getSearchDataLookupParams_For_Single_ProjectSearchId() {
			return searchDataLookupParams_For_Single_ProjectSearchId;
		}
	
		public void setSearchDataLookupParams_For_Single_ProjectSearchId(
				SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId) {
			this.searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchId;
		}
	
		public List<Integer> getPsmAnnotationTypeIdsForSorting() {
			return psmAnnotationTypeIdsForSorting;
		}
	
		public void setPsmAnnotationTypeIdsForSorting(List<Integer> psmAnnotationTypeIdsForSorting) {
			this.psmAnnotationTypeIdsForSorting = psmAnnotationTypeIdsForSorting;
		}

		public List<Long> getPsmIds_Include() {
			return psmIds_Include;
		}

		public void setPsmIds_Include(List<Long> psmIds_Include) {
			this.psmIds_Include = psmIds_Include;
		}

		public List<Long> getPsmIds_Exclude() {
			return psmIds_Exclude;
		}

		public void setPsmIds_Exclude(List<Long> psmIds_Exclude) {
			this.psmIds_Exclude = psmIds_Exclude;
		}

		public Integer getSearchSubGroupId() {
			return searchSubGroupId;
		}

		public void setSearchSubGroupId(Integer searchSubGroupId) {
			this.searchSubGroupId = searchSubGroupId;
		}
	
	
	}

    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    	
    	List<WebserviceResponse_PSM_Item> resultList;
    	
    	boolean searchHasScanData;
    	boolean search_hasScanFilenames;
		boolean search_hasIsotopeLabel;
		boolean search_anyPsmHas_DynamicModifications;
		boolean search_anyPsmHas_OpenModifications;
		boolean search_anyPsmHas_ReporterIons;
		
		
		public List<WebserviceResponse_PSM_Item> getResultList() {
			return resultList;
		}
		public boolean isSearchHasScanData() {
			return searchHasScanData;
		}
		public boolean isSearch_hasScanFilenames() {
			return search_hasScanFilenames;
		}
		public boolean isSearch_hasIsotopeLabel() {
			return search_hasIsotopeLabel;
		}
		public boolean isSearch_anyPsmHas_DynamicModifications() {
			return search_anyPsmHas_DynamicModifications;
		}
		public boolean isSearch_anyPsmHas_ReporterIons() {
			return search_anyPsmHas_ReporterIons;
		}
		public boolean isSearch_anyPsmHas_OpenModifications() {
			return search_anyPsmHas_OpenModifications;
		}
		

    }


    /**
     * 
     *
     */
    public static class WebserviceResponse_PSM_Item {

    	private long psmId;
    	private int charge;
    	private int scanNumber;
    	private String scanFilename;
    	private int searchId;

    	private Float retentionTimeSeconds;
    	private Double precursor_M_Over_Z;

    	private List<BigDecimal> reporterIonMassList;
    	private List<WebserviceResponse_PSM_OpenModItem> openModificationMassAndPositionsList;

    	private boolean hasReporterIons;
    	private boolean hasOpenModifications;
    	
    	private Map<Integer, AnnotationDataItem_ForPage> psmAnnotationMap;
    	
		public long getPsmId() {
			return psmId;
		}
		public void setPsmId(long psmId) {
			this.psmId = psmId;
		}
		public int getCharge() {
			return charge;
		}
		public void setCharge(int charge) {
			this.charge = charge;
		}
		public int getScanNumber() {
			return scanNumber;
		}
		public void setScanNumber(int scanNumber) {
			this.scanNumber = scanNumber;
		}
		public String getScanFilename() {
			return scanFilename;
		}
		public void setScanFilename(String scanFilename) {
			this.scanFilename = scanFilename;
		}
		public int getSearchId() {
			return searchId;
		}
		public void setSearchId(int searchId) {
			this.searchId = searchId;
		}
		public Float getRetentionTimeSeconds() {
			return retentionTimeSeconds;
		}
		public void setRetentionTimeSeconds(Float retentionTimeSeconds) {
			this.retentionTimeSeconds = retentionTimeSeconds;
		}
		public Double getPrecursor_M_Over_Z() {
			return precursor_M_Over_Z;
		}
		public void setPrecursor_M_Over_Z(Double precursor_M_Over_Z) {
			this.precursor_M_Over_Z = precursor_M_Over_Z;
		}
		public List<BigDecimal> getReporterIonMassList() {
			return reporterIonMassList;
		}
		public void setReporterIonMassList(List<BigDecimal> reporterIonMassList) {
			this.reporterIonMassList = reporterIonMassList;
		}
		public boolean isHasReporterIons() {
			return hasReporterIons;
		}
		public void setHasReporterIons(boolean hasReporterIons) {
			this.hasReporterIons = hasReporterIons;
		}
		public boolean isHasOpenModifications() {
			return hasOpenModifications;
		}
		public void setHasOpenModifications(boolean hasOpenModifications) {
			this.hasOpenModifications = hasOpenModifications;
		}
		public Map<Integer, AnnotationDataItem_ForPage> getPsmAnnotationMap() {
			return psmAnnotationMap;
		}
		public void setPsmAnnotationMap(Map<Integer, AnnotationDataItem_ForPage> psmAnnotationMap) {
			this.psmAnnotationMap = psmAnnotationMap;
		}
		public List<WebserviceResponse_PSM_OpenModItem> getOpenModificationMassAndPositionsList() {
			return openModificationMassAndPositionsList;
		}
		public void setOpenModificationMassAndPositionsList(
				List<WebserviceResponse_PSM_OpenModItem> openModificationMassAndPositionsList) {
			this.openModificationMassAndPositionsList = openModificationMassAndPositionsList;
		}
    }
    

    /**
     * 
     *
     */
    public static class WebserviceResponse_PSM_OpenModItem {

    	private double openModMass;
    	private List<WebserviceResponse_PSM_OpenModItem_PositionItem> positionEntries_Optional;
    	
		public double getOpenModMass() {
			return openModMass;
		}
		public List<WebserviceResponse_PSM_OpenModItem_PositionItem> getPositionEntries_Optional() {
			return positionEntries_Optional;
		}
    }

    /**
     * 
     *
     */
    public static class WebserviceResponse_PSM_OpenModItem_PositionItem {

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


