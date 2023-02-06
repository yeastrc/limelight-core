package org.yeastrc.limelight.limelight_feature_detection_run_import.constants;

/**
 * Validate that PSM Precursor Retention Time and Precursor M/Z values are NOT larger than allowed in DB
 * 
 * DB: Table psm_tbl:
 *   precursor_retention_time decimal(9,4) DEFAULT NULL,
 *   precursor_m_z decimal(10,4) DEFAULT NULL,
 *   
 *   precursor_retention_time max number of whole number digits is 5
 *   precursor_m_z   		  max number of whole number digits is 6 
 * 
 */
public class Database_DecimalFieldType_MaxWholeNumberDigits_Constants {

	public static final int PSM_TBL__PRECURSOR_RETENTION_TIME__MAX_NUMBER_WHOLE_NUMBER_DIGITS = 5;

	public static final int PSM_TBL__PRECURSOR_RETENTION_TIME__DECIMAL_PLACES = 4;

	public static final int PSM_TBL__PRECURSOR_M_Z__MAX_NUMBER_WHOLE_NUMBER_DIGITS = 6;

	public static final int PSM_TBL__PRECURSOR_M_Z__DECIMAL_PLACES = 4;
	
}
