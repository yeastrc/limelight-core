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
package org.yeastrc.limelight.limelight_importer.peptide_protein_position;

import java.util.HashSet;
import java.util.Set;

import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_ProteinCoverage_BatchInserter_DAO;
import org.yeastrc.limelight.limelight_shared.dto.ProteinCoverageDTO;

/**
 * Save ProteinCoverageDTO to db, but not more than once
 *
 */
public class ProteinCoverageDTO_SaveToDB_NoDups {


	private static Set<ProteinCoverageDTO> savedRecords = new HashSet<>( 1000000 );

	//  private constructor
	private ProteinCoverageDTO_SaveToDB_NoDups() { }
	
	public static ProteinCoverageDTO_SaveToDB_NoDups getInstance() { return new ProteinCoverageDTO_SaveToDB_NoDups(); }
	
	/**
	 * Save ProteinCoverageDTO to db, but not more than once based on ProteinCoverageDTO equals()
	 * 
	 * @param item
	 * @throws Exception
	 */
	public void proteinCoverageDTO_SaveToDB_NoDups( ProteinCoverageDTO item ) throws Exception {
		
		if ( savedRecords.add(item) ) {
			
			DB_Insert_ProteinCoverage_BatchInserter_DAO.getSingletonInstance().insert_Batching_Object( item );
		}
	}
}
