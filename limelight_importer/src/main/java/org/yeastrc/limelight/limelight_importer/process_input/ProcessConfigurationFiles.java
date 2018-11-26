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
package org.yeastrc.limelight.limelight_importer.process_input;

import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ConfigurationFile;
import org.yeastrc.limelight.limelight_import.api.xml_dto.ConfigurationFiles;
import org.yeastrc.limelight.limelight_import.api.xml_dto.LimelightInput;
import org.yeastrc.limelight.limelight_importer.constants.ConfigFileMimeType;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchFileDAO;
import org.yeastrc.limelight.limelight_importer.dao_db_insert.DB_Insert_SearchFileProjectSearchDAO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.objects.SearchProgramEntry;
import org.yeastrc.limelight.limelight_shared.dto.SearchFileDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchFileProjectSearchDTO;

/**
 * 
 *
 */
public class ProcessConfigurationFiles {
	
	private static final Logger log = LoggerFactory.getLogger( ProcessConfigurationFiles.class );
	
	/**
	 * private constructor
	 */
	private ProcessConfigurationFiles(){}
	public static ProcessConfigurationFiles getInstance() {
		return new ProcessConfigurationFiles();
	}
	
	
	/**
	 * @param limelightInput
	 * @param searchId
	 * @param projectSearchId
	 * @throws Exception
	 */
	public void processConfigurationFiles( 
			LimelightInput 
			limelightInput, 
			int searchId, 
			int projectSearchId,
			Map<String, SearchProgramEntry> searchProgramEntryMap ) throws Exception {
		
		ConfigurationFiles configurationFiles =
				limelightInput.getConfigurationFiles();
		if ( configurationFiles != null ) {
			List<ConfigurationFile> configurationFileList =
					configurationFiles.getConfigurationFile();
			if ( configurationFileList != null && ( ! configurationFileList.isEmpty() ) ) {
				DB_Insert_SearchFileDAO db_Insert_SearchFileDAO = DB_Insert_SearchFileDAO.getInstance();
				for ( ConfigurationFile configurationFile : configurationFileList ) {
					String searchProgramName = configurationFile.getSearchProgram();
					SearchProgramEntry searchProgramEntry = searchProgramEntryMap.get( searchProgramName );
					if ( searchProgramEntry == null ) {
						String msg = "Processing 'configuration_file' entry, search_program has a value that is not under 'search_program_info': "
								+ searchProgramName;
						log.error( msg );
						throw new LimelightImporterDataException( msg );
					}
					
					long fileSize = 0;
					if ( configurationFile.getFileContent() != null ) {
						fileSize = configurationFile.getFileContent().length;
					}
					SearchFileDTO searchFileDTO = new SearchFileDTO();
					searchFileDTO.setSearchId(  searchId );
					searchFileDTO.setSearchProgramsPerSearchId( searchProgramEntry.getSearchProgramsPerSearchDTO().getId() );
					searchFileDTO.setMimeType( ConfigFileMimeType.CONFIG_FILE_MIME_TYPE );
					searchFileDTO.setFilename( configurationFile.getFileName() );
					searchFileDTO.setFileSize( fileSize );
					
					db_Insert_SearchFileDAO.saveToDatabase( searchFileDTO );
					db_Insert_SearchFileDAO.saveData( searchFileDTO.getId(), configurationFile.getFileContent() );
					
					SearchFileProjectSearchDTO searchFileProjectSearchDTO = new SearchFileProjectSearchDTO();
					searchFileProjectSearchDTO.setProjectSearchId( projectSearchId );
					searchFileProjectSearchDTO.setSearchFileId( searchFileDTO.getId() );
					searchFileProjectSearchDTO.setDisplayFilename( searchFileDTO.getFilename() );
					DB_Insert_SearchFileProjectSearchDAO.getInstance().saveToDatabase( searchFileProjectSearchDTO );
				}
			}
		}
	}
}