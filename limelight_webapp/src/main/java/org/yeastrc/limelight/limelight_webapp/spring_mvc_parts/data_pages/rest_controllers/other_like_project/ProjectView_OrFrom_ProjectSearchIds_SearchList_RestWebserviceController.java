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
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearchIdCodeDAO.LogDuplicateSQLException;
import org.yeastrc.limelight.limelight_webapp.db_dto.FolderForProjectDTO;
import org.yeastrc.limelight.limelight_webapp.db_dto.FolderProjectSearchDTO;
import org.yeastrc.limelight.limelight_webapp.dao.FolderForProjectDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.FolderProjectSearchDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearchIdCodeDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearch_TagCategoryInProject_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.objects.SearchItemMinimal;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchTags_InProject_ForProjectIdSearcher.SearchTags_InProject_ForProjectIdSearcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchTagCategories_ForProjectId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchListForProjectIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchTags_InProject_ForProjectIdSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchTagCategories_ForProjectId_Searcher.ProjectSearchTagCategories_ForProjectId_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher.SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.SearchNameReturnDefaultIfNull;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * 
 * Searches for Project Id OR Project Search Ids (from a single Project)
 * 
 * Searches, Folders, Search to folder mapping, Search Tags
 * 
 * Data is NOT cached since user can update.  
 *
 */
@RestController
public class ProjectView_OrFrom_ProjectSearchIds_SearchList_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( ProjectView_OrFrom_ProjectSearchIds_SearchList_RestWebserviceController.class );
	
	private static final int RETRY_COUNT_MAX_ON_DUPLICATE_PROJECT_SEARCH_ID_CODE = 30;

	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.PROJECT_VIEW_PAGE_OR_FROM_PROJECT_SEARCH_IDS__SEARCH_LIST__REST_WEBSERVICE_CONTROLLER;
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private SearchListForProjectIdSearcherIF searchListForProjectIdSearcher;
	
	@Autowired
	private SearchFlagsForSearchIdSearcherIF searchFlagsForSearchIdSearcher;

	@Autowired
	private FolderForProjectDAO_IF folderForProjectDAO;

	@Autowired
	private FolderProjectSearchDAO_IF folderProjectSearchDAO;
	
	@Autowired ProjectSearchIdCodeDAO_IF projectSearchIdCodeDAO;
	
	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;

	@Autowired
	private SearchTags_InProject_ForProjectIdSearcher_IF searchTags_InProject_ForProjectIdSearcher;
	
	@Autowired
	private SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher_IF searchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher;

	@Autowired
	private ProjectSearch_TagCategoryInProject_DAO_IF projectSearch_TagCategoryInProject_DAO;

	@Autowired
	private ProjectSearchTagCategories_ForProjectId_Searcher_IF projectSearchTagCategories_ForProjectId_Searcher;
	
	@Autowired
	private SearchNameReturnDefaultIfNull searchNameReturnDefaultIfNull;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public ProjectView_OrFrom_ProjectSearchIds_SearchList_RestWebserviceController() {
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
    		
    		WebSessionAuthAccessLevel webSessionAuthAccessLevel = null; 
			UserSession userSession = null;
			int projectId = 0;

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );
    		
    		 List<Integer> projectSearchIds_Requested = webserviceRequest.projectSearchIds;

     		String projectIdentifier_Requested = webserviceRequest.projectIdentifier;
     		
    		 if ( projectSearchIds_Requested != null ) {
    			 
    				if ( projectSearchIds_Requested.isEmpty() ) {
    					log.warn( "projectSearchIds_Requested is NOT NULL and IS EMPTY" );
    					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    				}

    				////////////////

    				//  AUTH - validate access

    				//  throws an exception if access is not valid that is turned into a webservice response by Spring

    				//  Comment out result since not use it
    				ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    						validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIds_Requested, httpServletRequest );

    				webSessionAuthAccessLevel = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getWebSessionAuthAccessLevel();
    	
    				userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getUserSession();
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
    				
    				if ( StringUtils.isNotEmpty( projectIdentifier_Requested ) ) {
    					
    					//  Validate projectIdentifier_Requested is same project id

    					int projectId_FROM__projectIdentifier_Requested = 0;
    					
    		    		try {
    		    			projectId_FROM__projectIdentifier_Requested = Integer.parseInt( projectIdentifier_Requested );
    		
    		    		} catch ( RuntimeException e ) {
    		    			log.warn( "Project Identifier not parsable to int: " + projectIdentifier_Requested );
    		    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		    		}
    		
    					if ( projectId_FROM__projectIdentifier_Requested != projectId ) {
    						log.warn( "Project Identifier not same project as project id for projectSearchids" );
    		    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    					}
    				}
    			 
    		 } else {
    		 
    			 //  NO projectSearchIds_Requested
    			 
    			 //  Process projectIdentifier_Requested
	    			 
	    		if ( StringUtils.isEmpty( projectIdentifier_Requested ) ) {
	    			log.warn( "projectIdentifier is empty or not assigned" );
	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
	    		}
	
	    		try {
	    			projectId = Integer.parseInt( projectIdentifier_Requested );
	
	    		} catch ( RuntimeException e ) {
	    			log.warn( "Project Identifier not parsable to int: " + projectIdentifier_Requested );
	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
	    		}
	
				List<Integer> projectIds = new ArrayList<>( 1 );
				projectIds.add( projectId );
				
				GetWebSessionAuthAccessLevelForProjectIds_Result getWebSessionAuthAccessLevelForProjectIds_Result =
						getWebSessionAuthAccessLevelForProjectIds.getAuthAccessLevelForProjectIds( projectIds, httpServletRequest );
	
				webSessionAuthAccessLevel = getWebSessionAuthAccessLevelForProjectIds_Result.getWebSessionAuthAccessLevel();
	
				if ( getWebSessionAuthAccessLevelForProjectIds_Result.isNoSession()
						&& ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() )) {
					
					//  No User session and not public project
					throw new Limelight_WS_AuthError_Unauthorized_Exception();
				}
				
				userSession = getWebSessionAuthAccessLevelForProjectIds_Result.getUserSession();
    		 }
			
			WebserviceResult webserviceResult = processRequest_CreateResult( projectSearchIds_Requested,projectId, requestingIPAddress, webSessionAuthAccessLevel, userSession);

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
	 * @return
	 * @throws Exception 
	 */
	private WebserviceResult processRequest_CreateResult(
			List<Integer> projectSearchIds_Requested,
			int projectId,
			String requestingIPAddress,
			WebSessionAuthAccessLevel webSessionAuthAccessLevel, 
			UserSession userSession
			 ) throws Exception {

		WebserviceResult webserviceResult = new WebserviceResult();
		
		if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
			webserviceResult.userIsProjectOwner = true;
		}
		
		Set<Integer> projectSearchIds_Requested_Set = null;

		if ( projectSearchIds_Requested != null ) {
			
			projectSearchIds_Requested_Set = new HashSet<>( projectSearchIds_Requested );
		}
		
		List<SearchItemMinimal> searchListDB = searchListForProjectIdSearcher.getSearchListForProjectId( projectId );
		
		if ( projectSearchIds_Requested_Set != null ) {
			
			//  Reduce searchListDB to ONLY projectSearchIds_Requested_Set
			
			List<SearchItemMinimal> searchListDB_Filtered = new ArrayList<>( searchListDB.size() );
			
			for ( SearchItemMinimal searchListDB_Entry : searchListDB ) {
				
				if ( ! projectSearchIds_Requested_Set.contains( searchListDB_Entry.getProjectSearchId() ) ) {
					//  searchListDB_Entry.getProjectSearchId()  NOT in so SKIP
					continue; // EARLY CONTINUE
				}
				
				searchListDB_Filtered.add(searchListDB_Entry);
			}
			
			searchListDB = searchListDB_Filtered;
		}

		{
			Set<Integer> folderIds_Filtered = null;

			
			{ // populate webserviceResult.folderProjectSearchMappingList

				if ( projectSearchIds_Requested_Set != null ) {
				
					folderIds_Filtered = new HashSet<>();
				}

				List<FolderProjectSearchDTO> folderProjectSearchList_DB = folderProjectSearchDAO.getFolderProjectSearchDTO_ForProjectId( projectId );

				List<WebserviceResult_SingleFolderProjectSearchMapping> folderProjectSearchMappingList_Result = new ArrayList<>( folderProjectSearchList_DB.size() );
				
				for ( FolderProjectSearchDTO folderProjectSearchItem_DB : folderProjectSearchList_DB ) {

					if ( projectSearchIds_Requested_Set != null ) {

						//  process folderProjectSearchList_DB to ONLY projectSearchIds_Requested_Set

						if ( ! projectSearchIds_Requested_Set.contains( folderProjectSearchItem_DB.getProjectSearchId() ) ) {
							//  searchListDB_Entry.getProjectSearchId()  NOT in so SKIP
							continue; // EARLY CONTINUE
						}
					}
					
					if ( folderIds_Filtered != null ) {
						folderIds_Filtered.add( folderProjectSearchItem_DB.getFolderId() );
					}

					WebserviceResult_SingleFolderProjectSearchMapping singleFolderProjectSearchMapping_Result = new WebserviceResult_SingleFolderProjectSearchMapping();
					singleFolderProjectSearchMapping_Result.folderId = folderProjectSearchItem_DB.getFolderId();
					singleFolderProjectSearchMapping_Result.projectSearchId = folderProjectSearchItem_DB.getProjectSearchId();
					singleFolderProjectSearchMapping_Result.searchDisplayOrder = folderProjectSearchItem_DB.getSearchDisplayOrder();
					folderProjectSearchMappingList_Result.add(singleFolderProjectSearchMapping_Result);
				}
				webserviceResult.folderProjectSearchMappingList = folderProjectSearchMappingList_Result;
			}


			{ // populate webserviceResult.folderList

				List<FolderForProjectDTO> folderForProjectList_DB = folderForProjectDAO.getFolderForProjectDTO_ForProjectId( projectId );

				List<WebserviceResult_SingleFolder> folderList_Result = new ArrayList<>( folderForProjectList_DB.size() );

				for ( FolderForProjectDTO folderForProjectItem_DB : folderForProjectList_DB ) {

					if ( folderIds_Filtered != null ) {
						
						if ( ! folderIds_Filtered.contains( folderForProjectItem_DB.getId() ) ) {
							//  folderForProjectItem_DB.getId()  NOT in so SKIP
							continue; // EARLY CONTINUE
						}
					}
					
					WebserviceResult_SingleFolder singleFolder_Result = new WebserviceResult_SingleFolder();

					singleFolder_Result.id = folderForProjectItem_DB.getId();
					singleFolder_Result.folderName = folderForProjectItem_DB.getName();
					singleFolder_Result.displayOrder = folderForProjectItem_DB.getDisplayOrder();

					folderList_Result.add(singleFolder_Result);
				}
				webserviceResult.folderList = folderList_Result;
			}
		}

		if ( searchListDB.isEmpty() ) {
			//  NO Searches
			webserviceResult.noSearchesFound = true;
		}


		List<Integer> projectSearchIdList = new ArrayList<>( searchListDB.size() );
		
		for ( SearchItemMinimal search : searchListDB ) {
			projectSearchIdList.add( search.getProjectSearchId() );
		}
		
		{ 

    		List<WebserviceResult_SingleProjectSearchTagCategory> tagCategories_DistinctInProject = null;
    		{
    			List<ProjectSearchTagCategories_ForProjectId_Searcher_ResultItem> results = 
    					projectSearchTagCategories_ForProjectId_Searcher.getProjectSearchTagCategories_ForProjectId(projectId);
    			
    			tagCategories_DistinctInProject = new ArrayList<>( results.size() );
    			
    			for ( ProjectSearchTagCategories_ForProjectId_Searcher_ResultItem result : results ) {
    				WebserviceResult_SingleProjectSearchTagCategory webserviceResult_TagCategory = new WebserviceResult_SingleProjectSearchTagCategory();
    				webserviceResult_TagCategory.category_id = result.getCategory_id();
    				webserviceResult_TagCategory.category_label = result.getCategory_label();
    				webserviceResult_TagCategory.label_Color_Font = result.getLabel_Color_Font();
    				webserviceResult_TagCategory.label_Color_Background = result.getLabel_Color_Background();
    				webserviceResult_TagCategory.label_Color_Border = result.getLabel_Color_Border();
    				tagCategories_DistinctInProject.add(webserviceResult_TagCategory);
    			}
    		}
    		
    		webserviceResult.tagCategories_DistinctInProject = tagCategories_DistinctInProject;
		}

		{  //  Project Search Tags:   webserviceResult.projectSearchTagList;
			

			Integer id_For_UncategorizedFakeRecord = projectSearch_TagCategoryInProject_DAO.getId_For_UncategorizedFakeRecord();
			

			List<SearchTags_InProject_ForProjectIdSearcher_ResultItem> resultsDB = 
					searchTags_InProject_ForProjectIdSearcher.get_SearchTags_InProject_ForProjectId(projectId);

			List<WebserviceResult_SingleProjectSearchTag> projectSearchTagList = new ArrayList<>( resultsDB.size() );

			for ( SearchTags_InProject_ForProjectIdSearcher_ResultItem resultDB_Item : resultsDB ) {
				
				Integer tagCategoryId = null;
				
				{
					int tag_category_id_FromDB = resultDB_Item.getTag_category_id();

					if ( id_For_UncategorizedFakeRecord == null || id_For_UncategorizedFakeRecord.intValue() != tag_category_id_FromDB ) {
						//  NOT uncategorized so copy to result
						tagCategoryId = tag_category_id_FromDB;
					}
				}
				
				WebserviceResult_SingleProjectSearchTag webserviceResult_SingleProjectSearchTag = new WebserviceResult_SingleProjectSearchTag();
				webserviceResult_SingleProjectSearchTag.tagId = resultDB_Item.getTag_id();
				webserviceResult_SingleProjectSearchTag.tagCategoryId = tagCategoryId;
				webserviceResult_SingleProjectSearchTag.tagString = resultDB_Item.getTag_string();
				webserviceResult_SingleProjectSearchTag.tag_Color_Font = resultDB_Item.getTag_Color_Font();
				webserviceResult_SingleProjectSearchTag.tag_Color_Background = resultDB_Item.getTag_Color_Background();
				webserviceResult_SingleProjectSearchTag.tag_Color_Border = resultDB_Item.getTag_Color_Border();

				projectSearchTagList.add(webserviceResult_SingleProjectSearchTag);
			}
			
			webserviceResult.projectSearchTagList = projectSearchTagList;
		}
		
		{
			List<SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher_ResultItem> resultsDB = 
			searchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher.get_SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectId(projectId);
			
			List<WebserviceResult_Single_ProjectSearchTag_ProjectSearchId_Mapping> projectSearchTag_ProjectSearchId_Mapping_List = new ArrayList<>( resultsDB.size() );
			
			for ( SearchTagId_ProjectSearchId_Mapping_InProject_ForProjectIdSearcher_ResultItem resultDB_Item : resultsDB ) {
				WebserviceResult_Single_ProjectSearchTag_ProjectSearchId_Mapping webserviceResult_ForType = new WebserviceResult_Single_ProjectSearchTag_ProjectSearchId_Mapping();
				webserviceResult_ForType.projectSearchId = resultDB_Item.getProjectSearchId();
				webserviceResult_ForType.tagId = resultDB_Item.getTag_id();
				projectSearchTag_ProjectSearchId_Mapping_List.add(webserviceResult_ForType);
			}
			
			webserviceResult.projectSearchTag_ProjectSearchId_Mapping_List = projectSearchTag_ProjectSearchId_Mapping_List;
		}
		
		if ( searchListDB.isEmpty() ) {

			webserviceResult.searchList = new ArrayList<>( searchListDB.size() );
			
		} else {
			
			//  populate webserviceResult.searchList
		
			List<ProjectSearchIdCodeDTO> projectSearchIdCodeDTOList = projectSearchIdCodeDAO.getByProjectSearchIdList(projectSearchIdList);
			Map<Integer, ProjectSearchIdCodeDTO> projectSearchIdCodeDTOMap_Key_projectSearchId = new HashMap<>( projectSearchIdCodeDTOList.size() );
			for ( ProjectSearchIdCodeDTO projectSearchIdCodeDTO : projectSearchIdCodeDTOList ) {
				projectSearchIdCodeDTOMap_Key_projectSearchId.put( projectSearchIdCodeDTO.getProjectSearchId(), projectSearchIdCodeDTO );
			}
			
			
			Map<Integer, SearchFlagsForSearchIdSearcher_Result_Item> searchFlagsForSearchIdSearcher_Result_Item_Map_Key_SearchId = new HashMap<>( searchListDB.size() );

			{
				List<Integer> searchIds = new ArrayList<>( searchListDB.size() );
				
				for ( SearchItemMinimal searchListDBItem : searchListDB ) {
					searchIds.add( searchListDBItem.getSearchId() );
				}
				SearchFlagsForSearchIdSearcher_Result searchFlagsForSearchIdSearcher_Result = searchFlagsForSearchIdSearcher.getSearchFlags_ForSearchIds( searchIds );
				for ( SearchFlagsForSearchIdSearcher_Result_Item resultItem : searchFlagsForSearchIdSearcher_Result.getResultItems() ) {
					searchFlagsForSearchIdSearcher_Result_Item_Map_Key_SearchId.put( resultItem.getSearchId(), resultItem );
				}
			}

			List<WebserviceResult_SingleSearch> searchList = new ArrayList<>( searchListDB.size() );
			
			for ( SearchItemMinimal searchListDBItem : searchListDB ) {

				ProjectSearchIdCodeDTO projectSearchIdCodeDTO = projectSearchIdCodeDTOMap_Key_projectSearchId.get( searchListDBItem.getProjectSearchId() );
				if ( projectSearchIdCodeDTO == null ) {
					projectSearchIdCodeDTO = _create_Insert_projectSearchIdCodeDTO( searchListDBItem );
				}
				
				SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = searchFlagsForSearchIdSearcher_Result_Item_Map_Key_SearchId.get( searchListDBItem.getSearchId() );
				if ( searchFlagsForSearchIdSearcher_Result_Item == null ) {
					String msg = "searchFlagsForSearchIdSearcher_Result_Item_Map_Key_SearchId.get( searchListDBItem.getSearchId() ); returned null for searchListDBItem.getSearchId(): " + searchListDBItem.getSearchId();
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}

				WebserviceResult_SingleSearch resultItem = new WebserviceResult_SingleSearch();
				resultItem.projectSearchId = searchListDBItem.getProjectSearchId();
				resultItem.projectSearchIdCode = projectSearchIdCodeDTO.getProjectSearchIdCode();
				resultItem.searchId = searchListDBItem.getSearchId();
				resultItem.displayOrder = searchListDBItem.getDisplayOrder();
				resultItem.name = searchNameReturnDefaultIfNull.searchNameReturnDefaultIfNull( searchListDBItem.getName(), searchListDBItem.getSearchId() );
				resultItem.searchShortName = searchListDBItem.getSearchShortName();
				resultItem.searchHasSubgroups = searchListDBItem.isSearchHasSubgroups();
				resultItem.searchHasScanDataFlag = searchListDBItem.isSearchHasScanDataFlag();
				resultItem.searchNotContainProteins = searchFlagsForSearchIdSearcher_Result_Item.isSearchNotContainProteins();
				
				searchList.add( resultItem );
			}

			webserviceResult.searchList = searchList;
		}
		
		return webserviceResult;
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
					
					if ( entry == 'a' || entry == 'e' || entry == 'i' || entry == 'o' || entry == 'u' || entry == 'y' 
							|| entry == 'A' || entry == 'E' || entry == 'I' || entry == 'O' || entry == 'U' || entry == 'Y' ) {
						// Skip all vowels so cannot spell words
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
    	
    	//  Either may be populated.  If Both are populated, 'projectSearchIds' is used and 'projectIdentifier' is validated to be same project
    	
    	private String projectIdentifier;
    	private List<Integer> projectSearchIds;

    	public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
		public void setProjectSearchIds(List<Integer> projectSearchIds) {
			this.projectSearchIds = projectSearchIds;
		}
    }
    
    /**
     * Webservice Result
     *
     */
    public static class WebserviceResult {

    	private boolean userIsProjectOwner;
    	
    	private boolean noSearchesFound;
    	
    	private List<WebserviceResult_SingleFolder> folderList;
    	private List<WebserviceResult_SingleFolderProjectSearchMapping> folderProjectSearchMappingList;
    	private List<WebserviceResult_SingleSearch> searchList;
    	
    	private List<WebserviceResult_SingleProjectSearchTagCategory> tagCategories_DistinctInProject;
    	private List<WebserviceResult_SingleProjectSearchTag> projectSearchTagList;
    	
    	private List<WebserviceResult_Single_ProjectSearchTag_ProjectSearchId_Mapping> projectSearchTag_ProjectSearchId_Mapping_List;

		public List<WebserviceResult_SingleFolder> getFolderList() {
			return folderList;
		}

		public List<WebserviceResult_SingleSearch> getSearchList() {
			return searchList;
		}

		public boolean isNoSearchesFound() {
			return noSearchesFound;
		}

		public List<WebserviceResult_SingleProjectSearchTag> getProjectSearchTagList() {
			return projectSearchTagList;
		}

		public List<WebserviceResult_SingleFolderProjectSearchMapping> getFolderProjectSearchMappingList() {
			return folderProjectSearchMappingList;
		}

		public List<WebserviceResult_Single_ProjectSearchTag_ProjectSearchId_Mapping> getProjectSearchTag_ProjectSearchId_Mapping_List() {
			return projectSearchTag_ProjectSearchId_Mapping_List;
		}

		public boolean isUserIsProjectOwner() {
			return userIsProjectOwner;
		}

		public List<WebserviceResult_SingleProjectSearchTagCategory> getTagCategories_DistinctInProject() {
			return tagCategories_DistinctInProject;
		}
    }

    /**
     * Webservice Result - Single Search
     *
     */
    public static class WebserviceResult_SingleFolder {
    	
    	private int id;
    	private String folderName;
    	private int displayOrder;
    	
		public int getId() {
			return id;
		}
		public String getFolderName() {
			return folderName;
		}
		public int getDisplayOrder() {
			return displayOrder;
		}
    	
    }

    /**
     * Webservice Result - Single Search
     *
     */
    public static class WebserviceResult_SingleFolderProjectSearchMapping {
    	
    	private int folderId;
    	private int projectSearchId;
    	private int searchDisplayOrder;
    	
		public int getFolderId() {
			return folderId;
		}
		public int getProjectSearchId() {
			return projectSearchId;
		}
		public int getSearchDisplayOrder() {
			return searchDisplayOrder;
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
    	private int displayOrder; // zero if no display order applied.   Display Order for "All Searches"
    	private String name;
    	private String searchShortName;
    	private boolean searchHasSubgroups;
    	private boolean searchHasScanDataFlag;
    	private boolean searchNotContainProteins;
		public int getProjectSearchId() {
			return projectSearchId;
		}
		public String getProjectSearchIdCode() {
			return projectSearchIdCode;
		}
		public int getSearchId() {
			return searchId;
		}
		public int getDisplayOrder() {
			return displayOrder;
		}
		public String getName() {
			return name;
		}
		public String getSearchShortName() {
			return searchShortName;
		}
		public boolean isSearchHasSubgroups() {
			return searchHasSubgroups;
		}
		public boolean isSearchHasScanDataFlag() {
			return searchHasScanDataFlag;
		}
		public boolean isSearchNotContainProteins() {
			return searchNotContainProteins;
		}
    }

    /**
     * Webservice Result - Single Project Search Tag Category
     *
     */
    public static class WebserviceResult_SingleProjectSearchTagCategory {

    	private int category_id;
		private String category_label;
		private String label_Color_Font;
    	private String label_Color_Background;
    	private String label_Color_Border;
    	
		public int getCategory_id() {
			return category_id;
		}
		public String getCategory_label() {
			return category_label;
		}
		public String getLabel_Color_Font() {
			return label_Color_Font;
		}
		public String getLabel_Color_Background() {
			return label_Color_Background;
		}
		public String getLabel_Color_Border() {
			return label_Color_Border;
		}
		
    }

    /**
     * Webservice Result - Single Project Search Tag
     *
     */
    public static class WebserviceResult_SingleProjectSearchTag {
    	
    	private int tagId;
    	private Integer tagCategoryId;
    	private String tagString;
		private String tag_Color_Font;
    	private String tag_Color_Background;
    	private String tag_Color_Border;
    	
		public int getTagId() {
			return tagId;
		}
		public String getTagString() {
			return tagString;
		}
		public String getTag_Color_Font() {
			return tag_Color_Font;
		}
		public String getTag_Color_Background() {
			return tag_Color_Background;
		}
		public String getTag_Color_Border() {
			return tag_Color_Border;
		}
		public Integer getTagCategoryId() {
			return tagCategoryId;
		}
    }

    /**
     * Webservice Result - Single Project Search Tag Project SearchId Mapping
     *
     */
    public static class WebserviceResult_Single_ProjectSearchTag_ProjectSearchId_Mapping {
    	
    	private int tagId;
    	private int projectSearchId;
    	
		public int getTagId() {
			return tagId;
		}
		public int getProjectSearchId() {
			return projectSearchId;
		}
    }
}


