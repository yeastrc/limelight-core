package org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt;

/**
 * Common interface all Cached Data classes will implement
 * 
 * This is to support a single point that can be called to clear all cached data from memory
 */
public interface CachedData_InMemory_CommonIF {

	public void clearCacheData() throws Exception;
	
	public Cache_InMemory_CurrentSizeMaxSizeResult getCurrentCacheSizeAndMax() throws Exception;
}
