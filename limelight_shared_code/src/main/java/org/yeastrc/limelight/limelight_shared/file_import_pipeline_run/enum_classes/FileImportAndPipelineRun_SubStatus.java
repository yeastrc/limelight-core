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
 * Enum for is this Import and Pipeline Run record for the sub status 
 * 
 */
public enum FileImportAndPipelineRun_SubStatus {

    SYSTEM_ERROR( 1 ),
	DATA_ERROR( 2 ),
    PROJECT_NOT_ALLOW_IMPORT( 3 ),
    PIPELINE_RUN_ERROR( 4 )
    ;

	
    
    private final int value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private FileImportAndPipelineRun_SubStatus( int v) {
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
    public static FileImportAndPipelineRun_SubStatus fromValue( int value_ ) {
        for (FileImportAndPipelineRun_SubStatus c: FileImportAndPipelineRun_SubStatus.values()) {
            if (c.value == value_ ) {
                return c;
            }
        }
        throw new IllegalArgumentException( "FileImportAndPipelineRun_SubStatus not valid for value: " + value_ );
    }

}
