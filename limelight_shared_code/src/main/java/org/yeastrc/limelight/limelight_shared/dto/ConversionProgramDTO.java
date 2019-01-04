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
package org.yeastrc.limelight.limelight_shared.dto;

import java.util.Date;

/**
 * table conversion_program_tbl
 *
 */
public class ConversionProgramDTO {

	private int id;
	private int searchId;
	private String name;
	private String version;
	private Date conversionDate;
	private String pgmArguments;
	private String pgmURI;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public Date getConversionDate() {
		return conversionDate;
	}
	public void setConversionDate(Date conversionDate) {
		this.conversionDate = conversionDate;
	}
	public String getPgmArguments() {
		return pgmArguments;
	}
	public void setPgmArguments(String pgmArguments) {
		this.pgmArguments = pgmArguments;
	}
	public String getPgmURI() {
		return pgmURI;
	}
	public void setPgmURI(String pgmURI) {
		this.pgmURI = pgmURI;
	}
	
}
