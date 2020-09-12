package org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt;

public class Cache_InMemory_CurrentSizeMaxSizeResult {

	private long currentSize;
	private long maxSize;
	
	public long getCurrentSize() {
		return currentSize;
	}
	public void setCurrentSize(long currentSize) {
		this.currentSize = currentSize;
	}
	public long getMaxSize() {
		return maxSize;
	}
	public void setMaxSize(long maxSize) {
		this.maxSize = maxSize;
	}
}
