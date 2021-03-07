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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.project_search_based_insert_update_delete;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.apache.commons.lang3.StringUtils;
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
import org.yeastrc.limelight.limelight_webapp.db_dto.DataPageDefaultViewProjectSearchPagesDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.services.SetDefaultView_ProjectSearchPages_Insert_Service_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Set a Default View
 * 
 * Project Owner Only
 *
 */
@RestController
public class Set_Default_View__Insert__RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Set_Default_View__Insert__RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SetDefaultView_ProjectSearchPages_Insert_Service_IF setDefaultView_ProjectSearchPages_Insert_Service;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Set_Default_View__Insert__RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.SAVE_DEFAULT_VIEW_PROJECT_SEARCH_BASED_PAGE_REST_WEBSERVICE_CONTROLLER
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
    		
    		Integer projectSearchId = webserviceRequest.getProjectSearchId();
    		
        	final String pageControllerPathFromWebserviceRequest = webserviceRequest.getPageControllerPath();
        	final String pageCurrentURL_StartAtPageController = webserviceRequest.getPageCurrentURL_StartAtPageController();
        	final String searchDataLookupParametersCode = webserviceRequest.getSearchDataLookupParametersCode();

    		if ( projectSearchId == null || projectSearchId.intValue() == 0 ) {
    			log.warn( "No Project Search Id" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

        	if ( StringUtils.isEmpty( pageControllerPathFromWebserviceRequest ) ) {
    			log.warn( "No pageControllerPath" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
        	}
        	if ( StringUtils.isEmpty( pageCurrentURL_StartAtPageController ) ) {
    			log.warn( "No pageCurrentURL_StartAtPageController" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
        	}
        	if ( StringUtils.isEmpty( searchDataLookupParametersCode )  ) {
    			log.warn( "No searchDataLookupParametersCode" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
        	}

    		//  Validate pageCurrentURL_StartAtPageController starts with pageControllerPath 
    		
    		if ( ! pageCurrentURL_StartAtPageController.startsWith( pageControllerPathFromWebserviceRequest ) ) {
    			log.warn( "pageCurrentURL_StartAtPageController does not start with pageControllerPath.  pageCurrentURL_StartAtPageController: "
    					+ pageCurrentURL_StartAtPageController
    					+ ", pageControllerPath: " + pageControllerPathFromWebserviceRequest
    					+ ". projectSearchId: " + projectSearchId );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		//  Validate pageCurrentURL_StartAtPageController are allowed
    		
    		String pageControllerPathInURL = null;
    			
    		for ( String allowedControllerPath : AA_PageControllerPaths_Constants.PATHS_ALLOWED_FOR_SAVE_VIEW ) {

    			if ( pageCurrentURL_StartAtPageController.startsWith( allowedControllerPath ) ) {
    				pageControllerPathInURL = allowedControllerPath;
    				break;
    			}
    		}
    		if ( pageControllerPathInURL == null ) {
    			log.warn( "pageCurrentURL_StartAtPageController does not start an allowed controller path.  pageCurrentURL_StartAtPageController: "
    					+ pageCurrentURL_StartAtPageController
    					+ ". projectSearchId: " + projectSearchId );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		if ( pageCurrentURL_StartAtPageController.startsWith( AA_PageControllerPaths_Constants.EXPERIMENT_ID_BASED_PAGE_CONTROLLER_START ) ) {
    			log.warn( "pageCurrentURL_StartAtPageController does start with Experiment ID Based Path and Experiment Id is NOT populated.  pageCurrentURL_StartAtPageController: "
    					+ pageCurrentURL_StartAtPageController
    					+ ". projectSearchId: " + projectSearchId );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		
    		////////////////
    		
    		//  AUTH - validate access
    		
    		//  throws an exception if access is not valid that is turned into a webservice response by Spring
    		
    		List<Integer> projectSearchIds = new ArrayList<>( 1 );
    		projectSearchIds.add( projectSearchId );
    		
    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    				validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validateProjectOwnerAllowed( projectSearchIds, httpServletRequest );

    		List<Integer> projectIdsForProjectSearchIds = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds();
    		
    		UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getUserSession();


    		if ( projectIdsForProjectSearchIds.isEmpty() ) {
    			String msg = "Project Search Id resulted in No Project Id.  projectSearchId: " + projectSearchId;
    			log.error( msg );
    			throw new LimelightInternalErrorException( msg );
    		}
    		
    		if ( projectIdsForProjectSearchIds.size() > 1 ) { // Should NEVER Happen
    			String msg = "Project Search Ids resulted in > 1 Project Id.  projectIdsForProjectSearchIds: " 
    					+ StringUtils.join( projectIdsForProjectSearchIds )
    					+ " ;  projectSearchId: " + projectSearchId;
    			log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		Integer projectId = projectIdsForProjectSearchIds.get( 0 );
    		
    		Integer userId = null;
    		
    		if ( userSession != null ) {
    			userId = userSession.getUserId();
    		}
    		if ( userId == null ) {
    			throw new LimelightInternalErrorException( "userId == null and passed access check" );
    		}
    		
    		//   End Auth
    		
    		///////////
    		
    		DataPageDefaultViewProjectSearchPagesDTO item = new DataPageDefaultViewProjectSearchPagesDTO();

    		item.setProjectSearchId( projectSearchId );
			item.setPageControllerPath( pageControllerPathInURL );

			item.setUserIdCreated(userId);
			item.setUserIdLastUpdated(userId);
			item.setUrlStartAtPageControllerPath( pageCurrentURL_StartAtPageController );
			item.setSearchDataLookupParamsString( searchDataLookupParametersCode );

			setDefaultView_ProjectSearchPages_Insert_Service.setDefaultView( item );
    		

    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.status = true; // value ignored in Javascript code

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
    public static class WebserviceRequest {
    	
    	private Integer projectSearchId;
    	private String pageControllerPath;
    	private String pageCurrentURL_StartAtPageController;
    	private String searchDataLookupParametersCode;
    	
		public String getPageControllerPath() {
			return pageControllerPath;
		}
		public void setPageControllerPath(String pageControllerPath) {
			this.pageControllerPath = pageControllerPath;
		}
		public String getPageCurrentURL_StartAtPageController() {
			return pageCurrentURL_StartAtPageController;
		}
		public void setPageCurrentURL_StartAtPageController(String pageCurrentURL_StartAtPageController) {
			this.pageCurrentURL_StartAtPageController = pageCurrentURL_StartAtPageController;
		}
		public String getSearchDataLookupParametersCode() {
			return searchDataLookupParametersCode;
		}
		public void setSearchDataLookupParametersCode(String searchDataLookupParametersCode) {
			this.searchDataLookupParametersCode = searchDataLookupParametersCode;
		}
		public Integer getProjectSearchId() {
			return projectSearchId;
		}
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}

    }
    
    public static class WebserviceResult {
    	private boolean status;

		public boolean isStatus() {
			return status;
		}

		public void setStatus(boolean status) {
			this.status = status;
		}

    }
    
    
}


