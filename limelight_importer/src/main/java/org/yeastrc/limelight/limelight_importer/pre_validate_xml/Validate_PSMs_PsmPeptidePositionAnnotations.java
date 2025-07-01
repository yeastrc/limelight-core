package org.yeastrc.limelight.limelight_importer.pre_validate_xml;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterablePsmPeptidePositionAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterablePsmPeptidePositionAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_import.api.xml_dto.SearchProgram;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;

/**
 * Validate PSMs that have Psm Peptide Position Annotations
 * 
 * Validate that if a PSM has Psm Peptide Position Annotations that it has them for ALL positions for all Search Program / Annotation Name
 * 
 */
public class Validate_PSMs_PsmPeptidePositionAnnotations {
	
	private static final Logger log = LoggerFactory.getLogger( Validate_PSMs_PsmPeptidePositionAnnotations.class );
	
	private Validate_PSMs_PsmPeptidePositionAnnotations() { }
	public static Validate_PSMs_PsmPeptidePositionAnnotations getInstance() {
		return new Validate_PSMs_PsmPeptidePositionAnnotations();
	}
	
	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	public void validate_PSMs_PsmPeptidePositionAnnotations( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		INTERNAL__SearchProgramName_AnnotationName_Validation internal__SearchProgramName_AnnotationName_Validation = new INTERNAL__SearchProgramName_AnnotationName_Validation();
		internal__SearchProgramName_AnnotationName_Validation.populate_annotationNames_Set_Map_Key_SearchName( limelightInput );
		
		
		//  Validate all PSM 
		
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		
		if ( reportedPeptides != null ) {
			
			List<ReportedPeptide> reportedPeptideList =	reportedPeptides.getReportedPeptide();
			
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {

				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					
					validateOnSingleReportedPeptideAndItsPSMs( reportedPeptide, internal__SearchProgramName_AnnotationName_Validation );
				}
			}
		}
	}
	
	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private void validateOnSingleReportedPeptideAndItsPSMs( 
			
			ReportedPeptide reportedPeptide,
			INTERNAL__SearchProgramName_AnnotationName_Validation internal__SearchProgramName_AnnotationName_Validation ) throws LimelightImporterDataException {
	
		if ( reportedPeptide.getPsms() != null ) {
			for ( Psm psm : reportedPeptide.getPsms().getPsm() ) {
				
				validateOnSinglePSM( psm, reportedPeptide, internal__SearchProgramName_AnnotationName_Validation );
			}
		}
	}

	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private void validateOnSinglePSM( 
			Psm psm,
			ReportedPeptide reportedPeptide,
			INTERNAL__SearchProgramName_AnnotationName_Validation internal__SearchProgramName_AnnotationName_Validation ) throws LimelightImporterDataException {
		
		if ( 
				psm.getPsmPeptidePositionAnnotations() == null 
				|| psm.getPsmPeptidePositionAnnotations().getFilterablePsmPeptidePositionAnnotations() == null 
				|| psm.getPsmPeptidePositionAnnotations().getFilterablePsmPeptidePositionAnnotations().getFilterablePsmPeptidePositionAnnotation() == null 
				|| psm.getPsmPeptidePositionAnnotations().getFilterablePsmPeptidePositionAnnotations().getFilterablePsmPeptidePositionAnnotation().isEmpty() ) {
			
			if ( ! internal__SearchProgramName_AnnotationName_Validation.annotationNames_Set_Map_Key_SearchName.isEmpty() ) {
				//  Have <filterable_psm_peptide_position_annotation_type> but NO  <filterable_psm_peptide_position_annotation> on PSM
				String msg = "Have <filterable_psm_peptide_position_annotation_type> but NO  <filterable_psm_peptide_position_annotation> on PSM"
						+ ". Reported Peptide String: " + reportedPeptide.getReportedPeptideString();
				log.error( msg );
				throw new LimelightImporterDataException( msg );
			}
			
			return;
		}
		
		int peptideLength = reportedPeptide.getSequence().length();

		Map<String, Set<String>> annotationName_Set_Key_SearchProgram_AccumulateOnPSM = new HashMap<>();
		
		Map<String, Map<String, Set<Integer>>> positionSet_Map_Key_AnnotationName_Map_Key_SearchProgram = new HashMap<>();

		for ( FilterablePsmPeptidePositionAnnotation filterablePsmPeptidePositionAnnotation : psm.getPsmPeptidePositionAnnotations().getFilterablePsmPeptidePositionAnnotations().getFilterablePsmPeptidePositionAnnotation() ) {

			Set<String> annotationNames_Set_FromAnnotationTypes = internal__SearchProgramName_AnnotationName_Validation.annotationNames_Set_Map_Key_SearchName.get( filterablePsmPeptidePositionAnnotation.getSearchProgram() );
			if ( annotationNames_Set_FromAnnotationTypes == null ) {
				String msg = "Found PSM with <filterable_psm_peptide_position_annotation> with 'search_program' NOT in the parent of any <filterable_psm_peptide_position_annotation_type>. " 
						+ " 'search_program': " + filterablePsmPeptidePositionAnnotation.getSearchProgram()
						+ ", 'annotation_name': " + filterablePsmPeptidePositionAnnotation.getAnnotationName()
						+ ". PSM Scan Number: " + psm.getScanNumber()
						+ ". Reported Peptide String: " + reportedPeptide.getReportedPeptideString();
				log.error( msg );
				throw new LimelightImporterDataException( msg );
			}


			Set<String> annotationNames_Set_AccumulateOnPSM = annotationName_Set_Key_SearchProgram_AccumulateOnPSM.get( filterablePsmPeptidePositionAnnotation.getSearchProgram() );
			if ( annotationNames_Set_AccumulateOnPSM == null ) {
				annotationNames_Set_AccumulateOnPSM = new HashSet<>();
				annotationName_Set_Key_SearchProgram_AccumulateOnPSM.put( filterablePsmPeptidePositionAnnotation.getSearchProgram(), annotationNames_Set_AccumulateOnPSM );
			}

			Map<String, Set<Integer>> positionSet_Map_Key_AnnotationName = positionSet_Map_Key_AnnotationName_Map_Key_SearchProgram.get( filterablePsmPeptidePositionAnnotation.getSearchProgram() );
			if ( positionSet_Map_Key_AnnotationName == null ) {
				positionSet_Map_Key_AnnotationName = new HashMap<>();
				positionSet_Map_Key_AnnotationName_Map_Key_SearchProgram.put( filterablePsmPeptidePositionAnnotation.getSearchProgram(), positionSet_Map_Key_AnnotationName );
			}

			if ( ! annotationNames_Set_FromAnnotationTypes.contains( filterablePsmPeptidePositionAnnotation.getAnnotationName() ) ) {
				String msg = "Found PSM with <filterable_psm_peptide_position_annotation> with 'annotation_name' NOT on any <filterable_psm_peptide_position_annotation_type> with 'annotation_name': " 
						+ filterablePsmPeptidePositionAnnotation.getAnnotationName()
						+ " and parent with 'search_program': " + filterablePsmPeptidePositionAnnotation.getSearchProgram()
						+ ". PSM Scan Number: " + psm.getScanNumber()
						+ ". Reported Peptide String: " + reportedPeptide.getReportedPeptideString();
				log.error( msg );
				throw new LimelightImporterDataException( msg );
			}


			annotationNames_Set_AccumulateOnPSM.add( filterablePsmPeptidePositionAnnotation.getAnnotationName() );

			Set<Integer> positionSet = positionSet_Map_Key_AnnotationName.get( filterablePsmPeptidePositionAnnotation.getAnnotationName() );
			if ( positionSet == null ) {
				positionSet = new HashSet<>();
				positionSet_Map_Key_AnnotationName.put( filterablePsmPeptidePositionAnnotation.getAnnotationName(), positionSet );
			}

			if ( ! positionSet.add( filterablePsmPeptidePositionAnnotation.getPosition().intValue() ) ) {
				//  Duplicate position value for 'Search Program / Annotation Name' pair
				String msg = "Found PSM with <filterable_psm_peptide_position_annotation> with duplicate 'position' value for same 'search_program' 'annotation_name' pair.  position: " 
						+ filterablePsmPeptidePositionAnnotation.getPosition()
						+ ", 'search_program': " + filterablePsmPeptidePositionAnnotation.getSearchProgram()
						+ ", 'annotation_name': " + filterablePsmPeptidePositionAnnotation.getAnnotationName()
						+ ". PSM Scan Number: " + psm.getScanNumber()
						+ ". Reported Peptide String: " + reportedPeptide.getReportedPeptideString();
				log.error( msg );
				throw new LimelightImporterDataException( msg );
			}
		}

		//  Validate PSM has ALL <filterable_psm_peptide_position_annotation_type>
		
		{
			for ( Map.Entry<String, Set<String>> annotationNames_Set_Map_Key_SearchName_Entry : internal__SearchProgramName_AnnotationName_Validation.annotationNames_Set_Map_Key_SearchName.entrySet() ) {

				String searchProgram_OnType = annotationNames_Set_Map_Key_SearchName_Entry.getKey();
				Set<String> annotationNames_Set_OnType = annotationNames_Set_Map_Key_SearchName_Entry.getValue();

				Set<String> annotationNames_Set_AccumulateOnPSM = annotationName_Set_Key_SearchProgram_AccumulateOnPSM.get( searchProgram_OnType );
				if ( annotationNames_Set_AccumulateOnPSM == null ) {
					String msg = "PSM is MISSING <filterable_psm_peptide_position_annotation> with 'search_program' in parent of <filterable_psm_peptide_position_annotation_type>. " 
							+ " 'search_program': " + searchProgram_OnType
							+ ", 'annotation_name' values on <filterable_psm_peptide_position_annotation_type> for 'search_program': " + StringUtils.join( annotationNames_Set_OnType )
							+ ". PSM Scan Number: " + psm.getScanNumber()
							+ ". Reported Peptide String: " + reportedPeptide.getReportedPeptideString();
					log.error( msg );
					throw new LimelightImporterDataException( msg );
				}

				for ( String annotationName_Set_OnType : annotationNames_Set_OnType ) {
					
					if ( ! annotationNames_Set_AccumulateOnPSM.contains( annotationName_Set_OnType ) ) {
						String msg = "PSM is MISSING <filterable_psm_peptide_position_annotation> with 'annotation_name' on <filterable_psm_peptide_position_annotation_type>. " 
								+ " 'search_program': " + searchProgram_OnType
								+ ", 'annotation_name': " + annotationName_Set_OnType
								+ ". PSM Scan Number: " + psm.getScanNumber()
								+ ". Reported Peptide String: " + reportedPeptide.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					}
				}
			}
		}
		
		//  Validate positions
		
		for ( Map.Entry<String, Map<String, Set<Integer>>> positionSet_Map_Key_AnnotationName_Map_Key_SearchProgram_Entry : positionSet_Map_Key_AnnotationName_Map_Key_SearchProgram.entrySet() ) {
			
			String searchProgram_Entry = positionSet_Map_Key_AnnotationName_Map_Key_SearchProgram_Entry.getKey();
			Map<String, Set<Integer>> positionSet_Map_Key_AnnotationName = positionSet_Map_Key_AnnotationName_Map_Key_SearchProgram_Entry.getValue();
			
			for ( Map.Entry<String, Set<Integer>> positionSet_Map_Key_AnnotationName_MapEntry : positionSet_Map_Key_AnnotationName.entrySet() ) {
				
				String annotationName = positionSet_Map_Key_AnnotationName_MapEntry.getKey();
				Set<Integer> positionSet = positionSet_Map_Key_AnnotationName_MapEntry.getValue();
				
				for ( Integer position: positionSet ) {
					
					if ( position.intValue() < 1 || position.intValue() > peptideLength ) {
						
						String msg = "Found PSM with <filterable_psm_peptide_position_annotation> with 'position' value < 1 or > peptide sequence length.  position: " 
								+ position
								+ ", 'search_program': " + searchProgram_Entry
								+ ", 'annotation_name': " + annotationName
								+ ", peptide sequence length: " + peptideLength
								+ ", peptide sequence: " + reportedPeptide.getSequence()
								+ ". Reported Peptide String: " + reportedPeptide.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					}
				}
				
				for ( Integer position = 1; position <= peptideLength; position++ ) {
					
					if ( ! positionSet.contains( position ) ) {
						String msg = "Found PSM  <filterable_psm_peptide_position_annotation> entries NOT contain 'position' value for all positions in peptide sequence length.  First position not found: " 
								+ position
								+ ", 'search_program': " + searchProgram_Entry
								+ ", 'annotation_name': " + annotationName
								+ ", peptide sequence length: " + peptideLength
								+ ", peptide sequence: " + reportedPeptide.getSequence()
								+ ". Reported Peptide String: " + reportedPeptide.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					}
				}
			}
		}
	}
	
	//////////////////
	
	/**
	 * 
	 * 
	 *
	 */
	private static class INTERNAL__SearchProgramName_AnnotationName_Validation {

		Map<String, Set<String>> annotationNames_Set_Map_Key_SearchName;

		void populate_annotationNames_Set_Map_Key_SearchName( LimelightInput limelightInput ) {

			annotationNames_Set_Map_Key_SearchName = new HashMap<>();

			for ( SearchProgram searchProgram : limelightInput.getSearchProgramInfo().getSearchPrograms().getSearchProgram() ) {

				if ( searchProgram.getPsmPeptidePositionAnnotationTypes() != null
						&& searchProgram.getPsmPeptidePositionAnnotationTypes().getFilterablePsmPeptidePositionAnnotationTypes() != null
						&& ( ! searchProgram.getPsmPeptidePositionAnnotationTypes().getFilterablePsmPeptidePositionAnnotationTypes().getFilterablePsmPeptidePositionAnnotationType().isEmpty() ) ) {

					Set<String> annotationNames_Set = new HashSet<>();

					for ( FilterablePsmPeptidePositionAnnotationType filterablePsmPeptidePositionAnnotationType :
						searchProgram.getPsmPeptidePositionAnnotationTypes().getFilterablePsmPeptidePositionAnnotationTypes().getFilterablePsmPeptidePositionAnnotationType() ) {

						annotationNames_Set.add( filterablePsmPeptidePositionAnnotationType.getName() );
					}

					annotationNames_Set_Map_Key_SearchName.put( searchProgram.getName(), annotationNames_Set );
				}
			}
		}
	}
			
}
