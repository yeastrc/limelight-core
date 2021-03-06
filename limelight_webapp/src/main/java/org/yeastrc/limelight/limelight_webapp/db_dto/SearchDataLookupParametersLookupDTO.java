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
package org.yeastrc.limelight.limelight_webapp.db_dto;

import org.yeastrc.limelight.limelight_shared.enum_classes.SearchDataLookupParametersLookupRootIdTypes;
import org.yeastrc.limelight.limelight_shared.enum_classes.SearchDataLookupParametersLookup_CreatedByUserType;

/**
 * table search_data_lookup_parameters
 *
 */
public class SearchDataLookupParametersLookupDTO {

	private int id;
	private String hashOfMainParams;
	private int hashCollisionIndex;
	
	private SearchDataLookupParametersLookupRootIdTypes rootIdType;
	private String rootIdsOnlyJSON;
	private String lookupParametersJSONMainData;
	
	/**
	 * Version Number in lookupParametersJSONMainData
	 */
	private int versionNumber;
	
	private Integer createdByUserId;
	private SearchDataLookupParametersLookup_CreatedByUserType createdByUserType;

	private String createdByRemoteIP;
	

	@Override
	public String toString() {
		return "SearchDataLookupParametersLookupDTO [id=" + id + ", hashOfMainParams=" + hashOfMainParams
				+ ", hashCollisionIndex=" + hashCollisionIndex + ", rootIdType=" + rootIdType + ", rootIdsOnlyJSON="
				+ rootIdsOnlyJSON + ", lookupParametersJSONMainData=" + lookupParametersJSONMainData
				+ ", versionNumber=" + versionNumber + ", createdByUserId=" + createdByUserId + ", createdByUserType="
				+ createdByUserType + ", createdByRemoteIP=" + createdByRemoteIP + "]";
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getHashOfMainParams() {
		return hashOfMainParams;
	}
	public void setHashOfMainParams(String hashOfMainParams) {
		this.hashOfMainParams = hashOfMainParams;
	}
	public int getHashCollisionIndex() {
		return hashCollisionIndex;
	}
	public void setHashCollisionIndex(int hashCollisionIndex) {
		this.hashCollisionIndex = hashCollisionIndex;
	}
	public String getRootIdsOnlyJSON() {
		return rootIdsOnlyJSON;
	}
	public void setRootIdsOnlyJSON(String rootIdsOnlyJSON) {
		this.rootIdsOnlyJSON = rootIdsOnlyJSON;
	}
	public String getLookupParametersJSONMainData() {
		return lookupParametersJSONMainData;
	}
	public void setLookupParametersJSONMainData(String lookupParametersJSONMainData) {
		this.lookupParametersJSONMainData = lookupParametersJSONMainData;
	}
	public Integer getCreatedByUserId() {
		return createdByUserId;
	}
	public void setCreatedByUserId(Integer createdByUserId) {
		this.createdByUserId = createdByUserId;
	}
	public SearchDataLookupParametersLookup_CreatedByUserType getCreatedByUserType() {
		return createdByUserType;
	}
	public void setCreatedByUserType(SearchDataLookupParametersLookup_CreatedByUserType createdByUserType) {
		this.createdByUserType = createdByUserType;
	}
	public String getCreatedByRemoteIP() {
		return createdByRemoteIP;
	}
	public void setCreatedByRemoteIP(String createdByRemoteIP) {
		this.createdByRemoteIP = createdByRemoteIP;
	}
	public SearchDataLookupParametersLookupRootIdTypes getRootIdType() {
		return rootIdType;
	}
	public void setRootIdType(SearchDataLookupParametersLookupRootIdTypes rootIdType) {
		this.rootIdType = rootIdType;
	}
	public int getVersionNumber() {
		return versionNumber;
	}
	public void setVersionNumber(int versionNumber) {
		this.versionNumber = versionNumber;
	}
}
