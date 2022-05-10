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


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.FastaFileStatistics_For_SearchIdList_Searcher.FastaFileStatistics_For_SearchId_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.FastaFileStatistics_For_SearchIdList_Searcher.FastaFileStatistics_For_SearchId_Searcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers.FastaFileStatistics_For_SearchIdList_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Get Fasta File Statistics for Project Search Id List.  
 * 
 */
@RestController
public class FastaFileStatistics_From_ProjectSearchIds_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( FastaFileStatistics_From_ProjectSearchIds_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private FastaFileStatistics_For_SearchIdList_Searcher_IF fastaFileStatistics_For_SearchId_Searcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public FastaFileStatistics_From_ProjectSearchIds_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.FASTA_FILE_STATISTICS_PROJECT_SEARCH_ID_LIST
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
//    		log.warn( "webserviceMethod(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs
    		
    		if ( postBody == null || postBody.length == 0 ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		List<Integer> projectSearchIdList = webserviceRequest.projectSearchIds;

    		if ( projectSearchIdList == null || projectSearchIdList.isEmpty() ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		////////////////
    		
    		//  AUTH - validate access
    		
    		//  throws an exception if access is not valid that is turned into a webservice response by Spring
    		
    		//  Comment out result since not use it
//    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    		validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIdList, httpServletRequest );
    		
    		////////////////

			List<Integer> searchIds = new ArrayList<>( projectSearchIdList.size() );
			Map<Integer, Integer> projectSearchId_Map_Key_searchId = new HashMap<>( projectSearchIdList.size() );

			for ( Integer projectSearchId : projectSearchIdList ) {
    		
	    		Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
				if ( searchId == null ) {
					String msg = "No searchId for projectSearchId: " + projectSearchId;
					log.warn( msg );
	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				
				searchIds.add(searchId);
				if ( projectSearchId_Map_Key_searchId.put(searchId, projectSearchId) != null ) {
					String msg = "Same search id for more than one project search id.  second projectSearchId: " + projectSearchId;
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
			}
			
			//  Get DB data for search id
   			
       		FastaFileStatistics_For_SearchId_Searcher_Result dbResult =
       				fastaFileStatistics_For_SearchId_Searcher.getForSearchIdList(searchIds);
       		
       		List<WebserviceResult_Item> items = new ArrayList<>( searchIds.size() );
       		
       		for ( FastaFileStatistics_For_SearchId_Searcher_Result_Item dbItem : dbResult.getEntries() ) {
       			
       			Integer searchId = dbItem.getSearchId();
       			
       			Integer projectSearchId = projectSearchId_Map_Key_searchId.get( searchId );
       			if ( projectSearchId == null ) {
       				String msg = "Failed to get projectSearchId from projectSearchId_Map_Key_searchId for searchId: " + searchId;
       				log.error(msg);
       				throw new LimelightInternalErrorException(msg);
       			}

       			WebserviceResult_Item webserviceResult_Item = new WebserviceResult_Item();
       			webserviceResult_Item.searchId = dbItem.getSearchId();
       			webserviceResult_Item.projectSearchId = projectSearchId;
       			webserviceResult_Item.numTargets = dbItem.getNumTargets();
       			webserviceResult_Item.numDecoys = dbItem.getNumDecoys();
       			webserviceResult_Item.numIndependentDecoys = dbItem.getNumIndependentDecoys();

       			items.add(webserviceResult_Item);
       		}

   			WebserviceResult webserviceResult = new WebserviceResult();
   			webserviceResult.items = items;
   			
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );
    		
    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON_UTF8).body( responseAsJSON );

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
     * 
     *
     */
    public static class WebserviceRequest {
    
    	private List<Integer> projectSearchIds;

		public void setProjectSearchIds(List<Integer> projectSearchIds) {
			this.projectSearchIds = projectSearchIds;
		}

    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    	
    	private List<WebserviceResult_Item> items;

		public List<WebserviceResult_Item> getItems() {
			return items;
		}
    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult_Item {
    	
    	private int searchId;
    	private int projectSearchId;
    	private int numTargets;
		private int numDecoys;
		private int numIndependentDecoys;
		
		public int getNumTargets() {
			return numTargets;
		}
		public int getNumDecoys() {
			return numDecoys;
		}
		public int getNumIndependentDecoys() {
			return numIndependentDecoys;
		}
		public int getSearchId() {
			return searchId;
		}
		public int getProjectSearchId() {
			return projectSearchId;
		}
    }
}


