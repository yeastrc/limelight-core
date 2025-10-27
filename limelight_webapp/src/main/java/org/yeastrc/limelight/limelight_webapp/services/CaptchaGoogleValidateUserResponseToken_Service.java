/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_webapp.services;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants.ConfigSystemsKeysConstants;
import org.yeastrc.limelight.limelight_webapp.constants.JSONStringCharsetConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 
 *
 */
@Component
public class CaptchaGoogleValidateUserResponseToken_Service implements CaptchaGoogleValidateUserResponseToken_Service_IF {

	private static final Logger log = LoggerFactory.getLogger( CaptchaGoogleValidateUserResponseToken_Service.class );
	

	private static final String URL = "https://www.google.com/recaptcha/api/siteverify";
	private static final String FORM_PARAM_SECRET_KEY = "secret";
	private static final String FORM_PARAM_USER_RESPONSE_TOKEN = "response";
	private static final String FORM_PARAM_USER_REMOTE_IP = "remoteip";
	

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	///  Potential code if want to drop Apache HTTP Client dependency.  From a StackOverflow answer
	
//	// Using java.net.URL and  
//	　　// java.net.URLConnection  
//	　　URL url = new URL("http://AAA.com/sss");   
//	　　URLConnection connection = url.openConnection();
//	　　connection.setDoOutput(true);  
//	　　OutputStreamWriter out = newOutputStreamWriter(uc.getOutputStream(), "8859_1");   
//	　　out.write("param1=value1&param2=value2");   
//	　　// remember to clean up   
//	　　out.flush();   
//	　　out.close();

	
//	secret	Required. The shared key between your site and ReCAPTCHA.
//	response	Required. The user response token provided by the reCAPTCHA to the user and provided to your site on.
//	remoteip	Optional. The user's IP address.
	
	/**
	 * @param userResponseToken
	 * @param userRemoteIP
	 * @return
	 * @throws Exception
	 */
	@Override
	public boolean isCaptchaUserResponseTokenValid( String userResponseToken, String userRemoteIP ) throws Exception {
		HttpClient client = null;
		HttpPost post = null;
		List<NameValuePair> nameValuePairs = null;
		HttpResponse response = null;
		InputStream responseInputStream = null;
		ValidationResponse validationResponse = null;
		try {

			String google_RecaptchaSecretKey =
					configSystemDAO.getConfigValueForConfigKey(
							ConfigSystemsKeysConstants.GOOGLE_RECAPTCHA_SECRET_KEY_KEY );

			if ( google_RecaptchaSecretKey == null || StringUtils.isNotEmpty( google_RecaptchaSecretKey.trim() ) ) {
			}
			client = new DefaultHttpClient();
			post = new HttpPost( URL );
			nameValuePairs = new ArrayList<NameValuePair>(5);
			nameValuePairs.add(new BasicNameValuePair( FORM_PARAM_SECRET_KEY, google_RecaptchaSecretKey ) );
			nameValuePairs.add(new BasicNameValuePair(FORM_PARAM_USER_RESPONSE_TOKEN, userResponseToken ) );
			nameValuePairs.add(new BasicNameValuePair(FORM_PARAM_USER_REMOTE_IP, userRemoteIP ) );
			post.setEntity(new UrlEncodedFormEntity(nameValuePairs));
			response = client.execute(post);
			int httpStatusCode = response.getStatusLine().getStatusCode();
			if ( log.isDebugEnabled() ) {
				log.debug("Send Email: Http Response Status code: " + httpStatusCode );
			}
			responseInputStream = response.getEntity().getContent();
			//  optional code for viewing response as string
			//  responseBytes must be large enough for the whole response, or code something to create larger array and copy to the larger array
			byte[] responseBytes = new byte[10000000];
			int responseBytesOffset = 0;
			int responseBytesLength = responseBytes.length;
			int totalBytesRead = 0;
			while (true) {
				int bytesRead = responseInputStream.read(responseBytes, responseBytesOffset, responseBytesLength );
				if ( bytesRead == -1 ) {
					break;
				}
				totalBytesRead += bytesRead;
				responseBytesOffset += bytesRead;
				responseBytesLength -= bytesRead;
			}
			if ( httpStatusCode != HttpStatus.SC_OK ) {
				String msg = "Failed to validate.  Http Response Status code: " + httpStatusCode ;
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
			
			byte[] responseBytesJustData = Arrays.copyOf(responseBytes, totalBytesRead);
			ObjectMapper jacksonJSON_Mapper = new ObjectMapper();  //  Jackson JSON library object
//			validationResponse = jacksonJSON_Mapper.readValue( responseInputStream, ValidationResponse.class );

			try {
				validationResponse = jacksonJSON_Mapper.readValue( responseBytesJustData, ValidationResponse.class );
			} catch (Exception e ) {
				
				log.error( "Fail parsing webservice response from Google ReCaptcha URL " + URL, e );
				throw e;
			}
			if ( validationResponse.migrationWarning != null ) {
				log.warn( "Google ReCaptcha response contains property 'migration-warning' with value: " + validationResponse.migrationWarning );
			}
			
			if ( validationResponse.errorCodes != null && validationResponse.errorCodes.length > 0 ) {
				//  errorCodes indicates 
				StringBuilder allErrorCodesSB = new StringBuilder( 1000 );
				allErrorCodesSB.append( "Google Captcha Response contains errorCodes: " );
				allErrorCodesSB.append( "validationResponse.success: " );
				allErrorCodesSB.append( Boolean.toString( validationResponse.success ) );
				allErrorCodesSB.append( ", userRemoteIP: " ); 
				allErrorCodesSB.append( userRemoteIP );
				allErrorCodesSB.append( ", Error codes returned: " );
				boolean firstErrorCode = true;
				for (  String errorCode : validationResponse.errorCodes ) {
					if ( firstErrorCode ) {
						firstErrorCode = false;
					} else {
						allErrorCodesSB.append( ", ");
					}
					allErrorCodesSB.append( "\"" );
					allErrorCodesSB.append( errorCode );
					allErrorCodesSB.append( "\"" );
				}
				String allErrorCodes = allErrorCodesSB.toString();
				String responseAsString = new String(responseBytesJustData, JSONStringCharsetConstants.JSON_STRING_CHARSET_UTF_8 );
				String msg = "Google Captcha returned error codes (all listed, comma delimited): " + allErrorCodes 
						+ "    Full response string: " + responseAsString;
				log.warn( msg );
				if ( validationResponse.success ) {
					String msg2 = "ERROR: validationResponse.success is true but validationResponse.errorCodes has entries: " + allErrorCodes ;
					log.error( msg2 );
					throw new LimelightInternalErrorException( msg2 );
				}
				return false; // return false since validationResponse.success == false
				
			}
		} catch (Exception e) {
			log.error("Failed to validate.", e );
			throw e;
		} finally { 
			if ( responseInputStream != null ) {
				responseInputStream.close();
			}
		}
		return validationResponse.success;
	}
	
	//  Possible strings for "error-codes"  from https://developers.google.com/recaptcha/docs/verify
	//	missing-input-secret	The secret parameter is missing.
	//	invalid-input-secret	The secret parameter is invalid or malformed.
	//	missing-input-response	The response parameter is missing.
	//	invalid-input-response	The response parameter is invalid or malformed.
	/**
	 * 
	 *
	 */
	private static class ValidationResponse {
		private boolean success;
		@SuppressWarnings("unused")
		private String challenge_ts;
		@SuppressWarnings("unused")
		private String hostname;
		@JsonProperty("error-codes")
		private String[] errorCodes;
		@SuppressWarnings("unused")
		@JsonProperty("migration-warning")
		private String migrationWarning;
		
		
		@SuppressWarnings("unused")
		public void setSuccess(boolean success) {
			this.success = success;
		}
		@SuppressWarnings("unused")
		public void setChallenge_ts(String challenge_ts) {
			this.challenge_ts = challenge_ts;
		}
		@SuppressWarnings("unused")
		public void setHostname(String hostname) {
			this.hostname = hostname;
		}
		@SuppressWarnings("unused")
		public void setErrorCodes(String[] errorCodes) {
			this.errorCodes = errorCodes;
		}
//		"success": true|false,
//		  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
//		  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
//		  "error-codes": [...]        // optional
		@SuppressWarnings("unused")
		public String getMigrationWarning() {
			return migrationWarning;
		}
		@SuppressWarnings("unused")
		public void setMigrationWarning(String migrationWarning) {
			this.migrationWarning = migrationWarning;
		}
	}
}
