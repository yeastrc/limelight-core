package org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.exceptions.LimelightShardCodeDatabaseContentErrorException;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataJSONBlob_DTO;
import org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.dto.FileImportTrackingDataJSON_Contents_Version_Number_001;
import org.yeastrc.limelight.limelight_shared.json_marshal_unmarshal_interfaces.Limelight_SharedCode__JSON_UnMarshal_CommonInterface;

/**
 * 
 *
 */
public class Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util {

	private static final Logger log = LoggerFactory.getLogger( Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util.class );
	
	/**
	 * private constructor
	 */
	private Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util() { }

	/**
	 * Static singleton instance
	 */
	private static final Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util _instance = new Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util();
	
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util getSingletonInstance() {
		return _instance; 
	}
	
	public static class Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util__Result {
		
		private FileImportTrackingDataJSON_Contents_Version_Number_001 fileImportTrackingDataJSON_Contents_Version_Number_001;

		public FileImportTrackingDataJSON_Contents_Version_Number_001 getFileImportTrackingDataJSON_Contents_Version_Number_001() {
			return fileImportTrackingDataJSON_Contents_Version_Number_001;
		}
		
	}
	
	/**
	 * @param fileImportTrackingDataJSONBlob_DTO
	 * @return
	 * @throws Exception 
	 */
	public Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util__Result get_FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO(
			FileImportTrackingDataJSONBlob_DTO fileImportTrackingDataJSONBlob_DTO,
			Limelight_SharedCode__JSON_UnMarshal_CommonInterface limelight_SharedCode__JSON_UnMarshal_CommonInterface
			) throws Exception {
		
		Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util__Result result = new Limelight__FileImportTrackingDataJSON_Contents_Object_From_JSONBlob_DTO_Util__Result();
		
		if ( fileImportTrackingDataJSONBlob_DTO.getJsonContents_FormatVersion() == 1 ) {
			
			FileImportTrackingDataJSON_Contents_Version_Number_001 jsonObject =
					limelight_SharedCode__JSON_UnMarshal_CommonInterface.getObjectFromJSONString( fileImportTrackingDataJSONBlob_DTO.getJsonContents(), FileImportTrackingDataJSON_Contents_Version_Number_001.class);
			result.fileImportTrackingDataJSON_Contents_Version_Number_001 = jsonObject;
			
		} else {
			String msg = "fileImportTrackingDataJSONBlob_DTO.getJsonContents_FormatVersion() contains unsupported format version of: " + fileImportTrackingDataJSONBlob_DTO.getJsonContents_FormatVersion();
			log.error(msg);
			throw new LimelightShardCodeDatabaseContentErrorException(msg);
		}
		
		return result;
	}
	
}
