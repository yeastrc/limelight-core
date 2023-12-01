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
package org.yeastrc.limelight.limelight_run_importer.on_import_finish;

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
import java.nio.charset.StandardCharsets;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamReader;
import javax.xml.transform.stream.StreamSource;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_run_importer.config.ImporterRunnerConfigData;
import org.yeastrc.limelight.limelight_run_importer.exceptions.LimelightCallWebserviceOnImportFinishException;
import org.yeastrc.limelight.limelight_shared.XMLInputFactory_XXE_Safe_Creator.XMLInputFactory_XXE_Safe_Creator;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.run_importer_to_web_app_objects.RunImporterToWebAppOnComplete_Request;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.run_importer_to_web_app_objects.RunImporterToWebAppOnComplete_Response;



/**
 * Call a web service on the Limelight Web app when finish running a single Import of Limelight XML file and/or Scan File(s)
 *
 */
public class On_ImportLimelightXMLScanFile_Finish_CallWebService {

	private static final Logger log = LoggerFactory.getLogger( On_ImportLimelightXMLScanFile_Finish_CallWebService.class );

//	private static final Charset XML_ENCODING_CHARACTER_SET = StandardCharsets.UTF_8;
	private static final String XML_ENCODING_CHARACTER_SET_STRING = StandardCharsets.UTF_8.toString();
	
	private static final int SUCCESS_HTTP_RETURN_CODE = 200;
	private static final String CONTENT_TYPE_SEND_RECEIVE = "application/xml";
	
	//  Keep in sync with class AA_RestWSControllerPaths_Constants in web app
	
	private static final String WEBSERVICE_SUB_URL = "o/rws/run-importer-import-finish";

	//  private constructor
	private On_ImportLimelightXMLScanFile_Finish_CallWebService() { }
	/**
	 * @return newly created instance
	 */
	public static On_ImportLimelightXMLScanFile_Finish_CallWebService getInstance() { 
		return new On_ImportLimelightXMLScanFile_Finish_CallWebService(); 
	}

	/**
	 * @param trackingId
	 * @param runId
	 * @throws Exception
	 */
	public void callLimelightWebServiceOnSingleImportFinish( int trackingId, int runId ) throws Exception {

		if ( log.isInfoEnabled() ) {
			log.info( "OnImportFinishCallWebService::callLimelightWebServiceOnSingleImportFinish: trackingId: " + trackingId + ", runId: " + runId );
		}
		
		String webappServerBaseURL = ImporterRunnerConfigData.getLimelightWebAppBaseURL();
		
		if ( StringUtils.isEmpty( webappServerBaseURL) ) {
			//  No URL to connect to to notify that import is finished
			return;  //  EARLY EXIT
		}
		
		if ( ! webappServerBaseURL.endsWith( "/" ) ) {
			webappServerBaseURL = webappServerBaseURL + "/";
		}

		String webserviceURL = webappServerBaseURL + WEBSERVICE_SUB_URL;

		if ( log.isInfoEnabled() ) {
			log.info( "OnImportFinishCallWebService::callLimelightWebServiceOnSingleImportFinish: webappServerBaseURL: " 
					+ webappServerBaseURL + ", webserviceURL: " + webserviceURL );
		}
		
		JAXBContext jaxbContext = 
				JAXBContext.newInstance( RunImporterToWebAppOnComplete_Request.class, RunImporterToWebAppOnComplete_Response.class );
		
		RunImporterToWebAppOnComplete_Request webserviceRequest = new RunImporterToWebAppOnComplete_Request();
		
		webserviceRequest.setTrackingId( trackingId );
		webserviceRequest.setRunId( runId );
		webserviceRequest.setSdFSOdsjaklOWQJLwuiroKXLNOuwoincvnio( true );
		
		Object webserviceResponseAsObject = null;
		
		try {
			webserviceResponseAsObject = callActualWebserviceOnServerSendObject( webserviceRequest, webserviceURL, jaxbContext );
			
		} catch ( LimelightCallWebserviceOnImportFinishException e ) {
			
			String msg = "callLimelightWebServiceOnSingleImportFinish: trackingId: " + trackingId + ", runId: " + runId;
			log.error( msg, e );
		
			throw e;
			
		} catch ( Exception e ) {
			
			String msg = "callLimelightWebServiceOnSingleImportFinish: trackingId: " + trackingId + ", runId: " + runId;
			log.error( msg, e );
			
			throw e;
		}
		
		if ( ! ( webserviceResponseAsObject instanceof RunImporterToWebAppOnComplete_Response ) ) {
			String msg = "callLimelightWebServiceOnSingleImportFinish: Response unmarshaled to class other than RunImporterToWebAppOnComplete_Response.  "
					+ " Unmarshaled Class: " + webserviceResponseAsObject.getClass()
					+ " trackingId: " + trackingId + ", runId: " + runId;
			LimelightCallWebserviceOnImportFinishException exception = new LimelightCallWebserviceOnImportFinishException( msg );
			exception.setFailToDecodeDataReceivedFromServer(true);
			
			log.error( msg, exception );

			throw exception;
		}
		RunImporterToWebAppOnComplete_Response webserviceResponse = null;
		try {
			webserviceResponse = (RunImporterToWebAppOnComplete_Response) webserviceResponseAsObject;
		} catch ( Exception e ) {
			String msg = "Error. Fail to cast response as RunImporterToWebAppOnComplete_Response: "
					+ e.toString()
					+ " trackingId: " + trackingId + ", runId: " + runId;
			LimelightCallWebserviceOnImportFinishException exception = new LimelightCallWebserviceOnImportFinishException( msg );
			exception.setFailToDecodeDataReceivedFromServer(true);

			log.error( msg, exception );

			throw exception;
		}
		
		if ( ! webserviceResponse.isStatusSuccess() ) {
			
			String msg = "Error. Server Response not StatusSuccess true" + " trackingId: " + trackingId + ", runId: " + runId;
			LimelightCallWebserviceOnImportFinishException exception = new LimelightCallWebserviceOnImportFinishException( msg );
			exception.setFailToDecodeDataReceivedFromServer(true);

			log.error( msg, exception );

			throw exception;
		}
		
//		return webserviceResponse;
	}

	//////////////////////////////////////////////////////////////////
	//    Internal Methods
	
	//  Util Methods
	
	/**
	 * @param object
	 * @return
	 * @throws Exception
	 */
	private ByteArrayOutputStream serializeObjectToXML_Return_ByteArrayOutputStream( Object object, JAXBContext jaxbContext ) throws Exception {
		
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
//			XMLInputFactory xmlInputFactory = XMLInputFactory_XXE_Safe_Creator.xmlInputFactory_XXE_Safe_Creator();
//			XMLStreamReader xmlStreamReader = xmlInputFactory.createXMLStreamReader(new StreamSource( bais ) );
//			Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
//			@SuppressWarnings("unused")
//			Object unmarshalledObject = unmarshaller.unmarshal( xmlStreamReader );

		} catch ( Exception e ) {
			String msg = "Error. Fail to encode request to send to server: "
					+ e.toString();
			LimelightCallWebserviceOnImportFinishException exception = new LimelightCallWebserviceOnImportFinishException( msg, e );
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
			String webserviceURL,
			JAXBContext jaxbContext ) throws Exception {
		
		ByteArrayOutputStream byteArrayOutputStream_ToSend = serializeObjectToXML_Return_ByteArrayOutputStream( webserviceRequest, jaxbContext );
		
//		final String toSendAsString = new String(  byteArrayOutputStream_ToSend.toByteArray(), StandardCharsets.UTF_8 );
//		
//		System.out.println( "toSendAsString: " + toSendAsString );
		
		return callActualWebserviceOnServerSendByteArrayOrFileAsStreamReturnObject( 
				byteArrayOutputStream_ToSend, null /* fileToSendAsStream */, null /* headersToSend */, webserviceURL, jaxbContext );
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
			String webserviceURL, 
			JAXBContext jaxbContext ) throws Exception {

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
			XMLInputFactory xmlInputFactory = XMLInputFactory_XXE_Safe_Creator.xmlInputFactory_XXE_Safe_Creator();
			XMLStreamReader xmlStreamReader = xmlInputFactory.createXMLStreamReader(new StreamSource( inputStreamBufferOfServerResponse ) );
			webserviceResponseAsObject = unmarshaller.unmarshal( xmlStreamReader );
		} catch ( JAXBException e ) {
			LimelightCallWebserviceOnImportFinishException wcee = 
					new LimelightCallWebserviceOnImportFinishException( "JAXBException unmarshalling XML received from server at URL: " + webserviceURL, e );
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
	 * @throws LimelightCallWebserviceOnImportFinishException
	 */
	private byte[] sendToServerSendByteArrayOrFileAsStream_GetByteArrayResponseFromServer(
			ByteArrayOutputStream byteArrayOutputStream_ToSend,
			File fileToSendAsStream, 
			Map<String,String> headersToSend,
			String webserviceURL) throws LimelightCallWebserviceOnImportFinishException {
		
		byte[] serverResponseByteArray = null;
		
		if ( ( ! ( byteArrayOutputStream_ToSend != null || fileToSendAsStream != null ) )
				|| (  byteArrayOutputStream_ToSend != null && fileToSendAsStream != null)) {
			String msg = "Exactly one of either byteArrayOutputStream_ToSend or fileToSendAsStream must be not null";
			LimelightCallWebserviceOnImportFinishException exception = new LimelightCallWebserviceOnImportFinishException( msg );
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
			LimelightCallWebserviceOnImportFinishException wcee = new LimelightCallWebserviceOnImportFinishException( "Exception creating URL object to connect to server.  URL: " + webserviceURL, e );
			wcee.setServerURLError(true);
			wcee.setWebserviceURL( webserviceURL );
			throw wcee;
		}
		//   Open connection to server
		URLConnection urlConnection;
		try {
			urlConnection = urlObject.openConnection();
		} catch (IOException e) {
			LimelightCallWebserviceOnImportFinishException wcee = new LimelightCallWebserviceOnImportFinishException( "Exception calling openConnection() on URL object to connect to server.  URL: " + webserviceURL, e );
			wcee.setServerURLError(true);
			wcee.setWebserviceURL( webserviceURL );
			throw wcee;
		}
		// Downcast URLConnection to HttpURLConnection to allow setting of HTTP parameters 
		if ( ! ( urlConnection instanceof HttpURLConnection ) ) {
			LimelightCallWebserviceOnImportFinishException wcee = new LimelightCallWebserviceOnImportFinishException( "Processing Error: Cannot cast URLConnection to HttpURLConnection" );
			wcee.setServerURLError(true);
			wcee.setWebserviceURL( webserviceURL );
			throw wcee;
		}
		HttpURLConnection httpURLConnection = null;
		try {
			httpURLConnection = (HttpURLConnection) urlConnection;
		} catch (Exception e) {
			LimelightCallWebserviceOnImportFinishException wcee = new LimelightCallWebserviceOnImportFinishException( "Processing Error: Cannot cast URLConnection to HttpURLConnection" );
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
				LimelightCallWebserviceOnImportFinishException wcee = new LimelightCallWebserviceOnImportFinishException( "Exception connecting to server at URL: " + webserviceURL, e );
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
					errorStreamContents= getErrorStreamContents( httpURLConnection, webserviceURL );
				} catch ( Exception ex ) {
				}
				LimelightCallWebserviceOnImportFinishException wcee = new LimelightCallWebserviceOnImportFinishException( "IOException sending XML to server at URL: " + webserviceURL, e );
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
							errorStreamContents= getErrorStreamContents( httpURLConnection, webserviceURL );
						} catch ( Exception ex ) {
						}
						LimelightCallWebserviceOnImportFinishException wcee = new LimelightCallWebserviceOnImportFinishException( "IOException closing output Stream to server at URL: " + webserviceURL, e );
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
										errorStreamContents= getErrorStreamContents( httpURLConnection, webserviceURL );
									} catch ( Exception ex ) {
									}
									LimelightCallWebserviceOnImportFinishException wcee = new LimelightCallWebserviceOnImportFinishException( "Exception closing output Stream to server at URL: " + webserviceURL, e );
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
						errorStreamContents= getErrorStreamContents( httpURLConnection, webserviceURL );
					} catch ( Exception ex ) {
					}
					LimelightCallWebserviceOnImportFinishException wcee = 
							new LimelightCallWebserviceOnImportFinishException( "Unsuccessful HTTP response code of " + httpResponseCode
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
					errorStreamContents= getErrorStreamContents( httpURLConnection, webserviceURL );
				} catch ( Exception ex ) {
				}
				LimelightCallWebserviceOnImportFinishException wcee = 
						new LimelightCallWebserviceOnImportFinishException( "IOException getting HTTP response code from server at URL: " + webserviceURL, e );
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
					errorStreamContents= getErrorStreamContents( httpURLConnection, webserviceURL );
				} catch ( Exception ex ) {
				}
				LimelightCallWebserviceOnImportFinishException wcee = 
						new LimelightCallWebserviceOnImportFinishException( "IOException receiving XML from server at URL: " + webserviceURL, e );
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
							errorStreamContents= getErrorStreamContents( httpURLConnection, webserviceURL );
						} catch ( Exception ex ) {
						}
						LimelightCallWebserviceOnImportFinishException wcee = 
								new LimelightCallWebserviceOnImportFinishException( "IOException closing input Stream from server at URL: " + webserviceURL, e );
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
	private byte[] getErrorStreamContents(
			
			HttpURLConnection httpURLConnection,
			String webserviceURL ) throws IOException {
		
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
			
			String baos_String = "Unable to convert Syserr from Limelight Webapp to Java String.";
			
			try {
				baos_String = baos.toString();
				
			} catch ( Throwable t ) {
				
				
			}
			
			log.warn( "Syserr returned from calling Limelight Web App Webservice. webserviceURL:" + webserviceURL + ", Size: " + baos.size() + ", Syserr Contents: "  + baos_String );
		}
		return baos.toByteArray();
	}

}
