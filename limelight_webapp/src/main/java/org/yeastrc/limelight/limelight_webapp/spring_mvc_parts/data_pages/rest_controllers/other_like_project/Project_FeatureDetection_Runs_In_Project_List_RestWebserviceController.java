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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.other_like_project;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFilename_DTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsLimelightXMLFileImportFullyConfiguredIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFile_For_ProjectScanFileId_Set_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFilename_For_ProjectScanFileId_Set_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher.FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher.FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher.ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Return data for Feature Detection Runs in Project ( by mapping file )
 * 
 *
 */
@RestController
public class Project_FeatureDetection_Runs_In_Project_List_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Project_FeatureDetection_Runs_In_Project_List_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;

	@Autowired
	private IsLimelightXMLFileImportFullyConfiguredIF isLimelightXMLFileImportFullyConfigured;
	
	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	@Autowired
	private FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_IF featureDetection_Root_Mapping_Entries_For_ProjectId_Searcher;

	@Autowired 
	private ProjectScanFile_For_ProjectScanFileId_Set_Searcher_IF projectScanFile_For_ProjectScanFileId_Set_Searcher;
	
	@Autowired 
	private ProjectScanFilename_For_ProjectScanFileId_Set_Searcher_IF projectScanFilename_For_ProjectScanFileId_Set_Searcher;
	
	@Autowired
	private ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_IF scanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Project_FeatureDetection_Runs_In_Project_List_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.PROJECT_FEATURE_DETECTION_RUNS_IN_PROJECT_LIST_REST_WEBSERVICE_CONTROLLER
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
    		//		log.warn( "projectView(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		WebserviceRequest projectViewSearchListRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		String projectIdentifier = projectViewSearchListRequest.projectIdentifier;
    		
    		if ( StringUtils.isEmpty( projectIdentifier ) ) {
    			log.warn( "projectIdentifier is empty or not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		int projectId = 0;

    		try {
    			projectId = Integer.parseInt( projectIdentifier );

    		} catch ( RuntimeException e ) {
    			log.warn( "Project Identifier not parsable to int: " + projectIdentifier );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( projectId );
			
			GetWebSessionAuthAccessLevelForProjectIds_Result getWebSessionAuthAccessLevelForProjectIds_Result =
					getWebSessionAuthAccessLevelForProjectIds.getAuthAccessLevelForProjectIds( projectIds, httpServletRequest );

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = getWebSessionAuthAccessLevelForProjectIds_Result.getWebSessionAuthAccessLevel();
			
			if ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() ) {
				
				String msg = "( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() )  Throw Limelight_WS_AuthError_Unauthorized_Exception";
				log.info( msg );
				throw new Limelight_WS_AuthError_Unauthorized_Exception();
			}
			
			//  End Authorization
			
			/////////////
			
			//  Feature Detection Data
			
			FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result featureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result =
					featureDetection_Root_Mapping_Entries_For_ProjectId_Searcher.getForProjectId(projectId);
			
			
			Set<Integer> project_scan_file_id__In_FeatureDetectEntries_Set = new HashSet<>( featureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result.getEntries().size() );
			
			for ( FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result_Item searcher_ResultItem : featureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result.getEntries() ) {
				
				project_scan_file_id__In_FeatureDetectEntries_Set.add( searcher_ResultItem.getProject_scan_file_id() );
			}
			
			
			
			////   Scan File data
			
			List<Project_ScanFile_DTO>  projectScanFile_List =
					projectScanFile_For_ProjectScanFileId_Set_Searcher.get_For_ProjectScanFileId_Set_Searcher(project_scan_file_id__In_FeatureDetectEntries_Set);
			
			Map<Integer, Project_ScanFile_DTO> project_ScanFile_DTO_Map_Key_ProjectScanFileId = new HashMap<>( projectScanFile_List.size() );
			
			Set<Integer> projectScanFileIds_Set = new HashSet<>( projectScanFile_List.size() );
			Set<Integer> scanFileIds_Set = new HashSet<>( projectScanFile_List.size() );
			
			for ( Project_ScanFile_DTO project_ScanFile_DTO : projectScanFile_List ) {
				
				Integer projectScanFileId = project_ScanFile_DTO.getId();
				
				if ( project_ScanFile_DTO_Map_Key_ProjectScanFileId.put(projectScanFileId, project_ScanFile_DTO) != null ) {
					String msg = "projectScanFile_List contains more than one result entry with same id: " + project_ScanFile_DTO.getId();
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}

				projectScanFileIds_Set.add(projectScanFileId);
				scanFileIds_Set.add( project_ScanFile_DTO.getScanFileId() );
			}
			
			//  Get Project Scan File Filenames
			
			Map<Integer, Set<String>> scanFilenames_Set_Map_Key_ProjectScanFileId = new HashMap<>( projectScanFile_List.size() );
			
			{
				List<Project_ScanFilename_DTO>  db_resultList =
						projectScanFilename_For_ProjectScanFileId_Set_Searcher.get_For_ProjectScanFileId_Set_Searcher(projectScanFileIds_Set);
				
				for ( Project_ScanFilename_DTO db_result : db_resultList ) {
					
					Integer projectScanFileId = db_result.getProjectScanFileId();
					Set<String> scanFilenames_Set = scanFilenames_Set_Map_Key_ProjectScanFileId.get(projectScanFileId);
					if ( scanFilenames_Set == null ) {
						scanFilenames_Set = new HashSet<>();
						scanFilenames_Set_Map_Key_ProjectScanFileId.put( projectScanFileId, scanFilenames_Set );
					}
					scanFilenames_Set.add( db_result.getScanFilename() );
				}
			}
			
			Map<Integer, String> scanFile_Code_FirstSix_String__Map_Key_ScanFileId = new HashMap<>( scanFileIds_Set.size() );
			
			{  //  Get Spectral Storage API Key values for scanFileIds_Set and populate into webserviceResultItem_Map_Key_ProjectScanFileId

				List<Integer> scanFileId_List = new ArrayList<>( scanFileIds_Set );

				List<ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_ResultItem> spectralStorageAPIKey_Searcher_ResultItem_List = 
						scanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher.getSpectralStorageAPIKeyList_From_ScanFileIdList(scanFileId_List);

				for ( ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_ResultItem searcher_ResultItem : spectralStorageAPIKey_Searcher_ResultItem_List ) {

					String spectralStorageAPIKey_FirstSix = searcher_ResultItem.getSpectralStorage_API_Key().substring(0,6);

					if ( scanFile_Code_FirstSix_String__Map_Key_ScanFileId.put( searcher_ResultItem.getScanFileId(), spectralStorageAPIKey_FirstSix ) != null ) {
						String msg = "spectralStorageAPIKey_Searcher_ResultItem_List has more than 1 entry with same scan file id.  scanFileId: " + searcher_ResultItem.getScanFileId() + ", projectId: " + projectId;
						log.error(msg);
						throw new LimelightInternalErrorException(msg);
					}
				}
			}

    		WebserviceResult webserviceResult = new WebserviceResult();

        	webserviceResult.feature_detection_root__project_scnfl_mapping_tbl__id_List = new ArrayList<>( featureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result.getEntries().size() );
    		webserviceResult.project_scan_file_id_List = new ArrayList<>( featureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result.getEntries().size() );
    		
    		webserviceResult.displayLabel_List = new ArrayList<>( featureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result.getEntries().size() );
    		webserviceResult.description_List = new ArrayList<>( featureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result.getEntries().size() );
    		
        	webserviceResult.scanFilename_Set_List = new ArrayList<>( featureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result.getEntries().size() );

        	webserviceResult.scanFileId_List = new ArrayList<>( featureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result.getEntries().size() );
        	webserviceResult.scanFile_Code_FirstSix_List = new ArrayList<>( featureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result.getEntries().size() );
    		        	

			for ( FeatureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result_Item featureDetection_Searcher_ResultItem : featureDetection_Root_Mapping_Entries_For_ProjectId_Searcher_Result.getEntries() ) {
				
				webserviceResult.feature_detection_root__project_scnfl_mapping_tbl__id_List.add( featureDetection_Searcher_ResultItem.getFeature_detection_root__project_scnfl_mapping_tbl__id() );
				webserviceResult.project_scan_file_id_List.add( featureDetection_Searcher_ResultItem.getProject_scan_file_id() );
				webserviceResult.displayLabel_List.add( featureDetection_Searcher_ResultItem.getDisplayLabel() );
				webserviceResult.description_List.add( featureDetection_Searcher_ResultItem.getDescription() );

				{
					Set<String> scanFilenames_Set = scanFilenames_Set_Map_Key_ProjectScanFileId.get( featureDetection_Searcher_ResultItem.getProject_scan_file_id() );
					if ( scanFilenames_Set == null ) {
						String msg = "scanFilenames_Set NOT FOUND for featureDetection_Searcher_ResultItem.getProject_scan_file_id(): " 
								+ featureDetection_Searcher_ResultItem.getProject_scan_file_id() 
								+ ", featureDetection_Searcher_ResultItem.getFeature_detection_root__project_scnfl_mapping_tbl__id(): "
								+ featureDetection_Searcher_ResultItem.getFeature_detection_root__project_scnfl_mapping_tbl__id();
						log.error(msg);
						throw new LimelightInternalErrorException(msg);
					}

					webserviceResult.scanFilename_Set_List.add(scanFilenames_Set);
				}

				Project_ScanFile_DTO project_ScanFile_DTO = project_ScanFile_DTO_Map_Key_ProjectScanFileId.get( featureDetection_Searcher_ResultItem.getProject_scan_file_id() );
				if ( project_ScanFile_DTO == null ) {
					String msg = "Project_ScanFile_DTO NOT FOUND for featureDetection_Searcher_ResultItem.getProject_scan_file_id(): " 
							+ featureDetection_Searcher_ResultItem.getProject_scan_file_id() 
							+ ", featureDetection_Searcher_ResultItem.getFeature_detection_root__project_scnfl_mapping_tbl__id(): "
							+ featureDetection_Searcher_ResultItem.getFeature_detection_root__project_scnfl_mapping_tbl__id();
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
				
				webserviceResult.scanFileId_List.add( project_ScanFile_DTO.getScanFileId() );
				
				String scanFile_Code_FirstSix_String = scanFile_Code_FirstSix_String__Map_Key_ScanFileId.get( project_ScanFile_DTO.getScanFileId() );
				if ( scanFile_Code_FirstSix_String == null ) {
					String msg = "scanFile_Code_FirstSix_String NOT FOUND for project_ScanFile_DTO.getScanFileId(): "
							+ project_ScanFile_DTO.getScanFileId()
							+ ", featureDetection_Searcher_ResultItem.getProject_scan_file_id(): " 
							+ featureDetection_Searcher_ResultItem.getProject_scan_file_id() 
							+ ", featureDetection_Searcher_ResultItem.getFeature_detection_root__project_scnfl_mapping_tbl__id(): "
							+ featureDetection_Searcher_ResultItem.getFeature_detection_root__project_scnfl_mapping_tbl__id();
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
				
				webserviceResult.scanFile_Code_FirstSix_List.add(scanFile_Code_FirstSix_String);
			}
			
			if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
				
				webserviceResult.userIsProjectOwner = true;
			}
    		
    		{
        		//  Is Limelight XML File Import is Fully Configured,
        		
        		if ( isLimelightXMLFileImportFullyConfigured.isLimelightXMLFileImportFullyConfigured() ) {
        			
        			//  File Import is Fully Configured,
        			
    				webserviceResult.standardRunImporter_IsFullyConfigured = true;
		    	
		    		{
		    			String basePath =
		    					configSystemDAO.getConfigValueForConfigKey(
		    							ConfigSystemsKeysSharedConstants.RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_RESULT_FILES_BASE_PATH );
		
		    			String baseURL =
		    					configSystemDAO.getConfigValueForConfigKey(
		    							ConfigSystemsKeysSharedConstants.RUN_FEATURE_DETECTION_SERVICE_RUN_HARDKLOR_BULLSEYE_WEB_SERVICE_BASE_URL );
		    			
		    			if ( StringUtils.isNotEmpty( basePath ) && StringUtils.isNotEmpty( baseURL ) ) {
		    				
		    				webserviceResult.runFeatureDetection_IsFullyConfigured = true;
		    			}
		    		}
    			}
    		}

    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

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
    
    /////////////////////////////////////
    

    public static class WebserviceRequest {
    	
    	private String projectIdentifier;

		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
    }
    
    public static class WebserviceResult {

    	private List<Integer> feature_detection_root__project_scnfl_mapping_tbl__id_List;
		private List<Integer> project_scan_file_id_List;
		
		private List<String> displayLabel_List;
		private List<String> description_List;

    	private List<Set<String>> scanFilename_Set_List;
    	
		private List<Integer> scanFileId_List;
    	private List<String> scanFile_Code_FirstSix_List;
		
    	private boolean userIsProjectOwner;
    	
    	private boolean standardRunImporter_IsFullyConfigured;
    	private boolean runFeatureDetection_IsFullyConfigured;

		public boolean isRunFeatureDetection_IsFullyConfigured() {
			return runFeatureDetection_IsFullyConfigured;
		}

		public boolean isStandardRunImporter_IsFullyConfigured() {
			return standardRunImporter_IsFullyConfigured;
		}

		public List<Integer> getFeature_detection_root__project_scnfl_mapping_tbl__id_List() {
			return feature_detection_root__project_scnfl_mapping_tbl__id_List;
		}

		public List<Integer> getProject_scan_file_id_List() {
			return project_scan_file_id_List;
		}

		public List<String> getDisplayLabel_List() {
			return displayLabel_List;
		}

		public List<String> getDescription_List() {
			return description_List;
		}

		public List<Set<String>> getScanFilename_Set_List() {
			return scanFilename_Set_List;
		}

		public List<Integer> getScanFileId_List() {
			return scanFileId_List;
		}

		public List<String> getScanFile_Code_FirstSix_List() {
			return scanFile_Code_FirstSix_List;
		}

		public boolean isUserIsProjectOwner() {
			return userIsProjectOwner;
		}
    }
    
}


