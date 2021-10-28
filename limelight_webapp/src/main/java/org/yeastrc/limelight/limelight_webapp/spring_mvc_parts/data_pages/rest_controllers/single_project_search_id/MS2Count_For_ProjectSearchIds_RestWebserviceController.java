package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.single_project_search_id;

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
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchIdForProjectSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SpectralStorageAPIKeyForSearchId_SearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SpectralStorageAPIKeyForSearchId_Searcher.SpectralStorageAPIKeyForSearchId_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.SpectralStorageAPIKeyForSearchId_Searcher.SpectralStorageAPIKeyForSearchId_Searcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_MS2CountFromAPIKey_SpectralStorageWebserviceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@RestController
public class MS2Count_For_ProjectSearchIds_RestWebserviceController {

    private static final Logger log = LoggerFactory.getLogger( MS2Count_For_ProjectSearchIds_RestWebserviceController.class );

    @Autowired
    private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

    @Autowired
    private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

    @Autowired
    private SearchIdForProjectSearchIdSearcherIF searchIdForProjectSearchIdSearcher;
    
    @Autowired
    private SpectralStorageAPIKeyForSearchId_SearcherIF spectralStorageAPIKeyForSearchId_Searcher;
    
    @Autowired
    private Call_Get_MS2CountFromAPIKey_SpectralStorageWebserviceIF call_Get_MS2CountFromAPIKey_SpectralStorageWebservice;

    @Autowired
    private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

    @Autowired
    private MarshalObjectToJSON marshalObjectToJSON;

    public MS2Count_For_ProjectSearchIds_RestWebserviceController() {
        super();
    }

    @PostMapping(
            path = {
                    AA_RestWSControllerPaths_Constants.PATH_START_ALL
                            + AA_RestWSControllerPaths_Constants.MS2_COUNT_SINGLE_PROJECT_SEARCH_ID
            },
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

    public @ResponseBody
    ResponseEntity<byte[]> webserviceMethod(

            @RequestBody byte[] postBody,
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse
    ) throws Exception {

        int ms2Count = 0;
        boolean searchHasScanData = false;
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

            SpectralStorageAPIKeyForSearchId_Searcher_Result spectralStorageAPIKeyForSearchId_Searcher_Result = spectralStorageAPIKeyForSearchId_Searcher.get_SearchScanFileId_SpectralStorageAPIKey_Entries_ForSearchId( searchId );
            for( SpectralStorageAPIKeyForSearchId_Searcher_Result_Item resultItem: spectralStorageAPIKeyForSearchId_Searcher_Result.getResultItems() ) {
            	String scanFileAPIKey = resultItem.getSpectralStorageAPIKey();
                if ( StringUtils.isEmpty( scanFileAPIKey ) ) {
                    String msg = "Got empty scanFileAPIKey for search id: " + searchId;
                    log.error( msg );
                    throw new LimelightInternalErrorException( msg );
                }
                searchHasScanData = true;
                ms2Count += call_Get_MS2CountFromAPIKey_SpectralStorageWebservice.getMS2CountFromAPIKey(scanFileAPIKey);
            }

        } catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {

            //  only rethrow Error Response Exceptions
            throw e;

        } catch ( Exception e ) {
            String msg = "Failed in controller: ";
            log.error( msg, e );
            throw new Limelight_WS_InternalServerError_Exception();
        }

        WebserviceResult webserviceResult = new WebserviceResult(ms2Count, searchHasScanData);

        byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );
    }

    /**
     *
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

    public static class WebserviceResult {
        Integer ms2Count;
        Boolean searchHasScanData;

        public Integer getMs2Count() {
            return ms2Count;
        }

        public Boolean getSearchHasScanData() {
            return searchHasScanData;
        }

        public WebserviceResult(Integer ms2Count, Boolean searchHasScanData) {
            this.ms2Count = ms2Count;
            this.searchHasScanData = searchHasScanData;
        }
    }


}
