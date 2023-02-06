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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.multiple_project_search_id;

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
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearch_TagCategoryInProject_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchTags_ForProjectSearchIdsSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchTagCategories_ForIdsAndProjectId_Searcher.ProjectSearchTagCategories_ForIdsAndProjectId_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchTagCategories_ForIdsAndProjectId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchTags_ForProjectSearchIdsSearcher.ProjectSearchTags_ForProjectSearchIdsSearcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Get Search Tags and Search Tag Categories For Project Search Ids
 * 
 */
@RestController
public class SearchTags_Get_For_ProjectSearchIds_RestWebservice {

	private static final Logger log = LoggerFactory.getLogger( SearchTags_Get_For_ProjectSearchIds_RestWebservice.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private ProjectSearchTags_ForProjectSearchIdsSearcher_IF projectSearchTags_ForProjectSearchIdsSearcher;
	
	@Autowired
	private ProjectSearch_TagCategoryInProject_DAO_IF projectSearch_TagCategoryInProject_DAO;
	
	@Autowired
	private ProjectSearchTagCategories_ForIdsAndProjectId_Searcher_IF projectSearchTagCategories_ForIdsAndProjectId_Searcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	

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
					+ AA_RestWSControllerPaths_Constants.SEARCH_TAGS_GET_FOR_PROJECT_SEARCH_ID_LIST_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  controllerEntry(

    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    	try {
//    		log.warn( "controllerEntry(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );
    		
    		if ( webserviceRequest.getProjectSearchIds() == null || webserviceRequest.getProjectSearchIds().isEmpty() ) {
    			log.warn( "ProjectSearchIds is null or empty." );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		////////////////

    		//  AUTH - validate access

    		//  throws an exception if access is not valid that is turned into a webservice response by Spring

    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    				validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds
    				.validatePublicAccessCodeReadAllowed(webserviceRequest.getProjectSearchIds(), httpServletRequest );

    		////////////////

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = 
					validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getWebSessionAuthAccessLevel();
			
    		List<Integer> projectIdsForProjectSearchIds = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds();

    		if ( projectIdsForProjectSearchIds.isEmpty() ) {
    			log.warn( "projectIdsForProjectSearchIds.isEmpty" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		if ( projectIdsForProjectSearchIds.size() > 1 ) {
    			log.warn( "projectIdsForProjectSearchIds.size > 1. projectIdsForProjectSearchIds.size: " + projectIdsForProjectSearchIds.size() );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		int projectId = projectIdsForProjectSearchIds.get(0);
    		
    		///
    		

    		WebserviceResult webserviceResult = new WebserviceResult();
    		
    		if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
    			
    			webserviceResult.userCanEditSearchTags = true;
    		}
    		
    		
        	List<WebserviceResult_SingleProjectSearchId> entriesPerSingleProjectSearchId = null;
        	
        	Set<Integer> tagCategoryIdsAllSet = null;

    		{
    			Integer id_For_UncategorizedFakeRecord = projectSearch_TagCategoryInProject_DAO.getId_For_UncategorizedFakeRecord();
        	
    			List<ProjectSearchTags_ForProjectSearchIdsSearcher_ResultItem> results = 
    					projectSearchTags_ForProjectSearchIdsSearcher.getProjectSearchTags_ForProjectSearchIds(webserviceRequest.projectSearchIds);

    			Map<Integer, WebserviceResult_SingleProjectSearchId> webserviceResult_SingleProjectSearchId_Map_Key_ProjectSearchId = new HashMap<>();
    			
    			tagCategoryIdsAllSet = new HashSet<>( results.size() );

    			for ( ProjectSearchTags_ForProjectSearchIdsSearcher_ResultItem resultItem : results ) {
    				WebserviceResult_SingleProjectSearchId webserviceResult_SingleProjectSearchId = webserviceResult_SingleProjectSearchId_Map_Key_ProjectSearchId.get(resultItem.getProjectSearchId());
    				if ( webserviceResult_SingleProjectSearchId == null ) {
    					webserviceResult_SingleProjectSearchId = new WebserviceResult_SingleProjectSearchId();
    					webserviceResult_SingleProjectSearchId.projectSearchId = resultItem.getProjectSearchId();
    					webserviceResult_SingleProjectSearchId_Map_Key_ProjectSearchId.put(resultItem.getProjectSearchId(), webserviceResult_SingleProjectSearchId);
    				}
    				
    				WebserviceResult_Tag webserviceResult_SearchTag = new WebserviceResult_Tag();
    				webserviceResult_SearchTag.tag_id = resultItem.getTag_id();
    				webserviceResult_SearchTag.tag_string = resultItem.getTag_string();
    				webserviceResult_SearchTag.tag_Color_Font = resultItem.getTag_Color_Font(); 
    				webserviceResult_SearchTag.tag_Color_Background = resultItem.getTag_Color_Background();
    				webserviceResult_SearchTag.tag_Color_Border = resultItem.getTag_Color_Border();
    				
    				//  Set returned tag category id to null if db has tag category id for uncategorized
    				
    				if ( id_For_UncategorizedFakeRecord != null && id_For_UncategorizedFakeRecord.intValue() == resultItem.getTag_category_id() ) {
    					webserviceResult_SearchTag.tag_category_id = null;
    				} else {
        				webserviceResult_SearchTag.tag_category_id = resultItem.getTag_category_id();
    				}
    				
    				webserviceResult_SingleProjectSearchId.entriesPerTag.add(webserviceResult_SearchTag);
    				
    				//  Get all unique category id, skip Uncategorized
    				if ( id_For_UncategorizedFakeRecord == null || id_For_UncategorizedFakeRecord.intValue() != resultItem.getTag_category_id() ) {
    					tagCategoryIdsAllSet.add( resultItem.getTag_category_id() );
    				}
    			}

    			entriesPerSingleProjectSearchId = new ArrayList<>( webserviceResult_SingleProjectSearchId_Map_Key_ProjectSearchId.values() );
    		}

    		webserviceResult.entriesPerSingleProjectSearchId = entriesPerSingleProjectSearchId;
    		
    		if ( ! tagCategoryIdsAllSet.isEmpty() ) {

    			List<ProjectSearchTagCategories_ForIdsAndProjectId_Searcher_ResultItem> results_ProjectSearchTagCategories_ForIdsAndProjectId = 
    					projectSearchTagCategories_ForIdsAndProjectId_Searcher.getProjectSearchTagCategories_ForIdsAndProjectId(tagCategoryIdsAllSet, projectId);
    			
    			 List<WebserviceResult_TagCategory> categories_Array = new ArrayList<>( results_ProjectSearchTagCategories_ForIdsAndProjectId.size() );

    			for ( ProjectSearchTagCategories_ForIdsAndProjectId_Searcher_ResultItem dbItem : results_ProjectSearchTagCategories_ForIdsAndProjectId ) {

    				WebserviceResult_TagCategory tagCategory = new WebserviceResult_TagCategory();
    				tagCategory.category_id = dbItem.getCategory_id();
    				tagCategory.category_label = dbItem.getCategory_label();
    				tagCategory.label_Color_Font = dbItem.getLabel_Color_Font();
    				tagCategory.label_Color_Background = dbItem.getLabel_Color_Background();
    				tagCategory.label_Color_Border = dbItem.getLabel_Color_Border();
    				
    				categories_Array.add(tagCategory);
    			}
    			
    			webserviceResult.categories_Array = categories_Array;
    		}

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

    //////////////////////////////////////////
    
    //   Webservice Request and Result
    
    /**
     * 
     *
     */
    public static class WebserviceRequest {

    	private List<Integer> projectSearchIds;

		public List<Integer> getProjectSearchIds() {
			return projectSearchIds;
		}
		public void setProjectSearchIds(List<Integer> projectSearchIds) {
			this.projectSearchIds = projectSearchIds;
		}
    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    
    	private boolean userCanEditSearchTags;
    	private List<WebserviceResult_SingleProjectSearchId> entriesPerSingleProjectSearchId;
    	
    	private List<WebserviceResult_TagCategory> categories_Array;

		public List<WebserviceResult_SingleProjectSearchId> getEntriesPerSingleProjectSearchId() {
			return entriesPerSingleProjectSearchId;
		}
		public boolean isUserCanEditSearchTags() {
			return userCanEditSearchTags;
		}
		public List<WebserviceResult_TagCategory> getCategories_Array() {
			return categories_Array;
		}
    }

    /**
     * 
     *
     */
    public static class WebserviceResult_SingleProjectSearchId {

        private int projectSearchId;
        private List<WebserviceResult_Tag> entriesPerTag = new ArrayList<>();
        
		public int getProjectSearchId() {
			return projectSearchId;
		}
		public List<WebserviceResult_Tag> getEntriesPerTag() {
			return entriesPerTag;
		}
    }

    /**
     * 
     *
     */
    public static class WebserviceResult_Tag {
		
    	private int tag_id;
    	private Integer tag_category_id;
		private String tag_string;
		private String tag_Color_Font;
    	private String tag_Color_Background;
    	private String tag_Color_Border;
		
		public int getTag_id() {
			return tag_id;
		}
		public String getTag_string() {
			return tag_string;
		}
		public String getTag_Color_Font() {
			return tag_Color_Font;
		}
		public String getTag_Color_Background() {
			return tag_Color_Background;
		}
		public String getTag_Color_Border() {
			return tag_Color_Border;
		}
		public Integer getTag_category_id() {
			return tag_category_id;
		}

    }

    /**
     * 
     *
     */
    public static class WebserviceResult_TagCategory {
		
    	private int category_id;
		private String category_label;
		private String label_Color_Font;
    	private String label_Color_Background;
    	private String label_Color_Border;
    	
		public int getCategory_id() {
			return category_id;
		}
		public String getCategory_label() {
			return category_label;
		}
		public String getLabel_Color_Font() {
			return label_Color_Font;
		}
		public String getLabel_Color_Background() {
			return label_Color_Background;
		}
		public String getLabel_Color_Border() {
			return label_Color_Border;
		}
    }
}

