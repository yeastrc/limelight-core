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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideModification;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideModifications;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;

/**
 * Validate that all Reported Peptide level modifications marked as N or C terminus have positions at the ends of the Peptide String
 *
 */
public class ValidateModificationsOnReportedPeptides {
	
	private static final Logger log = LoggerFactory.getLogger( ValidateModificationsOnReportedPeptides.class );
	
	private ValidateModificationsOnReportedPeptides() { }
	public static ValidateModificationsOnReportedPeptides getInstance() {
		return new ValidateModificationsOnReportedPeptides();
	}
	
	
	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	public void validateModificationsOnReportedPeptides( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		
		if ( reportedPeptides != null ) {
			
			List<ReportedPeptide> reportedPeptideList =	reportedPeptides.getReportedPeptide();
			
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {

				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					
					String peptideSequence = reportedPeptide.getSequence();
					
					int peptideSequenceLength = peptideSequence.length();

					PeptideModifications peptideModifications = reportedPeptide.getPeptideModifications();

					if ( peptideModifications != null ) {

						List<PeptideModification> peptideModificationList = peptideModifications.getPeptideModification();
						if ( peptideModificationList != null && ( ! peptideModificationList.isEmpty() ) ) {
							for ( PeptideModification peptideModification : peptideModificationList ) {

								if ( ( peptideModification.isIsNTerminal() != null && peptideModification.isIsNTerminal() ) 
										&& ( peptideModification.isIsCTerminal() != null && peptideModification.isIsCTerminal() ) ) {
									String msg = "Peptide Modification: Not Allowed: 'is_n_terminal' and 'is_c_terminal' are both populated and true. Reported Peptide: " + reportedPeptide.getReportedPeptideString();
									log.error( msg );
									throw new LimelightImporterDataException( msg );
								}

								if ( peptideModification.isIsNTerminal() != null && peptideModification.isIsNTerminal() ) {
									if ( peptideModification.getPosition() != null ) {
										String msg = "Peptide Modification Position is populated when modification is marked as 'n' terminal. Position: " + peptideModification.getPosition().intValue()
												+ " Reported Peptide: " + reportedPeptide.getReportedPeptideString();
										log.error( msg );
										throw new LimelightImporterDataException( msg );
									}
								} else if ( peptideModification.isIsCTerminal() != null && peptideModification.isIsCTerminal() ) {
									if ( peptideModification.getPosition()!= null ) {
										String msg = "Peptide Modification Position is populated when modification is marked as 'c' terminal. Position: " + peptideModification.getPosition().intValue()
												+ " Reported Peptide: " + reportedPeptide.getReportedPeptideString();
										log.error( msg );
										throw new LimelightImporterDataException( msg );
									}
								} else {

									if ( peptideModification.getPosition() == null ) {
										String msg = "Peptide Modification Position is null or not assigned and at least one of 'is_n_terminal' or 'is_c_terminal' is not populated and true.  Reported Peptide: " + reportedPeptide.getReportedPeptideString();
										log.error( msg );
										throw new LimelightImporterDataException( msg );
									}
									if ( peptideModification.getPosition().intValue() < 1 ) {
										String msg = "Peptide Modification Position is < 1. peptide Modification Position: " 
												+ peptideModification.getPosition()
												+ ", Reported Peptide: " + reportedPeptide.getReportedPeptideString();
										log.error( msg );
										throw new LimelightImporterDataException( msg );
									}
									if ( peptideModification.getPosition().intValue() > peptideSequenceLength ) {
										String msg = "Peptide Modification Position is > peptide Sequence Length. peptide Modification Position: " 
												+ peptideModification.getPosition()
												+ ", peptide Sequence Length: " + peptideSequenceLength
												+ ", Reported Peptide: " + reportedPeptide.getReportedPeptideString();
										log.error( msg );
										throw new LimelightImporterDataException( msg );
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
