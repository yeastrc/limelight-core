package org.yeastrc.limelight.limelight_webapp.scan_file_browser_page__utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * 
 *
 */
@Component
public class ScanFileBrowserPage__CreateCodeForURL_ForPage_Util implements ScanFileBrowserPage__CreateCodeForURL_ForPage_Util_IF {

	private static final Logger log = LoggerFactory.getLogger( ScanFileBrowserPage__CreateCodeForURL_ForPage_Util.class );
	
	private static final String PATH_CODE_VERSION = "a";
	
	private static final String PATH_CODE_PREFIX = "c/"; // identify is is path code
	
	private static final int ID_NUMBER_TO_ENCODED_STRING_RADIX = 35;
	
	/**
	 * @param projectScanFileId
	 * @param scanFileCode_SpectralStorageCode
	 * 
	 * @return String to use for Scan Browser page main code to specify the scan file to browse
	 */
	@Override
	public String createCodeForURL_ForPage(
			
			int projectScanFileId,
			String scanFileCode_SpectralStorageCode
			) {
		
		if ( scanFileCode_SpectralStorageCode.length() < 6 ) {
			String msg = "Unexpected that scanFileCode_SpectralStorageCode is < 6 characters";
			log.error(msg);
			throw new LimelightInternalErrorException(msg);
		}
		
		String scanFileCode_SpectralStorageCode_FirstSix = scanFileCode_SpectralStorageCode.substring(0, 6);
		
		String projectScanFileId_EncodedWithRadix = Integer.toString( projectScanFileId, ID_NUMBER_TO_ENCODED_STRING_RADIX );

        String pathCode =
        		PATH_CODE_PREFIX +
        		PATH_CODE_VERSION +
        		scanFileCode_SpectralStorageCode_FirstSix +
        		projectScanFileId_EncodedWithRadix;
        
        return pathCode;

	}
}
