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
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.main.Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects;
import org.yeastrc.limelight.db_populate_new_fields__common_code.populate_table_protein_converage_tbl_new_fields_protein_pre_post_residue.main.Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects.Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_RequestItem;
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
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinCoverageForSearchIdReportedPeptideIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinCoverageForSearchIdReportedPeptideIdsSearcher.ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinCoverageForSearchIdReportedPeptideIdsSearcher.ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.Gzip_ByteArray_To_ByteArray_IF;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * 
 * !!!  WARNING:  Webservice Response is CACHED  !!!!
 * 
 * !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
 * 
 *  !!  WARNING::  Comment out fields 'protein_pre_residue', 'protein_post_residue', 'peptide_at_protein_start_flag', 'peptide_at_protein_end_flag'
 * 					Until update the Webservice to return new format and update Javascript and Page in general to display the new data.
 * 
 * 
 * Retrieve Protein Coverage Per Reported Peptide Id for Reported Peptide Ids, Project Search ID
 * 
 * 
 * Uses SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId to filter on Protein Filters if populated
 *
 */
@RestController
public class ProteinCoverage_PerReportedPeptide_For_ReportedPeptideIds_Single_ProjSearchID_RestWebserviceController 

implements
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
	private static final Logger log = LoggerFactory.getLogger( ProteinCoverage_PerReportedPeptide_For_ReportedPeptideIds_Single_ProjSearchID_RestWebserviceController.class );

	/**
	 * Path for this Controller.  !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
	 */
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.PROTEIN_COVERAGE_PER_REPORTED_PEPTIDE_ID_FOR_REP_PEPT_IDS_SINGLE_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER_VERSION_0003;
	
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
	private SearcherCutoffValues_Factory searcherCutoffValuesRootLevel_Factory;
	
	@Autowired
	private ProteinCoverageForSearchIdReportedPeptideIdsSearcherIF proteinCoverageForSearchIdReportedPeptideIdsSearcher;
	
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public ProteinCoverage_PerReportedPeptide_For_ReportedPeptideIds_Single_ProjSearchID_RestWebserviceController() {
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
    			log.warn( "No Project Search Id" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
			if ( webserviceRequest.reportedPeptideIds == null ) {
				String msg = "ReportedPeptideIds == null: " + projectSearchId;
				log.warn( msg );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( webserviceRequest.searchDataLookupParams_For_Single_ProjectSearchId == null ) {
				String msg = "webserviceRequest.searchDataLookupParams_For_Single_ProjectSearchId == null: " + projectSearchId;
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
			
    		Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
    		projectSearchIdMapToSearchId.put( projectSearchId, searchId );

   			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel =
    				searcherCutoffValuesRootLevel_Factory
    				.createSearcherCutoffValuesSearchLevel( projectSearchIdMapToSearchId, webserviceRequest.searchDataLookupParams_For_Single_ProjectSearchId );


    		List<ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result_Item> dbItemList = null;
    		
    		{
    			{
    				ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result searcherResult = 
    						proteinCoverageForSearchIdReportedPeptideIdsSearcher
    						.getProteinCoverageForSearchIdReportedPeptideIds( searchId, webserviceRequest.reportedPeptideIds, searcherCutoffValuesSearchLevel );
    				dbItemList = searcherResult.getResults();
    			}
    			
    			List<Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_RequestItem> populateDB_RequestItemList = new ArrayList<>( dbItemList.size() );
    			
    			for ( ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result_Item dbItem : dbItemList ) {
    				if ( dbItem.getProtein_PreResidue() == null || dbItem.getProtein_PostResidue() == null
    						|| dbItem.getPeptideAtProteinStart_Flag() == null || dbItem.getPeptideAtProteinEnd_Flag() == null ) {
    					
    					Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_RequestItem populateDB_RequestItem = new Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_RequestItem();
    					populateDB_RequestItem.setProtein_coverage_tbl__id( dbItem.getProtein_coverage_tbl__id() );
    					populateDB_RequestItem.setProteinSequenceVersionId( dbItem.getProteinSequenceVersionId() );
    					populateDB_RequestItem.setProteinStartPosition( dbItem.getProteinStartPosition() );
    					populateDB_RequestItem.setProteinEndPosition( dbItem.getProteinEndPosition() );
    					populateDB_RequestItemList.add( populateDB_RequestItem );
    				}
    			}
    			
    			if ( ! populateDB_RequestItemList.isEmpty() ) {
    				
    				//  Update the DB with the Pre and Post Protein Residue
    				
    				dbItemList = null;  // Clear prev values since will populate next
    				
    				Limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects
    				.getSingletonInstance()
    				.limelight_DatabasePopulateNewFields__Table_ProteinCoverageTbl_NewFields_ProteinPrePostResidue_FROM_PerRecordObjects_MAIN(
    						populateDB_RequestItemList
    						);
    				
    				
    				//  Re-query the data
    				ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result searcherResult = 
        					proteinCoverageForSearchIdReportedPeptideIdsSearcher
        					.getProteinCoverageForSearchIdReportedPeptideIds( searchId, webserviceRequest.reportedPeptideIds, searcherCutoffValuesSearchLevel );
        			dbItemList = searcherResult.getResults();
        			
        			//  Validate ALL Pre and Post residue populated
        			
        			
        			for ( ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result_Item dbItem : dbItemList ) {
        				if ( dbItem.getProtein_PreResidue() == null || dbItem.getProtein_PostResidue() == null
        						|| dbItem.getPeptideAtProteinStart_Flag() == null || dbItem.getPeptideAtProteinEnd_Flag() == null ) {
        				
        					String msg = "Populate DB ProteinCoverageTbl FOR NewFields ProteinPrePostResidue FAILED to populate for all records.  id: " + dbItem.getProtein_coverage_tbl__id();
        					log.error(msg);
        					throw new LimelightInternalErrorException(msg);
        				}
        			}
    			}
    		}
    		
    	 	
    		int[] protein_coverage_tbl__id_Array = new int[ dbItemList.size() ]; // protein_coverage_tbl.id
    		int[] reportedPeptideId_Array = new int[ dbItemList.size() ];
    		int[] proteinSequenceVersionId_Array = new int[ dbItemList.size() ];
    		int[] proteinStartPosition_Array = new int[ dbItemList.size() ];
    		int[] proteinEndPosition_Array = new int[ dbItemList.size() ];
    		boolean[] proteinIsIndependentDecoy_Array = new boolean[ dbItemList.size() ];
    		
    		String[] protein_PreResidue_Array = new String[ dbItemList.size() ];  //  protein residue before peptide or 'n' if peptide at start of protein.  null until computed
    		String[] protein_PostResidue_Array = new String[ dbItemList.size() ]; //  protein residue after peptide or 'c' if peptide at end of protein.  null until computed

    		boolean[] peptideAtProteinStart_Flag_Array = new boolean[ dbItemList.size() ];  //  peptide at start of protein.  null until computed
    		boolean[] peptideAtProteinEnd_Flag_Array = new boolean[ dbItemList.size() ];  //  peptide at end of protein.  null until computed
    		
    			//  Result from WS
    			
    		{
    			int index = 0;
	    		for ( ProteinCoverageForSearchIdReportedPeptideIdsSearcher_Result_Item dbItem : dbItemList ) {
	    			
	    			protein_coverage_tbl__id_Array[ index ] = dbItem.getProtein_coverage_tbl__id(); // protein_coverage_tbl.id
	        		reportedPeptideId_Array[ index ] = dbItem.getReportedPeptideId();
	        		proteinSequenceVersionId_Array[ index ] = dbItem.getProteinSequenceVersionId();
	        		proteinStartPosition_Array[ index ] = dbItem.getProteinStartPosition();
	        		proteinEndPosition_Array[ index ] = dbItem.getProteinEndPosition();
	        		proteinIsIndependentDecoy_Array[ index ] = dbItem.isProteinIsIndependentDecoy();
	        		
	        		protein_PreResidue_Array[ index ] = dbItem.getProtein_PreResidue();  //  protein residue before peptide or 'n' if peptide at start of protein.  null until computed
	        		protein_PostResidue_Array[ index ] = dbItem.getProtein_PostResidue(); //  protein residue after peptide or 'c' if peptide at end of protein.  null until computed

	        		//  Call .booleanValue() here since cannot be null since if null above after calling population code an Exception is thrown
	        		peptideAtProteinStart_Flag_Array[ index ] = dbItem.getPeptideAtProteinStart_Flag().booleanValue();  //  peptide at start of protein.  null until computed
	        		peptideAtProteinEnd_Flag_Array[ index ] = dbItem.getPeptideAtProteinEnd_Flag().booleanValue();  //  peptide at end of protein.  null until computed
	        		
	    			index++;
	    		}
    		}
    			
    		WebserviceResult result = new WebserviceResult();
    		result.protein_coverage_tbl__id_Array = protein_coverage_tbl__id_Array;
    		result.reportedPeptideId_Array = reportedPeptideId_Array;
    		result.proteinSequenceVersionId_Array = proteinSequenceVersionId_Array;
    		result.proteinStartPosition_Array = proteinStartPosition_Array;
    		result.proteinEndPosition_Array = proteinEndPosition_Array;
    		result.proteinIsIndependentDecoy_Array = proteinIsIndependentDecoy_Array;

    		result.protein_PreResidue_Array = protein_PreResidue_Array;  //  protein residue before peptide or 'n' if peptide at start of protein.  null until computed
    		result.protein_PostResidue_Array = protein_PostResidue_Array; //  protein residue after peptide or 'c' if peptide at end of protein.  null until computed

    		result.peptideAtProteinStart_Flag_Array = peptideAtProteinStart_Flag_Array;  //  peptide at start of protein.  null until computed
    		result.peptideAtProteinEnd_Flag_Array = peptideAtProteinEnd_Flag_Array;  //  peptide at end of protein.  null until computed
    		
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

    ///   !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
    
    /**
     * 
     *
     */
    public static class WebserviceRequest {
    	
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
    }

    ///   !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    	
		private int[] protein_coverage_tbl__id_Array; // protein_coverage_tbl.id
		private int[] reportedPeptideId_Array;
		private int[] proteinSequenceVersionId_Array;
		private int[] proteinStartPosition_Array;
		private int[] proteinEndPosition_Array;
		private boolean[] proteinIsIndependentDecoy_Array;
		
		private String[] protein_PreResidue_Array;  //  protein residue before peptide or 'n' if peptide at start of protein.  null until computed
		private String[] protein_PostResidue_Array; //  protein residue after peptide or 'c' if peptide at end of protein.  null until computed

		private boolean[] peptideAtProteinStart_Flag_Array;  //  peptide at start of protein.  null until computed
		private boolean[] peptideAtProteinEnd_Flag_Array;  //  peptide at end of protein.  null until computed
		
		public int[] getProtein_coverage_tbl__id_Array() {
			return protein_coverage_tbl__id_Array;
		}
		public int[] getReportedPeptideId_Array() {
			return reportedPeptideId_Array;
		}
		public int[] getProteinSequenceVersionId_Array() {
			return proteinSequenceVersionId_Array;
		}
		public int[] getProteinStartPosition_Array() {
			return proteinStartPosition_Array;
		}
		public int[] getProteinEndPosition_Array() {
			return proteinEndPosition_Array;
		}
		public boolean[] getProteinIsIndependentDecoy_Array() {
			return proteinIsIndependentDecoy_Array;
		}
		public String[] getProtein_PreResidue_Array() {
			return protein_PreResidue_Array;
		}
		public String[] getProtein_PostResidue_Array() {
			return protein_PostResidue_Array;
		}
		public boolean[] getPeptideAtProteinStart_Flag_Array() {
			return peptideAtProteinStart_Flag_Array;
		}
		public boolean[] getPeptideAtProteinEnd_Flag_Array() {
			return peptideAtProteinEnd_Flag_Array;
		}
		
    }
    
}


