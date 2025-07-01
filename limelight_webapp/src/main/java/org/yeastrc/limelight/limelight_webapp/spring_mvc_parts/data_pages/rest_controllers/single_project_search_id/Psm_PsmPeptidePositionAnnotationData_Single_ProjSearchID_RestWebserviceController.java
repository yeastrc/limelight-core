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
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_Utils;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.Get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.Get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeId_Searcher.Get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeIds_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * 
 * 
 * Retrieve PSM PsmPeptidePositionAnnotation Data for PSM Ids, Annotation Type Id, Project Search ID
 *
 */
@RestController
public class Psm_PsmPeptidePositionAnnotationData_Single_ProjSearchID_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Psm_PsmPeptidePositionAnnotationData_Single_ProjSearchID_RestWebserviceController.class );

	/**
	 * Path for this Controller. 
	 */
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.PSM_PEPTIDE_POSITION_ANNOTATIONS_FOR_PSM_IDS_ANNOTATION_TYPE_ID_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER;
	
	/**
	 * Path, updated for use by Cached Response Mgmt ( Cached_WebserviceResponse_Management )
	 */
	private static final String CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT = Cached_WebserviceResponse_Management_Utils.translate_ControllerPath_For_CachedResponseMgmt( CONTROLLER_PATH );
	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private Get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeIds_Searcher_IF get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeId_Searcher;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	
	private boolean parallelStream_DefaultThreadPool_Java_Processing_Enabled_True;

    /**
	 * 
	 */
	public Psm_PsmPeptidePositionAnnotationData_Single_ProjSearchID_RestWebserviceController() {
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

    		WebserviceRequest webserviceRequest =
    				unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		Integer projectSearchId = webserviceRequest.projectSearchId;

    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Id" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
			if ( webserviceRequest.annotationTypeIds == null || webserviceRequest.annotationTypeIds.isEmpty() ) {
				String msg = "annotationTypeId_Array is null or empty: projectSearchId: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( webserviceRequest.psmIds == null || webserviceRequest.psmIds.isEmpty() ) {
				String msg = "No psmIds or is empty: projectSearchId: " + projectSearchId;
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
    		
    		List<Get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeIds_Searcher_Result> dbResultList =
    				get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeId_Searcher
    				.get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeIds( searchId, webserviceRequest.annotationTypeIds, webserviceRequest.psmIds );

    		List<WebserviceResult_Per_Entry> result_PerEntry_List = new ArrayList<>( dbResultList.size() );
    		
    		for ( Get_PsmPeptidePositionFilterableAnnotationDTO_List_For_PsmIds_SearchId_AnnotationTypeIds_Searcher_Result dbResult : dbResultList ) {
    			
    			WebserviceResult_Per_Entry resultEntry = new WebserviceResult_Per_Entry();
    			resultEntry.psmId = dbResult.getPsmId();
    			resultEntry.annotationTypeId = dbResult.getAnnotationTypeId();
    			resultEntry.peptidePosition = dbResult.getPeptidePosition();
    			resultEntry.valueDouble = dbResult.getValueDouble();
    			
    			result_PerEntry_List.add( resultEntry );
    		}
    		
    		WebserviceResult result = new WebserviceResult();
    		result.resultList = result_PerEntry_List;
    		
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( result );

    		byte[] responseAsJSON_FINAL = responseAsJSON;
    		    		
    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON_UTF8).body( responseAsJSON_FINAL );

    	} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
    		
    		//  only rethrow Error Response Exceptions 
    		throw e;
    		
    	} catch ( Exception e ) {
    		String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
    	}
    }
    
    //////////////////////////////////////////
    
    //////  Webservice Request and Response classes

    /////////////
    
    /**
     * 
     *
     */
    public static class WebserviceRequest {

    	private Integer projectSearchId;
    	private List<Integer> annotationTypeIds;
    	private List<Long> psmIds;
    	
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}

		public void setPsmIds(List<Long> psmIds) {
			this.psmIds = psmIds;
		}
		public void setAnnotationTypeIds(List<Integer> annotationTypeIds) {
			this.annotationTypeIds = annotationTypeIds;
		}
    }
    

    /**
     * 
     *
     */
    public static class WebserviceResult {
    	
    	List<WebserviceResult_Per_Entry> resultList;

		public List<WebserviceResult_Per_Entry> getResultList() {
			return resultList;
		}
    }

    /**
     * 
     *
     */
    public static class WebserviceResult_Per_Entry {
    	
    	private long psmId;
    	private int annotationTypeId;
    	/**
    	 * Stored in unsigned short in DB
    	 */
    	private int peptidePosition;
    	
    	private double valueDouble;

		public long getPsmId() {
			return psmId;
		}

		public int getPeptidePosition() {
			return peptidePosition;
		}

		public double getValueDouble() {
			return valueDouble;
		}
		public int getAnnotationTypeId() {
			return annotationTypeId;
		}
    }

}


