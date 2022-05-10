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
package org.yeastrc.limelight.limelight_shared.dto;


/**
 * table search_psm_id_range_tbl
 * 
 * PSM Id range in psm_tbl. Only populated if PSM Ids for search are sequential
 *
 */
public class SearchPsmIdRangeDTO {
	
	private int searchId;
	private long psmIdRange_Start;
	private long psmIdRange_End;

	@Override
	public String toString() {
		return "SearchPsmIdRangeDTO [searchId=" + searchId + ", psmIdRange_Start=" + psmIdRange_Start
				+ ", psmIdRange_End=" + psmIdRange_End + "]";
	}
	
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public long getPsmIdRange_Start() {
		return psmIdRange_Start;
	}
	public void setPsmIdRange_Start(long psmIdRange_Start) {
		this.psmIdRange_Start = psmIdRange_Start;
	}
	public long getPsmIdRange_End() {
		return psmIdRange_End;
	}
	public void setPsmIdRange_End(long psmIdRange_End) {
		this.psmIdRange_End = psmIdRange_End;
	}
	
}
