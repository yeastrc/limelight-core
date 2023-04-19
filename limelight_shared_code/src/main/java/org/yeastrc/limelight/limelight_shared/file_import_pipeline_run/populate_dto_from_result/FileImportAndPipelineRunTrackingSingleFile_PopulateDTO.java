package org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.populate_dto_from_result;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes.ImportSingleFileUploadStatus;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingSingleFileDTO;

/**
 * 
 *
 */
public class FileImportAndPipelineRunTrackingSingleFile_PopulateDTO {

	//  private constructor
	private FileImportAndPipelineRunTrackingSingleFile_PopulateDTO() { }
	
	/**
	 * @return newly created instance
	 */
	public static FileImportAndPipelineRunTrackingSingleFile_PopulateDTO getInstance() { 
		return new FileImportAndPipelineRunTrackingSingleFile_PopulateDTO(); 
	}
	
	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	public FileImportAndPipelineRunTrackingSingleFileDTO populateResultObject( ResultSet rs ) throws SQLException {
		FileImportAndPipelineRunTrackingSingleFileDTO returnItem = new FileImportAndPipelineRunTrackingSingleFileDTO();
		returnItem.setId( rs.getInt( "id" ) );
		returnItem.setFileImportAndPipelineRunTracking_Id( rs.getInt( "import_and_pipeline_run_tracking_id" ) );
		returnItem.setFileUploadStatus( ImportSingleFileUploadStatus.fromValue( rs.getInt( "file_upload_status_id" ) ) );
		returnItem.setFileTypeId( rs.getInt( "file_type_id" ) );
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
