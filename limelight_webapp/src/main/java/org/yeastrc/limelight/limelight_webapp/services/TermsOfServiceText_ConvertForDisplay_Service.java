package org.yeastrc.limelight.limelight_webapp.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db_dto.TermsOfServiceTextVersionsDTO;

/**
 * 
 *
 */
@Component
public class TermsOfServiceText_ConvertForDisplay_Service {

	private static final Logger log = LoggerFactory.getLogger( TermsOfServiceText_ConvertForDisplay_Service.class );
	
	/**
	 * For use everywhere except the configuration page
	 * Substitute <br> for \n in text
	 */
	public String termsOfServiceText_ConvertForDisplay_ExceptConfigurationPage( String termsOfServiceText_FromDB ) {
		
		String termsOfServiceText_Converted = termsOfServiceText_FromDB.replaceAll( "\\n", "<br>" );
		return termsOfServiceText_Converted;
	}

}
