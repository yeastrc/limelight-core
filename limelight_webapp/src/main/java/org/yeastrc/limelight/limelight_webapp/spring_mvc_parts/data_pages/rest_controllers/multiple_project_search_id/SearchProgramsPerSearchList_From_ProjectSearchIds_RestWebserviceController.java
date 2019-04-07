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
import java.util.List;

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
import org.yeastrc.limelight.limelight_shared.dto.SearchProgramsPerSearchDTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchProgramsPerSearchListForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Get Search Annotation Type Data from Project Search Ids on URI Path
 *
 * POST body is ignored
 * 
 * Returns List<SearchItemMinimal>
 */
@RestController
public class SearchProgramsPerSearchList_From_ProjectSearchIds_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( SearchProgramsPerSearchList_From_ProjectSearchIds_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SearchProgramsPerSearchListForSearchIdSearcherIF searchProgramsPerSearchListForSearchIdSearcher;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public SearchProgramsPerSearchList_From_ProjectSearchIds_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.SEARCH_PROGRAMS_PER_SEARCH_LIST_FROM_PROJECT_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  controllerEntry(
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    	try {
//    		log.warn( "controllerEntry(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		List<Integer> projectSearchIdList = webserviceRequest.getProjectSearchIds();

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
   		
    		
    		List<WebserviceResultPerSearch> perSearchList = new ArrayList<>( projectSearchIdList.size() );
    		
    		for ( Integer projectSearchId : projectSearchIdList ) {
    			
    			Integer searchId =	searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
    			if ( searchId == null ) {
        			log.warn( "projectSearchId not in DB: " + projectSearchId );
        			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}
    			
    			List<SearchProgramsPerSearchDTO> searchProgramsPerSearchDTOList =
    					searchProgramsPerSearchListForSearchIdSearcher.getSearchProgramsPerSearchForSearchId( searchId );

    			if ( searchProgramsPerSearchDTOList.isEmpty() ) {
    				// No annotation types found for project search id
    				continue; // EARLY CONTINUE
    			}
    			
    			WebserviceResultPerSearch webserviceResultPerSearch = populateWebserviceResultPerSearch( searchProgramsPerSearchDTOList );

    			webserviceResultPerSearch.projectSearchId = projectSearchId;
    			webserviceResultPerSearch.searchId = searchId;
    			
    			perSearchList.add( webserviceResultPerSearch );
    		}
    		
    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.perSearchList = perSearchList;

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
     * @param searchProgramsPerSearchDTOList
     * @return
     */
    private WebserviceResultPerSearch populateWebserviceResultPerSearch( List<SearchProgramsPerSearchDTO> searchProgramsPerSearchDTOList ) {
    	
    	WebserviceResultPerSearch webserviceResultPerSearch = new WebserviceResultPerSearch();

    	List<WebserviceResultSearchProgramsPerSearchItem> searchProgramsPerSearchs = new ArrayList<>( searchProgramsPerSearchDTOList.size() );
    	
    	// Process Annotation Types from DB
		for ( SearchProgramsPerSearchDTO searchProgramsPerSearchDTO : searchProgramsPerSearchDTOList ) {
			
			WebserviceResultSearchProgramsPerSearchItem webserviceResultSearchProgramsPerSearchItem = populateWebserviceResultSearchProgramsPerSearchItem( searchProgramsPerSearchDTO );
			searchProgramsPerSearchs.add( webserviceResultSearchProgramsPerSearchItem );
		}
		    	
    	webserviceResultPerSearch.searchProgramsPerSearchs = searchProgramsPerSearchs;
    
    	return webserviceResultPerSearch;
    }
    
    /**
     * @param searchProgramsPerSearchDTO
     * @return
     */
    private WebserviceResultSearchProgramsPerSearchItem populateWebserviceResultSearchProgramsPerSearchItem( SearchProgramsPerSearchDTO searchProgramsPerSearchDTO ) {
    	
    	WebserviceResultSearchProgramsPerSearchItem webserviceResultSearchProgramsPerSearchItem = new WebserviceResultSearchProgramsPerSearchItem();
    	
    	webserviceResultSearchProgramsPerSearchItem.searchProgramsPerSearchId = searchProgramsPerSearchDTO.getId();
    	
    	webserviceResultSearchProgramsPerSearchItem.searchId = searchProgramsPerSearchDTO.getSearchId();
    	
    	webserviceResultSearchProgramsPerSearchItem.name = searchProgramsPerSearchDTO.getName();
    	webserviceResultSearchProgramsPerSearchItem.displayName = searchProgramsPerSearchDTO.getDisplayName();
    	webserviceResultSearchProgramsPerSearchItem.version = searchProgramsPerSearchDTO.getVersion();
    	webserviceResultSearchProgramsPerSearchItem.description = searchProgramsPerSearchDTO.getDescription();
    	
    	return webserviceResultSearchProgramsPerSearchItem;
    }
    
    
    
    
    
    //////////////////////////////////////////
    
    //   Webservice Request and Result
    
    /**
     * 
     *
     */
    public static class WebserviceRequest {

    	private List<Integer> projectSearchIds;

		public List<Integer> getProjectSearchIds() {
			return projectSearchIds;
		}
		public void setProjectSearchIds(List<Integer> projectSearchIds) {
			this.projectSearchIds = projectSearchIds;
		}
    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    
    	private List<WebserviceResultPerSearch> perSearchList;

		public List<WebserviceResultPerSearch> getPerSearchList() {
			return perSearchList;
		}

		public void setPerSearchList(List<WebserviceResultPerSearch> perSearchList) {
			this.perSearchList = perSearchList;
		}
    }
    
    public static class WebserviceResultPerSearch {
        
    	private int projectSearchId;
    	private int searchId;
    	private List<WebserviceResultSearchProgramsPerSearchItem> searchProgramsPerSearchs;
    	
		public int getProjectSearchId() {
			return projectSearchId;
		}
		public void setProjectSearchId(int projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public int getSearchId() {
			return searchId;
		}
		public void setSearchId(int searchId) {
			this.searchId = searchId;
		}
		public List<WebserviceResultSearchProgramsPerSearchItem> getSearchProgramsPerSearchs() {
			return searchProgramsPerSearchs;
		}
		public void setSearchProgramsPerSearchs(List<WebserviceResultSearchProgramsPerSearchItem> searchProgramsPerSearchs) {
			this.searchProgramsPerSearchs = searchProgramsPerSearchs;
		}
    }

    public static class WebserviceResultSearchProgramsPerSearchItem {
    	
    	private int searchProgramsPerSearchId;
    	private int searchId;

    	private String name;
    	private String displayName;
    	private String version;
    	private String description;
    	
		public int getSearchProgramsPerSearchId() {
			return searchProgramsPerSearchId;
		}
		public void setSearchProgramsPerSearchId(int searchProgramsPerSearchId) {
			this.searchProgramsPerSearchId = searchProgramsPerSearchId;
		}
		public int getSearchId() {
			return searchId;
		}
		public void setSearchId(int searchId) {
			this.searchId = searchId;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getDisplayName() {
			return displayName;
		}
		public void setDisplayName(String displayName) {
			this.displayName = displayName;
		}
		public String getVersion() {
			return version;
		}
		public void setVersion(String version) {
			this.version = version;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
    	
    }
    
}


