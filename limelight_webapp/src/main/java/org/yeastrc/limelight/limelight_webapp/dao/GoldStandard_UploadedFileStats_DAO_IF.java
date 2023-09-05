package org.yeastrc.limelight.limelight_webapp.dao;

import org.yeastrc.limelight.limelight_shared.dto.GoldStandard_UploadedFileStats_DTO;

public interface GoldStandard_UploadedFileStats_DAO_IF {

	/**
	 * @param item
	 */

	void save(GoldStandard_UploadedFileStats_DTO item);

//	void set_uploaded_file_sha1_sum_sha384_sum(String uploaded_file_sha1_sum,
//			String uploaded_file_sha384_zero_in_second_digit, int id);
//
//	/**
//	 * @param id
//	 * @param userId
//	 */
//
//	void set_True_EntryFullyInserted(int id, int userId);

}