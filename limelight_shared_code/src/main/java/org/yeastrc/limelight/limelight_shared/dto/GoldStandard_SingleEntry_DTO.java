package org.yeastrc.limelight.limelight_shared.dto;

/**
 * table gold_standard_single_entry_tbl
 *
 */
public class GoldStandard_SingleEntry_DTO {

	private int id;
	private int goldStandard_ForScanFile_Root_Id;
	
	private int scanNumber;
	
	private String peptideSequence;

	private String scanNumber_PeptideSequence_Mods_JSON;
	private int scanNumber_PeptideSequence_Mods_JSON_VersionNumber;

	@Override
	public String toString() {
		return "GoldStandard_SingleEntry_DTO [id=" + id + ", goldStandard_ForScanFile_Root_Id="
				+ goldStandard_ForScanFile_Root_Id + ", scanNumber=" + scanNumber 
				 + ", peptideSequence=" + peptideSequence
				+ ", scanNumber_PeptideSequence_Mods_JSON=" + scanNumber_PeptideSequence_Mods_JSON
				+ ", scanNumber_PeptideSequence_Mods_JSON_VersionNumber="
				+ scanNumber_PeptideSequence_Mods_JSON_VersionNumber + "]";
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getGoldStandard_ForScanFile_Root_Id() {
		return goldStandard_ForScanFile_Root_Id;
	}
	public void setGoldStandard_ForScanFile_Root_Id(int goldStandard_ForScanFile_Root_Id) {
		this.goldStandard_ForScanFile_Root_Id = goldStandard_ForScanFile_Root_Id;
	}
	public int getScanNumber() {
		return scanNumber;
	}
	public void setScanNumber(int scanNumber) {
		this.scanNumber = scanNumber;
	}
	public String getScanNumber_PeptideSequence_Mods_JSON() {
		return scanNumber_PeptideSequence_Mods_JSON;
	}
	public void setScanNumber_PeptideSequence_Mods_JSON(String scanNumber_PeptideSequence_Mods_JSON) {
		this.scanNumber_PeptideSequence_Mods_JSON = scanNumber_PeptideSequence_Mods_JSON;
	}
	public int getScanNumber_PeptideSequence_Mods_JSON_VersionNumber() {
		return scanNumber_PeptideSequence_Mods_JSON_VersionNumber;
	}
	public void setScanNumber_PeptideSequence_Mods_JSON_VersionNumber(
			int scanNumber_PeptideSequence_Mods_JSON_VersionNumber) {
		this.scanNumber_PeptideSequence_Mods_JSON_VersionNumber = scanNumber_PeptideSequence_Mods_JSON_VersionNumber;
	}
	public String getPeptideSequence() {
		return peptideSequence;
	}
	public void setPeptideSequence(String peptideSequence) {
		this.peptideSequence = peptideSequence;
	}
	
}
