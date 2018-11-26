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
package org.yeastrc.limelight.limelight_importer.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_shared.dto.UnifiedRepPepIsotopeLabelLookupDTO;

/**
 * table unified_rep_pep_isotope_label_lookup_tbl
 *
 */
public class UnifiedRepPepIsotopeLabelLookupDAO_Importer {
	
	private static final Logger log = LoggerFactory.getLogger( UnifiedRepPepIsotopeLabelLookupDAO_Importer.class );
	
	private UnifiedRepPepIsotopeLabelLookupDAO_Importer() { }
	public static UnifiedRepPepIsotopeLabelLookupDAO_Importer getInstance() { return new UnifiedRepPepIsotopeLabelLookupDAO_Importer(); }

	private static String SAVE_SQL = "INSERT INTO unified_rep_pep_isotope_label_lookup_tbl "
			+ " (unified_reported_peptide_lookup_id, isotope_label_id ) "
			+ " VALUES (?, ?)";
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void save( UnifiedRepPepIsotopeLabelLookupDTO item, Connection dbConnection ) throws Exception {

		final String sql = SAVE_SQL;
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
			int counter = 0;
			
			counter++;
			pstmt.setInt( counter,  item.getUnifiedReportedPeptideLookupId() );
			counter++;
			pstmt.setInt( counter,  item.getIsotopeLabelId() );

			pstmt.executeUpdate();
			
			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					item.setId( rs.getInt( 1 ) );
				} else
					throw new LimelightImporterDatabaseException( "Failed to insert UnifiedRepPepIsotopeLabelLookupDTO" );
			}			
		} catch ( Exception e ) {
			String msg = "ERROR: sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		
	}
}
