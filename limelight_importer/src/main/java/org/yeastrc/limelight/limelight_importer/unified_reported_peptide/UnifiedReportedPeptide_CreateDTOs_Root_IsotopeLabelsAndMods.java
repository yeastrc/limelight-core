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
package org.yeastrc.limelight.limelight_importer.unified_reported_peptide;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideModification;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideModifications;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideIsotopeLabel;
import org.yeastrc.limelight.limelight_import.api.xml_dto.PeptideIsotopeLabels;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_importer.dao.IsotopeLabelDAO_Importer;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_shared.constants.UnifiedReportedPeptideConstants;
import org.yeastrc.limelight.limelight_shared.dto.PeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.UnifiedRepPepDynamicModLookupDTO;
import org.yeastrc.limelight.limelight_shared.dto.UnifiedRepPepIsotopeLabelLookupDTO;
import org.yeastrc.limelight.limelight_shared.dto.UnifiedReportedPeptideLookupDTO;

/**
 * Package Private class
 * 
 * Create objects for tables:
 * 
 *    unified_reported_peptide_lookup_tbl
 *    unified_rep_pep_isotope_label_lookup_tbl
 *    unified_rep_pep_dynamic_mod_lookup_tbl
 *
 */
class UnifiedReportedPeptide_CreateDTOs_Root_IsotopeLabelsAndMods {

	private static final Logger log = LoggerFactory.getLogger( UnifiedReportedPeptide_CreateDTOs_Root_IsotopeLabelsAndMods.class );

	//  Placed before the isotope label in the generated string
	private static final String ISOTOPE_LABEL_PREFIX_SEPARATOR = "-";
	
	private UnifiedReportedPeptide_CreateDTOs_Root_IsotopeLabelsAndMods() { }
	public static UnifiedReportedPeptide_CreateDTOs_Root_IsotopeLabelsAndMods getInstance() { return new UnifiedReportedPeptide_CreateDTOs_Root_IsotopeLabelsAndMods(); }
	
	/**
	 * 
	 *
	 */
	static class CreateDTOs_Root_IsotopeLabelsAndMods_Result {
		
		UnifiedReportedPeptideLookupDTO unifiedReportedPeptideLookupDTO;
		
		List<UnifiedRepPepDynamicModLookupDTO> unifiedRepPepDynamicModLookupDTOList;
		UnifiedRepPepIsotopeLabelLookupDTO unifiedRepPepIsotopeLabelLookupDTO;
		
		
		public UnifiedReportedPeptideLookupDTO getUnifiedReportedPeptideLookupDTO() {
			return unifiedReportedPeptideLookupDTO;
		}
		public void setUnifiedReportedPeptideLookupDTO(UnifiedReportedPeptideLookupDTO unifiedReportedPeptideLookupDTO) {
			this.unifiedReportedPeptideLookupDTO = unifiedReportedPeptideLookupDTO;
		}
		public List<UnifiedRepPepDynamicModLookupDTO> getUnifiedRepPepDynamicModLookupDTOList() {
			return unifiedRepPepDynamicModLookupDTOList;
		}
		public void setUnifiedRepPepDynamicModLookupDTOList(
				List<UnifiedRepPepDynamicModLookupDTO> unifiedRepPepDynamicModLookupDTOList) {
			this.unifiedRepPepDynamicModLookupDTOList = unifiedRepPepDynamicModLookupDTOList;
		}
		public UnifiedRepPepIsotopeLabelLookupDTO getUnifiedRepPepIsotopeLabelLookupDTO() {
			return unifiedRepPepIsotopeLabelLookupDTO;
		}
		public void setUnifiedRepPepIsotopeLabelLookupDTO(
				UnifiedRepPepIsotopeLabelLookupDTO unifiedRepPepIsotopeLabelLookupDTO) {
			this.unifiedRepPepIsotopeLabelLookupDTO = unifiedRepPepIsotopeLabelLookupDTO;
		}
	}
	
	/**
	 * @param reportedPeptide
	 * @param peptideDTO
	 * @return
	 * @throws Exception 
	 */
	CreateDTOs_Root_IsotopeLabelsAndMods_Result createDTOs_Root_IsotopeLabelsAndMods( 
			ReportedPeptide reportedPeptide,
			PeptideDTO peptideDTO ) throws Exception {
		
		CreateDTOs_Root_IsotopeLabelsAndMods_Result methodResult = new CreateDTOs_Root_IsotopeLabelsAndMods_Result();
		
		UnifiedReportedPeptideLookupDTO unifiedReportedPeptideLookupDTO = new UnifiedReportedPeptideLookupDTO();
		methodResult.unifiedReportedPeptideLookupDTO = unifiedReportedPeptideLookupDTO;

		unifiedReportedPeptideLookupDTO.setPeptideId( peptideDTO.getId() );

		String peptideSequence = reportedPeptide.getSequence();
		
		List<PeptideModification> peptideModificationList = null;
		PeptideIsotopeLabel peptideIsotopeLabel = null;

		{
			PeptideModifications peptideModifications = reportedPeptide.getPeptideModifications();
			if ( peptideModifications != null ) {
				peptideModificationList = peptideModifications.getPeptideModification();
			}
			PeptideIsotopeLabels peptideIsotopeLabels = reportedPeptide.getPeptideIsotopeLabels();
			if ( peptideIsotopeLabels != null ) {
				peptideIsotopeLabel = peptideIsotopeLabels.getPeptideIsotopeLabel();
			}
		}
		
		if ( ( peptideModificationList == null || peptideModificationList.isEmpty() ) 
				&& ( peptideIsotopeLabel == null ) ) {
			
			//  Optimization/Early Exit
			
			unifiedReportedPeptideLookupDTO.setSequence( peptideSequence );
			
			return methodResult;  //  EARLY RETURN
		}

		
		int peptideModificationList_Size = 0;
		int srchRepPeptPeptide_IsotopeLabel_DTO_List_Size = 0;
		
		if ( peptideModificationList != null ) {
			peptideModificationList_Size = peptideModificationList.size();
		}
		if ( peptideIsotopeLabel != null ) {
			srchRepPeptPeptide_IsotopeLabel_DTO_List_Size = 1;
		}
		
		StringBuilder unifiedReportedPeptideSequenceOutSB = 
				new StringBuilder( peptideSequence.length() 
						+ ( peptideModificationList_Size * 13 )
						+ ( srchRepPeptPeptide_IsotopeLabel_DTO_List_Size * 13 ) );

		
		if ( peptideModificationList == null || peptideModificationList.isEmpty() ) {
			
			unifiedReportedPeptideSequenceOutSB.append( peptideSequence );
			
		} else {
			// Process Dynamic Mods
			
			unifiedReportedPeptideLookupDTO.setHasDynamicModifications( true );
			
			methodResult.unifiedRepPepDynamicModLookupDTOList = new ArrayList<>( peptideModificationList.size() );

			//  Build list of local holder dynamic mods 

			List<SingleDynamicModification> dynamicModificationList = new ArrayList<>( peptideModificationList.size() );

			for ( PeptideModification peptideModification : peptideModificationList ) {

				SingleDynamicModification SingleDynamicModification = new SingleDynamicModification();
				dynamicModificationList.add(SingleDynamicModification);

				SingleDynamicModification.setPosition( peptideModification.getPosition().intValue() );
				SingleDynamicModification.setMass( peptideModification.getMass().doubleValue() );
			}


			Collections.sort( dynamicModificationList );

			Iterator<SingleDynamicModification> dynamicModIterator = dynamicModificationList.iterator();

			SingleDynamicModification mod = dynamicModIterator.next();

			char[] peptideSequenceArray = peptideSequence.toCharArray();

			int modOrder = 0;
			
			for ( int seqIndex = 0; seqIndex < peptideSequenceArray.length; seqIndex++ ) {

				int modPosition = seqIndex + 1; // since mod position is 1 based

				char seqChar = peptideSequenceArray[ seqIndex ];

				unifiedReportedPeptideSequenceOutSB.append( seqChar );

				while ( mod != null && mod.getPosition() == modPosition ) {

					modOrder++;

					BigDecimal modMassRounded = mod.getMassRounded();

					unifiedReportedPeptideSequenceOutSB.append( "[" );
					unifiedReportedPeptideSequenceOutSB.append( modMassRounded );
					unifiedReportedPeptideSequenceOutSB.append( "]" );

					UnifiedRepPepDynamicModLookupDTO unifiedRpDynamicModDTO = new UnifiedRepPepDynamicModLookupDTO();
					methodResult.unifiedRepPepDynamicModLookupDTOList.add( unifiedRpDynamicModDTO );
					
					unifiedRpDynamicModDTO.setPosition( mod.getPosition() );

					unifiedRpDynamicModDTO.setMass( mod.getMass() );
					unifiedRpDynamicModDTO.setMassRounded( mod.getMassRounded().doubleValue() );
					unifiedRpDynamicModDTO.setMassRoundedString( mod.getMassRounded().toString() );
					unifiedRpDynamicModDTO.setMassRoundingPlaces( UnifiedReportedPeptideConstants.DECIMAL_POSITIONS_ROUNDED_TO );
					unifiedRpDynamicModDTO.setModOrder( modOrder );
					
					if ( dynamicModIterator.hasNext() ) {
						mod = dynamicModIterator.next();
					} else {
						mod = null;
					}
				}

			}
		} 
		
		// Add Isotope Label to end of string
		
		if ( peptideIsotopeLabel != null ) {

			unifiedReportedPeptideLookupDTO.setHasIsotopeLabels( true );
			
			String isotopeLabelName = peptideIsotopeLabel.getLabel();
			
			// process isotope label
			Integer isotopeLabelId = 
					IsotopeLabelDAO_Importer.getInstance().getIdForName( isotopeLabelName );
			if ( isotopeLabelId == null ) {
				String msg = "No Isotope label found for name: " + isotopeLabelName;
				log.error( msg );
				throw new LimelightImporterInternalException( msg );
			}
				
			UnifiedRepPepIsotopeLabelLookupDTO unifiedRepPepIsotopeLabelLookupDTO = new UnifiedRepPepIsotopeLabelLookupDTO();
			methodResult.unifiedRepPepIsotopeLabelLookupDTO = unifiedRepPepIsotopeLabelLookupDTO;
			
			unifiedRepPepIsotopeLabelLookupDTO.setIsotopeLabelId( isotopeLabelId );
			
			// Add isotope label to peptideSequenceOutSB
			unifiedReportedPeptideSequenceOutSB.append( ISOTOPE_LABEL_PREFIX_SEPARATOR );
			unifiedReportedPeptideSequenceOutSB.append( isotopeLabelName );
		}
				
		String unifiedReportedPeptideSequenceOut = unifiedReportedPeptideSequenceOutSB.toString();
		
		unifiedReportedPeptideLookupDTO.setSequence( unifiedReportedPeptideSequenceOut );

		methodResult.unifiedReportedPeptideLookupDTO = unifiedReportedPeptideLookupDTO;
		
		return methodResult;
	}
	

	/**
	 * 
	 * Internal holder for proper sorting
	 */
	static class SingleDynamicModification implements Comparable<SingleDynamicModification> {

		private int position;
		private double mass;
		private BigDecimal massRounded;

		/*
		 * Order by position and then mass
		 */
		@Override
		public int compareTo(SingleDynamicModification o) {

			if ( o.position != position ) {

				return position - o.position;
			}

			return massRounded.compareTo( o.massRounded );

			//					if ( mass < o.mass ) {
			//						
			//						return -1;
			//					} else if ( mass == o.mass ) {
			//						
			//						return 0;
			//					} else {
			//						return 1;
			//					}

		}

		public double getMass() {
			return mass;
		}
		public void setMass(double mass) {
			this.mass = mass;

			BigDecimal modMassBD = BigDecimal.valueOf( mass );

			massRounded = modMassBD.setScale( UnifiedReportedPeptideConstants.DECIMAL_POSITIONS_ROUNDED_TO, RoundingMode.HALF_UP );
		}


		public BigDecimal getMassRounded() {
			return massRounded;
		}


		public int getPosition() {
			return position;
		}
		public void setPosition(int position) {
			this.position = position;
		}

	}
	
}
