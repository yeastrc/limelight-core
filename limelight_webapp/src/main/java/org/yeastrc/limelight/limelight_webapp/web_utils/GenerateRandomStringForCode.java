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
package org.yeastrc.limelight.limelight_webapp.web_utils;

import org.springframework.stereotype.Component;

/**
 * Generate a Random String for Public Access Code and Invite Code
 *
 */
@Component
public class GenerateRandomStringForCode implements GenerateRandomStringForCodeIF {

	private static final int minKeyLength = 62;
	private static final int maxKeyLength = 65;
	private static final int minMaxKeyLengthDiff = maxKeyLength - minKeyLength;

	/**
	 * Generate random string in length between minKeyLength and maxKeyLength
	 * @return
	 */
	@Override
	public String generateRandomStringForCode() {

		int outputKeyLength = minKeyLength + (int) ( minMaxKeyLengthDiff * Math.random() );
		if ( outputKeyLength > maxKeyLength ) {
			outputKeyLength = maxKeyLength;
		}
		StringBuilder randomStringSB = new StringBuilder( maxKeyLength * 2 );
		while ( true ) {
			double tosKeyMultiplier = Math.random();
			if ( tosKeyMultiplier < 0.5 ) {
				tosKeyMultiplier += 0.5;
			}
			long tosKeyLong = (long) ( System.currentTimeMillis() * tosKeyMultiplier );

			//  Convert to chars using digits and alpha chars a-y
			String encodedLong = Long.toString(tosKeyLong, 35);

			// Drop first 6 characters and last character
			String encodedLongExtract = encodedLong.substring( 6, encodedLong.length() - 1 );
			randomStringSB.append( encodedLongExtract );
			
			if ( randomStringSB.length() >= outputKeyLength ) {
				break;
			}
		}
		
		String randomString = randomStringSB.substring( 0, outputKeyLength );
		
		return randomString;
	}
}
