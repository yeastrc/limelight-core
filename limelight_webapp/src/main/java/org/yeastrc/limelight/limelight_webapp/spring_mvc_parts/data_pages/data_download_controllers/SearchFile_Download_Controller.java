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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.data_download_controllers;

import java.io.BufferedOutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.yeastrc.limelight.limelight_shared.dto.SearchFileDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchFileProjectSearchDTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.dao.SearchFileProjectSearch_WebDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.SearchFile_WebDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;

/**
 * Download Search File.
 * 
 * A Search File is part of the imported Limelight XML file
 * 
 * Form Field Name: 'requestJSONString'
 */
@Controller
public class SearchFile_Download_Controller {

	private static final Logger log = LoggerFactory.getLogger( SearchFile_Download_Controller.class );
	
	private static final String CONTROLLER_PATH =
			AA_DataDownloadControllersPaths_Constants.PATH_START_ALL
			+ AA_DataDownloadControllersPaths_Constants.SEARCH_FILE_DOWNLOAD_CONTROLLER;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SearchFileProjectSearch_WebDAO_IF searchFileProjectSearch_WebDAO;
	
	@Autowired
	private SearchFile_WebDAO_IF searchFile_WebDAO;
	
	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;

	/**
	 * @param postRequestParameters
	 * @param httpServletRequest
	 * @param httpServletResponse
	 */
	@PostMapping( CONTROLLER_PATH )
	public void controllerMainMethod(
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {

		String requestJSONString = httpServletRequest.getParameter( "requestJSONString" ); // From Form POST fields

		if ( StringUtils.isEmpty( requestJSONString ) ) {
			
			//  TODO Maybe do something different
			throw new LimelightInternalErrorException( "'requestJSONString' is not populated field in form POST" );
		}

		try {
			RequestJSONParsed webserviceRequest = unmarshalJSON_ToObject.getObjectFromJSONString( requestJSONString, RequestJSONParsed.class );

			Integer projectSearchId = webserviceRequest.getProjectSearchId();

			if ( projectSearchId == null ) {
				log.warn( "No Project Search Id" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			Integer projectSearchFileId = webserviceRequest.getProjectSearchFileId();

			if ( projectSearchFileId == null ) {
				log.warn( "No projectSearchFileId" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			List<Integer> projectSearchIdsForValidate = new ArrayList<>( 1 );
			projectSearchIdsForValidate.add( projectSearchId );

			////////////////

			//  AUTH - validate access

			//  throws an exception if access is not valid that is turned into a webservice response by Spring

			try {
				//  Comment out result since not use it
				//		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
				validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIdsForValidate, httpServletRequest );

			} catch ( Limelight_WS_AuthError_Unauthorized_Exception e ) {

				//  TODO  No User session and not public project

				//  Forward to page stating No User Session

    			final String mainErrorPageControllerURL =
    					AA_DataDownloadControllersPaths_Constants.PATH_START_ALL 
    					+ AA_DataDownloadControllersPaths_Constants.NO_SESSION_NOT_PUBLIC_PROJECT_DOWNLOAD_CONTROLLER;

				log.warn( "Limelight_WS_AuthError_Unauthorized_Exception: Forwarding to Error Msg Controller: " + mainErrorPageControllerURL
						+ ", exception.toString(): "+ e.toString() );

    			RequestDispatcher requestDispatcher = 
    					httpServletRequest.getServletContext().getRequestDispatcher( mainErrorPageControllerURL );

    			log.warn( "Limelight_WS_AuthError_Unauthorized_Exception: Forwarding to error msg page for no session. " );

    			requestDispatcher.forward( httpServletRequest, httpServletResponse );

				return;  //  EARLY EXIT
			}
			
			SearchFileProjectSearchDTO searchFileProjectSearchDTO =
					searchFileProjectSearch_WebDAO.getSearchFileProjectSearchDTOForId( projectSearchFileId );
			
			if ( searchFileProjectSearchDTO == null ) {
				log.warn( "projectSearchFileId not in DB: " + projectSearchFileId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			if ( searchFileProjectSearchDTO.getProjectSearchId() != projectSearchId.intValue() ) {
				log.warn( "projectSearchId for projectSearchFileId not match projectSearchId in request. projectSearchFileId " 
						+ projectSearchFileId
						+ ", projectSearchId for projectSearchFileId: " + searchFileProjectSearchDTO.getProjectSearchId()
						+ ", projectSearchId in request: " + projectSearchId );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			

			SearchFileDTO  searchFileDTO = 
					searchFile_WebDAO.getSearchFileDTOForId( searchFileProjectSearchDTO.getSearchFileId()  );

			if ( searchFileDTO == null ) {
				String msg = " no searchFileDTO record found for SearchFileId: " + searchFileProjectSearchDTO.getSearchFileId() ;
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
			
			byte[] fileContents = searchFile_WebDAO.getDataFileData( searchFileProjectSearchDTO.getSearchFileId() );
			int fileSize = 0;
			if ( fileContents != null ) {
				fileSize = fileContents.length;
			}
			// generate file name
			String filename = searchFileProjectSearchDTO.getDisplayFilename();
			
			httpServletResponse.setContentType( searchFileDTO.getMimeType() );
			httpServletResponse.setHeader("Content-Disposition", "attachment; filename=" + filename);
			httpServletResponse.setContentLength( fileSize );
			
			BufferedOutputStream bos = null;
			try {
				ServletOutputStream out = httpServletResponse.getOutputStream();
				bos = new BufferedOutputStream(out);
				out.write( fileContents );
			} finally {
				try {
					if ( bos != null ) {
						bos.close();
					}
				} catch ( Exception ex ) {
					log.error( "bos.close():Exception " + ex.toString(), ex );
				}
				try {
					httpServletResponse.flushBuffer();
				} catch ( Exception ex ) {
					log.error( "httpServletResponse.flushBuffer():Exception " + ex.toString(), ex );
				}
			}
    		
		} catch ( Limelight_WS_AuthError_Unauthorized_Exception e ) {

			log.error( "Limelight_WS_AuthError_Unauthorized_Exception: " + e.toString(), e );

			//  TODO  No User session and not public project
			throw e;
			
		} catch ( Limelight_WS_AuthError_Forbidden_Exception e ) {

			log.error( "Limelight_WS_AuthError_Forbidden_Exception: " + e.toString(), e );

			//  TODO  User Auth Error
			throw e;
			
		} catch ( Exception e ) {
			
			log.error( "Exception: " + e.toString(), e );
			throw new RuntimeException();
		}
	}

	/**
	 * Request JSON Parsed representation
	 */
	public static class RequestJSONParsed {

		private Integer projectSearchId;
		/**
		 * Search File Id mapped to this project search id
		 */
		private Integer projectSearchFileId;
		
		public Integer getProjectSearchFileId() {
			return projectSearchFileId;
		}
		public void setProjectSearchFileId(Integer projectSearchFileId) {
			this.projectSearchFileId = projectSearchFileId;
		}
		public Integer getProjectSearchId() {
			return projectSearchId;
		}
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}

	}
}
