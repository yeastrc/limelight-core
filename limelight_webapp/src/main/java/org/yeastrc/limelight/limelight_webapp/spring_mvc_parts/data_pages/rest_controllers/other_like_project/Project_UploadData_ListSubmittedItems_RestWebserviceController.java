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

import java.io.StringReader;
import java.text.DateFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.feature_detection_run_import_hardklor_bullseye.shared_objects.FeatureDetection_HardklorBullseye_Import_RequestData_V001;
import org.yeastrc.limelight.limelight_shared.feature_detection_run_import_hardklor_bullseye.shared_objects.FeatureDetection_HardklorBullseye_Run_RequestData_V001;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dao.FileImportTracking_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataJSONBlob_DTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataJSON_Contents_Version_Number_001;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingStatusValLkupDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataJSON_Contents_Version_Number_001.FileImportTrackingDataJSON_Contents__SearchTagStrings__Version_Number_001;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportFileType;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils.Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util.Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util__Result;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dao.FileImportAndPipelineRunTracking_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.enum_classes.FileImportAndPipelineRun_RequestType;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingSingleFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingStatusValuesLookupDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers.FileImportTrackingRun_LatestForParent_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers.FileImportTracking_All_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers.FileImportTracking_Data_JSONBlob_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers.FileImportTracking_PendingCount_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers.FileImportTracking_PendingTrackingIdsAllProjects_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsLimelightXMLFileImportFullyConfiguredIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsScanFileImportAllowedViaWebSubmitIF;
import org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.dao.FileImportAndPipelineRunTrackingRunDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.searchers.FileImportAndPipelineRunTracking_All_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.searchers.FileImportAndPipelineRunTracking_PendingCount_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_pipeline_run.searchers.FileImportAndPipelineRunTracking_PendingTrackingIdsAllProjects_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataResponse;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.web_utils.UnmarshalJSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * For Upload Data, List Submitted Items, Pending and Complete
 *
 */
@RestController
public class Project_UploadData_ListSubmittedItems_RestWebserviceController {

	private static final Logger log = LoggerFactory.getLogger( Project_UploadData_ListSubmittedItems_RestWebserviceController.class );
	
	private static int QUEUE_POSITION_NOT_SET_SINCE_NOT_AVAILABLE = -1;

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds;
	
	@Autowired
	private IsLimelightXMLFileImportFullyConfiguredIF isLimelightXMLFileImportFullyConfigured;

	@Autowired
	private IsScanFileImportAllowedViaWebSubmitIF isScanFileImportAllowedViaWebSubmit;
	
	@Autowired
	private FileImportTracking_All_SearcherIF fileImportTracking_All_Searcher;
	
	@Autowired
	private FileImportTracking_Data_JSONBlob_Searcher_IF fileImportTracking_Data_JSONBlob_Searcher;
	
	@Autowired
	private FileImportTrackingStatusValuesLookupDAO_IF fileImportTrackingStatusValuesLookupDAO;
	
	@Autowired
	private FileImportTrackingRun_LatestForParent_SearcherIF fileImportTrackingRun_LatestForParent_Searcher;
	
	@Autowired
	private FileImportTracking_PendingCount_SearcherIF fileImportTracking_PendingCount_Searcher;
	
	@Autowired
	private FileImportTracking_PendingTrackingIdsAllProjects_SearcherIF fileImportTracking_PendingTrackingIdsAllProjects_Searcher;

	@Autowired
	private FileImportTrackingSingleFileDAO_IF fileImportTrackingSingleFileDAO;
	
	////////////
	
	@Autowired
	private FileImportAndPipelineRunTracking_All_Searcher_IF fileImportAndPipelineRunTracking_All_Searcher;
	
	@Autowired
	private FileImportAndPipelineRunTracking_PendingCount_Searcher_IF fileImportAndPipelineRunTracking_PendingCount_Searcher;
	
	@Autowired
	private FileImportAndPipelineRunTracking_PendingTrackingIdsAllProjects_Searcher_IF fileImportAndPipelineRunTracking_PendingTrackingIdsAllProjects_Searcher;
	
	@Autowired
	private FileImportAndPipelineRunTrackingRunDAO_IF fileImportAndPipelineRunTrackingRunDAO;
	
	///////////
	
	@Autowired
	private UserDAO_IF userDAO;
	
	@Autowired
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;
	
	@Autowired
	private UnmarshalJSON_ToObject unmarshalJSON_ToObject;  // to pass to shard code util

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	

	/////////////////////////////////////////////////////
	
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
					+ AA_RestWSControllerPaths_Constants.PROJECT__UPLOAD_DATA_LIST_SUBMITTED_ITEMS_REST_WEBSERVICE_CONTROLLER
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
    		//		log.warn( "changeUserAccessToProject(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

			//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

			String projectIdentifier = webserviceRequest.getProjectIdentifier();

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

			//  Restrict access to Project owners or above (admin), if project was not locked
			//			ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectIds_Result =
			validateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIds
			.validateProjectOwnerIfProjectNotLockedAllowed( projectIds, httpServletRequest );

			//  If NOT Limelight XML File Import is Fully Configured, 
			if ( ! isLimelightXMLFileImportFullyConfigured.isLimelightXMLFileImportFullyConfigured() ) {
				String msg = "Limelight XML File Import is NOT Fully Configured ";
				log.error( msg );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}

			WebserviceResult webserviceResult = getImportingDataForPage( projectId );

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
    

	/**
	 * get submitted items for import or pipeline run
	 * 
	 * @param request
	 * @param projectId
	 * @throws Exception
	 * @throws LimelightInternalErrorException
	 */
	private WebserviceResult getImportingDataForPage(int projectId) throws Exception {
		
		List<InternalHolder__Single_WebserviceResult_DisplayItem> pendingItemsList_InternalHolder = new ArrayList<>();
		List<InternalHolder__Single_WebserviceResult_DisplayItem> historyItemsList_InternalHolder = new ArrayList<>();
		
		
		process__FileImportTrackingRecords(projectId, pendingItemsList_InternalHolder, historyItemsList_InternalHolder);
		
		process__FileImportAndPipelineRunTrackingRecords(projectId, pendingItemsList_InternalHolder, historyItemsList_InternalHolder);
		
		
		//  General Validation
		validate_InternalHolder__Single_WebserviceResult_DisplayItem_Entries(pendingItemsList_InternalHolder);
		validate_InternalHolder__Single_WebserviceResult_DisplayItem_Entries(historyItemsList_InternalHolder);
		
		//  Validate Pending Items
		for ( InternalHolder__Single_WebserviceResult_DisplayItem pendingItem : pendingItemsList_InternalHolder ) {
			if ( pendingItem.queuePosition == null && ( ! pendingItem.webserviceResult_DisplayItem.isStatusStarted() ) ) {
				throw new LimelightInternalErrorException( "Pending Item:  ( pendingItem.queuePosition == null && ( ! pendingItem.webserviceResult_DisplayItem.isStatusStarted() ) )" );
			}
		}
		
		//  Sort Pending
		Collections.sort(pendingItemsList_InternalHolder, new Comparator<InternalHolder__Single_WebserviceResult_DisplayItem>() {
			@Override
			public int compare(InternalHolder__Single_WebserviceResult_DisplayItem o1, InternalHolder__Single_WebserviceResult_DisplayItem o2) {
				
				if ( o1.webserviceResult_DisplayItem.isStatusStarted() ) {
					if ( o2.webserviceResult_DisplayItem.isStatusStarted() ) {
						 //  status: 'STARTED' sorts before others
						if ( o1.webserviceResult_DisplayItem.fileImport_TrackingItem != null ) {
							// Sort fileImport_TrackingItem first
							return -1; 
						}
						return -1; 
					}

					return -1;  //  status: 'STARTED' sorts before others
				}
				if ( o2.webserviceResult_DisplayItem.isStatusStarted() ) {
					return -1;  //  status: 'STARTED' sorts before others
				}

				int queuePositionCompare = o1.queuePosition.compareTo( o2.queuePosition );
				if ( queuePositionCompare != 0 ) {
					return queuePositionCompare;
				}
				if ( o1.webserviceResult_DisplayItem.fileImport_TrackingItem != null ) {
					// Sort fileImport_TrackingItem first
					return -1; 
				}
				return 1;
			}
		});

		//  Sort History
		Collections.sort(historyItemsList_InternalHolder, new Comparator<InternalHolder__Single_WebserviceResult_DisplayItem>() {
			@Override
			public int compare(InternalHolder__Single_WebserviceResult_DisplayItem o1, InternalHolder__Single_WebserviceResult_DisplayItem o2) {

				if ( o1.processingEnd_DateTime_In_Milliseconds == null ) {
					return -1;
				}
				if ( o2.processingEnd_DateTime_In_Milliseconds == null ) {
					return 1;
				}
				return - o1.processingEnd_DateTime_In_Milliseconds.compareTo( o2.processingEnd_DateTime_In_Milliseconds );
			}
		});

		int pendingCount = 
				fileImportTracking_PendingCount_Searcher.getPendingCountForProject( projectId )
				+ fileImportAndPipelineRunTracking_PendingCount_Searcher.getPendingCountForProject( projectId );
		
		
		List<WebserviceResult_DisplayItem> pendingItemsList = new ArrayList<>( pendingItemsList_InternalHolder.size() );
		List<WebserviceResult_DisplayItem> historyItemsList = new ArrayList<>( historyItemsList_InternalHolder.size() );
		
		for ( InternalHolder__Single_WebserviceResult_DisplayItem pendingItem_InternalHolder : pendingItemsList_InternalHolder ) {
			pendingItemsList.add( pendingItem_InternalHolder.webserviceResult_DisplayItem );
		}
		for ( InternalHolder__Single_WebserviceResult_DisplayItem historyItem_InternalHolder : historyItemsList_InternalHolder ) {
			historyItemsList.add( historyItem_InternalHolder.webserviceResult_DisplayItem );
		}
		
		WebserviceResult webserviceResult = new WebserviceResult();
		webserviceResult.pendingCount = pendingCount;
		webserviceResult.pendingItemsList = pendingItemsList;
		webserviceResult.historyItemsList = historyItemsList;
		
		webserviceResult.isScanFileImportAllowedViaWebSubmit = isScanFileImportAllowedViaWebSubmit.isScanFileImportAllowedViaWebSubmit();
		
		return webserviceResult;
	}
	
	/**
	 * @param entries
	 */
	private void validate_InternalHolder__Single_WebserviceResult_DisplayItem_Entries( List<InternalHolder__Single_WebserviceResult_DisplayItem> entries ) {
		
		for ( InternalHolder__Single_WebserviceResult_DisplayItem entry : entries ) {
			if ( entry.webserviceResult_DisplayItem == null ) {
				throw new LimelightInternalErrorException( "( entry.webserviceResult_DisplayItem == null )" );
			}
			if ( entry.webserviceResult_DisplayItem.fileImport_TrackingItem == null && entry.webserviceResult_DisplayItem.fileImportAndRunPipeline_TrackingItem == null ) {
				//  Neither Set
				throw new LimelightInternalErrorException( "( entry.webserviceResult_DisplayItem.fileImport_TrackingItem == null && entry.webserviceResult_DisplayItem.fileImportAndRunPipeline_TrackingItem == null )" );
			}
			if ( entry.webserviceResult_DisplayItem.fileImport_TrackingItem != null && entry.webserviceResult_DisplayItem.fileImportAndRunPipeline_TrackingItem != null ) {
				//  Both Set
				throw new LimelightInternalErrorException( "( entry.webserviceResult_DisplayItem.fileImport_TrackingItem != null && entry.webserviceResult_DisplayItem.fileImportAndRunPipeline_TrackingItem != null )" );
			}
		}
	}
	
	
	/**
	 * Process records for table file_import_tracking_tbl for import Limelight XML file and Scan Files
	 * 
	 * @param projectId
	 * @param pendingItemsList
	 * @param historyItemsList
	 * @throws Exception
	 */
	private void process__FileImportTrackingRecords( 
			
			int projectId,
			List<InternalHolder__Single_WebserviceResult_DisplayItem> pendingItemsList,
			List<InternalHolder__Single_WebserviceResult_DisplayItem> historyItemsList
			) throws Exception {



		List<FileImportTrackingDTO> fileImportTrackingList = 
				fileImportTracking_All_Searcher.getAllForWebDisplayForProject( projectId );
		
		if ( fileImportTrackingList.isEmpty() ) {
			
			//  NOTHING to process so return
			
			return; // EARLY RETURN
		}
		
		///////

		ArrayList<Integer> pendingTrackingIdsAllProjectsList = null;

		DateFormat dateTimeFormat = DateFormat.getDateTimeInstance( DateFormat.LONG, DateFormat.LONG );
		NumberFormat numberFormat = NumberFormat.getInstance();
		List<FileImportTrackingStatusValLkupDTO>  statusTextList = 
				fileImportTrackingStatusValuesLookupDAO.getAll();
		//  Put statuses in a Map
		Map<Integer, String> statusTextKeyedOnId = new HashMap<>();
		for ( FileImportTrackingStatusValLkupDTO  statusTextItem : statusTextList ) {
			statusTextKeyedOnId.put( statusTextItem.getId(), statusTextItem.getStatusDisplayText() );
		}

		//  Get Data for each entry

		Map<Integer, FileImportTrackingDataJSONBlob_DTO> fileImportTrackingDataJSONBlob_DTO_Map_Key_FileImportTrackingId = new HashMap<>( fileImportTrackingList.size() );

		{
			List<Integer> fileImportTrackingId_List = new ArrayList<>( fileImportTrackingList.size() );
			for ( FileImportTrackingDTO trackingItem : fileImportTrackingList ) {
				fileImportTrackingId_List.add(trackingItem.getId());
			}
			List<FileImportTrackingDataJSONBlob_DTO> resultList = 
					fileImportTracking_Data_JSONBlob_Searcher.getFor_FileImportTrackingId_List(fileImportTrackingId_List);
			for ( FileImportTrackingDataJSONBlob_DTO entry : resultList ) {
				fileImportTrackingDataJSONBlob_DTO_Map_Key_FileImportTrackingId.put( entry.getFileImportTrackingId(), entry );
			}
		}


		/////////////
		//   Copy Tracking Records to internal holder to match up with other data
		List<InternalHolder__FileImportTrackingDTO__FileImportTrackingRunDTO> internalHolderList = new ArrayList<>( fileImportTrackingList.size() );

		//  At the same time, check for tracking records have status QUEUED or RE_QUEUED
		//     get all tracking id for status QUEUED or RE_QUEUED
		//     so can put queue position on the display objects
		// check for any tracking records have status QUEUED or RE_QUEUED
		boolean foundQueuedOrReQueued = false;

		for ( FileImportTrackingDTO trackingItem : fileImportTrackingList ) {

			InternalHolder__FileImportTrackingDTO__FileImportTrackingRunDTO internalHolder = new InternalHolder__FileImportTrackingDTO__FileImportTrackingRunDTO();
			internalHolderList.add( internalHolder );
			internalHolder.trackingItem = trackingItem;

			if ( trackingItem.getStatus() == FileImportStatus.QUEUED
					|| trackingItem.getStatus() == FileImportStatus.RE_QUEUED ) {
				foundQueuedOrReQueued = true;
			}
			if ( trackingItem.getStatus() == FileImportStatus.FAILED ) {
				FileImportTrackingRunDTO latestRunForTrackingItem =
						fileImportTrackingRun_LatestForParent_Searcher
						.getLatestRunForFileImportTrackingDTO( trackingItem.getId() );
				if ( latestRunForTrackingItem == null ) {
					String msg = "Limelight XML Import Tracking Processing: Failed to get latest run for Tracking Item status FAILED. "
							+ "Tracking Item Id: " + trackingItem.getId();
					log.error( msg );
					//						throw new LimelightInternalErrorException( msg );

				} else if ( latestRunForTrackingItem.getRunStatus() != FileImportStatus.FAILED ) {
					String msg = "Limelight XML Import Tracking Processing: Latest run status is not FAILED for Tracking Item status FAILED. "
							+ "Tracking Item Id: " + trackingItem.getId();
					log.error( msg );
					//						throw new LimelightInternalErrorException( msg );
				}
				internalHolder.latestRunForTrackingItem = latestRunForTrackingItem;
			}
		}

		if ( foundQueuedOrReQueued ) {
			//  Found status QUEUED or RE_QUEUED so get tracking ids for all
			pendingTrackingIdsAllProjectsList =
					fileImportTracking_PendingTrackingIdsAllProjects_Searcher
					.getPendingTrackingIdsAllProjects();
		}

		////////

		boolean needToUpdateQueuePosition = false; // true if need to go back through records and set queue position

		//   Main processing of tracking records
		for ( InternalHolder__FileImportTrackingDTO__FileImportTrackingRunDTO internalHolder : internalHolderList ) {

			FileImportTrackingDTO trackingItem = internalHolder.trackingItem;

			FileImport_TrackingDisplay displayItem = new FileImport_TrackingDisplay();

			{
				//  fileImportTrackingDataJSONBlob_DTO  may be null.
				FileImportTrackingDataJSONBlob_DTO fileImportTrackingDataJSONBlob_DTO = fileImportTrackingDataJSONBlob_DTO_Map_Key_FileImportTrackingId.get( trackingItem.getId() );

				if ( fileImportTrackingDataJSONBlob_DTO != null ) {

					Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util__Result getJSON_Contents_Object_Result =
							Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util
							.getSingletonInstance()
							.get_FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO(fileImportTrackingDataJSONBlob_DTO, unmarshalJSON_ToObject);

					if ( getJSON_Contents_Object_Result.getFileImportTrackingDataJSON_Contents_Version_Number_001() != null ) {

						FileImportTrackingDataJSON_Contents_Version_Number_001 fileImportTrackingDataJSON_Contents_Version_Number_001 =
								getJSON_Contents_Object_Result.getFileImportTrackingDataJSON_Contents_Version_Number_001();
						FileImportTrackingDataJSON_Contents__SearchTagStrings__Version_Number_001 searchTagStrings_Object =
								fileImportTrackingDataJSON_Contents_Version_Number_001.getSearchTagStrings();

						if ( searchTagStrings_Object != null ) {
							if ( searchTagStrings_Object.getSearchTagList() != null && ( ! searchTagStrings_Object.getSearchTagList().isEmpty() ) ) {

								displayItem.setSearchTagList( searchTagStrings_Object.getSearchTagList() );
							}
						}

					}
				}
			}

			//  Set Pending queue position
			if ( trackingItem.getStatus() == FileImportStatus.QUEUED
					|| trackingItem.getStatus() == FileImportStatus.RE_QUEUED ) {


				if ( pendingTrackingIdsAllProjectsList == null || pendingTrackingIdsAllProjectsList.isEmpty() ) {

					//  Was not found in all pending.  Must no longer be pending. Get from DB again
					trackingItem = FileImportTracking_Shared_Get_DAO.getInstance().getItem( trackingItem.getId() );

					if ( trackingItem.getStatus() == FileImportStatus.QUEUED
							|| trackingItem.getStatus() == FileImportStatus.RE_QUEUED ) {

						//  Set to QUEUE_POSITION_NOT_SET_SINCE_NOT_AVAILABLE and fix those after processing all records

						needToUpdateQueuePosition = true;
						displayItem.setQueuePosition( QUEUE_POSITION_NOT_SET_SINCE_NOT_AVAILABLE );
					}

				} else {
					int queueIndex = pendingTrackingIdsAllProjectsList.indexOf( trackingItem.getId() );
					if ( queueIndex < 0 )  {

						//  Was not found in all pending.  Must no longer be pending. Get from DB again
						trackingItem = FileImportTracking_Shared_Get_DAO.getInstance().getItem( trackingItem.getId() );

						if ( trackingItem.getStatus() == FileImportStatus.QUEUED
								|| trackingItem.getStatus() == FileImportStatus.RE_QUEUED ) {

							//  Set to QUEUE_POSITION_NOT_SET_SINCE_NOT_AVAILABLE and fix those after processing all records

							needToUpdateQueuePosition = true;
							displayItem.setQueuePosition( QUEUE_POSITION_NOT_SET_SINCE_NOT_AVAILABLE );
						}
					} else {
						int queuePosition = queueIndex + 1; // add 1 since queueIndex is zero based
						displayItem.setQueuePosition( queuePosition );
						displayItem.setQueuePositionFmt( numberFormat.format( queuePosition ) );
					}
				}
			}
			
			displayItem.setTrackingId( trackingItem.getId() );
			displayItem.setStatusEnum( trackingItem.getStatus() );
			String statusText = statusTextKeyedOnId.get( trackingItem.getStatus().value() );
			if ( statusText == null ) {
				String msg = "Limelight XML Import Tracking Processing: Failed to get status text for status id: " 
						+ trackingItem.getStatus().value();
				log.error( msg );
				throw new LimelightInternalErrorException( msg );
			}
			displayItem.setStatus( statusText );
			if ( trackingItem.getStatus() == FileImportStatus.FAILED ) {
				if ( internalHolder.latestRunForTrackingItem != null ) {
					displayItem.setStatusFailedMsg( internalHolder.latestRunForTrackingItem.getDataErrorText() );
				} else {
					displayItem.setStatusFailedMsg( "Error Message Unavailable." );
				}
			}
			List<FileImportTrackingSingleFileDTO> fileDataList = 
					fileImportTrackingSingleFileDAO
					.getForTrackingId( trackingItem.getId() );
			if ( fileDataList.isEmpty() ) {
				String msg = "Limelight XML Import Tracking Processing: no files found for tracking id: " 
						+ trackingItem.getId();
				log.error( msg );
				throw new LimelightInternalErrorException( msg );
			}
			FileImportTrackingSingleFileDTO importFileEntry = null;
			FileImportTrackingSingleFileDTO importFile_FASTAFile_Entry = null;
			List<FileImportTrackingSingleFileDTO> scanFileEntryList = new ArrayList<>();
			List<FileImportTrackingSingleFileDTO> genericOtherFileEntryList = new ArrayList<>();
			for ( FileImportTrackingSingleFileDTO fileDataEntry : fileDataList ) {
				if ( fileDataEntry.getFileType() == FileImportFileType.LIMELIGHT_XML_FILE ) {
					importFileEntry = fileDataEntry;
				} else if ( fileDataEntry.getFileType() == FileImportFileType.FASTA_FILE ) {
					importFile_FASTAFile_Entry = fileDataEntry;
				} else if ( fileDataEntry.getFileType() == FileImportFileType.SCAN_FILE ) {
					scanFileEntryList.add( fileDataEntry );
				} else if ( fileDataEntry.getFileType() == FileImportFileType.GENERIC_OTHER_FILE ) {
					genericOtherFileEntryList.add( fileDataEntry );
				} else {
					String msg = "Import Tracking Processing: Unknown file type for single file id: " 
							+ fileDataEntry.getId();
					log.error( msg );
					throw new LimelightInternalErrorException( msg );
				}
			}
			if ( importFileEntry == null ) {
				if ( scanFileEntryList.isEmpty() ) {
					String msg = "Import Tracking Processing: importFileEntry not found for tracking id: " 
							+ trackingItem.getId();
					log.error( msg );
					throw new LimelightInternalErrorException( msg );
				} else {
					importFileEntry = scanFileEntryList.get(0); //  Display Info for first Scan File
				}
			}
			{
				String uploadedFilename = importFileEntry.getFilenameInUpload();
				displayItem.setUploadedFilename( uploadedFilename );
			}
			
			if ( importFile_FASTAFile_Entry != null ) {
				String uploadedFilename = importFile_FASTAFile_Entry.getFilenameInUpload();
				displayItem.setFastafileName(uploadedFilename);
			}
			
			{
				List<String> scanFilenames = new ArrayList<>( scanFileEntryList.size() );
				for ( FileImportTrackingSingleFileDTO scanFileEntry : scanFileEntryList ) {
					String scanFilename = scanFileEntry.getFilenameInUpload();
					scanFilenames.add( scanFilename );
				}
				String scanfileNamesCommaDelim = StringUtils.join( scanFilenames, ", " );
				displayItem.setScanFilenames( scanFilenames );
				displayItem.setScanfileNamesCommaDelim( scanfileNamesCommaDelim );
			}

			{
				List<String> genericOtherFileFilenames = new ArrayList<>( genericOtherFileEntryList.size() );
				for ( FileImportTrackingSingleFileDTO genericOtherFileEntry : genericOtherFileEntryList ) {
					String genericOtherFileFilename = genericOtherFileEntry.getFilenameInUpload();
					genericOtherFileFilenames.add( genericOtherFileFilename );
				}
				String genericOtherFilefileNamesCommaDelim = StringUtils.join( genericOtherFileFilenames, ", " );
				displayItem.setGenericOtherFileFilenames( genericOtherFileFilenames );
				displayItem.setGenericOtherFileFileNamesCommaDelim( genericOtherFilefileNamesCommaDelim );
			}
			
			if ( trackingItem.getRecordSubmitDateTime() != null ) {
				displayItem.setImportSubmitDateTime( dateTimeFormat.format( trackingItem.getRecordSubmitDateTime() ) );
			}
			if ( trackingItem.getStatus() == FileImportStatus.STARTED 
					|| trackingItem.getStatus() == FileImportStatus.COMPLETE
					|| trackingItem.getStatus() == FileImportStatus.FAILED ) {
				if ( trackingItem.getImportStartDateTime() != null ) {
					displayItem.setImportStartDateTime( dateTimeFormat.format( trackingItem.getImportStartDateTime() ) );
				}
			}
			if ( trackingItem.getStatus() == FileImportStatus.COMPLETE
					|| trackingItem.getStatus() == FileImportStatus.FAILED ) {
				if ( trackingItem.getImportEndDateTime() != null ) {
					displayItem.setImportEndDateTime( dateTimeFormat.format( trackingItem.getImportEndDateTime() ) );
				}
			}

			String searchName = trackingItem.getSearchName();
			displayItem.searchName = searchName;
			displayItem.searchShortName = trackingItem.getSearchShortName();
			
			int userId = trackingItem.getUserId();

			//  Get full user data
			//  Get User Mgmt User Id for authUserId
			Integer userMgmtUserId = userDAO.getUserMgmtUserIdForId( userId );
			if ( userMgmtUserId == null ) {
				String msg = "Failed to get userMgmtUserId for Limelight user id.  userDAO.getUserMgmtUserIdForId( userId ) returned null.  Limelight user id: " + userId;
				log.warn( msg );
				throw new LimelightInternalErrorException(msg);
			}

			String nameOfUploadUser = "User info unavailable";
			{
				UserMgmtGetUserDataRequest userMgmtGetUserDataRequest = new UserMgmtGetUserDataRequest();
				userMgmtGetUserDataRequest.setUserId( userMgmtUserId );
				UserMgmtGetUserDataResponse userMgmtGetUserDataResponse = 
						userMgmtCentralWebappWebserviceAccess.getUserData( userMgmtGetUserDataRequest );
				if ( ! userMgmtGetUserDataResponse.isSuccess() ) {
					String msg = "Failed to get Full user data from User Mgmt Webapp for user id: " + userId
							+ ", userMgmtUserId: " + userMgmtUserId;
					log.error( msg );
					// throw new LimelightInternalErrorException( msg );
				} else {
					nameOfUploadUser = userMgmtGetUserDataResponse.getFirstName() 
							+ " " + userMgmtGetUserDataResponse.getLastName();
				}
			}
			displayItem.setNameOfUploadUser( nameOfUploadUser );

			WebserviceResult_DisplayItem webserviceResult_DisplayItem = new WebserviceResult_DisplayItem();
			webserviceResult_DisplayItem.fileImport_TrackingItem = displayItem;
			webserviceResult_DisplayItem.statusEnum = displayItem.statusEnum;
			webserviceResult_DisplayItem.importSubmitDateTime = displayItem.importSubmitDateTime;
			webserviceResult_DisplayItem.importEndDateTime = displayItem.importEndDateTime;
			webserviceResult_DisplayItem.queuePosition = displayItem.queuePosition;
			webserviceResult_DisplayItem.queuePositionFmt = displayItem.queuePositionFmt;

			InternalHolder__Single_WebserviceResult_DisplayItem internalHolder__Single_WebserviceResult_DisplayItem = new InternalHolder__Single_WebserviceResult_DisplayItem();
			internalHolder__Single_WebserviceResult_DisplayItem.webserviceResult_DisplayItem = webserviceResult_DisplayItem;
			internalHolder__Single_WebserviceResult_DisplayItem.queuePosition = displayItem.queuePosition;

			if ( trackingItem.getImportEndDateTime() != null ) {
				internalHolder__Single_WebserviceResult_DisplayItem.processingEnd_DateTime_In_Milliseconds = trackingItem.getImportEndDateTime().getTime();
			}

			if ( trackingItem.getStatus() == FileImportStatus.COMPLETE
					|| trackingItem.getStatus() == FileImportStatus.FAILED ) {
				historyItemsList.add( internalHolder__Single_WebserviceResult_DisplayItem );
			} else {
				pendingItemsList.add( internalHolder__Single_WebserviceResult_DisplayItem );
			}
		}

		if ( needToUpdateQueuePosition ) {

			//  Some of queued or re-queued were not in pendingTrackingIdsAllProjectsList so set their queue position here
			//  Arbitrary assign queue position to after size of pendingTrackingIdsAllProjectsList

			int nextQueuePosition = pendingTrackingIdsAllProjectsList.size() + 1;

			for ( int index = pendingItemsList.size() - 1; index >= 0; index-- ) {

				//  Process in reverse order since 

				InternalHolder__Single_WebserviceResult_DisplayItem internalHolder__Single_WebserviceResult_DisplayItem = pendingItemsList.get( index );

				FileImport_TrackingDisplay displayItem = internalHolder__Single_WebserviceResult_DisplayItem.webserviceResult_DisplayItem.fileImport_TrackingItem;

				if ( displayItem.getQueuePosition() != null && displayItem.getQueuePosition().intValue() == QUEUE_POSITION_NOT_SET_SINCE_NOT_AVAILABLE ) {

					displayItem.setQueuePosition( nextQueuePosition );
					displayItem.setQueuePositionFmt( numberFormat.format( nextQueuePosition ) );

					internalHolder__Single_WebserviceResult_DisplayItem.queuePosition = nextQueuePosition;

					nextQueuePosition++;
				}
			}
		}
	}
	

	
	/**
	 * Process records for table import_and_pipeline_run_tracking_tbl for import Limelight XML file and Scan Files
	 * 
	 * @param projectId
	 * @param pendingItemsList
	 * @param historyItemsList
	 * @throws Exception
	 */
	private void process__FileImportAndPipelineRunTrackingRecords( 
			
			int projectId,
			List<InternalHolder__Single_WebserviceResult_DisplayItem> pendingItemsList,
			List<InternalHolder__Single_WebserviceResult_DisplayItem> historyItemsList
			) throws Exception {



		List<FileImportAndPipelineRunTrackingDTO> fileImportAndPipelineRunTrackingList = 
				fileImportAndPipelineRunTracking_All_Searcher.getAllForWebDisplayForProject( projectId );
		
		if ( fileImportAndPipelineRunTrackingList.isEmpty() ) {
			
			//  NOTHING to process so return
			
			return; // EARLY RETURN
		}
		
		///////

		ArrayList<Integer> pendingTrackingIdsAllProjectsList = null;

		DateFormat dateTimeFormat = DateFormat.getDateTimeInstance( DateFormat.LONG, DateFormat.LONG );
		NumberFormat numberFormat = NumberFormat.getInstance();
		List<FileImportTrackingStatusValLkupDTO>  statusTextList = 
				fileImportTrackingStatusValuesLookupDAO.getAll();
		//  Put statuses in a Map
		Map<Integer, String> statusTextKeyedOnId = new HashMap<>();
		for ( FileImportTrackingStatusValLkupDTO  statusTextItem : statusTextList ) {
			statusTextKeyedOnId.put( statusTextItem.getId(), statusTextItem.getStatusDisplayText() );
		}

		/////////////
		//   Copy Tracking Records to internal holder to match up with other data
		List<InternalHolder__FileImportAndPipelineRunTrackingDTO__FileImportAndPipelineRunTrackingRunDTO> internalHolderList = new ArrayList<>( fileImportAndPipelineRunTrackingList.size() );

		//  At the same time, check for tracking records have status QUEUED or RE_QUEUED
		//     get all tracking id for status QUEUED or RE_QUEUED
		//     so can put queue position on the display objects
		// check for any tracking records have status QUEUED or RE_QUEUED
		boolean foundQueuedOrReQueued = false;

		for ( FileImportAndPipelineRunTrackingDTO trackingItem : fileImportAndPipelineRunTrackingList ) {

			InternalHolder__FileImportAndPipelineRunTrackingDTO__FileImportAndPipelineRunTrackingRunDTO internalHolder = new InternalHolder__FileImportAndPipelineRunTrackingDTO__FileImportAndPipelineRunTrackingRunDTO();
			internalHolderList.add( internalHolder );
			internalHolder.trackingItem = trackingItem;

			if ( trackingItem.getStatus() == FileImportStatus.QUEUED
					|| trackingItem.getStatus() == FileImportStatus.RE_QUEUED ) {
				foundQueuedOrReQueued = true;
			}
			if ( trackingItem.getStatus() == FileImportStatus.FAILED ) {
				
				if ( trackingItem.getRun_id_for_status_id() == null ) {
					String msg = "Limelight XML Import Tracking Processing: Failed to get latest run for Tracking Item status FAILED. "
							+ "Tracking Item Id: " + trackingItem.getId();
					log.error( msg );
				}
				
				FileImportAndPipelineRunTrackingRunDTO runForTrackingItem =
						fileImportAndPipelineRunTrackingRunDAO.getForId(trackingItem.getRun_id_for_status_id());

				if ( runForTrackingItem == null ) {
					String msg = "Import and Run Pipeline Tracking Processing: FileImportAndPipelineRunTrackingDTO Item status FAILED. "
							+ "Tracking Item Id: " + trackingItem.getId();
					log.error( msg );
					//						throw new LimelightInternalErrorException( msg );

				} else if ( runForTrackingItem.getStatus() != FileImportStatus.FAILED ) {
					String msg = "Import and Run Pipeline Tracking Processing: FileImportAndPipelineRunTrackingDTO Item status FAILED: Latest run status is not FAILED for Tracking Item status FAILED. "
							+ "Tracking Item Id: " + trackingItem.getId();
					log.error( msg );
					//						throw new LimelightInternalErrorException( msg );
				}
				internalHolder.runForTrackingItem = runForTrackingItem;
			}
		}

		if ( foundQueuedOrReQueued ) {
			//  Found status QUEUED or RE_QUEUED so get tracking ids for all
			pendingTrackingIdsAllProjectsList =
					fileImportAndPipelineRunTracking_PendingTrackingIdsAllProjects_Searcher
					.getPendingTrackingIdsAllProjects();
		}

		////////

		boolean needToUpdateQueuePosition = false; // true if need to go back through records and set queue position

		//   Main processing of tracking records
		for ( InternalHolder__FileImportAndPipelineRunTrackingDTO__FileImportAndPipelineRunTrackingRunDTO internalHolder : internalHolderList ) {

			FileImportAndPipelineRunTrackingDTO trackingItem = internalHolder.trackingItem;
			
			FileImportAndPipelineRunTrackingRunDTO runForTrackingItem = internalHolder.runForTrackingItem;

			FileImportAndRunPipeline_TrackingDisplay displayItem = new FileImportAndRunPipeline_TrackingDisplay();
			
			if ( trackingItem.getRequestType() == FileImportAndPipelineRun_RequestType.FEATURE_DETECTION_HARDKLOR_BULLSEYE_IMPORT ) {
				
				if ( trackingItem.getRequestData_Format_VersionNumber() != 1 ) {
					String msg = "( trackingItem.getRequestData_Format_VersionNumber() != 1 )";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				};
				
				String requestData_AsString = trackingItem.getRequestData_AsString();

				//  Unmarshall the request data

				FeatureDetection_HardklorBullseye_Import_RequestData_V001 featureDetection_HardklorBullseye_Import_RequestData_V001 = null;

				try {
					JAXBContext jaxbContext = JAXBContext.newInstance( FeatureDetection_HardklorBullseye_Import_RequestData_V001.class );

					Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

					Object unmarshalledObject = null;
					try {
						//  XML generated internal to Limelight so do NOT need Save Parsing
						//  XMLInputFactory xmlInputFactory = XMLInputFactory_XXE_Safe_Creator.xmlInputFactory_XXE_Safe_Creator();
						StringReader stringReader = new StringReader( requestData_AsString );
						unmarshalledObject = unmarshaller.unmarshal( stringReader );
					} catch ( Exception e ) {
						log.error( "Exception in deserializing the Internal Request Data XML", e );
						throw new LimelightInternalErrorException( e.toString() , e ); 
					}
					if ( ! ( unmarshalledObject instanceof FeatureDetection_HardklorBullseye_Import_RequestData_V001 ) ) {
						String msg = "Object unmarshalled "
								+ " cannot be cast to FeatureDetection_HardklorBullseye_Import_RequestData_V001.  unmarshalledObject.getClass().getCanonicalName(): " + unmarshalledObject.getClass().getCanonicalName();
						log.error( msg );
						throw new LimelightInternalErrorException(msg);
					}

					featureDetection_HardklorBullseye_Import_RequestData_V001 = (FeatureDetection_HardklorBullseye_Import_RequestData_V001) unmarshalledObject;

				} catch ( Exception e ) {
					log.error( "Exception in deserializing the Internal Request Data XML" );
					throw e;
				}


				displayItem.mainLineLabel = "Feature Detection: Hardklor/Bullseye Import: " + featureDetection_HardklorBullseye_Import_RequestData_V001.getLabel();
				
				List<FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair> labelvaluePairList = new ArrayList<>();
				displayItem.labelvaluePairList = labelvaluePairList;
				

				{
					FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair labelValuePair = new FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair();
					labelvaluePairList.add( labelValuePair );
					labelValuePair.label = "Label";
					labelValuePair.value = featureDetection_HardklorBullseye_Import_RequestData_V001.getLabel();
				}

				{
					FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair labelValuePair = new FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair();
					labelvaluePairList.add( labelValuePair );
					labelValuePair.label = "Description";
					labelValuePair.value = featureDetection_HardklorBullseye_Import_RequestData_V001.getDescription();
				}
				
				{
					FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair labelValuePair = new FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair();
					labelvaluePairList.add( labelValuePair );
					labelValuePair.label = "Hardklor Results Filename";
					labelValuePair.value = featureDetection_HardklorBullseye_Import_RequestData_V001.getHardklor_ResultsFile_UploadedFilename();
				}
				if ( StringUtils.isNotEmpty( featureDetection_HardklorBullseye_Import_RequestData_V001.getHardklor_ConfFile_UploadedFilename() ) ) {
					FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair labelValuePair = new FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair();
					labelvaluePairList.add( labelValuePair );
					labelValuePair.label = "Hardklor Conf Filename";
					labelValuePair.value = featureDetection_HardklorBullseye_Import_RequestData_V001.getHardklor_ConfFile_UploadedFilename();
				}
				{
					FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair labelValuePair = new FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair();
					labelvaluePairList.add( labelValuePair );
					labelValuePair.label = "Bullseye Results Filename";
					labelValuePair.value = featureDetection_HardklorBullseye_Import_RequestData_V001.getBullseye_ResultsFile_UploadedFilename();
				}
				
				
			} else if ( trackingItem.getRequestType() == FileImportAndPipelineRun_RequestType.FEATURE_DETECTION_HARDKLOR_BULLSEYE_RUN_AND_IMPORT) {

				if ( trackingItem.getRequestData_Format_VersionNumber() != 1 ) {
					String msg = "( trackingItem.getRequestData_Format_VersionNumber() != 1 )";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				};
				
				String requestData_AsString = trackingItem.getRequestData_AsString();

				//  Unmarshall the request data

				FeatureDetection_HardklorBullseye_Run_RequestData_V001 featureDetection_HardklorBullseye_Run_RequestData_V1 = null;

				try {
					JAXBContext jaxbContext = JAXBContext.newInstance( FeatureDetection_HardklorBullseye_Run_RequestData_V001.class );

					Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

					Object unmarshalledObject = null;
					try {
						//  XML generated internal to Limelight so do NOT need Save Parsing
						//  XMLInputFactory xmlInputFactory = XMLInputFactory_XXE_Safe_Creator.xmlInputFactory_XXE_Safe_Creator();
						StringReader stringReader = new StringReader( requestData_AsString );
						unmarshalledObject = unmarshaller.unmarshal( stringReader );
					} catch ( Exception e ) {
						log.error( "Exception in deserializing the Internal Request Data XML", e );
						throw new LimelightInternalErrorException( e.toString() , e ); 
					}
					if ( ! ( unmarshalledObject instanceof FeatureDetection_HardklorBullseye_Run_RequestData_V001 ) ) {
						String msg = "Object unmarshalled "
								+ " cannot be cast to FeatureDetection_HardklorBullseye_Run_RequestData_V001.  unmarshalledObject.getClass().getCanonicalName(): " + unmarshalledObject.getClass().getCanonicalName();
						log.error( msg );
						throw new LimelightInternalErrorException(msg);
					}

					featureDetection_HardklorBullseye_Run_RequestData_V1 = (FeatureDetection_HardklorBullseye_Run_RequestData_V001) unmarshalledObject;

				} catch ( Exception e ) {
					log.error( "Exception in deserializing the Internal Request Data XML" );
					throw e;
				}


				displayItem.mainLineLabel = "Feature Detection: Hardklor/Bullseye Run and Import: " + featureDetection_HardklorBullseye_Run_RequestData_V1.getLabel();
				
				
				List<FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair> labelvaluePairList = new ArrayList<>();
				displayItem.labelvaluePairList = labelvaluePairList;
				

				{
					FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair labelValuePair = new FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair();
					labelvaluePairList.add( labelValuePair );
					labelValuePair.label = "Label";
					labelValuePair.value = featureDetection_HardklorBullseye_Run_RequestData_V1.getLabel();
				}

				{
					FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair labelValuePair = new FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair();
					labelvaluePairList.add( labelValuePair );
					labelValuePair.label = "Description";
					labelValuePair.value = featureDetection_HardklorBullseye_Run_RequestData_V1.getDescription();
				}
				
				if ( featureDetection_HardklorBullseye_Run_RequestData_V1.getHardklor_ConfFile_UploadedFilename() != null ) {
					FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair labelValuePair = new FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair();
					labelvaluePairList.add( labelValuePair );
					labelValuePair.label = "Hardklor Conf Filename";
					labelValuePair.value = featureDetection_HardklorBullseye_Run_RequestData_V1.getHardklor_ConfFile_UploadedFilename();
				}
				
				if ( featureDetection_HardklorBullseye_Run_RequestData_V1.getBullseye_ConfFile_UploadedFilename() != null ) {
					FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair labelValuePair = new FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair();
					labelvaluePairList.add( labelValuePair );
					labelValuePair.label = "Bullseye Conf Filename";
					labelValuePair.value = featureDetection_HardklorBullseye_Run_RequestData_V1.getBullseye_ConfFile_UploadedFilename();
				}
				
			} else {
				displayItem.mainLineLabel = "FileImportAndRunPipeline_TrackingDisplay displayItem";
			}
			
			

			//  Set Pending queue position
			if ( trackingItem.getStatus() == FileImportStatus.QUEUED
					|| trackingItem.getStatus() == FileImportStatus.RE_QUEUED ) {


				if ( pendingTrackingIdsAllProjectsList == null || pendingTrackingIdsAllProjectsList.isEmpty() ) {

					//  Was not found in all pending.  Must no longer be pending. Get from DB again
					trackingItem = FileImportAndPipelineRunTracking_Shared_Get_DAO.getInstance().getItem( trackingItem.getId() );

					if ( trackingItem.getStatus() == FileImportStatus.QUEUED
							|| trackingItem.getStatus() == FileImportStatus.RE_QUEUED ) {

						//  Set to QUEUE_POSITION_NOT_SET_SINCE_NOT_AVAILABLE and fix those after processing all records

						needToUpdateQueuePosition = true;
						displayItem.setQueuePosition( QUEUE_POSITION_NOT_SET_SINCE_NOT_AVAILABLE );
					}

				} else {
					int queueIndex = pendingTrackingIdsAllProjectsList.indexOf( trackingItem.getId() );
					if ( queueIndex < 0 )  {

						//  Was not found in all pending.  Must no longer be pending. Get from DB again
						trackingItem = FileImportAndPipelineRunTracking_Shared_Get_DAO.getInstance().getItem( trackingItem.getId() );

						if ( trackingItem.getStatus() == FileImportStatus.QUEUED
								|| trackingItem.getStatus() == FileImportStatus.RE_QUEUED ) {

							//  Set to QUEUE_POSITION_NOT_SET_SINCE_NOT_AVAILABLE and fix those after processing all records

							needToUpdateQueuePosition = true;
							displayItem.setQueuePosition( QUEUE_POSITION_NOT_SET_SINCE_NOT_AVAILABLE );
						}
					} else {
						int queuePosition = queueIndex + 1; // add 1 since queueIndex is zero based
						displayItem.setQueuePosition( queuePosition );
						displayItem.setQueuePositionFmt( numberFormat.format( queuePosition ) );
					}
				}
			}
			displayItem.setTrackingId( trackingItem.getId() );
			displayItem.setStatusEnum( trackingItem.getStatus() );
			String statusText = statusTextKeyedOnId.get( trackingItem.getStatus().value() );
			if ( statusText == null ) {
				String msg = "Import and Run Pipeline Tracking Processing: Failed to get status text for status id: " 
						+ trackingItem.getStatus().value();
				log.error( msg );
				throw new LimelightInternalErrorException( msg );
			}
			displayItem.setStatus( statusText );
			
			if ( trackingItem.getStatus() == FileImportStatus.FAILED ) {
				if ( internalHolder.runForTrackingItem != null ) {
					
					if ( StringUtils.isNotEmpty( runForTrackingItem.getFinished_fail_end_user_display_message() ) ) {
						
						displayItem.statusFailedMsg = runForTrackingItem.getFinished_fail_end_user_display_message();
						
					} else if ( StringUtils.isNotEmpty( runForTrackingItem.getFinished_fail_pipeline_end_user_display_message() ) ) {
						
						displayItem.statusFailedMsg = runForTrackingItem.getFinished_fail_pipeline_end_user_display_message();
					}
				
				} else {
					displayItem.setStatusFailedMsg( "Error Message Unavailable." );
				}
			}
			
			if ( trackingItem.getRecordInsertDateTime() != null ) {
				displayItem.setRunSubmitDateTime( dateTimeFormat.format( trackingItem.getRecordInsertDateTime() ) );
			}
			if ( trackingItem.getStatus() == FileImportStatus.STARTED 
					|| trackingItem.getStatus() == FileImportStatus.COMPLETE
					|| trackingItem.getStatus() == FileImportStatus.FAILED ) {
				if ( trackingItem.getRunStartDateTime() != null ) {
					displayItem.setRunStartDateTime( dateTimeFormat.format( trackingItem.getRunStartDateTime() ) );
				}
			}
			if ( trackingItem.getStatus() == FileImportStatus.COMPLETE
					|| trackingItem.getStatus() == FileImportStatus.FAILED ) {
				if ( trackingItem.getRunEndDateTime() != null ) {
					displayItem.setRunEndDateTime( dateTimeFormat.format( trackingItem.getRunEndDateTime() ) );
				}
			}

//			String searchName = trackingItem.getSearchName();
//			displayItem.setSearchName( searchName );
			
			
			int userId = trackingItem.getUserId();

			//  Get full user data
			//  Get User Mgmt User Id for authUserId
			Integer userMgmtUserId = userDAO.getUserMgmtUserIdForId( userId );
			if ( userMgmtUserId == null ) {
				String msg = "Failed to get userMgmtUserId for Limelight user id.  userDAO.getUserMgmtUserIdForId( userId ) returned null.  Limelight user id: " + userId;
				log.warn( msg );
				throw new LimelightInternalErrorException(msg);
			}

			String nameOfUploadUser = "User info unavailable";
			{
				UserMgmtGetUserDataRequest userMgmtGetUserDataRequest = new UserMgmtGetUserDataRequest();
				userMgmtGetUserDataRequest.setUserId( userMgmtUserId );
				UserMgmtGetUserDataResponse userMgmtGetUserDataResponse = 
						userMgmtCentralWebappWebserviceAccess.getUserData( userMgmtGetUserDataRequest );
				if ( ! userMgmtGetUserDataResponse.isSuccess() ) {
					String msg = "Failed to get Full user data from User Mgmt Webapp for user id: " + userId
							+ ", userMgmtUserId: " + userMgmtUserId;
					log.error( msg );
					// throw new LimelightInternalErrorException( msg );
				} else {
					nameOfUploadUser = userMgmtGetUserDataResponse.getFirstName() 
							+ " " + userMgmtGetUserDataResponse.getLastName();
				}
			}
			displayItem.setNameOfUploadUser( nameOfUploadUser );

			WebserviceResult_DisplayItem webserviceResult_DisplayItem = new WebserviceResult_DisplayItem();
			webserviceResult_DisplayItem.fileImportAndRunPipeline_TrackingItem = displayItem;
			webserviceResult_DisplayItem.statusEnum = displayItem.statusEnum;
			webserviceResult_DisplayItem.importSubmitDateTime = displayItem.runSubmitDateTime;
			webserviceResult_DisplayItem.importEndDateTime = displayItem.runEndDateTime;
			webserviceResult_DisplayItem.queuePosition = displayItem.queuePosition;
			webserviceResult_DisplayItem.queuePositionFmt = displayItem.queuePositionFmt;

			InternalHolder__Single_WebserviceResult_DisplayItem internalHolder__Single_WebserviceResult_DisplayItem = new InternalHolder__Single_WebserviceResult_DisplayItem();
			internalHolder__Single_WebserviceResult_DisplayItem.webserviceResult_DisplayItem = webserviceResult_DisplayItem;
			internalHolder__Single_WebserviceResult_DisplayItem.queuePosition = displayItem.queuePosition;

			if ( trackingItem.getRunEndDateTime() != null ) {
				internalHolder__Single_WebserviceResult_DisplayItem.processingEnd_DateTime_In_Milliseconds = trackingItem.getRunEndDateTime().getTime();
			}

			if ( trackingItem.getStatus() == FileImportStatus.COMPLETE
					|| trackingItem.getStatus() == FileImportStatus.FAILED ) {
				historyItemsList.add( internalHolder__Single_WebserviceResult_DisplayItem );
			} else {
				pendingItemsList.add( internalHolder__Single_WebserviceResult_DisplayItem );
			}
		}

		if ( needToUpdateQueuePosition ) {

			//  Some of queued or re-queued were not in pendingTrackingIdsAllProjectsList so set their queue position here
			//  Arbitrary assign queue position to after size of pendingTrackingIdsAllProjectsList

			int nextQueuePosition = pendingTrackingIdsAllProjectsList.size() + 1;

			for ( int index = pendingItemsList.size() - 1; index >= 0; index-- ) {

				//  Process in reverse order since 

				InternalHolder__Single_WebserviceResult_DisplayItem internalHolder__Single_WebserviceResult_DisplayItem = pendingItemsList.get( index );

				FileImportAndRunPipeline_TrackingDisplay displayItem = internalHolder__Single_WebserviceResult_DisplayItem.webserviceResult_DisplayItem.fileImportAndRunPipeline_TrackingItem;

				if ( displayItem.getQueuePosition() != null && displayItem.getQueuePosition().intValue() == QUEUE_POSITION_NOT_SET_SINCE_NOT_AVAILABLE ) {

					displayItem.setQueuePosition( nextQueuePosition );
					displayItem.setQueuePositionFmt( numberFormat.format( nextQueuePosition ) );

					internalHolder__Single_WebserviceResult_DisplayItem.queuePosition = nextQueuePosition;

					nextQueuePosition++;
				}
			}
		}
	}
	
	
	///////////////////////////////
	///////////////////////////////
	
	/**
	 * 
	 *
	 */
	private static class InternalHolder__FileImportTrackingDTO__FileImportTrackingRunDTO {
		FileImportTrackingDTO trackingItem;
		FileImportTrackingRunDTO latestRunForTrackingItem;
	}
	
	/**
	 * 
	 *
	 */
	private static class InternalHolder__FileImportAndPipelineRunTrackingDTO__FileImportAndPipelineRunTrackingRunDTO {
		FileImportAndPipelineRunTrackingDTO trackingItem;
		FileImportAndPipelineRunTrackingRunDTO runForTrackingItem;
	}
	
	
	
	/**
	 * Used for sorting
	 *
	 */
	private static class InternalHolder__Single_WebserviceResult_DisplayItem {


		WebserviceResult_DisplayItem webserviceResult_DisplayItem;
		

		/**
		 * For ordering Pending
		 */
		private Integer queuePosition;
		
		/**
		 * For ordering History
		 */
		private Long processingEnd_DateTime_In_Milliseconds;

	}
	
	///////////////////////////////////


	public static class WebserviceRequest {
		private String projectIdentifier;

		public String getProjectIdentifier() {
			return projectIdentifier;
		}
		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
	}
	
	/**
	 * 
	 *
	 */
	public static class WebserviceResult {
		
		int pendingCount;
		List<WebserviceResult_DisplayItem> pendingItemsList;
		List<WebserviceResult_DisplayItem> historyItemsList;
		
		boolean isScanFileImportAllowedViaWebSubmit;

		public int getPendingCount() {
			return pendingCount;
		}

		public List<WebserviceResult_DisplayItem> getPendingItemsList() {
			return pendingItemsList;
		}

		public List<WebserviceResult_DisplayItem> getHistoryItemsList() {
			return historyItemsList;
		}

		public boolean isScanFileImportAllowedViaWebSubmit() {
			return isScanFileImportAllowedViaWebSubmit;
		}
	}


	/**
	 * 
	 *
	 */
	public static class WebserviceResult_DisplayItem {

		private FileImportStatus statusEnum;

		private Integer queuePosition;
		private String queuePositionFmt;

		private String importSubmitDateTime;

		/**
		 * Only populated for status Complete, or Failed 
		 */
		private String importEndDateTime;

		//  Exactly one of fileImport_TrackingItem OR fileImportAndRunPipeline_TrackingItem will be populated, NOT Both or Neither

		private FileImport_TrackingDisplay fileImport_TrackingItem;

		private FileImportAndRunPipeline_TrackingDisplay fileImportAndRunPipeline_TrackingItem;


		public boolean isStatusQueued() {
			return statusEnum == FileImportStatus.QUEUED;
		}
		public boolean isStatusReQueued() {
			return statusEnum == FileImportStatus.RE_QUEUED;
		}

		public boolean isStatusQueuedOrRequeued() {
			return statusEnum == FileImportStatus.QUEUED
					|| statusEnum == FileImportStatus.RE_QUEUED;
		}
		public boolean isStatusStarted() {
			return statusEnum == FileImportStatus.STARTED;
		}
		public boolean isStatusComplete() {
			return statusEnum == FileImportStatus.COMPLETE;
		}
		public boolean isStatusFailed() {
			return statusEnum == FileImportStatus.FAILED;
		}

		public int getStatusId() {

			return statusEnum.value();
		}

		
		public Integer getQueuePosition() {
			return queuePosition;
		}

		public String getQueuePositionFmt() {
			return queuePositionFmt;
		}

		public FileImport_TrackingDisplay getFileImport_TrackingItem() {
			return fileImport_TrackingItem;
		}

		public FileImportAndRunPipeline_TrackingDisplay getFileImportAndRunPipeline_TrackingItem() {
			return fileImportAndRunPipeline_TrackingItem;
		}

		public String getImportSubmitDateTime() {
			return importSubmitDateTime;
		}

		public String getImportEndDateTime() {
			return importEndDateTime;
		}
	}

	/**
	 * 
	 *
	 */
	public static class FileImportAndRunPipeline_TrackingDisplay {


		private int trackingId;

		private FileImportStatus statusEnum;

		private String status;
		private String statusFailedMsg;

		private Integer queuePosition;
		private String queuePositionFmt;

		private String mainLineLabel;

		private String nameOfUploadUser;

		private String runSubmitDateTime;

		/**
		 * Only populated for status Started, Complete, or Failed 
		 */
		private String runStartDateTime;
		/**
		 * Only populated for status Complete, or Failed 
		 */
		private String runEndDateTime;
		/**
		 * Only populated for status Complete, or Failed 
		 */
		private String lastUpdatedDateTime;
		
		private List<FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair> labelvaluePairList;


		public boolean isStatusQueued() {
			return statusEnum == FileImportStatus.QUEUED;
		}
		public boolean isStatusReQueued() {
			return statusEnum == FileImportStatus.RE_QUEUED;
		}

		public boolean isStatusQueuedOrRequeued() {
			return statusEnum == FileImportStatus.QUEUED
					|| statusEnum == FileImportStatus.RE_QUEUED;
		}
		public boolean isStatusStarted() {
			return statusEnum == FileImportStatus.STARTED;
		}
		public boolean isStatusComplete() {
			return statusEnum == FileImportStatus.COMPLETE;
		}
		public boolean isStatusFailed() {
			return statusEnum == FileImportStatus.FAILED;
		}

		public int getStatusId() {

			return statusEnum.value();
		}
		public int getTrackingId() {
			return trackingId;
		}
		public FileImportStatus getStatusEnum() {
			return statusEnum;
		}
		public String getStatus() {
			return status;
		}
		public String getStatusFailedMsg() {
			return statusFailedMsg;
		}
		public Integer getQueuePosition() {
			return queuePosition;
		}
		public String getQueuePositionFmt() {
			return queuePositionFmt;
		}
		public String getMainLineLabel() {
			return mainLineLabel;
		}
		public String getNameOfUploadUser() {
			return nameOfUploadUser;
		}
		public String getRunSubmitDateTime() {
			return runSubmitDateTime;
		}
		public String getRunStartDateTime() {
			return runStartDateTime;
		}
		public String getRunEndDateTime() {
			return runEndDateTime;
		}
		public String getLastUpdatedDateTime() {
			return lastUpdatedDateTime;
		}
		public void setTrackingId(int trackingId) {
			this.trackingId = trackingId;
		}
		public void setStatusEnum(FileImportStatus statusEnum) {
			this.statusEnum = statusEnum;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public void setStatusFailedMsg(String statusFailedMsg) {
			this.statusFailedMsg = statusFailedMsg;
		}
		public void setQueuePosition(Integer queuePosition) {
			this.queuePosition = queuePosition;
		}
		public void setQueuePositionFmt(String queuePositionFmt) {
			this.queuePositionFmt = queuePositionFmt;
		}
		public void setMainLineLabel(String mainLineLabel) {
			this.mainLineLabel = mainLineLabel;
		}
		public void setNameOfUploadUser(String nameOfUploadUser) {
			this.nameOfUploadUser = nameOfUploadUser;
		}
		public void setRunSubmitDateTime(String runSubmitDateTime) {
			this.runSubmitDateTime = runSubmitDateTime;
		}
		public void setRunStartDateTime(String runStartDateTime) {
			this.runStartDateTime = runStartDateTime;
		}
		public void setRunEndDateTime(String runEndDateTime) {
			this.runEndDateTime = runEndDateTime;
		}
		public void setLastUpdatedDateTime(String lastUpdatedDateTime) {
			this.lastUpdatedDateTime = lastUpdatedDateTime;
		}
		public List<FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair> getLabelvaluePairList() {
			return labelvaluePairList;
		}
		public void setLabelvaluePairList(List<FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair> labelvaluePairList) {
			this.labelvaluePairList = labelvaluePairList;
		}
	}
	

	/**
	 * 
	 *
	 */
	public static class FileImportAndRunPipeline_TrackingDisplay__Label_Value_Pair {


		private String label;
		private String value;
		
		public String getLabel() {
			return label;
		}
		public String getValue() {
			return value;
		}
	}
	
	/**
	 * 
	 *
	 */
	public static class FileImport_TrackingDisplay {


		private int trackingId;

		private FileImportStatus statusEnum;

		private String status;
		private String statusFailedMsg;

		private Integer queuePosition;
		private String queuePositionFmt;

		private List<String> searchTagList;

		/**
		 * Optional item on XSD
		 */
		private String searchName;
		
		private String searchShortName;

		private String uploadedFilename;

		private String nameOfUploadUser;

		private String importSubmitDateTime;

		/**
		 * Only populated for status Started, Complete, or Failed 
		 */
		private String importStartDateTime;
		/**
		 * Only populated for status Complete, or Failed 
		 */
		private String importEndDateTime;
		/**
		 * Only populated for status Complete, or Failed 
		 */
		private String lastUpdatedDateTime;

		private String fastafileName;

		private List<String> scanFilenames;

		private String scanfileNamesCommaDelim;
		

		private List<String> genericOtherFileFilenames;

		private String genericOtherFileFileNamesCommaDelim;
		


		public boolean isStatusQueued() {
			return statusEnum == FileImportStatus.QUEUED;
		}
		public boolean isStatusReQueued() {
			return statusEnum == FileImportStatus.RE_QUEUED;
		}

		public boolean isStatusQueuedOrRequeued() {
			return statusEnum == FileImportStatus.QUEUED
					|| statusEnum == FileImportStatus.RE_QUEUED;
		}
		public boolean isStatusStarted() {
			return statusEnum == FileImportStatus.STARTED;
		}
		public boolean isStatusComplete() {
			return statusEnum == FileImportStatus.COMPLETE;
		}
		public boolean isStatusFailed() {
			return statusEnum == FileImportStatus.FAILED;
		}

		public int getStatusId() {

			return statusEnum.value();
		}


		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public String getLastUpdatedDateTime() {
			return lastUpdatedDateTime;
		}
		public void setLastUpdatedDateTime(String lastUpdatedDateTime) {
			this.lastUpdatedDateTime = lastUpdatedDateTime;
		}
		public String getUploadedFilename() {
			return uploadedFilename;
		}
		public void setUploadedFilename(String uploadedFilename) {
			this.uploadedFilename = uploadedFilename;
		}
		public String getSearchName() {
			return searchName;
		}
		public FileImportStatus getStatusEnum() {
			return statusEnum;
		}
		public void setStatusEnum(FileImportStatus statusEnum) {
			this.statusEnum = statusEnum;
		}
		public int getTrackingId() {
			return trackingId;
		}
		public void setTrackingId(int trackingId) {
			this.trackingId = trackingId;
		}
		public String getNameOfUploadUser() {
			return nameOfUploadUser;
		}
		public void setNameOfUploadUser(String nameOfUploadUser) {
			this.nameOfUploadUser = nameOfUploadUser;
		}
		public List<String> getScanFilenames() {
			return scanFilenames;
		}
		public void setScanFilenames(List<String> scanFilenames) {
			this.scanFilenames = scanFilenames;
		}
		public String getStatusFailedMsg() {
			return statusFailedMsg;
		}
		public void setStatusFailedMsg(String statusFailedMsg) {
			this.statusFailedMsg = statusFailedMsg;
		}
		public String getImportSubmitDateTime() {
			return importSubmitDateTime;
		}
		public void setImportSubmitDateTime(String importSubmitDateTime) {
			this.importSubmitDateTime = importSubmitDateTime;
		}
		public String getImportStartDateTime() {
			return importStartDateTime;
		}
		public void setImportStartDateTime(String importStartDateTime) {
			this.importStartDateTime = importStartDateTime;
		}
		public String getImportEndDateTime() {
			return importEndDateTime;
		}
		public void setImportEndDateTime(String importEndDateTime) {
			this.importEndDateTime = importEndDateTime;
		}
		public Integer getQueuePosition() {
			return queuePosition;
		}
		public void setQueuePosition(Integer queuePosition) {
			this.queuePosition = queuePosition;
		}
		public String getQueuePositionFmt() {
			return queuePositionFmt;
		}
		public void setQueuePositionFmt(String queuePositionFmt) {
			this.queuePositionFmt = queuePositionFmt;
		}
		public String getScanfileNamesCommaDelim() {
			return scanfileNamesCommaDelim;
		}
		public void setScanfileNamesCommaDelim(String scanfileNamesCommaDelim) {
			this.scanfileNamesCommaDelim = scanfileNamesCommaDelim;
		}
		public List<String> getSearchTagList() {
			return searchTagList;
		}
		public void setSearchTagList(List<String> searchTagList) {
			this.searchTagList = searchTagList;
		}
		public String getSearchShortName() {
			return searchShortName;
		}
		public String getFastafileName() {
			return fastafileName;
		}
		public void setFastafileName(String fastafileName) {
			this.fastafileName = fastafileName;
		}
		public List<String> getGenericOtherFileFilenames() {
			return genericOtherFileFilenames;
		}
		public void setGenericOtherFileFilenames(List<String> genericOtherFileFilenames) {
			this.genericOtherFileFilenames = genericOtherFileFilenames;
		}
		public String getGenericOtherFileFileNamesCommaDelim() {
			return genericOtherFileFileNamesCommaDelim;
		}
		public void setGenericOtherFileFileNamesCommaDelim(String genericOtherFileFileNamesCommaDelim) {
			this.genericOtherFileFileNamesCommaDelim = genericOtherFileFileNamesCommaDelim;
		}

	}



}
