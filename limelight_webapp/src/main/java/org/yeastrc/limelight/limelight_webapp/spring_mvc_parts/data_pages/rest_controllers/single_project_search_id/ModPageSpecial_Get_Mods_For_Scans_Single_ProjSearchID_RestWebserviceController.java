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
import org.yeastrc.limelight.limelight_shared.dto.PsmDynamicModificationDTO;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_Utils;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValues_Factory;
import org.yeastrc.limelight.limelight_webapp.searchers.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmDynamicModification_For_PsmIdList_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmWebDisplaySearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher.PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry;
import org.yeastrc.limelight.limelight_webapp.searchers_results.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmWebDisplayWebServiceResult;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services.ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * 
 * !!!  WARNING:  Webservice Response is CACHED  !!!!
 * 
 * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
 * 
 * 
 * Mod Page - !!!  Special Specific Web Service !!!
 * 
 * Retrieve Open and Variable Mod Data per scan
 * 
 * Input:  Project Search Id, Filter cutoffs for Single Project Search Id
 * 
 * Output:
 * 
 *  { resultRoot : { reported peptide id : [ {'variable':[mass1, mass2,], 'open':[mass1,mass2,] }  ]  } }
 * 
 */
@RestController
public class ModPageSpecial_Get_Mods_For_Scans_Single_ProjSearchID_RestWebserviceController 

implements
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
  
	private static final Logger log = LoggerFactory.getLogger( ModPageSpecial_Get_Mods_For_Scans_Single_ProjSearchID_RestWebserviceController.class );
	
	private static final int SEARCH_SCAN_FILE_ID_TO_USE_WHEN_DB_FIELD_NULL = -1; // Default to -1 since not a possible value in DB

	/**
	 * Path for this Controller.  !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
	 */
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.MOD_PAGE_SPECIAL__GET_MODS_FOR_SCANS_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER_VERSION_0001;
	
	/**
	 * Path, updated for use by Cached Response Mgmt ( Cached_WebserviceResponse_Management )
	 */
	private static final String CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT = Cached_WebserviceResponse_Management_Utils.translate_ControllerPath_For_CachedResponseMgmt( CONTROLLER_PATH );

	
	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private Cached_WebserviceResponse_Management_IF cached_WebserviceResponse_Management;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
	
	@Autowired
	private SearchFlagsForSearchIdSearcherIF searchFlagsForSearchIdSearcher;

	@Autowired
	private SearcherCutoffValues_Factory searcherCutoffValuesRootLevel_Factory;
	
	@Autowired
	private ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service;

	@Autowired
	private PsmWebDisplaySearcherIF psmWebDisplaySearcher;
	
	@Autowired
	private PsmDynamicModification_For_PsmIdList_Searcher_IF psmDynamicModification_For_PsmIdList_Searcher;
	
	@Autowired
	private PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_IF psmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher;

	@Autowired
	private DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public ModPageSpecial_Get_Mods_For_Scans_Single_ProjSearchID_RestWebserviceController() {
		super();
//		log.warn( "constructor no params called" );
	}

	/* 
	 * Spring LifeCycle Method
	 * 
	 * (non-Javadoc)
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		try {
			cached_WebserviceResponse_Management.registerControllerPathForCachedResponse( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, this );
			
		} catch (Exception e) {
			String msg = "In afterPropertiesSet(): Exception in processing";
			log.error(msg);
			throw e;
		}
		
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

    		Integer projectSearchId = webserviceRequest.getProjectSearchId();

    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
			if ( webserviceRequest.getSearchDataLookupParams_For_Single_ProjectSearchId() == null ) {
				String msg = "SearchDataLookupParams_For_Single_ProjectSearchId == null: " + projectSearchId;
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

    		{ // Return cached value if available
    			
    			byte[] cachedResponse = cached_WebserviceResponse_Management.getCachedResponse( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, this );
    			
    			if ( cachedResponse != null ) {
    				
    				return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( cachedResponse );
    			}
    		}
    		
    		Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
			if ( searchId == null ) {
				String msg = "No searchId for projectSearchId: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			SearchFlagsForSearchIdSearcher_Result searchFlagsForSearchIdSearcher_Result =
					searchFlagsForSearchIdSearcher.getSearchHasScanDataForSearchId( searchId );
			
			if ( searchFlagsForSearchIdSearcher_Result == null ) {
				String msg = "No searchFlagsForSearchIdSearcher_Result for searchId: " + searchId + ", projectSearchId: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

    		boolean searchFlags_anyPsmHas_VariableDynamicModifications = searchFlagsForSearchIdSearcher_Result.isAnyPsmHas_DynamicModifications();
    		boolean searchFlags_anyPsmHas_OpenModifications = searchFlagsForSearchIdSearcher_Result.isAnyPsmHas_OpenModifications();
    		
    		Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
    		projectSearchIdMapToSearchId.put( projectSearchId, searchId );

    		SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel =
    				searcherCutoffValuesRootLevel_Factory
    				.createSearcherCutoffValuesSearchLevel(
    						projectSearchIdMapToSearchId, 
    						webserviceRequest.getSearchDataLookupParams_For_Single_ProjectSearchId() );

   			final int minimumNumberOfPSMsPerReportedPeptide = 1; // standard minimum # PSMs 
   			
			//  Get initial Reported Peptide Id list (maybe include Num PSMs) based on search criteria
   			
    		List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> peptideMinimalObjectsList = 
    				reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList( searchId, searcherCutoffValuesSearchLevel, minimumNumberOfPSMsPerReportedPeptide );

    		List<Integer> reportedPeptideIds_InitialSelection_List = new ArrayList<>( peptideMinimalObjectsList.size() );

    		List<Integer> reportedPeptideIds_List_GetReportedPeptideVariableMods = new ArrayList<>( peptideMinimalObjectsList.size() );
    		
    		for ( ReportedPeptide_MinimalData_List_FromSearcher_Entry peptideMinimalObject : peptideMinimalObjectsList ) {
    			
    			reportedPeptideIds_InitialSelection_List.add( peptideMinimalObject.getReportedPeptideId() );

        		if ( ( ! searchFlags_anyPsmHas_VariableDynamicModifications ) && ( peptideMinimalObject.isReportedPeptideHas_DynamicModifications() ) ) {
        			reportedPeptideIds_List_GetReportedPeptideVariableMods.add( peptideMinimalObject.getReportedPeptideId() );
        		}
    		}
    		
    		Map<Integer, Set<Integer>> variableModMassesRounded_AtReportedPeptideLevel_Key_ReportedPeptideId = null;

    		if ( ! searchFlags_anyPsmHas_VariableDynamicModifications ) {
    		
    			variableModMassesRounded_AtReportedPeptideLevel_Key_ReportedPeptideId = new HashMap<>();
	
	    		//  Get Reported Peptide Level Variable/Dynamic Mods for filtering Protein Coverage
	    		DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result searcherResult = 
	    				modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher
	    				.getDynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIds( searchId, reportedPeptideIds_InitialSelection_List );
	    		Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> dynamicMods_results_Key_ReportedPeptideId =
	    				searcherResult.getResults_Key_ReportedPeptideId();
	    		
	    		for ( Map.Entry<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> entry : dynamicMods_results_Key_ReportedPeptideId.entrySet() ) {
	    			
	    			Integer reportedPeptideId = entry.getKey();
	    			
	    			Set<Integer> variableModMassesRounded = variableModMassesRounded_AtReportedPeptideLevel_Key_ReportedPeptideId.get( reportedPeptideId );
	    			if ( variableModMassesRounded == null ) {
	    				variableModMassesRounded = new HashSet<>();
	    				variableModMassesRounded_AtReportedPeptideLevel_Key_ReportedPeptideId.put( reportedPeptideId, variableModMassesRounded );
	    			}
	    			for ( DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item listEntry : entry.getValue() ) {
		    			long variableModMassRounded_Long = Math.round( listEntry.getMass() );
		    			if ( variableModMassRounded_Long > Integer.MAX_VALUE ) {
		    				String msg = "Math.round( DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item.mass ) > Integer.MAX_VALUE, is: " + variableModMassRounded_Long;
		    				log.error(msg);
		    				throw new LimelightInternalErrorException(msg);
		    			}
		    			Integer variableModMassRounded = (int) variableModMassRounded_Long;
		    			variableModMassesRounded.add( variableModMassRounded );
	    			}
	    		}
    		}

        	/**
        	 *  Map< Reported Peptide Id, ...> 
        	 */
        	Map<Integer, List<WebserviceResultItem>> webserviceResultItem_List_Map_Key_ReportedPeptideId = new HashMap<>();

    		for ( Integer reportedPeptideId : reportedPeptideIds_InitialSelection_List ) {

        		//  Get PSM open Mods and variable mods
        		/**
            	 * Map< search_scan_file_id, Map< Scan_Number, Object{ variable: Set<mod mass rounded>, open : Set<mod mass rounded> } >>
            	 */
        		Map<Integer, Map<Integer, WebserviceResultItem>> modMassesPerScan_KeyInner_ScanNumber_KeyOuter_SearchScanFileId = new HashMap<>();

    			List<PsmWebDisplayWebServiceResult> psmWebDisplayWebServiceResult_List =
    					psmWebDisplaySearcher.getPsmsWebDisplay( searchId, reportedPeptideId, null /* searchSubGroupId */, null /* psmIds_Include */, null /* psmIds_Exclude */, searcherCutoffValuesSearchLevel );
    			
    			Map<Long, PsmWebDisplayWebServiceResult> psmWebDisplayWebServiceResult_Map_Key_PsmId = new HashMap<>( psmWebDisplayWebServiceResult_List.size() );

				List<Long> psmIdList = new ArrayList<>( psmWebDisplayWebServiceResult_List.size() );
    			
    			for ( PsmWebDisplayWebServiceResult psmWebDisplayWebServiceResult : psmWebDisplayWebServiceResult_List ) {
    				psmWebDisplayWebServiceResult_Map_Key_PsmId.put( psmWebDisplayWebServiceResult.getPsmId(), psmWebDisplayWebServiceResult );
    				psmIdList.add( psmWebDisplayWebServiceResult.getPsmId() );
    			}
    			
    			if ( searchFlags_anyPsmHas_VariableDynamicModifications ) {

	    			List<PsmDynamicModificationDTO> psmDynamicModificationDTO_List = psmDynamicModification_For_PsmIdList_Searcher.getPsmDynamicModification_For_PsmIdList( psmIdList );
	    			
	    			for ( PsmDynamicModificationDTO psmDynamicModificationDTO : psmDynamicModificationDTO_List  ) {
	    				
	    				long variableModMassRounded_Long = Math.round( psmDynamicModificationDTO.getMass() );
		    			if ( variableModMassRounded_Long > Integer.MAX_VALUE ) {
		    				String msg = "Math.round( PsmDynamicModificationDTO.mass ) > Integer.MAX_VALUE, is: " + variableModMassRounded_Long;
		    				log.error(msg);
		    				throw new LimelightInternalErrorException(msg);
		    			}
		    			int variableModMassRounded = (int) variableModMassRounded_Long;
		    			
	    				PsmWebDisplayWebServiceResult psmWebDisplayWebServiceResult = psmWebDisplayWebServiceResult_Map_Key_PsmId.get( psmDynamicModificationDTO.getPsmId() );
	    				if ( psmWebDisplayWebServiceResult == null ) {
		    				String msg = "psmWebDisplayWebServiceResult_Map_Key_PsmId.get( psmDynamicModificationDTO.getPsmId() ) return null.  psmDynamicModificationDTO.getPsmId(): " + psmDynamicModificationDTO.getPsmId();
		    				log.error(msg);
		    				throw new LimelightInternalErrorException(msg);
	    				}
	    				
	    				Integer searchScanFileId = SEARCH_SCAN_FILE_ID_TO_USE_WHEN_DB_FIELD_NULL;
	    				
	    				if ( psmWebDisplayWebServiceResult.getSearchScanFileId() != null ) {
	    					searchScanFileId = psmWebDisplayWebServiceResult.getSearchScanFileId();
	    				}
	    				
	    				Map<Integer, WebserviceResultItem> modMassesPerScan_KeyInner_ScanNumber = modMassesPerScan_KeyInner_ScanNumber_KeyOuter_SearchScanFileId.get( searchScanFileId );
	    				if ( modMassesPerScan_KeyInner_ScanNumber == null ) {
	    					modMassesPerScan_KeyInner_ScanNumber = new HashMap<>();
	    					modMassesPerScan_KeyInner_ScanNumber_KeyOuter_SearchScanFileId.put( searchScanFileId, modMassesPerScan_KeyInner_ScanNumber );
	    				}
	    				WebserviceResultItem webserviceResultItem = modMassesPerScan_KeyInner_ScanNumber.get( psmWebDisplayWebServiceResult.getScanNumber() );
	    				if ( webserviceResultItem == null ) {
	    					webserviceResultItem = new WebserviceResultItem();
	    					modMassesPerScan_KeyInner_ScanNumber.put( psmWebDisplayWebServiceResult.getScanNumber(), webserviceResultItem );

	    					webserviceResultItem.scnm = psmWebDisplayWebServiceResult.getScanNumber();
	    					if ( searchScanFileId.intValue() != SEARCH_SCAN_FILE_ID_TO_USE_WHEN_DB_FIELD_NULL ) {
	    						webserviceResultItem.sfid = searchScanFileId;
	    					}
	    				}
	    				
	    				webserviceResultItem.psmIds.add( psmWebDisplayWebServiceResult.getPsmId() );
	    				
	    				webserviceResultItem.variable.add( variableModMassRounded );
	    			}
	
    			} else {
    				
    				//  Add in Variable/Dynamic Mod masses from Reported Peptide Level
    				
    				Set<Integer> variableModMassesRounded_AtReportedPeptideLevel = variableModMassesRounded_AtReportedPeptideLevel_Key_ReportedPeptideId.get( reportedPeptideId );
    				if ( variableModMassesRounded_AtReportedPeptideLevel != null ) {
	    				
	        			for ( PsmWebDisplayWebServiceResult psmWebDisplayWebServiceResult : psmWebDisplayWebServiceResult_List ) {
	
		    				Integer searchScanFileId = SEARCH_SCAN_FILE_ID_TO_USE_WHEN_DB_FIELD_NULL;
		    				
		    				if ( psmWebDisplayWebServiceResult.getSearchScanFileId() != null ) {
		    					searchScanFileId = psmWebDisplayWebServiceResult.getSearchScanFileId();
		    				}
		    				
		    				Map<Integer, WebserviceResultItem> modMassesPerScan_KeyInner_ScanNumber = modMassesPerScan_KeyInner_ScanNumber_KeyOuter_SearchScanFileId.get( searchScanFileId );
		    				if ( modMassesPerScan_KeyInner_ScanNumber == null ) {
		    					modMassesPerScan_KeyInner_ScanNumber = new HashMap<>();
		    					modMassesPerScan_KeyInner_ScanNumber_KeyOuter_SearchScanFileId.put( searchScanFileId, modMassesPerScan_KeyInner_ScanNumber );
		    				}
		    				WebserviceResultItem webserviceResultItem = modMassesPerScan_KeyInner_ScanNumber.get( psmWebDisplayWebServiceResult.getScanNumber() );
		    				if ( webserviceResultItem == null ) {
		    					webserviceResultItem = new WebserviceResultItem();
		    					modMassesPerScan_KeyInner_ScanNumber.put( psmWebDisplayWebServiceResult.getScanNumber(), webserviceResultItem );

		    					webserviceResultItem.scnm = psmWebDisplayWebServiceResult.getScanNumber();
		    					if ( searchScanFileId.intValue() != SEARCH_SCAN_FILE_ID_TO_USE_WHEN_DB_FIELD_NULL ) {
		    						webserviceResultItem.sfid = searchScanFileId;
		    					}
		    				}
		    				
		    				webserviceResultItem.psmIds.add( psmWebDisplayWebServiceResult.getPsmId() );
		    				
		    				for ( Integer variableModMassRounded : variableModMassesRounded_AtReportedPeptideLevel ) {
		    					webserviceResultItem.variable.add( variableModMassRounded );
		    				}
	        			}
    				}
    			}

    			if ( searchFlags_anyPsmHas_OpenModifications ) {

    				List<PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry>  psmOpenModificationMassesList = 
    						psmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher
    						.getPsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );

					for ( PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry entry : psmOpenModificationMassesList ) {

						Long psmId = entry.getPsmId();
						long openModMass_Long = Math.round( entry.getOpenModificationMass() );
		    			if ( openModMass_Long > Integer.MAX_VALUE ) {
		    				String msg = "Math.round( PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry.mass ) > Integer.MAX_VALUE, is: " + openModMass_Long;
		    				log.error(msg);
		    				throw new LimelightInternalErrorException(msg);
		    			}
		    			Integer openModMass  = (int) openModMass_Long;

	    				PsmWebDisplayWebServiceResult psmWebDisplayWebServiceResult = psmWebDisplayWebServiceResult_Map_Key_PsmId.get( psmId );
	    				if ( psmWebDisplayWebServiceResult == null ) {
		    				String msg = "psmWebDisplayWebServiceResult_Map_Key_PsmId.get( psmDynamicModificationDTO.getPsmId() ) return null.  entry.getPsmId(): " + entry.getPsmId();
		    				log.error(msg);
		    				throw new LimelightInternalErrorException(msg);
	    				}
	    				
	    				Integer searchScanFileId = SEARCH_SCAN_FILE_ID_TO_USE_WHEN_DB_FIELD_NULL;
	    				
	    				if ( psmWebDisplayWebServiceResult.getSearchScanFileId() != null ) {
	    					searchScanFileId = psmWebDisplayWebServiceResult.getSearchScanFileId();
	    				}
	    				
	    				Map<Integer, WebserviceResultItem> modMassesPerScan_KeyInner_ScanNumber = modMassesPerScan_KeyInner_ScanNumber_KeyOuter_SearchScanFileId.get( searchScanFileId );
	    				if ( modMassesPerScan_KeyInner_ScanNumber == null ) {
	    					modMassesPerScan_KeyInner_ScanNumber = new HashMap<>();
	    					modMassesPerScan_KeyInner_ScanNumber_KeyOuter_SearchScanFileId.put( searchScanFileId, modMassesPerScan_KeyInner_ScanNumber );
	    				}
	    				WebserviceResultItem webserviceResultItem = modMassesPerScan_KeyInner_ScanNumber.get( psmWebDisplayWebServiceResult.getScanNumber() );
	    				if ( webserviceResultItem == null ) {
	    					webserviceResultItem = new WebserviceResultItem();
	    					modMassesPerScan_KeyInner_ScanNumber.put( psmWebDisplayWebServiceResult.getScanNumber(), webserviceResultItem );
	    					webserviceResultItem.scnm = psmWebDisplayWebServiceResult.getScanNumber();
	    					if ( searchScanFileId.intValue() != SEARCH_SCAN_FILE_ID_TO_USE_WHEN_DB_FIELD_NULL ) {
	    						webserviceResultItem.sfid = searchScanFileId;
	    					}
	    				}
	    				
	    				webserviceResultItem.psmIds.add( psmWebDisplayWebServiceResult.getPsmId() );
	    				
	    				webserviceResultItem.open.add( openModMass );
    				}
    			}

        		//  Convert Map to List
        		
        		List<WebserviceResultItem> scans = new ArrayList<>( 100000 );
        		
        		/**
            	 * Map< search_scan_file_id, Map< Scan_Number, Object{ variable: Set<mod mass rounded>, open : Set<mod mass rounded> } >>
            	 */
        		// Map<Integer, Map<Integer, WebserviceResultItem>> modMassesPerScan_KeyInner_ScanNumber_KeyOuter_SearchScanFileId = new HashMap<>();

        		for ( Map.Entry<Integer, Map<Integer, WebserviceResultItem>> entryOuter : modMassesPerScan_KeyInner_ScanNumber_KeyOuter_SearchScanFileId.entrySet() ) {
        			for ( Map.Entry<Integer, WebserviceResultItem> entryInner : entryOuter.getValue().entrySet() ) {
        				
        				scans.add( entryInner.getValue() );
        			}
        		}
        		
        		if ( ! scans.isEmpty() ) {
        			
        			webserviceResultItem_List_Map_Key_ReportedPeptideId.put( reportedPeptideId, scans );
        		}
    		}

    		WebserviceResult result = new WebserviceResult();
    		result.resultRoot = webserviceResultItem_List_Map_Key_ReportedPeptideId;
    		
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( result );

    		{ // Save cached value 
    			
    			cached_WebserviceResponse_Management.putCachedResponse( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, responseAsJSON, this );
    		}
    		
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

    public static class WebserviceRequest {

    	private SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId;
    	private Integer projectSearchId;

    	public Integer getProjectSearchId() {
    		return projectSearchId;
    	}

    	public void setProjectSearchId(Integer projectSearchId) {
    		this.projectSearchId = projectSearchId;
    	}

    	public SearchDataLookupParams_For_Single_ProjectSearchId getSearchDataLookupParams_For_Single_ProjectSearchId() {
    		return searchDataLookupParams_For_Single_ProjectSearchId;
    	}

    	public void setSearchDataLookupParams_For_Single_ProjectSearchId(
    			SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId) {
    		this.searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchId;
    	}

    }

    /**
     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
     *
     */
    public static class WebserviceResult {
    	
    	/**
    	 *  Map< Reported Peptide Id, ...> 
    	 */
    	Map<Integer, List<WebserviceResultItem>> resultRoot;

		public Map<Integer, List<WebserviceResultItem>> getResultRoot() {
			return resultRoot;
		}
    }

    
    /**
     * 
     *
     */
    public static class WebserviceResultItem {
    	
    	Set<Integer> variable = new HashSet<>();
    	Set<Integer> open = new HashSet<>();
    	Set<Long> psmIds = new HashSet<>();
		int scnm; // scan number
    	Integer sfid; // search scan filename id 
    	
		public Set<Integer> getVariable() {
			return variable;
		}
		public Set<Integer> getOpen() {
			return open;
		}
    	public Set<Long> getPsmIds() {
			return psmIds;
		}
		public int getScnm() {
			return scnm;
		}
		public Integer getSfid() {
			return sfid;
		}
    }
}


