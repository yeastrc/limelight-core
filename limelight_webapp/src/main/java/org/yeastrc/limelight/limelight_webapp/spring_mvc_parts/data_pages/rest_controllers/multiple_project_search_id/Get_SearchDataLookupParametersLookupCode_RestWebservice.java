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
import java.util.List;

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
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchDataLookupParametersLookupRootIdTypes;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchDataLookupParametersLookup_CreatedByUserType;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.constants.SearchDataLookupParams_VersionNumber;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_ProjectSearchIds;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_MainProcessingIF;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds.SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds_Result;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.params.SearchDataLookupParams_CreatedByInfo;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Get Search Data Lookup Parameters Lookup Code from Provided Params
 * 
 *  Provided Params can be:
 *  
 *  1)   Project Search Ids and their cutoffs and annotation types to display (or request defaults)
 * 
 * Returns List<WebserviceResultAnnotationTypeItem>
 */
@RestController
public class Get_SearchDataLookupParametersLookupCode_RestWebservice {

	private static final Logger log = LoggerFactory.getLogger( Get_SearchDataLookupParametersLookupCode_RestWebservice.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SearchDataLookupParams_MainProcessingIF searchDataLookupParams_MainProcessing;
	
	@Autowired
	private SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIdsIF searchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds;
	
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
					+ AA_RestWSControllerPaths_Constants.GET_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_REST_WEBSERVICE_CONTROLLER
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
    		
    		if ( webserviceRequest.getSjklwuiowerzUIryhnIOWzq() == null || ( ! webserviceRequest.getSjklwuiowerzUIryhnIOWzq() )) {
    			log.warn( "webserviceRequest.getSjklwuiowerzUIryhnIOWzq() not true" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
			SearchDataLookupParams_CreatedByInfo searchDataLookupParams_CreatedByInfo = new SearchDataLookupParams_CreatedByInfo();

			// TODO  !!!!!! Update these 2 if/when have user id
			//			searchDataLookupParams_CreatedByInfo.setCreatedByUserId(  );
			searchDataLookupParams_CreatedByInfo.setCreatedByUserType(  
					SearchDataLookupParametersLookup_CreatedByUserType.WEB_NON_USER );
			
			searchDataLookupParams_CreatedByInfo.setCreatedByRemoteIP( httpServletRequest.getRemoteAddr() );
			

    		SearchDataLookupParamsRoot searchDataLookupParamsRoot = null;
    		String searchDataLookupParamsCode = null;
    		

    		if ( webserviceRequest.getProjectSearchIds_CreateDefault() == null && webserviceRequest.getSearchDataLookupParamsRoot() == null ) {
    			log.warn( "Must specify ProjectSearchIds_CreateDefault or SearchDataLookupParamsRoot.  Neither are populated." );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
//    		if ( webserviceRequest.getProjectSearchIds_CreateDefault() != null && webserviceRequest.getSearchDataLookupParamsRoot() != null ) {
//    			log.warn( "Cannot specify both ProjectSearchIds_CreateDefault and SearchDataLookupParamsRoot" );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
    		
    		if ( webserviceRequest.getProjectSearchIds_CreateDefault() != null ) {
    			
        		////////////////
        		
        		//  AUTH - validate access
        		
        		//  throws an exception if access is not valid that is turned into a webservice response by Spring
        		
        		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
        				validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds
        				.validatePublicAccessCodeReadAllowed( webserviceRequest.getProjectSearchIds_CreateDefault(), httpServletRequest );

        		////////////////
       		
        		UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getUserSession();

        		if ( userSession != null && userSession.getUserId() != null ) {
        		
        			searchDataLookupParams_CreatedByInfo.setCreatedByUserId( userSession.getUserId() );
        			searchDataLookupParams_CreatedByInfo.setCreatedByUserType(  
        					SearchDataLookupParametersLookup_CreatedByUserType.WEB_USER );
        		}
    		} 
    		
    		if ( webserviceRequest.getSearchDataLookupParamsRoot() != null ) {

    			//  Get Project Search Ids for Auth Check
    			
    			searchDataLookupParamsRoot = webserviceRequest.getSearchDataLookupParamsRoot();
    			
    			SearchDataLookupParams_For_ProjectSearchIds searchDataLookupParams_For_ProjectSearchIds = searchDataLookupParamsRoot.getParamsForProjectSearchIds();
    			if ( searchDataLookupParams_For_ProjectSearchIds == null ) {
        			log.warn( "searchDataLookupParamsRoot populated but searchDataLookupParamsRoot.paramsForProjectSearchIds is not" );
        			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}
    			List<SearchDataLookupParams_For_Single_ProjectSearchId> paramsForProjectSearchIdsList = searchDataLookupParams_For_ProjectSearchIds.getParamsForProjectSearchIdsList();
    			if ( searchDataLookupParams_For_ProjectSearchIds == null || paramsForProjectSearchIdsList.isEmpty() ) {
        			log.warn( "searchDataLookupParamsRoot populated but paramsForProjectSearchIdsList is not" );
        			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}
    			
    			List<Integer> projectSearchIds = new ArrayList<>( paramsForProjectSearchIdsList.size() );

    			for ( SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId : paramsForProjectSearchIdsList ) {
    				int projectSearchId = searchDataLookupParams_For_Single_ProjectSearchId.getProjectSearchId();
    				projectSearchIds.add( projectSearchId );
    			}

        		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
        				validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds
        				.validatePublicAccessCodeReadAllowed( projectSearchIds, httpServletRequest );

        		////////////////
       		
        		UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getUserSession();

        		if ( userSession != null && userSession.getUserId() != null ) {
        		
        			searchDataLookupParams_CreatedByInfo.setCreatedByUserId( userSession.getUserId() );
        			searchDataLookupParams_CreatedByInfo.setCreatedByUserType(  
        					SearchDataLookupParametersLookup_CreatedByUserType.WEB_USER );
        		}

    			Integer versionNumber = searchDataLookupParamsRoot.getVersionNumber();
    			
    			if ( versionNumber == null ) {
    				throw new LimelightErrorDataInWebRequestException( "No Version Number" );
    			}
    			if ( versionNumber < SearchDataLookupParams_VersionNumber.MINIMUM_VERSION_NUMBER ) {
    				throw new LimelightErrorDataInWebRequestException( "Version Number < minimum. versionNumber: " 
    						+ versionNumber + ", minimum: " + SearchDataLookupParams_VersionNumber.MINIMUM_VERSION_NUMBER );
    			}
    		}
    		
    		SearchDataLookupParamsRoot newSearchDataLookupParamsRoot = null;
    		

    		if ( webserviceRequest.getProjectSearchIds_CreateDefault() != null ) {
    			
    			if ( webserviceRequest.getSearchDataLookupParamsRoot() != null ) {
    				
    				//  Adding to existing SearchDataLookupParamsRoot so Version must match

        			Integer versionNumber = searchDataLookupParamsRoot.getVersionNumber();
        			
        			if ( versionNumber == null ) {
        				throw new LimelightErrorDataInWebRequestException( "No Version Number" );
        			}
        			if ( versionNumber != SearchDataLookupParams_VersionNumber.CURRENT_VERSION_NUMBER ) {
        				throw new LimelightErrorDataInWebRequestException( "Version Number Not Match Current. versionNumber: " 
        						+ versionNumber + ", Current: " + SearchDataLookupParams_VersionNumber.CURRENT_VERSION_NUMBER );
        			}
    			}
    			        		
    			SearchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds_Result result = 
    			searchDataLookupParams_Create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds
    			.create_Save_ForDefaultCutoffsAnnTypeDisplay_FromProjectSearchIds(
    					webserviceRequest.getProjectSearchIds_CreateDefault(), 
    					searchDataLookupParams_CreatedByInfo,
    					null /* projectSearchIdsToSearchIds */, 
    					searchDataLookupParamsRoot );

    			searchDataLookupParamsCode = result.getSearchDataLookupParamsCode();
    			
    			newSearchDataLookupParamsRoot = result.getSearchDataLookupParamsRoot();
    		
    		} else if ( webserviceRequest.getSearchDataLookupParamsRoot() != null ) {
    			
    			newSearchDataLookupParamsRoot = webserviceRequest.getSearchDataLookupParamsRoot();

    			//  Save and create code
    			
    			searchDataLookupParamsCode = 
    					searchDataLookupParams_MainProcessing
    					.searchDataLookupParams_Save_Create_Code( 
    							searchDataLookupParamsRoot, 
    							SearchDataLookupParametersLookupRootIdTypes.PROJECT_SEARCH_IDS, 
    							null, // singleProjectSearchIdCreatedDefaultsFor, 
    							searchDataLookupParams_CreatedByInfo );
    		}

    		WebserviceResult webserviceResult = new WebserviceResult();
    	    		
    		webserviceResult.setSearchDataLookupParamsRoot( newSearchDataLookupParamsRoot );
    		webserviceResult.setSearchDataLookupParamsCode( searchDataLookupParamsCode );

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

    	//  Populate one and only one of these
    	
    	private SearchDataLookupParamsRoot searchDataLookupParamsRoot;

    	private List<Integer> projectSearchIds_CreateDefault;
    	
    	/**
    	 * Must be true
    	 */
    	private Boolean sjklwuiowerzUIryhnIOWzq;

		public SearchDataLookupParamsRoot getSearchDataLookupParamsRoot() {
			return searchDataLookupParamsRoot;
		}
		public void setSearchDataLookupParamsRoot(SearchDataLookupParamsRoot searchDataLookupParamsRoot) {
			this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
		}
		public List<Integer> getProjectSearchIds_CreateDefault() {
			return projectSearchIds_CreateDefault;
		}
		public void setProjectSearchIds_CreateDefault(List<Integer> projectSearchIds_CreateDefault) {
			this.projectSearchIds_CreateDefault = projectSearchIds_CreateDefault;
		}
		public Boolean getSjklwuiowerzUIryhnIOWzq() {
			return sjklwuiowerzUIryhnIOWzq;
		}
		public void setSjklwuiowerzUIryhnIOWzq(Boolean sjklwuiowerzUIryhnIOWzq) {
			this.sjklwuiowerzUIryhnIOWzq = sjklwuiowerzUIryhnIOWzq;
		}
    }
    
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    
    	private SearchDataLookupParamsRoot searchDataLookupParamsRoot;
    	private String searchDataLookupParamsCode;

		public SearchDataLookupParamsRoot getSearchDataLookupParamsRoot() {
			return searchDataLookupParamsRoot;
		}
		public void setSearchDataLookupParamsRoot(SearchDataLookupParamsRoot searchDataLookupParamsRoot) {
			this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
		}
		public String getSearchDataLookupParamsCode() {
			return searchDataLookupParamsCode;
		}
		public void setSearchDataLookupParamsCode(String searchDataLookupParamsCode) {
			this.searchDataLookupParamsCode = searchDataLookupParamsCode;
		}

    }
    
}
