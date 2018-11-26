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

import java.util.regex.Pattern;

/**
 * Get the Petide or Protein sequence used for string matches between peptide and protein sequences
 * 
 * This is done since I and L have same mass and thus for Peptide identification from Mass Spec they are interchangable
 * 
 * Replacing I and L with J is sort of a standard and J is currently not a residue letter
 *
 */
public class PeptideProteinSequenceForProteinInference {

//	private static final Logger log = Logger.getLogger(PeptideProteinSequenceForProteinInference.class);
	
	private static final String REPLACE_I_L_SEARCH_REGEX = "[IL]";
	private static final String REPLACE_I_L_REPLACEMENT_STRING_J = "J";
	
	private static final PeptideProteinSequenceForProteinInference instance = new PeptideProteinSequenceForProteinInference();
	
	Pattern replaceIL_SearchPatter;
	
	//  private constructor
	private PeptideProteinSequenceForProteinInference() { 
		replaceIL_SearchPatter = Pattern.compile( REPLACE_I_L_SEARCH_REGEX );
	}
	public static PeptideProteinSequenceForProteinInference getSingletonInstance() { return instance; }

	/**
	 * @param initialPeptideOrProteinSequence
	 * @return
	 */
	public String convert_PeptideOrProtein_SequenceFor_I_L_Equivalence_ChangeTo_J ( String initialPeptideOrProteinSequence ) {
		
		String result =	replaceIL_SearchPatter.matcher(initialPeptideOrProteinSequence).replaceAll( REPLACE_I_L_REPLACEMENT_STRING_J );
		return result;
	}
}
