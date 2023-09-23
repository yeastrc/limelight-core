package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.single_project_search_id;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher.ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher.ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_ResultItem;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.Gzip_ByteArray_To_ByteArray_IF;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * Get Scan File Data: ALL ProjectScanFileId AND SearchScanFileId Pairs for Project Search Id
 *
 */
@RestController
public class ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_For_ProjectSearchId_RestWebserviceController {

    private static final Logger log = LoggerFactory.getLogger( ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_For_ProjectSearchId_RestWebserviceController.class );

    @Autowired
    private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

    @Autowired
    private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private Gzip_ByteArray_To_ByteArray_IF gzip_ByteArray_To_ByteArray;
	
	@Autowired
	private RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF restControllerUtils__Request_Accept_GZip_Response_Set_GZip;
	
    @Autowired
    private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
        
    @Autowired
    private ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_IF projectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher;
    
    @Autowired
    private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

    @Autowired
    private MarshalObjectToJSON marshalObjectToJSON;

    public ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_For_ProjectSearchId_RestWebserviceController() {
        super();
    }

    @PostMapping(
            path = {
                    AA_RestWSControllerPaths_Constants.PATH_START_ALL
                            + AA_RestWSControllerPaths_Constants.SCANFILE_PROJECTSCANFILEID_SEARCHSCANFILEID_ALL_FORSEARCH_FOR_PROJECTSEARCHID
            },
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

    public @ResponseBody
    ResponseEntity<byte[]> webserviceMethod(

            @RequestBody byte[] postBody,
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse
    ) throws Exception {
        try {

            //  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception
            //    to return specific error to web app JS code if webserviceSyncTracking is not current value
            validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

            //  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

            if ( postBody == null || postBody.length == 0 ) {
                log.warn( "No Post Body" );
                throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
            }

            WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

            Integer projectSearchId = webserviceRequest.projectSearchId;

            if ( projectSearchId == null ) {
                log.warn( "No Project Search Ids" );
                throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
            }

            List<Integer> projectSearchIdsForValidate = new ArrayList<>( 1 );
            projectSearchIdsForValidate.add( projectSearchId );
            validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.validatePublicAccessCodeReadAllowed( projectSearchIdsForValidate, httpServletRequest );

            Integer searchId = searchIdForProjectSearchIdSearcher.getSearchListForProjectId( projectSearchId );
            if ( searchId == null ) {
                String msg = "No searchId for projectSearchId: " + projectSearchId;
                log.warn( msg );
                throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
            }
            
        	ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_Result result = 
        			projectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher.get_ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId(projectSearchId);

        	List<WebsserviceResult_SingleEntry> entries_Result = new ArrayList<>( result.getResultItemList().size() );

        	for ( ProjectScanFileId_SearchScanFileIds_Mapping_AND_ProjectScanFileId_For_ProjectSearchId_Searcher_ResultItem resultItem : result.getResultItemList() ) {


        		WebsserviceResult_SingleEntry websserviceResult_SingleEntry = new WebsserviceResult_SingleEntry();
        		entries_Result.add(websserviceResult_SingleEntry);

        		websserviceResult_SingleEntry.searchScanFileId = resultItem.getSearch_scan_file_id();
        		websserviceResult_SingleEntry.projectScanFileId = resultItem.getProject_scan_file_id();
        	}

            WebserviceResult webserviceResult = new WebserviceResult();
            webserviceResult.entries = entries_Result;

            byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

    		
    		byte[] responseAsJSON_GZIPPED = gzip_ByteArray_To_ByteArray.gzip_ByteArray_To_ByteArray(responseAsJSON);
    		

			boolean accept_GZIP = restControllerUtils__Request_Accept_GZip_Response_Set_GZip.does_HttpServletRequest_Accept_GZip( httpServletRequest );
			
    		
    		byte[] responseAsJSON_FINAL = responseAsJSON;
    		

			if ( accept_GZIP ) {
				restControllerUtils__Request_Accept_GZip_Response_Set_GZip.set_GZIP_On_HttpServletResponse( httpServletResponse );
				
				responseAsJSON_FINAL = responseAsJSON_GZIPPED;
			}
			
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON_FINAL );

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
     *
     */
    public static class WebserviceRequest {
        Integer projectSearchId;

        public void setProjectSearchId(Integer projectSearchId) {
            this.projectSearchId = projectSearchId;
        }
    }

    /**
    *
    */
    public static class WebserviceResult {

    	List<WebsserviceResult_SingleEntry> entries;

		public List<WebsserviceResult_SingleEntry> getEntries() {
			return entries;
		}
    }

    /**
    *
    */
    public static class WebsserviceResult_SingleEntry {
    	
    	private int searchScanFileId;
    	private int projectScanFileId;
    	
		public int getSearchScanFileId() {
			return searchScanFileId;
		}
		public int getProjectScanFileId() {
			return projectScanFileId;
		}
    	
    }
    

}
