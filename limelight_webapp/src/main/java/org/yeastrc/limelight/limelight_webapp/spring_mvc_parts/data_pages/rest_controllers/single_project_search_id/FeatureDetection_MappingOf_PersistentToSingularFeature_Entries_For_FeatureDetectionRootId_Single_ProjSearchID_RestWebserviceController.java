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
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_Utils;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher.FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher.FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.Feature_detection_root_Id_For_Feature_detection_root__project_scnfl_mapping_tbl_id__ProjectSearchId_Searcher.Feature_detection_root_Id_For_Feature_detection_root__project_scnfl_mapping_tbl_id__ProjectSearchId_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.Feature_detection_root_Id_For_Feature_detection_root__project_scnfl_mapping_tbl_id__ProjectSearchId_Searcher_IF;
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
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.SCAN_FILE_FEATURE_DETECTION_MAP_PERSISTENT_TO_SINGULAR_FEATURE_ENTRIES_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER_VERSION_0001;

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
	private Feature_detection_root_Id_For_Feature_detection_root__project_scnfl_mapping_tbl_id__ProjectSearchId_Searcher_IF feature_detection_root_Id_For_Feature_detection_root__project_scnfl_mapping_tbl_id__ProjectSearchId_Searcher;

	@Autowired
	private FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_IF featureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher;
	
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

    		Integer projectSearchId = webserviceRequest.projectSearchId;
    		
    		if ( webserviceRequest.projectSearchId == null ) {
    			log.warn( "projectSearchId is not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( webserviceRequest.feature_detection_root__project_scnfl_mapping_tbl__id == null ) {
    			log.warn( "feature_detection_root__project_scnfl_mapping_tbl__id is not assigned" );
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

    		Feature_detection_root_Id_For_Feature_detection_root__project_scnfl_mapping_tbl_id__ProjectSearchId_Searcher_Result feature_detection_root_Id_Result =
    					feature_detection_root_Id_For_Feature_detection_root__project_scnfl_mapping_tbl_id__ProjectSearchId_Searcher
    					.feature_detection_root__project_scnfl_mapping_tbl__id_ValidateIsIn_ProjectSearchId__For_projectSearchId_feature_detection_root__project_scnfl_mapping_tbl__id(
    							projectSearchId, webserviceRequest.feature_detection_root__project_scnfl_mapping_tbl__id);

    		if ( feature_detection_root_Id_Result == null ) {
    			String msg = "feature_detection_root__project_scnfl_mapping_tbl__id NOT Found for projectSearchId.  projectSearchId: " + projectSearchId
    					+ ", feature_detection_root__project_scnfl_mapping_tbl__id: " + webserviceRequest.feature_detection_root__project_scnfl_mapping_tbl__id;
    			log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
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
					featureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher.getForFeatureDetectionRootId(feature_detection_root_Id_Result.getFeature_detection_root_id());

			List<FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item> featureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item_List =
					featureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result.getEntries();

			List<WebserviceResult_Entry> result_List = new ArrayList<>(  featureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item_List.size() );

			for ( FeatureDetection_Map_PersistentToSingular_Feature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item persistentFeature_ResultItem : featureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item_List ) {

				WebserviceResult_Entry featureDetection_Entry = new WebserviceResult_Entry();
				featureDetection_Entry.featureDetection_PersistentFeatureEntry_Id= persistentFeature_ResultItem.getFeatureDetection_PersistentFeatureEntry_Id();
				featureDetection_Entry.featureDetection_SingularFeatureEntry_Id= persistentFeature_ResultItem.getFeatureDetection_SingularFeatureEntry_Id();
				featureDetection_Entry.featureDetection_Root_Id= persistentFeature_ResultItem.getFeatureDetection_Root_Id();
				
				result_List.add(featureDetection_Entry);
			}
			
    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.result_List = result_List;

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
    	
    	private Integer projectSearchId;
    	private Integer feature_detection_root__project_scnfl_mapping_tbl__id;

		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public void setFeature_detection_root__project_scnfl_mapping_tbl__id(
				Integer feature_detection_root__project_scnfl_mapping_tbl__id) {
			this.feature_detection_root__project_scnfl_mapping_tbl__id = feature_detection_root__project_scnfl_mapping_tbl__id;
		}
    }
    
    public static class WebserviceResult {
    	
    	private List<WebserviceResult_Entry> result_List;

		public List<WebserviceResult_Entry> getResult_List() {
			return result_List;
		}
    }

    public static class WebserviceResult_Entry {

		private int featureDetection_PersistentFeatureEntry_Id;
		private int featureDetection_SingularFeatureEntry_Id;
		private int featureDetection_Root_Id;
		
		public int getFeatureDetection_PersistentFeatureEntry_Id() {
			return featureDetection_PersistentFeatureEntry_Id;
		}
		public int getFeatureDetection_SingularFeatureEntry_Id() {
			return featureDetection_SingularFeatureEntry_Id;
		}
		public int getFeatureDetection_Root_Id() {
			return featureDetection_Root_Id;
		}
		
		
    }
}

