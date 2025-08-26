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
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;

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
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;
import org.yeastrc.limelight.limelight_shared.exceptions.LimelightShardCodeDatabaseContentErrorException;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_Utils;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.parallelstream_java_processing_enable_configuration.ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_IF;
import org.yeastrc.limelight.limelight_webapp.parallelstream_java_processing_enable_configuration.ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup.ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValues_Factory;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services.ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher.PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_ResultEntry;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchScanFile_For_SearchIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.Gzip_ByteArray_To_ByteArray_IF;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * 
 * !!!  WARNING:  Webservice Response is CACHED  !!!!
 * 
 * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
 * 
 * 
 * 
 * Retrieve PSM data from psm_tbl (all fields) Per Reported Peptide Id for Project Search ID, and Search Criteria
 * 
 * Excludes Decoy PSMs
 * Includes Independent Decoy PSMs
 * 
 * 
 * 
 * NOTE: This uses 'searchScanFile_For_SearchIds_Searcher' to get the search_scan_file_id when it is null on the psm_tbl but have exactly one search_scan_file_tbl record for search.
 *          A LOT of other code in Limelight webapp needs to be changed to make this work.
 *
 */
@RestController
public class PsmTable_Data_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController 

implements
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
  
	private static final Logger log = LoggerFactory.getLogger( PsmTable_Data_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController.class );

	/**
	 * Path for this Controller.  !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
	 */
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.PSM_TABLE_DATA_PER_REPORTED_PEPTIDE_ID_FOR_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0003;
	
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
	private SearchScanFile_For_SearchIds_Searcher_IF searchScanFile_For_SearchIds_Searcher;

	@Autowired
	private SearcherCutoffValues_Factory searcherCutoffValuesRootLevel_Factory;

	@Autowired
	private ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service;

	@Autowired
	private PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcherIF psmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher;

	@Autowired
	private PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_IF psmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	@Autowired
	private ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_IF parallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup;

	private boolean parallelStream_DefaultThreadPool_Java_Processing_Enabled_True;

	
	
    /**
	 * 
	 */
	public PsmTable_Data_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController() {
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

		try {
			{
				ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response response = 
						parallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup.get_ParallelStream_Java_Processing_Enable_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup();
				
				this.parallelStream_DefaultThreadPool_Java_Processing_Enabled_True = response.isParallelStream_DefaultThreadPool_Java_Processing_Enabled_True();
			}
			
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
    		//  Remove since reportedPeptideIds can be empty
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
//    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    		validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIdsForValidate, httpServletRequest );
    		
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
			
    		Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
    		projectSearchIdMapToSearchId.put( projectSearchId, searchId );
    		
    		SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel =
    				searcherCutoffValuesRootLevel_Factory
    				.createSearcherCutoffValuesSearchLevel(
    						projectSearchIdMapToSearchId, 
    						webserviceRequest.searchDataLookupParams_For_Single_ProjectSearchId );
    		
    		
    		Set<Integer> searchScanFileIds_From_SearchScanFileTable = new HashSet<>();

    		Integer searchScanFileId_From_SearchScanFileTable_IfExactlyOneEntry = null; // Populated if EXACTLY 1 entry
    		
    		{
	    		List<Integer> searchIds = new ArrayList<>(1);
	    		searchIds.add( searchId );
	    		
	    		List<SearchScanFileDTO> searchScanFileDTO_For_SearchId_List = 
	    				searchScanFile_For_SearchIds_Searcher.getSearchScanFile_For_SearchIds(searchIds);
	    		
	    		for ( SearchScanFileDTO entry : searchScanFileDTO_For_SearchId_List ) {
	    			searchScanFileIds_From_SearchScanFileTable.add( entry.getId() );
	    		}
	    		
	    		if ( searchScanFileIds_From_SearchScanFileTable.size() == 1 ) {
	    			
	    			searchScanFileId_From_SearchScanFileTable_IfExactlyOneEntry = 
	    					searchScanFileIds_From_SearchScanFileTable.iterator().next();
	    		}
    		}
    		

    		///
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
    		
   			Collections.sort( reportedPeptideIds );
   			
    		//////////////////
    		
    		//   Start Retrieve ALL PSM Ids for all reportedPeptideIds
    		
   			ConcurrentHashMap<Integer, List<Long>> psmIdsList_Map_Key_ReportedPeptideId = new ConcurrentHashMap<>( reportedPeptideIds.size() );
   			

        	{
        		AtomicBoolean anyThrownInsideStreamProcessing = new AtomicBoolean(false);
        		
        		List<Throwable> thrownInsideStream_List = Collections.synchronizedList(new ArrayList<>());

	    		if ( this.parallelStream_DefaultThreadPool_Java_Processing_Enabled_True ) {
	
	    			//  YES execute in parallel
	
	    			reportedPeptideIds.parallelStream().forEach( reportedPeptideId -> { 

        				try {

        	    			List<Long> psmIds =
        	    					psmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher.getPsmIdsForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );
        	    			
        	    			psmIdsList_Map_Key_ReportedPeptideId.put( reportedPeptideId, psmIds );

        				} catch (Throwable t) {
        					
        					log.error( "Fail processing reportedPeptideIds: reportedPeptideId" + reportedPeptideId, t);

        					anyThrownInsideStreamProcessing.set(true);
        					
        					thrownInsideStream_List.add(t);
        				}
        			});
        			
        		} else {
        			
        			//  NOT execute in parallel

        			reportedPeptideIds.forEach( reportedPeptideId -> {
        			
        				try {

        	    			List<Long> psmIds =
        	    					psmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher.getPsmIdsForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );
        	    			
        	    			psmIdsList_Map_Key_ReportedPeptideId.put( reportedPeptideId, psmIds );

        				} catch (Throwable t) {
        					
        					log.error( "Fail processing reportedPeptideIds.  Rethrow in class LimelightInternalErrorException: reportedPeptideId" + reportedPeptideId, t);
        					
        					anyThrownInsideStreamProcessing.set(true);
        					
        					thrownInsideStream_List.add(t);
        					
        					throw new LimelightInternalErrorException( t );
        				}
        			});
        		}

        		if ( anyThrownInsideStreamProcessing.get() ) {
        			
        			throw new LimelightInternalErrorException( "At least 1 exception processing reportedPeptideIds 'Retrieve ALL PSM Ids for all reportedPeptideIds' " );
        		}
        	}
    		

    		//////////////////
    		
    		//   Retrieve ALL PSM data for all PSM Ids
    		
   			ConcurrentHashMap<Integer, Internal_Single_ReportedPeptide_AndIts_PSMs_FromDB> internal_Single_ReportedPeptide_AndIts_PSMs_FromDB_Map_Key_ReportedPeptideId = new ConcurrentHashMap<>( reportedPeptideIds.size() );
   			

        	{
        		AtomicBoolean anyThrownInsideStreamProcessing = new AtomicBoolean(false);
        		
        		List<Throwable> thrownInsideStream_List = Collections.synchronizedList(new ArrayList<>());

	    		if ( this.parallelStream_DefaultThreadPool_Java_Processing_Enabled_True ) {
	
	    			//  YES execute in parallel
	
	    			reportedPeptideIds.parallelStream().forEach( reportedPeptideId -> { 

        				try {
        					List<Long> psmIds = psmIdsList_Map_Key_ReportedPeptideId.get( reportedPeptideId );
        					
        					if ( psmIds == null ) {
        						String msg = "psmIdsList_Map_Key_ReportedPeptideId.get( reportedPeptideId ); returned null. reportedPeptideId: " + reportedPeptideId;
        						log.error(msg);
        						throw new LimelightInternalErrorException(msg);
        					}
        							
        	    			List<PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_ResultEntry> psmTblData_List = 
        	    					psmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher.getPsmTblData_Exclude_is_decoy_For_PsmIds( psmIds );

        	    			Internal_Single_ReportedPeptide_AndIts_PSMs_FromDB internal_Single_ReportedPeptide_AndIts_PSMs_FromDB = new Internal_Single_ReportedPeptide_AndIts_PSMs_FromDB();
        	    			internal_Single_ReportedPeptide_AndIts_PSMs_FromDB.reportedPeptideId = reportedPeptideId;
        	    			internal_Single_ReportedPeptide_AndIts_PSMs_FromDB.psmTblData_List = psmTblData_List;
        	    			
        	    			internal_Single_ReportedPeptide_AndIts_PSMs_FromDB_Map_Key_ReportedPeptideId.put( reportedPeptideId, internal_Single_ReportedPeptide_AndIts_PSMs_FromDB );

        				} catch (Throwable t) {
        					
        					log.error( "Fail processing reportedPeptideIds: reportedPeptideId" + reportedPeptideId, t);

        					anyThrownInsideStreamProcessing.set(true);
        					
        					thrownInsideStream_List.add(t);
        				}
        			});
        			
        		} else {
        			
        			//  NOT execute in parallel

        			reportedPeptideIds.forEach( reportedPeptideId -> {
        			
        				try {
        					List<Long> psmIds = psmIdsList_Map_Key_ReportedPeptideId.get( reportedPeptideId );
        					
        					if ( psmIds == null ) {
        						String msg = "psmIdsList_Map_Key_ReportedPeptideId.get( reportedPeptideId ); returned null. reportedPeptideId: " + reportedPeptideId;
        						log.error(msg);
        						throw new LimelightInternalErrorException(msg);
        					}
        							
        	    			List<PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_ResultEntry> psmTblData_List = 
        	    					psmTblData_ForSearchIdReportedPeptideIdCutoffsSearcher.getPsmTblData_Exclude_is_decoy_For_PsmIds( psmIds );

        	    			Internal_Single_ReportedPeptide_AndIts_PSMs_FromDB internal_Single_ReportedPeptide_AndIts_PSMs_FromDB = new Internal_Single_ReportedPeptide_AndIts_PSMs_FromDB();
        	    			internal_Single_ReportedPeptide_AndIts_PSMs_FromDB.reportedPeptideId = reportedPeptideId;
        	    			internal_Single_ReportedPeptide_AndIts_PSMs_FromDB.psmTblData_List = psmTblData_List;
        	    			
        	    			internal_Single_ReportedPeptide_AndIts_PSMs_FromDB_Map_Key_ReportedPeptideId.put( reportedPeptideId, internal_Single_ReportedPeptide_AndIts_PSMs_FromDB );

        				} catch (Throwable t) {
        					
        					log.error( "Fail processing reportedPeptideIds.  Rethrow in class LimelightInternalErrorException: reportedPeptideId" + reportedPeptideId, t);
        					
        					anyThrownInsideStreamProcessing.set(true);
        					
        					thrownInsideStream_List.add(t);
        					
        					throw new LimelightInternalErrorException( t );
        				}
        			});
        		}

        		if ( anyThrownInsideStreamProcessing.get() ) {
        			
        			throw new LimelightInternalErrorException( "At least 1 exception processing reportedPeptideIds 'Retrieve ALL PSM data for all PSM Ids' " );
        		}
        	}
    		
   			
    		//////////////////
    		
    		//   Start Retrieve ALL PSM data for all PSM Ids
    		
    		
    		List<Internal_Single_ReportedPeptide_AndIts_PSMs_FromDB> reportedPeptideId_psmTblDataList_List = new ArrayList<>( reportedPeptideIds.size() );
    		
    		for ( Integer reportedPeptideId : reportedPeptideIds ) {
  			
    			Internal_Single_ReportedPeptide_AndIts_PSMs_FromDB internal_Single_ReportedPeptide_AndIts_PSMs_FromDB = 
    					internal_Single_ReportedPeptide_AndIts_PSMs_FromDB_Map_Key_ReportedPeptideId.get( reportedPeptideId );
    			
    			if ( internal_Single_ReportedPeptide_AndIts_PSMs_FromDB != null ) {
    				reportedPeptideId_psmTblDataList_List.add( internal_Single_ReportedPeptide_AndIts_PSMs_FromDB );
    			}
    		}
    		
    		
    		
    		
    		//////////////////
    		
    		//   AFTER Retrieve ALL PSM data for all PSM Ids
    		
    		
    		//  Initial analysis of values
    		
    		int psmCount_Total = 0;
    		
    		boolean anyPsmHas_RetentionTimeSeconds_NotNull = false;
    		boolean anyPsmHas_Precursor_M_Over_Z_NotNull = false;
    		
    		boolean anyPsmHas_HasModifications_True = false;
    		boolean anyPsmHas_HasOpenModifications_True = false;
    		boolean anyPsmHas_HasReporterIons_True = false;
    		boolean anyPsmHas_IndependentDecoyPSM_True = false;
    		
    		boolean anyPsmHas_SearchScanFileId_NotNull = false;
    		
    		
    		for ( Internal_Single_ReportedPeptide_AndIts_PSMs_FromDB internal_Single_ReportedPeptide_AndIts_PSMs_FromDB_Entry : reportedPeptideId_psmTblDataList_List ) {
    			
    			psmCount_Total += internal_Single_ReportedPeptide_AndIts_PSMs_FromDB_Entry.psmTblData_List.size();
    			
    			for ( PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_ResultEntry psmTblData_Entry : internal_Single_ReportedPeptide_AndIts_PSMs_FromDB_Entry.psmTblData_List ) {
    				
    				if ( psmTblData_Entry.getRetentionTimeSeconds() != null ) {
    					anyPsmHas_RetentionTimeSeconds_NotNull = true;
    				}
    				if ( psmTblData_Entry.getPrecursor_M_Over_Z() != null ) {
    					anyPsmHas_Precursor_M_Over_Z_NotNull = true;
    				}

    				if ( psmTblData_Entry.isHasModifications() ) {
    					anyPsmHas_HasModifications_True = true;
    				}
    				if ( psmTblData_Entry.isHasOpenModifications() ) {
    					anyPsmHas_HasOpenModifications_True = true;
    				}

    				if ( psmTblData_Entry.isHasReporterIons() ) {
    					anyPsmHas_HasReporterIons_True = true;
    				}

    				if ( psmTblData_Entry.isIndependentDecoyPSM() ) {
    					anyPsmHas_IndependentDecoyPSM_True = true;
    				}

    				if ( psmTblData_Entry.getSearchScanFileId() != null ) {
    					
    					anyPsmHas_SearchScanFileId_NotNull = true;
    					
    					//  Validate SearchScanFileId on PSM is in search_scan_file_tbl for search
    					
    					if ( ! searchScanFileIds_From_SearchScanFileTable.contains( psmTblData_Entry.getSearchScanFileId() ) ) {
    						String msg = "psm_tbl.search_scan_file_id is not in search_scan_file_tbl.  psm_tbl.search_scan_file_id: " + psmTblData_Entry.getSearchScanFileId() 
    							+ ", searchScanFileIds_From_SearchScanFileTable: " + StringUtils.join( searchScanFileIds_From_SearchScanFileTable, ", " )
    							+ ", searchId: " + searchId;
    						log.error(msg);
    						throw new LimelightShardCodeDatabaseContentErrorException(msg);
    					}
    				}
    				
    				if ( psmTblData_Entry.getSearchScanFileId() == null ) {
    
    					//  Validate since NO SearchScanFileId on PSM (is null), there is ZERO or ONE entry in search_scan_file_tbl for search
    					
    					if ( searchScanFileIds_From_SearchScanFileTable.size() > 1 ) {
    						String msg = "psm_tbl.search_scan_file_id is null and there is > 1 entries in search_scan_file_tbl.  "  
    							+ " searchScanFileIds_From_SearchScanFileTable: " + StringUtils.join( searchScanFileIds_From_SearchScanFileTable, ", " )
    							+ ", searchId: " + searchId;
    						log.error(msg);
    						throw new LimelightShardCodeDatabaseContentErrorException(msg);
    					}
    				}
    			}
    		}
    		
    		int[] reportedPeptideId_OffsetFromPrevValue_Array = new int[ psmCount_Total ];
    		long[] psmId_OffsetFromPrevValue_Array = new long[ psmCount_Total ];
    		

    		int[] psm_Charge_Array = new int[ psmCount_Total ];
    		int[] psm_ScanNumber_Array = new int[ psmCount_Total ];
        	
    		Float[] psm_RetentionTimeSeconds_Array = null;
    		Double[] psm_Precursor_M_Over_Z_Array = null;

    		boolean[] psm_HasModifications_Array = null;
    		boolean[] psm_HasOpenModifications_Array = null;
    		boolean[] psm_HasReporterIons_Array = null;
    		boolean[] psm_IndependentDecoyPSM_Array = null;
    		
    		Integer[] psm_SearchScanFileId_Array = null;
    		

    		/////////////

    		//   TODO  FAKE Force to true to generate the array

    		anyPsmHas_RetentionTimeSeconds_NotNull = true;
    		anyPsmHas_Precursor_M_Over_Z_NotNull = true;
    		
    		anyPsmHas_HasModifications_True = true;
    		anyPsmHas_HasOpenModifications_True = true;
    		anyPsmHas_HasReporterIons_True = true;
    		anyPsmHas_IndependentDecoyPSM_True = true;
    		
    		anyPsmHas_SearchScanFileId_NotNull = true;
    		
    		///////////////
    		

    		if ( anyPsmHas_RetentionTimeSeconds_NotNull ) {
    			psm_RetentionTimeSeconds_Array = new Float[ psmCount_Total ];
    		}
    		if ( anyPsmHas_Precursor_M_Over_Z_NotNull ) {
    			psm_Precursor_M_Over_Z_Array = new Double[ psmCount_Total ];
    		}
    		if ( anyPsmHas_HasModifications_True ) {
    			psm_HasModifications_Array = new boolean[ psmCount_Total ];
    		}
    		if ( anyPsmHas_HasOpenModifications_True ) {
    			psm_HasOpenModifications_Array = new boolean[ psmCount_Total ];
    		}
    		if ( anyPsmHas_HasReporterIons_True ) {
    			psm_HasReporterIons_Array = new boolean[ psmCount_Total ];
    		}
    		if ( anyPsmHas_IndependentDecoyPSM_True ) {
    			psm_IndependentDecoyPSM_Array = new boolean[ psmCount_Total ];
    		}

    		if ( anyPsmHas_SearchScanFileId_NotNull ) {
    			psm_SearchScanFileId_Array = new Integer[ psmCount_Total ];
    		}

    		//  Updated every Reported Peptide Id
    		int reportedPeptideId_Previous = 0;  // start at zero since is offset from previous
    		
			//  For output since updated every PSM
    		int reportedPeptideId_Previous_ForOutput = 0;  // start at zero since is offset from previous
    		
    		long psmId_Previous = 0;  // start at zero since is offset from previous
    		
    		int psmOutput_Index = -1;  // start at -1 so after first increment it is zero
    		

    		for ( Internal_Single_ReportedPeptide_AndIts_PSMs_FromDB internal_Single_ReportedPeptide_AndIts_PSMs_FromDB_Entry : reportedPeptideId_psmTblDataList_List ) {
    			
    			int reportedPeptideId_Current = internal_Single_ReportedPeptide_AndIts_PSMs_FromDB_Entry.reportedPeptideId;
        		
    			//  Sort on PsmId
    			Collections.sort( internal_Single_ReportedPeptide_AndIts_PSMs_FromDB_Entry.psmTblData_List, new Comparator<PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_ResultEntry>() {
					@Override
					public int compare(PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_ResultEntry o1,
							PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_ResultEntry o2) {
						if ( o1.getPsmId() < o2.getPsmId() ) {
							return -1;
						}
						if ( o1.getPsmId() > o2.getPsmId() ) {
							return 1;
						}
						return 0;
					}
				});

//    			boolean firstPsmRecord_For_ReportedPeptideId = true;

    			for ( PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_ResultEntry psmTblData_Entry : internal_Single_ReportedPeptide_AndIts_PSMs_FromDB_Entry.psmTblData_List ) {
    				
    				psmOutput_Index++; // Increment here since start at -1 so after first increment it is zero for first index position in arrays
    				
//    				if ( firstPsmRecord_For_ReportedPeptideId ) {
//    				
//    					firstPsmRecord_For_ReportedPeptideId = false;
//    				} else {
//    				}
    				
    				reportedPeptideId_OffsetFromPrevValue_Array[ psmOutput_Index ] = reportedPeptideId_Current - reportedPeptideId_Previous_ForOutput;
    				
    				psmId_OffsetFromPrevValue_Array[ psmOutput_Index ] = psmTblData_Entry.getPsmId() - psmId_Previous;
    				
    				psm_Charge_Array[ psmOutput_Index ] = psmTblData_Entry.getCharge();
    				psm_ScanNumber_Array[ psmOutput_Index ] = psmTblData_Entry.getScanNumber();
    				
    				if ( psm_RetentionTimeSeconds_Array != null ) {
    					psm_RetentionTimeSeconds_Array[ psmOutput_Index ] = psmTblData_Entry.getRetentionTimeSeconds();
    				}

    				if ( psm_Precursor_M_Over_Z_Array != null ) {
    					psm_Precursor_M_Over_Z_Array[ psmOutput_Index ] = psmTblData_Entry.getPrecursor_M_Over_Z();
    				}

    				if ( psm_HasModifications_Array != null ) {
    					psm_HasModifications_Array[ psmOutput_Index ] = psmTblData_Entry.isHasModifications();
    				}

    				if ( psm_HasOpenModifications_Array != null ) {
    					psm_HasOpenModifications_Array[ psmOutput_Index ] = psmTblData_Entry.isHasOpenModifications();
    				}

    				if ( psm_HasReporterIons_Array != null ) {
    					psm_HasReporterIons_Array[ psmOutput_Index ] = psmTblData_Entry.isHasReporterIons();
    				}

    				if ( psm_IndependentDecoyPSM_Array != null ) {
    					psm_IndependentDecoyPSM_Array[ psmOutput_Index ] = psmTblData_Entry.isIndependentDecoyPSM();
    				}
    		    		

    				if ( psm_SearchScanFileId_Array != null ) {
    					
    					
    					Integer searchScanFileId_Output = psmTblData_Entry.getSearchScanFileId();
    					
    					if ( searchScanFileId_Output == null ) {
    					
    						if ( searchScanFileId_From_SearchScanFileTable_IfExactlyOneEntry != null ) {
    							//  psmTblData_Entry.getSearchScanFileId(); AND Exactly one entry in SearchScanFile Table so use entry in SearchScanFile Table
    							searchScanFileId_Output = searchScanFileId_From_SearchScanFileTable_IfExactlyOneEntry;
    						}
    					}
    					
    					psm_SearchScanFileId_Array[ psmOutput_Index ] = searchScanFileId_Output;
    						
    				}


    				psmId_Previous = psmTblData_Entry.getPsmId();

    				//  For output since updated every PSM
    				reportedPeptideId_Previous_ForOutput = internal_Single_ReportedPeptide_AndIts_PSMs_FromDB_Entry.reportedPeptideId;
    			}
    			
    			//  Updated every Reported Peptide Id
    			reportedPeptideId_Previous = internal_Single_ReportedPeptide_AndIts_PSMs_FromDB_Entry.reportedPeptideId;
    		}
    		
    		WebserviceResult result = new WebserviceResult();
    		
    		result.reportedPeptideId_OffsetFromPrevValue_Array = reportedPeptideId_OffsetFromPrevValue_Array;
    		result.psmId_OffsetFromPrevValue_Array = psmId_OffsetFromPrevValue_Array;
    		result.psm_Charge_Array = psm_Charge_Array;
    		result.psm_ScanNumber_Array = psm_ScanNumber_Array;
    		result.psm_RetentionTimeSeconds_Array = psm_RetentionTimeSeconds_Array;
    		result.psm_Precursor_M_Over_Z_Array = psm_Precursor_M_Over_Z_Array;
    		result.psm_HasModifications_Array = psm_HasModifications_Array;
    		result.psm_HasOpenModifications_Array = psm_HasOpenModifications_Array;
    		result.psm_HasReporterIons_Array = psm_HasReporterIons_Array;
    		result.psm_IndependentDecoyPSM_Array = psm_IndependentDecoyPSM_Array;
    		result.psm_SearchScanFileId_Array = psm_SearchScanFileId_Array;
    		   		
    		
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray_NotReturn_ObjectField_ThatIs_Null( result );

    		
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
    
    /////////////////
    
    //  Internal Classes
    
    private static class Internal_Single_ReportedPeptide_AndIts_PSMs_FromDB {
    	
    	int reportedPeptideId;
    	
    	List<PsmTblData_Exclude_is_decoy_For_PsmIds_Searcher_ResultEntry> psmTblData_List;
    }
    
    
    /////////////////

    //   Webservice Request and Response classes
    
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
    	
    	int[] reportedPeptideId_OffsetFromPrevValue_Array;
		long[] psmId_OffsetFromPrevValue_Array;
		
		int[] psm_Charge_Array;
    	int[] psm_ScanNumber_Array;
		
		Float[] psm_RetentionTimeSeconds_Array;
		Double[] psm_Precursor_M_Over_Z_Array;

		boolean[] psm_HasModifications_Array;
		boolean[] psm_HasOpenModifications_Array;
		boolean[] psm_HasReporterIons_Array;
		boolean[] psm_IndependentDecoyPSM_Array;   // skip 'is_decoy' since is excluded in WHERE clause in SQL query
		
		Integer[] psm_SearchScanFileId_Array;
		
		public int[] getReportedPeptideId_OffsetFromPrevValue_Array() {
			return reportedPeptideId_OffsetFromPrevValue_Array;
		}
		public long[] getPsmId_OffsetFromPrevValue_Array() {
			return psmId_OffsetFromPrevValue_Array;
		}
		public Float[] getPsm_RetentionTimeSeconds_Array() {
			return psm_RetentionTimeSeconds_Array;
		}
		public Double[] getPsm_Precursor_M_Over_Z_Array() {
			return psm_Precursor_M_Over_Z_Array;
		}
		public boolean[] getPsm_HasModifications_Array() {
			return psm_HasModifications_Array;
		}
		public boolean[] getPsm_HasOpenModifications_Array() {
			return psm_HasOpenModifications_Array;
		}
		public boolean[] getPsm_HasReporterIons_Array() {
			return psm_HasReporterIons_Array;
		}
		public boolean[] getPsm_IndependentDecoyPSM_Array() {
			return psm_IndependentDecoyPSM_Array;
		}
		public Integer[] getPsm_SearchScanFileId_Array() {
			return psm_SearchScanFileId_Array;
		}
		public int[] getPsm_Charge_Array() {
			return psm_Charge_Array;
		}
		public int[] getPsm_ScanNumber_Array() {
			return psm_ScanNumber_Array;
		}
    }

}


