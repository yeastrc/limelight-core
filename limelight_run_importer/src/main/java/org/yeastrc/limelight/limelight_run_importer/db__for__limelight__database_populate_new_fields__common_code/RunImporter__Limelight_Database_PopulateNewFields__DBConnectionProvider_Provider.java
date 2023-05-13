package org.yeastrc.limelight.limelight_run_importer.db__for__limelight__database_populate_new_fields__common_code;

import java.sql.Connection;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.db_populate_new_fields__common_code.common.database_connection.Limelight_DatabasePopulateNewFields__DBConnectionProvider_Provider_IF;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;

/**
 * 
 *
 */
public class RunImporter__Limelight_Database_PopulateNewFields__DBConnectionProvider_Provider

implements
Limelight_DatabasePopulateNewFields__DBConnectionProvider_Provider_IF  // For code in limelight__db_populate_new_fields__common_code
{

	private static final Logger log = LoggerFactory.getLogger( RunImporter__Limelight_Database_PopulateNewFields__DBConnectionProvider_Provider.class );

	private ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory;
	
	// private constructor
	private RunImporter__Limelight_Database_PopulateNewFields__DBConnectionProvider_Provider(ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory) { 
		
		this.importRunImporterDBConnectionFactory = importRunImporterDBConnectionFactory;
	}
	
	public static RunImporter__Limelight_Database_PopulateNewFields__DBConnectionProvider_Provider getNewInstance(ImportRunImporterDBConnectionFactory importRunImporterDBConnectionFactory) {
		
		RunImporter__Limelight_Database_PopulateNewFields__DBConnectionProvider_Provider instance = new RunImporter__Limelight_Database_PopulateNewFields__DBConnectionProvider_Provider(importRunImporterDBConnectionFactory);

		return instance; 
	}
	
	
	@Override
	public Connection getConnection() throws SQLException {

		return importRunImporterDBConnectionFactory.getConnection();
	}
	
	
}
