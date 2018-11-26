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
package org.yeastrc.limelight.limelight_importer.objects;

import java.util.ArrayList;
import java.util.List;

import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProtein;
import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteinLabel;
import org.yeastrc.limelight.limelight_importer.dto.ProteinSequenceAnnotationDTO;
import org.yeastrc.limelight.limelight_importer.dto.ProteinSequenceDTO;
import org.yeastrc.limelight.limelight_importer.dto.ProteinSequenceVersionDTO;
import org.yeastrc.limelight.limelight_importer.dto.SearchProteinSequenceVersionAnnotationDTO;
import org.yeastrc.limelight.limelight_importer.utils.PeptideProteinSequenceForProteinInference;
import org.yeastrc.limelight.limelight_importer.utils.ProteinAnnotationNameTruncationUtil;
import org.yeastrc.limelight.limelight_shared.constants.IsotopeLabelsConstants;

/**
 * Encapsulates a Protein for the Importer
 * 
 * equals(...) comparisons and hashcode() Based On:
 * 
 *    proteinSequenceVersionDTO.isotopeLabelId
 *    proteinSequenceDTO
 *    
 *
 * Holds:
 * 
 * a ProteinSequenceVersionDTO
 * 
 * a ProteinSequenceDTO - Used for equals(...) comparisons and hashcode()
 * 
 * a list of AnnotationDTO
 * 
 * a list of SearchProteinSequenceAnnotationDTO
 *
 */

public class ProteinImporterContainer {

	private ProteinSequenceDTO proteinSequenceDTO;
	
	private String proteinSequenceForProteinInference;

	private ProteinSequenceVersionDTO proteinSequenceVersionDTO;
	
	private List<ProteinSequenceAnnotationDTO> annotationDTOList;

	private List<SearchProteinSequenceVersionAnnotationDTO> searchProteinSequenceVersionAnnotationDTOList;
	
	private MatchedProtein matchedProteinFromLimelightXMLFile;
	
	private int searchId;
	
	private boolean dataInObjectSavedToDB;
	
	/**
	 * get ProteinImporterContainer from protein in Limelight XML File
	 * @throws Exception 
	 *
	 */
	public static ProteinImporterContainer getInstance( MatchedProtein matchedProteinFromLimelightXMLFile ) throws Exception {
		
		ProteinImporterContainer proteinImporterContainer = new ProteinImporterContainer();
	
		proteinImporterContainer.proteinSequenceDTO = new ProteinSequenceDTO( matchedProteinFromLimelightXMLFile.getSequence() );
		
		proteinImporterContainer.matchedProteinFromLimelightXMLFile = matchedProteinFromLimelightXMLFile;
		
		proteinImporterContainer.proteinSequenceForProteinInference =
				PeptideProteinSequenceForProteinInference.getSingletonInstance()
				.convert_PeptideOrProtein_SequenceFor_I_L_Equivalence_ChangeTo_J( matchedProteinFromLimelightXMLFile.getSequence() );

		proteinImporterContainer.proteinSequenceVersionDTO = new ProteinSequenceVersionDTO();
		
		//  TODO  Add Isotope Label processing when have that data
//		GetIsotopeLabelIdFor_Protein_or_Peptide_FromLimelightXMLFile.GetIsotopeLabelIdFor_Protein_or_Peptide_FromLimelightXMLFile_Result result =
//				GetIsotopeLabelIdFor_Protein_or_Peptide_FromLimelightXMLFile.getInstance().getIsotopeLabelIdFor_Protein_FromLimelightXMLFile( matchedProteinFromLimelightXMLFile );
//		proteinImporterContainer.proteinSequenceVersionDTO.setIsotopeLabelId( result.getIsotopeLabelId() );
		
		//  TODO  !!!!!!  Hard code Isotope label for now
		
		proteinImporterContainer.proteinSequenceVersionDTO.setIsotopeLabelId( IsotopeLabelsConstants.ID_NONE );
		
		return proteinImporterContainer;
	}
	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + proteinSequenceVersionDTO.getIsotopeLabelId();
		result = prime * result + ((proteinSequenceDTO == null) ? 0 : proteinSequenceDTO.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProteinImporterContainer other = (ProteinImporterContainer) obj;
		if (proteinSequenceVersionDTO.getIsotopeLabelId() != other.proteinSequenceVersionDTO.getIsotopeLabelId())
			return false;
		if (proteinSequenceDTO == null) {
			if (other.proteinSequenceDTO != null)
				return false;
		} else if (!proteinSequenceDTO.equals(other.proteinSequenceDTO))
			return false;
		return true;
	}

	
	///////////////////////////////

	public ProteinSequenceDTO getProteinSequenceDTO() {
		return proteinSequenceDTO;
	}

	public void setProteinSequenceDTO(ProteinSequenceDTO proteinSequenceDTO) {
		this.proteinSequenceDTO = proteinSequenceDTO;
	}

	public List<ProteinSequenceAnnotationDTO> getAnnotationDTOList() {
		
		if ( annotationDTOList != null ) {
			//  Populated so return it;
			return annotationDTOList;  //  EARLY EXIT
		}

		//  Not populated so populate it

		annotationDTOList = new ArrayList<>();

		List<MatchedProteinLabel> matchedProteinLabelList = matchedProteinFromLimelightXMLFile.getMatchedProteinLabel();

		if ( matchedProteinLabelList == null ) {
			// Nothing to put in it so return it
			return annotationDTOList;  //  EARLY EXIT
		}

		for ( MatchedProteinLabel matchedProteinLabel : matchedProteinLabelList ) {
			
			ProteinSequenceAnnotationDTO annotationDTO = new ProteinSequenceAnnotationDTO();

			String proteinAnnotationNameTruncated = ProteinAnnotationNameTruncationUtil.truncateProteinAnnotationName( matchedProteinLabel.getName() );

			annotationDTO.setName( proteinAnnotationNameTruncated );
			annotationDTO.setDescription( matchedProteinLabel.getDescription() );

			if ( matchedProteinLabel.getNcbiTaxonomyId() != null ) {

				annotationDTO.setTaxonomy( matchedProteinLabel.getNcbiTaxonomyId().intValue() );
			}

			annotationDTOList.add( annotationDTO );
		}
		
		return annotationDTOList;
	}

	public void setAnnotationDTOList(List<ProteinSequenceAnnotationDTO> annotationDTOList) {
		this.annotationDTOList = annotationDTOList;
	}

	public List<SearchProteinSequenceVersionAnnotationDTO> getSearchProteinSequenceAnnotationDTOList() {
		return searchProteinSequenceVersionAnnotationDTOList;
	}

	public void setSearchProteinSequenceAnnotationDTOList(
			List<SearchProteinSequenceVersionAnnotationDTO> searchProteinSequenceVersionAnnotationDTOList) {
		this.searchProteinSequenceVersionAnnotationDTOList = searchProteinSequenceVersionAnnotationDTOList;
	}

	public int getSearchId() {
		return searchId;
	}

	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}

	public boolean isDataInObjectSavedToDB() {
		return dataInObjectSavedToDB;
	}

	public void setDataInObjectSavedToDB(boolean dataInObjectSavedToDB) {
		this.dataInObjectSavedToDB = dataInObjectSavedToDB;
	}

	public String getProteinSequenceForProteinInference() {
		return proteinSequenceForProteinInference;
	}


	public ProteinSequenceVersionDTO getProteinSequenceVersionDTO() {
		return proteinSequenceVersionDTO;
	}


	public void setProteinSequenceVersionDTO(ProteinSequenceVersionDTO proteinSequenceVersionDTO) {
		this.proteinSequenceVersionDTO = proteinSequenceVersionDTO;
	}

}
