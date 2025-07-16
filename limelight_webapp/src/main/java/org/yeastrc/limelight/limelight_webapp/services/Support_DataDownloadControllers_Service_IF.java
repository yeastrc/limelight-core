package org.yeastrc.limelight.limelight_webapp.services;

import org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.Cache_InMemory_CurrentSizeMaxSizeResult;
import org.yeastrc.limelight.limelight_webapp.services.Support_DataDownloadControllers_Service.DownloadStatus_DataDownloadControllers_Enum;

public interface Support_DataDownloadControllers_Service_IF {

	/**
	 * 
	 * @return
	 * @throws Exception
	 */
	String getNewDownload_Identifier_MarkAs_AboutToSubmit() throws Exception;

	/**
	 * 
	 * @param download_IdentifierString
	 * @param downloadStatus_DataDownloadControllers_Enum
	 * @throws Exception
	 */
	void updateDownload_Identifier_Status(String download_IdentifierString,
			DownloadStatus_DataDownloadControllers_Enum downloadStatus_DataDownloadControllers_Enum) throws Exception;

	/**
	 * 
	 * @param download_IdentifierString
	 * @return
	 * @throws Exception
	 */
	DownloadStatus_DataDownloadControllers_Enum getDownload_Identifier_Status(String download_IdentifierString)
			throws Exception;
	
	/**
	 * 
	 * @param download_IdentifierString
	 * @throws Exception
	 */
	void removeDownload_Identifier( String download_IdentifierString ) throws Exception;

	/**
	 * 
	 * @return
	 * @throws Exception
	 */
	Cache_InMemory_CurrentSizeMaxSizeResult getCurrentCacheSizeAndMax() throws Exception;

	/**
	 * 
	 * @throws Exception
	 */
	void clearCacheData() throws Exception;

}