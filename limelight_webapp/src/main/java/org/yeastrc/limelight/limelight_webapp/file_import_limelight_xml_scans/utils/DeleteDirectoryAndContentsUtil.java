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
package org.yeastrc.limelight.limelight_webapp.file_import_limelight_xml_scans.utils;

import java.io.File;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * 
 *
 */
@Component
public class DeleteDirectoryAndContentsUtil implements DeleteDirectoryAndContentsUtilIF {

	private static final Logger log = LoggerFactory.getLogger( DeleteDirectoryAndContentsUtil.class );
	
	/**
	 * @param directory
	 * @throws LimelightInternalErrorException
	 * @throws IOException
	 */
	@Override
	public void deleteDirectoryAndContents( File directory ) throws LimelightInternalErrorException, IOException {
		File[] directoryContents = directory.listFiles();
		for ( File directoryItem : directoryContents ) {
			if ( directoryItem.isDirectory() ) {
				// recursive call
				deleteDirectoryAndContents( directoryItem );
			}
			if ( ! directoryItem.delete() ) {
				String msg = "Failed to delete file: " + directoryItem.getCanonicalPath();
				log.error( msg );
				throw new LimelightInternalErrorException(msg);
			}
		}
		if ( ! directory.delete() ) {
			String msg = "Failed to delete directory: " + directory.getCanonicalPath();
			log.error( msg );
			throw new LimelightInternalErrorException(msg);
		}
	}

}
