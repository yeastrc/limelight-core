package org.yeastrc.limelight.database_cleanup.common.database_connection;

import java.sql.Connection;
import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Used only by DB Cleanup Code in project/subdir limelight__database_cleanup__common_code__remove_data_from_database
 *
 */
public class Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode {


	private static final Logger log = LoggerFactory.getLogger( Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode.class );

	private Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode() { }
	public static Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode getSingletonInstance() { return Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode._singleton_Instance; }
	
	private static Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode _singleton_Instance = new Limelight_DatabaseCleanup__DatabaseConnection_Provider_DBCleanupCode();
	
	///

	private Limelight_DatabaseCleanup__DBConnectionProvider_Provider_IF databaseCleanupOnly_DBConnectionProvider_Provider;

	/**
	 * @param databaseCleanupOnly_DBConnectionProvider_ProviderParam
	 */
	public void setDatabaseCleanupOnly_DBConnectionProvider_Provider_IF( 
			Limelight_DatabaseCleanup__DBConnectionProvider_Provider_IF databaseCleanupOnly_DBConnectionProvider_ProviderParam ) {
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
