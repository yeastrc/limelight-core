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

import java.security.SecureRandom;

import org.springframework.stereotype.Component;

/**
 * Generate a Random String for Invite Code, Forgot Password Code, Submit Import Key (truncated),  Download File code. 
 *
 * These codes act as security tokens (password reset codes, project invite codes,
 * Submit Import codes, download identifiers) so the randomness MUST be cryptographically
 * secure.  Use SecureRandom - NOT Math.random()/System.currentTimeMillis(), which are predictable.
 */
@Component
public class GenerateRandomStringForCode implements GenerateRandomStringForCodeIF {

	private static final int minKeyLength = 62;
	private static final int maxKeyLength = 65;

	/**
	 *  Alphabet of allowed characters: digits 0-9 plus lower case consonants.
	 *
	 *  Vowels ( a e i o u y ) are excluded so codes cannot spell words.
	 *  Lower case 'l' and upper case 'I' are excluded since they look alike in many fonts.
	 *  Number 0 is excluded since can look like upper case 'O'.
	 *  Number 1 is excluded since can look like lower case 'l'.
	 *  Removed more letters and added capitol letters.
	 *  All characters are URL / email safe (codes are placed in links).
	 */
	private static final char[] ALLOWED_CHARS =
			"23456789bcdfghjkmnpqrstxBCDFGHJKMNPRSTX".toCharArray();

	private static final SecureRandom secureRandom = new SecureRandom();

	/**
	 * Generate random string in length between minKeyLength and maxKeyLength
	 * @return
	 */
	@Override
	public String generateRandomStringForCode() {

		//  Length uniformly in [ minKeyLength, maxKeyLength ]
		int outputKeyLength = minKeyLength + secureRandom.nextInt( maxKeyLength - minKeyLength + 1 );

		StringBuilder randomStringSB = new StringBuilder( outputKeyLength );

		for ( int i = 0; i < outputKeyLength; i++ ) {
			//  nextInt( bound ) is unbiased so each allowed character is equally likely
			randomStringSB.append( ALLOWED_CHARS[ secureRandom.nextInt( ALLOWED_CHARS.length ) ] );
		}

		return randomStringSB.toString();
	}
}
