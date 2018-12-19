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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.data_download_controllers.psm_downloads;

import java.io.BufferedOutputStream;
import java.io.OutputStreamWriter;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesRootLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.dao.ScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.objects.AnnotationDataItem_ForPage;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParamsRoot;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_ProjectSearchIds;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.lookup_params_main_objects.SearchDataLookupParams_For_Single_ProjectSearchId;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.Psm_DescriptiveAnnotationData_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.Psm_FilterableAnnotationData_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValues_Factory;
import org.yeastrc.limelight.limelight_webapp.searchers.AnnotationTypeListForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PeptideStringForSearchIdReportedPeptideIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinVersionIdsFor_SearchID_ReportedPeptideId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmWebDisplaySearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchHasScanDataForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers_results.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmWebDisplayWebServiceResult;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services.ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.data_download_controllers.AA_DataDownloadControllersPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.data_download_controllers.DownloadsCharacterSetConstant;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanDataFromScanNumbers_IncludeParentScans;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_ExcludeReturnScanPeakData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScan_SubResponse;

/**
 * Download PSMs for Project Search Ids And Search Criteria (searchDataLookupParams_For_Single_ProjectSearchId)
 * 
 * Optional Reported Peptide Ids per Project Search Id - Use Provided reported Peptide Ids and not query for them 
 *    (Performance is better if provided)
 * Optional Protein Sequence Version Ids - restrict reported Peptide Ids to Provided Protein Sequence Version Ids
 * 
 * See class PostRequestParameters below for Form Field Name
 */
@Controller
public class PSMs_For_ProjectSearchIds_SearchCriteria_Optional__ReportedPeptideIds_Optional_ProtSeqVIds_Download_Controller {

	private static final Logger log = LoggerFactory.getLogger( PSMs_For_ProjectSearchIds_SearchCriteria_Optional__ReportedPeptideIds_Optional_ProtSeqVIds_Download_Controller.class );
	
	private static final String CONTROLLER_PATH =
			AA_DataDownloadControllersPaths_Constants.PATH_START_ALL
			+ AA_DataDownloadControllersPaths_Constants.PSMS_FOR_PROJECT_SEARCH_IDS_SEARCH_CRITERIA_DOWNLOAD_CONTROLLER;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
	
	@Autowired
	private SearchHasScanDataForSearchIdSearcherIF searchHasScanDataForSearchIdSearcher;

	@Autowired
	private SearcherCutoffValues_Factory searcherCutoffValuesRootLevel_Factory;
	
	@Autowired
	private AnnotationTypeListForSearchIdSearcherIF annotationTypeListForSearchIdSearcher;

	@Autowired
	private ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service;

	@Autowired
	private ProteinVersionIdsFor_SearchID_ReportedPeptideId_SearcherIF proteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher;

	@Autowired
	private DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher;
	
	@Autowired
	private PeptideStringForSearchIdReportedPeptideIdSearcherIF peptideStringForSearchIdReportedPeptideIdSearcher;
	
	@Autowired
	private PsmWebDisplaySearcherIF psmWebDisplaySearcher;
	
	@Autowired
	private ScanFileDAO_IF scanFileDAO;
	
	@Autowired
	private Psm_FilterableAnnotationData_SearcherIF psm_FilterableAnnotationData_Searcher;
	
	@Autowired
	private Psm_DescriptiveAnnotationData_SearcherIF psm_DescriptiveAnnotationData_Searcher;
	
	@Autowired
	private Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice;
	
	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;

	/**
	 * @param postRequestParameters
	 * @param httpServletRequest
	 * @param httpServletResponse
	 */
	@PostMapping( CONTROLLER_PATH )
	public void controllerMainMethod(
			@ModelAttribute PostRequestParameters postRequestParameters, // Form Field Data In Request.  Parsed by Spring MVC into this object
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {
		
		if ( postRequestParameters == null ) {
			
			throw new LimelightInternalErrorException( "postRequestParameters == null" );
		}
		if ( StringUtils.isEmpty( postRequestParameters.requestJSONString ) ) {
			
			//  TODO Maybe do something different
			throw new LimelightInternalErrorException( "postRequestParameters.requestJSONString is empty" );
		}

		try {
			RequestJSONParsed webserviceRequest = unmarshalJSON_ToObject.getObjectFromJSONString( postRequestParameters.requestJSONString, RequestJSONParsed.class );

			List<Integer> projectSearchIds = webserviceRequest.getProjectSearchIds();

			if ( projectSearchIds == null || projectSearchIds.isEmpty() ) {
				log.warn( "No Project Search Ids" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			SearchDataLookupParamsRoot searchDataLookupParamsRoot = webserviceRequest.getSearchDataLookupParamsRoot();

			if ( searchDataLookupParamsRoot == null ) {
				log.warn( "No searchDataLookupParamsRoot" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			SearchDataLookupParams_For_ProjectSearchIds searchDataLookupParams_For_ProjectSearchIds = searchDataLookupParamsRoot.getParamsForProjectSearchIds();

			if ( searchDataLookupParams_For_ProjectSearchIds == null ) {
				log.warn( "No searchDataLookupParams_For_ProjectSearchIds" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			// optional
			Map<Integer,List<Integer>> reportedPeptideIdsPerProjectSearchId = webserviceRequest.getReportedPeptideIdsPerProjectSearchId(); 

			//  Validate that all Reported Peptide Ids are only for provide Project Search Ids
			if ( reportedPeptideIdsPerProjectSearchId != null ) {
				for ( Map.Entry<Integer,List<Integer>> entry : reportedPeptideIdsPerProjectSearchId.entrySet() ) {
					
					Integer projectSearchId_Key_reportedPeptideIdsPerProjectSearchId = entry.getKey();
					boolean found_projectSearchId_In_projectSearchIds = false;
					
					for ( Integer projectSearchId : projectSearchIds ) {
						if ( projectSearchId_Key_reportedPeptideIdsPerProjectSearchId.equals( projectSearchId ) ) {
							found_projectSearchId_In_projectSearchIds = true;
							break;
						}
					}
					if ( ! found_projectSearchId_In_projectSearchIds ) {
						String msg = "reportedPeptideIdsPerProjectSearchId populated but has projectSearchId not in projectSearchIds:" + projectSearchId_Key_reportedPeptideIdsPerProjectSearchId;
						log.warn(msg);
						throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
					}
				}
			}


			//  Validate PSM Annotation data for Ann Type Display is populated
			
			List<SearchDataLookupParams_For_Single_ProjectSearchId> paramsForProjectSearchIdsList = searchDataLookupParams_For_ProjectSearchIds.getParamsForProjectSearchIdsList();

			if ( paramsForProjectSearchIdsList == null || paramsForProjectSearchIdsList.isEmpty() ) {
				log.warn( "No paramsForProjectSearchIdsList" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
    		//  Validate that Project Search Ids provided are in paramsForProjectSearchIdsList

			for ( Integer projectSearchId : projectSearchIds ) {
	    		
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

			try {
				//  Comment out result since not use it
				//		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
				validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIds, httpServletRequest );

			} catch ( Limelight_WS_AuthError_Unauthorized_Exception e ) {

				//  TODO  No User session and not public project

				//  Forward to page stating No User Session

    			final String mainErrorPageControllerURL =
    					AA_DataDownloadControllersPaths_Constants.PATH_START_ALL 
    					+ AA_DataDownloadControllersPaths_Constants.NO_SESSION_NOT_PUBLIC_PROJECT_DOWNLOAD_CONTROLLER;

				log.error( "Limelight_WS_AuthError_Unauthorized_Exception: Forwarding to Error Msg Controller: " + mainErrorPageControllerURL
						+ ", exception.toString(): "+ e.toString() );

    			RequestDispatcher requestDispatcher = 
    					httpServletRequest.getServletContext().getRequestDispatcher( mainErrorPageControllerURL );

    			log.warn( "Limelight_WS_AuthError_Unauthorized_Exception: Forwarding to error msg page for no session. " );

    			requestDispatcher.forward( httpServletRequest, httpServletResponse );

				return;  //  EARLY EXIT
			}

    		Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
    		Map<Integer,Boolean> searchHasScanDataMap_Key_projectSearchId = new HashMap<>();
    		
    		for ( Integer projectSearchId : projectSearchIds ) {
    		
	    		Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
				if ( searchId == null ) {
					String msg = "No searchId for projectSearchId: " + projectSearchId;
					log.warn( msg );
	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				
				Boolean searchHasScanData = searchHasScanDataForSearchIdSearcher.getSearchHasScanDataForSearchId( searchId );
				if ( searchHasScanData == null ) {
					String msg = "No searchHasScanData for searchId: " + searchId;
					log.warn( msg );
	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				
	    		projectSearchIdMapToSearchId.put( projectSearchId, searchId );
	    		searchHasScanDataMap_Key_projectSearchId.put( projectSearchId, searchHasScanData );
    		}

    		SearcherCutoffValuesRootLevel searcherCutoffValuesRootLevel =
    				searcherCutoffValuesRootLevel_Factory
    				.createSearcherCutoffValuesRootLevel_From_WebserviceRequestCutoffs(
    						projectSearchIdMapToSearchId, 
    						searchDataLookupParamsRoot );
    						
    		//  Validate that Project Search Ids provided are in searcherCutoffValuesRootLevel

    		for ( Map.Entry<Integer,Integer> projectSearchIdMapToSearchIdEntry : projectSearchIdMapToSearchId.entrySet() ){
	    		
    			Integer projectSearchId = projectSearchIdMapToSearchIdEntry.getKey();
    			Integer searchId = projectSearchIdMapToSearchIdEntry.getValue();
    			
    			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel = searcherCutoffValuesRootLevel.getPerSearchCutoffs( projectSearchId );
    			
    			if ( searcherCutoffValuesSearchLevel == null ) {
					String msg = "No searcherCutoffValuesSearchLevel for projectSearchId: " + projectSearchId;
					log.warn( msg );
	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    			}
    		}
    		
    		
    		
    		//  Get Data for all the searches:
    		
    		// Create list to pass to writeOutputToResponse
    		List<WriteOutputToResponse_Per_SearchId> writeOutputToResponse_Per_SearchId_List = new ArrayList<>( projectSearchIdMapToSearchId.size() ); 
    		
    		for ( Map.Entry<Integer,Integer> projectSearchIdMapToSearchIdEntry : projectSearchIdMapToSearchId.entrySet() ){
	    		
    			Integer projectSearchId = projectSearchIdMapToSearchIdEntry.getKey();
    			Integer searchId = projectSearchIdMapToSearchIdEntry.getValue();
    			
    			Boolean searchHasScanData = searchHasScanDataMap_Key_projectSearchId.get( projectSearchId );
    			
    			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel = searcherCutoffValuesRootLevel.getPerSearchCutoffs( projectSearchId );
    			
    			SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchId = null;

    			for ( SearchDataLookupParams_For_Single_ProjectSearchId searchDataLookupParams_For_Single_ProjectSearchIdInList : paramsForProjectSearchIdsList ) { 
    				
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
    			
    			List<Integer> psmAnnTypeDisplay = searchDataLookupParams_For_Single_ProjectSearchId.getPsmAnnTypeDisplay();
    			
				//  All Ann Type for search id
				List<AnnotationTypeDTO> annotationTypeDTO_AllForSearchId = 
						annotationTypeListForSearchIdSearcher.getAnnotationTypeListForSearchId( searchId );
				
				//  Ann Type for display
				List<AnnotationTypeDTO> annotationTypeDTO_ForDisplayInOrder = new ArrayList<>( psmAnnTypeDisplay.size() );
				
				for ( Integer psmAnnTypeDisplayItem : psmAnnTypeDisplay ) {
					AnnotationTypeDTO annotationTypeDTO_ForDisplay = null;
					for ( AnnotationTypeDTO annotationTypeDTO_AllForSearchId_Item : annotationTypeDTO_AllForSearchId ) {
						if ( psmAnnTypeDisplayItem.intValue() == annotationTypeDTO_AllForSearchId_Item.getId() ) {
							annotationTypeDTO_ForDisplay = annotationTypeDTO_AllForSearchId_Item;
							break;
						}
					}
					if ( annotationTypeDTO_ForDisplay == null ) {
						String msg = "No Ann Type for id: " +  psmAnnTypeDisplayItem + " for searchId: " + searchId;
						log.warn( msg );
						throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
					}
					annotationTypeDTO_ForDisplayInOrder.add( annotationTypeDTO_ForDisplay );
				}
				
				
				//  Process reportedPeptideIds in request
				
				List<Integer> reportedPeptideIds = null;
				
				if ( reportedPeptideIdsPerProjectSearchId != null ) {

					reportedPeptideIds = reportedPeptideIdsPerProjectSearchId.get( projectSearchId );
				
				} else {
	
					//  Reported Peptide Ids not provided, get all for Project Search Id and Criteria
	
					final int minimumNumberOfPSMsPerReportedPeptide = 1; // TODO standard minimum # PSMs 
	
					//  Get initial Reported Peptide Id list (maybe include Num PSMs) based on search criteria
	
					List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> peptideMinimalObjectsList = 
							reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service
							.getPeptideDataList( searchId, searcherCutoffValuesSearchLevel, minimumNumberOfPSMsPerReportedPeptide );
	
					reportedPeptideIds = new ArrayList<>( peptideMinimalObjectsList.size() );
					
					for ( ReportedPeptide_MinimalData_List_FromSearcher_Entry entry : peptideMinimalObjectsList ) {
						reportedPeptideIds.add( entry.getReportedPeptideId() );
					}
				}
				
				
				List<PSMsForSingleReportedPeptideId> psmWebDisplayListForReportedPeptideIds = null;
				Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> mods_Key_ReportedPeptideId = null;

	    		Map<Integer, Map<Integer, SingleScan_SubResponse>> scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId = null;
	
				
				if ( reportedPeptideIds != null && ( ! reportedPeptideIds.isEmpty() ) ) {
					
					//  Have reportedPeptideIds for this Project Search Id
					
					if ( webserviceRequest.proteinSequenceVersionIds != null && ( ! webserviceRequest.proteinSequenceVersionIds.isEmpty() ) ) {
						
						//  If protein sequence version id restriction, filter Reported Peptide Ids to those protein sequence version ids
						
						List<Integer> reportedPeptideIdsFiltered = new ArrayList<>( reportedPeptideIds.size() );
						
						for ( Integer reportedPeptideId : reportedPeptideIds ) {
							List<Integer> proteinSequenceVersionIdsForReportedPeptideId =
									proteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher
									.getProteinVersionIdsFor_SearchID_ReportedPeptideId_Searcher( searchId, reportedPeptideId );
							
							for ( Integer proteinSequenceVersionId : webserviceRequest.proteinSequenceVersionIds ) {
								if ( proteinSequenceVersionIdsForReportedPeptideId.contains( proteinSequenceVersionId ) ) {
									reportedPeptideIdsFiltered.add( reportedPeptideId );
								}
								break;
							}
						}
						reportedPeptideIds = reportedPeptideIdsFiltered;
					}

					if ( reportedPeptideIds != null && ( ! reportedPeptideIds.isEmpty() ) ) {
						
						//  Have reportedPeptideIds for this Project Search Id and optional proteinSequenceVersionIds
								
						//  Get PSM core data for all Reported Peptide Ids
						
						psmWebDisplayListForReportedPeptideIds = new ArrayList<>( reportedPeptideIds.size() );
						
						for ( Integer reportedPeptideId : reportedPeptideIds ) {
							List<PsmWebDisplayWebServiceResult> psmWebDisplayList = 
									psmWebDisplaySearcher.getPsmsWebDisplay( searchId, reportedPeptideId, searcherCutoffValuesSearchLevel );
							PSMsForSingleReportedPeptideId psmsForSingleReportedPeptideId = new PSMsForSingleReportedPeptideId();
							psmsForSingleReportedPeptideId.reportedPeptideId = reportedPeptideId;
							psmsForSingleReportedPeptideId.psmWebDisplayList = psmWebDisplayList;
							psmWebDisplayListForReportedPeptideIds.add( psmsForSingleReportedPeptideId );
						}
						
						//  Get Mods for Reported Peptides
						
						DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result =
								modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher
								.getDynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIds( searchId, reportedPeptideIds );
						mods_Key_ReportedPeptideId =
								modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result.getResults_Key_ReportedPeptideId();
						
						//  Get Scan Data if search has scans
						
			    		if ( searchHasScanData ) {
			    			//  Get Scan Data from Spectral Storage Service
			    			scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId =
			    				getScanDataFromSpectralStorageService( psmWebDisplayListForReportedPeptideIds );
			    		}
			
						if ( searchHasScanData ) {
							
							//  Validate all PSMs have scan data
			
					 		for ( PSMsForSingleReportedPeptideId psmWebDisplayListForReportedPeptideIdsEntry : psmWebDisplayListForReportedPeptideIds ) {
					 			for ( PsmWebDisplayWebServiceResult psmWebDisplay : psmWebDisplayListForReportedPeptideIdsEntry.psmWebDisplayList ) {
			
					 				Map<Integer, SingleScan_SubResponse> scanData_KeyedOn_ScanNumber =
					 						scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId.get( psmWebDisplay.getScanFileId() );
					 				if ( scanData_KeyedOn_ScanNumber == null ) {
					 					String msg = "ScanFileId not found in lookup map: " + psmWebDisplay.getScanFileId();
					 					log.error(msg);
					 					throw new LimelightInternalErrorException(msg);
					 				}
					 				SingleScan_SubResponse scan = scanData_KeyedOn_ScanNumber.get( psmWebDisplay.getScanNumber() );
					 				if ( scan == null ) {
					 					String msg = "ScanNumber not found in lookup map: ScanNumber: " + psmWebDisplay.getScanNumber()
					 					+ ", ScanFileId: " + psmWebDisplay.getScanFileId();
					 					log.error(msg);
					 					throw new LimelightInternalErrorException(msg);
					 				}
					 			}
			    			}
						}
					}
				}
				
				WriteOutputToResponse_Per_SearchId writeOutputToResponse_Per_SearchId = new WriteOutputToResponse_Per_SearchId();
				
				writeOutputToResponse_Per_SearchId.searchId = searchId;
				writeOutputToResponse_Per_SearchId.searchHasScanData = searchHasScanData;
				writeOutputToResponse_Per_SearchId.annotationTypeDTO_ForDisplayInOrder = annotationTypeDTO_ForDisplayInOrder;
				writeOutputToResponse_Per_SearchId.psmWebDisplayListForReportedPeptideIds = psmWebDisplayListForReportedPeptideIds;
				writeOutputToResponse_Per_SearchId.mods_Key_ReportedPeptideId = mods_Key_ReportedPeptideId;
				writeOutputToResponse_Per_SearchId.scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId = scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId;
				
				writeOutputToResponse_Per_SearchId_List.add( writeOutputToResponse_Per_SearchId );
    		}
			
    		writeOutputToResponse(
    				writeOutputToResponse_Per_SearchId_List,
					httpServletResponse );
    		
		} catch ( Limelight_WS_AuthError_Unauthorized_Exception e ) {

			log.error( "Limelight_WS_AuthError_Unauthorized_Exception: " + e.toString(), e );

			//  TODO  No User session and not public project
			throw e;
			
		} catch ( Limelight_WS_AuthError_Forbidden_Exception e ) {

			log.error( "Limelight_WS_AuthError_Forbidden_Exception: " + e.toString(), e );

			//  TODO  User Auth Error
			throw e;
			
		} catch ( Exception e ) {
			
			log.error( "Exception: " + e.toString(), e );
			throw new RuntimeException();
		}
	}

	/**
	 * Get Scan Data from Spectral Storage Service
	 * 
	 * @param searchHasScanData
	 * @param psmWebDisplayList
	 * @param scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId
	 * @throws SQLException
	 * @throws Exception
	 */
	private Map<Integer, Map<Integer, SingleScan_SubResponse>> getScanDataFromSpectralStorageService(
			List<PSMsForSingleReportedPeptideId> psmWebDisplayListForReportedPeptideIds )
					throws SQLException, Exception {

 		Map<Integer, Map<Integer, SingleScan_SubResponse>> scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId = new HashMap<>();
			
 		//  Get Scan Info from Spectral Storage Service

 		//   First get scan file ids and assoc scan numbers


 		Map<Integer, Set<Integer>> scanNumbers_KeyedOn_ScanFileId = new HashMap<>();

 		for ( PSMsForSingleReportedPeptideId psmWebDisplayListForReportedPeptideIdsEntry : psmWebDisplayListForReportedPeptideIds ) {
 			for ( PsmWebDisplayWebServiceResult psmWebDisplay : psmWebDisplayListForReportedPeptideIdsEntry.psmWebDisplayList ) {

 				Integer scanFileId = psmWebDisplay.getScanFileId();
 				Integer scanNumber = psmWebDisplay.getScanNumber();
 				if ( scanFileId != null && scanNumber != null ) {
 					Set<Integer> scanNumbers = scanNumbers_KeyedOn_ScanFileId.get( scanFileId );
 					if ( scanNumbers == null ) {
 						scanNumbers = new HashSet<>();
 						scanNumbers_KeyedOn_ScanFileId.put( scanFileId, scanNumbers );
 					}
 					scanNumbers.add( scanNumber );
 				}
 			}
 		}

 		for ( Map.Entry<Integer, Set<Integer>> entry : scanNumbers_KeyedOn_ScanFileId.entrySet() ) {

 			Integer scanFileId = entry.getKey();
 			Set<Integer> scanNumbersSet = entry.getValue();

 			String scanFileAPIKey = scanFileDAO.getSpectralStorageAPIKeyById( scanFileId );
 			if ( StringUtils.isEmpty( scanFileAPIKey ) ) {
 				String msg = "No value for scanFileAPIKey for scan file id: " + scanFileId;
 				log.error( msg );
 				throw new LimelightInternalErrorException( msg );
 			}

 			List<Integer> scanNumbersList = new ArrayList<>( scanNumbersSet );

 			List<SingleScan_SubResponse> scans = 
 					call_Get_ScanDataFromScanNumbers_SpectralStorageWebservice
 					.getScanDataFromSpectralStorageService(
 							scanNumbersList, 
 							Get_ScanDataFromScanNumbers_IncludeParentScans.NO,
 							Get_ScanData_ExcludeReturnScanPeakData.YES,
 							scanFileAPIKey );

 			Set<Integer> scanNumbersSetForConfirmRetrieved = new HashSet<>( scanNumbersSet );

 			Map<Integer, SingleScan_SubResponse> scanData_KeyedOn_ScanNumber = new HashMap<>();

 			for ( SingleScan_SubResponse scan : scans ) {
 				Integer scanNumber = scan.getScanNumber();
 				scanData_KeyedOn_ScanNumber.put( scanNumber, scan );
 				//  Validate all scan numbers found:
 				if( ! scanNumbersSetForConfirmRetrieved.remove( scanNumber ) ) {
 					String msg = "Scan number in result but not in request or is in result more than once: scanNumber: " + scanNumber
 							+ ", scanFileId: " + scanFileId;
 					log.error(msg);
 					throw new LimelightInternalErrorException(msg);
 				}
 			}

 			if ( ! scanNumbersSetForConfirmRetrieved.isEmpty() ) {
 				String msg = "Scan numbers are in request but not in result: scanFileId: " + scanFileId
 						+ ", Scan numbers are in request but not in result: " + scanNumbersSetForConfirmRetrieved;
 				log.error(msg);
 				throw new LimelightInternalErrorException(msg);
 			}

 			scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId.put( scanFileId, scanData_KeyedOn_ScanNumber );
 		}

		return scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId;
	}

	/**
	 * @param writeOutputToResponse_Per_SearchId_List
	 * @param httpServletResponse
	 * @throws Exception
	 */
	private void writeOutputToResponse(
			List<WriteOutputToResponse_Per_SearchId> writeOutputToResponse_Per_SearchId_List,
			HttpServletResponse httpServletResponse )
			throws Exception {

		// generate file name
		
		List<Integer> searchIds = new ArrayList<>( writeOutputToResponse_Per_SearchId_List.size() );
		
		for ( WriteOutputToResponse_Per_SearchId writeOutputToResponse_For_SearchId : writeOutputToResponse_Per_SearchId_List ) {
			searchIds.add( writeOutputToResponse_For_SearchId.searchId );
		}

        //Get current date time
        LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String nowFormatted = now.format( dateTimeFormatter );
		
		String filename = "limelight-psms-searches-" 
				+ StringUtils.join( searchIds, '-' )
				+ "-" + nowFormatted
				+ ".txt";
		

		
		
		httpServletResponse.setContentType("application/x-download");
		httpServletResponse.setHeader("Content-Disposition", "attachment; filename=" + filename);
		

		OutputStreamWriter writer = null;
		try {

			ServletOutputStream out = httpServletResponse.getOutputStream();
			BufferedOutputStream bos = new BufferedOutputStream(out);
			writer = new OutputStreamWriter( bos , DownloadsCharacterSetConstant.DOWNLOAD_CHARACTER_SET );
			//  Write header line
			writer.write( "SEARCH ID\tSCAN NUMBER\tPEPTIDE\tMODS" ); // 
			writer.write( "\tCHARGE\tOBSERVED M/Z\tRETENTION TIME (MINUTES)\tSCAN FILENAME" );
			
			for ( WriteOutputToResponse_Per_SearchId writeOutputToResponse_For_SearchId : writeOutputToResponse_Per_SearchId_List ) {

				int searchId = writeOutputToResponse_For_SearchId.searchId;
				List<AnnotationTypeDTO> annotationTypeDTO_ForDisplayInOrder = writeOutputToResponse_For_SearchId.annotationTypeDTO_ForDisplayInOrder;
				
				for ( AnnotationTypeDTO psmAnnotationTypeDTO : annotationTypeDTO_ForDisplayInOrder ) {
					writer.write( "\t" );
					writer.write( psmAnnotationTypeDTO.getName() );
					writer.write( "(SEARCH ID: " );
					writer.write( String.valueOf( searchId ) );
					writer.write( ")" );
				}
			}
			
			writer.write( "\n" );

			for ( int listIndexCurrentlyOutputting = 0; listIndexCurrentlyOutputting < writeOutputToResponse_Per_SearchId_List.size(); listIndexCurrentlyOutputting++ ) {
	
				WriteOutputToResponse_Per_SearchId writeOutputToResponse_For_SearchId = writeOutputToResponse_Per_SearchId_List.get( listIndexCurrentlyOutputting );
				
				int searchId = writeOutputToResponse_For_SearchId.searchId;
				Boolean searchHasScanData = writeOutputToResponse_For_SearchId.searchHasScanData; 
				List<AnnotationTypeDTO> annotationTypeDTO_ForDisplayInOrder = writeOutputToResponse_For_SearchId.annotationTypeDTO_ForDisplayInOrder;
				List<PSMsForSingleReportedPeptideId> psmWebDisplayListForReportedPeptideIds = writeOutputToResponse_For_SearchId.psmWebDisplayListForReportedPeptideIds;
				Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> mods_Key_ReportedPeptideId = writeOutputToResponse_For_SearchId.mods_Key_ReportedPeptideId;
				Map<Integer, Map<Integer, SingleScan_SubResponse>> scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId = writeOutputToResponse_For_SearchId.scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId;
	
				Set<Integer> annTypeIdsToRetrieve = new HashSet<>();
				
				for ( AnnotationTypeDTO annItem : annotationTypeDTO_ForDisplayInOrder ) {
					annTypeIdsToRetrieve.add( annItem.getId() );
				}
				
				if ( psmWebDisplayListForReportedPeptideIds != null && ( ! psmWebDisplayListForReportedPeptideIds.isEmpty() ) ) {
				
					for ( PSMsForSingleReportedPeptideId psmWebDisplayListForReportedPeptideIdsEntry : psmWebDisplayListForReportedPeptideIds ) {

						//  Get Peptide String and Mods for Reported Peptide Id

						Integer reportedPeptideId = psmWebDisplayListForReportedPeptideIdsEntry.reportedPeptideId;

						String peptideString =
								peptideStringForSearchIdReportedPeptideIdSearcher
								.getPeptideSequenceStringForSearchIdReportedPeptideId( searchId, reportedPeptideId );

						if ( peptideString == null ) {
							String msg = "Peptide String not found for searchId: " + searchId + ", reportedPeptideId: " + reportedPeptideId;
							log.error(msg);
							throw new LimelightInternalErrorException(msg);
						}

						String modString = null;
						
						if ( mods_Key_ReportedPeptideId != null ) {

							List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item> modsList = mods_Key_ReportedPeptideId.get( reportedPeptideId );
							if ( modsList == null || modsList.isEmpty() ) {
								modString = "";
							} else {
								Collections.sort( modsList, new Comparator<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>() {
									@Override
									public int compare(DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item o1,
											DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item o2) {
										if ( o1.getPosition() < o2.getPosition() ) {
											return -1;
										}
										if ( o1.getPosition() > o2.getPosition() ) {
											return 1;
										}
										return 0;
									}
								});
								StringBuilder modStringSB = new StringBuilder( 1000 );
								for ( DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item mod : modsList ) {
									if ( modStringSB.length() != 0 ) {
										modStringSB.append( "," );
									}
									modStringSB.append( mod.getPosition() );
									modStringSB.append( "(" );
									modStringSB.append( mod.getMass() );
									modStringSB.append( ")" );
								}
								modString = modStringSB.toString();
							}
						}

						//  Process PSMs

						for ( PsmWebDisplayWebServiceResult psmWebDisplay : psmWebDisplayListForReportedPeptideIdsEntry.psmWebDisplayList ) {

							writer.write( String.valueOf( searchId ) );
							writer.write( "\t" );
							writer.write( String.valueOf( psmWebDisplay.getScanNumber() ) );
							writer.write( "\t" );
							writer.write( peptideString );
							writer.write( "\t" );
							writer.write( modString );
							writer.write( "\t" );

							writer.write( String.valueOf( psmWebDisplay.getCharge() ) );

							if ( ! searchHasScanData ) {

								writer.write( "\t\t" );
							} else {

								Map<Integer, SingleScan_SubResponse> scanData_KeyedOn_ScanNumber =
										scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId.get( psmWebDisplay.getScanFileId() );
								if ( scanData_KeyedOn_ScanNumber == null ) {
									String msg = "ScanFileId not found in lookup map: " 
											+ psmWebDisplay.getScanFileId()
											+ ", search id: " + searchId;
									log.error(msg);
									throw new LimelightInternalErrorException(msg);
								}
								SingleScan_SubResponse scan = scanData_KeyedOn_ScanNumber.get( psmWebDisplay.getScanNumber() );
								if ( scan == null ) {
									String msg = "ScanNumber not found in lookup map: ScanNumber: " 
											+ psmWebDisplay.getScanNumber()
											+ ", ScanFileId: " + psmWebDisplay.getScanFileId()
											+ ", search id: " + searchId;
									log.error(msg);
									throw new LimelightInternalErrorException(msg);
								}

								writer.write( "\t" );
								writer.write( String.valueOf( scan.getPrecursor_M_Over_Z() ) );

								writer.write( "\t" );
								writer.write( String.valueOf( ( scan.getRetentionTime() / 60 ) ) );

							}

							writer.write( "\t" );
							if ( psmWebDisplay.getScanFilename() != null ) {
								writer.write( psmWebDisplay.getScanFilename() );
							}

							Map<Integer, AnnotationDataItem_ForPage> psmAnnotationMap = new HashMap<>();

							//   TODO  Optimize this
							{
								//  Add in PSM Annotation data for Ann Type Display
								{
									//  Filterable Ann Types
									List<PsmFilterableAnnotationDTO> psmFilterableAnnotationDTOList =
											psm_FilterableAnnotationData_Searcher
											.getPsmFilterableAnnotationDTOList( 
													psmWebDisplay.getPsmId(), annTypeIdsToRetrieve );

									for ( PsmFilterableAnnotationDTO item : psmFilterableAnnotationDTOList ) {

										AnnotationDataItem_ForPage annotationDataItem_ForPage = new AnnotationDataItem_ForPage();
										annotationDataItem_ForPage.setAnnotationTypeId( item.getAnnotationTypeId() );
										annotationDataItem_ForPage.setValueString( item.getValueString() );
										annotationDataItem_ForPage.setValueDouble( item.getValueDouble() );
										psmAnnotationMap.put( item.getAnnotationTypeId(), annotationDataItem_ForPage );
									}
								}

								{
									//  Descriptive Ann Types
									List<PsmDescriptiveAnnotationDTO> psmDescriptiveAnnotationDTOList =
											psm_DescriptiveAnnotationData_Searcher
											.getPsmDescriptiveAnnotationDTOList( 
													psmWebDisplay.getPsmId(),  annTypeIdsToRetrieve );

									for ( PsmDescriptiveAnnotationDTO item : psmDescriptiveAnnotationDTOList ) {

										AnnotationDataItem_ForPage annotationDataItem_ForPage = new AnnotationDataItem_ForPage();
										annotationDataItem_ForPage.setAnnotationTypeId( item.getAnnotationTypeId() );
										annotationDataItem_ForPage.setValueString( item.getValueString() );
										psmAnnotationMap.put( item.getAnnotationTypeId(), annotationDataItem_ForPage );
									}
								}

								//  Write empty \t for searches before

								for ( int listIndexWriteEmpty = 0; listIndexWriteEmpty < listIndexCurrentlyOutputting; listIndexWriteEmpty++ ) {

									WriteOutputToResponse_Per_SearchId writeOutputToResponseEntry_OtherEntry = writeOutputToResponse_Per_SearchId_List.get( listIndexWriteEmpty );

									int annotationTypeDTO_ForDisplayInOrderSize = writeOutputToResponseEntry_OtherEntry.annotationTypeDTO_ForDisplayInOrder.size();

									for ( int counter = 0; counter < annotationTypeDTO_ForDisplayInOrderSize; counter++ ) {
										writer.write( "\t" );
										//  For debugging
										// writer.write( "EMPTY_Other Search Id: " );
										// writer.write( String.valueOf( writeOutputToResponseEntry_OtherEntry.searchId ) );
									}
								}

								//  Write the data for the search being processed

								for ( AnnotationTypeDTO annotationTypeDTO : annotationTypeDTO_ForDisplayInOrder ) {

									AnnotationDataItem_ForPage annotationDataItem_ForPage = psmAnnotationMap.get( annotationTypeDTO.getId() );
									if ( annotationDataItem_ForPage == null ) {
										String msg = "Ann Data not found for Ann Type Id: " + annotationTypeDTO.getId()
										+ ", psm id: " + psmWebDisplay.getPsmId()
										+ ", search id: " + searchId;
										log.error(msg);
										throw new LimelightInternalErrorException(msg);
									}
									writer.write( "\t" );
									writer.write( annotationDataItem_ForPage.getValueString() );
								}

								//  Write empty \t for searches after

								for ( int listIndexWriteEmpty = listIndexCurrentlyOutputting + 1; listIndexWriteEmpty < writeOutputToResponse_Per_SearchId_List.size(); listIndexWriteEmpty++ ) {

									WriteOutputToResponse_Per_SearchId writeOutputToResponseEntry_OtherEntry = writeOutputToResponse_Per_SearchId_List.get( listIndexWriteEmpty );

									int annotationTypeDTO_ForDisplayInOrderSize = writeOutputToResponseEntry_OtherEntry.annotationTypeDTO_ForDisplayInOrder.size();

									for ( int counter = 0; counter < annotationTypeDTO_ForDisplayInOrderSize; counter++ ) {
										writer.write( "\t" );
										//  For debugging
										// writer.write( "EMPTY_Other Search Id: " );
										// writer.write( String.valueOf( writeOutputToResponseEntry_OtherEntry.searchId ) );
									}								
								}
							}

							writer.write( "\n" );
						}
					}
				}
			}

		} finally {
			try {
				if ( writer != null ) {
					writer.close();
				}
			} catch ( Exception ex ) {
				log.error( "writer.close():Exception " + ex.toString(), ex );
			}
			try {
				httpServletResponse.flushBuffer();
			} catch ( Exception ex ) {
				log.error( "httpServletResponse.flushBuffer():Exception " + ex.toString(), ex );
			}
		}
	}
	

	/**
	 * Internal PSMs for Single Reported Peptide Id
	 */
	private static class PSMsForSingleReportedPeptideId {

		private Integer reportedPeptideId;
		
		private List<PsmWebDisplayWebServiceResult> psmWebDisplayList;
	}

	/**
	 * Internal Data for writeOutputToResponse Per Search Id
	 */
	private static class WriteOutputToResponse_Per_SearchId {

		int searchId;
		Boolean searchHasScanData; 
		List<AnnotationTypeDTO> annotationTypeDTO_ForDisplayInOrder;
		List<PSMsForSingleReportedPeptideId> psmWebDisplayListForReportedPeptideIds;
		Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> mods_Key_ReportedPeptideId;
		Map<Integer, Map<Integer, SingleScan_SubResponse>> scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId;
	}
	
	////////////////

	/**
	 * Form Field Data In Request.  Parsed by Spring MVC into this object
	 */
	public static class PostRequestParameters {
		
		private String requestJSONString; //  Form Parameter Name.  JSON encoded data

		public String getRequestJSONString() {
			return requestJSONString;
		}
		public void setRequestJSONString(String requestJSONString) {
			this.requestJSONString = requestJSONString;
		}
	}
	

	/**
	 * Request JSON Parsed representation
	 */
	public static class RequestJSONParsed {

		private List<Integer> projectSearchIds;
		
		private SearchDataLookupParamsRoot searchDataLookupParamsRoot;
		
		private Map<Integer,List<Integer>> reportedPeptideIdsPerProjectSearchId; // optional
		private List<Integer> proteinSequenceVersionIds; // optional
		
		public List<Integer> getProjectSearchIds() {
			return projectSearchIds;
		}
		public void setProjectSearchIds(List<Integer> projectSearchIds) {
			this.projectSearchIds = projectSearchIds;
		}
		public Map<Integer, List<Integer>> getReportedPeptideIdsPerProjectSearchId() {
			return reportedPeptideIdsPerProjectSearchId;
		}
		public void setReportedPeptideIdsPerProjectSearchId(Map<Integer, List<Integer>> reportedPeptideIdsPerProjectSearchId) {
			this.reportedPeptideIdsPerProjectSearchId = reportedPeptideIdsPerProjectSearchId;
		}
		public List<Integer> getProteinSequenceVersionIds() {
			return proteinSequenceVersionIds;
		}
		public void setProteinSequenceVersionIds(List<Integer> proteinSequenceVersionIds) {
			this.proteinSequenceVersionIds = proteinSequenceVersionIds;
		}
		public SearchDataLookupParamsRoot getSearchDataLookupParamsRoot() {
			return searchDataLookupParamsRoot;
		}
		public void setSearchDataLookupParamsRoot(SearchDataLookupParamsRoot searchDataLookupParamsRoot) {
			this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
		}
		
	}
}
