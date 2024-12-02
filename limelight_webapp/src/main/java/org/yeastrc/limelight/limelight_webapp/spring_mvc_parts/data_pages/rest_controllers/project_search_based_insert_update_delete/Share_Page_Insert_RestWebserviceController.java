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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.project_search_based_insert_update_delete;

import java.net.URL;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Base64;
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
import org.yeastrc.limelight.limelight_webapp.dao.UrlShortenerDAO.LogDuplicateSQLException;
import org.yeastrc.limelight.limelight_webapp.dao.UrlShortenerDAO_IF;
import org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services.UrlShortener_Insert_UsingDBTransactionServiceIF;
import org.yeastrc.limelight.limelight_webapp.db_dto.UrlShortenerAssocExperimentIdDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UrlShortenerAssocProjectSearchIdDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.UrlShortenerDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSessionManager;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Insert a Shared Page (Shortened URL is returned)
 *
 */
@RestController
public class Share_Page_Insert_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Share_Page_Insert_RestWebserviceController.class );

	private static final int RETRY_COUNT_MAX_ON_DUPLICATE_SHORT_KEY = 30;
	
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.INSERT_SHARED_PAGE_REST_WEBSERVICE_CONTROLLER;
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private UserSessionManager userSessionManager;
	
	@Autowired
	private UrlShortenerDAO_IF urlShortenerDAO;
	
	@Autowired
	private UrlShortener_Insert_UsingDBTransactionServiceIF urlShortener_Insert_UsingDBTransactionService;
	
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Share_Page_Insert_RestWebserviceController() {
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
					+ CONTROLLER_PATH
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod(

    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {

		String referrerURLString = null;
		
    	try {
    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		
			// ensure referrer was on the same server as this Action to prevent abuse
    		
			referrerURLString = httpServletRequest.getHeader("referer");
			if( StringUtils.isEmpty( referrerURLString ) ) {
				log.error( "referrer host is empty string or null.  Returning Invalid Parameters" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
    		URL referrerURL = null;
			try {
				referrerURL = new URL( referrerURLString );
			} catch (Exception e ) {
				log.error( "Exception converting referrerURLString to URL object.  Returning Invalid Parameters."
						+ "  referrerURLString: " + referrerURLString, e );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			String thisURLString = httpServletRequest.getRequestURL().toString();
			
			URL thisURL = null;
			try {
				thisURL = new URL( thisURLString );
			} catch (Exception e ) {
				log.error( "Exception converting thisURLString to URL object.  Returning Invalid Parameters."
						+ "  thisURLString: " + thisURLString, e );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			if( !referrerURL.getHost().equals( thisURL.getHost() ) ) {
				log.error( "This host and referrer host do not match.  Returning Invalid Parameters."
						+ "  referrer: " + referrerURLString + ", thisURL: " + thisURLString );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );
    		
    		List<Integer> projectSearchIds = webserviceRequest.getProjectSearchIds();
    		Integer experimentId = webserviceRequest.getExperimentId();
        	final String pageControllerPathFromWebserviceRequest = webserviceRequest.getPageControllerPath();
        	final String pageCurrentURL_StartAtPageController = webserviceRequest.getPageCurrentURL_StartAtPageController();
        	final String searchDataLookupParametersCode = webserviceRequest.getSearchDataLookupParametersCode();

    		if ( projectSearchIds == null || projectSearchIds.isEmpty() ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		for ( Integer projectSearchId : projectSearchIds ) {
    			if ( projectSearchId == null  ) {
	    			log.warn( "Project Search Id in projectSearchIds is null" );
	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}
    		}

        	if ( StringUtils.isEmpty( pageControllerPathFromWebserviceRequest ) ) {
    			log.warn( "No pageControllerPath" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
        	}
        	if ( StringUtils.isEmpty( pageCurrentURL_StartAtPageController ) ) {
    			log.warn( "No pageCurrentURL_StartAtPageController" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
        	}
        	
        	//  Must have searchDataLookupParametersCode or experimentId.  May have both
        	if ( StringUtils.isEmpty( searchDataLookupParametersCode ) && ( experimentId == null ) ) {
    			log.warn( "No searchDataLookupParametersCode or experimentId.  Must have at least one.  May have both." );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
        	}

    		//  Validate pageCurrentURL_StartAtPageController starts with pageControllerPath 
    		
    		if ( ! pageCurrentURL_StartAtPageController.startsWith( pageControllerPathFromWebserviceRequest ) ) {
    			log.warn( "pageCurrentURL_StartAtPageController does not start with pageControllerPath.  pageCurrentURL_StartAtPageController: "
    					+ pageCurrentURL_StartAtPageController
    					+ ", pageControllerPath: " + pageControllerPathFromWebserviceRequest
    					+ ". projectSearchIds: " + projectSearchIds );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		//  Validate pageCurrentURL_StartAtPageController are allowed
    		
    		String pageControllerPathInURL = null;
    			
    		for ( String allowedControllerPath : AA_PageControllerPaths_Constants.PATHS_ALLOWED_FOR_SHARE_PAGE ) {

    			if ( pageCurrentURL_StartAtPageController.startsWith( allowedControllerPath ) ) {
    				pageControllerPathInURL = allowedControllerPath;
    				break;
    			}
    		}
    		if ( pageControllerPathInURL == null ) {
    			log.warn( "pageCurrentURL_StartAtPageController does not start an allowed controller path.  pageCurrentURL_StartAtPageController: "
    					+ pageCurrentURL_StartAtPageController
    					+ ". projectSearchIds: " + projectSearchIds );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		

			String shortenedUrlKey = urlShortenerDAO.getFirstShortenedURLByURL( pageCurrentURL_StartAtPageController );

			if ( shortenedUrlKey == null ) {
				// Not already in the database so add it.
	    		shortenedUrlKey = createDBRecordsAndSave(httpServletRequest, projectSearchIds, experimentId, pageCurrentURL_StartAtPageController,
						searchDataLookupParametersCode, pageControllerPathInURL, shortenedUrlKey);
			}
			
			//  Generate full URL to shortenedUrlKey
			String shortenedUrl = null;
			{
				String currentURL = httpServletRequest.getRequestURL().toString();
				int controllerPathStart = currentURL.indexOf( CONTROLLER_PATH );
				String currentURLBeforeControllerPath = currentURL.substring( 0, controllerPathStart );
			
				shortenedUrl = currentURLBeforeControllerPath 
						+ AA_PageControllerPaths_Constants.URL_SHORTENER_REDIRECT_PAGE_CONTROLLER
						+ AA_PageControllerPaths_Constants.PATH_SEPARATOR
						+ shortenedUrlKey; // TODO NOT correct
			}

    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.status = true; // value ignored in Javascript code
    		webserviceResult.shortenedUrlKey = shortenedUrlKey;
    		webserviceResult.shortenedUrl = shortenedUrl;

    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

    	} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
    		
    		//  only rethrow Error Response Exceptions 
    		throw e;
    		
    	} catch ( Exception e ) {
    		String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
    	}
    }

	/**
	 * @param httpServletRequest
	 * @param projectSearchIds
	 * @param pageCurrentURL_StartAtPageController
	 * @param searchDataLookupParametersCode
	 * @param pageControllerPathInURL
	 * @param shortenedUrlKey
	 * @return
	 */
	private String createDBRecordsAndSave(
			HttpServletRequest httpServletRequest, 
			List<Integer> projectSearchIds,
			Integer experimentId,
			final String pageCurrentURL_StartAtPageController, 
			final String searchDataLookupParametersCode,
			String pageControllerPathInURL, 
			String shortenedUrlKey) {
		
		UserSession userSession = userSessionManager.getUserSession( httpServletRequest );

		Integer userId = null;
		
		if ( userSession != null ) {
			userId = userSession.getUserId();
		}
		
		String remoteAddr = httpServletRequest.getRemoteAddr();
		
		UrlShortenerDTO item = new UrlShortenerDTO();
		
		item.setPageControllerPath( pageControllerPathInURL );
		
		item.setUserId(userId);
		item.setUrlStartAtPageControllerPath( pageCurrentURL_StartAtPageController );
		item.setSearchDataLookupParamsString( searchDataLookupParametersCode );
		item.setRemoteUserIPAddress( remoteAddr );
		
		boolean saveSuccessful = false;
		int saveAttemptCounter = 0;
		

		List<UrlShortenerAssocProjectSearchIdDTO> childrenProjectSearchIds = new ArrayList<>( projectSearchIds.size() );
		for ( Integer projectSearchId : projectSearchIds ) {
			UrlShortenerAssocProjectSearchIdDTO child = new UrlShortenerAssocProjectSearchIdDTO();
			child.setProjectSearchId( projectSearchId );
			childrenProjectSearchIds.add( child );
		}
		
		UrlShortenerAssocExperimentIdDTO childExperimentId = null;
		if ( experimentId != null ) {
			childExperimentId = new UrlShortenerAssocExperimentIdDTO();
			childExperimentId.setExperimentId( experimentId );
		}
				
		//  Loop to do retries since may create shortenedUrlKey that collides with existing records
		while ( ( ! saveSuccessful ) ) {
			saveAttemptCounter++;
			try {
				shortenedUrlKey = getShortenedKey();
				item.setShortenedUrlKey(shortenedUrlKey);
				//  Only log insert Duplicate error in DAO if last attempt
				LogDuplicateSQLException logDuplicateSQLException = LogDuplicateSQLException.FALSE;
				if ( saveAttemptCounter >=  RETRY_COUNT_MAX_ON_DUPLICATE_SHORT_KEY ) {
					logDuplicateSQLException = LogDuplicateSQLException.TRUE;
				}

				urlShortener_Insert_UsingDBTransactionService.addUrlShortener( item, childrenProjectSearchIds, childExperimentId, logDuplicateSQLException );

				saveSuccessful = true;

			} catch ( org.springframework.dao.DuplicateKeyException e ) {

				if ( saveAttemptCounter >=  RETRY_COUNT_MAX_ON_DUPLICATE_SHORT_KEY ) {
					String msg = "Exceeded max number of attempts to insert and get Duplicate Key error."
							+ "  Max # = " + RETRY_COUNT_MAX_ON_DUPLICATE_SHORT_KEY
							+ ", current shortenedUrlKey: " + shortenedUrlKey;
					log.error( msg, e );
					throw new LimelightInternalErrorException( msg );
				}
			}
		}
		return shortenedUrlKey;
	}
    

	/**
	 * @return
	 */
	private String getShortenedKey() {

		StringBuilder randomStringSB = new StringBuilder( 16 );

		final int RETURN_LENGTH = 10;
		
		int insertedCharacterCount = 0;
		
		for ( int j = 0; j < 200; j++ ) { // for loop just provides an upper bound
			double tosKeyMultiplier = Math.random();
			if ( tosKeyMultiplier < 0.5 ) {
				tosKeyMultiplier += 0.5;
			}
			long tosKeyLong = (long) ( System.currentTimeMillis() * tosKeyMultiplier );
			ByteBuffer tosKeyBuffer = ByteBuffer.allocate(Long.BYTES);
			tosKeyBuffer.putLong( tosKeyLong );
			
			String encodedLong = Base64.getEncoder().encodeToString( tosKeyBuffer.array() );
			// Drop first 6 characters and last character
			String encodedLongExtract = encodedLong.substring( 6, encodedLong.length() - 1 );
			
			char[] encodedLongArray = encodedLongExtract.toCharArray();
			
			for ( char entry : encodedLongArray ) {
				if ( // ( entry >= 'a' && entry <= 'z' )
						// || 
						( entry >= 'A' && entry <= 'Z' )
						|| ( entry >= '1' && entry <= '9' ) ) {
					//  Only take a-z, A-Z, 1-9.

					if ( entry == 'a' || entry == 'e' || entry == 'i' || entry == 'o' || entry == 'u' || entry == 'y' 
							|| entry == 'A' || entry == 'E' || entry == 'I' || entry == 'O' || entry == 'U' || entry == 'Y' ) {
						// Skip all vowels so cannot spell words
						continue;
					}
					
					if ( entry == 'l' || entry == 'I' ) {
						//  Not take lower case l and upper case I since in many fonts they look too similar
						continue;
					}
				
					randomStringSB.append( entry );
					insertedCharacterCount++;
					if ( insertedCharacterCount >= RETURN_LENGTH ) {
						break;
					}
				}
			}
			if ( insertedCharacterCount >= RETURN_LENGTH ) {
				break;
			}
		}
		if ( insertedCharacterCount < RETURN_LENGTH ) {
			throw new LimelightInternalErrorException("Not find enough letters and numbers for randomString. insertedCharacterCount: " + insertedCharacterCount );
		}
		String randomString = randomStringSB.toString();

		return randomString;
	}
    
    ////////////////////////////////

    /**
     * 
     *
     */
    public static class WebserviceRequest {
    	
    	private List<Integer> projectSearchIds;
    	private Integer experimentId;  //  Only for experiment pages
    	private String pageControllerPath;
    	private String pageCurrentURL_StartAtPageController;
    	private String searchDataLookupParametersCode;
    	
		public List<Integer> getProjectSearchIds() {
			return projectSearchIds;
		}
		public void setProjectSearchIds(List<Integer> projectSearchIds) {
			this.projectSearchIds = projectSearchIds;
		}
		public String getPageControllerPath() {
			return pageControllerPath;
		}
		public void setPageControllerPath(String pageControllerPath) {
			this.pageControllerPath = pageControllerPath;
		}
		public String getPageCurrentURL_StartAtPageController() {
			return pageCurrentURL_StartAtPageController;
		}
		public void setPageCurrentURL_StartAtPageController(String pageCurrentURL_StartAtPageController) {
			this.pageCurrentURL_StartAtPageController = pageCurrentURL_StartAtPageController;
		}
		public String getSearchDataLookupParametersCode() {
			return searchDataLookupParametersCode;
		}
		public void setSearchDataLookupParametersCode(String searchDataLookupParametersCode) {
			this.searchDataLookupParametersCode = searchDataLookupParametersCode;
		}
		public Integer getExperimentId() {
			return experimentId;
		}
		public void setExperimentId(Integer experimentId) {
			this.experimentId = experimentId;
		}

    }
    
    public static class WebserviceResult {
    	private boolean status;
    	private String shortenedUrlKey;
    	private String shortenedUrl;

		public boolean isStatus() {
			return status;
		}

		public void setStatus(boolean status) {
			this.status = status;
		}

		public String getShortenedUrlKey() {
			return shortenedUrlKey;
		}

		public void setShortenedUrlKey(String shortenedUrlKey) {
			this.shortenedUrlKey = shortenedUrlKey;
		}

		public String getShortenedUrl() {
			return shortenedUrl;
		}

		public void setShortenedUrl(String shortenedUrl) {
			this.shortenedUrl = shortenedUrl;
		}

    }
    
    
}


