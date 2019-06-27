/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_webapp.objects;

import java.util.ArrayList;
import java.util.List;

/**
 * A folder and it's searches to display on the project page
 *
 */
public class ProjectPageSingleFolder {
	
	private int id;
	private String folderName;
	private List<SearchItemMinimal> searches;

	public void addSearchWrapper( SearchItemMinimal searchWrapper ) {
		if ( searches == null ) {
			searches = new ArrayList<>();
		}
		searches.add( searchWrapper );
	}
	
	public List<SearchItemMinimal> getSearches() {
		return searches;
	}
	public void setSearches(List<SearchItemMinimal> searches) {
		this.searches = searches;
	}
	public String getFolderName() {
		return folderName;
	}
	public void setFolderName(String folderName) {
		this.folderName = folderName;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

}
