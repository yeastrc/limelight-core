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
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
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
import org.yeastrc.limelight.limelight_shared.dto.AnnotationDataBaseDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.SrchRepPeptDynamicModDTO;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_Utils;
import org.yeastrc.limelight.limelight_webapp.dao.ReportedPeptideDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.objects.AnnotationDataItem_ForPage;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.SearchReportedPeptide_DescriptiveAnnotationData_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.SearchReportedPeptide_FilterableAnnotationData_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValues_Factory;
import org.yeastrc.limelight.limelight_webapp.searchers.PeptideStringForSearchIdReportedPeptideIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinNameForSearchIdProteinSequenceVersionIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinVersionIdsFor_SearchID_ReportedPeptideId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmBestValuesForReportedPeptideIdSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmCountForSearchIdReportedPeptideIdCutoffsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SrchRepPept_DynamicMod_For_SearchIdReportedPeptideId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmBestValuesForReportedPeptideIdSearchIdResult;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_request_objects.controller_request_root.PeptideList_ReportedPeptideIds_Single_ProjectSearchId_RequestRoot;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_response_parts.PeptideItemForPeptideList_SingleProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_response_parts.PeptideItem_ModMassEntry;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_response_parts.PeptideItem_ProteinNameEntry;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


//COMMENTED OUT SINCE NOT USED


/**
 * Data for provided Project Search Id and Reported Peptide Ids
 * 
 *             Need to validate Project Search ID values in URL with values in POST JSON
 *               Already done for Ann Type Cutoffs in called code that translates cutoffs to objects sent to searcher
 *               
 *  Used by JS files:
 *  
 *     page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataLoader.js
 *     
 *     data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleSearch.js
 *            - For displaying the reported peptides for a protein (May change to different Webservice in future)
 */
@RestController
public class PeptideList_ReportedPeptideIds_Single_ProjectSearchId_RestWebserviceController 

//implements
//InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
  
//	private static final Logger log = LoggerFactory.getLogger( PeptideList_ReportedPeptideIds_Single_ProjectSearchId_RestWebserviceController.class );
//
//	/**
//	 * Path for this Controller
//	 */
//	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.PEPTIDE_LIST_REPORTED_PEPTIDE_IDS_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER;
//	
//	/**
//	 * Path, updated for use by Cached Response Mgmt ( Cached_WebserviceResponse_Management )
//	 */
//	private static final String CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT = Cached_WebserviceResponse_Management_Utils.translate_ControllerPath_For_CachedResponseMgmt( CONTROLLER_PATH );
//	
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
//	private PsmBestValuesForReportedPeptideIdSearchIdSearcherIF psmBestValuesForReportedPeptideIdSearchIdSearcher;
//	
//	@Autowired
//	private ReportedPeptideDAO_IF reportedPeptideDAO;
//	
//	@Autowired
//	private PeptideStringForSearchIdReportedPeptideIdSearcherIF peptideStringForSearchIdReportedPeptideIdSearcher;
//	
//	@Autowired
//	private SrchRepPept_DynamicMod_For_SearchIdReportedPeptideId_SearcherIF srchRepPept_DynamicMod_For_SearchIdReportedPeptideId_Searcher;
//	
//	@Autowired
//	private ProteinVersionIdsFor_SearchID_ReportedPeptideId_SearcherIF proteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher;
//	
//	@Autowired
//	private ProteinNameForSearchIdProteinSequenceVersionIdSearcherIF proteinNameForSearchIdProteinSequenceVersionIdSearcher;
//	
//	@Autowired
//	private SearchReportedPeptide_FilterableAnnotationData_SearcherIF searchReportedPeptide_FilterableAnnotationData_Searcher;
//	
//	@Autowired
//	private SearchReportedPeptide_DescriptiveAnnotationData_SearcherIF searchReportedPeptide_DescriptiveAnnotationData_Searcher;
//
//	@Autowired
//	private PsmCountForSearchIdReportedPeptideIdCutoffsSearcherIF psmCountForSearchIdReportedPeptideIdSearcher;
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
//	public PeptideList_ReportedPeptideIds_Single_ProjectSearchId_RestWebserviceController() {
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
//    public @ResponseBody ResponseEntity<byte[]>  peptideView(
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
//    		PeptideList_ReportedPeptideIds_Single_ProjectSearchId_RequestRoot webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, PeptideList_ReportedPeptideIds_Single_ProjectSearchId_RequestRoot.class );
//
//    		Integer projectSearchId = webserviceRequest.getProjectSearchId();
//    		List<Integer> reportedPeptideIds = webserviceRequest.getReportedPeptideIds();
//    		SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId = webserviceRequest.getSearchDataLookupParams_For_Single_ProjectSearchId();
//
//    		List<Integer> reportedPeptideAnnotationTypeIdsForSorting = webserviceRequest.getReportedPeptideAnnotationTypeIdsForSorting();
//
//
//    		if ( projectSearchId == null ) {
//    			log.warn( "No Project Search Ids" );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
//
//    		if ( reportedPeptideIds == null || reportedPeptideIds.isEmpty() ) {
//    			log.warn( "No reportedPeptideIds" );
//    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//    		}
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
//    		
//    		Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
//    		
//       		Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
//   			projectSearchIdMapToSearchId.put( projectSearchId, searchId );
//   			
//   			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel =
//    				searcherCutoffValuesRootLevel_Factory
//    				.createSearcherCutoffValuesSearchLevel( projectSearchIdMapToSearchId, searchDataLookupParams_For_Single_ProjectSearchId );
//
//    		////////////////
//   		
//			//  Reported Peptide Annotation data for Ann Type Display
//			
//			Set<Integer> annTypeIdsToRetrieve = new HashSet<>();
//
//			annTypeIdsToRetrieve.addAll( searchDataLookupParams_For_Single_ProjectSearchId.getReportedPeptideAnnTypeDisplay() );
//			if ( reportedPeptideAnnotationTypeIdsForSorting != null ) {
//				annTypeIdsToRetrieve.addAll( reportedPeptideAnnotationTypeIdsForSorting );
//			}
//			
//			List<PsmBestValuesForReportedPeptideIdSearchIdResult> peptideDataBestPsmDataList =
//					psmBestValuesForReportedPeptideIdSearchIdSearcher.getBestPsmValuesList( 
//							searchId, reportedPeptideIds, searcherCutoffValuesSearchLevel );
//			
//			//  First validate data for all reported peptide ids
//			
//			{
//				Set<Integer> reportedPeptideIdsForCheckAllFound = new HashSet<>( reportedPeptideIds );
//				for ( PsmBestValuesForReportedPeptideIdSearchIdResult item : peptideDataBestPsmDataList ) {
//
//					if ( ! reportedPeptideIdsForCheckAllFound.remove( item.getReportedPeptideId() ) ) {
//						String msg = "Reported Peptide Id not found for search id.  Search Id: " + searchId 
//								+ ", reported peptide id: " + item.getReportedPeptideId();
//						log.warn( msg );
//						throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//					}
//				}
//				if ( ! reportedPeptideIdsForCheckAllFound.isEmpty() ) {
//					String msg = "At least 1 Reported Peptide Id retrieved but not in list to retrieve.  Search Id: " + searchId 
//							+ ", reported peptide id: " + StringUtils.join( reportedPeptideIdsForCheckAllFound, "," );
//					log.warn( msg );
//					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//				}
//			}
//			
//    		//  Final output Peptide List
//    		List<PeptideItemForPeptideList_SingleProjectSearchId> peptideResultListResult = new ArrayList<>( reportedPeptideIds.size() );
//
//    		for ( PsmBestValuesForReportedPeptideIdSearchIdResult psmBestValuesForReportedPeptideIdSearchIdResult : peptideDataBestPsmDataList ) {
//
//    			Integer reportedPeptideId = psmBestValuesForReportedPeptideIdSearchIdResult.getReportedPeptideId();
//    			
//    			ReportedPeptideDTO reportedPeptideDTO = reportedPeptideDAO.getForId( reportedPeptideId );
//    			if ( reportedPeptideDTO == null ) {
//    				String msg = "Should not get this here: reportedPeptideDTO == null for entry.getReportedPeptideId():  " + reportedPeptideId;
//    				log.error( msg );
//    				throw new LimelightInternalErrorException(msg);
//    			}
//    			
//    			String peptideSequence =
//    					peptideStringForSearchIdReportedPeptideIdSearcher
//    					.getPeptideSequenceStringForSearchIdReportedPeptideId( searchId, reportedPeptideId );
//    			
//    			List<PeptideItem_ModMassEntry> modMassList = null;
//    			
//    			if ( webserviceRequest.isReturnModData() ) {
//
//    				//  Get Modification List
//    				List<SrchRepPeptDynamicModDTO> srchRepPeptDynamicModDTOList = 
//    						srchRepPept_DynamicMod_For_SearchIdReportedPeptideId_Searcher
//    						.getSrchRepPept_DynamicMod_For_SearchIdReportedPeptideId( searchId, reportedPeptideId );
//    				modMassList = new ArrayList<>( srchRepPeptDynamicModDTOList.size() );
//    				for ( SrchRepPeptDynamicModDTO item : srchRepPeptDynamicModDTOList ) {
//    					modMassList.add( new PeptideItem_ModMassEntry( item ) );
//    				}
//    			}
//    			
//    			List<PeptideItem_ProteinNameEntry> proteinNameList = null;
//    			
//    			if ( webserviceRequest.isReturnProteinData() ) {
//
//    				//  Get Proteins for Reported Peptide
//
//    				//      Get Protein Sequence Version Id values for Reported Peptide
//    				List<Integer> proteinSequenceVersionIds =
//    						proteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher
//    						.getProteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher( searchId, reportedPeptideId );
//
//    				proteinNameList = new ArrayList<>( proteinSequenceVersionIds.size() );
//
//    				for ( Integer proteinSequenceVersionId : proteinSequenceVersionIds ) {
//    					String proteinName =
//    							proteinNameForSearchIdProteinSequenceVersionIdSearcher
//    							.getProteinNameForSearchIdProteinSequenceVersionId( searchId, proteinSequenceVersionId );
//    					if ( StringUtils.isNotEmpty( proteinName ) ) {
//    						PeptideItem_ProteinNameEntry peptideItem_ProteinNameEntry = new PeptideItem_ProteinNameEntry();
//    						peptideItem_ProteinNameEntry.setProteinSequenceVersionId( proteinSequenceVersionId );
//    						peptideItem_ProteinNameEntry.setProteinName( proteinName );
//    						proteinNameList.add( peptideItem_ProteinNameEntry );
//    					}
//    				}
//    			}
//    			
//    			//  Get Reported Peptide Annotation Data
//    			Map<Integer, AnnotationDataItem_ForPage> peptideAnnotationMap = new HashMap<>();
//    			{
//    				//  Add in Reported Peptide Annotation data for Ann Type Display
//    				{
//    					//  Filterable Ann Types
//    					List<SearchReportedPeptideFilterableAnnotationDTO> searchReportedPeptideFilterableAnnotationDTOList =
//    							searchReportedPeptide_FilterableAnnotationData_Searcher
//    							.getSearchReportedPeptideFilterableAnnotationDTOList( 
//    									searchId, reportedPeptideId, annTypeIdsToRetrieve );
//
//    					for ( SearchReportedPeptideFilterableAnnotationDTO item : searchReportedPeptideFilterableAnnotationDTOList ) {
//
//    						AnnotationDataItem_ForPage annotationDataItem_ForPage = new AnnotationDataItem_ForPage();
//    						annotationDataItem_ForPage.setAnnotationTypeId( item.getAnnotationTypeId() );
//    						annotationDataItem_ForPage.setValueString( item.getValueString() );
//    						annotationDataItem_ForPage.setValueDouble( item.getValueDouble() );
//    						peptideAnnotationMap.put( item.getAnnotationTypeId(), annotationDataItem_ForPage );
//    					}
//    				}
//    				
//    				{
//    					//  Descriptive Ann Types
//    					List<SearchReportedPeptideDescriptiveAnnotationDTO> searchReportedPeptideDescriptiveAnnotationDTOList =
//    							searchReportedPeptide_DescriptiveAnnotationData_Searcher
//    							.getSearchReportedPeptideDescriptiveAnnotationDTOList( 
//    									searchId, reportedPeptideId,  annTypeIdsToRetrieve );
//
//    					for ( SearchReportedPeptideDescriptiveAnnotationDTO item : searchReportedPeptideDescriptiveAnnotationDTOList ) {
//
//    						AnnotationDataItem_ForPage annotationDataItem_ForPage = new AnnotationDataItem_ForPage();
//    						annotationDataItem_ForPage.setAnnotationTypeId( item.getAnnotationTypeId() );
//    						annotationDataItem_ForPage.setValueString( item.getValueString() );
//    						peptideAnnotationMap.put( item.getAnnotationTypeId(), annotationDataItem_ForPage );
//    					}
//    				}
//    			}
//    			
//    			Integer numPsms = psmBestValuesForReportedPeptideIdSearchIdResult.getNumPsms();
//    			
//    			if ( numPsms == null ) {
//    				numPsms = 
//    						psmCountForSearchIdReportedPeptideIdSearcher
//    						.getPsmCountForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );
//    			}
//    			
//    			//  PSM annotation data based on annotation types searched on and returned from peptideListForProjectSearchIdSearcher
//    			Map<Integer, AnnotationDataItem_ForPage> psmAnnotationMap =
//    					translateSearcherAnnotationDataBaseDTO_To_WebserviceResultMap( psmBestValuesForReportedPeptideIdSearchIdResult.getPsmAnnotationDTOMap() );
//
//    			//  Build Entry for output list
//    			PeptideItemForPeptideList_SingleProjectSearchId peptideItemForProjectSearch = new PeptideItemForPeptideList_SingleProjectSearchId();
//    			peptideItemForProjectSearch.setSearchId( searchId );
//    			peptideItemForProjectSearch.setReportedPeptideId( reportedPeptideId );
//    			peptideItemForProjectSearch.setReportedPeptideSequence( reportedPeptideDTO.getSequence() );
//    			peptideItemForProjectSearch.setPeptideSequence( peptideSequence );
//    			peptideItemForProjectSearch.setNumPsms( numPsms );
////    			peptideItemForProjectSearch.setNumUniquePsms(  );
//    			peptideItemForProjectSearch.setModMassList( modMassList );
//    			peptideItemForProjectSearch.setProteinNameList( proteinNameList );
//    			peptideItemForProjectSearch.setPsmAnnotationMap( psmAnnotationMap );
//    			peptideItemForProjectSearch.setPeptideAnnotationMap( peptideAnnotationMap );
//    			
//    			peptideResultListResult.add( peptideItemForProjectSearch );
//    		}
//
//    		WebserviceResult webserviceResult = new WebserviceResult();
//    		webserviceResult.peptideList = peptideResultListResult;
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
//    /**
//     * @param searcherResultMap
//     * @return
//     */
//    private Map<Integer, AnnotationDataItem_ForPage> translateSearcherAnnotationDataBaseDTO_To_WebserviceResultMap( Map<Integer, AnnotationDataBaseDTO> searcherResultMap ) {
//    	
//    	Map<Integer, AnnotationDataItem_ForPage> resultMap = new HashMap<>();
//    	for ( Map.Entry<Integer, AnnotationDataBaseDTO> searcherMapEntry : searcherResultMap.entrySet() ) {
//    		Integer searcherMapEntryKey = searcherMapEntry.getKey();
//    		AnnotationDataBaseDTO searcherMapEntryValue = searcherMapEntry.getValue();
//    		Integer annotationTypeId = searcherMapEntryValue.getAnnotationTypeId();
//    		AnnotationDataItem_ForPage resultItem = new AnnotationDataItem_ForPage();
//    		resultItem.setAnnotationTypeId( searcherMapEntryKey );
//    		resultItem.setValueString( searcherMapEntryValue.getValueString() );
//    		resultItem.setValueDouble( searcherMapEntryValue.getValueDouble() );
//    		resultMap.put( annotationTypeId, resultItem );
//    	}
//    	return resultMap;
//    }
//
//    /**
//     * 
//     *
//     */
//    public static class WebserviceResult {
//    	List<PeptideItemForPeptideList_SingleProjectSearchId> peptideList;
//
//		public List<PeptideItemForPeptideList_SingleProjectSearchId> getPeptideList() {
//			return peptideList;
//		}
//
//		public void setPeptideList(List<PeptideItemForPeptideList_SingleProjectSearchId> peptideList) {
//			this.peptideList = peptideList;
//		}
//
//    }

}


