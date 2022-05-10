package org.yeastrc.limelight.limelight_webapp.services;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_webapp.constants.WebConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;

/**
 * For Specific Data Pages - Currently Peptide and Protein Pages (Project Search Based Only, NOT Experiment Pages)
 * 
 * Sets HttpServletRequest attribute to indicate that Blib Spectral Library Webservice URL IS Configured
 * 
 */
@Component
public class Blib_Spectral_Library_Webservice_Configured__SetForJSP implements Blib_Spectral_Library_Webservice_Configured__SetForJSP_IF {

	private static final Logger log = LoggerFactory.getLogger( Blib_Spectral_Library_Webservice_Configured__SetForJSP.class );

	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.services.Blib_Spectral_Library_Webservice_Configured__SetForJSP_IF#blib_Spectral_Library_Webservice_Configured__SetForJSP(java.lang.String, javax.servlet.http.HttpServletRequest)
	 */
	
	@Override
	public void blib_Spectral_Library_Webservice_Configured__SetForJSP( HttpServletRequest httpServletRequest ) throws Exception {
		

		String webservice_Base_URL =
				configSystemDAO.getConfigValueForConfigKey(
						ConfigSystemsKeysSharedConstants.BLIB_SPECTRAL_LIBRARY_FILE_CREATION_WEB_SERVICE_BASE_URL );

		if ( webservice_Base_URL == null || StringUtils.isEmpty( webservice_Base_URL.trim() ) ) {
			
			return;
		}
		
		String directoryBasePath = 	configSystemDAO.getConfigValueForConfigKey(
				ConfigSystemsKeysSharedConstants.BLIB_SPECTRAL_LIBRARY_FILE_RESULT_FILE_BASE_PATH );

		if ( directoryBasePath == null || StringUtils.isEmpty( directoryBasePath.trim() ) ) {
			
			return;
		}
		
		httpServletRequest.setAttribute( WebConstants.Blib_Spectral_Library_Webservice_IS_Fully_Configured__SetForJSP, true );
	}
}
