package org.yeastrc.limelight.limelight_webapp.config_system_table;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.constants.ConfigSystemsKeysConstants;
import org.yeastrc.limelight.limelight_webapp.dao.ConfigSystemDAO_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsFileObjectStorageFileImportAllowedViaWebSubmit_IF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsLimelightXMLFileImportFullyConfiguredIF;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils.IsScanFileImportAllowedViaWebSubmitIF;


/**
 * For placement in the Application context of the web app
 * for getting specific config_system configuration values
 * 
 */
@Component
public class AppContextConfigSystemValuesRetrieval {

	public AppContextConfigSystemValuesRetrieval() {
		super();
		log.info("In AppContextConfigSystemValuesRetrieval() constructor");
	}
	
	private static final Logger log = LoggerFactory.getLogger( AppContextConfigSystemValuesRetrieval.class );
	
	@Autowired
	private ConfigSystemDAO_IF configSystemDAO;
	
	@Autowired
	private IsLimelightXMLFileImportFullyConfiguredIF isLimelightXMLFileImportFullyConfigured;
	
	@Autowired
	private IsFileObjectStorageFileImportAllowedViaWebSubmit_IF isFileObjectStorageFileImportAllowedViaWebSubmit;
	
	@Autowired
	private IsScanFileImportAllowedViaWebSubmitIF isScanFileImportAllowedViaWebSubmit;
	
	/**
	 * @return
	 */
	public String getFooterCenterOfPageHTML() {
		try {
			return configSystemDAO.getConfigValueForConfigKey(
					ConfigSystemsKeysConstants.FOOTER_CENTER_OF_PAGE_HTML_KEY );
			
		} catch ( Exception e ) {
			String msg = "Exception getting configSystem value for getFooterCenterOfPageHTML()";
			log.error( msg, e );
			return "UNABLE_TO_RETRIEVE_VALUE";
		}
	}
	/**
	 * @return
	 */
	public String getGoogleAnalyticsTrackingCode() {
		try {
			return configSystemDAO
					.getConfigValueForConfigKey( ConfigSystemsKeysConstants.GOOGLE_ANALYTICS_TRACKING_CODE_KEY );
		} catch ( Exception e ) {
			String msg = "Exception getting configSystem value for getGoogleAnalyticsTrackingCode()";
			log.error( msg, e );
			return null;
		}
	}
//	/**
//	 * @return
//	 */
//	public boolean isGoogleRecaptchaConfigured() {
//		return IsGoogleRecaptchaConfigured.getInstance().isGoogleRecaptchaConfigured();
//	}
//	/**
//	 * @return
//	 */
//	public String getGoogleRecaptchaSiteCode() {
//		try {
//			String siteKey = configSystemDAO
//					.getConfigValueForConfigKey( ConfigSystemsKeysConstants.GOOGLE_RECAPTCHA_SITE_KEY_KEY );
//			if ( siteKey != null ) {
//				siteKey = siteKey.trim();
//			}
//			return siteKey;
//		} catch ( Exception e ) {
//			String msg = "Exception getting configSystem value for getGoogleRecaptchaSiteCode()";
//			log.error( msg, e );
//			return null;
//		}
//	}
	
	/**
	 * @return
	 */
	public boolean isLimelightXMLFileImportFullyConfigured() {
		return isLimelightXMLFileImportFullyConfigured.isLimelightXMLFileImportFullyConfigured();
	}

	/**
	 * @return
	 */
	public boolean isFileObjectStorageFileImportAllowedViaWebSubmit() {
		return isFileObjectStorageFileImportAllowedViaWebSubmit.isFileObjectStorageFileImportAllowedViaWebSubmit();
	}
	
	/**
	 * @return
	 */
	public boolean isScanFileImportAllowedViaWebSubmit() {
		return isScanFileImportAllowedViaWebSubmit.isScanFileImportAllowedViaWebSubmit();
	}
	
//	/**
//	 * @return
//	 */
//	public boolean isTermsOfServiceEnabled() {
//		return IsTermsOfServiceEnabled.getInstance().isTermsOfServiceEnabled();
//	}
}
