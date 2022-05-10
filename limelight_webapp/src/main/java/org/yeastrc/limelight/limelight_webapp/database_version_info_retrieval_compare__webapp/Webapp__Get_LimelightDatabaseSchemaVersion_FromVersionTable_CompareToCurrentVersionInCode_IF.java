package org.yeastrc.limelight.limelight_webapp.database_version_info_retrieval_compare__webapp;

import org.yeastrc.limelight.limelight_webapp.database_version_info_retrieval_compare__webapp.Webapp__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode.LimelightDatabaseSchemaVersion_Comparison_Result;

public interface Webapp__Get_LimelightDatabaseSchemaVersion_FromVersionTable_CompareToCurrentVersionInCode_IF {

	/**
	 * For CURRENT Version of Schema Version in table for row with label: DATABASE_VERSION_TABLE__ROW_LABEL__CURRENT_VERSION
	 * 
	 * @throws Exception
	 */
	LimelightDatabaseSchemaVersion_Comparison_Result getLimelightDatabase_CURRENT_SchemaVersion_Comparison_Result()
			throws Exception;

	/**
	 * For Update In Progress Version of Schema Version in table for row with label: DATABASE_VERSION_TABLE__ROW_LABEL__IN_PROGRESS
	 * 
	 * @throws Exception
	 */
	LimelightDatabaseSchemaVersion_Comparison_Result getLimelightDatabase_UpdateInProgress_SchemaVersion_Comparison_Result()
			throws Exception;

}