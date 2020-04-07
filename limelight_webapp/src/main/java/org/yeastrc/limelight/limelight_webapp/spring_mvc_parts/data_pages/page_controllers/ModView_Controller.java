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

import javax.servlet.http.HttpServletRequest;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.services.Page_UserDefault_SetForJSP_IF;

@Controller
//@RequestMapping("/")
public class ModView_Controller {

	private static final Logger log = LoggerFactory.getLogger( ModView_Controller.class );

	@Autowired
	private Page_UserDefault_SetForJSP_IF page_UserDefault_SetForJSP;

	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;

    /**
	 * 
	 */
	public ModView_Controller() {
		super();
	}

	
	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_PageControllerPaths_Constants.MOD_VIEW_PAGE_CONTROLLER;

	/**
	 * Controller Path: No Additional Page State
	 */
	private static final String CONTROLLER_PATH_NO_ADDITIONAL_PAGE_STATE = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_PATH_ADDITION; // Path for when there is no query data (use defaults)

	/**
	 * Controller Path: No Additional Page State. Referrer URL
	 */
	private static final String CONTROLLER_PATH_NO_ADDITIONAL_PAGE_STATE_REFERRER_URL = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_REFERRED_BY_OTHER_PAGE_NO_PAGE_STATE; // Path for when there is no query data and is referrer URL (use defaults).


	/**
	 * Controller Path: Yes Additional Page State
	 */
	private static final String CONTROLLER_PATH_YES_ADDITIONAL_PAGE_STATE__SAME_PAGE = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH 
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_SET_SAME_PAGE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA__PATH_ADDITION;

	/**
	 * Controller Path: Yes Additional Page State
	 */
	private static final String CONTROLLER_PATH_YES_ADDITIONAL_PAGE_STATE__REFERRER_PAGE = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH 
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
	 */
	@GetMapping( 
			path = {
					CONTROLLER_PATH_NO_ADDITIONAL_PAGE_STATE,
					
					CONTROLLER_PATH_NO_ADDITIONAL_PAGE_STATE_REFERRER_URL
			} )
	
    public String controllerEntryNoOtherPageState(
    		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE) 
    		String searchDataLookupParametersCode,
    		
    		HttpServletRequest httpServletRequest ) {
		
//		log.warn( "controllerEntryNoOtherPageState(...) called. " );

		return controllerEntryInternal( null /* otherPageState */, httpServletRequest );
        
    }
	
	@GetMapping( path = {
			
			// When there is page state data
			CONTROLLER_PATH_YES_ADDITIONAL_PAGE_STATE__SAME_PAGE,

			// When there is page state data set by another page
			CONTROLLER_PATH_YES_ADDITIONAL_PAGE_STATE__REFERRER_PAGE
	} )

    public String controllerEntryWithOtherPageState(
    		
    		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE) 
    		String searchDataLookupParametersCode,
    		
    		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA)
    		String otherPageState,
    		
    		HttpServletRequest httpServletRequest ) {
		
//		log.warn( "controllerEntryWithOtherPageState(...) called. projectSearchIds: " + projectSearchIds
//				+ ", queryData: " + queryData );

		return controllerEntryInternal( otherPageState, httpServletRequest );
    }

	/**
	 * @param otherPageState
	 * @param httpServletRequest
	 * @return
	 */
	private String controllerEntryInternal( String otherPageState, HttpServletRequest httpServletRequest ) {

		try {
			page_UserDefault_SetForJSP.page_UserDefault_SetForJSP( PRIMARY_CONTROLLER_PATH, httpServletRequest );
		} catch (SQLException e) {

			log.error( "Error in controller", e );

			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
			
			throw new RuntimeException( e );
		}
		
        return "data_pages/project_search_ids_driven_pages/modView.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

	}
}