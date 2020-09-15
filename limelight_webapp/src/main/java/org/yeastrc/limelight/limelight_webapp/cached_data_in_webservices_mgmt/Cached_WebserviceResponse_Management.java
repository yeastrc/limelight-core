package org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt;

import java.util.Arrays;
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
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

/**
 * 
 *
 */
@Component
public class Cached_WebserviceResponse_Management 

implements 
Cached_WebserviceResponse_Management_IF,
CachedData_InMemory_CommonIF, //  Limelight CachedData Manager to support Admin page where can clear all cached data
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
	private static final Logger log = LoggerFactory.getLogger( Cached_WebserviceResponse_Management.class );

	private static final int CACHE_MAX_SIZE_FULL_SIZE = 4000;

//	private static final int CACHE_MAX_SIZE_FULL_SIZE = 8000;
	private static final int CACHE_MAX_SIZE_SMALL_FEW = 500;

	private static final int CACHE_TIMEOUT_FULL_SIZE = 20; // in days
	private static final int CACHE_TIMEOUT_SMALL = 20; // in days

	
	@Autowired
	private CachedData_InMemory_CentralRegistry_IF cachedData_InMemory_CentralRegistry;

	
	private volatile Cache<LocalCacheKey, LocalCacheValue> dataCache = null;
	
	private volatile int cacheMaxSize;
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF#getCachedResponse(java.lang.String, byte[])
	 */
	@Override
	public byte[] getCachedResponse( String controllerPath, byte[] requestPostBody ) {
		
		LocalCacheKey localCacheKey = new LocalCacheKey();
		localCacheKey.controllerPath = controllerPath;
		localCacheKey.requestBodyBytes = requestPostBody;
		
		LocalCacheValue localCacheValue = dataCache.getIfPresent( localCacheKey );
		
		if ( localCacheValue == null ) {
			return null;
		}
		
		return localCacheValue.responseBodyBytes;
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF#putCachedResponse(java.lang.String, byte[], byte[])
	 */
	@Override
	public void putCachedResponse( String controllerPath, byte[] requestPostBody, byte[] responseBodyBytes ) {
		
		LocalCacheKey localCacheKey = new LocalCacheKey();
		localCacheKey.controllerPath = controllerPath;
		localCacheKey.requestBodyBytes = requestPostBody;
		
		LocalCacheValue localCacheValue = new LocalCacheValue();
		localCacheValue.responseBodyBytes = responseBodyBytes;
		
		dataCache.put( localCacheKey, localCacheValue );
	}
	

	/* 
	 * Spring LifeCycle Method
	 * 
	 * (non-Javadoc)
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		try {
			create_Cache();	
	
			if ( dataCache == null ) {
				String msg = "In afterPropertiesSet: after call to create_Cache(): dbRecordsDataCache == null ";
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

		Cache_InMemory_CurrentSizeMaxSizeResult result = new Cache_InMemory_CurrentSizeMaxSizeResult();
		if ( dataCache != null ) {
			result.setCurrentSize( dataCache.size() );
			result.setMaxSize( cacheMaxSize );
		}
		return result;
	}
	
	////
	
	//  Internal Cache classes
	
	private static class LocalCacheKey {
		
		String controllerPath;
		byte[] requestBodyBytes;
		
		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + ((controllerPath == null) ? 0 : controllerPath.hashCode());
			result = prime * result + Arrays.hashCode(requestBodyBytes);
			return result;
		}
		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			LocalCacheKey other = (LocalCacheKey) obj;
			if (controllerPath == null) {
				if (other.controllerPath != null)
					return false;
			} else if (!controllerPath.equals(other.controllerPath))
				return false;
			if (!Arrays.equals(requestBodyBytes, other.requestBodyBytes))
				return false;
			return true;
		}
		
	}
	private static class LocalCacheValue {
		
		byte[] responseBodyBytes;
	}

	/**
	 * 
	 */
	private void create_Cache() {
		int cacheTimeout = CACHE_TIMEOUT_FULL_SIZE;
		cacheMaxSize = CACHE_MAX_SIZE_FULL_SIZE;
		//			if ( cachedDataSizeOptions == CachedDataSizeOptions.HALF ) {
		//				cacheMaxSize = cacheMaxSize / 2;
		//			} else if ( cachedDataSizeOptions == CachedDataSizeOptions.SMALL
		//					|| cachedDataSizeOptions == CachedDataSizeOptions.FEW ) {
		//				cacheMaxSize = GetAnnotationTypeData.CACHE_MAX_SIZE_SMALL_FEW;
		//				cacheTimeout = CACHE_TIMEOUT_SMALL;
		//			}

		dataCache = CacheBuilder.newBuilder()
				.expireAfterAccess( cacheTimeout, TimeUnit.DAYS )
				.maximumSize( cacheMaxSize )
				.build(); // no CacheLoader
	}

}
