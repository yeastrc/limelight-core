package org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt;

import java.lang.ref.SoftReference;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_file.CachedDataInFileMgmt_ReadFile.CachedDataInFileMgmt_ReadFile_Parameters;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_file.CachedDataInFileMgmt_ReadFile_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_file.CachedDataInFileMgmt_WriteFile.CachedDataInFileMgmt_WriteFile_Parameters;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_file.CachedDataInFileMgmt_WriteFile_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.Cache_InMemory_CurrentSizeMaxSizeResult;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.CachedData_InMemory_CentralRegistry_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.CachedData_InMemory_CommonIF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.Cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.web_utils.GUNzip_ByteArray_To_ByteArray_IF;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

/**
 * Cache of Webservice Response
 * 
 *    !!!  Currently hard coded to ONLY accept VERSIONED Web Services:  URI ends in '-version-' and ### version number
 * 
 * It is REQUIRED that all Controller Paths that will use this class register first and at Webapp Startup
 */
@Component
public class Cached_WebserviceResponse_Management 

implements 
Cached_WebserviceResponse_Management_IF,
CachedData_InMemory_CommonIF, //  Limelight CachedData Manager to support Admin page where can clear all cached data
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{
	private static final Logger log = LoggerFactory.getLogger( Cached_WebserviceResponse_Management.class );

	private static final int CACHE_TIMEOUT = 20; // in days

	@Autowired
	private GUNzip_ByteArray_To_ByteArray_IF gUNzip_ByteArray_To_ByteArray;
	
	@Autowired
	private CachedData_InMemory_CentralRegistry_IF cachedData_InMemory_CentralRegistry;

	@Autowired Cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup_IF cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup;
	
	@Autowired
	private CachedDataInFileMgmt_ReadFile_IF cachedDataInFileMgmt_ReadFile;
	
	@Autowired
	private CachedDataInFileMgmt_WriteFile_IF cachedDataInFileMgmt_WriteFile;

	
	private volatile SoftReference<Cache<LocalCacheKey, LocalCacheValue>> dataCache_SoftReference = null;
	
	private volatile int cacheMaxSize;
	
	private ConcurrentHashMap<String, Object> registered_ControllerPathForCachedResponse_Map = new ConcurrentHashMap<>();

	/* 
	 * Spring LifeCycle Method
	 * 
	 * (non-Javadoc)
	 * @see org.springframework.beans.factory.InitializingBean#afterPropertiesSet()
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		try {
			create_Cache_IfNotExist();	
	
			if ( dataCache_SoftReference == null ) {
				String msg = "In afterPropertiesSet: after call to create_Cache(): dataCache_SoftReference == null ";
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

	//////////////
	
	/**
	 * Register Controller Path for Cached Response Processing.
	 * 
	 * It is REQUIRED that all Controller Paths that will use this class register first and at Webapp Startup
	 * 
	 * Required that controllerPathForCachedResponse end with '-version-' and a number
	 * 
	 * @param controllerPathForCachedResponse
	 */
	@Override
	public void registerControllerPathForCachedResponse_RequiredToCallAtWebappStartup( String controllerPathForCachedResponse, Object registeringObject ) {
		
		_validate_controllerPathForCachedResponse(controllerPathForCachedResponse);
		
		Object prevValue = registered_ControllerPathForCachedResponse_Map.put( controllerPathForCachedResponse, registeringObject );
		
		if ( prevValue != null ) {
			
			String msg = "Duplicate controllerPathForCachedResponse value passed to registerControllerPathForCachedResponse(...): " + controllerPathForCachedResponse;
			log.error(msg);
			throw new LimelightInternalErrorException(msg);
		}
	}
	
	/**
	 * Require that controllerPathForCachedResponse end with '-version-' and a number
	 * 
	 * @param controllerPathForCachedResponse
	 */
	private void _validate_controllerPathForCachedResponse( String controllerPathForCachedResponse ) {
		
		//  Require that controllerPathForCachedResponse end with '-version-' and a number
		
		int versionLabel_Index = controllerPathForCachedResponse.lastIndexOf( "-version-" );
		if ( versionLabel_Index == -1 ) {
			String msg = "controllerPathForCachedResponse does NOT contain string '-version-'. controllerPathForCachedResponse: " + controllerPathForCachedResponse;
			log.error(msg);
			throw new LimelightInternalErrorException(msg);
		}
		String versionNumber_String = controllerPathForCachedResponse.substring( versionLabel_Index + "-version-".length() );
		try {
			@SuppressWarnings("unused")
			int versionNumber = Integer.parseInt(versionNumber_String);
		} catch ( Exception e ) {
			String msg = "controllerPathForCachedResponse after string '-version-' is NOT a Number. versionNumber_String: '" + versionNumber_String 
					+ "', controllerPathForCachedResponse: " + controllerPathForCachedResponse;
			log.error(msg);
			throw new LimelightInternalErrorException(msg);
		}
	}
	
	/**
	 * @return
	 */
	@Override
	public Set<String> get_registered_ControllerPaths_Copy() {
		
		Set<String> registered_ControllerPaths = new HashSet<>( registered_ControllerPathForCachedResponse_Map.keySet() );
		return registered_ControllerPaths;
	}
	

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF#getCachedResponse(java.lang.String, byte[])
	 */
	@Override
	public byte[] getCachedResponse( boolean accept_GZIP, String controllerPathForCachedResponse, byte[] requestPostBody, Object callingObject ) throws Exception {
		
		{
			Object registeringObject = registered_ControllerPathForCachedResponse_Map.get( controllerPathForCachedResponse );
			if ( registeringObject == null  ) {

				String msg = "controllerPathForCachedResponse passed to getCachedResponse(...) is NOT registered: " + controllerPathForCachedResponse;
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			if ( registeringObject != callingObject ) {

				String msg = "callingObject passed to getCachedResponse(...) is NOT same object used when registerering controllerPathForCachedResponse: " + controllerPathForCachedResponse;
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
		}

		Cache<LocalCacheKey, LocalCacheValue> dataCache = create_Cache_IfNotExist();

		{
			
			//  First Try Retrieve from In Memory Cache with accept_GZIP value
			
			LocalCacheKey localCacheKey = new LocalCacheKey();
			localCacheKey.controllerPathForCachedResponse = controllerPathForCachedResponse;
			localCacheKey.requestBodyBytes = requestPostBody;
			
			LocalCacheValue localCacheValue = dataCache.getIfPresent( localCacheKey );
			
			if ( localCacheValue != null ) {
				
				//  FOUND in Cache so return
				
				if ( accept_GZIP ) {
	
					return localCacheValue.responseBodyBytes;  // EARLY RETURN
				}
				
				// NOT accept_GZIP so Unzip to return 

				byte[] responseBodyBytes_UNZIPPED = gUNzip_ByteArray_To_ByteArray.gUNzip_ByteArray_To_ByteArray(localCacheValue.responseBodyBytes);
				
				//  RETURN UnZipped Data
				
				return responseBodyBytes_UNZIPPED;  // EARY RETURN
			}
		}
		
		//  NOT Found in Cache

		CachedDataInFileMgmt_ReadFile_Parameters parameters = new CachedDataInFileMgmt_ReadFile_Parameters();
		parameters.setControllerPath(controllerPathForCachedResponse);
		parameters.setRequestPostBody( requestPostBody );
		byte[] fromCacheOnFile = cachedDataInFileMgmt_ReadFile.cachedDataInFileMgmt_ReadFile( parameters );

		if ( fromCacheOnFile != null ) {

			//  Put fromCacheOnFile into the in memory cache

			LocalCacheKey localCacheKey = new LocalCacheKey();
			localCacheKey.controllerPathForCachedResponse = controllerPathForCachedResponse;
			localCacheKey.requestBodyBytes = requestPostBody;

			LocalCacheValue localCacheValueToStore = new LocalCacheValue();
			localCacheValueToStore.responseBodyBytes = fromCacheOnFile;

			dataCache.put( localCacheKey, localCacheValueToStore );
			
			if ( accept_GZIP ) {
				
				// Data from file is GZIP so just return it
			
				return fromCacheOnFile;
			}

			// NOT accept_GZIP so Unzip to return 

			byte[] responseBodyBytes_UNZIPPED = gUNzip_ByteArray_To_ByteArray.gUNzip_ByteArray_To_ByteArray(fromCacheOnFile);
			
			//  RETURN UnZipped Data
			
			return responseBodyBytes_UNZIPPED;  // EARY RETURN
		}
		
		//  NOT Found on disk so return null
		
		return null;
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.cached_data_in_webservices_mgmt.Cached_WebserviceResponse_Management_IF#putCachedResponse(java.lang.String, byte[], byte[])
	 */
	@Override
	public void putCachedResponse_GZIPPED( String controllerPathForCachedResponse, byte[] requestPostBody, byte[] responseBodyBytes, Object callingObject ) throws Exception {

		{
			Object registeringObject = registered_ControllerPathForCachedResponse_Map.get( controllerPathForCachedResponse );
			if ( registeringObject == null  ) {

				String msg = "controllerPathForCachedResponse passed to putCachedResponse(...) is NOT registered: " + controllerPathForCachedResponse;
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			if ( registeringObject != callingObject ) {

				String msg = "callingObject passed to putCachedResponse(...) is NOT same object used when registerering controllerPathForCachedResponse: " + controllerPathForCachedResponse;
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
		}

		Cache<LocalCacheKey, LocalCacheValue> dataCache = create_Cache_IfNotExist();

		//  Store Cached Data to In Memory Cache
		
		LocalCacheKey localCacheKey = new LocalCacheKey();
		localCacheKey.controllerPathForCachedResponse = controllerPathForCachedResponse;
		localCacheKey.requestBodyBytes = requestPostBody;
		
		LocalCacheValue localCacheValue = new LocalCacheValue();
		localCacheValue.responseBodyBytes = responseBodyBytes;
		
		dataCache.put( localCacheKey, localCacheValue );
		
		//  Write Cached Data to Disk File for use after webapp restart/re-install
		
		CachedDataInFileMgmt_WriteFile_Parameters cachedDataInFileMgmt_WriteFile_Parameters = new CachedDataInFileMgmt_WriteFile_Parameters();
		cachedDataInFileMgmt_WriteFile_Parameters.setControllerPath( controllerPathForCachedResponse );
		cachedDataInFileMgmt_WriteFile_Parameters.setRequestPostBody( requestPostBody );
		cachedDataInFileMgmt_WriteFile_Parameters.setResponseBodyBytes( responseBodyBytes );
		
		cachedDataInFileMgmt_WriteFile.cachedDataInFileMgmt_WriteFile( cachedDataInFileMgmt_WriteFile_Parameters );
	}
	

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.CachedData_InMemory_CommonIF#clearCacheData()
	 */
	@Override
	public void clearCacheData() throws Exception {
		
		//  Delete existing cache
		dataCache_SoftReference = null;
		
		//  Create new Cache
		create_Cache_IfNotExist();
		
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
		if ( dataCache_SoftReference != null ) {

			Cache<LocalCacheKey, LocalCacheValue> dataCache = dataCache_SoftReference.get();

			if ( dataCache != null ) {
				
				result.setCurrentSize( dataCache.size() );
			}
			
			result.setMaxSize( cacheMaxSize );
		}
		return result;
	}
	
	////
	
	//  Internal Cache classes
	
	private static class LocalCacheKey {
		
		String controllerPathForCachedResponse;
		byte[] requestBodyBytes;
		
		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result
					+ ((controllerPathForCachedResponse == null) ? 0 : controllerPathForCachedResponse.hashCode());
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
			if (controllerPathForCachedResponse == null) {
				if (other.controllerPathForCachedResponse != null)
					return false;
			} else if (!controllerPathForCachedResponse.equals(other.controllerPathForCachedResponse))
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
	 * @throws Exception 
	 * 
	 */
	private Cache<LocalCacheKey, LocalCacheValue> create_Cache_IfNotExist() throws Exception {
		
		if ( dataCache_SoftReference == null ) {
			
			//  NO Cache
			
			return create_Cache();
		}
		
		Cache<LocalCacheKey, LocalCacheValue> dataCache = dataCache_SoftReference.get();

		if ( dataCache != null ) {
			
			return dataCache;
		}

		//  NO Cache
		
		return create_Cache();
	}

	/**
	 * @throws Exception 
	 * 
	 */
	private synchronized Cache<LocalCacheKey, LocalCacheValue> create_Cache() throws Exception {
				
		int cacheTimeout = CACHE_TIMEOUT;
		
		long maximumWeight_InKB = 
				cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup
				.cachedData_InMemory_Size_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup()
				.getResponseSizeKB_Cached_WebserviceResponse_Management();

		Cache<LocalCacheKey, LocalCacheValue> dataCache = CacheBuilder.newBuilder()
				.expireAfterAccess( cacheTimeout, TimeUnit.DAYS )
				.maximumWeight( maximumWeight_InKB )
				.weigher( ( LocalCacheKey localCacheKey, LocalCacheValue localCacheValue ) -> {
					//  Return approximate size in KB, rounded up
					return 
							(int) Math.ceil( 
									( (localCacheKey.controllerPathForCachedResponse.length() * 2 ) // times 2 since 16 bit characters
											+ localCacheKey.requestBodyBytes.length
											+ localCacheValue.responseBodyBytes.length
											+ 60 )  //  objects overhead
									/ 1024.0 );
				})
				.build(); // no CacheLoader
		
		dataCache_SoftReference = new SoftReference<>( dataCache );
		
		return dataCache;
	}

}
