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
public class AuthTest_Perform_ConnectToServer {

	private static final Logger log = LoggerFactory.getLogger( AuthTest_Perform_ConnectToServer.class );

	private static final AuthTest_Perform_ConnectToServer instance = new AuthTest_Perform_ConnectToServer();

	private AuthTest_Perform_ConnectToServer() { }
	public static AuthTest_Perform_ConnectToServer getInstance() { return instance; }


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

			int retryCountLimit  // NOT USED

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
			System.err.println( "Auth Test Successful." );
			System.err.println( "" );

			System.out.println( "" );
			System.out.println( "********************************************************" );
			System.out.println( "" );
			System.out.println( "Auth Test Successful." );
			System.out.println( "" );

		} else {

			System.err.println( "" );
			System.err.println( "********************************************************" );
			System.err.println( "" );
			System.err.println( "Auth Test Failed." );
			System.err.println( "" );

			if ( submitImport_AuthTest_Response.isSubmitProgramVersionNumber_NotAccepted() ) {

				SubmitUploadMain.reportSubmitterVersionErrorToUser( submitImport_AuthTest_Response.getSubmitProgramVersionNumber_Current_Per_Webapp() );
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
