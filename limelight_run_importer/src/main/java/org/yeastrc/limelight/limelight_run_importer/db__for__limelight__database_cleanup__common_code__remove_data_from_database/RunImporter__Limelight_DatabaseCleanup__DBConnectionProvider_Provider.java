package org.yeastrc.limelight.limelight_run_importer.db__for__limelight__database_cleanup__common_code__remove_data_from_database;

import java.sql.Connection;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.database_cleanup.common.database_connection.Limelight_DatabaseCleanup__DBConnectionProvider_Provider_IF;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;

public class RunImporter__Limelight_DatabaseCleanup__DBConnectionProvider_Provider

implements
Limelight_DatabaseCleanup__DBConnectionProvider_Provider_IF  // For code in limelight__database_cleanup__common_code__remove_data_from_database
{

	private static final Logger log = LoggerFactory.getLogger( RunImporter__Limelight_DatabaseCleanup__DBConnectionProvider_Provider.class );

	//  Singleton 
	private static final RunImporter__Limelight_DatabaseCleanup__DBConnectionProvider_Provider _INSTANCE = new RunImporter__Limelight_DatabaseCleanup__DBConnectionProvider_Provider();
	
	// private constructor
	private RunImporter__Limelight_DatabaseCleanup__DBConnectionProvider_Provider() { }
	
	public static RunImporter__Limelight_DatabaseCleanup__DBConnectionProvider_Provider getSingletonInstance() { return _INSTANCE; }
	
	
	@Override
	public Connection getConnection() throws SQLException {

		return ImportRunImporterDBConnectionFactory.getInstance().getConnection();
	}
	
	
}
