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
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableModificationPositionAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableModificationPositionAnnotations;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ModificationPositionAnnotations;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideModification;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideModifications;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;

/**
 * Validate that all <modification_position_annotations> on PSMs have 'peptide_modification_id' that is on parent Reported Peptide variable modification.
 * 
 */
public class Validate_ModificationPositionAnnotations_OnReportedPeptidesAndPSMs {
	
	private static final Logger log = LoggerFactory.getLogger( Validate_ModificationPositionAnnotations_OnReportedPeptidesAndPSMs.class );
	
	private Validate_ModificationPositionAnnotations_OnReportedPeptidesAndPSMs() { }
	public static Validate_ModificationPositionAnnotations_OnReportedPeptidesAndPSMs getInstance() {
		return new Validate_ModificationPositionAnnotations_OnReportedPeptidesAndPSMs();
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
		
		Set<BigInteger> peptideModificationIds = new HashSet<>();
		
		if ( peptideModifications != null ) {

			List<PeptideModification> peptideModificationList = peptideModifications.getPeptideModification();
			if ( peptideModificationList != null && ( ! peptideModificationList.isEmpty() ) ) {
				for ( PeptideModification peptideModification : peptideModificationList ) {
					
					if ( peptideModification.getId() != null ) {

						peptideModificationIds.add( peptideModification.getId() );
					}
				}
			}
		}
	
		if ( reportedPeptide.getPsms() != null ) {
			for ( Psm psm : reportedPeptide.getPsms().getPsm() ) {
				
				validateModificationsOnSinglePSM( psm, peptideModificationIds, reportedPeptide );
			}
		}
	}
		

	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private void validateModificationsOnSinglePSM( 
			Psm psm,
			Set<BigInteger> peptideModificationIds,
			ReportedPeptide reportedPeptide ) throws LimelightImporterDataException {
				
		ModificationPositionAnnotations modificationPositionAnnotations = psm.getModificationPositionAnnotations();
		
		if ( modificationPositionAnnotations != null ) {

			{
				FilterableModificationPositionAnnotations filterableModificationPositionAnnotations = modificationPositionAnnotations.getFilterableModificationPositionAnnotations();
				
				if ( filterableModificationPositionAnnotations != null ) {
					
					if ( filterableModificationPositionAnnotations.getFilterableModificationPositionAnnotation() != null 
							&& ( ! filterableModificationPositionAnnotations.getFilterableModificationPositionAnnotation().isEmpty() ) ) {
						
						for ( FilterableModificationPositionAnnotation filterableModificationPositionAnnotation : filterableModificationPositionAnnotations.getFilterableModificationPositionAnnotation() ) {
							if ( filterableModificationPositionAnnotation.getPeptideModificationId() == null ) {
								String msg = "<filterable_modification_position_annotation> attribute 'peptide_modification_id' is NOT populated";
								if ( psm.getScanNumber() != null ) {
									msg += "PSM Scan Number: " + psm.getScanNumber() + ".  "; 
								}
								msg += " Reported Peptide: " + reportedPeptide.getReportedPeptideString();
								log.error( msg );
								throw new LimelightImporterDataException( msg );
							}
							
							if ( ! peptideModificationIds.contains( filterableModificationPositionAnnotation.getPeptideModificationId() ) ) {
								String msg = "<filterable_modification_position_annotation> attribute 'peptide_modification_id' is NOT found on any parent <reported_peptide> <peptide_modification> attribute 'id'";
								if ( psm.getScanNumber() != null ) {
									msg += "PSM Scan Number: " + psm.getScanNumber() + ".  "; 
								}
								msg += " Reported Peptide: " + reportedPeptide.getReportedPeptideString();
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
