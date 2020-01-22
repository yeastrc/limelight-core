/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.constants.WebErrorPageKeysConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ExperimentDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.SearchDataLookupParametersLookupDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ExperimentDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.internal_objects_for_json.RootIdsObj;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_GetRecordForCodeIF;
import org.yeastrc.limelight.limelight_webapp.services.Get_ProjectIds_For_ProjectSearchIds_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.error_pages_controllers.AA_ErrorPageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.user_account_pages.page_controllers.AA_UserAccount_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;

/**
 * Validate User access to Page - Experiment Data Page
 *
 */
@Component
public class Validate_Access_Page_ExperimentDataPage implements Validate_Access_Page_ExperimentDataPageIF {

	private static final Logger log = LoggerFactory.getLogger( Validate_Access_Page_ExperimentDataPage.class );

//	private enum CheckWhichAuthAccessLevel { MAIN, IF_PROJECT_NOT_LOCKED }

	@Autowired
	private ExperimentDAO_IF experimentDAO;
	
	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private SearchDataLookupParams_GetRecordForCodeIF searchDataLookupParams_GetRecordForCode;
	
	@Autowired
	private SearchDataLookupParametersLookupDAO_IF searchDataLookupParametersLookupDAO;

	@Autowired
	private Get_ProjectIds_For_ProjectSearchIds_ServiceIF get_ProjectIds_For_ProjectSearchIds_Service;

	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;
	
	
	/**
	 * 
	 *
	 */
	public static class Validate_Access_Page_ExperimentDataPage_Result {
		
		private boolean validateAccessFailed;
		
		private boolean httpForwardOrRedirectSent;

		private UserSession userSession;
		private WebSessionAuthAccessLevel webSessionAuthAccessLevel;
		
		private Integer projectId;
		private List<Integer> projectIds;
		
		/**
		 * Only populated if was passed into this class 
		 */
		private String searchDataLookupParametersCode;
		private ExperimentDTO experimentDTO;
		private SearchDataLookupParametersLookupDTO searchDataLookupParametersLookupDTO;
		
		/**
		 * @return true if Validate Access Failed
		 */
		public boolean isValidateAccessFailed() {
			return validateAccessFailed;
		}

		/**
		 * @return true if User already forwarded or redirected so only need to exit
		 */
		public boolean isHttpForwardOrRedirectSent() {
			return httpForwardOrRedirectSent;
		}

		/**
		 * Only populated if was passed into this class
		 * @return
		 */
		public String getSearchDataLookupParametersCode() {
			return searchDataLookupParametersCode;
		}
		
		public UserSession getUserSession() {
			return userSession;
		}

		public WebSessionAuthAccessLevel getWebSessionAuthAccessLevel() {
			return webSessionAuthAccessLevel;
		}

		public SearchDataLookupParametersLookupDTO getSearchDataLookupParametersLookupDTO() {
			return searchDataLookupParametersLookupDTO;
		}

		public Integer getProjectId() {
			return projectId;
		}

		public List<Integer> getProjectIds() {
			return projectIds;
		}

		public ExperimentDTO getExperimentDTO() {
			return experimentDTO;
		}

	}
	

	//////////////////////////////////////////////////////////////
	
	///////////  This block is for checking the specific access level
	
	/**
	 * User session with public access code for this project. 
	 * 
	 * Validate authAccessLevel == AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY
	 * @throws Exception 
	 */
	@Override
	public Validate_Access_Page_ExperimentDataPage_Result validatePublicAccessCodeReadAccessLevel( 			
			
			int experimentId, 
			String searchDataLookupParametersCode,
			
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) throws Exception {
		
//		return validate_Access_Page_ExperimentDataPage(
//				AuthAccessLevelConstants.ACCESS_LEVEL__PUBLIC_ACCESS_CODE_READ_ONLY__PUBLIC_PROJECT_READ_ONLY,
//				CheckWhichAuthAccessLevel.MAIN,
//				experimentId, 
//				searchDataLookupParametersCode,
//				httpServletRequest );
//	}
//	
//	private Validate_Access_Page_ExperimentDataPage_Result validate_Access_Page_ExperimentDataPage( 
//			
//			int minimumAccessLevelRequired,
//			CheckWhichAuthAccessLevel checkWhichAuthAccessLevel,
//			int experimentId, 
//			String searchDataLookupParametersCode,
//			HttpServletRequest httpServletRequest ) {
		
		Integer projectId = experimentDAO.getProjectIdForId( experimentId );
		
		if ( projectId == null ) {
			
			//  Experiment Id not in DB

			Validate_Access_Page_ExperimentDataPage_Result result = new Validate_Access_Page_ExperimentDataPage_Result();
			
			result.searchDataLookupParametersCode = searchDataLookupParametersCode;

			result.validateAccessFailed = true;
			result.httpForwardOrRedirectSent = true;

			final int statusCode404 = 404; // Resource not found

			httpServletResponse.setStatus( statusCode404 ); 
			httpServletRequest.setAttribute( WebErrorPageKeysConstants.REQUESTED_DATA_NOT_FOUND, true ); // Control message on error page

			final String mainErrorPageControllerURL =
					AA_ErrorPageControllerPaths_Constants.PATH_START_ALL 
					+ AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER;

			RequestDispatcher requestDispatcher = 
					httpServletRequest.getServletContext().getRequestDispatcher( mainErrorPageControllerURL );

			log.warn( "Error in URL to Project Search Based page, searchDataLookupParametersLookupCode not found in database. "
					+ "setting HTTP status code to: " + statusCode404
					+ ".  Forwarding to '"
					+ mainErrorPageControllerURL
					+ "'. experimentId: " + experimentId );

			requestDispatcher.forward( httpServletRequest, httpServletResponse );

			try {
				requestDispatcher.forward( httpServletRequest, httpServletResponse );
			} catch (ServletException | IOException e2 ) {
				log.error( "requestDispatcher.forward( httpServletRequest, httpServletResponse ); Failed:", e2 );
				throw e2;
			}
			
			return result;  //  EARLY RETURN
			
		}
		
		List<Integer> projectIds = new ArrayList<>( 1 );
		
		projectIds.add( projectId );
		
		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validate_ProjectIds_Result = null;
		try {
			validate_ProjectIds_Result = 
					validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
					.validatePublicAccessCodeReadAllowed( projectIds, httpServletRequest );

		} catch ( LimelightErrorDataInWebRequestException e ) {
			
			if ( e.isProjectIdnotfound() ||  e.isProjectIdNotEnabledOrMarkedforDeletion() ) {

				Validate_Access_Page_ExperimentDataPage_Result result = new Validate_Access_Page_ExperimentDataPage_Result();
				
				result.searchDataLookupParametersCode = searchDataLookupParametersCode;

				result.validateAccessFailed = true;
				result.httpForwardOrRedirectSent = true;

    			final int statusCode404 = 404; // Resource not found

    			httpServletResponse.setStatus( statusCode404 ); 
    			httpServletRequest.setAttribute( WebErrorPageKeysConstants.REQUESTED_DATA_NOT_FOUND, true ); // Control message on error page

    			final String mainErrorPageControllerURL =
    					AA_ErrorPageControllerPaths_Constants.PATH_START_ALL 
    					+ AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER;

    			RequestDispatcher requestDispatcher = 
    					httpServletRequest.getServletContext().getRequestDispatcher( mainErrorPageControllerURL );

    			log.warn( "Error in URL to Project Search Based page, searchDataLookupParametersLookupCode not found in database. "
    					+ "setting HTTP status code to: " + statusCode404
    					+ ".  Forwarding to '"
    					+ mainErrorPageControllerURL
    					+ "'. experimentId: " + experimentId );

    			requestDispatcher.forward( httpServletRequest, httpServletResponse );

				try {
					requestDispatcher.forward( httpServletRequest, httpServletResponse );
				} catch (ServletException | IOException e2 ) {
					log.error( "requestDispatcher.forward( httpServletRequest, httpServletResponse ); Failed:", e2 );
					throw e2;
				}
				
				return result;  //  EARLY RETURN
				
			} else {
				
				throw e;
			}

		} catch ( Limelight_WS_AuthError_Forbidden_Exception e ) {
			
			//  Catch this exception since validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds designed for Webservices

			Validate_Access_Page_ExperimentDataPage_Result result = new Validate_Access_Page_ExperimentDataPage_Result();
			
			result.searchDataLookupParametersCode = searchDataLookupParametersCode;

			result.validateAccessFailed = true;
			result.httpForwardOrRedirectSent = true;

			RequestDispatcher requestDispatcher = 
					httpServletRequest.getServletContext().getRequestDispatcher( 
							AA_UserAccount_PageControllerPaths_Constants.PATH_START_ALL
							+ AA_UserAccount_PageControllerPaths_Constants.LOGIN_PAGE_CONTROLLER );

			try {
				requestDispatcher.forward( httpServletRequest, httpServletResponse );
			} catch (ServletException | IOException e2 ) {
				log.error( "requestDispatcher.forward( httpServletRequest, httpServletResponse ); Failed:", e2 );
				throw e2;
			}
			
			return result;  //  EARLY RETURN
			
		} catch ( Limelight_WS_AuthError_Unauthorized_Exception e ) {
			
			//  Catch this exception since validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds designed for Webservices

			//  No User session and not public project

			Validate_Access_Page_ExperimentDataPage_Result result = new Validate_Access_Page_ExperimentDataPage_Result();
			
			result.searchDataLookupParametersCode = searchDataLookupParametersCode;

			result.validateAccessFailed = true;
			result.httpForwardOrRedirectSent = true;

			RequestDispatcher requestDispatcher = 
					httpServletRequest.getServletContext().getRequestDispatcher( 
							AA_UserAccount_PageControllerPaths_Constants.PATH_START_ALL
							+ AA_UserAccount_PageControllerPaths_Constants.LOGIN_PAGE_CONTROLLER );

			try {
				requestDispatcher.forward( httpServletRequest, httpServletResponse );
			} catch (ServletException | IOException e2 ) {
				log.error( "requestDispatcher.forward( httpServletRequest, httpServletResponse ); Failed:", e2 );
				throw e2;
			}
			
			return result;  //  EARLY RETURN
		}

		/////////////////////
		
		ExperimentDTO experimentDTO = experimentDAO.getPartialForId( experimentId );
		
		if ( experimentDTO == null ) {
			String msg = "experimentDTO == null after previously found projectId for experimentId: " + experimentId;
			log.error(msg);
			throw new LimelightInternalErrorException(msg);
		}

		if ( experimentDTO.isDraft() ) {
			String msg = "experimentDTO.isDraft() is true for experimentId: " + experimentId;
			log.error(msg);
			throw new LimelightInternalErrorException(msg);
		}
		if ( experimentDTO.getAssociatedSearchDataLookupParametersLookupId() == null ) {
			String msg = "experimentDTO.getAssociatedSearchDataLookupParametersLookupId() == null for experimentId: " + experimentId;
			log.error(msg);
			throw new LimelightInternalErrorException(msg);
		}

		int[] projectSearchIds_In_Experiment = null; // Parsing to int[] will convert floating point numbers to integers with truncation

		try {
			projectSearchIds_In_Experiment = 
					unmarshalJSON_ToObject.getObjectFromJSONString(
							experimentDTO.getProjectSearchIdsOnlyJSON(), 
							int[].class );
		} catch ( Exception e ) {
			String msg = "Failed to unmarshal experimentDTO.getProjectSearchIdsOnlyJSON() JSON for experimentId: "
					+ experimentId;
			log.error( msg );
			throw new LimelightInternalErrorException(  e );
		}

		
		/////////////////////
		
		//   Validate that all Project Search Ids for searchDataLookupParametersCode are in Project Id the Experiment Id is in.
		
		SearchDataLookupParametersLookupDTO searchDataLookupParametersLookupDTO = null;

		RootIdsObj rootIdsObj = null;

		if ( StringUtils.isNotEmpty( searchDataLookupParametersCode ) )  {
		
			searchDataLookupParametersLookupDTO = 
					searchDataLookupParams_GetRecordForCode.getSearchDataLookupParametersLookupDTO_RecordForCode( searchDataLookupParametersCode );
			
				//  searchDataLookupParametersLookupDTO populated from 
//						searchDataLookupParametersLookupDAO
//						.getPartialFor_HashOfMainParams_HashCollisionIndex(
//								parseResult.getHashOfParamsMD5Hex(), parseResult.getHashCollisionIndex() );
			
			if ( searchDataLookupParametersLookupDTO == null ) {
				
				String msg = "No DB record for searchDataLookupParametersCode: " + searchDataLookupParametersCode ;
				log.warn(msg);

				//  searchDataLookupParametersCode not in DB

				Validate_Access_Page_ExperimentDataPage_Result result = new Validate_Access_Page_ExperimentDataPage_Result();
				
				result.searchDataLookupParametersCode = searchDataLookupParametersCode;

				result.validateAccessFailed = true;
				result.httpForwardOrRedirectSent = true;

				final int statusCode404 = 404; // Resource not found

				httpServletResponse.setStatus( statusCode404 ); 
				httpServletRequest.setAttribute( WebErrorPageKeysConstants.REQUESTED_DATA_NOT_FOUND, true ); // Control message on error page

				final String mainErrorPageControllerURL =
						AA_ErrorPageControllerPaths_Constants.PATH_START_ALL 
						+ AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER;

				RequestDispatcher requestDispatcher = 
						httpServletRequest.getServletContext().getRequestDispatcher( mainErrorPageControllerURL );

				log.warn( "Error in URL to Project Search Based page, searchDataLookupParametersLookupCode not found in database. "
						+ "setting HTTP status code to: " + statusCode404
						+ ".  Forwarding to '"
						+ mainErrorPageControllerURL
						+ "'. experimentId: " + experimentId );

				requestDispatcher.forward( httpServletRequest, httpServletResponse );

				try {
					requestDispatcher.forward( httpServletRequest, httpServletResponse );
				} catch (ServletException | IOException e2 ) {
					log.error( "requestDispatcher.forward( httpServletRequest, httpServletResponse ); Failed:", e2 );
					throw e2;
				}
				
				return result;  //  EARLY RETURN
			}

			{
				//  Move this code to end of have value in  method parameter searchDataLookupParametersCode
				
				try {
					rootIdsObj = 
							unmarshalJSON_ToObject.getObjectFromJSONString(
									searchDataLookupParametersLookupDTO.getRootIdsOnlyJSON(), 
									RootIdsObj.class );
				} catch ( Exception e ) {
					String msg = "Failed to unmarshal searchDataLookupParametersLookupDTO.getRootIdsOnlyJSON() JSON for searchDataLookupParametersLookupDTO.id: "
							+ searchDataLookupParametersLookupDTO.getId();
					log.error( msg );
					throw new LimelightInternalErrorException(  e );
				}

				//  Validate Project Search Ids for searchDataLookupParametersLookupDTO exact match for Project Search Ids in Experiment

				Set<Integer> projectSearchIds_In_searchDataLookupParametersLookupDTO = new HashSet<>( rootIdsObj.getProjectSearchIds() );

				for ( Integer projectSearchId_In_Experiment : projectSearchIds_In_Experiment ) {
					
					if ( ! projectSearchIds_In_searchDataLookupParametersLookupDTO.remove( projectSearchId_In_Experiment ) ) {
						String msg = "Mismatch of Project Search Ids between Experiment and searchDataLookupParametersCode. + experimentId: "
								+ experimentId
								+ ", searchDataLookupParametersCode: "
								+ searchDataLookupParametersCode
								+ ", projectSearchId Only In Experiment: " 
								+ projectSearchId_In_Experiment
								+ ".  Other mismatches may also exist.";
						log.error( msg );
						throw new LimelightInternalErrorException( msg );
					}
				}
				if ( ! projectSearchIds_In_searchDataLookupParametersLookupDTO.isEmpty() ) {
					Integer projectSearchId = projectSearchIds_In_searchDataLookupParametersLookupDTO.iterator().next();
					String msg = "Mismatch of Project Search Ids between Experiment and searchDataLookupParametersCode. + experimentId: "
							+ experimentId
							+ ", searchDataLookupParametersCode: "
							+ searchDataLookupParametersCode
							+ ", projectSearchId Only In searchDataLookupParametersCode: " 
							+ projectSearchId
							+ ".  Other mismatches may also exist.";
					log.error( msg );
					throw new LimelightInternalErrorException( msg );
				}
			}
		} else {
			
			//  No value for searchDataLookupParametersCode
		
			//  Populate SearchDataLookupParametersLookupDTO searchDataLookupParametersLookupDTO from id from Exeriment record
			
			searchDataLookupParametersLookupDTO = searchDataLookupParametersLookupDAO.getPartialForId( experimentDTO.getAssociatedSearchDataLookupParametersLookupId() );

			if ( searchDataLookupParametersLookupDTO == null ) {
				
				String msg = "No DB record for searchDataLookupParametersCode: " + searchDataLookupParametersCode ;
				log.warn(msg);

				//  searchDataLookupParametersCode not in DB

				Validate_Access_Page_ExperimentDataPage_Result result = new Validate_Access_Page_ExperimentDataPage_Result();
				
				result.searchDataLookupParametersCode = searchDataLookupParametersCode;

				result.validateAccessFailed = true;
				result.httpForwardOrRedirectSent = true;

				final int statusCode404 = 404; // Resource not found

				httpServletResponse.setStatus( statusCode404 ); 
				httpServletRequest.setAttribute( WebErrorPageKeysConstants.REQUESTED_DATA_NOT_FOUND, true ); // Control message on error page

				final String mainErrorPageControllerURL =
						AA_ErrorPageControllerPaths_Constants.PATH_START_ALL 
						+ AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER;

				RequestDispatcher requestDispatcher = 
						httpServletRequest.getServletContext().getRequestDispatcher( mainErrorPageControllerURL );

				log.warn( "Error in URL to Project Search Based page, searchDataLookupParametersLookupCode not found in database. "
						+ "setting HTTP status code to: " + statusCode404
						+ ".  Forwarding to '"
						+ mainErrorPageControllerURL
						+ "'. experimentId: " + experimentId );

				requestDispatcher.forward( httpServletRequest, httpServletResponse );

				try {
					requestDispatcher.forward( httpServletRequest, httpServletResponse );
				} catch (ServletException | IOException e2 ) {
					log.error( "requestDispatcher.forward( httpServletRequest, httpServletResponse ); Failed:", e2 );
					throw e2;
				}
				
				return result;  //  EARLY RETURN
			}
			
		}

		
		if ( rootIdsObj == null ) {
	
			try {
				rootIdsObj = 
						unmarshalJSON_ToObject.getObjectFromJSONString(
								searchDataLookupParametersLookupDTO.getRootIdsOnlyJSON(), 
								RootIdsObj.class );
			} catch ( Exception e ) {
				String msg = "Failed to unmarshal LookupParametersJSONMainData JSON for searchDataLookupParametersLookupDTO.id: "
						+ searchDataLookupParametersLookupDTO.getId();
				log.error( msg );
				throw new LimelightInternalErrorException(  e );
			}
		}


		//   Validate that all Project Search Ids for searchDataLookupParametersCode are in Project Id the Experiment Id is in.
		
		List<Integer> projectIds_From_searchDataLookupParametersLookupDTO = 
				get_ProjectIds_For_ProjectSearchIds_Service.get_ProjectIds_For_ProjectSearchIds_Service( rootIdsObj.getProjectSearchIds() );

		if ( projectIds_From_searchDataLookupParametersLookupDTO.isEmpty() ) {

			String msg = "No Project Ids in Database for rootIdsObj.getProjectSearchIds(): " + rootIdsObj.getProjectSearchIds() ;
			log.warn(msg);

			Validate_Access_Page_ExperimentDataPage_Result result = new Validate_Access_Page_ExperimentDataPage_Result();
			
			result.searchDataLookupParametersCode = searchDataLookupParametersCode;

			result.validateAccessFailed = true;
			result.httpForwardOrRedirectSent = true;

			final int statusCode404 = 404; // Resource not found

			httpServletResponse.setStatus( statusCode404 ); 
			httpServletRequest.setAttribute( WebErrorPageKeysConstants.REQUESTED_DATA_NOT_FOUND, true ); // Control message on error page

			final String mainErrorPageControllerURL =
					AA_ErrorPageControllerPaths_Constants.PATH_START_ALL 
					+ AA_ErrorPageControllerPaths_Constants.MAIN_ERROR_PAGE_CONTROLLER;

			RequestDispatcher requestDispatcher = 
					httpServletRequest.getServletContext().getRequestDispatcher( mainErrorPageControllerURL );

			log.warn( "No Project Ids in Database for rootIdsObj.getProjectSearchIds(). "
					+ "setting HTTP status code to: " + statusCode404
					+ ".  Forwarding to '"
					+ mainErrorPageControllerURL
					+ "'. experimentId: " + experimentId );

			requestDispatcher.forward( httpServletRequest, httpServletResponse );

			try {
				requestDispatcher.forward( httpServletRequest, httpServletResponse );
			} catch (ServletException | IOException e2 ) {
				log.error( "requestDispatcher.forward( httpServletRequest, httpServletResponse ); Failed:", e2 );
				throw e2;
			}
			
			return result;  //  EARLY RETURN
		}

		if ( projectIds_From_searchDataLookupParametersLookupDTO.size() > 1 ) {

			String msg = "> 1 Project Ids in Database for rootIdsObj.getProjectSearchIds(): " 
					+ rootIdsObj.getProjectSearchIds() 
					+ ", Project Ids in Database: "
					+ projectIds_From_searchDataLookupParametersLookupDTO;
			log.error(msg);
			throw new LimelightInternalErrorException( msg );
		}
		
		{
			
			Integer projectId_From_searchDataLookupParametersLookupDTO = projectIds_From_searchDataLookupParametersLookupDTO.get(0);
			
			if ( projectId_From_searchDataLookupParametersLookupDTO.intValue() != projectId.intValue() ) {

				String msg = "Project Id in Database for rootIdsObj.getProjectSearchIds() Not Match Project Id for Experiment.  rootIdsObj.getProjectSearchIds(): " 
						+ rootIdsObj.getProjectSearchIds() 
						+ ", Project Id in Database for rootIdsObj.getProjectSearchIds(): "
						+ projectId_From_searchDataLookupParametersLookupDTO
						+ ", Project Id for Experiment: "
						+ projectId;
				log.error(msg);
				throw new LimelightInternalErrorException( msg );
			}
		}
		
		////////////////////////////////////////////
		
		Validate_Access_Page_ExperimentDataPage_Result result = new Validate_Access_Page_ExperimentDataPage_Result();
		
		result.searchDataLookupParametersCode = searchDataLookupParametersCode;

		result.userSession = validate_ProjectIds_Result.getUserSession();
		result.webSessionAuthAccessLevel = validate_ProjectIds_Result.getWebSessionAuthAccessLevel();
		
		result.projectId = projectId;
		result.projectIds = projectIds;
		result.experimentDTO = experimentDTO;
		result.searchDataLookupParametersLookupDTO = searchDataLookupParametersLookupDTO;
		return result;
		
	}
	
}
