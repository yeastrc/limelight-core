package org.yeastrc.limelight.limelight_shared.dto;

import java.util.Date;

/**
 * Table project_search__comment_tbl
 *
 */
public class ProjectSearchCommentDTO {

	private int id;
	private int projectSearchId;
	private String commentText;
	private Integer userIdCreated;
	private Integer userIdLastUpdated;
	private Date timestampLastUpdated;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getProjectSearchId() {
		return projectSearchId;
	}
	public void setProjectSearchId(int projectSearchId) {
		this.projectSearchId = projectSearchId;
	}
	public String getCommentText() {
		return commentText;
	}
	public void setCommentText(String commentText) {
		this.commentText = commentText;
	}
	public Integer getUserIdCreated() {
		return userIdCreated;
	}
	public void setUserIdCreated(Integer userIdCreated) {
		this.userIdCreated = userIdCreated;
	}
	public Integer getUserIdLastUpdated() {
		return userIdLastUpdated;
	}
	public void setUserIdLastUpdated(Integer userIdLastUpdated) {
		this.userIdLastUpdated = userIdLastUpdated;
	}
	public Date getTimestampLastUpdated() {
		return timestampLastUpdated;
	}
	public void setTimestampLastUpdated(Date timestampLastUpdated) {
		this.timestampLastUpdated = timestampLastUpdated;
	}
	
}
