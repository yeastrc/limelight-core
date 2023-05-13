package org.yeastrc.limelight.db_populate_new_fields__common_code.common.database_connection;

import java.sql.Connection;
import java.sql.SQLException;

/**
 * 
 *
 */
public interface Limelight_DatabasePopulateNewFields__DBConnectionProvider_Provider_IF {


	public Connection getConnection() throws SQLException;
}
