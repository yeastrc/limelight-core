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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.other_like_project;


import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.objects.ProjectPageSingleFolder;
import org.yeastrc.limelight.limelight_webapp.objects.SearchItemMinimal;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.SearchNameReturnDefaultIfNull;
import org.yeastrc.limelight.limelight_webapp.web_utils.ViewProjectSearchesInFolders.ProjectPageFoldersSearches;
import org.yeastrc.limelight.limelight_webapp.web_utils.ViewProjectSearchesInFoldersIF;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Organize Searches - Get Data
 *
 */
@RestController
public class Project_OrganizeSearches_GetData_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Project_OrganizeSearches_GetData_RestWebserviceController.class );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private ViewProjectSearchesInFoldersIF viewProjectSearchesInFolders;

	@Autowired
	private SearchNameReturnDefaultIfNull searchNameReturnDefaultIfNull;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Project_OrganizeSearches_GetData_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.PROJECT_ORGANIZE_SEARCHES_GET_DATA_REST_WEBSERVICE_CONTROLLER
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
    		WebserviceResult webserviceResult = new WebserviceResult();

    		//		log.warn( "webserviceMethod(...) called" );

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
    		
    		String projectIdentifier = webserviceRequest.projectIdentifier;
        	
    		if ( StringUtils.isEmpty( projectIdentifier ) ) {
    			log.warn( "projectIdentifier is empty or not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		int projectId = 0;

    		try {
    			projectId = Integer.parseInt( projectIdentifier );

    		} catch ( RuntimeException e ) {
    			log.warn( "Project Identifier not parsable to int: " + projectIdentifier );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

			//  Validate access to Current Project Id

    		List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );
			
//			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
			validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
			.validateProjectOwnerAllowed( projectIds, httpServletRequest );

			////////   Auth complete
			//////////////////////////////////////////
			
			//  Get data to return

			//  Get the searches and put them in folders
			ProjectPageFoldersSearches projectPageFoldersSearches = 
					viewProjectSearchesInFolders.getProjectPageFoldersSearches( projectId );
			
			if ( projectPageFoldersSearches.isNoSearchesFound() ) {
				
				webserviceResult.noSearchesFound = true;

	    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

	    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );  //  EARLY Return
			}
			
			//  Convert the projectPageFoldersSearches to the webservice result
			
			List<WebserviceResultSearchItem> searchesNotInFoldersList = 
					convertSearchItemMinimalToWebserviceResultSearchItem( projectPageFoldersSearches.getSearchesNotInFolders() );

			List<WebserviceResultFolderItem> folderDataList = new ArrayList<>( projectPageFoldersSearches.getFolders().size() );
			for ( ProjectPageSingleFolder projectPageSingleFolder : projectPageFoldersSearches.getFolders() ) {
				List<WebserviceResultSearchItem> searchesInFolderList = 
						convertSearchItemMinimalToWebserviceResultSearchItem( projectPageSingleFolder.getSearches() );
				WebserviceResultFolderItem folderItem = new WebserviceResultFolderItem();
				folderItem.setSearchesForFolder( searchesInFolderList );
				folderItem.setName( projectPageSingleFolder.getFolderName() );
				folderItem.setId( projectPageSingleFolder.getId() );
				folderDataList.add( folderItem );
			}
			
			// populate webserviceResult
			webserviceResult.setSearchesNotInFoldersList( searchesNotInFoldersList );
			webserviceResult.setFolderDataList( folderDataList );
			
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
	 * Convert search wrapper to webservice result objects
	 * @param searches
	 * @return
	 */
	private List<WebserviceResultSearchItem> convertSearchItemMinimalToWebserviceResultSearchItem( List<SearchItemMinimal> searches ) {
		
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
		List<WebserviceResultSearchItem> webserviceResultSearchItemList = new ArrayList<>( searches.size() );
		for ( SearchItemMinimal searchItemMinimal : searches ) {
			
			String searchNameDisplay = searchNameReturnDefaultIfNull.searchNameReturnDefaultIfNull( searchItemMinimal.getName(), searchItemMinimal.getSearchId() );

			String formattedLoadTime = null;
			
			if ( searchItemMinimal.getImportEndTimestamp() != null ) {
				formattedLoadTime = simpleDateFormat.format( searchItemMinimal.getImportEndTimestamp() );
			}
			
			WebserviceResultSearchItem searchItem = new WebserviceResultSearchItem();
			searchItem.id = searchItemMinimal.getProjectSearchId();
			searchItem.searchId = searchItemMinimal.getSearchId();
			searchItem.displayOrder = searchItemMinimal.getDisplayOrder();
			searchItem.name = searchNameDisplay;
			searchItem.formattedLoadTime = formattedLoadTime;
			webserviceResultSearchItemList.add( searchItem );
		}
		return webserviceResultSearchItemList;
	}
	
    //  Webservice Request and Response classes

    public static class WebserviceRequest {

    	private String projectIdentifier;
    	
		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
    }
    
    public static class WebserviceResult {

		private boolean noSearchesFound;
		private List<WebserviceResultSearchItem> searchesNotInFoldersList;
		private List<WebserviceResultFolderItem> folderDataList;
		
		public boolean isNoSearchesFound() {
			return noSearchesFound;
		}
		public List<WebserviceResultSearchItem> getSearchesNotInFoldersList() {
			return searchesNotInFoldersList;
		}
		public List<WebserviceResultFolderItem> getFolderDataList() {
			return folderDataList;
		}
		public void setNoSearchesFound(boolean noSearchesFound) {
			this.noSearchesFound = noSearchesFound;
		}
		public void setSearchesNotInFoldersList(List<WebserviceResultSearchItem> searchesNotInFoldersList) {
			this.searchesNotInFoldersList = searchesNotInFoldersList;
		}
		public void setFolderDataList(List<WebserviceResultFolderItem> folderDataList) {
			this.folderDataList = folderDataList;
		}
    }

	/**
	 * 
	 *
	 */
	public static class WebserviceResultFolderItem {
		
		private int id;
		private String name;
		private List<WebserviceResultSearchItem> searchesForFolder;
		
		public int getId() {
			return id;
		}
		public String getName() {
			return name;
		}
		public List<WebserviceResultSearchItem> getSearchesForFolder() {
			return searchesForFolder;
		}
		public void setId(int id) {
			this.id = id;
		}
		public void setName(String name) {
			this.name = name;
		}
		public void setSearchesForFolder(List<WebserviceResultSearchItem> searchesForFolder) {
			this.searchesForFolder = searchesForFolder;
		}
	}
	
	/**
	 * 
	 *
	 */
	public static class WebserviceResultSearchItem {
		
		private int id;
		private int searchId;
		private int displayOrder;
		private String name;
		private String formattedLoadTime;
		
		public int getId() {
			return id;
		}
		public int getSearchId() {
			return searchId;
		}
		public String getName() {
			return name;
		}
		public void setId(int id) {
			this.id = id;
		}
		public void setSearchId(int searchId) {
			this.searchId = searchId;
		}
		public void setName(String name) {
			this.name = name;
		}
		public int getDisplayOrder() {
			return displayOrder;
		}
		public String getFormattedLoadTime() {
			return formattedLoadTime;
		}
	}

}


