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
package org.yeastrc.limelight.limelight_shared.enum_classes;


/**
 * Enum for is this Search record 
 * DB field search.status_id
 * 
 * Keep these values in sync with the values in the table 
 * 'search_record_status_lookup'
 * 
 * !!  Update class Limelight_DatabaseCleanup__ProjectSearchIdsToDeleteSearcher when add new status that indicates that record can be removed from database  !!
 * 
 * !!  Update class Limelight_DatabaseCleanup__SearchIdsToDeleteSearcher when add new status  !!
 * 
 * 			
 * 
 */
public enum SearchRecordStatus {

	IMPORTING( 1 ),
	IMPORTING_WAITING_FOR_SCAN_FILE_IMPORTS( 2 ),
    IMPORT_COMPLETE_VIEW( 3 ),
    IMPORT_FAIL( 4 ),
    IMPORT_CANCELED_INCOMPLETE( 5 ),
    MARKED_FOR_DELETION( 6 ),
	DELETION_IN_PROGRESS( 7 );
	
    private final int value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private SearchRecordStatus( int v) {
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
    public static SearchRecordStatus fromValue( int value_ ) {
        for (SearchRecordStatus c: SearchRecordStatus.values()) {
            if (c.value == value_ ) {
                return c;
            }
        }
        throw new IllegalArgumentException( "SearchRecordStatus not valid for value: " + value_ );
    }

}