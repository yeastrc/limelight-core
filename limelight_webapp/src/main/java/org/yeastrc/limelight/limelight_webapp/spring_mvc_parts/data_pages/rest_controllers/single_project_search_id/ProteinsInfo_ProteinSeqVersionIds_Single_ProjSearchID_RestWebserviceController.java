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
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinSequenceLengths_For_SearchID_ProteinVersionIds_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher.ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ProteinSequenceLengths_For_ProteinVersionIds_SearchId_Item;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_request_objects.controller_request_root.ProteinsInfo_ForProteinSequenceVersionIds_Single_PSID_RequestRoot;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Retrieve Protein Annotation Info for Project Search ID and Protein Sequence Version Ids
 *
 * TODO See Below:  Optimize to use a Single Database Query.  Coded this way since DB query already written.
 */
@RestController
public class ProteinsInfo_ProteinSeqVersionIds_Single_ProjSearchID_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( ProteinsInfo_ProteinSeqVersionIds_Single_ProjSearchID_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher_IF proteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher;
	
	@Autowired
	private ProteinSequenceLengths_For_SearchID_ProteinVersionIds_SearcherIF proteinSequenceLengths_For_SearchID_ProteinVersionIds_Searcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public ProteinsInfo_ProteinSeqVersionIds_Single_ProjSearchID_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.PROTEIN_INFO_PROTEIN_SEQUENCE_VERSION_IDS_REST_WEBSERVICE_CONTROLLER
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

    		ProteinsInfo_ForProteinSequenceVersionIds_Single_PSID_RequestRoot webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, ProteinsInfo_ForProteinSequenceVersionIds_Single_PSID_RequestRoot.class );

    		Integer projectSearchId = webserviceRequest.getProjectSearchId();

    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Id" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		if ( webserviceRequest.getProteinSequenceVersionIds() == null ) {
    			log.warn( "No ProteinSequenceVersionIds, == null" );
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

    		
    		List<ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher_ResultItem> proteinAnnotationsList = 
    				proteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher
    				.getProteinAnnotations_For_SearchID_ProteinVersionIdList_Searcher(searchId, webserviceRequest.getProteinSequenceVersionIds() );
    		
    		List<ProteinSequenceLengths_For_ProteinVersionIds_SearchId_Item> proteinLengthsByproteinSequenceVersionIdList = 
    				proteinSequenceLengths_For_SearchID_ProteinVersionIds_Searcher
    				.getProteinSequences_For_ProteinVersionIdsSearchId( webserviceRequest.getProteinSequenceVersionIds(), searchId );


        	List<WebserviceResult_ProteinAnnotation_Item> proteinAnnotationList = new ArrayList<>( proteinAnnotationsList.size() );  // Multiple per proteinSequenceVersionId
        	List<WebserviceResult_ProteinLength_Item> proteinLengthList = new ArrayList<>( proteinLengthsByproteinSequenceVersionIdList.size() );  //  One per proteinSequenceVersionId
        	
        	for ( ProteinAnnotations_For_SearchId_ProteinVersionIdList_Searcher_ResultItem proteinAnnotation : proteinAnnotationsList ) {
        		WebserviceResult_ProteinAnnotation_Item resultItem = new WebserviceResult_ProteinAnnotation_Item();
        		proteinAnnotationList.add( resultItem );
        		
        		resultItem.psvid = proteinAnnotation.getProteinSequenceVersionId();
        		resultItem.name = proteinAnnotation.getName();
        		resultItem.desc = proteinAnnotation.getDescription();
        		resultItem.tax = proteinAnnotation.getTaxonomy();
        	}

        	for ( ProteinSequenceLengths_For_ProteinVersionIds_SearchId_Item proteinLengthsByproteinSequenceVersionId : proteinLengthsByproteinSequenceVersionIdList ) {
        		WebserviceResult_ProteinLength_Item resultItem = new WebserviceResult_ProteinLength_Item();
        		proteinLengthList.add( resultItem );
        		
        		resultItem.psvid = proteinLengthsByproteinSequenceVersionId.getProteinVersionId();
        		resultItem.protLen = proteinLengthsByproteinSequenceVersionId.getProteinSequenceLength();
        	}
        	
    		
    		
    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.proteinAnnotationList = proteinAnnotationList;
    		webserviceResult.proteinLengthList = proteinLengthList;
    		
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
    public static class WebserviceResult {

    	private List<WebserviceResult_ProteinAnnotation_Item> proteinAnnotationList;  // Multiple per proteinSequenceVersionId
    	private List<WebserviceResult_ProteinLength_Item> proteinLengthList;  //  One per proteinSequenceVersionId
    	
		public List<WebserviceResult_ProteinAnnotation_Item> getProteinAnnotationList() {
			return proteinAnnotationList;
		}
		public List<WebserviceResult_ProteinLength_Item> getProteinLengthList() {
			return proteinLengthList;
		}
    }

	public static class WebserviceResult_ProteinAnnotation_Item {

		private int psvid;   //  proteinSequenceVersionId
		private String name; //  name
		private String desc; //  description
		private int tax;     //  taxonomy

		public String getName() {
			return name;
		}
		public String getDesc() {
			return desc;
		}
		public int getTax() {
			return tax;
		}
		public int getPsvid() {
			return psvid;
		}
	}

	public static class WebserviceResult_ProteinLength_Item {
		
		private int psvid;   //  proteinSequenceVersionId
		private int protLen; //  proteinLength
		
		public int getPsvid() {
			return psvid;
		}
		public int getProtLen() {
			return protLen;
		}
	}
}


