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
package org.yeastrc.limelight.limelight_run_importer.main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_run_importer.manager_thread.ManagerThread;

/**
 * 
 *
 */
public class ImporterRunnerMain {

	private static final Logger log = LoggerFactory.getLogger( ImporterRunnerMain.class );
	
	/**
	 * private constructor
	 */
	private ImporterRunnerMain() { }
	/**
	 * Static singleton instance
	 */
	private static final ImporterRunnerMain _instance = new ImporterRunnerMain();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static ImporterRunnerMain getInstance() {
		return _instance; 
	}
	private volatile boolean keepRunning = true;
//	private volatile Thread currentThread;
	private ManagerThread managerThread;
		
	/**
	 * @param maxTrackingRecordPriorityToRetrieve
	 */
	public void importerRunnerMain( int maxTrackingRecordPriorityToRetrieve ) {
		try {
			log.warn( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   importerRunnerMain start" );
//			currentThread = Thread.currentThread();
			
			//  Instantiate and 'start()' the ManagerThread
			
			managerThread = new ManagerThread( );
			managerThread.setMaxTrackingRecordPriorityToRetrieve( maxTrackingRecordPriorityToRetrieve );
			managerThread.setImporterRunnerMain( this );
			managerThread.start();
			
			while ( keepRunning ) {
				//   TODO  TEMP code
				synchronized (this) {
					try {
						wait();
					} catch (InterruptedException e) {
						log.warn("wait() interrupted with InterruptedException");
					}
				}
			}
		} catch (Throwable e1) {
			String msg = "ImporterRunnerMain: Exception: " + e1.toString();
			log.error( msg, e1);
			System.out.println( msg );
			e1.printStackTrace(System.out);
			System.err.println( msg );
			e1.printStackTrace();
		}
	}
	/**
	 * shutdown was received from the operating system on a different thread
	 */
	public void shutdown() {
		log.debug( "shutdown() Called" );
		try {
			if ( managerThread != null ) {
				managerThread.shutdown();
				try {
					//  wait for managerThread to exit the run() method
					managerThread.join();
				} catch (InterruptedException e) {
					log.warn( "In shutdown(): call to managerThread.join() threw InterruptedException " + e.toString(), e );
				}
			}
		} catch (Throwable e1) {
			log.error( "ImporterRunnerMain: shutdown:  managerThread.shutdown();:  Exception: ", e1);
		}
		keepRunning = false;
		awaken();
		log.info( "Exiting shutdown()" );
	}
	/**
	 * Stop the main thread
	 */
	public void stopMainThread() {
		log.info( "stopMainThread() Called" );
		//  awaken and let main thread die
		keepRunning = false;
		awaken();
		log.info( "Exiting stopMainThread()" );
	}
	/**
	 * awaken thread to process request
	 */
	private void awaken() {
		synchronized (this) {
			notify();
		}
	}

}
