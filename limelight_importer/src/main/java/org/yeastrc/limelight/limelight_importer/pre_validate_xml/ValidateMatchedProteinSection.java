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
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteinLabel;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteins;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.utils.ProteinAnnotationNameTruncationUtil;

/**
 * 
 *
 */
public class ValidateMatchedProteinSection {

	private static final Logger log = LoggerFactory.getLogger( ValidateMatchedProteinSection.class );
	
	private ValidateMatchedProteinSection() { }
	public static ValidateMatchedProteinSection getInstance() {
		return new ValidateMatchedProteinSection();
	}
	
	
	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	public void validateMatchedProteinSection( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		//  Validate that all protein annotation names are unique
		
		Set<String> proteinLabelNames = new HashSet<>();

		//  Validate that all protein 'id' are populated or not and have different values

		boolean firstMatchedProtein = true;
		
		boolean matchedProteinsContainIdAttribute = false;
		
		Set<BigInteger> matchedProteinIDs = new HashSet<>();
		
		
		MatchedProteins matchedProteins = limelightInput.getMatchedProteins();
		if ( matchedProteins == null ) {
			return;  //  TODO  maybe throw exception
		}
		List<MatchedProtein> matchedProteinList = matchedProteins.getMatchedProtein();
		if ( matchedProteinList == null ) {
			return;  //  TODO  maybe throw exception
		}
		if ( matchedProteinList.isEmpty() ) {
			return;  //  TODO  maybe throw exception
		}
		for ( MatchedProtein matchedProtein : matchedProteinList ) {
			
			BigInteger matchedProteinId = matchedProtein.getId();
			
			if ( firstMatchedProtein ) {
				firstMatchedProtein = false;
				if ( matchedProteinId != null ) {
					matchedProteinsContainIdAttribute = true;
				} else {
					matchedProteinsContainIdAttribute = false;
				}
			} else {
				if ( ( matchedProteinId != null && ( ! matchedProteinsContainIdAttribute ) )
						|| ( matchedProteinId == null && ( matchedProteinsContainIdAttribute ) ) ) {
					String msg = "All <matched_protein> entries must all have 'id' attribute or NOT have 'id' attribute.  Found at least one of each.";
					log.error( msg );
					throw new LimelightImporterDataException(msg);
				}
			}
			
			if ( matchedProteinId != null ) {
				
				if ( ! matchedProteinIDs.add( matchedProteinId ) ) {
					String msg = "All <matched_protein> entries must have unique 'id' attribute values.  Found value more than once: " + matchedProteinId;
					log.error( msg );
					throw new LimelightImporterDataException(msg);
				}
			}

//			String proteinIsotopeLabelString = null;
//
//			ProteinIsotopeLabels proteinIsotopeLabels = matchedProtein.getProteinIsotopeLabels();
//			if ( proteinIsotopeLabels != null ) {
//				ProteinIsotopeLabel proteinIsotopeLabel = proteinIsotopeLabels.getProteinIsotopeLabel();
//				if ( proteinIsotopeLabel != null ) {
//					proteinIsotopeLabelString = proteinIsotopeLabel.getLabel();
//				}
//			}
//			
//			ProteinData_ProtienSequenceWithIsotopeLabel proteinData_ProtienSequenceWithIsotopeLabel = new ProteinData_ProtienSequenceWithIsotopeLabel();
//			proteinData_ProtienSequenceWithIsotopeLabel.proteinSequence = matchedProtein.getSequence();
//			proteinData_ProtienSequenceWithIsotopeLabel.isotopeLabelName = proteinIsotopeLabelString;
//			
//			if ( ! proteinSequenceisotopeLabelName_Set.add( proteinData_ProtienSequenceWithIsotopeLabel ) ) {
//				String isotopeLabelNameForErrorMsg = ", no isotope label name.";
//				if ( proteinIsotopeLabelString != null ) {
//					isotopeLabelNameForErrorMsg = ", isotope label name: " + proteinIsotopeLabelString;
//				}
//				String msg = "duplicate protein sequence / isotope label name under <matched_proteins> section, sequence: "
//						+ matchedProtein.getSequence()
//						+ isotopeLabelNameForErrorMsg;
//				log.error( msg );
//				throw new LimelightImporterDataException(msg);
//			}
			
			List<MatchedProteinLabel> matchedProteinLabelList = matchedProtein.getMatchedProteinLabel();
			
			if ( matchedProteinLabelList == null ) {
				String msg = "Must have at least one <protein_annotation> under <protein> section, sequence: "
						+ matchedProtein.getSequence();
				log.error( msg );
				throw new LimelightImporterDataException(msg);
			}
			if ( matchedProteinLabelList.isEmpty() ) {
				String msg = "Must have at least one <protein_annotation> under <protein> section, sequence: "
						+ matchedProtein.getSequence();
				log.error( msg );
				throw new LimelightImporterDataException(msg);
			}
			for ( MatchedProteinLabel matchedProteinLabel : matchedProteinLabelList ) {
				String proteinLabelNameTruncated = ProteinAnnotationNameTruncationUtil.truncateProteinAnnotationName( matchedProteinLabel.getName() );
				if ( ! proteinLabelNames.add( proteinLabelNameTruncated ) ) {
					String msg = "duplicate protein annotation name under <matched_proteins> section,"
							+ " protein label name: " + matchedProteinLabel.getName()
							+ " which was truncated as needed to: " + proteinLabelNameTruncated
							+ ", sequence: " + matchedProtein.getSequence();
					log.error( msg );
					throw new LimelightImporterDataException(msg);
				}
			}
		}
	}
	

}
