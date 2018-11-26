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
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportStatus;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.populate_dto_from_result.FileImportTracking_PopulateDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.objects.FileTrackingIdStatusId;

/**
 * 
 *
 */
@Component
public class FileImportTracking_All_Searcher extends Limelight_JDBC_Base implements FileImportTracking_All_SearcherIF {

	private static final Logger log = LoggerFactory.getLogger( FileImportTracking_All_Searcher.class );

	private static final String SELECT_WHERE_CLAUSE = 
			"  status_id IN ( " 
					+ FileImportStatus.QUEUED.value()
					+ ", "
					+ FileImportStatus.RE_QUEUED.value()
					+ ", "
					+ FileImportStatus.STARTED.value()
					+ ", "
					+ FileImportStatus.FAILED.value()
					+ ", "
					+ FileImportStatus.COMPLETE.value()
					+ " ) "
					+ " AND "
					+ " marked_for_deletion != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE
					+ " AND project_id = ? ORDER BY priority, id DESC"
					;
	/**
	 * @param projectId
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<FileImportTrackingDTO> getAllForWebDisplayForProject( int projectId ) throws Exception {

		List<FileImportTrackingDTO> resultList = new ArrayList<>();

		final String querySQL =  "SELECT * FROM file_import_tracking_tbl"
				+ " WHERE "
				+ SELECT_WHERE_CLAUSE;

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {

			int paramCounter = 0;
			paramCounter++;
			preparedStatement.setInt( paramCounter, projectId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {

				while( rs.next() ) {
					FileImportTrackingDTO returnItem = 
							FileImportTracking_PopulateDTO.getInstance()
							.populateResultObject( rs );
					resultList.add(returnItem);
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select FileImportTrackingDTO, sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return resultList;
	}

	/**
	 * @param projectId
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<FileTrackingIdStatusId> getAllStatusExceptInitInsertForProject( int projectId ) throws Exception {
		List<FileTrackingIdStatusId> resultList = new ArrayList<>();
		final String querySQL =  "SELECT id, status_id FROM file_import_tracking_tbl"
				+ " WHERE "
				+ SELECT_WHERE_CLAUSE;

		try ( Connection connection = super.getDBConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {

			int paramCounter = 0;
			paramCounter++;
			preparedStatement.setInt( paramCounter, projectId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {

				while( rs.next() ) {
					FileTrackingIdStatusId item = new FileTrackingIdStatusId();
					item.setTrackingId( rs.getInt( "id" ) );
					item.setStatusId( rs.getInt( "status_id" ) );
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
