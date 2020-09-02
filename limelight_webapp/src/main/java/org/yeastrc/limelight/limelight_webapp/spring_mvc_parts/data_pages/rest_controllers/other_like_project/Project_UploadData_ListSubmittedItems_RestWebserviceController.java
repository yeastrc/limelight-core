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

import java.text.DateFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dao.FileImportTracking_Shared_Get_DAO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingRunDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingStatusValLkupDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportFileType;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAnd_ProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.dao.UserDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingSingleFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao.FileImportTrackingStatusValuesLookupDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.display_objects.FileImportTrackingDisplay;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers.FileImportTrackingRun_LatestForParent_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers.FileImportTracking_All_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers.FileImportTracking_PendingCount_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers.FileImportTracking_PendingTrackingIdsAllProjects_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsLimelightXMLFileImportFullyConfiguredIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsScanFileImportAllowedViaWebSubmitIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controller_utils.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtCentralWebappWebserviceAccessIF;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataRequest;
import org.yeastrc.limelight.limelight_webapp.user_mgmt_webapp_access.UserMgmtGetUserDataResponse;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
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
	private FileImportTrackingStatusValuesLookupDAO_IF fileImportTrackingStatusValuesLookupDAO;
	
	@Autowired
	private FileImportTrackingRun_LatestForParent_SearcherIF fileImportTrackingRun_LatestForParent_Searcher;
	
	@Autowired
	private FileImportTracking_PendingCount_SearcherIF fileImportTracking_PendingCount_Searcher;
	
	@Autowired
	private FileImportTracking_PendingTrackingIdsAllProjects_SearcherIF fileImportTracking_PendingTrackingIdsAllProjects_Searcher;
	
	@Autowired
	private FileImportTrackingSingleFileDAO_IF fileImportTrackingSingleFileDAO;
	
	@Autowired
	private UserDAO_IF userDAO;
	
	@Autowired
	private UserMgmtCentralWebappWebserviceAccessIF userMgmtCentralWebappWebserviceAccess;

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

			WebserviceResult webserviceResult = getLimelightXMLFileImportingDataForPage( projectId );

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
	 * If user is Researcher or better and Limelight XML File Import is Fully Configured, 
	 * get submitted Limelight XML files
	 * 
	 * @param request
	 * @param projectId
	 * @throws Exception
	 * @throws LimelightInternalErrorException
	 */
	private WebserviceResult getLimelightXMLFileImportingDataForPage(int projectId) throws Exception {
		
		List<FileImportTrackingDisplay> pendingItemsList = new ArrayList<>();
		List<FileImportTrackingDisplay> historyItemsList = new ArrayList<>();
		List<Integer> completeSuccessTrackingIdList = new ArrayList<>();
		ArrayList<Integer> pendingTrackingIdsAllProjectsList = null;
		
		List<FileImportTrackingDTO> fileImportTrackingList = 
				fileImportTracking_All_Searcher.getAllForWebDisplayForProject( projectId );
		
		if ( ! fileImportTrackingList.isEmpty() ) {
			
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
			List<InternalHolder> internalHolderList = new ArrayList<>( fileImportTrackingList.size() ); 
			//  At the same time, check for tracking records have status QUEUED or RE_QUEUED
			//     get all tracking id for status QUEUED or RE_QUEUED
			//     so can put queue position on the display objects
			// check for any tracking records have status QUEUED or RE_QUEUED
			boolean foundQueuedOrReQueued = false;
			for ( FileImportTrackingDTO trackingItem : fileImportTrackingList ) {
				InternalHolder internalHolder = new InternalHolder();
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
						throw new LimelightInternalErrorException( msg );
					}
					if ( latestRunForTrackingItem.getRunStatus() != FileImportStatus.FAILED ) {
						String msg = "Limelight XML Import Tracking Processing: Latest run status is not FAILED for Tracking Item status FAILED. "
								+ "Tracking Item Id: " + trackingItem.getId();
						log.error( msg );
						throw new LimelightInternalErrorException( msg );
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
			for ( InternalHolder internalHolder : internalHolderList ) {
				FileImportTrackingDTO trackingItem = internalHolder.trackingItem;
				FileImportTrackingDisplay displayItem = new FileImportTrackingDisplay();
				//  Set Pending queue position
				if ( trackingItem.getStatus() == FileImportStatus.QUEUED
						|| trackingItem.getStatus() == FileImportStatus.RE_QUEUED ) {
					if ( pendingTrackingIdsAllProjectsList == null || pendingTrackingIdsAllProjectsList.isEmpty() ) {
						String msg = "pendingTrackingIdsAllProjectsList is null or empty when tracking status is QUEUED or RE_QUEUED."
								+ "  trackingItem id: " + trackingItem.getId();
						log.error( msg );
						throw new LimelightInternalErrorException(msg);
					}
					int queueIndex = pendingTrackingIdsAllProjectsList.indexOf( trackingItem.getId() );
					if ( queueIndex < 0 )  {
						//  Was not found in all pending.  Must no longer be pending. Get from DB again
						trackingItem = FileImportTracking_Shared_Get_DAO.getInstance().getItem( trackingItem.getId() );
						if ( trackingItem.getStatus() == FileImportStatus.QUEUED
								|| trackingItem.getStatus() == FileImportStatus.RE_QUEUED ) {
							
							//  Set to QUEUE_POSITION_NOT_SET_SINCE_NOT_AVAILABLE and fix those after processing all records
							
							needToUpdateQueuePosition = true;
							displayItem.setQueuePosition( QUEUE_POSITION_NOT_SET_SINCE_NOT_AVAILABLE );
							
							// WAS
//							String msg = "Tracking item is not in all pending for tracking status QUEUED or RE_QUEUED"
//									+ " after re-get from DB."
//									+ "  trackingItem id: " + trackingItem.getId();
//							log.error( msg );
//							throw new LimelightInternalErrorException(msg);
						}
					} else {
						int queuePosition = queueIndex + 1; // add 1 since queueIndex is zero based
						displayItem.setQueuePosition( queuePosition );
						displayItem.setQueuePositionFmt( numberFormat.format( queuePosition ) );
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
					displayItem.setStatusFailedMsg( internalHolder.latestRunForTrackingItem.getDataErrorText() );
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
				List<FileImportTrackingSingleFileDTO> scanFileEntryList = new ArrayList<>();
				for ( FileImportTrackingSingleFileDTO fileDataEntry : fileDataList ) {
					if ( fileDataEntry.getFileType() == FileImportFileType.LIMELIGHT_XML_FILE ) {
						importFileEntry = fileDataEntry;
					} else if ( fileDataEntry.getFileType() == FileImportFileType.SCAN_FILE ) {
						scanFileEntryList.add( fileDataEntry );
					} else {
						String msg = "Import Tracking Processing: Unknown file type for single file id: " 
								+ fileDataEntry.getId();
						log.error( msg );
						throw new LimelightInternalErrorException( msg );
					}
				}
				if ( importFileEntry == null ) {
					String msg = "Import Tracking Processing: importFileEntry not found for tracking id: " 
							+ trackingItem.getId();
					log.error( msg );
					throw new LimelightInternalErrorException( msg );
				}
				String uploadedFilename = importFileEntry.getFilenameInUpload();
				displayItem.setUploadedFilename( uploadedFilename );
				List<String> scanFilenames = new ArrayList<>( scanFileEntryList.size() );
				for ( FileImportTrackingSingleFileDTO scanFileEntry : scanFileEntryList ) {
					String scanFilename = scanFileEntry.getFilenameInUpload();
					scanFilenames.add( scanFilename );
				}
				String scanfileNamesCommaDelim = StringUtils.join( scanFilenames, ", " );
				displayItem.setScanFilenames( scanFilenames );
				displayItem.setScanfileNamesCommaDelim( scanfileNamesCommaDelim );
				if ( trackingItem.getRecordInsertDateTime() != null ) {
					displayItem.setImportSubmitDateTime( dateTimeFormat.format( trackingItem.getRecordInsertDateTime() ) );
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
				displayItem.setSearchName( searchName );
				int userId = trackingItem.getUserId();
				//  Get full user data
				//  Get User Mgmt User Id for authUserId
				Integer userMgmtUserId = userDAO.getUserMgmtUserIdForId( userId );
				if ( userMgmtUserId == null ) {
					String msg = "Failed to get userMgmtUserId for Limelight user id: " + userId;
					log.warn( msg );
			        return null;  //  Early Exit
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
				if ( trackingItem.getStatus() == FileImportStatus.COMPLETE
						|| trackingItem.getStatus() == FileImportStatus.FAILED ) {
					historyItemsList.add( displayItem );
				} else {
					pendingItemsList.add( displayItem );
				}
				if ( trackingItem.getStatus() == FileImportStatus.COMPLETE ) {
					completeSuccessTrackingIdList.add( trackingItem.getId() );
				}
			}

			if ( needToUpdateQueuePosition ) {
				
				//  Some of queued or re-queued were not in pendingTrackingIdsAllProjectsList so set their queue position here
				//  Arbitrary assign queue position to after size of pendingTrackingIdsAllProjectsList
				
				int nextQueuePosition = pendingTrackingIdsAllProjectsList.size() + 1;
				
				for ( int index = pendingItemsList.size() - 1; index >= 0; index-- ) {
					
					//  Process in reverse order since 
					
					FileImportTrackingDisplay displayItem = pendingItemsList.get( index );
					
					if ( displayItem.getQueuePosition() != null && displayItem.getQueuePosition().intValue() == QUEUE_POSITION_NOT_SET_SINCE_NOT_AVAILABLE ) {
						
						displayItem.setQueuePosition( nextQueuePosition );
						displayItem.setQueuePositionFmt( numberFormat.format( nextQueuePosition ) );

						nextQueuePosition++;
					}
				}
			}
		}
		
		Collections.sort( completeSuccessTrackingIdList );
		
		int pendingCount = 
				fileImportTracking_PendingCount_Searcher.getPendingCountForProject( projectId );
		WebserviceResult webserviceResult = new WebserviceResult();
		webserviceResult.pendingCount = pendingCount;
		webserviceResult.pendingItemsList = pendingItemsList;
		webserviceResult.historyItemsList = historyItemsList;
		webserviceResult.completeSuccessTrackingIdList = completeSuccessTrackingIdList;
		
		webserviceResult.isScanFileImportAllowedViaWebSubmit = isScanFileImportAllowedViaWebSubmit.isScanFileImportAllowedViaWebSubmit();
		
		return webserviceResult;
	}
	
	/**
	 * 
	 *
	 */
	private static class InternalHolder {
		FileImportTrackingDTO trackingItem;
		FileImportTrackingRunDTO latestRunForTrackingItem;
	}


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
		List<FileImportTrackingDisplay> pendingItemsList;
		List<FileImportTrackingDisplay> historyItemsList;
		List<Integer> completeSuccessTrackingIdList;
		
		boolean isScanFileImportAllowedViaWebSubmit;
		
		public int getPendingCount() {
			return pendingCount;
		}
		public void setPendingCount(int pendingCount) {
			this.pendingCount = pendingCount;
		}
		public List<FileImportTrackingDisplay> getPendingItemsList() {
			return pendingItemsList;
		}
		public void setPendingItemsList(
				List<FileImportTrackingDisplay> pendingItemsList) {
			this.pendingItemsList = pendingItemsList;
		}
		public List<FileImportTrackingDisplay> getHistoryItemsList() {
			return historyItemsList;
		}
		public void setHistoryItemsList(
				List<FileImportTrackingDisplay> historyItemsList) {
			this.historyItemsList = historyItemsList;
		}
		public List<Integer> getCompleteSuccessTrackingIdList() {
			return completeSuccessTrackingIdList;
		}
		public void setCompleteSuccessTrackingIdList(
				List<Integer> completeSuccessTrackingIdList) {
			this.completeSuccessTrackingIdList = completeSuccessTrackingIdList;
		}
		public boolean isScanFileImportAllowedViaWebSubmit() {
			return isScanFileImportAllowedViaWebSubmit;
		}
		public void setScanFileImportAllowedViaWebSubmit(boolean isScanFileImportAllowedViaWebSubmit) {
			this.isScanFileImportAllowedViaWebSubmit = isScanFileImportAllowedViaWebSubmit;
		}
	}



}
