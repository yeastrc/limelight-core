package org.yeastrc.limelight.limelight_webapp.blib_file__creation_web_service__call_webservice_code;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;

/**
 * 
 *
 */
@Component
public class BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService implements BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService_IF {

	private static final Logger log = LoggerFactory.getLogger( BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService.class );
	
	private static final int SUCCESS_HTTP_RETURN_CODE = 200;
	private static final String CONTENT_TYPE_SEND_RECEIVE = "application/json";
	
	private static final String WEBSERVICE_PATH =  "/requestConversionStatus";

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject; // For response from called webservice
	
	/**
	 * 
	 *
	 */
	public static class BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService_Response {
		
		boolean status;
		boolean failedToConnectToWebservice;  // Also malformed URL
		Integer httpStatusCode_Not_200_OK;
		Response_From_BlibCreator_Status_Webservice_Root webserviceResponse_Root; // Response from Webservice
		public boolean isStatus() {
			return status;
		}
		public boolean isFailedToConnectToWebservice() {
			return failedToConnectToWebservice;
		}
		public Integer getHttpStatusCode_Not_200_OK() {
			return httpStatusCode_Not_200_OK;
		}
		public Response_From_BlibCreator_Status_Webservice_Root getWebserviceResponse_Root() {
			return webserviceResponse_Root;
		}
	}
	
	
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.blib_file__creation_web_service__call_webservice_code.BlibFileCreation_WebService__GetCreationStatus__CallWebService_IF#blibFileCreation_WebService__GetCreationStatus__CallWebService(org.yeastrc.limelight.limelight_webapp.blib_file__creation_web_service__call_webservice_code.BlibFileCreation_WebService__GetCreationStatus__CallWebService.Request_To_BlibCreator_Status_Webservice_Root)
	 */
	@Override
	public BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService_Response blibFileCreation_WebService__GetCreationStatus__CallWebService(
			Request_To_BlibCreator_Status_Webservice_Root request_To_BlibCreator_Webservice_Root
			) throws Exception {
		
		BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService_Response  methodResponse = new BlibSpectralLibrary_File_Creation_WebService__GetCreationStatus__CallWebService_Response();
		
		byte[] request_To_BlibCreator_Webservice_Root_AsJSON = marshalObjectToJSON.getJSONByteArray( request_To_BlibCreator_Webservice_Root );

//		{
//			String request_To_BlibCreator_Webservice_Root_AsString = new String( request_To_BlibCreator_Webservice_Root_AsJSON );
//
//			int z = 0;
//		}

		String webservice_Base_URL =
				configSystemDAO.getConfigValueForConfigKey(
						ConfigSystemsKeysSharedConstants.BLIB_SPECTRAL_LIBRARY_FILE_CREATION_WEB_SERVICE_BASE_URL );

		if ( StringUtils.isEmpty( webservice_Base_URL ) ) {

			log.warn( "Config table has no value for webservice_Base_URL, key: '" + ConfigSystemsKeysSharedConstants.BLIB_SPECTRAL_LIBRARY_FILE_CREATION_WEB_SERVICE_BASE_URL + "'." );
			methodResponse.failedToConnectToWebservice = true;

			return methodResponse;  // EARLY RETURN
		}
		
		
		String webserviceURL = webservice_Base_URL + WEBSERVICE_PATH;

		//  Get number of bytes to send to specify in httpURLConnection.setFixedLengthStreamingMode(...)
		//  (This causes httpURLConnection to not buffer the sent data to get the length,
		//   allowing > 2GB to be sent and also no memory is needed for the buffering)
		long numberOfBytesToSend = request_To_BlibCreator_Webservice_Root_AsJSON.length;

		//   Create object for connecting to server
		URL urlObject;
		try {
			urlObject = new URL( webserviceURL );
		} catch (MalformedURLException e) {

			log.warn( "Failed to parse webserviceURL into Java URL object.  webserviceURL: " + webserviceURL, e );
			methodResponse.failedToConnectToWebservice = true;

			return methodResponse;  // EARLY RETURN
		}
		//   Open connection to server
		URLConnection urlConnection;
		try {
			urlConnection = urlObject.openConnection();
		} catch (IOException e) {

			log.warn( "Failed to open connecton to  webserviceURL.  webserviceURL: " + webserviceURL, e );
			methodResponse.failedToConnectToWebservice = true;

			return methodResponse;  // EARLY RETURN
		}
		// Downcast URLConnection to HttpURLConnection to allow setting of HTTP parameters 
		if ( ! ( urlConnection instanceof HttpURLConnection ) ) {
			String msg = "( ! ( urlConnection instanceof HttpURLConnection ) ). urlConnection.getClass().getCanonicalName(): " + urlConnection.getClass().getCanonicalName();
			log.error(msg);
			throw new LimelightInternalErrorException( msg );
		}
		HttpURLConnection httpURLConnection = null;
		try {
			httpURLConnection = (HttpURLConnection) urlConnection;
		} catch (Exception e) {
			String msg = "Fail to cast urlConnection to class HttpURLConnection. urlConnection.getClass().getCanonicalName(): " + urlConnection.getClass().getCanonicalName();
			log.error(msg, e);
			throw new LimelightInternalErrorException( msg, e );
		}
		//  Set HttpURLConnection properties

		//   Set Number of bytes to send, can be int or long
		//     ( Calling setFixedLengthStreamingMode(...) allows > 2GB to be sent 
		//       and HttpURLConnection does NOT buffer the sent bytes using ByteArrayOutputStream )
		httpURLConnection.setFixedLengthStreamingMode( numberOfBytesToSend );

		httpURLConnection.setRequestProperty( "Accept", CONTENT_TYPE_SEND_RECEIVE );
		httpURLConnection.setRequestProperty( "Content-Type", CONTENT_TYPE_SEND_RECEIVE );
		httpURLConnection.setDoOutput(true);
		// Send post request to server
		try {  //  Overall try/catch block to put "httpURLConnection.disconnect();" in the finally block

			try {
				httpURLConnection.connect();
			} catch ( IOException e ) {

				log.warn( "Failed to connecton to  webserviceURL 'httpURLConnection.connect()'.  webserviceURL: " + webserviceURL, e );
				methodResponse.failedToConnectToWebservice = true;

				return methodResponse;  // EARLY RETURN
			}
			//  Send bytes to server
			OutputStream outputStream = null;
			try {
				outputStream = httpURLConnection.getOutputStream();

				//  Send bytes to server
				outputStream.write( request_To_BlibCreator_Webservice_Root_AsJSON );

			} catch ( IOException e ) {
				byte[] errorStreamContents = null;
				try {
					errorStreamContents= getErrorStreamContents( httpURLConnection );
				} catch ( Exception ex ) {
				}

				log.warn( "IOException writing to connection.  webserviceURL: " + webserviceURL, e );
				methodResponse.failedToConnectToWebservice = true;

				return methodResponse;  // EARLY RETURN
			} finally {
				if ( outputStream != null ) {
					boolean closeOutputStreamFail = false;
					try {
						outputStream.close();
					} catch ( IOException e ) {
						closeOutputStreamFail = true;
						byte[] errorStreamContents = null;
						try {
							errorStreamContents= getErrorStreamContents( httpURLConnection );
						} catch ( Exception ex ) {
						}

						log.warn( "IOException closing stream used to send to webservice.  webserviceURL: " + webserviceURL, e );
						methodResponse.failedToConnectToWebservice = true;
						
						return methodResponse;  // EARLY RETURN
					}
				}
			}
			try {
				int httpResponseCode = httpURLConnection.getResponseCode();
				if ( httpResponseCode != SUCCESS_HTTP_RETURN_CODE ) {
					byte[] errorStreamContents = null;
					try {
						errorStreamContents= getErrorStreamContents( httpURLConnection );
					} catch ( Exception ex ) {
					}

					log.warn( "( httpResponseCode != SUCCESS_HTTP_RETURN_CODE ). httpResponseCode: " + httpResponseCode + ", webserviceURL: " + webserviceURL );
					
					methodResponse.httpStatusCode_Not_200_OK = httpResponseCode;
					if ( httpResponseCode == 404 ) {
						methodResponse.failedToConnectToWebservice = true;
					}
					
					return methodResponse;  // EARLY RETURN 
				}
			} catch ( IOException e ) {
				byte[] errorStreamContents = null;
				try {
					errorStreamContents= getErrorStreamContents( httpURLConnection );
				} catch ( Exception ex ) {
				}
				log.warn( "IOException getting HTTP response code. httpURLConnection.getResponseCode().  webserviceURL: " + webserviceURL, e );
				methodResponse.failedToConnectToWebservice = true;
				
				return methodResponse;  // EARLY RETURN
			}
			//  Get response body from server
			ByteArrayOutputStream outputStreamBufferOfServerResponse = new ByteArrayOutputStream( 1000000 );
			InputStream inputStream = null;
			try {
				inputStream = httpURLConnection.getInputStream();
				int nRead;
				byte[] data = new byte[ 16384 ];
				while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
					outputStreamBufferOfServerResponse.write(data, 0, nRead);
				}
			} catch ( IOException e ) {
				byte[] errorStreamContents = null;
				try {
					errorStreamContents= getErrorStreamContents( httpURLConnection );
				} catch ( Exception ex ) {
				}

				log.warn( "IOException reading Webservice response.  webserviceURL: " + webserviceURL, e );
				methodResponse.failedToConnectToWebservice = true;
				
				return methodResponse;  // EARLY RETURN
			} finally {
				if ( inputStream != null ) {
					try {
						inputStream.close();
					} catch ( IOException e ) {
						byte[] errorStreamContents = null;
						try {
							errorStreamContents= getErrorStreamContents( httpURLConnection );
						} catch ( Exception ex ) {
						}

						log.warn( "IOException closing stream used for reading Webservice response.  webserviceURL: " + webserviceURL, e );
						methodResponse.failedToConnectToWebservice = true;
						
						return methodResponse;  // EARLY RETURN
					}
				}
			}

			byte[] serverResponseByteArray = outputStreamBufferOfServerResponse.toByteArray();
			
			String serverResponseBytesToString = new String( serverResponseByteArray );
			
			Object object = unmarshalJSON_ToObject.getObjectFromJSONByteArray(serverResponseByteArray, Response_From_BlibCreator_Status_Webservice_Root.class);
			
			if ( ! ( object instanceof Response_From_BlibCreator_Status_Webservice_Root ) ) {
				String msg = "( ! ( object instanceof Response_From_BlibCreator_Status_Webservice_Root ) )";
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			
			Response_From_BlibCreator_Status_Webservice_Root webserviceResponse_Root = (Response_From_BlibCreator_Status_Webservice_Root) object;
			
			methodResponse.status = true;
			
			methodResponse.webserviceResponse_Root = webserviceResponse_Root;
			
			
			return methodResponse;



		} finally {
			//			httpURLConnection.disconnect();
		}
	}

	/**
	 * @param httpURLConnection
	 * @return
	 * @throws IOException
	 */
	private byte[] getErrorStreamContents(HttpURLConnection httpURLConnection) throws IOException {

		InputStream inputStream = httpURLConnection.getErrorStream();
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		int byteArraySize = 5000;
		byte[] data = new byte[ byteArraySize ];
		while (true) {
			int bytesRead = inputStream.read( data );
			if ( bytesRead == -1 ) {  // end of input
				break;
			}
			if ( bytesRead > 0 ) {
				baos.write( data, 0, bytesRead );
			}
		}
		return baos.toByteArray();
	}


	

	////////////////////////////////////////
	////////////////////////////////////////

	//   Request_To_BlibCreator_Status_Webservice  Request Class to be serialized for Webservice call

	public static class Request_To_BlibCreator_Status_Webservice_Root {

		int project_id;
		String request_id;

		/**
		 * Constructory
		 * 
		 * @param project_id
		 * @param spectral_data
		 */
		public Request_To_BlibCreator_Status_Webservice_Root(

				int project_id,
				String request_id
				) {

			this.project_id = project_id;
			this.request_id = request_id;
		}

		public int getProject_id() {
			return project_id;
		}
		public String getRequest_id() {
			return request_id;
		}
	}

	//   Request_To_BlibCreator_Status_Webservice - Response Class to be deserialized from Webservice call

	public static class Response_From_BlibCreator_Status_Webservice_Root {

		private String request_id;
		private String status;
		private String end_user_message;
		private Integer queue_position;
		private String error_message;
		private String blib_file_name;
		
		public String getRequest_id() {
			return request_id;
		}
		public void setRequest_id(String request_id) {
			this.request_id = request_id;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public String getError_message() {
			return error_message;
		}
		public void setError_message(String error_message) {
			this.error_message = error_message;
		}
		public String getBlib_file_name() {
			return blib_file_name;
		}
		public void setBlib_file_name(String blib_file_name) {
			this.blib_file_name = blib_file_name;
		}
		public String getEnd_user_message() {
			return end_user_message;
		}
		public void setEnd_user_message(String end_user_message) {
			this.end_user_message = end_user_message;
		}
		public Integer getQueue_position() {
			return queue_position;
		}
		public void setQueue_position(Integer queue_position) {
			this.queue_position = queue_position;
		}

	}
}
