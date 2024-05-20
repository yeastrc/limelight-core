package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher.FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher_Return_Item;

public interface FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher_IF {

	/**
	 * @param projectScanFile_Id
	 * @return
	 * @throws SQLException
	 */
	List<FileObjectStorage_Data_FOR_ProjectScanFileId_Searcher_Return_Item>

			getFileObjectStorage_Data_FOR_ProjectScanFile_Id(

					int projectScanFile_Id) throws SQLException;

}