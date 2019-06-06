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
package org.yeastrc.limelight.limelight_submit_import_client_connector.main;


import java.io.ByteArrayInputStream;
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
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamReader;
import javax.xml.transform.stream.StreamSource;

import org.yeastrc.limelight.limelight_submit_import_client_connector.call_submit_import_parameter_objects.Call_SubmitImport_UploadFile_Service_Parameters;
import org.yeastrc.limelight.limelight_submit_import_client_connector.exceptions.LimelightSubmitImportWebserviceCallErrorException;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_Request_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_FinalSubmit_Response_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Request_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_Init_Response_PgmXML;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_UploadFile_Request_Common;
import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_UploadFile_Response_PgmXML;



/**
 * 
 *
 */
public class CallSubmitImportWebservice {

	private static final Charset XML_ENCODING_CHARACTER_SET = StandardCharsets.UTF_8;
	private static final String XML_ENCODING_CHARACTER_SET_STRING = StandardCharsets.UTF_8.toString();
	
	private static final int SUCCESS_HTTP_RETURN_CODE = 200;
	
	private static final int ERROR_REDIRECT_HTTP_RETURN_CODE = 302;
	
	private static final String CONTENT_TYPE_SEND_RECEIVE = "application/xml";
	
	//  Keep in sync with class AA_RestWSControllerPaths_Constants in web app
	
	private static final String SUBMIT_IMPORT_INIT_WEBSERVICE_SUB_URL = "/d/rws/for-page/project-upload-data-upload-initialize-from-submit-pgm";
	private static final String SUBMIT_IMPORT_UPLOAD_FILE_WEBSERVICE_SUB_URL = "/d/rws/for-page/project-upload-data-upload-file-from-submit-pgm";
	private static final String SUBMIT_IMPORT_FINAL_SUBMIT_WEBSERVICE_SUB_URL = "/d/rws/for-page/project-upload-data-upload-submit-from-submit-pgm";
	
	//  String to label Header Parameter for Upload File
	private static final String SUBMIT_IMPORT_UPLOAD_FILE_HEADER_PARAMETER_PARAMS_PGM_XML = "limelight_upload_file_params_xml";

	private String webappServerBaseURL;
	private JAXBContext jaxbContext;
	private boolean instanceInitialized;
	
	//  private constructor
	private CallSubmitImportWebservice() { }
	/**
	 * @return newly created instance
	 */
	public static CallSubmitImportWebservice getInstance() { 
		return new CallSubmitImportWebservice(); 
	}
	
	/**
	 * Must be called before any other methods are called
	 * 
	 * @param webappServerBaseURL - Only includes up to web app context
	 * @param requestingWebappIdentifier - identifier of the requesting web app
	 * @param requestingWebappKey - key for the requesting web app - null if none
	 * @throws Throwable
	 */
	public synchronized void init( CallSubmitImportWebserviceInitParameters initParameters ) throws Exception {
		
		if ( initParameters.getWebappServerBaseURL() == null || initParameters.getWebappServerBaseURL().length() == 0 ) {
			throw new IllegalArgumentException( "webappServerBaseURL cannot be empty");
		}
		this.webappServerBaseURL = initParameters.getWebappServerBaseURL();

		jaxbContext = 
				JAXBContext.newInstance( 
						SubmitImport_Init_Request_PgmXML.class,
						SubmitImport_Init_Response_PgmXML.class,
						SubmitImport_UploadFile_Request_Common.class,
						SubmitImport_UploadFile_Response_PgmXML.class,
						SubmitImport_FinalSubmit_Request_PgmXML.class,
						SubmitImport_FinalSubmit_Response_PgmXML.class
						);
		instanceInitialized = true;
	}
	
	/////////////////////////////
	

	/**
	 * @param webserviceRequest
	 * @return
	 * @throws Exception 
	 */
	public SubmitImport_Init_Response_PgmXML call_SubmitImport_Init_Webservice( SubmitImport_Init_Request_PgmXML webserviceRequest ) throws Exception {
		if ( ! instanceInitialized ) {
			throw new IllegalStateException( "Not initialized" );
		}
		if ( webserviceRequest == null ) {
			throw new IllegalArgumentException( "webserviceRequest param must not be null in call to call_SubmitImport_Init_Webservice(...)" );
		}

		String webserviceURL = webappServerBaseURL
				+ SUBMIT_IMPORT_INIT_WEBSERVICE_SUB_URL;
		Object webserviceResponseAsObject = callActualWebserviceOnServerSendObject( webserviceRequest, webserviceURL );
		if ( ! ( webserviceResponseAsObject instanceof SubmitImport_Init_Response_PgmXML ) ) {
			String msg = "Response unmarshaled to class other than SubmitImport_Init_Response.  "
					+ " Unmarshaled Class: " + webserviceResponseAsObject.getClass();
			LimelightSubmitImportWebserviceCallErrorException exception = new LimelightSubmitImportWebserviceCallErrorException( msg );
			exception.setFailToDecodeDataReceivedFromServer(true);
			throw exception;
		}
		SubmitImport_Init_Response_PgmXML webserviceResponse = null;
		try {
			webserviceResponse = (SubmitImport_Init_Response_PgmXML) webserviceResponseAsObject;
		} catch ( Exception e ) {
			String msg = "Error. Fail to cast response as SubmitImport_Init_Response: "
					+ e.toString();
			LimelightSubmitImportWebserviceCallErrorException exception = new LimelightSubmitImportWebserviceCallErrorException( msg );
			exception.setFailToDecodeDataReceivedFromServer(true);
			throw exception;
		}
		return webserviceResponse;
	}

	/**
	 * @param webserviceRequest
	 * @return
	 * @throws Exception 
	 */
	public SubmitImport_UploadFile_Response_PgmXML call_SubmitImport_UploadFile_Service( Call_SubmitImport_UploadFile_Service_Parameters parameters ) throws Exception {
		if ( ! instanceInitialized ) {
			throw new IllegalStateException( "Not initialized" );
		}
		if ( parameters == null ) {
			throw new IllegalArgumentException( "parameters param must not be null in call to call_SubmitImport_UploadFile_Service(...)" );
		}
		
		SubmitImport_UploadFile_Request_Common webserviceRequest = parameters.getWebserviceRequest();
		if ( webserviceRequest == null ) {
			throw new IllegalArgumentException( "webserviceRequest param must not be null in call to call_SubmitImport_UploadFile_Service(...)" );
		}
		
		File uploadFile = parameters.getUploadFile();
		if ( uploadFile == null ) {
			throw new IllegalArgumentException( "uploadFile property in webserviceRequest param must not be null in call to call_SubmitImport_UploadFile_Service(...)" );
		}
		if ( ! uploadFile.exists() ) {
			throw new IllegalArgumentException( "File in uploadFile property in webserviceRequest param must exist in call to call_SubmitImport_UploadFile_Service(...)" );
		}
		if ( webserviceRequest.getUserSubmitImportProgramKey() == null || webserviceRequest.getUserSubmitImportProgramKey().length() == 0 ) {
			throw new IllegalArgumentException( "userSubmitImportProgramKey property in webserviceRequest param must not be null or empty in call to call_SubmitImport_UploadFile_Service(...)" );
		}
		
		//  Create
		
		ByteArrayOutputStream byteArrayOutputStream_ToSend = serializeObjectToXML_Return_ByteArrayOutputStream( webserviceRequest );
		String headerString = new String( byteArrayOutputStream_ToSend.toByteArray(), XML_ENCODING_CHARACTER_SET );
		if ( headerString.contains( "\n" ) ) {
			//  Remove \n (new line) since not valid in header.  JaxB adds \n after prolog and at end
			headerString = headerString.replace( "\n", "");
		}
		
		Map<String,String> headersToSend = new HashMap<>();
		headersToSend.put( SUBMIT_IMPORT_UPLOAD_FILE_HEADER_PARAMETER_PARAMS_PGM_XML, headerString );
		
		String webserviceURL = webappServerBaseURL + SUBMIT_IMPORT_UPLOAD_FILE_WEBSERVICE_SUB_URL;
				
		Object webserviceResponseAsObject = 
				callActualWebserviceOnServerSendByteArrayOrFileAsStreamReturnObject(
						null /* bytesToSend */, uploadFile, headersToSend, webserviceURL );
		
		if ( ! ( webserviceResponseAsObject instanceof SubmitImport_UploadFile_Response_PgmXML ) ) {
			String msg = "Response unmarshaled to class other than SubmitImport_UploadFile_Response_PgmXML.  "
					+ " Unmarshaled Class: " + webserviceResponseAsObject.getClass();
			LimelightSubmitImportWebserviceCallErrorException exception = new LimelightSubmitImportWebserviceCallErrorException( msg );
			exception.setFailToDecodeDataReceivedFromServer(true);
			throw exception;
		}
		SubmitImport_UploadFile_Response_PgmXML webserviceResponse = null;
		try {
			webserviceResponse = (SubmitImport_UploadFile_Response_PgmXML) webserviceResponseAsObject;
		} catch ( Exception e ) {
			String msg = "Error. Fail to cast response as SubmitImport_UploadFile_Response_PgmXML: "
					+ e.toString();
			LimelightSubmitImportWebserviceCallErrorException exception = new LimelightSubmitImportWebserviceCallErrorException( msg );
			exception.setFailToDecodeDataReceivedFromServer(true);
			throw exception;
		}
		return webserviceResponse;
	}


	/**
	 * @param webserviceRequest
	 * @return
	 * @throws Exception 
	 */
	public SubmitImport_FinalSubmit_Response_PgmXML call_SubmitImport_FinalSubmit_Webservice( SubmitImport_FinalSubmit_Request_PgmXML webserviceRequest ) throws Exception {
		if ( ! instanceInitialized ) {
			throw new IllegalStateException( "Not initialized" );
		}
		if ( webserviceRequest == null ) {
			throw new IllegalArgumentException( "webserviceRequest param must not be null in call to call_SubmitImport_Init_Webservice(...)" );
		}

		String webserviceURL = webappServerBaseURL
				+ SUBMIT_IMPORT_FINAL_SUBMIT_WEBSERVICE_SUB_URL;
		Object webserviceResponseAsObject = callActualWebserviceOnServerSendObject( webserviceRequest, webserviceURL );
		if ( ! ( webserviceResponseAsObject instanceof SubmitImport_FinalSubmit_Response_PgmXML ) ) {
			String msg = "Response unmarshaled to class other than SubmitImport_FinalSubmit_Response_PgmXML.  "
					+ " Unmarshaled Class: " + webserviceResponseAsObject.getClass();
			LimelightSubmitImportWebserviceCallErrorException exception = new LimelightSubmitImportWebserviceCallErrorException( msg );
			exception.setFailToDecodeDataReceivedFromServer(true);
			throw exception;
		}
		SubmitImport_FinalSubmit_Response_PgmXML webserviceResponse = null;
		try {
			webserviceResponse = (SubmitImport_FinalSubmit_Response_PgmXML) webserviceResponseAsObject;
		} catch ( Exception e ) {
			String msg = "Error. Fail to cast response as SubmitImport_Init_Response: "
					+ e.toString();
			LimelightSubmitImportWebserviceCallErrorException exception = new LimelightSubmitImportWebserviceCallErrorException( msg );
			exception.setFailToDecodeDataReceivedFromServer(true);
			throw exception;
		}
		return webserviceResponse;
	}

	//////////////////////////////////////////////////////////////////
	//    Internal Methods
	
	//  Util Methods
	
	/**
	 * @param object
	 * @return
	 * @throws Exception
	 */
	private ByteArrayOutputStream serializeObjectToXML_Return_ByteArrayOutputStream( Object object ) throws Exception {
		
		ByteArrayOutputStream byteArrayOutputStream_Result = new ByteArrayOutputStream(100000);
		try {
			//  Jackson JSON code for JSON testing
			//  JSON using Jackson
//			ObjectMapper mapper = new ObjectMapper();  //  Jackson JSON library object
//			requestXMLToSend = mapper.writeValueAsBytes( webserviceRequest );
			
			//  Marshal (write) the object to the byte array as XML
			Marshaller marshaller = jaxbContext.createMarshaller();
			marshaller.setProperty( Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE );
			marshaller.setProperty( Marshaller.JAXB_ENCODING, XML_ENCODING_CHARACTER_SET_STRING );
			try {
				marshaller.marshal( object, byteArrayOutputStream_Result );
			} catch ( Exception e ) {
				throw e;
			} finally {
				if ( byteArrayOutputStream_Result != null ) {
					byteArrayOutputStream_Result.close();
				}
			}
			//  Confirm that the generated XML can be parsed.
//			ByteArrayInputStream bais = new ByteArrayInputStream( byteArrayOutputStream_ToSend.toByteArray() );
//			Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
//			@SuppressWarnings("unused")
//			Object unmarshalledObject = unmarshaller.unmarshal( bais );

		} catch ( Exception e ) {
			String msg = "Error. Fail to encode request to send to server: "
					+ e.toString();
			LimelightSubmitImportWebserviceCallErrorException exception = new LimelightSubmitImportWebserviceCallErrorException( msg, e );
			exception.setFailToEncodeDataToSendToServer(true);
			throw exception;
		}
		
		return byteArrayOutputStream_Result;
	}

	////////////////////////
	
	//  Main Send methods
	
	/**
	 * @param webserviceRequest
	 * @param webserviceURL
	 * @return
	 * @throws Exception
	 */
	private Object callActualWebserviceOnServerSendObject( 
			Object webserviceRequest,
			String webserviceURL ) throws Exception {
		
		ByteArrayOutputStream byteArrayOutputStream_ToSend = serializeObjectToXML_Return_ByteArrayOutputStream( webserviceRequest );
		
		return callActualWebserviceOnServerSendByteArrayOrFileAsStreamReturnObject( 
				byteArrayOutputStream_ToSend, null /* fileToSendAsStream */, null /* headersToSend */, webserviceURL );
	}

	/**
	 * Send byte array or File to server as stream
	 * 
	 * bytesToSend or fileToSendAsStream must not be null and both cannot be not null
	 * 
	 * @param bytesToSend
	 * @param fileToSendAsStream
	 * @param webserviceURL
	 * @return
	 * @throws Exception
	 */
	private Object callActualWebserviceOnServerSendByteArrayOrFileAsStreamReturnObject( 
			ByteArrayOutputStream byteArrayOutputStream_ToSend,
			File fileToSendAsStream,
			Map<String,String> headersToSend,
			String webserviceURL ) throws Exception {

		Object webserviceResponseAsObject = null;
		
		byte[] serverResponseByteArray = 
				sendToServerSendByteArrayOrFileAsStream_GetByteArrayResponseFromServer(
						byteArrayOutputStream_ToSend,
						fileToSendAsStream, 
						headersToSend,
						webserviceURL );

		ByteArrayInputStream inputStreamBufferOfServerResponse = 
				new ByteArrayInputStream( serverResponseByteArray );
		// Unmarshal received XML into Java objects
		try {
			Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
//			final String inputStreamBufferOfServerResponse_String =
//					new String( serverResponseByteArray, StandardCharsets.UTF_8 );
			XMLInputFactory xmlInputFactory = xmlInputFactory_XXE_Safe_Creator();
			XMLStreamReader xmlStreamReader = xmlInputFactory.createXMLStreamReader(new StreamSource( inputStreamBufferOfServerResponse ) );
			webserviceResponseAsObject = unmarshaller.unmarshal( xmlStreamReader );
		} catch ( JAXBException e ) {
			LimelightSubmitImportWebserviceCallErrorException wcee = 
					new LimelightSubmitImportWebserviceCallErrorException( "JAXBException unmarshalling XML received from server at URL: " + webserviceURL, e );
			wcee.setFailToDecodeDataReceivedFromServer(true);
			wcee.setWebserviceURL( webserviceURL );
			throw wcee;
		}
		return webserviceResponseAsObject; 
	}
	
	
	/**
	 * @param byteArrayOutputStream_ToSend
	 * @param fileToSendAsStream
	 * @param webserviceURL
	 * @return
	 * @throws LimelightSubmitImportWebserviceCallErrorException
	 */
	private byte[] sendToServerSendByteArrayOrFileAsStream_GetByteArrayResponseFromServer(
			ByteArrayOutputStream byteArrayOutputStream_ToSend,
			File fileToSendAsStream, 
			Map<String,String> headersToSend,
			String webserviceURL) throws LimelightSubmitImportWebserviceCallErrorException {
		
		byte[] serverResponseByteArray = null;
		
		if ( ( ! ( byteArrayOutputStream_ToSend != null || fileToSendAsStream != null ) )
				|| (  byteArrayOutputStream_ToSend != null && fileToSendAsStream != null)) {
			String msg = "Exactly one of either byteArrayOutputStream_ToSend or fileToSendAsStream must be not null";
			LimelightSubmitImportWebserviceCallErrorException exception = new LimelightSubmitImportWebserviceCallErrorException( msg );
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
			LimelightSubmitImportWebserviceCallErrorException wcee = new LimelightSubmitImportWebserviceCallErrorException( "Exception creating URL object to connect to server.  URL: " + webserviceURL, e );
			wcee.setServerURLError(true);
			wcee.setWebserviceURL( webserviceURL );
			throw wcee;
		}
		//   Open connection to server
		URLConnection urlConnection;
		try {
			urlConnection = urlObject.openConnection();
		} catch (IOException e) {
			LimelightSubmitImportWebserviceCallErrorException wcee = new LimelightSubmitImportWebserviceCallErrorException( "Exception calling openConnection() on URL object to connect to server.  URL: " + webserviceURL, e );
			wcee.setServerURLError(true);
			wcee.setWebserviceURL( webserviceURL );
			throw wcee;
		}
		// Downcast URLConnection to HttpURLConnection to allow setting of HTTP parameters 
		if ( ! ( urlConnection instanceof HttpURLConnection ) ) {
			LimelightSubmitImportWebserviceCallErrorException wcee = new LimelightSubmitImportWebserviceCallErrorException( "Processing Error: Cannot cast URLConnection to HttpURLConnection" );
			wcee.setServerURLError(true);
			wcee.setWebserviceURL( webserviceURL );
			throw wcee;
		}
		HttpURLConnection httpURLConnection = null;
		try {
			httpURLConnection = (HttpURLConnection) urlConnection;
		} catch (Exception e) {
			LimelightSubmitImportWebserviceCallErrorException wcee = new LimelightSubmitImportWebserviceCallErrorException( "Processing Error: Cannot cast URLConnection to HttpURLConnection" );
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
				LimelightSubmitImportWebserviceCallErrorException wcee = new LimelightSubmitImportWebserviceCallErrorException( "Exception connecting to server at URL: " + webserviceURL, e );
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
				LimelightSubmitImportWebserviceCallErrorException wcee = new LimelightSubmitImportWebserviceCallErrorException( "IOException sending XML to server at URL: " + webserviceURL, e );
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
						LimelightSubmitImportWebserviceCallErrorException wcee = new LimelightSubmitImportWebserviceCallErrorException( "IOException closing output Stream to server at URL: " + webserviceURL, e );
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
									LimelightSubmitImportWebserviceCallErrorException wcee = new LimelightSubmitImportWebserviceCallErrorException( "Exception closing output Stream to server at URL: " + webserviceURL, e );
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
					String msgForStatusCode = "";
					if ( httpResponseCode == ERROR_REDIRECT_HTTP_RETURN_CODE ) {
						msgForStatusCode = 
								".  Status code 302 means that a redirect was returned.  Please the URL in a browser and note what was returned and update the url used based on that (only use first part like in existing URL configuration.  Base URL from main submit program:  " 
								+ webappServerBaseURL ;
					}
					LimelightSubmitImportWebserviceCallErrorException wcee = 
							new LimelightSubmitImportWebserviceCallErrorException( "Unsuccessful HTTP response code of " + httpResponseCode
									+ " connecting to server at URL: " + webserviceURL + msgForStatusCode );
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
				LimelightSubmitImportWebserviceCallErrorException wcee = 
						new LimelightSubmitImportWebserviceCallErrorException( "IOException getting HTTP response code from server at URL: " + webserviceURL, e );
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
				LimelightSubmitImportWebserviceCallErrorException wcee = 
						new LimelightSubmitImportWebserviceCallErrorException( "IOException receiving XML from server at URL: " + webserviceURL, e );
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
						LimelightSubmitImportWebserviceCallErrorException wcee = 
								new LimelightSubmitImportWebserviceCallErrorException( "IOException closing input Stream from server at URL: " + webserviceURL, e );
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
		return baos.toByteArray();
	}

	/**
	 * @return
	 */
	private XMLInputFactory xmlInputFactory_XXE_Safe_Creator() {
		
		XMLInputFactory xmlInputFactory = XMLInputFactory.newFactory();
		xmlInputFactory.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false);
		xmlInputFactory.setProperty(XMLInputFactory.SUPPORT_DTD, false);
		
		return xmlInputFactory;
	}
}
