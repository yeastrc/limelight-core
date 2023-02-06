package org.yeastrc.limelight.limelight_importer.utils;

import org.yeastrc.limelight.limelight_import.api.xml_dto.MatchedProteinLabel;
import org.yeastrc.limelight.limelight_importer.dto.ProteinSequenceAnnotationDTO;

/**
 * 
 *
 */
public class Create_ProteinSequenceAnnotationDTO_From_MatchedProteinLabel_Util {

	/**
	 * @param matchedProteinLabel
	 * @return
	 */
	public static ProteinSequenceAnnotationDTO create_ProteinSequenceAnnotationDTO_From_MatchedProteinLabel_Util( MatchedProteinLabel matchedProteinLabel ) {
		

		ProteinSequenceAnnotationDTO annotationDTO = new ProteinSequenceAnnotationDTO();

		String proteinAnnotationNameTruncated = ProteinAnnotationNameTruncationUtil.truncateProteinAnnotationName( matchedProteinLabel.getName() );

		annotationDTO.setName( proteinAnnotationNameTruncated );
		annotationDTO.setDescription( matchedProteinLabel.getDescription() );

		if ( matchedProteinLabel.getNcbiTaxonomyId() != null ) {

			annotationDTO.setTaxonomy( matchedProteinLabel.getNcbiTaxonomyId().intValue() );
		}
		
		return annotationDTO;
	}
}
