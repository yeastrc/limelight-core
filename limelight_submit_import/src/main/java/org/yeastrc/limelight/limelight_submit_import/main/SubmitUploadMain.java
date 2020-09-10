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
package org.yeastrc.limelight.limelight_submit_import.main;


import java.io.Console;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_submit_import.constants.ScanFilenameConstants;
import org.yeastrc.limelight.limelight_submit_import.constants.UploadFileSubDirConstants;
import org.yeastrc.limelight.limelight_submit_import.get_submitter_key.GetSubmitterKey;
import org.yeastrc.limelight.limelight_submit_import_client_connector.call_submit_import_parameter_objects.Call_SubmitImport_UploadFile_Service_Parameters;
import org.yeastrc.limelight.limelight_submit_import_client_connector.constants.Limelight_SubmitImport_Version_Constants;
import org.yeastrc.limelight.limelight_submit_import_client_connector.enum_classes.LimelightSubmit_FileImportFileType;
import org.yeastrc.limelight.limelight_submit_import_client_connector.main.CallSubmitImportWebservice;
import org.yeastrc.limelight.limelight_submit_import_client_connector.main.CallSubmitImportWebserviceInitParameters;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_Request_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_Response_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_SingleFileItem;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Request_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Response_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_UploadFile_Request_Common;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_UploadFile_Response_PgmXML;


/**
 * 
 *
 */
public class SubmitUploadMain {

	private static final Logger log = LoggerFactory.getLogger( SubmitUploadMain.class );

	private static final SubmitUploadMain instance = new SubmitUploadMain();

	private SubmitUploadMain() { }
	public static SubmitUploadMain getInstance() { return instance; }

	
	private static final int PROGRAM_EXIT_CODE_NO_ERROR = 0;

	private static final int PROGRAM_EXIT_CODE_INVALID_SUBMITTER_VERSION = 1;
	
	private static final int PROGRAM_EXIT_CODE_INVALID_CONFIGURATION = 2;
	
	private static final int PROGRAM_EXIT_CODE_INVALID_INPUT = 3;
	
//	private static final int PROGRAM_EXIT_CODE_NO_PROJECTS_FOR_USER = 4;
	
	private static final int PROGRAM_EXIT_CODE_UPLOAD_SUBMIT_FAILED = 5;

	private static final int PROGRAM_EXIT_CODE_UPLOAD_SEND_FILE_FAILED = 6;
	
//	private static final int PROGRAM_EXIT_CODE_PROGRAM_PROBLEM = 99;


	private static final String FOR_HELP_STRING = "For help, run without any parameters, -h, or --help";

	/**
	 * 
	 *
	 */
	public static class SubmitResult {
		
		int exitCode = PROGRAM_EXIT_CODE_NO_ERROR;

		public int getExitCode() {
			return exitCode;
		}
		public void setExitCode(int exitCode) {
			this.exitCode = exitCode;
		}
	}
	
	/**
	 * @param submitterSameMachine
	 * @param baseURL
	 * @param baseURLWithServicesPath
	 * @param uploadBaseDir
	 * @param usernameFromCommandLine
	 * @param passwordFromCommandLine
	 * @param usernamePasswordFileCommandLine
	 * @param projectId
	 * @param projectIdString
	 * @param limelightXMLFile
	 * @param scanFiles
	 * @param searchName
	 * @param searchPath
	 * @param noSearchNameCommandLineOptChosen
	 * @param noScanFilesCommandLineOptChosen
	 * @return
	 * @throws Exception
	 * @throws IOException
	 * @throws JsonProcessingException
	 */
	public SubmitResult submitUpload(
			
			boolean submitterSameMachine,
			String baseURL, 
			File uploadBaseDir,
			
			String userSubmitImportProgramKeyFromCommandLine,
			
			int projectId,
			String projectIdString, 
			File limelightXMLFile, 

			List<File> scanFiles,
			
			String searchName,
			String searchPath,
			Boolean noSearchNameCommandLineOptChosen,
			
			
			Boolean noScanFilesCommandLineOptChosen
			
			) throws Exception,
			IOException {
		
		
		
		SubmitResult submitResult = new SubmitResult();
		

		String userSubmitImportProgramKey = userSubmitImportProgramKeyFromCommandLine;
		
		CallSubmitImportWebserviceInitParameters callSubmitImportWebserviceInitParameters = new CallSubmitImportWebserviceInitParameters();
		callSubmitImportWebserviceInitParameters.setWebappServerBaseURL( baseURL );
		
		CallSubmitImportWebservice callSubmitImportWebservice = CallSubmitImportWebservice.getInstance();
		
		callSubmitImportWebservice.init( callSubmitImportWebserviceInitParameters );
		
		
		String submitImport_UploadKey = null;

//		try {


			Console systemConsole = System.console();

			if ( systemConsole == null ) {
				if ( StringUtils.isEmpty( userSubmitImportProgramKeyFromCommandLine ) ) {
					System.out.println( "The environment this program is running in does not support reading passwords securely from user input" );
					System.out.println( "All data entered will be echoed to the screen.");
				}
			}

			//  Create a Java Console abstraction object that handles when the Java Console cannot be created (like running in an IDE)
//			JavaConsoleAbstraction javaConsoleAbstraction = JavaConsoleAbstractionFactory.defaultConsoleIO();


			System.out.println( "Connecting to Limelight web app using URL: " + baseURL );

			//  Get info on if scan files are allowed

			//  TODO  IMPLEMENT
//			ScanFilesAllowedResult scanFilesAllowedResult =
//					AreScanFileUploadsAllowedGet.getInstance().areScanFileUploadsAllowedGet( baseURLWithServicesPath, httpclient );
//
//			if ( ! scanFilesAllowedResult.isScanFilesAllowed() ) {
//				if ( scanFiles != null && ( ! scanFiles.isEmpty() ) ) {
//					
//					System.err.println( "Import of scan files to this installation of Limelight is denied." );
//					submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
//					return submitResult;  //  EARLY EXIT
//				}
//			} else {
//				// Scan files allowed
//
//				if ( ( ! noScanFilesCommandLineOptChosen ) && ( scanFiles == null || scanFiles.isEmpty() ) ) {
//
//					System.err.println( "Must specify no scan files if there are no scan files." );
//					submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
//					return submitResult;  //  EARLY EXIT
//				}
//				if ( noScanFilesCommandLineOptChosen && ( scanFiles != null && ( ! scanFiles.isEmpty() ) ) ) {
//
//					System.err.println( "cannot specify a scan file and no scan files at the same time." );
//					submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
//					return submitResult;  //  EARLY EXIT
//				}
//			}

			if ( scanFiles != null && ( ! scanFiles.isEmpty() ) ) {
				
				//  Validate Scan Files:
				
				//    valid suffix
				
				//    Not duplicate filenames
				//    Not duplicate filenames when check without filename suffix
				
				Set<String> scanFilenames = new HashSet<>();
				Set<String> scanFilenames_NoSuffixes = new HashSet<>();

				for ( File scanFile : scanFiles ) {
					
					String scanFilename = scanFile.getName();

					String errorStringScanSuffixValidation = validateScanFileSuffix( scanFilename );

					if ( errorStringScanSuffixValidation != null ) {

						System.err.println( "" );
						System.err.println( errorStringScanSuffixValidation );
						System.err.println( "" );
						System.err.println( FOR_HELP_STRING );
						submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
						return submitResult;  //  EARLY EXIT
					}
					
					if ( ! scanFilenames.add( scanFilename ) ) {
						System.err.println( "" );
						System.err.println( "Duplicate Scan file submitted: " + scanFilename );
						System.err.println( "" );
						System.err.println( FOR_HELP_STRING );
						submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
						return submitResult;  //  EARLY EXIT
					}				
					
					String filename_NoSuffix = FilenameUtils.removeExtension( scanFilename );
					if ( ! scanFilenames_NoSuffixes.add( filename_NoSuffix ) ) {
						System.err.println( "" );
						System.err.println( "Duplicate Scan file (With suffix removed) submitted: " 
								+ filename_NoSuffix
								+ ",  scan filename: "
								+ scanFilename );
						System.err.println( "" );
						System.err.println( FOR_HELP_STRING );
						submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
						return submitResult;  //  EARLY EXIT
					}			
				}
			}

//			if ( StringUtils.isEmpty( username ) ) {
//
//				javaConsoleAbstraction.writer().write( "username: " );
//				javaConsoleAbstraction.writer().flush();
//				username = javaConsoleAbstraction.readLine();
//				if ( StringUtils.isEmpty( username ) ) {
//					System.out.println( "username and password are required." );
//					submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
//					return submitResult;  //  EARLY EXIT
//				}
//			}
//			if ( StringUtils.isEmpty( password ) ) {
//				javaConsoleAbstraction.writer().write( "password: " );
//				javaConsoleAbstraction.writer().flush();
//				password = new String( javaConsoleAbstraction.readPassword() );
//				if ( StringUtils.isEmpty( password ) ) {
//					System.out.println( "username and password are required." );
//					submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
//					return submitResult;  //  EARLY EXIT
//				}
//			}

			//  Throws LimelightSubImportUserDataException on failed login
//			LoginPost.getInstance().loginPost( username, password, baseURLWithServicesPath, httpclient );


			///////////////

			/////  Project Id for import


			//  Project List

//			ProjectListForCurrentUserServiceResult projectListForCurrentUserServiceResult =
//					ListProjectsGet.getInstance().listProjectsGet( baseURLWithServicesPath, httpclient );
//
//			if ( projectListForCurrentUserServiceResult.getProjectList().isEmpty() ) {
//
//				System.out.println( "There are no projects available for upload.  See Help (-h) for more info.");
//
//				submitResult.exitCode = PROGRAM_EXIT_CODE_NO_PROJECTS_FOR_USER;
//				
//				return submitResult;  //  EARLY EXIT
//			}
//
//
//			if ( projectIdString != null ) {
//
//				// Validate project id on command line, exit if not valid
//
//				boolean validProjectIdEntered = false;
//
//				for ( ProjectListForCurrentUserServiceResultItem projectItem : projectListForCurrentUserServiceResult.getProjectList() ) {
//
//					if ( projectItem.getId() == projectId ) {
//
//						validProjectIdEntered = true;
//						break;
//					}
//				}
//
//				if ( ! validProjectIdEntered ) {
//
//					System.out.println();
//					System.out.println( "The project id entered is not valid." );
//
//					submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
//					
//					return submitResult;  //  EARLY EXIT
//				}
//
//			}
//
//
//
//			boolean validProjectIdEntered = false;
//
//			while ( ! validProjectIdEntered ) {
//
//				if ( projectIdString != null ) {
//
//					for ( ProjectListForCurrentUserServiceResultItem projectItem : projectListForCurrentUserServiceResult.getProjectList() ) {
//
//						if ( projectItem.getId() == projectId ) {
//
//							validProjectIdEntered = true;
//							break;
//						}
//					}
//
//					if ( ! validProjectIdEntered ) {
//
//						System.out.println();
//						System.out.println( "The project id entered is not valid." );
//					}
//
//				}
//
//				if ( ! validProjectIdEntered ) {
//
//					System.out.println( "Choose one of the following projects to upload to.  Enter the project id in () before the project title" );
//
//					for ( ProjectListForCurrentUserServiceResultItem projectItem : projectListForCurrentUserServiceResult.getProjectList() ) {
//
//						System.out.print( "(" + projectItem.getId() + ") ");
//						System.out.println( projectItem.getTitle() );
//					}
//
//					javaConsoleAbstraction.writer().write( "project id: " );
//
//					javaConsoleAbstraction.writer().flush();
//
//					projectIdString = javaConsoleAbstraction.readLine();
//
//					if ( StringUtils.isEmpty( projectIdString ) ) {
//
//						System.out.println( "a project id required." );
//
//						submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
//						
//						return submitResult;  //  EARLY EXIT
//					}
//
//					try {
//						projectId = Integer.parseInt( projectIdString );
//
//					} catch ( Exception e ) {
//
//						System.err.println( "Project id on command line must be an integer. Value entered: " + projectIdString );
//
//						submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
//						
//						return submitResult;  //  EARLY EXIT
//					}
//				}
//
//			}
//
//
//			if ( StringUtils.isEmpty( searchName ) && ( ! noSearchNameCommandLineOptChosen ) ) {
//
//				javaConsoleAbstraction.writer().write( "Brief description of the search (optional, press enter if no value): " );
//
//				javaConsoleAbstraction.writer().flush();
//
//				searchName = javaConsoleAbstraction.readLine();
//
//				if ( StringUtils.isEmpty( searchName ) ) {
//
//					searchName = null;
//				}
//			}

			SubmitImport_Init_Request_PgmXML submitImport_Init_Request = new SubmitImport_Init_Request_PgmXML();
			
			submitImport_Init_Request.setSubmitProgramVersionNumber( Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__CURRENT__VERSION_NUMBER );
			submitImport_Init_Request.setProjectIdentifier( projectIdString );
			submitImport_Init_Request.setSubmitterSameMachine( true );
			submitImport_Init_Request.setUserSubmitImportProgramKey( userSubmitImportProgramKey );
			
			SubmitImport_Init_Response_PgmXML submitImport_Init_Response = 
					callSubmitImportWebservice.call_SubmitImport_Init_Webservice( submitImport_Init_Request );

			if ( ! submitImport_Init_Response.isStatusSuccess() ) {

				System.err.println( "" );
				System.err.println( "********************************************************" );
				System.err.println( "" );
				System.err.println( "Submit import Failed." );

				if ( submitImport_Init_Response.isSubmitProgramVersionNumber_NotAccepted() ) {

					reportSubmitterVersionErrorToUser( submitImport_Init_Response.getSubmitProgramVersionNumber_Current_Per_Webapp() );
					submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_SUBMITTER_VERSION;
					return submitResult;    //  EARLY EXIT
				}
				
				if ( submitImport_Init_Response.isProjectIdNotFound() ) {
					
					System.err.println( "Unable to upload to this project as it is Not Found." );
					submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
					return submitResult;    //  EARLY EXIT
				}
				if ( submitImport_Init_Response.isProjectLocked() ) {
					
					System.err.println( "Unable to upload to this project as it is Locked." );
					submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
					return submitResult;    //  EARLY EXIT
				}
				if ( submitImport_Init_Response.isProjectMarkedForDeletion() ) {
					
					System.err.println( "Unable to upload to this project as it is Deleted." );
					submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
					return submitResult;    //  EARLY EXIT
				}
				if ( submitImport_Init_Response.isProjectNotEnabled() ) {
					
					System.err.println( "Unable to upload to this project as it is Not Enabled." );
					submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
					return submitResult;    //  EARLY EXIT
				}
				if ( submitImport_Init_Response.isUserSubmitImportProgramKeyNotFound() ) {
					
					System.err.println( "Value for '--user-submit-import-key' is not found." );
					submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
					return submitResult;    //  EARLY EXIT
				}

				if ( submitImport_Init_Response.isUserNotAuthorizedForProject() ) {
					
					System.err.println( "User is not Authorized as a Project Owner for this project." );
					submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
					return submitResult;    //  EARLY EXIT
				}

				System.err.println( "Upload failed at init.  Please try again." );

				System.err.println( "If this error continues, contact the administrator of your Limelight Instance." );
				
				submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
				
				return submitResult;    //  EARLY EXIT
			}

			if ( log.isDebugEnabled() ) {
				System.out.println( "submitImport_Init_Response: UploadKey: " + submitImport_Init_Response.getUploadKey() );

				System.out.println( "submitImport_Init_Response: UploadTempSubdir: " + submitImport_Init_Response.getUploadTempSubdir() );
			}
			
			submitImport_UploadKey = submitImport_Init_Response.getUploadKey();
			
			String submitterKey = null;

			if ( submitterSameMachine ) {

				File uploadTmpBaseDir = new File( uploadBaseDir, UploadFileSubDirConstants.UPLOAD_FILE_TEMP_BASE_DIR );


				if ( ! uploadTmpBaseDir.exists() ) {

					System.err.println( "Configuration Error or System Error:  "
							+ "Temp Upload Base Directory does not exist: " + uploadTmpBaseDir.getCanonicalPath() );


					submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_CONFIGURATION;
					
					return submitResult;    //  EARLY EXIT
				}

				submitterKey = 
						GetSubmitterKey.getInstance().getSubmitterKey( submitImport_Init_Response.getUploadTempSubdir(), uploadTmpBaseDir );

//				System.out.println( "submitterKey:" + submitterKey );
			}


			//////////

			//   Build Submit objects and upload files to server if not running this pgm on server



			SubmitImport_FinalSubmit_Request_PgmXML finalSubmit_Request = new SubmitImport_FinalSubmit_Request_PgmXML();
			
			finalSubmit_Request.setSubmitProgramVersionNumber( Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__CURRENT__VERSION_NUMBER );

			finalSubmit_Request.setProjectIdentifier( projectIdString );
			finalSubmit_Request.setUserSubmitImportProgramKey( userSubmitImportProgramKey );
			finalSubmit_Request.setSearchName( searchName ); // optional
			finalSubmit_Request.setSearchPath( searchPath ); // optional
			finalSubmit_Request.setUploadKey( submitImport_UploadKey );

			if ( submitterSameMachine ) {
				finalSubmit_Request.setSubmitterSameMachine( true );
				finalSubmit_Request.setSubmitterKey( submitterKey );
			}

			List<SubmitImport_FinalSubmit_SingleFileItem> fileItems = new ArrayList<>();
			finalSubmit_Request.setFileItems( fileItems );



			int fileIndex = 1;

			{
				//  Process Limelight XML file

				SubmitImport_FinalSubmit_SingleFileItem submitImport_FinalSubmit_SingleFileItem = new SubmitImport_FinalSubmit_SingleFileItem();
				fileItems.add( submitImport_FinalSubmit_SingleFileItem );

				submitImport_FinalSubmit_SingleFileItem.setFileIndex( fileIndex );
				submitImport_FinalSubmit_SingleFileItem.setFileType( LimelightSubmit_FileImportFileType.LIMELIGHT_XML_FILE.value() );
				submitImport_FinalSubmit_SingleFileItem.setIsLimelightXMLFile( true );
				submitImport_FinalSubmit_SingleFileItem.setUploadedFilename( limelightXMLFile.getName() );

				if ( submitterSameMachine ) {

					submitImport_FinalSubmit_SingleFileItem.setFilenameOnDiskWithPathSubSameMachine( limelightXMLFile.getCanonicalPath() );
				}

				if ( ! submitterSameMachine ) {

					SubmitImport_UploadFile_Request_Common webserviceRequest = new SubmitImport_UploadFile_Request_Common();

					webserviceRequest.setProjectIdentifier( projectIdString );
					webserviceRequest.setUserSubmitImportProgramKey( userSubmitImportProgramKey );
					webserviceRequest.setUploadKey( submitImport_UploadKey );
					webserviceRequest.setFileIndex( submitImport_FinalSubmit_SingleFileItem.getFileIndex() );
					webserviceRequest.setFileType( submitImport_FinalSubmit_SingleFileItem.getFileType() );
					webserviceRequest.setFilename( limelightXMLFile.getName() );
					webserviceRequest.setAbsoluteFilename_W_Path_OnSubmitMachine( limelightXMLFile.getAbsolutePath() );
					webserviceRequest.setCanonicalFilename_W_Path_OnSubmitMachine( limelightXMLFile.getCanonicalPath() );
					
					Call_SubmitImport_UploadFile_Service_Parameters parameters = new Call_SubmitImport_UploadFile_Service_Parameters();
					parameters.setUploadFile( limelightXMLFile );
					parameters.setWebserviceRequest( webserviceRequest );
					
					//  Make call to server
					SubmitImport_UploadFile_Response_PgmXML submitImport_UploadFile_Response =
							callSubmitImportWebservice.call_SubmitImport_UploadFile_Service( parameters );
					
					if ( ! submitImport_UploadFile_Response.isStatusSuccess() ) {
						
						System.err.println( "FAILED sending Limelight XML file to server: " + limelightXMLFile.getCanonicalPath() );

						System.err.println( "If this error continues, contact the administrator of your Limelight Instance." );
						
						submitResult.exitCode = PROGRAM_EXIT_CODE_UPLOAD_SEND_FILE_FAILED;
						
						return submitResult;    //  EARLY EXIT
						
					}
					
					
					System.out.println( "Sent Limelight XML file to server: " + limelightXMLFile.getCanonicalPath() );
				}
			}


			//	Process scanFiles

			if ( scanFiles != null ) {

				for ( File scanFile : scanFiles ) {

					fileIndex++;

					SubmitImport_FinalSubmit_SingleFileItem submitImport_FinalSubmit_SingleFileItem = new SubmitImport_FinalSubmit_SingleFileItem();
					fileItems.add( submitImport_FinalSubmit_SingleFileItem );

					submitImport_FinalSubmit_SingleFileItem.setFileIndex( fileIndex );
					submitImport_FinalSubmit_SingleFileItem.setFileType( LimelightSubmit_FileImportFileType.SCAN_FILE.value() );
					submitImport_FinalSubmit_SingleFileItem.setIsLimelightXMLFile( false );
					submitImport_FinalSubmit_SingleFileItem.setUploadedFilename( scanFile.getName() );

					if ( submitterSameMachine ) {

						submitImport_FinalSubmit_SingleFileItem.setFilenameOnDiskWithPathSubSameMachine( scanFile.getCanonicalPath() );
					}

					if ( ! submitterSameMachine ) {

						SubmitImport_UploadFile_Request_Common webserviceRequest = new SubmitImport_UploadFile_Request_Common();

						webserviceRequest.setProjectIdentifier( projectIdString );
						webserviceRequest.setUserSubmitImportProgramKey( userSubmitImportProgramKey );
						webserviceRequest.setUploadKey( submitImport_UploadKey );
						webserviceRequest.setFileIndex( submitImport_FinalSubmit_SingleFileItem.getFileIndex() );
						webserviceRequest.setFileType( submitImport_FinalSubmit_SingleFileItem.getFileType() );
						webserviceRequest.setFilename( scanFile.getName() );
						webserviceRequest.setAbsoluteFilename_W_Path_OnSubmitMachine( scanFile.getAbsolutePath() );
						webserviceRequest.setCanonicalFilename_W_Path_OnSubmitMachine( scanFile.getCanonicalPath() );
						
						Call_SubmitImport_UploadFile_Service_Parameters parameters = new Call_SubmitImport_UploadFile_Service_Parameters();
						parameters.setUploadFile( scanFile );
						parameters.setWebserviceRequest( webserviceRequest );
						
						//  Make call to server
						SubmitImport_UploadFile_Response_PgmXML submitImport_UploadFile_Response =
								callSubmitImportWebservice.call_SubmitImport_UploadFile_Service( parameters );
						
						if ( ! submitImport_UploadFile_Response.isStatusSuccess() ) {
							
							System.err.println( "FAILED sending Scan file to server: " + scanFile.getCanonicalPath() );

							System.err.println( "If this error continues, contact the administrator of your Limelight Instance." );
							
							submitResult.exitCode = PROGRAM_EXIT_CODE_UPLOAD_SEND_FILE_FAILED;
							
							return submitResult;    //  EARLY EXIT
							
						}
						
						System.out.println( "Sent Scan file to server: " + scanFile.getCanonicalPath() );
					}
				}
			}

			// Submit the upload:  send the XML submit 

			SubmitImport_FinalSubmit_Response_PgmXML finalSubmit_Response =
					callSubmitImportWebservice.call_SubmitImport_FinalSubmit_Webservice( finalSubmit_Request );
					
			if ( ! finalSubmit_Response.isStatusSuccess() ) {

				System.err.println( "Upload Submit Failed" );

				if ( finalSubmit_Response.isSubmitProgramVersionNumber_NotAccepted() ) {

					reportSubmitterVersionErrorToUser( submitImport_Init_Response.getSubmitProgramVersionNumber_Current_Per_Webapp() );
					submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_SUBMITTER_VERSION;
					return submitResult;    //  EARLY EXIT
				}
				
				submitResult.exitCode = PROGRAM_EXIT_CODE_UPLOAD_SUBMIT_FAILED;
				
				return submitResult;  //  EARLY EXIT
			}

//			if ( submitterSameMachine ) {
//
////				System.out.println( "ImporterSubDir: (Null if not submit from same machine) " + uploadSubmitResult.getImporterSubDir() );
//
//				File importBaseDir = new File( uploadBaseDir, UploadFileSubDirConstants.IMPORT_BASE_DIR );
//
//
//				File importSubDir = new File( importBaseDir, uploadSubmitResult.getImporterSubDir() );
//
////				System.out.println( "Importer Sub Dir full path: " + importSubDir.getCanonicalPath() );
//
//				if ( ! importSubDir.exists() ) {
//
////					System.out.println( "Importer Sub Dir full path does NOT EXIST: " + importSubDir.getCanonicalPath() );
//				}
//				
//				String writeLimelightUploadDirFilename = ConfigParams.getInstance().getWriteLimelightUploadDirFilename();
//				
//				if ( StringUtils.isNotEmpty( writeLimelightUploadDirFilename ) ) {
//					
//					BufferedWriter writer = null;
//					
//					try {
//						
//						writer = new BufferedWriter( new FileWriter( writeLimelightUploadDirFilename ) );
//						
//						writer.write( "Importer Directory:");
//						writer.newLine();
//						writer.write( importSubDir.getCanonicalPath() );
//						writer.newLine();
//						
//					} catch ( Exception e ) {
//						
//						System.err.println( "Failed to write file '" + writeLimelightUploadDirFilename 
//								+ "' containing the import directory.");
//						e.printStackTrace();
//						throw e;
//						
//					} finally {
//						
//						if ( writer != null ) {
//							
//							writer.close();
//						}
//					}
//				}
//
//			}
//
////			System.out.println( "Submitted Upload");
//			
//			
			System.out.println( "");
			System.out.println( "******************************************");
			System.out.println( "");
			System.out.println( "Submission Successful");
			System.out.println( "");
//
//			
//		} catch ( LimelightSubImportUsernamePasswordFileException e ) {
//
//			// Already reported so do not report
//			
//			throw e;
//			
//		} catch ( LimelightSubImportReportedErrorException e ) {
//
//			// Already reported so do not report
//			
//			throw e;
//		
//		} catch ( LimelightSubImportUserDataException e ) {
//			
//			// Already reported so do not report
//
//			throw e;
//			
//		} catch ( LimelightSubImportConfigException e ) {
//			
//			// Already reported so do not report
//
//			throw e;
//			
//		} catch ( LimelightSubImportServerResponseException e ) {
//			
//			// Already reported so do not report
//			
//			throw e;
//			
//		} catch (Exception e) {
//
//			log.error("Failed.", e );
//			throw e;
//
//		}
//
//			SubmitResult submitResult = new SubmitResult();
			
			return submitResult;
	}
	

	
	/**
	 * validateScanFileSuffix
	 * 
	 * @param inputScanFileString
	 * @return null if no error, otherwise return the error message
	 */
	private static String validateScanFileSuffix( String inputScanFileString ) {
		
		String errorString = null;

		if ( ! ( inputScanFileString.endsWith( ScanFilenameConstants.MZ_ML_SUFFIX ) 
				|| inputScanFileString.endsWith( ScanFilenameConstants.MZ_XML_SUFFIX ) ) ) {

			errorString =  "Scan file name must end with '"
					+ ScanFilenameConstants.MZ_ML_SUFFIX 
					+ "' or '"
					+ ScanFilenameConstants.MZ_XML_SUFFIX
					+ "' and have the correct contents to match the filename suffix.";
		}
		
		return errorString;
	}


	/**
	 * validateScanFileSuffix
	 * 
	 * @param inputScanFileString
	 * @return null if no error, otherwise return the error message
	 */
	private static void reportSubmitterVersionErrorToUser( Integer submitProgramVersionNumber_Current_Per_Webapp ) {
		
		System.err.println();
		System.err.println( "The Limelight Submit Program is out of date.  This version is no longer supported." );
		System.err.println();
		System.err.println( "Please visit the Limelight Web application to download the latest Limelight Submit program." );
		System.err.println();
	}
	
}
