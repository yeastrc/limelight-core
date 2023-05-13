package org.yeastrc.limelight.limelight_shared.aa_limelight_db_updates_in_run_imprtr_or_pgm__code;

/**
 * table aa_limelight_db_updates_in_run_importer_or_pgm_cmplt_fr_srch_tbl
 * 
 * Updates complete for single search id
 *
 */
public class Aa_LimelightDb_UpdatesIn_RunImporterOrPgm_CompleteForSearch_DTO {

	private int rootTableId;
	private int searchId;
	
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public int getRootTableId() {
		return rootTableId;
	}
	public void setRootTableId(int rootTableId) {
		this.rootTableId = rootTableId;
	}
}
