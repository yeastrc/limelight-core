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
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_submit_import.auth_test.AuthTest_Perform_ConnectToServer__Single_Connect_Send_GetResponse;
import org.yeastrc.limelight.limelight_submit_import.constants.ScanFilenameConstants;
import org.yeastrc.limelight.limelight_submit_import.constants.UploadFileSubDirConstants;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportConfigException;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportReportedErrorException;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportServerResponseException;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportUserDataException;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportUsernamePasswordFileException;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubmitImportProgram_SHA256_Hash_NotMatch_Exception;
import org.yeastrc.limelight.limelight_submit_import.get_submitter_key.GetSubmitterKey;
import org.yeastrc.limelight.limelight_submit_import.objects.SearchTagCategory_AndItsSearchTagStrings_Object;
import org.yeastrc.limelight.limelight_submit_import_client_connector.call_submit_import_parameter_objects.Call_SubmitImport_UploadFile_Service_Parameters;
import org.yeastrc.limelight.limelight_submit_import_client_connector.constants.Limelight_SubmitImport_Version_Constants;
import org.yeastrc.limelight.limelight_submit_import_client_connector.enum_classes.LimelightSubmit_FileImportFileType;
import org.yeastrc.limelight.limelight_submit_import_client_connector.exceptions.LimelightSubmitImportWebserviceCallErrorException;
import org.yeastrc.limelight.limelight_submit_import_client_connector.main.CallSubmitImportWebservice;
import org.yeastrc.limelight.limelight_submit_import_client_connector.main.CallSubmitImportWebserviceInitParameters;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_Request_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_Request_SubPart_SearchTagCategoryAndItsSearchTagsEntry;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_Response_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_SingleFileItem;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Get_FASTAFileUploadAccepted_Request_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Get_FASTAFileUploadAccepted_Response_PgmXML;
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

	public static final int PROGRAM_EXIT_CODE_INVALID_SUBMITTER_VERSION = 1;

	private static final int PROGRAM_EXIT_CODE_INVALID_CONFIGURATION = 2;

	public static final int PROGRAM_EXIT_CODE_INVALID_INPUT = 3;

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
	 * @param uploadBaseDir
	 * @param userSubmitImportProgramKeyFromCommandLine
	 * @param projectId
	 * @param projectIdString
	 * @param retryCountLimit
	 * @param limelightXMLFile
	 * @param fastaFile
	 * @param fastaFile_SendOnlyIfPossible
	 * @param scanFiles
	 * @param genericOtherFiles
	 * @param searchName
	 * @param searchShortName
	 * @param searchPath
	 * @param noSearchNameCommandLineOptChosen
	 * @param noScanFilesCommandLineOptChosen
	 * @param searchTagList
	 * @param searchTagCategory_AndItsSearchTagStrings_Object_List
	 * @return
	 * @throws Exception
	 * @throws IOException
	 */
	public SubmitResult submitUpload(

			boolean submitterSameMachine,
			String baseURL, 
			File uploadBaseDir,

			String userSubmitImportProgramKeyFromCommandLine,

			int projectId,
			String projectIdString, 

			int retryCountLimit,

			File limelightXMLFile, 
			File fastaFile,
			Boolean fastaFile_SendOnlyIfPossible,

			List<File> scanFiles,
			List<File> genericOtherFiles,

			String searchName,
			String searchShortName,
			String searchPath,
			Boolean noSearchNameCommandLineOptChosen,

			Boolean noScanFilesCommandLineOptChosen,
			
			List<String> searchTagList,  //  that do NOT have Categories
			
			List<SearchTagCategory_AndItsSearchTagStrings_Object> searchTagCategory_AndItsSearchTagStrings_Object_List

			) throws Exception,
	IOException {

		SubmitResult submitResult = new SubmitResult();


		String userSubmitImportProgramKey = userSubmitImportProgramKeyFromCommandLine;

		CallSubmitImportWebserviceInitParameters callSubmitImportWebserviceInitParameters = new CallSubmitImportWebserviceInitParameters();
		
		callSubmitImportWebserviceInitParameters.setWebappServerBaseURL( baseURL );

		CallSubmitImportWebservice callSubmitImportWebservice = CallSubmitImportWebservice.getInstance();

		callSubmitImportWebservice.init( callSubmitImportWebserviceInitParameters );

		String submitImport_UploadKey = null;

		boolean processingCompleteSuccessful = false;

		int retryCount = -1;

		while ( ! processingCompleteSuccessful ) {

			retryCount++;

			try {

				Console systemConsole = System.console();

				if ( systemConsole == null ) {
					if ( StringUtils.isEmpty( userSubmitImportProgramKeyFromCommandLine ) ) {
						System.out.println( "The environment this program is running in does not support reading passwords securely from user input" );
						System.out.println( "All data entered will be echoed to the screen.");
					}
				}

				System.out.println( "Connecting to Limelight web app using URL: " + baseURL );
				
				//  Do Auth Check

				SubmitResult submitResult_AuthCheck = 
						AuthTest_Perform_ConnectToServer__Single_Connect_Send_GetResponse.getInstance().authTest_Perform_ConnectToServer(
									baseURL, userSubmitImportProgramKeyFromCommandLine, projectIdString,
									"Submit Import: " );
				
				if ( submitResult_AuthCheck.exitCode != PROGRAM_EXIT_CODE_NO_ERROR ) {
					
					submitResult.exitCode = submitResult.exitCode;
					
					return submitResult;  // EARLY RETURN
				}
				
				/////
								
				boolean sendFastaFile_LOCAL = false;
				
				if ( fastaFile != null ) {
					
					//  Have fasta file so find out if can send it
					
					SubmitImport_Get_FASTAFileUploadAccepted_Request_PgmXML webserviceRequest = new SubmitImport_Get_FASTAFileUploadAccepted_Request_PgmXML();

					webserviceRequest.setSubmitProgramVersionNumber( Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__CURRENT__VERSION_NUMBER );
					webserviceRequest.setProjectIdentifier( projectIdString );
					webserviceRequest.setUserSubmitImportProgramKey( userSubmitImportProgramKey );
					
					SubmitImport_Get_FASTAFileUploadAccepted_Response_PgmXML webserviceResponse =
							callSubmitImportWebservice.call_SubmitImport_Get_FASTAFileUploadAccepted_Webservice(webserviceRequest);

					if ( ! webserviceResponse.isStatusSuccess() ) {

						System.err.println( "" );
						System.err.println( "********************************************************" );
						System.err.println( "" );
						System.err.println( "Submit import Failed." );

						if ( StringUtils.isNotBlank( webserviceResponse.getStatusFail_ErrorMessage() ) ) {

							System.err.println( webserviceResponse.getStatusFail_ErrorMessage() );
							submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;
							return submitResult;    //  EARLY EXIT
						}

						System.err.println( "Upload failed at Get FASTA File Upload Accepted.  Please try again." );

						System.err.println( "If this error continues, contact the administrator of your Limelight Instance." );

						submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;

						return submitResult;    //  EARLY EXIT
					}

					if ( webserviceResponse.isFastaFileSubmit_Configured() ) {

						sendFastaFile_LOCAL = true;

					} else {

						if  ( fastaFile_SendOnlyIfPossible == null || ( ! fastaFile_SendOnlyIfPossible.booleanValue() ) ) {
							
							System.err.println( "" );
							System.err.println( "********************************************************" );
							System.err.println( "" );
							System.err.println( "Submit import Failed." );
							System.err.println( "" );

							System.err.println( "--fasta-file=<FASTA File> is specified and --fasta-file-send-only-if-possible is NOT specified and Limelight is NOT configured to accept FASTA file." );

							System.err.println( "If this error continues, contact the administrator of your Limelight Instance." );

							submitResult.exitCode = PROGRAM_EXIT_CODE_INVALID_INPUT;

							return submitResult;    //  EARLY EXIT
						}
					}
				}
				
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

					if ( StringUtils.isNotBlank( submitImport_Init_Response.getStatusFail_ErrorMessage() ) ) {

						System.err.println( submitImport_Init_Response.getStatusFail_ErrorMessage() );
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

				if ( scanFiles != null && ( ! scanFiles.isEmpty() ) ) {

					//  Validate Scan Files:

					//    valid suffix

					//    Not duplicate filenames
					//    Not duplicate filenames when check without filename suffix

					Set<String> scanFilenames = new HashSet<>();
					Set<String> scanFilenames_NoSuffixes = new HashSet<>();

					for ( File scanFile : scanFiles ) {

						String scanFilename = scanFile.getName();

						String errorStringScanSuffixValidation = validateScanFileSuffix( scanFilename, submitImport_Init_Response );

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


				List<SubmitImport_FinalSubmit_Request_SubPart_SearchTagCategoryAndItsSearchTagsEntry> searchTagCategoryAndItsSearchTagsList = new ArrayList<>( searchTagCategory_AndItsSearchTagStrings_Object_List.size() );

				for ( SearchTagCategory_AndItsSearchTagStrings_Object searchTagCategory_AndItsSearchTagStrings_Object : searchTagCategory_AndItsSearchTagStrings_Object_List ) {
					
					SubmitImport_FinalSubmit_Request_SubPart_SearchTagCategoryAndItsSearchTagsEntry searchTagCategoryAndItsSearchTags = new SubmitImport_FinalSubmit_Request_SubPart_SearchTagCategoryAndItsSearchTagsEntry();
					
					searchTagCategoryAndItsSearchTags.setSearchTagCategoryLabel( searchTagCategory_AndItsSearchTagStrings_Object.getCategoryLabel() );
					searchTagCategoryAndItsSearchTags.setSearchTagList( searchTagCategory_AndItsSearchTagStrings_Object.getSearchTagStrings() );
					
					searchTagCategoryAndItsSearchTagsList.add(searchTagCategoryAndItsSearchTags);
				}


				SubmitImport_FinalSubmit_Request_PgmXML finalSubmit_Request = new SubmitImport_FinalSubmit_Request_PgmXML();

				finalSubmit_Request.setSubmitProgramVersionNumber( Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__CURRENT__VERSION_NUMBER );

				finalSubmit_Request.setProjectIdentifier( projectIdString );
				finalSubmit_Request.setUserSubmitImportProgramKey( userSubmitImportProgramKey );
				finalSubmit_Request.setSearchName( searchName ); // optional
				finalSubmit_Request.setSearchShortName( searchShortName );
				finalSubmit_Request.setSearchPath( searchPath ); // optional
				finalSubmit_Request.setUploadKey( submitImport_UploadKey );
				
				finalSubmit_Request.setSearchTagList(searchTagList);
				finalSubmit_Request.setSearchTagCategoryAndItsSearchTagsList(searchTagCategoryAndItsSearchTagsList);

				if ( submitterSameMachine ) {
					finalSubmit_Request.setSubmitterSameMachine( true );
					finalSubmit_Request.setSubmitterKey( submitterKey );
				}

				List<SubmitImport_FinalSubmit_SingleFileItem> fileItems = new ArrayList<>();
				finalSubmit_Request.setFileItems( fileItems );



				int[] fileIndex = { 1 };  //  Running file-index holder, shared across all file types

				//  Each file type is uploaded in its own method, with that file passed as a parameter, so the
				//  code for one file type cannot reference another file type's File variable.  The single copy
				//  of the hash/send/error logic lives in uploadSingleFile_ToServer(...).
				//  Returns null = success; non-null = SubmitResult to propagate (original early-exit behavior).

				if ( limelightXMLFile != null ) {
					SubmitResult uploadResult = uploadFile_LimelightXML( limelightXMLFile, fileIndex, fileItems, submitterSameMachine, projectIdString, userSubmitImportProgramKey, submitImport_UploadKey, callSubmitImportWebservice, submitResult );
					if ( uploadResult != null ) { return uploadResult; }
				}

				if ( fastaFile != null && sendFastaFile_LOCAL ) {
					SubmitResult uploadResult = uploadFile_FASTA( fastaFile, fileIndex, fileItems, submitterSameMachine, projectIdString, userSubmitImportProgramKey, submitImport_UploadKey, callSubmitImportWebservice, submitResult );
					if ( uploadResult != null ) { return uploadResult; }
				}

				if ( scanFiles != null ) {
					SubmitResult uploadResult = uploadScanFiles( scanFiles, fileIndex, fileItems, submitterSameMachine, projectIdString, userSubmitImportProgramKey, submitImport_UploadKey, callSubmitImportWebservice, submitResult );
					if ( uploadResult != null ) { return uploadResult; }
				}

				if ( genericOtherFiles != null ) {
					SubmitResult uploadResult = uploadGenericOtherFiles( genericOtherFiles, fileIndex, fileItems, submitterSameMachine, projectIdString, userSubmitImportProgramKey, submitImport_UploadKey, callSubmitImportWebservice, submitResult );
					if ( uploadResult != null ) { return uploadResult; }
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
		
				System.out.println( "");
				System.out.println( "******************************************");
				System.out.println( "");
				System.out.println( "Submission Successful");
				System.out.println( "");

			} catch ( LimelightSubmitImportProgram_SHA256_Hash_NotMatch_Exception e ) {
				
				if ( retryCountLimit == 0 || retryCount > retryCountLimit ) {
					
					throw e;
				}
				
				//  Retry
				
				int retry_InSeconds = 5 * ( retryCount + 1 );

				System.out.println("Will Try Again to submit import in " + retry_InSeconds + " seconds." );
				
				int sleepTime = 1000 * retry_InSeconds;

				Thread.sleep(sleepTime);

				continue;  //  EARY CONTINUE
				
			} catch ( LimelightSubmitImportWebserviceCallErrorException e ) {
				
				if ( ( ( ! e.isConnectToServerError() ) && ( ! e.isHttpStatusCode_Is_404_NotFound() ) )
						|| retryCountLimit == 0 || retryCount > retryCountLimit ) {
					
					// ( NOT Connect Error AND NOT 404 Status Code ) OR ( retry limit is zero or retry limit exceeded ) 
					
					throw e;
				}
				
				//  Only continue if HTTP Status code is 404 
				
				//  Retry
				
				int retry_InSeconds = 5 * ( retryCount + 1 );

				System.out.println("Failed send data to server or get response. Will Try Again in " + retry_InSeconds + " seconds.  Error: " + e.toString() );
				
				int sleepTime = 1000 * retry_InSeconds;

				Thread.sleep(sleepTime);

				continue;  //  EARY CONTINUE
				

			} catch ( LimelightSubImportUsernamePasswordFileException e ) {

				// Already reported so do not report

				throw e;

			} catch ( LimelightSubImportReportedErrorException e ) {

				// Already reported so do not report

				throw e;

			} catch ( LimelightSubImportUserDataException e ) {

				// Already reported so do not report

				throw e;

			} catch ( LimelightSubImportConfigException e ) {

				// Already reported so do not report

				throw e;

			} catch ( LimelightSubImportServerResponseException e ) {

				// Already reported so do not report

				throw e;

			} catch (Exception e) {

				log.error("Failed.", e );
				throw e;

			}
			
			//  FYI:  in one of the 'catch' statements:  continue;  //  EARY CONTINUE
			

			processingCompleteSuccessful = true;

		}

		return submitResult;
	}


	/**
	 * Compute SHA256 hash for file
	 * 
	 * @param file
	 * @return
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 * @throws NoSuchAlgorithmException 
	 */
	//////////////////////////////////////////////////////////////////////////////////
	//
	//  Per-file-type upload methods.  Each takes ONLY its own file type as a parameter so the
	//  code for one file type cannot accidentally reference another file type's File variable
	//  (the bug fixed in commit "Fix Submit Import File Hash Compute").
	//
	//  'fileIndex' is a single running counter (int[1] holder) shared across all file types:
	//  Limelight XML = 1, then each subsequent uploaded file increments it.
	//
	//  Each returns null on success, or the populated SubmitResult (exit code set) to propagate
	//  on failure (the caller returns it = the original early-exit behavior).
	//

	private SubmitResult uploadFile_LimelightXML(
			File limelightXMLFile, int[] fileIndex,
			List<SubmitImport_FinalSubmit_SingleFileItem> fileItems, boolean submitterSameMachine,
			String projectIdString, String userSubmitImportProgramKey, String submitImport_UploadKey,
			CallSubmitImportWebservice callSubmitImportWebservice, SubmitResult submitResult ) throws Exception {

		//  Limelight XML file uses index 1 (no increment), matching the original numbering
		int thisFileIndex = fileIndex[ 0 ];

		return uploadSingleFile_ToServer(
				limelightXMLFile, thisFileIndex,
				LimelightSubmit_FileImportFileType.LIMELIGHT_XML_FILE.value(), true, "Limelight XML file",
				fileItems, submitterSameMachine, projectIdString, userSubmitImportProgramKey,
				submitImport_UploadKey, callSubmitImportWebservice, submitResult );
	}

	private SubmitResult uploadFile_FASTA(
			File fastaFile, int[] fileIndex,
			List<SubmitImport_FinalSubmit_SingleFileItem> fileItems, boolean submitterSameMachine,
			String projectIdString, String userSubmitImportProgramKey, String submitImport_UploadKey,
			CallSubmitImportWebservice callSubmitImportWebservice, SubmitResult submitResult ) throws Exception {

		int thisFileIndex = ++fileIndex[ 0 ];

		return uploadSingleFile_ToServer(
				fastaFile, thisFileIndex,
				LimelightSubmit_FileImportFileType.FASTA_FILE.value(), false, "FASTA file",
				fileItems, submitterSameMachine, projectIdString, userSubmitImportProgramKey,
				submitImport_UploadKey, callSubmitImportWebservice, submitResult );
	}

	private SubmitResult uploadScanFiles(
			List<File> scanFiles, int[] fileIndex,
			List<SubmitImport_FinalSubmit_SingleFileItem> fileItems, boolean submitterSameMachine,
			String projectIdString, String userSubmitImportProgramKey, String submitImport_UploadKey,
			CallSubmitImportWebservice callSubmitImportWebservice, SubmitResult submitResult ) throws Exception {

		for ( File scanFile : scanFiles ) {

			int thisFileIndex = ++fileIndex[ 0 ];

			SubmitResult uploadResult = uploadSingleFile_ToServer(
					scanFile, thisFileIndex,
					LimelightSubmit_FileImportFileType.SCAN_FILE.value(), false, "Scan file",
					fileItems, submitterSameMachine, projectIdString, userSubmitImportProgramKey,
					submitImport_UploadKey, callSubmitImportWebservice, submitResult );

			if ( uploadResult != null ) {
				return uploadResult;
			}
		}

		return null;
	}

	private SubmitResult uploadGenericOtherFiles(
			List<File> genericOtherFiles, int[] fileIndex,
			List<SubmitImport_FinalSubmit_SingleFileItem> fileItems, boolean submitterSameMachine,
			String projectIdString, String userSubmitImportProgramKey, String submitImport_UploadKey,
			CallSubmitImportWebservice callSubmitImportWebservice, SubmitResult submitResult ) throws Exception {

		for ( File genericOtherFile : genericOtherFiles ) {

			int thisFileIndex = ++fileIndex[ 0 ];

			SubmitResult uploadResult = uploadSingleFile_ToServer(
					genericOtherFile, thisFileIndex,
					LimelightSubmit_FileImportFileType.GENERIC_OTHER_FILE.value(), false, "Generic Other File",
					fileItems, submitterSameMachine, projectIdString, userSubmitImportProgramKey,
					submitImport_UploadKey, callSubmitImportWebservice, submitResult );

			if ( uploadResult != null ) {
				return uploadResult;
			}
		}

		return null;
	}

	/**
	 * Upload a single file to the server: build the submit file-item, and (when not same-machine)
	 * compute the SHA-256 hash, build the request, send it, and handle errors.
	 *
	 * The file is a parameter, so the code here cannot reference any other file type's File variable.
	 *
	 * @return null on success; the populated SubmitResult (exit code set) on failure to propagate.
	 */
	private SubmitResult uploadSingleFile_ToServer(
			File file, int fileIndex, int fileType, boolean isLimelightXMLFile, String fileTypeForDisplay,
			List<SubmitImport_FinalSubmit_SingleFileItem> fileItems, boolean submitterSameMachine,
			String projectIdString, String userSubmitImportProgramKey, String submitImport_UploadKey,
			CallSubmitImportWebservice callSubmitImportWebservice, SubmitResult submitResult ) throws Exception {

		SubmitImport_FinalSubmit_SingleFileItem submitImport_FinalSubmit_SingleFileItem = new SubmitImport_FinalSubmit_SingleFileItem();
		fileItems.add( submitImport_FinalSubmit_SingleFileItem );

		submitImport_FinalSubmit_SingleFileItem.setFileIndex( fileIndex );
		submitImport_FinalSubmit_SingleFileItem.setFileType( fileType );
		submitImport_FinalSubmit_SingleFileItem.setIsLimelightXMLFile( isLimelightXMLFile );
		submitImport_FinalSubmit_SingleFileItem.setUploadedFilename( file.getName() );

		if ( submitterSameMachine ) {

			submitImport_FinalSubmit_SingleFileItem.setFilenameOnDiskWithPathSubSameMachine( file.getCanonicalPath() );
		}

		if ( ! submitterSameMachine ) {

			String file_SHA256_Hash = compute_SHA256_Hash_ForFile( file );

			SubmitImport_UploadFile_Request_Common webserviceRequest = new SubmitImport_UploadFile_Request_Common();

			webserviceRequest.setSubmitProgram_Version( Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__CURRENT__VERSION_NUMBER );

			webserviceRequest.setProjectIdentifier( projectIdString );
			webserviceRequest.setUserSubmitImportProgramKey( userSubmitImportProgramKey );
			webserviceRequest.setUploadKey( submitImport_UploadKey );
			webserviceRequest.setFileIndex( submitImport_FinalSubmit_SingleFileItem.getFileIndex() );
			webserviceRequest.setFileType( submitImport_FinalSubmit_SingleFileItem.getFileType() );
			webserviceRequest.setFilename( file.getName() );

			webserviceRequest.setFileSHA256Hash( file_SHA256_Hash );

			webserviceRequest.setAbsoluteFilename_W_Path_OnSubmitMachine( file.getAbsolutePath() );
			webserviceRequest.setCanonicalFilename_W_Path_OnSubmitMachine( file.getCanonicalPath() );

			Call_SubmitImport_UploadFile_Service_Parameters parameters = new Call_SubmitImport_UploadFile_Service_Parameters();
			parameters.setUploadFile( file );
			parameters.setWebserviceRequest( webserviceRequest );

			//  Make call to server
			SubmitImport_UploadFile_Response_PgmXML submitImport_UploadFile_Response =
					callSubmitImportWebservice.call_SubmitImport_UploadFile_Service( parameters );

			if ( ! submitImport_UploadFile_Response.isStatusSuccess() ) {

				System.err.println( "FAILED sending " + fileTypeForDisplay + " to server: " + file.getCanonicalPath() );

				if ( submitImport_UploadFile_Response.isFileSizeLimitExceeded() ) {

					System.err.println( fileTypeForDisplay + " is too large.  Max file size is: " + submitImport_UploadFile_Response.getMaxSizeFormatted() );
				}

				if ( submitImport_UploadFile_Response.isUploadedFileSHA256HashNotMatchParamFileSHA256Hash() ) {

					System.err.println( "The file contents received by the server have a different hash than the hash computed by this program on the file." );

					throw new LimelightSubmitImportProgram_SHA256_Hash_NotMatch_Exception();
				}

				if ( submitImport_UploadFile_Response.getFastaFile_InvalidContents() != null && submitImport_UploadFile_Response.getFastaFile_InvalidContents().booleanValue() ) {

					System.err.println( "FASTA file is invalid.  It does not start with '>' or is not ASCII text." );
				}

				System.err.println( "If this error continues, contact the administrator of your Limelight Instance." );

				submitResult.exitCode = PROGRAM_EXIT_CODE_UPLOAD_SEND_FILE_FAILED;

				return submitResult;    //  FAILURE
			}

			System.out.println( "Sent " + fileTypeForDisplay + " to server: " + file.getCanonicalPath() );
		}

		return null;  //  success
	}


	private static String compute_SHA256_Hash_ForFile( File file ) throws FileNotFoundException, IOException, NoSuchAlgorithmException {
		
		final String SHA_256_ALGORITHM = "SHA-256";

		MessageDigest digest = MessageDigest.getInstance( SHA_256_ALGORITHM );

		try ( FileInputStream fis = new FileInputStream( file ) ) {
			byte[] buffer = new byte[8192]; // Use a buffer for efficient reading
			int bytesRead;
			while ((bytesRead = fis.read(buffer)) != -1) {
				digest.update(buffer, 0, bytesRead);
			}
		}

		byte[] hashBytes = digest.digest(); // Get the final hash as a byte array

		// Convert the byte array to a hexadecimal string representation
		StringBuilder file_SHA256_Hash_SB = new StringBuilder();
		for (byte b : hashBytes) {
			String hex = Integer.toHexString(0xff & b);
			if (hex.length() == 1) {
				file_SHA256_Hash_SB.append('0');
			}
			file_SHA256_Hash_SB.append(hex);
		}
		String file_SHA256_Hash = file_SHA256_Hash_SB.toString();

		return file_SHA256_Hash;
	}
	

	/**
	 * validateScanFileSuffix
	 * 
	 * @param inputScanFileString
	 * @return null if no error, otherwise return the error message
	 */
	private static String validateScanFileSuffix( String inputScanFileString, SubmitImport_Init_Response_PgmXML submitImport_Init_Response ) {

		String errorString = null;
		
		if ( submitImport_Init_Response.getAccepted_ScanFilename_Suffix_List() != null ) {

			boolean found_Suffix = false;
			
			for ( String scanFilename_Suffix : submitImport_Init_Response.getAccepted_ScanFilename_Suffix_List() ) {
				if ( inputScanFileString.endsWith( scanFilename_Suffix ) ) {
					found_Suffix = true;
					break;
				}
			}
			if ( ! found_Suffix ) {
				
				String accepted_ScanFilename_Suffix_CommaDelim = StringUtils.join( submitImport_Init_Response.getAccepted_ScanFilename_Suffix_List(), ", " );
				errorString =  "Scan file name must end with one of: " + accepted_ScanFilename_Suffix_CommaDelim;
			}
			
		} else if ( ! ( inputScanFileString.endsWith( ScanFilenameConstants.MZ_ML_SUFFIX__DEFAULT_SPECTR_1_X ) 
				|| inputScanFileString.endsWith( ScanFilenameConstants.MZ_XML_SUFFIX__DEFAULT_SPECTR_1_X ) ) ) {

			errorString =  "Scan file name must end with '"
					+ ScanFilenameConstants.MZ_ML_SUFFIX__DEFAULT_SPECTR_1_X 
					+ "' or '"
					+ ScanFilenameConstants.MZ_XML_SUFFIX__DEFAULT_SPECTR_1_X
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
	public static void reportSubmitterVersionErrorToUser( Integer submitProgramVersionNumber_Current_Per_Webapp ) {

		System.err.println();
		System.err.println( "The Limelight Submit Program is out of date.  This version is no longer supported." );
		System.err.println();
		System.err.println( "Please visit the Limelight Web application to download the latest Limelight Submit program." );
		System.err.println();
	}

}
