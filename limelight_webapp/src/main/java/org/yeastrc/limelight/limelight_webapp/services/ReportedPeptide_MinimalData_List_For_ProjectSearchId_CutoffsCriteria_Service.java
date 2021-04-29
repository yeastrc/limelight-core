/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
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
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.Cache_InMemory_CurrentSizeMaxSizeResult;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.CachedData_InMemory_CentralRegistry_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.CachedData_InMemory_CommonIF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.Cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup_IF;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.searcher_utils.DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataIF;
import org.yeastrc.limelight.limelight_webapp.searcher_utils.DefaultCutoffsExactlyMatchAnnTypeDataToSearchData.DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataResult;
import org.yeastrc.limelight.limelight_webapp.searchers.ReportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ReportedPeptide_MinimalData_For_ProjectSearchId_DefaultCutoffsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.ReportedPeptide_MinimalData_List_FromSearcher_Entry;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

/**
 * Returns a minimal set of data for each reported peptide that meets the criteria
 * 
 * Criteria:
 *    Search Id
 *    Cutoffs for Reported Peptide Annotation Type Data
 *    Cutoffs for Best PSM Annotation Type Data at the Reported Peptide level
 *
 * 
 */
@Component
public class ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service 

implements 
ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_ServiceIF, 
CachedData_InMemory_CommonIF, //  Limelight CachedData Manager to support Admin page where can clear all cached data
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 

{

	private static final Logger log = LoggerFactory.getLogger( ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service.class );


	private static final int CACHE_TIMEOUT = 20; // in days

	@Autowired
	private CachedData_InMemory_CentralRegistry_IF cachedData_InMemory_CentralRegistry;
	
	@Autowired Cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup_IF cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup;
	
	@Autowired
	private DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataIF defaultCutoffsExactlyMatchAnnTypeDataToSearchData;
	
	@Autowired
	private ReportedPeptide_MinimalData_For_ProjectSearchId_DefaultCutoffsSearcherIF reportedPeptide_MinimalData_For_ProjectSearchId_DefaultCutoffsSearcher;
	
	@Autowired
	private ReportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcherIF reportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcher;
	
	/////
	
	private volatile SoftReference<LoadingCache<LocalCacheKey, LocalCacheValue>> dbRecordsDataCache_SoftReference = null;
	
	private volatile int cacheMaxSize;
	
	/**
	 * Constructor
	 */
	public ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service() {
		
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
	
	/**
	 * @param searchId
	 * @param searcherCutoffValuesSearchLevel
	 * @param minimumNumberOfPSMsPerReportedPeptide
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<ReportedPeptide_MinimalData_List_FromSearcher_Entry>  getPeptideDataList( 
			int searchId, 
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel,
			int minimumNumberOfPSMsPerReportedPeptide ) throws Exception {
		
		LocalCacheKey localCacheKey = new LocalCacheKey();
		localCacheKey.searchId = searchId;
		localCacheKey.searcherCutoffValuesSearchLevel = searcherCutoffValuesSearchLevel;
		localCacheKey.minimumNumberOfPSMsPerReportedPeptide = minimumNumberOfPSMsPerReportedPeptide;
		
		LoadingCache<LocalCacheKey, LocalCacheValue> dbRecordsDataCache = create_Cache_IfNotExist();
		
		if ( dbRecordsDataCache == null ) {
			String msg = "In getPeptideDataList: dbRecordsDataCache == null ";
			log.error(msg);
			throw new LimelightInternalErrorException(msg);
		}
		
		LocalCacheValue localCacheValue = dbRecordsDataCache.get( localCacheKey );
		
		List<ReportedPeptide_MinimalData_List_FromSearcher_Entry> results = localCacheValue.results;
		
		return results;
	}
	
	//   Following Class method called from Cache Loader Code below

	/**
	 * @param searchId
	 * @param searcherCutoffValuesSearchLevel
	 * @param minimumNumberOfPSMsPerReportedPeptide
	 * @return
	 * @throws SQLException
	 */
	private List<ReportedPeptide_MinimalData_List_FromSearcher_Entry>  getPeptideDataList_FromDB_CalledByCache( 
			int searchId, 
			SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel,
			int minimumNumberOfPSMsPerReportedPeptide  ) throws Exception {
		
		//  Determine if can use PSM count at Default Cutoff
		DefaultCutoffsExactlyMatchAnnTypeDataToSearchDataResult defaultCutoffsExactlyMatchAnnTypeDataToSearchDataResult =
				defaultCutoffsExactlyMatchAnnTypeDataToSearchData
				.defaultCutoffsExactlyMatchAnnTypeDataToSearchData( searchId, searcherCutoffValuesSearchLevel );
		boolean defaultCutoffsExactlyMatchAnnTypeDataToSearchData =
				defaultCutoffsExactlyMatchAnnTypeDataToSearchDataResult.isDefaultCutoffsExactlyMatchAnnTypeDataToSearchData();

		if ( defaultCutoffsExactlyMatchAnnTypeDataToSearchData ) {
			
			return reportedPeptide_MinimalData_For_ProjectSearchId_DefaultCutoffsSearcher.getPeptideDataList( searchId, searcherCutoffValuesSearchLevel, minimumNumberOfPSMsPerReportedPeptide );
			
		} else {
			
			return reportedPeptide_MinimalData_For_ProjectSearchId_CutoffsSearcher.getPeptideDataList( searchId, searcherCutoffValuesSearchLevel, minimumNumberOfPSMsPerReportedPeptide );
		}
		
	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.CachedData_InMemory_CommonIF#clearCacheData()
	 */
	@Override
	public void clearCacheData() throws Exception {
		
		//  Create new Cache
		create_Cache();
		
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
		SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel;
		int minimumNumberOfPSMsPerReportedPeptide;
		
		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + minimumNumberOfPSMsPerReportedPeptide;
			result = prime * result + searchId;
			result = prime * result
					+ ((searcherCutoffValuesSearchLevel == null) ? 0 : searcherCutoffValuesSearchLevel.hashCode());
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
			if (minimumNumberOfPSMsPerReportedPeptide != other.minimumNumberOfPSMsPerReportedPeptide)
				return false;
			if (searchId != other.searchId)
				return false;
			if (searcherCutoffValuesSearchLevel == null) {
				if (other.searcherCutoffValuesSearchLevel != null)
					return false;
			} else if (!searcherCutoffValuesSearchLevel.equals(other.searcherCutoffValuesSearchLevel))
				return false;
			return true;
		}
	}

	/**
	 * classes for holding data in the cache
	 * 
	 * value in the cache
	 */
	private static class LocalCacheValue {
		List<ReportedPeptide_MinimalData_List_FromSearcher_Entry>  results;
		
		int getBytes() {
			
			return 
					results.size() * ( 
							ReportedPeptide_MinimalData_List_FromSearcher_Entry.SIZE_OF_OBJECT_ON_HEAP 
							+ 8  // LIST bytes per reference 
							)
					+ 20; // List object other bytes
		}
	}

	/**
	 * @throws Exception 
	 * 
	 */
	private LoadingCache<LocalCacheKey, LocalCacheValue> create_Cache_IfNotExist() throws Exception {
		
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
	 * @throws Exception 
	 * 
	 */
	private LoadingCache<LocalCacheKey, LocalCacheValue>  create_Cache() throws Exception {

		int cacheTimeout = CACHE_TIMEOUT;
		
		long maximumWeight_InKB = 
				cached_InMemory_MaxMemoryAllowedConfig_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param__OnStartup
				.cachedData_InMemory_Size_Read_ConfigFile_EnvironmentVariable_JVM_DashD_Param_OnStartup()
				.getResponseSizeKB_ReportedPeptide_MinimalData_List_For_ProjectSearchId_CutoffsCriteria_Service();
		
		LoadingCache<LocalCacheKey, LocalCacheValue> dbRecordsDataCache = CacheBuilder.newBuilder()
				.expireAfterAccess( cacheTimeout, TimeUnit.DAYS )
				.maximumWeight( maximumWeight_InKB )
				.weigher( ( LocalCacheKey localCacheKey, LocalCacheValue localCacheValue ) -> {
					//  Return approximate size in KB, rounded up
					return (int) Math.ceil( 
							150 // guess size of localCacheKey
							+ localCacheValue.getBytes()
							/ 1024.0 );
				})
				.build(
						new CacheLoader<LocalCacheKey, LocalCacheValue>() {
							@Override
							public LocalCacheValue load( LocalCacheKey localCacheKey ) throws Exception {

								//   WARNING  cannot return null.  
								//   If would return null, throw LimelightWebappDataNotFoundException and catch at the .get(...)


								int searchId = localCacheKey.searchId; 
								SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel = localCacheKey.searcherCutoffValuesSearchLevel;
								int minimumNumberOfPSMsPerReportedPeptide = localCacheKey.minimumNumberOfPSMsPerReportedPeptide;

								//  value is NOT in cache so get it and return it
								List<ReportedPeptide_MinimalData_List_FromSearcher_Entry>  resultsFromDB = getPeptideDataList_FromDB_CalledByCache( searchId, searcherCutoffValuesSearchLevel, minimumNumberOfPSMsPerReportedPeptide );
								
								//  Create new ArrayList sized to the results
								List<ReportedPeptide_MinimalData_List_FromSearcher_Entry>  results = new ArrayList<>( resultsFromDB.size() + 1 );
								results.addAll( resultsFromDB );
								
								LocalCacheValue localCacheValue = new LocalCacheValue();
								localCacheValue.results = results;
								
								return localCacheValue;
							}
						});
		//			    .build(); // no CacheLoader
		//			cacheDataInitialized = true;
		
		dbRecordsDataCache_SoftReference = new SoftReference<>( dbRecordsDataCache );

		return dbRecordsDataCache;

	}


}
