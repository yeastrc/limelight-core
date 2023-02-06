package org.yeastrc.limelight.limelight_feature_detection_run_import.run_feature_detection_service_communication;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_feature_detection_run_import.config.GetFeatureDetectionConfigFromConfigTable;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterConfigurationException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporter_RunFeatureDetection_Communication_Exception;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 
 *
 */
public class RunFeatureDetectionService_Communication {

	private static final Logger log = LoggerFactory.getLogger( RunFeatureDetectionService_Communication.class );
	
	
	private static final String WEBSERVICE_SUBMIT_PATH = "/requestFeatureDetectionRun";
	
	private static final String WEBSERVICE_GET_STATUS_PATH = "/requestFeatureDetectionRunStatus";
	
	private static final String WEBSERVICE_CANCEL_PATH = "/cancelFeatureDetectionRunRequest";

//	private static final Charset XML_ENCODING_CHARACTER_SET = StandardCharsets.UTF_8;
//	private static final String XML_ENCODING_CHARACTER_SET_STRING = StandardCharsets.UTF_8.toString();
	
	private static final int SUCCESS_HTTP_RETURN_CODE = 200;
	private static final String CONTENT_TYPE_SEND_RECEIVE = "application/xml";
	
	private RunFeatureDetectionService_Communication() { }
	public static RunFeatureDetectionService_Communication getInstance() { return new RunFeatureDetectionService_Communication(); }
	
	
	
	
	/**
	 * @param runFeatureDetectionService_SubmitRequest_SendObject
	 * @return
	 * @throws Exception
	 */
	public RunFeatureDetectionService_SubmitRequest_ReceiveObject call_Submit_Webservice( RunFeatureDetectionService_SubmitRequest_SendObject runFeatureDetectionService_SubmitRequest_SendObject ) throws Exception {
		
		String webappServerBaseURL = GetFeatureDetectionConfigFromConfigTable.get_RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_WEB_SERVICE_BASE_URL();
				
		if ( StringUtils.isEmpty( webappServerBaseURL) ) {
			String msg = "NO value from config for webappServerBaseURL";
			log.error(msg);
			throw new LimelightImporterConfigurationException(msg);
		}
		
		if ( ! webappServerBaseURL.endsWith( "/" ) ) {
			webappServerBaseURL = webappServerBaseURL + "/";
		}

		String webserviceURL = webappServerBaseURL + WEBSERVICE_SUBMIT_PATH;
		
		
		ByteArrayOutputStream byteArrayOutputStream_ToSend = new ByteArrayOutputStream( 10000 );
		

		//  Jackson JSON Mapper object for JSON deserialization and serialization
		ObjectMapper jacksonJSON_Mapper = new ObjectMapper();
		//   serialize 
		try {
			jacksonJSON_Mapper.writeValue(byteArrayOutputStream_ToSend, runFeatureDetectionService_SubmitRequest_SendObject);
		} catch ( JsonParseException e ) {
			String msg = "Failed to serialize 'object', JsonParseException. class of param: " + runFeatureDetectionService_SubmitRequest_SendObject.getClass() ;
			log.error( msg, e );
			throw e;
		} catch ( JsonMappingException e ) {
			String msg = "Failed to serialize 'object', JsonMappingException. class of param: " + runFeatureDetectionService_SubmitRequest_SendObject.getClass() ;
			log.error( msg, e );
			throw e;
		} catch ( IOException e ) {
			String msg = "Failed to serialize 'object', IOException. class of param: " + runFeatureDetectionService_SubmitRequest_SendObject.getClass() ;
			log.error( msg, e );
			throw e;
		}
	

		byte[] serverResponseByteArray = 
				sendToServerSendByteArrayOrFileAsStream_GetByteArrayResponseFromServer(
						byteArrayOutputStream_ToSend,
						null, // fileToSendAsStream, 
						null, // headersToSend,
						webserviceURL );
		

		RunFeatureDetectionService_SubmitRequest_ReceiveObject parsedJSONAsObject = null;
		try {
			parsedJSONAsObject = jacksonJSON_Mapper.readValue( serverResponseByteArray, RunFeatureDetectionService_SubmitRequest_ReceiveObject.class );
		} catch ( Exception e ) {
			
			String stringJSON = "Failed to convert response to String";
			try {
				stringJSON = new String(serverResponseByteArray, StandardCharsets.UTF_8);
			} catch ( Exception e2 ) {
				
			}
			
			String msg = "Failed to parse webservice response from path '" + WEBSERVICE_SUBMIT_PATH + "', Exception.  webservice reponse: " + stringJSON; 
			log.error( msg, e );
			throw e;
		}
		
		return parsedJSONAsObject;
	}
	
	


	/**
	 * @param runFeatureDetectionService_GetStatus_SendObject
	 * @return
	 * @throws Exception
	 */
	public RunFeatureDetectionService_GetStatus_ReceiveObject call_GetStatus_Webservice( RunFeatureDetectionService_GetStatus_SendObject runFeatureDetectionService_GetStatus_SendObject ) throws Exception {
		
		String webappServerBaseURL = GetFeatureDetectionConfigFromConfigTable.get_RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_WEB_SERVICE_BASE_URL();

		if ( StringUtils.isEmpty( webappServerBaseURL) ) {
			String msg = "NO value from config for webappServerBaseURL";
			log.error(msg);
			throw new LimelightImporterConfigurationException(msg);
		}
		
		if ( ! webappServerBaseURL.endsWith( "/" ) ) {
			webappServerBaseURL = webappServerBaseURL + "/";
		}

		String webserviceURL = webappServerBaseURL + WEBSERVICE_GET_STATUS_PATH;
		
		
		ByteArrayOutputStream byteArrayOutputStream_ToSend = new ByteArrayOutputStream( 10000 );
		

		//  Jackson JSON Mapper object for JSON deserialization and serialization
		ObjectMapper jacksonJSON_Mapper = new ObjectMapper();
		//   serialize 
		try {
			jacksonJSON_Mapper.writeValue(byteArrayOutputStream_ToSend, runFeatureDetectionService_GetStatus_SendObject);
		} catch ( JsonParseException e ) {
			String msg = "Failed to serialize 'object', JsonParseException. class of param: " + runFeatureDetectionService_GetStatus_SendObject.getClass() ;
			log.error( msg, e );
			throw e;
		} catch ( JsonMappingException e ) {
			String msg = "Failed to serialize 'object', JsonMappingException. class of param: " + runFeatureDetectionService_GetStatus_SendObject.getClass() ;
			log.error( msg, e );
			throw e;
		} catch ( IOException e ) {
			String msg = "Failed to serialize 'object', IOException. class of param: " + runFeatureDetectionService_GetStatus_SendObject.getClass() ;
			log.error( msg, e );
			throw e;
		}
	

		byte[] serverResponseByteArray = 
				sendToServerSendByteArrayOrFileAsStream_GetByteArrayResponseFromServer(
						byteArrayOutputStream_ToSend,
						null, // fileToSendAsStream, 
						null, // headersToSend,
						webserviceURL );
		

		RunFeatureDetectionService_GetStatus_ReceiveObject parsedJSONAsObject = null;
		try {
			parsedJSONAsObject = jacksonJSON_Mapper.readValue( serverResponseByteArray, RunFeatureDetectionService_GetStatus_ReceiveObject.class );
		} catch ( Exception e ) {
			
			String stringJSON = "Failed to convert response to String";
			try {
				stringJSON = new String(serverResponseByteArray, StandardCharsets.UTF_8);
			} catch ( Exception e2 ) {
				
			}
			
			String msg = "Failed to parse webservice response from path '" + WEBSERVICE_GET_STATUS_PATH + "', Exception.  webservice reponse: " + stringJSON; 
			log.error( msg, e );
			throw e;
		}
		
		return parsedJSONAsObject;
	}
	
	
	

	/**
	 * @param runFeatureDetectionService_CancelRequest_SendObject
	 * @return
	 * @throws Exception
	 */
	public RunFeatureDetectionService_CancelRequest_ReceiveObject call_CancelRequest_Webservice( RunFeatureDetectionService_CancelRequest_SendObject runFeatureDetectionService_CancelRequest_SendObject ) throws Exception {
		
		String webappServerBaseURL = GetFeatureDetectionConfigFromConfigTable.get_RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_WEB_SERVICE_BASE_URL();

		if ( StringUtils.isEmpty( webappServerBaseURL) ) {
			String msg = "NO value from config for webappServerBaseURL";
			log.error(msg);
			throw new LimelightImporterConfigurationException(msg);
		}
		
		if ( ! webappServerBaseURL.endsWith( "/" ) ) {
			webappServerBaseURL = webappServerBaseURL + "/";
		}

		String webserviceURL = webappServerBaseURL + WEBSERVICE_CANCEL_PATH;
		
		
		ByteArrayOutputStream byteArrayOutputStream_ToSend = new ByteArrayOutputStream( 10000 );
		

		//  Jackson JSON Mapper object for JSON deserialization and serialization
		ObjectMapper jacksonJSON_Mapper = new ObjectMapper();
		//   serialize 
		try {
			jacksonJSON_Mapper.writeValue(byteArrayOutputStream_ToSend, runFeatureDetectionService_CancelRequest_SendObject);
		} catch ( JsonParseException e ) {
			String msg = "Failed to serialize 'object', JsonParseException. class of param: " + runFeatureDetectionService_CancelRequest_SendObject.getClass() ;
			log.error( msg, e );
			throw e;
		} catch ( JsonMappingException e ) {
			String msg = "Failed to serialize 'object', JsonMappingException. class of param: " + runFeatureDetectionService_CancelRequest_SendObject.getClass() ;
			log.error( msg, e );
			throw e;
		} catch ( IOException e ) {
			String msg = "Failed to serialize 'object', IOException. class of param: " + runFeatureDetectionService_CancelRequest_SendObject.getClass() ;
			log.error( msg, e );
			throw e;
		}
	

		byte[] serverResponseByteArray = 
				sendToServerSendByteArrayOrFileAsStream_GetByteArrayResponseFromServer(
						byteArrayOutputStream_ToSend,
						null, // fileToSendAsStream, 
						null, // headersToSend,
						webserviceURL );
		

		RunFeatureDetectionService_CancelRequest_ReceiveObject parsedJSONAsObject = null;
		try {
			parsedJSONAsObject = jacksonJSON_Mapper.readValue( serverResponseByteArray, RunFeatureDetectionService_CancelRequest_ReceiveObject.class );
		} catch ( Exception e ) {
			
			String stringJSON = "Failed to convert response to String";
			try {
				stringJSON = new String(serverResponseByteArray, StandardCharsets.UTF_8);
			} catch ( Exception e2 ) {
				
			}
			
			String msg = "Failed to parse webservice response from path '" + WEBSERVICE_CANCEL_PATH + "', Exception.  webservice reponse: " + stringJSON; 
			log.error( msg, e );
			throw e;
		}
		
		return parsedJSONAsObject;
	}
	
	
	////////////////////////////////////////////
	
	//  PRIVATE METHODS

	/**
	 * @param byteArrayOutputStream_ToSend
	 * @param fileToSendAsStream
	 * @param webserviceURL
	 * @return
	 * @throws LimelightImporter_RunFeatureDetection_Communication_Exception
	 */
	private byte[] sendToServerSendByteArrayOrFileAsStream_GetByteArrayResponseFromServer(
			ByteArrayOutputStream byteArrayOutputStream_ToSend,
			File fileToSendAsStream, 
			Map<String,String> headersToSend,
			String webserviceURL) throws LimelightImporter_RunFeatureDetection_Communication_Exception {
		
		byte[] serverResponseByteArray = null;
		
		if ( ( ! ( byteArrayOutputStream_ToSend != null || fileToSendAsStream != null ) )
				|| (  byteArrayOutputStream_ToSend != null && fileToSendAsStream != null)) {
			String msg = "Exactly one of either byteArrayOutputStream_ToSend or fileToSendAsStream must be not null";
			LimelightImporter_RunFeatureDetection_Communication_Exception exception = new LimelightImporter_RunFeatureDetection_Communication_Exception( msg );
			exception.setCallInterfaceInternalError(true);
			exception.setCallInterfaceInternalErrorMessage(msg);
			throw exception;
		}
		
		//  Get number of bytes to send to specify in httpURLConnection.setFixedLengthStreamingMode(...)
		//  (This causes httpURLConnection to not buffer the sent data to get the length,
		//   allowing > 2GB to be sent and also no memory is needed for the buffering)
		long numberOfBytesToSend = -1;
		
		if ( byteArrayOutputStream_ToSend != null ) {
			numberOfBytesToSend = byteArrayOutputStream_ToSend.size();
		} else {
			numberOfBytesToSend = fileToSendAsStream.length();
		}
		
		//   Create object for connecting to server
		URL urlObject;
		try {
			urlObject = new URL( webserviceURL );
		} catch (MalformedURLException e) {
			LimelightImporter_RunFeatureDetection_Communication_Exception wcee = new LimelightImporter_RunFeatureDetection_Communication_Exception( "Exception creating URL object to connect to server.  URL: " + webserviceURL, e );
			wcee.setServerURLError(true);
			wcee.setWebserviceURL( webserviceURL );
			throw wcee;
		}
		//   Open connection to server
		URLConnection urlConnection;
		try {
			urlConnection = urlObject.openConnection();
		} catch (IOException e) {
			LimelightImporter_RunFeatureDetection_Communication_Exception wcee = new LimelightImporter_RunFeatureDetection_Communication_Exception( "Exception calling openConnection() on URL object to connect to server.  URL: " + webserviceURL, e );
			wcee.setServerURLError(true);
			wcee.setWebserviceURL( webserviceURL );
			throw wcee;
		}
		// Downcast URLConnection to HttpURLConnection to allow setting of HTTP parameters 
		if ( ! ( urlConnection instanceof HttpURLConnection ) ) {
			LimelightImporter_RunFeatureDetection_Communication_Exception wcee = new LimelightImporter_RunFeatureDetection_Communication_Exception( "Processing Error: Cannot cast URLConnection to HttpURLConnection" );
			wcee.setServerURLError(true);
			wcee.setWebserviceURL( webserviceURL );
			throw wcee;
		}
		HttpURLConnection httpURLConnection = null;
		try {
			httpURLConnection = (HttpURLConnection) urlConnection;
		} catch (Exception e) {
			LimelightImporter_RunFeatureDetection_Communication_Exception wcee = new LimelightImporter_RunFeatureDetection_Communication_Exception( "Processing Error: Cannot cast URLConnection to HttpURLConnection" );
			wcee.setServerURLError(true);
			wcee.setWebserviceURL( webserviceURL );
			throw wcee;
		}
		//  Set HttpURLConnection properties

		//   Set Number of bytes to send, can be int or long
		//     ( Calling setFixedLengthStreamingMode(...) allows > 2GB to be sent 
		//       and HttpURLConnection does NOT buffer the sent bytes using ByteArrayOutputStream )
		httpURLConnection.setFixedLengthStreamingMode( numberOfBytesToSend );
		
		//  Add headers
		if ( headersToSend != null && ( ! headersToSend.isEmpty() ) ) {
			for ( Map.Entry<String,String> header : headersToSend.entrySet() ) {
				final String headerKey = header.getKey();
				final String headerValue = header.getValue();
				httpURLConnection.setRequestProperty( headerKey, headerValue );
			}
		}
		
		httpURLConnection.setRequestProperty( "Accept", CONTENT_TYPE_SEND_RECEIVE );
		httpURLConnection.setRequestProperty( "Content-Type", CONTENT_TYPE_SEND_RECEIVE );
		httpURLConnection.setDoOutput(true);
		// Send post request to server
		try {  //  Overall try/catch block to put "httpURLConnection.disconnect();" in the finally block

			try {
				httpURLConnection.connect();
			} catch ( IOException e ) {
				LimelightImporter_RunFeatureDetection_Communication_Exception wcee = new LimelightImporter_RunFeatureDetection_Communication_Exception( "Exception connecting to server at URL: " + webserviceURL, e );
				wcee.setServerURLError(true);
				wcee.setWebserviceURL( webserviceURL );
				throw wcee;
			}
			//  Send bytes to server
			OutputStream outputStream = null;
			FileInputStream fileInputStream = null; // for when send file
			try {
				outputStream = httpURLConnection.getOutputStream();
				if ( byteArrayOutputStream_ToSend != null ) {
					//  Send bytes to server
					byteArrayOutputStream_ToSend.writeTo( outputStream );
				} else {
					//  Send file contents to server
					fileInputStream = new FileInputStream( fileToSendAsStream );
					int byteArraySize = 5000;
					byte[] data = new byte[ byteArraySize ];
					while (true) {
						int bytesRead = fileInputStream.read( data );
						if ( bytesRead == -1 ) {  // end of input
							break;
						}
						if ( bytesRead > 0 ) {
							outputStream.write( data, 0, bytesRead );
						}
					}
				}
			} catch ( IOException e ) {
				byte[] errorStreamContents = null;
				try {
					errorStreamContents= getErrorStreamContents( httpURLConnection );
				} catch ( Exception ex ) {
				}
				LimelightImporter_RunFeatureDetection_Communication_Exception wcee = new LimelightImporter_RunFeatureDetection_Communication_Exception( "IOException sending XML to server at URL: " + webserviceURL, e );
				wcee.setServerURLError(true);
				wcee.setWebserviceURL( webserviceURL );
				wcee.setErrorStreamContents( errorStreamContents );
				throw wcee;
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
						LimelightImporter_RunFeatureDetection_Communication_Exception wcee = new LimelightImporter_RunFeatureDetection_Communication_Exception( "IOException closing output Stream to server at URL: " + webserviceURL, e );
						wcee.setServerURLError(true);
						wcee.setWebserviceURL( webserviceURL );
						wcee.setErrorStreamContents( errorStreamContents );
						throw wcee;
					} finally {
						if ( fileInputStream != null ) {
							try {
								fileInputStream.close();
							} catch ( Exception e ) {
								if ( ! closeOutputStreamFail ) {
									// Only throw exception if close of output stream successful
									byte[] errorStreamContents = null;
									try {
										errorStreamContents= getErrorStreamContents( httpURLConnection );
									} catch ( Exception ex ) {
									}
									LimelightImporter_RunFeatureDetection_Communication_Exception wcee = new LimelightImporter_RunFeatureDetection_Communication_Exception( "Exception closing output Stream to server at URL: " + webserviceURL, e );
									wcee.setServerURLError(true);
									wcee.setWebserviceURL( webserviceURL );
									wcee.setErrorStreamContents( errorStreamContents );
									throw wcee;
								}
							}
						}
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
					LimelightImporter_RunFeatureDetection_Communication_Exception wcee = 
							new LimelightImporter_RunFeatureDetection_Communication_Exception( "Unsuccessful HTTP response code of " + httpResponseCode
									+ " connecting to server at URL: " + webserviceURL );
					wcee.setBadHTTPStatusCode(true);
					wcee.setHttpStatusCode( httpResponseCode );
					wcee.setWebserviceURL( webserviceURL );
					wcee.setErrorStreamContents( errorStreamContents );
					throw wcee;
				}
			} catch ( IOException e ) {
				byte[] errorStreamContents = null;
				try {
					errorStreamContents= getErrorStreamContents( httpURLConnection );
				} catch ( Exception ex ) {
				}
				LimelightImporter_RunFeatureDetection_Communication_Exception wcee = 
						new LimelightImporter_RunFeatureDetection_Communication_Exception( "IOException getting HTTP response code from server at URL: " + webserviceURL, e );
				wcee.setServerSendReceiveDataError(true);
				wcee.setWebserviceURL( webserviceURL );
				wcee.setErrorStreamContents( errorStreamContents );
				throw wcee;
			}
			//  Get response XML from server
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
				LimelightImporter_RunFeatureDetection_Communication_Exception wcee = 
						new LimelightImporter_RunFeatureDetection_Communication_Exception( "IOException receiving XML from server at URL: " + webserviceURL, e );
				wcee.setServerSendReceiveDataError(true);
				wcee.setWebserviceURL( webserviceURL );
				wcee.setErrorStreamContents( errorStreamContents );
				throw wcee;
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
						LimelightImporter_RunFeatureDetection_Communication_Exception wcee = 
								new LimelightImporter_RunFeatureDetection_Communication_Exception( "IOException closing input Stream from server at URL: " + webserviceURL, e );
						wcee.setServerSendReceiveDataError(true);
						wcee.setWebserviceURL( webserviceURL );
						wcee.setErrorStreamContents( errorStreamContents );
						throw wcee;
					}
				}
			}
			serverResponseByteArray = outputStreamBufferOfServerResponse.toByteArray();

			
		} finally {
//			httpURLConnection.disconnect();
		}
		return serverResponseByteArray;
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
		if ( baos.size() > 0 ) {
			System.err.println( "Syserr returned from calling Limelight Web App Webservice.  Size: " + baos.size() );
			System.err.println( "Syserr contents (START):" );
			baos.writeTo( System.err );
			System.err.println();
			System.err.println( "Syserr contents (END):" );
		}
		return baos.toByteArray();
	}

	
}
