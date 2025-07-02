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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.single_project_search_id;


import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_Utils;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchSubSearchGroupId_PsmId_ALL_For_SearchId__IncludesDecoys_Searcher.SearchSubSearchGroupId_PsmId_For_SearchId_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchSubSearchGroupId_PsmId_ALL_For_SearchId__IncludesDecoys_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.Gzip_ByteArray_To_ByteArray_IF;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * 
 * !!!  WARNING:  Webservice Response is CACHED  !!!!
 * 
 * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
 * 
 * 
 * 
 * Retrieve Sub Search Group Id, PSM Id for ALL for Project Search ID.  NOT filtered on Search Criteria or Reported Peptide Ids
 */
@RestController
public class SearchSubSearchGroupId_PsmId_NOT_FIltered_Single_ProjSearchID_RestWebserviceController 

implements
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
  
	private static final Logger log = LoggerFactory.getLogger( SearchSubSearchGroupId_PsmId_NOT_FIltered_Single_ProjSearchID_RestWebserviceController.class );

	/**
	 * Path for this Controller.  !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
	 */
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.SUB_SEARCH_GROUP_ID_PSM_ID__NOT_FILTERED__FOR_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0004;
	
	/**
	 * Path, updated for use by Cached Response Mgmt ( Cached_WebserviceResponse_Management )
	 */
	private static final String CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT = Cached_WebserviceResponse_Management_Utils.translate_ControllerPath_For_CachedResponseMgmt( CONTROLLER_PATH );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private Cached_WebserviceResponse_Management_IF cached_WebserviceResponse_Management;

	@Autowired
	private Gzip_ByteArray_To_ByteArray_IF gzip_ByteArray_To_ByteArray;
	
	@Autowired
	private RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF restControllerUtils__Request_Accept_GZip_Response_Set_GZip;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private SearchSubSearchGroupId_PsmId_ALL_For_SearchId__IncludesDecoys_Searcher_IF searchSubSearchGroupId_PsmId_ALL_For_SearchId__IncludesDecoys_Searcher;
		
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public SearchSubSearchGroupId_PsmId_NOT_FIltered_Single_ProjSearchID_RestWebserviceController() {
		super();
//		log.warn( "constructor no params called" );
	}

	/* 
	 * Spring LifeCycle Method
	 * 
	 * (non-Javadoc)
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		try {
			cached_WebserviceResponse_Management.registerControllerPathForCachedResponse_RequiredToCallAtWebappStartup( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, this );
			
		} catch (Exception e) {
			String msg = "In afterPropertiesSet(): Exception in processing";
			log.error(msg);
			throw e;
		}
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
    	
    	try {
//    		log.warn( "peptideView(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs
    		
    		if ( postBody == null || postBody.length == 0 ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		WebserviceRequest webserviceRequest =
    				unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		Integer projectSearchId = webserviceRequest.projectSearchId;

    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		List<Integer> projectSearchIdsForValidate = new ArrayList<>( 1 );
    		projectSearchIdsForValidate.add( projectSearchId );

    		////////////////
    		
    		//  AUTH - validate access
    		
    		//  throws an exception if access is not valid that is turned into a webservice response by Spring
    		
    		//  Comment out result since not use it
//    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    		validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIdsForValidate, httpServletRequest );
    		
    		////////////////


    		{ // Return cached value if available

    			boolean accept_GZIP = restControllerUtils__Request_Accept_GZip_Response_Set_GZip.does_HttpServletRequest_Accept_GZip( httpServletRequest );
    			
    			byte[] cachedResponse = cached_WebserviceResponse_Management.getCachedResponse( accept_GZIP, CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, this );
    			
    			if ( cachedResponse != null ) {
    				
    				if ( accept_GZIP ) {
    					restControllerUtils__Request_Accept_GZip_Response_Set_GZip.set_GZIP_On_HttpServletResponse( httpServletResponse );
    				}
    				
    				return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( cachedResponse );
    			}
    		}
    		
    		Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
			if ( searchId == null ) {
				String msg = "No searchId for projectSearchId: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
    		Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
    		projectSearchIdMapToSearchId.put( projectSearchId, searchId );
    		    		
			List<SearchSubSearchGroupId_PsmId_For_SearchId_Searcher_ResultItem> dbResults = 
					searchSubSearchGroupId_PsmId_ALL_For_SearchId__IncludesDecoys_Searcher
					.getSearchSubSearchGroupId_PsmId_ALL_For_SearchId__IncludesDecoys(searchId );
			
			// Sort in order of PSM ID ascending
			Collections.sort( dbResults, new Comparator<SearchSubSearchGroupId_PsmId_For_SearchId_Searcher_ResultItem>() {
				@Override
				public int compare(SearchSubSearchGroupId_PsmId_For_SearchId_Searcher_ResultItem o1, SearchSubSearchGroupId_PsmId_For_SearchId_Searcher_ResultItem o2) {
					if ( o1.getPsmId() < o2.getPsmId() ) {
						return -1;
					}
					if ( o1.getPsmId() > o2.getPsmId() ) {
						return 1;
					}
					// Should never get here
					return 0;
				} } );

			
			////  Create Webservice Result

    		WebserviceResult result = new WebserviceResult();
    		

			result.all_PsmId_AreSequential = true; // Expected to be true almost all the time.  Importer was changed so that PSM Ids are sequential for a search by reserving a block of ids for a search
			
			{
				final long prev_PsmId_INIT = -1;
				long prev_PsmId = prev_PsmId_INIT;
				
				for ( SearchSubSearchGroupId_PsmId_For_SearchId_Searcher_ResultItem dbItem : dbResults ) {
					if ( prev_PsmId == prev_PsmId_INIT ) {
						// first entry so skip comparison
					} else {
						if ( dbItem.getPsmId() != ( prev_PsmId + 1 ) ) {
							result.all_PsmId_AreSequential = false;
							break;
						}
					}
					prev_PsmId = dbItem.getPsmId();
				}
			}
						
    		result.startingPsmId = dbResults.get(0).getPsmId();
    		
    		if ( ! result.all_PsmId_AreSequential ) {

    	    	/**
    	    	 * Populated ONLY if all_PsmId_AreSequential is false
    	    	 * 
    	    	 * First entry is offset from startingPsmId and is always zero
    	    	 * Following entries are offset from previous psmId
    	    	 */
    			result.psmIds_OffsetFromStartOrPrevious = new long[ dbResults.size() ];
    			
    			int index = 0;
    			
    			long prev_PsmId = result.startingPsmId;
    			
    			for ( SearchSubSearchGroupId_PsmId_For_SearchId_Searcher_ResultItem dbItem : dbResults ) {
    				
    				result.psmIds_OffsetFromStartOrPrevious[ index ] = dbItem.getPsmId() - prev_PsmId;
    				
    				prev_PsmId = dbItem.getPsmId();
    				index++;
    			}
    		}
    		
    		//  Search Sub Groups are stored as base 36
    		
    		{
    			String[] searchSubGroupIds_Base36_StringArray = new String[ dbResults.size() ];

    			int maxStringLength = 0;
    			int minStringLength = Integer.MAX_VALUE;
    			
    			{
    				int index = 0;

    				for ( SearchSubSearchGroupId_PsmId_For_SearchId_Searcher_ResultItem dbItem : dbResults ) {

    					searchSubGroupIds_Base36_StringArray[ index ] = Integer.toString( dbItem.getSearchSubGroupId(), result.searchSubGroupIds_Base36_Radix_Number );

    					if ( index == 0 ) {
    						//  First Entry
    						maxStringLength = searchSubGroupIds_Base36_StringArray[ index ].length();
    					} else {

    						if ( maxStringLength < searchSubGroupIds_Base36_StringArray[ index ].length() ) {
    							maxStringLength = searchSubGroupIds_Base36_StringArray[ index ].length();
    						}
    						if ( minStringLength > searchSubGroupIds_Base36_StringArray[ index ].length() ) {
    							minStringLength = searchSubGroupIds_Base36_StringArray[ index ].length();
    						}
    					}

    					index++;
    				}
    			}
    			
				if ( minStringLength != maxStringLength ) {
					
					//  Zero left pad all strings to maxStringLength
					
					for ( int index = 0; index <  searchSubGroupIds_Base36_StringArray.length; index++ ) {

						int zeroFillLength = maxStringLength - searchSubGroupIds_Base36_StringArray[ index ].length();

						if ( zeroFillLength > 0  ) {
							
							String zeroFillString = StringUtils.repeat( '0', zeroFillLength );
							
							searchSubGroupIds_Base36_StringArray[ index ] = zeroFillString + searchSubGroupIds_Base36_StringArray[ index ];
						}
					}
				}
				
				// Store in results
				
				
				result.searchSubGroupIds_Base36_EachEntryLength = maxStringLength;
				
				
				StringBuilder searchSubGroupIds_Base36_StringBuilder = new StringBuilder( searchSubGroupIds_Base36_StringArray.length * maxStringLength );
				
				for ( int index = 0; index <  searchSubGroupIds_Base36_StringArray.length; index++ ) {

					searchSubGroupIds_Base36_StringBuilder.append( searchSubGroupIds_Base36_StringArray[ index ] );
				}
				
				result.searchSubGroupIds_Base36 = searchSubGroupIds_Base36_StringBuilder.toString();
    		}
    		
    		
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( result );

    		
    		byte[] responseAsJSON_GZIPPED = gzip_ByteArray_To_ByteArray.gzip_ByteArray_To_ByteArray(responseAsJSON);
    		

			boolean accept_GZIP = restControllerUtils__Request_Accept_GZip_Response_Set_GZip.does_HttpServletRequest_Accept_GZip( httpServletRequest );
			

    		{ // Save cached value 
    			
    			cached_WebserviceResponse_Management.putCachedResponse_GZIPPED( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, responseAsJSON_GZIPPED, this );
    		}
    		
    		byte[] responseAsJSON_FINAL = responseAsJSON;
    		

			if ( accept_GZIP ) {
				restControllerUtils__Request_Accept_GZip_Response_Set_GZip.set_GZIP_On_HttpServletResponse( httpServletResponse );
				
				responseAsJSON_FINAL = responseAsJSON_GZIPPED;
			}
			
    		
    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON_UTF8).body( responseAsJSON_FINAL );

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
     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
     *
     */
    public static class WebserviceRequest {
	    	
		private Integer projectSearchId;

		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
    }
    
    /**
     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
     *
     */
    public static class WebserviceResult {
    	
    	boolean all_PsmId_AreSequential;
    	long startingPsmId;
    	
    	/**
    	 * Populated ONLY if all_PsmId_AreSequential is false
    	 * 
    	 * First entry is offset from startingPsmId and is always zero
    	 * Following entries are offset from previous psmId
    	 */
    	long[] psmIds_OffsetFromStartOrPrevious;
    	
    	int searchSubGroupIds_Base36_Radix_Number = 36;
    	
    	
    	String searchSubGroupIds_Base36;

    	int searchSubGroupIds_Base36_EachEntryLength;

		public boolean isAll_PsmId_AreSequential() {
			return all_PsmId_AreSequential;
		}

		public long getStartingPsmId() {
			return startingPsmId;
		}

		public long[] getPsmIds_OffsetFromStartOrPrevious() {
			return psmIds_OffsetFromStartOrPrevious;
		}

		public String getSearchSubGroupIds_Base36() {
			return searchSubGroupIds_Base36;
		}

		public int getSearchSubGroupIds_Base36_EachEntryLength() {
			return searchSubGroupIds_Base36_EachEntryLength;
		}

		public int getSearchSubGroupIds_Base36_Radix_Number() {
			return searchSubGroupIds_Base36_Radix_Number;
		}
    }
    
}


