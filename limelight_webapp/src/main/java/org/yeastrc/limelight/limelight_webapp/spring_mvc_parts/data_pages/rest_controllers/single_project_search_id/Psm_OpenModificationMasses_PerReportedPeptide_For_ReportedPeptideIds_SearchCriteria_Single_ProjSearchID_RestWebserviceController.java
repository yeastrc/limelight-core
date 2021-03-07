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
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPositionDTO;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_Utils;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightDatabaseException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValues_Factory;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModificationPosition_SetOf_PsmOpenModificationIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmSearchSubGroupIdsForPsmIdsSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher.PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmSearchSubGroupIdsForPsmIdsSearcher.PsmSearchSubGroupIdsForPsmIdsSearcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * 
 * !!!  WARNING:  Webservice Response is CACHED  !!!!
 * 
 * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
 * 
 * 
 * 
 * Retrieve PSM Open Modification Masses Per Reported Peptide Id for Reported Peptide Ids, Project Search ID, and Search Criteria
 *
 */
@RestController
public class Psm_OpenModificationMasses_PerReportedPeptide_For_ReportedPeptideIds_SearchCriteria_Single_ProjSearchID_RestWebserviceController 

implements
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
  
	private static final Logger log = LoggerFactory.getLogger( Psm_OpenModificationMasses_PerReportedPeptide_For_ReportedPeptideIds_SearchCriteria_Single_ProjSearchID_RestWebserviceController.class );

	/**
	 * Path for this Controller.  !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
	 */
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.PSM_OPEN_MODIFICATION_MASSES_PER_REPORTED_PEPTIDE_ID_FOR_REP_PEPT_IDS_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0001;
	
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
	private SearcherCutoffValues_Factory searcherCutoffValuesRootLevel_Factory;

	@Autowired
	private PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_IF psmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher;
	
	@Autowired
	private PsmSearchSubGroupIdsForPsmIdsSearcher_IF psmSearchSubGroupIdsForPsmIdsSearcher;
		
	@Autowired
	private PsmOpenModificationPosition_SetOf_PsmOpenModificationIds_Searcher_IF psmOpenModificationPosition_SetOf_PsmOpenModificationIds_Searcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Psm_OpenModificationMasses_PerReportedPeptide_For_ReportedPeptideIds_SearchCriteria_Single_ProjSearchID_RestWebserviceController() {
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
			if ( webserviceRequest.reportedPeptideIds == null || webserviceRequest.reportedPeptideIds.isEmpty() ) {
				String msg = "No ReportedPeptideIds or is empty: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( webserviceRequest.searchDataLookupParams_For_Single_ProjectSearchId == null ) {
				String msg = "No Search Criteria: " + projectSearchId;
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
			
    		Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
    		projectSearchIdMapToSearchId.put( projectSearchId, searchId );

    		SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel =
    				searcherCutoffValuesRootLevel_Factory
    				.createSearcherCutoffValuesSearchLevel(
    						projectSearchIdMapToSearchId, 
    						webserviceRequest.searchDataLookupParams_For_Single_ProjectSearchId );
    		
    		List<WebserviceResult_Per_ReportedPeptideId_Entry> reportedPeptideId_psmOpenModificationMassesList_List = new ArrayList<>( webserviceRequest.reportedPeptideIds.size() );

    		for ( Integer reportedPeptideId : webserviceRequest.reportedPeptideIds ) {

    			List<PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry>  psmOpenModificationMassesList = 
    					psmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher
    					.getPsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );
    			
    			Map<Long, Integer> searchSubGroupIdMap_Key_PsmId = new HashMap<>( psmOpenModificationMassesList.size() );
    			
    			if ( webserviceRequest.getSearchSubGroupIds != null && webserviceRequest.getSearchSubGroupIds.booleanValue() ){
    				List<Long> psmIds = new ArrayList<>( psmOpenModificationMassesList.size() );
    				for ( PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry resultEntry :  psmOpenModificationMassesList ) {
    					psmIds.add( resultEntry.getPsmId() );
    				}
    				List<PsmSearchSubGroupIdsForPsmIdsSearcher_ResultItem> psmSearchSubGroupIdsForPsmIdsSearcher_ResultItemList = 
    						psmSearchSubGroupIdsForPsmIdsSearcher.getPsmSearchSubGroupIdsForPsmIds( psmIds );
    				for ( PsmSearchSubGroupIdsForPsmIdsSearcher_ResultItem item : psmSearchSubGroupIdsForPsmIdsSearcher_ResultItemList ) {
    					searchSubGroupIdMap_Key_PsmId.put( item.getPsmId(), item.getSearchSubGroupId() );
    				}
    			}

    			//  Store results per PsmId and per psm_open_modification_id
    			Map<Long, InternalHolder__Per_PsmId_psm_open_modification_id_Entry> internalHolder_EntryMap_Key_PsmId = new HashMap<>();
    			Map<Long, InternalHolder__Per_PsmId_psm_open_modification_id_Entry> internalHolder_EntryMap_Key_psm_open_modification_id = new HashMap<>();

    			for ( PsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry resultEntry :  psmOpenModificationMassesList ) {
    				Long psmId = resultEntry.getPsmId();
    				Long psmOpenModificationId = resultEntry.getPsmOpenModificationId();
    				if ( internalHolder_EntryMap_Key_PsmId.containsKey( psmId ) ) {
    					String msg = "Found more than one entry with same PSM Id from psmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher: PSM ID: " + psmId;
    					log.error( msg );
    					throw new LimelightInternalErrorException(msg);
    				}
    				if ( internalHolder_EntryMap_Key_psm_open_modification_id.containsKey( psmOpenModificationId ) ) {
    					String msg = "Found more than one entry with same psmOpenModificationId psmOpenModificationMassesForSearchIdReportedPeptideIdCutoffsSearcher: psmOpenModificationId: " + psmOpenModificationId;
    					log.error( msg );
    					throw new LimelightInternalErrorException(msg);
    				}
    				
    				WebserviceResult_Per_PsmId_OpenModMass_Entry webserviceResult_Per_PsmId_OpenModMass_Entry = new WebserviceResult_Per_PsmId_OpenModMass_Entry();
    				webserviceResult_Per_PsmId_OpenModMass_Entry.psmId = psmId;
    				webserviceResult_Per_PsmId_OpenModMass_Entry.openModificationMass = resultEntry.getOpenModificationMass();
    				
        			if ( webserviceRequest.getSearchSubGroupIds != null && webserviceRequest.getSearchSubGroupIds.booleanValue() ){
        				Integer searchSubGroupId = searchSubGroupIdMap_Key_PsmId.get( psmId );
        				if ( searchSubGroupId == null ) {
        					String msg = "No searchSubGroupId found for psmId: " + psmId + ", psmOpenModificationId: " + psmOpenModificationId;
        					log.error( msg );
        					throw new LimelightDatabaseException(msg);
        				}
        				webserviceResult_Per_PsmId_OpenModMass_Entry.searchSubGroupId = searchSubGroupId;
        			}
    				
    				InternalHolder__Per_PsmId_psm_open_modification_id_Entry internalHolder = new InternalHolder__Per_PsmId_psm_open_modification_id_Entry();
    				internalHolder.psmId = psmId;
    				internalHolder.psm_open_modification_id = psmOpenModificationId;
    				internalHolder.webserviceResult_Per_PsmId_OpenModMass_Entry = webserviceResult_Per_PsmId_OpenModMass_Entry;
    				
    				internalHolder_EntryMap_Key_PsmId.put(psmId, internalHolder);
    				internalHolder_EntryMap_Key_psm_open_modification_id.put(psmOpenModificationId, internalHolder);
    			}
    			//  Get Open Mod Mass Positions (Not all entries will have positions.)
    			{
    				Set<Long> psmOpenModificationIds = internalHolder_EntryMap_Key_psm_open_modification_id.keySet();

    				List<PsmOpenModificationPositionDTO> resultList = 
    						psmOpenModificationPosition_SetOf_PsmOpenModificationIds_Searcher.getPsmOpenModificationPosition( psmOpenModificationIds );
    				
    				for ( PsmOpenModificationPositionDTO result : resultList ) {
    					
    					InternalHolder__Per_PsmId_psm_open_modification_id_Entry internalHolder = internalHolder_EntryMap_Key_psm_open_modification_id.get( result.getPsmOpenModificationId() );
    					if ( internalHolder == null ) {
    						String msg = "No entry in internalHolder_EntryMap_Key_psm_open_modification_id for psmOpenModificationId: " + result.getPsmOpenModificationId();
        					log.error( msg );
        					throw new LimelightInternalErrorException(msg);
    					}
    					
    					if ( internalHolder.webserviceResult_Per_PsmId_OpenModMass_Entry.psmOpenModificationMassPositionsList == null ) {
    						internalHolder.webserviceResult_Per_PsmId_OpenModMass_Entry.psmOpenModificationMassPositionsList = new ArrayList<>();
    					}
    					WebserviceResult_OpenModMass_Position_Entry positionEntry = new WebserviceResult_OpenModMass_Position_Entry();
    					positionEntry.openModificationPosition = result.getPosition();
    					positionEntry.is_N_Terminal = result.isIs_N_Terminal();
    					positionEntry.is_C_Terminal = result.isIs_C_Terminal();
    					internalHolder.webserviceResult_Per_PsmId_OpenModMass_Entry.psmOpenModificationMassPositionsList.add( positionEntry );
    				}
    			}
    			
				//  Transfer internal Map to Webservice Results
				
    			List<WebserviceResult_Per_PsmId_OpenModMass_Entry>  psmId_OpenModMass_EntriesList = new ArrayList<>( internalHolder_EntryMap_Key_PsmId.size() );

				for ( Map.Entry<Long, InternalHolder__Per_PsmId_psm_open_modification_id_Entry> mapEntry : internalHolder_EntryMap_Key_PsmId.entrySet() ) {
					
					psmId_OpenModMass_EntriesList.add( mapEntry.getValue().webserviceResult_Per_PsmId_OpenModMass_Entry );
				}
    	    	
    			WebserviceResult_Per_ReportedPeptideId_Entry entry = new WebserviceResult_Per_ReportedPeptideId_Entry();
    			entry.reportedPeptideId = reportedPeptideId;
    			entry.psmId_OpenModMass_EntriesList = psmId_OpenModMass_EntriesList;
    			reportedPeptideId_psmOpenModificationMassesList_List.add( entry );
    		}
    		
    		WebserviceResult result = new WebserviceResult();
    		result.reportedPeptideId_psmOpenModificationMassesList_List = reportedPeptideId_psmOpenModificationMassesList_List;
    		
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
     * 
     */
    private static class InternalHolder__Per_PsmId_psm_open_modification_id_Entry {
    	
		@SuppressWarnings("unused")
		long psmId;
		@SuppressWarnings("unused")
		long psm_open_modification_id;
		WebserviceResult_Per_PsmId_OpenModMass_Entry webserviceResult_Per_PsmId_OpenModMass_Entry;
    }
    
    /////////////
    
    /**
     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
     *
     */
    public static class WebserviceRequest {

    	private Boolean getSearchSubGroupIds;
    	private Integer projectSearchId;
    	private List<Integer> reportedPeptideIds;
    	private SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId;
    	
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public void setReportedPeptideIds(List<Integer> reportedPeptideIds) {
			this.reportedPeptideIds = reportedPeptideIds;
		}
		public void setSearchDataLookupParams_For_Single_ProjectSearchId(
				SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId) {
			this.searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchId;
		}
		public void setGetSearchSubGroupIds(Boolean getSearchSubGroupIds) {
			this.getSearchSubGroupIds = getSearchSubGroupIds;
		}
    }
    

    /**
     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
     *
     */
    public static class WebserviceResult {
    	
    	List<WebserviceResult_Per_ReportedPeptideId_Entry> reportedPeptideId_psmOpenModificationMassesList_List;

		public List<WebserviceResult_Per_ReportedPeptideId_Entry> getReportedPeptideId_psmOpenModificationMassesList_List() {
			return reportedPeptideId_psmOpenModificationMassesList_List;
		}

    }

    /**
     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
     *
     */
    public static class WebserviceResult_Per_ReportedPeptideId_Entry {
    	
    	int reportedPeptideId;
    	List<WebserviceResult_Per_PsmId_OpenModMass_Entry>  psmId_OpenModMass_EntriesList;
    	
		public int getReportedPeptideId() {
			return reportedPeptideId;
		}
		public List<WebserviceResult_Per_PsmId_OpenModMass_Entry> getPsmId_OpenModMass_EntriesList() {
			return psmId_OpenModMass_EntriesList;
		}
    }

    /**
     * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
     */
    public static class WebserviceResult_Per_PsmId_OpenModMass_Entry {
    	
		private long psmId;
		private double openModificationMass;
		private Integer searchSubGroupId;
    	List<WebserviceResult_OpenModMass_Position_Entry>  psmOpenModificationMassPositionsList;
    	
		public long getPsmId() {
			return psmId;
		}
		public double getOpenModificationMass() {
			return openModificationMass;
		}
		public List<WebserviceResult_OpenModMass_Position_Entry> getPsmOpenModificationMassPositionsList() {
			return psmOpenModificationMassPositionsList;
		}
		public Integer getSearchSubGroupId() {
			return searchSubGroupId;
		}
    }

	/**
	 * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
	 */
	public static class WebserviceResult_OpenModMass_Position_Entry {
		
		private int openModificationPosition;
		private boolean is_N_Terminal;
		private boolean is_C_Terminal;
		
		public int getOpenModificationPosition() {
			return openModificationPosition;
		}
		public boolean isIs_N_Terminal() {
			return is_N_Terminal;
		}
		public boolean isIs_C_Terminal() {
			return is_C_Terminal;
		}
	}
}


