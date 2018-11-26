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
package org.yeastrc.limelight.limelight_submit_import.get_submitter_key;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import org.yeastrc.limelight.limelight_submit_import.constants.LimelightXMLFileUploadSubmitterPgmSameMachineConstants;
import org.yeastrc.limelight.limelight_submit_import.exceptions.LimelightSubImportReportedErrorException;



/**
 * 
 *
 */
public class GetSubmitterKey {


	private static final GetSubmitterKey instance = new GetSubmitterKey();

	private GetSubmitterKey() { }
	public static GetSubmitterKey getInstance() { return instance; }

	public String getSubmitterKey( String uploadTempSubdirString, File uploadTmpBaseDir ) throws Exception {

		String submitterKey = null;

		File uploadTempSubdir = null;

		File submitterKeyFile = null;

		try {


			uploadTempSubdir = new File( uploadTmpBaseDir, uploadTempSubdirString );

			if ( ! uploadTempSubdir.exists() ) {

				String msg = "Temp Upload Directory (from server) does not exist: " + uploadTempSubdir.getCanonicalPath();
				System.err.println( msg );
				throw new LimelightSubImportReportedErrorException( msg );
			}

			submitterKeyFile = new File( uploadTempSubdir, LimelightXMLFileUploadSubmitterPgmSameMachineConstants.SUBMITTER_KEY_FILENAME );

			if ( ! submitterKeyFile.exists() ) {

				String msg = "File in Temp Upload Directory containing Submitter Key does not exist: " + submitterKeyFile.getCanonicalPath();
				System.err.println( msg );

				throw new LimelightSubImportReportedErrorException( msg );
			}

			BufferedReader reader = null;

			try {

				reader = new BufferedReader( new FileReader(submitterKeyFile));

				submitterKey = reader.readLine();

			} catch (Exception e ) {

				String msg = "Error reading File in Temp Upload Directory containing Submitter Key: " + submitterKeyFile.getCanonicalPath();
				System.err.println( msg );
				e.printStackTrace();

				throw new LimelightSubImportReportedErrorException( msg, e );

			} finally {

				if ( reader != null ) {

					reader.close();
				}
			}


			return submitterKey;

		} catch ( LimelightSubImportReportedErrorException e ) {

			throw e;

		} catch (Exception e ) {

			String msg = "Error reading File in Temp Upload Directory containing Submitter Key: " + submitterKeyFile.getCanonicalPath();
			System.err.println( msg );
			e.printStackTrace();

			throw new LimelightSubImportReportedErrorException( msg, e );

		}
	}

}
