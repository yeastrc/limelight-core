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
package org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions;

/**
 * 
 *
 */
public class LimelightImporterDataException extends Exception {

	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	public LimelightImporterDataException() {
		super();

	}

	/**
	 * @param message
	 * @param cause
	 * @param enableSuppression
	 * @param writableStackTrace
	 */
	public LimelightImporterDataException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);

	}

	/**
	 * @param message
	 * @param cause
	 */
	public LimelightImporterDataException(String message, Throwable cause) {
		super(message, cause);

	}

	/**
	 * @param message
	 */
	public LimelightImporterDataException(String message) {
		super(message);

	}

	/**
	 * @param cause
	 */
	public LimelightImporterDataException(Throwable cause) {
		super(cause);

	}

}
