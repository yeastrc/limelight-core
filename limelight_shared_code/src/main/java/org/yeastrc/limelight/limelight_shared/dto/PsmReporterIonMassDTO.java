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

import java.math.BigDecimal;

/**
 * table psm_reporter_ion_mass_tbl
 *
 */
public class PsmReporterIonMassDTO {

	private long id;
	private long psmId;
	private BigDecimal reporterIonMass;

	@Override
	public String toString() {
		return "PsmReporterIonMassDTO [id=" + id + ", psmId=" + psmId + ", reporterIonMass=" + reporterIonMass + "]";
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getPsmId() {
		return psmId;
	}
	public void setPsmId(long psmId) {
		this.psmId = psmId;
	}
	public BigDecimal getReporterIonMass() {
		return reporterIonMass;
	}
	public void setReporterIonMass(BigDecimal reporterIonMass) {
		this.reporterIonMass = reporterIonMass;
	}

}
