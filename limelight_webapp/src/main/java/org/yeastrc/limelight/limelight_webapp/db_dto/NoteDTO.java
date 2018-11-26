package org.yeastrc.limelight.limelight_webapp.db_dto;

/**
 * table note_tbl
 *
 */
public class NoteDTO {

	private int id;
	private int projectId;
	private int userIdCreated;
	private int userIdLastUpdated;
	private String noteText;
	
	@Override
	public String toString() {
		return "NoteDTO [id=" + id + ", projectId=" + projectId + ", userIdCreated=" + userIdCreated
				+ ", userIdLastUpdated=" + userIdLastUpdated + ", noteText=" + noteText + "]";
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getProjectId() {
		return projectId;
	}
	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}
	public int getUserIdCreated() {
		return userIdCreated;
	}
	public void setUserIdCreated(int userIdCreated) {
		this.userIdCreated = userIdCreated;
	}
	public int getUserIdLastUpdated() {
		return userIdLastUpdated;
	}
	public void setUserIdLastUpdated(int userIdLastUpdated) {
		this.userIdLastUpdated = userIdLastUpdated;
	}
	public String getNoteText() {
		return noteText;
	}
	public void setNoteText(String noteText) {
		this.noteText = noteText;
	}

	
}
