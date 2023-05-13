package org.yeastrc.limelight.db_populate_new_fields__common_code.common.database_connection;

import java.sql.Connection;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Used only by DB Cleanup Code in project/subdir limelight__database_cleanup__common_code__remove_data_from_database
 *
 */
public class Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode {


	private static final Logger log = LoggerFactory.getLogger( Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode.class );

	private Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode() { }
	public static Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode getSingletonInstance() { return Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode._singleton_Instance; }
	
	private static Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode _singleton_Instance = new Limelight_DatabasePopulateNewFields__DatabaseConnection_Provider_DatabasePopulateNewFieldsCode();
	
	///

	private Limelight_DatabasePopulateNewFields__DBConnectionProvider_Provider_IF databaseCleanupOnly_DBConnectionProvider_Provider;

	/**
	 * @param databaseCleanupOnly_DBConnectionProvider_ProviderParam
	 */
	public void setDatabasePopulateNewFields_DBConnectionProvider_Provider_IF( 
			Limelight_DatabasePopulateNewFields__DBConnectionProvider_Provider_IF databaseCleanupOnly_DBConnectionProvider_ProviderParam ) {
		databaseCleanupOnly_DBConnectionProvider_Provider = databaseCleanupOnly_DBConnectionProvider_ProviderParam;
	}

	/**
	 * @return
	 * @throws SQLException 
	 */
	public Connection getConnection() throws SQLException {
		if ( databaseCleanupOnly_DBConnectionProvider_Provider == null ) {
			String msg = "databaseCleanupOnly_DBConnectionProvider_Provider Not Set";
			log.error( msg );
			throw new IllegalStateException( msg );
		}
		return databaseCleanupOnly_DBConnectionProvider_Provider.getConnection();
	}

}
