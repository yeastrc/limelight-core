package org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code;

/**
 * table aa_limelight_db_updates_in_run_imprtr_or_pgm_root_tbl
 * 
 * Updates for a single label_ShortKey string (Unique Index in DB)
 * 
 * See Java class 'Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root__Constants' for values for 'label_ShortKey'
 *
 */
public class Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_Root_DTO {

	private int id;
	private String label_ShortKey;
	private String label;
	private boolean updatesComplete;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLabel_ShortKey() {
		return label_ShortKey;
	}
	public void setLabel_ShortKey(String label_ShortKey) {
		this.label_ShortKey = label_ShortKey;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public boolean isUpdatesComplete() {
		return updatesComplete;
	}
	public void setUpdatesComplete(boolean updatesComplete) {
		this.updatesComplete = updatesComplete;
	}
}
