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
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.dto.PsmDynamicModificationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationDTO;
import org.yeastrc.limelight.limelight_shared.dto.StaticModDTO;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_Utils;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValues_Factory;
import org.yeastrc.limelight.limelight_webapp.searchers_results.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PeptideSequenceStringsForSearchIdReportedPeptideId_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services.ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_ScanNumbers_SpectralStorageWebserviceIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher.PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry;
import org.yeastrc.limelight.limelight_webapp.searchers.Psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher.Psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers.SpectralStorageAPIKeyForSearchId_Searcher.SpectralStorageAPIKeyForSearchId_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.SpectralStorageAPIKeyForSearchId_Searcher.SpectralStorageAPIKeyForSearchId_Searcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.OpenModificationMasses_PsmLevel_ForPsmIds_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PeptideSequenceStringsForSearchIdReportedPeptideIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmDynamicModification_For_PsmIdList_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.Psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SpectralStorageAPIKeyForSearchId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.StaticModDTOForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.Gzip_ByteArray_To_ByteArray_IF;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.PSMMassCalculator;
import org.yeastrc.limelight.limelight_webapp.web_utils.PSMMassCalculator.PSMMassCalculatorParams;
import org.yeastrc.limelight.limelight_webapp.web_utils.PSMMassCalculator.PSMMassCalculator_DynamicOpenModificationMass;
import org.yeastrc.limelight.limelight_webapp.web_utils.PSMMassCalculator.PSMMassCalculator_PeptideSequence;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanDataFromScanNumbers_IncludeParentScans;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_ExcludeReturnScanPeakData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScan_SubResponse;


/**
 * 
 * !!!  WARNING:  Webservice Response is CACHED  !!!!
 * 
 * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
 * 
 * 
 * 
 * Compute PSM PPM Error Per Reported Peptide Id for Project Search ID, and Search Criteria
 *
 */
@RestController
public class Psm_PPM_Error_Data_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController 

implements
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
  
	private static final Logger log = LoggerFactory.getLogger( Psm_PPM_Error_Data_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController.class );

	/**
	 * Path for this Controller.  !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
	 */
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.PSM_PPM_ERROR_DATA_PER_REPORTED_PEPTIDE_ID_FOR_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0001;
	
	/**
	 * Path, updated for use by Cached Response Mgmt ( Cached_WebserviceResponse_Management )
	 */
	private static final String CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT = Cached_WebserviceResponse_Management_Utils.translate_ControllerPath_For_CachedResponseMgmt( CONTROLLER_PATH );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private Cached_WebserviceResponse_Management_IF cached_WebserviceResponse_Management;

	@Autowired
	private Gzip_ByteArray_To_ByteArray_IF gzip_ByteArray_To_ByteArray;
	
	@Autowired
	private RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF restControllerUtils__Request_Accept_GZip_Response_Set_GZip;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;

	@Autowired
	private Psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher_IF psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher;

    @Autowired
    private Call_Get_ScanNumbers_SpectralStorageWebserviceIF call_Get_ScanNumbers_SpectralStorageWebservice;
    
    @Autowired
    private SpectralStorageAPIKeyForSearchId_SearcherIF spectralStorageAPIKeyForSearchId_Searcher;

    @Autowired
    private Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice;

	@Autowired
	private SearcherCutoffValues_Factory searcherCutoffValuesRootLevel_Factory;
	
	@Autowired
	private StaticModDTOForSearchIdSearcherIF staticModDTOForSearchIdSearcher;
	
	@Autowired
	private DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF dynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher;

	@Autowired
	private ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service;
	
	@Autowired
	private PeptideSequenceStringsForSearchIdReportedPeptideIdsSearcherIF peptideSequenceStringsForSearchIdReportedPeptideIdsSearcher;

	@Autowired
	private PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_IF psmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher;
	
	@Autowired
	private PsmDynamicModification_For_PsmIdList_Searcher_IF psmDynamicModification_For_PsmIdList_Searcher;

	@Autowired
	private OpenModificationMasses_PsmLevel_ForPsmIds_SearcherIF openModificationMasses_PsmLevel_ForPsmIds_Searcher;
	
	@Autowired
	private PSMMassCalculator psmMassCalculator;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Psm_PPM_Error_Data_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController() {
		super();
//		log.warn( "constructor no params called" );
	}

	/* 
	 * Spring LifeCycle Method
	 * 
	 * (non-Javadoc)
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		try {
			cached_WebserviceResponse_Management.registerControllerPathForCachedResponse_RequiredToCallAtWebappStartup( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, this );
			
		} catch (Exception e) {
			String msg = "In afterPropertiesSet(): Exception in processing";
			log.error(msg);
			throw e;
		}
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
					+ CONTROLLER_PATH
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod(
    		
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

    		WebserviceRequest webserviceRequest =
    				unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		Integer projectSearchId = webserviceRequest.projectSearchId;
   			List<Integer> reportedPeptideIds = webserviceRequest.reportedPeptideIds;  // OPTIONAL
   			

    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		//  Allow reportedPeptideIds.isEmpty() 
//    		if ( reportedPeptideIds != null && reportedPeptideIds.isEmpty() ) {
//    			//  Is populated but is empty so reject
//    			log.warn( "reportedPeptideIds is empty" );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
			if ( webserviceRequest.searchDataLookupParams_For_Single_ProjectSearchId == null ) {
				String msg = "No Search Criteria: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

    		List<Integer> projectSearchIdsForValidate = new ArrayList<>( 1 );
    		projectSearchIdsForValidate.add( projectSearchId );

    		////////////////
    		
    		//  AUTH - validate access
    		
    		//  throws an exception if access is not valid that is turned into a webservice response by Spring
    		
    		//  Comment out result since not use it
    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    		validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIdsForValidate, httpServletRequest );
    		
//    		List<Integer> projectIdsForProjectSearchIds = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds();
    		
    		////////////////

    		{ // Return cached value if available

    			boolean accept_GZIP = restControllerUtils__Request_Accept_GZip_Response_Set_GZip.does_HttpServletRequest_Accept_GZip( httpServletRequest );
    			
    			byte[] cachedResponse = cached_WebserviceResponse_Management.getCachedResponse( accept_GZIP, CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, this );
    			
    			if ( cachedResponse != null ) {
    				
    				if ( accept_GZIP ) {
    					restControllerUtils__Request_Accept_GZip_Response_Set_GZip.set_GZIP_On_HttpServletResponse( httpServletResponse );
    				}
    				
    				return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( cachedResponse );
    			}
    		}
    		
    		Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
			if ( searchId == null ) {
				String msg = "No searchId for projectSearchId: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = 
					searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);
			
			Psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher_Result psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher_Result =
					psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher.get_Psm_RandomRecordForSearchId_ContainsSpecificValues(searchId);
			
			

			if ( ( ! psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher_Result.isPrecursor_m_z__NotNull() )
					|| ( ! psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher_Result.isPrecursor_retention_time__NotNull() ) ) {
				
				if  ( ! searchFlagsForSearchIdSearcher_Result_Item.isHasScanData() ) {

					// !!!!!! NO M/Z Data for this request ( or PSM has M/Z but not Retention Time ) so return

		    		WebserviceResult result = new WebserviceResult();
		    		result.noDataAvailable = true;
		    		
		    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( result );

		    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON_UTF8).body( responseAsJSON ); // EARLY RETURN  !!!!!!!!!
				}
			}
			
			Map<Integer, Map<Integer, SingleScan_SubResponse>> singleScan_SubResponse_Map_Key_ScanNumber_Map_Key_SearchScanFileId = null;
			
			
			if ( ( ! psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher_Result.isPrecursor_m_z__NotNull() )
					|| ( ! psm_RandomRecordForSearchId_ContainsSpecificValues_Searcher_Result.isPrecursor_retention_time__NotNull() ) ) {
				
				//  No M/Z or Retention Time on PSM so load scan data from Spectral Storage Service (Spectr)

				singleScan_SubResponse_Map_Key_ScanNumber_Map_Key_SearchScanFileId = new HashMap<>();

	            SpectralStorageAPIKeyForSearchId_Searcher_Result spectralStorageAPIKeyForSearchId_Searcher_Result = 
	            		spectralStorageAPIKeyForSearchId_Searcher.get_SearchScanFileId_SpectralStorageAPIKey_Entries_ForSearchId( searchId );

	            for( SpectralStorageAPIKeyForSearchId_Searcher_Result_Item resultItem: spectralStorageAPIKeyForSearchId_Searcher_Result.getResultItems() ) {

	                Integer searchScanFileId = resultItem.getSearchScanFileId();

	                String scanFileAPIKey = resultItem.getSpectralStorageAPIKey();
	                if ( StringUtils.isEmpty( scanFileAPIKey ) ) {
	                    String msg = "Got empty scanFileAPIKey for search id: " + searchId;
	                    log.error( msg );
	                    throw new LimelightInternalErrorException( msg );
	                }

	        		List<Integer> scanNumbers = call_Get_ScanNumbers_SpectralStorageWebservice.getScanNumbersFromSpectralStorageService(null, null, scanFileAPIKey);
	                
	                List<SingleScan_SubResponse> scanDataList_FromSpectralStorageService =
	                		call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice.getScanDataFromSpectralStorageService(
	                				scanNumbers, 
	                				Get_ScanDataFromScanNumbers_IncludeParentScans.NO, // get_ScanDataFromScanNumbers_IncludeParentScans, 
	                				Get_ScanData_ExcludeReturnScanPeakData.YES, // excludeReturnScanPeakData,
	                				scanFileAPIKey);
	                
	                Map<Integer, SingleScan_SubResponse> singleScan_SubResponse_Map_Key_ScanNumber_MapEntry = new HashMap<>( scanDataList_FromSpectralStorageService.size() );
	                singleScan_SubResponse_Map_Key_ScanNumber_Map_Key_SearchScanFileId.put(searchScanFileId, singleScan_SubResponse_Map_Key_ScanNumber_MapEntry);
	                
	                for ( SingleScan_SubResponse singleScan_SubResponse :  scanDataList_FromSpectralStorageService ) {
	                	
	                	singleScan_SubResponse_Map_Key_ScanNumber_MapEntry.put( singleScan_SubResponse.getScanNumber(), singleScan_SubResponse );
	                }
	            }
			}
			
			
			List<StaticModDTO> staticModDTOList = staticModDTOForSearchIdSearcher.getListForSearchId(searchId);
			
		
    		Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
    		projectSearchIdMapToSearchId.put( projectSearchId, searchId );
    		
    		SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel =
    				searcherCutoffValuesRootLevel_Factory
    				.createSearcherCutoffValuesSearchLevel(
    						projectSearchIdMapToSearchId, 
    						webserviceRequest.searchDataLookupParams_For_Single_ProjectSearchId );

   			final int minimumNumberOfPSMsPerReportedPeptide = 1; // standard minimum # PSMs 

   			if ( reportedPeptideIds == null ) {
   				
   				//  No reportedPeptideIds passed in so get them

   				//  Get initial Reported Peptide Id list (maybe include Num PSMs) based on search criteria

   				List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> peptideMinimalObjectsList = 
   						reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList( searchId, searcherCutoffValuesSearchLevel, minimumNumberOfPSMsPerReportedPeptide );

   				reportedPeptideIds = new ArrayList<>( peptideMinimalObjectsList.size() );

   				for ( ReportedPeptide_MinimalData_List_FromSearcher_Entry peptideMinimalObject : peptideMinimalObjectsList ) {

   					Integer reportedPeptideId = peptideMinimalObject.getReportedPeptideId();
   					reportedPeptideIds.add( reportedPeptideId );
   				}
   			}
   			
   			List<WebserviceResult_Entry> reportedPeptideId_psm_PPM_Error_DataList_List = null;

			List<WebserviceResult_PerPSM_Entry> psms = null;
			
   			if ( reportedPeptideIds.isEmpty() ) {
   				
   				reportedPeptideId_psm_PPM_Error_DataList_List = new ArrayList<>();
   				psms = new ArrayList<>();
   				
   			} else {

   				Map<Integer, PSMMassCalculator_PeptideSequence> psmMassCalculator_PeptideSequence_Map_Key_ReportedPeptideId = new HashMap<>();
   				{
   					List<PeptideSequenceStringsForSearchIdReportedPeptideId_Item> peptideSequenceStringsForSearchIdReportedPeptideId_Item_List =
   							peptideSequenceStringsForSearchIdReportedPeptideIdsSearcher.getPeptideSequenceStringsForSearchIdReportedPeptideIds(searchId, reportedPeptideIds);

   					for ( PeptideSequenceStringsForSearchIdReportedPeptideId_Item item : peptideSequenceStringsForSearchIdReportedPeptideId_Item_List ) {
   						

   						String peptideSequence_Original = item.getPeptideSequence();
   						
   						//  remove 'X' from peptideSequence
   						//    since call to  PeptideMassCalculator.getInstance().getMassForPeptide( peptide, MassType.MONOISOTOPIC ); with sequence with 'X' it throws Exception
   						
   						String peptideSequence_No_X_Characters = peptideSequence_Original.replaceAll( "X", "" );
   						
//   						if ( peptideSequence_Original.length() != peptideSequence_No_X_Characters.length() ) {
//   							
//   							String msg = "Removed 'X' characters from Peptide before computing PSM Mass since 'X' characters cause it to throw an Exception.  projectSearchId: "
//   									+ projectSearchId
//   									+ ", searchId: " + searchId
//   									+ ", projectIdsForProjectSearchIds: " + StringUtils.join( projectIdsForProjectSearchIds, ", " )
//   									+ ", ReportedPeptideId: '" + item.getReportedPeptideId()
//   									+ ", PeptideId: '" + item.getPeptideId()
//   									+ ", peptideSequence_Original: '" + peptideSequence_Original + "'"
//   									+ ", peptideSequence_No_X_Characters: '" + peptideSequence_No_X_Characters + "'";
//   							log.warn(msg);
//   						}
   						
   						
   						PSMMassCalculator_PeptideSequence psmMassCalculator_PeptideSequence = new PSMMassCalculator_PeptideSequence();
   						psmMassCalculator_PeptideSequence.setSequence( peptideSequence_No_X_Characters );
   						psmMassCalculator_PeptideSequence_Map_Key_ReportedPeptideId.put( item.getReportedPeptideId(), psmMassCalculator_PeptideSequence );
   					}
   				}

   				DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result dynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result =
   						dynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher.getDynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIds(searchId, reportedPeptideIds);



   				reportedPeptideId_psm_PPM_Error_DataList_List = new ArrayList<>( reportedPeptideIds.size() );

   				for ( Integer reportedPeptideId : reportedPeptideIds ) {


   					PSMMassCalculator_PeptideSequence psmMassCalculator_PeptideSequence = psmMassCalculator_PeptideSequence_Map_Key_ReportedPeptideId.get( reportedPeptideId );
   					if ( psmMassCalculator_PeptideSequence == null ) {
   						String msg = "psmMassCalculator_PeptideSequence_Map_Key_ReportedPeptideId.get( reportedPeptideId ); returned null. reportedPeptideId: " + reportedPeptideId;
   						log.error(msg);
   						throw new LimelightInternalErrorException(msg);
   					}

   					List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item> dynamicModifications_For_ReportedPeptideId =
   							dynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result.getResults_Key_ReportedPeptideId().get(reportedPeptideId);


   					//  Process PSMs for Reported Peptide Id

   					List<PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry> psmTblData_List = 
   							psmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher
   							.getPsmTblData_ForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );


   					Map<Long, Map<Integer, Double>> dynamicModificationMass_Map_Key_Position_Key_PsmId = new HashMap<>();
   					Map<Long, Double> dynamicModificationMass_N_Term_Map_Key_PsmId = new HashMap<>();
   					Map<Long, Double> dynamicModificationMass_C_Term_Map_Key_PsmId = new HashMap<>();

   					if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_DynamicModifications() ){ //  Dynamic/Variable Mod masses.   PSM Mod mass overrides Reported Peptide level Mod mass at same position

   						List<Long> psmIds_Containing_DynamicModification_Masses = new ArrayList<>( psmTblData_List.size() );

   						for ( PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry entry : psmTblData_List ) {
   							if ( entry.isHasModifications() ) {
   								psmIds_Containing_DynamicModification_Masses.add( entry.getPsmId() );
   							}
   						}

   						if ( ! psmIds_Containing_DynamicModification_Masses.isEmpty() ) {

   							List<PsmDynamicModificationDTO> dbResultList = 
   									psmDynamicModification_For_PsmIdList_Searcher.getPsmDynamicModification_For_PsmIdList(psmIds_Containing_DynamicModification_Masses);

   							for ( PsmDynamicModificationDTO dbResultEntry : dbResultList ) {
   								Long psmId = dbResultEntry.getPsmId();
   								Integer position = dbResultEntry.getPosition();

   								Double mass = dbResultEntry.getMass();

   								if ( dbResultEntry.isIs_N_Terminal() ) {

   									Double dynamicModificationMass = dynamicModificationMass_N_Term_Map_Key_PsmId.get(psmId);
   									if ( dynamicModificationMass != null ) {
   										//  existing mass so add to it
   										dynamicModificationMass_N_Term_Map_Key_PsmId.put(psmId, dynamicModificationMass.doubleValue() + mass.doubleValue() );
   									} else {
   										//  new mass so save it
   										dynamicModificationMass_N_Term_Map_Key_PsmId.put(psmId, mass);
   									}

   								} else if ( dbResultEntry.isIs_C_Terminal() ) {

   									Double dynamicModificationMass = dynamicModificationMass_C_Term_Map_Key_PsmId.get(psmId);
   									if ( dynamicModificationMass != null ) {
   										//  existing mass so add to it
   										dynamicModificationMass_C_Term_Map_Key_PsmId.put(psmId, dynamicModificationMass.doubleValue() + mass.doubleValue() );
   									} else {
   										//  new mass so save it
   										dynamicModificationMass_C_Term_Map_Key_PsmId.put(psmId, mass);
   									}

   								} else {

   									Map<Integer, Double> dynamicModificationMass_Map_Key_Position = dynamicModificationMass_Map_Key_Position_Key_PsmId.get(psmId);
   									if ( dynamicModificationMass_Map_Key_Position == null ) {
   										dynamicModificationMass_Map_Key_Position = new HashMap<>();
   										dynamicModificationMass_Map_Key_Position_Key_PsmId.put(psmId, dynamicModificationMass_Map_Key_Position);
   									}

   									Double dynamicModificationMass = dynamicModificationMass_Map_Key_Position.get(position);
   									if ( dynamicModificationMass != null ) {
   										dynamicModificationMass_Map_Key_Position.put(position, dynamicModificationMass.doubleValue() + mass.doubleValue() );
   									} else {
   										dynamicModificationMass_Map_Key_Position.put(position, mass);
   									}
   								}
   							}
   						}
   					}

   					Map<Long, Double> openModificationMass_Map_Key_PsmId = new HashMap<>();

   					if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_OpenModifications() ) { 
   						//  Search has PSM with Open Mods so retrieve them. Not on all PSMs

   						List<Long> psmIds_Containing_OpenModification_Masses = new ArrayList<>( psmTblData_List.size() );

   						for ( PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry entry : psmTblData_List ) {
   							if ( entry.isHasOpenModifications() ) {
   								psmIds_Containing_OpenModification_Masses.add( entry.getPsmId() );
   							}
   						}

   						if ( ! psmIds_Containing_OpenModification_Masses.isEmpty() ) {

   							List<PsmOpenModificationDTO> openModificationMassesSearcherResult = 
   									openModificationMasses_PsmLevel_ForPsmIds_Searcher
   									.get_OpenModificationMasses_PsmLevel_ForPsmIds( psmIds_Containing_OpenModification_Masses );

   							for ( PsmOpenModificationDTO psmOpenModificationDTO : openModificationMassesSearcherResult ) {
   								Long psmId =  psmOpenModificationDTO.getPsmId();
   								double mass = psmOpenModificationDTO.getMass();
   								Double openModificationMass_ExistingValue = openModificationMass_Map_Key_PsmId.get(psmId);
   								if ( openModificationMass_ExistingValue != null ) {
   									openModificationMass_Map_Key_PsmId.put(psmId, openModificationMass_ExistingValue.doubleValue() + mass );
   								} else {
   									openModificationMass_Map_Key_PsmId.put(psmId, mass );
   								}
   							}
   						}
   					}

   					psms = new ArrayList<>( psmTblData_List.size() );

   					for ( PsmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry psmTbl_dbEntry : psmTblData_List ) {

   						Long psmId = psmTbl_dbEntry.getPsmId();

   						List<PSMMassCalculator_DynamicOpenModificationMass> dynamicOpenModMasses = new ArrayList<>();

   						if ( ! openModificationMass_Map_Key_PsmId.isEmpty() ) { 
   							//  Open Mod mass
   							Double openModificationMass = openModificationMass_Map_Key_PsmId.get(psmId);
   							if ( openModificationMass != null ) {
   								PSMMassCalculator_DynamicOpenModificationMass entry = new PSMMassCalculator_DynamicOpenModificationMass();
   								entry.setMass(openModificationMass);
   								dynamicOpenModMasses.add(entry);
   							}
   						}
   						{ //  Dynamic/Variable Mod masses.   PSM Mod mass overrides Reported Peptide level Mod mass at same position

   							if ( dynamicModifications_For_ReportedPeptideId != null && ( ! dynamicModifications_For_ReportedPeptideId.isEmpty() ) ) {


   								Map<Integer, Double> dynamicModificationMass_Map_Key_Position_For_PsmId = null;

   								if ( ! dynamicModificationMass_Map_Key_Position_Key_PsmId.isEmpty() ) { 

   									dynamicModificationMass_Map_Key_Position_For_PsmId = dynamicModificationMass_Map_Key_Position_Key_PsmId.get( psmId );
   								}

   								for ( DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item dynamicModification_For_ReportedPeptideId : dynamicModifications_For_ReportedPeptideId ) {

   									double massToUse = dynamicModification_For_ReportedPeptideId.getMass();

   									if ( dynamicModification_For_ReportedPeptideId.isIs_N_Terminal() ) {

   										Double dynamicModificationMass_N_Term_For_PsmId = dynamicModificationMass_N_Term_Map_Key_PsmId.get( psmId );
   										if ( dynamicModificationMass_N_Term_For_PsmId != null ) {
   											massToUse = dynamicModificationMass_N_Term_For_PsmId.doubleValue();
   										}

   									} else if ( dynamicModification_For_ReportedPeptideId.isIs_C_Terminal() ) {

   										Double dynamicModificationMass_C_Term_For_PsmId = dynamicModificationMass_C_Term_Map_Key_PsmId.get( psmId );
   										if ( dynamicModificationMass_C_Term_For_PsmId != null ) {
   											massToUse = dynamicModificationMass_C_Term_For_PsmId.doubleValue();
   										}

   									} else {

   										if ( dynamicModificationMass_Map_Key_Position_For_PsmId != null ) {
   											Double dynamicModificationMass_For_Position_For_PsmId = dynamicModificationMass_Map_Key_Position_For_PsmId.get(dynamicModification_For_ReportedPeptideId.getPosition());
   											if ( dynamicModificationMass_For_Position_For_PsmId != null ) {
   												//  Entry for PSM overrides entry for Reported Peptide
   												massToUse = dynamicModificationMass_For_Position_For_PsmId.doubleValue();
   											}
   										}
   									}

   									PSMMassCalculator_DynamicOpenModificationMass entry = new PSMMassCalculator_DynamicOpenModificationMass();
   									entry.setMass(massToUse);
   									dynamicOpenModMasses.add(entry);
   								}
   							}

   						}

   						Double precursorMZ = psmTbl_dbEntry.getPrecursor_M_Over_Z();
   						Float retentionTimeSeconds = psmTbl_dbEntry.getRetentionTimeSeconds();

   						if ( precursorMZ == null || retentionTimeSeconds == null ) {

   							//  Get precursorMZ and/or retentionTimeSeconds from Scan

   							Integer searchScanFileId = psmTbl_dbEntry.getSearchScanFileId();
   							if ( searchScanFileId == null ) {
   								String msg = "( psmTbl_dbEntry.getPrecursor_M_Over_Z() == null ) then ( psmTbl_dbEntry.getSearchScanFileId() == null ).  psmTbl_dbEntry.getPsmId(): " + psmTbl_dbEntry.getPsmId();
   								log.error(msg);
   								throw new LimelightInternalErrorException(msg);
   							}
   							if ( singleScan_SubResponse_Map_Key_ScanNumber_Map_Key_SearchScanFileId == null ) {
   								String msg = "( psmTbl_dbEntry.getPrecursor_M_Over_Z() == null ) then ( singleScan_SubResponse_Map_Key_ScanNumber_Map_Key_SearchScanFileId == null ) .  psmTbl_dbEntry.getPsmId(): " 
   										+ psmTbl_dbEntry.getPsmId()
   										+ ", searchId: " + searchId;
   								log.error(msg);
   								throw new LimelightInternalErrorException(msg);
   							}
   							Map<Integer, SingleScan_SubResponse> singleScan_SubResponse_Map_Key_ScanNumber_Map = singleScan_SubResponse_Map_Key_ScanNumber_Map_Key_SearchScanFileId.get( searchScanFileId );
   							if ( singleScan_SubResponse_Map_Key_ScanNumber_Map == null ) {
   								String msg = "singleScan_SubResponse_Map_Key_ScanNumber_Map_Key_SearchScanFileId.get( searchScanFileId ) returned null. searchScanFileId: " + searchScanFileId 
   										+ ", psmTbl_dbEntry.getPsmId(): " + psmTbl_dbEntry.getPsmId();
   								log.error(msg);
   								throw new LimelightInternalErrorException(msg);
   							}
   							SingleScan_SubResponse singleScan_SubResponse = singleScan_SubResponse_Map_Key_ScanNumber_Map.get( psmTbl_dbEntry.getScanNumber() );
   							if ( singleScan_SubResponse == null ) {
   								String msg = "singleScan_SubResponse_Map_Key_ScanNumber_Map.get( psmTbl_dbEntry.getScanNumber() ) returned null. psmTbl_dbEntry.getScanNumber(): " + psmTbl_dbEntry.getScanNumber()
   								+ ", searchScanFileId: " + searchScanFileId 
   								+ ", psmTbl_dbEntry.getPsmId(): " + psmTbl_dbEntry.getPsmId();
   								log.error(msg);
   								throw new LimelightInternalErrorException(msg);
   							}

   							if ( precursorMZ == null ) {
   								precursorMZ = singleScan_SubResponse.getPrecursor_M_Over_Z();
   							}
   							if ( retentionTimeSeconds == null ) {
   								retentionTimeSeconds = singleScan_SubResponse.getRetentionTime();
   							}
   						}

   						PSMMassCalculatorParams params = new PSMMassCalculatorParams();

   						params.setCharge( psmTbl_dbEntry.getCharge() );

   						params.setPrecursorMZ( precursorMZ );

   						params.setPeptideSequence( psmMassCalculator_PeptideSequence );

   						params.setLabel( null );

   						params.setDynamicOpenModMasses( dynamicOpenModMasses );

   						params.setStaticMods( staticModDTOList );

   						double ppmError = 0;
   								
   						try {
   							ppmError = psmMassCalculator.calculatePPMEstimateForPSM( params );
   						} catch ( Exception e ) {
   							String msg = "Exception thrown from psmMassCalculator.calculatePPMEstimateForPSM( params ); params.getPeptideSequence(): " + params.getPeptideSequence();
   							log.error(msg, e);
   							throw e;
   						}

   						WebserviceResult_PerPSM_Entry resultEntry = new WebserviceResult_PerPSM_Entry();
   						resultEntry.psmId = psmTbl_dbEntry.getPsmId();
   						resultEntry.ppmError = ppmError;
   						resultEntry.retentionTimeSeconds = retentionTimeSeconds;
   						resultEntry.precursor_M_Over_Z = precursorMZ;

   						psms.add(resultEntry);
   					}

   					WebserviceResult_Entry entry = new WebserviceResult_Entry();
   					entry.reportedPeptideId = reportedPeptideId;
   					entry.psms = psms;
   					reportedPeptideId_psm_PPM_Error_DataList_List.add( entry );
   				}
   			}
   			
    		WebserviceResult result = new WebserviceResult();
    		result.reportedPeptideId_psm_PPM_Error_DataList_List = reportedPeptideId_psm_PPM_Error_DataList_List;
    		
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( result );

    		
    		byte[] responseAsJSON_GZIPPED = gzip_ByteArray_To_ByteArray.gzip_ByteArray_To_ByteArray(responseAsJSON);
    		

			boolean accept_GZIP = restControllerUtils__Request_Accept_GZip_Response_Set_GZip.does_HttpServletRequest_Accept_GZip( httpServletRequest );
			

    		{ // Save cached value 
    			
    			cached_WebserviceResponse_Management.putCachedResponse_GZIPPED( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, responseAsJSON_GZIPPED, this );
    		}
    		
    		byte[] responseAsJSON_FINAL = responseAsJSON;
    		

			if ( accept_GZIP ) {
				restControllerUtils__Request_Accept_GZip_Response_Set_GZip.set_GZIP_On_HttpServletResponse( httpServletResponse );
				
				responseAsJSON_FINAL = responseAsJSON_GZIPPED;
			}
			
    		
    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON_UTF8).body( responseAsJSON_FINAL );

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
     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
     *
     */
    public static class WebserviceRequest {

    	private Integer projectSearchId;
    	private List<Integer> reportedPeptideIds;  // Optional
    	private SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId;
    	
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public void setSearchDataLookupParams_For_Single_ProjectSearchId(
				SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId) {
			this.searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchId;
		}
		public void setReportedPeptideIds(List<Integer> reportedPeptideIds) {
			this.reportedPeptideIds = reportedPeptideIds;
		}
    }
    
    /**
     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
     *
     */
    public static class WebserviceResult {
    	
    	boolean noDataAvailable;  // No M/Z or RT on PSM or no Scan Data Loaded
    	
    	List<WebserviceResult_Entry> reportedPeptideId_psm_PPM_Error_DataList_List;

		public boolean isNoDataAvailable() {
			return noDataAvailable;
		}
		public List<WebserviceResult_Entry> getReportedPeptideId_psm_PPM_Error_DataList_List() {
			return reportedPeptideId_psm_PPM_Error_DataList_List;
		}
    }

    /**
     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
     *
     */
    public static class WebserviceResult_Entry {
    	
    	int reportedPeptideId;
    	List<WebserviceResult_PerPSM_Entry> psms;
    	
		public int getReportedPeptideId() {
			return reportedPeptideId;
		}
		public List<WebserviceResult_PerPSM_Entry> getPsms() {
			return psms;
		}
    }

    /**
     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
     *
     */
    public static class WebserviceResult_PerPSM_Entry {
    	
    	long psmId;
    	double ppmError;
    	float retentionTimeSeconds;
    	double precursor_M_Over_Z;
    	
		public long getPsmId() {
			return psmId;
		}
		public double getPpmError() {
			return ppmError;
		}
		public float getRetentionTimeSeconds() {
			return retentionTimeSeconds;
		}
		public double getPrecursor_M_Over_Z() {
			return precursor_M_Over_Z;
		}
    }

}


