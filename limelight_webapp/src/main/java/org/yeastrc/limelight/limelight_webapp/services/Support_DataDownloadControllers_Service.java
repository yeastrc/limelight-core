/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_webapp.services;

import java.lang.ref.SoftReference;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.Cache_InMemory_CurrentSizeMaxSizeResult;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.web_utils.GenerateRandomStringForCodeIF;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

/**
 * 
 * 
 * 
 *
 */
@Component
public class Support_DataDownloadControllers_Service

implements
Support_DataDownloadControllers_Service_IF,
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 
{

	private static final Logger log = LoggerFactory.getLogger( Support_DataDownloadControllers_Service.class );

	private static final int CACHE_TIMEOUT = 1; // in days
	
	public enum DownloadStatus_DataDownloadControllers_Enum { ABOUT_TO_SUBMIT, IN_PROGRESS, SUCCESS, FAIL }

	@Autowired
	private GenerateRandomStringForCodeIF generateRandomStringForCode;


	
	private volatile SoftReference<Cache<LocalCacheKey, LocalCacheValue>> dataCache_SoftReference = null;
	
	private volatile int cacheMaxSize;

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
			
		} catch (Exception e) {
			String msg = "In afterPropertiesSet(): Exception in processing";
			log.error(msg);
			throw e;
		}
	}
	
	/**
	 * 
	 * @return
	 * @throws Exception
	 */
	@Override
	public String getNewDownload_Identifier_MarkAs_AboutToSubmit() throws Exception {
		try {
			String download_IdentifierString = null;

			boolean download_IdentifierString_NOT_AlreadyInCache = false;
			
			final int _RETRY_COUNT_MAX = 10000;
			
			int retryCount = 0;
			
			while ( ( ! download_IdentifierString_NOT_AlreadyInCache ) && retryCount <= _RETRY_COUNT_MAX ) {
				
				download_IdentifierString = generateRandomStringForCode.generateRandomStringForCode();

				LocalCacheValue localCacheValue = this.getCachedResponse( download_IdentifierString );
				
				if ( localCacheValue == null ) {
					download_IdentifierString_NOT_AlreadyInCache = true;
					
					break; // Exit loop
				}
				
				retryCount++;
			}
			
			if ( ! download_IdentifierString_NOT_AlreadyInCache ) {
				String msg = "Failed to generate a UNIQUE download_IdentifierString after " + _RETRY_COUNT_MAX + " tries.";
				log.error(msg);
				throw new LimelightInternalErrorException(msg);
			}
			
			this.putCachedResponse(download_IdentifierString, DownloadStatus_DataDownloadControllers_Enum.ABOUT_TO_SUBMIT );
			
			return download_IdentifierString;

		} catch (Exception e) {
			log.error( "getNewDownload_Identifier_MarkAs_AboutToSubmit(): Error", e );
			throw e;
		}
	}

	/**
	 * 
	 * @param download_IdentifierString
	 * @param downloadStatus_DataDownloadControllers_Enum
	 * @throws Exception
	 */
	@Override
	public void updateDownload_Identifier_Status( String download_IdentifierString, DownloadStatus_DataDownloadControllers_Enum downloadStatus_DataDownloadControllers_Enum ) throws Exception {
		try {
			if ( StringUtils.isEmpty( download_IdentifierString ) ) {
				return; // EARLY RETURN
			}
			
			LocalCacheValue localCacheValue = this.getCachedResponse( download_IdentifierString );
			
			if ( localCacheValue != null ) {
				
				localCacheValue.downloadStatus_DataDownloadControllers_Enum = downloadStatus_DataDownloadControllers_Enum;
			} else {

				this.putCachedResponse(download_IdentifierString, DownloadStatus_DataDownloadControllers_Enum.ABOUT_TO_SUBMIT );
			}

		} catch (Exception e) {
			log.error( "updateDownload_Identifier_Status(): Error", e );
			throw e;
		}
	}

	/**
	 * 
	 * @param download_IdentifierString
	 * @return null if download_IdentifierString not found
	 * @throws Exception
	 */
	@Override
	public DownloadStatus_DataDownloadControllers_Enum getDownload_Identifier_Status( String download_IdentifierString ) throws Exception {
		try {
			LocalCacheValue localCacheValue = this.getCachedResponse( download_IdentifierString );
			
			if ( localCacheValue != null ) {
				
				return localCacheValue.downloadStatus_DataDownloadControllers_Enum;
			}
			
			return null;

		} catch (Exception e) {
			log.error( "updateDownload_Identifier_Status(): Error", e );
			throw e;
		}
	}

	/**
	 * 
	 * @param download_IdentifierString
	 * @return null if download_IdentifierString not found
	 * @throws Exception
	 */
	@Override
	public void removeDownload_Identifier( String download_IdentifierString ) throws Exception {
		try {
			this.deleteCachedResponse( download_IdentifierString );
			
		} catch (Exception e) {
			log.error( "removeDownload_Identifier(): Error", e );
			throw e;
		}
	}

	/**
	 * 
	 * @return
	 * @throws Exception
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

	/**
	 * 
	 * @throws Exception
	 */
	@Override
	public void clearCacheData() throws Exception {
		
		//  Delete existing cache
		dataCache_SoftReference = null;
		
		//  Create new Cache
		create_Cache_IfNotExist();
	}


	//////////////
	
	private LocalCacheValue getCachedResponse( String download_IdentifierString ) throws Exception {
		
		Cache<LocalCacheKey, LocalCacheValue> dataCache = create_Cache_IfNotExist();

		{
			
			//  First Try Retrieve from In Memory Cache with accept_GZIP value
			
			LocalCacheKey localCacheKey = new LocalCacheKey();
			localCacheKey.download_IdentifierString = download_IdentifierString;
			
			LocalCacheValue localCacheValue = dataCache.getIfPresent( localCacheKey );
			
			if ( localCacheValue != null ) {
				
				//  FOUND in Cache so return
	
				return localCacheValue;  // EARLY RETURN
			}
		}
		
		//  NOT Found so return null
		
		return null;
	}
	
	private void putCachedResponse( String download_IdentifierString, DownloadStatus_DataDownloadControllers_Enum downloadStatus_DataDownloadControllers_Enum ) throws Exception {

		Cache<LocalCacheKey, LocalCacheValue> dataCache = create_Cache_IfNotExist();

		//  Store Cached Data to In Memory Cache
		
		LocalCacheKey localCacheKey = new LocalCacheKey();
		localCacheKey.download_IdentifierString = download_IdentifierString;
		
		LocalCacheValue localCacheValue = new LocalCacheValue();
		localCacheValue.downloadStatus_DataDownloadControllers_Enum = downloadStatus_DataDownloadControllers_Enum;
		
		dataCache.put( localCacheKey, localCacheValue );
	}
	

	private void deleteCachedResponse( String download_IdentifierString ) throws Exception {

		Cache<LocalCacheKey, LocalCacheValue> dataCache = create_Cache_IfNotExist();

		//  Remove Cached Data from In Memory Cache
		
		LocalCacheKey localCacheKey = new LocalCacheKey();
		localCacheKey.download_IdentifierString = download_IdentifierString;
		
		dataCache.invalidate( localCacheKey );
	}
	
	
	////
	
	//  Internal Cache classes
	
	private static class LocalCacheKey {
		
		String download_IdentifierString;

		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + ((download_IdentifierString == null) ? 0 : download_IdentifierString.hashCode());
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
			if (download_IdentifierString == null) {
				if (other.download_IdentifierString != null)
					return false;
			} else if (!download_IdentifierString.equals(other.download_IdentifierString))
				return false;
			return true;
		}
		
	}
	private static class LocalCacheValue {
		
		volatile DownloadStatus_DataDownloadControllers_Enum downloadStatus_DataDownloadControllers_Enum ;
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
		
		long maximumWeight_InKB = 10000;

		Cache<LocalCacheKey, LocalCacheValue> dataCache = CacheBuilder.newBuilder()
				.expireAfterAccess( cacheTimeout, TimeUnit.DAYS )
				.maximumWeight( maximumWeight_InKB )
				.weigher( ( LocalCacheKey localCacheKey, LocalCacheValue localCacheValue ) -> {
					//  Return approximate size in KB, rounded up
					return 
							(int) Math.ceil( 
									( (localCacheKey.download_IdentifierString.length() * 2 ) // times 2 since 16 bit characters
											+ 20 // Arbitrary for  localCacheValue
											+ 60 )  //  objects overhead
									/ 1024.0 );
				})
				.build(); // no CacheLoader
		
		dataCache_SoftReference = new SoftReference<>( dataCache );
		
		return dataCache;
	}


}
