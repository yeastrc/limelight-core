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

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveMatchedProteinAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveModificationPositionAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveModificationPositionAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptivePsmAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptivePsmAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveReportedPeptideAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveReportedPeptideAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableMatchedProteinAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableModificationPositionAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableModificationPositionAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterablePsmAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterablePsmAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableReportedPeptideAnnotation;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableReportedPeptideAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_import.api.xml_dto.SearchProgram;
import org.yeastrc.limelight.limelight_import.api.xml_dto.SearchProgramInfo;
import org.yeastrc.limelight.limelight_import.api.xml_dto.SearchPrograms;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;

/**
 * Validate the Annotation <annotation > values are in the Annotation Types and no duplicates.
 * 
 * Sort of Duplicate check in XSD to remove from XSD due to performance issues.
 *
 */
public class Validate_AnnotationRecords_InAllPlaces_NoDuplicates_And_AllIn_AnnotationTypeRecords {

	private static final Logger log = LoggerFactory.getLogger( Validate_AnnotationRecords_InAllPlaces_NoDuplicates_And_AllIn_AnnotationTypeRecords.class );
	
	private Validate_AnnotationRecords_InAllPlaces_NoDuplicates_And_AllIn_AnnotationTypeRecords() { }
	public static Validate_AnnotationRecords_InAllPlaces_NoDuplicates_And_AllIn_AnnotationTypeRecords getInstance() {
		return new Validate_AnnotationRecords_InAllPlaces_NoDuplicates_And_AllIn_AnnotationTypeRecords();
	}
	
	/**
	 * Validate the Annotation <annotation > values are in the Annotation Types and no duplicates.
	 * 
	 * @param limelightInput
	 * @throws LimelightImporterInternalException 
	 * @throws Validate_AnnotationRecords_InAllPlaces_NoDuplicates_And_AllIn_AnnotationTypeRecords for data errors
	 */
	public void validate_AnnotationRecords_InAllPlaces_NoDuplicates_And_AllIn_AnnotationTypeRecords( LimelightInput limelightInput ) throws LimelightImporterDataException, LimelightImporterInternalException {
		
		Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Root root_SearchProgram_AndChildren = get_Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Root( limelightInput );
	
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		if ( reportedPeptides != null ) {
			List<ReportedPeptide> reportedPeptideList =
					reportedPeptides.getReportedPeptide();
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {
								
				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					
					process_Single_ReportedPeptide( reportedPeptide, root_SearchProgram_AndChildren );
				}
			}
		}
	}
	
	/**
	 * @param reportedPeptide
	 * @param root_SearchProgram_AndChildren
	 * @throws LimelightImporterDataException
	 */
	private void process_Single_ReportedPeptide( ReportedPeptide reportedPeptide, Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Root root_SearchProgram_AndChildren ) throws LimelightImporterDataException {
		
		process_Single_ReportedPeptide_Annotations( reportedPeptide, root_SearchProgram_AndChildren );

		if ( reportedPeptide.getPsms() != null && reportedPeptide.getPsms().getPsm() != null ) {
			for ( Psm psm : reportedPeptide.getPsms().getPsm() ) {

				process_Single_Psm_RootLevelAnnotations( psm, root_SearchProgram_AndChildren );
				
				process_Single_Psm_ModificationPosition_Annotations( psm, root_SearchProgram_AndChildren );
			}
		}
	}

	/**
	 * @param reportedPeptide
	 * @param root_SearchProgram_AndChildren
	 * @throws LimelightImporterDataException
	 */
	private void process_Single_ReportedPeptide_Annotations( ReportedPeptide reportedPeptide, Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Root root_SearchProgram_AndChildren ) throws LimelightImporterDataException {
		
		if ( reportedPeptide.getReportedPeptideAnnotations() != null ) {
			
			if ( reportedPeptide.getReportedPeptideAnnotations().getFilterableReportedPeptideAnnotations() != null 
					&& reportedPeptide.getReportedPeptideAnnotations().getFilterableReportedPeptideAnnotations().getFilterableReportedPeptideAnnotation() != null ) {
				
				Map<String, Set<String>> annotationNames_Set_Map_Key_SearchProgramName = new HashMap<>();
				
				for ( FilterableReportedPeptideAnnotation annotation : reportedPeptide.getReportedPeptideAnnotations().getFilterableReportedPeptideAnnotations().getFilterableReportedPeptideAnnotation() ) {
					
					Set<String> annotationNames_Set_For_SearchProgramName = annotationNames_Set_Map_Key_SearchProgramName.get( annotation.getSearchProgram() );
					if ( annotationNames_Set_For_SearchProgramName == null ) {
						annotationNames_Set_For_SearchProgramName = new HashSet<>();
						annotationNames_Set_Map_Key_SearchProgramName.put( annotation.getSearchProgram(), annotationNames_Set_For_SearchProgramName );
					}

					if ( ! annotationNames_Set_For_SearchProgramName.add( annotation.getAnnotationName() ) ) {
						String msg = "The 'search_program' / 'annotation_name' attribute pair on <filterable_reported_peptide_annotation> on <reported_peptide> element has duplicate which is not allowed. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  reported_peptide_string: " +  reportedPeptide.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}

					Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Single_SearchProgram_AndChildren single_SearchProgram_AndChildren = 
							root_SearchProgram_AndChildren.searchProgram_AndChildren_Map.get( annotation.getSearchProgram() );
					
					if ( single_SearchProgram_AndChildren == null ) {
						String msg = "The 'search_program' attribute on <filterable_reported_peptide_annotation> on <reported_peptide> element is not found under <search_program_info>. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  reported_peptide_string: " +  reportedPeptide.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}
					
					if ( ! single_SearchProgram_AndChildren.filterableReportedPeptideAnnotationType_Names.contains( annotation.getAnnotationName() ) ) {
						String msg = "The 'search_program' / 'annotation_name' attribute pair on <filterable_reported_peptide_annotation> on <reported_peptide> element is not found under <search_program_info>. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  reported_peptide_string: " +  reportedPeptide.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}
				}
			}

			if ( reportedPeptide.getReportedPeptideAnnotations().getDescriptiveReportedPeptideAnnotations() != null 
					&& reportedPeptide.getReportedPeptideAnnotations().getDescriptiveReportedPeptideAnnotations().getDescriptiveReportedPeptideAnnotation() != null ) {
				
				Map<String, Set<String>> annotationNames_Set_Map_Key_SearchProgramName = new HashMap<>();
				
				for ( DescriptiveReportedPeptideAnnotation annotation : reportedPeptide.getReportedPeptideAnnotations().getDescriptiveReportedPeptideAnnotations().getDescriptiveReportedPeptideAnnotation() ) {
					
					Set<String> annotationNames_Set_For_SearchProgramName = annotationNames_Set_Map_Key_SearchProgramName.get( annotation.getSearchProgram() );
					if ( annotationNames_Set_For_SearchProgramName == null ) {
						annotationNames_Set_For_SearchProgramName = new HashSet<>();
						annotationNames_Set_Map_Key_SearchProgramName.put( annotation.getSearchProgram(), annotationNames_Set_For_SearchProgramName );
					}

					if ( ! annotationNames_Set_For_SearchProgramName.add( annotation.getAnnotationName() ) ) {
						String msg = "The 'search_program' / 'annotation_name' attribute pair on <descriptive_reported_peptide_annotation> on <reported_peptide> element has duplicate which is not allowed. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  reported_peptide_string: " +  reportedPeptide.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}

					Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Single_SearchProgram_AndChildren single_SearchProgram_AndChildren = 
							root_SearchProgram_AndChildren.searchProgram_AndChildren_Map.get( annotation.getSearchProgram() );
					
					if ( single_SearchProgram_AndChildren == null ) {
						String msg = "The 'search_program' attribute on <descriptive_reported_peptide_annotation> on <reported_peptide> element is not found under <search_program_info>. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  reported_peptide_string: " +  reportedPeptide.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}
					
					if ( ! single_SearchProgram_AndChildren.descriptiveReportedPeptideAnnotationType_Names.contains( annotation.getAnnotationName() ) ) {
						String msg = "The 'search_program' / 'annotation_name' attribute pair on <descriptive_reported_peptide_annotation> on <reported_peptide> element is not found under <search_program_info>. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  reported_peptide_string: " +  reportedPeptide.getReportedPeptideString();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}
				}
			}

		}

	}

	/**
	 * @param psm
	 * @throws LimelightImporterDataException
	 */
	private void process_Single_Psm_RootLevelAnnotations( Psm psm, Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Root root_SearchProgram_AndChildren ) throws LimelightImporterDataException {

		
		if ( psm != null ) {
			
			if ( psm.getFilterablePsmAnnotations() != null 
					&& psm.getFilterablePsmAnnotations().getFilterablePsmAnnotation() != null ) {
				
				Map<String, Set<String>> annotationNames_Set_Map_Key_SearchProgramName = new HashMap<>();
				
				for ( FilterablePsmAnnotation annotation : psm.getFilterablePsmAnnotations().getFilterablePsmAnnotation() ) {
					
					Set<String> annotationNames_Set_For_SearchProgramName = annotationNames_Set_Map_Key_SearchProgramName.get( annotation.getSearchProgram() );
					if ( annotationNames_Set_For_SearchProgramName == null ) {
						annotationNames_Set_For_SearchProgramName = new HashSet<>();
						annotationNames_Set_Map_Key_SearchProgramName.put( annotation.getSearchProgram(), annotationNames_Set_For_SearchProgramName );
					}

					if ( ! annotationNames_Set_For_SearchProgramName.add( annotation.getAnnotationName() ) ) {
						String msg = "The 'search_program' / 'annotation_name' attribute pair on <filterable_psm_annotation> on <psm> element has duplicate which is not allowed. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName()
								+ ",  scan_number: " +  psm.getScanNumber()
								+ ",  scan_file_name: " +  psm.getScanFileName();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}

					Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Single_SearchProgram_AndChildren single_SearchProgram_AndChildren = 
							root_SearchProgram_AndChildren.searchProgram_AndChildren_Map.get( annotation.getSearchProgram() );
					
					if ( single_SearchProgram_AndChildren == null ) {
						String msg = "The 'search_program' attribute on <filterable_psm_annotation> on <psm> element is not found under <search_program_info>. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  scan_number: " +  psm.getScanNumber()
								+ ",  scan_file_name: " +  psm.getScanFileName();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}
					
					if ( ! single_SearchProgram_AndChildren.filterablePsmAnnotationType_Names.contains( annotation.getAnnotationName() ) ) {
						String msg = "The 'search_program' / 'annotation_name' attribute pair on <filterable_psm_annotation> on <psm> element is not found under <search_program_info>. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  scan_number: " +  psm.getScanNumber()
								+ ",  scan_file_name: " +  psm.getScanFileName();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}
				}
			}

			if ( psm.getDescriptivePsmAnnotations() != null 
					&& psm.getDescriptivePsmAnnotations().getDescriptivePsmAnnotation() != null ) {
				
				Map<String, Set<String>> annotationNames_Set_Map_Key_SearchProgramName = new HashMap<>();
				
				for ( DescriptivePsmAnnotation annotation : psm.getDescriptivePsmAnnotations().getDescriptivePsmAnnotation() ) {
					
					Set<String> annotationNames_Set_For_SearchProgramName = annotationNames_Set_Map_Key_SearchProgramName.get( annotation.getSearchProgram() );
					if ( annotationNames_Set_For_SearchProgramName == null ) {
						annotationNames_Set_For_SearchProgramName = new HashSet<>();
						annotationNames_Set_Map_Key_SearchProgramName.put( annotation.getSearchProgram(), annotationNames_Set_For_SearchProgramName );
					}

					if ( ! annotationNames_Set_For_SearchProgramName.add( annotation.getAnnotationName() ) ) {
						String msg = "The 'search_program' / 'annotation_name' attribute pair on <descriptive_psm_annotation> on <psm> element has duplicate which is not allowed. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  scan_number: " +  psm.getScanNumber()
								+ ",  scan_file_name: " +  psm.getScanFileName();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}

					Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Single_SearchProgram_AndChildren single_SearchProgram_AndChildren = 
							root_SearchProgram_AndChildren.searchProgram_AndChildren_Map.get( annotation.getSearchProgram() );
					
					if ( single_SearchProgram_AndChildren == null ) {
						String msg = "The 'search_program' attribute on <descriptive_psm_annotation> on <psm> element is not found under <search_program_info>. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  scan_number: " +  psm.getScanNumber()
								+ ",  scan_file_name: " +  psm.getScanFileName();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}
					
					if ( ! single_SearchProgram_AndChildren.descriptivePsmAnnotationType_Names.contains( annotation.getAnnotationName() ) ) {
						String msg = "The 'search_program' / 'annotation_name' attribute pair on <descriptive_psm_annotation> on <psm> element is not found under <search_program_info>. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  scan_number: " +  psm.getScanNumber()
								+ ",  scan_file_name: " +  psm.getScanFileName();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}
				}
			}

		}
	}

	/**
	 * @param psm
	 * @throws LimelightImporterDataException
	 */
	private void process_Single_Psm_ModificationPosition_Annotations( Psm psm, Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Root root_SearchProgram_AndChildren ) throws LimelightImporterDataException {

		if ( psm.getModificationPositionAnnotations() != null ) {
			
			if ( psm.getModificationPositionAnnotations().getFilterableModificationPositionAnnotations() != null 
					&& psm.getModificationPositionAnnotations().getFilterableModificationPositionAnnotations().getFilterableModificationPositionAnnotation() != null ) {
				
				Map<String, Set<String>> annotationNames_Set_Map_Key_SearchProgramName = new HashMap<>();
				
				for ( FilterableModificationPositionAnnotation annotation : psm.getModificationPositionAnnotations().getFilterableModificationPositionAnnotations().getFilterableModificationPositionAnnotation() ) {
					
					Set<String> annotationNames_Set_For_SearchProgramName = annotationNames_Set_Map_Key_SearchProgramName.get( annotation.getSearchProgram() );
					if ( annotationNames_Set_For_SearchProgramName == null ) {
						annotationNames_Set_For_SearchProgramName = new HashSet<>();
						annotationNames_Set_Map_Key_SearchProgramName.put( annotation.getSearchProgram(), annotationNames_Set_For_SearchProgramName );
					}

					if ( ! annotationNames_Set_For_SearchProgramName.add( annotation.getAnnotationName() ) ) {
						String msg = "The 'search_program' / 'annotation_name' attribute pair on <filterable_modification_position_annotation> on <psm> element has duplicate which is not allowed. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  scan_number: " +  psm.getScanNumber()
								+ ",  scan_file_name: " +  psm.getScanFileName();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}

					Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Single_SearchProgram_AndChildren single_SearchProgram_AndChildren = 
							root_SearchProgram_AndChildren.searchProgram_AndChildren_Map.get( annotation.getSearchProgram() );
					
					if ( single_SearchProgram_AndChildren == null ) {
						String msg = "The 'search_program' attribute on <filterable_modification_position_annotation> on <psm> element is not found under <search_program_info>. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  scan_number: " +  psm.getScanNumber()
								+ ",  scan_file_name: " +  psm.getScanFileName();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}
					
					if ( ! single_SearchProgram_AndChildren.filterableModificationPositionAnnotationType_Names.contains( annotation.getAnnotationName() ) ) {
						String msg = "The 'search_program' / 'annotation_name' attribute pair on <filterable_modification_position_annotation> on <psm> element is not found under <search_program_info>. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  scan_number: " +  psm.getScanNumber()
								+ ",  scan_file_name: " +  psm.getScanFileName();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}
				}
			}

			if ( psm.getModificationPositionAnnotations().getDescriptiveModificationPositionAnnotations() != null 
					&& psm.getModificationPositionAnnotations().getDescriptiveModificationPositionAnnotations().getDescriptiveModificationPositionAnnotation() != null ) {
				
				Map<String, Set<String>> annotationNames_Set_Map_Key_SearchProgramName = new HashMap<>();
				
				for ( DescriptiveModificationPositionAnnotation annotation : psm.getModificationPositionAnnotations().getDescriptiveModificationPositionAnnotations().getDescriptiveModificationPositionAnnotation() ) {
					
					Set<String> annotationNames_Set_For_SearchProgramName = annotationNames_Set_Map_Key_SearchProgramName.get( annotation.getSearchProgram() );
					if ( annotationNames_Set_For_SearchProgramName == null ) {
						annotationNames_Set_For_SearchProgramName = new HashSet<>();
						annotationNames_Set_Map_Key_SearchProgramName.put( annotation.getSearchProgram(), annotationNames_Set_For_SearchProgramName );
					}

					if ( ! annotationNames_Set_For_SearchProgramName.add( annotation.getAnnotationName() ) ) {
						String msg = "The 'search_program' / 'annotation_name' attribute pair on <descriptive_modification_position_annotation> on <psm> element has duplicate which is not allowed. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  scan_number: " +  psm.getScanNumber()
								+ ",  scan_file_name: " +  psm.getScanFileName();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}

					Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Single_SearchProgram_AndChildren single_SearchProgram_AndChildren = 
							root_SearchProgram_AndChildren.searchProgram_AndChildren_Map.get( annotation.getSearchProgram() );
					
					if ( single_SearchProgram_AndChildren == null ) {
						String msg = "The 'search_program' attribute on <descriptive_modification_position_annotation> on <psm> element is not found under <search_program_info>. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  scan_number: " +  psm.getScanNumber()
								+ ",  scan_file_name: " +  psm.getScanFileName();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}
					
					if ( ! single_SearchProgram_AndChildren.descriptiveModificationPositionAnnotationType_Names.contains( annotation.getAnnotationName() ) ) {
						String msg = "The 'search_program' / 'annotation_name' attribute pair on <descriptive_modification_position_annotation> on <psm> element is not found under <search_program_info>. search_program: "
								+ annotation.getSearchProgram()
								+ ", annotation_name: "
								+ annotation.getAnnotationName() 
								+ ",  scan_number: " +  psm.getScanNumber()
								+ ",  scan_file_name: " +  psm.getScanFileName();
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}
				}
			}

		}
	}
	
	///////////////////////
	
	//  Internal Classes and their population

	/**
	 * 
	 *
	 */
	private static class Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Root {
		
		Map<String, Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Single_SearchProgram_AndChildren> searchProgram_AndChildren_Map = new HashMap<>();
	}

	/**
	 * 
	 *
	 */
	private static class Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Single_SearchProgram_AndChildren {
		
		String programName;
		
		Set<String> filterableMatchedProteinAnnotationType_Names = new HashSet<>();
		Set<String> descriptiveMatchedProteinAnnotationType_Names = new HashSet<>();
		
		Set<String> filterableReportedPeptideAnnotationType_Names = new HashSet<>();
		Set<String> descriptiveReportedPeptideAnnotationType_Names = new HashSet<>();

		Set<String> filterablePsmAnnotationType_Names = new HashSet<>();
		Set<String> descriptivePsmAnnotationType_Names = new HashSet<>();
		
		Set<String> filterableModificationPositionAnnotationType_Names = new HashSet<>();
		Set<String> descriptiveModificationPositionAnnotationType_Names = new HashSet<>();
		
	}
	
	/**
	 * @param limelightInput
	 * @return
	 * @throws LimelightImporterInternalException 
	 */
	private Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Root get_Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Root( LimelightInput limelightInput ) throws LimelightImporterInternalException {
		
		Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Root root = new Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Root();
		
		SearchProgramInfo searchProgramInfo = limelightInput.getSearchProgramInfo(); 
		SearchPrograms limelightInputSearchPrograms = searchProgramInfo.getSearchPrograms();
		List<SearchProgram> searchProgramList = limelightInputSearchPrograms.getSearchProgram();
		
		
		
		for ( SearchProgram searchProgram : searchProgramList ) {
			
			Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Single_SearchProgram_AndChildren single_SearchProgram_AndChildren = new Internal_Holder_SearchProgram_AndChildren_ConvertedToMaps_Single_SearchProgram_AndChildren();
			single_SearchProgram_AndChildren.programName = searchProgram.getName();
			
			if ( root.searchProgram_AndChildren_Map.put( searchProgram.getName(), single_SearchProgram_AndChildren ) != null ) {
				throw new LimelightImporterInternalException( "Duplicate search program '" + searchProgram.getName() + "'");
			}
			
			if ( searchProgram.getMatchedProteinAnnotationTypes() != null ) {
				
				if ( searchProgram.getMatchedProteinAnnotationTypes().getFilterableMatchedProteinAnnotationTypes() != null )  {
					for ( FilterableMatchedProteinAnnotationType annotationType : searchProgram.getMatchedProteinAnnotationTypes().getFilterableMatchedProteinAnnotationTypes().getFilterableMatchedProteinAnnotationType() ) {						
						
						if ( ! single_SearchProgram_AndChildren.filterableMatchedProteinAnnotationType_Names.add( annotationType.getName() ) ) {
							// Duplicates are checked in class ValidateAnnotationTypeRecords so throw internal error here
							throw new LimelightImporterInternalException( "Duplicate FilterableMatchedProteinAnnotationType Type Name '" + annotationType.getName() + "' under search program '" + searchProgram.getName() + "'");
						}
					}
				}
				if ( searchProgram.getMatchedProteinAnnotationTypes().getDescriptiveMatchedProteinAnnotationTypes() != null )  {
					for ( DescriptiveMatchedProteinAnnotationType annotationType : searchProgram.getMatchedProteinAnnotationTypes().getDescriptiveMatchedProteinAnnotationTypes().getDescriptiveMatchedProteinAnnotationType() ) {						
						
						if ( ! single_SearchProgram_AndChildren.descriptiveMatchedProteinAnnotationType_Names.add( annotationType.getName() ) ) {
							// Duplicates are checked in class ValidateAnnotationTypeRecords so throw internal error here
							throw new LimelightImporterInternalException( "Duplicate DescriptiveMatchedProteinAnnotationType Annotation Type Name '" + annotationType.getName() + "' under search program '" + searchProgram.getName() + "'");
						}
					}
				}
			}

			if ( searchProgram.getReportedPeptideAnnotationTypes() != null ) {
				
				if ( searchProgram.getReportedPeptideAnnotationTypes().getFilterableReportedPeptideAnnotationTypes() != null )  {
					for ( FilterableReportedPeptideAnnotationType annotationType : searchProgram.getReportedPeptideAnnotationTypes().getFilterableReportedPeptideAnnotationTypes().getFilterableReportedPeptideAnnotationType() ) {						
						
						if ( ! single_SearchProgram_AndChildren.filterableReportedPeptideAnnotationType_Names.add( annotationType.getName() ) ) {
							// Duplicates are checked in class ValidateAnnotationTypeRecords so throw internal error here
							throw new LimelightImporterInternalException( "Duplicate FilterableReportedPeptideAnnotationType Type Name '" + annotationType.getName() + "' under search program '" + searchProgram.getName() + "'");
						}
					}
				}
				if ( searchProgram.getReportedPeptideAnnotationTypes().getDescriptiveReportedPeptideAnnotationTypes() != null )  {
					for ( DescriptiveReportedPeptideAnnotationType annotationType : searchProgram.getReportedPeptideAnnotationTypes().getDescriptiveReportedPeptideAnnotationTypes().getDescriptiveReportedPeptideAnnotationType() ) {						
						
						if ( ! single_SearchProgram_AndChildren.descriptiveReportedPeptideAnnotationType_Names.add( annotationType.getName() ) ) {
							// Duplicates are checked in class ValidateAnnotationTypeRecords so throw internal error here
							throw new LimelightImporterInternalException( "Duplicate DescriptiveReportedPeptideAnnotationType Annotation Type Name '" + annotationType.getName() + "' under search program '" + searchProgram.getName() + "'");
						}
					}
				}
			}

			if ( searchProgram.getPsmAnnotationTypes() != null ) {
				
				if ( searchProgram.getPsmAnnotationTypes().getFilterablePsmAnnotationTypes() != null )  {
					for ( FilterablePsmAnnotationType annotationType : searchProgram.getPsmAnnotationTypes().getFilterablePsmAnnotationTypes().getFilterablePsmAnnotationType() ) {						
						
						if ( ! single_SearchProgram_AndChildren.filterablePsmAnnotationType_Names.add( annotationType.getName() ) ) {
							// Duplicates are checked in class ValidateAnnotationTypeRecords so throw internal error here
							throw new LimelightImporterInternalException( "Duplicate FilterablePsmAnnotationType Type Name '" + annotationType.getName() + "' under search program '" + searchProgram.getName() + "'");
						}
					}
				}
				if ( searchProgram.getPsmAnnotationTypes().getDescriptivePsmAnnotationTypes() != null )  {
					for ( DescriptivePsmAnnotationType annotationType : searchProgram.getPsmAnnotationTypes().getDescriptivePsmAnnotationTypes().getDescriptivePsmAnnotationType() ) {						
						
						if ( ! single_SearchProgram_AndChildren.descriptivePsmAnnotationType_Names.add( annotationType.getName() ) ) {
							// Duplicates are checked in class ValidateAnnotationTypeRecords so throw internal error here
							throw new LimelightImporterInternalException( "Duplicate DescriptivePsmAnnotationType Annotation Type Name '" + annotationType.getName() + "' under search program '" + searchProgram.getName() + "'");
						}
					}
				}
			}

			if ( searchProgram.getModificationPositionAnnotationTypes() != null ) {
				
				if ( searchProgram.getModificationPositionAnnotationTypes().getFilterableModificationPositionAnnotationTypes() != null )  {
					for ( FilterableModificationPositionAnnotationType annotationType : searchProgram.getModificationPositionAnnotationTypes().getFilterableModificationPositionAnnotationTypes().getFilterableModificationPositionAnnotationType() ) {						
						
						if ( ! single_SearchProgram_AndChildren.filterableModificationPositionAnnotationType_Names.add( annotationType.getName() ) ) {
							// Duplicates are checked in class ValidateAnnotationTypeRecords so throw internal error here
							throw new LimelightImporterInternalException( "Duplicate FilterableModificationPositionAnnotationType Type Name '" + annotationType.getName() + "' under search program '" + searchProgram.getName() + "'");
						}
					}
				}
				if ( searchProgram.getModificationPositionAnnotationTypes().getDescriptiveModificationPositionAnnotationTypes() != null )  {
					for ( DescriptiveModificationPositionAnnotationType annotationType : searchProgram.getModificationPositionAnnotationTypes().getDescriptiveModificationPositionAnnotationTypes().getDescriptiveModificationPositionAnnotationType() ) {						
						
						if ( ! single_SearchProgram_AndChildren.descriptiveModificationPositionAnnotationType_Names.add( annotationType.getName() ) ) {
							// Duplicates are checked in class ValidateAnnotationTypeRecords so throw internal error here
							throw new LimelightImporterInternalException( "Duplicate DescriptiveModificationPositionAnnotationType Annotation Type Name '" + annotationType.getName() + "' under search program '" + searchProgram.getName() + "'");
						}
					}
				}
			}
			
			
		}
		
		return root;
	}
	
	
}
