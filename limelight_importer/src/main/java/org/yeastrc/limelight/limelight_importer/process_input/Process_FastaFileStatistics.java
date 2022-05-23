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

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.FastaFileStatistics;
import org.yeastrc.limelight.limelight_importer.dao.FastaFileStatisticsDAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.Search_To_FastaFileStatistics_Mapping_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.input_xml_file_internal_holder_objects.Input_LimelightXMLFile_InternalHolder_Root_Object;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.FastaFileStatisticsDTO;
import org.yeastrc.limelight.limelight_shared.dto.Search_To_FastaFileStatistics_Mapping_DTO;

/**
 * 
 *
 */
public class Process_FastaFileStatistics {
	
	private static final Logger log = LoggerFactory.getLogger( Process_FastaFileStatistics.class );
	
	/**
	 * private constructor
	 */
	private Process_FastaFileStatistics(){}
	public static Process_FastaFileStatistics getInstance() {
		return new Process_FastaFileStatistics();
	}
	
	
	/**
	 * @param limelightInput
	 * @param searchId
	 * @param projectSearchId
	 * @throws Exception
	 */
	public void process_FastaFileStatistics( 
			
			Input_LimelightXMLFile_InternalHolder_Root_Object input_LimelightXMLFile_InternalHolder_Root_Object, 
			int searchId, 
			int projectSearchId ) throws Exception {
		
		FastaFileStatistics fastaFileStatistics = input_LimelightXMLFile_InternalHolder_Root_Object.getLimelightInput().getFastaFileStatistics();
		
		if ( fastaFileStatistics != null ) {

			//  Commit all inserts executed to this point
			ImportRunImporterDBConnectionFactory.getMainSingletonInstance().commitInsertControlCommitConnection();

			
			int numTargets = 0;
			int numDecoys = 0;
			int numIndependentDecoys = 0;
			
			if ( fastaFileStatistics.getNumTargets() != null ) {
				numTargets = fastaFileStatistics.getNumTargets().intValue();
			}
			if ( fastaFileStatistics.getNumDecoys() != null ) {
				numDecoys = fastaFileStatistics.getNumDecoys().intValue();
			}
			if ( fastaFileStatistics.getNumIndependentDecoys() != null ) {
				numIndependentDecoys = fastaFileStatistics.getNumIndependentDecoys().intValue();
			}
		
			FastaFileStatisticsDTO fastaFileStatisticsDTO = new FastaFileStatisticsDTO();
			
			fastaFileStatisticsDTO.setSha_384_Sum( fastaFileStatistics.getSHA384() );
			fastaFileStatisticsDTO.setNumTargets(numTargets);
			fastaFileStatisticsDTO.setNumDecoys(numDecoys);
			fastaFileStatisticsDTO.setNumIndependentDecoys(numIndependentDecoys);
			
			Integer fastaFileStatistics_Id = FastaFileStatisticsDAO_Importer.getInstance().get_Id_For_Item(fastaFileStatisticsDTO);
			
			if ( fastaFileStatistics_Id == null ) {
				//  Not in DB
				try {
					FastaFileStatisticsDAO_Importer.getInstance().saveToDatabase(fastaFileStatisticsDTO, false /* logError */ );
					
					fastaFileStatistics_Id = fastaFileStatisticsDTO.getId();  //  Saved so save id
					
				} catch (Exception e) {
					//  Eat Exception
					//  Insert failed
				}
			}

			if ( fastaFileStatistics_Id == null ) {
				//  Query failed and insert failed so must have gotten inserted between insert and query so query again
				
				fastaFileStatistics_Id = FastaFileStatisticsDAO_Importer.getInstance().get_Id_For_Item(fastaFileStatisticsDTO);
			}
			if ( fastaFileStatistics_Id == null ) {
				//  Still not in DB so Insert must have issue so execute again and let exception bubble up
				
				FastaFileStatisticsDAO_Importer.getInstance().saveToDatabase(fastaFileStatisticsDTO, true /* logError */ );
			}
			
			Search_To_FastaFileStatistics_Mapping_DTO search_To_FastaFileStatistics_Mapping_DTO = new Search_To_FastaFileStatistics_Mapping_DTO();
			
			search_To_FastaFileStatistics_Mapping_DTO.setSearchId(searchId);
			search_To_FastaFileStatistics_Mapping_DTO.setFastaFileStatistics_Mapping_Id(fastaFileStatistics_Id);
			
			Search_To_FastaFileStatistics_Mapping_DAO_Importer.getInstance().saveToDatabase( search_To_FastaFileStatistics_Mapping_DTO );
		}
	}
}