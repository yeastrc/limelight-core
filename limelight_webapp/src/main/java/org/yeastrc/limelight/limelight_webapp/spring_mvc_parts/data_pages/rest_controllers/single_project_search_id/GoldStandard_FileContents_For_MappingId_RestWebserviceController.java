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
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_UploadedFileContents_DTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.dao.GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.GoldStandard_UploadedFileContents_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.GoldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.GoldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher.GoldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.GUNzip_ByteArray_To_ByteArray_IF;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Gold Standard File Contents for Mapping ID
 *
 */
@RestController
public class GoldStandard_FileContents_For_MappingId_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( GoldStandard_FileContents_For_MappingId_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;

	@Autowired
	private GoldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher_IF goldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher;
	
	@Autowired
	private GoldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DAO_IF goldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DAO;
	
	@Autowired
	private GoldStandard_UploadedFileContents_DAO_IF goldStandard_UploadedFileContents_DAO;

	@Autowired
	private RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF restControllerUtils__Request_Accept_GZip_Response_Set_GZip;

	@Autowired
	private GUNzip_ByteArray_To_ByteArray_IF gUNzip_ByteArray_To_ByteArray;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public GoldStandard_FileContents_For_MappingId_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.SCAN_FILE_GOLD_STANDARD_ROOT_FILE_CONTENTS_FOR_MAPPING_ID
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

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );

    		if ( webserviceRequest.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id == null ) {
    			log.warn( "gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id is not assigned in request" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

			//  Query is through project_scan_file_tbl table so ensured that scan file id is in project
			
    		GoldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher_Result goldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher_Result =
    				goldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher.getProjectIdFor_GoldStandardRoot_MappingTblId(webserviceRequest.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id);

			if ( goldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher_Result == null ) {
				log.warn( "No record found for webserviceRequest.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id " + webserviceRequest.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			int projectId = goldStandard_ProjectIdFor_GoldStandardRoot_MappingTblId_Searcher_Result.getProjectId();
	
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
			
			Integer goldStandard_RootId =
					goldStandard_ForScanFile_Root_ProjectScanFile_Mapping_DAO.get_RootId_For_MappingId( webserviceRequest.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id );
			

			if ( goldStandard_RootId == null ) {
				log.warn( "No record found to get goldStandard_RootId for webserviceRequest.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id " + webserviceRequest.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			
			GoldStandard_UploadedFileContents_DTO goldStandard_UploadedFileContents_DTO =
					goldStandard_UploadedFileContents_DAO.getFor_GoldStandard_RootId( goldStandard_RootId );
			
			if ( goldStandard_UploadedFileContents_DTO == null ) {
				log.warn( "No record found to get goldStandard_UploadedFileContents_DTO for webserviceRequest.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id " + webserviceRequest.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id );
				throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			}
			

			boolean accept_GZIP = restControllerUtils__Request_Accept_GZip_Response_Set_GZip.does_HttpServletRequest_Accept_GZip( httpServletRequest );
			
			byte[] responseAsJSON = goldStandard_UploadedFileContents_DTO.getFileContents_GZIP();

			if ( accept_GZIP ) {
				restControllerUtils__Request_Accept_GZip_Response_Set_GZip.set_GZIP_On_HttpServletResponse( httpServletResponse );
			} else {
				

				// NOT accept_GZIP so Unzip to return 

				responseAsJSON = gUNzip_ByteArray_To_ByteArray.gUNzip_ByteArray_To_ByteArray(responseAsJSON);
			}

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
    
    /////////////////////////////////////////////

    public static class WebserviceRequest {
    	
    	private Integer gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id;

		public void setGold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id(
				Integer gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id) {
			this.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id = gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id;
		}


    }
    
//    public static class WebserviceResult {
//    	
//    }


}


