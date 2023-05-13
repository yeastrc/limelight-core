package org.yeastrc.limelight.limelight_importer_runimporter_shared.db;

import java.sql.Connection;
import java.sql.SQLException;

import org.apache.commons.dbcp2.BasicDataSource;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.exceptions.LimelightImporterRunImporterConfigurationException;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.exceptions.LimelightImporterRunImporterDBInternalException;
import org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider_Provider_IF;


/**
 * Singleton 
 *
 */
public class ImportRunImporterDBConnectionFactory implements SharedCodeOnly_DBConnectionProvider_Provider_IF {

	private static final Logger log = LoggerFactory.getLogger( ImportRunImporterDBConnectionFactory.class );
	
	private static final int MAX_TOTAL_DB_CONNECTIONS = 3;
	
	private static final String DEFAULT_DATABASE_NAME = "limelight";
	
	private static final String DATABASE_DRIVER_CLASS = "com.mysql.jdbc.Driver";
	
	private static final String _DEFAULT_PORT = "3306";
	
	private static final int COMMIT_AFTER_500_INSERTS = 500;
	
	/**
	 * Internal to this class
	 *
	 */
	private enum WhichConnectionPool { MAIN, BULK_INSERTS }
	
	
	//  Singleton 
	private static final ImportRunImporterDBConnectionFactory _INSTANCE = new ImportRunImporterDBConnectionFactory();
	
	// private constructor
	private ImportRunImporterDBConnectionFactory() { }
	
	public static ImportRunImporterDBConnectionFactory getMainSingletonInstance() { return _INSTANCE; }

	/**
	 * 
	 * 
	 * @return a new instance - User in Run Importer in other than Process Import Thread
	 */
	public static ImportRunImporterDBConnectionFactory get_New_Instance() { return new ImportRunImporterDBConnectionFactory(); }
	
	
	//  Instance properties
	
	private boolean initialized = false;
	
	private String databaseName = DEFAULT_DATABASE_NAME;
	
	private BasicDataSource _dataSourceMain = null;
	private BasicDataSource _dataSourceBatchInserts = null;
	
	private Connection _insertControlCommitConnection = null;
	
	private int _insertControlCommitConnectionGetCount = 0;
	
	private IDBConnectionParametersProvider dbConnectionParametersProvider = null;
	
	private boolean databaseConnectionTestOnBorrow = false;
	
	private int maxDBConnections = MAX_TOTAL_DB_CONNECTIONS;
	
	private boolean insertControlCommitConnection_Do_NOT_Disable_AutoCommit = false;
	
	/**
	 * 
	 */
	public void setInsertControlCommitConnection_Do_NOT_Disable_AutoCommit() {
		
		insertControlCommitConnection_Do_NOT_Disable_AutoCommit = true;
	}
	
	/**
	 * Allow setting a value for dbConnectionParametersProvider
	 * 
	 * @param dbConnectionParametersProvider
	 * @throws Exception 
	 */
	public void initialize( IDBConnectionParametersProvider dbConnectionParametersProviderParam ) throws Exception {

		if ( dbConnectionParametersProviderParam != null ) {
			this.dbConnectionParametersProvider = dbConnectionParametersProviderParam;

			String limelightDbName_Param = dbConnectionParametersProvider.getLimelightDbName();

			if ( StringUtils.isNotEmpty( limelightDbName_Param ) ) {

				if ( log.isInfoEnabled() ) {

					System.out.println( "Limelight DB Name from Connection Provider: " + limelightDbName_Param );
					log.info( "Limelight DB Name from Connection Provider: " + limelightDbName_Param );
				}

				databaseName = limelightDbName_Param;
			}
		}
		
		if ( dbConnectionParametersProvider == null ) {
			
			dbConnectionParametersProvider = new DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables();
			
			dbConnectionParametersProvider.init();

			if ( StringUtils.isNotEmpty( dbConnectionParametersProvider.getLimelightDbName() ) ) {
				if ( log.isInfoEnabled() ) {
					System.out.println( "Limelight DB Name from Connection Provider: " + dbConnectionParametersProvider.getLimelightDbName() );
					log.info( "Limelight DB Name from Connection Provider: " + dbConnectionParametersProvider.getLimelightDbName() );
				}
			}
		}

		String username = dbConnectionParametersProvider.getUsername(); 
		String password = dbConnectionParametersProvider.getPassword();
		String dbURL = dbConnectionParametersProvider.getDBURL();
		String dbPort = dbConnectionParametersProvider.getDBPort();

		if ( StringUtils.isEmpty( username ) ) {
			String msg = "No provided DB username or DB username is empty string.";
			log.error( msg );
			throw new LimelightImporterRunImporterConfigurationException(msg);
		} else {
			if ( log.isDebugEnabled() ) {
				log.debug( "DB Connection:  username: " + username );
			}
		}
		if ( StringUtils.isEmpty( password ) ) {
			String msg = "No provided DB password or DB password is empty string.";
			log.error( msg );
			throw new LimelightImporterRunImporterConfigurationException(msg);
		} else {
			if ( log.isDebugEnabled() ) {
				log.debug( "DB Connection:  password: is populated" );
			}
		}

		if ( StringUtils.isEmpty( dbURL ) ) {
			String msg = "No provided DB URL or DB URL is empty string.";
			log.error( msg );
			throw new LimelightImporterRunImporterConfigurationException(msg);
		} else {
			if ( log.isDebugEnabled() ) {
				log.debug( "DB Connection:  dbURL: " + dbURL);
			}
		}

		if ( StringUtils.isEmpty( dbPort ) ) {
			dbPort = _DEFAULT_PORT;  // set to default port
			
			if ( log.isDebugEnabled() ) {
				log.debug( "DB Connection:  dbPort set to default: " + dbPort);
			}
		} else {
			if ( log.isDebugEnabled() ) {
				log.debug( "DB Connection:  dbPort: " + dbPort);
			}
		}

		if( _dataSourceMain == null && _dataSourceBatchInserts == null ) {
			Class.forName( DATABASE_DRIVER_CLASS );
		}
		
		initialized = true;
	}
	
	/**
	 * @return
	 * @throws Exception
	 */
	synchronized public Connection getInsertControlCommitConnection() throws Exception {
		
		if ( ! initialized ) {
			String msg = "Not Initialized: In getInsertControlCommitConnection(): ";
			log.error( msg );
			throw new IllegalStateException(msg);
		}
		
		if ( _insertControlCommitConnection == null ) {
			
			_insertControlCommitConnection = getConnectionInternal( WhichConnectionPool.BULK_INSERTS );
			
			if ( ! insertControlCommitConnection_Do_NOT_Disable_AutoCommit ) {
			
				_insertControlCommitConnection.setAutoCommit(false);
			}

			_insertControlCommitConnectionGetCount = 0;
		}
		
		_insertControlCommitConnectionGetCount++;
		
		if ( _insertControlCommitConnectionGetCount > COMMIT_AFTER_500_INSERTS 
				|| insertControlCommitConnection_Do_NOT_Disable_AutoCommit ) {
			
			if ( ! insertControlCommitConnection_Do_NOT_Disable_AutoCommit ) {
			
				_insertControlCommitConnection.commit();
			}
			
			_insertControlCommitConnectionGetCount = 0;
		}
		
		return _insertControlCommitConnection;
	}
	
	
	
	/**
	 * call commit() on the insert connection and return the connection to the pool 
	 * @throws Exception
	 */
	synchronized public void commitInsertControlCommitConnection() throws Exception {

		if ( ! initialized ) {
			String msg = "Not Initialized: In getInsertControlCommitConnection(): ";
			log.error( msg );
			throw new IllegalStateException(msg);
		}
		
		if ( _insertControlCommitConnection == null ) {
			
			return;
		}
		
		if ( ! insertControlCommitConnection_Do_NOT_Disable_AutoCommit ) {

			_insertControlCommitConnection.commit();
		}
		
		_insertControlCommitConnection.close(); // Return connection to pool
		
		_insertControlCommitConnection = null;
	}
	

	/**
	 * get a connection to the database
	 * @return
	 * @throws Exception
	 */
	synchronized public Connection getConnection() throws SQLException {
		
		if ( ! initialized ) {
			String msg = "Not Initialized: In getConnection(): ";
			log.error( msg );
			throw new IllegalStateException(msg);
		}
		
		return getConnectionInternal( WhichConnectionPool.MAIN );
	}
	


	// get a connection to the requested database
	
	private Connection getConnectionInternal( WhichConnectionPool whichConnectionPool ) throws SQLException {
		
		if ( ( _dataSourceMain == null && whichConnectionPool == WhichConnectionPool.MAIN )
				|| ( _dataSourceBatchInserts == null && whichConnectionPool == WhichConnectionPool.BULK_INSERTS ) ) {

			//  create datasource  
			
			int maxDBConnections = this.maxDBConnections;
			

//			boolean poolPreparedStatements = true;
//			int maxOpenPreparedStatements = 10;

			if ( whichConnectionPool == WhichConnectionPool.BULK_INSERTS ) {

				maxDBConnections = 1;
//				maxOpenPreparedStatements = 10;

			} else {	
				maxDBConnections = MAX_TOTAL_DB_CONNECTIONS;
//				maxOpenPreparedStatements = 1;
			}


			String username = dbConnectionParametersProvider.getUsername(); 
			String password = dbConnectionParametersProvider.getPassword();
			String dbURL = dbConnectionParametersProvider.getDBURL();
			String dbPort = dbConnectionParametersProvider.getDBPort();


			if ( StringUtils.isEmpty( dbPort ) ) {
				dbPort = _DEFAULT_PORT;  // set to default port
				
				if ( log.isDebugEnabled() ) {
					log.debug( "DB Connection:  dbPort set to default: " + dbPort);
				}
			} else {
				if ( log.isDebugEnabled() ) {
					log.debug( "DB Connection:  dbPort: " + dbPort);
				}
			}



			BasicDataSource dataSource = new BasicDataSource();
			dataSource.setUrl("jdbc:mysql://" + dbURL + ":" + dbPort + "/" + databaseName +
					"?useUnicode=true&characterEncoding=UTF-8&characterSetResults=UTF-8&useSSL=false&allowPublicKeyRetrieval=true" );  // removed autoReconnect=true&

			dataSource.setUsername( username );
			dataSource.setPassword( password );
			
			dataSource.setMaxTotal( maxDBConnections );
			dataSource.setInitialSize( maxDBConnections );
			dataSource.setMaxIdle( maxDBConnections );
			dataSource.setMinIdle( 1 );
			
			dataSource.setMaxWaitMillis(100);
			
			if ( databaseConnectionTestOnBorrow ) {

				dataSource.setValidationQuery("select 1 from dual");

				dataSource.setTestOnBorrow( databaseConnectionTestOnBorrow );  // databaseConnectionTestOnBorrow is default to false;
				dataSource.setTestWhileIdle( true );

			}
			

//			dataSource.setMinEvictableIdleTimeMillis   ( 21600000 );
//			dataSource.setTimeBetweenEvictionRunsMillis(   30000 );
//			dataSource.setNumTestsPerEvictionRun( maxDBConnections ); // Test all of them
			

			dataSource.setMinEvictableIdleTimeMillis   ( 72000000 );  // 20 minutes
			dataSource.setTimeBetweenEvictionRunsMillis(   300000 );  //  5 minutes
			dataSource.setNumTestsPerEvictionRun( maxDBConnections ); // Test all of them, expensive if you also have setTestWhileIdle( true );
			
			
//			dataSource.setMinEvictableIdleTimeMillis   ( 5000 );
//			dataSource.setTimeBetweenEvictionRunsMillis(   3000 );
//			dataSource.setNumTestsPerEvictionRun( maxDBConnections ); // Test all of them
			
//			dataSource.setLifo( false );  // Set so is FIFO

			
//			dataSource.setLogAbandoned(true); //  Adds significant overhead
			
			
			dataSource.setMaxConnLifetimeMillis( 14400000 ); //  4 hours //  The maximum lifetime in milliseconds of a connection. 
			
			dataSource.setLogExpiredConnections(true);  //  Log connections that are removed for maxConnLifetimeMillis

			
			//  Pool prepared statements
			
			
//			dataSource.setPoolPreparedStatements( poolPreparedStatements );  // activate 
//			dataSource.setMaxOpenPreparedStatements( maxOpenPreparedStatements ); //  set max Open
			
			
			if ( whichConnectionPool == WhichConnectionPool.MAIN ) {
				_dataSourceMain = dataSource;
			} else if ( whichConnectionPool == WhichConnectionPool.BULK_INSERTS ) {
				_dataSourceBatchInserts = dataSource;
			} else {
				String msg = "Unknown value for whichConnectionPool: " + whichConnectionPool;
				log.error( msg );
				throw new LimelightImporterRunImporterDBInternalException(msg);
			}

		}
		
		BasicDataSource dataSource = null;
		
		if ( whichConnectionPool == WhichConnectionPool.MAIN ) {
			dataSource = _dataSourceMain;
		} else if ( whichConnectionPool == WhichConnectionPool.BULK_INSERTS ) {
			dataSource = _dataSourceBatchInserts;
		} else {
			String msg = "Unknown value for whichConnectionPool: " + whichConnectionPool;
			log.error( msg );
			throw new LimelightImporterRunImporterDBInternalException(msg);
		}
		
//		Exception e = new Exception();
//		
//		e.printStackTrace();

		try {
		
			return dataSource.getConnection();
			
		} catch ( Throwable t ) {
			
//			log.error( "Failed to get connection", t );
			
			throw t;
		}
	}
	
	/**
	 * Close all connections by closing All DataSources and set all object properties holding data sources to null
	 * 
	 * This object will create new data sources the next time the get connection is called
	 * 
	 * @throws Exception
	 */
	synchronized public void closeAllConnections() throws Exception {
		
		if ( _insertControlCommitConnection != null ) {
			
			boolean connectionAutoCommit = _insertControlCommitConnection.getAutoCommit();
			
			if ( ! connectionAutoCommit ) {
				_insertControlCommitConnection.commit();
			}
			
			_insertControlCommitConnection.close();
		}
		
		if ( _dataSourceMain != null ) {
			_dataSourceMain.close();
		}
		_dataSourceMain = null;

		if ( _dataSourceBatchInserts != null ) {
			_dataSourceBatchInserts.close();
		}
		_dataSourceBatchInserts = null;
		
	}

	public boolean isDatabaseConnectionTestOnBorrow() {
		return databaseConnectionTestOnBorrow;
	}

	public void setDatabaseConnectionTestOnBorrow(
			boolean databaseConnectionTestOnBorrow) {
		this.databaseConnectionTestOnBorrow = databaseConnectionTestOnBorrow;
	}

	public int getMaxDBConnections() {
		return maxDBConnections;
	}

	public void setMaxDBConnections(int maxDBConnections) {
		this.maxDBConnections = maxDBConnections;
	}

	public String getDatabaseName() {
		return databaseName;
	}

	public void setDatabaseName(String databaseName) {
		this.databaseName = databaseName;
	}
}
