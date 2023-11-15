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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.feature_detection__feature_detec_to_project_scan_file_mapping_id_based;



import java.util.ArrayList;
import java.util.List;
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
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_Utils;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher.FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.Feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher.Feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.Feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFile_For_ProjectScanFileId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.Gzip_ByteArray_To_ByteArray_IF;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * !!!  WARNING:  Webservice Response is CACHED  !!!!
 * 
 * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
 * 
 * Feature Detection - Mapping of Persistent to Singular Feature entries for Feature Detection Root Id Project Search ID
 * 
 * Contents of main uploaded Feature Detection File
 * 
 * Validate access through the search scan file entries for search, then scan file id
 *
 */
@RestController
public class FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_For_FeatureDetectionRootId_Single_ProjSearchID_RestWebserviceController 

implements
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
  
  
	private static final Logger log = LoggerFactory.getLogger( FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_For_FeatureDetectionRootId_Single_ProjSearchID_RestWebserviceController.class );

	/**
	 * Path for this Controller.  !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
	 */
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.FEATURE_DETECTION_MAP_PERSISTENT_TO_SINGULAR_FEATURE_ENTRIES_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER_VERSION_0001;

	/**
	 * Path, updated for use by Cached Response Mgmt ( Cached_WebserviceResponse_Management )
	 */
	private static final String CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT = Cached_WebserviceResponse_Management_Utils.translate_ControllerPath_For_CachedResponseMgmt( CONTROLLER_PATH );

	
	public final static int MAX_LIMIT_COUNT__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_For_FeatureDetectionRootId_Single_ProjSearchID_RestWebserviceController =
			800000; // 0.8 million
	
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;
	
	@Autowired
	private Cached_WebserviceResponse_Management_IF cached_WebserviceResponse_Management;

	@Autowired
	private Gzip_ByteArray_To_ByteArray_IF gzip_ByteArray_To_ByteArray;

	@Autowired
	private RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF restControllerUtils__Request_Accept_GZip_Response_Set_GZip;
	
	@Autowired
	private FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_IF featureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher;

	@Autowired
	private Feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_IF feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher;
	
	@Autowired
	private ProjectScanFile_For_ProjectScanFileId_Searcher_IF projectScanFile_For_ProjectScanFileId_Searcher;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_For_FeatureDetectionRootId_Single_ProjSearchID_RestWebserviceController() {
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

    		if ( webserviceRequest.feature_detection_root__project_scnfl_mapping_tbl__id == null ) {
    			log.warn( "feature_detection_root__project_scnfl_mapping_tbl__id is not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		if ( ( webserviceRequest.limit_Offset != null && webserviceRequest.limit_Count == null ) 
    				||  ( webserviceRequest.limit_Offset == null && webserviceRequest.limit_Count != null ) ) {
    			log.warn( "limit_Offset and limit_Count must both be assigned/null or not assigned/null" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( webserviceRequest.limit_Offset != null ) {
        		if ( webserviceRequest.limit_Offset < 0 ) {
        			log.warn( "limit_Offset cannot be < 0. limit_Offset: " + webserviceRequest.limit_Offset );
        			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
        		}
    		}
    		if ( webserviceRequest.limit_Count != null ) {
    			if ( webserviceRequest.limit_Count > MAX_LIMIT_COUNT__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_For_FeatureDetectionRootId_Single_ProjSearchID_RestWebserviceController ) {
    				log.warn( "limit_Count exceeds max value. limit_Count: " + webserviceRequest.limit_Count
    						+ ", Max Limit Count: " + MAX_LIMIT_COUNT__FeatureDetection_MappingOf_PersistentToSingularFeature_Entries_For_FeatureDetectionRootId_Single_ProjSearchID_RestWebserviceController );
    				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}
    		}    		

    		
    		Integer feature_detection_root_id = null;

    		{
    			Feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_Result feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_Result =
    					feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher.
    					feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id(webserviceRequest.feature_detection_root__project_scnfl_mapping_tbl__id);
    			
    			if ( feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_Result == null ) {
    				String msg = "feature_detection_root__project_scnfl_mapping_tbl_Id not in DB: " + webserviceRequest.feature_detection_root__project_scnfl_mapping_tbl__id;
    				log.warn(msg);
    				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}
    			
    			int project_scan_file_id = feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_Result.getProject_scan_file_id();

    			Project_ScanFile_DTO project_ScanFile_DTO =
    					projectScanFile_For_ProjectScanFileId_Searcher.get_For_ProjectScanFileId_Searcher(project_scan_file_id);

    			if ( project_ScanFile_DTO == null ) {
    				String msg = "projectScanFileId not in DB: " + project_scan_file_id;
    				log.warn(msg);
    				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}

    			int projectId = project_ScanFile_DTO.getProjectId();

    			List<Integer> projectIds = new ArrayList<>( 1 );
    			projectIds.add( projectId );


    			GetWebSessionAuthAccessLevelForProjectIds_Result getWebSessionAuthAccessLevelForProjectIds_Result =
    					getWebSessionAuthAccessLevelForProjectIds.getAuthAccessLevelForProjectIds( projectIds, httpServletRequest );

    			WebSessionAuthAccessLevel webSessionAuthAccessLevel = getWebSessionAuthAccessLevelForProjectIds_Result.getWebSessionAuthAccessLevel();

    			if ( getWebSessionAuthAccessLevelForProjectIds_Result.isNoSession()
    					&& ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() )) {
    				
    				//  No User session and not public project
    				throw new Limelight_WS_AuthError_Unauthorized_Exception();
    			}
    			
    			feature_detection_root_id = feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_Result.getFeature_detection_root_id();
    			
    		}
    			
			//  End Authorization
			
			/////////////

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
    		
    		
			FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result featureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result =
					featureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher.getForFeatureDetectionRootId_Limit_Offset_Limit_Count__Optional_feature_detection_persistent_feature_entry_id(
							feature_detection_root_id,
							webserviceRequest.optional__feature_detection_persistent_feature_entry_id,
							webserviceRequest.limit_Offset, webserviceRequest.limit_Count
							);
			
    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.featureDetection_PersistentFeatureEntry_Id_List = featureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result.getFeatureDetection_PersistentFeatureEntry_Id_List();
    		webserviceResult.featureDetection_SingularFeatureEntry_Id_List = featureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result.getFeatureDetection_SingularFeatureEntry_Id_List();
    		webserviceResult.featureDetection_Root_Id_List = featureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result.getFeatureDetection_Root_Id_List();

    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

    		
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
    
    ////////////////////////////////

    public static class WebserviceRequest {
    	
    	private Integer feature_detection_root__project_scnfl_mapping_tbl__id;

    	private Integer optional__feature_detection_persistent_feature_entry_id;

    	private Integer limit_Offset; 
    	private Integer limit_Count;

		public void setFeature_detection_root__project_scnfl_mapping_tbl__id(
				Integer feature_detection_root__project_scnfl_mapping_tbl__id) {
			this.feature_detection_root__project_scnfl_mapping_tbl__id = feature_detection_root__project_scnfl_mapping_tbl__id;
		}
		public void setLimit_Offset(Integer limit_Offset) {
			this.limit_Offset = limit_Offset;
		}
		public void setLimit_Count(Integer limit_Count) {
			this.limit_Count = limit_Count;
		}
		public void setOptional__feature_detection_persistent_feature_entry_id(
				Integer optional__feature_detection_persistent_feature_entry_id) {
			this.optional__feature_detection_persistent_feature_entry_id = optional__feature_detection_persistent_feature_entry_id;
		}
    }
    
    public static class WebserviceResult {

    	//  One "Result Entry" is an entry in each of the lists with the same index

    	private List<Integer> featureDetection_PersistentFeatureEntry_Id_List;
    	private List<Integer> featureDetection_SingularFeatureEntry_Id_List;
    	private List<Integer> featureDetection_Root_Id_List;
    	
		public List<Integer> getFeatureDetection_PersistentFeatureEntry_Id_List() {
			return featureDetection_PersistentFeatureEntry_Id_List;
		}
		public List<Integer> getFeatureDetection_SingularFeatureEntry_Id_List() {
			return featureDetection_SingularFeatureEntry_Id_List;
		}
		public List<Integer> getFeatureDetection_Root_Id_List() {
			return featureDetection_Root_Id_List;
		};
    }

}


