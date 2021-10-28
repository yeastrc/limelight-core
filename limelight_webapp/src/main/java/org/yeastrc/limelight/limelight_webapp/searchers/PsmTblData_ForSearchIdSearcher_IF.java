package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.PsmTblData_ForSearchIdSearcher.PsmTblData_ForSearchIdSearcher_ResultEntry;

public interface PsmTblData_ForSearchIdSearcher_IF {

	List<PsmTblData_ForSearchIdSearcher_ResultEntry> getPsmTblData_ForSearchId(

			int searchId) throws SQLException;

}