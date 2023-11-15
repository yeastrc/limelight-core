package org.yeastrc.limelight.limelight_webapp.scan_file_browser_page__utils;

public interface ScanFileBrowserPage__CreateCodeForURL_ForPage_Util_IF {

	/**
	 * @param projectScanFileId
	 * @param scanFileCode_SpectralStorageCode
	 * 
	 * @return String to use for Scan Browser page main code to specify the scan file to browse
	 */
	String createCodeForURL_ForPage(

			int projectScanFileId, String scanFileCode_SpectralStorageCode);

}