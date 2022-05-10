package org.yeastrc.limelight.limelight_importer.dto;

import org.yeastrc.limelight.limelight_importer.constants.Importer_Stats_PerTable_Table__SqlManipulationType_Values_Enum;

/**
 * table importer_stats_per_table_tbl
 *
 */
public class Importer_Stats_PerTable_DTO {

	private int id;
	private int searchId;
	
	private String table_names;
	
	private Importer_Stats_PerTable_Table__SqlManipulationType_Values_Enum tableManipulationType;
	private long sqlCalls_TotalElapsedTime_Milliseconds;
	private int sqlCallCount;
	private int totalRecords;
	
	@Override
	public String toString() {
		return "Importer_Stats_PerTable_DTO [id=" + id + ", searchId=" + searchId + ", table_names=" + table_names
				+ ", tableManipulationType=" + tableManipulationType + ", sqlCalls_TotalElapsedTime_Milliseconds="
				+ sqlCalls_TotalElapsedTime_Milliseconds + ", sqlCallCount=" + sqlCallCount + ", totalRecords="
				+ totalRecords + "]";
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
	public String getTable_names() {
		return table_names;
	}
	public void setTable_names(String table_names) {
		this.table_names = table_names;
	}
	public Importer_Stats_PerTable_Table__SqlManipulationType_Values_Enum getTableManipulationType() {
		return tableManipulationType;
	}
	public void setTableManipulationType(
			Importer_Stats_PerTable_Table__SqlManipulationType_Values_Enum tableManipulationType) {
		this.tableManipulationType = tableManipulationType;
	}
	public long getSqlCalls_TotalElapsedTime_Milliseconds() {
		return sqlCalls_TotalElapsedTime_Milliseconds;
	}
	public void setSqlCalls_TotalElapsedTime_Milliseconds(long sqlCalls_TotalElapsedTime_Milliseconds) {
		this.sqlCalls_TotalElapsedTime_Milliseconds = sqlCalls_TotalElapsedTime_Milliseconds;
	}

	public int getSqlCallCount() {
		return sqlCallCount;
	}

	public void setSqlCallCount(int sqlCallCount) {
		this.sqlCallCount = sqlCallCount;
	}
	public int getTotalRecords() {
		return totalRecords;
	}
	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
	}
}
