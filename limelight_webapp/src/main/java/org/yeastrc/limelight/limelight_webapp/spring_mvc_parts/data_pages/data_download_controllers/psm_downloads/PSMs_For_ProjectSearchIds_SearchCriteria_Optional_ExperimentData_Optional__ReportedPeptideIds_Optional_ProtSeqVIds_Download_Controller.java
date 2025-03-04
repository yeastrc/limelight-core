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
import org.springframework.web.bind.annotation.PostMapping;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchSubGroupDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPositionDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchProgramsPerSearchDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchSubGroupDTO;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesRootLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.dao.ScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightDatabaseException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.LimelightWebappDataException;
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
import org.yeastrc.limelight.limelight_webapp.searchers.OpenModificationMasses_PsmLevel_ForPsmIds_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.OpenModificationPositions_PsmLevel_ForOpenModIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.PeptideStringForSearchIdReportedPeptideIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchSubGroupDTOForProjectSearchIdSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinAnnotations_For_SearchID_ProteinVersionId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmSearchSubGroupIdsForPsmIdsSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmWebDisplaySearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ReportedPeptideIds_For_SearchID_ProteinSequenceVersionIds_ReportedPeptideIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ReporterIonMasses_PsmLevel_ForPsmIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchHasScanDataForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchMinimalForProjectSearchIdSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchProgramsPerSearchListForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchScanFile_For_SearchIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchSubGroupDTOForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher.ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher.ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmSearchSubGroupIdsForPsmIdsSearcher.PsmSearchSubGroupIdsForPsmIdsSearcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers.ReporterIonMasses_PsmLevel_ForPsmIds_Searcher.ReporterIonMasses_PsmLevel_ForPsmIds_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers_results.DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ProteinSequenceVersionAnnotationItem;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmWebDisplayWebServiceResult;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;
import org.yeastrc.limelight.limelight_webapp.services.ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_ScanDataFromScanNumbers_SpectralStorageWebserviceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.data_download_controllers.AA_DataDownloadControllersPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.data_download_controllers.DownloadsCharacterSetConstant;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.LorikeetSpectrumViewer_PageController;
import org.yeastrc.limelight.limelight_webapp.web_utils.SearchNameReturnDefaultIfNull;
import org.yeastrc.limelight.limelight_webapp.web_utils.SearchSubGroup_Name_Display_Computation_Util;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.SearchSubGroup_Name_Display_Computation_Util.SearchSubGroup_Name_Display_Computation_Entry;
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
 * Form Field Name: 'requestJSONString'
 */
@Controller
public class PSMs_For_ProjectSearchIds_SearchCriteria_Optional_ExperimentData_Optional__ReportedPeptideIds_Optional_ProtSeqVIds_Download_Controller {

	private static final Logger log = LoggerFactory.getLogger( PSMs_For_ProjectSearchIds_SearchCriteria_Optional_ExperimentData_Optional__ReportedPeptideIds_Optional_ProtSeqVIds_Download_Controller.class );
	
	private static final String CONTROLLER_PATH =
			AA_DataDownloadControllersPaths_Constants.PATH_START_ALL
			+ AA_DataDownloadControllersPaths_Constants.PSMS_FOR_PROJECT_SEARCH_IDS_SEARCH_CRITERIA_OPTIONAL_EXPERIMENT_DATA_DOWNLOAD_CONTROLLER;
	
	private static final int EXPECTED_REQUEST_VERSION  = 3;   // Keep in sync with Javascript   const EXPECTED_REQUEST_VERSION
	
	private static final String SPECTRUM_VIEWER_OPEN_MOD_POSITION__N_TERM = "n";
	private static final String SPECTRUM_VIEWER_OPEN_MOD_POSITION__C_TERM = "c";
	
	private static final String OPEN_MOD_POSITION_URL_ADDITION = "?openmod-position=";  //  Change in Client side code as well if change this string
	

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
	private ProjectSearchSubGroupDTOForProjectSearchIdSearcher_IF projectSearchSubGroupDTOForProjectSearchIdSearcher;
	
	@Autowired
	private SearchSubGroupDTOForSearchIdSearcherIF searchSubGroupDTOForSearchIdSearcher;
	
	@Autowired
	private SearchNameReturnDefaultIfNull searchNameReturnDefaultIfNull;

	@Autowired
	private SearchSubGroup_Name_Display_Computation_Util searchSubGroup_Name_Display_Computation_Util;
	
	@Autowired
	private SearchHasScanDataForSearchIdSearcherIF searchHasScanDataForSearchIdSearcher;
	
	@Autowired
	private SearchScanFile_For_SearchIds_Searcher_IF searchScanFile_For_SearchIds_Searcher;

	@Autowired
	private SearcherCutoffValues_Factory searcherCutoffValuesRootLevel_Factory;

	@Autowired
	private AnnotationTypeListForSearchIdSearcherIF annotationTypeListForSearchIdSearcher;

	@Autowired
	private ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF reportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service;

	@Autowired
	private ReportedPeptideIds_For_SearchID_ProteinSequenceVersionIds_ReportedPeptideIds_Searcher_IF reportedPeptideIds_For_SearchID_ProteinSequenceVersionIds_ReportedPeptideIds_Searcher;

	@Autowired
	private DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcherIF modificationsInReportedPeptidesForSearchIdReportedPeptideIdsSearcher;
	
	@Autowired
	private PeptideStringForSearchIdReportedPeptideIdSearcherIF peptideStringForSearchIdReportedPeptideIdSearcher;
	
	@Autowired
	private ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_IF proteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher;
	
	@Autowired
	private ProteinAnnotations_For_SearchID_ProteinVersionId_SearcherIF proteinAnnotations_For_SearchID_ProteinVersionId_Searcher;
	
	@Autowired
	private PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcherIF psmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher;
	
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
	private PsmSearchSubGroupIdsForPsmIdsSearcher_IF psmSearchSubGroupIdsForPsmIdsSearcher;
	
	@Autowired
	private ReporterIonMasses_PsmLevel_ForPsmIdSearcherIF reporterIonMasses_PsmLevel_ForPsmIds_Searcher;
	
	@Autowired
	private OpenModificationMasses_PsmLevel_ForPsmIds_SearcherIF openModificationMasses_PsmLevel_ForPsmIds_Searcher;

	@Autowired
	private OpenModificationPositions_PsmLevel_ForOpenModIds_Searcher_IF openModificationPositions_PsmLevel_ForOpenModIds_Searcher;
	
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
			HttpServletRequest httpServletRequest,
			HttpServletResponse httpServletResponse ) {
		
//		log.warn( "httpServletRequest.getContentLengthLong(): " + httpServletRequest.getContentLengthLong() );

		String requestJSONString = httpServletRequest.getParameter( "requestJSONString" ); // From Form POST fields

		if ( StringUtils.isEmpty( requestJSONString ) ) {
			
			String msg =  "httpServletRequest.getParameter( \"requestJSONString\" ) returned null or empty string. Possible causes are (1) 'requestJSONString' is not populated field in form POST  (2) the request is too large for getParameter to return it so returns null. httpServletRequest.getContentLengthLong(): " + httpServletRequest.getContentLengthLong();
			log.warn( msg );
			//  TODO Maybe do something different
			throw new LimelightInternalErrorException( msg );
		}
		
		String requestURL_Base__Before__ControllerPath = null;
		
		{
			String requestURL = httpServletRequest.getRequestURL().toString();
			
			int controllerPathStart_Index = requestURL.indexOf( 
					AA_DataDownloadControllersPaths_Constants.PSMS_FOR_PROJECT_SEARCH_IDS_SEARCH_CRITERIA_OPTIONAL_EXPERIMENT_DATA_DOWNLOAD_CONTROLLER );
			
			if ( controllerPathStart_Index < 0 ) {
				throw new LimelightInternalErrorException( "request url 'httpServletRequest.getRequestURL().toString()' does NOT contain controller path '"
						+ AA_DataDownloadControllersPaths_Constants.PSMS_FOR_PROJECT_SEARCH_IDS_SEARCH_CRITERIA_OPTIONAL_EXPERIMENT_DATA_DOWNLOAD_CONTROLLER 
						+ "'" );
			}
			
			requestURL_Base__Before__ControllerPath = requestURL.substring(0, controllerPathStart_Index );
		}


		try {
			//  Have internal_Request_Converted_Request_Root since have to convert some data for usage
			Internal_Request_Converted_Request_Root internal_Request_Converted_Request_Root = new Internal_Request_Converted_Request_Root(); 
			
			
			RequestJSONParsed webserviceRequest = unmarshalJSON_ToObject.getObjectFromJSONString( requestJSONString, RequestJSONParsed.class );
			
			if ( webserviceRequest.requestVersion == null || webserviceRequest.requestVersion.intValue() != EXPECTED_REQUEST_VERSION ) {
				log.warn( " webserviceRequest.requestVersion is not Expected Version: " + EXPECTED_REQUEST_VERSION + ", webserviceRequest.requestVersion: " + webserviceRequest.requestVersion );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			internal_Request_Converted_Request_Root.proteinSequenceVersionIds = webserviceRequest.proteinSequenceVersionIds;
			internal_Request_Converted_Request_Root.experimentId = webserviceRequest.experimentId;
			internal_Request_Converted_Request_Root.searchDataLookupParamsRoot = webserviceRequest.searchDataLookupParamsRoot;
			
			List<RequestJSONParsed_PerProjectSearchId> projectSearchIdsReportedPeptideIdsPsmIds = webserviceRequest.projectSearchIdsReportedPeptideIdsPsmIds;

			if ( projectSearchIdsReportedPeptideIdsPsmIds == null || projectSearchIdsReportedPeptideIdsPsmIds.isEmpty() ) {
				log.warn( "No projectSearchIdsReportedPeptideIdsPsmIds entries" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( StringUtils.isEmpty( webserviceRequest.psmId_SeparatorString ) ) {
				log.warn( "webserviceRequest.psmId_SeparatorString is null or empty string" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( StringUtils.isEmpty( webserviceRequest.reportedPeptideId_To_PsmId_SeparatorString ) ) {
				log.warn( "webserviceRequest.reportedPeptideId_To_PsmId_SeparatorString is null or empty string" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( StringUtils.isEmpty( webserviceRequest.reportedPeptideId_Block_SeparatorString ) ) {
				log.warn( "webserviceRequest.reportedPeptideId_Block_SeparatorString is null or empty string" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			if ( webserviceRequest.reportedPeptideId_PsmId_NumberEncoding_Radix == null ) {
				log.warn( "webserviceRequest.reportedPeptideId_PsmId_NumberEncoding_Radix is null" );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			List<Internal_Request_Converted_PerProjectSearchId> internal_Request_Converted_PerProjectSearchId_List = new ArrayList<>( projectSearchIdsReportedPeptideIdsPsmIds.size() );
			internal_Request_Converted_Request_Root.projectSearchIdsReportedPeptideIdsPsmIds = internal_Request_Converted_PerProjectSearchId_List;
			
			
			List<Integer> proteinSequenceVersionIds = webserviceRequest.proteinSequenceVersionIds;
			
			Integer experimentId = webserviceRequest.experimentId; // Optional for when Experiment
			
			List<Integer> projectSearchIds = new ArrayList<>( projectSearchIdsReportedPeptideIdsPsmIds.size() );
			
			for ( RequestJSONParsed_PerProjectSearchId entry : projectSearchIdsReportedPeptideIdsPsmIds ) {
				if ( entry.projectSearchId == null ) {
					log.warn( "No Project Search Id in projectSearchIdsReportedPeptideIdsPsmIds entry" );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				projectSearchIds.add( entry.projectSearchId );
				
				Internal_Request_Converted_PerProjectSearchId internal_Request_Converted_PerProjectSearchId = new Internal_Request_Converted_PerProjectSearchId();
				internal_Request_Converted_PerProjectSearchId_List.add(internal_Request_Converted_PerProjectSearchId);
				
				internal_Request_Converted_PerProjectSearchId.projectSearchId = entry.projectSearchId;
				internal_Request_Converted_PerProjectSearchId.experimentDataForSearch = entry.experimentDataForSearch;
				internal_Request_Converted_PerProjectSearchId.searchSubGroup_Ids_Selected = entry.searchSubGroup_Ids_Selected;
				
				if ( proteinSequenceVersionIds != null ) {
					//  Have proteinSequenceVersionIds so cannot have reportedPeptideIdsAndTheirPsmIds
//					if ( entry.reportedPeptideIdsAndTheirPsmIds != null ) {
//						log.warn( "In projectSearchIdsReportedPeptideIdsPsmIds entry, proteinSequenceVersionIds is populated so entry.reportedPeptideIdsAndTheirPsmIds being populated is not allowed " );
//						throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//					}
					if ( entry.reportedPeptideIdsAndTheirPsmIds__Encoded != null ) {
						log.warn( "In projectSearchIdsReportedPeptideIdsPsmIds entry, proteinSequenceVersionIds is populated so entry.reportedPeptideIdsAndTheirPsmIds__Encoded being populated is not allowed " );
						throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
					}
				}
//				if ( entry.reportedPeptideIdsAndTheirPsmIds != null ) {
//					for ( RequestJSONParsed_PerReportedPeptideId reportedPeptideIdAndItsPsmIds : entry.reportedPeptideIdsAndTheirPsmIds ) {
//						Integer reportedPeptideId = reportedPeptideIdAndItsPsmIds.reportedPeptideId;
//						if ( reportedPeptideId == null ) {
//							log.warn( "In projectSearchIdsReportedPeptideIdsPsmIds entry, reportedPeptideId == null" );
//							throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
//						}
//					}
//				}
				

				if ( entry.reportedPeptideIdsAndTheirPsmIds__Encoded != null ) {
					

					///////  Decode reportedPeptideIds and possibly their PSMs in request
					
					List<Internal_Request_Converted_PerReportedPeptideId> reportedPeptideIdsAndTheirPsmIds = new ArrayList<>();
					internal_Request_Converted_PerProjectSearchId.reportedPeptideIdsAndTheirPsmIds = reportedPeptideIdsAndTheirPsmIds;
					
					String[] reportedPeptideIdsAndTheirPsmIds__Encoded_Split = entry.reportedPeptideIdsAndTheirPsmIds__Encoded.split( webserviceRequest.reportedPeptideId_Block_SeparatorString );
					
					
					int reportedPeptideId_Prev_NOT_SET = Integer.MIN_VALUE;
					int reportedPeptideId_Prev = reportedPeptideId_Prev_NOT_SET;
				
					for ( String reportedPeptideIdsAndTheirPsmIds__Encoded_Split_Entry : reportedPeptideIdsAndTheirPsmIds__Encoded_Split ) {

						Internal_Request_Converted_PerReportedPeptideId internal_Request_Converted_PerReportedPeptideId = new Internal_Request_Converted_PerReportedPeptideId();
						reportedPeptideIdsAndTheirPsmIds.add(internal_Request_Converted_PerReportedPeptideId);
						
						String[] reportedPeptideIdsAndTheirPsmIds__Encoded_Split_Entry_Split = reportedPeptideIdsAndTheirPsmIds__Encoded_Split_Entry.split( webserviceRequest.reportedPeptideId_To_PsmId_SeparatorString );
						
						if ( reportedPeptideIdsAndTheirPsmIds__Encoded_Split_Entry_Split.length > 2 ) {
							log.warn( "Input Data Encoding Error: ( reportedPeptideIdsAndTheirPsmIds__Encoded_Split_Entry_Split.length > 2 ) reportedPeptideIdsAndTheirPsmIds__Encoded_Split_Entry: " + reportedPeptideIdsAndTheirPsmIds__Encoded_Split_Entry );
							throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
						}

						String reportedPeptideId_String = reportedPeptideIdsAndTheirPsmIds__Encoded_Split_Entry_Split[ 0 ];
						try {
							int reportedPeptideId = Integer.parseInt( reportedPeptideId_String, webserviceRequest.reportedPeptideId_PsmId_NumberEncoding_Radix );
							
							if ( reportedPeptideId_Prev != reportedPeptideId_Prev_NOT_SET ) {
								//  NOT First so reportedPeptideId_String is an offset from previous value
								reportedPeptideId += reportedPeptideId_Prev;
							}

							reportedPeptideId_Prev = reportedPeptideId;

							internal_Request_Converted_PerReportedPeptideId.reportedPeptideId = reportedPeptideId;
							 
						} catch ( Exception ex ) {
							log.warn( "Integer.parseInt( reportedPeptideId_String ) Threw Error.  reportedPeptideId_String: " + reportedPeptideId_String );
							throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
						}
						
						if ( reportedPeptideIdsAndTheirPsmIds__Encoded_Split_Entry_Split.length == 2 ) {
							//  Have PSM Ids
							String psmIds_Encoded = reportedPeptideIdsAndTheirPsmIds__Encoded_Split_Entry_Split[ 1 ];
							String[] psmIds_Encoded_Split = psmIds_Encoded.split( webserviceRequest.psmId_SeparatorString );
							
							if ( entry.minimum_PSM_ID_InRequest_For_Search == null ) {
								log.warn( "Input Data Encoding Error: reportedPeptideIdsAndTheirPsmIds__Encoded has PSM Ids and minimum_PSM_ID_InRequest_For_Search is null.  " );;
								throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
							}
							
							internal_Request_Converted_PerReportedPeptideId.psmIds_Include = new ArrayList<>( psmIds_Encoded_Split.length );

							long psmId_Prev_NOT_SET = Long.MIN_VALUE;
							long psmId_Prev = psmId_Prev_NOT_SET;
						
							for ( String psmId_String : psmIds_Encoded_Split ) {
								try {
									long psmId = Long.parseLong( psmId_String, webserviceRequest.reportedPeptideId_PsmId_NumberEncoding_Radix );

									if ( psmId_Prev == psmId_Prev_NOT_SET ) {
										//  YES First so psmId_String is an offset from Minimum PSM ID for Search in request
										psmId += entry.minimum_PSM_ID_InRequest_For_Search;
									} else {
										//  NOT First so psmId_String is an offset from previous value
										psmId += psmId_Prev;
									}
									
									psmId_Prev = psmId;

									internal_Request_Converted_PerReportedPeptideId.psmIds_Include.add( psmId );
									
								} catch ( Exception ex ) {
									log.warn( " Long.parseLong( psmId_String ); Threw Error.  psmId_String: " + psmId_String );
									throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
								}
								
							}
						}
					}
				}
				
				
				if ( entry.searchSubGroup_Ids_Selected != null && entry.searchSubGroup_Ids_Selected.isEmpty() ) {
					log.warn( "In projectSearchIdsReportedPeptideIdsPsmIds entry, entry.searchSubGroup_Ids_Selected != null && entry.searchSubGroup_Ids_Selected.isEmpty()" );
					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
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

				log.warn( "Limelight_WS_AuthError_Unauthorized_Exception: Forwarding to Error Msg Controller: " + mainErrorPageControllerURL
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

    		Map<Integer, Map<Integer, SearchScanFileDTO>> searchScanFileDTO_Map_Key_SearchScanFileId_Map_Key_ProjectSearchId = new HashMap<>();
    		
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
					String msg = "searchHasScanData == null for searchId: " + searchId;
					log.warn( msg );
	    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
				}
				
	    		projectSearchIdMapToSearchId.put( projectSearchId, searchId );
	    		searchHasScanDataMap_Key_projectSearchId.put( projectSearchId, searchHasScanData );
	    		
	    		{

	        		Map<Integer, SearchScanFileDTO> searchScanFileDTO_Map_Key_SearchScanFileId = new HashMap<>();
	        		
	        		searchScanFileDTO_Map_Key_SearchScanFileId_Map_Key_ProjectSearchId.put( projectSearchId, searchScanFileDTO_Map_Key_SearchScanFileId );
	        		
		    		List<Integer> searchIds = new ArrayList<>(1);
		    		searchIds.add( searchId );
		    		
		    		List<SearchScanFileDTO> searchScanFileDTO_For_SearchId_List = 
		    				searchScanFile_For_SearchIds_Searcher.getSearchScanFile_For_SearchIds(searchIds);
		    		
		    		for ( SearchScanFileDTO entry : searchScanFileDTO_For_SearchId_List ) {
		    			
		    			searchScanFileDTO_Map_Key_SearchScanFileId.put( entry.getId(), entry );
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
    		
    		//  Get Data for all the searches:
    		
    		// Create list to pass to writeOutputToResponse
    		List<WriteOutputToResponse_Per_SearchId> writeOutputToResponse_Per_SearchId_List = new ArrayList<>( projectSearchIdMapToSearchId.size() ); 
    		
    		for ( Internal_Request_Converted_PerProjectSearchId singleprojectSearchId_ReportedPeptideIdsPsmIds : internal_Request_Converted_PerProjectSearchId_List ) {
    			
    			Integer projectSearchId = singleprojectSearchId_ReportedPeptideIdsPsmIds.projectSearchId;
    			SearchItemMinimal searchItemMinimal = searchItemMinimal_Key_projectSearchId.get( projectSearchId );
    			if ( searchItemMinimal == null ) {
    				String msg = "searchItemMinimal_Key_projectSearchId.get( projectSearchId ) returned null before call create_WriteOutputToResponse_Per_SearchId__For_SingleSearch. projectSearchId: " + projectSearchId;
    				log.error( msg );
    				throw new LimelightInternalErrorException(msg);
    			}
    			
        		Map<Integer, SearchScanFileDTO> searchScanFileDTO_Map_Key_SearchScanFileId = searchScanFileDTO_Map_Key_SearchScanFileId_Map_Key_ProjectSearchId.get( projectSearchId );
        		if ( searchScanFileDTO_Map_Key_SearchScanFileId == null ) {
    				String msg = "searchScanFileDTO_Map_Key_SearchScanFileId_Map_Key_ProjectSearchId.get( projectSearchId ) returned null before call create_WriteOutputToResponse_Per_SearchId__For_SingleSearch. projectSearchId: " + projectSearchId;
    				log.error( msg );
    				throw new LimelightInternalErrorException(msg);
    			}
    			
    			WriteOutputToResponse_Per_SearchId writeOutputToResponse_Per_SearchId =
    					create_WriteOutputToResponse_Per_SearchId__For_SingleSearch(
    							internal_Request_Converted_Request_Root, 
    							paramsForProjectSearchIdsList, 
    							projectSearchIdMapToSearchId,
    							searchItemMinimal,
    							searchHasScanDataMap_Key_projectSearchId, 
    							searcherCutoffValuesRootLevel,
    							searchScanFileDTO_Map_Key_SearchScanFileId,
    							singleprojectSearchId_ReportedPeptideIdsPsmIds );
    			
    			writeOutputToResponse_Per_SearchId_List.add( writeOutputToResponse_Per_SearchId );
    		}
			
    		writeOutputToResponse(
    				searcherCutoffValuesRootLevel,
    				requestURL_Base__Before__ControllerPath,
    				experimentId,
    				searchItemMinimal_Key_projectSearchId,
    				writeOutputToResponse_Per_SearchId_List,
    				searchScanFileDTO_Map_Key_SearchScanFileId_Map_Key_ProjectSearchId,
					httpServletResponse );
    		
		} catch ( Limelight_WS_BadRequest_InvalidParameter_Exception e ) {

			log.warn( "Limelight_WS_BadRequest_InvalidParameter_Exception: " + e.toString() );

			throw new RuntimeException();
    		
		} catch ( Limelight_WS_AuthError_Unauthorized_Exception e ) {

			log.warn( "Limelight_WS_AuthError_Unauthorized_Exception: " + e.toString() );

			//  TODO  No User session and not public project
			throw new RuntimeException();
			
		} catch ( Limelight_WS_AuthError_Forbidden_Exception e ) {

			log.warn( "Limelight_WS_AuthError_Forbidden_Exception: " + e.toString() );

			//  TODO  User Auth Error
			throw new RuntimeException();
			
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
	 * @param webserviceRequest_Converted_Root
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
			
			Internal_Request_Converted_Request_Root webserviceRequest_Converted_Root,
			List<SearchDataLookupParams_For_Single_ProjectSearchId> paramsForProjectSearchIdsList,
			Map<Integer, Integer> projectSearchIdMapToSearchId,
			SearchItemMinimal searchItemMinimal,
			Map<Integer, Boolean> searchHasScanDataMap_Key_projectSearchId,
			SearcherCutoffValuesRootLevel searcherCutoffValuesRootLevel,
    		Map<Integer, SearchScanFileDTO> searchScanFileDTO_Map_Key_SearchScanFileId,
			Internal_Request_Converted_PerProjectSearchId singleprojectSearchId_ReportedPeptideIdsPsmIds )
			throws SQLException, Exception {
		
		Integer projectSearchId = singleprojectSearchId_ReportedPeptideIdsPsmIds.projectSearchId;
		Integer searchId = projectSearchIdMapToSearchId.get( projectSearchId );
		
		if ( searchId == null ) {
			String msg = "searchId == null for projectSearchId: " + projectSearchId;
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}
		
		Boolean searchHasScanData = searchHasScanDataMap_Key_projectSearchId.get( projectSearchId );
		
		boolean searchHasSubgroups = searchItemMinimal.isSearchHasSubgroups();
		
		Map<Integer, WriteOutputToResponse_Per_SearchSubGroupId> searchSubGroupData_KeyedOn_SearchSubGroupId = null;
		
		if ( searchHasSubgroups ) {

			//  Get DB Search Sub Groups from search ids
			
			searchSubGroupData_KeyedOn_SearchSubGroupId = new HashMap<>();
			
			List<Integer> searchIdList = new ArrayList<>( 2 );
			searchIdList.add(searchId);
			
			List<Integer> projectSearchIdList = new ArrayList<>( 2 );
			projectSearchIdList.add(projectSearchId);

			List<SearchSubGroupDTO> searchSubGroupsDBList = 
					searchSubGroupDTOForSearchIdSearcher.getListForSearchId( searchIdList );

			List<ProjectSearchSubGroupDTO> projectSearchSubGroupsDBList = 
					projectSearchSubGroupDTOForProjectSearchIdSearcher.getListForProjectSearchIds( projectSearchIdList );
			
			Map<Integer, ProjectSearchSubGroupDTO> projectSearchSubGroupDTO_Map_Key_SubGroupId = new HashMap<>();
			
			for ( ProjectSearchSubGroupDTO item : projectSearchSubGroupsDBList ) {
				
				Integer searchSubGroupId = item.getSearchSubGroupId();
				ProjectSearchSubGroupDTO existingMapEntry = projectSearchSubGroupDTO_Map_Key_SubGroupId.put( searchSubGroupId, item );
				if ( existingMapEntry != null ) {
					String msg = "projectSearchSubGroupDTO_Map_Key_SubGroupId aleady has map entry for searchSubGroupId: " + searchSubGroupId 
							+ ", searchId: " + searchId;
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
			}
			
			List<SearchSubGroup_Name_Display_Computation_Entry> nameDisplayComputeEntyList = new ArrayList<>( searchSubGroupsDBList.size() );
			

			for ( SearchSubGroupDTO entry : searchSubGroupsDBList ) {

				
				ProjectSearchSubGroupDTO projectSearchSubGroupDTO = null;
				{ // projectSearchSubGroupDTO may be null after this block
					projectSearchSubGroupDTO = projectSearchSubGroupDTO_Map_Key_SubGroupId.get( entry.getSearchSubGroupId() );
				}
				SearchSubGroup_Name_Display_Computation_Entry result_SearchSubgroupItem = new SearchSubGroup_Name_Display_Computation_Entry();
				result_SearchSubgroupItem.setSearchSubGroupId( entry.getSearchSubGroupId() );
				result_SearchSubgroupItem.setSubgroupName_fromImportFile( entry.getSubgroupName_fromImportFile() );
				if ( projectSearchSubGroupDTO != null ) {
					result_SearchSubgroupItem.setDisplayOrder( projectSearchSubGroupDTO.getDisplayOrder() );
    				result_SearchSubgroupItem.setSubgroupName_Display_FromServer_IfUserEnteredAValue( projectSearchSubGroupDTO.getSubgroupName_Display() );
				}

				nameDisplayComputeEntyList.add( result_SearchSubgroupItem );
			}
			
			searchSubGroup_Name_Display_Computation_Util.searchSubGroup_Name_Display_Computation__SortOn_DisplayOrder_SubGroupNameDisplay__Util( nameDisplayComputeEntyList );
			
			for ( SearchSubGroup_Name_Display_Computation_Entry name_Display_Computation_Entry : nameDisplayComputeEntyList ) {
				
				WriteOutputToResponse_Per_SearchSubGroupId response_Per_SearchSubGroupId = new WriteOutputToResponse_Per_SearchSubGroupId();
				response_Per_SearchSubGroupId.subgroupName_fromImportFile = name_Display_Computation_Entry.getSubgroupName_fromImportFile();
				response_Per_SearchSubGroupId.subgroupName_Display = name_Display_Computation_Entry.getSubgroupName_Display();
				
				searchSubGroupData_KeyedOn_SearchSubGroupId.put( name_Display_Computation_Entry.getSearchSubGroupId(), response_Per_SearchSubGroupId );
			}
		}

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
		List<Integer> searchSubGroup_Ids_Selected = singleprojectSearchId_ReportedPeptideIdsPsmIds.searchSubGroup_Ids_Selected;
		
		//  Passed from client - Optional
		List<Internal_Request_Converted_PerReportedPeptideId> reportedPeptideIdsAndTheirPsmIds = singleprojectSearchId_ReportedPeptideIdsPsmIds.reportedPeptideIdsAndTheirPsmIds;
		
		//  Process reportedPeptideIds in request, or retrieve reportedPeptideIds for cutoffs and Process
		
		List<Integer> reportedPeptideIds_ForAdditionalProcessing = null;
		
		if ( reportedPeptideIdsAndTheirPsmIds != null ) {

			// Process reportedPeptideIds and possibly their PSMs in request
			
			//  Have reportedPeptideIds from client for this Project Search Id to process
			
			//  Get PSM core data for all Reported Peptide Ids

			reportedPeptideIds_ForAdditionalProcessing = new ArrayList<>( reportedPeptideIdsAndTheirPsmIds.size() );
			
			psmWebDisplayListForReportedPeptideIds = new ArrayList<>( reportedPeptideIdsAndTheirPsmIds.size() );

			for ( Internal_Request_Converted_PerReportedPeptideId reportedPeptideIdAndItsPsmIds : reportedPeptideIdsAndTheirPsmIds ) {
				
				Integer reportedPeptideId = reportedPeptideIdAndItsPsmIds.reportedPeptideId;
				List<Long> psmIds_Include = reportedPeptideIdAndItsPsmIds.psmIds_Include;
				
				reportedPeptideIds_ForAdditionalProcessing.add( reportedPeptideId );

				List<Long> psmId_List_For_psmWebDisplayList = psmIds_Include;
				
				if ( psmId_List_For_psmWebDisplayList == null || psmId_List_For_psmWebDisplayList.isEmpty() ) {

					//  No PSM IDs passed in to webservice so get PSM IDs from cutoffs and reportedPeptideId for searchId
					
					psmId_List_For_psmWebDisplayList =
							psmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher
							.getPsmIdsForSearchIdReportedPeptideIdCutoffs( reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );
				}
				
				List<PsmWebDisplayWebServiceResult> psmWebDisplayList = 
						psmWebDisplaySearcher.getPsmsWebDisplay( 
								searchId, 
								searchSubGroup_Ids_Selected, 
								psmId_List_For_psmWebDisplayList );

				transferToResult_psmWebDisplayList_Populate_PsmEntry_InternalClass(
						psmWebDisplayListForReportedPeptideIds, 
						reportedPeptideId,
						psmWebDisplayList,
						searchSubGroupData_KeyedOn_SearchSubGroupId );
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
						
			if ( webserviceRequest_Converted_Root.proteinSequenceVersionIds != null && ( ! webserviceRequest_Converted_Root.proteinSequenceVersionIds.isEmpty() ) ) {
				
				//  If protein sequence version id restriction, filter Reported Peptide Ids to those protein sequence version ids
				
				Set<Integer> reportedPeptideIdsFiltered = 
						reportedPeptideIds_For_SearchID_ProteinSequenceVersionIds_ReportedPeptideIds_Searcher.
						get_ReportedPeptideIds_For_SearchID_ProteinSequenceVersionIds_ReportedPeptideIds(
								searchId, 
								webserviceRequest_Converted_Root.proteinSequenceVersionIds, 
								reportedPeptideIds_ForAdditionalProcessing );
				
				reportedPeptideIds_ForAdditionalProcessing = new ArrayList<>( reportedPeptideIdsFiltered );
			}

			if ( reportedPeptideIds_ForAdditionalProcessing != null && ( ! reportedPeptideIds_ForAdditionalProcessing.isEmpty() ) ) {
				
				//  Have reportedPeptideIds for this Project Search Id to process

				//  Get PSM core data for all Reported Peptide Ids

				psmWebDisplayListForReportedPeptideIds = new ArrayList<>( reportedPeptideIds_ForAdditionalProcessing.size() );

				for ( Integer reportedPeptideId : reportedPeptideIds_ForAdditionalProcessing ) {

					List<PsmWebDisplayWebServiceResult> psmWebDisplayList = 
							psmWebDisplaySearcher.getPsmsWebDisplay( 
									searchId, 
									searchSubGroup_Ids_Selected, 
									null );

					transferToResult_psmWebDisplayList_Populate_PsmEntry_InternalClass(
							psmWebDisplayListForReportedPeptideIds, 
							reportedPeptideId,
							psmWebDisplayList,
							searchSubGroupData_KeyedOn_SearchSubGroupId );
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
						getScanDataFromSpectralStorageService( psmWebDisplayListForReportedPeptideIds, searchScanFileDTO_Map_Key_SearchScanFileId );
			}

			if ( searchHasScanData ) {
				//  Validate all PSMs have scan data
				validate_All_PSMs_haveScanData( psmWebDisplayListForReportedPeptideIds, scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId, searchScanFileDTO_Map_Key_SearchScanFileId );
			}
		}
		
		WriteOutputToResponse_Per_SearchId writeOutputToResponse_Per_SearchId = new WriteOutputToResponse_Per_SearchId();
		
		writeOutputToResponse_Per_SearchId.searchId = searchId;
		writeOutputToResponse_Per_SearchId.projectSearchId = projectSearchId;
		writeOutputToResponse_Per_SearchId.searchHasScanData = searchHasScanData;
		writeOutputToResponse_Per_SearchId.searchHasSubgroups = searchHasSubgroups;
		writeOutputToResponse_Per_SearchId.searchSubGroupData_KeyedOn_SearchSubGroupId = searchSubGroupData_KeyedOn_SearchSubGroupId;
		writeOutputToResponse_Per_SearchId.annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId = annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId;
		writeOutputToResponse_Per_SearchId.psmWebDisplayListForReportedPeptideIds = psmWebDisplayListForReportedPeptideIds;
		writeOutputToResponse_Per_SearchId.mods_Key_ReportedPeptideId = mods_Key_ReportedPeptideId;
		writeOutputToResponse_Per_SearchId.scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId = scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId;
		
		writeOutputToResponse_Per_SearchId.experimentDataForSearch = singleprojectSearchId_ReportedPeptideIdsPsmIds.experimentDataForSearch;
		
		return writeOutputToResponse_Per_SearchId;
	}

	/**
	 * @param psmWebDisplayListForReportedPeptideIds
	 * @param reportedPeptideId
	 * @param psmWebDisplayList
	 * @throws SQLException
	 * @throws LimelightWebappDataException 
	 */
	private void transferToResult_psmWebDisplayList_Populate_PsmEntry_InternalClass(
			List<PSMsForSingleReportedPeptideId> psmWebDisplayListForReportedPeptideIds, 
			Integer reportedPeptideId,
			List<PsmWebDisplayWebServiceResult> psmWebDisplayList,
			Map<Integer, WriteOutputToResponse_Per_SearchSubGroupId> searchSubGroupData_KeyedOn_SearchSubGroupId ) throws SQLException, LimelightWebappDataException {
		
		if ( psmWebDisplayList.isEmpty() ) {
			
			//  No PSMs so exit early
			
			return;  // EARLY RETURN
		}
		
		List<PsmEntry_InternalClass> psmEntry_InternalClass_List = new ArrayList<>( psmWebDisplayList.size() );
		for ( PsmWebDisplayWebServiceResult psmWebDisplay : psmWebDisplayList ) {
			PsmEntry_InternalClass psmEntry_InternalClass = new PsmEntry_InternalClass();
			psmEntry_InternalClass.psmWebDisplayWebServiceResult = psmWebDisplay;
			psmEntry_InternalClass_List.add(psmEntry_InternalClass);
		}
		
		if ( searchSubGroupData_KeyedOn_SearchSubGroupId != null ) {

			populate_SubGroup_Nickname_Name_ForPSMs( psmEntry_InternalClass_List, searchSubGroupData_KeyedOn_SearchSubGroupId );
		}
		
		populateReporterIonMassesForPSMs( psmEntry_InternalClass_List );
		
		populateOpenModificationMassesForPSMs( psmEntry_InternalClass_List );
		
		PSMsForSingleReportedPeptideId psmsForSingleReportedPeptideId = new PSMsForSingleReportedPeptideId();
		psmsForSingleReportedPeptideId.reportedPeptideId = reportedPeptideId;
		psmsForSingleReportedPeptideId.psmEntry_InternalClass_List = psmEntry_InternalClass_List;
		
		psmWebDisplayListForReportedPeptideIds.add( psmsForSingleReportedPeptideId );
	}
	
	//////////////////////////////////////
	
	/**
	 * @param psmEntry_InternalClass_List
	 * @param searchSubGroupData_KeyedOn_SearchSubGroupId
	 * @throws SQLException 
	 */
	private void populate_SubGroup_Nickname_Name_ForPSMs( 
			List<PsmEntry_InternalClass> psmEntry_InternalClass_List,
			Map<Integer, WriteOutputToResponse_Per_SearchSubGroupId> searchSubGroupData_KeyedOn_SearchSubGroupId ) throws SQLException {
		
		List<Long> psmIds = new ArrayList<>( psmEntry_InternalClass_List.size() );
		for ( PsmEntry_InternalClass psmEntry_InternalClass : psmEntry_InternalClass_List ) {
			psmIds.add( psmEntry_InternalClass.psmWebDisplayWebServiceResult.getPsmId() );
		}
		
		List<PsmSearchSubGroupIdsForPsmIdsSearcher_ResultItem> psmId_SubGroupId_Mapping_List = 
				psmSearchSubGroupIdsForPsmIdsSearcher.getPsmSearchSubGroupIdsForPsmIds( psmIds );
		
		Map<Long, PsmSearchSubGroupIdsForPsmIdsSearcher_ResultItem> psmId_SubGroupId_MappingMap_Key_PsmId = new HashMap<>( psmId_SubGroupId_Mapping_List.size() );
		
		for ( PsmSearchSubGroupIdsForPsmIdsSearcher_ResultItem dbResult : psmId_SubGroupId_Mapping_List ) {
			psmId_SubGroupId_MappingMap_Key_PsmId.put( dbResult.getPsmId(), dbResult );
		}
		
		for ( PsmEntry_InternalClass psmEntry_InternalClass : psmEntry_InternalClass_List ) {
			
			Long psmId = psmEntry_InternalClass.psmWebDisplayWebServiceResult.getPsmId();
			PsmSearchSubGroupIdsForPsmIdsSearcher_ResultItem psmId_SubGroupId_Mapping = psmId_SubGroupId_MappingMap_Key_PsmId.get( psmId  );
			if ( psmId_SubGroupId_Mapping == null ) {
				String msg = "No entry in psmId_SubGroupId_MappingMap_Key_PsmId for psmId: " + psmId ;
				log.error(msg);
				throw new LimelightDatabaseException(msg);
			}
			
			Integer searchSubGroupId = psmId_SubGroupId_Mapping.getSearchSubGroupId();
			
			WriteOutputToResponse_Per_SearchSubGroupId searchSubGroupData = searchSubGroupData_KeyedOn_SearchSubGroupId.get(searchSubGroupId);
			if ( searchSubGroupData == null ) {
				String msg = "No entry in searchSubGroupData_KeyedOn_SearchSubGroupId for searchSubGroupId: " + searchSubGroupId ;
				log.error(msg);
				throw new LimelightDatabaseException(msg);
			}
			
			psmEntry_InternalClass.subGroup_Nickname = searchSubGroupData.subgroupName_Display;
			psmEntry_InternalClass.subGroup_Name = searchSubGroupData.subgroupName_fromImportFile;
		}
	}

    /**
     * @param psmWebDisplayList
     * @return 
     * @throws SQLException 
     */
    private void populateReporterIonMassesForPSMs( List<PsmEntry_InternalClass> psmEntry_InternalClass_List ) throws SQLException {

    	if ( psmEntry_InternalClass_List.isEmpty() ) {
    		//  No Input entries so return 
    		return; // EARLY RETURN
    	}
    	
    	List<Long> psmIds_ContainingReporterIonMasses = new ArrayList<>( psmEntry_InternalClass_List.size() );
    	
    	for ( PsmEntry_InternalClass entry : psmEntry_InternalClass_List ) {
    		if ( entry.psmWebDisplayWebServiceResult.isHasReporterIons() ) {
    			psmIds_ContainingReporterIonMasses.add( entry.psmWebDisplayWebServiceResult.getPsmId() );
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
    	
    	for ( PsmEntry_InternalClass psmEntry_InternalClass_Entry : psmEntry_InternalClass_List ) {
    		
    		PsmWebDisplayWebServiceResult entry = psmEntry_InternalClass_Entry.psmWebDisplayWebServiceResult;
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
    				psmEntry_InternalClass_Entry.reporterIonMassList = reporterIonMassesList;
    			}
    		}
    	}
    }

	//////////////////////////////////////


    /**
     * @param psmWebDisplayList
     * @return 
     * @throws SQLException 
     * @throws LimelightWebappDataException 
     */
    private void populateOpenModificationMassesForPSMs( List<PsmEntry_InternalClass> psmEntry_InternalClass_List ) throws SQLException, LimelightWebappDataException {

    	if ( psmEntry_InternalClass_List.isEmpty() ) {
    		//  No Input entries so return 
    		return; // EARLY RETURN
    	}
    	
    	List<Long> psmIds_Containing_OpenModification_Masses = new ArrayList<>( psmEntry_InternalClass_List.size() );

    	for ( PsmEntry_InternalClass entry : psmEntry_InternalClass_List ) {
    		if ( entry.psmWebDisplayWebServiceResult.isHasOpenModifications() ) {
    			psmIds_Containing_OpenModification_Masses.add( entry.psmWebDisplayWebServiceResult.getPsmId() );
    		}
    	}

    	List<PsmOpenModificationDTO> openModificationMassesSearcherResult = 
    			openModificationMasses_PsmLevel_ForPsmIds_Searcher
    			.get_OpenModificationMasses_PsmLevel_ForPsmIds( psmIds_Containing_OpenModification_Masses );
    	
    	List<Long> psmOpenModificationIdList = new ArrayList<>( openModificationMassesSearcherResult.size() );
    	for ( PsmOpenModificationDTO item : openModificationMassesSearcherResult ) {
    		psmOpenModificationIdList.add( item.getId() );
    	}
    	
    	List<PsmOpenModificationPositionDTO> psmOpenModificationPositionDTOList =
    			openModificationPositions_PsmLevel_ForOpenModIds_Searcher
    			.get_OpenModificationMasses_PsmLevel_For_psmOpenModificationIds( psmOpenModificationIdList );
    	
    	Map<Long,List<PsmOpenModificationPositionDTO>> psmOpenModificationPositionDTOList_Map_Key_psmOpenModificationId = new HashMap<>();
    	for ( PsmOpenModificationPositionDTO item : psmOpenModificationPositionDTOList ) {
    		Long psmOpenModificationId = item.getPsmOpenModificationId();
    		List<PsmOpenModificationPositionDTO> psmOpenModificationPositionDTOList_InMap = 
    				psmOpenModificationPositionDTOList_Map_Key_psmOpenModificationId.get( psmOpenModificationId );
    		if ( psmOpenModificationPositionDTOList_InMap == null ) {
    			psmOpenModificationPositionDTOList_InMap = new ArrayList<>();
    			psmOpenModificationPositionDTOList_Map_Key_psmOpenModificationId.put( psmOpenModificationId, psmOpenModificationPositionDTOList_InMap );
    		}
    		psmOpenModificationPositionDTOList_InMap.add( item );
    	}

    	//  Copy into List in Map in Map
    	
    	Map<Long, Map<Double,List<PsmOpenModificationPositionDTO>>> openModificationPositionsList_Key_OpenModMass_Key_PsmId = new HashMap<>();
    	
    	for ( PsmOpenModificationDTO item : openModificationMassesSearcherResult ) {
    		
    		Long psmOpenModificationId = item.getId();
    		Long psmId = item.getPsmId();
    		Double openModMass = item.getMass();
    		Map<Double,List<PsmOpenModificationPositionDTO>> openModificationPositionsList_Key_OpenModMass_For_PsmId = openModificationPositionsList_Key_OpenModMass_Key_PsmId.get( psmId );
    		if ( openModificationPositionsList_Key_OpenModMass_For_PsmId == null ) {
    			openModificationPositionsList_Key_OpenModMass_For_PsmId = new HashMap<>();
    			openModificationPositionsList_Key_OpenModMass_Key_PsmId.put( psmId, openModificationPositionsList_Key_OpenModMass_For_PsmId );
    		}
    		List<PsmOpenModificationPositionDTO> openModificationPositionsList = openModificationPositionsList_Key_OpenModMass_For_PsmId.get( openModMass );
    		if ( openModificationPositionsList == null ) {
    			openModificationPositionsList = new ArrayList<>();
    			openModificationPositionsList_Key_OpenModMass_For_PsmId.put( openModMass, openModificationPositionsList );
    		}
    		
    		//  get positions (optional)
    		List<PsmOpenModificationPositionDTO> psmOpenModificationPositionDTOList_MapEntry = psmOpenModificationPositionDTOList_Map_Key_psmOpenModificationId.get( psmOpenModificationId );
    		if ( psmOpenModificationPositionDTOList_MapEntry != null ) {
    			openModificationPositionsList.addAll( psmOpenModificationPositionDTOList_MapEntry );
    		}
    	}
    	
    	for ( PsmEntry_InternalClass psmEntry_InternalClass_Entry : psmEntry_InternalClass_List ) {
    		
    		PsmWebDisplayWebServiceResult entry = psmEntry_InternalClass_Entry.psmWebDisplayWebServiceResult;
    		if ( entry.isHasOpenModifications() ) {
    			Long psmId = entry.getPsmId();
    			Map<Double,List<PsmOpenModificationPositionDTO>> openModificationPositionsList_Key_OpenModMass_For_PsmId = openModificationPositionsList_Key_OpenModMass_Key_PsmId.get( psmId );
    			if ( openModificationPositionsList_Key_OpenModMass_For_PsmId == null ) {
    				log.warn( "No entry in openModificationPositionsList_Key_OpenModMass_Key_PsmId when entry.isHasOpenModifications() is true. psmId: "
    						+ psmId );
    			}
    			if ( openModificationPositionsList_Key_OpenModMass_For_PsmId != null ) {

    				if ( openModificationPositionsList_Key_OpenModMass_For_PsmId.isEmpty() ) {
    					String msg = "openModificationPositionsList_Key_OpenModMass_For_PsmId.isEmpty() ):  Open Mod mass Map Empty for PSM.  MUST NOT be at this point.  psmId: " + psmId;
    					log.error(msg);
    					throw new LimelightWebappDataException(msg);
    				}
    				
    				if ( openModificationPositionsList_Key_OpenModMass_For_PsmId.size() > 1 ) {
    					String msg = "( openModificationPositionsList_Key_OpenModMass_For_PsmId.size() > 1 ): More than 1 Open Mod mass for PSM.  psmId: " + psmId;
    					log.error(msg);
    					throw new LimelightWebappDataException(msg);
    				}
    				
    				Map.Entry<Double,List<PsmOpenModificationPositionDTO>> openModificationPositionsList_Key_OpenModMass_For_PsmId_OnlyMapEntry = openModificationPositionsList_Key_OpenModMass_For_PsmId.entrySet().iterator().next();

					Double openModMass = openModificationPositionsList_Key_OpenModMass_For_PsmId_OnlyMapEntry.getKey();
					
    				//  Process Map entries into result display string for Open Mod Masses and positions
    				
    				psmEntry_InternalClass_Entry.openModificationMassString = openModMass.toString();
    				psmEntry_InternalClass_Entry.openModificationMassPositions_String = ""; //  Default
    				
    				//  
    				StringBuilder openModificationMassPositions_StringSB = new StringBuilder( 100000 );

    				List<PsmOpenModificationPositionDTO> psmOpenModificationPositionDTOList_ForEntry = openModificationPositionsList_Key_OpenModMass_For_PsmId_OnlyMapEntry.getValue();
    				if ( psmOpenModificationPositionDTOList_ForEntry != null && ( ! psmOpenModificationPositionDTOList_ForEntry.isEmpty() ) ) {
    					
    					psmEntry_InternalClass_Entry.openModificationMassPosition_List = new ArrayList<>( psmOpenModificationPositionDTOList_ForEntry.size() + 1 );
    					
    					boolean is_N_Terminal = false;
    					boolean is_C_Terminal = false;
    					List<Integer> positions = new ArrayList<>( psmOpenModificationPositionDTOList_ForEntry.size() );
    					for ( PsmOpenModificationPositionDTO psmOpenModificationPositionDTO : psmOpenModificationPositionDTOList_ForEntry ) {
    						if ( psmOpenModificationPositionDTO.isIs_N_Terminal() ) {
    							is_N_Terminal = true;
    						} else if ( psmOpenModificationPositionDTO.isIs_C_Terminal() ) {
    							is_C_Terminal = true;
    						}
    						if ( ( ! psmOpenModificationPositionDTO.isIs_N_Terminal() ) && ( ! psmOpenModificationPositionDTO.isIs_C_Terminal() ) ) {
    							positions.add( psmOpenModificationPositionDTO.getPosition() );
    						}
    					}
    					Collections.sort( positions );
    					boolean firstPositionEntry = true;
    					if ( is_N_Terminal ) {
    						firstPositionEntry = false;
    						openModificationMassPositions_StringSB.append( "n-term" );
    						psmEntry_InternalClass_Entry.openModificationMassPosition_List.add( SPECTRUM_VIEWER_OPEN_MOD_POSITION__N_TERM );
    					}
    					for ( Integer position : positions ) {
    						if ( ! firstPositionEntry ) {
    							openModificationMassPositions_StringSB.append( ", " );
    						}
    						firstPositionEntry = false;
    						openModificationMassPositions_StringSB.append( position );
    						psmEntry_InternalClass_Entry.openModificationMassPosition_List.add( String.valueOf( position ) );
    					}
    					if ( is_C_Terminal ) {
    						if ( ! firstPositionEntry ) {
    							openModificationMassPositions_StringSB.append( ", " );
    						}
    						openModificationMassPositions_StringSB.append( "c-term" );
    						psmEntry_InternalClass_Entry.openModificationMassPosition_List.add( SPECTRUM_VIEWER_OPEN_MOD_POSITION__C_TERM );
    					}
    				}
    				
    				String openModificationMassPositions_String = openModificationMassPositions_StringSB.toString();

    				psmEntry_InternalClass_Entry.openModificationMassPositions_String = openModificationMassPositions_String;
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
			Map<Integer, Map<Integer, SingleScan_SubResponse>> scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId,
    		Map<Integer, SearchScanFileDTO> searchScanFileDTO_Map_Key_SearchScanFileId ) {
		
		for ( PSMsForSingleReportedPeptideId psmWebDisplayListForReportedPeptideIdsEntry : psmWebDisplayListForReportedPeptideIds ) {
			for ( PsmEntry_InternalClass psmEntry_InternalClass : psmWebDisplayListForReportedPeptideIdsEntry.psmEntry_InternalClass_List ) {

				PsmWebDisplayWebServiceResult psmWebDisplay = psmEntry_InternalClass.psmWebDisplayWebServiceResult;

				SearchScanFileDTO searchScanFileDTO_Entry = null;
    			{
    				if ( psmWebDisplay.getSearchScanFileId() != null ) {

    					searchScanFileDTO_Entry = searchScanFileDTO_Map_Key_SearchScanFileId.get( psmWebDisplay.getSearchScanFileId() );
						if ( searchScanFileDTO_Entry == null ) {
							String msg = "( psmWebDisplay.getSearchScanFileId() != null ) BUT searchScanFileDTO_Map_Key_SearchScanFileId.get( psmWebDisplay.getSearchScanFileId() ) returned null.  psmWebDisplay.getSearchScanFileId(): " + psmWebDisplay.getSearchScanFileId();
							log.error(msg);
							throw new LimelightInternalErrorException(msg);
						}
    				} else {
    					if ( searchScanFileDTO_Map_Key_SearchScanFileId.size() == 1 ) {
    						
    						searchScanFileDTO_Entry = searchScanFileDTO_Map_Key_SearchScanFileId.values().iterator().next();
    					}
    				}
    			}
    			
				Map<Integer, SingleScan_SubResponse> scanData_KeyedOn_ScanNumber =
						scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId.get( searchScanFileDTO_Entry.getScanFileId() );
				if ( scanData_KeyedOn_ScanNumber == null ) {
					String msg = "ScanFileId not found in lookup map: " + searchScanFileDTO_Entry.getScanFileId();
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
				SingleScan_SubResponse scan = scanData_KeyedOn_ScanNumber.get( psmWebDisplay.getScanNumber() );
				if ( scan == null ) {
					String msg = "ScanNumber not found in lookup map: ScanNumber: " + psmWebDisplay.getScanNumber()
					+ ", ScanFileId: " + searchScanFileDTO_Entry.getScanFileId();
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
			List<PSMsForSingleReportedPeptideId> psmWebDisplayListForReportedPeptideIds,
    		Map<Integer, SearchScanFileDTO> searchScanFileDTO_Map_Key_SearchScanFileId )
					throws SQLException, Exception {

 		Map<Integer, Map<Integer, SingleScan_SubResponse>> scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId = new HashMap<>();
			
 		//  Get Scan Info from Spectral Storage Service

 		//   First get scan file ids and assoc scan numbers


 		Map<Integer, Set<Integer>> scanNumbers_KeyedOn_ScanFileId = new HashMap<>();

 		for ( PSMsForSingleReportedPeptideId psmWebDisplayListForReportedPeptideIdsEntry : psmWebDisplayListForReportedPeptideIds ) {
			for ( PsmEntry_InternalClass psmEntry_InternalClass : psmWebDisplayListForReportedPeptideIdsEntry.psmEntry_InternalClass_List ) {

				PsmWebDisplayWebServiceResult psmWebDisplay = psmEntry_InternalClass.psmWebDisplayWebServiceResult;

				SearchScanFileDTO searchScanFileDTO_Entry = null;
    			{
    				if ( psmWebDisplay.getSearchScanFileId() != null ) {

    					searchScanFileDTO_Entry = searchScanFileDTO_Map_Key_SearchScanFileId.get( psmWebDisplay.getSearchScanFileId() );
						if ( searchScanFileDTO_Entry == null ) {
							String msg = "( psmWebDisplay.getSearchScanFileId() != null ) BUT searchScanFileDTO_Map_Key_SearchScanFileId.get( psmWebDisplay.getSearchScanFileId() ) returned null.  psmWebDisplay.getSearchScanFileId(): " + psmWebDisplay.getSearchScanFileId();
							log.error(msg);
							throw new LimelightInternalErrorException(msg);
						}
    				} else {
    					if ( searchScanFileDTO_Map_Key_SearchScanFileId.size() == 1 ) {
    						
    						searchScanFileDTO_Entry = searchScanFileDTO_Map_Key_SearchScanFileId.values().iterator().next();
    					}
    				}
    			}
    			
 				Integer scanNumber = psmWebDisplay.getScanNumber();
 				
 				if ( searchScanFileDTO_Entry != null && scanNumber != null ) {
 					Set<Integer> scanNumbers = scanNumbers_KeyedOn_ScanFileId.get( searchScanFileDTO_Entry.getScanFileId() );
 					if ( scanNumbers == null ) {
 						scanNumbers = new HashSet<>();
 						scanNumbers_KeyedOn_ScanFileId.put( searchScanFileDTO_Entry.getScanFileId(), scanNumbers );
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
			SearcherCutoffValuesRootLevel searcherCutoffValuesRootLevel,
			String requestURL_Base__Before__ControllerPath,
			Integer experimentId,
			Map<Integer, SearchItemMinimal> searchItemMinimal_Key_projectSearchId,
			List<WriteOutputToResponse_Per_SearchId> writeOutputToResponse_Per_SearchId_List,
			Map<Integer, Map<Integer, SearchScanFileDTO>> searchScanFileDTO_Map_Key_SearchScanFileId_Map_Key_ProjectSearchId,
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
			writer.write( "SEARCH ID\tSEARCH NAME\tSUB GROUP NICKNAME\tSUB GROUP NAME\tSCAN NUMBER\tSPECTRUM VIEWER URLS (comma delim)\tPEPTIDE\tMODS" ); // 
			writer.write( "\tCHARGE\tOBSERVED M/Z\tRETENTION TIME (MINUTES)\tReporter Ions\tOpen Modification Mass\tOpen Modification Position(s)\tSCAN FILENAME\tIs Independent Decoy\tPROTEIN NAMES (comma delim)" );
			
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
//				Boolean searchHasSubgroups = writeOutputToResponse_For_SearchId.searchHasSubgroups;
//				Map<Integer, WriteOutputToResponse_Per_SearchSubGroupId> searchSubGroupData_KeyedOn_SearchSubGroupId = writeOutputToResponse_For_SearchId.searchSubGroupData_KeyedOn_SearchSubGroupId;

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
				
				
				Map<Integer, SearchScanFileDTO> searchScanFileDTO_Map_Key_SearchScanFileId = searchScanFileDTO_Map_Key_SearchScanFileId_Map_Key_ProjectSearchId.get( projectSearchId );
				if ( searchScanFileDTO_Map_Key_SearchScanFileId == null ) {
					String msg = "searchScanFileDTO_Map_Key_SearchScanFileId_Map_Key_ProjectSearchId does not contain projectSearchId: " + projectSearchId;
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
				
				
				Set<Integer> annTypeIdsToRetrieve = new HashSet<>();
				
				for ( Map.Entry<Integer, AnnotationTypeDTO>  mapEntry : annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId.entrySet() ) {
					AnnotationTypeDTO psmAnnotationTypeDTO = mapEntry.getValue();
					annTypeIdsToRetrieve.add( psmAnnotationTypeDTO.getId() );
				}

				if ( psmWebDisplayListForReportedPeptideIds != null && ( ! psmWebDisplayListForReportedPeptideIds.isEmpty() ) ) {
					
					//  Get Protein Names for Reported Peptide Ids

					Map<Integer, List<String>> proteinNames_List__Map_Key_ReportedPeptideId = new HashMap<>();
					
					{

						SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel = searcherCutoffValuesRootLevel.getPerSearchCutoffs( projectSearchId );

						List<Integer> reportedPeptideIds = new ArrayList<>();

						for ( PSMsForSingleReportedPeptideId psmWebDisplayListForReportedPeptideIdsEntry : psmWebDisplayListForReportedPeptideIds ) {
							reportedPeptideIds.add( psmWebDisplayListForReportedPeptideIdsEntry.reportedPeptideId );
						}
						
						ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result proteinCoverage_Result =
								proteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher.getProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIds(
										searchId, reportedPeptideIds, searcherCutoffValuesSearchLevel);
						
						Set<Integer> proteinSequenceVersionId_Set = new HashSet<>();

						for ( ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result_Item proteinCoverage_ResultItem : proteinCoverage_Result.getResults() ) {
							proteinSequenceVersionId_Set.add( proteinCoverage_ResultItem.getProteinSequenceVersionId() );
						}
						
						Map<Integer, List<ProteinSequenceVersionAnnotationItem>> proteinAnnotationDBList__Map_Key_ProteinSequenceVersionId = new HashMap<>();
						
						for ( Integer proteinSequenceVersionId : proteinSequenceVersionId_Set ) {
							List<ProteinSequenceVersionAnnotationItem> proteinAnnotationDBList = 
									proteinAnnotations_For_SearchID_ProteinVersionId_Searcher.getProteinAnnotations_For_SearchID_ProteinVersionId_Searcher(searchId, proteinSequenceVersionId);
							proteinAnnotationDBList__Map_Key_ProteinSequenceVersionId.put( proteinSequenceVersionId,  proteinAnnotationDBList );
						}

						Map<Integer, Set<String>> proteinNames_Set__Map_Key_ReportedPeptideId = new HashMap<>();
						
						for ( ProteinCoverage_RepPeptId_ProtSeqVId_ProteinStartPosition_ForSearchIdReportedPeptideIdsSearcher_Result_Item proteinCoverage_ResultItem : proteinCoverage_Result.getResults() ) {
							
							Set<String> proteinNames_Set = proteinNames_Set__Map_Key_ReportedPeptideId.get( proteinCoverage_ResultItem.getReportedPeptideId() );
							if ( proteinNames_Set == null ) {
								proteinNames_Set = new HashSet<>();
								proteinNames_Set__Map_Key_ReportedPeptideId.put( proteinCoverage_ResultItem.getReportedPeptideId(), proteinNames_Set );
							}
							
							
							List<ProteinSequenceVersionAnnotationItem> proteinAnnotationDBList = proteinAnnotationDBList__Map_Key_ProteinSequenceVersionId.get( proteinCoverage_ResultItem.getProteinSequenceVersionId() );
							if ( proteinAnnotationDBList == null ) {
								String msg = "proteinAnnotationDBList__Map_Key_ProteinSequenceVersionId.get( proteinCoverage_ResultItem.getProteinSequenceVersionId() ); returned null for proteinCoverage_ResultItem.getProteinSequenceVersionId(): " + proteinCoverage_ResultItem.getProteinSequenceVersionId();
								log.error(msg);
								throw new LimelightInternalErrorException(msg);
							}
							
							for ( ProteinSequenceVersionAnnotationItem proteinAnnotationDBItem : proteinAnnotationDBList ) {
								proteinNames_Set.add( proteinAnnotationDBItem.getName() );
							}
						}
						
						//  Transfer proteinNames_Set to List and Sort
						
						for ( Map.Entry<Integer, Set<String>> mapEntry : proteinNames_Set__Map_Key_ReportedPeptideId.entrySet() ) {
							
							List<String> proteinNames_List = new ArrayList<>( mapEntry.getValue() );
							Collections.sort( proteinNames_List );
							
							proteinNames_List__Map_Key_ReportedPeptideId.put( mapEntry.getKey(), proteinNames_List );
						}
					}
					
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
						for ( PsmEntry_InternalClass psmEntry_InternalClass : psmWebDisplayListForReportedPeptideIdsEntry.psmEntry_InternalClass_List ) {

							PsmWebDisplayWebServiceResult psmWebDisplay = psmEntry_InternalClass.psmWebDisplayWebServiceResult;

							writer.write( String.valueOf( searchId ) );
							writer.write( "\t" );
							writer.write( searchNameDisplay );
							writer.write( "\t" );
							if ( psmEntry_InternalClass.subGroup_Nickname != null ) {
								writer.write( psmEntry_InternalClass.subGroup_Nickname );
							}
							writer.write( "\t" );
							if ( psmEntry_InternalClass.subGroup_Name != null ) {
								writer.write( psmEntry_InternalClass.subGroup_Name );
							}
							writer.write( "\t" );
							writer.write( String.valueOf( psmWebDisplay.getScanNumber() ) );

							//  IF search has scan data: Link(s) to Spectrum Viewer (Lorikeet)
							
							writer.write( "\t" );
							
							if ( searchHasScanData ) {
								
								//  Link(s) to Spectrum Viewer (Lorikeet)
								
								String spectrumViewerURLs = null;
								
								String spectrumViewer_BaseURL = 
										requestURL_Base__Before__ControllerPath 
										+ AA_PageControllerPaths_Constants.LORIKEET_SPECTRUM_VIEWER_PAGE_CONTROLLER
										+ AA_PageControllerPaths_Constants.PATH_SEPARATOR
										+ LorikeetSpectrumViewer_PageController.PATH_PART_PROJECT_SEARCH_ID_LABEL
										+ AA_PageControllerPaths_Constants.PATH_SEPARATOR
										+ projectSearchId
										+ AA_PageControllerPaths_Constants.PATH_SEPARATOR
										+ LorikeetSpectrumViewer_PageController.PATH_PART_PSM_ID_LABEL
										+ AA_PageControllerPaths_Constants.PATH_SEPARATOR
										+ psmWebDisplay.getPsmId();
										
								
								if ( psmEntry_InternalClass.openModificationMassPosition_List != null && ( ! psmEntry_InternalClass.openModificationMassPosition_List.isEmpty() ) ) {

									//  YES Open Mod positions so create URL Link for each position

									StringBuilder spectrumViewerURLsSB = new StringBuilder( psmEntry_InternalClass.openModificationMassPosition_List.size() * 100 );
									
									boolean firstEntry = true;
									
									for ( String openModificationMassPosition : psmEntry_InternalClass.openModificationMassPosition_List ) {
										
										if ( firstEntry ) {
											firstEntry = false;
										} else {
											spectrumViewerURLsSB.append( ", " );
										}
										
										String spectrumViewerURL = spectrumViewer_BaseURL + OPEN_MOD_POSITION_URL_ADDITION + openModificationMassPosition;
										
										spectrumViewerURLsSB.append( spectrumViewerURL );
									}
									
									spectrumViewerURLs = spectrumViewerURLsSB.toString();
									
								} else {
									
									//  NO Open Mod positions so create single URL Link
									
									spectrumViewerURLs = spectrumViewer_BaseURL;
								}

								writer.write( spectrumViewerURLs );
								
							} else {
								
								//  NO Scan Data
								
							}
							
							writer.write( "\t" );
							writer.write( peptideString );
							writer.write( "\t" );
							writer.write( modString );
							writer.write( "\t" );

							writer.write( String.valueOf( psmWebDisplay.getCharge() ) );
							
							

							SearchScanFileDTO searchScanFileDTO_Entry = null;
			    			{
			    				if ( psmWebDisplay.getSearchScanFileId() != null ) {

			    					searchScanFileDTO_Entry = searchScanFileDTO_Map_Key_SearchScanFileId.get( psmWebDisplay.getSearchScanFileId() );
									if ( searchScanFileDTO_Entry == null ) {
										String msg = "( psmWebDisplay.getSearchScanFileId() != null ) BUT searchScanFileDTO_Map_Key_SearchScanFileId.get( psmWebDisplay.getSearchScanFileId() ) returned null.  psmWebDisplay.getSearchScanFileId(): " + psmWebDisplay.getSearchScanFileId();
										log.error(msg);
										throw new LimelightInternalErrorException(msg);
									}
			    				} else {
			    					if ( searchScanFileDTO_Map_Key_SearchScanFileId.size() == 1 ) {
			    						
			    						searchScanFileDTO_Entry = searchScanFileDTO_Map_Key_SearchScanFileId.values().iterator().next();
			    					}
			    				}
			    			}
			    			
			    			


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

				    			if ( searchScanFileDTO_Entry == null ) {
				    				String msg = "'else' of '} else if ( ( ! searchHasScanData )': ( searchScanFileDTO_Entry == null ).  psmWebDisplay.getSearchScanFileId(): " + psmWebDisplay.getSearchScanFileId() + ", searchScanFileDTO_Map_Key_SearchScanFileId.size(): " + searchScanFileDTO_Map_Key_SearchScanFileId.size();
									log.error(msg);
									throw new LimelightInternalErrorException(msg);
				    			}
				    			
								Map<Integer, SingleScan_SubResponse> scanData_KeyedOn_ScanNumber =
										scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId.get( searchScanFileDTO_Entry.getScanFileId() );
								if ( scanData_KeyedOn_ScanNumber == null ) {
									String msg = "ScanFileId not found in lookup map: " 
											+ searchScanFileDTO_Entry.getScanFileId()
											+ ", search id: " + searchId;
									log.error(msg);
									throw new LimelightInternalErrorException(msg);
								}
								SingleScan_SubResponse scan = scanData_KeyedOn_ScanNumber.get( psmWebDisplay.getScanNumber() );
								if ( scan == null ) {
									String msg = "ScanNumber not found in lookup map: ScanNumber: " 
											+ psmWebDisplay.getScanNumber()
											+ ", ScanFileId: " + searchScanFileDTO_Entry.getScanFileId()
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
								List<BigDecimal> reporterIonMassList = psmEntry_InternalClass.reporterIonMassList;
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
							{
								String openModificationMassString = psmEntry_InternalClass.openModificationMassString;
								if ( openModificationMassString != null ) {

									writer.write( String.valueOf( openModificationMassString ) );
								}
							}
							writer.write( "\t" );
							{
								String openModificationMassPositions_String = psmEntry_InternalClass.openModificationMassPositions_String;
								if ( openModificationMassPositions_String != null ) {

									writer.write( String.valueOf( openModificationMassPositions_String ) );
								}
							}

							writer.write( "\t" );
							if ( searchScanFileDTO_Entry != null && searchScanFileDTO_Entry.getFilename() != null ) {
								writer.write( searchScanFileDTO_Entry.getFilename() );
							}

							writer.write( "\t" );
							if ( psmWebDisplay.isPsmIs_IndependentDecoy() ) {
								writer.write( "true" );
							} else {
								writer.write( "false" );
							}
							
							{
								List<String> proteinNames_List = proteinNames_List__Map_Key_ReportedPeptideId.get( reportedPeptideId );
								if ( proteinNames_List == null ) {
									String msg = "proteinNames_List__Map_Key_ReportedPeptideId.get( reportedPeptideId ); returned null for reportedPeptideId: " + reportedPeptideId;
									log.error(msg);
									throw new LimelightInternalErrorException(msg);
								}
								String proteinNames_String = StringUtils.join( proteinNames_List, ", " );
								
								writer.write( "\t" );
								writer.write( proteinNames_String );
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
			    					List<Long> psmList = new ArrayList<>( 1 );
			    					psmList.add( psmWebDisplay.getPsmId() );
			    					
									//  Filterable Ann Types
									List<PsmFilterableAnnotationDTO> psmFilterableAnnotationDTOList =
											psm_FilterableAnnotationData_Searcher
											.getPsmFilterableAnnotationDTOList( 
													psmList, annTypeIdsToRetrieve );

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
	
	
	///////////////////////////////
	///////////////////////////////
	
	///////   Internal Classes While Processing
	

	/**
	 * Internal PSMs for Single Reported Peptide Id
	 */
	private static class PSMsForSingleReportedPeptideId {

		private Integer reportedPeptideId;
		
		List<PsmEntry_InternalClass> psmEntry_InternalClass_List;
	}

	/**
	 * Internal PSM
	 *
	 */
	private static class PsmEntry_InternalClass {
		
		private PsmWebDisplayWebServiceResult psmWebDisplayWebServiceResult;
		
		private String subGroup_Nickname; //  Computed or User Entered;
		private String subGroup_Name; //  From Imported Search

		private List<BigDecimal> reporterIonMassList;
		private String openModificationMassString;
		private String openModificationMassPositions_String;
		private List<String> openModificationMassPosition_List;
	}
	
	/**
	 * Internal Data for writeOutputToResponse Per Search Id
	 */
	private static class WriteOutputToResponse_Per_SearchId {

		int projectSearchId;
		int searchId;
		Boolean searchHasScanData; 
		Boolean searchHasSubgroups;
		Map<Integer, WriteOutputToResponse_Per_SearchSubGroupId> searchSubGroupData_KeyedOn_SearchSubGroupId;
		Map<Integer, AnnotationTypeDTO> annotationTypeDTO_ForDisplay_Map_Key_annotationTypeId;
		List<PSMsForSingleReportedPeptideId> psmWebDisplayListForReportedPeptideIds;
		Map<Integer,List<DynamicModificationsInReportedPeptidesForSearchIdReportedPeptideIdSearcher_Item>> mods_Key_ReportedPeptideId;
		Map<Integer, Map<Integer, SingleScan_SubResponse>> scanData_KeyedOn_ScanNumber_KeyedOn_ScanFileId;
		
		List<RequestJSONParsed_PerConditionGroupConditionData> experimentDataForSearch;
	}
	/**
	 * Internal Data for writeOutputToResponse Per Search Sub Group Id
	 */
	private static class WriteOutputToResponse_Per_SearchSubGroupId {

		String subgroupName_fromImportFile;
		String subgroupName_Display; // null until user enters a value
	}
	

	
	///////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////
	
	///////   Internal Classes Convert Request Object To
	

	/**
	 * Converted From Request
	 */
	public static class Internal_Request_Converted_Request_Root {

		private List<Internal_Request_Converted_PerProjectSearchId> projectSearchIdsReportedPeptideIdsPsmIds;
		private SearchDataLookupParamsRoot searchDataLookupParamsRoot;
		
		private List<Integer> proteinSequenceVersionIds; // optional
		
		private Integer experimentId;
	}

	/**
	 * Converted From Request
	 */
	public static class Internal_Request_Converted_PerProjectSearchId {
		
		private Integer projectSearchId;
		
		private List<Integer> searchSubGroup_Ids_Selected; //  Optional
		
		private List<RequestJSONParsed_PerConditionGroupConditionData> experimentDataForSearch; //  Optional

		/**
		 * Converted From Request
		 */
		private List<Internal_Request_Converted_PerReportedPeptideId> reportedPeptideIdsAndTheirPsmIds; //  Optional
		
	}
	
	/**
	 * Converted From Request
	 */
	public static class Internal_Request_Converted_PerReportedPeptideId {
		
		private Integer reportedPeptideId;
		private List<Long> psmIds_Include;
	}


	///////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////
	
	///////   Request Object 
	

	////////////////

	/**
	 * Request JSON Parsed representation
	 */
	public static class RequestJSONParsed {
		
		private Integer requestVersion;

		private List<RequestJSONParsed_PerProjectSearchId> projectSearchIdsReportedPeptideIdsPsmIds;
		private SearchDataLookupParamsRoot searchDataLookupParamsRoot;
		
		private List<Integer> proteinSequenceVersionIds; // optional
		
		private Integer experimentId;

        private String psmId_SeparatorString;
        private String reportedPeptideId_To_PsmId_SeparatorString;
        private String reportedPeptideId_Block_SeparatorString;
        private Integer reportedPeptideId_PsmId_NumberEncoding_Radix;
        

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
		public void setPsmId_SeparatorString(String psmId_SeparatorString) {
			this.psmId_SeparatorString = psmId_SeparatorString;
		}
		public void setReportedPeptideId_To_PsmId_SeparatorString(String reportedPeptideId_To_PsmId_SeparatorString) {
			this.reportedPeptideId_To_PsmId_SeparatorString = reportedPeptideId_To_PsmId_SeparatorString;
		}
		public void setReportedPeptideId_Block_SeparatorString(String reportedPeptideId_Block_SeparatorString) {
			this.reportedPeptideId_Block_SeparatorString = reportedPeptideId_Block_SeparatorString;
		}
		public void setReportedPeptideId_PsmId_NumberEncoding_Radix(Integer reportedPeptideId_PsmId_NumberEncoding_Radix) {
			this.reportedPeptideId_PsmId_NumberEncoding_Radix = reportedPeptideId_PsmId_NumberEncoding_Radix;
		}
		public void setRequestVersion(Integer requestVersion) {
			this.requestVersion = requestVersion;
		}
	}
	
	public static class RequestJSONParsed_PerProjectSearchId {
		
		private Integer projectSearchId;
		
		private List<Integer> searchSubGroup_Ids_Selected; //  Optional
		
		//  Replaced with reportedPeptideIdsAndTheirPsmIds__Encoded
//		private List<RequestJSONParsed_PerReportedPeptideId> reportedPeptideIdsAndTheirPsmIds; //  Optional
		
		private String reportedPeptideIdsAndTheirPsmIds__Encoded;  //  Optional
		
		private Long minimum_PSM_ID_InRequest_For_Search;
		
		private List<RequestJSONParsed_PerConditionGroupConditionData> experimentDataForSearch; //  Optional
		
		public void setProjectSearchId(Integer projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
//		public void setReportedPeptideIdsAndTheirPsmIds( List<RequestJSONParsed_PerReportedPeptideId> reportedPeptideIdsAndTheirPsmIds) {
//			this.reportedPeptideIdsAndTheirPsmIds = reportedPeptideIdsAndTheirPsmIds;
//		}
		public void setExperimentDataForSearch(List<RequestJSONParsed_PerConditionGroupConditionData> experimentDataForSearch) {
			this.experimentDataForSearch = experimentDataForSearch;
		}
		public void setSearchSubGroup_Ids_Selected(List<Integer> searchSubGroup_Ids_Selected) {
			this.searchSubGroup_Ids_Selected = searchSubGroup_Ids_Selected;
		}
		public void setReportedPeptideIdsAndTheirPsmIds__Encoded(String reportedPeptideIdsAndTheirPsmIds__Encoded) {
			this.reportedPeptideIdsAndTheirPsmIds__Encoded = reportedPeptideIdsAndTheirPsmIds__Encoded;
		}
		public void setMinimum_PSM_ID_InRequest_For_Search(Long minimum_PSM_ID_InRequest_For_Search) {
			this.minimum_PSM_ID_InRequest_For_Search = minimum_PSM_ID_InRequest_For_Search;
		}
	}

//	public static class RequestJSONParsed_PerReportedPeptideId {
//		
//		private Integer reportedPeptideId;
//		private List<Long> psmIds_Include;
//		
//		public void setReportedPeptideId(Integer reportedPeptideId) {
//			this.reportedPeptideId = reportedPeptideId;
//		}
//		public void setPsmIds_Include(List<Long> psmIds_Include) {
//			this.psmIds_Include = psmIds_Include;
//		}
//	}

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
