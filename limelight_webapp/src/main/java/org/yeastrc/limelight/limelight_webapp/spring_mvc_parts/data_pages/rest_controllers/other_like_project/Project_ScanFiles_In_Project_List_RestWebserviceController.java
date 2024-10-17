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
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsValuesSharedConstants;
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
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFile_For_ProjectId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchId_AnyExists_For_ProjectScanFileId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Root_Entries_IsAnyExists_For_ProjectScanFileId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFile_For_ProjectId_Searcher.ProjectScanFile_For_ProjectId_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers.ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher.ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Return data for Scan Files in Project
 * 
 *
 */
@RestController
public class Project_ScanFiles_In_Project_List_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Project_ScanFiles_In_Project_List_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;

	@Autowired
	private IsLimelightXMLFileImportFullyConfiguredIF isLimelightXMLFileImportFullyConfigured;
	
	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;

	@Autowired 
	private ProjectScanFile_For_ProjectId_Searcher_IF projectScanFile_For_ProjectId_Searcher;
	
	@Autowired
	private ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_IF scanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher;
	
	@Autowired
	private ProjectSearchId_AnyExists_For_ProjectScanFileId_Searcher_IF projectSearchId_AnyExists_For_ProjectScanFileId_Searcher;
	
	@Autowired
	private FeatureDetection_Root_Entries_IsAnyExists_For_ProjectScanFileId_Searcher_IF featureDetection_Root_Entries_IsAnyExists_For_ProjectScanFileId_Searcher;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Project_ScanFiles_In_Project_List_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.PROJECT_SCAN_FILES_IN_PROJECT_LIST_REST_WEBSERVICE_CONTROLLER
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
			
			boolean userIsProjectOwner = false;
			
			if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
				
				userIsProjectOwner = true;
			}
			

			boolean scanFileDownload_Allowed_InConfig = false;
			{
				String configValue_SCAN_FILE_DOWNLOAD_FROM_FILE_OBJECT_STORAGE_ALLOWED_KEY = configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.SCAN_FILE_DOWNLOAD_FROM_FILE_OBJECT_STORAGE_ALLOWED_KEY );
				
				String configValue_YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL = configSystemDAO.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL );
				if ( configValue_YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL != null ) {
					configValue_YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL = configValue_YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL.trim();
				}
				
				if ( ConfigSystemsValuesSharedConstants.TRUE.equals( configValue_SCAN_FILE_DOWNLOAD_FROM_FILE_OBJECT_STORAGE_ALLOWED_KEY )
						&& StringUtils.isNotEmpty( configValue_YRC_FILE_OBJECT_STORAGE_WEB_SERVICE_BASE_URL ) ) {
					scanFileDownload_Allowed_InConfig = true;
				}
			}
			
			
			List<ProjectScanFile_For_ProjectId_Searcher_ResultItem> searcherResult_List = projectScanFile_For_ProjectId_Searcher.getProjectScanFile_For_ProjectId(projectId);

			Map<Integer, WebserviceResultItem> webserviceResultItem_Map_Key_ProjectScanFileId = new HashMap<>( searcherResult_List.size() );
			Set<Integer> scanFileIds_Set = new HashSet<>( searcherResult_List.size() );
			
			for ( ProjectScanFile_For_ProjectId_Searcher_ResultItem searcherResult_Item : searcherResult_List ) {
				
				Integer projectScanFileId = searcherResult_Item.getProjectScanFileId();

				WebserviceResultItem webserviceResultItem = webserviceResultItem_Map_Key_ProjectScanFileId.get( projectScanFileId );
				if ( webserviceResultItem == null ) {

					//  Result Item for Project Scan File NOT already created SO create now

					webserviceResultItem = new WebserviceResultItem();
					webserviceResultItem_Map_Key_ProjectScanFileId.put(projectScanFileId, webserviceResultItem);
					webserviceResultItem.projectScanFileId = searcherResult_Item.getProjectScanFileId();
					webserviceResultItem.scanFileId = searcherResult_Item.getScanFileId();
					webserviceResultItem.scanFilename_Set = new HashSet<>();
					
					if ( scanFileDownload_Allowed_InConfig && searcherResult_Item.getFile_object_storage_main_entry_tbl_id() != null ) {
						// ConfigSystemsKeysSharedConstants.SCAN_FILE_DOWNLOAD_FROM_FILE_OBJECT_STORAGE_ALLOWED_KEY
						// Has scan_file_tbl.file_object_storage_main_entry_id_fk so scan file contents in File Object Storage
						webserviceResultItem.canDownload = true;
					}
					
					scanFileIds_Set.add( searcherResult_Item.getScanFileId() );
				} else {

					//  Validate that Scan File Id is same
					if ( webserviceResultItem.scanFileId != searcherResult_Item.getScanFileId() ) {
						String msg = "( webserviceResultItem.scanFileId != searcherResult_Item.getScanFileId() ).  webserviceResultItem.projectScanFileId: " + webserviceResultItem.projectScanFileId;
						log.error(msg);
						throw new LimelightInternalErrorException(msg);
					}
				}

				webserviceResultItem.scanFilename_Set.add( searcherResult_Item.getScanFilename() );
			}
			
			{  //  Get Spectral Storage API Key values for scanFileIds_Set and populate into webserviceResultItem_Map_Key_ProjectScanFileId

				List<Integer> scanFileId_List = new ArrayList<>( scanFileIds_Set );

				List<ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_ResultItem> spectralStorageAPIKey_Searcher_ResultItem_List = 
						scanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher.getSpectralStorageAPIKeyList_From_ScanFileIdList(scanFileId_List);

				//  Transfer Spectral Storage API Key values for scanFileIds_Set into Map key Scan File Id
				
				Map<Integer, ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_ResultItem> spectralStorageAPIKey_Searcher_ResultItem_Map_Key_ScanFileId = new HashMap<>( spectralStorageAPIKey_Searcher_ResultItem_List.size() );

				for ( ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_ResultItem searcher_ResultItem : spectralStorageAPIKey_Searcher_ResultItem_List ) {
					
					if ( spectralStorageAPIKey_Searcher_ResultItem_Map_Key_ScanFileId.put( searcher_ResultItem.getScanFileId(), searcher_ResultItem) != null ) {
						String msg = "spectralStorageAPIKey_Searcher_ResultItem_List has more than 1 entry with same scan file id.  scanFileId: " + searcher_ResultItem.getScanFileId() + ", projectId: " + projectId;
						log.error(msg);
						throw new LimelightInternalErrorException(msg);
					}
				}

				//  populate Spectral Storage API Key values for scanFileIds_Set  into webserviceResultItem_Map_Key_ProjectScanFileId

				for ( WebserviceResultItem webserviceResultItem : webserviceResultItem_Map_Key_ProjectScanFileId.values() ) {
					
					ScanFile_SpectralStorageAPIKey_List_For_ScanFileId_List_Searcher_ResultItem searcher_ResultItem = spectralStorageAPIKey_Searcher_ResultItem_Map_Key_ScanFileId.get( webserviceResultItem.scanFileId );

					if ( searcher_ResultItem == null ) {
						String msg = "getSpectralStorageAPIKeyList_From_ScanFileIdList(...) NOT return record with scanFileId.  Not returned : " + webserviceResultItem.scanFileId;
						log.error(msg);
						throw new LimelightInternalErrorException(msg);
					}
					
					String spectralStorageAPIKey_FirstSix = searcher_ResultItem.getSpectralStorage_API_Key().substring(0,6);

					webserviceResultItem.scanFile_Code_FirstSix = spectralStorageAPIKey_FirstSix;
				}
			}
			

			List<WebserviceResultItem> resultItemList = new ArrayList<>( webserviceResultItem_Map_Key_ProjectScanFileId.values() );

			//  Remove Is Project Check since need to always check for if has any searches
			
			
//			if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
				
				//  Project Owner so determine if the scan file can be removed from the project.
				
				//   Scan file cannot be removed if there are associated searches or feature detection in the project
				
				for ( WebserviceResultItem resultItem : resultItemList ) {

					boolean canDeleteEntry = true;
					boolean entryHasAnyRelatedProjectSearchId = false;
					
					boolean entryHasFeatureDetection = false;

					//  TODO  Comment out tests to see what happens
					
					if ( projectSearchId_AnyExists_For_ProjectScanFileId_Searcher.is_ProjectSearchId_AnyExists_For_ProjectScanFileId_Searcher( resultItem.projectScanFileId ) ) {

						canDeleteEntry = false;
						entryHasAnyRelatedProjectSearchId = true;
					}
					
					//  SKIP since Foreign Key Cascade will delete Feature Detection entries for projectScanFileId
					
//					if ( canDeleteEntry ) {
//
//						if ( featureDetection_Root_Entries_IsAnyExists_For_ProjectScanFileId_Searcher.is_AnyExists_ForProjectScanFileId( resultItem.projectScanFileId ) ) {
//
//							canDeleteEntry = false;
//						}
//					}

					if ( featureDetection_Root_Entries_IsAnyExists_For_ProjectScanFileId_Searcher.is_AnyExists_ForProjectScanFileId( resultItem.projectScanFileId ) ) {

						entryHasFeatureDetection = true;
					}
					
					resultItem.canDeleteEntry = canDeleteEntry;
					resultItem.entryHasAnyRelatedProjectSearchId = entryHasAnyRelatedProjectSearchId;
					
					resultItem.entryHasFeatureDetection = entryHasFeatureDetection;
					
					resultItem.userIsProjectOwner = userIsProjectOwner;
				}
//			}
			
    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.resultItemList = resultItemList;
    		
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

    	private List<WebserviceResultItem> resultItemList;
    	private boolean standardRunImporter_IsFullyConfigured;
    	private boolean runFeatureDetection_IsFullyConfigured;

		public List<WebserviceResultItem> getResultItemList() {
			return resultItemList;
		}

		public boolean isRunFeatureDetection_IsFullyConfigured() {
			return runFeatureDetection_IsFullyConfigured;
		}

		public boolean isStandardRunImporter_IsFullyConfigured() {
			return standardRunImporter_IsFullyConfigured;
		}
    }
    
    public static class WebserviceResultItem {
    	
    	private int projectScanFileId;
    	private int scanFileId;
		
    	private Set<String> scanFilename_Set;
    	private String scanFile_Code_FirstSix;

		private boolean canDownload; // Has scan_file_tbl.file_object_storage_main_entry_id_fk so scan file contents in File Object Storage

    	private boolean userIsProjectOwner;
    	private boolean canDeleteEntry;
    	private boolean entryHasAnyRelatedProjectSearchId;
    	private boolean entryHasFeatureDetection;

		public int getScanFileId() {
			return scanFileId;
		}

		public Set<String> getScanFilename_Set() {
			return scanFilename_Set;
		}

		public String getScanFile_Code_FirstSix() {
			return scanFile_Code_FirstSix;
		}

		public int getProjectScanFileId() {
			return projectScanFileId;
		}

		public boolean isUserIsProjectOwner() {
			return userIsProjectOwner;
		}

		public boolean isCanDeleteEntry() {
			return canDeleteEntry;
		}

		public boolean isEntryHasFeatureDetection() {
			return entryHasFeatureDetection;
		}

		public boolean isCanDownload() {
			return canDownload;
		}

		public boolean isEntryHasAnyRelatedProjectSearchId() {
			return entryHasAnyRelatedProjectSearchId;
		}
    }
    
}


