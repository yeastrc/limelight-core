package org.yeastrc.limelight.limelight_importer_runimporter_shared.db;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;


/**
 * Default version of IDBConnectionParametersProvider that reads a property file and checks environment variables
 *
 */
public class DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables implements IDBConnectionParametersProvider {

	private static final Logger log = LoggerFactory.getLogger( DBConnectionParametersProviderFromPropertiesFileEnvironmentVariables.class );


	private static final String NO_PROPERTIES_FILE_ERROR_MESSAGE = "No DB Connection Properties file found.";

	//  Remove embedded config file option
	
//	private static final String DB_CONFIG_FILENAME = "db_config_file.properties";


	private static final String PROPERTY_NAME__USERNAME = "username";
	private static final String PROPERTY_NAME__PASSWORD = "password";
	private static final String PROPERTY_NAME__DB_HOST   = "dbHost";
	private static final String PROPERTY_NAME__DB_PORT  = "dbPort";

	private static final String PROPERTY_NAME__LIMELIGHT_DB_NAME  = "limelight.db.name";


	private static final String ENVIRONMENT_VARIABLE__USERNAME = "LIMELIGHT_DB_USER";
	private static final String ENVIRONMENT_VARIABLE__PASSWORD = "LIMELIGHT_DB_PASSWORD";
	private static final String ENVIRONMENT_VARIABLE__DB_HOST = "LIMELIGHT_DB_HOST_ADDRESS";
	private static final String ENVIRONMENT_VARIABLE__DB_PORT = "LIMELIGHT_DB_HOST_PORT";

	private static final String ENVIRONMENT_VARIABLE__LIMELIGHT_DB_NAME = "LIMELIGHT_DB_NAME";
	
	private File configFile;

	private String username;
	private String password;
	private String dbHost;
	private String dbPort;

	private String limelightDbName;

	private boolean configured;


	@Override
	public void init() 
			throws DBConnectionParametersProviderPropertiesFileContentsErrorException, 
			DBConnectionParametersProviderPropertiesFileErrorException {

		log.debug( "Entered init()" );

		if ( configured ) {

			return;
		}

		String propertiesFilenameMaybeWithPath = null;

		Properties configProps = null;

		InputStream propertiesFileAsStream = null;

		try {

			if ( configFile != null ) {

				propertiesFilenameMaybeWithPath = configFile.getAbsolutePath();

				if ( ! configFile.exists() ) {

					System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );

					String msg = "Properties file not found: " + configFile.getAbsolutePath();
					log.error( msg );

					throw new DBConnectionParametersProviderPropertiesFileErrorException( msg );
				}

				try {

					propertiesFileAsStream = new FileInputStream(configFile);

				} catch ( FileNotFoundException e ) {

					System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );

					String msg = "Properties file not found: " + configFile.getAbsolutePath() + " exception: " + e.toString();
					//					log.error( msg, e );

					throw new DBConnectionParametersProviderPropertiesFileErrorException( msg );
				}

			} else {

				//  Remove embedded config file option
				
//				//  Get config file from class path
//
//				propertiesFilenameMaybeWithPath = DB_CONFIG_FILENAME;
//
//				ClassLoader thisClassLoader = this.getClass().getClassLoader();
//
//				URL configFileUrlObjUrlLocal = thisClassLoader.getResource( DB_CONFIG_FILENAME );
//
//				if ( configFileUrlObjUrlLocal == null ) {
//
//					System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );
//
//					String msg = "Properties file '" + DB_CONFIG_FILENAME + "' not found in class path.";
//					//					log.error( msg );
//
//					throw new DBConnectionParametersProviderPropertiesFileErrorException( msg );
//
//				} else {
//
//					if ( log.isInfoEnabled() ) {
//
//						log.info( "Properties file '" + DB_CONFIG_FILENAME + "' found, load path = " + configFileUrlObjUrlLocal.getFile() );
//					}
//				}
//
//
//				propertiesFilenameMaybeWithPath = configFileUrlObjUrlLocal.getFile();
//
//
//				propertiesFileAsStream = configFileUrlObjUrlLocal.openStream();
//
//
//				if ( propertiesFileAsStream == null ) {
//
//					System.err.println( NO_PROPERTIES_FILE_ERROR_MESSAGE );
//
//					String msg = "Properties file '" + DB_CONFIG_FILENAME + "' not found in class path.";
//
//					//					log.error( msg );
//
//					throw new DBConnectionParametersProviderPropertiesFileErrorException( msg );
//				}
			}

//			if ( configFile == null ) {
//				String msg = "No config file provided";
//				log.error( msg );
//				throw new DBConnectionParametersProviderPropertiesFileErrorException( msg );
//			}

			if ( configFile != null ) {

				configProps = new Properties();

				configProps.load( propertiesFileAsStream );
			}

		} catch (IOException e) {

			log.error( "In init(),   Properties file '" 
					+ propertiesFilenameMaybeWithPath + "', IOException: " + e.toString(), e );

			throw new DBConnectionParametersProviderPropertiesFileErrorException( e );

		} finally {

			if ( propertiesFileAsStream != null ) {

				try {
					propertiesFileAsStream.close();
				} catch (IOException e) {

					log.error( "In init(), propertiesFileAsStream.close():   Properties file '" 
							+ propertiesFilenameMaybeWithPath + "', IOException: " + e.toString(), e );

					throw new DBConnectionParametersProviderPropertiesFileErrorException( e );
				}
			}
		}

		getConfigPropertiesFromPropertiesObj(configProps);


		configured = true;
	}


	/**
	 * @param configProps - Properties object to get properties from
	 * @throws DBConnectionParametersProviderFromPropertiesFileException
	 */
	public void getConfigPropertiesFromPropertiesObj( Properties configProps )
			throws DBConnectionParametersProviderPropertiesFileContentsErrorException {
		
		username = System.getenv( ENVIRONMENT_VARIABLE__USERNAME );
		password = System.getenv( ENVIRONMENT_VARIABLE__PASSWORD );
		dbHost = System.getenv( ENVIRONMENT_VARIABLE__DB_HOST );
		dbPort = System.getenv( ENVIRONMENT_VARIABLE__DB_PORT );

		limelightDbName = System.getenv( ENVIRONMENT_VARIABLE__LIMELIGHT_DB_NAME );
		
		//  Get from Config file if NOT in Environment Variables

		if ( username == null ) {
			username = configProps.getProperty( PROPERTY_NAME__USERNAME );
		}
		if ( password == null ) {
			password = configProps.getProperty( PROPERTY_NAME__PASSWORD );
		}
		if ( dbHost == null ) {
			dbHost = configProps.getProperty( PROPERTY_NAME__DB_HOST );
		}
		if ( dbPort == null ) {
			dbPort = configProps.getProperty( PROPERTY_NAME__DB_PORT );
		}
		if ( limelightDbName == null ) {
			limelightDbName = configProps.getProperty( PROPERTY_NAME__LIMELIGHT_DB_NAME );
		}

		if ( StringUtils.isEmpty( username ) ) {

			String msg = "NO Value (not provided or is empty string): Environment Variable '" + ENVIRONMENT_VARIABLE__USERNAME 
					+ "', Database connection parameters file: parameter '" + PROPERTY_NAME__USERNAME + "'.";
			System.err.println( msg );
			throw new DBConnectionParametersProviderPropertiesFileContentsErrorException(msg);
		}

		if ( StringUtils.isEmpty( password ) ) {
			String msg = "NO Value (not provided or is empty string): Environment Variable '" + ENVIRONMENT_VARIABLE__PASSWORD 
					+ "', Database connection parameters file: parameter '" + PROPERTY_NAME__PASSWORD + "'.";
			System.err.println( msg );
			throw new DBConnectionParametersProviderPropertiesFileContentsErrorException(msg);
		}

		if ( StringUtils.isEmpty( dbHost ) ) {
			String msg = "NO Value (not provided or is empty string): Environment Variable '" + ENVIRONMENT_VARIABLE__DB_HOST 
					+ "', Database connection parameters file: parameter '" + PROPERTY_NAME__DB_HOST + "'.";
			System.err.println( msg );
			throw new DBConnectionParametersProviderPropertiesFileContentsErrorException(msg);
		}


//		if ( log.isInfoEnabled() ) {

			System.out.println( "Database connection parameters:");
			if ( StringUtils.isNotEmpty( username ) ) {
				System.out.println( "Environment Variable '" + ENVIRONMENT_VARIABLE__USERNAME 
						+ "' OR Database connection parameters file: parameter '" + PROPERTY_NAME__USERNAME + "' has a value" );
			}
			if ( StringUtils.isNotEmpty( password ) ) {
				System.out.println( "Environment Variable '" + ENVIRONMENT_VARIABLE__PASSWORD 
						+ "' OR Database connection parameters file: parameter '" + PROPERTY_NAME__PASSWORD + "' has a value" );
			}
			System.out.println( "Environment Variable '" + ENVIRONMENT_VARIABLE__DB_HOST 
					+ "' OR Database connection parameters file: parameter '" + PROPERTY_NAME__DB_HOST + "': " + dbHost );

			System.out.println( "Environment Variable '" + ENVIRONMENT_VARIABLE__DB_PORT 
					+ "' OR Database connection parameters file: parameter '" + PROPERTY_NAME__DB_PORT + "': " + dbPort );

			if ( StringUtils.isNotEmpty( limelightDbName ) ) {
				System.out.println( "Environment Variable '" + ENVIRONMENT_VARIABLE__LIMELIGHT_DB_NAME 
						+ "' OR Database connection parameters file: parameter '" + PROPERTY_NAME__LIMELIGHT_DB_NAME + "': " + limelightDbName );

				System.out.println( PROPERTY_NAME__LIMELIGHT_DB_NAME + ": " + limelightDbName );
			}
//		}

		configured = true;
	}


	@Override
	public String getUsername() {

		return username;
	}

	@Override
	public String getPassword() {

		return password;
	}

	@Override
	public String getDBURL() {

		return dbHost;
	}

	@Override
	public String getDBPort() {

		return dbPort;
	}

	@Override
	public String getLimelightDbName() {
		return limelightDbName;
	}


	public File getConfigFile() {
		return configFile;
	}


	public void setConfigFile(File configFile) {
		this.configFile = configFile;
	}


	public void setLimelightDbName(String limelightDbName) {
		this.limelightDbName = limelightDbName;
	}



}
