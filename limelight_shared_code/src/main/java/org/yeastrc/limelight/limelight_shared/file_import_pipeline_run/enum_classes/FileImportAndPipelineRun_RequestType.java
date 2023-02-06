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
package org.yeastrc.limelight.limelight_shared.file_import_pipeline_run.enum_classes;

/**
 * Enum for is this File Import and Pipeline Run record for the request_type 
 * 
 * Keep these values in sync with the values in the table 
 * 'XXXXXX'
 * 
 */
public enum FileImportAndPipelineRun_RequestType {

	FEATURE_DETECTION_HARDKLOR_BULLSEYE_IMPORT( 1 ),
	FEATURE_DETECTION_HARDKLOR_BULLSEYE_RUN_AND_IMPORT( 2 );

    
    private final int value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private FileImportAndPipelineRun_RequestType( int v) {
        value = v;
    }

    public int value() {
        return value;
    }

    /**
     * Get the enum from the String value
     * 
     * @param value_
     * @return
     */
    public static FileImportAndPipelineRun_RequestType fromValue( int value_ ) {
        for (FileImportAndPipelineRun_RequestType c: FileImportAndPipelineRun_RequestType.values()) {
            if (c.value == value_ ) {
                return c;
            }
        }
        throw new IllegalArgumentException( "FileImportAndPipelineRun_RequestType not valid for value: " + value_ );
    }
}
