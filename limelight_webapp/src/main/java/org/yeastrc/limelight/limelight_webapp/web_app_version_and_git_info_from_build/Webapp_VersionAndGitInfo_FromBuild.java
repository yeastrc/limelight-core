package org.yeastrc.limelight.limelight_webapp.web_app_version_and_git_info_from_build;

import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * 
 * 
 *
 */
@Component
public class Webapp_VersionAndGitInfo_FromBuild 

implements 
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
, Webapp_VersionAndGitInfo_FromBuild_IF
{
	private static final Logger log = LoggerFactory.getLogger( Webapp_VersionAndGitInfo_FromBuild.class );
	
	private static final String VERSON_FILENAME = "limelight_version_from_build.properties";
	
	/**
	 * 
	 *
	 */
	public static class Webapp_VersionAndGitInfo_FromBuild_Results {
		
		private String limelightRelease_EnvironmentVariableValue_OrDefault;

		public String getLimelightRelease_EnvironmentVariableValue_OrDefault() {
			return limelightRelease_EnvironmentVariableValue_OrDefault;
		}
	}
	
	private volatile Webapp_VersionAndGitInfo_FromBuild_Results results;

	/* 
	 * Spring LifeCycle Method
	 * 
	 * (non-Javadoc)
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		try {
			loadDataFromFile();

		} catch (Exception e) {
			String msg = "In afterPropertiesSet(): Exception in processing";
			log.error(msg);
			throw e;
		}
	}
	
	/**
	 * 
	 * @return 
	 */
	@Override
	public Webapp_VersionAndGitInfo_FromBuild_Results get_Webapp_VersionAndGitInfo_FromBuild_Results() {
		
		return results;
	}
	
	/**
	 * @throws Exception 
	 * 
	 */
	private void loadDataFromFile() throws Exception {

		Properties versionProperties = null;
		InputStream propertiesFileAsStream = null;

		try {

			//  Get config file from class path

			ClassLoader thisClassLoader = this.getClass().getClassLoader();
			URL configFileUrlObjUrlLocal = thisClassLoader.getResource( VERSON_FILENAME );

			if ( configFileUrlObjUrlLocal == null ) {
				String msg = "Webapp_VersionAndGitInfo_FromBuild: Properties file '" + VERSON_FILENAME + "' not found in class path.";
				log.error( msg );
				
				throw new LimelightInternalErrorException(msg);

//				return; // EARLY RETURN

			} else {
				if ( log.isInfoEnabled() ) {
					log.info( "Properties file '" + VERSON_FILENAME + "' found, load path = " + configFileUrlObjUrlLocal.getFile() );
				}
			}

			propertiesFileAsStream = configFileUrlObjUrlLocal.openStream();

			if ( propertiesFileAsStream == null ) {
				String msg = "Properties file '" + VERSON_FILENAME + "' not found in class path.";
				log.info( msg );
				
				throw new LimelightInternalErrorException(msg);

//				return null; // EARLY RETURN

			}

			versionProperties = new Properties();

			versionProperties.load( propertiesFileAsStream );

		} finally {

			if ( propertiesFileAsStream != null ) {

				propertiesFileAsStream.close();
			}
		}
		
		results = new Webapp_VersionAndGitInfo_FromBuild_Results();

		results.limelightRelease_EnvironmentVariableValue_OrDefault = versionProperties.getProperty( "LimelightRelease_EnvironmentVariableValue_OrDefault" );
	}
}
