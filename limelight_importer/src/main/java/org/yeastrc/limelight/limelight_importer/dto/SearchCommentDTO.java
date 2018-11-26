/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_importer.dto;

/**
 * table search_comment_tbl for Importer
 *
 */
public class SearchCommentDTO {

	private String comment;
	private int projectSearchid;
	private Integer userId;
	
	private int id;

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int getProjectSearchid() {
		return projectSearchid;
	}

	public void setProjectSearchid(int projectSearchid) {
		this.projectSearchid = projectSearchid;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer authUserId) {
		this.userId = authUserId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}
