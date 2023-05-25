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
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;

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
import org.yeastrc.limelight.limelight_webapp.parallelstream_java_processing_enable_configuration.ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_IF;
import org.yeastrc.limelight.limelight_webapp.parallelstream_java_processing_enable_configuration.ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup.ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValues_Factory;
import org.yeastrc.limelight.limelight_webapp.searchers.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmDynamicModification_For_PsmIdList_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmWebDisplaySearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher.PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry;
import org.yeastrc.limelight.limelight_webapp.searchers_results.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmWebDisplayWebServiceResult;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services.ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.Gzip_ByteArray_To_ByteArray_IF;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * !!!  WARNING:  Webservice Response is CACHED  !!!!
 * 
 * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
 * 
 * 
 * 
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
	 * 
	 * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Response  !!!!!!!!
	 */
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.MOD_PAGE_SPECIAL__GET_MOD_INFO_FOR_Rounded_MOD_MASSES_CUTOFFS_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER_VERSION_0001;
	
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
	private Gzip_ByteArray_To_ByteArray_IF gzip_ByteArray_To_ByteArray;
	
	@Autowired
	private RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF restControllerUtils__Request_Accept_GZip_Response_Set_GZip;
	

	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;

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
	private ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_IF parallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;


	private boolean parallelStream_DefaultThreadPool_Java_Processing_Enabled_True;

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
			cached_WebserviceResponse_Management.registerControllerPathForCachedResponse_RequiredToCallAtWebappStartup( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, this );

			{
				ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response response = 
						parallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup.get_ParallelStream_Java_Processing_Enable_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup();
				
				this.parallelStream_DefaultThreadPool_Java_Processing_Enabled_True = response.isParallelStream_DefaultThreadPool_Java_Processing_Enabled_True();
			}
			
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

    			boolean accept_GZIP = restControllerUtils__Request_Accept_GZip_Response_Set_GZip.does_HttpServletRequest_Accept_GZip( httpServletRequest );
    			
    			byte[] cachedResponse = cached_WebserviceResponse_Management.getCachedResponse( accept_GZIP, CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, this );
    			
    			if ( cachedResponse != null ) {
    				
    				if ( accept_GZIP ) {
    					restControllerUtils__Request_Accept_GZip_Response_Set_GZip.set_GZIP_On_HttpServletResponse( httpServletResponse );
    				}
    				
    				return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( cachedResponse );
    			}
    		}
   		    
    		Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
			if ( searchId == null ) {
				String msg = "No searchId for projectSearchId: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = 
					searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);
			
    		boolean searchFlags_anyPsmHas_VariableDynamicModifications = searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_DynamicModifications();
    		boolean searchFlags_anyPsmHas_OpenModifications = searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_OpenModifications();
    		
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
    		
    		
    		
    		final Map<Integer, Map<Integer, Variable_ModItem_ReportedPeptideLevel>> variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId = new HashMap<>();
    		AtomicBoolean variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId__Populated = new AtomicBoolean(false);
    		

    		if ( ! searchFlags_anyPsmHas_VariableDynamicModifications ) {
    		
    			variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId__Populated.set(true);
	
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

        	final List<WebserviceResultItem> webserviceResultItem_List__For_NonParallel = new ArrayList<>( 1000000 );

        	final List<WebserviceResultItem> webserviceResultItem_List__SynchronizedList_ForParallel = Collections.synchronizedList( webserviceResultItem_List__For_NonParallel );

        	{
        		AtomicBoolean anyThrownInsideStreamProcessing = new AtomicBoolean(false);
        		
        		List<Throwable> thrownInsideStream_List = Collections.synchronizedList(new ArrayList<>());
        		
        		if ( this.parallelStream_DefaultThreadPool_Java_Processing_Enabled_True ) {

        			//  YES execute in parallel

        			reportedPeptideIds_InitialSelection_List.parallelStream().forEach( reportedPeptideId -> { 

        				try {
        					InternalClass__ProcessFor_Single_ReportedPeptideId_Updating_ResultList__Params params = new InternalClass__ProcessFor_Single_ReportedPeptideId_Updating_ResultList__Params();
        					params.searchId = searchId;
        					params.reportedPeptideId = reportedPeptideId;
        					params.searcherCutoffValuesSearchLevel = searcherCutoffValuesSearchLevel;
        					params.searchFlags_anyPsmHas_VariableDynamicModifications = searchFlags_anyPsmHas_VariableDynamicModifications;
        					params.searchFlags_anyPsmHas_OpenModifications = searchFlags_anyPsmHas_OpenModifications;
        					params.modMassesInteger_Set = modMassesInteger_Set;
        					params.variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId = variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId;
        					params.variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId__Populated = variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId__Populated;

        					params.webserviceResultItem_List__SynchronizedList = webserviceResultItem_List__SynchronizedList_ForParallel;  //  UPDATED

        					this._processFor_Single_ReportedPeptideId_Updating_ResultList(
        							params
        							);

        				} catch (Throwable t) {

        					log.error( "Fail processing reportedPeptideIds_InitialSelection_List: reportedPeptideId" + reportedPeptideId, t);

        					anyThrownInsideStreamProcessing.set(true);

        					thrownInsideStream_List.add(t);
        				}
        			});

        		} else {
        			
        			//  NOT execute in parallel

        			reportedPeptideIds_InitialSelection_List.forEach( reportedPeptideId -> { 

        				try {

        					InternalClass__ProcessFor_Single_ReportedPeptideId_Updating_ResultList__Params params = new InternalClass__ProcessFor_Single_ReportedPeptideId_Updating_ResultList__Params();
        					params.searchId = searchId;
        					params.reportedPeptideId = reportedPeptideId;
        					params.searcherCutoffValuesSearchLevel = searcherCutoffValuesSearchLevel;
        					params.searchFlags_anyPsmHas_VariableDynamicModifications = searchFlags_anyPsmHas_VariableDynamicModifications;
        					params.searchFlags_anyPsmHas_OpenModifications = searchFlags_anyPsmHas_OpenModifications;
        					params.modMassesInteger_Set = modMassesInteger_Set;
        					params.variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId = variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId;
        					params.variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId__Populated = variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId__Populated;

        					params.webserviceResultItem_List__SynchronizedList = webserviceResultItem_List__For_NonParallel;  //  UPDATED

        					this._processFor_Single_ReportedPeptideId_Updating_ResultList(
        							params
        							);

        				} catch (Throwable t) {
        					
        					log.error( "Fail processing reportedPeptideIds_InitialSelection_List.  Rethrow in class LimelightInternalErrorException: reportedPeptideId" + reportedPeptideId, t);
        					
        					anyThrownInsideStreamProcessing.set(true);
        					
        					thrownInsideStream_List.add(t);
        					
        					throw new LimelightInternalErrorException( t );
        				}
        			});
        		}

        		if ( anyThrownInsideStreamProcessing.get() ) {
        			
        			throw new LimelightInternalErrorException( "At least 1 exception processing reportedPeptideIds_InitialSelection_List" );
        		}
    		}

    		WebserviceResult result = new WebserviceResult();
    		result.resultRoot = webserviceResultItem_List__For_NonParallel;
    		
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( result );

    		
    		byte[] responseAsJSON_GZIPPED = gzip_ByteArray_To_ByteArray.gzip_ByteArray_To_ByteArray(responseAsJSON);
    		

			boolean accept_GZIP = restControllerUtils__Request_Accept_GZip_Response_Set_GZip.does_HttpServletRequest_Accept_GZip( httpServletRequest );
			

    		{ // Save cached value 
    			
    			cached_WebserviceResponse_Management.putCachedResponse_GZIPPED( CONTROLLER_PATH__FOR_CACHED_RESPONSE_MGMT, postBody, responseAsJSON_GZIPPED, this );
    		}
    		
    		byte[] responseAsJSON_FINAL = responseAsJSON;
    		

			if ( accept_GZIP ) {
				restControllerUtils__Request_Accept_GZip_Response_Set_GZip.set_GZIP_On_HttpServletResponse( httpServletResponse );
				
				responseAsJSON_FINAL = responseAsJSON_GZIPPED;
			}
			
    		
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
    
    /**
     * @param searchId
     * @param reportedPeptideId
     * @param searcherCutoffValuesSearchLevel
     * @param searchFlags_anyPsmHas_VariableDynamicModifications
     * @param searchFlags_anyPsmHas_OpenModifications
     * @param modMassesInteger_Set
     * @param variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId
     * @param webserviceResultItem_List__SynchronizedList
     * @throws Exception
     */
    private void _processFor_Single_ReportedPeptideId_Updating_ResultList(
    		
    		InternalClass__ProcessFor_Single_ReportedPeptideId_Updating_ResultList__Params params
    		
    		) throws Exception {


		Integer searchId = params.searchId; 
		Integer reportedPeptideId = params.reportedPeptideId;
		SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel = params.searcherCutoffValuesSearchLevel;
		
		boolean searchFlags_anyPsmHas_VariableDynamicModifications = params.searchFlags_anyPsmHas_VariableDynamicModifications;
		boolean searchFlags_anyPsmHas_OpenModifications = params.searchFlags_anyPsmHas_OpenModifications;

		Set<Integer> modMassesInteger_Set = params.modMassesInteger_Set;
		Map<Integer, Map<Integer, Variable_ModItem_ReportedPeptideLevel>> variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId = 
				params.variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId;
		
		AtomicBoolean variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId__Populated = 
				params.variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId__Populated;
		
		List<WebserviceResultItem> webserviceResultItem_List__SynchronizedList = params.webserviceResultItem_List__SynchronizedList;  //  UPDATED
		
    	
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
			
//			Map<Integer, Map<Integer, Variable_ModItem_ReportedPeptideLevel>> variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId

			if ( variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId__Populated.get() ) {
				
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
				
				webserviceResultItem_List__SynchronizedList.add( entryPerModMassRounded.getValue() );
			}
		}
    }
    
    ///////////////////////////

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

    private static class InternalClass__ProcessFor_Single_ReportedPeptideId_Updating_ResultList__Params {
    		
    	volatile Integer reportedPeptideId;
    		
    	volatile Integer searchId;
    	volatile SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel;
    	
    	volatile boolean searchFlags_anyPsmHas_VariableDynamicModifications;
    	volatile boolean searchFlags_anyPsmHas_OpenModifications;
    	
    	volatile Set<Integer> modMassesInteger_Set;
    	volatile Map<Integer, Map<Integer, Variable_ModItem_ReportedPeptideLevel>> variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId;
    	volatile AtomicBoolean variableModData_AtReportedPeptideLevel_Key_ModMassRounded_Key_ReportedPeptideId__Populated;
    	
    	volatile List<WebserviceResultItem> webserviceResultItem_List__SynchronizedList;  //  UPDATED
    }

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
    
    //  !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Response  !!!!!!!!
    
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

    	volatile WebserviceResultItem_Variable_ModItem variable;
    	volatile WebserviceResultItem_Open_ModItem open;
    	volatile long psmId;
    	volatile int modMass;
    	volatile int reportedPeptideId;
    	
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


