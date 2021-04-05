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


import java.nio.ByteBuffer;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
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
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchIdCodeDTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearchIdCodeDAO.LogDuplicateSQLException;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearchIdCodeDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.objects.ProjectPageSingleFolder;
import org.yeastrc.limelight.limelight_webapp.objects.SearchItemMinimal;
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
	
	private static final int RETRY_COUNT_MAX_ON_DUPLICATE_PROJECT_SEARCH_ID_CODE = 30;

	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.PROJECT_VIEW_PAGE_SEARCH_LIST_REST_WEBSERVICE_CONTROLLER;
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ViewProjectSearchesInFoldersIF viewProjectSearchesInFolders;
	
	@Autowired ProjectSearchIdCodeDAO_IF projectSearchIdCodeDAO;
	
	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;

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
					+ CONTROLLER_PATH
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
		
		
		List<Integer> projectSearchIdList = new ArrayList<>( searchesFromDB_List.size() );
		for ( SearchItemMinimal searchItemMinimal : searchesFromDB_List ) {
			projectSearchIdList.add( searchItemMinimal.getProjectSearchId() );
		}
		
		List<ProjectSearchIdCodeDTO> projectSearchIdCodeDTOList = projectSearchIdCodeDAO.getByProjectSearchIdList(projectSearchIdList);
		Map<Integer, ProjectSearchIdCodeDTO> projectSearchIdCodeDTOMap_Key_projectSearchId = new HashMap<>( projectSearchIdCodeDTOList.size() );
		for ( ProjectSearchIdCodeDTO projectSearchIdCodeDTO : projectSearchIdCodeDTOList ) {
			projectSearchIdCodeDTOMap_Key_projectSearchId.put( projectSearchIdCodeDTO.getProjectSearchId(), projectSearchIdCodeDTO );
		}
		
		
		List<WebserviceResult_SingleSearch> searchList = new ArrayList<>( searchesFromDB_List.size() );
		for ( SearchItemMinimal searchListDBItem : searchesFromDB_List ) {
			
			ProjectSearchIdCodeDTO projectSearchIdCodeDTO = projectSearchIdCodeDTOMap_Key_projectSearchId.get( searchListDBItem.getProjectSearchId() );
			if ( projectSearchIdCodeDTO == null ) {
				projectSearchIdCodeDTO = _create_Insert_projectSearchIdCodeDTO( searchListDBItem );
			}

			WebserviceResult_SingleSearch resultItem = new WebserviceResult_SingleSearch();
			resultItem.projectSearchId = searchListDBItem.getProjectSearchId();
			resultItem.projectSearchIdCode = projectSearchIdCodeDTO.getProjectSearchIdCode();
			resultItem.searchId = searchListDBItem.getSearchId();
			resultItem.displayOrder = searchListDBItem.getDisplayOrder();
			resultItem.name = searchNameReturnDefaultIfNull.searchNameReturnDefaultIfNull( searchListDBItem.getName(), searchListDBItem.getSearchId() );
			if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
				resultItem.setCanChangeSearchName(true);
				resultItem.setCanDelete(true);
			}
			searchList.add( resultItem );
		}
		
		return searchList;
	}
	
	/**
	 * @param projectSearchId
	 * @return
	 * @throws SQLException 
	 */
	private ProjectSearchIdCodeDTO _create_Insert_projectSearchIdCodeDTO( SearchItemMinimal searchListDBItem ) throws SQLException {
		
		int projectSearchId = searchListDBItem.getProjectSearchId();
		
		ProjectSearchIdCodeDTO projectSearchIdCodeDTO = new ProjectSearchIdCodeDTO();
		projectSearchIdCodeDTO.setProjectSearchId( searchListDBItem.getProjectSearchId() );
		projectSearchIdCodeDTO.setSearchId( searchListDBItem.getSearchId() );
		projectSearchIdCodeDTO.setProjectId_AtTimeOfInsert( searchListDBItem.getProjectId() );
		

		boolean saveSuccessful = false;
		int saveAttemptCounter = 0;
		
		String projectSearchIdCode = null;

		//  Loop to do retries since may create shortenedUrlKey that collides with existing records
		while ( ( ! saveSuccessful ) ) {
			saveAttemptCounter++;
			try {
				//  First try a read using projectSearchId since may have been inserted by a different thread in webapp from different request
				
				{
					String projectSearchIdCode_FromGet = projectSearchIdCodeDAO.getByProjectSearchId( projectSearchId );
					if ( projectSearchIdCode_FromGet != null ) {
						
						//  Found entry for projectSearchId so use it
						
						projectSearchIdCodeDTO.setProjectSearchIdCode( projectSearchIdCode_FromGet );
						
						return projectSearchIdCodeDTO; // EARLY RETURN
					}
				}
				
				//  Create and Attempt Save
				
				projectSearchIdCode = getProjectSearchIdCode();
				projectSearchIdCodeDTO.setProjectSearchIdCode( projectSearchIdCode );
				//  Only log insert Duplicate error in DAO if last attempt
				LogDuplicateSQLException logDuplicateSQLException = LogDuplicateSQLException.FALSE;
				if ( saveAttemptCounter >=  RETRY_COUNT_MAX_ON_DUPLICATE_PROJECT_SEARCH_ID_CODE ) {
					logDuplicateSQLException = LogDuplicateSQLException.TRUE;
				}

				projectSearchIdCodeDAO.save(projectSearchIdCodeDTO, logDuplicateSQLException);
				
				saveSuccessful = true;

			} catch ( org.springframework.dao.DuplicateKeyException e ) {

				if ( saveAttemptCounter >=  RETRY_COUNT_MAX_ON_DUPLICATE_PROJECT_SEARCH_ID_CODE ) {
					String msg = "Exceeded max number of attempts to insert and get Duplicate Key error."
							+ "  Max # = " + RETRY_COUNT_MAX_ON_DUPLICATE_PROJECT_SEARCH_ID_CODE
							+ ", current projectSearchIdCode: " + projectSearchIdCode;
					log.error( msg, e );
					throw new LimelightInternalErrorException( msg );
				}
			}
		}
		
		return projectSearchIdCodeDTO; //  Also a return inside method after projectSearchIdCodeDAO.getByProjectSearchId
		
	}

	/**
	 * @return
	 */
	private String getProjectSearchIdCode() {

		StringBuilder randomStringSB = new StringBuilder( 20 );

		final int RETURN_LENGTH = 12;
		
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
				if ( ( entry >= 'a' && entry <= 'v' )
						|| ( entry >= 'A' && entry <= 'V' ) ) {
					//  Only take a-v, A-v.
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
		
		randomString = randomString.toUpperCase();  //  Only Upper Case Letters

		return randomString;
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
    	private String projectSearchIdCode;
    	private int searchId;
    	private int displayOrder; // zero if no display order applied
    	private String name;
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
		public String getProjectSearchIdCode() {
			return projectSearchIdCode;
		}
    	
    }
    
}


