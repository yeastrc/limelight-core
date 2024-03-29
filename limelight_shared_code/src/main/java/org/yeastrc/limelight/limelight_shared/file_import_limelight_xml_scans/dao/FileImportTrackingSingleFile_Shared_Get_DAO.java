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
package org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.db.SharedCodeOnly_DBConnectionProvider;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingSingleFileDTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.FileImportFileType;

/**
 * Shared Get Only
 * 
 * Table file_import_tracking_single_file_tbl
 *
 */
public class FileImportTrackingSingleFile_Shared_Get_DAO {

	private static final Logger log = LoggerFactory.getLogger( FileImportTrackingSingleFile_Shared_Get_DAO.class );

	//  private constructor
	private FileImportTrackingSingleFile_Shared_Get_DAO() { }
	/**
	 * @return newly created instance
	 */
	public static FileImportTrackingSingleFile_Shared_Get_DAO getInstance() { 
		return new FileImportTrackingSingleFile_Shared_Get_DAO(); 
	}


	/**
	 * @param trackingId
	 * @return 
	 * @throws Exception
	 */
	public List<FileImportTrackingSingleFileDTO> getForTrackingId( int trackingId ) throws Exception {
		
		List<FileImportTrackingSingleFileDTO> resultList = new ArrayList<>();
		
		final String sql = "SELECT * FROM file_import_tracking_single_file_tbl WHERE file_import_tracking_id = ?";

		try ( Connection connection = SharedCodeOnly_DBConnectionProvider.getInstance().getConnection();
				PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {
			
			preparedStatement.setInt( 1, trackingId );

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					FileImportTrackingSingleFileDTO result = populateResultObject( rs );
					resultList.add(result);
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select FileImportTrackingSingleFileDTO, id: " + trackingId + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
		return resultList;
	}
	
	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	public FileImportTrackingSingleFileDTO populateResultObject( ResultSet rs ) throws SQLException {
		FileImportTrackingSingleFileDTO returnItem = new FileImportTrackingSingleFileDTO();
		returnItem.setId( rs.getInt( "id" ) );
		returnItem.setFileImportTrackingId( rs.getInt( "file_import_tracking_id" ) );
		returnItem.setFileType( FileImportFileType.fromValue( rs.getInt( "file_type_id" ) ) );
		returnItem.setFilenameInUpload( rs.getString( "filename_in_upload" ) );
		returnItem.setFilenameOnDisk( rs.getString( "filename_on_disk" ) );
		returnItem.setFilenameOnDiskWithPathSubSameMachine( rs.getString( "filename_on_disk_with_path_sub_same_machine" ) );
		returnItem.setCanonicalFilename_W_Path_OnSubmitMachine( rs.getString( "canonical_filename_w_path_on_submit_machine" ) );
		returnItem.setAbsoluteFilename_W_Path_OnSubmitMachine( rs.getString( "absolute_filename_w_path_on_submit_machine" ) );
		returnItem.setAws_s3_bucket_name( rs.getString( "aws_s3_bucket_name" ) );
		returnItem.setAws_s3_object_key( rs.getString( "aws_s3_object_key" ) );
		returnItem.setAws_s3_region( rs.getString( "aws_s3_region" ) );
		
		returnItem.setSha1Sum( rs.getString( "sha1_sum" ) );
		{
			long fieldValue = rs.getLong( "file_size" );
			if ( ! rs.wasNull() ) {
				returnItem.setFileSize(fieldValue);
			}
		}
		{
			int fieldValue = rs.getInt( "file_location_or_aws_s3_object_provided_from_external_system" );
			if ( fieldValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
				returnItem.setFileLocation_Or_AWS_S3_Object_ProvidedFrom_ExternalSystem(true);
			}
		}
		{
			int fieldValue = rs.getInt( "file_location_or_aws_s3_obj_prov_fm_ext_sys_delete_af_imprt" );
			if ( fieldValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
				returnItem.setFileLocation_Or_AWS_S3_Object_From_ExternalSystem_DeleteAfterImport(true);
			}
		}
		return returnItem;
	}
	
}
