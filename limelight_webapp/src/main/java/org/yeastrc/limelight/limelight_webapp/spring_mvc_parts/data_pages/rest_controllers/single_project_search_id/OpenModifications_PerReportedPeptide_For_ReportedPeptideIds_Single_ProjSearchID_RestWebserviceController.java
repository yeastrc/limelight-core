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
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.OpenModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.OpenModificationsPSMsRoundedUniqueAtReportedPeptideLevelForSearchIdReportedPeptideIdsSearcher.OpenModificationsPSMsRoundedUniqueAtReportedPeptideLevelForSearchIdReportedPeptideIdsSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers_results.OpenModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Retrieve Open Modifications on Reported Peptides Per Reported Peptide Id for Reported Peptide Ids, Project Search ID
 *
 */
@RestController
public class OpenModifications_PerReportedPeptide_For_ReportedPeptideIds_Single_ProjSearchID_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( OpenModifications_PerReportedPeptide_For_ReportedPeptideIds_Single_ProjSearchID_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private OpenModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public OpenModifications_PerReportedPeptide_For_ReportedPeptideIds_Single_ProjSearchID_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.OPEN_MODIFICATIONS_PER_REPORTED_PEPTIDE_ID_FOR_REP_PEPT_IDS_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER
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

    		Webservice_Request webserviceRequest =
    				unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, Webservice_Request.class );

    		Integer projectSearchId = webserviceRequest.getProjectSearchId();

    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
			if ( webserviceRequest.getReportedPeptideIds() == null ) {
				String msg = "reportedPeptideIds == null: " + projectSearchId;
				log.warn( msg );
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
			if ( searchId == null ) {
				String msg = "No searchId for projectSearchId: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
    		Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
    		projectSearchIdMapToSearchId.put( projectSearchId, searchId );
    		
    		OpenModificationsPSMsRoundedUniqueAtReportedPeptideLevelForSearchIdReportedPeptideIdsSearcher_Result searcherResult = 
    				modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher
    				.getOpenModificationsInReportedPeptidesForSearchIdReportedPeptideIds( searchId, webserviceRequest.getReportedPeptideIds() );
    		Map<Integer,List<OpenModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> results_Key_ReportedPeptideId =
    				searcherResult.getResults_Key_ReportedPeptideId();
    		
    		Map<Integer,List<WebserviceResult_Item>> dynamicModification_KeyReportedPeptideId = new HashMap<>();

    		for ( Map.Entry<Integer,List<OpenModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> entry : results_Key_ReportedPeptideId.entrySet() ) {

    			Integer reportedPeptideId = entry.getKey();
    			List<OpenModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item> dbItemList = entry.getValue();
    			
    			//  Result from WS
    			List<WebserviceResult_Item> wsItemList = new ArrayList<>( dbItemList.size() );
    			dynamicModification_KeyReportedPeptideId.put( reportedPeptideId, wsItemList );
    			
    			for ( OpenModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item dbItem : dbItemList ) {
    				WebserviceResult_Item wsItem = new WebserviceResult_Item( dbItem );
    				wsItem.setReportedPeptideId( reportedPeptideId );
    				wsItemList.add( wsItem );
    			}
    		}
    			
    		WebserviceResult result = new WebserviceResult();
    		result.dynamicModification_KeyReportedPeptideId = dynamicModification_KeyReportedPeptideId;
    		
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( result );
    		
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
    public static class Webservice_Request {

    	private Integer projectSearchId;
    	private List<Integer> reportedPeptideIds;

    	public Integer getProjectSearchId() {
    		return projectSearchId;
    	}
    	public void setProjectSearchId(Integer projectSearchId) {
    		this.projectSearchId = projectSearchId;
    	}
    	public List<Integer> getReportedPeptideIds() {
    		return reportedPeptideIds;
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
    	
    	Map<Integer,List<WebserviceResult_Item>> dynamicModification_KeyReportedPeptideId;

		public Map<Integer, List<WebserviceResult_Item>> getOpenModification_KeyReportedPeptideId() {
			return dynamicModification_KeyReportedPeptideId;
		}

		public void setOpenModification_KeyReportedPeptideId(
				Map<Integer, List<WebserviceResult_Item>> dynamicModification_KeyReportedPeptideId) {
			this.dynamicModification_KeyReportedPeptideId = dynamicModification_KeyReportedPeptideId;
		}
    }

    /**
     * Entry per Search Id, Reported Peptide Id
     *
     */
    public static class WebserviceResult_Item {

    	private int reportedPeptideId;
    	private int mass;

    	public WebserviceResult_Item() {}

    	public WebserviceResult_Item( OpenModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item item ) {
    		this.mass = item.getMass();
    	}

    	public int getReportedPeptideId() {
    		return reportedPeptideId;
    	}

    	public void setReportedPeptideId(int reportedPeptideId) {
    		this.reportedPeptideId = reportedPeptideId;
    	}

    	public int getMass() {
    		return mass;
    	}

    	public void setMass(int mass) {
    		this.mass = mass;
    	}
    }
}


