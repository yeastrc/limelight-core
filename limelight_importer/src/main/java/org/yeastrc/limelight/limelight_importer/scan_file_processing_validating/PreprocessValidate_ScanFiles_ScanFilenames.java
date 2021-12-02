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
package org.yeastrc.limelight.limelight_importer.scan_file_processing_validating;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psms;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptides;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer;
import org.yeastrc.limelight.limelight_importer.objects.ScanFileFileContainer_AllEntries;

/**
 * 
 *
 */
public class PreprocessValidate_ScanFiles_ScanFilenames {

	private static final Logger log = LoggerFactory.getLogger( PreprocessValidate_ScanFiles_ScanFilenames.class );
	/**
	 * private constructor
	 */
	private PreprocessValidate_ScanFiles_ScanFilenames(){}
	public static PreprocessValidate_ScanFiles_ScanFilenames getInstance() {
		return new PreprocessValidate_ScanFiles_ScanFilenames();
	}
	
	/**
	 * @param limelightInput
	 * @param scanFileFileContainer_KeyFilename - !! Altered to remove any entries where filenames not in psm.getScanFileName()
	 * @return List of scan file names from PSM elements
	 * @throws LimelightImporterDataException 
	 */
	public Set<String> preprocessValidate_ScanFiles_ScanFilenames( 
			LimelightInput limelightInput, 
			ScanFileFileContainer_AllEntries scanFileFileContainer_AllEntries ) throws LimelightImporterDataException {
		
		//  Result from this method:
		Set<String> scanFilenamesLimelightXMLInputSet = new HashSet<>();
		
		String scanFilenameFromScanFileToImport_SingleScanFileToImport = null;
		
		if ( scanFileFileContainer_AllEntries.getSize() == 1 ) {
			scanFilenameFromScanFileToImport_SingleScanFileToImport = scanFileFileContainer_AllEntries.get_ScanFileFileContainer_List().get(0).getScanFilename();
		}
		
		//  Create lookup Sets of scanFileFiles from scanFileFileContainer_KeyFilename
		
//		Set<String> scanFilenames_From_scanFileFileContainer = new HashSet<>();
//		Set<String> scanFilenames_From_scanFileFileContainer_No_FilenameSuffix = new HashSet<>();
		

		//  Process PSMs
				
		ReportedPeptides reportedPeptides = limelightInput.getReportedPeptides();
		if ( reportedPeptides != null ) {
			List<ReportedPeptide> reportedPeptideList =
					reportedPeptides.getReportedPeptide();
			if ( reportedPeptideList != null && ( ! reportedPeptideList.isEmpty() ) ) {
				for ( ReportedPeptide reportedPeptide : reportedPeptideList ) {
					Psms psms =	reportedPeptide.getPsms();
					if ( psms != null ) {
						List<Psm> psmList = psms.getPsm();
						if ( psmList != null ) {
							for ( Psm psm : psmList ) {
								String scanFileName_On_PSM_In_LimelightXMLInput = psm.getScanFileName();
								if ( StringUtils.isEmpty( scanFileName_On_PSM_In_LimelightXMLInput ) ) {
									if ( ! scanFileFileContainer_AllEntries.hasAnyEntries() ) {
										//   Valid condition, 
									} else {
										if ( scanFileFileContainer_AllEntries.getSize() != 1 ) {
											String msg = "Scan Filename on PSM is empty when there is more than one scan file to be imported.";
											log.error(msg);
											throw new LimelightImporterDataException(msg);
										} else {
											//  Handle special case of psm.scan_file_name empty and only 1 scan file to import
											//  Copy scan filename to PSM
											psm.setScanFileName( scanFilenameFromScanFileToImport_SingleScanFileToImport );
											//  Add scan filename to set of scan filenames
											scanFilenamesLimelightXMLInputSet.add( scanFilenameFromScanFileToImport_SingleScanFileToImport );
										}
									}
								} else {
									if ( scanFileFileContainer_AllEntries.hasAnyEntries() ) {

										//  Yes Scan Files being Imported so look up scan filename from PSM 
										
										ScanFileFileContainer scanFileFileContainer_From_Filename_Or_FilenameWithoutSuffix =
												scanFileFileContainer_AllEntries.get_From_ScanFilename( scanFileName_On_PSM_In_LimelightXMLInput );
										if ( scanFileFileContainer_From_Filename_Or_FilenameWithoutSuffix == null ) {
											scanFileFileContainer_From_Filename_Or_FilenameWithoutSuffix =
													scanFileFileContainer_AllEntries.get_From_ScanFilename_NoSuffix( scanFileName_On_PSM_In_LimelightXMLInput );
										}
										
										if ( scanFileFileContainer_From_Filename_Or_FilenameWithoutSuffix == null ) {
											
											//  No entry for scanFileName_On_PSM_In_LimelightXMLInput in Scan Files being Imported
											
											List<String> scanFilenames_From_scanFileFileContainer = new ArrayList<>();
											List<String> scanFilenames_From_scanFileFileContainer_No_FilenameSuffix = new ArrayList<>();
											
											for ( ScanFileFileContainer scanFileFileContainer_InList : scanFileFileContainer_AllEntries.get_ScanFileFileContainer_List() ) {
												scanFilenames_From_scanFileFileContainer.add( scanFileFileContainer_InList.getScanFilename() );
												scanFilenames_From_scanFileFileContainer_No_FilenameSuffix.add( scanFileFileContainer_InList.getScanFilename_NoSuffix() );
											}
											
										
											String msg = "A scan filename '" 
													+ scanFileName_On_PSM_In_LimelightXMLInput
													+ "' listed on a PSM in the Limelight XML file was not found among the scan files uploaded for import."
													+ "  List of Scan Filenames to be imported: " 
													+ StringUtils.join( scanFilenames_From_scanFileFileContainer, ", " )
													+ ".  List of Scan Filenames to be imported with suffixes removed: " 
													+ StringUtils.join( scanFilenames_From_scanFileFileContainer_No_FilenameSuffix, ", " );
											
											log.error( msg );
											throw new LimelightImporterDataException(msg);
										}
										
										scanFilenamesLimelightXMLInputSet.add( scanFileFileContainer_From_Filename_Or_FilenameWithoutSuffix.getScanFilename() );
										
									} else {	
									
										//  No Scan Files being Imported so use scan filename from PSM
										
										scanFilenamesLimelightXMLInputSet.add( scanFileName_On_PSM_In_LimelightXMLInput );
									}
								}
							}
						}
					}
				}
			}
		}
		
		// scanFileFileContainer_AllEntries altered to remove any entries where filenames not in psm.getScanFileName()
		
		if ( ! scanFilenamesLimelightXMLInputSet.isEmpty() ) {
			scanFileFileContainer_AllEntries.removeAllEntries_Except_These_ScanFilenames( scanFilenamesLimelightXMLInputSet );
		}
		
		return scanFilenamesLimelightXMLInputSet;
	}
}
