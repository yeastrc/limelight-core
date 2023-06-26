package org.yeastrc.limelight.limelight_shared.constants;

/**
 * In the Run Importer process, the time until the next whatever
 *
 */
public class Limelight__RunImporter_TimeUntilNext_X_Constants {

	public static final int WAIT_TIME_FOR_MANAGER_THREAD_NEXT_PROCESS_MAIN_LOOP_IN_SECONDS = 10;
	
	//  If change next values to different value, then need to change Run Importer code since there is currently a single loop that uses the first value
	
	public static final int WAIT_TIME_FOR_CHECK_PAUSE_REQUEST_IN_SECONDS = WAIT_TIME_FOR_MANAGER_THREAD_NEXT_PROCESS_MAIN_LOOP_IN_SECONDS;
	
	public static final int WAIT_TIME_FOR_UPDATE_IS_ALIVE_IN_SECONDS = WAIT_TIME_FOR_MANAGER_THREAD_NEXT_PROCESS_MAIN_LOOP_IN_SECONDS;
}
