package org.yeastrc.limelight.limelight_webapp.services;

import java.lang.ref.SoftReference;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.Cache_InMemory_CurrentSizeMaxSizeResult;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.CachedData_InMemory_CentralRegistry_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.CachedData_InMemory_CommonIF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightWebappDataNotFoundException;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

/**
 * 
 *
 */
@Component
public class SearchFlagsForSingleSearchId_SearchResult_Cached 

implements 
InitializingBean, // InitializingBean is Spring Interface for triggering running method afterPropertiesSet()
CachedData_InMemory_CommonIF //  Limelight CachedData Manager to support Admin page where can clear all cached data
, SearchFlagsForSingleSearchId_SearchResult_Cached_IF

{

	private static final Logger log = LoggerFactory.getLogger( SearchFlagsForSingleSearchId_SearchResult_Cached.class );
	

	/**
	 * Approx Max Heap used for Cache
	 */
	public static final int MAX_HEAP_MEMORY_USED_MB_APPROX = 1;
	

	private static final int CACHE_MAX_SIZE_FULL_SIZE = 200;

	private static final int CACHE_TIMEOUT_FULL_SIZE = 20; // in days


	@Autowired
	private CachedData_InMemory_CentralRegistry_IF cachedData_InMemory_CentralRegistry;
	
	@Autowired
	private SearchFlagsForSearchIdSearcherIF searchFlagsForSearchIdSearcher;

	private volatile SoftReference<LoadingCache<LocalCacheKey, LocalCacheValue>> dbRecordsDataCache_SoftReference = null;
	
	private volatile int cacheMaxSize;

	/**
	 * Constructor
	 */
	public SearchFlagsForSingleSearchId_SearchResult_Cached() {
		
	}
	

	/**
	 * Spring LifeCycle Method
	 * @throws Exception
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		
		try {
	
			create_Cache();
	
			if ( dbRecordsDataCache_SoftReference == null ) {
				String msg = "In afterPropertiesSet: after call to create_Cache(): dbRecordsDataCache_SoftReference == null ";
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			
			if ( cachedData_InMemory_CentralRegistry == null ) {
				String msg = "In afterPropertiesSet: cachedData_InMemory_CentralRegistry == null ";
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			
			cachedData_InMemory_CentralRegistry.register( this );
			
		} catch (Exception e) {
			String msg = "In afterPropertiesSet(): Exception in processing";
			log.error(msg);
			throw e;
		}
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF#get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(int)
	 */
	@Override
	public SearchFlagsForSearchIdSearcher_Result_Item get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(
			
			int searchId ) throws Exception {

		LocalCacheKey localCacheKey = new LocalCacheKey();
		localCacheKey.searchId = searchId;
		
		LoadingCache<LocalCacheKey, LocalCacheValue> dbRecordsDataCache = create_Cache_IfNotExist();
		
		if ( dbRecordsDataCache == null ) {
			String msg = "In get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId: dbRecordsDataCache == null ";
			log.error(msg);
			throw new LimelightInternalErrorException(msg);
		}
		
		LocalCacheValue localCacheValue = dbRecordsDataCache.get( localCacheKey );
		
		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = localCacheValue.searchFlagsForSearchIdSearcher_Result_Item;
		
		return searchFlagsForSearchIdSearcher_Result_Item;
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.CachedData_InMemory_CommonIF#clearCacheData()
	 */
	@Override
	public void clearCacheData() throws Exception {
		
		//  Create new Cache
		create_Cache();
		
//		if ( dbRecordsDataCache == null ) {
//			String msg = "In clearCacheData: dbRecordsDataCache == null ";
//			log.error(msg);
//			throw new LimelightInternalErrorException(msg);
//		}
//		
//		dbRecordsDataCache.invalidateAll();
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.CachedData_InMemory_CommonIF#getCurrentCacheSizeAndMax()
	 */
	@Override
	public Cache_InMemory_CurrentSizeMaxSizeResult getCurrentCacheSizeAndMax() throws Exception {

		LoadingCache<LocalCacheKey, LocalCacheValue> dbRecordsDataCache = create_Cache_IfNotExist();
		
		Cache_InMemory_CurrentSizeMaxSizeResult result = new Cache_InMemory_CurrentSizeMaxSizeResult();
		if ( dbRecordsDataCache != null ) {
			result.setCurrentSize( dbRecordsDataCache.size() );
			result.setMaxSize( cacheMaxSize );
		}
		return result;
	}
	
	

	/**
	 * classes for holding data in the cache
	 * 
	 * key to the cache
	 *
	 */
	private static class LocalCacheKey {
		
		int searchId; 
	}

	/**
	 * classes for holding data in the cache
	 * 
	 * value in the cache
	 */
	private static class LocalCacheValue {
		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item;
	}

	/**
	 * 
	 */
	private LoadingCache<LocalCacheKey, LocalCacheValue> create_Cache_IfNotExist() {
		
		if ( dbRecordsDataCache_SoftReference == null ) {
			
			//  NO Cache
			
			return create_Cache();
		}
		
		LoadingCache<LocalCacheKey, LocalCacheValue> dataCache = dbRecordsDataCache_SoftReference.get();

		if ( dataCache != null ) {
			
			return dataCache;
		}

		//  NO Cache
		
		return create_Cache();
	}

	/**
	 * 
	 */
	private LoadingCache<LocalCacheKey, LocalCacheValue>  create_Cache() {
		
		int cacheTimeout = CACHE_TIMEOUT_FULL_SIZE;
		cacheMaxSize = CACHE_MAX_SIZE_FULL_SIZE;
	
		LoadingCache<LocalCacheKey, LocalCacheValue> dbRecordsDataCache = CacheBuilder.newBuilder()
				.expireAfterAccess( cacheTimeout, TimeUnit.DAYS )
				.maximumSize( cacheMaxSize )
				.build(
						new CacheLoader<LocalCacheKey, LocalCacheValue>() {
							@Override
							public LocalCacheValue load( LocalCacheKey localCacheKey ) throws Exception {

								//   WARNING  cannot return null.  
								//   If would return null, throw LimelightWebappDataNotFoundException and catch at the .get(...)


								int searchId = localCacheKey.searchId; 

								//  value is NOT in cache so get it and return it
								List<Integer> searchIds = new ArrayList<>(1);
					    		searchIds.add(searchId);
					    		
					    		SearchFlagsForSearchIdSearcher_Result result = searchFlagsForSearchIdSearcher.getSearchFlags_ForSearchIds(searchIds);
					    		
					    		if ( result.getResultItems().isEmpty() ) {
					    			String msg = "No Search Flags for searchId: " + searchId;
									log.error( msg );
					    			throw new LimelightWebappDataNotFoundException(msg);
					    		}
					    		
					    		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = result.getResultItems().get(0);
					    		
					    		if ( searchFlagsForSearchIdSearcher_Result_Item.getSearchId() != searchId ) {
					    			String msg = "No Search Flags for searchId: " + searchId;
									log.error( msg );
					    			throw new LimelightWebappDataNotFoundException(msg);
					    		}
					    		
								LocalCacheValue localCacheValue = new LocalCacheValue();
								localCacheValue.searchFlagsForSearchIdSearcher_Result_Item = searchFlagsForSearchIdSearcher_Result_Item;
								
								return localCacheValue;
							}
						});
		//			    .build(); // no CacheLoader
		//			cacheDataInitialized = true;
		

		dbRecordsDataCache_SoftReference = new SoftReference<>( dbRecordsDataCache );
		
		return dbRecordsDataCache;
	}

}
