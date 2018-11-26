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
package org.yeastrc.limelight.limelight_run_importer.delete_directory_and_contents;

import java.io.File;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 *
 */
public class DeleteDirectoryAndContents {

	private static final Logger log = LoggerFactory.getLogger( DeleteDirectoryAndContents.class );
	
	//  private constructor
	private DeleteDirectoryAndContents() { }
	
	/**
	 * @return newly created instance
	 */
	public static DeleteDirectoryAndContents getInstance() { 
		return new DeleteDirectoryAndContents(); 
	}

	/**
	 * @param directoryToDelete
	 * @throws IOException 
	 */
	public void deleteDirectoryAndContents( File directoryToDelete ) {
		
		deleteDirectoryAndContentsInternal( directoryToDelete );
	}
	
	
	/**
	 * Recursively called to delete sub directories
	 * 
	 * @param directoryToDelete
	 * @throws IOException 
	 */
	private void deleteDirectoryAndContentsInternal( File directoryToDelete ) {
		
		File[] dirContents = directoryToDelete.listFiles();
		
		for ( File dirItem : dirContents ) {
			
			if ( dirItem.isDirectory() ) {
				
				deleteDirectoryAndContentsInternal( dirItem );

				if ( ! dirItem.delete() ) {
					
					String msg = "Failed to delete directory: " + dirItem.getAbsolutePath();
					log.error( msg );
					
				}
			} else {
				
				if ( ! dirItem.delete() ) {
					
					String msg = "Failed to delete file: " + dirItem.getAbsolutePath();
					log.error( msg );
					
				}
			}
		}
		
		if ( ! directoryToDelete.delete() ) {
			
			String msg = "Failed to delete directory: " + directoryToDelete.getAbsolutePath();
			log.error( msg );
			
		}
	}

}
