package org.yeastrc.limelight.database_cleanup.common.database_connection;

import java.sql.Connection;
import java.sql.SQLException;

/**
 * 
 *
 */
public interface Limelight_DatabaseCleanup__DBConnectionProvider_Provider_IF {


	public Connection getConnection() throws SQLException;
}
