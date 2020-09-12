package org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt;

public interface CachedData_InMemory_CentralRegistry_IF {

	/**
	 * @param cachedConfigDataCommonItem
	 */
	void register(CachedData_InMemory_CommonIF cachedConfigDataCommonItem);

	/**
	 * @throws Exception
	 */
	void clearAllCacheData() throws Exception;

	/**
	 * @throws Exception
	 */
	void writeToLogAllCacheSizes() throws Exception;

}