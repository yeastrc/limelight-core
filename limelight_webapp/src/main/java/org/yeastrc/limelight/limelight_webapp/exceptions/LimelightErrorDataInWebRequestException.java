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
package org.yeastrc.limelight.limelight_webapp.exceptions;

/**
 * 
 *  Extends RuntimeException so compatible with Spring DB Transactions
 */
public class LimelightErrorDataInWebRequestException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	private boolean projectIdnotfound;
	private boolean projectIdNotEnabledOrMarkedforDeletion;

	/**
	 * 
	 */
	public LimelightErrorDataInWebRequestException() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 * @param cause
	 * @param enableSuppression
	 * @param writableStackTrace
	 */
	public LimelightErrorDataInWebRequestException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 * @param cause
	 */
	public LimelightErrorDataInWebRequestException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 */
	public LimelightErrorDataInWebRequestException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param cause
	 */
	public LimelightErrorDataInWebRequestException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

	public boolean isProjectIdnotfound() {
		return projectIdnotfound;
	}

	public void setProjectIdnotfound(boolean projectIdnotfound) {
		this.projectIdnotfound = projectIdnotfound;
	}

	public boolean isProjectIdNotEnabledOrMarkedforDeletion() {
		return projectIdNotEnabledOrMarkedforDeletion;
	}

	public void setProjectIdNotEnabledOrMarkedforDeletion(boolean projectIdNotEnabledOrMarkedforDeletion) {
		this.projectIdNotEnabledOrMarkedforDeletion = projectIdNotEnabledOrMarkedforDeletion;
	}

}
