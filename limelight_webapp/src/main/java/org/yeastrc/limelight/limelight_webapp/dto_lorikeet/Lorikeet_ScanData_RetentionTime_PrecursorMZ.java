package org.yeastrc.limelight.limelight_webapp.dto_lorikeet;

/**
 * Always from the scan
 *
 */
public class Lorikeet_ScanData_RetentionTime_PrecursorMZ {
	
	private double scan_precursorMZ;
	private Float scan_retentionTimeSeconds; // For data displayed with Lorikeet
	
	public double getScan_precursorMZ() {
		return scan_precursorMZ;
	}
	public void setScan_precursorMZ(double scan_precursorMZ) {
		this.scan_precursorMZ = scan_precursorMZ;
	}
	public Float getScan_retentionTimeSeconds() {
		return scan_retentionTimeSeconds;
	}
	public void setScan_retentionTimeSeconds(Float scan_retentionTimeSeconds) {
		this.scan_retentionTimeSeconds = scan_retentionTimeSeconds;
	}
	
}
