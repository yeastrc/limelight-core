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


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightDatabaseException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValues_Factory;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmSearchSubGroupIdsForPsmIdsSearcher.PsmSearchSubGroupIdsForPsmIdsSearcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmSearchSubGroupIdsForPsmIdsSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher.PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Retrieve PSM Reporter Ion Masses Per Reported Peptide Id for Reported Peptide Ids, Project Search ID, and Search Criteria
 *
 */
@RestController
public class Psm_ReporterIonMasses_PerReportedPeptide_For_ReportedPeptideIds_SearchCriteria_Single_ProjSearchID_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Psm_ReporterIonMasses_PerReportedPeptide_For_ReportedPeptideIds_SearchCriteria_Single_ProjSearchID_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private SearcherCutoffValues_Factory searcherCutoffValuesRootLevel_Factory;

	@Autowired
	private PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcherIF psmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher;
	
	@Autowired
	private PsmSearchSubGroupIdsForPsmIdsSearcher_IF psmSearchSubGroupIdsForPsmIdsSearcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Psm_ReporterIonMasses_PerReportedPeptide_For_ReportedPeptideIds_SearchCriteria_Single_ProjSearchID_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.PSM_REPORTER_ION_MASSES_PER_REPORTED_PEPTIDE_ID_FOR_REP_PEPT_IDS_SEARCHCRITERIA_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER
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
    		
    		List<WebserviceResult_Entry> reportedPeptideId_psmReporterIonMassesList_List = new ArrayList<>( webserviceRequest.reportedPeptideIds.size() );

    		for ( Integer reportedPeptideId : webserviceRequest.reportedPeptideIds ) {

    			List<PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry>  psmReporterIonMassesList = 
    					psmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher
    					.getPsmReporterIonMassesForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );

    			Map<Long, Integer> searchSubGroupIdMap_Key_PsmId = new HashMap<>( psmReporterIonMassesList.size() );
    			
    			if ( webserviceRequest.getSearchSubGroupIds != null && webserviceRequest.getSearchSubGroupIds.booleanValue() ){
    				List<Long> psmIds = new ArrayList<>( psmReporterIonMassesList.size() );
    				for ( PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry resultEntry :  psmReporterIonMassesList ) {
    					psmIds.add( resultEntry.getPsmId() );
    				}
    				List<PsmSearchSubGroupIdsForPsmIdsSearcher_ResultItem> psmSearchSubGroupIdsForPsmIdsSearcher_ResultItemList = 
    						psmSearchSubGroupIdsForPsmIdsSearcher.getPsmSearchSubGroupIdsForPsmIds( psmIds );
    				for ( PsmSearchSubGroupIdsForPsmIdsSearcher_ResultItem item : psmSearchSubGroupIdsForPsmIdsSearcher_ResultItemList ) {
    					searchSubGroupIdMap_Key_PsmId.put( item.getPsmId(), item.getSearchSubGroupId() );
    				}
    			}
    			
    			List<WebserviceResult_Per_PsmId_Entry> perPsmIdList = new ArrayList<>( psmReporterIonMassesList.size() );
    			
    			for ( PsmReporterIonMassesForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry dbEntry : psmReporterIonMassesList ) {
    				Long psmId = dbEntry.getPsmId();
    				WebserviceResult_Per_PsmId_Entry resultEntry = new WebserviceResult_Per_PsmId_Entry();
    				resultEntry.psmId = dbEntry.getPsmId();
    				resultEntry.reporterIonMass = dbEntry.getReporterIonMass();

        			if ( webserviceRequest.getSearchSubGroupIds != null && webserviceRequest.getSearchSubGroupIds.booleanValue() ){
        				Integer searchSubGroupId = searchSubGroupIdMap_Key_PsmId.get( psmId );
        				if ( searchSubGroupId == null ) {
        					String msg = "No searchSubGroupId found for psmId: " + psmId + ", webserviceRequest: " + webserviceRequest;
        					log.error( msg );
        					throw new LimelightDatabaseException(msg);
        				}
        				resultEntry.searchSubGroupId = searchSubGroupId;
        			}
    				
        			perPsmIdList.add( resultEntry );
    			}

    			WebserviceResult_Entry entry = new WebserviceResult_Entry();
    			entry.reportedPeptideId = reportedPeptideId;
    			entry.psmReporterIonMassesList = perPsmIdList;
    			reportedPeptideId_psmReporterIonMassesList_List.add( entry );
    		}
    		
    		WebserviceResult result = new WebserviceResult();
    		result.reportedPeptideId_psmReporterIonMassesList_List = reportedPeptideId_psmReporterIonMassesList_List;
    		
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

    /**
     * 
     *
     */
    public static class WebserviceRequest {

    	private Boolean getSearchSubGroupIds;
    	private Integer projectSearchId;
    	private List<Integer> reportedPeptideIds;
    	private SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId;

		@Override
		public String toString() {
			return "WebserviceRequest [getSearchSubGroupIds=" + getSearchSubGroupIds + ", projectSearchId="
					+ projectSearchId + ", reportedPeptideIds=" + reportedPeptideIds
					+ ", searchDataLookupParams_For_Single_ProjectSearchId="
					+ searchDataLookupParams_For_Single_ProjectSearchId + "]";
		}
		
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
     * 
     *
     */
    public static class WebserviceResult {
    	
    	List<WebserviceResult_Entry> reportedPeptideId_psmReporterIonMassesList_List;

		public List<WebserviceResult_Entry> getReportedPeptideId_psmReporterIonMassesList_List() {
			return reportedPeptideId_psmReporterIonMassesList_List;
		}

    }

    /**
     * 
     *
     */
    public static class WebserviceResult_Entry {
    	
    	int reportedPeptideId;
    	List<WebserviceResult_Per_PsmId_Entry>  psmReporterIonMassesList;
    	
		public int getReportedPeptideId() {
			return reportedPeptideId;
		}
		public List<WebserviceResult_Per_PsmId_Entry> getPsmReporterIonMassesList() {
			return psmReporterIonMassesList;
		}
    }

    /**
     * 
     */
    public static class WebserviceResult_Per_PsmId_Entry {
    	
		private long psmId;
		private BigDecimal reporterIonMass;
		private Integer searchSubGroupId;
    	
		public long getPsmId() {
			return psmId;
		}
		public Integer getSearchSubGroupId() {
			return searchSubGroupId;
		}
		public BigDecimal getReporterIonMass() {
			return reporterIonMass;
		}
    }
    
}


