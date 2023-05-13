package org.yeastrc.limelight.db_populate_new_fields__common_code.shutdown_requested_detection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Single place where any code can:
 * 
 *  Wait while Importer is running 
 *  Check for shutdown requested, either by killing the process or the stop processing file
 *
 */
public class Limelight_DatabasePopulateNewFields__WaitForImporterRun_And_ShutdownRequestedDetection {

	private static final Logger log = LoggerFactory.getLogger(Limelight_DatabasePopulateNewFields__WaitForImporterRun_And_ShutdownRequestedDetection.class);
	
	private static final int TWO_MINUTES__IN_MILLISECONDS = 2 * 60 * 60 * 1000;

	/**
	 * The Run importer process is processing an Import so pause DB Cleanup/Removal
	 */
	private volatile boolean importerRunning = false;
	
	/**
	 * The Run importer process received a TERM or other signal that triggered the thread
	 * registered in the shutdown hook to run
	 */
	private volatile boolean shutdownRequestReceived = false;
	

	/**
	 * private constructor
	 */
	private Limelight_DatabasePopulateNewFields__WaitForImporterRun_And_ShutdownRequestedDetection() { }
	/**
	 * Static singleton instance
	 */
	private static final Limelight_DatabasePopulateNewFields__WaitForImporterRun_And_ShutdownRequestedDetection _instance = new Limelight_DatabasePopulateNewFields__WaitForImporterRun_And_ShutdownRequestedDetection();
	/**
	 * Static get singleton instance
	 * @return
	 */
	public static Limelight_DatabasePopulateNewFields__WaitForImporterRun_And_ShutdownRequestedDetection getInstance() {
		return _instance; 
	}
	
	/**
	 *  * Single place where any code can:
	 * 
	 *  Wait while Importer is running 
	 *  Check for shutdown requested, either by killing the process or the stop processing file
	 *  
	 * @return true if shutdown is requested
	 */
	public boolean waitForImporterRun_And_IsShutdownRequestReceived() {

		if ( shutdownRequestReceived ) {
			return true;
		}
		
		while (true) {
			
			boolean importerRunning_Local = false;

			synchronized (this) {
				if ( this.importerRunning ) {
					
					importerRunning_Local = true;

					//  Importer is running so wait for it to finish
					try {
						this.wait(TWO_MINUTES__IN_MILLISECONDS);  // Max wait.  Ensure not wait forever in case this.notify() (call below) timing is off
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
			
			if ( ! importerRunning_Local ) {
				break;
			}
		}
		
		synchronized (this) {
			if ( ! shutdownRequestReceived ) {

				//  Add tiny wait between calls to not monopolize the database, allowing the webapp to still function
				try {
					this.wait( 200 ); //  200 milliseconds wait
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}

		if ( shutdownRequestReceived ) {
			return true;
		}
		return false;
	}
	

	/**
	 * 
	 */
	public void shutdownRequestReceived() {

		synchronized (this) {
			this.shutdownRequestReceived = true;

			this.notify();
		}
	}
	
	/**
	 * Start of Importer is Running
	 */
	public void importerIsRunning_Start() {

		synchronized (this) {

			this.importerRunning = true;
		}
	}

	/**
	 * End of Importer is Running
	 */
	public void importerIsRunning_End() {
		
		synchronized (this) {
			this.importerRunning = false;
			
			this.notify();
		}
	}
 	
}
