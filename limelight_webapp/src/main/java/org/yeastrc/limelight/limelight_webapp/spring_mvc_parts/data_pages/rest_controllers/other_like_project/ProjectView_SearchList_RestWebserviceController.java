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


import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchDataLookupParametersLookup_CreatedByUserType;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.objects.ProjectPageSingleFolder;
import org.yeastrc.limelight.limelight_webapp.objects.SearchItemMinimal;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.main.SearchDataLookupParams_GetCodesForDefaultCutoffsAnnTypesForEachProjSrchIdInListIF;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.params.SearchDataLookupParams_CreatedByInfo;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.SearchNameReturnDefaultIfNull;
import org.yeastrc.limelight.limelight_webapp.web_utils.ViewProjectSearchesInFoldersIF;
import org.yeastrc.limelight.limelight_webapp.web_utils.ViewProjectSearchesInFolders.ProjectPageFoldersSearches;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

@RestController
public class ProjectView_SearchList_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( ProjectView_SearchList_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

//	@Autowired
//	private SearchListForProjectIdSearcherIF searchListForProjectIdSearcher;

	@Autowired
	private ViewProjectSearchesInFoldersIF viewProjectSearchesInFolders;
	
	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;

	@Autowired
	private SearchDataLookupParams_GetCodesForDefaultCutoffsAnnTypesForEachProjSrchIdInListIF searchDataLookupParams_GetCodesForDefaultCutoffsAnnTypesForEachProjSrchIdInList;

	@Autowired
	private SearchNameReturnDefaultIfNull searchNameReturnDefaultIfNull;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public ProjectView_SearchList_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.PROJECT_VIEW_PAGE_SEARCH_LIST_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  projectView(

    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    	try {
    		//		log.warn( "projectView(...) called" );
    		
    		final String requestingIPAddress = httpServletRequest.getRemoteAddr();

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

    		String projectIdentifier = webserviceRequest.getProjectIdentifier();
    		
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

			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );
			
			GetWebSessionAuthAccessLevelForProjectIds_Result getWebSessionAuthAccessLevelForProjectIds_Result =
					getWebSessionAuthAccessLevelForProjectIds.getAuthAccessLevelForProjectIds( projectIds, httpServletRequest );

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = getWebSessionAuthAccessLevelForProjectIds_Result.getWebSessionAuthAccessLevel();

			if ( getWebSessionAuthAccessLevelForProjectIds_Result.isNoSession()
					&& ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() )) {
				
				//  No User session and not public project
				throw new Limelight_WS_AuthError_Unauthorized_Exception();
			}
			
			//  Set userCanEditAndDeleteFolders on each folder
			
			boolean userCanEditAndDeleteFolders = false;
			
			if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
				userCanEditAndDeleteFolders = true;
			}
			
			UserSession userSession = getWebSessionAuthAccessLevelForProjectIds_Result.getUserSession();

			boolean requestFromActualUser = false;
			
			if ( userSession != null && userSession.isActualUser() && userSession.getUserId() != null ) {
				requestFromActualUser = true;
			}

//    		List<SearchItemMinimal> searchListDB = searchListForProjectIdSearcher.getSearchListForProjectId( projectId );

			//  Get the searches and put them in folders
			ProjectPageFoldersSearches projectPageFoldersSearches = 
					viewProjectSearchesInFolders.getProjectPageFoldersSearches( projectId );
			
			boolean noSearchesFound = projectPageFoldersSearches.isNoSearchesFound();
			

    		WebserviceResult webserviceResult = new WebserviceResult();
    		
    		webserviceResult.noSearchesFound = noSearchesFound;
			
    		if ( ! noSearchesFound ) {
    			
    			//  Searches were found so convert to webservice response
    			{    		
    				List<SearchItemMinimal> searchesNotInFolders_FromDB = projectPageFoldersSearches.getSearchesNotInFolders();

    				if ( searchesNotInFolders_FromDB != null && ( ! searchesNotInFolders_FromDB.isEmpty() ) ) {

    					// Process Searches Not In Folders  

    					List<WebserviceResult_SingleSearch> searchesNotInFolders = convertSearchesFromDBToWebserviceResponse(
    							searchesNotInFolders_FromDB,
    							requestingIPAddress, 
    							webSessionAuthAccessLevel, 
    							userSession, 
    							requestFromActualUser );

    					webserviceResult.searchesNotInFolders = searchesNotInFolders;
    				}
    			}
    			{
    				List<ProjectPageSingleFolder> folders_FromDB = projectPageFoldersSearches.getFolders();

    				if ( ! folders_FromDB.isEmpty() ) {

    					//  Process Folders

    					List<WebserviceResult_SingleFolder> folderList = new ArrayList<>( folders_FromDB.size() );
    					webserviceResult.folderList = folderList;

    					for ( ProjectPageSingleFolder folder_FromDB : folders_FromDB ) {

    						//  Process Searches in this folder

							WebserviceResult_SingleFolder singleFolder = new WebserviceResult_SingleFolder();
							folderList.add( singleFolder );
							singleFolder.id = folder_FromDB.getId();
							singleFolder.folderName = folder_FromDB.getFolderName();
							singleFolder.canEdit = userCanEditAndDeleteFolders;
							singleFolder.canDelete = userCanEditAndDeleteFolders;

    						List<SearchItemMinimal> searchesInFolders_FromDB = folder_FromDB.getSearches();

    						if ( searchesInFolders_FromDB != null && ( ! searchesInFolders_FromDB.isEmpty() ) ) {
    						
    							List<WebserviceResult_SingleSearch> searchesInFolders = convertSearchesFromDBToWebserviceResponse(
    									searchesInFolders_FromDB,
    									requestingIPAddress, 
    									webSessionAuthAccessLevel, 
    									userSession, 
    									requestFromActualUser );

    							singleFolder.searchesInFolder = searchesInFolders;
    						}
    					}
    				}
	    		}
    		}
    		
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
	 * @param searchesFromDB_List
	 * @param requestingIPAddress
	 * @param webSessionAuthAccessLevel
	 * @param userSession
	 * @param requestFromActualUser
	 * @return
	 * @throws SQLException
	 */
	private List<WebserviceResult_SingleSearch> convertSearchesFromDBToWebserviceResponse( 
			List<SearchItemMinimal> searchesFromDB_List,
			String requestingIPAddress,
			WebSessionAuthAccessLevel webSessionAuthAccessLevel, 
			UserSession userSession, 
			boolean requestFromActualUser
			 ) throws SQLException {
		
		List<WebserviceResult_SingleSearch> searchList;
		List<Integer> projectSearchIds = new ArrayList<>( searchesFromDB_List.size() );
		for ( SearchItemMinimal searchItemMinimal : searchesFromDB_List ) {
			projectSearchIds.add( searchItemMinimal.getProjectSearchId() );
		}

		SearchDataLookupParams_CreatedByInfo searchDataLookupParams_CreatedByInfo = new SearchDataLookupParams_CreatedByInfo();

		if ( requestFromActualUser ) {
			searchDataLookupParams_CreatedByInfo.setCreatedByUserId( userSession.getUserId() );
			searchDataLookupParams_CreatedByInfo.setCreatedByUserType(
					SearchDataLookupParametersLookup_CreatedByUserType.WEB_USER );
			
		} else {
			searchDataLookupParams_CreatedByInfo.setCreatedByUserType(
					SearchDataLookupParametersLookup_CreatedByUserType.WEB_NON_USER );
		}
		
		searchDataLookupParams_CreatedByInfo.setCreatedByRemoteIP( requestingIPAddress );

		//  Return Map<[Project Search Id], [SearchDataLookupParamsCode]>
		Map<Integer, String> searchDataLookupParamsCodesForProjectSearchIds = 
				searchDataLookupParams_GetCodesForDefaultCutoffsAnnTypesForEachProjSrchIdInList
				.getSearchDataLookupParamsCodesForDefaultCutoffsAnnTypesForEachProjSrchIdInList( 
						projectSearchIds, 
						searchDataLookupParams_CreatedByInfo );

		searchList = new ArrayList<>( searchesFromDB_List.size() );
		for ( SearchItemMinimal searchListDBItem : searchesFromDB_List ) {

			String searchDataLookupParamsCode = 
					searchDataLookupParamsCodesForProjectSearchIds.get( searchListDBItem.getProjectSearchId() );
			if ( searchDataLookupParamsCode == null ) {
				String msg = "searchDataLookupParamsCode not found for ProjectSearchId: " + searchListDBItem.getProjectSearchId();
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
			WebserviceResult_SingleSearch resultItem = new WebserviceResult_SingleSearch();
			resultItem.projectSearchId = searchListDBItem.getProjectSearchId();
			resultItem.searchId = searchListDBItem.getSearchId();
			resultItem.displayOrder = searchListDBItem.getDisplayOrder();
			resultItem.name = searchNameReturnDefaultIfNull.searchNameReturnDefaultIfNull( searchListDBItem.getName(), searchListDBItem.getSearchId() );
			resultItem.searchDataLookupParamsCode = searchDataLookupParamsCode;
			if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
				resultItem.setCanChangeSearchName(true);
				resultItem.setCanDelete(true);
			}
			searchList.add( resultItem );
		}
		
		return searchList;
	}
    
    ///////////////////////////
    
    //  Webservice Request Result objects

    /**
     * Webservice request
     *
     */
    public static class WebserviceRequest {
    	
    	private String projectIdentifier;

    	public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
		public String getProjectIdentifier() {
			return projectIdentifier;
		}
    }
    
    /**
     * Webservice Result
     *
     */
    public static class WebserviceResult {

    	private List<WebserviceResult_SingleFolder> folderList;
    	private List<WebserviceResult_SingleSearch> searchesNotInFolders;
    	private boolean noSearchesFound;
    	
		public List<WebserviceResult_SingleFolder> getFolderList() {
			return folderList;
		}
		public void setFolderList(List<WebserviceResult_SingleFolder> folderList) {
			this.folderList = folderList;
		}
		public List<WebserviceResult_SingleSearch> getSearchesNotInFolders() {
			return searchesNotInFolders;
		}
		public void setSearchesNotInFolders(List<WebserviceResult_SingleSearch> searchesNotInFolders) {
			this.searchesNotInFolders = searchesNotInFolders;
		}
		public boolean isNoSearchesFound() {
			return noSearchesFound;
		}
		public void setNoSearchesFound(boolean noSearchesFound) {
			this.noSearchesFound = noSearchesFound;
		}
    }

    /**
     * Webservice Result - Single Search
     *
     */
    public static class WebserviceResult_SingleFolder {
    	
    	private int id;
    	private String folderName;
    	List<WebserviceResult_SingleSearch> searchesInFolder;
    	private boolean canEdit;
    	private boolean canDelete;
    	
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getFolderName() {
			return folderName;
		}
		public void setFolderName(String folderName) {
			this.folderName = folderName;
		}
		public List<WebserviceResult_SingleSearch> getSearchesInFolder() {
			return searchesInFolder;
		}
		public void setSearchesInFolder(List<WebserviceResult_SingleSearch> searchesInFolder) {
			this.searchesInFolder = searchesInFolder;
		}
		public boolean isCanDelete() {
			return canDelete;
		}
		public void setCanDelete(boolean canDelete) {
			this.canDelete = canDelete;
		}
		public boolean isCanEdit() {
			return canEdit;
		}
		public void setCanEdit(boolean canEdit) {
			this.canEdit = canEdit;
		}
    	
    
    }
    
    /**
     * Webservice Result - Single Search
     *
     */
    public static class WebserviceResult_SingleSearch {
    	
    	private int projectSearchId;
    	private int searchId;
    	private int displayOrder; // zero if no display order applied
    	private String name;
    	private String searchDataLookupParamsCode;
    	private boolean canChangeSearchName;
    	private boolean canDelete;
    	
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
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getSearchDataLookupParamsCode() {
			return searchDataLookupParamsCode;
		}
		public void setSearchDataLookupParamsCode(String searchDataLookupParamsCode) {
			this.searchDataLookupParamsCode = searchDataLookupParamsCode;
		}
		public boolean isCanChangeSearchName() {
			return canChangeSearchName;
		}
		public void setCanChangeSearchName(boolean canChangeSearchName) {
			this.canChangeSearchName = canChangeSearchName;
		}
		public boolean isCanDelete() {
			return canDelete;
		}
		public void setCanDelete(boolean canDelete) {
			this.canDelete = canDelete;
		}
		public int getDisplayOrder() {
			return displayOrder;
		}
		public void setDisplayOrder(int displayOrder) {
			this.displayOrder = displayOrder;
		}
    	
    }
    
}


