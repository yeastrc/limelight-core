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
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingStatusValLkupDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table file_import_tracking_status_values_lookup_tbl
 *
 */
@Component
public class FileImportTrackingStatusValuesLookupDAO extends Limelight_JDBC_Base implements FileImportTrackingStatusValuesLookupDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( FileImportTrackingStatusValuesLookupDAO.class );

	/**
	 * @return 
	 * @throws Exception
	 */
	@Override
	public List<FileImportTrackingStatusValLkupDTO> getAll( ) throws Exception {

		List<FileImportTrackingStatusValLkupDTO>  returnList = new ArrayList<>();
		
		final String sql =  "SELECT * FROM file_import_tracking_status_values_lookup_tbl ";

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					FileImportTrackingStatusValLkupDTO returnItem = populateResultObject( rs );
					returnList.add(returnItem);
				}
			}			
		} catch ( Exception e ) {
			String msg = "Failed to select FileImportTrackingStatusValLkupDTO, sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		
		return returnList;
	}
	
//	/**
//	 * @param id
//	 * @return 
//	 * @throws Exception
//	 */
//	public FileImportTrackingStatusValLkupDTO getForId( int id ) throws Exception {
//
//		FileImportTrackingStatusValLkupDTO result = null;
//				
//		final String sql = "SELECT * FROM file_import_tracking_status_values_lookup_tbl WHERE id = ?";
//
//		try ( Connection connection = super.getDBConnection();
//				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
//			
//			preparedStatement.setInt( 1, id );
//
//			try ( ResultSet rs = preparedStatement.executeQuery() ) {
//				if ( rs.next() ) {
//					result = populateResultObject( rs );
//				}
//			}
//		} catch ( Exception e ) {
//			String msg = "Failed to select FileImportTrackingStatusValLkupDTO, id: " + id + ", sql: " + sql;
//			log.error( msg, e );
//			throw e;
//		}
//		return result;
//	}
	
	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	@Override
	public FileImportTrackingStatusValLkupDTO populateResultObject(ResultSet rs) throws SQLException {
		
		FileImportTrackingStatusValLkupDTO returnItem = new FileImportTrackingStatusValLkupDTO();
		returnItem.setId( rs.getInt( "id" ) );
		returnItem.setStatusDisplayText( rs.getString( "display_text" ) );
		return returnItem;
	}
	
}
