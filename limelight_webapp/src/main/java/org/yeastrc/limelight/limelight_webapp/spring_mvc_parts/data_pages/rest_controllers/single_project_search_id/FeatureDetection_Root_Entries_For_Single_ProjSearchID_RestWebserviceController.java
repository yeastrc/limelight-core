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
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Root_Mapping_Entries_For_ProjectSearchId_Searcher.FeatureDetection_Root_Mapping_Entries_For_ProjectSearchId_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Root_Mapping_Entries_For_ProjectSearchId_Searcher.FeatureDetection_Root_Mapping_Entries_For_ProjectSearchId_Searcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Root_Mapping_Entries_For_ProjectSearchId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher.SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher.SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Feature Detection Root/Main entries for Project Search ID
 * 
 * Found through the search scan file entries for search
 *
 */
@RestController
public class FeatureDetection_Root_Entries_For_Single_ProjSearchID_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( FeatureDetection_Root_Entries_For_Single_ProjSearchID_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private FeatureDetection_Root_Mapping_Entries_For_ProjectSearchId_Searcher_IF featureDetection_Root_Entries_For_SearchId_Searcher;
	
	@Autowired 
	private SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_IF searchScanFile_For_SearchId_ProjectScanFileIds_Searcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public FeatureDetection_Root_Entries_For_Single_ProjSearchID_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.SCAN_FILE_FEATURE_DETECTION_ROOT_ENTRIES_ROOT_SINGLE_PROJECT_SEARCH_ID
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
    		//		log.warn( "projectView(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		Integer projectSearchId = webserviceRequest.projectSearchId;
    		
    		if ( webserviceRequest.projectSearchId == null ) {
    			log.warn( "projectSearchId is not assigned" );
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
			
			//  End Authorization
			
			/////////////
			
			FeatureDetection_Root_Mapping_Entries_For_ProjectSearchId_Searcher_Result searcher_Result =
					featureDetection_Root_Entries_For_SearchId_Searcher.getForProjectSearchId(projectSearchId);
					
			List<FeatureDetection_Root_Mapping_Entries_For_ProjectSearchId_Searcher_Result_Item> dbEntries = searcher_Result.getEntries();
			
			Set<Integer> projectScanFileIds = new HashSet<>( dbEntries.size() );
			
			List<WebserviceResult_Entry> result_List = new ArrayList<>(  dbEntries.size() );

			for ( FeatureDetection_Root_Mapping_Entries_For_ProjectSearchId_Searcher_Result_Item dbEntry : dbEntries ) {
				
				WebserviceResult_Entry webserviceResult_Entry = new WebserviceResult_Entry();
				
				webserviceResult_Entry.feature_detection_root__project_scnfl_mapping_tbl__id = dbEntry.getFeature_detection_root__project_scnfl_mapping_tbl__id();
				webserviceResult_Entry.project_scan_file_id = dbEntry.getProject_scan_file_id();

				webserviceResult_Entry.displayLabel = dbEntry.getDisplayLabel();
				webserviceResult_Entry.description = dbEntry.getDescription();
				
				projectScanFileIds.add( dbEntry.getProject_scan_file_id() );

				result_List.add(webserviceResult_Entry);
			}
			
			Map<Integer, List<SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_ResultItem>> searchScanFile_Entries_Map_Key_Project_scan_file_id = new HashMap<>( projectScanFileIds.size() )  ;
			
			{
				SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_Result dbResult =
						searchScanFile_For_SearchId_ProjectScanFileIds_Searcher.getSearchScanFile_For_SearchId_ProjectScanFileIds(searchId, projectScanFileIds);
				
				for ( SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_ResultItem dbResultItem : dbResult.getResultItemList() ) {
					
					List<SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_ResultItem> searchScanFile_Entries =
							searchScanFile_Entries_Map_Key_Project_scan_file_id.get( dbResultItem.getProject_scan_file_id() );
					if ( searchScanFile_Entries == null ) {
						searchScanFile_Entries = new ArrayList<>();
						searchScanFile_Entries_Map_Key_Project_scan_file_id.put( dbResultItem.getProject_scan_file_id(), searchScanFile_Entries );
					}
					searchScanFile_Entries.add(dbResultItem);
				}
			}
			
			// add to webserviceResult_Entry.
			
			for ( WebserviceResult_Entry webserviceResult_Entry : result_List ) {
				
				List<SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_ResultItem> searchScanFile_Entries =
						searchScanFile_Entries_Map_Key_Project_scan_file_id.get( webserviceResult_Entry.getProject_scan_file_id() );
				if ( searchScanFile_Entries == null ) {
					String msg = "searchScanFile_Entries_Map_Key_Project_scan_file_id.get( webserviceResult_Entry.getProject_scan_file_id() ) Returned NOTHING for webserviceResult_Entry.getProject_scan_file_id(): " + webserviceResult_Entry.getProject_scan_file_id() ;
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}

				webserviceResult_Entry.searchScanFileEntries = new HashSet<>( searchScanFile_Entries.size() );
				
				for ( SearchScanFile_For_SearchId_ProjectScanFileIds_Searcher_ResultItem searchScanFile_Entry : searchScanFile_Entries ) {
					
					WebserviceResult_SearchScanFile_Entry webserviceResult_SearchScanFile_Entry = new WebserviceResult_SearchScanFile_Entry();
					webserviceResult_SearchScanFile_Entry.searchScanFileId = searchScanFile_Entry.getSearch_scan_file_id();
					webserviceResult_SearchScanFile_Entry.searchScanFilename = searchScanFile_Entry.getSearch_scan_filename();
					
					webserviceResult_Entry.searchScanFileEntries.add( webserviceResult_SearchScanFile_Entry );
				}
			}
			
    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.result_List = result_List;

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
    
    /////////////////////////////////////////////

    public static class WebserviceRequest {
    	
    	private Integer projectSearchId;

		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}

    }
    
    public static class WebserviceResult {
    	
    	private List<WebserviceResult_Entry> result_List;

		public List<WebserviceResult_Entry> getResult_List() {
			return result_List;
		}
    }

    public static class WebserviceResult_Entry {

		private int feature_detection_root__project_scnfl_mapping_tbl__id;
		private int project_scan_file_id;
		
		private String displayLabel;
		private String description;
		
		private Set<WebserviceResult_SearchScanFile_Entry> searchScanFileEntries; // from search_scan_file_tbl 
		
		public int getFeature_detection_root__project_scnfl_mapping_tbl__id() {
			return feature_detection_root__project_scnfl_mapping_tbl__id;
		}
		public void setFeature_detection_root__project_scnfl_mapping_tbl__id(
				int feature_detection_root__project_scnfl_mapping_tbl__id) {
			this.feature_detection_root__project_scnfl_mapping_tbl__id = feature_detection_root__project_scnfl_mapping_tbl__id;
		}
		public int getProject_scan_file_id() {
			return project_scan_file_id;
		}
		public void setProject_scan_file_id(int project_scan_file_id) {
			this.project_scan_file_id = project_scan_file_id;
		}
		public String getDisplayLabel() {
			return displayLabel;
		}
		public void setDisplayLabel(String displayLabel) {
			this.displayLabel = displayLabel;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public Set<WebserviceResult_SearchScanFile_Entry> getSearchScanFileEntries() {
			return searchScanFileEntries;
		}
    }

    public static class WebserviceResult_SearchScanFile_Entry {    // from search_scan_file_tbl
    	
    	//  Put in Set so add hashCode() and equals(Object obj)

		private int searchScanFileId; 
		private String searchScanFilename;
		
		public int getSearchScanFileId() {
			return searchScanFileId;
		}
		public String getSearchScanFilename() {
			return searchScanFilename;
		}
		
		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + searchScanFileId;
			result = prime * result + ((searchScanFilename == null) ? 0 : searchScanFilename.hashCode());
			return result;
		}
		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			WebserviceResult_SearchScanFile_Entry other = (WebserviceResult_SearchScanFile_Entry) obj;
			if (searchScanFileId != other.searchScanFileId)
				return false;
			if (searchScanFilename == null) {
				if (other.searchScanFilename != null)
					return false;
			} else if (!searchScanFilename.equals(other.searchScanFilename))
				return false;
			return true;
		} 
		
    }
}


