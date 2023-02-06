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
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchSubGroupDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchSubGroupDTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.objects.SearchItemMinimal;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchSubGroupDTOForProjectSearchIdSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchMinimalForProjectSearchIdSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchSubGroupDTOForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.SearchNameReturnDefaultIfNull;
import org.yeastrc.limelight.limelight_webapp.web_utils.SearchSubGroup_Name_Display_Computation_Util;
import org.yeastrc.limelight.limelight_webapp.web_utils.SearchSubGroup_Name_Display_Computation_Util.SearchSubGroup_Name_Display_Computation_Entry;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Get Search names from Project Search Ids on URI Path
 *
 * POST body is ignored
 * 
 * Returns List<SearchItemMinimal>
 */
@RestController
public class SearchNameList_From_ProjectSearchIds_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( SearchNameList_From_ProjectSearchIds_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SearchMinimalForProjectSearchIdSearcher_IF searchMinimalForProjectSearchIdSearcher_IF;
	
	@Autowired
	private ProjectSearchSubGroupDTOForProjectSearchIdSearcher_IF projectSearchSubGroupDTOForProjectSearchIdSearcher;
	
	@Autowired
	private SearchSubGroupDTOForSearchIdSearcherIF searchSubGroupDTOForSearchIdSearcher;
	
	@Autowired
	private SearchNameReturnDefaultIfNull searchNameReturnDefaultIfNull;
	
	@Autowired
	private SearchSubGroup_Name_Display_Computation_Util searchSubGroup_Name_Display_Computation_Util;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public SearchNameList_From_ProjectSearchIds_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.SEARCH_NAME_LIST_FROM_PROJECT_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER
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

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		List<Integer> projectSearchIdList = webserviceRequest.projectSearchIds;

    		if ( projectSearchIdList == null || projectSearchIdList.isEmpty() ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		////////////////
    		
    		//  AUTH - validate access
    		
    		//  throws an exception if access is not valid that is turned into a webservice response by Spring
    		
    		//  Comment out result since not use it
    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    		validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIdList, httpServletRequest );
    		
    		////////////////

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = 
					validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getWebSessionAuthAccessLevel();

    		boolean canEditSearchSubGroups = false;
    		
    		if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
    			canEditSearchSubGroups = true;
    		}
    		
    		List<WebserviceResult_SearchItemMinimal> searchList = new ArrayList<>( projectSearchIdList.size() );
    		List<Integer> searchIdList_RetrieveSubGroupsFor = new ArrayList<>( projectSearchIdList.size() );
    		Map<Integer, Integer> projectSearchIdMap_Key_SearchId = new HashMap<>( projectSearchIdList.size() + 5 );
    		
    		boolean anySearchHas_searchHasSubgroups = false;

    		for ( Integer projectSearchId : projectSearchIdList ) {
    			SearchItemMinimal searchItemMinimal = searchMinimalForProjectSearchIdSearcher_IF.getSearchListForProjectSearchId( projectSearchId );
    			if ( searchItemMinimal == null ) {
        			log.warn( "projectSearchId not in DB: " + projectSearchId );
        			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}

    			Integer searchId = searchItemMinimal.getSearchId();
    			
    			if ( projectSearchIdMap_Key_SearchId.containsKey( searchId ) ) {
    				Integer prev_projectSearchId = projectSearchIdMap_Key_SearchId.get( searchId );
    				log.error( "More than 1 project search id maps to same search id.  searchId: " + searchId 
    						+ ", current projectSearchId: " + projectSearchId
    						+ ", previous projectSearchId: " + prev_projectSearchId );
    			}

    			projectSearchIdMap_Key_SearchId.put( searchId, projectSearchId );

    			WebserviceResult_SearchItemMinimal webserviceResult_SearchItemMinimal = new WebserviceResult_SearchItemMinimal();
    			webserviceResult_SearchItemMinimal.projectSearchId = searchItemMinimal.getProjectSearchId();
    			webserviceResult_SearchItemMinimal.searchId = searchItemMinimal.getSearchId();
    			webserviceResult_SearchItemMinimal.name = 
    					searchNameReturnDefaultIfNull.searchNameReturnDefaultIfNull( searchItemMinimal.getName(), searchItemMinimal.getSearchId() );
    			webserviceResult_SearchItemMinimal.searchShortName = searchItemMinimal.getSearchShortName();
    			webserviceResult_SearchItemMinimal.searchHasSubgroups = searchItemMinimal.isSearchHasSubgroups();
    			searchList.add( webserviceResult_SearchItemMinimal );
    			
    			if ( searchItemMinimal.isSearchHasSubgroups() ) {
    				anySearchHas_searchHasSubgroups = true;
    			
	    			searchIdList_RetrieveSubGroupsFor.add( searchId );
    			}
    		}
    		
    		List<WebserviceResult_SearchSubgroup_PerSearch_Grouping> searchSubGroupsPerSearchList = null;
    		
    		if ( anySearchHas_searchHasSubgroups ) {

    			//  Get DB Search Sub Groups from project search ids

    			List<SearchSubGroupDTO> searchSubGroupsDBList = 
    					searchSubGroupDTOForSearchIdSearcher.getListForSearchId( searchIdList_RetrieveSubGroupsFor );
    			
    			List<ProjectSearchSubGroupDTO> projectSearchSubGroupsDBList = 
    					projectSearchSubGroupDTOForProjectSearchIdSearcher.getListForProjectSearchIds( projectSearchIdList );
    			
    			Map<Integer, Map<Integer, ProjectSearchSubGroupDTO>> projectSearchSubGroupDTO_Map_Key_SubGroupId_Key_SearchId = new HashMap<>();
    			
    			for ( ProjectSearchSubGroupDTO item : projectSearchSubGroupsDBList ) {
    				
    				Integer searchId = item.getSearchId();
    				Integer searchSubGroupId = item.getSearchSubGroupId();
    				Map<Integer, ProjectSearchSubGroupDTO> projectSearchSubGroupDTO_Map_Key_SubGroupId = projectSearchSubGroupDTO_Map_Key_SubGroupId_Key_SearchId.get( searchId );
    				if ( projectSearchSubGroupDTO_Map_Key_SubGroupId == null ) {
    					projectSearchSubGroupDTO_Map_Key_SubGroupId = new HashMap<>();
    					projectSearchSubGroupDTO_Map_Key_SubGroupId_Key_SearchId.put( searchId, projectSearchSubGroupDTO_Map_Key_SubGroupId );
    				}
    				ProjectSearchSubGroupDTO existingMapEntry = projectSearchSubGroupDTO_Map_Key_SubGroupId.put( searchSubGroupId, item );
    				if ( existingMapEntry != null ) {
    					String msg = "projectSearchSubGroupDTO_Map_Key_SubGroupId aleady has map entry for searchSubGroupId: " + searchSubGroupId 
    							+ ", searchId: " + searchId;
    					log.error(msg);
    					throw new LimelightInternalErrorException(msg);
    				}
    			}

    			Map<Integer, List<SearchSubGroup_Name_Display_Computation_Entry>> intermediateList_Map_Key_SearchId = new HashMap<>( searchIdList_RetrieveSubGroupsFor.size() );
    			
    			for ( SearchSubGroupDTO entry : searchSubGroupsDBList ) {

    				Integer searchId = entry.getSearchId();
    						
    				List<SearchSubGroup_Name_Display_Computation_Entry> list_For_SearchId = intermediateList_Map_Key_SearchId.get( searchId );
    				if ( list_For_SearchId == null ) {
    					list_For_SearchId = new ArrayList<>( searchSubGroupsDBList.size() );
    					intermediateList_Map_Key_SearchId.put( searchId, list_For_SearchId );
    				}
    				
    				ProjectSearchSubGroupDTO projectSearchSubGroupDTO = null;
    				{ // projectSearchSubGroupDTO may be null after this block
    					Map<Integer, ProjectSearchSubGroupDTO> projectSearchSubGroupDTO_Map_Key_SubGroupId = projectSearchSubGroupDTO_Map_Key_SubGroupId_Key_SearchId.get( searchId );
    					if ( projectSearchSubGroupDTO_Map_Key_SubGroupId != null ) {
    						projectSearchSubGroupDTO = projectSearchSubGroupDTO_Map_Key_SubGroupId.get( entry.getSearchSubGroupId() );
    					}
    				}

    				//  Build Entry for compute name display list
    				SearchSubGroup_Name_Display_Computation_Entry result_SearchSubgroupItem = new SearchSubGroup_Name_Display_Computation_Entry();
    				result_SearchSubgroupItem.setSearchSubGroupId( entry.getSearchSubGroupId() );
    				result_SearchSubgroupItem.setSubgroupName_fromImportFile( entry.getSubgroupName_fromImportFile() );
    				if ( projectSearchSubGroupDTO != null ) {
    					result_SearchSubgroupItem.setDisplayOrder( projectSearchSubGroupDTO.getDisplayOrder() );
        				result_SearchSubgroupItem.setSubgroupName_Display_FromServer_IfUserEnteredAValue( projectSearchSubGroupDTO.getSubgroupName_Display() );
    				}

    				list_For_SearchId.add( result_SearchSubgroupItem );
    			}
    			
    			//  Compute result_SearchSubgroupItem.subgroupName_Display
    			
    			for ( Map.Entry<Integer, List<SearchSubGroup_Name_Display_Computation_Entry>> mapEntry : intermediateList_Map_Key_SearchId.entrySet() ) {
    			
    				searchSubGroup_Name_Display_Computation_Util.searchSubGroup_Name_Display_Computation__SortOn_DisplayOrder_SubGroupNameDisplay__Util( mapEntry.getValue() );
    			}

    			//  Final output List
    			
    			searchSubGroupsPerSearchList = new ArrayList<>( searchIdList_RetrieveSubGroupsFor.size() );
    			
    			for ( Map.Entry<Integer, List<SearchSubGroup_Name_Display_Computation_Entry>> mapEntry : intermediateList_Map_Key_SearchId.entrySet() ) {
    				
    				Integer searchId = mapEntry.getKey();
    				List<SearchSubGroup_Name_Display_Computation_Entry> nameDisplay_ComputationEntry_List = mapEntry.getValue();

    				Integer projectSearchId = projectSearchIdMap_Key_SearchId.get( searchId );
    				if ( projectSearchId == null ) {
    					String msg = "projectSearchId not found in projectSearchIdMap_Key_SearchId: searchId: " + searchId;
    					log.error( msg );
    					throw new LimelightInternalErrorException( msg );
    				}
    				
    				WebserviceResult_SearchSubgroup_PerSearch_Grouping perSearch_Grouping = new WebserviceResult_SearchSubgroup_PerSearch_Grouping();
    				searchSubGroupsPerSearchList.add(perSearch_Grouping);
    				
    				List<WebserviceResult_SearchSubgroupItem> searchSubgroupItems = new ArrayList<>( mapEntry.getValue().size() );
    				perSearch_Grouping.projectSearchId = projectSearchId;
    				perSearch_Grouping.searchId = searchId;
    				perSearch_Grouping.searchSubgroupItems = searchSubgroupItems;
    				
    				for ( SearchSubGroup_Name_Display_Computation_Entry entry : nameDisplay_ComputationEntry_List ) {

    					//  Build Entry for output list
    					WebserviceResult_SearchSubgroupItem result_SearchSubgroupItem = new WebserviceResult_SearchSubgroupItem();
    					result_SearchSubgroupItem.searchSubGroupId = entry.getSearchSubGroupId();
    					result_SearchSubgroupItem.displayOrder = entry.getDisplayOrder();
    					result_SearchSubgroupItem.subgroupName_fromImportFile = entry.getSubgroupName_fromImportFile();
    					result_SearchSubgroupItem.subgroupName_Display_FromServer_IfUserEnteredAValue = entry.getSubgroupName_Display_FromServer_IfUserEnteredAValue();
    					result_SearchSubgroupItem.subgroupName_Display = entry.getSubgroupName_Display();

    					searchSubgroupItems.add( result_SearchSubgroupItem );
    				}
    			}
    		}
    		
    		
    		WebserviceResult webserviceResult = new WebserviceResult();
    		
    		webserviceResult.searchList = searchList;
    		webserviceResult.searchSubGroupsPerSearchList = searchSubGroupsPerSearchList;
    		
    		webserviceResult.canEditSearchSubGroups = canEditSearchSubGroups;

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
    	
    	List<WebserviceResult_SearchItemMinimal> searchList;
    	List<WebserviceResult_SearchSubgroup_PerSearch_Grouping> searchSubGroupsPerSearchList;
    	
    	boolean canEditSearchSubGroups;

		public List<WebserviceResult_SearchItemMinimal> getSearchList() {
			return searchList;
		}
		public List<WebserviceResult_SearchSubgroup_PerSearch_Grouping> getSearchSubGroupsPerSearchList() {
			return searchSubGroupsPerSearchList;
		}
		public boolean isCanEditSearchSubGroups() {
			return canEditSearchSubGroups;
		}
    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult_SearchItemMinimal {
    	
    	private int projectSearchId;
    	private int searchId;
    	private String name;
    	private String searchShortName;
    	private boolean searchHasSubgroups;
    	
		public int getProjectSearchId() {
			return projectSearchId;
		}
		public int getSearchId() {
			return searchId;
		}
		public String getName() {
			return name;
		}
		public boolean isSearchHasSubgroups() {
			return searchHasSubgroups;
		}
		public String getSearchShortName() {
			return searchShortName;
		}
    	
    }

    /**
     * 
     *
     */
    public static class WebserviceResult_SearchSubgroup_PerSearch_Grouping {
    	
    	private int projectSearchId;
    	private int searchId;
    	private List<WebserviceResult_SearchSubgroupItem> searchSubgroupItems;
    	
		public int getProjectSearchId() {
			return projectSearchId;
		}
		public int getSearchId() {
			return searchId;
		}
		public List<WebserviceResult_SearchSubgroupItem> getSearchSubgroupItems() {
			return searchSubgroupItems;
		}
    }

    /**
     * 
     *
     */
    public static class WebserviceResult_SearchSubgroupItem {
    	
    	private int searchSubGroupId; // Unique within a search id
    	private Integer displayOrder;  // null if not set, User specified Display Order
    	private String subgroupName_fromImportFile;
    	private String subgroupName_Display_FromServer_IfUserEnteredAValue; // null until user enters a value
    	private String subgroupName_Display; // User value or computed from subgroupName_fromImportFile
    	
		public int getSearchSubGroupId() {
			return searchSubGroupId;
		}
		public String getSubgroupName_fromImportFile() {
			return subgroupName_fromImportFile;
		}
		public String getSubgroupName_Display() {
			return subgroupName_Display;
		}
		public String getSubgroupName_Display_FromServer_IfUserEnteredAValue() {
			return subgroupName_Display_FromServer_IfUserEnteredAValue;
		}
		public Integer getDisplayOrder() {
			return displayOrder;
		}

    }    
}


