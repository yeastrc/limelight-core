package org.yeastrc.limelight.limelight_feature_detection_run_import.dto;

/**
 * table project_tbl
 *
 */
public class ProjectDTO_Partial {

	private int id;

	private boolean enabled;
	private boolean markedForDeletion;
	
	private boolean projectLocked;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public boolean isMarkedForDeletion() {
		return markedForDeletion;
	}

	public void setMarkedForDeletion(boolean markedForDeletion) {
		this.markedForDeletion = markedForDeletion;
	}

	public boolean isProjectLocked() {
		return projectLocked;
	}

	public void setProjectLocked(boolean projectLocked) {
		this.projectLocked = projectLocked;
	}
}
