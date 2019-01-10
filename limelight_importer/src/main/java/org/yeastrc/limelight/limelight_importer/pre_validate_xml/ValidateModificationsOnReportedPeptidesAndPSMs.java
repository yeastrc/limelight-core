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
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideModification;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideModifications;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PsmModification;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;

/**
 * Validate that all Reported Peptide level modifications are within the length of the peptide sequence.
 * 
 * Validate that all PSM level modifications are only at positions that the associated Reported Peptide also has a modification.
 * 
 */
public class ValidateModificationsOnReportedPeptidesAndPSMs {
	
	private static final Logger log = LoggerFactory.getLogger( ValidateModificationsOnReportedPeptidesAndPSMs.class );
	
	private ValidateModificationsOnReportedPeptidesAndPSMs() { }
	public static ValidateModificationsOnReportedPeptidesAndPSMs getInstance() {
		return new ValidateModificationsOnReportedPeptidesAndPSMs();
	}
	
	
	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	public void validateModificationsOnReportedPeptidesAndPSMs( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		//  Validate that all PSM level modifications are only at positions that the associated Reported Peptide also has a modification

		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		
		if ( reportedPeptides != null ) {
			
			List<ReportedPeptide> reportedPeptideList =	reportedPeptides.getReportedPeptide();
			
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {

				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					
					validateModificationsOnSingleReportedPeptideAndItsPSMs( reportedPeptide );
				}
			}
		}
	}

	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private void validateModificationsOnSingleReportedPeptideAndItsPSMs( ReportedPeptide reportedPeptide ) throws LimelightImporterDataException {

		PeptideModifications peptideModifications = reportedPeptide.getPeptideModifications();
		
		Set<BigInteger> peptideModificationPositions = new HashSet<>();
		
		boolean is_n_terminal = false;
		boolean is_c_terminal = false;
		

		if ( peptideModifications != null ) {

			List<PeptideModification> peptideModificationList = peptideModifications.getPeptideModification();
			if ( peptideModificationList != null && ( ! peptideModificationList.isEmpty() ) ) {
				for ( PeptideModification peptideModification : peptideModificationList ) {
					
					if ( peptideModification.getPosition() != null ) {

						peptideModificationPositions.add( peptideModification.getPosition() );
					}
					
					if ( peptideModification.isIsNTerminal() != null && peptideModification.isIsNTerminal().booleanValue() ) {
						is_n_terminal = true;
					}
					if ( peptideModification.isIsCTerminal() != null && peptideModification.isIsCTerminal().booleanValue() ) {
						is_c_terminal = true;
					}
				}
			}
		}
	
		if ( reportedPeptide.getPsms() != null ) {
			for ( Psm psm : reportedPeptide.getPsms().getPsm() ) {
				
				validateModificationsOnSinglePSM( psm, peptideModificationPositions, is_n_terminal, is_c_terminal, reportedPeptide );
			}
		}
	}
		

	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private void validateModificationsOnSinglePSM( 
			Psm psm,
			Set<BigInteger> peptideModificationPositions,
			boolean is_n_terminal,
			boolean is_c_terminal,
			ReportedPeptide reportedPeptide ) throws LimelightImporterDataException {
				
		if ( psm.getPsmModifications() != null 
				&& psm.getPsmModifications().getPsmModification() != null
				&& ( ! psm.getPsmModifications().getPsmModification().isEmpty() ) ) {
			
			List<PsmModification> psmModificationList = psm.getPsmModifications().getPsmModification();
			for ( PsmModification psmModification : psmModificationList ) {

				if ( psmModification.isIsNTerminal() != null && psmModification.isIsNTerminal() ) {
					if ( psmModification.getPosition() != null ) {
						String msg = "PSM Modification Position is populated when modification is marked as 'n' terminal. Position: " + psmModification.getPosition().intValue();
						if ( psmModification.getMass() != null ) {
							msg += "Modification Mass: " + psmModification.getMass() + ".  "; 
						}
						if ( psm.getScanNumber() != null ) {
							msg += "PSM Scan Number: " + psm.getScanNumber() + ".  "; 
						}
						msg += " Reported Peptide: " + reportedPeptide.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					}
					if ( ! is_n_terminal ) {
						String msg = "PSM Modification 'is_n_terminal' is true but associated Reported Peptide has no modification where 'is_n_terminal' is true";
						if ( psmModification.getMass() != null ) {
							msg += "Modification Mass: " + psmModification.getMass() + ".  "; 
						}
						if ( psm.getScanNumber() != null ) {
							msg += "PSM Scan Number: " + psm.getScanNumber() + ".  "; 
						}
						msg += " Reported Peptide: " + reportedPeptide.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					}
				}
				if ( psmModification.isIsCTerminal() != null && psmModification.isIsCTerminal() ) {
					if ( psmModification.getPosition()!= null ) {
						String msg = "PSM Modification Position is populated when modification is marked as 'c' terminal. Position: " + psmModification.getPosition().intValue();
						if ( psmModification.getMass() != null ) {
							msg += "Modification Mass: " + psmModification.getMass() + ".  "; 
						}
						if ( psm.getScanNumber() != null ) {
							msg += "PSM Scan Number: " + psm.getScanNumber() + ".  "; 
						}
						msg += " Reported Peptide: " + reportedPeptide.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					}
					if ( ! is_c_terminal ) {
						String msg = "PSM Modification 'is_c_terminal' is true but associated Reported Peptide has no modification where 'is_c_terminal' is true";
						if ( psmModification.getMass() != null ) {
							msg += "Modification Mass: " + psmModification.getMass() + ".  "; 
						}
						if ( psm.getScanNumber() != null ) {
							msg += "PSM Scan Number: " + psm.getScanNumber() + ".  "; 
						}
						msg += " Reported Peptide: " + reportedPeptide.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					}
				}
				
				if ( ( psmModification.isIsNTerminal() == null || ( ! psmModification.isIsNTerminal().booleanValue() ) ) ) {
					if ( psmModification.isIsCTerminal() == null || ( ! psmModification.isIsCTerminal().booleanValue() ) ) {

						//  Neither 'is_n_terminal' nor 'is_c_terminal' is set so must have a valid position

						if ( psmModification.getPosition() == null ) {
							String msg = "PSM Modification Position is null or not assigned and at least one of 'is_n_terminal' or 'is_c_terminal' is not populated and true. ";
							if ( psmModification.getMass() != null ) {
								msg += "Modification Mass: " + psmModification.getMass() + ".  "; 
							}
							if ( psm.getScanNumber() != null ) {
								msg += "PSM Scan Number: " + psm.getScanNumber() + ".  "; 
							}
							msg += " Reported Peptide: " + reportedPeptide.getReportedPeptideString();
							log.error( msg );
							throw new LimelightImporterDataException( msg );
						}

						if ( ! peptideModificationPositions.contains( psmModification.getPosition() ) ) {
							String msg = "PSM Modification Position is is not in the list of Reported Peptide level Modification Positions. PSM Modification 'position' value: " 
									+ psmModification.getPosition() + ".  "
									+ "Peptide level Modification 'position' values: " + peptideModificationPositions + ".  ";
							if ( psmModification.getMass() != null ) {
								msg += "Modification Mass: " + psmModification.getMass() + ".  "; 
							}
							if ( psm.getScanNumber() != null ) {
								msg += "PSM Scan Number: " + psm.getScanNumber() + ".  "; 
							}
							msg +=  "Reported Peptide: " + reportedPeptide.getReportedPeptideString();
							log.error( msg );
							throw new LimelightImporterDataException( msg );
						}
					}
				}
			}
		}

	}
}
