package org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_feature_detection_run_import.constants.FeatureDetectionProgramName_Values_Constants;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.FeatureDetectionSingularFeatureEntry_DAO;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.FeatureDetectionSingularFeatureUploadedFileStatsDAO;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.utils.Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionSingularFeatureEntryDTO;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetection_SingularFeature_UploadedFileStatsDTO;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScan_SubResponse;

/**
 * Insert Upload Hardklor program Results File 
 *
 */
public class ImportFile_Hardklor_Results {

	private static final Logger log = LoggerFactory.getLogger( ImportFile_Hardklor_Results.class );
	

	private ImportFile_Hardklor_Results() { }
	public static ImportFile_Hardklor_Results getInstance() { return new ImportFile_Hardklor_Results(); }

	public static class ImportFile_Hardklor_Results__Params {
		
		int projectId;
		int scanFileId;
		int featureDetectionRootId;
		String filename_Uploaded;
		File fileToImport;
		int userId;
		
		Map<Integer, SingleScan_SubResponse> ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber;
		
		public void setProjectId(int projectId) {
			this.projectId = projectId;
		}
		public void setFeatureDetectionRootId(int featureDetectionRootId) {
			this.featureDetectionRootId = featureDetectionRootId;
		}
		public void setFilename_Uploaded(String filename_Uploaded) {
			this.filename_Uploaded = filename_Uploaded;
		}
		public void setFileToImport(File fileToImport) {
			this.fileToImport = fileToImport;
		}
		public void setUserId(int userId) {
			this.userId = userId;
		}
		public void setScanFileId(int scanFileId) {
			this.scanFileId = scanFileId;
		}
		public void setMs_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber(
				Map<Integer, SingleScan_SubResponse> ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber) {
			this.ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber = ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber;
		}
	}

	/**
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public void importFile_Hardklor_Results(
			ImportFile_Hardklor_Results__Params params
			) throws Exception {
		
		int projectId = params.projectId;
		int scanFileId = params.scanFileId;
		int featureDetectionRootId = params.featureDetectionRootId;
		String filename_Uploaded = params.filename_Uploaded;
		File fileToImport = params.fileToImport;
		int userId = params.userId;
		
		Map<Integer, SingleScan_SubResponse> ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber = params.ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber;
		
		//  Insert "Top Level" DB Record

		FeatureDetection_SingularFeature_UploadedFileStatsDTO featureDetection_SingularFeature_UploadedFileStatsDTO = new FeatureDetection_SingularFeature_UploadedFileStatsDTO();
		
		featureDetection_SingularFeature_UploadedFileStatsDTO.setFeatureDetectionRootId( featureDetectionRootId );
		
		featureDetection_SingularFeature_UploadedFileStatsDTO.setFileFullyInserted(false);
		featureDetection_SingularFeature_UploadedFileStatsDTO.setFeaturedetectionProgramName( FeatureDetectionProgramName_Values_Constants.HARDKLOR );
		featureDetection_SingularFeature_UploadedFileStatsDTO.setUploadedFilename(filename_Uploaded);
		featureDetection_SingularFeature_UploadedFileStatsDTO.setUploadedFileSize((int)fileToImport.length());

		featureDetection_SingularFeature_UploadedFileStatsDTO.setCreatedBy_UserId(userId);
		featureDetection_SingularFeature_UploadedFileStatsDTO.setUpdatedBy_UserId(userId);

		FeatureDetectionSingularFeatureUploadedFileStatsDAO.getInstance().save(featureDetection_SingularFeature_UploadedFileStatsDTO);
		
		try ( InputStream fileInputStream = new BufferedInputStream( new FileInputStream( fileToImport ) ) ) {

			Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component read_InputStream_Into_ASCII_CharacterString_OneLineAtATime = 
					Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component.getNewInstance(fileInputStream);

			//  Main Process of Uploaded file
			process_File_InputStream(
					read_InputStream_Into_ASCII_CharacterString_OneLineAtATime, 
					ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber, 
					featureDetection_SingularFeature_UploadedFileStatsDTO);

			
			String sha1_Of_PostBody = null;
			String sha384_Of_PostBody = null;

			{  // sha1_Of_PostBody
				byte[] mdbytes = read_InputStream_Into_ASCII_CharacterString_OneLineAtATime.get_messageDigest_SHA_1_Of_StreamContents().digest();

				//convert the byte to hex format
				StringBuffer sb = new StringBuffer("");
				for (int i = 0; i < mdbytes.length; i++) {
					sb.append(Integer.toString((mdbytes[i] & 0xff) + 0x100, 16).substring(1));
				}

				sha1_Of_PostBody = sb.toString();
			}

			{  // sha384_Of_PostBody
				byte[] hashBytes = read_InputStream_Into_ASCII_CharacterString_OneLineAtATime.get_messageDigest_SHA_384_Of_StreamContents().digest();

				StringBuilder hashBytesAsHexSB = new StringBuilder( hashBytes.length * 2 + 2 );

				for ( int i = 0; i < hashBytes.length; i++ ) {
					String byteAsHex = Integer.toHexString( Byte.toUnsignedInt( hashBytes[ i ] ) );
					if ( byteAsHex.length() == 1 ) {
						hashBytesAsHexSB.append( "0" ); //  Leading zero dropped by 'toHexString' so add here
					}
					hashBytesAsHexSB.append( byteAsHex );
				}

				sha384_Of_PostBody = hashBytesAsHexSB.toString();

				//  WAS - which is equivalent, except for the added "0" when a hex pair starts with "0"

				//			//convert the byte to hex format
				//			StringBuffer sb = new StringBuffer("");
				//			for (int i = 0; i < mdbytes.length; i++) {
				//				sb.append(Integer.toString((mdbytes[i] & 0xff) + 0x100, 16).substring(1));
				//			}
				//
				//			sha384_Of_PostBody = sb.toString();
			}

			featureDetection_SingularFeature_UploadedFileStatsDTO.setUploadedFile_Sha1_Sum(sha1_Of_PostBody);
			featureDetection_SingularFeature_UploadedFileStatsDTO.setUploadedFile_Sha384_zero_in_second_digit(sha384_Of_PostBody);


			FeatureDetectionSingularFeatureUploadedFileStatsDAO.getInstance().set_uploaded_file_sha1_sum_sha384_sum(
					featureDetection_SingularFeature_UploadedFileStatsDTO.getUploadedFile_Sha1_Sum(), 
					featureDetection_SingularFeature_UploadedFileStatsDTO.getUploadedFile_Sha384_zero_in_second_digit(), 
					featureDetection_SingularFeature_UploadedFileStatsDTO.getId() );

			/////////  Inserts are Complete.  Mark File Fully Inserted

			FeatureDetectionSingularFeatureUploadedFileStatsDAO.getInstance().set_True_FileFullyInserted( featureDetection_SingularFeature_UploadedFileStatsDTO.getId(), featureDetection_SingularFeature_UploadedFileStatsDTO.getCreatedBy_UserId() );
		}
	}
	

	/**
	 * @param read_InputStream_Into_ASCII_CharacterString_OneLineAtATime
	 * @param scanData_From_SpectralStorage
	 * @param featureDetection_SingularFeature_UploadedFileStatsDTO
	 * @return
	 * @throws Exception 
	 * @throws LimelightImporterDataException 
	 * @throws IOException 
	 */
	private void process_File_InputStream( 
			
			Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component read_InputStream_Into_ASCII_CharacterString_OneLineAtATime,
			Map<Integer, SingleScan_SubResponse> ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber,
			FeatureDetection_SingularFeature_UploadedFileStatsDTO featureDetection_SingularFeature_UploadedFileStatsDTO ) throws IOException, LimelightImporterDataException, Exception {
		
		//  MS 1 and MS 2 data from Spectral Storage

		//  Map of MS 1 Scans, Key on Scan Number
		
		float retentionTime_Difference_AbsoluteValue_Max_Difference = 0;

		List<FeatureDetectionSingularFeatureEntryDTO> featureDetectionSingularFeatureDTO_List = new ArrayList<>( FeatureDetectionSingularFeatureEntry_DAO.DEFAULT_INSERT_ENTRIES_ARRAY_SIZE ); 

		final int MS1_SCAN_NUMBER_NOT_SET = -1;

		int ms_1_ScanNumber = MS1_SCAN_NUMBER_NOT_SET;

		String line = null;

		while ( ( line = read_InputStream_Into_ASCII_CharacterString_OneLineAtATime.readNextLine() ) != null ) {

			if ( line.startsWith( "S" ) ) {

				String[] lineSplitOnTab = line.split( "\t" );

				if ( lineSplitOnTab.length < 3 ) {

					String msg = "'S' line does NOT have enough fields.  # fields: " + lineSplitOnTab.length + ", line: " + line;
					log.warn( msg );
					throw new LimelightImporterDataException(msg);
				}

				String scanNumber_String = lineSplitOnTab[ 1 ];

				try {
					ms_1_ScanNumber = Integer.parseInt( scanNumber_String );
				} catch (Exception e) {
					String msg = "Failed to parse MS1 Scan Number: " + scanNumber_String + ", line: " + line;
					log.warn( msg );
					throw new LimelightImporterDataException(msg);
				}

				{	//  Validate MS 1 scan number in Hardklor file is MS 1 scan number in Spectral Storage AND Retention Time matches close enough

					SingleScan_SubResponse ms_1_Scan__scanData = ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber.get( ms_1_ScanNumber );

					if ( ms_1_Scan__scanData == null ) {

						String msg = "MS1 (S line) scan number in Hardklor file not in Spectral Storage as MS 1 scan number for Scan file.  MS 1 scan number: " + ms_1_ScanNumber + ", line: " + line;
						log.warn(msg);
						throw new LimelightImporterDataException(msg);
					}

					String retentionTime_FromHardklor_In_Minutes_String = lineSplitOnTab[ 2 ];

					float retentionTime_FromHardklor_In_Minutes = 0; //  Retention Time (in minutes) of the scan event.

					try {
						retentionTime_FromHardklor_In_Minutes = Float.parseFloat( retentionTime_FromHardklor_In_Minutes_String );
					} catch (Exception e) {
						String msg = "Failed to parse MS1 Retention Time: " + retentionTime_FromHardklor_In_Minutes_String + ", scan number: " + scanNumber_String;
						log.warn( msg );
						throw new LimelightImporterDataException(msg);
					}

					float retentionTime_FromSpectralStorage_InMinutes = ms_1_Scan__scanData.getRetentionTime() / 60; //  Spectral Storage In Seconds

					float retentionTime_Difference_AbsoluteValue = Math.abs( retentionTime_FromSpectralStorage_InMinutes - retentionTime_FromHardklor_In_Minutes );

					if ( retentionTime_Difference_AbsoluteValue > 0.001 ) {

						String msg = "MS1 (S line) retention time in Hardklor file NOT MATCH Retention Time in Spectral Storage.  MS 1 scan number: " 
								+ ms_1_ScanNumber
								+ ", retention time in Hardklor: " + retentionTime_FromHardklor_In_Minutes
								+ ", retention time in Spectral Storage (divided by 60 to get in minutes): " + retentionTime_FromSpectralStorage_InMinutes;
						log.warn(msg);
						throw new LimelightImporterDataException(msg);
					}

					if ( retentionTime_Difference_AbsoluteValue_Max_Difference < retentionTime_Difference_AbsoluteValue ) {
						retentionTime_Difference_AbsoluteValue_Max_Difference = retentionTime_Difference_AbsoluteValue;  // Track Max Difference
					}

				}

			} else if ( line.startsWith( "P" ) ) {

				if ( ms_1_ScanNumber == MS1_SCAN_NUMBER_NOT_SET ) {
					String msg = "Have 'P' line but not yet 'S' line";
					log.warn(msg);
					throw new LimelightImporterDataException(msg);
				}

				//  Put P line in DB table after try to look up MS2 scan

				String[] lineSplitOnTab = line.split( "\t" );

				if ( lineSplitOnTab.length < 9 ) {

					String msg = "'P' line does NOT have enough fields.  # fields: " + lineSplitOnTab.length + ", line: " + line;
					log.warn( msg );
					throw new LimelightImporterDataException(msg);
				}

				//  Start Creating Entry for DB

				FeatureDetectionSingularFeatureEntryDTO featureDetectionSingularFeatureEntryDTO = new FeatureDetectionSingularFeatureEntryDTO();

				featureDetectionSingularFeatureEntryDTO.setFeatureDetectionRootId( featureDetection_SingularFeature_UploadedFileStatsDTO.getFeatureDetectionRootId() );
				featureDetectionSingularFeatureEntryDTO.setFeatureDetectionSingularFeatureUploadedFileStatsId( featureDetection_SingularFeature_UploadedFileStatsDTO.getId() );

				featureDetectionSingularFeatureEntryDTO.setMs_1_scanNumber( ms_1_ScanNumber );

				{
					String field_String = lineSplitOnTab[1];
					try {
						double monoisotopicMass = Double.parseDouble( field_String );
						featureDetectionSingularFeatureEntryDTO.setMonoisotopicMass( monoisotopicMass );
					} catch ( Exception e ) {
						log.warn( "Failed to parse Line element to 'monoisotopicMass'. Field: '" + field_String + "', line: " + line );
						throw e;
					}
				}

				{
					String field_String = lineSplitOnTab[2];
					try {
						int charge = Integer.parseInt( field_String );
						featureDetectionSingularFeatureEntryDTO.setCharge( charge );
					} catch ( Exception e ) {
						String msg = "Failed to parse 'P' Line element to 'charge'. Field: '" + field_String + "', line: " + line;
						log.warn(msg);
						throw new LimelightImporterDataException(msg);
					}
				}
				{
					String field_String = lineSplitOnTab[3];
					try {
						double intensity = Double.parseDouble( field_String );
						featureDetectionSingularFeatureEntryDTO.setIntensity( intensity );
					} catch ( Exception e ) {
						String msg = "Failed to parse 'P' Line element to 'intensity'. Field: '" + field_String + "', line: " + line;
						log.warn(msg);
						throw new LimelightImporterDataException(msg);
					}
				}

				{
					String field_String = lineSplitOnTab[4];
					try {
						double base_isotope_peak = Double.parseDouble( field_String );
						featureDetectionSingularFeatureEntryDTO.setBase_isotope_peak( base_isotope_peak );
					} catch ( Exception e ) {
						String msg = "Failed to parse 'P' Line element to 'base_isotope_peak'. Field: '" + field_String + "', line: " + line;
						log.warn(msg);
						throw new LimelightImporterDataException(msg);
					}
				}

				{
					String field_String = lineSplitOnTab[5];

					//  Split field on '-'

					String[] field_String_Split = field_String.split( "-" );

					if ( field_String_Split.length != 2 ) {
						String msg = "analysis_window_start/end_m_z field split on '-' does not result in 2 elements. field: " + field_String;
						log.warn(msg);
						throw new LimelightImporterDataException(msg);
					}
					{
						String start_String =  field_String_Split[0];
						try {
							double analysis_window_start_m_z = Double.parseDouble( start_String );
							featureDetectionSingularFeatureEntryDTO.setAnalysis_window_start_m_z( analysis_window_start_m_z );
						} catch ( Exception e ) {
							String msg = "Failed to parse Line element to 'analysis_window_start_m_z'.  Value as String: '" + start_String + "', Field: '" + field_String + "', line: " + line;
							log.warn(msg);
							throw new LimelightImporterDataException(msg);
						}
					}
					{
						String end_String =  field_String_Split[1];
						try {
							double analysis_window_end_m_z = Double.parseDouble( end_String );
							featureDetectionSingularFeatureEntryDTO.setAnalysis_window_end_m_z( analysis_window_end_m_z );
						} catch ( Exception e ) {
							String msg = "Failed to parse Line element to 'analysis_window_end_m_z'.  Value as String: '" + end_String + "', Field: '" + field_String + "', line: " + line;
							log.warn(msg);
							throw new LimelightImporterDataException(msg);
						}
					}
				}

				{
					String field_String = lineSplitOnTab[7];

					if ( StringUtils.isNotEmpty( field_String ) && ( ! "_".equals( field_String ) ) ) {
						String msg = "NOT currently processing value in 'modifications' other than '_'.";
						log.error(msg + " A separate table exists to hold them but not processing them yet." );
						throw new LimelightInternalErrorException(msg);
					}
				}
				{
					String field_String = lineSplitOnTab[8];
					try {
						double correlation_score = Double.parseDouble( field_String );
						featureDetectionSingularFeatureEntryDTO.setCorrelation_score( correlation_score );
					} catch ( Exception e ) {
						String msg = "Failed to parse Line element to 'correlation_score'. Field: '" + field_String + "', line: " + line;
						log.warn(msg);
						throw new LimelightImporterDataException(msg);
					}
				}

				featureDetectionSingularFeatureDTO_List.add( featureDetectionSingularFeatureEntryDTO );

				if ( featureDetectionSingularFeatureDTO_List.size() >= FeatureDetectionSingularFeatureEntry_DAO.DEFAULT_INSERT_ENTRIES_ARRAY_SIZE  ) {

					//  Insert Batch of Single Feature Entries
					FeatureDetectionSingularFeatureEntry_DAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams( featureDetectionSingularFeatureDTO_List );

					//  Reset List
					featureDetectionSingularFeatureDTO_List.clear();
				}

			} else {
				String msg = "line does not start with 'S' or 'P'.  line: " + line;
				log.warn(msg);
				throw new LimelightImporterDataException(msg);
			}
		}

		//  Insert Last Batch of Single Feature Entries
		if ( ! featureDetectionSingularFeatureDTO_List.isEmpty() ) {
			FeatureDetectionSingularFeatureEntry_DAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams( featureDetectionSingularFeatureDTO_List );
		}

	}
	
	
	
	
}
