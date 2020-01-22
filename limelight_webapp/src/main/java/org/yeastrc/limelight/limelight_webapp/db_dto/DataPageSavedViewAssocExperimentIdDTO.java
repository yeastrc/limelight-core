package org.yeastrc.limelight.limelight_webapp.db_dto;

/**
 * table data_page_saved_view_assoc_experiment_id_tbl
 *
 */
public class DataPageSavedViewAssocExperimentIdDTO {

	private int id;
	private int assocMainId;
	private int experimentId;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getAssocMainId() {
		return assocMainId;
	}
	public void setAssocMainId(int assocMainId) {
		this.assocMainId = assocMainId;
	}
	public int getExperimentId() {
		return experimentId;
	}
	public void setExperimentId(int experimentId) {
		this.experimentId = experimentId;
	}

}
