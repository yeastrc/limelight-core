/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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
package org.yeastrc.limelight.limelight_importer.pre_validate_xml;

import java.util.List;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProtein;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteins;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;

/**
 * Validate the Peptide and Matched Protein Sequences are valid Characters.
 * 
 * Duplicate check in XSD to remove from XSD due to performance issues.
 *
 */
public class ValidateReportedPeptideMatchedProteins_SequencesAreValidCharacters {

	private static final Logger log = LoggerFactory.getLogger( ValidateReportedPeptideMatchedProteins_SequencesAreValidCharacters.class );
	
	private ValidateReportedPeptideMatchedProteins_SequencesAreValidCharacters() { }
	public static ValidateReportedPeptideMatchedProteins_SequencesAreValidCharacters getInstance() {
		return new ValidateReportedPeptideMatchedProteins_SequencesAreValidCharacters();
	}
	
	 Pattern regexPatter_AtoZ = Pattern.compile("[A-Z]+");
	 
	/**
	 * Validate the Peptide and Matched Protein Sequences are valid Characters.
	 * 
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	public void validateReportedPeptideMatchedProteins_SequencesAreValidCharacters( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		reportedPeptides_ValidateSequences( limelightInput );
				
		matchedProteins_ValidateSequences( limelightInput );
	}

	/**
	 * 
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private void reportedPeptides_ValidateSequences( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		if ( reportedPeptides != null ) {
			List<ReportedPeptide> reportedPeptideList =
					reportedPeptides.getReportedPeptide();
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {
				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					

					if ( ! isSequenceValid( reportedPeptide.getSequence() ) ) {
						String msg = "The the 'sequence' attribute on <reported_peptide> element contains invalid characters.  Only valid characters are A-Z.  sequence: "
								+  reportedPeptide.getSequence();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
						
					}
				}
			}
		}
	}


	//////////////////////////////////
	
	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException
	 */
	private void matchedProteins_ValidateSequences( LimelightInput limelightInput ) throws LimelightImporterDataException {


		//  Validate that all matchedProteinForPeptide_IDs_InAllReportedPeptides are found in matched proteins
		
		MatchedProteins matchedProteins = limelightInput.getMatchedProteins();
		if ( matchedProteins == null ) {
			String msg = "<matched_proteins> not in file";
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		List<MatchedProtein> matchedProteinList = matchedProteins.getMatchedProtein();
		if ( matchedProteinList == null ) {
			String msg = "<matched_proteins> not in file";
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		if ( matchedProteinList.isEmpty() ) {
			String msg = "<matched_proteins> is empty";
			log.error( msg );
			throw new LimelightImporterDataException(msg);
		}
		
		for ( MatchedProtein matchedProtein : matchedProteinList ) {
			
			if ( ! isSequenceValid( matchedProtein.getSequence() ) ) {
				String msg = "The the 'sequence' attribute on <matched_protein> element contains invalid characters.  Only valid characters are A-Z.  sequence: "
						+  matchedProtein.getSequence();
				log.error( msg );
				throw new LimelightImporterDataException(msg);
				
			}
		}
	}

	/**
	 * @param sequence
	 * @return
	 */
	private boolean isSequenceValid( String sequence ) {
		
		if ( regexPatter_AtoZ.matcher( sequence ).matches() ) {
			return true;
		}
		return false;
		
	}
	
	 
	 //  Quick Test
	 
//	 public static void main(String[] args) throws Exception {
//
//
//		 if ( ValidateReportedPeptideMatchedProteins_SequencesAreValidCharacters.getInstance().isSequenceValid( "A") ) {
//			 System.out.println( "A is valid");
//		 } else {
//			 System.out.println( "A is NOT valid");
//		 }
//
//		 if ( ValidateReportedPeptideMatchedProteins_SequencesAreValidCharacters.getInstance().isSequenceValid( "3") ) {
//			 System.out.println( "3 is valid");
//		 } else {
//			 System.out.println( "3 is NOT valid");
//		 }
//
//		 if ( ValidateReportedPeptideMatchedProteins_SequencesAreValidCharacters.getInstance().isSequenceValid( "") ) {
//			 System.out.println( "Empty String is valid");
//		 } else {
//			 System.out.println( "Empty String is NOT valid");
//		 }
//	 }
	
	
}
