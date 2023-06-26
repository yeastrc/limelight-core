package org.yeastrc.limelight.limelight_shared.pause_run_importer_common.is_pause_run_importer_now_based_on_schedule;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_shared.exceptions.LimelightShardCodeInternalErrorException;
import org.yeastrc.limelight.limelight_shared.pause_run_importer_common.enum_classes.FileImport_RunImporter_PauseProcessing_Schedule_Type_ID_Enum;
import org.yeastrc.limelight.limelight_shared.pause_run_importer_common.schedule_pause_run_importer_json_objects.version_001_objects.RunImporter_Schedule_PauseImporter_JSON_Root__V001;
import org.yeastrc.limelight.limelight_shared.pause_run_importer_common.schedule_pause_run_importer_json_objects.version_001_objects.RunImporter_Schedule_PauseImporter_JSON_Root__V001.RunImporter_Schedule_PauseImporter_JSON_SinglePauseItem__V001;
import org.yeastrc.limelight.limelight_shared.pause_run_importer_common.searchers.RunImporter_PauseProcessing_Schedule_LastScheduleUpdateTimestamp_Searcher;
import org.yeastrc.limelight.limelight_shared.pause_run_importer_common.searchers.RunImporter_PauseProcessing_Schedule_LastScheduleUpdateTimestamp_Searcher.RunImporter_PauseProcessing_Schedule_LastScheduleUpdateTimestamp_Searcher_Result_ForType;
import org.yeastrc.limelight.limelight_shared.pause_run_importer_common.searchers.RunImporter_PauseProcessing_Schedule_Searcher.RunImporter_PauseProcessing_Schedule_Searcher_Result_ForType;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.yeastrc.limelight.limelight_shared.pause_run_importer_common.searchers.RunImporter_PauseProcessing_Schedule_Searcher;

/**
 * 
 *
 */
public class RunImporter_Schedule_PauseImporter_IsPauseNow_BasedOn_Schedule {

	private static final Logger log = LoggerFactory.getLogger( RunImporter_Schedule_PauseImporter_IsPauseNow_BasedOn_Schedule.class );
	
	private static final long ONE_HOUR_IN_MILLISECONDS = 1 * 60 * 60 * 1000;

	//  private constructor
	private RunImporter_Schedule_PauseImporter_IsPauseNow_BasedOn_Schedule() { }
	/**
	 * @return newly created instance
	 */
	public static RunImporter_Schedule_PauseImporter_IsPauseNow_BasedOn_Schedule getInstance() { 
		return new RunImporter_Schedule_PauseImporter_IsPauseNow_BasedOn_Schedule(); 
	}
	
	
	
	private volatile Internal__Cached_Schedule cachedSchedule;
	
	/**
	 * 
	 *
	 */
	public static class RunImporter_Schedule_PauseImporter_IsPauseNow_BasedOn_Schedule_Result {

		private boolean pauseAll_Type_InEffect_NowAtThisCurrentMoment;

		// NOT Computed yet since then would have to deal with overlapping entries to get to true end of pause.
//		private long status_Requested_PauseAll_Type_InEffect_EndsAfterNumberOfSeconds;

		public boolean isPauseAll_Type_InEffect_NowAtThisCurrentMoment() {
			return pauseAll_Type_InEffect_NowAtThisCurrentMoment;
		}
	}
	
	/**
	 * @return
	 * @throws Exception 
	 */
	public RunImporter_Schedule_PauseImporter_IsPauseNow_BasedOn_Schedule_Result isPauseNow_BasedOn_Schedule() throws Exception {
		
		
		{
			Long lastUpdated_For_Type_PauseAll_Current_From_DB_Record = null;

			{
				List<RunImporter_PauseProcessing_Schedule_LastScheduleUpdateTimestamp_Searcher_Result_ForType> resultList = 
						RunImporter_PauseProcessing_Schedule_LastScheduleUpdateTimestamp_Searcher.getInstance()
						.get_Schedule_LastScheduleUpdateTimestamp_AcrossAllTypes();

				for ( RunImporter_PauseProcessing_Schedule_LastScheduleUpdateTimestamp_Searcher_Result_ForType result : resultList ) {
					if ( result.getType() == FileImport_RunImporter_PauseProcessing_Schedule_Type_ID_Enum.PAUSE_ALL ) {

						lastUpdated_For_Type_PauseAll_Current_From_DB_Record = result.getScheduleJSON_LastUpdated_UTC_Milliseconds();
					}
				}
			}
			
			if ( lastUpdated_For_Type_PauseAll_Current_From_DB_Record == null ) {
				 // NOT have a record 
				
				if ( cachedSchedule != null ) {
					cachedSchedule = null; // NO Longer have a record so clear cache
				}
			
			} else {
				
				//  Have a record so determine if replace cached data
				
				boolean loadAndParseDBdata = true;
				
				try {
				
					if ( cachedSchedule != null && cachedSchedule.lastUpdated_For_Type_PauseAll_From_DB_Record_ForCached == lastUpdated_For_Type_PauseAll_Current_From_DB_Record ) {
						loadAndParseDBdata = false;
					}
				} catch ( Throwable t ) {
					//  Eat exception since likely caused by cachedSchedule being null
				}
				
				if ( loadAndParseDBdata ) {
					
					RunImporter_PauseProcessing_Schedule_Searcher_Result_ForType result_PauseAll = null;
					
					List<RunImporter_PauseProcessing_Schedule_Searcher_Result_ForType> resultList = 
							RunImporter_PauseProcessing_Schedule_Searcher.getInstance().getSchedule_AcrossAllTypes();
					
					for ( RunImporter_PauseProcessing_Schedule_Searcher_Result_ForType result : resultList ) {
						
						if ( result.getType() == FileImport_RunImporter_PauseProcessing_Schedule_Type_ID_Enum.PAUSE_ALL ) {
							result_PauseAll = result;
						}
					}
					
					if ( result_PauseAll == null ) {
						
						cachedSchedule = null;
						
					} else {
						
						Internal__Cached_Schedule cachedSchedule_Local = new Internal__Cached_Schedule();
						
						cachedSchedule_Local.lastUpdated_For_Type_PauseAll_From_DB_Record_ForCached = result_PauseAll.getScheduleJSON_LastUpdated_UTC_Milliseconds();
						
						if ( result_PauseAll.getScheduleJSON_Version() == RunImporter_Schedule_PauseImporter_JSON_Root__V001.VERSION_NUMBER ) {

							//  Jackson JSON Mapper object for JSON deserialization and serialization
							ObjectMapper jacksonJSON_Mapper = new ObjectMapper();  //  Jackson JSON library object

							cachedSchedule_Local.pauseSchedule_Root_V001 = jacksonJSON_Mapper.readValue( result_PauseAll.getScheduleJSON(), RunImporter_Schedule_PauseImporter_JSON_Root__V001.class );
						
						} else {
							
							String msg = "Unexpected Version in result_PauseAll.getScheduleJSON_Version(): " + result_PauseAll.getScheduleJSON_Version();
							log.error(msg);
							throw new LimelightShardCodeInternalErrorException(msg);
						}
						
						cachedSchedule = cachedSchedule_Local;
					}
				}
				
			}
		}
		
		
		RunImporter_Schedule_PauseImporter_JSON_Root__V001 pauseSchedule_Root = null;
		
		if ( cachedSchedule != null ) {

			try {
				pauseSchedule_Root = cachedSchedule.pauseSchedule_Root_V001;
			} catch ( Throwable t ) {
				//  Eat exception since likely caused by cachedSchedule being null
			}
		}

		boolean nowInPauseItems = false;

		if ( pauseSchedule_Root != null && pauseSchedule_Root.getSchedulePauseItemList() != null ) {

			long nowInMilliseconds = System.currentTimeMillis();

			for ( RunImporter_Schedule_PauseImporter_JSON_SinglePauseItem__V001 requestedPauseItem : pauseSchedule_Root.getSchedulePauseItemList() ) {

				for ( Integer dayOfWeek : requestedPauseItem.getDayList() ) {

					GregorianCalendar pauseItem_Start_Calendar = new GregorianCalendar();

					pauseItem_Start_Calendar.set( Calendar.DAY_OF_WEEK, dayOfWeek ); //  from 1 to 7   Sun to Sat

					pauseItem_Start_Calendar.set( Calendar.HOUR_OF_DAY, requestedPauseItem.getStartTime_24HourClock() );
					pauseItem_Start_Calendar.set( Calendar.MINUTE, 0 );
					pauseItem_Start_Calendar.set( Calendar.SECOND, 0 );

					long pauseItem_Start_Calendar_InMillisconds = pauseItem_Start_Calendar.getTimeInMillis();

					if ( nowInMilliseconds < pauseItem_Start_Calendar_InMillisconds ) {

						//  Now is before Start so subtract a week

						pauseItem_Start_Calendar.roll( Calendar.WEEK_OF_YEAR, -1 );

						pauseItem_Start_Calendar_InMillisconds = pauseItem_Start_Calendar.getTimeInMillis();
					}

					long pauseItem_End_InMilliseconds = pauseItem_Start_Calendar_InMillisconds + ONE_HOUR_IN_MILLISECONDS * requestedPauseItem.getDurationInHours();


					if ( pauseItem_Start_Calendar_InMillisconds < nowInMilliseconds && nowInMilliseconds < pauseItem_End_InMilliseconds ) {

						nowInPauseItems = true;

						break;
					}

				}
			}
		}
		
		RunImporter_Schedule_PauseImporter_IsPauseNow_BasedOn_Schedule_Result result = new RunImporter_Schedule_PauseImporter_IsPauseNow_BasedOn_Schedule_Result();

		if ( nowInPauseItems ) {
			
			result.pauseAll_Type_InEffect_NowAtThisCurrentMoment = true;
			
			// NOT Computed yet since then would have to deal with overlapping entries to get to true end of pause.
			// result.status_Requested_PauseAll_Type_InEffect_EndsAfterNumberOfSeconds; 
		}
		
//		System.out.println( "nowInPauseItems: " + nowInPauseItems);
		
		
		return result;
	}
	
	/**
	 * 
	 *
	 */
	private static class Internal__Cached_Schedule {
		
		long lastUpdated_For_Type_PauseAll_From_DB_Record_ForCached;
		RunImporter_Schedule_PauseImporter_JSON_Root__V001 pauseSchedule_Root_V001;
		
	}
	
}
