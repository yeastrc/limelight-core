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
package org.yeastrc.limelight.limelight_importer.constants;

/**
 * 
 *
 */
public class DatabaseAutoIncIdFieldForRecordNotInsertedYetConstants {

	/**
	 * Set to -1 since the field is unsigned so if try to insert this the insert will fail
	 */
	public static final int DB_AUTO_INC_FIELD_INITIAL_VALUE_FOR_NOT_INSERTED_YET = -1;
}
