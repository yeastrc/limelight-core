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
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportConfigException;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportReportedErrorException;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportServerResponseException;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportUserDataException;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportUsernamePasswordFileException;
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
/**
 * @author danj
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



				int fileIndex = 1;

				if ( limelightXMLFile != null ) {
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
							
							if ( submitImport_UploadFile_Response.isFileSizeLimitExceeded() ) {
							
								System.err.println( "Limelight XML file is too large.  Max file size is: " + submitImport_UploadFile_Response.getMaxSizeFormatted() );
							}

							System.err.println( "If this error continues, contact the administrator of your Limelight Instance." );

							submitResult.exitCode = PROGRAM_EXIT_CODE_UPLOAD_SEND_FILE_FAILED;

							return submitResult;    //  EARLY EXIT

						}


						System.out.println( "Sent Limelight XML file to server: " + limelightXMLFile.getCanonicalPath() );
					}
				}

				if ( fastaFile != null && sendFastaFile_LOCAL ) {
					
					//  Process FASTA file

					fileIndex++;

					SubmitImport_FinalSubmit_SingleFileItem submitImport_FinalSubmit_SingleFileItem = new SubmitImport_FinalSubmit_SingleFileItem();
					fileItems.add( submitImport_FinalSubmit_SingleFileItem );

					submitImport_FinalSubmit_SingleFileItem.setFileIndex( fileIndex );
					submitImport_FinalSubmit_SingleFileItem.setFileType( LimelightSubmit_FileImportFileType.FASTA_FILE.value() );
					submitImport_FinalSubmit_SingleFileItem.setIsLimelightXMLFile( false );
					submitImport_FinalSubmit_SingleFileItem.setUploadedFilename( fastaFile.getName() );

					if ( submitterSameMachine ) {

						submitImport_FinalSubmit_SingleFileItem.setFilenameOnDiskWithPathSubSameMachine( fastaFile.getCanonicalPath() );
					}

					if ( ! submitterSameMachine ) {

						SubmitImport_UploadFile_Request_Common webserviceRequest = new SubmitImport_UploadFile_Request_Common();

						webserviceRequest.setProjectIdentifier( projectIdString );
						webserviceRequest.setUserSubmitImportProgramKey( userSubmitImportProgramKey );
						webserviceRequest.setUploadKey( submitImport_UploadKey );
						webserviceRequest.setFileIndex( submitImport_FinalSubmit_SingleFileItem.getFileIndex() );
						webserviceRequest.setFileType( submitImport_FinalSubmit_SingleFileItem.getFileType() );
						webserviceRequest.setFilename( fastaFile.getName() );
						webserviceRequest.setAbsoluteFilename_W_Path_OnSubmitMachine( fastaFile.getAbsolutePath() );
						webserviceRequest.setCanonicalFilename_W_Path_OnSubmitMachine( fastaFile.getCanonicalPath() );

						Call_SubmitImport_UploadFile_Service_Parameters parameters = new Call_SubmitImport_UploadFile_Service_Parameters();
						parameters.setUploadFile( fastaFile );
						parameters.setWebserviceRequest( webserviceRequest );

						//  Make call to server
						SubmitImport_UploadFile_Response_PgmXML submitImport_UploadFile_Response =
								callSubmitImportWebservice.call_SubmitImport_UploadFile_Service( parameters );

						if ( ! submitImport_UploadFile_Response.isStatusSuccess() ) {

							System.err.println( "FAILED sending FASTA file to server: " + fastaFile.getCanonicalPath() );

							if ( submitImport_UploadFile_Response.isFileSizeLimitExceeded() ) {
							
								System.err.println( "FASTA file is too large.  Max file size is: " + submitImport_UploadFile_Response.getMaxSizeFormatted() );
							}
							if ( submitImport_UploadFile_Response.getFastaFile_InvalidContents() != null &&  submitImport_UploadFile_Response.getFastaFile_InvalidContents().booleanValue() ) {

								System.err.println( "FASTA file is invalid.  It does not start with '>' or is not ASCII text." );
							}

							System.err.println( "If this error continues, contact the administrator of your Limelight Instance." );

							submitResult.exitCode = PROGRAM_EXIT_CODE_UPLOAD_SEND_FILE_FAILED;

							return submitResult;    //  EARLY EXIT

						}


						System.out.println( "Sent FASTA file to server: " + fastaFile.getCanonicalPath() );
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

							webserviceRequest.setSubmitProgram_Version( Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__CURRENT__VERSION_NUMBER );
							
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
								
								if ( submitImport_UploadFile_Response.isFileSizeLimitExceeded() ) {
								
									System.err.println( "Scan file is too large.  Max file size is: " + submitImport_UploadFile_Response.getMaxSizeFormatted() );
								}

								System.err.println( "If this error continues, contact the administrator of your Limelight Instance." );

								submitResult.exitCode = PROGRAM_EXIT_CODE_UPLOAD_SEND_FILE_FAILED;

								return submitResult;    //  EARLY EXIT

							}

							System.out.println( "Sent Scan file to server: " + scanFile.getCanonicalPath() );
						}
					}
				}


				//	Process Generic Other Files (other files that just need to be stored)

				if ( genericOtherFiles != null ) {

					for ( File genericOtherFile : genericOtherFiles ) {

						fileIndex++;

						SubmitImport_FinalSubmit_SingleFileItem submitImport_FinalSubmit_SingleFileItem = new SubmitImport_FinalSubmit_SingleFileItem();
						fileItems.add( submitImport_FinalSubmit_SingleFileItem );

						submitImport_FinalSubmit_SingleFileItem.setFileIndex( fileIndex );
						submitImport_FinalSubmit_SingleFileItem.setFileType( LimelightSubmit_FileImportFileType.GENERIC_OTHER_FILE.value() );
						submitImport_FinalSubmit_SingleFileItem.setIsLimelightXMLFile( false );
						submitImport_FinalSubmit_SingleFileItem.setUploadedFilename( genericOtherFile.getName() );

						if ( submitterSameMachine ) {

							submitImport_FinalSubmit_SingleFileItem.setFilenameOnDiskWithPathSubSameMachine( genericOtherFile.getCanonicalPath() );
						}

						if ( ! submitterSameMachine ) {

							SubmitImport_UploadFile_Request_Common webserviceRequest = new SubmitImport_UploadFile_Request_Common();

							webserviceRequest.setProjectIdentifier( projectIdString );
							webserviceRequest.setUserSubmitImportProgramKey( userSubmitImportProgramKey );
							webserviceRequest.setUploadKey( submitImport_UploadKey );
							webserviceRequest.setFileIndex( submitImport_FinalSubmit_SingleFileItem.getFileIndex() );
							webserviceRequest.setFileType( submitImport_FinalSubmit_SingleFileItem.getFileType() );
							webserviceRequest.setFilename( genericOtherFile.getName() );
							webserviceRequest.setAbsoluteFilename_W_Path_OnSubmitMachine( genericOtherFile.getAbsolutePath() );
							webserviceRequest.setCanonicalFilename_W_Path_OnSubmitMachine( genericOtherFile.getCanonicalPath() );

							Call_SubmitImport_UploadFile_Service_Parameters parameters = new Call_SubmitImport_UploadFile_Service_Parameters();
							parameters.setUploadFile( genericOtherFile );
							parameters.setWebserviceRequest( webserviceRequest );

							//  Make call to server
							SubmitImport_UploadFile_Response_PgmXML submitImport_UploadFile_Response =
									callSubmitImportWebservice.call_SubmitImport_UploadFile_Service( parameters );

							if ( ! submitImport_UploadFile_Response.isStatusSuccess() ) {

								System.err.println( "FAILED sending Generic Other File to server: " + genericOtherFile.getCanonicalPath() );
								
								if ( submitImport_UploadFile_Response.isFileSizeLimitExceeded() ) {
								
									System.err.println( "Scan file is too large.  Max file size is: " + submitImport_UploadFile_Response.getMaxSizeFormatted() );
								}

								System.err.println( "If this error continues, contact the administrator of your Limelight Instance." );

								submitResult.exitCode = PROGRAM_EXIT_CODE_UPLOAD_SEND_FILE_FAILED;

								return submitResult;    //  EARLY EXIT

							}

							System.out.println( "Sent Add File (--add-file=...) to server: " + genericOtherFile.getCanonicalPath() );
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
		
				System.out.println( "");
				System.out.println( "******************************************");
				System.out.println( "");
				System.out.println( "Submission Successful");
				System.out.println( "");

			} catch ( LimelightSubmitImportWebserviceCallErrorException e ) {

				if ( retryCountLimit == 0 || retryCount > retryCountLimit ) {
					
					throw e;
				}
				
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
