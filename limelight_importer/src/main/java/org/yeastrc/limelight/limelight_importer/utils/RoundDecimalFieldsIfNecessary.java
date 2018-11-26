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

import org.yeastrc.limelight.limelight_importer.constants.DecimalFieldRoundingConstants;

/**
 * Rounds a value if necessary to fit in database DECIMAL(18,9)
 *
 */
public class RoundDecimalFieldsIfNecessary {

	/**
	 * Rounds the field value if necessary to fit in database DECIMAL(18,9)
	 * 
	 * @param retentionTime
	 * @return
	 */
	public static BigDecimal roundDecimalFieldsIfNecessary( BigDecimal retentionTime ) {

		if ( retentionTime == null ) {
			return retentionTime;
		}

		if ( retentionTime.scale()  > DecimalFieldRoundingConstants.DECIMAL_FIELD_VALUE_MAX_SCALE ) {
			
			retentionTime =
					retentionTime.setScale( 
							DecimalFieldRoundingConstants.DECIMAL_FIELD_VALUE_MAX_SCALE, 
							RoundingMode.HALF_UP );
		}
		
		return retentionTime;
	}

}
