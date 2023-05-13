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
import org.yeastrc.limelight.limelight_webapp.searchers.PeptideSequenceStringsForSearchIdReportedPeptideIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher.ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher.ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers_results.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PeptideSequenceStringsForSearchIdReportedPeptideId_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services.ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF;
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
 * 
 * 
 * Mod Page - !!!  Special Specific Web Service !!!
 * 
 * Retrieve Open and Variable Mod Position Data per psm
 * 
 * Input:  Project Search Id, Filter cutoffs, Rounded Mod Mass for Single Project Search Id
 * 
 * Output:
 * 
 * { resultRoot : {
        reported_peptide_id : {
            reportedPeptide : reported peptide string,
            sequence : sequence,
            proteinMatches : {
                protein_sequence_version_id : [position1, position2, ],
            },
            variable_mods : {
                mod_mass (int) : {
                    positions : [ pos1, pos2, pos3, ],
                    nterm : boolean,
                    cterm : boolean
               }
            }
        },
} 
 * }
 *   
 */
@RestController
public class ModPageSpecial_Proteins_VarMods_PeptideInfo_PerReptPeptide_FOR_Cutoffs_Single_ProjSearchID_RestWebserviceController 

implements
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
	private static final Logger log = LoggerFactory.getLogger( ModPageSpecial_Proteins_VarMods_PeptideInfo_PerReptPeptide_FOR_Cutoffs_Single_ProjSearchID_RestWebserviceController.class );

	/**
	 * Path for this Controller.  !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!
	 */
	private static final String CONTROLLER_PATH = AA_RestWSControllerPaths_Constants.MOD_PAGE_SPECIAL__PROTEIN_POSITIONS_VAR_MODS_FOR_REPORTED_PEPTIDES_SINGLE_PROJECT_SEARCH_ID__REST_WEBSERVICE_CONTROLLER_VERSION_0001;

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
	private ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service;

	@Autowired
	private ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_SearcherIF reportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Searcher;
	
	@Autowired
	private PeptideSequenceStringsForSearchIdReportedPeptideIdsSearcherIF peptideSequenceStringsForSearchIdReportedPeptideIdsSearcher;
	
	@Autowired
	private ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_IF proteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher;
	
	@Autowired
	private DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	/**
	 * Constructor
	 */
	public ModPageSpecial_Proteins_VarMods_PeptideInfo_PerReptPeptide_FOR_Cutoffs_Single_ProjSearchID_RestWebserviceController() {
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
				log.warn( "No Project Search Ids" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( webserviceRequest.searchDataLookupParams_For_Single_ProjectSearchId == null ) {
				String msg = "searchDataLookupParams_For_Single_ProjectSearchId == null: " + projectSearchId;
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
					.createSearcherCutoffValuesSearchLevel(
							projectSearchIdMapToSearchId, 
							webserviceRequest.searchDataLookupParams_For_Single_ProjectSearchId );

			final int minimumNumberOfPSMsPerReportedPeptide = 1; // standard minimum # PSMs 

			//  Get initial Reported Peptide Id list (maybe include Num PSMs) based on search criteria

			List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> peptideMinimalObjectsList = 
					reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.getPeptideDataList( searchId, searcherCutoffValuesSearchLevel, minimumNumberOfPSMsPerReportedPeptide );

			List<Integer> reportedPeptideIds = new ArrayList<>( peptideMinimalObjectsList.size() );
			for ( ReportedPeptide_MinimalData_List_FromSearcher_Entry peptideMinimalObject : peptideMinimalObjectsList ) {

				reportedPeptideIds.add( peptideMinimalObject.getReportedPeptideId() );
			}

			/////  Webservice RESULT
			Map<Integer, WebserviceResult_Per_ReportedPeptideId_MapValue> resultRoot_Key_ReportedPeptideId = new HashMap<>( peptideMinimalObjectsList.size() );
			
			{  //  Get Reported Peptide Strings
				
				Set<Integer> searchIds = new HashSet<>( 2 );
				searchIds.add( searchId );

	    		List<ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Item> searcherResultList = 
	    				reportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Searcher
	    				.getReportedPeptideStrings_For_ReportedPeptideIds_SearchIds( reportedPeptideIds, searchIds );
				
//	    		Map<Integer, WebserviceResultPer_ReportedPeptideId> reportedPeptideStringResult = new HashMap<>();

	    		//  Validate all ReportedPeptideId found in DB
	    		Set<Integer> reportedPeptideIdsRequestedAsSet = new HashSet<>( reportedPeptideIds );
	    		
	    		for ( ReportedPeptideStrings_For_ReportedPeptideIds_SearchIds_Item searcherResultItem : searcherResultList ) {

	    			Integer reportedPeptideId = searcherResultItem.getReportedPeptideId();
	    			
					WebserviceResult_Per_ReportedPeptideId_MapValue resultRootMapValue = resultRoot_Key_ReportedPeptideId.get( reportedPeptideId );
					if ( resultRootMapValue == null ) {
						resultRootMapValue = new WebserviceResult_Per_ReportedPeptideId_MapValue();
						resultRoot_Key_ReportedPeptideId.put( reportedPeptideId, resultRootMapValue );
					}
					
					resultRootMapValue.reportedPeptide = searcherResultItem.getReportedPeptideString();
					
	        		//  Validate all ReportedPeptideId found in DB
	    			reportedPeptideIdsRequestedAsSet.remove( reportedPeptideId );
	    		}

	    		//  Validate all ReportedPeptideId found in DB
//	    		boolean foundAllReportedPeptideIdsForProjectSearchId = true;
	    		if ( ! reportedPeptideIdsRequestedAsSet.isEmpty() ) {
//	    			foundAllReportedPeptideIdsForProjectSearchId = false;
	    			String msg = "For projectSearchId: " + projectSearchId
	    					+ ", Failed to get Reported Peptide Strings.  reportedPeptideIds Not Found: " + reportedPeptideIdsRequestedAsSet;
	    			log.warn( msg );
	    		}
			}
			
			{  //  Get Peptide Strings
	    		List<PeptideSequenceStringsForSearchIdReportedPeptideId_Item> searcherResultList = 
	    				peptideSequenceStringsForSearchIdReportedPeptideIdsSearcher
	    				.getPeptideSequenceStringsForSearchIdReportedPeptideIds( searchId, reportedPeptideIds );

	    		//  Validate all ReportedPeptideId found in DB
	    		Set<Integer> reportedPeptideIdsRequestedAsSet = new HashSet<>( reportedPeptideIds );
	    		
	    		for ( PeptideSequenceStringsForSearchIdReportedPeptideId_Item dbItem : searcherResultList ) {
	    			
	    			Integer reportedPeptideId = dbItem.getReportedPeptideId();
	    			
					WebserviceResult_Per_ReportedPeptideId_MapValue resultRootMapValue = resultRoot_Key_ReportedPeptideId.get( reportedPeptideId );
					if ( resultRootMapValue == null ) {
						resultRootMapValue = new WebserviceResult_Per_ReportedPeptideId_MapValue();
						resultRoot_Key_ReportedPeptideId.put( reportedPeptideId, resultRootMapValue );
					}
					
					resultRootMapValue.sequence = dbItem.getPeptideSequence();
					
	        		//  Validate all ReportedPeptideId found in DB
	    			reportedPeptideIdsRequestedAsSet.remove( dbItem.getReportedPeptideId() );
	    		}

	    		//  Validate all ReportedPeptideId found in DB
//	    		boolean foundAllReportedPeptideIdsForProjectSearchId = true;
	    		if ( ! reportedPeptideIdsRequestedAsSet.isEmpty() ) {
//	    			foundAllReportedPeptideIdsForProjectSearchId = false;
	    			String msg = "For projectSearchId: " + projectSearchId
	    					+ ", Failed to get Peptide Strings.  reportedPeptideIds Not Found: " + reportedPeptideIdsRequestedAsSet;
	    			log.warn( msg );
	    		}
			}

			{  // Process Protein Coverage

				ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result searcherResult = 
	    				proteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher
	    				.getProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIds( searchId, reportedPeptideIds );
	    		List<ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result_Item> dbItemList =
	    				searcherResult.getResults();
    		
    			for ( ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result_Item dbItem : dbItemList ) {
    				
    				Integer reportedPeptideId = dbItem.getReportedPeptideId();
    				Integer proteinSequenceVersionId = dbItem.getProteinSequenceVersionId();

					WebserviceResult_Per_ReportedPeptideId_MapValue resultRootMapValue = resultRoot_Key_ReportedPeptideId.get( reportedPeptideId );
					if ( resultRootMapValue == null ) {
						resultRootMapValue = new WebserviceResult_Per_ReportedPeptideId_MapValue();
						resultRoot_Key_ReportedPeptideId.put( reportedPeptideId, resultRootMapValue );
						resultRootMapValue.proteinMatches = new HashMap<>();
					}
					if ( resultRootMapValue.proteinMatches == null ) {
						resultRootMapValue.proteinMatches = new HashMap<>();
					}
					
					Set<Integer> positions = resultRootMapValue.proteinMatches.get( proteinSequenceVersionId );
					if ( positions == null ) {
						positions = new HashSet<>();
						resultRootMapValue.proteinMatches.put( proteinSequenceVersionId, positions );
					}
					positions.add( dbItem.getProteinStartPosition() );
    			}
			}

			{  // Process Variable/Dynamic Mods
				DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result searcherResult = 
						modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher
						.getDynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIds( searchId, reportedPeptideIds );
				Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> results_Key_ReportedPeptideId =
						searcherResult.getResults_Key_ReportedPeptideId();


				for ( Map.Entry<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> entry : results_Key_ReportedPeptideId.entrySet() ) {

					Integer reportedPeptideId = entry.getKey();
					List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item> dbItemList = entry.getValue();

					WebserviceResult_Per_ReportedPeptideId_MapValue resultRootMapValue = resultRoot_Key_ReportedPeptideId.get( reportedPeptideId );
					if ( resultRootMapValue == null ) {
						resultRootMapValue = new WebserviceResult_Per_ReportedPeptideId_MapValue();
						resultRoot_Key_ReportedPeptideId.put( reportedPeptideId, resultRootMapValue );
					}
					if ( resultRootMapValue.variable_mods == null ) {
						resultRootMapValue.variable_mods = new HashMap<>();
					}
					
					for ( DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item dbItem : dbItemList ) {
						
						long massLong = Math.round( dbItem.getMass() );
						if ( massLong > Integer.MAX_VALUE ) {
							String msg = "Variable Mod Mass when rounded is > Integer.MAX_VALUE: " 
									+ dbItem.getMass() + ", reportedPeptideId: " + reportedPeptideId
									+ ", projectSearchId: " + projectSearchId;
							log.error( msg );
							throw new LimelightInternalErrorException( msg );
						}
						Integer massInt = (int) massLong;
						
						WebserviceResultItem_Variable_ModItem varModEntry = resultRootMapValue.variable_mods.get( massInt );
						if ( varModEntry == null ) {
							varModEntry = new WebserviceResultItem_Variable_ModItem();
							resultRootMapValue.variable_mods.put( massInt, varModEntry );
						}
						if ( dbItem.isIs_N_Terminal() ) {
							varModEntry.nterm = true;
						} else if ( dbItem.isIs_C_Terminal() ) {
							varModEntry.cterm = true;
						} else {
							varModEntry.positions.add( dbItem.getPosition() );
						}
					}
				}
			}

			WebserviceResult result = new WebserviceResult();
			result.resultRoot_Key_ReportedPeptideId = resultRoot_Key_ReportedPeptideId;

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
	 * Web Service Request
	 *
	 */
	public static class WebserviceRequest {

		private SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId;
		private Integer projectSearchId;

		public void setSearchDataLookupParams_For_Single_ProjectSearchId(
				SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId) {
			this.searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchId;
		}
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
	}


	////////////////////////

	//  Web Service Request and Response Classes
	
	//  !!!  WARNING:  Update VERSION NUMBER in URL (And JS code that calls it) WHEN Change Webservice Request or Response  (Format or Contents) !!!!!!!!

	/**
	 * 
	 *
	 */
	public static class WebserviceResult {

		/**
		 *   
		 */
		Map<Integer, WebserviceResult_Per_ReportedPeptideId_MapValue> resultRoot_Key_ReportedPeptideId;

		public Map<Integer, WebserviceResult_Per_ReportedPeptideId_MapValue> getResultRoot_Key_ReportedPeptideId() {
			return resultRoot_Key_ReportedPeptideId;
		}
	}

	/**
	 * 
	 *
	 */
	public static class WebserviceResult_Per_ReportedPeptideId_MapValue {

		private String reportedPeptide;
		private String sequence;

		/**
		 * Map<protein_sequence_version_id, Set<Peptide Start Position in Protein>>
		 */
		private Map<Integer, Set<Integer>> proteinMatches;

		/**
		 * Map<Mod Mass (rounded to int), WebserviceResultItem_Variable_ModItem>
		 */
		private Map<Integer, WebserviceResultItem_Variable_ModItem> variable_mods;

		public String getReportedPeptide() {
			return reportedPeptide;
		}
		public String getSequence() {
			return sequence;
		}
		public Map<Integer, Set<Integer>> getProteinMatches() {
			return proteinMatches;
		}
		public Map<Integer, WebserviceResultItem_Variable_ModItem> getVariable_mods() {
			return variable_mods;
		}
	}

	/**
	 * 
	 *
	 */
	public static class WebserviceResultItem_Variable_ModItem {

		Set<Integer> positions = new HashSet<>();
		boolean nterm;
		boolean cterm;

		public boolean isNterm() {
			return nterm;
		}
		public boolean isCterm() {
			return cterm;
		}
		public Set<Integer> getPositions() {
			return positions;
		}
	}

}


