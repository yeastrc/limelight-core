package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers.Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher.Retrieve_Path;
import org.yeastrc.limelight.limelight_webapp.searchers_results.Search__SearchDetailsDisplay_Item;

public interface Search__SearchDetailsDisplay_ForProjectSearchIdsSearcherIF {

	/**
	 * @param projectSearchIds
	 * @param retrieve_Path TODO
	 * @return
	 * @throws SQLException
	 */
	List<Search__SearchDetailsDisplay_Item>  getSearch_SearchDetailsDisplay_ListForProjectSearchIds( List<Integer> projectSearchIds, Retrieve_Path retrieve_Path ) throws SQLException;

}