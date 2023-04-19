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
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao;

import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;

/**
 * @author danj
 *
 */
public interface FileImportTrackingDAO_IF {
	
	FileImportTrackingDTO getForId( int id ) throws Exception;

	/**
	 * @param item
	 */
	public void save( FileImportTrackingDTO item );
	
	/**
	 * @param item
	 */
	void set_FieldsUpdatedInSubmit_ForId( FileImportTrackingDTO item );
	
	/**
	 * @param remote_user_ip_address_submit
	 * @param submit_request_url
	 * @param id
	 */
	void set_Status_Queued_Submitted_ForId( String remote_user_ip_address_submit, String submit_request_url, int id );
		
	
	/**
	 * @param id
	 * @param status_ToExclude - Do NOT update if has this status
	 * @param deletedByUserId
	 * @throws Exception
	 */
	public void setMarkedForDeletionForId_ExcludingStatus( 
			int id, FileImportStatus status_ToExclude,  int deletedByUserId ) throws Exception;

}