package org.yeastrc.limelight.limelight_feature_detection_run_import.import_files_to_db;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.FeatureDetectionPersistentFeatureEntryDAO;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDAO;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DAO;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.FeatureDetectionPersistentFeatureUploadedFileStatsDAO;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.FeatureDetectionPersistentFeature_FileHeaderContents_DAO;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.ScanFileDAO_Partial;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterConfigurationException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.utils.Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.dao.ConfigSystemDAO_Importer;
import org.yeastrc.limelight.limelight_shared.config_system_table_common_access.ConfigSystemsKeysSharedConstants;
import org.yeastrc.limelight.limelight_shared.constants.FeatureDetectionProgramName_Values_Constants;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionPersistentFeatureEntryDTO;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionPersistentFeature_FileHeaderContents_DTO;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetection_PersistentFeature_UploadedFileStatsDTO;
import org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.dto.FileImportAndPipelineRunTrackingSingleFileDTO;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.enums.Get_ScanData_ScanFileAPI_Key_NotFound;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_ScanNumbers_Request;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.main.Get_ScanNumbers_Response;
import org.yeastrc.spectral_storage.get_data_webapp.webservice_connect.main.CallSpectralStorageGetDataWebservice;
import org.yeastrc.spectral_storage.get_data_webapp.webservice_connect.main.CallSpectralStorageGetDataWebserviceInitParameters;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;

/**
 * 
 *
 */
public class ImportFile_Bullseye_Results {

	private static final Logger log = LoggerFactory.getLogger( ImportFile_Bullseye_Results.class );

	/**
	 * Max header line count allowed
	 */
	private static final int _MAX_HEADER_LINE_COUNT_SIZE = 60;


	private ImportFile_Bullseye_Results() { }
	public static ImportFile_Bullseye_Results getInstance() { return new ImportFile_Bullseye_Results(); }

	public static class ImportFile_Bullseye_Results__Params {

		int scanFileId;
		int featureDetectionRootId;
		String filename_Uploaded;
		File fileToImport;
		FileImportAndPipelineRunTrackingSingleFileDTO fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results;
		int userId;

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
		public void setFileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results(
				FileImportAndPipelineRunTrackingSingleFileDTO fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results) {
			this.fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results = fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results;
		}
	}


	/**
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public void importFile_Bullseye_Results(
			ImportFile_Bullseye_Results__Params params
			) throws Exception {

		int scanFileId = params.scanFileId;
		int featureDetectionRootId = params.featureDetectionRootId;
		
		FileImportAndPipelineRunTrackingSingleFileDTO fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results = params.fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results;
		
		//  OR
		
		String filename_Uploaded = params.filename_Uploaded;
		File fileToImport = params.fileToImport;
		
		int userId = params.userId;



		///  Spectr connector


		// First get override URL from config file
		String spectralStorageWebserviceBaseURL = null;
		//				LimelightConfigFileValues.getInstance().getSpectralStorageServerURLandAppContext();

		if ( StringUtils.isEmpty( spectralStorageWebserviceBaseURL ) ) {
			//  Not in config file so get from config_system table
			spectralStorageWebserviceBaseURL = 
					ConfigSystemDAO_Importer.getInstance()
					.getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL );
		}

		if ( StringUtils.isEmpty( spectralStorageWebserviceBaseURL ) ) {
			String msg = "No value in config for key '"
					+ ConfigSystemsKeysSharedConstants.SPECTRAL_STORAGE_SERVICE_GET_DATA_BASE_URL
					+ "'.";
			log.error( msg );
			throw new LimelightImporterConfigurationException( msg );
		}

		CallSpectralStorageGetDataWebserviceInitParameters initParams = new CallSpectralStorageGetDataWebserviceInitParameters();

		initParams.setSpectralStorageServerBaseURL( spectralStorageWebserviceBaseURL );

		CallSpectralStorageGetDataWebservice callSpectralStorageWebservice = CallSpectralStorageGetDataWebservice.getInstance();

		callSpectralStorageWebservice.init( initParams );



		//  MS 2 scan numbers from Spectral Storage

		//  Set of List of MS 2 Scan Numbers
		Set<Integer> ms_2_ScanNumbers = null; // ONLY MS 2 scans

		//  Get MS 2 scan numbers from Spectral Storage

		{
			List<Integer> scanLevelsToInclude = new ArrayList<>( 1 );

			scanLevelsToInclude.add( 2 );  // ONLY level 2 scans


			//  Get all MS 2 scan numbers from Spectr

			String scanFileAPIKey = ScanFileDAO_Partial.getInstance().getSpectralStorageAPIKeyById( scanFileId );
			if ( StringUtils.isEmpty( scanFileAPIKey ) ) {
				String msg = "No value for scanFileAPIKey for scan file id: " + scanFileId;
				log.error( msg );
				throw new LimelightInternalErrorException( msg );
			}

			Get_ScanNumbers_Request get_ScanNumbers_Request = new Get_ScanNumbers_Request();
			get_ScanNumbers_Request.setScanFileAPIKey( scanFileAPIKey );
			get_ScanNumbers_Request.setScanLevelsToInclude(scanLevelsToInclude);
			get_ScanNumbers_Request.setScanLevelsToExclude(null);

			Get_ScanNumbers_Response get_ScanNumbers_Response =
					callSpectralStorageWebservice.call_Get_ScanNumbers_Webservice( get_ScanNumbers_Request );

			if ( get_ScanNumbers_Response.getStatus_scanFileAPIKeyNotFound() 
					== Get_ScanData_ScanFileAPI_Key_NotFound.YES ) {
				String msg = "No data in Spectral Storage for API Key: " + scanFileAPIKey;
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}

			List<Integer> scanNumbersList = get_ScanNumbers_Response.getScanNumbers();

			ms_2_ScanNumbers = new HashSet<>( scanNumbersList );
		}

		int uploadedFileSize = 0;
		
		if ( fileToImport != null ) {
			uploadedFileSize = (int)fileToImport.length();
		}
		

		//  "Top Level" DB Record

		FeatureDetection_PersistentFeature_UploadedFileStatsDTO featureDetection_PersistentFeature_UploadedFileStatsDTO = new FeatureDetection_PersistentFeature_UploadedFileStatsDTO();

		featureDetection_PersistentFeature_UploadedFileStatsDTO.setFeatureDetectionRootId( featureDetectionRootId );

		featureDetection_PersistentFeature_UploadedFileStatsDTO.setFileFullyInserted(false);
		featureDetection_PersistentFeature_UploadedFileStatsDTO.setFeaturedetectionProgramName( FeatureDetectionProgramName_Values_Constants.BULLSEYE );
		featureDetection_PersistentFeature_UploadedFileStatsDTO.setUploadedFilename(filename_Uploaded);
		featureDetection_PersistentFeature_UploadedFileStatsDTO.setUploadedFileSize(uploadedFileSize);

		featureDetection_PersistentFeature_UploadedFileStatsDTO.setCreatedBy_UserId(userId);
		featureDetection_PersistentFeature_UploadedFileStatsDTO.setUpdatedBy_UserId(userId);


		if ( fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results != null ) {
			
			if ( StringUtils.isNotEmpty( fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results.getFilenameOnDisk() ) ) {

				try ( InputStream inputStream = new BufferedInputStream( new FileInputStream( fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results.getFilenameOnDisk() ) ) ) {

					process_UploadedContents_InputStream( featureDetection_PersistentFeature_UploadedFileStatsDTO, ms_2_ScanNumbers, inputStream);
				}
				
				return; // EARLY RETURN
			}
			
			if ( StringUtils.isNotEmpty( fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results.getAws_s3_bucket_name() ) ) {


				//  Not a local file.  Get from AWS S3

				S3Client amazonS3_Client = null;

				{  // Use Region from fileImportAndPipelineRunTrackingSingleFileDTO, otherwise Config, otherwise SDK use from Environment Variable

					String amazonS3_RegionName = fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results.getAws_s3_region();

					if ( StringUtils.isNotEmpty( amazonS3_RegionName ) ) {
								
						amazonS3_RegionName = ConfigSystemDAO_Importer.getInstance().getConfigValueForConfigKey( ConfigSystemsKeysSharedConstants.file_import_limelight_xml_scans_AWS_S3_REGION_KEY );
					}

					if ( StringUtils.isNotEmpty( amazonS3_RegionName ) ) {
						
						Region aws_S3_Region = Region.of(amazonS3_RegionName);
						
						amazonS3_Client = 
								S3Client.builder()
								.region( aws_S3_Region )
								.httpClientBuilder(ApacheHttpClient.builder())
								.build();
						
					} else {
						//  SDK use Region from Environment Variable
						
						amazonS3_Client = 
								S3Client.builder()
								.httpClientBuilder(ApacheHttpClient.builder())
								.build(); 
					}
				}

				GetObjectRequest getObjectRequest = 
						GetObjectRequest
						.builder()
						.bucket(fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results.getAws_s3_bucket_name())
						.key( fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results.getAws_s3_object_key() )
						.build();
				
				try ( ResponseInputStream<GetObjectResponse> getObjectResponse_UsableAsInputStream = amazonS3_Client.getObject(getObjectRequest) ) {
					
					process_UploadedContents_InputStream( featureDetection_PersistentFeature_UploadedFileStatsDTO, ms_2_ScanNumbers, getObjectResponse_UsableAsInputStream);

					return;
					
				} catch ( NoSuchKeyException e ) {

					//  Throw Data Exception if externally passed in object key and bucket name

					System.err.println( "Could not find S3 Object.  ObjectKey: " 
							+ fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results.getAws_s3_object_key() 
							+ ", Object Bucket: " 
							+ fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results.getAws_s3_bucket_name() );
					throw new LimelightImporterInternalException(e);
				}
			
			}
			
			String msg = "fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results != null. fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results.getFilenameOnDisk() AND fileImportAndPipelineRunTrackingSingleFileDTO__Bullseye_Results.getFilenameOnDisk() ARE Empty";
			log.error(msg);
			throw new LimelightInternalErrorException(msg);
		}
		
		try ( InputStream inputStream = new BufferedInputStream( new FileInputStream( fileToImport ) ) ) {

			process_UploadedContents_InputStream(featureDetection_PersistentFeature_UploadedFileStatsDTO, ms_2_ScanNumbers, inputStream);
		}

	}
	
	/**
	 * @param featureDetection_PersistentFeature_UploadedFileStatsDTO
	 * @param ms_2_ScanNumbers
	 * @param inputStream
	 * @throws Exception
	 */
	private void process_UploadedContents_InputStream(
			
			FeatureDetection_PersistentFeature_UploadedFileStatsDTO featureDetection_PersistentFeature_UploadedFileStatsDTO,
			Set<Integer> ms_2_ScanNumbers,
			
			InputStream inputStream
			
			) throws Exception {
		
		Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component read_InputStream_Into_ASCII_CharacterString_OneLineAtATime = 
				Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component.getNewInstance(inputStream);


		//  Process Uploaded File: Header Section --  Updates: featureDetection_PersistentFeature_UploadedFileStatsDTO object
		String headerLines_NewLineDelim = process_File_HeaderSection(read_InputStream_Into_ASCII_CharacterString_OneLineAtATime, featureDetection_PersistentFeature_UploadedFileStatsDTO);

		//  Insert "Top Level" DB Record
		FeatureDetectionPersistentFeatureUploadedFileStatsDAO.getInstance().save(featureDetection_PersistentFeature_UploadedFileStatsDTO);

		{   //  Insert File Header Contents

			FeatureDetectionPersistentFeature_FileHeaderContents_DTO featureDetectionPersistentFeature_FileHeaderContents_DTO = new FeatureDetectionPersistentFeature_FileHeaderContents_DTO();

			featureDetectionPersistentFeature_FileHeaderContents_DTO.setFeatureDetectionPersistentFeatureUploadedFileStatsId(
					featureDetection_PersistentFeature_UploadedFileStatsDTO.getId() );

			featureDetectionPersistentFeature_FileHeaderContents_DTO.setFileHeaderContents(headerLines_NewLineDelim);

			FeatureDetectionPersistentFeature_FileHeaderContents_DAO.getInstance().save(featureDetectionPersistentFeature_FileHeaderContents_DTO);
		}

		///

		//  Process Uploaded File: Main Content Lines
		process_File_MainContentLines(read_InputStream_Into_ASCII_CharacterString_OneLineAtATime, ms_2_ScanNumbers, featureDetection_PersistentFeature_UploadedFileStatsDTO);


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

			//				//convert the byte to hex format
			//				StringBuffer sb = new StringBuffer("");
			//				for (int i = 0; i < mdbytes.length; i++) {
			//					sb.append(Integer.toString((mdbytes[i] & 0xff) + 0x100, 16).substring(1));
			//				}
			//
			//				sha384_Of_PostBody = sb.toString();
		}

		FeatureDetectionPersistentFeatureUploadedFileStatsDAO.getInstance().set_uploaded_file_sha1_sum_sha384_sum(
				sha1_Of_PostBody, 
				sha384_Of_PostBody, 
				featureDetection_PersistentFeature_UploadedFileStatsDTO.getId() );

		/////////  Inserts are Complete.  Mark File Fully Inserted

		FeatureDetectionPersistentFeatureUploadedFileStatsDAO.getInstance().set_True_FileFullyInserted( featureDetection_PersistentFeature_UploadedFileStatsDTO.getId(), featureDetection_PersistentFeature_UploadedFileStatsDTO.getCreatedBy_UserId() );

	}

	/**
	 * @param read_InputStream_Into_ASCII_CharacterString_OneLineAtATime
	 * @param featureDetection_PersistentFeature_UploadedFileStatsDTO
	 * @throws Exception 
	 */
	private String process_File_HeaderSection(

			Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component read_InputStream_Into_ASCII_CharacterString_OneLineAtATime,
			FeatureDetection_PersistentFeature_UploadedFileStatsDTO featureDetection_PersistentFeature_UploadedFileStatsDTO
			) throws Exception {


		final String HEADER_COLUMNS_LINE_START = "MonoisotopicMass";

		List<String> headerLines = new ArrayList<>( _MAX_HEADER_LINE_COUNT_SIZE + 3 );

		boolean found_HeaderColumnsLine = false;


		String line = null;
		long lineNumber = 0;

		//  Process Lines before Column Headers Line

		while ( ( line = read_InputStream_Into_ASCII_CharacterString_OneLineAtATime.readNextLine() ) != null ) {

			lineNumber++;

			headerLines.add(line);

			if ( line.startsWith( HEADER_COLUMNS_LINE_START ) ) {

				//  At Line that contains Header Columns.   Exit Loop

				found_HeaderColumnsLine = true;
				break;
			}

			//				if ( lineNumber > _MAX_HEADER_LINE_COUNT_SIZE ) {
			//					
			//					String msg = "The uploaded file has too many lines before the line that contains with the column headers.  Max Header Line count allowed: " + _MAX_HEADER_LINE_COUNT_SIZE 
			//							+ ".  Line that contains with the column headers starts with '" + HEADER_COLUMNS_LINE_START + "'.";
			//					log.warn(msg);
			//					throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
			//				}

			if ( lineNumber == 1 ) {

				// Processing first line

				String firstLine_AfterProgramLabel = null;

				{
					final String programLabel_1 = "BullseyeSharp v";  // line BullseyeSharp v1.32
					final String programLabel_2 = "Bullseye v";  // line Bullseye v1.32

					if ( line.startsWith( programLabel_1 ) ) {
						firstLine_AfterProgramLabel = line.substring( programLabel_1.length() );
					} else if ( line.startsWith( programLabel_2 ) ) {
						firstLine_AfterProgramLabel = line.substring( programLabel_2.length() );
					} else {
						String msg = "First line of file does not start with Program name and version('" + programLabel_1 + "' or '" + programLabel_2 + "').  line: " + line;
						log.warn(msg);
					}
				}

				if ( firstLine_AfterProgramLabel != null ) {

					featureDetection_PersistentFeature_UploadedFileStatsDTO.setFeaturedetectionProgramVersion(firstLine_AfterProgramLabel);

					int lineAfter_ProgramLabel_Period_Index = firstLine_AfterProgramLabel.indexOf( '.' );

					if ( lineAfter_ProgramLabel_Period_Index > 0 ) {

						String primaryVersion_String = firstLine_AfterProgramLabel.substring( 0, lineAfter_ProgramLabel_Period_Index );

						try {

							int featuredetectionProgramPrimaryVersion = Integer.parseInt( primaryVersion_String );

							featureDetection_PersistentFeature_UploadedFileStatsDTO.setFeaturedetectionProgramPrimaryVersion(featuredetectionProgramPrimaryVersion);		
						} catch ( Throwable t ) {
							log.warn("Request NOT rejected:  Failed to parse BullseyeSharp primary version after 'v' and before '.' as integer.  primaryVersion_String: " + primaryVersion_String );
							//  Eat exception
						}
					}
				}
			}
		}

		String headerLines_NewLineDelim = StringUtils.join( headerLines, "\n" );

		if ( ! found_HeaderColumnsLine ) {
			//  Never found Column Headers Line
			String msg = "File NOT contain Column Headers Line that starts with '" + HEADER_COLUMNS_LINE_START + "'.";
			log.warn(msg);
			throw new LimelightImporterDataException(msg);
		}

		//  At Column Headers Line

		String[] lineSplitOnTab = line.split( "\t" );

		if ( lineSplitOnTab.length < 10 ) {

			String msg = "Column Headers line does NOT have enough fields.  # fields: " + lineSplitOnTab.length + ", line: " + line;
			log.warn( msg );
			throw new LimelightImporterDataException(msg);
		}

		if ( 
				( ! "MonoisotopicMass".equals( lineSplitOnTab[0] ) )
				|| ( ! "z".equals( lineSplitOnTab[1] ) )
				|| ( ! "Charge".equals( lineSplitOnTab[2] ) )
				|| ( ! "StartRT".equals( lineSplitOnTab[3] ) )
				|| ( ! "EndRT".equals( lineSplitOnTab[4] ) )
				|| ( ! "ApexRT".equals( lineSplitOnTab[5] ) )
				|| ( ! "ApexAbundance".equals( lineSplitOnTab[6] ) )
				|| ( ! "TotalAbundance".equals( lineSplitOnTab[7] ) )
				|| ( ! "Averagine".equals( lineSplitOnTab[8] ) )
				|| ( ! "MS2Scans".equals( lineSplitOnTab[9] ) )
				) {

			String msg = "Column Headers line fields contents are not what are expected, line: " + line;
			log.warn( msg );
			throw new LimelightImporterDataException(msg);
		}

		return headerLines_NewLineDelim;
	}

	/**
	 * @param read_InputStream_Into_ASCII_CharacterString_OneLineAtATime
	 * @param ms_2_ScanNumbers
	 * @param featureDetection_PersistentFeature_UploadedFileStatsDTO
	 * @throws Exception 
	 * @throws LimelightImporterDataException 
	 * @throws IOException 
	 * @throws JsonProcessingException 
	 */
	private void process_File_MainContentLines(

			Read_InputStream_Into_ASCII_CharacterString_OneLineAtATime_Util_NOT_Spring_Component read_InputStream_Into_ASCII_CharacterString_OneLineAtATime,
			Set<Integer> ms_2_ScanNumbers,
			FeatureDetection_PersistentFeature_UploadedFileStatsDTO featureDetection_PersistentFeature_UploadedFileStatsDTO
			) throws JsonProcessingException, IOException, LimelightImporterDataException, Exception {


		String line = null;

		//  Process Lines before Main Content Lines

		while ( ( line = read_InputStream_Into_ASCII_CharacterString_OneLineAtATime.readNextLine() ) != null ) {

			String[] lineSplitOnTab = line.split( "\t" );

			if ( lineSplitOnTab.length < 9 ) {  // column 10 for MS 2 is optional

				String msg = "Data line does NOT have enough fields.  # fields: " + lineSplitOnTab.length + ", line: " + line;
				log.warn( msg );
				throw new LimelightImporterDataException(msg);
			}

			FeatureDetectionPersistentFeatureEntryDTO featureDetectionPersistentFeatureEntryDTO = new FeatureDetectionPersistentFeatureEntryDTO();

			featureDetectionPersistentFeatureEntryDTO.setFeatureDetectionRootId( featureDetection_PersistentFeature_UploadedFileStatsDTO.getFeatureDetectionRootId() );
			featureDetectionPersistentFeatureEntryDTO.setFeatureDetectionPersistentFeatureUploadedFileStatsId( featureDetection_PersistentFeature_UploadedFileStatsDTO.getId() );

			{
				String field_String = lineSplitOnTab[0];
				try {
					double monoisotopicMass = Double.parseDouble( field_String );
					featureDetectionPersistentFeatureEntryDTO.setMonoisotopicMass( monoisotopicMass );
				} catch ( Exception e ) {
					log.warn( "Failed to parse Line element to 'monoisotopicMass'. Field: '" + field_String + "', line: " + line );
					throw e;
				}
			}

			{
				String field_String = lineSplitOnTab[1];
				try {
					int charge = Integer.parseInt( field_String );
					featureDetectionPersistentFeatureEntryDTO.setCharge( charge );
				} catch ( Exception e ) {
					log.warn( "Failed to parse Line element to 'z' aka the charge as integer. Field: '" + field_String + "', line: " + line );
					throw e;
				}
			}
			{
				String field_String = lineSplitOnTab[3];
				try {
					float fieldNumber = Float.parseFloat( field_String );
					featureDetectionPersistentFeatureEntryDTO.setRetentionTimeRange_Start( fieldNumber );
				} catch ( Exception e ) {
					log.warn( "Failed to parse Line element to 'StartRT'. Field: '" + field_String + "', line: " + line );
					throw e;
				}
			}
			{
				String field_String = lineSplitOnTab[4];
				try {
					float fieldNumber = Float.parseFloat( field_String );
					featureDetectionPersistentFeatureEntryDTO.setRetentionTimeRange_End( fieldNumber );
				} catch ( Exception e ) {
					log.warn( "Failed to parse Line element to 'EndRT'. Field: '" + field_String + "', line: " + line );
					throw e;
				}
			}

			{
				String field_String = lineSplitOnTab[5];
				try {
					float fieldNumber = Float.parseFloat( field_String );
					featureDetectionPersistentFeatureEntryDTO.setRetentionTimeRange_Apex( fieldNumber );
				} catch ( Exception e ) {
					log.warn( "Failed to parse Line element to 'ApexRT'. Field: '" + field_String + "', line: " + line );
					throw e;
				}
			}
			{
				String field_String = lineSplitOnTab[6];
				try {
					double fieldNumber = Double.parseDouble( field_String );
					featureDetectionPersistentFeatureEntryDTO.setAbundance_RetentionTimeRange_Apex( fieldNumber );
				} catch ( Exception e ) {
					log.warn( "Failed to parse Line element to 'ApexAbundance'. Field: '" + field_String + "', line: " + line );
					throw e;
				}
			}
			{
				String field_String = lineSplitOnTab[7];
				try {
					double fieldNumber = Double.parseDouble( field_String );
					featureDetectionPersistentFeatureEntryDTO.setAbundance_Total( fieldNumber );
				} catch ( Exception e ) {
					log.warn( "Failed to parse Line element to 'TotalAbundance'. Field: '" + field_String + "', line: " + line );
					throw e;
				}
			}


			List<FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO> featureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO_List = null;
			FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO = null;


			if ( lineSplitOnTab.length >= 10 ){

				String field_String = lineSplitOnTab[9];

				if ( StringUtils.isNotEmpty(field_String) && ( ! "na".equals(field_String) ) ) {

					//  Have MS2Scans

					//  Split field on ';'

					String[] field_String_Split = field_String.split( ";" );

					featureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO_List = new ArrayList<>( field_String_Split.length );
					List<Integer> scanNumbersList = new ArrayList<>( field_String_Split.length );

					for ( String splitEntry : field_String_Split ) {
						try {
							Integer scanNumber = Integer.parseInt( splitEntry );

							if ( ! ms_2_ScanNumbers.contains( scanNumber ) ) {

								String msg = "MS 2 Scan Number in file not found in Spectral Storage for scan file: " + scanNumber;
								log.warn( msg );
								throw new LimelightImporterDataException( msg );
							}

							FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO ms_2_ScanNumberDTO = new FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO();
							ms_2_ScanNumberDTO.setMs_2_ScanNumber(scanNumber);

							featureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO_List.add(ms_2_ScanNumberDTO);

							scanNumbersList.add(scanNumber);

						} catch ( Exception e ) {
							log.warn( "Failed to parse Line element to 'MS2Scans'. Field part: '" + splitEntry + "', Field: '" + field_String + "', line: " + line );
							throw e;
						}
					}

					featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO = new FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO();

					ObjectMapper jacksonJSON_Mapper = new ObjectMapper();

					String ms_2_scan_numbers_json_array = jacksonJSON_Mapper.writeValueAsString(scanNumbersList);

					featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO.setMs_2_scan_numbers_json_array(ms_2_scan_numbers_json_array);
				}
			}
			

			FeatureDetectionPersistentFeatureEntryDAO.getInstance().save( featureDetectionPersistentFeatureEntryDTO );
			
			if ( featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO != null ) {
			
				featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO.setFeatureDetectionPersistentFeatureEntryId( featureDetectionPersistentFeatureEntryDTO.getId() );

				FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DAO.getInstance().save( featureDetectionPersistentFeatureEntry_MS_2_ScanNumbers_JSON_DTO );
			}

			if ( featureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO_List != null ) {
			
				for ( FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO entry_MS_2_ScanNumber : featureDetectionPersistentFeatureEntry_MS_2_ScanNumberDTO_List ) {

					entry_MS_2_ScanNumber.setFeatureDetectionPersistentFeatureEntryId( featureDetectionPersistentFeatureEntryDTO.getId() );

					FeatureDetectionPersistentFeatureEntry_MS_2_ScanNumberDAO.getInstance().save( entry_MS_2_ScanNumber );
				}
			}
		}

	}


}
