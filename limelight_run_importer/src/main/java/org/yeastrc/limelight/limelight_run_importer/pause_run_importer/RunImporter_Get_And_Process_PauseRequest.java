package org.yeastrc.limelight.limelight_run_importer.pause_run_importer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_run_importer.exceptions.LimelightRunImporterInternalException;
import org.yeastrc.limelight.limelight_run_importer.manager_thread.ManagerThread;
import org.yeastrc.limelight.limelight_shared.exceptions.LimelightShardCodeInternalErrorException;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Current_Status_TriggerType_Enum;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.enum_classes.FileImport_RunImporter_PauseProcessing_Request_Status_Enum;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.pause_importer_is_in_effect_at_current_time_based_on_request.RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.pause_importer_is_in_effect_at_current_time_based_on_request.RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment.RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment__From_RequestOrSchedule_Enum;
import org.yeastrc.limelight.limelight_shared.run_importer.pause_run_importer.pause_importer_is_in_effect_at_current_time_based_on_request.RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment.RunImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result;

/**
 * Get Pause Request from DB
 * Call required classes with current pause status
 *
 */
public class RunImporter_Get_And_Process_PauseRequest {

	private static final Logger log = LoggerFactory.getLogger( RunImporter_Get_And_Process_PauseRequest.class );
	
	private static final RunImporter_Get_And_Process_PauseRequest instance = new RunImporter_Get_And_Process_PauseRequest();

	//  private constructor
	private RunImporter_Get_And_Process_PauseRequest() { }
	
	/**
	 * @return Singleton instance
	 */
	public static RunImporter_Get_And_Process_PauseRequest getSingletonInstance() { 
		return instance; 
	}
	
	/**
	 * @throws Exception 
	 * 
	 */
	public void runImporter_Get_And_Process_PauseRequest() throws Exception {
		
		RunImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result runImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result =
				RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment.getInstance().getStatus_AcrossAllTypes();
		
		if ( runImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result.getStatus_Requested_PauseAll_Type_InEffect_NowAtThisCurrentMoment() 
				== FileImport_RunImporter_PauseProcessing_Request_Status_Enum.NOT_PAUSE ) {
			
			ManagerThread.getExistingSingletonInstance().pause_Imports_RunPipeline_NOT();
			
		} else if ( runImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result.getStatus_Requested_PauseAll_Type_InEffect_NowAtThisCurrentMoment() 
				== FileImport_RunImporter_PauseProcessing_Request_Status_Enum.PAUSE_IMMEDIATELY ) {

			ManagerThread.getExistingSingletonInstance().pause_Imports_RunPipeline_Now();
			
		} else if ( runImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result.getStatus_Requested_PauseAll_Type_InEffect_NowAtThisCurrentMoment() 
				== FileImport_RunImporter_PauseProcessing_Request_Status_Enum.PAUSE_WHEN_COMPLETE ) {
			
			FileImport_RunImporter_PauseProcessing_Current_Status_TriggerType_Enum current_Status_TriggerType = null;
			
			if ( runImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result.getFrom_RequestOrSchedule() == null ) {

				String msg = "runImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result.getFrom_RequestOrSchedule() == null:  value: " + runImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result.getFrom_RequestOrSchedule() ;
				log.error(msg);
				throw new LimelightShardCodeInternalErrorException(msg);
				
			} else if ( runImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result.getFrom_RequestOrSchedule() == RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment__From_RequestOrSchedule_Enum.REQUEST ) {
				
				current_Status_TriggerType = FileImport_RunImporter_PauseProcessing_Current_Status_TriggerType_Enum.PAUSE_FOR_REQUEST;
				
			} else if ( runImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result.getFrom_RequestOrSchedule() == RunImporter_PauseImporter_InEffect_NowAtThisCurrentMoment__From_RequestOrSchedule_Enum.SCHEDULE ) {

				current_Status_TriggerType = FileImport_RunImporter_PauseProcessing_Current_Status_TriggerType_Enum.PAUSE_FOR_SCHEDULE;
				
			} else {

				String msg = "Unknown value for runImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result.getFrom_RequestOrSchedule(): " + runImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result.getFrom_RequestOrSchedule() ;
				log.error(msg);
				throw new LimelightShardCodeInternalErrorException(msg);
			}

			ManagerThread.getExistingSingletonInstance().pause_Imports_RunPipeline_AfterCurrent_ImportsAndRunPipelines(
					current_Status_TriggerType
					);
			
		} else {
		
			String msg = "Unknown value for getStatus_Requested_PauseAll_Type_InEffect_NowAtThisCurrentMoment: " + runImporter_PauseImporter_IsInEffect_NowAtThisCurrentMoment_Result.getStatus_Requested_PauseAll_Type_InEffect_NowAtThisCurrentMoment();
			log.error(msg);
			throw new LimelightRunImporterInternalException(msg);
		}
			
		
	}
}
