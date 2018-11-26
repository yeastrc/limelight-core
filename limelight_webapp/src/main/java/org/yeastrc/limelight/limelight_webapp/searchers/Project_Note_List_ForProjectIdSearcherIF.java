package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.searchers_results.Project_Note_List_ForProjectId_Item;

public interface Project_Note_List_ForProjectIdSearcherIF {

	List<Project_Note_List_ForProjectId_Item> getNoteListForProjectId(int projectId) throws SQLException;

}