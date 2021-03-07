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


import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_Utils;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinSequences_For_ProteinVersionIds_SearchIds_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ProteinSequences_For_ProteinVersionIds_SearchIds_Item;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

//   COMMENTED OUT SINCE NOT USED


/**
 * Get Protein Residues from Protein Sequence Version Ids and positions.  
 * 
 * Project Search Ids required for access control.
 * 
 * Only Protein Sequence Version Ids for those Project Search Ids will be returned.
 * 
 * A boolean in the response indicates if all Protein Sequence Version Ids were found
 * 
 * Returns List<>
 */
@RestController
public class ProteinResidues_From_ProteinSequenceVersionIds_Positions_RestWebserviceController 

//implements
//InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
//  
//	private static final Logger log = LoggerFactory.getLogger( ProteinResidues_From_ProteinSequenceVersionIds_Positions_RestWebserviceController.class );
//
//	/**
//	 * Path for this Controller
//	 */
//	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.PROTEIN_RESIDUES_FOR_PROT_SEQ_VER_ID_POSITIONS_REST_WEBSERVICE_CONTROLLER;
//	
//	/**
//	 * Path, updated for use by Cached Response Mgmt ( Cached_WebserviceResponse_Management )
//	 */
//	private static final String CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT = Cached_WebserviceResponse_Management_Utils.translate_ControllerPath_For_CachedResponseMgmt( CONTROLLER_PATH );
//
//	@Autowired
//	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;
//
//	@Autowired
//	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
//
//	@Autowired
//	private Cached_WebserviceResponse_Management_IF cached_WebserviceResponse_Management;
//	
//	@Autowired
//	private ProteinSequences_For_ProteinVersionIds_SearchIds_SearcherIF proteinSequences_For_ProteinVersionIds_SearchIds_Searcher;
//	
//	@Autowired
//	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
//	
//	@Autowired
//	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;
//
//	@Autowired
//	private MarshalObjectToJSON marshalObjectToJSON;
//	
//    /**
//	 * 
//	 */
//	public ProteinResidues_From_ProteinSequenceVersionIds_Positions_RestWebserviceController() {
//		super();
////		log.warn( "constructor no params called" );
//	}
//
//	/* 
//	 * Spring LifeCycle Method
//	 * 
//	 * (non-Javadoc)
//	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
//	 */
//	@Override
//	public void afterPropertiesSet() throws Exception {
//		try {
//			cached_WebserviceResponse_Management.registerControllerPathForCachedResponse( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, this );
//			
//		} catch (Exception e) {
//			String msg = "In afterPropertiesSet(): Exception in processing";
//			log.error(msg);
//			throw e;
//		}
//		
//	}
//	
//	//  Convert result object graph to JSON in byte[] in the controller body so can cache it
//
//	//  These 2 annotations work the same
//	
//	//  Mapping the value in {} in the path to parameters in the method:
//	//
//	//    The value in {} has to match the value in the "value = " in the @PathVariable
//	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
//	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
//	
//	@PostMapping( 
//			path = {
//					AA_RestWSControllerPaths_Constants.PATH_START_ALL
//					+ CONTROLLER_PATH
//			},
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )
//
////	@RequestMapping( 
////			path = AA_RestWSControllerPaths_Constants.,
////			method = RequestMethod.POST,
////			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
//
//    public @ResponseBody ResponseEntity<byte[]>  controllerEntry(
//	
//    		@RequestBody byte[] postBody,
//    		HttpServletRequest httpServletRequest,
//    		HttpServletResponse httpServletResponse
//    		) throws Exception {
//    	
//    	try {
////    		log.warn( "controllerEntry(...) called" );
//
//    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
//    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
//    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );
//
//    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs
//
//    		if ( postBody == null ) {
//    			log.warn( "No Post Body" );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
//
//    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );
//
//    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );
//
//    		List<Integer> projectSearchIds = webserviceRequest.getProjectSearchIds();
//    		if ( projectSearchIds == null || projectSearchIds.isEmpty() ) {
//    			log.warn( "No Project Search Ids" );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
//
//    		////////////////
//    		
//    		//  AUTH - validate access
//    		
//    		//  throws an exception if access is not valid that is turned into a webservice response by Spring
//    		
//    		//  Comment out result since not use it
////    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
//    		validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIds, httpServletRequest );
//    		
//    		////////////////
//
//    		{ // Return cached value if available
//    			
//    			byte[] cachedResponse = cached_WebserviceResponse_Management.getCachedResponse( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, this );
//    			
//    			if ( cachedResponse != null ) {
//    				
//    				return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( cachedResponse );
//    			}
//    		}
//    		    		
//    		Map<Integer,List<Integer>> proteinSequenceVersionIdsPositions = webserviceRequest.getProteinSequenceVersionIdsPositions();
//    		if ( proteinSequenceVersionIdsPositions == null ) {
//    			log.warn( "proteinSequenceVersionIdsPositions == null. Project Search Ids: " + projectSearchIds );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
//
//    		Map<Integer, Map<Integer,String>> proteinSeqVId_Position_Residue = new HashMap<>();
//
//    		boolean foundAllProteinSequenceVersionIdsForProjectSearchIds = true;
//    		
//    		if ( ! proteinSequenceVersionIdsPositions.isEmpty() ) {
//
//    			Set<Integer> searchIds = new HashSet<>();
//
//    			for ( Integer projectSearchId : projectSearchIds ) {
//    				Integer searchId =	searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
//    				if ( searchId == null ) {
//    					log.warn( "projectSearchId not in DB: " + projectSearchId );
//    					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    				}
//    				searchIds.add( searchId );
//    			}
//
//    			List<ProteinSequences_For_ProteinVersionIds_SearchIds_Item> searcherResultList = 
//    					proteinSequences_For_ProteinVersionIds_SearchIds_Searcher
//    					.getProteinSequences_For_ProteinVersionIdsSearchIds(proteinSequenceVersionIdsPositions.keySet(), searchIds );
//
//
//    			for ( ProteinSequences_For_ProteinVersionIds_SearchIds_Item searcherResultItem : searcherResultList ) {
//
//    				String proteinSequence= searcherResultItem.getProteinSequence();
//    				int proteinSequenceLength = proteinSequence.length();
//
//    				List<Integer> positions = proteinSequenceVersionIdsPositions.get( searcherResultItem.getProteinVersionId() );
//    				if ( positions == null ) {
//    					throw new LimelightInternalErrorException( "No positions for ProteinVersionId: " + searcherResultItem.getProteinVersionId() );
//    				}
//    				Map<Integer,String> position_Residue = new HashMap<>();
//    				for ( Integer position : positions ) {
//    					if ( position > proteinSequenceLength ) {
//    						throw new LimelightErrorDataInWebRequestException( "Position > proteinSequenceLength. Position: " + position
//    								+ ", proteinSequenceLength: " + proteinSequenceLength
//    								+ ", ProteinVersionId: " + searcherResultItem.getProteinVersionId() );
//    					}
//    					int proteinSequenceIndex = position - 1;
//    					position_Residue.put( position, proteinSequence.substring( proteinSequenceIndex, proteinSequenceIndex + 1 ) );
//    				}
//    				proteinSeqVId_Position_Residue.put( searcherResultItem.getProteinVersionId(), position_Residue );
//    			}
//
//    			//  Validate all ProteinVersionId found in DB
//
//    			for ( Integer proteinSequenceVersionId : proteinSequenceVersionIdsPositions.keySet() ) {
//    				if ( ! proteinSeqVId_Position_Residue.containsKey( proteinSequenceVersionId ) ) {
//    					//  proteinSequenceVersionId not found in DB for Project Search Ids
//
//    					foundAllProteinSequenceVersionIdsForProjectSearchIds = false;
//    					break;
//    					//  Really need better response
//    					//    				throw new IllegalArgumentException( "proteinSequenceVersionId not found in DB for provided Project Search Ids: " + proteinSequenceVersionId );  // TODO need better handling 
//    				}
//    			}
//    		}
//    		
//    		
//    		WebserviceResult webserviceResult = new WebserviceResult();
//    		webserviceResult.proteinSeqVId_Position_Residue = proteinSeqVId_Position_Residue;
//    		webserviceResult.foundAllProteinSequenceVersionIdsForProjectSearchIds = foundAllProteinSequenceVersionIdsForProjectSearchIds;
//
//    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );
//
//    		{ // Save cached value 
//    			
//    			cached_WebserviceResponse_Management.putCachedResponse( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, responseAsJSON, this );
//    		}
//    		
//    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );
//
//    	} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
//    		
//    		//  only rethrow Error Response Exceptions 
//    		throw e;
//    		
//    	} catch ( Exception e ) {
//    		String msg = "Failed in controller: ";
//			log.error( msg, e );
//			throw new Limelight_WS_InternalServerError_Exception();
//    	}
//    }
//    
//    
//    //////////////////////////////////////////
//    
//    //   Webservice Request and Result
//    
//    /**
//     * 
//     *
//     */
//    public static class WebserviceRequest {
//
//    	private List<Integer> projectSearchIds;
//    	private Map<Integer,List<Integer>> proteinSequenceVersionIdsPositions;
//    	
//		public List<Integer> getProjectSearchIds() {
//			return projectSearchIds;
//		}
//		public void setProjectSearchIds(List<Integer> projectSearchIds) {
//			this.projectSearchIds = projectSearchIds;
//		}
//		public Map<Integer, List<Integer>> getProteinSequenceVersionIdsPositions() {
//			return proteinSequenceVersionIdsPositions;
//		}
//		public void setProteinSequenceVersionIdsPositions(Map<Integer, List<Integer>> proteinSequenceVersionIdsPositions) {
//			this.proteinSequenceVersionIdsPositions = proteinSequenceVersionIdsPositions;
//		}
//
//
//    }
//    
//    /**
//     * 
//     *
//     */
//    public static class WebserviceResult {
//    
//    	/**
//    	 * Map<ProteinSequenceVersionIds,Map<Position,Residue>>
//    	 */
//    	private Map<Integer, Map<Integer,String>> proteinSeqVId_Position_Residue;
//    	private boolean foundAllProteinSequenceVersionIdsForProjectSearchIds;
//
//		public boolean isFoundAllProteinSequenceVersionIdsForProjectSearchIds() {
//			return foundAllProteinSequenceVersionIdsForProjectSearchIds;
//		}
//
//		public void setFoundAllProteinSequenceVersionIdsForProjectSearchIds(
//				boolean foundAllProteinSequenceVersionIdsForProjectSearchIds) {
//			this.foundAllProteinSequenceVersionIdsForProjectSearchIds = foundAllProteinSequenceVersionIdsForProjectSearchIds;
//		}
//
//		public Map<Integer, Map<Integer, String>> getProteinSeqVId_Position_Residue() {
//			return proteinSeqVId_Position_Residue;
//		}
//
//		public void setProteinSeqVId_Position_Residue(Map<Integer, Map<Integer, String>> proteinSeqVId_Position_Residue) {
//			this.proteinSeqVId_Position_Residue = proteinSeqVId_Position_Residue;
//		}
//
//    }

    
}


