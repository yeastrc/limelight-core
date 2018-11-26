package org.yeastrc.limelight.limelight_webapp.services_result_objects;

/**
 * Result Item from Get_SearchDetails_ProjectPage_For_ProjectSearchIds_Service
 *
 * List per Project Search Id
 */
public class SearchDetails_ProjectPage_SearchFile_Item {

	private int id;
	private String name;
	private boolean canEdit; 

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public boolean isCanEdit() {
		return canEdit;
	}
	public void setCanEdit(boolean canEdit) {
		this.canEdit = canEdit;
	}
}
