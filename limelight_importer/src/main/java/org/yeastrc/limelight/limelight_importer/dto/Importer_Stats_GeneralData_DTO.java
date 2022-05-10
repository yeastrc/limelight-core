package org.yeastrc.limelight.limelight_importer.dto;

import org.yeastrc.limelight.limelight_importer.constants.Importer_Stats_GeneralData_Table__Label_Values_Enum;

/**
 * table importer_stats_general_data_tbl
 *
 */
public class Importer_Stats_GeneralData_DTO {

	private int id;
	private int searchId;
	
	private Importer_Stats_GeneralData_Table__Label_Values_Enum label;  //  latin1 char set
	private long total_elapsedTime_Milliseconds;

	@Override
	public String toString() {
		
		String labelValue = null;
		if ( label != null ) {
			labelValue = label.value();
		}
		
		return "Importer_Stats_GeneralData_DTO [id=" + id + ", searchId=" + searchId + ", label=" + labelValue
				+ ", total_elapsedTime_Milliseconds=" + total_elapsedTime_Milliseconds + "]";
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public Importer_Stats_GeneralData_Table__Label_Values_Enum getLabel() {
		return label;
	}
	public void setLabel(Importer_Stats_GeneralData_Table__Label_Values_Enum label) {
		this.label = label;
	}
	public long getTotal_elapsedTime_Milliseconds() {
		return total_elapsedTime_Milliseconds;
	}
	public void setTotal_elapsedTime_Milliseconds(long total_elapsedTime_Milliseconds) {
		this.total_elapsedTime_Milliseconds = total_elapsedTime_Milliseconds;
	}
}
