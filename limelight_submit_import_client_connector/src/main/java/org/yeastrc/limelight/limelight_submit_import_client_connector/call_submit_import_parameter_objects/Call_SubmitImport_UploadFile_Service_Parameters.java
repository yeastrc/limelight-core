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
package org.yeastrc.limelight.limelight_submit_import_client_connector.call_submit_import_parameter_objects;

import java.io.File;

import org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects.SubmitImport_UploadFile_Request_Common;

/**
 * Parameters to CallSubmitImportWebservice::call_SubmitImport_UploadFile_Service method
 *
 */
public class Call_SubmitImport_UploadFile_Service_Parameters {

	private SubmitImport_UploadFile_Request_Common webserviceRequest;
	private File uploadFile;
	
	public File getUploadFile() {
		return uploadFile;
	}
	public void setUploadFile(File uploadFile) {
		this.uploadFile = uploadFile;
	}
	public SubmitImport_UploadFile_Request_Common getWebserviceRequest() {
		return webserviceRequest;
	}
	public void setWebserviceRequest(SubmitImport_UploadFile_Request_Common webserviceRequest) {
		this.webserviceRequest = webserviceRequest;
	}
}
