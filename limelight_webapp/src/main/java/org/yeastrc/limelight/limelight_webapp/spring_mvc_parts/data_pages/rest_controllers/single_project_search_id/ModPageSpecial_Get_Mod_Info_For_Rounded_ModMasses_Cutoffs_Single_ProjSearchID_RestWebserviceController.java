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
import org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmWebDisplaySearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher.PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry;
import org.yeastrc.limelight.limelight_webapp.searchers_results.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmWebDisplayWebServiceResult;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services.ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Mod Page - !!!  Special Specific Web Service !!!
 * 
 * Retrieve Open and Variable Mod Position Data per psm
 * 
 * Input:  Project Search Id, Filter cutoffs, Rounded Mod Masses for Single Project Search Id
 * 
 * Output:
 * 
 * { resultRoot : [ { 
 *   psmId, modMass, reportedPeptideId, variable_loc:[position1, position2,], 
 *   open_loc:[position1, position2,], open_unloc: boolean 
 * }  ]  }
 *   
 */
@RestController
public class ModPageSpecial_Get_Mod_Info_For_Rounded_ModMasses_Cutoffs_Single_ProjSearchID_RestWebserviceController 

implements
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
	private static final Logger log = LoggerFactory.getLogger( ModPageSpecial_Get_Mod_Info_For_Rounded_ModMasses_Cutoffs_Single_ProjSearchID_RestWebserviceController.class );

	/**
	 * Path for this Controller
	 */
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.MOD_PAGE_SPECIAL__GET_MOD_INFO_FOR_Rounded_MOD_MASSES_CUTOFFS_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER;
	
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
	private PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_IF psmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher;

	@Autowired
	private DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * Constructor
	 */
	public ModPageSpecial_Get_Mod_Info_For_Rounded_ModMasses_Cutoffs_Single_ProjSearchID_RestWebserviceController() {
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

    		Integer projectSearchId = webserviceRequest.projectSearchId;

    		if ( projectSearchId == null ) {
    			log.warn( "No Project Search Ids" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
			if ( webserviceRequest.searchDataLookupParams_For_Single_ProjectSearchId == null ) {
				String msg = "searchDataLookupParams_For_Single_ProjectSearchId == null: projectSearchId: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( webserviceRequest.modMassesInteger == null ) {
				String msg = "modMassesInteger == null: projectSearchId: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( webserviceRequest.modMassesInteger.isEmpty() ) {
				String msg = "modMassesInteger.isEmpty(): projectSearchId: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

    		List<Integer> projectSearchIdsForValidate = new ArrayList<>( 1 );
    		projectSearchIdsForValidate.add( projectSearchId );
    		
    		Set<Integer> modMassesInteger_Set = new HashSet<>( webserviceRequest.modMassesInteger );

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
    						webserviceRequest.searchDataLookupParams_For_Single_ProjectSearchId );

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
    		
    		
    		
    		Map<Integer, Map<Integer, Variable_ModItem_ReportedPeptideLevel>> variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId = null;
    		

    		if ( ! searchFlags_anyPsmHas_VariableDynamicModifications ) {
    		
    			variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId = new HashMap<>();
	
	    		//  Get Reported Peptide Level Variable/Dynamic Mods 
	    		DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result searcherResult = 
	    				modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher
	    				.getDynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIds( searchId, reportedPeptideIds_InitialSelection_List );
	    		Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> dynamicMods_results_Key_ReportedPeptideId =
	    				searcherResult.getResults_Key_ReportedPeptideId();
	    		
	    		for ( Map.Entry<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> entry : dynamicMods_results_Key_ReportedPeptideId.entrySet() ) {
	    			
	    			Integer reportedPeptideId = entry.getKey();
	    			
	    			for ( DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item listEntry : entry.getValue() ) {
		    			long variableModMassRounded_Long = Math.round( listEntry.getMass() );
		    			if ( variableModMassRounded_Long > Integer.MAX_VALUE ) {
		    				String msg = "Math.round( DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item.mass ) > Integer.MAX_VALUE, is: " + variableModMassRounded_Long;
		    				log.error(msg);
		    				throw new LimelightInternalErrorException(msg);
		    			}
		    			Integer variableModMassRounded = (int) variableModMassRounded_Long;
		    					    			
		    			if ( ! modMassesInteger_Set.contains( variableModMassRounded ) ) {
		    				
		    				//  Not the Mod Mass requested so skip it
		    				
		    				continue;  //  EARLY CONTINUE
		    			}

		    			Map<Integer, Variable_ModItem_ReportedPeptideLevel> variableModData_AtReportedPeptideLevel_Key_ModMassRounded = variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId.get( reportedPeptideId );
		    			if ( variableModData_AtReportedPeptideLevel_Key_ModMassRounded == null ) {
		    				variableModData_AtReportedPeptideLevel_Key_ModMassRounded = new HashMap<>();
		    				variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId.put( reportedPeptideId, variableModData_AtReportedPeptideLevel_Key_ModMassRounded );
		    			}

		    			Variable_ModItem_ReportedPeptideLevel variable_ModItem_ReportedPeptideLevel = variableModData_AtReportedPeptideLevel_Key_ModMassRounded.get( reportedPeptideId );
		    			if ( variable_ModItem_ReportedPeptideLevel == null ) {
		    				variable_ModItem_ReportedPeptideLevel = new Variable_ModItem_ReportedPeptideLevel();
		    				variableModData_AtReportedPeptideLevel_Key_ModMassRounded.put( variableModMassRounded, variable_ModItem_ReportedPeptideLevel );
		    			}
		    			
		    			if ( listEntry.isIs_N_Terminal() ) {
		    				
		    				variable_ModItem_ReportedPeptideLevel.nterm = true;
		    				
		    			} else if ( listEntry.isIs_C_Terminal() ) {
		    				
		    				variable_ModItem_ReportedPeptideLevel.cterm = true;
		    				
		    			} else {
		    				
		    				variable_ModItem_ReportedPeptideLevel.loc.add( listEntry.getPosition() );
		    			}
	    			}
	    		}
    		}

        	List<WebserviceResultItem> webserviceResultItem_List = new ArrayList<>( 1000000 );

    		for ( Integer reportedPeptideId : reportedPeptideIds_InitialSelection_List ) {

        		//  Get PSM open Mods and variable mods
        		/**
            	 * Map< PSM Id, Map< Mod Mss Rounded, Object{ variable: Set<mod mass rounded>, open : Set<mod mass rounded> } >>
            	 */
        		Map<Long, Map<Integer, WebserviceResultItem>> modMassesPerScan_Key_ModMassRounded_Key_PsmId = new HashMap<>();

    			List<PsmWebDisplayWebServiceResult> psmWebDisplayWebServiceResult_List =
    					psmWebDisplaySearcher.getPsmsWebDisplay( searchId, reportedPeptideId, null /* searchSubGroupId */, null /* psmIds_Include */, null /* psmIds_Exclude */, searcherCutoffValuesSearchLevel );
    			
    			// Result_Map_Key_PsmId
    			Map<Long, PsmWebDisplayWebServiceResult> psmWebDisplayWebServiceResult_Map_Key_PsmId = new HashMap<>( psmWebDisplayWebServiceResult_List.size() );

				List<Long> psmIdList = new ArrayList<>( psmWebDisplayWebServiceResult_List.size() );
    			
    			for ( PsmWebDisplayWebServiceResult psmWebDisplayWebServiceResult : psmWebDisplayWebServiceResult_List ) {
    				psmWebDisplayWebServiceResult_Map_Key_PsmId.put( psmWebDisplayWebServiceResult.getPsmId(), psmWebDisplayWebServiceResult );
    				psmIdList.add( psmWebDisplayWebServiceResult.getPsmId() );
    			}
    			
    			if ( searchFlags_anyPsmHas_VariableDynamicModifications ) {

	    			List<PsmDynamicModificationDTO> psmDynamicModificationDTO_List = psmDynamicModification_For_PsmIdList_Searcher.getPsmDynamicModification_For_PsmIdList( psmIdList );
	    			
	    			for ( PsmDynamicModificationDTO psmDynamicModificationDTO : psmDynamicModificationDTO_List  ) {

        				Long psmId = psmDynamicModificationDTO.getPsmId();
        				
	    				long variableModMassRounded_Long = Math.round( psmDynamicModificationDTO.getMass() );
		    			if ( variableModMassRounded_Long > Integer.MAX_VALUE ) {
		    				String msg = "Math.round( PsmDynamicModificationDTO.mass ) > Integer.MAX_VALUE, is: " + variableModMassRounded_Long;
		    				log.error(msg);
		    				throw new LimelightInternalErrorException(msg);
		    			}
		    			int variableModMassRounded = (int) variableModMassRounded_Long;

		    			if ( ! modMassesInteger_Set.contains( variableModMassRounded ) ) {
		    				
		    				//  Not the Mod Mass requested so skip it
		    				
		    				continue;  //  EARLY CONTINUE
		    			}

		    			
	    				PsmWebDisplayWebServiceResult psmWebDisplayWebServiceResult = psmWebDisplayWebServiceResult_Map_Key_PsmId.get( psmId );
	    				if ( psmWebDisplayWebServiceResult == null ) {
		    				String msg = "psmWebDisplayWebServiceResult_Map_Key_PsmId.get( psmDynamicModificationDTO.getPsmId() ) return null.  psmDynamicModificationDTO.getPsmId(): " + psmId;
		    				log.error(msg);
		    				throw new LimelightInternalErrorException(msg);
	    				}
	    				
	    				Map<Integer, WebserviceResultItem> modMassesPerScan_Key_ModMassRounded = modMassesPerScan_Key_ModMassRounded_Key_PsmId.get( psmId ); 
	    				if ( modMassesPerScan_Key_ModMassRounded == null ) {
	    					modMassesPerScan_Key_ModMassRounded = new HashMap<>();
	    					modMassesPerScan_Key_ModMassRounded_Key_PsmId.put( psmId, modMassesPerScan_Key_ModMassRounded );
	    				}
	    				
	    				WebserviceResultItem webserviceResultItem = modMassesPerScan_Key_ModMassRounded.get( variableModMassRounded );
	    				if ( webserviceResultItem == null ) {
	    					webserviceResultItem = new WebserviceResultItem();
	    					modMassesPerScan_Key_ModMassRounded.put( variableModMassRounded, webserviceResultItem );

	    					webserviceResultItem.psmId = psmId;
	    					webserviceResultItem.modMass = variableModMassRounded;
	    					webserviceResultItem.reportedPeptideId = reportedPeptideId;
	    				}
	    				
	    				
	    				if ( webserviceResultItem.variable == null ) {
	    					webserviceResultItem.variable = new WebserviceResultItem_Variable_ModItem();
	    				}
	    				
	    				if ( psmDynamicModificationDTO.isIs_N_Terminal() ) {
	    					
							webserviceResultItem.variable.nterm = true;
	    					
	    				} else if ( psmDynamicModificationDTO.isIs_C_Terminal() ) {
	    					
							webserviceResultItem.variable.cterm = true;
	    					
	    				} else {

	    					webserviceResultItem.variable.loc.add( psmDynamicModificationDTO.getPosition() );
	    				}
	    			}
	
    			} else {
    				
    				//  Add in Variable/Dynamic Mod masses from Reported Peptide Level
    				
//    				Map<Integer, Map<Integer, Variable_ModItem_ReportedPeptideLevel>> variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId

    				if ( variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId != null ) {
    					
    					Map<Integer, Variable_ModItem_ReportedPeptideLevel> variableModData_AtReportedPeptideLevel_Key_ModMassRounded = variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId.get( reportedPeptideId );

    					if ( variableModData_AtReportedPeptideLevel_Key_ModMassRounded != null ) {
    						
    						for ( PsmWebDisplayWebServiceResult psmWebDisplayWebServiceResult : psmWebDisplayWebServiceResult_List ) {

    							Long psmId = psmWebDisplayWebServiceResult.getPsmId();

    		    				Map<Integer, WebserviceResultItem> modMassesPerScan_Key_ModMassRounded = modMassesPerScan_Key_ModMassRounded_Key_PsmId.get( psmId ); 
    		    				if ( modMassesPerScan_Key_ModMassRounded == null ) {
    		    					modMassesPerScan_Key_ModMassRounded = new HashMap<>();
    		    					modMassesPerScan_Key_ModMassRounded_Key_PsmId.put( psmId, modMassesPerScan_Key_ModMassRounded );
    		    				}
    		    				
    		    				for ( Map.Entry<Integer, Variable_ModItem_ReportedPeptideLevel> variableModData_AtReportedPeptideLevel_Key_ModMassRounded_MapEntry : 
    		    					variableModData_AtReportedPeptideLevel_Key_ModMassRounded.entrySet() ) { 
    		    					
    		    					Integer variableModMassRounded = variableModData_AtReportedPeptideLevel_Key_ModMassRounded_MapEntry.getKey();
    		    					
    		    					Variable_ModItem_ReportedPeptideLevel variableModData_AtReportedPeptideLevel = variableModData_AtReportedPeptideLevel_Key_ModMassRounded_MapEntry.getValue();
    		    					
    		    					WebserviceResultItem webserviceResultItem = modMassesPerScan_Key_ModMassRounded.get( variableModMassRounded );
    		    					if ( webserviceResultItem == null ) {
    		    						webserviceResultItem = new WebserviceResultItem();
    		    						modMassesPerScan_Key_ModMassRounded.put( variableModMassRounded, webserviceResultItem );

    		    						webserviceResultItem.psmId = psmId;
    		    						webserviceResultItem.modMass = variableModMassRounded;
    		    						webserviceResultItem.reportedPeptideId = reportedPeptideId;
    		    					}


    		    					if ( webserviceResultItem.variable == null ) {
    		    						webserviceResultItem.variable = new WebserviceResultItem_Variable_ModItem();
    		    					}

    		    					if ( ! variableModData_AtReportedPeptideLevel.loc.isEmpty() ) {

    		    						webserviceResultItem.variable.loc.addAll( variableModData_AtReportedPeptideLevel.loc );
    		    					}
    		    					if ( variableModData_AtReportedPeptideLevel.nterm ) {

    		    						webserviceResultItem.variable.nterm = true;
    		    					}
    		    					if ( variableModData_AtReportedPeptideLevel.cterm ) {

    		    						webserviceResultItem.variable.cterm = true;
    		    					}
    		    				}
    						}
    					}
    				}
    			}

    			if ( searchFlags_anyPsmHas_OpenModifications ) {

    				List<PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry>  psmOpenModificationMassesList = 
    						psmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher
    						.getPsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );

					for ( PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry entry : psmOpenModificationMassesList ) {

						Long psmId = entry.getPsmId();
						long openModMass_Long = Math.round( entry.getOpenModificationMass() );
		    			if ( openModMass_Long > Integer.MAX_VALUE ) {
		    				String msg = "Math.round( PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry.mass ) > Integer.MAX_VALUE, is: " + openModMass_Long;
		    				log.error(msg);
		    				throw new LimelightInternalErrorException(msg);
		    			}
		    			Integer openModMass  = (int) openModMass_Long;

		    			if ( ! modMassesInteger_Set.contains( openModMass ) ) {
		    				
		    				//  Not the Mod Mass requested so skip it
		    				
		    				continue;  //  EARLY CONTINUE
		    			}

	    				Map<Integer, WebserviceResultItem> modMassesPerScan_Key_ModMassRounded = modMassesPerScan_Key_ModMassRounded_Key_PsmId.get( psmId ); 
	    				if ( modMassesPerScan_Key_ModMassRounded == null ) {
	    					modMassesPerScan_Key_ModMassRounded = new HashMap<>();
	    					modMassesPerScan_Key_ModMassRounded_Key_PsmId.put( psmId, modMassesPerScan_Key_ModMassRounded );
	    				}
	    				
	    				WebserviceResultItem webserviceResultItem = modMassesPerScan_Key_ModMassRounded.get( openModMass );
	    				if ( webserviceResultItem == null ) {
	    					webserviceResultItem = new WebserviceResultItem();
	    					modMassesPerScan_Key_ModMassRounded.put( openModMass, webserviceResultItem );

	    					webserviceResultItem.psmId = psmId;
	    					webserviceResultItem.modMass = openModMass;
	    					webserviceResultItem.reportedPeptideId = reportedPeptideId;
	    				}

    					if ( webserviceResultItem.open == null ) {
    						webserviceResultItem.open = new WebserviceResultItem_Open_ModItem();
    					}
    					
	    				if ( entry.getOpenModificationPosition() == null ) {
	    					
	    					webserviceResultItem.open.unloc = true;
	    				} else {

	    					if ( entry.getIs_N_Terminal() ) {
	    						
	    						webserviceResultItem.open.nterm = true;
	    						
	    					} else if ( entry.getIs_C_Terminal() ) {
	    						
	    						webserviceResultItem.open.cterm = true;
	    						
	    					} else {
	    						webserviceResultItem.open.loc.add( entry.getOpenModificationPosition() );
	    					}
	    				}
    				}
    			}

        		//  Convert Map to List
        		
        		//  Map< PSM Id, Map< Mod Mass Rounded, Object{ variable: Set<mod mass rounded>, open : Set<mod mass rounded> } >>

        		for ( Map.Entry<Long, Map<Integer, WebserviceResultItem>> entryPerPSMId : modMassesPerScan_Key_ModMassRounded_Key_PsmId.entrySet() ) {
        			
        			for ( Map.Entry<Integer, WebserviceResultItem> entryPerModMassRounded : entryPerPSMId.getValue().entrySet() ) {
        				
        				webserviceResultItem_List.add( entryPerModMassRounded.getValue() );
        			}
        		}
    		}

    		WebserviceResult result = new WebserviceResult();
    		result.resultRoot = webserviceResultItem_List;
    		
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

    /**
     * Web Service Request
     *
     */
    public static class WebserviceRequest {

    	private SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId;
    	private Integer projectSearchId;
    	private List<Integer> modMassesInteger;
    	
		public void setModMassesInteger(List<Integer> modMassesInteger) {
			this.modMassesInteger = modMassesInteger;
		}
		public void setSearchDataLookupParams_For_Single_ProjectSearchId(
				SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId) {
			this.searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchId;
		}
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
    }
    
    ////////////////////////
    
    //  Internal classes

    /**
     * 
     *
     */
    private static class Variable_ModItem_ReportedPeptideLevel {
    	Set<Integer> loc = new HashSet<>();
    	boolean nterm;
    	boolean cterm;
    }
    
    ////////////////////////
    
    //  Web Service Request and Response Classes
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    	
    	/**
    	 *   
    	 */
    	List<WebserviceResultItem> resultRoot;

		public List<WebserviceResultItem> getResultRoot() {
			return resultRoot;
		}

    }
    
    /**
     * Entry per  psmId / modMass  pair
     *
     */
    public static class WebserviceResultItem {

    	WebserviceResultItem_Variable_ModItem variable;
    	WebserviceResultItem_Open_ModItem open;
    	long psmId;
    	int modMass;
    	int reportedPeptideId;
    	
		public WebserviceResultItem() {
			super();
		}
		public long getPsmId() {
			return psmId;
		}
		public int getReportedPeptideId() {
			return reportedPeptideId;
		}
		public WebserviceResultItem_Variable_ModItem getVariable() {
			return variable;
		}
		public WebserviceResultItem_Open_ModItem getOpen() {
			return open;
		}
		public int getModMass() {
			return modMass;
		}
    	
    }

    /**
     * 
     *
     */
    public static class WebserviceResultItem_Variable_ModItem {
    	Set<Integer> loc = new HashSet<>();
    	boolean nterm;
    	boolean cterm;
		public Set<Integer> getLoc() {
			return loc;
		}
		public boolean isNterm() {
			return nterm;
		}
		public boolean isCterm() {
			return cterm;
		}
    }

    /**
     * 
     *
     */
    public static class WebserviceResultItem_Open_ModItem {
    	Set<Integer> loc = new HashSet<>();
    	boolean nterm;
    	boolean cterm;
    	boolean unloc;
    	
		public Set<Integer> getLoc() {
			return loc;
		}
		public boolean isNterm() {
			return nterm;
		}
		public boolean isCterm() {
			return cterm;
		}
		public boolean isUnloc() {
			return unloc;
		}
    }
}


