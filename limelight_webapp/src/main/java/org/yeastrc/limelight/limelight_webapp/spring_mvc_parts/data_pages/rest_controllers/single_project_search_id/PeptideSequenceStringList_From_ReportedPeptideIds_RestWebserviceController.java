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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
import org.yeastrc.limelight.limelight_webapp.searchers.PeptideSequenceStringsForSearchIdReportedPeptideIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PeptideSequenceStringsForSearchIdReportedPeptideId_Item;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Get Peptide Ids from Reported Peptide Ids and Project Search Id.  
 * 
 * A boolean in the response indicates if all Reported Peptide Ids were found
 * 
 * Returns List<>
 */
@RestController
public class PeptideSequenceStringList_From_ReportedPeptideIds_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( PeptideSequenceStringList_From_ReportedPeptideIds_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
		
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private PeptideSequenceStringsForSearchIdReportedPeptideIdsSearcherIF peptideSequenceStringsForSearchIdReportedPeptideIdsSearcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	
    /**
	 * 
	 */
	public PeptideSequenceStringList_From_ReportedPeptideIds_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.PEPTIDE_SEQUENCE_STRINGS_FOR_REPORTED_PEPTIDES_ID_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  controllerEntry(
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    	try {
//    		log.warn( "controllerEntry(...) called" );

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

    		Integer projectSearchId = webserviceRequest.getProjectSearchId();
    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Id" );
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
   		
    		    		
    		List<Integer> reportedPeptideIds = webserviceRequest.getReportedPeptideIds();
    		if ( reportedPeptideIds == null ) {
    			log.warn( "No reportedPeptideIds == null.  projectSearchId: " + projectSearchId );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		Integer searchId =	searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
			if ( searchId == null ) {
    			log.warn( "projectSearchId not in DB:" + projectSearchId );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

    		List<WebserviceResulItem> resultList = null;

			//  Validate all ReportedPeptideId found in DB
			boolean foundAllReportedPeptideIdsForProjectSearchId = true;
			
			if ( reportedPeptideIds.isEmpty() ) {
				
				resultList = new ArrayList<>();
				
			} else {

				List<PeptideSequenceStringsForSearchIdReportedPeptideId_Item> searcherResultList = 
						peptideSequenceStringsForSearchIdReportedPeptideIdsSearcher
						.getPeptideSequenceStringsForSearchIdReportedPeptideIds( searchId, reportedPeptideIds );

				resultList = new ArrayList<>( searcherResultList.size() );

				//  Validate all ReportedPeptideId found in DB
				Set<Integer> reportedPeptideIdsRequestedAsSet = new HashSet<>( reportedPeptideIds );

				for ( PeptideSequenceStringsForSearchIdReportedPeptideId_Item searcherResult : searcherResultList ) {

					WebserviceResulItem resultItem = new WebserviceResulItem();
					resultItem.setReportedPeptideId( searcherResult.getReportedPeptideId() );
					resultItem.setPeptideId( searcherResult.getPeptideId() );
					resultItem.setPeptideSequence( searcherResult.getPeptideSequence() );
					resultList.add( resultItem );

					//  Validate all ReportedPeptideId found in DB
					reportedPeptideIdsRequestedAsSet.remove( searcherResult.getReportedPeptideId() );
				}

				//  Validate all ReportedPeptideId found in DB
				if ( ! reportedPeptideIdsRequestedAsSet.isEmpty() ) {
					foundAllReportedPeptideIdsForProjectSearchId = false;
					String msg = "For projectSearchId: " + projectSearchId
							+ ", Failed to get Peptide Ids.  reportedPeptideIds Not Found: " + reportedPeptideIdsRequestedAsSet;
					log.warn( msg );
				}
			}

    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.resultList = resultList;
    		webserviceResult.foundAllReportedPeptideIdsForProjectSearchId = foundAllReportedPeptideIdsForProjectSearchId;

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
    
    
    //////////////////////////////////////////
    
    //   Webservice Request and Result
    
    /**
     * 
     *
     */
    public static class WebserviceRequest {

    	private Integer projectSearchId;
    	private List<Integer> reportedPeptideIds;
    	
		public List<Integer> getReportedPeptideIds() {
			return reportedPeptideIds;
		}
		public void setReportedPeptideIds(List<Integer> reportedPeptideIds) {
			this.reportedPeptideIds = reportedPeptideIds;
		}
		public Integer getProjectSearchId() {
			return projectSearchId;
		}
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}


    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    
    	private List<WebserviceResulItem> resultList;
    	private boolean foundAllReportedPeptideIdsForProjectSearchId;
    	
		public List<WebserviceResulItem> getResultList() {
			return resultList;
		}
		public void setResultList(List<WebserviceResulItem> resultList) {
			this.resultList = resultList;
		}
		public boolean isFoundAllReportedPeptideIdsForProjectSearchId() {
			return foundAllReportedPeptideIdsForProjectSearchId;
		}
		public void setFoundAllReportedPeptideIdsForProjectSearchId(boolean foundAllReportedPeptideIdsForProjectSearchId) {
			this.foundAllReportedPeptideIdsForProjectSearchId = foundAllReportedPeptideIdsForProjectSearchId;
		}

    }
    
    public static class WebserviceResulItem {
        
    	private Integer reportedPeptideId;
    	private Integer peptideId;
    	private String peptideSequence;
    	
		public Integer getReportedPeptideId() {
			return reportedPeptideId;
		}
		public void setReportedPeptideId(Integer reportedPeptideId) {
			this.reportedPeptideId = reportedPeptideId;
		}
		public Integer getPeptideId() {
			return peptideId;
		}
		public void setPeptideId(Integer peptideId) {
			this.peptideId = peptideId;
		}
		public String getPeptideSequence() {
			return peptideSequence;
		}
		public void setPeptideSequence(String peptideSequence) {
			this.peptideSequence = peptideSequence;
		}

    }

    
}


