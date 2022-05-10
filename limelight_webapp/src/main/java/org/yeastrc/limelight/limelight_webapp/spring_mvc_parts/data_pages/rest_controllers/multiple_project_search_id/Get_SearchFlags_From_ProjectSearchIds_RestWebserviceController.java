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
import org.apache.commons.lang3.StringUtils;
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
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.LimelightWebappDataException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Get Search Flags from Project Search Ids 
 *
 */
@RestController
public class Get_SearchFlags_From_ProjectSearchIds_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Get_SearchFlags_From_ProjectSearchIds_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
	
	@Autowired
	private SearchFlagsForSearchIdSearcherIF searchFlagsForSearchIdSearcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Get_SearchFlags_From_ProjectSearchIds_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.SEARCH_FLAGS_FROM_PROJECT_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER
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
			
			SearchFlagsForSearchIdSearcher_Result searchFlagsForSearchIdSearcher_Result = searchFlagsForSearchIdSearcher.getSearchFlags_ForSearchIds(searchIds);
			if ( searchFlagsForSearchIdSearcher_Result == null || searchFlagsForSearchIdSearcher_Result.getResultItems().isEmpty() ) {
				String msg = "No searchFlagsForSearchIdSearcher_Result for searchIds: " + StringUtils.join( searchIds, "," );
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			List<WebserviceResult_Item> searchFlagsList = new ArrayList<>( projectSearchIdList.size() );
			
			for ( SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item : searchFlagsForSearchIdSearcher_Result.getResultItems() ) {
				
				Integer searchId = searchFlagsForSearchIdSearcher_Result_Item.getSearchId();
				
				Integer projectSearchId = projectSearchId_Map_Key_searchId.remove(searchId); //  Remove to check for all found and for duplicates
				if ( projectSearchId == null ) {
					String msg = "No projectSearchId found in Map for searchId: " + searchId;
					log.error(msg);
					throw new LimelightWebappDataException(msg);
				}
				
				WebserviceResult_Item item = new WebserviceResult_Item();
				searchFlagsList.add(item);
				
				item.projectSearchId = projectSearchId;
				item.searchId = searchId;
				item.hasScanFilenames = searchFlagsForSearchIdSearcher_Result_Item.isHasScanFilenames();
				item.hasScanData = searchFlagsForSearchIdSearcher_Result_Item.isHasScanData();
				item.hasIsotopeLabel = searchFlagsForSearchIdSearcher_Result_Item.isHasIsotopeLabel();
				
				item.anyPsmHas_DynamicModifications = searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_DynamicModifications();
				item.anyPsmHas_OpenModifications = searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_OpenModifications();
				item.anyPsmHas_ReporterIons = searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_ReporterIons();
				
				item.anyPsmHas_IsDecoy_True = searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsDecoy_True();
				item.anyPsmHas_IsIndependentDecoy_True = searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsIndependentDecoy_True();

				item.allPsmHave_Precursor_RetentionTime_PossiblyNull = searchFlagsForSearchIdSearcher_Result_Item.getAllPsmHave_Precursor_RetentionTime();
				item.allPsmHave_Precursor_M_Over_Z_PossiblyNull = searchFlagsForSearchIdSearcher_Result_Item.getAllPsmHave_Precursor_M_Over_Z();
				
				item.psmIds_AreSequential_PossiblyNull = searchFlagsForSearchIdSearcher_Result_Item.getPsmIds_AreSequential();
			}
			
			if ( ! projectSearchId_Map_Key_searchId.isEmpty() ) {
				String msg = "projectSearchIds NOT found Flags Searcher Result: " + StringUtils.join( projectSearchId_Map_Key_searchId.keySet(), "," );
				log.error(msg);
				throw new LimelightWebappDataException(msg);
			}
    		
    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.searchFlagsList = searchFlagsList;
    		
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
    	
    	List<WebserviceResult_Item> searchFlagsList;

		public List<WebserviceResult_Item> getSearchFlagsList() {
			return searchFlagsList;
		}
    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult_Item {
    	
    	private int projectSearchId;
    	private int searchId;
		private boolean hasScanFilenames;
		private boolean hasScanData;
		private boolean hasIsotopeLabel;
		private boolean anyPsmHas_DynamicModifications;
		private boolean anyPsmHas_OpenModifications;
		private boolean anyPsmHas_ReporterIons;

		private boolean anyPsmHas_IsDecoy_True;
		private boolean anyPsmHas_IsIndependentDecoy_True;

		private Boolean allPsmHave_Precursor_RetentionTime_PossiblyNull;		//  null if not populated	//  NOT Populated Yet for Existing Searches
		private Boolean allPsmHave_Precursor_M_Over_Z_PossiblyNull;			//  null if not populated	//  NOT Populated Yet for Existing Searches
		
		private Boolean psmIds_AreSequential_PossiblyNull; //  null if not populated  // All PSM Ids for the search are sequential - can use PSM Id ranges  	//  NOT Populated Yet for Existing Searches
		
		public int getProjectSearchId() {
			return projectSearchId;
		}
		public int getSearchId() {
			return searchId;
		}
		public boolean isHasScanFilenames() {
			return hasScanFilenames;
		}
		public boolean isHasScanData() {
			return hasScanData;
		}
		public boolean isHasIsotopeLabel() {
			return hasIsotopeLabel;
		}
		public boolean isAnyPsmHas_DynamicModifications() {
			return anyPsmHas_DynamicModifications;
		}
		public boolean isAnyPsmHas_OpenModifications() {
			return anyPsmHas_OpenModifications;
		}
		public boolean isAnyPsmHas_ReporterIons() {
			return anyPsmHas_ReporterIons;
		}
		public boolean isAnyPsmHas_IsDecoy_True() {
			return anyPsmHas_IsDecoy_True;
		}
		public boolean isAnyPsmHas_IsIndependentDecoy_True() {
			return anyPsmHas_IsIndependentDecoy_True;
		}
		public Boolean getAllPsmHave_Precursor_RetentionTime_PossiblyNull() {
			return allPsmHave_Precursor_RetentionTime_PossiblyNull;
		}
		public Boolean getAllPsmHave_Precursor_M_Over_Z_PossiblyNull() {
			return allPsmHave_Precursor_M_Over_Z_PossiblyNull;
		}
		public Boolean getPsmIds_AreSequential_PossiblyNull() {
			return psmIds_AreSequential_PossiblyNull;
		}
	
    	
    }
}


