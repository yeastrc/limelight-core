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

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ReportedPeptide;
import org.yeastrc.limelight.limelight_importer.dao.PeptideDAO_Importer;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_shared.dto.PeptideDTO;
import org.yeastrc.limelight.limelight_shared.dto.UnifiedReportedPeptideLookupDTO;

/**
 * 
 *
 */
public class UnifiedReportedPeptideAndChildren_InsertIfNotInDB {

	private static final Logger log = LoggerFactory.getLogger( UnifiedReportedPeptideAndChildren_InsertIfNotInDB.class );
	
	private UnifiedReportedPeptideAndChildren_InsertIfNotInDB() { }
	public static UnifiedReportedPeptideAndChildren_InsertIfNotInDB getInstance() { return new UnifiedReportedPeptideAndChildren_InsertIfNotInDB(); }
	
	/**
	 * @param reportedPeptide
	 * @return
	 * @throws Exception
	 */
	public UnifiedReportedPeptideLookupDTO insertIfNotInDBUnifiedReportedPeptideAndChildren( ReportedPeptide reportedPeptide ) throws Exception {

		String peptideSequence = reportedPeptide.getSequence();
		
		PeptideDTO peptideDTO = PeptideDAO_Importer.getInstance().getPeptideDTO_OrSave( peptideSequence );
		if ( peptideDTO == null ) {
			String msg = "peptideDTO == null";
			log.error( msg );
			throw new LimelightImporterInternalException(msg);
		}
		
		UnifiedReportedPeptide_CreateDTOs_Root_IsotopeLabelsAndMods.CreateDTOs_Root_IsotopeLabelsAndMods_Result createDTOs_Root_IsotopeLabelsAndMods_Result =
				UnifiedReportedPeptide_CreateDTOs_Root_IsotopeLabelsAndMods.getInstance()
				.createDTOs_Root_IsotopeLabelsAndMods( reportedPeptide, peptideDTO );

		UnifiedReportedPeptideLookupDTO unifiedReportedPeptideLookupDTO =
				UnifiedReportedPeptide_SaveRoot_Mods_IsotopeLabelsIfNeeded.getInstance()
				.SaveRoot_Mods_IsotopeLabelsIfNeeded( createDTOs_Root_IsotopeLabelsAndMods_Result );
		
		return unifiedReportedPeptideLookupDTO;
	}
}
