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
package org.yeastrc.limelight.limelight_webapp.searchers;

import java.lang.ref.SoftReference;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.constants.SearcherGeneralConstants;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesAnnotationLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.Cache_InMemory_CurrentSizeMaxSizeResult;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.CachedData_InMemory_CentralRegistry_IF;
import org.yeastrc.limelight.limelight_webapp.cached_data_in_memory_mgmt.CachedData_InMemory_CommonIF;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFlagsForSearchIdSearcher.SearchFlagsForSearchIdSearcher_Result_Item;
import org.yeastrc.limelight.limelight_webapp.services.SearchFlagsForSingleSearchId_SearchResult_Cached_IF;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

/**
 * 
 *
 */
@Component
public class PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher extends Limelight_JDBC_Base 

implements 
PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcherIF,
CachedData_InMemory_CommonIF, //  Limelight CachedData Manager to support Admin page where can clear all cached data
InitializingBean // InitializingBean is Spring Interface for triggering running method afterPropertiesSet() 


{

	private static final Logger log = LoggerFactory.getLogger( PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffsSearcher.class );
	
	/**
	 * Used In Call to Internal Method
	 *
	 */
	private enum Get_PsmCount_PsmIds {
		PSM_COUNT,
		PSM_IDS
	}

	//  CACHE of PSM Count
	
	/**
	 * Approx Max Heap used for Cache
	 */
	public static final int MAX_HEAP_MEMORY_USED_MB_APPROX = 1;
	

	private static final int CACHE_MAX_SIZE_FULL_SIZE = 8000;

	private static final int CACHE_TIMEOUT_FULL_SIZE = 20; // in days


//	private static final AtomicLong cacheGetCount = new AtomicLong();
//	private static final AtomicLong cacheDBRetrievalCount = new AtomicLong();
	
//	private static volatile int prevDayOfYear = -1;

//	private static boolean debugLogLevelEnabled = false;

	@Autowired
	private SearchFlagsForSingleSearchId_SearchResult_Cached_IF searchFlagsForSingleSearchId_SearchResult_Cached;

	@Autowired
	private CachedData_InMemory_CentralRegistry_IF cachedData_InMemory_CentralRegistry;


	private volatile SoftReference<LoadingCache<LocalCacheKey, LocalCacheValue>> dbRecordsDataCache_SoftReference = null;
	
	private volatile int cacheMaxSize;

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
	
	
	////////////////////////////////////
	////////////////////////////////////
	
	//    Main Access Methods
	
	
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.PsmIdsForSearchIdReportedPeptideIdCutoffsSearcherIF#getPsmIdsForSearchIdReportedPeptideIdCutoffs(int, int, org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel)
	 */
	@Override
	public List<Long> getPsmIdsForSearchIdReportedPeptideIdCutoffs(
			
			int reportedPeptideId, int searchId, SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws Exception {
		
		Get_PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffs_INTERNAL__Result result =
				get_PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffs_INTERNAL( Get_PsmCount_PsmIds.PSM_IDS, reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );
		
		return result.psmIds;
	}

	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.PsmCountForSearchIdReportedPeptideIdSearcherIF#getPsmCountForSearchIdReportedPeptideId(int, int, org.yeastrc.limelight.limelight_webapp.searcher_psm_peptide_protein_cutoff_objects_utils.SearcherCutoffValuesSearchLevel)
	 */
	@Override
	public int getPsmCountForSearchIdReportedPeptideIdCutoffs(
			
			int reportedPeptideId, int searchId, SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws Exception {

		LocalCacheKey localCacheKey = new LocalCacheKey();
		localCacheKey.reportedPeptideId = reportedPeptideId;
		localCacheKey.searchId = searchId;
		localCacheKey.searcherCutoffValuesSearchLevel = searcherCutoffValuesSearchLevel;
		
		LoadingCache<LocalCacheKey, LocalCacheValue> dbRecordsDataCache = create_Cache_IfNotExist();
		
		if ( dbRecordsDataCache == null ) {
			String msg = "In getPeptideDataList: dbRecordsDataCache == null ";
			log.error(msg);
			throw new LimelightInternalErrorException(msg);
		}
		
		LocalCacheValue localCacheValue = dbRecordsDataCache.get( localCacheKey );
		
		int psmCountResult = localCacheValue.psmCountResult;
		
		return psmCountResult;
	}
	
	

	////////////////////////////////////
	////////////////////////////////////
	
	//    Internal Method
	
	private static class Get_PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffs_INTERNAL__Result {
		List<Long> psmIds;
		int psmCount;
	}
	
	
	/**
	 * @param get_PsmCount_PsmIds
	 * @param reportedPeptideId
	 * @param searchId
	 * @param searcherCutoffValuesSearchLevel
	 * @return
	 * @throws Exception
	 */
	private Get_PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffs_INTERNAL__Result get_PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffs_INTERNAL(
			
			Get_PsmCount_PsmIds get_PsmCount_PsmIds,
			int reportedPeptideId, int searchId, SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws Exception {
		
		List<Long> psmIds = new ArrayList<>();
		int psmCount = 0;

		SearchFlagsForSearchIdSearcher_Result_Item searchFlagsForSearchIdSearcher_Result_Item = searchFlagsForSingleSearchId_SearchResult_Cached.get_SearchFlagsForSearchIdSearcher_Result_Item_For_SearchId(searchId);
		
		//  Create reversed version of list of PSM Filterable Annotations Filter Values
		List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesList_Reversed = 
				new ArrayList<>( searcherCutoffValuesSearchLevel.getPsmPerAnnotationCutoffsList() );
		
		Collections.reverse(psmCutoffValuesList_Reversed);

		//  Create reversed version of list of PSM Modification Position WORST Filterable Annotations Filter Values
		List<SearcherCutoffValuesAnnotationLevel> psm_ModificationPosition_WORST_CutoffValuesList_Reversed = 
				new ArrayList<>( searcherCutoffValuesSearchLevel.getModificationPositionPerAnnotationCutoffsList() );
		
		Collections.reverse(psm_ModificationPosition_WORST_CutoffValuesList_Reversed);
		
		//  Generate nested sub selects for each annotation type filtering on,
		//     with a innermost subselect of PSM Ids for search id / reported peptide id
				
		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		if ( psmCutoffValuesList_Reversed.isEmpty() && psm_ModificationPosition_WORST_CutoffValuesList_Reversed.isEmpty() ) {
			
			sqlSB.append( "SELECT " );
			
			if ( get_PsmCount_PsmIds == Get_PsmCount_PsmIds.PSM_COUNT ) {
				
				sqlSB.append( " COUNT( id ) AS count " );
				
			} else {
				
				sqlSB.append(  " id AS psm_id " );	
			}
			
			sqlSB.append(  " FROM psm_tbl WHERE search_id = ? AND reported_peptide_id = ? " ); 

			// Include  records where is_independent_decoy = 'true'
			if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsDecoy_True() ) {
				// Exclude  records where is_decoy = 'true'
				sqlSB.append( " AND is_decoy != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE + " " );
			}

		} else {
			
			sqlSB.append( " SELECT " );
			
			if ( get_PsmCount_PsmIds == Get_PsmCount_PsmIds.PSM_COUNT ) {
				sqlSB.append( " COUNT( " );	
			}
			sqlSB.append(  " psm_id " );
			if ( get_PsmCount_PsmIds == Get_PsmCount_PsmIds.PSM_COUNT ) {
				sqlSB.append( " ) AS count " );	
			}
			sqlSB.append(  " FROM  " ); 

			//  generate sub-selects on 'PSM Modification Position WORST Filterable Annotation Values' from outer most to inner most 
	
			for ( int counter = 0; counter < psm_ModificationPosition_WORST_CutoffValuesList_Reversed.size(); counter++ ) {

				sqlSB.append( " ( SELECT psm_mod_pos_worst_filterable_annotation_lookup_tbl.psm_id FROM psm_mod_pos_worst_filterable_annotation_lookup_tbl INNER JOIN " );
			}
			
			//  generate sub-selects on 'PSM Filterable Annotation Values' from outer most to inner most 
	
			for ( int counter = 0; counter < psmCutoffValuesList_Reversed.size(); counter++ ) {

				sqlSB.append( " ( SELECT psm_filterable_annotation_tbl.psm_id FROM psm_filterable_annotation_tbl INNER JOIN " );
			}
			
			//  Add innermost subselect on psm_tbl to get psm ids

			sqlSB.append( " ( SELECT id AS psm_id FROM psm_tbl WHERE search_id = ? AND reported_peptide_id = ? " );
			
			// Include  records where is_independent_decoy = 'true'
			
			if ( searchFlagsForSearchIdSearcher_Result_Item.isAnyPsmHas_IsDecoy_True() ) {
				// Exclude  records where is_decoy = 'true'
				sqlSB.append( " AND is_decoy != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			}

			sqlSB.append( " ) " );
			
			//  Close sub-selects on 'PSM Filterable Annotation Values' from inner most to outer most 
	
			for ( SearcherCutoffValuesAnnotationLevel entry : psmCutoffValuesList_Reversed ) {

				sqlSB.append( " as psm_ids ON psm_filterable_annotation_tbl.psm_id = psm_ids.psm_id " );
				sqlSB.append( " WHERE annotation_type_id = ? AND " );
				sqlSB.append( " value_double " );
				if ( entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO() == null ) {
					String msg = "ERROR: Annotation type data must contain Filterable DTO data.  Annotation type id: " + entry.getAnnotationTypeDTO().getId();
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
				if ( entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
					sqlSB.append( SearcherGeneralConstants.SQL_END_BIGGER_VALUE_BETTER );
				} else if ( entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.BELOW ) {
					sqlSB.append( SearcherGeneralConstants.SQL_END_SMALLER_VALUE_BETTER );
				} else {
					String msg = "ERROR: entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() is unknown value: "
							+ entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum()
							+ ".  Annotation type id: " + entry.getAnnotationTypeDTO().getId();
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
				sqlSB.append( " ? )  " );
			}
			
			//  Close sub-selects on 'PSM Modification Position WORST Filterable Annotation Values' from inner most to outer most 
	
			for ( SearcherCutoffValuesAnnotationLevel entry : psm_ModificationPosition_WORST_CutoffValuesList_Reversed ) {

				sqlSB.append( " as psm_ids ON psm_mod_pos_worst_filterable_annotation_lookup_tbl.psm_id = psm_ids.psm_id " );
				sqlSB.append( " WHERE annotation_type_id = ? AND " );
				sqlSB.append( " worst_value_double " );
				if ( entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO() == null ) {
					String msg = "ERROR: Annotation type data must contain Filterable DTO data.  Annotation type id: " + entry.getAnnotationTypeDTO().getId();
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
				if ( entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
					sqlSB.append( SearcherGeneralConstants.SQL_END_BIGGER_VALUE_BETTER );
				} else if ( entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.BELOW ) {
					sqlSB.append( SearcherGeneralConstants.SQL_END_SMALLER_VALUE_BETTER );
				} else {
					String msg = "ERROR: entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() is unknown value: "
							+ entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum()
							+ ".  Annotation type id: " + entry.getAnnotationTypeDTO().getId();
					log.error( msg );
					throw new LimelightInternalErrorException(msg);
				}
				sqlSB.append( " ? )  " );
			}
			
			sqlSB.append( "  as psm_ids " );
		}
		
		String sql = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			int counter = 0;
			if ( psmCutoffValuesList_Reversed.isEmpty() ) {
				//  psm_tbl fields
				counter++;
				preparedStatement.setInt( counter, searchId );
				counter++;
				preparedStatement.setInt( counter, reportedPeptideId );
			} else {
				//  psm_tbl fields
				counter++;
				preparedStatement.setInt( counter, searchId );
				counter++;
				preparedStatement.setInt( counter, reportedPeptideId );
				
				//  Close sub-selects on 'PSM Filterable Annotation Values' from inner most to outer most 
				for ( SearcherCutoffValuesAnnotationLevel entry : psmCutoffValuesList_Reversed ) {
					counter++;
					preparedStatement.setInt( counter, entry.getAnnotationTypeDTO().getId() );
					counter++;
					preparedStatement.setDouble( counter, entry.getAnnotationCutoffValue() );
				}

				//  Close sub-selects on 'PSM Modification Position WORST Filterable Annotation Values' from inner most to outer most 
		
				for ( SearcherCutoffValuesAnnotationLevel entry : psm_ModificationPosition_WORST_CutoffValuesList_Reversed ) {

					counter++;
					preparedStatement.setInt( counter, entry.getAnnotationTypeDTO().getId() );
					counter++;
					preparedStatement.setDouble( counter, entry.getAnnotationCutoffValue() );
				}
			}
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				
				if ( get_PsmCount_PsmIds == Get_PsmCount_PsmIds.PSM_COUNT ) {
					if( rs.next() ) {	
						psmCount = rs.getInt( "count" );
					}
				} else {
					while( rs.next() ) {

						psmIds.add( rs.getLong( "psm_id" ) );
					}
				}
			}
		} catch ( RuntimeException e ) {
			log.error( "ERROR :  SQL: " + sql, e );
			throw e;
		} catch ( SQLException e ) {
			log.error( "ERROR :  SQL: " + sql, e );
			throw e;
		}
		
		Get_PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffs_INTERNAL__Result result = new Get_PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffs_INTERNAL__Result();
		result.psmCount = psmCount;
		result.psmIds = psmIds;
		
		return result;
	}



	////////////////////////////////////
	////////////////////////////////////
	
	//    Cache Methods
	
	
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
		
		int reportedPeptideId;
		int searchId; 
		SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel;
				
		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + reportedPeptideId;
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
			if (reportedPeptideId != other.reportedPeptideId)
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
		int psmCountResult;
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


								int reportedPeptideId = localCacheKey.reportedPeptideId; 
								int searchId = localCacheKey.searchId; 
								SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel = localCacheKey.searcherCutoffValuesSearchLevel;

								//  value is NOT in cache so get it and return it
								Get_PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffs_INTERNAL__Result result =
										get_PsmIds_OR_PsmCount_ForSearchIdReportedPeptideIdCutoffs_INTERNAL( Get_PsmCount_PsmIds.PSM_COUNT, reportedPeptideId, searchId, searcherCutoffValuesSearchLevel );

								int psmCountResult = result.psmCount;

								LocalCacheValue localCacheValue = new LocalCacheValue();
								localCacheValue.psmCountResult = psmCountResult;
								
								return localCacheValue;
							}
						});
		//			    .build(); // no CacheLoader
		//			cacheDataInitialized = true;
		

		dbRecordsDataCache_SoftReference = new SoftReference<>( dbRecordsDataCache );
		
		return dbRecordsDataCache;
	}

}
