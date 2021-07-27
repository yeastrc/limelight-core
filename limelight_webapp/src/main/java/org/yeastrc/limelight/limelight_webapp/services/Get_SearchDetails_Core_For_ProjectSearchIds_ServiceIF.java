package org.yeastrc.limelight.limelight_webapp.services;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_webapp.services.Get_SearchDetails_Core_For_ProjectSearchIds_Service.Get_SearchDetails_Core_For_ProjectSearchIds_Service__PopulatePath;
import org.yeastrc.limelight.limelight_webapp.services.Get_SearchDetails_Core_For_ProjectSearchIds_Service.Get_SearchDetails_Core_For_ProjectSearchIds_Service__Populate_ConverterProgram_CLI_Parameters;
import org.yeastrc.limelight.limelight_webapp.services_result_objects.SearchDetails_Core_Item;

public interface Get_SearchDetails_Core_For_ProjectSearchIds_ServiceIF {

	/**
	 * @param projectSearchIds
	 * @param populatePath
	 * @param populate_ConverterProgram_CLI_Parameters
	 * @return
	 * @throws SQLException
	 */
	List<SearchDetails_Core_Item> get_SearchDetails_Core_For_ProjectSearchIds(
			List<Integer> projectSearchIds, 
			Get_SearchDetails_Core_For_ProjectSearchIds_Service__PopulatePath populatePath,
			Get_SearchDetails_Core_For_ProjectSearchIds_Service__Populate_ConverterProgram_CLI_Parameters populate_ConverterProgram_CLI_Parameters
			)
			throws SQLException;

}