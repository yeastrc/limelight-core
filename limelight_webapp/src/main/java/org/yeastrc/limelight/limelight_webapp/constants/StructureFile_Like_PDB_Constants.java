package org.yeastrc.limelight.limelight_webapp.constants;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * 
 * 
 *
 */
public class StructureFile_Like_PDB_Constants {

	private static final Logger log = LoggerFactory.getLogger( StructureFile_Like_PDB_Constants.class );
	
	public static final int MAX_FILE_SIZE_IN_MB = 50; // 50MB max

	public static final int MAX_FILE_SIZE_IN_BYTES = MAX_FILE_SIZE_IN_MB * ( 1000 * 1000 );

	static {
		
		if ( MAX_FILE_SIZE_IN_BYTES > Integer.MAX_VALUE ) {
			
			String msg = "MAX_FILE_SIZE_IN_BYTES > Integer.MAX_VALUE.  MUST recode some using of MAX_FILE_SIZE_IN_BYTES.";
			log.error(msg);
			throw new LimelightInternalErrorException(msg);
		}
	}
}
