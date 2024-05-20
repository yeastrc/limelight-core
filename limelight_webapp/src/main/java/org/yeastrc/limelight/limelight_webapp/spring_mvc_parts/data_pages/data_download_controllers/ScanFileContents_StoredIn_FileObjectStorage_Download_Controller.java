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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsValuesSharedConstants;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFilename_DTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFile_For_ProjectScanFileId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFilename_For_ProjectScanFileId_Set_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher.FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher_Return_Item;
import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher.FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher_Return_Item;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;

/**
 * Download  Scan File Contents From File Object Storage Entry.
 * 
 * Form Field Name: 'requestJSONString'
 * 
 * 
 * !!!!!!!!   This contains * 2 * Controller Paths
 * 
 *    1)   For download from Search using Search Scan File Id and Project Search Id
 *    
 *    2)   Project Scan FIle Id for download from Scan File section in Project
 */
@Controller
public class ScanFileContents_StoredIn_FileObjectStorage_Download_Controller {

	private static final Logger log = LoggerFactory.getLogger( ScanFileContents_StoredIn_FileObjectStorage_Download_Controller.class );

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
	
	@Autowired
	private FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher_IF fileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher;
	
	@Autowired
	private ProjectScanFile_For_ProjectScanFileId_Searcher_IF projectScanFile_For_ProjectScanFileId_Searcher;
	
	@Autowired
	private FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher_IF fileObjectStorage_Data_FOR_ProjectScanFileId_Searcher;
	
	@Autowired
	private ProjectScanFilename_For_ProjectScanFileId_Set_Searcher_IF projectScanFilename_For_ProjectScanFileId_Set_Searcher;
	
	@Autowired
	private RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF restControllerUtils__Request_Accept_GZip_Response_Set_GZip;

	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;

	private static final int COPY_FILE_ARRAY_SIZE = 32 * 1024;
	
	
	/////////////////////////////
	
	//  Controller Path 1:   For download from Search using Search Scan File Id and Project Search Id
	
	
	private static final String CONTROLLER_PATH__FROM__SEARCH_SCAN_FILE_ID =
			AA_DataDownloadControllersPaths_Constants.PATH_START_ALL
			+ AA_DataDownloadControllersPaths_Constants.SCAN_FILE_CONTENTS_FROM_FILE_OBJECT_STORAGE_ENTRY__USING__SEARCH_SCAN_FILE_ID__PROJECT_SEARCH_ID__DOWNLOAD_CONTROLLER;

	/**
	 * @param postRequestParameters
	 * @param httpServletRequest
	 * @param httpServletResponse
	 */
	@PostMapping( CONTROLLER_PATH__FROM__SEARCH_SCAN_FILE_ID )
	public void controllerMainMethod(
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {

		String requestJSONString = httpServletRequest.getParameter( "requestJSONString" ); // From Form POST fields

		if ( StringUtils.isEmpty( requestJSONString ) ) {
			
			//  TODO Maybe do something different
			throw new LimelightInternalErrorException( "'requestJSONString' is not populated field in form POST" );
		}

		try {
			
			{  
				String configValue = configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.SCAN_FILE_DOWNLOAD_FROM_FILE_OBJECT_STORAGE_ALLOWED_KEY );
				if ( ! ConfigSystemsValuesSharedConstants.TRUE.equals( configValue ) ) {
				
					//  TODO  do something different
					log.error("In Download Scanfile Controller but Download scan files config is NOT TRUE" );
					
					httpServletRequest.setAttribute( "scanFileDownloadsNotAllowed", true);
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
			}
			
			
			RequestJSONParsed__DownloadFrom_SearchScanFileId_ProjectSearchId webserviceRequest = unmarshalJSON_ToObject.getObjectFromJSONString( requestJSONString, RequestJSONParsed__DownloadFrom_SearchScanFileId_ProjectSearchId.class );

			Integer projectSearchId = webserviceRequest.projectSearchId;

			if ( projectSearchId == null ) {
				log.warn( "No Project Search Id" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			Integer searchScanFile_Id = webserviceRequest.searchScanFile_Id;

			if ( searchScanFile_Id == null ) {
				log.warn( "No searchScanFile_Id" );
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
			

			Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId(projectSearchId);
			if ( searchId == null ) {
				String msg = "No searchId for  projectSearchId. searchIdForProjectSearchIdSearcher.getSearchListForProjectId(projectSearchId); returns null. projectSearchId: " + projectSearchId;
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}

			List<FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher_Return_Item> searcher_Results =
					fileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher.getFileObjectStorage_Data_FOR_SearchScanFile_Id_AND_SearchId(searchScanFile_Id, searchId);
			
			if ( searcher_Results.isEmpty() ) {
				String msg = "Entry not found for searchScanFile_Id: " + searchScanFile_Id 
						+ ", searchId: " + searchId + ", projectSearchId: " + projectSearchId;
				log.warn(msg);
				throw new LimelightInternalErrorException(msg);
				
				//  TODO  Show proper error message to user
			}

			if ( searcher_Results.size() > 1 ) {
				String msg = "More than 1 Entry found for searchScanFile_Id: " + searchScanFile_Id 
						+ ", searchId: " + searchId + ", projectSearchId: " + projectSearchId;
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			
			FileObjectStorage_Data_FOR_SearchScanFileId_AND_SearchId_Searcher_Return_Item searcher_SingleResult = searcher_Results.get(0);


			doActualDownload( searcher_SingleResult.getFile_object_storage_api_key(), searcher_SingleResult.getFilename_at_import(), httpServletRequest, httpServletResponse);
			

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

	/////////////////////////////
	
	//  Controller Path 2:   For download from Scan File Section of Project Page using Project Scan File Id
	
	
	private static final String CONTROLLER_PATH__FROM__PROJECT_SCAN_FILE_ID =
			AA_DataDownloadControllersPaths_Constants.PATH_START_ALL
			+ AA_DataDownloadControllersPaths_Constants.SCAN_FILE_CONTENTS_FROM_FILE_OBJECT_STORAGE_ENTRY__USING__PROJECT_SCAN_FILE_ID__DOWNLOAD_CONTROLLER;

	/**
	 * @param postRequestParameters
	 * @param httpServletRequest
	 * @param httpServletResponse
	 */
	@PostMapping( CONTROLLER_PATH__FROM__PROJECT_SCAN_FILE_ID )
	public void controllerMainMethod_FromProjectScanFileId(
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {

		String requestJSONString = httpServletRequest.getParameter( "requestJSONString" ); // From Form POST fields

		if ( StringUtils.isEmpty( requestJSONString ) ) {
			
			//  TODO Maybe do something different
			throw new LimelightInternalErrorException( "'requestJSONString' is not populated field in form POST" );
		}

		try {

			{  
				String configValue = configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.SCAN_FILE_DOWNLOAD_FROM_FILE_OBJECT_STORAGE_ALLOWED_KEY );
				if ( ! ConfigSystemsValuesSharedConstants.TRUE.equals( configValue ) ) {
				
					//  TODO  do something different
					log.error("In Download Scanfile Controller but Download scan files config is NOT TRUE" );
					
					httpServletRequest.setAttribute( "scanFileDownloadsNotAllowed", true);
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
			}
			
			
			RequestJSONParsed__DownloadFrom_ProjectScanFileId webserviceRequest = unmarshalJSON_ToObject.getObjectFromJSONString( requestJSONString, RequestJSONParsed__DownloadFrom_ProjectScanFileId.class );

			Integer projectScanFile_Id = webserviceRequest.projectScanFile_Id;

			if ( projectScanFile_Id == null ) {
				log.warn( "No projectScanFile_Id" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			
			Project_ScanFile_DTO project_ScanFile_DTO = projectScanFile_For_ProjectScanFileId_Searcher.get_For_ProjectScanFileId_Searcher(projectScanFile_Id);
			
			if ( project_ScanFile_DTO == null ) {
				String msg = "No project_ScanFile_DTO for  projectScanFile_Id. projectScanFile_For_ProjectScanFileId_Searcher.get_For_ProjectScanFileId_Searcher(projectScanFile_Id); returns null. projectScanFile_Id: " + projectScanFile_Id;
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			
			int projectId = project_ScanFile_DTO.getProjectId();
			

			////////////////

			//  AUTH - validate access

			//  throws an exception if access is not valid that is turned into a webservice response by Spring

			try {
				//  Comment out result since not use it

				List<Integer> projectIds = new ArrayList<>( 1 );
				projectIds.add( projectId );

				//  Restrict access to Project owners or above (admin), if project was not locked
				ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
						validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
						.validateProjectOwnerAllowed( projectIds, httpServletRequest );


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
			

			List<FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher_Return_Item> searcher_Results =
					fileObjectStorage_Data_FOR_ProjectScanFileId_Searcher.getFileObjectStorage_Data_FOR_ProjectScanFile_Id( projectScanFile_Id );
			
			if ( searcher_Results.isEmpty() ) {
				String msg = "Entry not found for projectScanFile_Id: " + projectScanFile_Id;
				log.warn(msg);
				throw new LimelightInternalErrorException(msg);
				
				//  TODO  Show proper error message to user
			}

			if ( searcher_Results.size() > 1 ) {
				String msg = "More than 1 Entry found for projectScanFile_Id: " + projectScanFile_Id;
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			
			FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher_Return_Item fileObjectStorage_Data_Searcher_SingleResult = searcher_Results.get(0);
			
			
			Set<Integer> projectScanFileId_Set = new HashSet<>();
			projectScanFileId_Set.add(projectScanFile_Id);
			
			List<Project_ScanFilename_DTO>  project_ScanFilename_DTO_List = 
					projectScanFilename_For_ProjectScanFileId_Set_Searcher.get_For_ProjectScanFileId_Set_Searcher( projectScanFileId_Set );

			if ( project_ScanFilename_DTO_List.isEmpty() ) {
				String msg = "NO Entries found in project_ScanFilename_DTO_List for projectScanFile_Id: " + projectScanFile_Id;
				log.warn(msg);
				throw new LimelightInternalErrorException(msg);
				
				//  TODO  Show proper error message to user
			}


			doActualDownload( fileObjectStorage_Data_Searcher_SingleResult.getFile_object_storage_api_key(), project_ScanFilename_DTO_List.get(0).getScanFilename(), httpServletRequest, httpServletResponse);
			

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
	
	
	
	//////////////////////////////
	
	//  Internal Main Download
	
	/**
	 * @param file_object_storage_api_key
	 * @param filename_at_import
	 * @param httpServletRequest
	 * @param httpServletResponse
	 */
	private void doActualDownload(
			
			String file_object_storage_api_key,
			String filename_at_import,
			
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {
			
		try {
			
			String fileObjectStorage_Webservice_BaseURL =
					configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL );
			
			
			boolean returnAs_GZIP_IfAvailable = false;
			
			{
				boolean accept_GZIP = restControllerUtils__Request_Accept_GZip_Response_Set_GZip.does_HttpServletRequest_Accept_GZip( httpServletRequest );
					
				if (  accept_GZIP ) {

					returnAs_GZIP_IfAvailable = true;
				}
			}

			CallYRCFileObjectStoreWebserviceInitParameters initParameters = new CallYRCFileObjectStoreWebserviceInitParameters();
			
			initParameters.setFileObjectStorageServerBaseURL( fileObjectStorage_Webservice_BaseURL );

			CallYRCFileObjectStoreWebservice callYRCFileObjectStoreWebservice = CallYRCFileObjectStoreWebservice.getInstance();
			
			callYRCFileObjectStoreWebservice.init(initParameters);
							
			
			Get_StoredFileObjectContents_Request get_StoredFileObjectContents_Request = new Get_StoredFileObjectContents_Request();
			
			get_StoredFileObjectContents_Request.setFileAPIKey( file_object_storage_api_key );
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
				String filename = filename_at_import;  //  Get from DB reocord
				
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
	
	
	
	
	////////////////////////////////////////
	
	//   Request Controller 1:  Download using Search Scan File Id and Project Search Id

	/**
	 * Request JSON Parsed representation
	 */
	public static class RequestJSONParsed__DownloadFrom_SearchScanFileId_ProjectSearchId  {

		private Integer projectSearchId;
		private Integer searchScanFile_Id;
		
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public void setSearchScanFile_Id(Integer searchScanFile_Id) {
			this.searchScanFile_Id = searchScanFile_Id;
		}
	}
	
	////////////////////////////////////////
	
	//   Request Controller 2:  Download using Project Scan File Id

	/**
	 * Request JSON Parsed representation
	 */
	public static class RequestJSONParsed__DownloadFrom_ProjectScanFileId  {

		private Integer projectScanFile_Id;

		public void setProjectScanFile_Id(Integer projectScanFile_Id) {
			this.projectScanFile_Id = projectScanFile_Id;
		}
	}
	
	
	
	
}
