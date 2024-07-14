package org.yeastrc.limelight.limelight_importer.pre_validate_xml;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.StaticModification;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;

/**
 * Validate that the <static_modification> has unique values for attribute amino_acid
 * 
 */
public class Validate_StaticModEntries_Have_Unique_AminoAcidResidueLetters {
	
	private static final Logger log = LoggerFactory.getLogger( Validate_StaticModEntries_Have_Unique_AminoAcidResidueLetters.class );
	
	private Validate_StaticModEntries_Have_Unique_AminoAcidResidueLetters() { }
	public static Validate_StaticModEntries_Have_Unique_AminoAcidResidueLetters getInstance() {
		return new Validate_StaticModEntries_Have_Unique_AminoAcidResidueLetters();
	}
	
	
	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	public void validate_StaticModEntries_Have_Unique_AminoAcidResidueLetters( 
			
			LimelightInput limelightInput
			
			) throws LimelightImporterDataException {
		
		Set<String> aminoAcidLetters_Set = new HashSet<>();
		
		if ( limelightInput.getStaticModifications() != null && limelightInput.getStaticModifications().getStaticModification() != null ) {
			
			for ( StaticModification staticModification : limelightInput.getStaticModifications().getStaticModification() ) {
				
				if ( ! aminoAcidLetters_Set.add( staticModification.getAminoAcid() ) ) {
					String msg = "<static_modification> has duplicate attribute amino_acid value '"
							+  staticModification.getAminoAcid()
							+ "'.";
					log.error( msg );
					throw new LimelightImporterDataException( msg );
				}
			}
		}
	}
			
}
