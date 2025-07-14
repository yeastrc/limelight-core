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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.multiple_project_search_id;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ScanFileDAO_IF;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.dto.PsmDynamicModificationDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;
import org.yeastrc.limelight.limelight_shared.dto.StaticModDTO;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesRootLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_ProjectSearchIds;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValues_Factory;
import org.yeastrc.limelight.limelight_webapp.searchers.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PeptideSequenceStringsForSearchIdReportedPeptideIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmDynamicModification_For_PsmIdList_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModification_Masses_Positions_For_PsmIds_Searcher.PsmOpenModification_Masses_Positions_For_PsmIds_Searcher_ResultEntry;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModification_Masses_Positions_For_PsmIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmWebDisplaySearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchScanFile_For_SearchIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.StaticModDTOForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PeptideSequenceStringsForSearchIdReportedPeptideId_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmWebDisplayWebServiceResult;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services.ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;


/**
 * Blib Spectral Library File Download - Request the creation of the file 
 *  
 * 
 */
@RestController
public class BlibSpectralLibrary_Download__Request_Creation_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( BlibSpectralLibrary_Download__Request_Creation_RestWebserviceController.class );

	private static final int MINIMUM_NUMBER_OF_PSMS_PER_REPORTED_PEPTIDE = 1; // TODO standard minimum # PSMs 


	private static final int SUCCESS_HTTP_RETURN_CODE = 200;
	private static final String CONTENT_TYPE_SEND_RECEIVE = "application/json";
	
	private static final String WEBSERVICE_PATH = "/requestNewBlibConversion";
	
	private static final String Request_To_BlibCreator_Webservice_Per_Psm__Modification_Position__N_Terminal = "n";
	private static final String Request_To_BlibCreator_Webservice_Per_Psm__Modification_Position__C_Terminal = "c";

	private static final String Request_To_BlibCreator_Webservice_Per_Psm__Modification_Position__Unlocalized = "u";

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private SearchFlagsForSearchIdSearcherIF searchFlagsForSearchIdSearcher;

	@Autowired
	private SearchScanFile_For_SearchIds_Searcher_IF searchScanFile_For_SearchIds_Searcher;

	@Autowired
	private SearcherCutoffValues_Factory searcherCutoffValuesRootLevel_Factory;

	@Autowired
	private PeptideSequenceStringsForSearchIdReportedPeptideIdsSearcherIF peptideSequenceStringsForSearchIdReportedPeptideIdsSearcher;

	@Autowired
	private ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service;

	@Autowired
	private PsmWebDisplaySearcherIF psmWebDisplaySearcher;

	@Autowired
	private ScanFileDAO_IF scanFileDAO;

	@Autowired
	private PsmDynamicModification_For_PsmIdList_Searcher_IF psmDynamicModification_For_PsmIdList_Searcher;

	@Autowired
	private PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcherIF psmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher;
	
	@Autowired
	private PsmOpenModification_Masses_Positions_For_PsmIds_Searcher_IF psmOpenModification_Masses_Positions_For_PsmIds_Searcher;

	@Autowired
	private DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF dynamic_Variable_ModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher;
	
	@Autowired
	private StaticModDTOForSearchIdSearcherIF staticModDTOForSearchIdSearcher;

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject; // For response from called webservice
	
	/**
	 * 
	 */
	public BlibSpectralLibrary_Download__Request_Creation_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.BLIB_SPECTRAL_LIBRARY_DOWNLOAD__REQUEST_CREATION__REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

	//	@RequestMapping( 
	//			path = AA_RestWSControllerPaths_Constants.,
	//			method = RequestMethod.POST,
	//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

	public @ResponseBody ResponseEntity<byte[]>  searchNameList_From_ProjectSearchIds(

			@RequestBody byte[] postBody,
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse
			) throws Exception {

		try {
			//    		log.warn( "searchNameList_From_ProjectSearchIds(...) called" );

			//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
			//    to return specific error to web app JS code if webserviceSyncTracking is not current value
			validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

			//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

			if ( postBody == null ) {
				log.warn( "No Post Body" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );


			List<WebserviceRequest_PerProjectSearchId> projectSearchIdsReportedPeptideIdsPsmIds = webserviceRequest.projectSearchIdsReportedPeptideIdsPsmIds;

			if ( projectSearchIdsReportedPeptideIdsPsmIds == null || projectSearchIdsReportedPeptideIdsPsmIds.isEmpty() ) {
				log.warn( "No projectSearchIdsReportedPeptideIdsPsmIds entries" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			List<Integer> projectSearchIdList = new ArrayList<>( projectSearchIdsReportedPeptideIdsPsmIds.size() );

			for ( WebserviceRequest_PerProjectSearchId entry : projectSearchIdsReportedPeptideIdsPsmIds ) {
				if ( entry.projectSearchId == null ) {
					log.warn( "No Project Search Id in projectSearchIdsReportedPeptideIdsPsmIds entry" );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				projectSearchIdList.add( entry.projectSearchId );

				if ( entry.reportedPeptideIdsAndTheirPsmIds != null ) {
					for ( WebserviceRequest_PerReportedPeptideId reportedPeptideIdAndItsPsmIds : entry.reportedPeptideIdsAndTheirPsmIds ) {
						Integer reportedPeptideId = reportedPeptideIdAndItsPsmIds.reportedPeptideId;
						if ( reportedPeptideId == null ) {
							log.warn( "In projectSearchIdsReportedPeptideIdsPsmIds entry, reportedPeptideId == null" );
							throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
						}
					}
				}
				if ( entry.searchSubGroup_Ids_Selected != null && entry.searchSubGroup_Ids_Selected.isEmpty() ) {
					log.warn( "In projectSearchIdsReportedPeptideIdsPsmIds entry, entry.searchSubGroup_Ids_Selected != null && entry.searchSubGroup_Ids_Selected.isEmpty()" );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
			}

			if ( projectSearchIdList == null || projectSearchIdList.isEmpty() ) {
				log.warn( "No Project Search Ids" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			SearchDataLookupParamsRoot searchDataLookupParamsRoot = webserviceRequest.searchDataLookupParamsRoot;

			if ( searchDataLookupParamsRoot == null ) {
				log.warn( "No searchDataLookupParamsRoot" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			SearchDataLookupParams_For_ProjectSearchIds searchDataLookupParams_For_ProjectSearchIds = searchDataLookupParamsRoot.getParamsForProjectSearchIds();

			if ( searchDataLookupParams_For_ProjectSearchIds == null ) {
				log.warn( "No searchDataLookupParams_For_ProjectSearchIds" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			//  Validate PSM Annotation data for Ann Type Display is populated

			List<SearchDataLookupParams_For_Single_ProjectSearchId> paramsForProjectSearchIdsList = searchDataLookupParams_For_ProjectSearchIds.getParamsForProjectSearchIdsList();

			if ( paramsForProjectSearchIdsList == null || paramsForProjectSearchIdsList.isEmpty() ) {
				log.warn( "No paramsForProjectSearchIdsList" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			//  Validate that Project Search Ids provided are in paramsForProjectSearchIdsList

			for ( Integer projectSearchId : projectSearchIdList ) {

				boolean found_projectSearchId = false;
				for ( SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchIdInList : paramsForProjectSearchIdsList ) { 

					if ( searchDataLookupParams_For_Single_ProjectSearchIdInList.getProjectSearchId() == projectSearchId.intValue() ) {
						found_projectSearchId = true;
						break;
					}
				}
				if ( ! found_projectSearchId ) {
					log.warn( "paramsForProjectSearchIdsList does not contain projectSearchId: " + projectSearchId );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
			}

			for ( SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId : paramsForProjectSearchIdsList ) { 

				List<Integer> psmAnnTypeDisplay = searchDataLookupParams_For_Single_ProjectSearchId.getPsmAnnTypeDisplay();

				if ( psmAnnTypeDisplay == null ) {
					log.warn( "No psmAnnTypeDisplay. ProjectSearchId: " + searchDataLookupParams_For_Single_ProjectSearchId.getProjectSearchId() );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				if ( psmAnnTypeDisplay.isEmpty() ) {
					log.warn( "psmAnnTypeDisplay is empty. ProjectSearchId: " + searchDataLookupParams_For_Single_ProjectSearchId.getProjectSearchId() );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
			}

			////////////////

			//  AUTH - validate access

			//  throws an exception if access is not valid that is turned into a webservice response by Spring

			//  Comment out result since not use it
			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
					validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIdList, httpServletRequest );

			////////////////

			Integer projectId = null;

			{
				List<Integer> projectIds = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds();

				if (projectIds.isEmpty() ) {
					String msg = "validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds(); returned empty list.";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
				if (projectIds.size() > 1 ) {
					String msg = "validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds(); returned > 1 entry.";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}

				projectId = projectIds.get(0);
			}	


			Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
			List<Integer> searchIdList = new ArrayList<>( projectSearchIdList.size() );

			for ( Integer projectSearchId : projectSearchIdList ) {

				Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
				if ( searchId == null ) {
					String msg = "No searchId for projectSearchId: " + projectSearchId;
					log.warn( msg );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}

				projectSearchIdMapToSearchId.put( projectSearchId, searchId );
				searchIdList.add(searchId);
			}

			//  Validate that ALL Searches HAVE Scan Data

			SearchFlagsForSearchIdSearcher_Result searchFlagsForSearchIdSearcher_Result = searchFlagsForSearchIdSearcher.getSearchFlags_ForSearchIds(searchIdList);
			{
				for ( SearchFlagsForSearchIdSearcher_Result_Item resultItem : searchFlagsForSearchIdSearcher_Result.getResultItems() ) {

					if ( ! resultItem.isHasScanData() ) {
						log.warn( "Search id does NOT have Scan Data: " + resultItem.getSearchId() );
						throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
					}
				}
			}

			//  SearcherCutoffValues_Factory.SkipWebserviceCutoffs_NotIn_projectSearchIdMapToSearchId.YES
			//     since user may filter to limit to less than all the searches in the experiment.

			SearcherCutoffValuesRootLevel searcherCutoffValuesRootLevel =
					searcherCutoffValuesRootLevel_Factory
					.createSearcherCutoffValuesRootLevel_From_WebserviceRequestCutoffs(
							projectSearchIdMapToSearchId, 
							searchDataLookupParamsRoot,
							SearcherCutoffValues_Factory.SkipWebserviceCutoffs_NotIn_projectSearchIdMapToSearchId.YES );

			//  Validate that Project Search Ids provided are in searcherCutoffValuesRootLevel

			for ( Map.Entry<Integer,Integer> projectSearchIdMapToSearchIdEntry : projectSearchIdMapToSearchId.entrySet() ){

				Integer projectSearchId = projectSearchIdMapToSearchIdEntry.getKey();
				// Integer searchId = projectSearchIdMapToSearchIdEntry.getValue();

				SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel = searcherCutoffValuesRootLevel.getPerSearchCutoffs( projectSearchId );

				if ( searcherCutoffValuesSearchLevel == null ) {
					String msg = "No searcherCutoffValuesSearchLevel for projectSearchId: " + projectSearchId;
					log.warn( msg );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
			}

			////

			//  Get Data for all the searches:

			/////

			//  Get Data for call to BlibCreator_Webservice in Map, key on Spectr (Spectral Storage Service) API Key for Scan File

			Internal__Intermediate__Request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_Spectr_API_Key_Holder request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_Spectr_API_Key_Holder = new Internal__Intermediate__Request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_Spectr_API_Key_Holder();


			for ( WebserviceRequest_PerProjectSearchId singleprojectSearchId_ReportedPeptideIdsPsmIds : projectSearchIdsReportedPeptideIdsPsmIds ) {


				Integer searchId = projectSearchIdMapToSearchId.get( singleprojectSearchId_ReportedPeptideIdsPsmIds.projectSearchId );
				if ( searchId == null ) {
					throw new LimelightInternalErrorException( "projectSearchIdMapToSearchId.get( singleprojectSearchId_ReportedPeptideIdsPsmIds.projectSearchId ); returned null. projectSearchId: "
							+ singleprojectSearchId_ReportedPeptideIdsPsmIds.projectSearchId );
				}
				
				SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = null;
				
				{
					List<SearchFlagsForSearchIdSearcher_Result_Item> result_Item_List = searchFlagsForSearchIdSearcher_Result.getResultItems();

					for ( SearchFlagsForSearchIdSearcher_Result_Item resultItem : result_Item_List ) {

						if ( resultItem.getSearchId() == searchId.intValue() ) {

							searchFlagsForSearchIdSearcher_Result_Item = resultItem;
							break;
						}
					}

					if ( searchFlagsForSearchIdSearcher_Result_Item == null ) {
						String msg = "No entry in searchFlagsForSearchIdSearcher_Result for searchId: " + searchId
								+ ", projectSearchIdList: " + StringUtils.join( projectSearchIdList );
						log.error(msg);
						throw new LimelightInternalErrorException(msg);
					}

				}
				
				process_Single_Search_Entry( 
						searchId, 
						singleprojectSearchId_ReportedPeptideIdsPsmIds,
						searchFlagsForSearchIdSearcher_Result_Item,
						searchDataLookupParamsRoot,
						searcherCutoffValuesRootLevel,
						request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_Spectr_API_Key_Holder 
						);
			}

			//  Create final data object graph for 

			List<Request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile> spectral_data = new ArrayList<>( request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_Spectr_API_Key_Holder.spectral_data_Map_Key_API_Key.size() );

			for ( Map.Entry<String, Request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile> mapEntry : request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_Spectr_API_Key_Holder.spectral_data_Map_Key_API_Key.entrySet() ) {

				Request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile mapValue = mapEntry.getValue();
				spectral_data.add(mapValue);
			}

			Request_To_BlibCreator_Webservice_Root request_To_BlibCreator_Webservice_Root = new Request_To_BlibCreator_Webservice_Root( projectId, spectral_data );

			byte[] request_To_BlibCreator_Webservice_Root_AsJSON = marshalObjectToJSON.getJSONByteArray( request_To_BlibCreator_Webservice_Root );

//			{
//				String request_To_BlibCreator_Webservice_Root_AsString = new String( request_To_BlibCreator_Webservice_Root_AsJSON );
//
//				int z = 0;
//			}

			WebserviceResult webserviceResult = sendRequestToServer( request_To_BlibCreator_Webservice_Root_AsJSON );

			byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

		} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {

			//  only rethrow Error Response Exceptions 
			throw e;

		} catch ( Throwable e ) {
			String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
		}
	}

	////////////////////////////////
	////////////////////////////////

	/**
	 * @param request_To_BlibCreator_Webservice_Root_AsJSON
	 * @throws Exception 
	 */
	private WebserviceResult sendRequestToServer( byte[] request_To_BlibCreator_Webservice_Root_AsJSON ) throws Exception {
		
		WebserviceResult webserviceResult = new WebserviceResult();

		String webservice_Base_URL =
				configSystemDAO.getConfigValueForConfigKey(
						ConfigSystemsKeysSharedConstants.BLIB_SPECTRAL_LIBRARY_FILE_CREATION_WEB_SERVICE_BASE_URL );

		if ( StringUtils.isEmpty( webservice_Base_URL ) ) {

			log.warn( "Config table has no value for webservice_Base_URL, key: '" + ConfigSystemsKeysSharedConstants.BLIB_SPECTRAL_LIBRARY_FILE_CREATION_WEB_SERVICE_BASE_URL + "'." );
			webserviceResult.failedToConnectToWebservice = true;

			return webserviceResult;  // EARLY RETURN
		}
		
		
		String webserviceURL = webservice_Base_URL + WEBSERVICE_PATH;


		//  Get number of bytes to send to specify in httpURLConnection.setFixedLengthStreamingMode(...)
		//  (This causes httpURLConnection to not buffer the sent data to get the length,
		//   allowing > 2GB to be sent and also no memory is needed for the buffering)
		long numberOfBytesToSend = request_To_BlibCreator_Webservice_Root_AsJSON.length;

		//   Create object for connecting to server
		URL urlObject;
		try {
			urlObject = new URL( webserviceURL );
		} catch (MalformedURLException e) {

			log.warn( "Failed to parse webserviceURL into Java URL object.  webserviceURL: " + webserviceURL, e );
			webserviceResult.failedToConnectToWebservice = true;

			return webserviceResult;  // EARLY RETURN
		}
		//   Open connection to server
		URLConnection urlConnection;
		try {
			urlConnection = urlObject.openConnection();
		} catch (IOException e) {

			log.warn( "Failed to open connecton to  webserviceURL.  webserviceURL: " + webserviceURL, e );
			webserviceResult.failedToConnectToWebservice = true;

			return webserviceResult;  // EARLY RETURN
		}
		// Downcast URLConnection to HttpURLConnection to allow setting of HTTP parameters 
		if ( ! ( urlConnection instanceof HttpURLConnection ) ) {
			String msg = "( ! ( urlConnection instanceof HttpURLConnection ) ). urlConnection.getClass().getCanonicalName(): " + urlConnection.getClass().getCanonicalName();
			log.error(msg);
			throw new LimelightInternalErrorException( msg );
		}
		HttpURLConnection httpURLConnection = null;
		try {
			httpURLConnection = (HttpURLConnection) urlConnection;
		} catch (Exception e) {
			String msg = "Fail to cast urlConnection to class HttpURLConnection. urlConnection.getClass().getCanonicalName(): " + urlConnection.getClass().getCanonicalName();
			log.error(msg, e);
			throw new LimelightInternalErrorException( msg, e );
		}
		//  Set HttpURLConnection properties

		//   Set Number of bytes to send, can be int or long
		//     ( Calling setFixedLengthStreamingMode(...) allows > 2GB to be sent 
		//       and HttpURLConnection does NOT buffer the sent bytes using ByteArrayOutputStream )
		httpURLConnection.setFixedLengthStreamingMode( numberOfBytesToSend );

		httpURLConnection.setRequestProperty( "Accept", CONTENT_TYPE_SEND_RECEIVE );
		httpURLConnection.setRequestProperty( "Content-Type", CONTENT_TYPE_SEND_RECEIVE );
		httpURLConnection.setDoOutput(true);
		// Send post request to server
		try {  //  Overall try/catch block to put "httpURLConnection.disconnect();" in the finally block

			try {
				httpURLConnection.connect();
			} catch ( IOException e ) {

				log.warn( "Failed to connecton to  webserviceURL 'httpURLConnection.connect()'.  webserviceURL: " + webserviceURL, e );
				webserviceResult.failedToConnectToWebservice = true;

				return webserviceResult;  // EARLY RETURN
			}
			//  Send bytes to server
			OutputStream outputStream = null;
			try {
				outputStream = httpURLConnection.getOutputStream();

				//  Send bytes to server
				outputStream.write( request_To_BlibCreator_Webservice_Root_AsJSON );

			} catch ( IOException e ) {
				byte[] errorStreamContents = null;
				try {
					errorStreamContents= getErrorStreamContents( httpURLConnection );
				} catch ( Exception ex ) {
				}

				log.warn( "IOException writing to connection.  webserviceURL: " + webserviceURL, e );
				webserviceResult.failedToConnectToWebservice = true;

				return webserviceResult;  // EARLY RETURN
				
			} finally {
				if ( outputStream != null ) {
					boolean closeOutputStreamFail = false;
					try {
						outputStream.close();
					} catch ( IOException e ) {
						closeOutputStreamFail = true;
						byte[] errorStreamContents = null;
						try {
							errorStreamContents= getErrorStreamContents( httpURLConnection );
						} catch ( Exception ex ) {
						}

						log.warn( "IOException closing stream used to send to webservice.  webserviceURL: " + webserviceURL, e );
						webserviceResult.failedToConnectToWebservice = true;
						
						return webserviceResult;  // EARLY RETURN
					}
				}
			}
			try {
				int httpResponseCode = httpURLConnection.getResponseCode();
				if ( httpResponseCode != SUCCESS_HTTP_RETURN_CODE ) {
					byte[] errorStreamContents = null;
					try {
						errorStreamContents= getErrorStreamContents( httpURLConnection );
					} catch ( Exception ex ) {
					}

					log.warn( "( httpResponseCode != SUCCESS_HTTP_RETURN_CODE ). httpResponseCode: " + httpResponseCode + ", webserviceURL: " + webserviceURL );
					
					webserviceResult.httpStatusCode_Not_200_OK = httpResponseCode;
					if ( httpResponseCode == 404 ) {
						webserviceResult.failedToConnectToWebservice = true;
					}
					
					return webserviceResult;  // EARLY RETURN
				}
			} catch ( IOException e ) {
				byte[] errorStreamContents = null;
				try {
					errorStreamContents= getErrorStreamContents( httpURLConnection );
				} catch ( Exception ex ) {
				}
				log.warn( "IOException getting HTTP response code. httpURLConnection.getResponseCode().  webserviceURL: " + webserviceURL, e );
				webserviceResult.failedToConnectToWebservice = true;
				
				return webserviceResult;  // EARLY RETURN
			}
			//  Get response body from server
			ByteArrayOutputStream outputStreamBufferOfServerResponse = new ByteArrayOutputStream( 1000000 );
			InputStream inputStream = null;
			try {
				inputStream = httpURLConnection.getInputStream();
				int nRead;
				byte[] data = new byte[ 16384 ];
				while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
					outputStreamBufferOfServerResponse.write(data, 0, nRead);
				}
			} catch ( IOException e ) {
				byte[] errorStreamContents = null;
				try {
					errorStreamContents= getErrorStreamContents( httpURLConnection );
				} catch ( Exception ex ) {
				}

				log.warn( "IOException reading Webservice response.  webserviceURL: " + webserviceURL, e );
				webserviceResult.failedToConnectToWebservice = true;
				
				return webserviceResult;  // EARLY RETURN
			} finally {
				if ( inputStream != null ) {
					try {
						inputStream.close();
					} catch ( IOException e ) {
						byte[] errorStreamContents = null;
						try {
							errorStreamContents= getErrorStreamContents( httpURLConnection );
						} catch ( Exception ex ) {
						}

						log.warn( "IOException closing stream used for reading Webservice response.  webserviceURL: " + webserviceURL, e );
						webserviceResult.failedToConnectToWebservice = true;
						
						return webserviceResult;  // EARLY RETURN
					}
				}
			}

			byte[] serverResponseByteArray = outputStreamBufferOfServerResponse.toByteArray();
			
			Response_From_BlibCreator_Webservice_Root object = null;
			
			try {
				object = unmarshalJSON_ToObject.getObjectFromJSONByteArray(serverResponseByteArray, Response_From_BlibCreator_Webservice_Root.class);
			} catch ( Exception e ) {

				String serverResponseBytesToString = "'Failed to convert Server response to String'";
						
				try {
					serverResponseBytesToString = new String( serverResponseByteArray, StandardCharsets.UTF_8 );
				} catch (Exception e2) {
				}
				
				log.warn( "Exception parsing Webservice response to JSON.  webserviceURL: " + webserviceURL + ", Server Response: " + serverResponseBytesToString, e );
				webserviceResult.failedToConnectToWebservice = true;
				
				return webserviceResult;  // EARLY RETURN
			}
			
			if ( ! ( object instanceof Response_From_BlibCreator_Webservice_Root ) ) {
				String msg = "( ! ( object instanceof Response_From_BlibCreator_Webservice_Root ) ). object.getClass().getCanonicalName(): " + object.getClass().getCanonicalName();
				log.error(msg);

				webserviceResult.failedToConnectToWebservice = true;
				
				return webserviceResult;  // EARLY RETURN
			}
			
			Response_From_BlibCreator_Webservice_Root serverResponse = null;

			try {
				serverResponse = object;
			} catch ( Exception e ) {
				String msg = "Failed: serverResponse = (Response_From_BlibCreator_Webservice_Root) object. object.getClass().getCanonicalName(): " + object.getClass().getCanonicalName();
				log.error(msg);

				webserviceResult.failedToConnectToWebservice = true;

				return webserviceResult;  // EARLY RETURN
			}
			
			webserviceResult.status = true;
			webserviceResult.requestId = serverResponse.request_id;
			
			
			return webserviceResult;

		} finally {
			//			httpURLConnection.disconnect();
		}
	}

	/**
	 * @param httpURLConnection
	 * @return
	 * @throws IOException
	 */
	private byte[] getErrorStreamContents(HttpURLConnection httpURLConnection) throws IOException {

		InputStream inputStream = httpURLConnection.getErrorStream();
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		int byteArraySize = 5000;
		byte[] data = new byte[ byteArraySize ];
		while (true) {
			int bytesRead = inputStream.read( data );
			if ( bytesRead == -1 ) {  // end of input
				break;
			}
			if ( bytesRead > 0 ) {
				baos.write( data, 0, bytesRead );
			}
		}
		return baos.toByteArray();
	}


	/**
	 * @param searchId
	 * @param projectSearchId_ReportedPeptideIdsPsmIds
	 * @param request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_API_Key_Holder
	 * @throws Exception 
	 */
	private void process_Single_Search_Entry(
			Integer searchId,
			WebserviceRequest_PerProjectSearchId projectSearchId_ReportedPeptideIdsPsmIds,
			SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item,
			SearchDataLookupParamsRoot searchDataLookupParamsRoot,
			SearcherCutoffValuesRootLevel searcherCutoffValuesRootLevel,

			// Updated
			Internal__Intermediate__Request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_Spectr_API_Key_Holder request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_Spectr_API_Key_Holder

			) throws Exception {

		Integer projectSearchId = projectSearchId_ReportedPeptideIdsPsmIds.projectSearchId;

		Internal__PeptideSequences_Map_Key_ReportedPeptideId peptideSequences_Map_Key_ReportedPeptideId =
				get_PeptideSequences_Map_Key_ReportedPeptideId( projectSearchId_ReportedPeptideIdsPsmIds, searchId );


		Map<Integer, String> scanFile_Spectr_API_Key_Map_Key_SearchScanFileId = new HashMap<>();

		{
			//  Get SearchScanFileDTO from DB:

			List<Integer> searchIds = new ArrayList<>( 2 );
			searchIds.add(searchId);

			List<SearchScanFileDTO> searchScanFileDTOList = searchScanFile_For_SearchIds_Searcher.getSearchScanFile_For_SearchIds(searchIds);

			for( SearchScanFileDTO searchScanFileDTO : searchScanFileDTOList ) {

				Integer scanFileId = searchScanFileDTO.getScanFileId();
				if ( scanFileId == null ) {
					String msg = "No scanFileId for searchScanFileDTO.getId()" + searchScanFileDTO.getId() + ", projectSearchId: " + projectSearchId;
					log.warn( msg );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				String spectralStorageAPIKey = scanFileDAO.getSpectralStorageAPIKeyById( scanFileId );
				if ( spectralStorageAPIKey == null ) {
					String msg = "No spectralStorageAPIKey for scanFileId: " + scanFileId + ", searchScanFileDTO.getId()" + searchScanFileDTO.getId() + ", projectSearchId: " + projectSearchId;
					log.warn( msg );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				scanFile_Spectr_API_Key_Map_Key_SearchScanFileId.put(searchScanFileDTO.getId(), spectralStorageAPIKey);
			}
		}

		/////

		SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel = searcherCutoffValuesRootLevel.getPerSearchCutoffs( projectSearchId );

		//		SearchDataLookupParams_For_ProjectSearchIds searchDataLookupParams_For_ProjectSearchIds = searchDataLookupParamsRoot.getParamsForProjectSearchIds();

		SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId = null;

		for ( SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchIdInList 
				: searchDataLookupParamsRoot.getParamsForProjectSearchIds().getParamsForProjectSearchIdsList() ) { 

			if ( searchDataLookupParams_For_Single_ProjectSearchIdInList.getProjectSearchId() == projectSearchId.intValue() ) {
				searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchIdInList;
				break;
			}
		}
		if ( searchDataLookupParams_For_Single_ProjectSearchId == null ) {
			//  Should never throw this since checked for above
			log.warn( "paramsForProjectSearchIdsList does not contain projectSearchId: " + projectSearchId );
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		//  Get all Static Mods for search

		List<StaticModDTO> staticModDTO_List = staticModDTOForSearchIdSearcher.getListForSearchId( searchId );

		//////////

		//  Passed from client - Optional
		List<Integer> searchSubGroup_Ids_Selected = projectSearchId_ReportedPeptideIdsPsmIds.searchSubGroup_Ids_Selected;

		//  Passed from client - Optional
		List<WebserviceRequest_PerReportedPeptideId> reportedPeptideIdsAndTheirPsmIds = projectSearchId_ReportedPeptideIdsPsmIds.reportedPeptideIdsAndTheirPsmIds;

		//  Process reportedPeptideIds in request, or retrieve reportedPeptideIds for cutoffs and Process


		if ( reportedPeptideIdsAndTheirPsmIds != null ) {

			// Process reportedPeptideIds and possibly their PSMs in request

			//  Have reportedPeptideIds from client for this Project Search Id to process

			//  Get Reported Peptide Level Variable/Dynamic Modifications

			Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> variable_Dynamic_Modifications_ReportedPeptideLevel_Map_Key_ReportedPeptideId;

			{
				//  Get Variable/Dynamic Modifications for Reported Peptides

				List<Integer> reportedPeptideIds = new ArrayList<>();
				for ( WebserviceRequest_PerReportedPeptideId reportedPeptideIdsAndTheirPsmIds_Entry : projectSearchId_ReportedPeptideIdsPsmIds.reportedPeptideIdsAndTheirPsmIds ) {

					Integer reportedPeptideId = reportedPeptideIdsAndTheirPsmIds_Entry.reportedPeptideId;
					if ( reportedPeptideId == null ) {
						String msg = "( reportedPeptideId == null )";
						log.warn(msg);
						throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
					}
					reportedPeptideIds.add(reportedPeptideId);
				}

				DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result result =
						dynamic_Variable_ModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher
						.getDynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIds( searchId, reportedPeptideIds );

				variable_Dynamic_Modifications_ReportedPeptideLevel_Map_Key_ReportedPeptideId = result.getResults_Key_ReportedPeptideId();
			}

			//  Get PSM core data for all Reported Peptide Ids

			for ( WebserviceRequest_PerReportedPeptideId reportedPeptideIdsAndTheirPsmIds_Entry : projectSearchId_ReportedPeptideIdsPsmIds.reportedPeptideIdsAndTheirPsmIds ) {

				Integer reportedPeptideId = reportedPeptideIdsAndTheirPsmIds_Entry.reportedPeptideId;
				if ( reportedPeptideId == null ) {
					String msg = "( reportedPeptideId == null )";
					log.warn(msg);
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}

				List<Long> psmId_List_For_psmWebDisplayList = reportedPeptideIdsAndTheirPsmIds_Entry.psmIds_Include;
				
				if ( psmId_List_For_psmWebDisplayList == null || psmId_List_For_psmWebDisplayList.isEmpty() ) {

					//  No PSM IDs passed in to webservice so get PSM IDs from cutoffs and reportedPeptideId for searchId
					
					psmId_List_For_psmWebDisplayList =
							psmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher
							.getPsmIdsForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );
				}
				
				List<PsmWebDisplayWebServiceResult> psmWebDisplayList =  
						psmWebDisplaySearcher.getPsmsWebDisplay( 
								searchId, 
								projectSearchId_ReportedPeptideIdsPsmIds.searchSubGroup_Ids_Selected, 
								psmId_List_For_psmWebDisplayList );

				process_Single_ReportedPeptide_And_Its_PSMs(
						searchId, 
						reportedPeptideId, 
						psmWebDisplayList, 
						searcherCutoffValuesSearchLevel,
						searchFlagsForSearchIdSearcher_Result_Item,
						variable_Dynamic_Modifications_ReportedPeptideLevel_Map_Key_ReportedPeptideId,
						staticModDTO_List,
						scanFile_Spectr_API_Key_Map_Key_SearchScanFileId, 
						peptideSequences_Map_Key_ReportedPeptideId, 
						request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_Spectr_API_Key_Holder);
			}

		} else {

			//  Reported Peptide Ids not provided, get all for Project Search Id and Criteria

			//   retrieve reportedPeptideIds for cutoffs and Process

			//  Get initial Reported Peptide Id list (maybe include Num PSMs) based on search criteria

			List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> peptideMinimalObjectsList = 
					reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service
					.getPeptideDataList( searchId, searcherCutoffValuesSearchLevel, MINIMUM_NUMBER_OF_PSMS_PER_REPORTED_PEPTIDE );

			//  Have reportedPeptideIds for this Project Search Id to process

			//  Get PSM core data for all Reported Peptide Ids

			//  Get Reported Peptide Level Variable/Dynamic Modifications

			Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> variable_Dynamic_Modifications_ReportedPeptideLevel_Map_Key_ReportedPeptideId;

			{
				//  Get Variable/Dynamic Modifications for Reported Peptides

				List<Integer> reportedPeptideIds = new ArrayList<>();
				for ( ReportedPeptide_MinimalData_List_FromSearcher_Entry entry : peptideMinimalObjectsList ) {

					Integer reportedPeptideId = entry.getReportedPeptideId(); 
					reportedPeptideIds.add(reportedPeptideId);
				}

				DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result result =
						dynamic_Variable_ModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher
						.getDynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIds( searchId, reportedPeptideIds );

				variable_Dynamic_Modifications_ReportedPeptideLevel_Map_Key_ReportedPeptideId = result.getResults_Key_ReportedPeptideId();
			}

			for ( ReportedPeptide_MinimalData_List_FromSearcher_Entry entry : peptideMinimalObjectsList ) {

				Integer reportedPeptideId = entry.getReportedPeptideId(); 

				//  Get PSM IDs from cutoffs and reportedPeptideId for searchId
				
				List<Long> psmId_List_For_psmWebDisplayList = 
						psmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher
						.getPsmIdsForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );
				
				List<PsmWebDisplayWebServiceResult> psmWebDisplayList = 
						psmWebDisplaySearcher.getPsmsWebDisplay( 
								searchId, 
								searchSubGroup_Ids_Selected, 
								psmId_List_For_psmWebDisplayList );

				process_Single_ReportedPeptide_And_Its_PSMs(
						searchId, 
						reportedPeptideId, 
						psmWebDisplayList, 
						searcherCutoffValuesSearchLevel,
						searchFlagsForSearchIdSearcher_Result_Item,
						variable_Dynamic_Modifications_ReportedPeptideLevel_Map_Key_ReportedPeptideId,
						staticModDTO_List,
						scanFile_Spectr_API_Key_Map_Key_SearchScanFileId, 
						peptideSequences_Map_Key_ReportedPeptideId, 
						request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_Spectr_API_Key_Holder);
			}
		}
	}


	/**
	 * @param searchId
	 * @param reportedPeptideId
	 * @param psmWebDisplayList
	 * @param variable_Dynamic_Modifications_ReportedPeptideLevel_Map_Key_ReportedPeptideId
	 * @param scanFile_Spectr_API_Key_Map_Key_SearchScanFileId
	 * @param peptideSequences_Map_Key_ReportedPeptideId
	 * @param request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_Spectr_API_Key_Holder
	 * @throws Exception
	 */
	private void process_Single_ReportedPeptide_And_Its_PSMs(

			Integer searchId,
			Integer reportedPeptideId,

			List<PsmWebDisplayWebServiceResult> psmWebDisplayList,
			
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel,
			SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item,
			
			Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> variable_Dynamic_Modifications_ReportedPeptideLevel_Map_Key_ReportedPeptideId,
			List<StaticModDTO> staticModDTO_List,
			
			Map<Integer, String> scanFile_Spectr_API_Key_Map_Key_SearchScanFileId,
			Internal__PeptideSequences_Map_Key_ReportedPeptideId peptideSequences_Map_Key_ReportedPeptideId,

			// Updated
			Internal__Intermediate__Request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_Spectr_API_Key_Holder request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_Spectr_API_Key_Holder

			) throws Exception {


		String peptideSequence = peptideSequences_Map_Key_ReportedPeptideId.peptideSequences_Map_Key_ReportedPeptideId.get( reportedPeptideId );
		if ( peptideSequence == null ) {
			String msg = "No peptideSequence for: reportedPeptideId: " + reportedPeptideId + ", searchId: " + searchId;
			log.warn(msg);
			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
		}
		
		Map<Long, Internal__Intermediate__Psm_Holder> internal__Intermediate__Psm_Holder_Map_Key_PsmId = new HashMap<>();

		for ( PsmWebDisplayWebServiceResult psmWebDisplay : psmWebDisplayList) {

			long psmId = psmWebDisplay.getPsmId();
			int charge = psmWebDisplay.getCharge();
			int scanNumber = psmWebDisplay.getScanNumber();
			

			//  Create Per PSM entry for Request to BlibCreator Webservice

			Request_To_BlibCreator_Webservice_Per_Psm request_To_BlibCreator_Webservice_Per_Psm = new Request_To_BlibCreator_Webservice_Per_Psm();

			request_To_BlibCreator_Webservice_Per_Psm.scan_number = scanNumber;
			request_To_BlibCreator_Webservice_Per_Psm.charge = charge;
			request_To_BlibCreator_Webservice_Per_Psm.peptide_sequence = peptideSequence;

			//  Each entry in Map 'modifications':
			//      Key:   <position_value>  -- position '1' is first position, use 'n' and 'c' for terminal mods, 'u' for unlocalized
			//      Value: <mod mass>   

			Map<String, Double> modifications = new HashMap<>();
			
			request_To_BlibCreator_Webservice_Per_Psm.modifications = modifications;
			
			Internal__Intermediate__Psm_Holder internal__Intermediate__Psm_Holder = new Internal__Intermediate__Psm_Holder();
			internal__Intermediate__Psm_Holder.psmWebDisplay = psmWebDisplay;
			internal__Intermediate__Psm_Holder.request_To_BlibCreator_Webservice_Per_Psm = request_To_BlibCreator_Webservice_Per_Psm;
			
			internal__Intermediate__Psm_Holder_Map_Key_PsmId.put( psmId, internal__Intermediate__Psm_Holder);
			
		}

		//  Populate modifications

		if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_DynamicModifications() ) {

			List<Long> psmIdList = new ArrayList<>( psmWebDisplayList.size() );

			for ( PsmWebDisplayWebServiceResult psmWebDisplayWebServiceResult : psmWebDisplayList ) {
				psmIdList.add( psmWebDisplayWebServiceResult.getPsmId() );
			}

			List<PsmDynamicModificationDTO> psmDynamicModificationDTO_List = psmDynamicModification_For_PsmIdList_Searcher.getPsmDynamicModification_For_PsmIdList( psmIdList );
			
			for ( PsmDynamicModificationDTO psmDynamicModificationDTO : psmDynamicModificationDTO_List  ) {

				Long psmId = psmDynamicModificationDTO.getPsmId();
				
				Internal__Intermediate__Psm_Holder internal__Intermediate__Psm_Holder = internal__Intermediate__Psm_Holder_Map_Key_PsmId.get( psmId );
				if ( internal__Intermediate__Psm_Holder == null ) {
    				String msg = "internal__Intermediate__Psm_Holder_Map_Key_PsmId.get( psmDynamicModificationDTO.getPsmId() ) return null.  psmDynamicModificationDTO.getPsmId(): " + psmId;
    				log.error(msg);
    				throw new LimelightInternalErrorException(msg);
				}
				
				Map<String, Double> modifications = internal__Intermediate__Psm_Holder.request_To_BlibCreator_Webservice_Per_Psm.modifications;
				
				String positionAsString = String.valueOf( psmDynamicModificationDTO.getPosition() );
				
				Double mass_InMap = modifications.get( positionAsString );
				if ( mass_InMap == null ) {
					modifications.put( positionAsString, psmDynamicModificationDTO.getMass() );
				} else {
					modifications.put( positionAsString, psmDynamicModificationDTO.getMass() + mass_InMap.doubleValue() );
				}
			}

		} else {
			
			//  Add in Variable/Dynamic Mod masses from Reported Peptide Level
			
//			Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> 

			List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item> variableModMasses_AtReportedPeptideLevel = 
					variable_Dynamic_Modifications_ReportedPeptideLevel_Map_Key_ReportedPeptideId.get( reportedPeptideId );

			if ( variableModMasses_AtReportedPeptideLevel != null ) {
								
    			for ( Map.Entry<Long, Internal__Intermediate__Psm_Holder> mapEntry : internal__Intermediate__Psm_Holder_Map_Key_PsmId.entrySet() ) {

    				Internal__Intermediate__Psm_Holder internal__Intermediate__Psm_Holder = mapEntry.getValue();

    				Map<String, Double> modifications = internal__Intermediate__Psm_Holder.request_To_BlibCreator_Webservice_Per_Psm.modifications;
    				
    				for ( DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item variableModMass_Entry : variableModMasses_AtReportedPeptideLevel ) {
    					    					
    					String positionAsString = String.valueOf( variableModMass_Entry.getPosition() );

    					if ( variableModMass_Entry.isIs_N_Terminal() ) {
    					
    						positionAsString = Request_To_BlibCreator_Webservice_Per_Psm__Modification_Position__N_Terminal;
    						
    					} else if ( variableModMass_Entry.isIs_C_Terminal() ) {
    						
    						positionAsString = Request_To_BlibCreator_Webservice_Per_Psm__Modification_Position__C_Terminal;
    					}
    					
    					Double mass_InMap = modifications.get( positionAsString );
    					if ( mass_InMap == null ) {
    						modifications.put( positionAsString, variableModMass_Entry.getMass() );
    					} else {
    						modifications.put( positionAsString, variableModMass_Entry.getMass() + mass_InMap.doubleValue() );
    					}
    				}
    			}
			}
		}

		if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_OpenModifications() ) {


			List<Long> psmIds = psmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher.getPsmIdsForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );

			List<PsmOpenModification_Masses_Positions_For_PsmIds_Searcher_ResultEntry>  psmOpenModificationMassesList = 
					psmOpenModification_Masses_Positions_For_PsmIds_Searcher.getPsmOpenModificationMassesFor_PsmIds( psmIds );

			for ( PsmOpenModification_Masses_Positions_For_PsmIds_Searcher_ResultEntry psmOpenModification_Entry : psmOpenModificationMassesList ) {

				Long psmId = psmOpenModification_Entry.getPsmId();
				
				Internal__Intermediate__Psm_Holder internal__Intermediate__Psm_Holder = internal__Intermediate__Psm_Holder_Map_Key_PsmId.get( psmId );
				if ( internal__Intermediate__Psm_Holder == null ) {
    				String msg = "internal__Intermediate__Psm_Holder_Map_Key_PsmId.get( psmOpenModification_Entry.getPsmId() ) return null.  psmOpenModification_Entry.getPsmId(): " + psmId;
    				log.error(msg);
    				throw new LimelightInternalErrorException(msg);
				}
				
				Map<String, Double> modifications = internal__Intermediate__Psm_Holder.request_To_BlibCreator_Webservice_Per_Psm.modifications;
				
				String positionAsString = null;
				
				if ( psmOpenModification_Entry.getIs_N_Terminal() != null && psmOpenModification_Entry.getIs_N_Terminal().booleanValue() ) {
				
					positionAsString = Request_To_BlibCreator_Webservice_Per_Psm__Modification_Position__N_Terminal;
					
				} else if ( psmOpenModification_Entry.getIs_C_Terminal() != psmOpenModification_Entry.getIs_C_Terminal() && psmOpenModification_Entry.getIs_C_Terminal().booleanValue() ) {
					
					positionAsString = Request_To_BlibCreator_Webservice_Per_Psm__Modification_Position__C_Terminal;
				
				} else if ( psmOpenModification_Entry.getOpenModificationPosition() != null ) {
					
					positionAsString = String.valueOf( psmOpenModification_Entry.getOpenModificationPosition() );
				} else {
					
					// Unlocalized Mod mass
					
					positionAsString = Request_To_BlibCreator_Webservice_Per_Psm__Modification_Position__Unlocalized;
				}

				if ( psmOpenModification_Entry.getOpenModificationMass() != 0 ) {
					int z = 0;
				}
				
									
				Double mass_InMap = modifications.get( positionAsString );
				if ( mass_InMap == null ) {
					modifications.put( positionAsString, psmOpenModification_Entry.getOpenModificationMass() );
				} else {
					modifications.put( positionAsString, psmOpenModification_Entry.getOpenModificationMass() + mass_InMap.doubleValue() );
				}
			}
		}

		{  // static mods

			for ( Map.Entry<Long, Internal__Intermediate__Psm_Holder> mapEntry : internal__Intermediate__Psm_Holder_Map_Key_PsmId.entrySet() ) {

				Internal__Intermediate__Psm_Holder internal__Intermediate__Psm_Holder = mapEntry.getValue();

				Map<String, Double> modifications = internal__Intermediate__Psm_Holder.request_To_BlibCreator_Webservice_Per_Psm.modifications;

				
				for ( StaticModDTO staticModDTO : staticModDTO_List ) {
					
					for ( int peptideSequence_SubStringStart = 0; peptideSequence_SubStringStart < peptideSequence.length(); peptideSequence_SubStringStart++ ) {
						
						if ( peptideSequence.contains( staticModDTO.getResidue() ) ) {
							int z = 0;
						}
						String sequenceAt_SubStringStart = peptideSequence.substring( peptideSequence_SubStringStart, peptideSequence_SubStringStart + 1 );
						if ( staticModDTO.getResidue().equals( sequenceAt_SubStringStart ) ) {

							int modPosition = peptideSequence_SubStringStart + 1; // since mod position is 1 based
							
							String positionAsString = String.valueOf( modPosition );

							Double mass_InMap = modifications.get( positionAsString );
							if ( mass_InMap == null ) {
								modifications.put( positionAsString, staticModDTO.getMass().doubleValue() );
							} else {
								modifications.put( positionAsString, staticModDTO.getMass().doubleValue() + mass_InMap.doubleValue() );
							}
						}
					}
				}
			}
		}
		
		//  Copy Request_To_BlibCreator_Webservice_Per_Psm object to result
		
		for ( Map.Entry<Long, Internal__Intermediate__Psm_Holder> mapEntry : internal__Intermediate__Psm_Holder_Map_Key_PsmId.entrySet() ) {
			
			Internal__Intermediate__Psm_Holder internal__Intermediate__Psm_Holder = mapEntry.getValue();
			
			long psmId = internal__Intermediate__Psm_Holder.psmWebDisplay.getPsmId();
			
			Request_To_BlibCreator_Webservice_Per_Psm request_To_BlibCreator_Webservice_Per_Psm = internal__Intermediate__Psm_Holder.request_To_BlibCreator_Webservice_Per_Psm;
			
			Integer searchScanFileId = internal__Intermediate__Psm_Holder.psmWebDisplay.getSearchScanFileId();

			if ( searchScanFileId == null ) {
				String msg = "searchScanFileId == null for: psmId: " + psmId + ", reportedPeptideId: " + reportedPeptideId + ", searchId: " + searchId;
				log.warn(msg);
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			String scanFile_Spectr_API_Key = scanFile_Spectr_API_Key_Map_Key_SearchScanFileId.get( searchScanFileId );
			if ( scanFile_Spectr_API_Key == null ) {
				String msg = "No scanFile_Spectr_API_Key for: searchScanFileId: " + searchScanFileId + ", psmId: " + psmId + ", reportedPeptideId: " + reportedPeptideId + ", searchId: " + searchId;
				log.warn(msg);
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}


			Request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile =
					request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_Spectr_API_Key_Holder.spectral_data_Map_Key_API_Key.get( scanFile_Spectr_API_Key );

			if ( request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile == null ) {
				request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile = new Request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile( scanFile_Spectr_API_Key );
				request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_Spectr_API_Key_Holder.spectral_data_Map_Key_API_Key.put( scanFile_Spectr_API_Key, request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile );
			}

			request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile.psms.add(request_To_BlibCreator_Webservice_Per_Psm);
		}
	}



	////////////////////////////////////////
	////////////////////////////////////////


	private Internal__PeptideSequences_Map_Key_ReportedPeptideId get_PeptideSequences_Map_Key_ReportedPeptideId( 

			WebserviceRequest_PerProjectSearchId projectSearchId_ReportedPeptideIdsPsmIds,
			Integer searchId ) throws SQLException {


		Map<Integer, String> peptideSequences_Map_Key_ReportedPeptideId = new HashMap<>();

		List<Integer> reportedPeptideIds = new ArrayList<>( projectSearchId_ReportedPeptideIdsPsmIds.reportedPeptideIdsAndTheirPsmIds.size() );

		for ( WebserviceRequest_PerReportedPeptideId reportedPeptideIdsAndTheirPsmIds_Entry : projectSearchId_ReportedPeptideIdsPsmIds.reportedPeptideIdsAndTheirPsmIds ) {

			reportedPeptideIds.add( reportedPeptideIdsAndTheirPsmIds_Entry.reportedPeptideId );
		}

		List<PeptideSequenceStringsForSearchIdReportedPeptideId_Item> peptideSequenceStringsForSearchIdReportedPeptideIds = 
				peptideSequenceStringsForSearchIdReportedPeptideIdsSearcher.getPeptideSequenceStringsForSearchIdReportedPeptideIds(searchId, reportedPeptideIds);

		for ( PeptideSequenceStringsForSearchIdReportedPeptideId_Item item : peptideSequenceStringsForSearchIdReportedPeptideIds ) {

			peptideSequences_Map_Key_ReportedPeptideId.put( item.getReportedPeptideId(), item.getPeptideSequence() );
		}

		Internal__PeptideSequences_Map_Key_ReportedPeptideId peptideSequences_Map_Key_ReportedPeptideId_Result = new Internal__PeptideSequences_Map_Key_ReportedPeptideId();
		peptideSequences_Map_Key_ReportedPeptideId_Result.peptideSequences_Map_Key_ReportedPeptideId = peptideSequences_Map_Key_ReportedPeptideId;

		return peptideSequences_Map_Key_ReportedPeptideId_Result;

	}



	////////////////////////////////////////
	////////////////////////////////////////

	private class Internal__PeptideSequences_Map_Key_ReportedPeptideId {

		Map<Integer, String> peptideSequences_Map_Key_ReportedPeptideId;
	}



	private class Internal__Intermediate__Request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile__Map_Key_Spectr_API_Key_Holder {

		Map<String, Request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile> spectral_data_Map_Key_API_Key = new HashMap<>();
	}


	private class Internal__Intermediate__Psm_Holder {
		
		Request_To_BlibCreator_Webservice_Per_Psm request_To_BlibCreator_Webservice_Per_Psm;
		
		PsmWebDisplayWebServiceResult psmWebDisplay;
		
	}


	////////////////////////////////////////
	////////////////////////////////////////

	//   Request_To_BlibCreator_Webservice  Request Classes to be serialized for Webservice call

	private class Request_To_BlibCreator_Webservice_Root {

		int project_id;
		List<Request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile> spectral_data;

		/**
		 * Constructory
		 * 
		 * @param project_id
		 * @param spectral_data
		 */
		public Request_To_BlibCreator_Webservice_Root(

				int project_id,
				List<Request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile> spectral_data
				) {

			this.project_id = project_id;
			this.spectral_data = spectral_data;
		}

		public int getProject_id() {
			return project_id;
		}
		public List<Request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile> getSpectral_data() {
			return spectral_data;
		}
	}

	private class Request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile {

		String spectr_file_id;
		List<Request_To_BlibCreator_Webservice_Per_Psm> psms = new ArrayList<>();

		/**
		 * Constructory
		 * 
		 * @param project_id
		 * @param spectral_data
		 */
		public Request_To_BlibCreator_Webservice_Per_SpectralStorageServiceFile(

				String spectr_file_id
				) {

			this.spectr_file_id = spectr_file_id;
		}

		public String getSpectr_file_id() {
			return spectr_file_id;
		}
		public List<Request_To_BlibCreator_Webservice_Per_Psm> getPsms() {
			return psms;
		}
	}

	private class Request_To_BlibCreator_Webservice_Per_Psm {

		int scan_number;
		int charge;
		String peptide_sequence;

		//  Each entry in Map 'modifications':
		//      Key:   <position_value>  -- position '1' is first position, use 'n' and 'c' for terminal mods, 'u' for unlocalized
		//      Value: <mod mass>   

		Map<String, Double> modifications;


		public int getScan_number() {
			return scan_number;
		}
		public int getCharge() {
			return charge;
		}
		public String getPeptide_sequence() {
			return peptide_sequence;
		}
		public Map<String, Double> getModifications() {
			return modifications;
		}
	}

	//   Request_To_BlibCreator_Webservice - Response Class to be deserialized from Webservice call

	public static class Response_From_BlibCreator_Webservice_Root {

		private String request_id;

		public void setRequest_id(String request_id) {
			this.request_id = request_id;
		}

	}
	////////////////////////////////////////
	////////////////////////////////////////


	/**
	 * 
	 *
	 */
	public static class WebserviceRequest {

		private List<WebserviceRequest_PerProjectSearchId> projectSearchIdsReportedPeptideIdsPsmIds;
		private SearchDataLookupParamsRoot searchDataLookupParamsRoot;

		public void setProjectSearchIdsReportedPeptideIdsPsmIds(
				List<WebserviceRequest_PerProjectSearchId> projectSearchIdsReportedPeptideIdsPsmIds) {
			this.projectSearchIdsReportedPeptideIdsPsmIds = projectSearchIdsReportedPeptideIdsPsmIds;
		}
		public void setSearchDataLookupParamsRoot(SearchDataLookupParamsRoot searchDataLookupParamsRoot) {
			this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
		}
	}

	public static class WebserviceRequest_PerProjectSearchId {

		private Integer projectSearchId;

		private List<Integer> searchSubGroup_Ids_Selected; //  Optional

		private List<WebserviceRequest_PerReportedPeptideId> reportedPeptideIdsAndTheirPsmIds; //  Optional

		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public void setSearchSubGroup_Ids_Selected(List<Integer> searchSubGroup_Ids_Selected) {
			this.searchSubGroup_Ids_Selected = searchSubGroup_Ids_Selected;
		}
		public void setReportedPeptideIdsAndTheirPsmIds(
				List<WebserviceRequest_PerReportedPeptideId> reportedPeptideIdsAndTheirPsmIds) {
			this.reportedPeptideIdsAndTheirPsmIds = reportedPeptideIdsAndTheirPsmIds;
		}
	}

	public static class WebserviceRequest_PerReportedPeptideId {

		private Integer reportedPeptideId;
		private List<Long> psmIds_Include;

		public void setReportedPeptideId(Integer reportedPeptideId) {
			this.reportedPeptideId = reportedPeptideId;
		}
		public void setPsmIds_Include(List<Long> psmIds_Include) {
			this.psmIds_Include = psmIds_Include;
		}
	}


	/**
	 * 
	 *
	 */
	public static class WebserviceResult {

		boolean status;
		String requestId;
		boolean failedToConnectToWebservice;  // Also malformed URL
		Integer httpStatusCode_Not_200_OK;

		public String getRequestId() {
			return requestId;
		}
		public boolean isFailedToConnectToWebservice() {
			return failedToConnectToWebservice;
		}
		public Integer getHttpStatusCode_Not_200_OK() {
			return httpStatusCode_Not_200_OK;
		}
		public boolean isStatus() {
			return status;
		}
	}
}


