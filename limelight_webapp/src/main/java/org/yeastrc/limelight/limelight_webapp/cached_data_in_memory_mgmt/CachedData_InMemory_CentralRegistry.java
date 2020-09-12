package org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;

/**
 * Registry of cached data that implement CachedDataCommonIF
 * 
 * This is to support a single point that can be called to clear all cached data from memory
 *
 */
@Component
public class CachedData_InMemory_CentralRegistry implements CachedData_InMemory_CentralRegistry_IF {

	private static final Logger log = LoggerFactory.getLogger(  CachedData_InMemory_CentralRegistry.class );

	private final Map<String,CachedData_InMemory_CommonIF> cachedDataCommonItemMap = new ConcurrentHashMap<>();
	
	//  private constructor
	private CachedData_InMemory_CentralRegistry() { }
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.CachedData_InMemory_CentralRegistry_IF#register(org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.CachedData_InMemory_CommonIF)
	 */
	@Override
	public void register( CachedData_InMemory_CommonIF cachedConfigDataCommonItem ) {
		String className = cachedConfigDataCommonItem.getClass().getName();
		cachedDataCommonItemMap.put( className, cachedConfigDataCommonItem );
//		if ( log.isInfoEnabled() ) {
//			Exception e = new Exception();
//			log.info( "Adding cachedConfigDataCommonItem: " + cachedConfigDataCommonItem, e );
//		}
	}
	
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.CachedData_InMemory_CentralRegistry_IF#clearAllCacheData()
	 */
	@Override
	public void clearAllCacheData() throws Exception {
		if ( log.isInfoEnabled() ) {
			log.info( "clearAllCacheData() called" );
		}
		log.warn( "INFO: clearAllCacheData() called" );
		
		try {
			for ( Map.Entry<String,CachedData_InMemory_CommonIF> entry : cachedDataCommonItemMap.entrySet() ) {
				CachedData_InMemory_CommonIF item = entry.getValue();
				item.clearCacheData();
			}
		} catch (Exception e) {
			String msg = "Error clearAllCacheData(): ";
			log.error( msg, e );
			throw e;
		}
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.CachedData_InMemory_CentralRegistry_IF#writeToLogAllCacheSizes()
	 */
	@Override
	public void writeToLogAllCacheSizes() throws Exception {

		List<Map.Entry<String,CachedData_InMemory_CommonIF>> cachedDataCommonItemList = new ArrayList<>( cachedDataCommonItemMap.size() );
		for ( Map.Entry<String,CachedData_InMemory_CommonIF> entry : cachedDataCommonItemMap.entrySet() ) {
			cachedDataCommonItemList.add( entry );
		}
		//  Sort by class Name
		Collections.sort( cachedDataCommonItemList, new Comparator<Map.Entry<String,CachedData_InMemory_CommonIF>>() {
			@Override
			public int compare(Entry<String, CachedData_InMemory_CommonIF> o1, Entry<String, CachedData_InMemory_CommonIF> o2) {
				return o1.getKey().compareTo( o2.getKey() );
			} } );
		
		NumberFormat numberFormatStandard = NumberFormat.getInstance();
		StringBuilder cacheSizesSB = new StringBuilder( 10000 );
		cacheSizesSB.append( "List of current Data Cache info " );
		try {
			for ( Map.Entry<String,CachedData_InMemory_CommonIF> entry : cachedDataCommonItemList ) {
				CachedData_InMemory_CommonIF cachedDataCommonIF = entry.getValue();
				Cache_InMemory_CurrentSizeMaxSizeResult cacheCurrentSizeMaxSizeResult = cachedDataCommonIF.getCurrentCacheSizeAndMax();
				cacheSizesSB.append( "\n class: " + entry.getKey()
						+ ", current cache size: " + numberFormatStandard.format( cacheCurrentSizeMaxSizeResult.getCurrentSize() ) 
						+ ", max cache size: " + numberFormatStandard.format( cacheCurrentSizeMaxSizeResult.getMaxSize() ) );
			}
		} catch (Exception e) {
			String msg = "Error writeToLogAllCacheSizes(): ";
			log.error( msg, e );
			throw e;
		}
		String cacheSizes = cacheSizesSB.toString();
		log.warn( cacheSizes );
	}
}
