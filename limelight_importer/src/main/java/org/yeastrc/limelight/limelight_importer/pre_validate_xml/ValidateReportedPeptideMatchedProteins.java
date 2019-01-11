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

import java.math.BigInteger;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProtein;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteinForPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteins;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteinsForPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;

/**
 * Validate "matched_protein_for_peptide" on reported_peptide all populated or not.
 * Validate "matched_protein_for_peptide" 'id' are all found in 'matched_protein' entries
 *
 */
public class ValidateReportedPeptideMatchedProteins {

	private static final Logger log = LoggerFactory.getLogger( ValidateReportedPeptideMatchedProteins.class );
	
	private ValidateReportedPeptideMatchedProteins() { }
	public static ValidateReportedPeptideMatchedProteins getInstance() {
		return new ValidateReportedPeptideMatchedProteins();
	}
	
	
	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	public void validateReportedPeptideMatchedProteins( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		//  Validate "matched_protein_for_peptide" on reported_peptide all populated or not.
		//  Validate "matched_protein_for_peptide" 'id' are all found in 'matched_protein' entries

		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		
		if ( reportedPeptides != null ) {
			
			List<ReportedPeptide> reportedPeptideList =	reportedPeptides.getReportedPeptide();
			
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {
				
				Set<BigInteger> matchedProteinForPeptide_IDs_InAllReportedPeptides = 
						reportedPeptides_All_Get_MatchedProteinForPeptide_IDs_AndValidate( limelightInput );
				
				if ( ! matchedProteinForPeptide_IDs_InAllReportedPeptides.isEmpty() ) {
					
					validateAll_MatchedProteinForPeptide_IDs_In_MatchedProteins( matchedProteinForPeptide_IDs_InAllReportedPeptides, limelightInput );
				}
			}
		}
	}

	/**
	 * All "reported_peptide" contains "matched_protein_for_peptide"
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private Set<BigInteger> reportedPeptides_All_Get_MatchedProteinForPeptide_IDs_AndValidate( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		boolean firstReportedPeptide = true;
		
		boolean reportedPeptides_Contain_matchedProteinForPeptide = false;
		
		Set<BigInteger> matchedProteinForPeptide_IDs_InAllReportedPeptides = new HashSet<>();
		
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		if ( reportedPeptides != null ) {
			List<ReportedPeptide> reportedPeptideList =
					reportedPeptides.getReportedPeptide();
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {
				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					boolean found_matchedProteinsForPeptide_IDs = 
							get_matchedProteinsForPeptide_IDs_On_SingleReportedPeptide( matchedProteinForPeptide_IDs_InAllReportedPeptides, reportedPeptide );
					if ( firstReportedPeptide ) {
						firstReportedPeptide = false;
						reportedPeptides_Contain_matchedProteinForPeptide = found_matchedProteinsForPeptide_IDs;
					} else {
						if ( reportedPeptides_Contain_matchedProteinForPeptide != found_matchedProteinsForPeptide_IDs ) {
							
							//  Current reportedPeptides_Contain_matchedProteinForPeptide not match previous found_matchedProteinsForPeptide_IDs
							
							String msg = "All <reported_peptide> entries must all have <matched_protein_for_peptide> or All <reported_peptide> entries must all NOT have <matched_protein_for_peptide>.  Found at least one of each.";
							log.error( msg );
							throw new LimelightImporterDataException(msg);
						}
					}
				}
			}
		}
		
		return matchedProteinForPeptide_IDs_InAllReportedPeptides;
	}

	/**
	 * @param reportedPeptide
	 * @throws LimelightImporterDataException
	 */
	private boolean get_matchedProteinsForPeptide_IDs_On_SingleReportedPeptide( Set<BigInteger> matchedProteinForPeptide_IDs_InAllReportedPeptides, ReportedPeptide reportedPeptide ) throws LimelightImporterDataException {
		
		MatchedProteinsForPeptide matchedProteinsForPeptide = reportedPeptide.getMatchedProteinsForPeptide();
		if ( matchedProteinsForPeptide == null ) {
			// Reported Peptide NOT contains "matched_protein_for_peptide"
			return false; // EARLY RETURN
		}

		List<MatchedProteinForPeptide> matchedProteinForPeptideList = matchedProteinsForPeptide.getMatchedProteinForPeptide();
		if ( matchedProteinForPeptideList.isEmpty() ) {
			// Reported Peptide NOT contains "matched_protein_for_peptide"
			return false; // EARLY RETURN
		}
		
		Set<BigInteger> matchedProteinForPeptide_IDs_This_ReportedPeptide = new HashSet<>();
		
		// Add in matchedProteinForPeptide.getId() for this reported peptide
		for ( MatchedProteinForPeptide matchedProteinForPeptide : matchedProteinForPeptideList ) {
			BigInteger matchedProteinId = matchedProteinForPeptide.getId();
			if ( matchedProteinId == null ) {
				String msg = "<matched_protein_for_peptide> 'id' attribute is missing. "
						+ "Processing Peptide with sequence: "
						+ reportedPeptide.getSequence()
						+ ", reported peptide string: "
						+ reportedPeptide.getReportedPeptideString();
				log.error( msg );
				throw new LimelightImporterDataException( msg );
			}
			
			//  Optional validation (Currently allowing duplicates). Duplicates handled where processed
			
//			if ( ! matchedProteinForPeptide_IDs_This_ReportedPeptide.add( matchedProteinId ) ) {
//				// Duplicate matchedProteinId on this Reported Peptide
//				String msg = "<matched_protein_for_peptide> 'id' attribute is duplicate within this <reported_peptide>. id: "
//						+ matchedProteinId
//						+ ".  Processing Peptide with sequence: "
//						+ reportedPeptide.getSequence()
//						+ ", reported peptide string: "
//						+ reportedPeptide.getReportedPeptideString();
//				log.error( msg );
//				throw new LimelightImporterDataException( msg );
//			}
			
			matchedProteinForPeptide_IDs_InAllReportedPeptides.add( matchedProteinForPeptide.getId() );
		}
		
		return true;
	}

	//////////////////////////////////
	
	private void validateAll_MatchedProteinForPeptide_IDs_In_MatchedProteins( Set<BigInteger> matchedProteinForPeptide_IDs_InAllReportedPeptides, LimelightInput limelightInput ) throws LimelightImporterDataException {


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
			
			BigInteger matchedProteinId = matchedProtein.getId();
			if ( matchedProteinId == null ) {
				String msg = "Found <matched_protein_for_peptide> so every <matched_protein> must have an 'id' attribute.";
				log.error( msg );
				throw new LimelightImporterDataException(msg);
			}
			
			if ( ! matchedProteinForPeptide_IDs_InAllReportedPeptides.remove( matchedProteinId ) ) {
				
			}
		}
		
		if ( ! matchedProteinForPeptide_IDs_InAllReportedPeptides.isEmpty() ) {
			String msg = "The following 'id' attribute values on <matched_protein_for_peptide> elements were not found in the 'id' attribute on <matched_protein> elements: "
					+ matchedProteinForPeptide_IDs_InAllReportedPeptides;
			log.error( msg );
			throw new LimelightImporterDataException(msg);
			
		}
	}


		

}
