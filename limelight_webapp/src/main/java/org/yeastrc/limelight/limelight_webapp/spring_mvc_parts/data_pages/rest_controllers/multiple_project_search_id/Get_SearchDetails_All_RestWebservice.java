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

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
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
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchCommentDTO;
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchWebLinksDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchProgramsPerSearchDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FileObjectStore_FileType_Enum;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_ForSearch_ForSearchIdsSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearch_Comments_ForProjectSearchIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearch_WebLinks_ForProjectSearchIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFileProjectSearch_ForProjectSearchIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchProgramsPerSearchListForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchScanFile_For_SearchIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.Search__SearchDetailsDisplay_ForProjectSearchIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_ForSearch_ForSearchIdsSearcher.FileObjectStorage_ForSearch_ForSearchIdsSearcher_RequestParams;
import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_ForSearch_ForSearchIdsSearcher.FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item;
import org.yeastrc.limelight.limelight_webapp.searchers.Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher.Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_CLI_PARAMS;
import org.yeastrc.limelight.limelight_webapp.searchers.Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher.Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_Path;
import org.yeastrc.limelight.limelight_webapp.searchers_results.SearchFileProjectSearch_ForProjectSearchIds_Item;
import org.yeastrc.limelight.limelight_webapp.searchers_results.Search__SearchDetailsDisplay_Item;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.user_session_management.UserSession;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Get Search Details - All
 * 
 */
@RestController
public class Get_SearchDetails_All_RestWebservice {

	private static final Logger log = LoggerFactory.getLogger( Get_SearchDetails_All_RestWebservice.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private SearchProgramsPerSearchListForSearchIdSearcherIF searchProgramsPerSearchListForSearchIdSearcher;
	
	@Autowired
	private SearchScanFile_For_SearchIds_Searcher_IF searchScanFile_For_SearchIds_Searcher;
	
	@Autowired
	private Search__SearchDetailsDisplay_ForProjectSearchIdsSearcherIF search_PathFastaFilenameImportEndTimestamp_ForProjectSearchIdsSearcher;

	@Autowired
	private SearchFileProjectSearch_ForProjectSearchIdsSearcherIF searchFileProjectSearch_ForProjectSearchIdsSearcher;
	
	@Autowired
	private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;

	@Autowired
	private FileObjectStorage_ForSearch_ForSearchIdsSearcher_IF fileObjectStorage_ForSearch_ForSearchIdsSearcher;

	@Autowired
	private ProjectSearch_WebLinks_ForProjectSearchIdsSearcherIF projectSearch_WebLinks_ForProjectSearchIdsSearcher;
	
	@Autowired
	private ProjectSearch_Comments_ForProjectSearchIdsSearcherIF projectSearch_Comments_ForProjectSearchIdsSearcher;

	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	

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
					+ AA_RestWSControllerPaths_Constants.GET_SEARCH_DETAILS_ALL_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  controllerEntry(
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    	try {
//    		log.warn( "controllerEntry(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );
    		
    		if ( webserviceRequest.projectSearchIds == null || webserviceRequest.projectSearchIds.isEmpty() ) {
    			log.warn( "ProjectSearchIds is null or empty." );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		List<Integer> projectSearchIds = webserviceRequest.projectSearchIds;

    		////////////////

    		//  AUTH - validate access

    		//  throws an exception if access is not valid that is turned into a webservice response by Spring

    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
    				validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds
    				.validatePublicAccessCodeReadAllowed( webserviceRequest.projectSearchIds, httpServletRequest );

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = 
					validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getWebSessionAuthAccessLevel();
			
    		////////////////

    		UserSession userSession = validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getUserSession();

    		////////////////

    		//  AUTH - Complete



    		WebserviceResult webserviceResult = new WebserviceResult();
    	    		
    		
			
			if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
				//  User is at least Project Owner so can add web links so always show the weblinks block, even if there are no web links
				webserviceResult.weblinksShowBlockAlways = true;
			}

			if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
				//  User is at least Project Owner so can add web links show the Add Weblinks Link
				webserviceResult.weblinksShowAddWeblinkLink = true;
			}
			
			if ( webSessionAuthAccessLevel.isAssistantProjectOwnerAllowed() ) {
				//  User is at least Researcher so can add comments so always show the comments block, even if there are no comments
				webserviceResult.commentsShowBlockAlways = true;
			}
			
			webserviceResult.result_PerProjectSearchId_Item_List = 
					this._internal_Compute( projectSearchIds, webSessionAuthAccessLevel, userSession );

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
    

    ///////////////////////
    
    /**
     * @param projectSearchIds
     * @param webSessionAuthAccessLevel
     * @param userSession
     * @return
     * @throws Exception
     */
    private List<WebserviceResult_PerProjectSearchId_Item> _internal_Compute( 
    		
    		List<Integer> projectSearchIds,

			WebSessionAuthAccessLevel webSessionAuthAccessLevel,
    		UserSession userSession

    		
    		) throws Exception {
    	

		Map<Integer, WebserviceResult_PerProjectSearchId_Item> webserviceResult_PerProjectSearchId_Item_Map_Key_ProjectSearchId = new HashMap<>( projectSearchIds.size() );

		Integer userId = null;
		
		if ( userSession != null ) {
			userId = userSession.getUserId();
		}
		

		List<Integer> searchIdList = new ArrayList<>( projectSearchIds.size() );
		
		Map<Integer, Integer> searchId_Map_Key_ProjectSearchId = new HashMap<>( projectSearchIds.size() );
		Map<Integer, List<Integer>> projectSearchIdList_Map_Key_SearchId = new HashMap<>( projectSearchIds.size() );
		
		for ( Integer projectSearchId : projectSearchIds ) {
		
			Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId(projectSearchId);
			if ( searchId == null ) {
				String msg = "No searchId for projectSearchId: " + projectSearchId;
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			
			searchId_Map_Key_ProjectSearchId.put(projectSearchId, searchId);
			
			List<Integer> projectSearchIdList = projectSearchIdList_Map_Key_SearchId.get(searchId);
			if ( projectSearchIdList == null ) {
				projectSearchIdList = new ArrayList<>(3);
				projectSearchIdList_Map_Key_SearchId.put(searchId, projectSearchIdList);
			}
			projectSearchIdList.add(projectSearchId);
			
			searchIdList.add(searchId);
		}
		
		//////////////////
		//////////////////
		

		//  Get FASTA File data from File Object Storage data tables to support download of FASTA file

		Map<Integer, FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item> fileObjectStorage_Data__ONLY_For_FASTA_File__Map_Key_ProjectSearchId = new HashMap<>( projectSearchIds.size() );

		{

			List<FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item> fileObjectStorage_ForSearch_ForSearchIds_ItemList = null;

			{
				List<Integer> fileTypeIds_Include = new ArrayList<>(1);
				fileTypeIds_Include.add( FileObjectStore_FileType_Enum.FASTA_FILE_TYPE.value() );  // INCLUDE FASTA file

				FileObjectStorage_ForSearch_ForSearchIdsSearcher_RequestParams requestParams = new FileObjectStorage_ForSearch_ForSearchIdsSearcher_RequestParams();
				requestParams.setSearchIds(searchIdList);
				requestParams.setFileTypeIds_Include(fileTypeIds_Include);


				fileObjectStorage_ForSearch_ForSearchIds_ItemList =
						fileObjectStorage_ForSearch_ForSearchIdsSearcher
						.getFileObjectStorage_ForSearch_ForSearchIds( requestParams );
			}

			for ( FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item item : fileObjectStorage_ForSearch_ForSearchIds_ItemList ) {

				List<Integer> projectSearchIdList = projectSearchIdList_Map_Key_SearchId.get(item.getSearchId());
				if ( projectSearchIdList == null ) {
					String msg = "Processing DB response, projectSearchIdList_Map_Key_SearchId.get(item.getSearchId()); returned null";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}

				for ( Integer projectSearchId : projectSearchIdList ) {

					//  Expect only 1 projectSearchId but being safe

					fileObjectStorage_Data__ONLY_For_FASTA_File__Map_Key_ProjectSearchId.put(projectSearchId, item);
				}
			}
		}

		///////  scan filenames

		Map<Integer, List<SearchScanFileDTO>> searchScanFileDTO_List_Map_Key_SearchId = new HashMap<>( searchIdList.size() );

		{
			List<SearchScanFileDTO> dbResults = 
					searchScanFile_For_SearchIds_Searcher.getSearchScanFile_For_SearchIds(searchIdList);

			for ( SearchScanFileDTO dbItem : dbResults ) {

				List<SearchScanFileDTO> searchScanFileDTO_List = searchScanFileDTO_List_Map_Key_SearchId.get( dbItem.getSearchId() );
				if ( searchScanFileDTO_List == null ) {
					searchScanFileDTO_List = new ArrayList<>();
					searchScanFileDTO_List_Map_Key_SearchId.put( dbItem.getSearchId(), searchScanFileDTO_List );
				}
				searchScanFileDTO_List.add(dbItem);
			}
		}

	

		////////////////////////
		
		//  Main Processing


		Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_Path retrieve_Path = Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_Path.NO;
		
		if ( userSession != null && userSession.isActualUser() ) {
			retrieve_Path = Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_Path.YES; 
		}
		
		Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_CLI_PARAMS retrieve_CLI_PARAMS = Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_CLI_PARAMS.NO;
		
		if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
			retrieve_CLI_PARAMS = Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_CLI_PARAMS.YES; 
		}

		List<Search__SearchDetailsDisplay_Item> search_PathFastaFilename_ItemList = 
				search_PathFastaFilenameImportEndTimestamp_ForProjectSearchIdsSearcher.getSearch_SearchDetailsDisplay_ListForProjectSearchIds( projectSearchIds, retrieve_Path, retrieve_CLI_PARAMS );

		DateFormat dateTimeFormat = DateFormat.getDateTimeInstance( DateFormat.LONG, DateFormat.LONG );
		
		for ( Search__SearchDetailsDisplay_Item search_PathFastaFilename_Item : search_PathFastaFilename_ItemList ) {
			
			FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item fileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item__ONLY_For_FASTA_File = fileObjectStorage_Data__ONLY_For_FASTA_File__Map_Key_ProjectSearchId.get( search_PathFastaFilename_Item.getProjectSearchId() );
			
			String formattedLoadTime = null;
			
			if ( search_PathFastaFilename_Item.getImportEndTimestamp() != null ) {
				formattedLoadTime = dateTimeFormat.format( search_PathFastaFilename_Item.getImportEndTimestamp() );
			}
			
			WebserviceResult_PerProjectSearchId_Item webserviceResult_PerProjectSearchId_Item = new WebserviceResult_PerProjectSearchId_Item();
			
			webserviceResult_PerProjectSearchId_Item.setProjectSearchId( search_PathFastaFilename_Item.getProjectSearchId() );
			
			if ( userSession != null && userSession.isActualUser() ) {
				webserviceResult_PerProjectSearchId_Item.setPath( search_PathFastaFilename_Item.getPath() );
			}
			
			{
				if ( fileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item__ONLY_For_FASTA_File != null ) {
					//  YES FASTA file imported
					webserviceResult_PerProjectSearchId_Item.setFastaFile_FileObjectStorageId( fileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item__ONLY_For_FASTA_File.getId() );
					
					webserviceResult_PerProjectSearchId_Item.setFastaFilename( fileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item__ONLY_For_FASTA_File.getFilename_at_import() );
					
					if ( search_PathFastaFilename_Item.getFastaFilename() != null 
							&& ( 
									! search_PathFastaFilename_Item.getFastaFilename().equals( 
											fileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item__ONLY_For_FASTA_File.getFilename_at_import() ) ) ) {

						webserviceResult_PerProjectSearchId_Item.setFastaFilename_IfLimelightXMLHasDifferentFilename(search_PathFastaFilename_Item.getFastaFilename());
					}
				} else {
					//  NO FASTA file imported
					webserviceResult_PerProjectSearchId_Item.setFastaFilename( search_PathFastaFilename_Item.getFastaFilename() );
				}
			}
			
			webserviceResult_PerProjectSearchId_Item.setFormattedLoadTime( formattedLoadTime );
			

			webserviceResult_PerProjectSearchId_Item.setConverterProgram_Name( search_PathFastaFilename_Item.getConverterProgram_Name() );
			webserviceResult_PerProjectSearchId_Item.setConverterProgram_Version( search_PathFastaFilename_Item.getConverterProgram_Version() );
			
			webserviceResult_PerProjectSearchId_Item.setConverterProgram_Pgm_URI( search_PathFastaFilename_Item.getConverterProgram_Pgm_URI() );
			
			if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
				webserviceResult_PerProjectSearchId_Item.setConverterProgram_Pgm_Arguments( search_PathFastaFilename_Item.getConverterProgram_Pgm_Arguments() );
			}
			if ( search_PathFastaFilename_Item.getConverterProgram_ConversionDate() != null ) {
				String formatted_converterProgram_ConversionDate = dateTimeFormat.format(search_PathFastaFilename_Item.getConverterProgram_ConversionDate());
				webserviceResult_PerProjectSearchId_Item.setFormatted_converterProgram_ConversionDate(formatted_converterProgram_ConversionDate);
			}
			
			List<SearchProgramsPerSearchDTO> searchProgramsPerSearchList =
					searchProgramsPerSearchListForSearchIdSearcher
					.getSearchProgramsPerSearchForSearchId( search_PathFastaFilename_Item.getSearchId() );
			webserviceResult_PerProjectSearchId_Item.setSearchProgramsPerSearchList( searchProgramsPerSearchList );

			{
				List<SearchScanFileDTO> searchScanFileDTO_List = searchScanFileDTO_List_Map_Key_SearchId.get( search_PathFastaFilename_Item.getSearchId() );
				if ( searchScanFileDTO_List != null ) {
					
					List<String> scanFilenameList = new ArrayList<>( searchScanFileDTO_List.size() );
					for ( SearchScanFileDTO searchScanFileDTO : searchScanFileDTO_List ) {
						scanFilenameList.add( searchScanFileDTO.getFilename() );
					}
					
					Collections.sort( scanFilenameList );
					
					webserviceResult_PerProjectSearchId_Item.setScanFilenameList(scanFilenameList);
					
					String scanFilenames_CommaDelim = StringUtils.join( scanFilenameList, ", " );
					
					webserviceResult_PerProjectSearchId_Item.setScanFilenames_CommaDelim(scanFilenames_CommaDelim);
				}
			}
			
			webserviceResult_PerProjectSearchId_Item_Map_Key_ProjectSearchId.put( webserviceResult_PerProjectSearchId_Item.projectSearchId, webserviceResult_PerProjectSearchId_Item );
		}
		

		{
			// Get and Save Search Files
			
			List<SearchFileProjectSearch_ForProjectSearchIds_Item> searchFileProjectSearch_ForProjectSearchIds_ItemList = 
					searchFileProjectSearch_ForProjectSearchIdsSearcher
					.getSearchFileProjectSearch_ForProjectSearchIds( projectSearchIds );

			for ( SearchFileProjectSearch_ForProjectSearchIds_Item item : searchFileProjectSearch_ForProjectSearchIds_ItemList ) {

				WebserviceResult_PerProjectSearchId_Item perProjSearchItem = webserviceResult_PerProjectSearchId_Item_Map_Key_ProjectSearchId.get( item.getProjectSearchId() );
				if ( perProjSearchItem == null ) {
					String msg = "Processing 'searchFileProjectSearch_ForProjectSearchIds_ItemList'.  webserviceResult_PerProjectSearchId_Item_Map_Key_ProjectSearchId.get( item.getProjectSearchId() ); returned null. item.getProjectSearchId(): " + item.getProjectSearchId();
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
				List<WebserviceResult_PerProjectSearchId_Item_SearchFile_Item> searchFileList = perProjSearchItem.searchFileList;
				if ( searchFileList == null ) {
					searchFileList = new ArrayList<>();
					perProjSearchItem.setSearchFileList( searchFileList );
				}
				WebserviceResult_PerProjectSearchId_Item_SearchFile_Item searchFile_Item = new WebserviceResult_PerProjectSearchId_Item_SearchFile_Item();
				searchFileList.add( searchFile_Item );
				searchFile_Item.id = item.getId();
				searchFile_Item.name = item.getDisplayName();
				if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
					searchFile_Item.canEdit = true;
				}
			}
		}

		{
			// Get and Save File Object Storage Files --  EXCLUDE FASTA file
			
			List<FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item> fileObjectStorage_ForSearch_ForSearchIds_ItemList = null;
			
			{
				List<Integer> fileTypeIds_Exclude = new ArrayList<>(1);
				fileTypeIds_Exclude.add( FileObjectStore_FileType_Enum.FASTA_FILE_TYPE.value() );  // EXCLUDE FASTA file
				
				FileObjectStorage_ForSearch_ForSearchIdsSearcher_RequestParams requestParams = new FileObjectStorage_ForSearch_ForSearchIdsSearcher_RequestParams();
				requestParams.setSearchIds(searchIdList);
				requestParams.setFileTypeIds_Exclude(fileTypeIds_Exclude);
				
				fileObjectStorage_ForSearch_ForSearchIds_ItemList =
					fileObjectStorage_ForSearch_ForSearchIdsSearcher
					.getFileObjectStorage_ForSearch_ForSearchIds( requestParams );
			}
			
			for ( FileObjectStorage_ForSearch_ForSearchIdsSearcher_Return_Item item : fileObjectStorage_ForSearch_ForSearchIds_ItemList ) {

				List<Integer> projectSearchIdList = projectSearchIdList_Map_Key_SearchId.get(item.getSearchId());
				if ( projectSearchIdList == null ) {
					String msg = "Processing DB response, projectSearchIdList_Map_Key_SearchId.get(item.getSearchId()); returned null";
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}

				for ( Integer projectSearchId : projectSearchIdList ) {

					//  Expect only 1 projectSearchId but being safe

					WebserviceResult_PerProjectSearchId_Item perProjSearchItem = webserviceResult_PerProjectSearchId_Item_Map_Key_ProjectSearchId.get( projectSearchId );
					if ( perProjSearchItem == null ) {
						String msg = "Processing 'fileObjectStorage_ForSearch_ForSearchIds_ItemList'.  webserviceResult_PerProjectSearchId_Item_Map_Key_ProjectSearchId.get( projectSearchId ); returned null. projectSearchId: " + projectSearchId;
						log.error(msg);
						throw new LimelightInternalErrorException(msg);
					}

					List<WebserviceResult_PerProjectSearchId_Item_SearchFile_Item> searchFileList = perProjSearchItem.searchFileList;
					if ( searchFileList == null ) {
						searchFileList = new ArrayList<>();
						perProjSearchItem.setSearchFileList( searchFileList );
					}
					WebserviceResult_PerProjectSearchId_Item_SearchFile_Item searchFile_Item = new WebserviceResult_PerProjectSearchId_Item_SearchFile_Item();
					searchFileList.add( searchFile_Item );
					searchFile_Item.id = item.getId();
					searchFile_Item.name = item.getFilename_at_import();
					searchFile_Item.entryIsFileObjectStorageFile = true;
					
					//  NEVER allow edit.  Will need more work on Web side (template and JS) if want to allow edit
					// if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
					// 	searchFile_Item.canEdit = true;
					// }
				}

			}
		}

		{
			List<ProjectSearchWebLinksDTO> results = 
					projectSearch_WebLinks_ForProjectSearchIdsSearcher.getProjectSearchWebLinksDTO_ForProjectSearchIds( projectSearchIds );

			for ( ProjectSearchWebLinksDTO item : results ) {

				WebserviceResult_PerProjectSearchId_Item perProjSearchItem = webserviceResult_PerProjectSearchId_Item_Map_Key_ProjectSearchId.get( item.getProjectSearchId() );
				if ( perProjSearchItem == null ) {
					String msg = "Processing 'fileObjectStorage_ForSearch_ForSearchIds_ItemList'.  webserviceResult_PerProjectSearchId_Item_Map_Key_ProjectSearchId.get( item.getProjectSearchId() ); returned null. item.getProjectSearchId(): " + item.getProjectSearchId();
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}
				if ( perProjSearchItem.webLinkList == null ) {
					perProjSearchItem.webLinkList = new ArrayList<>();
				}
				WebserviceResult_PerProjectSearchId_Item_WebLink_Item webLink_Item = new WebserviceResult_PerProjectSearchId_Item_WebLink_Item();
				perProjSearchItem.webLinkList.add( webLink_Item );
				webLink_Item.id = item.getId();
				webLink_Item.linkURL = item.getLinkURL();
				webLink_Item.linkLabel = item.getLinkLabel();
				if ( webSessionAuthAccessLevel.isProjectOwnerAllowed() ) {
					webLink_Item.canDelete = true;
				}
			}
		}
		
		{
			List<ProjectSearchCommentDTO> results = 
					projectSearch_Comments_ForProjectSearchIdsSearcher.getProjectSearchCommentDTO_ForProjectSearchIds( projectSearchIds );

			SimpleDateFormat simpleDateFormatComment = new SimpleDateFormat("yyyy-MM-dd");

			for ( ProjectSearchCommentDTO item : results ) {

				WebserviceResult_PerProjectSearchId_Item perProjSearchItem = webserviceResult_PerProjectSearchId_Item_Map_Key_ProjectSearchId.get( item.getProjectSearchId() );
				if ( perProjSearchItem == null ) {
					String msg = "Processing 'fileObjectStorage_ForSearch_ForSearchIds_ItemList'.  webserviceResult_PerProjectSearchId_Item_Map_Key_ProjectSearchId.get( item.getProjectSearchId() ); returned null. item.getProjectSearchId(): " + item.getProjectSearchId();
					log.error(msg);
					throw new LimelightInternalErrorException(msg);
				}

				if ( perProjSearchItem.commentList == null ) {
					perProjSearchItem.commentList = new ArrayList<>();
				}
				String commentDate = simpleDateFormatComment.format( item.getTimestampLastUpdated() );
				WebserviceResult_PerProjectSearchId_Item__Comment_Item comment_Item = new WebserviceResult_PerProjectSearchId_Item__Comment_Item();
				perProjSearchItem.commentList.add( comment_Item );
				comment_Item.id = item.getId();
				comment_Item.commentText = item.getCommentText();
				comment_Item.commentDate = commentDate;
				if ( webSessionAuthAccessLevel.isProjectOwnerAllowed()
						|| ( webSessionAuthAccessLevel.isAssistantProjectOwnerAllowed()
								&& userId != null // Have Session User Id
								&& item.getUserIdCreated() != null 
								&& userId.intValue() == item.getUserIdCreated().intValue() )  ) {
					comment_Item.canEdit = true;
					comment_Item.canDelete = true;
				}
			}
			
		}


		
		List<WebserviceResult_PerProjectSearchId_Item> result_PerProjectSearchId_Item_List = new ArrayList<>( webserviceResult_PerProjectSearchId_Item_Map_Key_ProjectSearchId.values() );
		
		
		return result_PerProjectSearchId_Item_List;
    }
    
    
    
    

    //////////////////////////////////////////
    //////////////////////////////////////////
    //////////////////////////////////////////
    
    //   Webservice Request and Result
    
    /**
     * 
     *
     */
    public static class WebserviceRequest {

    	private List<Integer> projectSearchIds;

		public void setProjectSearchIds(List<Integer> projectSearchIds) {
			this.projectSearchIds = projectSearchIds;
		}
    }
    
    /**
     * 
     *
     */
    public static class WebserviceResult {
    
    	/**
    	 * true when have a web link or user can add a web link
    	 */
    	private boolean weblinksShowBlockAlways;

    	/**
    	 * true when user can add a web link
    	 */
    	private boolean weblinksShowAddWeblinkLink;

    	/**
    	 * true when have a comment or user can add a comment
    	 */
    	private boolean commentsShowBlockAlways;

    	
    	private List<WebserviceResult_PerProjectSearchId_Item> result_PerProjectSearchId_Item_List;


		public boolean isWeblinksShowBlockAlways() {
			return weblinksShowBlockAlways;
		}
		public boolean isWeblinksShowAddWeblinkLink() {
			return weblinksShowAddWeblinkLink;
		}
		public boolean isCommentsShowBlockAlways() {
			return commentsShowBlockAlways;
		}
		public List<WebserviceResult_PerProjectSearchId_Item> getResult_PerProjectSearchId_Item_List() {
			return result_PerProjectSearchId_Item_List;
		}
    }
    
    /**
     * Result Item Per Project Search Id
     *
     */
    public static class WebserviceResult_PerProjectSearchId_Item {

    	private int projectSearchId;
    	

    	private int searchId;
    	private String path;

    	private String fastaFilename;
    	private String fastaFilename_IfLimelightXMLHasDifferentFilename;
    	private Integer fastaFile_FileObjectStorageId;
    	
    	
    	private String formattedLoadTime;

    	//  Converter Program Info
    	
    	private String converterProgram_Name;
    	private String converterProgram_Version;
    	
    	private String converterProgram_Pgm_URI;
    	private String converterProgram_Pgm_Arguments;
    	private String formatted_converterProgram_ConversionDate;

    	private List<SearchProgramsPerSearchDTO> searchProgramsPerSearchList;
    	
    	private List<String> scanFilenameList;
    	private String scanFilenames_CommaDelim;

    	
		private List<WebserviceResult_PerProjectSearchId_Item_SearchFile_Item> searchFileList;
    	private List<WebserviceResult_PerProjectSearchId_Item_WebLink_Item> webLinkList;
    	private List<WebserviceResult_PerProjectSearchId_Item__Comment_Item> commentList;

    	
    	public int getProjectSearchId() {
			return projectSearchId;
		}
		public void setProjectSearchId(int projectSearchId) {
			this.projectSearchId = projectSearchId;
		}
		public int getSearchId() {
			return searchId;
		}
		public void setSearchId(int searchId) {
			this.searchId = searchId;
		}
		public String getPath() {
			return path;
		}
		public void setPath(String path) {
			this.path = path;
		}
		public String getFastaFilename() {
			return fastaFilename;
		}
		public void setFastaFilename(String fastaFilename) {
			this.fastaFilename = fastaFilename;
		}
		public String getConverterProgram_Name() {
			return converterProgram_Name;
		}
		public void setConverterProgram_Name(String converterProgram_Name) {
			this.converterProgram_Name = converterProgram_Name;
		}
		public String getConverterProgram_Version() {
			return converterProgram_Version;
		}
		public void setConverterProgram_Version(String converterProgram_Version) {
			this.converterProgram_Version = converterProgram_Version;
		}
		public String getConverterProgram_Pgm_URI() {
			return converterProgram_Pgm_URI;
		}
		public void setConverterProgram_Pgm_URI(String converterProgram_Pgm_URI) {
			this.converterProgram_Pgm_URI = converterProgram_Pgm_URI;
		}
		public String getConverterProgram_Pgm_Arguments() {
			return converterProgram_Pgm_Arguments;
		}
		public void setConverterProgram_Pgm_Arguments(String converterProgram_Pgm_Arguments) {
			this.converterProgram_Pgm_Arguments = converterProgram_Pgm_Arguments;
		}
		public List<WebserviceResult_PerProjectSearchId_Item_SearchFile_Item> getSearchFileList() {
			return searchFileList;
		}
		public void setSearchFileList(List<WebserviceResult_PerProjectSearchId_Item_SearchFile_Item> searchFileList) {
			this.searchFileList = searchFileList;
		}
		public List<WebserviceResult_PerProjectSearchId_Item_WebLink_Item> getWebLinkList() {
			return webLinkList;
		}
		public void setWebLinkList(List<WebserviceResult_PerProjectSearchId_Item_WebLink_Item> webLinkList) {
			this.webLinkList = webLinkList;
		}
		public List<WebserviceResult_PerProjectSearchId_Item__Comment_Item> getCommentList() {
			return commentList;
		}
		public void setCommentList(List<WebserviceResult_PerProjectSearchId_Item__Comment_Item> commentList) {
			this.commentList = commentList;
		}
		public String getFastaFilename_IfLimelightXMLHasDifferentFilename() {
			return fastaFilename_IfLimelightXMLHasDifferentFilename;
		}
		public void setFastaFilename_IfLimelightXMLHasDifferentFilename(
				String fastaFilename_IfLimelightXMLHasDifferentFilename) {
			this.fastaFilename_IfLimelightXMLHasDifferentFilename = fastaFilename_IfLimelightXMLHasDifferentFilename;
		}
		public Integer getFastaFile_FileObjectStorageId() {
			return fastaFile_FileObjectStorageId;
		}
		public void setFastaFile_FileObjectStorageId(Integer fastaFile_FileObjectStorageId) {
			this.fastaFile_FileObjectStorageId = fastaFile_FileObjectStorageId;
		}
		public String getFormattedLoadTime() {
			return formattedLoadTime;
		}
		public void setFormattedLoadTime(String formattedLoadTime) {
			this.formattedLoadTime = formattedLoadTime;
		}
		public String getFormatted_converterProgram_ConversionDate() {
			return formatted_converterProgram_ConversionDate;
		}
		public void setFormatted_converterProgram_ConversionDate(String formatted_converterProgram_ConversionDate) {
			this.formatted_converterProgram_ConversionDate = formatted_converterProgram_ConversionDate;
		}
		public List<SearchProgramsPerSearchDTO> getSearchProgramsPerSearchList() {
			return searchProgramsPerSearchList;
		}
		public void setSearchProgramsPerSearchList(List<SearchProgramsPerSearchDTO> searchProgramsPerSearchList) {
			this.searchProgramsPerSearchList = searchProgramsPerSearchList;
		}
		public List<String> getScanFilenameList() {
			return scanFilenameList;
		}
		public void setScanFilenameList(List<String> scanFilenameList) {
			this.scanFilenameList = scanFilenameList;
		}
		public String getScanFilenames_CommaDelim() {
			return scanFilenames_CommaDelim;
		}
		public void setScanFilenames_CommaDelim(String scanFilenames_CommaDelim) {
			this.scanFilenames_CommaDelim = scanFilenames_CommaDelim;
		}
    }

    /**
     * SearchFile_Item
     *
     * List per Project Search Id
     */
    public static class WebserviceResult_PerProjectSearchId_Item_SearchFile_Item {

    	private int id;
    	private String name;
    	private boolean entryIsFileObjectStorageFile; 
    	private boolean canEdit;
    	
		public int getId() {
			return id;
		}
		public String getName() {
			return name;
		}
		public boolean isEntryIsFileObjectStorageFile() {
			return entryIsFileObjectStorageFile;
		}
		public boolean isCanEdit() {
			return canEdit;
		} 
    }

    public static class WebserviceResult_PerProjectSearchId_Item_WebLink_Item {

    	private int id;
    	private String linkURL;
    	private String linkLabel;
    	private boolean canDelete;
    	
		public int getId() {
			return id;
		}
		public String getLinkURL() {
			return linkURL;
		}
		public String getLinkLabel() {
			return linkLabel;
		}
		public boolean isCanDelete() {
			return canDelete;
		} 
    }
    
    public class WebserviceResult_PerProjectSearchId_Item__Comment_Item {

    	private int id;
    	private String commentText;
    	private String commentDate;
    	private boolean canEdit;
    	private boolean canDelete;
    	
		public int getId() {
			return id;
		}
		public String getCommentText() {
			return commentText;
		}
		public String getCommentDate() {
			return commentDate;
		}
		public boolean isCanEdit() {
			return canEdit;
		}
		public boolean isCanDelete() {
			return canDelete;
		}

    }
}
