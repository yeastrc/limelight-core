package org.yeastrc.limelight.limelight_webapp.searchers_results;

/**
 * Result from Project_Note_List_ForProjectIdSearcher
 *
 */
public class Project_Note_List_ForProjectId_Item {

	private int id;
	private Integer userIdCreated;
	private String noteText;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Integer getUserIdCreated() {
		return userIdCreated;
	}
	public void setUserIdCreated(Integer userIdCreated) {
		this.userIdCreated = userIdCreated;
	}
	public String getNoteText() {
		return noteText;
	}
	public void setNoteText(String noteText) {
		this.noteText = noteText;
	}
}
