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
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchScanFile_For_SearchIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * Get Search Scan File Data entries for Project Search Id
 *
 */
@RestController
public class SearchScanFileData_For_ProjectSearchId_RestWebserviceController {

    private static final Logger log = LoggerFactory.getLogger( SearchScanFileData_For_ProjectSearchId_RestWebserviceController.class );

    @Autowired
    private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

    @Autowired
    private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

    @Autowired
    private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
    
    @Autowired
    private SearchScanFile_For_SearchIds_Searcher_IF searchScanFile_For_SearchIds_Searcher;
    
    @Autowired
    private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

    @Autowired
    private MarshalObjectToJSON marshalObjectToJSON;

    public SearchScanFileData_For_ProjectSearchId_RestWebserviceController() {
        super();
    }

    @PostMapping(
            path = {
                    AA_RestWSControllerPaths_Constants.PATH_START_ALL
                            + AA_RestWSControllerPaths_Constants.GET_SEARCH_SCAN_FILE_DATA_FOR_PROJECT_SEARCH_ID_REST_WEBSERVICE_CONTROLLER
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

            Integer projectSearchId = webserviceRequest.getProjectSearchId();

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
            
            List<Integer> searchIds = new ArrayList<>( 1 );
            searchIds.add(searchId);
            
            List<SearchScanFileDTO> searchScanFileDTOList = searchScanFile_For_SearchIds_Searcher.getSearchScanFile_For_SearchIds(searchIds);
            
            List<WebsserviceResult_SingleScanFilename> scanFilenameEntries = new ArrayList<>( searchScanFileDTOList.size() );

            for( SearchScanFileDTO searchScanFileDTO : searchScanFileDTOList ) {
            	
                WebsserviceResult_SingleScanFilename websserviceResult_SingleScanFilename = new WebsserviceResult_SingleScanFilename();
                scanFilenameEntries.add(websserviceResult_SingleScanFilename);
                
                websserviceResult_SingleScanFilename.searchScanFileId = searchScanFileDTO.getId();
                websserviceResult_SingleScanFilename.searchId = searchScanFileDTO.getSearchId();
                websserviceResult_SingleScanFilename.filename = searchScanFileDTO.getFilename();
                websserviceResult_SingleScanFilename.scanFileId = searchScanFileDTO.getScanFileId();
                
            }

            WebserviceResult webserviceResult = new WebserviceResult();
            webserviceResult.scanFilenameEntries= scanFilenameEntries;

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
     *
     */
    public static class WebserviceRequest {
        Integer projectSearchId;

        public Integer getProjectSearchId() {
            return projectSearchId;
        }
        public void setProjectSearchId(Integer projectSearchId) {
            this.projectSearchId = projectSearchId;
        }
    }

    /**
    *
    */
    public static class WebserviceResult {

    	List<WebsserviceResult_SingleScanFilename> scanFilenameEntries;

		public List<WebsserviceResult_SingleScanFilename> getScanFilenameEntries() {
			return scanFilenameEntries;
		}

    }

    /**
    *
    */
    public static class WebsserviceResult_SingleScanFilename {
    	
    	private int searchScanFileId;	
    	private int searchId;

    	private String filename;

    	private Integer scanFileId;

		public int getSearchScanFileId() {
			return searchScanFileId;
		}

		public int getSearchId() {
			return searchId;
		}

		public String getFilename() {
			return filename;
		}

		public Integer getScanFileId() {
			return scanFileId;
		}
    }

}
