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
package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.searchers_results.PsmWebDisplayWebServiceResult;

/**
 * 
 *
 */
@Component
public class PsmWebDisplaySearcher extends Limelight_JDBC_Base implements PsmWebDisplaySearcherIF {

	private static final Logger log = LoggerFactory.getLogger( PsmWebDisplaySearcher.class );

	private static final String SQL_MAIN = 
			"SELECT psm_tbl.id AS psm_id, psm_tbl.reported_peptide_id, "
			+ 		" psm_tbl.has_modifications, psm_tbl.has_open_modifications, psm_tbl.has_reporter_ions, "
			+ 		" is_independent_decoy, "  //  Not return 'is_decoy' since excluded in SQL
			+ 		" psm_tbl.charge, psm_tbl.precursor_retention_time, psm_tbl.precursor_m_z, "
			+ 		 " psm_tbl.scan_number AS scan_number, psm_tbl.search_scan_file_id, "
			+        " search_scan_file_tbl.filename AS scan_filename, search_scan_file_tbl.scan_file_id AS scan_file_id "
			+ " FROM psm_tbl  "
			+ " LEFT OUTER JOIN search_scan_file_tbl ON psm_tbl.search_scan_file_id = search_scan_file_tbl.id ";
	
	private static final String SQL_INNER_JOIN_SEARCH_SUB_GROUP_TABLE =
			" INNER JOIN psm_search_sub_group_tbl ON psm_tbl.id = psm_search_sub_group_tbl.psm_id ";

	private static final String SQL_WHERE_START =  " WHERE psm_tbl.search_id = ? ";
	
	  

	/**
	 * @param searchId
	 * @param searchSubGroup_Id_List - Optional
	 * @param psmIds_Include - Required
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<PsmWebDisplayWebServiceResult> getPsmsWebDisplay( 
			int searchId, 
			List<Integer> searchSubGroup_Id_List, //  Optional
			List<Long> psmIds_Include  ) throws Exception {

		if ( ( psmIds_Include == null || psmIds_Include.isEmpty() ) ) {
			String msg = "( psmIds_Include is null or empty ).";
			log.warn(msg);
			throw new LimelightInternalErrorException(msg);
		}
		
		List<PsmWebDisplayWebServiceResult> psms = new ArrayList<PsmWebDisplayWebServiceResult>();
		
		StringBuilder sqlSB = new StringBuilder( 1000 );
		//////////////////////
		/////   Start building the SQL
		sqlSB.append( SQL_MAIN );
		
		if ( searchSubGroup_Id_List != null ) {
			
			sqlSB.append( SQL_INNER_JOIN_SEARCH_SUB_GROUP_TABLE );
		}
		
		///////////
		sqlSB.append( SQL_WHERE_START );
		//////////
		
		if ( searchSubGroup_Id_List != null ) {
			
			sqlSB.append( " AND psm_search_sub_group_tbl.search_sub_group_id IN (  " );
			
			for ( int counter = 1; counter <= searchSubGroup_Id_List.size(); counter++ ) {
				if ( counter != 1 ) {
					sqlSB.append( "," );
				}
				sqlSB.append( "?" );
			}
			sqlSB.append( " ) " );
		}

		//  Filter using psmIds Includes

		sqlSB.append( " AND psm_tbl.id IN ( " );

		for ( int counter = 1; counter <= psmIds_Include.size(); counter++ ) {
			if ( counter != 1 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		sqlSB.append( " ) " );
		
		String sql = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			int paramCounter = 0;
			paramCounter++;
			preparedStatement.setInt( paramCounter, searchId );
						
			if ( searchSubGroup_Id_List != null ) {
				for ( Integer searchSubGroup_Id : searchSubGroup_Id_List ) {
					paramCounter++;
					preparedStatement.setInt( paramCounter, searchSubGroup_Id );
				}
			}

			//  Filter using psmIds Includes

			for ( Long psmId : psmIds_Include ) {
				paramCounter++;
				preparedStatement.setLong(paramCounter, psmId );
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					PsmWebDisplayWebServiceResult psmWebDisplay = new PsmWebDisplayWebServiceResult();
					psmWebDisplay.setSearchId( searchId );
					psmWebDisplay.setPsmId( rs.getLong( "psm_id" ) );
					
					psmWebDisplay.setReportedPeptideId( rs.getInt( "reported_peptide_id" ) );

					{
						int intValue = rs.getInt( "has_modifications" );
						if ( intValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							psmWebDisplay.setHasModifications( true );
						}
					}
					{
						int intValue = rs.getInt( "has_open_modifications" );
						if ( intValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							psmWebDisplay.setHasOpenModifications( true );
						}
					}
					{
						int intValue = rs.getInt("has_reporter_ions" );
						if ( intValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							psmWebDisplay.setHasReporterIons( true );
						}
					}
					
					//  NOT return 'is_decoy' since Excluded in SQL

					{
						int intValue = rs.getInt("is_independent_decoy" );
						if ( intValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							psmWebDisplay.setPsmIs_IndependentDecoy( true );
						}
					}

					psmWebDisplay.setCharge( rs.getInt( "charge" ) );
					psmWebDisplay.setPsm_precursor_RetentionTime( rs.getBigDecimal( "precursor_retention_time" ) );
					psmWebDisplay.setPsm_precursor_MZ( rs.getBigDecimal( "precursor_m_z" ) );
					
					psmWebDisplay.setScanNumber( rs.getInt( "scan_number" ) );
					{
						int searchScanFileId = rs.getInt( "search_scan_file_id" );
						if ( ! rs.wasNull() ) {
							psmWebDisplay.setSearchScanFileId( searchScanFileId );
						}
					}
					psmWebDisplay.setScanFilename( rs.getString( "scan_filename" ) );
					
					int scanFileId = rs.getInt( "scan_file_id" );
					if ( ! rs.wasNull() ) {
						psmWebDisplay.setScanFileId( scanFileId );
					}

					psms.add( psmWebDisplay );
				}
			}
		} catch ( Exception e ) {
			String msg = "Exception in getPsmsInternal( ... ): sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return psms;
	}
}
