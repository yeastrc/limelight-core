package org.yeastrc.limelight.limelight_webapp.dao;

import java.util.List;

public interface ProjectSearch_TagMapping_DAO_IF {

	//  Spring DB Transactions
	void save(int project_search_id, int project_search_tag_strings_in_project_id);

	/**
	 * @param project_search_id_List
	 * @param project_search_tag_strings_in_project_id_List
	 */
	void delete_For_project_search_id_List__project_search_tag_strings_in_project_id_List(List<Integer>  project_search_id_List, List<Integer> project_search_tag_strings_in_project_id_List);

}