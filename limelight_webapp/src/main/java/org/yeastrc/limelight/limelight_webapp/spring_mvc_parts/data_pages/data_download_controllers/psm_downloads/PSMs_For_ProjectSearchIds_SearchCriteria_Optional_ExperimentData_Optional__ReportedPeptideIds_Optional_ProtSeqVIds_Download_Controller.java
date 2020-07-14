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
import java.math.BigDecimal;
import java.math.RoundingMode;
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
import org.yeastrc.limelight.limelight_shared.dto.SearchProgramsPerSearchDTO;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesRootLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.dao.ScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Forbidden_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.objects.SearchItemMinimal;
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
import org.yeastrc.limelight.limelight_webapp.searchers.ReporterIonMasses_PsmLevel_ForPsmIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchHasScanDataForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchMinimalForProjectSearchIdSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchProgramsPerSearchListForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.ReporterIonMasses_PsmLevel_ForPsmIds_Searcher.ReporterIonMasses_PsmLevel_ForPsmIds_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers_results.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmWebDisplayWebServiceResult;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services.ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.data_download_controllers.AA_DataDownloadControllersPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.data_download_controllers.DownloadsCharacterSetConstant;
import org.yeastrc.limelight.limelight_webapp.web_utils.SearchNameReturnDefaultIfNull;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanDataFromScanNumbers_IncludeParentScans;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_ExcludeReturnScanPeakData;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScan_SubResponse;

/**
 * New PSM Download Controller
 * 
 * Download PSMs for Project Search Ids And Search Criteria (searchDataLookupParams_For_Single_ProjectSearchId)
 * 
 * Optional Reported Peptide Ids per Project Search Id - Use Provided reported Peptide Ids and not query for them 
 *    (Performance is better if provided)
 *    
 * Optional Protein Sequence Version Ids - restrict reported Peptide Ids to Provided Protein Sequence Version Ids
 * 
 * Optional Experiment Data for Mapping of Search Id to Condition Group label / Condition label information 
 * 
 * See class PostRequestParameters below for Form Field Name
 */
@Controller
public class PSMs_For_ProjectSearchIds_SearchCriteria_Optional_ExperimentData_Optional__ReportedPeptideIds_Optional_ProtSeqVIds_Download_Controller {

	private static final Logger log = LoggerFactory.getLogger( PSMs_For_ProjectSearchIds_SearchCriteria_Optional_ExperimentData_Optional__ReportedPeptideIds_Optional_ProtSeqVIds_Download_Controller.class );
	
	private static final String CONTROLLER_PATH =
			AA_DataDownloadControllersPaths_Constants.PATH_START_ALL
			+ AA_DataDownloadControllersPaths_Constants.PSMS_FOR_PROJECT_SEARCH_IDS_SEARCH_CRITERIA_OPTIONAL_EXPERIMENT_DATA_DOWNLOAD_CONTROLLER;
	

	private static final int MINIMUM_NUMBER_OF_PSMS_PER_REPORTED_PEPTIDE = 1; // TODO standard minimum # PSMs 

	
	private static final int RETENTION_TIME_SECONDS_TO_MINUTES_DIVISOR = 60;
	private static final BigDecimal RETENTION_TIME_SECONDS_TO_MINUTES_DIVISOR_BD = new BigDecimal( RETENTION_TIME_SECONDS_TO_MINUTES_DIVISOR );

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
	
	@Autowired
	private SearchMinimalForProjectSearchIdSearcher_IF searchMinimalForProjectSearchIdSearcher;

	@Autowired
	private SearchNameReturnDefaultIfNull searchNameReturnDefaultIfNull;
	
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
	private SearchProgramsPerSearchListForSearchIdSearcherIF searchProgramsPerSearchListForSearchIdSearcher;
	
	@Autowired
	private ReporterIonMasses_PsmLevel_ForPsmIdSearcherIF reporterIonMasses_PsmLevel_ForPsmIds_Searcher;
	
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

			List<RequestJSONParsed_PerProjectSearchId> projectSearchIdsReportedPeptideIdsPsmIds = webserviceRequest.projectSearchIdsReportedPeptideIdsPsmIds;

			if ( projectSearchIdsReportedPeptideIdsPsmIds == null || projectSearchIdsReportedPeptideIdsPsmIds.isEmpty() ) {
				log.warn( "No projectSearchIdsReportedPeptideIdsPsmIds entries" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			List<Integer> proteinSequenceVersionIds = webserviceRequest.proteinSequenceVersionIds;
			
			Integer experimentId = webserviceRequest.experimentId; // Optional for when Experiment
			
			List<Integer> projectSearchIds = new ArrayList<>( projectSearchIdsReportedPeptideIdsPsmIds.size() );
			
			for ( RequestJSONParsed_PerProjectSearchId entry : projectSearchIdsReportedPeptideIdsPsmIds ) {
				if ( entry.projectSearchId == null ) {
					log.warn( "No Project Search Id in projectSearchIdsReportedPeptideIdsPsmIds entry" );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				projectSearchIds.add( entry.projectSearchId );
				
				if ( proteinSequenceVersionIds != null ) {
					//  Have proteinSequenceVersionIds so cannot have reportedPeptideIdsAndTheirPsmIds
					if ( entry.reportedPeptideIdsAndTheirPsmIds != null ) {
						log.warn( "In projectSearchIdsReportedPeptideIdsPsmIds entry, proteinSequenceVersionIds is populated so entry.reportedPeptideIdsAndTheirPsmIds being populated is not allowed " );
						throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
					}
				}
				if ( entry.reportedPeptideIdsAndTheirPsmIds != null ) {
					for ( RequestJSONParsed_PerReportedPeptideId reportedPeptideIdAndItsPsmIds : entry.reportedPeptideIdsAndTheirPsmIds ) {
						Integer reportedPeptideId = reportedPeptideIdAndItsPsmIds.reportedPeptideId;
						if ( reportedPeptideId == null ) {
							log.warn( "In projectSearchIdsReportedPeptideIdsPsmIds entry, reportedPeptideId == null" );
							throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
						}
					}
				}
			}

			if ( experimentId != null ) {

				//  Is for Experiment

				//  Is for Experiment, validate that 
				//      List<RequestJSONParsed_PerConditionGroupConditionData> experimentDataForSearch
				//  is the same length and has same Condition Group Labels in all entries
				
				List<RequestJSONParsed_PerConditionGroupConditionData> first_experimentDataForSearch = null; 
				
				for ( RequestJSONParsed_PerProjectSearchId entry : projectSearchIdsReportedPeptideIdsPsmIds ) {
				//  Have experimentId so must have experimentDataForSearch
					if ( entry.experimentDataForSearch == null ) {
						log.error( "In projectSearchIdsReportedPeptideIdsPsmIds entry, experimentId is populated so experimentDataForSearch must populated " );
						throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
					}
	
					//  Is for Experiment, validate that 
					//      List<RequestJSONParsed_PerConditionGroupConditionData> experimentDataForSearch
					//  is the same length and has same Condition Group Labels in all entries
					
					if ( first_experimentDataForSearch == null ) {
						first_experimentDataForSearch = entry.experimentDataForSearch; //  First entry to save it
					} else {
						//  Not first entry so compare it
						if ( entry.experimentDataForSearch.size() != first_experimentDataForSearch.size() ) {
							log.error( "In projectSearchIdsReportedPeptideIdsPsmIds entry, experimentDataForSearch.size() does not match first_experimentDataForSearch.size() " );
							throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
						}
		
						for ( int index = 0; index <  first_experimentDataForSearch.size(); index++ ) {
							RequestJSONParsed_PerConditionGroupConditionData first_experimentDataForSearch_Entry = first_experimentDataForSearch.get( index );
							RequestJSONParsed_PerConditionGroupConditionData experimentDataForSearch_Entry = entry.experimentDataForSearch.get( index );
							if ( ! first_experimentDataForSearch_Entry.conditionGroupLabel.equals( experimentDataForSearch_Entry.conditionGroupLabel ) ) {
								log.error( "In projectSearchIdsReportedPeptideIdsPsmIds entry, first_experimentDataForSearch_Entry.conditionGroupLabel != experimentDataForSearch_Entry.conditionGroupLabel " );
								throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
							}
						}
					}
				}
			}

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

    		//  END Auth
    		
    		/////////////////////

    		Map<Integer,Integer> projectSearchIdMapToSearchId = new HashMap<>();
    		Map<Integer, SearchItemMinimal> searchItemMinimal_Key_projectSearchId = new HashMap<>();
    		Map<Integer,Boolean> searchHasScanDataMap_Key_projectSearchId = new HashMap<>();
    		
    		for ( Integer projectSearchId : projectSearchIds ) {
    		
	    		Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
				if ( searchId == null ) {
					String msg = "No searchId for projectSearchId: " + projectSearchId;
					log.warn( msg );
	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				
				SearchItemMinimal searchItemMinimal = searchMinimalForProjectSearchIdSearcher.getSearchListForProjectSearchId( projectSearchId );
				if ( searchItemMinimal == null ) {
					String msg = "No searchItemMinimal for projectSearchId: " + projectSearchId;
					log.warn( msg );
	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				searchItemMinimal_Key_projectSearchId.put( projectSearchId, searchItemMinimal );
				
				Boolean searchHasScanData = searchHasScanDataForSearchIdSearcher.getSearchHasScanDataForSearchId( searchId );
				if ( searchHasScanData == null ) {
					String msg = "No searchHasScanData for searchId: " + searchId;
					log.warn( msg );
	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				
	    		projectSearchIdMapToSearchId.put( projectSearchId, searchId );
	    		searchHasScanDataMap_Key_projectSearchId.put( projectSearchId, searchHasScanData );
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
    		
    		//  Get Data for all the searches:
    		
    		// Create list to pass to writeOutputToResponse
    		List<WriteOutputToResponse_Per_SearchId> writeOutputToResponse_Per_SearchId_List = new ArrayList<>( projectSearchIdMapToSearchId.size() ); 
    		
    		for ( RequestJSONParsed_PerProjectSearchId singleprojectSearchId_ReportedPeptideIdsPsmIds : projectSearchIdsReportedPeptideIdsPsmIds ) {
    		
    			WriteOutputToResponse_Per_SearchId writeOutputToResponse_Per_SearchId =
    					create_WriteOutputToResponse_Per_SearchId__For_SingleSearch(
    							webserviceRequest, 
    							paramsForProjectSearchIdsList, 
    							projectSearchIdMapToSearchId,
    							searchHasScanDataMap_Key_projectSearchId, searcherCutoffValuesRootLevel,
    							singleprojectSearchId_ReportedPeptideIdsPsmIds );
    			
    			writeOutputToResponse_Per_SearchId_List.add( writeOutputToResponse_Per_SearchId );
    		}
			
    		writeOutputToResponse(
    				experimentId,
    				searchItemMinimal_Key_projectSearchId,
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
	
	////////////////////
	////////////////////
	////////////////////

	//  create WriteOutputToResponse_Per_SearchId  For Single Search
	
	/**
	 * @param webserviceRequest
	 * @param paramsForProjectSearchIdsList
	 * @param projectSearchIdMapToSearchId
	 * @param searchHasScanDataMap_Key_projectSearchId
	 * @param searcherCutoffValuesRootLevel
	 * @param singleprojectSearchId_ReportedPeptideIdsPsmIds
	 * @return
	 * @throws SQLException
	 * @throws Exception
	 */
	private WriteOutputToResponse_Per_SearchId create_WriteOutputToResponse_Per_SearchId__For_SingleSearch(
			
			RequestJSONParsed webserviceRequest,
			List<SearchDataLookupParams_For_Single_ProjectSearchId> paramsForProjectSearchIdsList,
			Map<Integer, Integer> projectSearchIdMapToSearchId,
			Map<Integer, Boolean> searchHasScanDataMap_Key_projectSearchId,
			SearcherCutoffValuesRootLevel searcherCutoffValuesRootLevel,
			RequestJSONParsed_PerProjectSearchId singleprojectSearchId_ReportedPeptideIdsPsmIds )
			throws SQLException, Exception {
		
		Integer projectSearchId = singleprojectSearchId_ReportedPeptideIdsPsmIds.projectSearchId;
		Integer searchId = projectSearchIdMapToSearchId.get( projectSearchId );
		
		if ( searchId == null ) {
			String msg = "searchId == null for projectSearchId: " + projectSearchId;
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}
		
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
		List<AnnotationTypeDTO> annotationTypeDTO_AllForSearchId = annotationTypeListForSearchIdSearcher.getAnnotationTypeListForSearchId( searchId );
		
		//  Ann Type for display
		Map<Integer, AnnotationTypeDTO> annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId = new HashMap<>();
		
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
			annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId.put( annotationTypeDTO_ForDisplay.getId(), annotationTypeDTO_ForDisplay );
		}
		

		List<PSMsForSingleReportedPeptideId> psmWebDisplayListForReportedPeptideIds = null;
		Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> mods_Key_ReportedPeptideId = null;

		Map<Integer, Map<Integer, SingleScan_SubResponse>> scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId = null;

		//  Passed from client - Optional
		List<RequestJSONParsed_PerReportedPeptideId> reportedPeptideIdsAndTheirPsmIds = singleprojectSearchId_ReportedPeptideIdsPsmIds.reportedPeptideIdsAndTheirPsmIds;
		
		//  Process reportedPeptideIds in request, or retrieve reportedPeptideIds for cutoffs and Process
		
		List<Integer> reportedPeptideIds_ForAdditionalProcessing = null;
		
		if ( reportedPeptideIdsAndTheirPsmIds != null ) {

			// Process reportedPeptideIds and possibly their PSMs in request
			
			//  Have reportedPeptideIds from client for this Project Search Id to process

			//  Get PSM core data for all Reported Peptide Ids

			reportedPeptideIds_ForAdditionalProcessing = new ArrayList<>( reportedPeptideIdsAndTheirPsmIds.size() );
			
			psmWebDisplayListForReportedPeptideIds = new ArrayList<>( reportedPeptideIdsAndTheirPsmIds.size() );

			for ( RequestJSONParsed_PerReportedPeptideId reportedPeptideIdAndItsPsmIds : reportedPeptideIdsAndTheirPsmIds ) {
				
				Integer reportedPeptideId = reportedPeptideIdAndItsPsmIds.reportedPeptideId;
				List<Long> psmIds = reportedPeptideIdAndItsPsmIds.psmIds;
				
				reportedPeptideIds_ForAdditionalProcessing.add( reportedPeptideId );
				
				List<PsmWebDisplayWebServiceResult> psmWebDisplayList = 
						psmWebDisplaySearcher.getPsmsWebDisplay( 
								searchId, 
								reportedPeptideId, 
								psmIds, 
								searcherCutoffValuesSearchLevel );
				
				populateReporterIonMassesForPSMs( psmWebDisplayList );
				
				PSMsForSingleReportedPeptideId psmsForSingleReportedPeptideId = new PSMsForSingleReportedPeptideId();
				psmsForSingleReportedPeptideId.reportedPeptideId = reportedPeptideId;
				psmsForSingleReportedPeptideId.psmWebDisplayList = psmWebDisplayList;
				psmWebDisplayListForReportedPeptideIds.add( psmsForSingleReportedPeptideId );
			}

		} else {

			//  Reported Peptide Ids not provided, get all for Project Search Id and Criteria

			//   retrieve reportedPeptideIds for cutoffs and Process
		
			//  Get initial Reported Peptide Id list (maybe include Num PSMs) based on search criteria

			List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> peptideMinimalObjectsList = 
					reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service
					.getPeptideDataList( searchId, searcherCutoffValuesSearchLevel, MINIMUM_NUMBER_OF_PSMS_PER_REPORTED_PEPTIDE );

			reportedPeptideIds_ForAdditionalProcessing = new ArrayList<>( peptideMinimalObjectsList.size() );
			
			for ( ReportedPeptide_MinimalData_List_FromSearcher_Entry entry : peptideMinimalObjectsList ) {
				reportedPeptideIds_ForAdditionalProcessing.add( entry.getReportedPeptideId() );
			}
			
			if ( webserviceRequest.proteinSequenceVersionIds != null && ( ! webserviceRequest.proteinSequenceVersionIds.isEmpty() ) ) {
				
				//  If protein sequence version id restriction, filter Reported Peptide Ids to those protein sequence version ids
				
				List<Integer> reportedPeptideIdsFiltered = new ArrayList<>( reportedPeptideIds_ForAdditionalProcessing.size() );
				
				for ( Integer reportedPeptideId : reportedPeptideIds_ForAdditionalProcessing ) {
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
				reportedPeptideIds_ForAdditionalProcessing = reportedPeptideIdsFiltered;
			}

			if ( reportedPeptideIds_ForAdditionalProcessing != null && ( ! reportedPeptideIds_ForAdditionalProcessing.isEmpty() ) ) {
				
				//  Have reportedPeptideIds for this Project Search Id to process

				//  Get PSM core data for all Reported Peptide Ids

				psmWebDisplayListForReportedPeptideIds = new ArrayList<>( reportedPeptideIds_ForAdditionalProcessing.size() );

				for ( Integer reportedPeptideId : reportedPeptideIds_ForAdditionalProcessing ) {
					List<PsmWebDisplayWebServiceResult> psmWebDisplayList = 
							psmWebDisplaySearcher.getPsmsWebDisplay( searchId, reportedPeptideId, null, searcherCutoffValuesSearchLevel );
					
					populateReporterIonMassesForPSMs( psmWebDisplayList );
					
					PSMsForSingleReportedPeptideId psmsForSingleReportedPeptideId = new PSMsForSingleReportedPeptideId();
					psmsForSingleReportedPeptideId.reportedPeptideId = reportedPeptideId;
					psmsForSingleReportedPeptideId.psmWebDisplayList = psmWebDisplayList;
					psmWebDisplayListForReportedPeptideIds.add( psmsForSingleReportedPeptideId );
				}
			}
		}
		
		

		if ( psmWebDisplayListForReportedPeptideIds != null && (  ! psmWebDisplayListForReportedPeptideIds.isEmpty() ) ) {
			
			//  Have PSMs

			//  Get Mods for Reported Peptides

			DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result =
					modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher
					.getDynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIds( searchId, reportedPeptideIds_ForAdditionalProcessing );
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
				validate_All_PSMs_haveScanData( psmWebDisplayListForReportedPeptideIds, scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId );
			}
		}
		
		WriteOutputToResponse_Per_SearchId writeOutputToResponse_Per_SearchId = new WriteOutputToResponse_Per_SearchId();
		
		writeOutputToResponse_Per_SearchId.searchId = searchId;
		writeOutputToResponse_Per_SearchId.projectSearchId = projectSearchId;
		writeOutputToResponse_Per_SearchId.searchHasScanData = searchHasScanData;
		writeOutputToResponse_Per_SearchId.annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId = annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId;
		writeOutputToResponse_Per_SearchId.psmWebDisplayListForReportedPeptideIds = psmWebDisplayListForReportedPeptideIds;
		writeOutputToResponse_Per_SearchId.mods_Key_ReportedPeptideId = mods_Key_ReportedPeptideId;
		writeOutputToResponse_Per_SearchId.scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId = scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId;
		
		writeOutputToResponse_Per_SearchId.experimentDataForSearch = singleprojectSearchId_ReportedPeptideIdsPsmIds.experimentDataForSearch;
		
		return writeOutputToResponse_Per_SearchId;
	}
	
	//////////////////////////////////////


    /**
     * @param psmWebDisplayList
     * @return 
     * @throws SQLException 
     */
    private void populateReporterIonMassesForPSMs( List<PsmWebDisplayWebServiceResult> psmWebDisplayList ) throws SQLException {

    	if ( psmWebDisplayList.isEmpty() ) {
    		//  No Input entries so return 
    		return; // EARLY RETURN
    	}
    	
    	List<Long> psmIds_ContainingReporterIonMasses = new ArrayList<>( psmWebDisplayList.size() );
    	
    	for ( PsmWebDisplayWebServiceResult entry : psmWebDisplayList ) {
    		if ( entry.isHasReporterIons() ) {
    			psmIds_ContainingReporterIonMasses.add( entry.getPsmId() );
    		}
    	}

    	List<ReporterIonMasses_PsmLevel_ForPsmIds_Searcher_ResultItem> reporterIonMassesSearcherResult = 
    			reporterIonMasses_PsmLevel_ForPsmIds_Searcher
    			.get_ReporterIonMasses_PsmLevel_ForPsmIds( psmIds_ContainingReporterIonMasses );

    	//  Copy into Set in Map
    	
    	Map<Long, Set<BigDecimal>> reporterIonMassesSet_Key_PsmId = new HashMap<>();
    	
    	for ( ReporterIonMasses_PsmLevel_ForPsmIds_Searcher_ResultItem item : reporterIonMassesSearcherResult ) {
    		
    		Long psmId = item.getPsmId();
    		Set<BigDecimal> reporterIonMassesSet_For_PsmId = reporterIonMassesSet_Key_PsmId.get( psmId );
    		if ( reporterIonMassesSet_For_PsmId == null ) {
    			reporterIonMassesSet_For_PsmId = new HashSet<>();
    			reporterIonMassesSet_Key_PsmId.put( psmId, reporterIonMassesSet_For_PsmId );
    		}
    		reporterIonMassesSet_For_PsmId.add( item.getReporterIonMass() );
    	}
    	
    	for ( PsmWebDisplayWebServiceResult entry : psmWebDisplayList ) {
    		if ( entry.isHasReporterIons() ) {
    			Long psmId = entry.getPsmId();
    			Set<BigDecimal> reporterIonMassesSet_For_PsmId = reporterIonMassesSet_Key_PsmId.get( psmId );
    			if ( reporterIonMassesSet_For_PsmId == null ) {
    				log.warn( "No entry in reporterIonMassesSet_Key_PsmId when entry.isHasReporterIons() is true. psmId: "
    						+ psmId );
    			}
    			if ( reporterIonMassesSet_For_PsmId != null ) {
    				List<BigDecimal> reporterIonMassesList = new ArrayList<>( reporterIonMassesSet_For_PsmId );
    				Collections.sort( reporterIonMassesList );
    				entry.setReporterIonMassList( reporterIonMassesList );
    			}
    		}
    	}
    }
    
	//////////////////////////////////////

	/**
	 * @param psmWebDisplayListForReportedPeptideIds
	 * @param scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId
	 */
	private void validate_All_PSMs_haveScanData(
			List<PSMsForSingleReportedPeptideId> psmWebDisplayListForReportedPeptideIds,
			Map<Integer, Map<Integer, SingleScan_SubResponse>> scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId) {
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
	
	//////////////////////////////////////
	//////////////////////////////////////
	//////////////////////////////////////

	////  Get Scan Data From Spectral Storage Service
	
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
	
	
	//////////////////////////////////////
	//////////////////////////////////////
	//////////////////////////////////////

	////  Write Output to Response
	
	//   Things retrieved from DB in this method:
	
	//			Peptide Sequence String from peptide_tbl: PeptideStringForSearchIdReportedPeptideIdSearcher
	
	//			PSM Annotation Data per Single PSM (Filterable and Descriptive)
	
	/**
	 * @param writeOutputToResponse_Per_SearchId_List
	 * @param httpServletResponse
	 * @throws Exception
	 */
	private void writeOutputToResponse(
			Integer experimentId,
			Map<Integer, SearchItemMinimal> searchItemMinimal_Key_projectSearchId,
			List<WriteOutputToResponse_Per_SearchId> writeOutputToResponse_Per_SearchId_List,
			HttpServletResponse httpServletResponse )
			throws Exception {
		

		//  all Search Programs Per Search records
		Map<Integer, String> searchProgramsPerSearch_Ids_to_Names = new HashMap<>();
		
		//  Get All Unique Annotation Type Names and their Search Program Names
		
		List<String> unique_AnnotationTypeNames_and_their_SearchProgramNames_InOrder = null;
		Map<String,Integer> unique_AnnotationTypeNames_and_their_SearchProgramNames_PositionIndex = new HashMap<>();
		{
			//  Get all Search Programs Per Search records
			
			{
				for ( WriteOutputToResponse_Per_SearchId writeOutputToResponse_For_SearchId : writeOutputToResponse_Per_SearchId_List ) {
		
					int searchId = writeOutputToResponse_For_SearchId.searchId;
					
					List<SearchProgramsPerSearchDTO> entries = searchProgramsPerSearchListForSearchIdSearcher.getSearchProgramsPerSearchForSearchId( searchId );
					for ( SearchProgramsPerSearchDTO entry : entries ) {
						searchProgramsPerSearch_Ids_to_Names.put( entry.getId(), entry.getDisplayName() );
					}
				}
			}
			
			//  Construct AnnotationTypeNames_and_their_SearchProgramNames for all searches
			Set<String> unique_AnnotationTypeNames_and_their_SearchProgramNames = new HashSet<>();
	
			for ( WriteOutputToResponse_Per_SearchId writeOutputToResponse_For_SearchId : writeOutputToResponse_Per_SearchId_List ) {
	
//				int searchId = writeOutputToResponse_For_SearchId.searchId;
				Map<Integer, AnnotationTypeDTO> annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId = writeOutputToResponse_For_SearchId.annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId;
				
				for ( Map.Entry<Integer, AnnotationTypeDTO>  mapEntry : annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId.entrySet() ) {
					AnnotationTypeDTO psmAnnotationTypeDTO = mapEntry.getValue();
					String searchProgramsPerSearch_Name = searchProgramsPerSearch_Ids_to_Names.get( psmAnnotationTypeDTO.getSearchProgramsPerSearchId() );
					if ( searchProgramsPerSearch_Name == null ) {
						String msg = "Failed to get searchProgramsPerSearch_Name for psmAnnotationTypeDTO.getSearchProgramsPerSearchId(): " 
								+ psmAnnotationTypeDTO.getSearchProgramsPerSearchId()
								+ ", psmAnnotationTypeDTO.getId(): "
								+ psmAnnotationTypeDTO.getId();
						log.error( msg );
						throw new LimelightInternalErrorException( msg );
					}
					String annotationTypeAndSearchProgramString = buildAnnotationTypeAndSearchProgramString( psmAnnotationTypeDTO.getName(), searchProgramsPerSearch_Name );
					unique_AnnotationTypeNames_and_their_SearchProgramNames.add(annotationTypeAndSearchProgramString);
				}
			}
			
			unique_AnnotationTypeNames_and_their_SearchProgramNames_InOrder = new ArrayList<>( unique_AnnotationTypeNames_and_their_SearchProgramNames );
			Collections.sort( unique_AnnotationTypeNames_and_their_SearchProgramNames_InOrder ); // Sort for consistency
			
			{ //  Copy to Map so can look up string to get order position
				int index = 0;
				for ( String entry : unique_AnnotationTypeNames_and_their_SearchProgramNames_InOrder ) {
					
					unique_AnnotationTypeNames_and_their_SearchProgramNames_PositionIndex.put( entry, index );
					index++;
				}
			}
		}
		
		//  If for Experiment, validate that 
		//      List<RequestJSONParsed_PerConditionGroupConditionData> experimentDataForSearch
		//  is the same length and has same Condition Group Labels in all entries
		
		////////////

		// generate file name
		
		List<Integer> searchIds = new ArrayList<>( writeOutputToResponse_Per_SearchId_List.size() );
		
		for ( WriteOutputToResponse_Per_SearchId writeOutputToResponse_For_SearchId : writeOutputToResponse_Per_SearchId_List ) {
			searchIds.add( writeOutputToResponse_For_SearchId.searchId );
		}

        //Get current date time
        LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String nowFormatted = now.format( dateTimeFormatter );
		
		String filenamePart = "";
		if ( experimentId != null ) {
		
			filenamePart = "-experiment-" + experimentId;
		}
		
		String filename = "limelight-psms"
				+ filenamePart
				+ "-searches-" 
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
			writer.write( "SEARCH ID\tSEARCH NAME\tSCAN NUMBER\tPEPTIDE\tMODS" ); // 
			writer.write( "\tCHARGE\tOBSERVED M/Z\tRETENTION TIME (MINUTES)\tReporter Ions\tSCAN FILENAME" );
			
			if ( ! writeOutputToResponse_Per_SearchId_List.isEmpty() ) {
				WriteOutputToResponse_Per_SearchId writeOutputToResponse_For_SearchId = writeOutputToResponse_Per_SearchId_List.get( 0 );
				List<RequestJSONParsed_PerConditionGroupConditionData> experimentDataForSearch = writeOutputToResponse_For_SearchId.experimentDataForSearch;
				if ( experimentDataForSearch != null ) {
					for ( RequestJSONParsed_PerConditionGroupConditionData entry : experimentDataForSearch ) {
						writer.write( "\t" );
						writer.write( entry.conditionGroupLabel );
					}
				}
			}
			
			
			for ( String annotationTypeNames_and_its_SearchProgramName : unique_AnnotationTypeNames_and_their_SearchProgramNames_InOrder ) {

				writer.write( "\t" );
				writer.write( annotationTypeNames_and_its_SearchProgramName );
			}
			
			writer.write( "\n" );

			for ( int listIndexCurrentlyOutputting = 0; listIndexCurrentlyOutputting < writeOutputToResponse_Per_SearchId_List.size(); listIndexCurrentlyOutputting++ ) {
	
				WriteOutputToResponse_Per_SearchId writeOutputToResponse_For_SearchId = writeOutputToResponse_Per_SearchId_List.get( listIndexCurrentlyOutputting );
				
				int searchId = writeOutputToResponse_For_SearchId.searchId;
				int projectSearchId = writeOutputToResponse_For_SearchId.projectSearchId;
				Boolean searchHasScanData = writeOutputToResponse_For_SearchId.searchHasScanData; 
				Map<Integer, AnnotationTypeDTO> annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId = writeOutputToResponse_For_SearchId.annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId;
				List<PSMsForSingleReportedPeptideId> psmWebDisplayListForReportedPeptideIds = writeOutputToResponse_For_SearchId.psmWebDisplayListForReportedPeptideIds;
				Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> mods_Key_ReportedPeptideId = writeOutputToResponse_For_SearchId.mods_Key_ReportedPeptideId;
				Map<Integer, Map<Integer, SingleScan_SubResponse>> scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId = writeOutputToResponse_For_SearchId.scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId;
	
				SearchItemMinimal searchItemMinimal = searchItemMinimal_Key_projectSearchId.get( projectSearchId );
				if ( searchItemMinimal == null ) {
					String msg = "searchItemMinimal_Key_projectSearchId does not contain projectSearchId: " + projectSearchId;
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
				
				String searchNameDisplay = searchNameReturnDefaultIfNull.searchNameReturnDefaultIfNull( searchItemMinimal.getName(), searchItemMinimal.getSearchId() );
				
				Set<Integer> annTypeIdsToRetrieve = new HashSet<>();
				
				for ( Map.Entry<Integer, AnnotationTypeDTO>  mapEntry : annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId.entrySet() ) {
					AnnotationTypeDTO psmAnnotationTypeDTO = mapEntry.getValue();
					annTypeIdsToRetrieve.add( psmAnnotationTypeDTO.getId() );
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
							writer.write( searchNameDisplay );
							writer.write( "\t" );
							writer.write( String.valueOf( psmWebDisplay.getScanNumber() ) );
							writer.write( "\t" );
							writer.write( peptideString );
							writer.write( "\t" );
							writer.write( modString );
							writer.write( "\t" );

							writer.write( String.valueOf( psmWebDisplay.getCharge() ) );


							if ( psmWebDisplay.getPsm_precursor_RetentionTime() != null 
									&& psmWebDisplay.getPsm_precursor_MZ() != null ) {

								writer.write( "\t" );
								writer.write( String.valueOf( psmWebDisplay.getPsm_precursor_MZ() ) );
								
								BigDecimal retentionTimeMinutes = 
										psmWebDisplay.getPsm_precursor_RetentionTime().divide( RETENTION_TIME_SECONDS_TO_MINUTES_DIVISOR_BD, RoundingMode.HALF_UP );

								writer.write( "\t" );
								writer.write( String.valueOf( retentionTimeMinutes ) );

							} else if ( ( ! searchHasScanData ) 
									&& psmWebDisplay.getPsm_precursor_RetentionTime() == null 
									&& psmWebDisplay.getPsm_precursor_MZ() == null ) {

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
								
								if ( psmWebDisplay.getPsm_precursor_MZ() != null ) {

									writer.write( String.valueOf( psmWebDisplay.getPsm_precursor_MZ() ) );
								} else {
									
									writer.write( String.valueOf( scan.getPrecursor_M_Over_Z() ) );
								}

								writer.write( "\t" );
								
								if ( psmWebDisplay.getPsm_precursor_RetentionTime() != null ) {

									BigDecimal retentionTimeMinutes = 
											psmWebDisplay.getPsm_precursor_RetentionTime().divide( RETENTION_TIME_SECONDS_TO_MINUTES_DIVISOR_BD, RoundingMode.HALF_UP );
									writer.write( String.valueOf( retentionTimeMinutes ) );
									
								} else {
									writer.write( String.valueOf( ( scan.getRetentionTime() / RETENTION_TIME_SECONDS_TO_MINUTES_DIVISOR ) ) );
								}
							}
							
							writer.write( "\t" );
							{
								List<BigDecimal> reporterIonMassList = psmWebDisplay.getReporterIonMassList();
								if ( reporterIonMassList != null && ( ! reporterIonMassList.isEmpty() ) ) {
									StringBuilder reporterIonMassAsStringSB = new StringBuilder( 10000 );
									boolean first = true;
									for ( BigDecimal reporterIonMass : reporterIonMassList ) {
										String reporterIonMassString = reporterIonMass.toPlainString();
										if ( reporterIonMassString.contains( "." ) ) {
											//  reporterIonMassString constains '.' so strip trailing zeros
											reporterIonMassString = StringUtils.stripEnd(reporterIonMassString, "0" );
										}
										if ( first ) {
											first = false;
										} else {
											reporterIonMassAsStringSB.append( ", " );
										}
										reporterIonMassAsStringSB.append( reporterIonMassString );
									}
									String reporterIonMassAsString = reporterIonMassAsStringSB.toString();
									writer.write( String.valueOf( reporterIonMassAsString ) );
								}
							}

							writer.write( "\t" );
							if ( psmWebDisplay.getScanFilename() != null ) {
								writer.write( psmWebDisplay.getScanFilename() );
							}
							
							List<RequestJSONParsed_PerConditionGroupConditionData> experimentDataForSearch = writeOutputToResponse_For_SearchId.experimentDataForSearch;
							if ( experimentDataForSearch != null ) {
								for ( RequestJSONParsed_PerConditionGroupConditionData entry : experimentDataForSearch ) {
									writer.write( "\t" );
									writer.write( entry.conditionLabel );
								}
							}

							//  Store PSM Annotation Values Key "AnnotationTypeName (Search Program Name)"

							Map<String, String> psmAnnotationValues_Key_AnnotationTypeNames_and_their_SearchProgramNames = new HashMap<>();

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
										
										AnnotationTypeDTO annotationTypeDTO  = annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId.get( item.getAnnotationTypeId() );
										if ( annotationTypeDTO == null ) {
											String msg = "No value in annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId for AnnotationTypeId: " + item.getAnnotationTypeId();
											log.error( msg );
											throw new LimelightInternalErrorException(msg);
										}
										
										String searchProgramsPerSearch_Name = searchProgramsPerSearch_Ids_to_Names.get( annotationTypeDTO.getSearchProgramsPerSearchId() );
										if ( searchProgramsPerSearch_Name == null ) {
											String msg = "No value in searchProgramsPerSearch_Ids_to_Names for annotationTypeDTO.getSearchProgramsPerSearchId(): "
													+ annotationTypeDTO.getSearchProgramsPerSearchId()
													+ ", for AnnotationTypeId: " + item.getAnnotationTypeId();
											log.error( msg );
											throw new LimelightInternalErrorException(msg);
										}
										
										String annotationTypeAndSearchProgramString = buildAnnotationTypeAndSearchProgramString( annotationTypeDTO.getName(), searchProgramsPerSearch_Name );

										psmAnnotationValues_Key_AnnotationTypeNames_and_their_SearchProgramNames.put( annotationTypeAndSearchProgramString, item.getValueString() );
									}
								}

								{
									//  Descriptive Ann Types
									List<PsmDescriptiveAnnotationDTO> psmDescriptiveAnnotationDTOList =
											psm_DescriptiveAnnotationData_Searcher
											.getPsmDescriptiveAnnotationDTOList( 
													psmWebDisplay.getPsmId(),  annTypeIdsToRetrieve );

									for ( PsmDescriptiveAnnotationDTO item : psmDescriptiveAnnotationDTOList ) {

										AnnotationTypeDTO annotationTypeDTO  = annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId.get( item.getAnnotationTypeId() );
										if ( annotationTypeDTO == null ) {
											String msg = "No value in annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId for AnnotationTypeId: " + item.getAnnotationTypeId();
											log.error( msg );
											throw new LimelightInternalErrorException(msg);
										}
										
										String searchProgramsPerSearch_Name = searchProgramsPerSearch_Ids_to_Names.get( annotationTypeDTO.getSearchProgramsPerSearchId() );
										if ( searchProgramsPerSearch_Name == null ) {
											String msg = "No value in searchProgramsPerSearch_Ids_to_Names for annotationTypeDTO.getSearchProgramsPerSearchId(): "
													+ annotationTypeDTO.getSearchProgramsPerSearchId()
													+ ", for AnnotationTypeId: " + item.getAnnotationTypeId();
											log.error( msg );
											throw new LimelightInternalErrorException(msg);
										}
										
										String annotationTypeAndSearchProgramString = buildAnnotationTypeAndSearchProgramString( annotationTypeDTO.getName(), searchProgramsPerSearch_Name );

										psmAnnotationValues_Key_AnnotationTypeNames_and_their_SearchProgramNames.put( annotationTypeAndSearchProgramString, item.getValueString() );
									}
								}
								
								//  Write out Annotation Data
								
								for ( String annotationTypeName_and_its_SearchProgramName : unique_AnnotationTypeNames_and_their_SearchProgramNames_InOrder ) {
									
									writer.write( "\t" );
									String annValue = psmAnnotationValues_Key_AnnotationTypeNames_and_their_SearchProgramNames.get( annotationTypeName_and_its_SearchProgramName );
									if ( annValue != null ) {
										writer.write( annValue );
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
	 * 
	 */
	private String buildAnnotationTypeAndSearchProgramString( String annotationTypeName, String searchProgramName ) {
		
		String result = annotationTypeName + " (" + searchProgramName + ")";
		return result;
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

		int projectSearchId;
		int searchId;
		Boolean searchHasScanData; 
		Map<Integer, AnnotationTypeDTO> annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId;
		List<PSMsForSingleReportedPeptideId> psmWebDisplayListForReportedPeptideIds;
		Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> mods_Key_ReportedPeptideId;
		Map<Integer, Map<Integer, SingleScan_SubResponse>> scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId;
		
		List<RequestJSONParsed_PerConditionGroupConditionData> experimentDataForSearch;
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

		private List<RequestJSONParsed_PerProjectSearchId> projectSearchIdsReportedPeptideIdsPsmIds;
		private SearchDataLookupParamsRoot searchDataLookupParamsRoot;
		
		private List<Integer> proteinSequenceVersionIds; // optional
		
		private Integer experimentId;

		public void setProjectSearchIdsReportedPeptideIdsPsmIds(
				List<RequestJSONParsed_PerProjectSearchId> projectSearchIdsReportedPeptideIdsPsmIds) {
			this.projectSearchIdsReportedPeptideIdsPsmIds = projectSearchIdsReportedPeptideIdsPsmIds;
		}
		public void setSearchDataLookupParamsRoot(SearchDataLookupParamsRoot searchDataLookupParamsRoot) {
			this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
		}
		public void setProteinSequenceVersionIds(List<Integer> proteinSequenceVersionIds) {
			this.proteinSequenceVersionIds = proteinSequenceVersionIds;
		}
		public List<RequestJSONParsed_PerProjectSearchId> getProjectSearchIdsReportedPeptideIdsPsmIds() {
			return projectSearchIdsReportedPeptideIdsPsmIds;
		}
		public SearchDataLookupParamsRoot getSearchDataLookupParamsRoot() {
			return searchDataLookupParamsRoot;
		}
		public List<Integer> getProteinSequenceVersionIds() {
			return proteinSequenceVersionIds;
		}
		public void setExperimentId(Integer experimentId) {
			this.experimentId = experimentId;
		}
	}
	
	public static class RequestJSONParsed_PerProjectSearchId {
		
		private Integer projectSearchId;
		
		private List<RequestJSONParsed_PerReportedPeptideId> reportedPeptideIdsAndTheirPsmIds; //  Optional
		
		private List<RequestJSONParsed_PerConditionGroupConditionData> experimentDataForSearch; //  Optional
		
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public void setReportedPeptideIdsAndTheirPsmIds( List<RequestJSONParsed_PerReportedPeptideId> reportedPeptideIdsAndTheirPsmIds) {
			this.reportedPeptideIdsAndTheirPsmIds = reportedPeptideIdsAndTheirPsmIds;
		}
		public void setExperimentDataForSearch(List<RequestJSONParsed_PerConditionGroupConditionData> experimentDataForSearch) {
			this.experimentDataForSearch = experimentDataForSearch;
		}
	}

	public static class RequestJSONParsed_PerReportedPeptideId {
		
		private Integer reportedPeptideId;
		private List<Long> psmIds;
		
		public void setReportedPeptideId(Integer reportedPeptideId) {
			this.reportedPeptideId = reportedPeptideId;
		}
		public void setPsmIds(List<Long> psmIds) {
			this.psmIds = psmIds;
		}
	}

	public static class RequestJSONParsed_PerConditionGroupConditionData {

	    private String conditionGroupLabel;
	    private String conditionLabel;
	    
		public void setConditionGroupLabel(String conditionGroupLabel) {
			this.conditionGroupLabel = conditionGroupLabel;
		}
		public void setConditionLabel(String conditionLabel) {
			this.conditionLabel = conditionLabel;
		}
		
	}
	
}
