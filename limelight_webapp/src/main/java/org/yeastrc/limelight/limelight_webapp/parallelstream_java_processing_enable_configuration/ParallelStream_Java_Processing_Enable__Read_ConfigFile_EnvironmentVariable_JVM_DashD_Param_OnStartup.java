package org.yeastrc.limelight.limelight_webapp.parallelstream_java_processing_enable_configuration;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants_config_filenames.ParallelStream_Java_Processing_Enable_ConfigFilename_Constants;


/**
 * 
 *
 */
@Component
public class ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup implements ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_IF {

	private static final Logger log = LoggerFactory.getLogger( ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup.class );
	
	private static final String CONFIG_FILENAME = ParallelStream_Java_Processing_Enable_ConfigFilename_Constants.CONFIG_FILENAME;
	

	private static final String PROPERTY_FILE_KEY__PARALLELSTREAM_DEFAULT_THREAD_POOL_JAVA_PROCESSING_ENABLE = "parallelstream.default.thread.pool.java.processing.enable";

	private static final String ENVIRONMENT_VARIABLE__PARALLELSTREAM_DEFAULT_THREAD_POOL_JAVA_PROCESSING_ENABLE = "LIMELIGHT_PARALLELSTREAM_DEFAULT_THREAD_POOL_JAVA_PROCESSING_ENABLE";

	private static final String VALUE_TRUE = "true";

	/**
	 * 
	 *
	 */
	public static class ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response {

		private boolean parallelStream_DefaultThreadPool_Java_Processing_Enabled_True;

		public boolean isParallelStream_DefaultThreadPool_Java_Processing_Enabled_True() {
			return parallelStream_DefaultThreadPool_Java_Processing_Enabled_True;
		}
	}

	/**
	 * Load Config file, Read OS Environment Variable, Read JVM -D property for:
	 *		directory to use for storing cached data
	 *      
	 * @return null if no properties file is found
	 */
	
	@Override
	public ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response get_ParallelStream_Java_Processing_Enable_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup() throws Exception {

		ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response response = new ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup_Response();
		
		log.warn("INFO:  ENTER: ParallelStream_Java_Processing_Enable__Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup.parallelStream_Java_Processing_Enable_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup() ");

		Boolean parallelStream_DefaultThreadPool_Java_Processing_Enabled_True = null;
		
		{
			//  First get from config file
			
			parallelStream_DefaultThreadPool_Java_Processing_Enabled_True = getStringFromConfigFile();
			
			if ( parallelStream_DefaultThreadPool_Java_Processing_Enabled_True != null ) {
				
				log.warn( "INFO: ParallelStream_Java_Processing_Enable: Value found in config file: '" + CONFIG_FILENAME + "' with key: '" + PROPERTY_FILE_KEY__PARALLELSTREAM_DEFAULT_THREAD_POOL_JAVA_PROCESSING_ENABLE + "' with value evaluated to 'true' or 'false' boolean value: " + parallelStream_DefaultThreadPool_Java_Processing_Enabled_True );
				
			} else {
				
				log.info( "INFO: NO parallelStream_DefaultThreadPool_Java_Processing_Enabled_True from config file so try from environment variable. ");

				String parallelStream_DefaultThreadPool_Java_Processing_Enabled_True_String = System.getenv( ENVIRONMENT_VARIABLE__PARALLELSTREAM_DEFAULT_THREAD_POOL_JAVA_PROCESSING_ENABLE );
				
				if ( VALUE_TRUE.equals( parallelStream_DefaultThreadPool_Java_Processing_Enabled_True_String ) ) {
					
					parallelStream_DefaultThreadPool_Java_Processing_Enabled_True = true;
			
					log.warn( "INFO::: ParallelStream_Java_Processing_Enable: Value found in Environment Variable: '" + ENVIRONMENT_VARIABLE__PARALLELSTREAM_DEFAULT_THREAD_POOL_JAVA_PROCESSING_ENABLE + "' with value evaluated to 'true' or 'false' boolean value: " + parallelStream_DefaultThreadPool_Java_Processing_Enabled_True_String );
					
				} else {

					//  Not in config file or Environment Variable so get from JVM -D Property

					Properties prop = System.getProperties();
					parallelStream_DefaultThreadPool_Java_Processing_Enabled_True_String = prop.getProperty(ENVIRONMENT_VARIABLE__PARALLELSTREAM_DEFAULT_THREAD_POOL_JAVA_PROCESSING_ENABLE);

					if ( parallelStream_DefaultThreadPool_Java_Processing_Enabled_True_String != null ) {

						parallelStream_DefaultThreadPool_Java_Processing_Enabled_True_String = parallelStream_DefaultThreadPool_Java_Processing_Enabled_True_String.trim();
					}

					if ( VALUE_TRUE.equals( parallelStream_DefaultThreadPool_Java_Processing_Enabled_True_String ) ) {
						
						parallelStream_DefaultThreadPool_Java_Processing_Enabled_True = true;
				
						log.warn( "INFO::: ParallelStream_Java_Processing_Enable: Value found in JVM param: '-D" + ENVIRONMENT_VARIABLE__PARALLELSTREAM_DEFAULT_THREAD_POOL_JAVA_PROCESSING_ENABLE + "' with value evaluated to 'true' or 'false' boolean value: " + parallelStream_DefaultThreadPool_Java_Processing_Enabled_True_String );

					} else {

						log.info( "INFO: ParallelStream_Java_Processing_Enable: NO Value found so default to false.  No Value found in "
								+ " config file: '" + CONFIG_FILENAME + "' with key: '" + PROPERTY_FILE_KEY__PARALLELSTREAM_DEFAULT_THREAD_POOL_JAVA_PROCESSING_ENABLE + "', "
								+ "Environment Variable: '" 
								+ ENVIRONMENT_VARIABLE__PARALLELSTREAM_DEFAULT_THREAD_POOL_JAVA_PROCESSING_ENABLE 
								+ "', "
								+ "OR JVM param: '-D" + ENVIRONMENT_VARIABLE__PARALLELSTREAM_DEFAULT_THREAD_POOL_JAVA_PROCESSING_ENABLE + "'." );
						
						parallelStream_DefaultThreadPool_Java_Processing_Enabled_True = false;
					}
				}
				
			}
			
		}
		
		if ( parallelStream_DefaultThreadPool_Java_Processing_Enabled_True == null ) {
			//  Default to false if did not set above
			parallelStream_DefaultThreadPool_Java_Processing_Enabled_True = false;
		}

		response.parallelStream_DefaultThreadPool_Java_Processing_Enabled_True = parallelStream_DefaultThreadPool_Java_Processing_Enabled_True;
		
		return response;
	}
	
	/**
	 * @return
	 * @throws IOException
	 */
	private Boolean getStringFromConfigFile() throws IOException {

		Properties configProps = null;
		InputStream propertiesFileAsStream = null;

		try {

			//  Get config file from class path

			ClassLoader thisClassLoader = this.getClass().getClassLoader();
			URL configFileUrlObjUrlLocal = thisClassLoader.getResource( CONFIG_FILENAME );

			if ( configFileUrlObjUrlLocal == null ) {
				String msg = "Properties file '" + CONFIG_FILENAME + "' not found in class path.";
				log.info( msg );

				return null; // EARLY RETURN

			} else {
				if ( log.isInfoEnabled() ) {
					log.info( "Properties file '" + CONFIG_FILENAME + "' found, load path = " + configFileUrlObjUrlLocal.getFile() );
				}
			}

			propertiesFileAsStream = configFileUrlObjUrlLocal.openStream();

			if ( propertiesFileAsStream == null ) {
				String msg = "Properties file '" + CONFIG_FILENAME + "' not found in class path.";
				log.info( msg );

				return null; // EARLY RETURN

			}

			configProps = new Properties();

			configProps.load( propertiesFileAsStream );

		} finally {

			if ( propertiesFileAsStream != null ) {

				propertiesFileAsStream.close();
			}
		}
		
		String parallelStream_DefaultThreadPool_Java_Processing_Enabled_True_String = configProps.getProperty( PROPERTY_FILE_KEY__PARALLELSTREAM_DEFAULT_THREAD_POOL_JAVA_PROCESSING_ENABLE );
		
		if ( parallelStream_DefaultThreadPool_Java_Processing_Enabled_True_String != null ) {
			parallelStream_DefaultThreadPool_Java_Processing_Enabled_True_String = parallelStream_DefaultThreadPool_Java_Processing_Enabled_True_String.trim();
		}

		if ( StringUtils.isEmpty( parallelStream_DefaultThreadPool_Java_Processing_Enabled_True_String ) ) {

			log.info( "ParallelStream_Java_Processing_Enable ConfigFile exists but no value for ParallelStream_Java_Processing_Enable key. Config filename: " 
					+ CONFIG_FILENAME
					+ ", propertyFile ParallelStream_Java_Processing_Enable Key: " + PROPERTY_FILE_KEY__PARALLELSTREAM_DEFAULT_THREAD_POOL_JAVA_PROCESSING_ENABLE );

			return null;
		}
		
		boolean parallelStream_DefaultThreadPool_Java_Processing_Enabled_True = false;
		
		if ( VALUE_TRUE.equals( parallelStream_DefaultThreadPool_Java_Processing_Enabled_True_String ) ) {
			
			parallelStream_DefaultThreadPool_Java_Processing_Enabled_True = true;
		}
		

		return parallelStream_DefaultThreadPool_Java_Processing_Enabled_True;
	}


}
