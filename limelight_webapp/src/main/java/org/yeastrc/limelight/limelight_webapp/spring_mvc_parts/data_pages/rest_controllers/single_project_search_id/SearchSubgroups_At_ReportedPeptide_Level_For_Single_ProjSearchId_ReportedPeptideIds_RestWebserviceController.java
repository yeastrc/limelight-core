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
import org.yeastrc.limelight.limelight_shared.dto.SearchRepPeptSubGroupDTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchRepPeptSubGroupDTOForSearchIdReportedPeptideIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Webservice to get Search Sub Group Ids at Reported Peptide Level for Single Search
 * 
 * Input: Project Search Id and Reported Peptide Ids
 * 
 * Output List:  [{repPeptId: #, srchSbGrpId: #}]
 * 
 */
@RestController
public class SearchSubgroups_At_ReportedPeptide_Level_For_Single_ProjSearchId_ReportedPeptideIds_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( SearchSubgroups_At_ReportedPeptide_Level_For_Single_ProjSearchId_ReportedPeptideIds_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private SearchRepPeptSubGroupDTOForSearchIdReportedPeptideIdsSearcherIF searchRepPeptSubGroupDTOForSearchIdReportedPeptideIdsSearcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public SearchSubgroups_At_ReportedPeptide_Level_For_Single_ProjSearchId_ReportedPeptideIds_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.SEARCH_SUB_GROUPS_REPORTED_PEPTIDE_LEVEL_SINGLE_PROJECT_SEARCH_ID
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

    		Integer projectSearchId = webserviceRequest.projectSearchId;
    		List<Integer> reportedPeptideIds = webserviceRequest.reportedPeptideIds;

    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( reportedPeptideIds == null ) {
    			log.warn( "No Reported Peptide Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		if ( reportedPeptideIds.isEmpty() ) {
    			log.warn( "Reported Peptide Ids is empty" );
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
   		
       		Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
   			
			//  Get DB Search Sub Groups from project search id
   			
       		List<SearchRepPeptSubGroupDTO> searchRepPeptSubGroupsDBList = 
       				searchRepPeptSubGroupDTOForSearchIdReportedPeptideIdsSearcher.getListForSearchIdReportedPeptideIds( searchId, reportedPeptideIds );

    		//  Final output static mods List
    		List<WebserviceResultItem> searchReportedPeptideSubGroupIdsList = new ArrayList<>( searchRepPeptSubGroupsDBList.size() );

    		for ( SearchRepPeptSubGroupDTO entry : searchRepPeptSubGroupsDBList ) {

    			//  Build Entry for output list
    			WebserviceResultItem resultItem = new WebserviceResultItem();
    			resultItem.repPeptId = entry.getReportedPeptideId();
    			resultItem.srchSbGrpId = entry.getSearchSubGroupId();
    			
    			searchReportedPeptideSubGroupIdsList.add( resultItem );
    		}
    		
    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.searchReportedPeptideSubGroupIdsList = searchReportedPeptideSubGroupIdsList;

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
    
    	private Integer projectSearchId;
    	private List<Integer> reportedPeptideIds;

		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public void setReportedPeptideIds(List<Integer> reportedPeptideIds) {
			this.reportedPeptideIds = reportedPeptideIds;
		}
    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    	
    	private List<WebserviceResultItem> searchReportedPeptideSubGroupIdsList;

		public List<WebserviceResultItem> getSearchReportedPeptideSubGroupIdsList() {
			return searchReportedPeptideSubGroupIdsList;
		}


    }

    /**
     * 
     *
     */
    public static class WebserviceResultItem {
    	
    	private int repPeptId;
    	private Integer srchSbGrpId;
    	
		public int getRepPeptId() {
			return repPeptId;
		}
		public Integer getSrchSbGrpId() {
			return srchSbGrpId;
		}
    }
    	
}


