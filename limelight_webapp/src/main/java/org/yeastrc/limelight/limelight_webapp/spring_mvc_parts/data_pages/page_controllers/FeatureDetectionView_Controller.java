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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.constants.WebConstants;
import org.yeastrc.limelight.limelight_webapp.constants.WebErrorPageKeysConstants;
import org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_ProjectSearchIds;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_GetRecordForCodeIF;
import org.yeastrc.limelight.limelight_webapp.searchers.Feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher.Feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.Feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectIdsForProjectSearchIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFile_For_ProjectScanFileId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.error_pages_controllers.AA_ErrorPageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers.AA_UserAccount_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.PopulatePageHeaderDataIF;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;

@Controller
//@RequestMapping("/")
public class FeatureDetectionView_Controller {

	private static final Logger log = LoggerFactory.getLogger( FeatureDetectionView_Controller.class );

	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;
	
	@Autowired
	private Feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_IF feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher;
	
	@Autowired
	private ProjectScanFile_For_ProjectScanFileId_Searcher_IF projectScanFile_For_ProjectScanFileId_Searcher;

	@Autowired
	private SearchDataLookupParams_GetRecordForCodeIF searchDataLookupParams_GetRecordForCode;

	@Autowired
	private ProjectIdsForProjectSearchIdsSearcherIF projectIdsForProjectSearchIdsSearcher;

	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;
	
	@Autowired
	private PopulatePageHeaderDataIF populatePageHeaderData;

	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	
    /**
	 * 
	 */
	public FeatureDetectionView_Controller() {
		super();

		log.info( "ProteinView_Controller() constructor" );
		log.info( "PATH_PARAMETER_FEATURE_DETECTION_ID: " + PATH_PARAMETER_FEATURE_DETECTION_ID );
		log.info( "PATH_PARAMETER_FEATURE_DETECTION_ID_REFERRER_URL: " + PATH_PARAMETER_FEATURE_DETECTION_ID_REFERRER_URL );
		log.info( "PATH_PARAMETER_FEATURE_DETECTION_ID_SEARCH_LOOKUP_PARAMS_CODE: " + PATH_PARAMETER_FEATURE_DETECTION_ID_SEARCH_LOOKUP_PARAMS_CODE );
		log.info( "PATH_PARAMETER_FEATURE_DETECTION_ID_SEARCH_LOOKUP_PARAMS_CODE_REFERRER_URL: " + PATH_PARAMETER_FEATURE_DETECTION_ID_SEARCH_LOOKUP_PARAMS_CODE_REFERRER_URL );
		log.info( "PATH_PARAMETER_FEATURE_DETECTION_ID_PAGE_STATE: " + PATH_PARAMETER_FEATURE_DETECTION_ID_PAGE_STATE );
		log.info( "PATH_PARAMETER_FEATURE_DETECTION_ID_PAGE_STATE_REFERRER_URL: " + PATH_PARAMETER_FEATURE_DETECTION_ID_PAGE_STATE_REFERRER_URL );
		log.info( "PATH_PARAMETER_FEATURE_DETECTION_ID_SEARCH_LOOKUP_PARAMS_CODE_PAGE_STATE: " + PATH_PARAMETER_FEATURE_DETECTION_ID_SEARCH_LOOKUP_PARAMS_CODE_PAGE_STATE );
		log.info( "PATH_PARAMETER_FEATURE_DETECTION_ID_SEARCH_LOOKUP_PARAMS_CODE_PAGE_STATE_REFERRER_URL: " + PATH_PARAMETER_FEATURE_DETECTION_ID_SEARCH_LOOKUP_PARAMS_CODE_PAGE_STATE_REFERRER_URL );
	}

	
	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_PageControllerPaths_Constants.FEATURE_DETECTION_VIEW_PAGE_CONTROLLER;

	/**
	 * Controller Path: Feature Detection Id Encoded ('/c/#')
	 */
	private static final String PATH_PARAMETER_FEATURE_DETECTION_ID = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID__DATA__PATH_ADDITION; // Path for when there is no query data (use defaults)

	/**
	 * Controller Path:  Feature Detection Id Encoded ('/c/#') and Referrer URL ('/r')
	 */
	private static final String PATH_PARAMETER_FEATURE_DETECTION_ID_REFERRER_URL = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID__DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_REFERRED_BY_OTHER_PAGE_NO_PAGE_STATE; // Path for when there is no query data and is referrer URL (use defaults).


	/**
	 * Controller Path: Feature Detection Id Encoded ('/c/#') and Search Params Lookup ('/c/<code>')
	 */
	private static final String PATH_PARAMETER_FEATURE_DETECTION_ID_SEARCH_LOOKUP_PARAMS_CODE = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID__DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SEARCH_PARAMS_LOOKUP_CODE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_PATH_ADDITION;

	/**
	 * Controller Path:  Feature Detection Id Encoded ('/c/#') and Search Params Lookup ('/c/<code>') and Referrer URL ('/r')
	 */
	private static final String PATH_PARAMETER_FEATURE_DETECTION_ID_SEARCH_LOOKUP_PARAMS_CODE_REFERRER_URL = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID__DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SEARCH_PARAMS_LOOKUP_CODE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_REFERRED_BY_OTHER_PAGE_NO_PAGE_STATE;

	//  Yes Additional Page State, Has '/q/<value' in URL.

	/**
	 * Controller Path: Feature Detection Id Encoded ('/c/#') and Page State ('/q/<string>')
	 */
	private static final String PATH_PARAMETER_FEATURE_DETECTION_ID_PAGE_STATE = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID__DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_SET_SAME_PAGE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA__PATH_ADDITION;

	/**
	 * Controller Path:  Feature Detection Id Encoded ('/c/#') and Page State ('/q/<string>') and Referrer URL ('/r')
	 */
	private static final String PATH_PARAMETER_FEATURE_DETECTION_ID_PAGE_STATE_REFERRER_URL = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID__DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_SET_SAME_PAGE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FOURTH_PARAMETER_SEPARATOR_REFERRED_BY_OTHER_PAGE_YES_PAGE_STATE;

	/**
	 * Controller Path: Feature Detection Id Encoded ('/c/#') and Search Params Lookup ('/c/<code>') and Page State ('/q/<string>')
	 */
	private static final String PATH_PARAMETER_FEATURE_DETECTION_ID_SEARCH_LOOKUP_PARAMS_CODE_PAGE_STATE = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID__DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SEARCH_PARAMS_LOOKUP_CODE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_SET_SAME_PAGE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA__PATH_ADDITION;

	/**
	 * Controller Path:  Feature Detection Id Encoded ('/c/#') and Search Params Lookup ('/c/<code>') and Page State ('/q/<string>') and Referrer URL ('/r')
	 */
	private static final String PATH_PARAMETER_FEATURE_DETECTION_ID_SEARCH_LOOKUP_PARAMS_CODE_PAGE_STATE_REFERRER_URL = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID__DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SEARCH_PARAMS_LOOKUP_CODE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_SET_SAME_PAGE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FOURTH_PARAMETER_SEPARATOR_REFERRED_BY_OTHER_PAGE_YES_PAGE_STATE;

	/**
	 * Path for when there is only feature detection id, or feature detection id and is referrer URL 
	 * 
	 * @param
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( 
			path = {
					// Feature Detection Id Encoded ('/c/#')
					PATH_PARAMETER_FEATURE_DETECTION_ID,
					
					// Feature Detection Id Encoded ('/c/#') and Referrer URL ('/r')
					PATH_PARAMETER_FEATURE_DETECTION_ID_REFERRER_URL
			} )
	
    public String controllerEntry_FeatureDetectionId(
    		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID__DATA) 
    		String featureDetectionId_String,
    		
    		HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {
		
//		log.warn( "controllerEntryNoOtherPageState(...) called. " );

		return controllerEntryInternal( featureDetectionId_String, null /* searchDataLookupParametersCode */, null /* otherPageState */, httpServletRequest, httpServletResponse );
        
    }

	/**
	 * Path for when there is feature detection id and Search Params Lookup, or feature detection id and Search Params Lookup and is referrer URL 
	 * 
	 * @param
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( path = {
			
			// Feature Detection Id Encoded ('/c/#') and Search Params Lookup ('/c/<code>')
			PATH_PARAMETER_FEATURE_DETECTION_ID_SEARCH_LOOKUP_PARAMS_CODE,

			// Feature Detection Id Encoded ('/c/#') and Search Params Lookup ('/c/<code>') and Referrer URL ('/r')
			PATH_PARAMETER_FEATURE_DETECTION_ID_SEARCH_LOOKUP_PARAMS_CODE_REFERRER_URL
	} )

    public String controllerEntry_FeatureDetectionId_SearchDataLookupParametersCode(
      		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID__DATA) 
    		String featureDetectionId_String,
    		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE) 
    		String searchDataLookupParametersCode,
    		
    		HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {
		
//		log.warn( "controllerEntryWithOtherPageState(...) called. projectSearchIds: " + projectSearchIds
//				+ ", queryData: " + queryData );

		return controllerEntryInternal( featureDetectionId_String, searchDataLookupParametersCode, null /* otherPageState */, httpServletRequest, httpServletResponse );
    }

	/**
	 * Path for when there is Feature Detection Id and Page State, or Feature Detection Id and Page State and is referrer URL 
	 * 
	 * @param
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( path = {
			
			// Feature Detection Id Encoded ('/c/#') and Page State ('/q/<string>')
			PATH_PARAMETER_FEATURE_DETECTION_ID_PAGE_STATE,

			// Feature Detection Id Encoded ('/c/#') and Page State ('/q/<string>') and Referrer URL ('/r')
			PATH_PARAMETER_FEATURE_DETECTION_ID_PAGE_STATE_REFERRER_URL
	} )

    public String controllerEntry_FeatureDetectionId_PageState(
    		
      		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID__DATA) 
    		String featureDetectionId_String,

    		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA)
    		String otherPageState,
    		
    		HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {
		
//		log.warn( "controllerEntryWithOtherPageState(...) called. projectSearchIds: " + projectSearchIds
//				+ ", queryData: " + queryData );

		return controllerEntryInternal( featureDetectionId_String, null /* searchDataLookupParametersCode */, otherPageState, httpServletRequest, httpServletResponse );
    }

	/**
	 * Path for when there is feature detection id and Search Params Lookup and Page State, or feature detection id and Search Params Lookup and Page State and is referrer URL 
	 * 
	 * @param
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( path = {
			
			// Feature Detection Id Encoded ('/c/#') and Search Params Lookup ('/c/<code>') and Page State ('/q/<string>')
			PATH_PARAMETER_FEATURE_DETECTION_ID_SEARCH_LOOKUP_PARAMS_CODE_PAGE_STATE,

			// Feature Detection Id Encoded ('/c/#') and Search Params Lookup ('/c/<code>') and Page State ('/q/<string>') and Referrer URL ('/r')
			PATH_PARAMETER_FEATURE_DETECTION_ID_SEARCH_LOOKUP_PARAMS_CODE_PAGE_STATE_REFERRER_URL
	} )

    public String controllerEntry_FeatureDetectionId_SearchDataLookupParametersCode_PageState(
    		
      		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_FEATURE_DETECTION_ID__DATA) 
    		String featureDetectionId_String,
    		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE) 
    		String searchDataLookupParametersCode,
    		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA)
    		String otherPageState,
    		
    		HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse  ) {
		
//		log.warn( "controllerEntryWithOtherPageState(...) called. projectSearchIds: " + projectSearchIds
//				+ ", queryData: " + queryData );

		return controllerEntryInternal( featureDetectionId_String, searchDataLookupParametersCode, otherPageState, httpServletRequest, httpServletResponse );
    }

	/**
	 * @param featureDetectionId_String
	 * @param searchDataLookupParametersCode
	 * @param otherPageState
	 * @param httpServletRequest
	 * @return
	 */
	private String controllerEntryInternal( 
			
    		String featureDetectionId_String,
    		String searchDataLookupParametersCode,
			String otherPageState, 
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {
		
		String requestURI = null;
		
		try {

    		requestURI = httpServletRequest.getRequestURI(); // /limelight/...

			// mainParametersCodeString IS:  a{scan file spectr code 1st 6 characters}{project id}z{scan file id base 35}
			//  								starting 'a' means first layout version

			if ( ! featureDetectionId_String.startsWith( "a" ) ) {
				String msg = "mainParametersCodeString NOT start with 'a'. The start 'a' is the version";
				log.warn(msg);
				throw new LimelightErrorDataInWebRequestException(msg);
			}

			int feature_detection_root__project_scnfl_mapping_tbl_Id;

			String scanFileCode_firstSix = featureDetectionId_String.substring(1, 7);  // skip first character and then take 6

			{
				String rest = featureDetectionId_String.substring(7);

				String feature_detection_root__project_scnfl_mapping_tbl_IdString = rest;
				
				final int feature_detection_root__project_scnfl_mapping_tbl_IdString__BASE = 35; // Has to match wherever this is being created for the URL

				try {
					feature_detection_root__project_scnfl_mapping_tbl_Id = Integer.parseInt(feature_detection_root__project_scnfl_mapping_tbl_IdString, feature_detection_root__project_scnfl_mapping_tbl_IdString__BASE);	
				} catch ( Exception e ) {
					String msg = "feature_detection_root__project_scnfl_mapping_tbl_IdString not parse to int: " + feature_detection_root__project_scnfl_mapping_tbl_IdString;
					log.warn(msg);
					throw new LimelightErrorDataInWebRequestException( msg );
				}
			}
			
			Feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_Result feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_Result =
					feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher.
					feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id(feature_detection_root__project_scnfl_mapping_tbl_Id);
			
			if ( feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_Result == null ) {
				String msg = "feature_detection_root__project_scnfl_mapping_tbl_Id not in DB: " + feature_detection_root__project_scnfl_mapping_tbl_Id;
				log.warn(msg);

				final int statusCode404 = 404; // Resource not found

				httpServletResponse.setStatus( statusCode404 ); 

				httpServletRequest.setAttribute( WebErrorPageKeysConstants.REQUESTED_DATA_NOT_FOUND, true ); // Control message on error page

				return AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER; //  EARLY EXIT
			}
			
			int project_scan_file_id = feature_detection_root_Id__Project_scan_file_id_For_Feature_detection_root__project_scnfl_mapping_tbl_id_Searcher_Result.getProject_scan_file_id();

			Project_ScanFile_DTO project_ScanFile_DTO =
					projectScanFile_For_ProjectScanFileId_Searcher.get_For_ProjectScanFileId_Searcher(project_scan_file_id);

			if ( project_ScanFile_DTO == null ) {
				String msg = "projectScanFileId not in DB: " + project_scan_file_id;
				log.warn(msg);
				throw new LimelightErrorDataInWebRequestException( msg );
			}

			int projectId = project_ScanFile_DTO.getProjectId();

			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );

			GetWebSessionAuthAccessLevelForProjectIds_Result getWebSessionAuthAccessLevelForProjectIds_Result =
					getWebSessionAuthAccessLevelForProjectIds.getAuthAccessLevelForProjectIds( projectIds, httpServletRequest );

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = getWebSessionAuthAccessLevelForProjectIds_Result.getWebSessionAuthAccessLevel();

			if ( getWebSessionAuthAccessLevelForProjectIds_Result.isNoSession()
					&& ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() )) {

				//  No User session and not public project so forward to Login page

				return AA_UserAccount_PageControllerPaths_Constants.FORWARD_TO_LOGIN_PAGE_CONTROLLER;
			}

			if ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() ) {

				//  Not at least public project so show error page

				return "data_pages/error_pages/project_AccessNotAllowed_Page.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix
			}
			
			if ( searchDataLookupParametersCode != null ) {

				//  Have URL Sub Part: searchDataLookupParametersCode 
				
				boolean NOT_USE__searchDataLookupParametersCode = false;

				SearchDataLookupParametersLookupDTO searchDataLookupParametersLookupDTO =
						searchDataLookupParams_GetRecordForCode
						.getSearchDataLookupParametersLookupDTO_RecordForCode( searchDataLookupParametersCode );

				if ( searchDataLookupParametersLookupDTO == null ) {
					//  Code not found in DB
					
					NOT_USE__searchDataLookupParametersCode = true;
					
					//   Remove Show Error message to user since will just skip it

//					final int statusCode404 = 404; // Resource not found
//
//					httpServletResponse.setStatus( statusCode404 ); 
//
//					 httpServletRequest.setAttribute( WebErrorPageKeysConstants.REQUESTED_DATA_NOT_FOUND, true ); // Control message on error page
//
//					//  NOT use since user primarily requested a Feature Detection
//					//  httpServletRequest.setAttribute( WebErrorPageKeysConstants.REQUESTED_SEARCH_NOT_FOUND, true ); // Control message on error page
//
//					return AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER; //  EARLY EXIT
				}


				String searchDataLookupParametersLookupJSON = null;

				SearchDataLookupParamsRoot searchDataLookupParamsRoot = null;

				if ( ! NOT_USE__searchDataLookupParametersCode ) {

					searchDataLookupParametersLookupJSON =
							searchDataLookupParametersLookupDTO.getLookupParametersJSONMainData();

					try {
						searchDataLookupParamsRoot = 
								unmarshalJSON_ToObject.getObjectFromJSONString(
										searchDataLookupParametersLookupJSON, 
										SearchDataLookupParamsRoot.class );
					} catch ( Exception e ) {
						String msg = "Failed to unmarshal LookupParametersJSONMainData JSON for searchDataLookupParametersLookupDTO.id: "
								+ searchDataLookupParametersLookupDTO.getId();
						log.error( msg );
						throw new LimelightInternalErrorException(  e );
					}
				}

				////////////

				if ( ! NOT_USE__searchDataLookupParametersCode ) {
	
					//   Get Project Search Ids from searchDataLookupParamsRoot
	
					SearchDataLookupParams_For_ProjectSearchIds searchDataLookupParams_For_ProjectSearchIds = searchDataLookupParamsRoot.getParamsForProjectSearchIds();
	
					if ( searchDataLookupParams_For_ProjectSearchIds == null ) {
						final String msg = "Fail to handle ( searchDataLookupParams_For_ProjectSearchIds == null ). requestURI: " + requestURI;
						log.error( msg );
						throw new LimelightInternalErrorException();
					}
	
					List<SearchDataLookupParams_For_Single_ProjectSearchId> paramsForProjectSearchIdsList = searchDataLookupParams_For_ProjectSearchIds.getParamsForProjectSearchIdsList();
	
					if ( paramsForProjectSearchIdsList == null ) {
						final String msg = "Fail to handle ( paramsForProjectSearchIdsList == null ). requestURI: " + requestURI;
						log.error( msg );
						throw new LimelightInternalErrorException();
					}
	
					List<Integer> projectSearchIds = new ArrayList<>( paramsForProjectSearchIdsList.size() );
					for ( SearchDataLookupParams_For_Single_ProjectSearchId entry : paramsForProjectSearchIdsList ) {
						projectSearchIds.add( entry.getProjectSearchId() );
					}
					
					
		    		Map<Integer,Integer> projectIdMap_Key_ProjectSearchId = projectIdsForProjectSearchIdsSearcher.getProjectIdMappingForProjectSearchIds( projectSearchIds );
	
	
		    		if ( projectIdMap_Key_ProjectSearchId.isEmpty() ) {
	
		    			//  NO Project Ids for projectSearchIds
		    		
		    			log.warn( "NO Project Ids for projectSearchIds" );
		    			
		    			NOT_USE__searchDataLookupParametersCode = true;
		    			
	    				// throw new LimelightInternalErrorException();
		    		}

		    		Set<Integer> projectIdsSet = new HashSet<>();

		    		if ( ! NOT_USE__searchDataLookupParametersCode ) {

		    			for ( Integer projectSearchId : projectSearchIds ) {
		    				Integer projectIdForProjectSearchId = projectIdMap_Key_ProjectSearchId.get( projectSearchId );
		    				if ( projectIdForProjectSearchId == null ) {

		    					//  NO Project Id for projectSearchId

		    					log.warn( "NO Project Id for projectSearchId" );
		    					
		    					NOT_USE__searchDataLookupParametersCode = true;
		    					
		    					break;

		    					// throw new LimelightInternalErrorException();
		    				}

		    				projectIdsSet.add( projectIdForProjectSearchId );
		    			}
		    		}

		    		if ( ! NOT_USE__searchDataLookupParametersCode ) {

		    			if ( projectIdsSet.size() > 1 ) {

		    				//  More than 1 Project Id for projectSearchIds

		    				log.warn( "More than 1 Project Id for projectSearchIds" );
		    				
		    				NOT_USE__searchDataLookupParametersCode = true;

		    				// throw new LimelightInternalErrorException();
		    			}
		    		}

		    		if ( ! NOT_USE__searchDataLookupParametersCode ) {

		    			Integer projectId_For_projectSearchIds = projectIdsSet.iterator().next();

		    			if ( projectId_For_projectSearchIds.intValue() != projectId ) {

		    				//  Project Id for projectSearchIds is NOT same as Project Id for feature_detection_root__project_scnfl_mapping_tbl_Id

		    				log.warn( "Project Id for projectSearchId is NOT same as Project Id for feature_detection_root__project_scnfl_mapping_tbl_Id" );
		    				
		    				NOT_USE__searchDataLookupParametersCode = true;

//		    				throw new LimelightInternalErrorException();
		    			}
		    		}
				}

				if ( ! NOT_USE__searchDataLookupParametersCode ) {

					httpServletRequest.setAttribute( 
							WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_CODE, searchDataLookupParametersCode );
					httpServletRequest.setAttribute( 
							WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_RECORD, searchDataLookupParametersLookupDTO );
					httpServletRequest.setAttribute( 
							WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS, searchDataLookupParamsRoot );
					httpServletRequest.setAttribute( 
							WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_JSON, searchDataLookupParametersLookupJSON );

					httpServletRequest.setAttribute( 
							WebConstants.REQUEST_SEARCH_DATA_LOOKUP_PARAMETERS_ROOT_IDS_JSON, searchDataLookupParametersLookupDTO.getRootIdsOnlyJSON() );

//					if ( searchDataLookupParametersLookupCode_Computed_From_ProjectSearchIdCodes ) {
//
//						httpServletRequest.setAttribute( 
//								WebConstants.SEARCH_DATA_LOOKUP_PARAMETERS_LOOKUP_CODE__COMPUTED, internal_LookupMethodResult.searchDataLookupParametersLookupCode );
//					}
//
//					if ( singleSearch_HasSearchSubGroups ) { //  used in part for default setting of "Show In Table:" on Protein Page
//
//						httpServletRequest.setAttribute( WebConstants.REQUEST_SINGLE_SEARCH_HAS_SUB_GROUPS, true );
//					}
					
				}
	    		
			}

			//		try {
			//			page_UserDefault_SetForJSP.page_UserDefault_SetForJSP( PRIMARY_CONTROLLER_PATH, httpServletRequest );
			//		} catch (SQLException e) {
			//
			//			log.error( "Error in controller", e );
			//
			//			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
			//			
			//			throw new RuntimeException( e );
			//		}


			UserSession userSession = getWebSessionAuthAccessLevelForProjectIds_Result.getUserSession();

			populatePageHeaderData.populatePageHeaderData( projectIds, userSession, httpServletRequest );

			{
				httpServletRequest.setAttribute( WebConstants.REQUEST_CURRENT_PROJECT_ID, projectId );
				
				httpServletRequest.setAttribute( WebConstants.REQUEST_FEATURE_DETECTION_MAPPING_ID_FROM_URL, feature_detection_root__project_scnfl_mapping_tbl_Id );

				httpServletRequest.setAttribute( WebConstants.REQUEST_FEATURE_DETECTION_PROJECT_SCAN_FILE_ID_FROM_MAPPING_ID_FROM_URL, project_scan_file_id );
			}
			
			return "data_pages/feature_detection_driven_pages/featureDetection_BrowserView.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix
			
		} catch (Exception e) {

			log.error( "Error in controller", e );

			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
			
			throw new RuntimeException( e );
		}
		

	}
}