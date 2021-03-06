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
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_Utils;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.Psm_FilterableAnnotationData_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValues_Factory;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmIdsForSearchIdReportedPeptideIdCutoffsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

//  COMMENTED OUT SINCE NOT USED


/**
 * Retrieve PSM Filterable Annoation Values Per Reported Peptide Id for Reported Peptide Ids, Ann Type Ids, Project Search ID, and Search Criteria
 *
 */
@RestController
public class Psm_FilterableAnnotationValues_PerReportedPeptide_For_ReportedPeptideIds_AnnTypeIds_SearchCriteria_Single_ProjSearchID_RestWebserviceController 

//implements
//InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
//  
//	private static final Logger log = LoggerFactory.getLogger( Psm_FilterableAnnotationValues_PerReportedPeptide_For_ReportedPeptideIds_AnnTypeIds_SearchCriteria_Single_ProjSearchID_RestWebserviceController.class );
//
//	/**
//	 * Path for this Controller
//	 */
//	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.PSM_FILT_ANN_VALUES_PER_REPORTED_PEPTIDE_ID_FOR_REP_PEPT_IDS_ANN_TYPE_IDS_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER;
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
//	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
//
//	@Autowired
//	private SearcherCutoffValues_Factory searcherCutoffValuesRootLevel_Factory;
//
//	@Autowired
//	private PsmIdsForSearchIdReportedPeptideIdCutoffsSearcherIF psmIdsForSearchIdReportedPeptideIdCutoffsSearcher;
//
//	@Autowired
//	private Psm_FilterableAnnotationData_SearcherIF psm_FilterableAnnotationData_Searcher;
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
//	public Psm_FilterableAnnotationValues_PerReportedPeptide_For_ReportedPeptideIds_AnnTypeIds_SearchCriteria_Single_ProjSearchID_RestWebserviceController() {
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
//    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod(
//    		
//    		@RequestBody byte[] postBody,
//    		HttpServletRequest httpServletRequest,
//    		HttpServletResponse httpServletResponse
//    		) throws Exception {
//    	
//    	try {
////    		log.warn( "peptideView(...) called" );
//
//    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
//    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
//    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );
//
//    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs
//    		
//    		if ( postBody == null || postBody.length == 0 ) {
//    			log.warn( "No Post Body" );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
//
//    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );
//
//    		WebserviceRequest webserviceRequest =
//    				unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );
//
//    		Integer projectSearchId = webserviceRequest.projectSearchId;
//
//    		if ( projectSearchId == null ) {
//    			log.warn( "No Project Search Id" );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
//			if ( webserviceRequest.reportedPeptideIds == null || webserviceRequest.reportedPeptideIds.isEmpty() ) {
//				String msg = "No ReportedPeptideIds or is empty: projectSearchId: " + projectSearchId;
//				log.warn( msg );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//			}
//			if ( webserviceRequest.annotationTypeIds == null || webserviceRequest.annotationTypeIds.isEmpty() ) {
//				String msg = "No annotationTypeIds or is empty: projectSearchId: " + projectSearchId;
//				log.warn( msg );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//			}
//			if ( webserviceRequest.searchDataLookupParams_For_Single_ProjectSearchId == null ) {
//				String msg = "No Search Criteria: projectSearchId: " + projectSearchId;
//				log.warn( msg );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//			}
//
//    		List<Integer> projectSearchIdsForValidate = new ArrayList<>( 1 );
//    		projectSearchIdsForValidate.add( projectSearchId );
//
//    		////////////////
//    		
//    		//  AUTH - validate access
//    		
//    		//  throws an exception if access is not valid that is turned into a webservice response by Spring
//    		
//    		//  Comment out result since not use it
////    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
//    		validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIdsForValidate, httpServletRequest );
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
//    		Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
//			if ( searchId == null ) {
//				String msg = "No searchId for projectSearchId: " + projectSearchId;
//				log.warn( msg );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//			}
//			
//    		Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
//    		projectSearchIdMapToSearchId.put( projectSearchId, searchId );
//
//    		SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel =
//    				searcherCutoffValuesRootLevel_Factory
//    				.createSearcherCutoffValuesSearchLevel(
//    						projectSearchIdMapToSearchId, 
//    						webserviceRequest.searchDataLookupParams_For_Single_ProjectSearchId );
//
//    		List<WebserviceResult_PsmIds_Entry> reportedPeptideId_psmIdsList_List = null;
//    		
//    		if ( webserviceRequest.return_reportedPeptideId_psmIdsList_List != null && webserviceRequest.return_reportedPeptideId_psmIdsList_List ) {
//    			//  Requested return of also reportedPeptideId_psmIdList_List
//    		
//    			reportedPeptideId_psmIdsList_List = new ArrayList<>( webserviceRequest.reportedPeptideIds.size() );
//    		}
//
//    		List<WebserviceResult_AnnValue_Entry> annValue_Entries_List = new ArrayList<>( webserviceRequest.reportedPeptideIds.size() );
//
//    		for ( Integer reportedPeptideId : webserviceRequest.reportedPeptideIds ) {
//
//    			List<Long> psmIdList = 
//    					psmIdsForSearchIdReportedPeptideIdCutoffsSearcher
//    					.getPsmIdsForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );
//
//    			if ( reportedPeptideId_psmIdsList_List != null ) {
//    				
//    				WebserviceResult_PsmIds_Entry webserviceResult_PsmIds_Entry = new WebserviceResult_PsmIds_Entry();
//    				webserviceResult_PsmIds_Entry.reportedPeptideId = reportedPeptideId;
//    				webserviceResult_PsmIds_Entry.psmIdList = psmIdList;
//    				reportedPeptideId_psmIdsList_List.add( webserviceResult_PsmIds_Entry );
//    			}
//    			
//				//  Filterable Ann Types
//				List<PsmFilterableAnnotationDTO> psmFilterableAnnotationDTOList =
//						psm_FilterableAnnotationData_Searcher
//						.getPsmFilterableAnnotationDTOList( psmIdList, webserviceRequest.annotationTypeIds );
//
//				for ( PsmFilterableAnnotationDTO item : psmFilterableAnnotationDTOList ) {
//
//	    			WebserviceResult_AnnValue_Entry entry = new WebserviceResult_AnnValue_Entry();
//	    			entry.repPId = reportedPeptideId;
//	    			entry.psmId = item.getPsmId();
//	    			entry.anTpId = item.getAnnotationTypeId();
//	    			entry.vlDbl = item.getValueDouble();
//	    			entry.vlStr = item.getValueString();
//	    			annValue_Entries_List.add( entry );
//				}
//    		}
//
//    		WebserviceResult result = new WebserviceResult();
//    		result.annValue_Entries_List = annValue_Entries_List;
//    		result.reportedPeptideId_psmIdsList_List = reportedPeptideId_psmIdsList_List;
//    				
////    				reportedPeptideId_psmIdList_List;
//    		
//    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( result );
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
//    /**
//     * 
//     *
//     */
//    public static class WebserviceRequest {
//
//    	private Integer projectSearchId;
//    	private List<Integer> reportedPeptideIds;
//    	private List<Integer> annotationTypeIds;
//    	private SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId;
//    	private Boolean return_reportedPeptideId_psmIdsList_List;
//    	
//		public void setProjectSearchId(Integer projectSearchId) {
//			this.projectSearchId = projectSearchId;
//		}
//		public void setReportedPeptideIds(List<Integer> reportedPeptideIds) {
//			this.reportedPeptideIds = reportedPeptideIds;
//		}
//		public void setSearchDataLookupParams_For_Single_ProjectSearchId(
//				SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId) {
//			this.searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchId;
//		}
//		public void setAnnotationTypeIds(List<Integer> annotationTypeIds) {
//			this.annotationTypeIds = annotationTypeIds;
//		}
//		public void setReturn_reportedPeptideId_psmIdsList_List(Boolean return_reportedPeptideId_psmIdsList_List) {
//			this.return_reportedPeptideId_psmIdsList_List = return_reportedPeptideId_psmIdsList_List;
//		}
//    }
//    
//    /**
//     * 
//     *
//     */
//    public static class WebserviceResult {
//    	
//    	List<WebserviceResult_AnnValue_Entry> annValue_Entries_List;
//    	List<WebserviceResult_PsmIds_Entry> reportedPeptideId_psmIdsList_List;
//    	
//		public List<WebserviceResult_AnnValue_Entry> getAnnValue_Entries_List() {
//			return annValue_Entries_List;
//		}
//		public List<WebserviceResult_PsmIds_Entry> getReportedPeptideId_psmIdsList_List() {
//			return reportedPeptideId_psmIdsList_List;
//		}
//    }
//
//    /**
//     * 
//     *
//     */
//    public static class WebserviceResult_AnnValue_Entry {
//    	
//    	int repPId;
//    	long psmId;
//    	int anTpId;
//    	Double vlDbl;
//    	String vlStr;
//    	
//		public int getRepPId() {
//			return repPId;
//		}
//		public long getPsmId() {
//			return psmId;
//		}
//		public int getAnTpId() {
//			return anTpId;
//		}
//		public String getVlStr() {
//			return vlStr;
//		}
//		public Double getVlDbl() {
//			return vlDbl;
//		}
//    }
//    
//
//
//    /**
//     * 
//     *
//     */
//    public static class WebserviceResult_PsmIds_Entry {
//    	
//    	int reportedPeptideId;
//    	List<Long> psmIdList;
//    	
//		public int getReportedPeptideId() {
//			return reportedPeptideId;
//		}
//		public List<Long> getPsmIdList() {
//			return psmIdList;
//		}
//
//    }
}


