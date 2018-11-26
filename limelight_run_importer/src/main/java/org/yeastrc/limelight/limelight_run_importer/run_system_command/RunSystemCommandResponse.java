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
package org.yeastrc.limelight.limelight_run_importer.run_system_command;

/**
 * commandExitCode, stdOut, and stdErr from running a system command
 * 
 * commandSuccessful = true if commandExitCode == zero
 */
public class RunSystemCommandResponse {

	private boolean commandSuccessful;
	
	private int commandExitCode;

	private boolean shutdownRequested;
	
	


	public int getCommandExitCode() {
		return commandExitCode;
	}
	public void setCommandExitCode(int commandExitCode) {
		this.commandExitCode = commandExitCode;
	}
	public boolean isCommandSuccessful() {
		return commandSuccessful;
	}
	public void setCommandSuccessful(boolean commandSuccessful) {
		this.commandSuccessful = commandSuccessful;
	}
	public boolean isShutdownRequested() {
		return shutdownRequested;
	}
	public void setShutdownRequested(boolean shutdownRequested) {
		this.shutdownRequested = shutdownRequested;
	}
}
