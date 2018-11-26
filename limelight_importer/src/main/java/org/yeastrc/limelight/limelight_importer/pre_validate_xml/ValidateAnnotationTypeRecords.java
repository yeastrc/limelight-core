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
package org.yeastrc.limelight.limelight_importer.pre_validate_xml;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveReportedPeptideAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptiveReportedPeptideAnnotationTypes;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptivePsmAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.DescriptivePsmAnnotationTypes;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableReportedPeptideAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterableReportedPeptideAnnotationTypes;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterablePsmAnnotationType;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FilterablePsmAnnotationTypes;
import org.yeastrc.limelight.limelight_import.api.xml_dto.SearchProgram;
import org.yeastrc.limelight.limelight_import.api.xml_dto.SearchProgramInfo;
import org.yeastrc.limelight.limelight_import.api.xml_dto.SearchPrograms;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;

/**
 * 
 *
 */
public class ValidateAnnotationTypeRecords {
	
	private static final Logger log = LoggerFactory.getLogger( ValidateAnnotationTypeRecords.class );
	
	private ValidateAnnotationTypeRecords() { }
	public static ValidateAnnotationTypeRecords getInstance() {
		return new ValidateAnnotationTypeRecords();
	}
	
	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	public void validateAnnotationTypeRecords( LimelightInput limelightInput ) throws LimelightImporterDataException {
		validateAnnotationNamesUniqueWithinSearchProgramAndType( limelightInput );
		validatePresenceOfPeptideAndPSMAnnotationTypes( limelightInput );
	}
	
	/**
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private void validateAnnotationNamesUniqueWithinSearchProgramAndType( LimelightInput limelightInput ) throws LimelightImporterDataException {
		SearchProgramInfo searchProgramInfo = limelightInput.getSearchProgramInfo(); 
		SearchPrograms limelightInputSearchPrograms = searchProgramInfo.getSearchPrograms();
		List<SearchProgram> searchProgramList =
				limelightInputSearchPrograms.getSearchProgram();
		for ( SearchProgram searchProgram : searchProgramList ) {
			validateMatchedProteinAnnotationNamesUniqueWithinSearchProgramAndType( searchProgram );
			validateReportedPeptideAnnotationNamesUniqueWithinSearchProgramAndType( searchProgram );
			validatePsmAnnotationNamesUniqueWithinSearchProgramAndType( searchProgram );
		}
	}
	

	/**
	 * validate Matched Protein Annotation Types
	 * 
	 * @param searchProgram
	 * @throws LimelightImporterDataException 
	 */
	private void validateMatchedProteinAnnotationNamesUniqueWithinSearchProgramAndType( SearchProgram searchProgram ) throws LimelightImporterDataException {
		if ( searchProgram.getMatchedProteinAnnotationTypes() != null ) {
			String msg = "Matched Protein Annotation Types are not supported yet.  ";
			log.error( msg );
			throw new LimelightImporterDataException( msg );
		}
		
	}
	
	/**
	 * validate Reported Peptide Annotation Types
	 * 
	 * @param searchProgram
	 * @throws LimelightImporterDataException 
	 */
	private void validateReportedPeptideAnnotationNamesUniqueWithinSearchProgramAndType( SearchProgram searchProgram ) throws LimelightImporterDataException {
		Set<String> annotationNames = new HashSet<>();
		SearchProgram.ReportedPeptideAnnotationTypes reportedPeptideAnnotationTypes =
				searchProgram.getReportedPeptideAnnotationTypes();
		if ( reportedPeptideAnnotationTypes == null ) {
			if ( log.isInfoEnabled() ) {
				String msg = "No Reported Peptide Annotation Types for search program name: " + searchProgram.getName();
				log.info(msg);
			}
			return;
		}
		//////	Filterable Peptide Annotations
		FilterableReportedPeptideAnnotationTypes filterablePeptideAnnotationTypes =
				reportedPeptideAnnotationTypes.getFilterableReportedPeptideAnnotationTypes();
		if ( filterablePeptideAnnotationTypes == null ) {
			if ( log.isInfoEnabled() ) {
				String msg = "No Filterable Reported Peptide Annotation Types for search program name: " + searchProgram.getName();
				log.info(msg);
			}
		} else {
			List<FilterableReportedPeptideAnnotationType> filterablePeptideAnnotationTypeList =
					filterablePeptideAnnotationTypes.getFilterableReportedPeptideAnnotationType();
			if ( filterablePeptideAnnotationTypeList == null || filterablePeptideAnnotationTypeList.isEmpty() ) {
				if ( log.isInfoEnabled() ) {
					String msg = "No Filterable Reported Peptide Annotation Types for search program name: " + searchProgram.getName();
					log.info(msg);
				}
			} else {
				for ( FilterableReportedPeptideAnnotationType filterablePeptideAnnotationType : filterablePeptideAnnotationTypeList ) {
					String annotationName = filterablePeptideAnnotationType.getName();
					if ( ! annotationNames.add( annotationName ) ) {
						String msg = "Annotation name '" + annotationName + "'"
								+ " occurs more than once for Reported Peptide annotation types for search program  "
								+ "'" + searchProgram.getName() + "'.";
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					}
				}
			}
		}
		////////   Descriptive Peptide Annotations
		DescriptiveReportedPeptideAnnotationTypes descriptivePeptideAnnotationTypes =
				reportedPeptideAnnotationTypes.getDescriptiveReportedPeptideAnnotationTypes();
		if ( descriptivePeptideAnnotationTypes == null ) {
			if ( log.isInfoEnabled() ) {
				String msg = "No Descriptive Reported Peptide Annotation Types for search program name: " + searchProgram.getName();
				log.info(msg);
			}
		} else {
			List<DescriptiveReportedPeptideAnnotationType> descriptivePeptideAnnotationTypeList =
					descriptivePeptideAnnotationTypes.getDescriptiveReportedPeptideAnnotationType();
			if ( descriptivePeptideAnnotationTypeList == null || descriptivePeptideAnnotationTypeList.isEmpty() ) {
				if ( log.isInfoEnabled() ) {
					String msg = "No Descriptive Reported Peptide Annotation Types for search program name: " + searchProgram.getName();
					log.info(msg);
				}
			} else {
				for ( DescriptiveReportedPeptideAnnotationType descriptivePeptideAnnotationType : descriptivePeptideAnnotationTypeList ) {
					String annotationName = descriptivePeptideAnnotationType.getName();
					if ( ! annotationNames.add( annotationName ) ) {
						String msg = "Annotation name '" + annotationName + "'"
								+ " occurs more than once for Reported Peptide annotation types for search program  "
								+ "'" + searchProgram.getName() + "'.";
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					}
				}
			}
		}
	}
	
	/**
	 *  validate Psm Annotation Types
	 *  
	 * @param searchProgram
	 * @throws LimelightImporterDataException 
	 */
	private void validatePsmAnnotationNamesUniqueWithinSearchProgramAndType( SearchProgram searchProgram ) throws LimelightImporterDataException {
		Set<String> annotationNames = new HashSet<>();
		SearchProgram.PsmAnnotationTypes psmAnnotationTypes =
				searchProgram.getPsmAnnotationTypes();
		if ( psmAnnotationTypes == null ) {
			if ( log.isInfoEnabled() ) {
				String msg = "No Psm Annotation Types for search program name: " + searchProgram.getName();
				log.info(msg);
			}
			return;
		}
		//////	Filterable Psm Annotations
		FilterablePsmAnnotationTypes filterablePsmAnnotationTypes =
				psmAnnotationTypes.getFilterablePsmAnnotationTypes();
		if ( filterablePsmAnnotationTypes == null ) {
			if ( log.isInfoEnabled() ) {
				String msg = "No Filterable Psm Annotation Types for search program name: " + searchProgram.getName();
				log.info(msg);
			}
		} else {
			List<FilterablePsmAnnotationType> filterablePsmAnnotationTypeList =
					filterablePsmAnnotationTypes.getFilterablePsmAnnotationType();
			if ( filterablePsmAnnotationTypeList == null || filterablePsmAnnotationTypeList.isEmpty() ) {
				if ( log.isInfoEnabled() ) {
					String msg = "No Filterable Psm Annotation Types for search program name: " + searchProgram.getName();
					log.info(msg);
				}
			} else {
				for ( FilterablePsmAnnotationType filterablePsmAnnotationType : filterablePsmAnnotationTypeList ) {
					String annotationName = filterablePsmAnnotationType.getName();
					if ( ! annotationNames.add( annotationName ) ) {
						String msg = "Annotation name '" + annotationName + "'"
								+ " occurs more than once for Psm annotation types for search program  "
								+ "'" + searchProgram.getName() + "'.";
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					}
				}
			}
		}
		////////   Descriptive Psm Annotations
		DescriptivePsmAnnotationTypes descriptivePsmAnnotationTypes =
				psmAnnotationTypes.getDescriptivePsmAnnotationTypes();
		if ( descriptivePsmAnnotationTypes == null ) {
			if ( log.isInfoEnabled() ) {
				String msg = "No Descriptive Psm Annotation Types for search program name: " + searchProgram.getName();
				log.info(msg);
			}
		} else {
			List<DescriptivePsmAnnotationType> descriptivePsmAnnotationTypeList =
					descriptivePsmAnnotationTypes.getDescriptivePsmAnnotationType();
			if ( descriptivePsmAnnotationTypeList == null || descriptivePsmAnnotationTypeList.isEmpty() ) {
				if ( log.isInfoEnabled() ) {
					String msg = "No Descriptive Psm Annotation Types for search program name: " + searchProgram.getName();
					log.info(msg);
				}
			} else {
				for ( DescriptivePsmAnnotationType descriptivePsmAnnotationType : descriptivePsmAnnotationTypeList ) {
					String annotationName = descriptivePsmAnnotationType.getName();
					if ( ! annotationNames.add( annotationName ) ) {
						String msg = "Annotation name '" + annotationName + "'"
								+ " occurs more than once for Psm annotation types for search program  "
								+ "'" + searchProgram.getName() + "'.";
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					}
				}
			}
		}
	}

	////////////////////////////////
	/**
	 * Validate presence of Peptide and PSM Annotation Types
	 * 
	 * Throw LimelightImporterDataException if:
	 *   No PSM filterable annotation types.
	 *   At least one PSM filterable  annotation type but none of them are a default filter.
	 *   At least one Peptide filterable  annotation type but none of them are a default filter.
	 *   
	 * @param limelightInput
	 * @throws LimelightImporterDataException for data errors
	 */
	private void validatePresenceOfPeptideAndPSMAnnotationTypes( LimelightInput limelightInput ) throws LimelightImporterDataException {
		
		boolean foundPeptideFilterableAnnotationType = false;
		boolean foundPeptideDefaultFilterableAnnotationType = false;
		boolean foundPsmFilterableAnnotationType = false;
		boolean foundPsmDefaultFilterableAnnotationType = false;
		SearchProgramInfo searchProgramInfo = limelightInput.getSearchProgramInfo(); 
		SearchPrograms limelightInputSearchPrograms = searchProgramInfo.getSearchPrograms();
		List<SearchProgram> searchProgramList =
				limelightInputSearchPrograms.getSearchProgram();
		///////////////////////
		//   Process Peptide Annotation Types
		for ( SearchProgram searchProgram : searchProgramList ) {
			SearchProgram.ReportedPeptideAnnotationTypes reportedPeptideAnnotationTypes =
					searchProgram.getReportedPeptideAnnotationTypes();
			if ( reportedPeptideAnnotationTypes == null ) {
				continue;  //  EARLY CONTINUE
			}
			//////	Filterable Peptide Annotations
			FilterableReportedPeptideAnnotationTypes filterablePeptideAnnotationTypes =
					reportedPeptideAnnotationTypes.getFilterableReportedPeptideAnnotationTypes();
			if ( filterablePeptideAnnotationTypes == null ) {
				continue;  //  EARLY CONTINUE
			}
			List<FilterableReportedPeptideAnnotationType> filterablePeptideAnnotationTypeList =
					filterablePeptideAnnotationTypes.getFilterableReportedPeptideAnnotationType();
			if ( filterablePeptideAnnotationTypeList == null || filterablePeptideAnnotationTypeList.isEmpty() ) {
				continue;  //  EARLY CONTINUE
			}
			for ( FilterableReportedPeptideAnnotationType filterablePeptideAnnotationType : filterablePeptideAnnotationTypeList ) {
				foundPeptideFilterableAnnotationType = true;
				if ( filterablePeptideAnnotationType.getDefaultFilterValue() != null ) {
					foundPeptideDefaultFilterableAnnotationType = true;
					break;
				}
			}
		}
		///////////////////////
		//   Process PSM Annotation Types
		for ( SearchProgram searchProgram : searchProgramList ) {
			SearchProgram.PsmAnnotationTypes psmAnnotationTypes =
					searchProgram.getPsmAnnotationTypes();
			if ( psmAnnotationTypes == null ) {
				continue;  //  EARLY CONTINUE
			}
			FilterablePsmAnnotationTypes filterablePsmAnnotationTypes =
					psmAnnotationTypes.getFilterablePsmAnnotationTypes();
			if ( filterablePsmAnnotationTypes == null ) {
				continue;  //  EARLY CONTINUE
			}
			List<FilterablePsmAnnotationType> filterablePsmAnnotationTypeList =
					filterablePsmAnnotationTypes.getFilterablePsmAnnotationType();
			if ( filterablePsmAnnotationTypeList == null || filterablePsmAnnotationTypeList.isEmpty() ) {
				continue;  //  EARLY CONTINUE
			}
			for ( FilterablePsmAnnotationType filterablePsmAnnotationType : filterablePsmAnnotationTypeList ) {
				foundPsmFilterableAnnotationType = true;
				if ( filterablePsmAnnotationType.getDefaultFilterValue() != null ) {
					foundPsmDefaultFilterableAnnotationType = true;
					break;
				}
			}
		}
		//  Not really needed since covered by XSD validation
		if ( ! foundPsmFilterableAnnotationType ) {
			String msg = "At least one PSM Filterable Annotation Type is required.";
			log.error( msg );
			throw new LimelightImporterDataException( msg );
		}
//		//  Not covered by XSD validation
//		if ( ! foundPsmDefaultFilterableAnnotationType ) {
//			String msg = "At least one PSM Filterable Annotation Type is required to be a default filter.";
//			log.error( msg );
//			throw new LimelightImporterDataException( msg );
//		}
//		//  Not covered by XSD validation
//		if ( foundPeptideFilterableAnnotationType && ( ! foundPeptideDefaultFilterableAnnotationType ) ) {
//			String msg = "There is at least one Peptide Filterable Annotation Type "
//					+ " but none of theem is a default filter.";
//			log.error( msg );
//			throw new LimelightImporterDataException( msg );
//		}
	}
}
