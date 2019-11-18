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
package org.yeastrc.limelight.limelight_importer.process_input;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.Psm;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.SearchScanFileEntry;
import org.yeastrc.limelight.limelight_shared.dto.PsmDTO;
import org.yeastrc.limelight.limelight_shared.dto.ReportedPeptideDTO;

/**
 * 
 *
 */
public class PopulatePsmDTO {

	private static final Logger log = LoggerFactory.getLogger( PopulatePsmDTO.class );

	/**
	 * private constructor
	 */
	private PopulatePsmDTO(){}
	public static PopulatePsmDTO getInstance() {
		return new PopulatePsmDTO();
	}
	
	/**
	 * @param searchId
	 * @param reportedPeptideDTO
	 * @param psm
	 * @param psmHasModifications
	 * @param psmHasReporterIons
	 * @param searchScanFileEntry_KeyScanFilename
	 * @return
	 * @throws LimelightImporterDataException
	 * @throws Exception
	 */
	public PsmDTO populatePsmDTO(
			int searchId,
			ReportedPeptideDTO reportedPeptideDTO, 
			Psm psm,
			boolean psmHasModifications,
			boolean psmHasReporterIons,
			Map<String, SearchScanFileEntry> searchScanFileEntry_KeyScanFilename ) throws LimelightImporterDataException, Exception {
		
		PsmDTO psmDTO = new PsmDTO();
		psmDTO.setSearchId( searchId );
		psmDTO.setReportedPeptideId( reportedPeptideDTO.getId() );
		if ( psm.getPrecursorCharge() == null ) {
			String msg = "Psm PrecursorCharge cannot be null.  " 
					+ "  Psm Scanfilename: " + psm.getScanFileName()
					+ ", Psm ScanNumber: " + psm.getScanNumber();
			log.error( msg );
			throw new LimelightImporterDataException( msg );
		}
		psmDTO.setCharge( psm.getPrecursorCharge().intValue() );
		
		psmDTO.setPrecursor_RetentionTime( psm.getPrecursorRetentionTime() );
		psmDTO.setPrecursor_MZ( psm.getPrecursorMZ() );
		
		psmDTO.setHasModifications( psmHasModifications );
		psmDTO.setHasReporterIons( psmHasReporterIons );
		
		if ( psm.getScanNumber() != null ) {
			psmDTO.setScanNumber( psm.getScanNumber().intValue() );
		}
		
		String psmScanFileName = psm.getScanFileName();
		
		if ( StringUtils.isNotEmpty( psmScanFileName ) ) {
			
			if ( searchScanFileEntry_KeyScanFilename == null ) {
				String msg = "searchScanFileEntry_KeyScanFilename == null when psmScanFileName has a value, for psmScanFileName: " + psmScanFileName;
				log.error( msg );
				throw new LimelightImporterInternalException(msg);
			}
			
			SearchScanFileEntry searchScanFileEntry = searchScanFileEntry_KeyScanFilename.get( psmScanFileName );
			
			if ( searchScanFileEntry == null ) {
				String msg = "No entry found in searchScanFileEntry_KeyScanFilename for psmScanFileName: " + psmScanFileName;
				log.error( msg );
				throw new LimelightImporterInternalException(msg);
			}
			
			psmDTO.setSearchScanFileId( searchScanFileEntry.getSearchScanFileId() );
			
			if ( psm.getScanNumber() != null ) {
				searchScanFileEntry.addScanNumberFromPSM( psm.getScanNumber().intValue() );
			}

			
		}
		
		return psmDTO;
		
	}
}
