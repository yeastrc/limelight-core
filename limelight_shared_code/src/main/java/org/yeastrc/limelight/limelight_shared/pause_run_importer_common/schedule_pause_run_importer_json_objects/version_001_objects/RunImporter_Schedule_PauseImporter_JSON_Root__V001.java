package org.yeastrc.limelight.limelight_shared.pause_run_importer_common.schedule_pause_run_importer_json_objects.version_001_objects;

import java.util.List;

/**
 * Run Importer - Schedule PauseImporter - JSON Root - V001
 *
 */
public class RunImporter_Schedule_PauseImporter_JSON_Root__V001 {
	
	public static final int VERSION_NUMBER = 1;

	private List<RunImporter_Schedule_PauseImporter_JSON_SinglePauseItem__V001> schedulePauseItemList;
	
	/**
	 * 
	 *
	 */
	public static class RunImporter_Schedule_PauseImporter_JSON_SinglePauseItem__V001 {
		
		private List<Integer> dayList;  //  from 1 to 7   Sun to Sat
		private Integer startTime_24HourClock;
		private Integer durationInHours;
		
		public List<Integer> getDayList() {
			return dayList;
		}
		public void setDayList(List<Integer> dayList) {
			this.dayList = dayList;
		}
		public Integer getStartTime_24HourClock() {
			return startTime_24HourClock;
		}
		public void setStartTime_24HourClock(Integer startTime_24HourClock) {
			this.startTime_24HourClock = startTime_24HourClock;
		}
		public Integer getDurationInHours() {
			return durationInHours;
		}
		public void setDurationInHours(Integer durationInHours) {
			this.durationInHours = durationInHours;
		}
	}

	public List<RunImporter_Schedule_PauseImporter_JSON_SinglePauseItem__V001> getSchedulePauseItemList() {
		return schedulePauseItemList;
	}

	public void setSchedulePauseItemList(
			List<RunImporter_Schedule_PauseImporter_JSON_SinglePauseItem__V001> schedulePauseItemList) {
		this.schedulePauseItemList = schedulePauseItemList;
	}

}
