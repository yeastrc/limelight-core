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
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Root_Entries_For_ProjectScanFileId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.GoldStandard_Root_Entries_For_ProjectScanFileId_Searcher.GoldStandard_Root_Entries_For_ProjectId_ScanFileId_Searcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.searchers.GoldStandard_Root_Entries_For_ProjectScanFileId_Searcher.GoldStandard_Root_Entries_For_ProjectScanFileId_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.GoldStandard_Root_Entries_For_ProjectScanFileId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFile_ProjectId_For_ProjectScanFileId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchIdList_For_ProjectScanFileId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Root_Entries_For_ProjectScanFileId_Searcher.FeatureDetection_Root_Entries_For_ProjectScanFileId_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.FeatureDetection_Root_Entries_For_ProjectScanFileId_Searcher.FeatureDetection_Root_Entries_For_ProjectId_ScanFileId_Searcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * Single Scan File Details
 * 
 *     Includes Feature Detection entries
 * 
 * Return data for Scan File Imported into Limelight/Spectr.
 * 
 * Does not return data for Scan Filenames in the Limelight PSM where the scan file was NOT imported.
 *
 */
@RestController
public class Project_ScanFile_Details_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Project_ScanFile_Details_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;

	@Autowired
	private ProjectScanFile_ProjectId_For_ProjectScanFileId_Searcher_IF projectScanFile_ProjectId_For_ProjectScanFileId_Searcher;
	
	@Autowired
	private ProjectSearchIdList_For_ProjectScanFileId_Searcher_IF projectSearchIdList_For_ProjectScanFileId_Searcher;

	@Autowired
	private FeatureDetection_Root_Entries_For_ProjectScanFileId_Searcher_IF featureDetection_Root_Entries_For_ProjectId_ScanFileId_Searcher;
	
	@Autowired
	private GoldStandard_Root_Entries_For_ProjectScanFileId_Searcher_IF goldStandard_Root_Entries_For_ProjectScanFileId_Searcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Project_ScanFile_Details_RestWebserviceController() {
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
					+ AA_RestWSControllerPaths_Constants.PROJECT_SCAN_FILE_DETAILS_FOR_PROJECT_REST_WEBSERVICE_CONTROLLER
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

    		if ( webserviceRequest.projectScanFileId == null ) {
    			log.warn( "projectScanFileId is not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		Integer projectId = projectScanFile_ProjectId_For_ProjectScanFileId_Searcher.get_ProjectId_For_ProjectScanFileId_Searcher(webserviceRequest.projectScanFileId);

    		if ( projectId == null ) {
    			log.warn( "projectScanFileId is not found in db" );
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
			
			
			//  Searches containing Scan File
			
			List<Integer> projectSearchIds_ForScanFile_List = projectSearchIdList_For_ProjectScanFileId_Searcher.getForProjectScanFileId_ProjectSearchIdList(webserviceRequest.projectScanFileId);
			
			
			//  Feature Detection

			List<WebserviceResult_FeatureDetectionEntry> featureDetection_List = null;

			{
				FeatureDetection_Root_Entries_For_ProjectScanFileId_Searcher_Result featureDetection_Searcher_Result =
						featureDetection_Root_Entries_For_ProjectId_ScanFileId_Searcher.getForProjectScanFileId(webserviceRequest.projectScanFileId);

				List<FeatureDetection_Root_Entries_For_ProjectId_ScanFileId_Searcher_Result_Item> dbEntries_FeatureDetection = featureDetection_Searcher_Result.getEntries();

				featureDetection_List = new ArrayList<>(  dbEntries_FeatureDetection.size() );

				for ( FeatureDetection_Root_Entries_For_ProjectId_ScanFileId_Searcher_Result_Item dbEntry : dbEntries_FeatureDetection ) {

					WebserviceResult_FeatureDetectionEntry featureDetection_Entry = new WebserviceResult_FeatureDetectionEntry();
					featureDetection_Entry.id_MappingTbl = dbEntry.getId_MappingTbl();
					featureDetection_Entry.displayLabel = dbEntry.getDisplayLabel();
					featureDetection_Entry.description = dbEntry.getDescription();

					featureDetection_List.add(featureDetection_Entry);
				}
			}
			
			//  Gold Standard
			
			List<WebserviceResult_GoldStandardEntry> goldStandard_List = null;
			{
				GoldStandard_Root_Entries_For_ProjectScanFileId_Searcher_Result goldStandard_Searcher_Result =
						goldStandard_Root_Entries_For_ProjectScanFileId_Searcher.getForProjectScanFileId(webserviceRequest.projectScanFileId);

				List<GoldStandard_Root_Entries_For_ProjectId_ScanFileId_Searcher_Result_Item> dbEntries_GoldStandard = goldStandard_Searcher_Result.getEntries();

				goldStandard_List = new ArrayList<>(  dbEntries_GoldStandard.size() );

				for ( GoldStandard_Root_Entries_For_ProjectId_ScanFileId_Searcher_Result_Item dbEntry : dbEntries_GoldStandard ) {

					WebserviceResult_GoldStandardEntry goldStandard_Entry = new WebserviceResult_GoldStandardEntry();
					goldStandard_Entry.id_MappingTbl = dbEntry.getId_MappingTbl();
					goldStandard_Entry.displayLabel = dbEntry.getDisplayLabel();
					goldStandard_Entry.description = dbEntry.getDescription();

					goldStandard_List.add(goldStandard_Entry);
				}
			}
			
			//  Result Object
			
    		WebserviceResult webserviceResult = new WebserviceResult();
    		webserviceResult.projectSearchIds_ForScanFile_List = projectSearchIds_ForScanFile_List;
    		webserviceResult.featureDetection_List = featureDetection_List;
    		webserviceResult.goldStandard_List = goldStandard_List;

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
    
    //  Request

    public static class WebserviceRequest {
    	
    	private Integer projectScanFileId;

		public void setProjectScanFileId(Integer projectScanFileId) {
			this.projectScanFileId = projectScanFileId;
		}
    }
    
    //  Result
    
    public static class WebserviceResult {
    	
    	private List<Integer> projectSearchIds_ForScanFile_List;
    	private List<WebserviceResult_FeatureDetectionEntry> featureDetection_List;
    	private List<WebserviceResult_GoldStandardEntry> goldStandard_List;
    	
		public List<WebserviceResult_FeatureDetectionEntry> getFeatureDetection_List() {
			return featureDetection_List;
		}
		public List<Integer> getProjectSearchIds_ForScanFile_List() {
			return projectSearchIds_ForScanFile_List;
		}
		public List<WebserviceResult_GoldStandardEntry> getGoldStandard_List() {
			return goldStandard_List;
		}
    }

    public static class WebserviceResult_FeatureDetectionEntry {
    	
    	private int id_MappingTbl;
		private String displayLabel;
		private String description;

		public String getDisplayLabel() {
			return displayLabel;
		}
		public String getDescription() {
			return description;
		}
		public int getId_MappingTbl() {
			return id_MappingTbl;
		}
    }

    public static class WebserviceResult_GoldStandardEntry {
    	
    	private int id_MappingTbl;
		private String displayLabel;
		private String description;

		public String getDisplayLabel() {
			return displayLabel;
		}
		public String getDescription() {
			return description;
		}
		public int getId_MappingTbl() {
			return id_MappingTbl;
		}
    }
}


