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
package org.yeastrc.limelight.limelight_importer.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;

import org.yeastrc.limelight.limelight_shared.constants.ReporterIon_Constants;

/**
 * Rounds a Reporter Ion Mass value if necessary to fit in database DECIMAL(11,6)
 *
 */
public class ReporterIonMass_Round_IfNecessary {

	/**
	 * Rounds the Reporter Ion Mass value if necessary to fit in database DECIMAL(11,6)
	 * 
	 * @param reporterIonMass
	 * @return
	 */
	public static BigDecimal reporterIonMass_Round_IfNecessary( BigDecimal reporterIonMass ) {

		if ( reporterIonMass == null ) {
			return reporterIonMass;
		}

		if ( reporterIonMass.scale()  > ReporterIon_Constants.REPORTER_ION_MASS_MAX_DIGITS_ROUND_TO_RIGHT_OF_DECIMAL_POINT ) {
			
			reporterIonMass =
					reporterIonMass.setScale( 
							ReporterIon_Constants.REPORTER_ION_MASS_MAX_DIGITS_ROUND_TO_RIGHT_OF_DECIMAL_POINT, 
							RoundingMode.HALF_UP );
		}
		
		return reporterIonMass;
	}

}
