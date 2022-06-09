package org.yeastrc.limelight.limelight_webapp.spectral_storage_service_interface;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;

/**
 * On Limelight Startup, Get Spectral Storage Service supported Scan Filename Suffixes
 *
 */
@Component
public class SpectralStorageService_Get_Supported_ScanFileSuffixes_At_LimelightStartup__StartThread 


implements 
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 

{
	private static final Logger log = LoggerFactory.getLogger( SpectralStorageService_Get_Supported_ScanFileSuffixes_At_LimelightStartup__StartThread.class );

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;

	/* 
	 * Spring LifeCycle Method
	 * 
	 * (non-Javadoc)
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		
		initializeObject_AfterPropertiesSetBySpring();
	}

	//////////

	/**
	 * called from method !! afterPropertiesSet() !! in this object which is called by Spring after Properties are Set but before Object is in use.
	 * 
	 *  
	 * @throws Exception 
	 */
	private void initializeObject_AfterPropertiesSetBySpring() throws Exception {
		
		log.warn( "INFO: initializeObject_AfterPropertiesSetBySpring() called.");
		
		SpectralStorageService_Get_Supported_ScanFileSuffixes_At_LimelightStartup__Runnable_InThread runnable = SpectralStorageService_Get_Supported_ScanFileSuffixes_At_LimelightStartup__Runnable_InThread.getNewInstance();
		
		runnable.setConfigSystemDAO(configSystemDAO);
		
		runnable.startThread();
		
	}

	public ConfigSystemDAO_IF getConfigSystemDAO() {
		return configSystemDAO;
	}

	public void setConfigSystemDAO(ConfigSystemDAO_IF configSystemDAO) {
		this.configSystemDAO = configSystemDAO;
	}
}
