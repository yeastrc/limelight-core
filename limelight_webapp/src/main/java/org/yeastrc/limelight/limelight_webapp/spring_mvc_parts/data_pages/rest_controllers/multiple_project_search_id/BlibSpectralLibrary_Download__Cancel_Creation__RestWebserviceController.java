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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.multiple_project_search_id;


import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Blib Spectral Library File Download - CANCEL the creation of the file 
 *  
 * 
 */
@RestController
public class BlibSpectralLibrary_Download__Cancel_Creation__RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( BlibSpectralLibrary_Download__Cancel_Creation__RestWebserviceController.class );

	private static final int SUCCESS_HTTP_RETURN_CODE = 200;
	private static final String CONTENT_TYPE_SEND_RECEIVE = "application/json";
	
	private static final String WEBSERVICE_PATH =  "/cancelConversionRequest";
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject; // For response from called webservice
	
	/**
	 * 
	 */
	public BlibSpectralLibrary_Download__Cancel_Creation__RestWebserviceController() {
		super();
		//		log.warn( "constructor no params called" );
	}

	//  Convert result object graph to JSON in byte[] in the controller body so can cache it

	//  These 2 annotations work the same

	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.

	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.BLIB_SPECTRAL_LIBRARY_DOWNLOAD__CANCEL_CREATION__REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

	//	@RequestMapping( 
	//			path = AA_RestWSControllerPaths_Constants.,
	//			method = RequestMethod.POST,
	//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

	public @ResponseBody ResponseEntity<byte[]>  searchNameList_From_ProjectSearchIds(

			@RequestBody byte[] postBody,
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse
			) throws Exception {

		try {
			//    		log.warn( "searchNameList_From_ProjectSearchIds(...) called" );

			//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
			//    to return specific error to web app JS code if webserviceSyncTracking is not current value
			validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

			//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

			if ( postBody == null ) {
				log.warn( "No Post Body" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

			if ( webserviceRequest.projectSearchIdList == null || webserviceRequest.projectSearchIdList.isEmpty() ) {
				log.warn( "No webserviceRequest.projectSearchIdList entries" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			if ( webserviceRequest.requestId == null || webserviceRequest.requestId.length() == 0 ) {
				log.warn( "webserviceRequest.requestId is missing or empty string" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			////////////////

			//  AUTH - validate access

			//  throws an exception if access is not valid that is turned into a webservice response by Spring

			//  Comment out result since not use it
			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
					validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( webserviceRequest.projectSearchIdList, httpServletRequest );

			////////////////

			Integer projectId = null;

			{
				List<Integer> projectIds = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds();

				if (projectIds.isEmpty() ) {
					String msg = "validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds(); returned empty list.";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
				if (projectIds.size() > 1 ) {
					String msg = "validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds(); returned > 1 entry.";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}

				projectId = projectIds.get(0);
			}	


			Request_To_BlibCreator_Cancel_Webservice_Root request_To_BlibCreator_Webservice_Root = new Request_To_BlibCreator_Cancel_Webservice_Root( projectId, webserviceRequest.requestId );

			byte[] request_To_BlibCreator_Webservice_Root_AsJSON = marshalObjectToJSON.getJSONByteArray( request_To_BlibCreator_Webservice_Root );

			sendRequestToServer( request_To_BlibCreator_Webservice_Root_AsJSON );

			WebserviceResult webserviceResult = new WebserviceResult();

			webserviceResult.status= true;

			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {

			//  only rethrow Error Response Exceptions 
			throw e;

		} catch ( Throwable e ) {
			String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
		}
	}


	/**
	 * @param request_To_BlibCreator_Webservice_Root_AsJSON
	 * @throws Exception 
	 */
	private void sendRequestToServer( byte[] request_To_BlibCreator_Webservice_Root_AsJSON ) throws Exception {


		String webservice_Base_URL =
				configSystemDAO.getConfigValueForConfigKey(
						ConfigSystemsKeysSharedConstants.BLIB_SPECTRAL_LIBRARY_FILE_CREATION_WEB_SERVICE_BASE_URL );
		
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

			throw e;
		}
		//   Open connection to server
		URLConnection urlConnection;
		try {
			urlConnection = urlObject.openConnection();
		} catch (IOException e) {
			throw e;
		}
		// Downcast URLConnection to HttpURLConnection to allow setting of HTTP parameters 
		if ( ! ( urlConnection instanceof HttpURLConnection ) ) {
			throw new LimelightInternalErrorException( "( ! ( urlConnection instanceof HttpURLConnection ) )" );
		}
		HttpURLConnection httpURLConnection = null;
		try {
			httpURLConnection = (HttpURLConnection) urlConnection;
		} catch (Exception e) {
			throw e;
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
				throw e;
			}
			//  Send bytes to server
			OutputStream outputStream = null;
			FileInputStream fileInputStream = null; // for when send file
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
				throw e;
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
						throw e;					} finally {
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
										throw e;
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
					throw new LimelightInternalErrorException( "( httpResponseCode != SUCCESS_HTTP_RETURN_CODE )  httpURLConnection.getResponseCode(): " + httpURLConnection.getResponseCode() );  // TODO   Do Something Better 
				}
			} catch ( IOException e ) {
				byte[] errorStreamContents = null;
				try {
					errorStreamContents= getErrorStreamContents( httpURLConnection );
				} catch ( Exception ex ) {
				}
				throw e;
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
				throw e;
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
						throw e;
					}
				}
			}

			byte[] serverResponseByteArray = outputStreamBufferOfServerResponse.toByteArray();
			
//			String serverResponseBytesToString = new String( serverResponseByteArray );
			
			Object object = unmarshalJSON_ToObject.getObjectFromJSONByteArray(serverResponseByteArray, Response_From_BlibCreator_Cancel_Webservice_Root.class);
			
			if ( ! ( object instanceof Response_From_BlibCreator_Cancel_Webservice_Root ) ) {
				String msg = "( ! ( object instanceof Response_From_BlibCreator_Cancel_Webservice_Root ) )";
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			
			Response_From_BlibCreator_Cancel_Webservice_Root response = (Response_From_BlibCreator_Cancel_Webservice_Root) object;
			
			if ( StringUtils.isNotEmpty( response.cancel_message ) ) {
				
				log.warn("Cancel Webservice call returned response.cancel_message: " + response.cancel_message );
			}



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

	//   Request_To_BlibCreator_Cancel_Webservice  Request Class to be serialized for Webservice call

	public static class Request_To_BlibCreator_Cancel_Webservice_Root {

		int project_id;
		String request_id;

		/**
		 * Constructory
		 * 
		 * @param project_id
		 * @param spectral_data
		 */
		public Request_To_BlibCreator_Cancel_Webservice_Root(

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

	//   Request_To_BlibCreator_Cancel_Webservice - Response Class to be deserialized from Webservice call

	public static class Response_From_BlibCreator_Cancel_Webservice_Root {

		private String cancel_message;

		public void setCancel_message(String cancel_message) {
			this.cancel_message = cancel_message;
		}
	}
	
	////////////////////////////////////////
	////////////////////////////////////////


	/**
	 * 
	 *
	 */
	public static class WebserviceRequest {

		private List<Integer> projectSearchIdList;
		private String requestId;
		
		public void setProjectSearchIdList(List<Integer> projectSearchIdList) {
			this.projectSearchIdList = projectSearchIdList;
		}
		public void setRequestId(String requestId) {
			this.requestId = requestId;
		}
	}

	/**
	 * IGNORED by client code
	 *
	 */
	public static class WebserviceResult {

		boolean status;

		public boolean isStatus() {
			return status;
		}
	}
}


