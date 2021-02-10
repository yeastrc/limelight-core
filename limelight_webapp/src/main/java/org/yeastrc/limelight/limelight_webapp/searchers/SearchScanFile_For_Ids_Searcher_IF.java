package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.Collection;
import java.util.List;

import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;

public interface SearchScanFile_For_Ids_Searcher_IF {

	/**
	 * @param ids
	 * @return 
	 * @throws SQLException
	 */
	List<SearchScanFileDTO> getSearchScanFile_For_Ids(Collection<Integer> ids) throws SQLException;

}