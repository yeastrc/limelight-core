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
package org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.pause_importer_is_in_effect_at_current_time_based_on_request;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.pause_run_importer_common.is_pause_run_importer_now_based_on_schedule.RunImporter_Schedule_PauseImporter_IsPauseNow_BasedOn_Schedule;
import org.yeastrc.limelight.limelight_shared.pause_run_importer_common.is_pause_run_importer_now_based_on_schedule.RunImporter_Schedule_PauseImporter_IsPauseNow_BasedOn_Schedule.RunImporter_Schedule_PauseImporter_IsPauseNow_BasedOn_Schedule_Result;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Request_Status_Enum;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.searchers.RunImporter_PauseProcessing_Request_Searcher;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.searchers.RunImporter_PauseProcessing_Request_Searcher.RunImporter_PauseProcessing_Request_Searcher_Result_AcrossTypes;

/**
 * The Run Importer Pause is in effect now at this moment
 * 
 * 
 */
public class RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment {

	private static final Logger log = LoggerFactory.getLogger( RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment.class );
	
	public enum RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment__From_RequestOrSchedule_Enum {
		REQUEST, SCHEDULE
	}

	//  private constructor
	private RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment() { }
	/**
	 * @return newly created instance
	 */
	public static RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment getInstance() { 
		return new RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment(); 
	}
	
	/**
	 * Result across all records found
	 *
	 */
	public static class RunImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result {

		private FileImport_RunImporter_PauseProcessing_Request_Status_Enum status_Requested_PauseAll_Type_InEffect_NowAtThisCurrentMoment;
		
		private RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment__From_RequestOrSchedule_Enum from_RequestOrSchedule;

		public FileImport_RunImporter_PauseProcessing_Request_Status_Enum getStatus_Requested_PauseAll_Type_InEffect_NowAtThisCurrentMoment() {
			return status_Requested_PauseAll_Type_InEffect_NowAtThisCurrentMoment;
		}

		public RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment__From_RequestOrSchedule_Enum getFrom_RequestOrSchedule() {
			return from_RequestOrSchedule;
		}
	}

	/**
	 * Result across all records found
	 * 
	 * @return
	 * @throws Exception
	 */
	public RunImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result getStatus_AcrossAllTypes() throws Exception {
		
		RunImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result result = new RunImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result();
		
		RunImporter_PauseProcessing_Request_Searcher_Result_AcrossTypes searcherResult = 
				RunImporter_PauseProcessing_Request_Searcher.getInstance().getStatus_AcrossAllTypes();
		
		if ( searcherResult.getStatus_Requested_PauseAll_Type() != null &&
				searcherResult.getStatus_Requested_PauseAll_Type() != FileImport_RunImporter_PauseProcessing_Request_Status_Enum.NOT_PAUSE ) {

			//  User specified Other Than NOT Pause so return that
			
			result.status_Requested_PauseAll_Type_InEffect_NowAtThisCurrentMoment = searcherResult.getStatus_Requested_PauseAll_Type();
			
			result.from_RequestOrSchedule = RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment__From_RequestOrSchedule_Enum.REQUEST;
			
		} else {

			//  Check if User specified Scheduled Pause and that applies to now
			
			if ( is_NOW_In_ScheduledPause() ) {
			
				result.status_Requested_PauseAll_Type_InEffect_NowAtThisCurrentMoment = FileImport_RunImporter_PauseProcessing_Request_Status_Enum.PAUSE_WHEN_COMPLETE;
				
				result.from_RequestOrSchedule = RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment__From_RequestOrSchedule_Enum.SCHEDULE;
				
			} else {
				//  ELSE  return NOT_PAUSE

				result.status_Requested_PauseAll_Type_InEffect_NowAtThisCurrentMoment = FileImport_RunImporter_PauseProcessing_Request_Status_Enum.NOT_PAUSE;
			}
		}
		
		return result;
	}

	/**
	 * @return
	 * @throws Exception 
	 */
	private boolean is_NOW_In_ScheduledPause() throws Exception {
		
		RunImporter_Schedule_PauseImporter_IsPauseNow_BasedOn_Schedule_Result result =
				RunImporter_Schedule_PauseImporter_IsPauseNow_BasedOn_Schedule.getInstance()
				.isPauseNow_BasedOn_Schedule();
		
		if ( result.isPauseAll_Type_InEffect_NowAtThisCurrentMoment() ) {
			return true;
		}
		
		return false;
	}
}
