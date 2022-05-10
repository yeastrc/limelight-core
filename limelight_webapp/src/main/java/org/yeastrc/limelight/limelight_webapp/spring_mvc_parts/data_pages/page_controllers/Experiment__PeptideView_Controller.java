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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.Validate_Access_Page_ExperimentDataPage.Validate_Access_Page_ExperimentDataPage_Result;
import org.yeastrc.limelight.limelight_webapp.experiment.main.Experiment_Set_HTTPRequest_ForJSP_IF;
import org.yeastrc.limelight.limelight_webapp.send_email_on_server_or_js_error.SendEmailOnServerOrJsError_ToConfiguredEmail_IF;
import org.yeastrc.limelight.limelight_webapp.services.Blib_Spectral_Library_Webservice_Configured__SetForJSP_IF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.Validate_Access_Page_ExperimentDataPageIF;

@Controller
//@RequestMapping("/")
public class Experiment__PeptideView_Controller {

	private static final Logger log = LoggerFactory.getLogger( Experiment__PeptideView_Controller.class );
	
//	@Autowired
//	private Page_UserDefault_SetForJSP_IF page_UserDefault_SetForJSP;
	
	@Autowired
	private Validate_Access_Page_ExperimentDataPageIF validate_Access_Page_ExperimentDataPage;
	
	@Autowired
	private Experiment_Set_HTTPRequest_ForJSP_IF experiment_Set_HTTPRequest_ForJSP;

	@Autowired
	private Blib_Spectral_Library_Webservice_Configured__SetForJSP_IF blib_Spectral_Library_Webservice_Configured__SetForJSP;
	
	@Autowired
	private SendEmailOnServerOrJsError_ToConfiguredEmail_IF sendEmailOnServerOrJsError_ToConfiguredEmail;
	
    /**
	 * 
	 */
	public Experiment__PeptideView_Controller() {
		super();
		
		log.info( "Experiment__PeptideView_Controller() constructor" );
		log.info( "CONTROLLER_PATH_EXPERIMENT_ID: " + CONTROLLER_PATH_EXPERIMENT_ID );
		log.info( "CONTROLLER_PATH_EXPERIMENT_ID_REFERRER_URL: " + CONTROLLER_PATH_EXPERIMENT_ID_REFERRER_URL );
		log.info( "CONTROLLER_PATH_EXPERIMENT_ID_SEARCH_LOOKUP_PARAMS_CODE: " + CONTROLLER_PATH_EXPERIMENT_ID_SEARCH_LOOKUP_PARAMS_CODE );
		log.info( "CONTROLLER_PATH_EXPERIMENT_ID_SEARCH_LOOKUP_PARAMS_CODE_REFERRER_URL: " + CONTROLLER_PATH_EXPERIMENT_ID_SEARCH_LOOKUP_PARAMS_CODE_REFERRER_URL );
		log.info( "CONTROLLER_PATH_EXPERIMENT_ID_PAGE_STATE: " + CONTROLLER_PATH_EXPERIMENT_ID_PAGE_STATE );
		log.info( "CONTROLLER_PATH_EXPERIMENT_ID_PAGE_STATE_REFERRER_URL: " + CONTROLLER_PATH_EXPERIMENT_ID_PAGE_STATE_REFERRER_URL );
		log.info( "CONTROLLER_PATH_EXPERIMENT_ID_SEARCH_LOOKUP_PARAMS_CODE_PAGE_STATE: " + CONTROLLER_PATH_EXPERIMENT_ID_SEARCH_LOOKUP_PARAMS_CODE_PAGE_STATE );
		log.info( "CONTROLLER_PATH_EXPERIMENT_ID_SEARCH_LOOKUP_PARAMS_CODE_PAGE_STATE_REFERRER_URL: " + CONTROLLER_PATH_EXPERIMENT_ID_SEARCH_LOOKUP_PARAMS_CODE_PAGE_STATE_REFERRER_URL );
	}

	
	private static final String PRIMARY_CONTROLLER_PATH = 
			AA_PageControllerPaths_Constants.EXPERIMENT___PEPTIDE_VIEW_PAGE_CONTROLLER;

	/**
	 * Controller Path: Experiment Id ('/e/#')
	 */
	private static final String CONTROLLER_PATH_EXPERIMENT_ID = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID__DATA__PATH_ADDITION; // Path for when there is no query data (use defaults)

	/**
	 * Controller Path:  Experiment Id ('/e/#') and Referrer URL ('/r')
	 */
	private static final String CONTROLLER_PATH_EXPERIMENT_ID_REFERRER_URL = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID__DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_REFERRED_BY_OTHER_PAGE_NO_PAGE_STATE; // Path for when there is no query data and is referrer URL (use defaults).


	/**
	 * Controller Path: Experiment Id ('/e/#') and Search Params Lookup ('/c/<code>')
	 */
	private static final String CONTROLLER_PATH_EXPERIMENT_ID_SEARCH_LOOKUP_PARAMS_CODE = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID__DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SEARCH_PARAMS_LOOKUP_CODE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_PATH_ADDITION;

	/**
	 * Controller Path:  Experiment Id ('/e/#') and Search Params Lookup ('/c/<code>') and Referrer URL ('/r')
	 */
	private static final String CONTROLLER_PATH_EXPERIMENT_ID_SEARCH_LOOKUP_PARAMS_CODE_REFERRER_URL = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID__DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SEARCH_PARAMS_LOOKUP_CODE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_REFERRED_BY_OTHER_PAGE_NO_PAGE_STATE;

	//  Yes Additional Page State, Has '/q/<value' in URL.

	/**
	 * Controller Path: Experiment Id ('/e/#') and Page State ('/q/<string>')
	 */
	private static final String CONTROLLER_PATH_EXPERIMENT_ID_PAGE_STATE = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID__DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_SET_SAME_PAGE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA__PATH_ADDITION;

	/**
	 * Controller Path:  Experiment Id ('/e/#') and Page State ('/q/<string>') and Referrer URL ('/r')
	 */
	private static final String CONTROLLER_PATH_EXPERIMENT_ID_PAGE_STATE_REFERRER_URL = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID__DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_SET_SAME_PAGE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FOURTH_PARAMETER_SEPARATOR_REFERRED_BY_OTHER_PAGE_YES_PAGE_STATE;

	/**
	 * Controller Path: Experiment Id ('/e/#') and Search Params Lookup ('/c/<code>') and Page State ('/q/<string>')
	 */
	private static final String CONTROLLER_PATH_EXPERIMENT_ID_SEARCH_LOOKUP_PARAMS_CODE_PAGE_STATE = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID__DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SEARCH_PARAMS_LOOKUP_CODE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_SET_SAME_PAGE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA__PATH_ADDITION;

	/**
	 * Controller Path:  Experiment Id ('/e/#') and Search Params Lookup ('/c/<code>') and Page State ('/q/<string>') and Referrer URL ('/r')
	 */
	private static final String CONTROLLER_PATH_EXPERIMENT_ID_SEARCH_LOOKUP_PARAMS_CODE_PAGE_STATE_REFERRER_URL = 
			AA_PageControllerPaths_Constants.PATH_START_ALL
			+ PRIMARY_CONTROLLER_PATH
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID__DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SEARCH_PARAMS_LOOKUP_CODE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE_PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_SECOND_PARAMETER_SEPARATOR_SET_SAME_PAGE
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA__PATH_ADDITION
			+ AA_PageControllerPaths_Constants.PATH_PARAMETER_FOURTH_PARAMETER_SEPARATOR_REFERRED_BY_OTHER_PAGE_YES_PAGE_STATE;

	/**
	 * Path for when there is only experiment id, or experiment id and is referrer URL 
	 * 
	 * @param
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( 
			path = {
					// Experiment Id ('/e/#')
					CONTROLLER_PATH_EXPERIMENT_ID,
					
					// Experiment Id ('/e/#') and Referrer URL ('/r')
					CONTROLLER_PATH_EXPERIMENT_ID_REFERRER_URL
			} )
	
    public String controllerEntry_ExperimentId(
    		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID__DATA) 
    		String experimentId_String,
    		
    		HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {
		
//		log.warn( "controllerEntryNoOtherPageState(...) called. " );

		return controllerEntryInternal( experimentId_String, null /* searchDataLookupParametersCode */, null /* otherPageState */, httpServletRequest, httpServletResponse );
        
    }

	/**
	 * Path for when there is experiment id and Search Params Lookup, or experiment id and Search Params Lookup and is referrer URL 
	 * 
	 * @param
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( path = {
			
			// Experiment Id ('/e/#') and Search Params Lookup ('/c/<code>')
			CONTROLLER_PATH_EXPERIMENT_ID_SEARCH_LOOKUP_PARAMS_CODE,

			// Experiment Id ('/e/#') and Search Params Lookup ('/c/<code>') and Referrer URL ('/r')
			CONTROLLER_PATH_EXPERIMENT_ID_SEARCH_LOOKUP_PARAMS_CODE_REFERRER_URL
	} )

    public String controllerEntry_ExperimentId_SearchDataLookupParametersCode(
      		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID__DATA) 
    		String experimentId_String,
    		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE) 
    		String searchDataLookupParametersCode,
    		
    		HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {
		
//		log.warn( "controllerEntryWithOtherPageState(...) called. projectSearchIds: " + projectSearchIds
//				+ ", queryData: " + queryData );

		return controllerEntryInternal( experimentId_String, searchDataLookupParametersCode, null /* otherPageState */, httpServletRequest, httpServletResponse );
    }

	/**
	 * Path for when there is Experiment Id and Page State, or Experiment Id and Page State and is referrer URL 
	 * 
	 * @param
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( path = {
			
			// Experiment Id ('/e/#') and Page State ('/q/<string>')
			CONTROLLER_PATH_EXPERIMENT_ID_PAGE_STATE,

			// Experiment Id ('/e/#') and Page State ('/q/<string>') and Referrer URL ('/r')
			CONTROLLER_PATH_EXPERIMENT_ID_PAGE_STATE_REFERRER_URL
	} )

    public String controllerEntry_ExperimentId_PageState(
    		
      		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID__DATA) 
    		String experimentId_String,

    		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA)
    		String otherPageState,
    		
    		HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {
		
//		log.warn( "controllerEntryWithOtherPageState(...) called. projectSearchIds: " + projectSearchIds
//				+ ", queryData: " + queryData );

		return controllerEntryInternal( experimentId_String, null /* searchDataLookupParametersCode */, otherPageState, httpServletRequest, httpServletResponse );
    }

	/**
	 * Path for when there is experiment id and Search Params Lookup and Page State, or experiment id and Search Params Lookup and Page State and is referrer URL 
	 * 
	 * @param
	 * @param httpServletRequest
	 * @return
	 */
	@GetMapping( path = {
			
			// Experiment Id ('/e/#') and Search Params Lookup ('/c/<code>') and Page State ('/q/<string>')
			CONTROLLER_PATH_EXPERIMENT_ID_SEARCH_LOOKUP_PARAMS_CODE_PAGE_STATE,

			// Experiment Id ('/e/#') and Search Params Lookup ('/c/<code>') and Page State ('/q/<string>') and Referrer URL ('/r')
			CONTROLLER_PATH_EXPERIMENT_ID_SEARCH_LOOKUP_PARAMS_CODE_PAGE_STATE_REFERRER_URL
	} )

    public String controllerEntry_ExperimentId_SearchDataLookupParametersCode_PageState(
    		
      		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_EXPERIMENT_ID__DATA) 
    		String experimentId_String,
    		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_SEARCH_DATA_LOOKUP_PARAMETERS_CODE) 
    		String searchDataLookupParametersCode,
    		@PathVariable(value = AA_PageControllerPaths_Constants.PATH_PARAMETER_LABEL_ADDITONAL_PAGE_STATE_DATA)
    		String otherPageState,
    		
    		HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse  ) {
		
//		log.warn( "controllerEntryWithOtherPageState(...) called. projectSearchIds: " + projectSearchIds
//				+ ", queryData: " + queryData );

		return controllerEntryInternal( experimentId_String, searchDataLookupParametersCode, otherPageState, httpServletRequest, httpServletResponse );
    }
	
	/**
	 * @param experimentId_String
	 * @param searchDataLookupParametersCode
	 * @param otherPageState
	 * @param httpServletRequest
	 * @return
	 */
	private String controllerEntryInternal( 
			
    		String experimentId_String,
    		String searchDataLookupParametersCode,
			String otherPageState, 
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {
		
		//  Parse experimentId_String 
		
		int experimentId = 0;
		try {
			experimentId = Integer.parseInt( experimentId_String );
		} catch ( Exception e ) {
			final String msg = "experimentId_String fail to parse to Integer: " + experimentId_String;
			log.warn( msg );
			throw new RuntimeException( msg );
		}
		
		//  Validate Access Control
		
		Validate_Access_Page_ExperimentDataPage_Result validate_Access_Page_ExperimentDataPage_Result = null;
		
		try {
			validate_Access_Page_ExperimentDataPage_Result =
					validate_Access_Page_ExperimentDataPage
					.validatePublicAccessCodeReadAccessLevel( experimentId, searchDataLookupParametersCode, httpServletRequest, httpServletResponse );
		} catch (Exception e) {
			log.error( "Error in controller calling validate_Access_Page_ExperimentDataPage.validatePublicAccessCodeReadAccessLevel(...) experimentId: " + experimentId, e );

			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();

			throw new RuntimeException( e );
		}
		
		if ( validate_Access_Page_ExperimentDataPage_Result.isHttpForwardOrRedirectSent() ) {
			//  Browser Forward or Redirect sent
			return null; //  EARLY RETURN
		}
		
		try {
			experiment_Set_HTTPRequest_ForJSP.experiment_Set_HTTPRequest_ForJSP( validate_Access_Page_ExperimentDataPage_Result, httpServletRequest );
		} catch (Exception e) {
			log.error( "Error in controller", e );
			
			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
			
			throw new RuntimeException( e );
		}

		try {
			blib_Spectral_Library_Webservice_Configured__SetForJSP.blib_Spectral_Library_Webservice_Configured__SetForJSP( httpServletRequest );
		}  catch (Exception e) {

			log.error( "Error in controller", e );
			
			sendEmailOnServerOrJsError_ToConfiguredEmail.sendEmailOnServerOrJsError_ToConfiguredEmail();
		}
		
		//  TODO  Need to create version of page_UserDefault_SetForJSP for Experiment and update table data_page_saved_view_tbl
//		try {
//			page_UserDefault_SetForJSP.page_UserDefault_SetForJSP( PRIMARY_CONTROLLER_PATH, httpServletRequest );
//		} catch (SQLException e) {
//
//			log.error( "Error in controller", e );
//			throw new RuntimeException( e );
//		}
		
        return "data_pages/experiment_pages/peptide_Experiment.jsp";  // forward to JSP. Path to JSP specified in application.properties:spring.mvc.view.prefix

	}
}