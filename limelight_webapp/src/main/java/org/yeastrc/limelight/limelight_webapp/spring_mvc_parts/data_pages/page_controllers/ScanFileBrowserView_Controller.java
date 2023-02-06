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

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

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
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFile_For_ProjectScanFileId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers.AA_UserAccount_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.PopulatePageHeaderDataIF;

@Controller
//@RequestMapping("/")
public class ScanFileBrowserView_Controller {

	private static final Logger log = LoggerFactory.getLogger( ScanFileBrowserView_Controller.class );

	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;
	
	@Autowired
	private ProjectScanFile_For_ProjectScanFileId_Searcher_IF projectScanFile_For_ProjectScanFileId_Searcher;

	@Autowired
	private PopulatePageHeaderDataIF populatePageHeaderData;

	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	
    /**
	 * 
	 */
	public ScanFileBrowserView_Controller() {
		super();
		
		log.info( "ScanFileBrowserView_Controller() constructor" );
		log.info( "CONTROLLER_PATH_NO_ADDITIONAL_PAGE_STATE: " + CONTROLLER_PATH_NO_ADDITIONAL_PAGE_STATE );
		log.info( "CONTROLLER_PATH_NO_ADDITIONAL_PAGE_STATE_REFERRER_URL: " + CONTROLLER_PATH_NO_ADDITIONAL_PAGE_STATE_REFERRER_URL );
		log.info( "CONTROLLER_PATH_YES_ADDITIONAL_PAGE_STATE__SAME_PAGE: " + CONTROLLER_PATH_YES_ADDITIONAL_PAGE_STATE__SAME_PAGE );
		log.info( "CONTROLLER_PATH_YES_ADDITIONAL_PAGE_STATE__REFERRER_PAGE: " + CONTROLLER_PATH_YES_ADDITIONAL_PAGE_STATE__REFERRER_PAGE );
	}

	
	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_PageControllerPaths_Constants.SCAN_FILE_BROWSER_PAGE_CONTROLLER;

	/**
	 * Controller Path: No Additional Page State
	 */
	private static final String CONTROLLER_PATH_NO_ADDITIONAL_PAGE_STATE = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.SCAN_FILE_BROWSER_MAIN_CODE // 'c/'
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_PATH_ADDITION; // Path for when there is no query data (use defaults)

	/**
	 * Controller Path: No Additional Page State. Referrer URL
	 */
	private static final String CONTROLLER_PATH_NO_ADDITIONAL_PAGE_STATE_REFERRER_URL = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.SCAN_FILE_BROWSER_MAIN_CODE // 'c/'
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_REFERRED_BY_OTHER_PAGE_NO_PAGE_STATE; // Path for when there is no query data and is referrer URL (use defaults).


	/**
	 * Controller Path: Yes Additional Page State
	 */
	private static final String CONTROLLER_PATH_YES_ADDITIONAL_PAGE_STATE__SAME_PAGE = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH 
			+ AA_PageControllerPaths_Constants.SCAN_FILE_BROWSER_MAIN_CODE // 'c/'
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_SET_SAME_PAGE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA__PATH_ADDITION;

	/**
	 * Controller Path: Yes Additional Page State
	 */
	private static final String CONTROLLER_PATH_YES_ADDITIONAL_PAGE_STATE__REFERRER_PAGE = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH 
			+ AA_PageControllerPaths_Constants.SCAN_FILE_BROWSER_MAIN_CODE // 'c/'
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_SET_SAME_PAGE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FOURTH_PARAMETER_SEPARATOR_REFERRED_BY_OTHER_PAGE_YES_PAGE_STATE;

	/**
	 * Path for when there is no additional page state data (use defaults), 
	 *        or additional page state data and is referrer URL 
	 * 
	 * @param
	 * @param httpServletRequest
	 * @return
	 * @throws SQLException 
	 */
	@GetMapping( 
			path = {
					CONTROLLER_PATH_NO_ADDITIONAL_PAGE_STATE,
					
					CONTROLLER_PATH_NO_ADDITIONAL_PAGE_STATE_REFERRER_URL
			} )
	
    public String controllerEntryNoOtherPageState(
    		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE) 
    		String mainParametersCodeString,
    		
    		HttpServletRequest httpServletRequest ) throws SQLException {
		
//		log.warn( "controllerEntryNoOtherPageState(...) called. " );

		return controllerEntryInternal( mainParametersCodeString, httpServletRequest );
        
    }
	
	@GetMapping( path = {
			
			// When there is page state data
			CONTROLLER_PATH_YES_ADDITIONAL_PAGE_STATE__SAME_PAGE,

			// When there is page state data set by another page
			CONTROLLER_PATH_YES_ADDITIONAL_PAGE_STATE__REFERRER_PAGE
	} )

    public String controllerEntryWithOtherPageState(
    		
    		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE) 
    		String mainParametersCodeString,
    		
    		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA)
    		String otherPageState,
    		
    		HttpServletRequest httpServletRequest ) {
		
//		log.warn( "controllerEntryWithOtherPageState(...) called. projectSearchIds: " + projectSearchIds
//				+ ", queryData: " + queryData );

		return controllerEntryInternal( mainParametersCodeString, httpServletRequest );
    }

	/**
	 * @param mainParametersCodeString
	 * @param httpServletRequest
	 * @return
	 * @throws Exception 
	 */
	private String controllerEntryInternal( String mainParametersCodeString, HttpServletRequest httpServletRequest ) {
		try {
			// mainParametersCodeString IS:  a{scan file spectr code 1st 6 characters}{project id}z{scan file id base 35}
			//  								starting 'a' means first layout version

			if ( ! mainParametersCodeString.startsWith( "a" ) ) {
				String msg = "mainParametersCodeString NOT start with 'a'. The start 'a' is the version";
				log.warn(msg);
				throw new LimelightErrorDataInWebRequestException(msg);
			}

			int projectScanFileId;

			String scanFileCode_firstSix = mainParametersCodeString.substring(1, 7);  // skip first character and then take 6

			{
				String rest = mainParametersCodeString.substring(7);

				String projectScanFileIdString = rest;

				try {
					projectScanFileId = Integer.parseInt(projectScanFileIdString, 35);	
				} catch ( Exception e ) {
					String msg = "projectScanFileIdString not parse to int: " + projectScanFileIdString;
					log.warn(msg);
					throw new LimelightErrorDataInWebRequestException( msg );
				}
			}

			Project_ScanFile_DTO project_ScanFile_DTO =
					projectScanFile_For_ProjectScanFileId_Searcher.get_For_ProjectScanFileId_Searcher(projectScanFileId);

			if ( project_ScanFile_DTO == null ) {
				String msg = "projectScanFileId not in DB: " + projectScanFileId;
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

			return "data_pages/scan_file_driven_pages/scanFileBrowserView.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix
			
		} catch (Exception e) {

			log.error( "Error in controller", e );

			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
			
			throw new RuntimeException( e );
		}
		

	}
}