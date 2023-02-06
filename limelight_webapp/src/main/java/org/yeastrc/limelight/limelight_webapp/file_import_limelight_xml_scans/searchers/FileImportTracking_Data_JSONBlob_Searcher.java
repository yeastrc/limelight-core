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
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataJSONBlob_DTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * 
 *
 */
@Component
public class FileImportTracking_Data_JSONBlob_Searcher extends Limelight_JDBC_Base implements FileImportTracking_Data_JSONBlob_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( FileImportTracking_Data_JSONBlob_Searcher.class );


	private static final String querySQL_Start =  "SELECT file_import_tracking_id, json_contents_format_version, json_contents FROM file_import_tracking_data_json_blob_tbl"
			+ " WHERE file_import_tracking_id IN ( ";
			
			
	/**
	 * @param fileImportTrackingId_List
	 * @return
	 * @throws Exception
	 */
	
	@Override
	public List<FileImportTrackingDataJSONBlob_DTO> getFor_FileImportTrackingId_List( List<Integer> fileImportTrackingId_List ) throws Exception {
		
		List<FileImportTrackingDataJSONBlob_DTO> resultList = new ArrayList<>();
		
		if ( fileImportTrackingId_List == null ) {
			throw new IllegalArgumentException( "( fileImportTrackingId_List == null )" );
		}
		
		if ( fileImportTrackingId_List.isEmpty() ) {
			return resultList; // EARLY RETURN
		}
		
		StringBuilder sqlSB = new StringBuilder( querySQL_Start.length() + ( fileImportTrackingId_List.size() * 10 ) );
		
		sqlSB.append( querySQL_Start );
		
		for ( int counter = 1; counter <= fileImportTrackingId_List.size(); counter++ ) {
			if ( counter > 1 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		
		sqlSB.append( " ) " );
		
		final String querySQL = sqlSB.toString();
				
		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {

			int paramCounter = 0;
			for ( Integer fileImportTrackingId : fileImportTrackingId_List ) {
				paramCounter++;
				preparedStatement.setInt( paramCounter, fileImportTrackingId );
			}

			try ( ResultSet rs = preparedStatement.executeQuery() ) {

				while( rs.next() ) {
					FileImportTrackingDataJSONBlob_DTO item = new FileImportTrackingDataJSONBlob_DTO();
					item.setFileImportTrackingId( rs.getInt( "file_import_tracking_id" ) );
					item.setJsonContents_FormatVersion( rs.getInt( "json_contents_format_version" ) );
					item.setJsonContents( rs.getString( "json_contents" ) );
					resultList.add(item);
				}
			}
		} catch ( Exception e ) {
			String msg = "getAllStatusExceptInitInsertForProject(...), sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return resultList;
	}

}
