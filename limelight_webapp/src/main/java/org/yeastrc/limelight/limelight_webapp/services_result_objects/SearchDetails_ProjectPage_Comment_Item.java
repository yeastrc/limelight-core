package org.yeastrc.limelight.limelight_webapp.services_result_objects;

/**
 * Result Item from Get_SearchDetails_ProjectPage_For_ProjectSearchIds_Service
 *
 * List per Project Search Id
 */
public class SearchDetails_ProjectPage_Comment_Item {

	private int id;
	private String commentText;
	private String commentDate;
	private boolean canEdit;
	private boolean canDelete;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCommentText() {
		return commentText;
	}
	public void setCommentText(String commentText) {
		this.commentText = commentText;
	}
	public String getCommentDate() {
		return commentDate;
	}
	public void setCommentDate(String commentDate) {
		this.commentDate = commentDate;
	}
	public boolean isCanEdit() {
		return canEdit;
	}
	public void setCanEdit(boolean canEdit) {
		this.canEdit = canEdit;
	}
	public boolean isCanDelete() {
		return canDelete;
	}
	public void setCanDelete(boolean canDelete) {
		this.canDelete = canDelete;
	} 

}
