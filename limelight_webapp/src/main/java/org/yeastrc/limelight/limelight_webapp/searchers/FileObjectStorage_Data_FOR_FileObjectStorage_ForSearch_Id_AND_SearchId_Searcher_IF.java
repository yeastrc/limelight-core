package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.FileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId_Searcher.FileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId_Searcher_Return_Item;

public interface FileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId_Searcher_IF {

	/**
	 * @param fileObjectStorage_ForSearch_Id
	 * @param searchId
	 * @return
	 * @throws SQLException
	 */
	List<FileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId_Searcher_Return_Item>

			getFileObjectStorage_Data_FOR_FileObjectStorage_ForSearch_Id_AND_SearchId(

					int fileObjectStorage_ForSearch_Id, int searchId) throws SQLException;

}