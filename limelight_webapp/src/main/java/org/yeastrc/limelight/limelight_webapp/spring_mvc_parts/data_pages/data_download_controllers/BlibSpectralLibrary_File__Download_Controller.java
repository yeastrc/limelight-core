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
import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.blib_file__creation_web_service__call_webservice_code.BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService_IF;
import org.yeastrc.limelight.limelight_webapp.blib_file__creation_web_service__call_webservice_code.BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService.BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService_Response;
import org.yeastrc.limelight.limelight_webapp.blib_file__creation_web_service__call_webservice_code.BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService.Request_To_BlibCreator_Status_Webservice_Root;
import org.yeastrc.limelight.limelight_webapp.blib_file__creation_web_service__call_webservice_code.BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService.Response_From_BlibCreator_Status_Webservice_Root;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappConfigException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.services.Support_DataDownloadControllers_Service_IF;
import org.yeastrc.limelight.limelight_webapp.services.Support_DataDownloadControllers_Service.DownloadStatus_DataDownloadControllers_Enum;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;

/**
 * Download Blib Spectral Library File.
 * 
 * 		The creation of the Blib Spectral Library File is initiated by the web service class BlibSpectralLibrary_Download__Request_Creation_RestWebserviceController
 * 
 * Form Field Name: 'requestJSONString'
 */
@Controller
public class BlibSpectralLibrary_File__Download_Controller {

	private static final Logger log = LoggerFactory.getLogger( BlibSpectralLibrary_File__Download_Controller.class );
	
	private static final String CONTROLLER_PATH =
			AA_DataDownloadControllersPaths_Constants.PATH_START_ALL
			+ AA_DataDownloadControllersPaths_Constants.BLIB_SPECTRAL_LIBRARY_DOWNLOAD__GET_CREATED_FILE__DOWNLOAD_CONTROLLER;
	
	private static final String WEBSERVICE_GET_STATUS_VALUE__SUCCESS = "success";

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private Support_DataDownloadControllers_Service_IF support_DataDownloadControllers_Service;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	@Autowired
	private BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService_IF blibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService;

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
		
		RequestJSONParsed webserviceRequest = null;

		try {
			webserviceRequest = unmarshalJSON_ToObject.getObjectFromJSONString( requestJSONString, RequestJSONParsed.class );
			
			if ( webserviceRequest.projectSearchIdList == null || webserviceRequest.projectSearchIdList.isEmpty() ) {

	    		support_DataDownloadControllers_Service.updateDownload_Identifier_Status( webserviceRequest.downloadIdentifier, DownloadStatus_DataDownloadControllers_Enum.FAIL );
	    		
				log.warn( "No webserviceRequest.projectSearchIdList entries" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			if ( webserviceRequest.requestId == null || webserviceRequest.requestId.length() == 0 ) {

	    		support_DataDownloadControllers_Service.updateDownload_Identifier_Status( webserviceRequest.downloadIdentifier, DownloadStatus_DataDownloadControllers_Enum.FAIL );
	    		
				log.warn( "webserviceRequest.requestId is missing or empty string" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			support_DataDownloadControllers_Service.updateDownload_Identifier_Status( webserviceRequest.downloadIdentifier, DownloadStatus_DataDownloadControllers_Enum.IN_PROGRESS );
			
			List<Integer> projectSearchIdList = webserviceRequest.projectSearchIdList;
			
			////////////////

			//  AUTH - validate access

			//  throws an exception if access is not valid that is turned into a webservice response by Spring
			
			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result = null;

			try {
				validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
						validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIdList, httpServletRequest );

			} catch ( Limelight_WS_AuthError_Unauthorized_Exception e ) {

				//  TODO  No User session and not public project

	    		support_DataDownloadControllers_Service.updateDownload_Identifier_Status( webserviceRequest.downloadIdentifier, DownloadStatus_DataDownloadControllers_Enum.FAIL );
	    		
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
			
			/////////

			String blibService_ResultFile_DirectoryBasePath = configSystemDAO.getConfigValueForConfigKey(
					ConfigSystemsKeysSharedConstants.BLIB_SPECTRAL_LIBRARY_FILE_RESULT_FILE_BASE_PATH );

			if ( blibService_ResultFile_DirectoryBasePath == null || StringUtils.isEmpty( blibService_ResultFile_DirectoryBasePath.trim() ) ) {
				
				String msg = " ( blibService_ResultFile_DirectoryBasePath == null || StringUtils.isEmpty( blibService_ResultFile_DirectoryBasePath.trim() ) )";
				log.error(msg);
				throw new LimelightWebappConfigException(msg);
			}
			
			File blibService_ResultFile_DirectoryBasePath_FileObject = new File( blibService_ResultFile_DirectoryBasePath );
			
			if ( ! blibService_ResultFile_DirectoryBasePath_FileObject.exists() ) {

				String msg = "blibService_ResultFile_DirectoryBasePath not exist: " + blibService_ResultFile_DirectoryBasePath;
				log.error(msg);
				throw new LimelightWebappConfigException(msg);
			}

			if ( ! blibService_ResultFile_DirectoryBasePath_FileObject.canRead() ) {

				String msg = "blibService_ResultFile_DirectoryBasePath cannot read: " + blibService_ResultFile_DirectoryBasePath;
				log.error(msg);
				throw new LimelightWebappConfigException(msg);
			}
			
			////////////////

			Integer projectId = null;

			{
				List<Integer> projectIds = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds();

				if (projectIds.isEmpty() ) {
					String msg = "validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds(); returned empty list.";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
				if (projectIds.size() > 1 ) {
					String msg = "validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds(); returned > 1 entry.";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}

				projectId = projectIds.get(0);
			}	

			Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
			List<Integer> searchIdList = new ArrayList<>( projectSearchIdList.size() );

			for ( Integer projectSearchId : projectSearchIdList ) {

				Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
				if ( searchId == null ) {
					String msg = "No searchId for projectSearchId: " + projectSearchId;
					log.warn( msg );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}

				projectSearchIdMapToSearchId.put( projectSearchId, searchId );
				searchIdList.add(searchId);
			}
			
			Collections.sort( searchIdList );
			
			Request_To_BlibCreator_Status_Webservice_Root request_To_BlibCreator_Webservice_Root = new Request_To_BlibCreator_Status_Webservice_Root( projectId, webserviceRequest.requestId );

			BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService_Response callWebService_Response =
					blibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService.
					blibFileCreation_WebService__GetCreationStatus__CallWebService(request_To_BlibCreator_Webservice_Root);
			

			if ( ! callWebService_Response.isStatus() ) {
				String msg = "( ! callWebService_Response.isStatus() ):  Overall Status returned is false.";
				log.warn( msg );
				throw new LimelightInternalErrorException( msg );
			}
			
			Response_From_BlibCreator_Status_Webservice_Root response_From_BlibCreator_Status_Webservice_Root = callWebService_Response.getWebserviceResponse_Root();

			if ( ! WEBSERVICE_GET_STATUS_VALUE__SUCCESS.equals( response_From_BlibCreator_Status_Webservice_Root.getStatus() ) ) {
				String msg = "( ! WEBSERVICE_GET_STATUS_VALUE__SUCCESS.equals( response_From_BlibCreator_Status_Webservice_Root.getStatus() ) getStatus(): " + response_From_BlibCreator_Status_Webservice_Root.getStatus()  ;
				log.warn( msg );
				throw new LimelightInternalErrorException( msg );
			}
			
			File blibService_ResultFile_DirectoryBasePath_FileObject_And_ProjectIdSubDir = new File( blibService_ResultFile_DirectoryBasePath_FileObject, String.valueOf(projectId));

			File blibFile = new File( blibService_ResultFile_DirectoryBasePath_FileObject_And_ProjectIdSubDir, response_From_BlibCreator_Status_Webservice_Root.getBlib_file_name() );
			
			if ( ! blibFile.exists() ) {
				String msg = "blibFile to download not exist: " + blibFile.getAbsolutePath();
				log.warn( msg );
				throw new LimelightInternalErrorException( msg );
			}

			if ( ! blibFile.canRead() ) {
				String msg = "blibFile to download cannot read: " + blibFile.getAbsolutePath();
				log.warn( msg );
				throw new LimelightInternalErrorException( msg );
			}
			
			long blibFile_Size = blibFile.length();
			
			//  Create filename for download
			
			String filename_Searches_Label = "search";
			
			if ( searchIdList.size() > 1 ) {
				filename_Searches_Label = "searches";
			}
			
			// generate file name
			String blibFilename = "limelight-blib-spectral-library-file-" + filename_Searches_Label + "-" + StringUtils.join(searchIdList, "-") + ".blib";
			
			httpServletResponse.setContentType( "application/octet-stream" );
			httpServletResponse.setHeader("Content-Disposition", "attachment; filename=" + blibFilename);
			httpServletResponse.setContentLengthLong( blibFile_Size );
			
			FileInputStream fileInputStream = null;
			BufferedOutputStream bufferedOutputStream = null;
			try {
				fileInputStream = new FileInputStream(blibFile);
				ServletOutputStream out = httpServletResponse.getOutputStream();
				bufferedOutputStream = new BufferedOutputStream(out);
				
				int byteArraySize = 5000;
				byte[] data = new byte[ byteArraySize ];
				while (true) {
					int bytesRead = fileInputStream.read( data );
					if ( bytesRead == -1 ) {  // end of input
						break;
					}
					if ( bytesRead > 0 ) {
						bufferedOutputStream.write( data, 0, bytesRead );
					}
				}
			} finally {
				try {
					if ( fileInputStream != null ) {
						fileInputStream.close();
					}
				} catch ( Exception ex ) {
					log.error( "fileInputStream.close():Exception " + ex.toString(), ex );
				}
				try {
					if ( bufferedOutputStream != null ) {
						bufferedOutputStream.close();
					}
				} catch ( Exception ex ) {
					log.error( "bufferedOutputStream.close():Exception " + ex.toString(), ex );
				}
				try {
					httpServletResponse.flushBuffer();
				} catch ( Exception ex ) {
					log.error( "httpServletResponse.flushBuffer():Exception " + ex.toString(), ex );
				}
			}

    		support_DataDownloadControllers_Service.updateDownload_Identifier_Status( webserviceRequest.downloadIdentifier, DownloadStatus_DataDownloadControllers_Enum.SUCCESS );
    		
		} catch ( Limelight_WS_AuthError_Unauthorized_Exception e ) {

			try {
				if ( webserviceRequest != null ) {
					support_DataDownloadControllers_Service.updateDownload_Identifier_Status( webserviceRequest.downloadIdentifier, DownloadStatus_DataDownloadControllers_Enum.FAIL );
				}
			} catch ( Throwable t ) {
				//  Eat Exception
			}
				
			log.error( "Limelight_WS_AuthError_Unauthorized_Exception: " + e.toString(), e );

			//  TODO  No User session and not public project
			throw e;
			
		} catch ( Limelight_WS_AuthError_Forbidden_Exception e ) {

			try {
				if ( webserviceRequest != null ) {
					support_DataDownloadControllers_Service.updateDownload_Identifier_Status( webserviceRequest.downloadIdentifier, DownloadStatus_DataDownloadControllers_Enum.FAIL );
				}
			} catch ( Throwable t ) {
				//  Eat Exception
			}
				
			log.error( "Limelight_WS_AuthError_Forbidden_Exception: " + e.toString(), e );

			//  TODO  User Auth Error
			throw e;
			
		} catch ( Throwable e ) {

			try {
				if ( webserviceRequest != null ) {
					support_DataDownloadControllers_Service.updateDownload_Identifier_Status( webserviceRequest.downloadIdentifier, DownloadStatus_DataDownloadControllers_Enum.FAIL );
				}
			} catch ( Throwable t ) {
				//  Eat Exception
			}
				
			log.error( "Exception: " + e.toString(), e );
			throw new RuntimeException();
		}
	}

	////////////////

	/**
	 * Request JSON Parsed representation
	 */
	public static class RequestJSONParsed {

		private List<Integer> projectSearchIdList;
		private String requestId;
		private String downloadIdentifier;
		
		public void setProjectSearchIdList(List<Integer> projectSearchIdList) {
			this.projectSearchIdList = projectSearchIdList;
		}
		public void setRequestId(String requestId) {
			this.requestId = requestId;
		}
		public void setDownloadIdentifier(String downloadIdentifier) {
			this.downloadIdentifier = downloadIdentifier;
		}
	}
}
