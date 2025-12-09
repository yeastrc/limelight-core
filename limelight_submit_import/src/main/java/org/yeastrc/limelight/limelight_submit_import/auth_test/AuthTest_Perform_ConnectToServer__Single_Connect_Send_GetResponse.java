package org.yeastrc.limelight.limelight_submit_import.auth_test;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_submit_import.main.SubmitUploadMain;
import org.yeastrc.limelight.limelight_submit_import.main.SubmitUploadMain.SubmitResult;
import org.yeastrc.limelight.limelight_submit_import_client_connector.constants.Limelight_SubmitImport_Version_Constants;
import org.yeastrc.limelight.limelight_submit_import_client_connector.main.CallSubmitImportWebservice;
import org.yeastrc.limelight.limelight_submit_import_client_connector.main.CallSubmitImportWebserviceInitParameters;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_AuthTest_Request_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_AuthTest_Response_PgmXML;

/**
 * 
 *
 */
public class AuthTest_Perform_ConnectToServer__Single_Connect_Send_GetResponse {

	private static final Logger log = LoggerFactory.getLogger( AuthTest_Perform_ConnectToServer__Single_Connect_Send_GetResponse.class );

	private static final AuthTest_Perform_ConnectToServer__Single_Connect_Send_GetResponse instance = new AuthTest_Perform_ConnectToServer__Single_Connect_Send_GetResponse();

	private AuthTest_Perform_ConnectToServer__Single_Connect_Send_GetResponse() { }
	public static AuthTest_Perform_ConnectToServer__Single_Connect_Send_GetResponse getInstance() { return instance; }


	/**
	 * @param baseURL
	 * @param userSubmitImportProgramKeyFromCommandLine
	 * @param projectIdString
	 * @param retryCountLimit // NOT USED
	 * @return
	 * @throws Exception
	 */
	public SubmitResult authTest_Perform_ConnectToServer(

			String baseURL, 
			String userSubmitImportProgramKeyFromCommandLine,

			String projectIdString,
			
			String statusResultLine_Prefix
			
			) throws Exception {

		SubmitResult submitResult = new SubmitResult();


		String userSubmitImportProgramKey = userSubmitImportProgramKeyFromCommandLine;

		CallSubmitImportWebserviceInitParameters callSubmitImportWebserviceInitParameters = new CallSubmitImportWebserviceInitParameters();

		callSubmitImportWebserviceInitParameters.setWebappServerBaseURL( baseURL );

		CallSubmitImportWebservice callSubmitImportWebservice = CallSubmitImportWebservice.getInstance();

		callSubmitImportWebservice.init( callSubmitImportWebserviceInitParameters );


		//  ONLY Perform Auth Test for User and Project id

		SubmitImport_AuthTest_Request_PgmXML submitImport_AuthTest_Request = new SubmitImport_AuthTest_Request_PgmXML();

		submitImport_AuthTest_Request.setSubmitProgramVersionNumber( Limelight_SubmitImport_Version_Constants.SUBMIT_PROGRAM__CURRENT__VERSION_NUMBER );
		submitImport_AuthTest_Request.setProjectIdentifier( projectIdString );
		submitImport_AuthTest_Request.setUserSubmitImportProgramKey( userSubmitImportProgramKey );

		SubmitImport_AuthTest_Response_PgmXML submitImport_AuthTest_Response = 
				callSubmitImportWebservice.call_SubmitImport_AuthTest_Webservice(submitImport_AuthTest_Request);

		if ( submitImport_AuthTest_Response.isStatusSuccess() ) {

			System.err.println( "" );
			System.err.println( "********************************************************" );
			System.err.println( "" );
			System.err.println( statusResultLine_Prefix + "Auth Test Successful." );
			System.err.println( "" );

			System.out.println( "" );
			System.out.println( "********************************************************" );
			System.out.println( "" );
			System.out.println( statusResultLine_Prefix + "Auth Test Successful." );
			System.out.println( "" );

		} else {

			System.err.println( "" );
			System.err.println( "********************************************************" );
			System.err.println( "" );
			System.err.println( statusResultLine_Prefix + "Auth Test Failed." );
			System.err.println( "" );
			
			if ( submitImport_AuthTest_Response.isSubmitProgramVersionNumber_NotAccepted() ) {

				SubmitUploadMain.reportSubmitterVersionErrorToUser( submitImport_AuthTest_Response.getSubmitProgramVersionNumber_Current_Per_Webapp() );
				submitResult.setExitCode( SubmitUploadMain.PROGRAM_EXIT_CODE_INVALID_SUBMITTER_VERSION );
				return submitResult;    //  EARLY EXIT
			}
			
			if ( submitImport_AuthTest_Response.isUserSubmitImportProgramKeyNotFound() ) {

				System.err.println( "--user-submit-import-key= value is not found in Limelight. First 2 characters of value: " + userSubmitImportProgramKeyFromCommandLine.substring(0, 2 ) );
				submitResult.setExitCode( SubmitUploadMain.PROGRAM_EXIT_CODE_INVALID_SUBMITTER_VERSION );
				return submitResult;    //  EARLY EXIT
			}

			if ( submitImport_AuthTest_Response.isUserNotAcceptLatestTermsOfService() ) {

				System.err.println( "User has not accepted the latest Terms of Service.  User must sign into webapp and accept latest terms of service.  --user-submit-import-key= value first 2 characters of value: " + userSubmitImportProgramKeyFromCommandLine.substring(0, 2 ) );
				submitResult.setExitCode( SubmitUploadMain.PROGRAM_EXIT_CODE_INVALID_SUBMITTER_VERSION );
				return submitResult;    //  EARLY EXIT
			}

			if ( submitImport_AuthTest_Response.isUserNotAuthorizedForProject() ) {  //  Fails this if project is locked or user is not project owner or maybe other things

				System.err.println( "User Not Authorized to Submit Import to project.  Project must exist. Project cannot be locked.  User must be Project Owner in project.  Project Id: " + projectIdString  + "   --user-submit-import-key= value first 2 characters of value: " + userSubmitImportProgramKeyFromCommandLine.substring(0, 2 ) );
				submitResult.setExitCode( SubmitUploadMain.PROGRAM_EXIT_CODE_INVALID_SUBMITTER_VERSION );
				return submitResult;    //  EARLY EXIT
			}

			if ( submitImport_AuthTest_Response.isProjectLocked() ) {

				System.err.println( "Project is locked.  Cannot submit import to a locked project.  Project Id: " + projectIdString  + "   --user-submit-import-key= value first 2 characters of value: " + userSubmitImportProgramKeyFromCommandLine.substring(0, 2 ) );
				submitResult.setExitCode( SubmitUploadMain.PROGRAM_EXIT_CODE_INVALID_SUBMITTER_VERSION );
				return submitResult;    //  EARLY EXIT
			}

			if ( submitImport_AuthTest_Response.isProjectIdNotFound() || submitImport_AuthTest_Response.isProjectNotEnabled() || submitImport_AuthTest_Response.isProjectMarkedForDeletion() ) {

				System.err.println( "Project is not found.  Project Id: " + projectIdString  + "   --user-submit-import-key= value first 2 characters of value: " + userSubmitImportProgramKeyFromCommandLine.substring(0, 2 ) );
				submitResult.setExitCode( SubmitUploadMain.PROGRAM_EXIT_CODE_INVALID_SUBMITTER_VERSION );
				return submitResult;    //  EARLY EXIT
			}

			if ( StringUtils.isNotBlank( submitImport_AuthTest_Response.getStatusFail_ErrorMessage() ) ) {

				System.err.println( submitImport_AuthTest_Response.getStatusFail_ErrorMessage() );
				submitResult.setExitCode( SubmitUploadMain.PROGRAM_EXIT_CODE_INVALID_INPUT );
				return submitResult;    //  EARLY EXIT
			}

			submitResult.setExitCode( SubmitUploadMain.PROGRAM_EXIT_CODE_INVALID_INPUT );
		}

		return submitResult;  //  EARLY RETURN

	}


}
