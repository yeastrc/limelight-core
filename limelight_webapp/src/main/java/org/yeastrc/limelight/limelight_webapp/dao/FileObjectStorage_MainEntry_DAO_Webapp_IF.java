package org.yeastrc.limelight.limelight_webapp.dao;

import org.yeastrc.limelight.limelight_shared.dto.FileObjectStorage_MainEntry_DTO;
import org.yeastrc.limelight.limelight_webapp.dao.FileObjectStorage_MainEntry_DAO_Webapp.SkipLogInsertException;

public interface FileObjectStorage_MainEntry_DAO_Webapp_IF {

	/**
	 * @param id
	 * @throws Exception
	 */
	FileObjectStorage_MainEntry_DTO getForId(int id) throws Exception;

	/**
	 * Get the id for the supplied file_type_id AND file_object_storage_api_key from the database. 
	 * @param fileTypeId 
	 * @param file_object_storage_api_key
	 * @return null if not found
	 * @throws Exception
	 */
	Integer get_Id_For_FileTypeId_AND_FileObjectStorageStorageAPIKey(int fileTypeId, String file_object_storage_api_key) throws Exception;

	/**
	 * @param item
	 * @throws Exception
	 */
	void saveToDatabase(FileObjectStorage_MainEntry_DTO item, SkipLogInsertException skipLogInsertException)
			throws Exception;

}