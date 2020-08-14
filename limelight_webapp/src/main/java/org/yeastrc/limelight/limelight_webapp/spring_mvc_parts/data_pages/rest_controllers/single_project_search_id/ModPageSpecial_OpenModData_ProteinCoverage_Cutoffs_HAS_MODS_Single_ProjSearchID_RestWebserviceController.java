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
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValues_Factory;
import org.yeastrc.limelight.limelight_webapp.searchers.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinCoverageForSearchIdReportedPeptideIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinCoverageForSearchIdReportedPeptideIdsSearcher.ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher.PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry;
import org.yeastrc.limelight.limelight_webapp.searchers_results.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ProteinCoverageForSearchIdReportedPeptideIdSearcher_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services.ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Mod Page - !!!  Special Specific Web Service !!!
 * 
 * Retrieve Protein Coverage, Open Mod Data
 * 
 * Input:  Project Search Id, Filter cutoffs for Single Project Search Id
 * 
 * Output:
 * 
 *    proteinCoverage_OnlyContainsMods :
 *    
 *    JS Object with key reported_peptide_id
 *        JS Object with key protein sequence version id
 *            Array of positions in Protein
 *            
 *    reported_peptide_id : {
 *       protein sequence version id : [ position1, position 2, etc ]
 *     }
 *   }
 *   
 *  !!  Processing:  Protein Coverage RESTRICTED to reported_peptide_id that has any modifications or open modifications
 * 
 *  openMods
 *   reported_peptide_id :
 *    {
 *      open mod mass : [ psm id ]
 *    }
 */
@RestController
public class ModPageSpecial_OpenModData_ProteinCoverage_Cutoffs_HAS_MODS_Single_ProjSearchID_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( ModPageSpecial_OpenModData_ProteinCoverage_Cutoffs_HAS_MODS_Single_ProjSearchID_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private SearcherCutoffValues_Factory searcherCutoffValuesRootLevel_Factory;
	
	@Autowired
	private ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service;

	@Autowired
	private PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_IF psmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher;

	@Autowired
	private DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher;

	@Autowired
	private ProteinCoverageForSearchIdReportedPeptideIdsSearcherIF proteinCoverageForSearchIdReportedPeptideIdsSearcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public ModPageSpecial_OpenModData_ProteinCoverage_Cutoffs_HAS_MODS_Single_ProjSearchID_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.MOD_PAGE_SPECIAL__PROTEIN_COVERAGE_OPEN_MOD_DATA_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER
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
   		
    		
    		Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
			if ( searchId == null ) {
				String msg = "No searchId for projectSearchId: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
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
    		for ( ReportedPeptide_MinimalData_List_FromSearcher_Entry peptideMinimalObject : peptideMinimalObjectsList ) {
    			reportedPeptideIds_InitialSelection_List.add( peptideMinimalObject.getReportedPeptideId() );
    		}
    		
    		//  Get PSM open Mods
    		/**
        	 * Map<ReportedPeptideId,Map<Open Mod Mass rounded,Set<PSM ID>>>
        	 */
    		Map<Integer,Map<Integer,Set<Long>>> openModPsmIdsSet_KeyInnerOpenModMassRounded_KeyOuterReportedPeptideId = new HashMap<>();

    		for ( Integer reportedPeptideId : reportedPeptideIds_InitialSelection_List ) {

    			List<PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry>  psmOpenModificationMassesList = 
    					psmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher
    					.getPsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );
    			
    			if ( ! psmOpenModificationMassesList.isEmpty() ) {
	    			Map<Integer,Set<Long>> openModPsmIdsSet_KeyInnerOpenModMassRounded = openModPsmIdsSet_KeyInnerOpenModMassRounded_KeyOuterReportedPeptideId.get( reportedPeptideId );
	    			if ( openModPsmIdsSet_KeyInnerOpenModMassRounded == null ) {
	    				openModPsmIdsSet_KeyInnerOpenModMassRounded = new HashMap<>();
	    				openModPsmIdsSet_KeyInnerOpenModMassRounded_KeyOuterReportedPeptideId.put( reportedPeptideId, openModPsmIdsSet_KeyInnerOpenModMassRounded );
	    			}
	
	    			for ( PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry entry : psmOpenModificationMassesList ) {
	    				
	    				Long psmId = entry.getPsmId();
	    				Integer openModMass = (int) Math.round( entry.getOpenModificationMass() );

		    			Set<Long> openModPsmIdsSet = openModPsmIdsSet_KeyInnerOpenModMassRounded.get( openModMass );
		    			if ( openModPsmIdsSet == null ) {
		    				openModPsmIdsSet = new HashSet<>();
		    				openModPsmIdsSet_KeyInnerOpenModMassRounded.put( openModMass, openModPsmIdsSet );
		    			}
		    			openModPsmIdsSet.add( psmId );
	    			}
    			}
    		}

    		//  Get Reported Peptide Level Variable/Dynamic Mods for filtering Protein Coverage
    		DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result searcherResult = 
    				modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher
    				.getDynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIds( searchId, reportedPeptideIds_InitialSelection_List );
    		Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> dynamicMods_results_Key_ReportedPeptideId =
    				searcherResult.getResults_Key_ReportedPeptideId();

    		
    		//  Filter reportedPeptideIds_InitialSelection_List to only with variable/dynamic or open mods

    		List<Integer> reportedPeptideIds_GetCoverageRecords_List = new ArrayList<>( reportedPeptideIds_InitialSelection_List.size() );
    		
    		for ( Integer reportedPeptideId : reportedPeptideIds_InitialSelection_List ) {
    			if ( dynamicMods_results_Key_ReportedPeptideId.containsKey( reportedPeptideId )
    					|| openModPsmIdsSet_KeyInnerOpenModMassRounded_KeyOuterReportedPeptideId.containsKey( reportedPeptideId ) ) {

    				// reportedPeptideId has variable/dynamic or open mods
    				reportedPeptideIds_GetCoverageRecords_List.add( reportedPeptideId );
    			}
    		}
    		
    		//  Get Protein Coverage for Reported Peptide Ids that have Variable/Dynamic or Open Mods
    		
    		ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result proteinCoverage_searcherResult = 
    				proteinCoverageForSearchIdReportedPeptideIdsSearcher
    				.getProteinCoverageForSearchIdReportedPeptideIds( searchId, reportedPeptideIds_GetCoverageRecords_List );
    		Map<Integer,List<ProteinCoverageForSearchIdReportedPeptideIdSearcher_Item>> proteinCoverage_results_Key_ReportedPeptideId =
    				proteinCoverage_searcherResult.getResults_Key_ReportedPeptideId();

    		//  First put into Set of positions to ensure no duplicates
        	/**
        	 * Map<ReportedPeptideId,Map<ProteinSequenceVersionId,Set<ProteinPosition>>>
        	 */
    		Map<Integer,Map<Integer,Set<Integer>>> proteinCoverageSet_KeyInnerProteinSequenceVersionId_KeyOuterReportedPeptideId = new HashMap<>();

    		for ( Map.Entry<Integer,List<ProteinCoverageForSearchIdReportedPeptideIdSearcher_Item>> entry : proteinCoverage_results_Key_ReportedPeptideId.entrySet() ) {

    			Integer reportedPeptideId = entry.getKey();
    			List<ProteinCoverageForSearchIdReportedPeptideIdSearcher_Item> dbItemList = entry.getValue();
    			
    			for ( ProteinCoverageForSearchIdReportedPeptideIdSearcher_Item dbItem : dbItemList ) {
    				
    				Integer proteinSequenceVersionId = dbItem.getProteinSequenceVersionId();
    				
    				Map<Integer,Set<Integer>> proteinCoverageSet_KeyInnerProteinSequenceVersionId =  
    						proteinCoverageSet_KeyInnerProteinSequenceVersionId_KeyOuterReportedPeptideId.get( reportedPeptideId );
    				if ( proteinCoverageSet_KeyInnerProteinSequenceVersionId == null ) {
    					proteinCoverageSet_KeyInnerProteinSequenceVersionId = new HashMap<>();
    					proteinCoverageSet_KeyInnerProteinSequenceVersionId_KeyOuterReportedPeptideId.put( reportedPeptideId, proteinCoverageSet_KeyInnerProteinSequenceVersionId );
    				}
    				Set<Integer> proteinCoverageSet_ProteinPositions = proteinCoverageSet_KeyInnerProteinSequenceVersionId.get( proteinSequenceVersionId );
    				if ( proteinCoverageSet_ProteinPositions == null ) {
    					proteinCoverageSet_ProteinPositions = new HashSet<>();
    					proteinCoverageSet_KeyInnerProteinSequenceVersionId.put( proteinSequenceVersionId, proteinCoverageSet_ProteinPositions );
    				}
    				proteinCoverageSet_ProteinPositions.add( dbItem.getProteinStartPosition() );
    			}
    		}

        	/**
        	 * Map<ReportedPeptideId,Map<ProteinSequenceVersionId,List<ProteinPosition>>>
        	 */
    		Map<Integer,Map<Integer,List<Integer>>> proteinCoverage_OnlyContainsMods_KeyInnerProteinSequenceVersionId_KeyOuterReportedPeptideId = new HashMap<>();
    		
    		//  Transfer to output structure
    		for ( Map.Entry<Integer,Map<Integer,Set<Integer>>> entryPerReportedPeptideId : proteinCoverageSet_KeyInnerProteinSequenceVersionId_KeyOuterReportedPeptideId.entrySet() ) {
    			Integer reportedPeptideId = entryPerReportedPeptideId.getKey();
    			Map<Integer,List<Integer>> resultPerReportedPeptideId = new HashMap<>();
    			proteinCoverage_OnlyContainsMods_KeyInnerProteinSequenceVersionId_KeyOuterReportedPeptideId.put( reportedPeptideId, resultPerReportedPeptideId );
    		
    			for ( Map.Entry<Integer,Set<Integer>> entryPerProteinSequenceVersionId : entryPerReportedPeptideId.getValue().entrySet() ) {
    					
    				Integer proteinSequenceVersionId = entryPerProteinSequenceVersionId.getKey();
    				Set<Integer> proteinCoverageSet_ProteinPositions = entryPerProteinSequenceVersionId.getValue();
    				
    				List<Integer> proteinCoverageList_ProteinPositions = new ArrayList<>( proteinCoverageSet_ProteinPositions );
    				Collections.sort( proteinCoverageList_ProteinPositions );
    				
    				resultPerReportedPeptideId.put(proteinSequenceVersionId, proteinCoverageList_ProteinPositions);
    			}	
    		}

    			
    		WebserviceResult result = new WebserviceResult();
    		result.proteinCoverage_OnlyContainsMods_KeyInnerProteinSequenceVersionId_KeyOuterReportedPeptideId = proteinCoverage_OnlyContainsMods_KeyInnerProteinSequenceVersionId_KeyOuterReportedPeptideId;
    		result.openModPsmIdsSet_KeyInnerOpenModMassRounded_KeyOuterReportedPeptideId = openModPsmIdsSet_KeyInnerOpenModMassRounded_KeyOuterReportedPeptideId;
    		
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( result );
    		
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
     * 
     *
     */
    public static class WebserviceResult {
    	
    	/**
    	 * Map<ReportedPeptideId,Map<ProteinSequenceVersionId,List<ProteinPosition>>>
    	 */
    	Map<Integer,Map<Integer,List<Integer>>> proteinCoverage_OnlyContainsMods_KeyInnerProteinSequenceVersionId_KeyOuterReportedPeptideId;
		/**
    	 * Map<ReportedPeptideId,Map<Open Mod Mass rounded,Set<PSM ID>>>
    	 */
		Map<Integer,Map<Integer,Set<Long>>> openModPsmIdsSet_KeyInnerOpenModMassRounded_KeyOuterReportedPeptideId;

		public Map<Integer, Map<Integer, List<Integer>>> getProteinCoverage_OnlyContainsMods_KeyInnerProteinSequenceVersionId_KeyOuterReportedPeptideId() {
			return proteinCoverage_OnlyContainsMods_KeyInnerProteinSequenceVersionId_KeyOuterReportedPeptideId;
		}

		public Map<Integer, Map<Integer, Set<Long>>> getOpenModPsmIdsSet_KeyInnerOpenModMassRounded_KeyOuterReportedPeptideId() {
			return openModPsmIdsSet_KeyInnerOpenModMassRounded_KeyOuterReportedPeptideId;
		}


    }
}


