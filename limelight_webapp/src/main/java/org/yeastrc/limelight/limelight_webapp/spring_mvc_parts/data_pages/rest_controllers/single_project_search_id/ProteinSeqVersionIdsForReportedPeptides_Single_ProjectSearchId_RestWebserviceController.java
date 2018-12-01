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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinVersionIdsFor_SearchID_ReportedPeptideIdList_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_ProteinSequenceVersionId_Pair_Item_FromSearcher;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_request_objects.controller_request_root.ProteinSeqVersionIdsForReportedPeptides_Single_ProjectSearchId_RequestRoot;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Webservice
 * 
 * Input: Project Search Id and Reported Peptide Ids
 * 
 * Output List:  Entry:  Protein Sequence Version Ids for each Reported Peptide Id
 * 
 *             Need to validate Project Search ID values in URL with values in POST JSON
 *               Already done for Ann Type Cutoffs in called code that translates cutoffs to objects sent to searcher
 *
 */
@RestController
public class ProteinSeqVersionIdsForReportedPeptides_Single_ProjectSearchId_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( ProteinSeqVersionIdsForReportedPeptides_Single_ProjectSearchId_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

//	@Autowired
//	private ProteinVersionIdsFor_SearchID_ReportedPeptideId_SearcherIF proteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher;
	
	@Autowired
	private ProteinVersionIdsFor_SearchID_ReportedPeptideIdList_SearcherIF proteinVersionIdsFor_SearchID_ReportedPeptideIdList_Searcher;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public ProteinSeqVersionIdsForReportedPeptides_Single_ProjectSearchId_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.PROTEIN_SEQ_V_ID_LIST_PER_REPORTED_PEPTIDE_ID_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER
					+ AA_RestWSControllerPaths_Constants.PATH_PARAMETER_LABEL_WEBSERVICE_SYNC_TRACKING_PATH_ADDITION
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod(

			@PathVariable(value = AA_RestWSControllerPaths_Constants.PATH_PARAMETER_LABEL_WEBSERVICE_SYNC_TRACKING) 
    		String webserviceSyncTracking,
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    	try {
//    		log.warn( "webserviceMethod(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( webserviceSyncTracking );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs
    		
    		if ( postBody == null || postBody.length == 0 ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		ProteinSeqVersionIdsForReportedPeptides_Single_ProjectSearchId_RequestRoot webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, ProteinSeqVersionIdsForReportedPeptides_Single_ProjectSearchId_RequestRoot.class );

    		Integer projectSearchId = webserviceRequest.getProjectSearchId();

    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Ids" );
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
   		

    		Map<Integer,List<Integer>> proteinSequenceVersionIdsPerReportedPeptideIdMap = new HashMap<>();

//    		for ( Integer reportedPeptideId : webserviceRequest.getReportedPeptideIds() ) {
//
//    			//      Get Protein Sequence Version Id values for Reported Peptide
//    			List<Integer> proteinSequenceVersionIds =
//    					proteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher
//    					.getProteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher( searchId, reportedPeptideId );
//
//    			proteinSequenceVersionIdsPerReportedPeptideIdMap.put( reportedPeptideId, proteinSequenceVersionIds );
//    		}
    		
    		List<ReportedPeptide_ProteinSequenceVersionId_Pair_Item_FromSearcher> reportedPeptide_ProteinSequenceVersionId_Pair_List = 
    				proteinVersionIdsFor_SearchID_ReportedPeptideIdList_Searcher
    				.getProteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher( searchId, webserviceRequest.getReportedPeptideIds() );

    		for ( ReportedPeptide_ProteinSequenceVersionId_Pair_Item_FromSearcher item : reportedPeptide_ProteinSequenceVersionId_Pair_List ) {
    			List<Integer> proteinSequenceVersionIds = proteinSequenceVersionIdsPerReportedPeptideIdMap.get( item.getReportedPeptideId() );
    			if ( proteinSequenceVersionIds == null ) {
    				proteinSequenceVersionIds = new ArrayList<>();
    				proteinSequenceVersionIdsPerReportedPeptideIdMap.put( item.getReportedPeptideId(), proteinSequenceVersionIds );
    			}
    			proteinSequenceVersionIds.add( item.getProteinSequenceVersionId() );
     		}

    		

    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.proteinSequenceVersionIdsPerReportedPeptideIdMap = proteinSequenceVersionIdsPerReportedPeptideIdMap;

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
    public static class WebserviceResult {
    	
    	Map<Integer,List<Integer>> proteinSequenceVersionIdsPerReportedPeptideIdMap;

		public Map<Integer, List<Integer>> getProteinSequenceVersionIdsPerReportedPeptideIdMap() {
			return proteinSequenceVersionIdsPerReportedPeptideIdMap;
		}

		public void setProteinSequenceVersionIdsPerReportedPeptideIdMap(
				Map<Integer, List<Integer>> proteinSequenceVersionIdsPerReportedPeptideIdMap) {
			this.proteinSequenceVersionIdsPerReportedPeptideIdMap = proteinSequenceVersionIdsPerReportedPeptideIdMap;
		}
    }

}

