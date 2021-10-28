package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.Collection;
import java.util.List;

import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;

public interface SearchScanFile_For_SearchIds_Searcher_IF {

	List<SearchScanFileDTO> getSearchScanFile_For_SearchIds(Collection<Integer> searchIds) throws SQLException;

}