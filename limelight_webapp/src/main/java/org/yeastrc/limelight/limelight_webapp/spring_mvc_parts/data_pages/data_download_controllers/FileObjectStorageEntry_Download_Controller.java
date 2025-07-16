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

import java.io.InputStream;
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
import org.yeastrc.file_object_storage.accept_import_web_app.webservice_connect.main.CallYRCFileObjectStoreWebservice;
import org.yeastrc.file_object_storage.accept_import_web_app.webservice_connect.main.CallYRCFileObjectStoreWebserviceInitParameters;
import org.yeastrc.file_object_storage.web_app.shared_server_client.webservice_request_response.main.Get_StoredFileObjectContents_Request;
import org.yeastrc.file_object_storage.web_app.shared_server_client.webservice_request_response.main.Get_StoredFileObjectContents_Response_FromConnectionLibraryCall;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.services.Support_DataDownloadControllers_Service.DownloadStatus_DataDownloadControllers_Enum;
import org.yeastrc.limelight.limelight_webapp.services.Support_DataDownloadControllers_Service_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId_Searcher.FileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId_Searcher_Return_Item;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;

/**
 * Download  File Object Storage Entry.
 * 
 * Form Field Name: 'requestJSONString'
 */
@Controller
public class FileObjectStorageEntry_Download_Controller {

	private static final Logger log = LoggerFactory.getLogger( FileObjectStorageEntry_Download_Controller.class );
	
	private static final String CONTROLLER_PATH =
			AA_DataDownloadControllersPaths_Constants.PATH_START_ALL
			+ AA_DataDownloadControllersPaths_Constants.FILE_OBJECT_STORAGE_ENTRY_DOWNLOAD_CONTROLLER;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private Support_DataDownloadControllers_Service_IF support_DataDownloadControllers_Service;
	
	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
	
	@Autowired
	private FileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId_Searcher_IF fileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId_Searcher;

	@Autowired
	private RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF restControllerUtils__Request_Accept_GZip_Response_Set_GZip;

	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;

	private static final int COPY_FILE_ARRAY_SIZE = 32 * 1024;
	
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
						
			support_DataDownloadControllers_Service.updateDownload_Identifier_Status( webserviceRequest.downloadIdentifier, DownloadStatus_DataDownloadControllers_Enum.IN_PROGRESS );
			
			Integer projectSearchId = webserviceRequest.projectSearchId;

			if ( projectSearchId == null ) {

	    		support_DataDownloadControllers_Service.updateDownload_Identifier_Status( webserviceRequest.downloadIdentifier, DownloadStatus_DataDownloadControllers_Enum.FAIL );
	    		
				log.warn( "No Project Search Id" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			Integer fileObjectStorageForSearch_Id = webserviceRequest.fileObjectStorageForSearch_Id;

			if ( fileObjectStorageForSearch_Id == null ) {

	    		support_DataDownloadControllers_Service.updateDownload_Identifier_Status( webserviceRequest.downloadIdentifier, DownloadStatus_DataDownloadControllers_Enum.FAIL );
	    		
				log.warn( "No fileObjectStorageForSearch_Id" );
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
			

			Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId(projectSearchId);
			if ( searchId == null ) {
				String msg = "No searchId for  projectSearchId. searchIdForProjectSearchIdSearcher.getSearchListForProjectId(projectSearchId); returns null. projectSearchId: " + projectSearchId;
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			
			
			
			String fileObjectStorage_Webservice_BaseURL =
					configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL );
			
			
			boolean returnAs_GZIP_IfAvailable = false;
			
			{
				boolean accept_GZIP = restControllerUtils__Request_Accept_GZip_Response_Set_GZip.does_HttpServletRequest_Accept_GZip( httpServletRequest );
					
				if (  accept_GZIP ) {

					returnAs_GZIP_IfAvailable = true;
				}
			}

			List<FileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId_Searcher_Return_Item> searcher_Results = 
					fileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId_Searcher
					.getFileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId(fileObjectStorageForSearch_Id, searchId);
					
			if ( searcher_Results.isEmpty() ) {
				String msg = "Entry not found for fileObjectStorageForSearch_Id: " + fileObjectStorageForSearch_Id 
						+ ", searchId: " + searchId + ", projectSearchId: " + projectSearchId;
				log.warn(msg);
				throw new LimelightInternalErrorException(msg);
				
				//  TODO  Show proper error message to user
			}

			if ( searcher_Results.size() > 1 ) {
				String msg = "More than 1 Entry found for fileObjectStorageForSearch_Id: " + fileObjectStorageForSearch_Id 
						+ ", searchId: " + searchId + ", projectSearchId: " + projectSearchId;
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			
			FileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId_Searcher_Return_Item searcher_SingleResult = searcher_Results.get(0);

			CallYRCFileObjectStoreWebserviceInitParameters initParameters = new CallYRCFileObjectStoreWebserviceInitParameters();
			
			initParameters.setFileObjectStorageServerBaseURL( fileObjectStorage_Webservice_BaseURL );

			CallYRCFileObjectStoreWebservice callYRCFileObjectStoreWebservice = CallYRCFileObjectStoreWebservice.getInstance();
			
			callYRCFileObjectStoreWebservice.init(initParameters);
							
			
			Get_StoredFileObjectContents_Request get_StoredFileObjectContents_Request = new Get_StoredFileObjectContents_Request();
			
			get_StoredFileObjectContents_Request.setFileAPIKey(searcher_SingleResult.getFile_object_storage_api_key());
			get_StoredFileObjectContents_Request.setReturnAs_GZIP_IfAvailable( returnAs_GZIP_IfAvailable );
			
			
			Get_StoredFileObjectContents_Response_FromConnectionLibraryCall get_StoredFileObjectContents_Response_FromConnectionLibraryCall = null;
			
			
			try {
			
				get_StoredFileObjectContents_Response_FromConnectionLibraryCall =
					callYRCFileObjectStoreWebservice.call_GetFile_Webservice(get_StoredFileObjectContents_Request);
				
	
				//  Only populated when entry found
				System.out.println( "get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getInputStream_FileObjectContents(): " 
						+ get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getInputStream_FileObjectContents() );
	
				//  Only populated when entry found
				System.out.println( "get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getReturnedContentsLength(): " 
						+ get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getReturnedContentsLength() );
	
				//  Only populated when entry found or entry not found
				System.out.println( "get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getResponseFromWebserviceInHeader(): " 
						+ get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getResponseFromWebserviceInHeader() );
				System.out.println( "get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getResponseFromWebserviceInHeader().getFileAPIKey_NOT_FOUND(): " 
						+ get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getResponseFromWebserviceInHeader().getFileAPIKey_NOT_FOUND() );
				System.out.println( "get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getResponseFromWebserviceInHeader().getFileLength_NonGZIP(): " 
						+ get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getResponseFromWebserviceInHeader().getFileLength_NonGZIP() );
				System.out.println( "get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getResponseFromWebserviceInHeader().getResponse_Is_GZIP(): " 
						+ get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getResponseFromWebserviceInHeader().getResponse_Is_GZIP() );
				
				//  TODO  Need to handle API Key NOT FOUND
		
				
				long fileSize = get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getReturnedContentsLength();
				
				// generate file name
				String filename = searcher_SingleResult.getFilename_at_import();  //  Get from DB reocord
				
				httpServletResponse.setContentType( "application/binary" );  //  TODO  Save and then use from DB record??
				
				httpServletResponse.setHeader("Content-Disposition", "attachment; filename=" + filename);
				
				if ( get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getResponseFromWebserviceInHeader().getResponse_Is_GZIP() != null
						&& get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getResponseFromWebserviceInHeader().getResponse_Is_GZIP().booleanValue() ) {
					
					restControllerUtils__Request_Accept_GZip_Response_Set_GZip.set_GZIP_On_HttpServletResponse( httpServletResponse );
				}
				
				httpServletResponse.setContentLengthLong( fileSize );
				
				{
					long totalBytesCopied = 0;
	
					try ( ServletOutputStream out = httpServletResponse.getOutputStream() ) {

						InputStream inputStream = get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getInputStream_FileObjectContents();
						byte[] buf = new byte[ COPY_FILE_ARRAY_SIZE ];
						int len;
						while ((len = inputStream.read(buf)) > 0){
							out.write(buf, 0, len);
							totalBytesCopied += len;
						}
					}
				}
				
			} finally {
				
				if ( get_StoredFileObjectContents_Response_FromConnectionLibraryCall != null ) {
					InputStream inputStream = get_StoredFileObjectContents_Response_FromConnectionLibraryCall.getInputStream_FileObjectContents();
				
					if ( inputStream != null ) {
						
						try {
							inputStream.close();
						} finally {
							
						}
						
					}
					
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

	/**
	 * Request JSON Parsed representation
	 */
	public static class RequestJSONParsed {

		private Integer projectSearchId;
		/**
		 * File Object Storage Id mapped to this Search Id (project search id)
		 */
		private Integer fileObjectStorageForSearch_Id;
		private String downloadIdentifier;
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public void setFileObjectStorageForSearch_Id(Integer fileObjectStorageForSearch_Id) {
			this.fileObjectStorageForSearch_Id = fileObjectStorageForSearch_Id;
		}
		public void setDownloadIdentifier(String downloadIdentifier) {
			this.downloadIdentifier = downloadIdentifier;
		}
		
	}
}
