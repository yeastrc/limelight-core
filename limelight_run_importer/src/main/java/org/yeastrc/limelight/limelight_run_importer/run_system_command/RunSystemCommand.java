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


import java.io.File;
import java.io.OutputStream;
import java.lang.ProcessBuilder.Redirect;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_run_importer.exceptions.LimelightImporterConfigException;



/**
 * 
 *
 */
public class RunSystemCommand {


	private static final Logger log = LoggerFactory.getLogger( RunSystemCommand.class );

	//  private constructor
	private RunSystemCommand() { }
	
	/**
	 * @return newly created instance
	 */
	public static RunSystemCommand getInstance() { 
		return new RunSystemCommand(); 
	}
	
	//  wait time before check for program done
//	private final int WAIT_TIME_TO_FOR_STREAM_COPY_THREADS_TO_COMPLETE = 10;  //  in seconds
	
	
	
	private volatile boolean shutdownRequested = false;
	
	
	private volatile Process process = null;
	
	private volatile OutputStream outputStreamToProcessStdIn = null;

	private volatile boolean inWaitFor = false;
	

	/**
	 * awaken thread to get next import or to complete
	 */
	public void awaken() {

		synchronized (this) {

//			exittedWaitDueToAwakenNotify = true;

			notify();
		}

	}
	

	/**
	 * @param commandAndItsArgumentsAsList
	 * @param dirToRunCommandIn
	 * @param fileToWriteSysoutTo
	 * @param fileToWriteSyserrTo
	 * @param throwExceptionOnCommandFailure
	 * @return
	 * @throws Throwable
	 */
	public RunSystemCommandResponse runCmd( 
			
			List<String> commandAndItsArgumentsAsList,
			
			File dirToRunCommandIn, 
			File fileToWriteSysoutTo,
			File fileToWriteSyserrTo,
			boolean throwExceptionOnCommandFailure )
	throws Throwable
	{
		
		if ( shutdownRequested ) {
			
			String msg = "Object not usable once shutdownRequested is true";
			log.error( msg );
			throw new IllegalStateException(msg);
		}
		

		String[] commandAndItsArguments = commandAndItsArgumentsAsList.toArray( new String[ commandAndItsArgumentsAsList.size() ] );
		
		
		if ( log.isInfoEnabled() ) {

			log.info( "runCmd: running shell command:  " + commandAndItsArgumentsAsList );
		}
		
		if ( fileToWriteSysoutTo.exists() ) {

			if ( ! fileToWriteSysoutTo.delete() ) {

				String msg = "Unable to delete previous file to fileToWriteSysoutTo: " + fileToWriteSysoutTo.getCanonicalPath();
				log.error( msg );
				throw new LimelightImporterConfigException(msg);
			}
		}

		if ( fileToWriteSyserrTo.exists() ) {

			if ( ! fileToWriteSyserrTo.delete() ) {

				String msg = "Unable to delete previous file to fileToWriteSyserrTo: " + fileToWriteSyserrTo.getCanonicalPath();
				log.error( msg );
				throw new LimelightImporterConfigException(msg);
			}
		}

		
		
		
		if ( ! fileToWriteSysoutTo.createNewFile() ) {
			
			String msg = "Unable to write to fileToWriteSysoutTo: " + fileToWriteSysoutTo.getCanonicalPath();
			log.error( msg );
			throw new LimelightImporterConfigException(msg);
		}

		if ( ! fileToWriteSyserrTo.createNewFile() ) {
			
			String msg = "Unable to write to fileToWriteSyserrTo: " + fileToWriteSyserrTo.getCanonicalPath();
			log.error( msg );
			throw new LimelightImporterConfigException(msg);
		}
		
		RunSystemCommandResponse runSystemCommandResponse = new RunSystemCommandResponse();

		runSystemCommandResponse.setCommandSuccessful( false );

		outputStreamToProcessStdIn = null;

		try {

			ProcessBuilder processBuilder = new ProcessBuilder( commandAndItsArguments );
			
			processBuilder.directory( dirToRunCommandIn );
			processBuilder.redirectOutput( Redirect.to( fileToWriteSysoutTo ) );
			processBuilder.redirectError( Redirect.to( fileToWriteSyserrTo ) );
			

			process = processBuilder.start();
			
			outputStreamToProcessStdIn = process.getOutputStream();
			
			
			try {

				inWaitFor = true;

				process.waitFor();
				
			} finally {
			
				inWaitFor = false;
			}
			

			if ( shutdownRequested ) {
				
				//  Shutdown Requested so early exit
				
				String msg = "Shutdown requested so early exit with runSystemCommandResponse.setShutdownRequested( true );";
				
				log.warn( msg );
				
				runSystemCommandResponse.setShutdownRequested( true );
				
				return runSystemCommandResponse;  //  EARLY EXIT
			}
			
			
			int exitValue = process.exitValue();

			runSystemCommandResponse.setCommandExitCode( exitValue );
			


			if ( exitValue != 0 ) {

				List<String> commandAndItsArgumentsList = Arrays.asList( commandAndItsArguments );
				
				String message = "runCmd: execute command returned non-zero.  exitValue = " + exitValue 
						+ ", commandAndItsArgumentsList = " + commandAndItsArgumentsList;

				log.error(message);

				if ( throwExceptionOnCommandFailure ) {

					throw new Exception( message );

				}

				runSystemCommandResponse.setCommandSuccessful( false );

			} else {

				runSystemCommandResponse.setCommandSuccessful( true );
			}
			

			if ( shutdownRequested ) {
				
				
				//  Shutdown Requested so early exit
				
				runSystemCommandResponse.setShutdownRequested( true );
			}
			
			

		} catch ( Throwable t ) {

			log.error( "Exception running command |" + commandAndItsArguments + "|.  Exception: " + t.toString(), t );

			throw t;

		} finally {
			
			
//			process.getInputStream() and process.getErrorStream() are closed in the StreamCopyToFileThread objects

			if ( outputStreamToProcessStdIn != null ) {
				try {
					outputStreamToProcessStdIn.close();
				} catch ( Throwable t ) {
					log.info( "Exception closing stdin to process: " + t.toString(), t );
				}
				outputStreamToProcessStdIn = null;
			}

		}
		


		return runSystemCommandResponse;

	}
	
	
	/**
	 * Called on a separate thread when a shutdown request comes from the operating system.
	 * If this is not heeded, the process may be killed by the operating system after some time has passed ( controlled by the operating system )
	 */
	public void shutdown() {
		
		shutdownRequested = true;
		
		

//		try {
//
//			if ( outputStreamToProcessStdIn != null ) {
//
//				outputStreamToProcessStdIn.write( StringSendImporterToRequestShutdownConstants.SHUTDOWN );
//				
//				outputStreamToProcessStdIn.flush();
//				
//				outputStreamToProcessStdIn.close();
//				
//				outputStreamToProcessStdIn = null;
//
//				//  TODO  maybe do something here
//			}
//
//		} catch ( NullPointerException e ) {
//			
//			//  Eat the NullPointerException since that meant that nothing had to be done.
//			
//		} catch ( Throwable t ) {
//			
//			String msg = "Exception thrown sending shutdown text to child import process";
//			log.error( msg );
//			
//		}
		
		
		if ( inWaitFor ) {
			
			//  TODO  May want to issue an interrupt to exit the waitFor() immediately
		}
		
		try {

			if ( process != null ) {
				
				log.info( "killing child import process" );

				process.destroy();
			}

		} catch ( NullPointerException e ) {
			
			//  Eat the NullPointerException since that meant that nothing had to be done.
			
		} catch ( Throwable t ) {
			
			String msg = "Exception thrown killing child import process";
			log.error( msg );
			
		}
		
		this.awaken();
	}
	
}
