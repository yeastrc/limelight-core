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

			String projectIdString
			
			) throws Exception {

		SubmitResult submitResult = 
				AuthTest_Perform_ConnectToServer__Single_Connect_Send_GetResponse.getInstance().authTest_Perform_ConnectToServer(
							baseURL, userSubmitImportProgramKeyFromCommandLine, projectIdString, "" );
		
		return submitResult;  

	}


}
