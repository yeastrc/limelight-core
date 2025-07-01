package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.SearchLevel_Annotation_MinMax_ForSearchId_Searcher.SearchLevel_Annotation_MinMax_ForSearchId_Searcher_Result;

public interface SearchLevel_Annotation_MinMax_ForSearchId_Searcher_IF {

	List<SearchLevel_Annotation_MinMax_ForSearchId_Searcher_Result> get_SearchLevel_Annotation_MinMax_ForSearchId(
			int searchId) throws SQLException;

}