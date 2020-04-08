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

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.io.FilenameUtils;
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
			Map<String, ScanFileFileContainer> scanFileFileContainer_KeyFilename ) throws LimelightImporterDataException {
		
		//  Result from this method:
		Set<String> scanFilenamesLimelightXMLInputSet = new HashSet<>();
		
		String scanFilenameFromScanFileToImport_SingleScanFileToImport = null;
		
		if ( scanFileFileContainer_KeyFilename != null && scanFileFileContainer_KeyFilename.size() == 1 ) {
			scanFilenameFromScanFileToImport_SingleScanFileToImport = scanFileFileContainer_KeyFilename.keySet().iterator().next();
		}
		
		//  Create lookup Sets of scanFileFiles from scanFileFileContainer_KeyFilename
		
		Set<String> scanFilenames_From_scanFileFileContainer = new HashSet<>();
		Set<String> scanFilenames_From_scanFileFileContainer_No_FilenameSuffix = new HashSet<>();
		
		for ( String scanFilename : scanFileFileContainer_KeyFilename.keySet() ) {
			
			scanFilenames_From_scanFileFileContainer.add( scanFilename );
			
			String scanFilename_NoSuffix = FilenameUtils.removeExtension( scanFilename );
			
			scanFilenames_From_scanFileFileContainer_No_FilenameSuffix.add( scanFilename_NoSuffix );
		}

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
								String scanFileNameLimelightXMLInput = psm.getScanFileName();
								if ( StringUtils.isEmpty( scanFileNameLimelightXMLInput ) ) {
									if (  scanFileFileContainer_KeyFilename == null || scanFileFileContainer_KeyFilename.isEmpty() ) {
										//   Valid condition, 
									} else {
										if ( scanFileFileContainer_KeyFilename.size() != 1 ) {
											String msg = "ERROR: Scan Filename on PSM is empty when there is more than one scan file on the command line.";
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
									if ( scanFileFileContainer_KeyFilename != null && ( ! scanFileFileContainer_KeyFilename.isEmpty() ) ) {
										if ( ( ! scanFilenames_From_scanFileFileContainer.contains( scanFileNameLimelightXMLInput ) 
												&& ( ! scanFilenames_From_scanFileFileContainer_No_FilenameSuffix.contains( scanFileNameLimelightXMLInput ) ) ) ) {
											String msg = "Scan Filename on PSM is not in list of Scan Files to be imported."
													+ "  Scan Filename on PSM: " + scanFileNameLimelightXMLInput
													+ ".  List of Scan Filenames to be imported: " 
													+ StringUtils.join( scanFilenames_From_scanFileFileContainer, ", " )
													+ ".  List of Scan Filenames to be imported with suffixes removed: " 
													+ StringUtils.join( scanFilenames_From_scanFileFileContainer_No_FilenameSuffix, ", " );
											
											log.error( msg );
											throw new LimelightImporterDataException(msg);
										}
									}									
									scanFilenamesLimelightXMLInputSet.add( scanFileNameLimelightXMLInput );
								}
							}
						}
					}
				}
			}
		}
		
		// scanFileFileContainer_KeyFilename altered to remove any entries where filenames not in psm.getScanFileName()
		if ( ( ! scanFilenamesLimelightXMLInputSet.isEmpty() ) 
				&& scanFileFileContainer_KeyFilename != null 
				&& ( ! scanFileFileContainer_KeyFilename.isEmpty() ) ) {
			
			Iterator<Map.Entry<String, ScanFileFileContainer>> iter_scanFileFileContainer_KeyFilename = scanFileFileContainer_KeyFilename.entrySet().iterator();
			while ( iter_scanFileFileContainer_KeyFilename.hasNext() ) {
				Map.Entry<String, ScanFileFileContainer> entry_scanFileFileContainer_KeyFilename = iter_scanFileFileContainer_KeyFilename.next();
				String scanFileUploadedFilename = entry_scanFileFileContainer_KeyFilename.getKey();
				if ( ! scanFilenamesLimelightXMLInputSet.contains( scanFileUploadedFilename ) ) {
					iter_scanFileFileContainer_KeyFilename.remove();
				}
			}
		}
		
		return scanFilenamesLimelightXMLInputSet;
	}
}
