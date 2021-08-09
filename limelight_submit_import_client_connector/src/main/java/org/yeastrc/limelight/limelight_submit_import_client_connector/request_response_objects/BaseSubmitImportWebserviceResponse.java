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
package org.yeastrc.limelight.limelight_submit_import_client_connector.request_response_objects;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;

/**
 * Base class for all Webservice Response Classes 
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
public abstract class BaseSubmitImportWebserviceResponse {

	// Properties as XML attributes

	@XmlAttribute
	private boolean statusSuccess;

	@XmlAttribute
	private String statusFail_ErrorMessage;  //  Displayed by Submit Import program instead of looking at the returned boolean flags

	public boolean isStatusSuccess() {
		return statusSuccess;
	}

	public void setStatusSuccess(boolean statusSuccess) {
		this.statusSuccess = statusSuccess;
	}

	public String getStatusFail_ErrorMessage() {
		return statusFail_ErrorMessage;
	}

	public void setStatusFail_ErrorMessage(String statusFail_ErrorMessage) {
		this.statusFail_ErrorMessage = statusFail_ErrorMessage;
	}
}
