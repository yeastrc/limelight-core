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


import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.dto.PsmDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;
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
import org.yeastrc.limelight.limelight_webapp.searchers.PsmWebDisplaySearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchHasScanDataForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmWebDisplayWebServiceResult;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_request_objects.controller_request_root.PSM_List_RequestRoot;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_response_parts.PSM_Item_ForPSM_List;
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
	private SearchHasScanDataForSearchIdSearcherIF searchHasScanDataForSearchIdSearcher;

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
					+ AA_RestWSControllerPaths_Constants.PATH_PARAMETER_LABEL_WEBSERVICE_SYNC_TRACKING_PATH_ADDITION
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  psmList(

			@PathVariable(value = AA_RestWSControllerPaths_Constants.PATH_PARAMETER_LABEL_WEBSERVICE_SYNC_TRACKING) 
    		String webserviceSyncTracking,
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    	try {
//    		log.warn( "peptideView(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( webserviceSyncTracking );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs
    		
    		if ( postBody == null || postBody.length == 0 ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		PSM_List_RequestRoot webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, PSM_List_RequestRoot.class );

    		SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId = webserviceRequest.getSearchDataLookupParams_For_Single_ProjectSearchId();
    		List<Integer> psmAnnotationTypeIdsForSorting = webserviceRequest.getPsmAnnotationTypeIdsForSorting();
    				
    		if ( webserviceRequest.getReportedPeptideId() == null ) {
    			String msg = "reported peptide id is empty.";
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
			
			Boolean searchHasScanData = searchHasScanDataForSearchIdSearcher.getSearchHasScanDataForSearchId( searchId );
			if ( searchHasScanData == null ) {
				String msg = "No searchHasScanData for searchId: " + searchId;
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
    				psmWebDisplaySearcher.getPsmsWebDisplay( searchId, webserviceRequest.getReportedPeptideId(), searcherCutoffValuesSearchLevel );

    		Map<Integer, Map<Integer, SingleScan_SubResponse>> scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId = new HashMap<>();
			
    		if ( searchHasScanData ) {

    			//  Get Scan Info from Spectral Storage Service
    			
    			//   First get scan file ids and assoc scan numbers
    			
    			
    			Map<Integer, Set<Integer>> scanNumbers_KeyedOn_ScanFileId = new HashMap<>();

        		for ( PsmWebDisplayWebServiceResult psmWebDisplay : psmWebDisplayList ) {
        			
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
    		
    		List<PSM_Item_ForPSM_List> resultList = new ArrayList<>( psmWebDisplayList.size() );
    		
    		for ( PsmWebDisplayWebServiceResult psmWebDisplay : psmWebDisplayList ) {
    			
    			PSM_Item_ForPSM_List result = new PSM_Item_ForPSM_List();
    			result.setPsmId( psmWebDisplay.getPsmId() );
    			result.setSearchId( psmWebDisplay.getSearchId() );
    			result.setCharge( psmWebDisplay.getCharge() );
    			result.setScanNumber( psmWebDisplay.getScanNumber() );
    			result.setScanFilename( psmWebDisplay.getScanFilename() );
    			
    			if ( searchHasScanData ) {
    				
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
    			
    			Map<Integer, AnnotationDataItem_ForPage> psmAnnotationMap = new HashMap<>();
    			
    			//   TODO  Optimize this
    			{
    				//  Add in PSM Annotation data for Ann Type Display
    				{
    					//  Filterable Ann Types
    					List<PsmFilterableAnnotationDTO> psmFilterableAnnotationDTOList =
    							psm_FilterableAnnotationData_Searcher
    							.getPsmFilterableAnnotationDTOList( 
    									psmWebDisplay.getPsmId(), annTypeIdsToRetrieve );

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
    		

    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.resultList = resultList;
    		webserviceResult.searchHasScanData = searchHasScanData;

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
     * 
     *
     */
    public static class WebserviceResult {
    	List<PSM_Item_ForPSM_List> resultList;
    	boolean searchHasScanData;

		public List<PSM_Item_ForPSM_List> getResultList() {
			return resultList;
		}

		public void setResultList(List<PSM_Item_ForPSM_List> resultList) {
			this.resultList = resultList;
		}

		public boolean isSearchHasScanData() {
			return searchHasScanData;
		}

		public void setSearchHasScanData(boolean searchHasScanData) {
			this.searchHasScanData = searchHasScanData;
		}


    }
}


