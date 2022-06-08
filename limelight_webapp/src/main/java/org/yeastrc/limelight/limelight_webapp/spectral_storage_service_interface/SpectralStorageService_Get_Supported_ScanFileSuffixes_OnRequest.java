package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.constants.LimelightXMLFileUploadWebConstants;
import org.yeastrc.spectral_storage.accept_import_web_app.shared_server_client.webservice_request_response.main.Get_Supported_ScanFilename_Suffixes_Response;
import org.yeastrc.spectral_storage.accept_import_web_app.webservice_connect.main.CallSpectralStorageAcceptImportWebservice;
import org.yeastrc.spectral_storage.accept_import_web_app.webservice_connect.main.CallSpectralStorageAcceptImportWebserviceInitParameters;

/**
 * On Request, Get Spectral Storage Service supported Scan Filename Suffixes - NO RETRIES
 * 
 */
@Component
public class SpectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest implements SpectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest_IF {
	
	private static final Logger log = LoggerFactory.getLogger( SpectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest.class );
	
	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.SpectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest_IF#get_Supported_ScanFileSuffixes()
	 */
	@Override
	public List<String> get_Supported_ScanFileSuffixes() {
		try {
			String spectralStorage_AcceptImport_WebserviceBaseURL = 
					configSystemDAO
					.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_ACCEPT_IMPORT_BASE_URL );

			if ( StringUtils.isEmpty( spectralStorage_AcceptImport_WebserviceBaseURL ) ) {

				//  No Spectral Storage configured so exit

				return null; // EARY RETURN
			}

			CallSpectralStorageAcceptImportWebserviceInitParameters initParameters = new CallSpectralStorageAcceptImportWebserviceInitParameters();

			initParameters.setSpectralStorageServerBaseURL( spectralStorage_AcceptImport_WebserviceBaseURL );

			CallSpectralStorageAcceptImportWebservice callSpectralStorageAcceptImportWebservice = CallSpectralStorageAcceptImportWebservice.getInstance();

			callSpectralStorageAcceptImportWebservice.init(initParameters);;

			Get_Supported_ScanFilename_Suffixes_Response get_Supported_ScanFilename_Suffixes_Response =
					callSpectralStorageAcceptImportWebservice.call_Get_Supported_ScanFilename_Suffixes_Webservice();

			List<String> scanFileSuffixes_Accepted_List = get_Supported_ScanFilename_Suffixes_Response.getScanFilenameSuffixes();

			//  Save off new values to cache
			SpectralStorageService_Cached_ScanFileSuffixes_Accepted.set_ScanFileSuffixes_Accepted_List( scanFileSuffixes_Accepted_List );

			return scanFileSuffixes_Accepted_List;

		} catch ( Throwable t ) {

			List<String> scanFileSuffixes_Accepted_List_InCache = SpectralStorageService_Cached_ScanFileSuffixes_Accepted.get_ScanFileSuffixes_Accepted_List();
			
			if ( scanFileSuffixes_Accepted_List_InCache != null ) {
				
				return scanFileSuffixes_Accepted_List_InCache;  // return values in cache
			}
			
			//  return defaults mzML and mzXML

			List<String> scanFileSuffixes_Accepted_List__Defaults = new ArrayList<String>(2);

			scanFileSuffixes_Accepted_List__Defaults.add( LimelightXMLFileUploadWebConstants.UPLOAD_SCAN_FILE_ALLOWED_SUFFIX__DEFAULT_AND_SPECTR_1_X__MZML );
			scanFileSuffixes_Accepted_List__Defaults.add( LimelightXMLFileUploadWebConstants.UPLOAD_SCAN_FILE_ALLOWED_SUFFIX__DEFAULT_AND_SPECTR_1_X__MZXML );

			return scanFileSuffixes_Accepted_List__Defaults;
		}
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface.SpectralStorageService_Get_Supported_ScanFileSuffixes_OnRequest_IF#get_Supported_ScanFileSuffixes__DEFAULTS()
	 */
	@Override
	public List<String> get_Supported_ScanFileSuffixes__DEFAULTS() {

		//  return defaults mzML and mzXML

		List<String> scanFileSuffixes_Accepted_List__Defaults = new ArrayList<String>(2);

		scanFileSuffixes_Accepted_List__Defaults.add( LimelightXMLFileUploadWebConstants.UPLOAD_SCAN_FILE_ALLOWED_SUFFIX__DEFAULT_AND_SPECTR_1_X__MZML );
		scanFileSuffixes_Accepted_List__Defaults.add( LimelightXMLFileUploadWebConstants.UPLOAD_SCAN_FILE_ALLOWED_SUFFIX__DEFAULT_AND_SPECTR_1_X__MZXML );

		return scanFileSuffixes_Accepted_List__Defaults;
	}
}
