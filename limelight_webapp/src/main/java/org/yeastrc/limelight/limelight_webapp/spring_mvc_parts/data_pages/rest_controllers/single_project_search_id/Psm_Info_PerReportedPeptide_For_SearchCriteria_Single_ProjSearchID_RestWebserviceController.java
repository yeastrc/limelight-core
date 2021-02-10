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

import org.slf4j.LoggerFactory;
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
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_Utils;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValues_Factory;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmIds_ScanInfo_ForSearchIdReportedPeptideIdCutoffsSearcher.PsmIds_ScanInfo_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services.ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmIds_ScanInfo_ForSearchIdReportedPeptideIdCutoffsSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchScanFile_For_Ids_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Retrieve PSM Info (PsmId, Scan Number, ScanFilenameId) Per Reported Peptide Id for Project Search ID, and Search Criteria
 *   - Also return ScanFilenameId / ScanFilename 
 *
 */
@RestController
public class Psm_Info_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController 

implements
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
  
	private static final Logger log = LoggerFactory.getLogger( Psm_Info_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController.class );

	/**
	 * Path for this Controller
	 */
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.PSM_INFO_PER_REPORTED_PEPTIDE_ID_FOR_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER;
	
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
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private SearcherCutoffValues_Factory searcherCutoffValuesRootLevel_Factory;

	@Autowired
	private ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service;

	@Autowired
	private PsmIds_ScanInfo_ForSearchIdReportedPeptideIdCutoffsSearcher_IF psmIds_ScanInfo_ForSearchIdReportedPeptideIdCutoffsSearcher;
	
	@Autowired
	private SearchScanFile_For_Ids_Searcher_IF searchScanFile_For_Ids_Searcher;
		
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Psm_Info_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController() {
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
			cached_WebserviceResponse_Management.registerControllerPathForCachedResponse( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, this );
			
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

    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
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
    			
    			byte[] cachedResponse = cached_WebserviceResponse_Management.getCachedResponse( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, this );
    			
    			if ( cachedResponse != null ) {
    				
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

   			final int minimumNumberOfPSMsPerReportedPeptide = 1; // standard minimum # PSMs 
   			
			//  Get initial Reported Peptide Id list (maybe include Num PSMs) based on search criteria
   			
    		List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> peptideMinimalObjectsList = 
    				reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList( searchId, searcherCutoffValuesSearchLevel, minimumNumberOfPSMsPerReportedPeptide );

    		
    		List<WebserviceResult_Entry> reportedPeptideId_psmIdList_List = new ArrayList<>( peptideMinimalObjectsList.size() );
    		
    		Set<Integer> scanFilenameId_Set = new HashSet<>();
    		
    		for ( ReportedPeptide_MinimalData_List_FromSearcher_Entry peptideMinimalObject : peptideMinimalObjectsList ) {
    			
    			Integer reportedPeptideId = peptideMinimalObject.getReportedPeptideId();

    			List<PsmIds_ScanInfo_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry> psmIds_ScanInfo_List = 
    					psmIds_ScanInfo_ForSearchIdReportedPeptideIdCutoffsSearcher
    					.getPsmIds_ScanInfo_ForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );
    			
    			List<WebserviceResult_PerPSM_Entry> psms = new ArrayList<>( psmIds_ScanInfo_List.size() );
    			
    			for ( PsmIds_ScanInfo_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry dbEntry : psmIds_ScanInfo_List ) {
    				WebserviceResult_PerPSM_Entry resultEntry = new WebserviceResult_PerPSM_Entry();
    				resultEntry.psmId = dbEntry.getPsmId();
    				resultEntry.scanNumber = dbEntry.getScanNumber();
    				resultEntry.scanFilenameId = dbEntry.getSearchScanFileId();
    				psms.add(resultEntry);
    				
    				if ( dbEntry.getSearchScanFileId() != null ) {
    					scanFilenameId_Set.add( dbEntry.getSearchScanFileId() );
    				}
    			}
    			
    			WebserviceResult_Entry entry = new WebserviceResult_Entry();
    			entry.reportedPeptideId = reportedPeptideId;
    			entry.psms = psms;
    			reportedPeptideId_psmIdList_List.add( entry );
    		}
			
			//  get scan filename strings

    		List<WebserviceResult_PerScanFilename_Entry> scanFileInfo = new ArrayList<>();
    		
    		if ( ! scanFilenameId_Set.isEmpty() ) {
    			
    			List<SearchScanFileDTO> dbResultList = 
    					searchScanFile_For_Ids_Searcher.getSearchScanFile_For_Ids( scanFilenameId_Set );
    			
    			for ( SearchScanFileDTO dbResult : dbResultList ) {
    			
    				WebserviceResult_PerScanFilename_Entry result = new WebserviceResult_PerScanFilename_Entry();
    				result.scanFilenameId = dbResult.getId();
    				result.scanFilename = dbResult.getFilename();
    		
    				scanFileInfo.add( result );
    			}
    		}
    		
    		WebserviceResult result = new WebserviceResult();
    		result.reportedPeptideId_psmIdList_List = reportedPeptideId_psmIdList_List;
    		result.scanFileInfo = scanFileInfo;
    		
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( result );

    		{ // Save cached value 
    			
    			cached_WebserviceResponse_Management.putCachedResponse( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, responseAsJSON, this );
    		}
    		
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
    public static class WebserviceRequest {

    	private Integer projectSearchId;
    	private SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId;
    	
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public void setSearchDataLookupParams_For_Single_ProjectSearchId(
				SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId) {
			this.searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchId;
		}
    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    	
    	List<WebserviceResult_Entry> reportedPeptideId_psmIdList_List;
    	List<WebserviceResult_PerScanFilename_Entry> scanFileInfo;

		public List<WebserviceResult_Entry> getReportedPeptideId_psmIdList_List() {
			return reportedPeptideId_psmIdList_List;
		}

		public List<WebserviceResult_PerScanFilename_Entry> getScanFileInfo() {
			return scanFileInfo;
		}
    }

    /**
     * 
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
     * 
     *
     */
    public static class WebserviceResult_PerPSM_Entry {
    	
    	long psmId;
    	int scanNumber;
    	Integer scanFilenameId; // Can be null
    	
		public long getPsmId() {
			return psmId;
		}
		public int getScanNumber() {
			return scanNumber;
		}
		public Integer getScanFilenameId() {
			return scanFilenameId;
		}
    }

    /**
     * 
     *
     */
    public static class WebserviceResult_PerScanFilename_Entry {
    	
    	int scanFilenameId;
    	String scanFilename;
    	
		public int getScanFilenameId() {
			return scanFilenameId;
		}
		public String getScanFilename() {
			return scanFilename;
		}
    }
    	
}


