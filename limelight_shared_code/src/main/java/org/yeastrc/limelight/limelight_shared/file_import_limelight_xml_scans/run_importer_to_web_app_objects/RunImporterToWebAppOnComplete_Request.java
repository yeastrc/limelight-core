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
package org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.run_importer_to_web_app_objects;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 
 *
 */
@XmlRootElement(name="runImporterToWebAppOnComplete_Request")
@XmlAccessorType(XmlAccessType.FIELD)
public class RunImporterToWebAppOnComplete_Request {

	@XmlAttribute
	private Integer trackingId;
	@XmlAttribute
	private Integer runId;
	
	/**
	 * Garbage variable that has to be guessed
	 */
	@XmlAttribute
	private Boolean sdFSOdsjaklOWQJLwuiroKXLNOuwoincvnio;
	
	public Integer getTrackingId() {
		return trackingId;
	}
	public void setTrackingId(Integer trackingId) {
		this.trackingId = trackingId;
	}
	public Integer getRunId() {
		return runId;
	}
	public void setRunId(Integer runId) {
		this.runId = runId;
	}
	public Boolean getSdFSOdsjaklOWQJLwuiroKXLNOuwoincvnio() {
		return sdFSOdsjaklOWQJLwuiroKXLNOuwoincvnio;
	}
	public void setSdFSOdsjaklOWQJLwuiroKXLNOuwoincvnio(Boolean sdFSOdsjaklOWQJLwuiroKXLNOuwoincvnio) {
		this.sdFSOdsjaklOWQJLwuiroKXLNOuwoincvnio = sdFSOdsjaklOWQJLwuiroKXLNOuwoincvnio;
	}
}
