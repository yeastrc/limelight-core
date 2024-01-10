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


//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Map;
//import java.util.Set;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.slf4j.LoggerFactory;
//import org.apache.commons.lang3.StringUtils;
//import org.slf4j.Logger;
//import org.springframework.beans.factory.InitializingBean;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.bind.annotation.RestController;
//import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;
//import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
//import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
//import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF;
//import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_Utils;
//import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
//import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
//import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
//import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
//import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
//import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.Psm_FilterableAnnotationData_SearcherIF;
//import org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValues_Factory;
//import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
//import org.yeastrc.limelight.limelight_webapp.services.ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF;
//import org.yeastrc.limelight.limelight_webapp.searchers.PsmIdsForSearchIdReportedPeptideIdCutoffsSearcherIF;
//import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
//import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
//import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF;
//import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
//import org.yeastrc.limelight.limelight_webapp.web_utils.Gzip_ByteArray_To_ByteArray_IF;
//import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
//import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * 
 * !!!  NOT CURRENTLY CALLED  !!!
 * 
 * 
 * 
 * !!!  WARNING:  Webservice Response is CACHED  !!!!
 * 
 * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
 * 
 * 
 * 
 * Retrieve PSM Filterable Annotation data Per Reported Peptide Id for Project Search ID, and Search Criteria
 *
 */
//@RestController
public class PsmFilterableAnnotationData_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController 

//implements
//InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
  
//	private static final Logger log = LoggerFactory.getLogger( PsmFilterableAnnotationData_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController.class );
//
//	/**
//	 * Path for this Controller.  !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
//	 */
//	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.PSM_FILTERABLE_ANNOTATION_DATA_PER_REPORTED_PEPTIDE_ID_FOR_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0001;
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
//	private Gzip_ByteArray_To_ByteArray_IF gzip_ByteArray_To_ByteArray;
//	
//	@Autowired
//	private RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF restControllerUtils__Request_Accept_GZip_Response_Set_GZip;
//	
//	@Autowired
//	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
//
//	@Autowired
//	private SearcherCutoffValues_Factory searcherCutoffValuesRootLevel_Factory;
//
//	@Autowired
//	private ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service;
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
//	public PsmFilterableAnnotationData_PerReportedPeptide_For_SearchCriteria_Single_ProjSearchID_RestWebserviceController() {
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
//			cached_WebserviceResponse_Management.registerControllerPathForCachedResponse_RequiredToCallAtWebappStartup( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, this );
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
//    		List<Integer> psmFilterableAnnotationTypeIds = webserviceRequest.psmFilterableAnnotationTypeIds;
//   			List<Integer> reportedPeptideIds = webserviceRequest.reportedPeptideIds;  // OPTIONAL
//   			
//
//    		if ( projectSearchId == null ) {
//    			log.warn( "No Project Search Ids" );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
//    		if ( psmFilterableAnnotationTypeIds == null || psmFilterableAnnotationTypeIds.isEmpty() ) {
//    			log.warn( "No psmFilterableAnnotationTypeIds" );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
//    		if ( reportedPeptideIds != null && reportedPeptideIds.isEmpty() ) {
//    			//  Is populated but is empty so reject
//    			log.warn( "reportedPeptideIds is empty" );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
//			if ( webserviceRequest.searchDataLookupParams_For_Single_ProjectSearchId == null ) {
//				String msg = "No Search Criteria: " + projectSearchId;
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
//    			boolean accept_GZIP = restControllerUtils__Request_Accept_GZip_Response_Set_GZip.does_HttpServletRequest_Accept_GZip( httpServletRequest );
//    			
//    			byte[] cachedResponse = cached_WebserviceResponse_Management.getCachedResponse( accept_GZIP, CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, this );
//    			
//    			if ( cachedResponse != null ) {
//    				
//    				if ( accept_GZIP ) {
//    					restControllerUtils__Request_Accept_GZip_Response_Set_GZip.set_GZIP_On_HttpServletResponse( httpServletResponse );
//    				}
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
//   			final int minimumNumberOfPSMsPerReportedPeptide = 1; // standard minimum # PSMs 
//
//   			if ( reportedPeptideIds == null ) {
//   				
//   				//  No reportedPeptideIds passed in so get them
//
//   				//  Get initial Reported Peptide Id list (maybe include Num PSMs) based on search criteria
//
//   				List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> peptideMinimalObjectsList = 
//   						reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList( searchId, searcherCutoffValuesSearchLevel, minimumNumberOfPSMsPerReportedPeptide );
//
//   				reportedPeptideIds = new ArrayList<>( peptideMinimalObjectsList.size() );
//
//   				for ( ReportedPeptide_MinimalData_List_FromSearcher_Entry peptideMinimalObject : peptideMinimalObjectsList ) {
//
//   					Integer reportedPeptideId = peptideMinimalObject.getReportedPeptideId();
//   					reportedPeptideIds.add( reportedPeptideId );
//   				}
//   			}
//    		
//    		
//    		List<WebserviceResult_Entry> reportedPeptideId_psmFilterableAnnotationDataList_List = new ArrayList<>( reportedPeptideIds.size() );
//    		
//    		for ( Integer reportedPeptideId : reportedPeptideIds ) {
//    			
//    			List<Long> psmIds_List = 
//    					psmIdsForSearchIdReportedPeptideIdCutoffsSearcher
//    					.getPsmIdsForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );
//    			
//    			List<WebserviceResult_PerPSM_Entry> psms = new ArrayList<>( psmIds_List.size() );
//    			Map<Long, WebserviceResult_PerPSM_Entry> psmMap_Key_PsmId = new HashMap<>( psmIds_List.size() );
//    			
//    			for ( Long psmId : psmIds_List ) {
//    				
//    				WebserviceResult_PerPSM_Entry result_PerPSM_Entry = new WebserviceResult_PerPSM_Entry();
//    				result_PerPSM_Entry.psmId = psmId.longValue();
//    				
//    				psms.add(result_PerPSM_Entry);
//    				
//    				psmMap_Key_PsmId.put( psmId, result_PerPSM_Entry );
//    			}
//    			
//    			List<PsmFilterableAnnotationDTO> psmFilterableAnnotationDTOList =
//    					psm_FilterableAnnotationData_Searcher.getPsmFilterableAnnotationDTOList( psmIds_List, psmFilterableAnnotationTypeIds );
//    			
//    			for ( PsmFilterableAnnotationDTO psmFilterableAnnotationDTO : psmFilterableAnnotationDTOList ) {
//    				Long psmId = psmFilterableAnnotationDTO.getPsmId();
//    				WebserviceResult_PerPSM_Entry result_PerPSM_Entry = psmMap_Key_PsmId.get( psmId );
//    				if ( result_PerPSM_Entry == null ) {
//    					String msg = "psmMap_Key_PsmId NOT contain psmId: " + psmId + ", projectSearchId: " + projectSearchId;
//    					log.error(msg);
//    					throw new LimelightInternalErrorException(msg);
//    				}
//    				
//    				WebserviceResult_PerPSM_FilterableAnnotation_Entry filterableAnntation_Entry = new WebserviceResult_PerPSM_FilterableAnnotation_Entry();
//    				result_PerPSM_Entry.psmFltblAnnEntries.add(filterableAnntation_Entry);
//    				
//    				filterableAnntation_Entry.annotationTypeId = psmFilterableAnnotationDTO.getAnnotationTypeId();
//    				filterableAnntation_Entry.annotationValueNumber = psmFilterableAnnotationDTO.getValueDouble();
//    			}
//    			
//    			//  Validate all psmFilterableAnnotationTypeIds for all PSMs
//    			
//    			for ( WebserviceResult_PerPSM_Entry psmEntry : psms) {
//    				Set<Integer> psmFilterableAnnotationTypeIds_Copy_Set = new HashSet<>( psmFilterableAnnotationTypeIds );
//    				for ( WebserviceResult_PerPSM_FilterableAnnotation_Entry filterableAnntation_Entry : psmEntry.psmFltblAnnEntries ) {
//    					Integer annotationTypeId = filterableAnntation_Entry.annotationTypeId;
//    					if ( ! psmFilterableAnnotationTypeIds_Copy_Set.remove( annotationTypeId ) ) {
//    						String msg = "psmEntry.filterableAnntationEntries does not contain annotationTypeId or has it more than once. annotationTypeId: " 
//    								+ annotationTypeId + ", psmEntry.psmId: " + psmEntry.psmId + ", projectSearchId: " + projectSearchId;
//    						log.error(msg);
//        					throw new LimelightInternalErrorException(msg);
//    					}
//    				}
//    				if ( ! psmFilterableAnnotationTypeIds_Copy_Set.isEmpty() ) {
//    					String msg = "psmEntry.filterableAnntationEntries does not contain all requested psmFilterableAnnotationTypeIds.  missing values are: "
//    							+ StringUtils.join(psmFilterableAnnotationTypeIds_Copy_Set, ",")
//    							 + ", psmEntry.psmId: " + psmEntry.psmId + ", projectSearchId: " + projectSearchId;
//    					log.error(msg);
//    					throw new LimelightInternalErrorException(msg);
//    				}
//    			}
//    			
//    			WebserviceResult_Entry entry = new WebserviceResult_Entry();
//    			entry.reportedPeptideId = reportedPeptideId;
//    			entry.psms = psms;
//    			reportedPeptideId_psmFilterableAnnotationDataList_List.add( entry );
//    		}
//			    		
//    		WebserviceResult result = new WebserviceResult();
//    		result.reportedPeptideId_psmFilterableAnnotationDataList_List = reportedPeptideId_psmFilterableAnnotationDataList_List;
//    		
//    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( result );
//
//    		
//    		byte[] responseAsJSON_GZIPPED = gzip_ByteArray_To_ByteArray.gzip_ByteArray_To_ByteArray(responseAsJSON);
//    		
//
//			boolean accept_GZIP = restControllerUtils__Request_Accept_GZip_Response_Set_GZip.does_HttpServletRequest_Accept_GZip( httpServletRequest );
//			
//
//    		{ // Save cached value 
//    			
//    			cached_WebserviceResponse_Management.putCachedResponse_GZIPPED( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, responseAsJSON_GZIPPED, this );
//    		}
//    		
//    		byte[] responseAsJSON_FINAL = responseAsJSON;
//    		
//
//			if ( accept_GZIP ) {
//				restControllerUtils__Request_Accept_GZip_Response_Set_GZip.set_GZIP_On_HttpServletResponse( httpServletResponse );
//				
//				responseAsJSON_FINAL = responseAsJSON_GZIPPED;
//			}
//			
//    		
//    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON_UTF8).body( responseAsJSON_FINAL );
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
//     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
//     *
//     */
//    public static class WebserviceRequest {
//
//    	private Integer projectSearchId;
//    	private List<Integer> psmFilterableAnnotationTypeIds;
//    	private List<Integer> reportedPeptideIds;  // Optional
//    	private SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId;
//    	
//		public void setProjectSearchId(Integer projectSearchId) {
//			this.projectSearchId = projectSearchId;
//		}
//		public void setSearchDataLookupParams_For_Single_ProjectSearchId(
//				SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId) {
//			this.searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchId;
//		}
//		public void setReportedPeptideIds(List<Integer> reportedPeptideIds) {
//			this.reportedPeptideIds = reportedPeptideIds;
//		}
//		public void setPsmFilterableAnnotationTypeIds(List<Integer> psmFilterableAnnotationTypeIds) {
//			this.psmFilterableAnnotationTypeIds = psmFilterableAnnotationTypeIds;
//		}
//    }
//    
//    /**
//     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
//     *
//     */
//    public static class WebserviceResult {
//    	
//    	List<WebserviceResult_Entry> reportedPeptideId_psmFilterableAnnotationDataList_List;
//
//		public List<WebserviceResult_Entry> getReportedPeptideId_psmFilterableAnnotationDataList_List() {
//			return reportedPeptideId_psmFilterableAnnotationDataList_List;
//		}
//    }
//
//    /**
//     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
//     *
//     */
//    public static class WebserviceResult_Entry {
//    	
//    	int reportedPeptideId;
//    	List<WebserviceResult_PerPSM_Entry> psms;
//    	
//		public int getReportedPeptideId() {
//			return reportedPeptideId;
//		}
//		public List<WebserviceResult_PerPSM_Entry> getPsms() {
//			return psms;
//		}
//    }
//
//    /**
//     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
//     *
//     */
//    public static class WebserviceResult_PerPSM_Entry {
//    	
//    	long psmId;
//    	
//    	List<WebserviceResult_PerPSM_FilterableAnnotation_Entry> psmFltblAnnEntries = new ArrayList<>();
//
//		public long getPsmId() {
//			return psmId;
//		}
//		public List<WebserviceResult_PerPSM_FilterableAnnotation_Entry> getPsmFltblAnnEntries() {
//			return psmFltblAnnEntries;
//		}
//    }
//
//    /**
//     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
//     *
//     */
//    public static class WebserviceResult_PerPSM_FilterableAnnotation_Entry {
//
//    	private int annotationTypeId;
//    	private double annotationValueNumber;
//    	
//		public int getAnnotationTypeId() {
//			return annotationTypeId;
//		}
//		public double getAnnotationValueNumber() {
//			return annotationValueNumber;
//		}
//    }
}


