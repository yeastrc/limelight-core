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
package org.yeastrc.limelight.limelight_webapp.searchers_results;

import org.yeastrc.limelight.limelight_shared.dto.AnnotationDataBaseDTO;

/**
 * table psm_annotation
 *
 */
public class PsmAnnotationDTO extends AnnotationDataBaseDTO {

	private long psmId;

//	
//	@Override
//	public String toString() {
//		return "PsmAnnotationDTO [id=" + id + ", psmId=" + psmId
//				+ ", filterableDescriptiveAnnotationType="
//				+ filterableDescriptiveAnnotationType + ", annotationTypeId="
//				+ annotationTypeId + ", valueDouble=" + valueDouble
//				+ ", valueString=" + valueString + "]";
//	}

	public long getPsmId() {
		return psmId;
	}
	public void setPsmIdss(long psmId) {
		this.psmId = psmId;
	}
}