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
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_page_controller.GetWebSessionAuthAccessLevelForProjectIds.GetWebSessionAuthAccessLevelForProjectIds_Result;
import org.yeastrc.limelight.limelight_webapp.access_control.result_objects.WebSessionAuthAccessLevel;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_AuthError_Unauthorized_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.Call_Get_ScanPeakIntensityBinnedOn_RT_MZ_WebserviceIF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.GUNzip_ByteArray_To_ByteArray_IF;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * Get Scan File Summary Data From Spectral Storage System (Spectr) for Project Scan File Data Id
 *
 */
@RestController
public class ScanFile_PeakIntensityBinnedOn_RT_MZ_JSON__From_SpectralStorageSystem_For_ProjectScanFileId_RestWebserviceController {

    private static final Logger log = LoggerFactory.getLogger( ScanFile_PeakIntensityBinnedOn_RT_MZ_JSON__From_SpectralStorageSystem_For_ProjectScanFileId_RestWebserviceController.class );

    @Autowired
    private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private GetWebSessionAuthAccessLevelForProjectIdsIF getWebSessionAuthAccessLevelForProjectIds;

	@Autowired
	private ProjectScanFileDAO_IF projectScanFileDAO;

	@Autowired
	private ScanFileDAO_IF scanFileDAO;

    @Autowired
    private Call_Get_ScanPeakIntensityBinnedOn_RT_MZ_WebserviceIF call_Get_ScanPeakIntensityBinnedOn_RT_MZ_Webservice;

	@Autowired
	private RestControllerUtils__Request_Accept_GZip_Response_Set_GZip_IF restControllerUtils__Request_Accept_GZip_Response_Set_GZip;
	
	@Autowired
	private GUNzip_ByteArray_To_ByteArray_IF gUNzip_ByteArray_To_ByteArray;
	
    @Autowired
    private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

    public ScanFile_PeakIntensityBinnedOn_RT_MZ_JSON__From_SpectralStorageSystem_For_ProjectScanFileId_RestWebserviceController() {
        super();
    }

    @PostMapping(
            path = {
                    AA_RestWSControllerPaths_Constants.PATH_START_ALL
                            + AA_RestWSControllerPaths_Constants.SCAN_FILE_PEAK_INTENSITY_BINNED_ON_RT_MZ_JSON_FROM_SPECTRAL_STORAGE_DATA__SEARCH_SCAN_FILE_ID_SINGLE_PROJECT_SEARCH_ID
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

            Integer projectScanFileId = webserviceRequest.projectScanFileId;

            if ( projectScanFileId == null ) {
                log.warn( "No projectScanFileId" );
                throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
            }

    		Project_ScanFile_DTO project_ScanFile_DTO = projectScanFileDAO.getById( projectScanFileId.intValue() );
     		if ( project_ScanFile_DTO == null ) {
    			log.warn( "projectScanFileId NOT in DB: projectScanFileId: " + projectScanFileId );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		////////////////
    		
    		//  AUTH - validate access
    		
    		//  throws an exception if access is not valid that is turned into a webservice response by Spring

			List<Integer> projectIds = new ArrayList<>( 1 );
			projectIds.add( project_ScanFile_DTO.getProjectId() );


			GetWebSessionAuthAccessLevelForProjectIds_Result getWebSessionAuthAccessLevelForProjectIds_Result =
					getWebSessionAuthAccessLevelForProjectIds.getAuthAccessLevelForProjectIds( projectIds, httpServletRequest );

			WebSessionAuthAccessLevel webSessionAuthAccessLevel = getWebSessionAuthAccessLevelForProjectIds_Result.getWebSessionAuthAccessLevel();

			if ( getWebSessionAuthAccessLevelForProjectIds_Result.isNoSession()
					&& ( ! webSessionAuthAccessLevel.isPublicAccessCodeReadAllowed() )) {
				
				//  No User session and not public project
				throw new Limelight_WS_AuthError_Unauthorized_Exception();
			}
			    		
    		String scanFileAPIKey = scanFileDAO.getSpectralStorageAPIKeyById( project_ScanFile_DTO.getScanFileId() );
    		if ( StringUtils.isEmpty( scanFileAPIKey ) ) {
				String msg = "No value for scanFileAPIKey for scan file id: " 
						+ project_ScanFile_DTO.getScanFileId() 
						+ ", webserviceRequest.projectScanFileId: " + webserviceRequest.projectScanFileId;
				log.error( msg );
				throw new LimelightInternalErrorException( msg );
			}

            byte[] dataGzipped =
            		call_Get_ScanPeakIntensityBinnedOn_RT_MZ_Webservice.getScanPeakIntensityBinnedOn_RT_MZ_Bytes_GZIPed__FromSpectralStorageService(scanFileAPIKey);
            
            byte[] responseBodyBytes_Final = dataGzipped;

			boolean accept_GZIP = restControllerUtils__Request_Accept_GZip_Response_Set_GZip.does_HttpServletRequest_Accept_GZip( httpServletRequest );
			
			if ( accept_GZIP ) {
				
				restControllerUtils__Request_Accept_GZip_Response_Set_GZip.set_GZIP_On_HttpServletResponse( httpServletResponse );
			} else {
			
				// NOT accept_GZIP so Unzip to return 

				responseBodyBytes_Final = gUNzip_ByteArray_To_ByteArray.gUNzip_ByteArray_To_ByteArray(dataGzipped);
			}
            
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseBodyBytes_Final );

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
    	
        Integer projectScanFileId;

		public void setProjectScanFileId(Integer projectScanFileId) {
			this.projectScanFileId = projectScanFileId;
		}
    }

}
