package org.yeastrc.limelight.limelight_feature_detection_run_import.searcher;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;

/**
 * Get the id and ms_1_scan_number from feature_detection_singular_feature_entry_tbl For featureDetectionRootId 
 *
 */
public class FeatureDetection_SingularFeature_Id_MS1_ScanNumber_For_FeatureDetectionRootId_Searcher {

	private static final Logger log = LoggerFactory.getLogger( FeatureDetection_SingularFeature_Id_MS1_ScanNumber_For_FeatureDetectionRootId_Searcher.class );
	
	private FeatureDetection_SingularFeature_Id_MS1_ScanNumber_For_FeatureDetectionRootId_Searcher() { }
	public static FeatureDetection_SingularFeature_Id_MS1_ScanNumber_For_FeatureDetectionRootId_Searcher getInstance() { return new FeatureDetection_SingularFeature_Id_MS1_ScanNumber_For_FeatureDetectionRootId_Searcher(); }

	/**
	 * 
	 *
	 */
	public static class FeatureDetection_SingularFeature_Id_MS1_ScanNumber_For_FeatureDetectionRootId_Searcher_Result {

		private int[][] ids_ForSingle_MS1_ScanNumber__ForEach_MS1_ScanNumber;

		public int[][] getIds_ForSingle_MS1_ScanNumber__ForEach_MS1_ScanNumber() {
			return ids_ForSingle_MS1_ScanNumber__ForEach_MS1_ScanNumber;
		} 
	}

	
	private static final String QUERY_SQL = 
			"SELECT "
			+ " id, ms_1_scan_number "
			+ " FROM "
			+ " feature_detection_singular_feature_entry_tbl "
			+ " WHERE feature_detection_root_id = ?";

	
	/**
	 * @param featureDetectionRootId
	 * @return
	 * @throws Exception
	 */
	public FeatureDetection_SingularFeature_Id_MS1_ScanNumber_For_FeatureDetectionRootId_Searcher_Result  getForFeatureDetectionRootId( int featureDetectionRootId ) throws Exception {

		Map<Integer, Internal_IdsForSingleMS1ScanNumber>  internal_IdsForSingleMS1ScanNumber__Map_Key_Ms1ScanNumber = new HashMap<>(); 
		
		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			counter++;
			preparedStatement.setInt( counter, featureDetectionRootId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				
				while ( rs.next() ) {
					
					Integer ms1ScanNumber = rs.getInt( "ms_1_scan_number" );
					
					//  Get or create internal "Per MS1" in map
					
					Internal_IdsForSingleMS1ScanNumber internal_IdsForSingleMS1ScanNumber = internal_IdsForSingleMS1ScanNumber__Map_Key_Ms1ScanNumber.get(ms1ScanNumber);
					if ( internal_IdsForSingleMS1ScanNumber == null ) {
						internal_IdsForSingleMS1ScanNumber = new Internal_IdsForSingleMS1ScanNumber();
						internal_IdsForSingleMS1ScanNumber__Map_Key_Ms1ScanNumber.put(ms1ScanNumber, internal_IdsForSingleMS1ScanNumber);
					}
					
					//  Add 'id'
					
					int id = rs.getInt( "id" );
					
					internal_IdsForSingleMS1ScanNumber.addId(id);
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		//  Copy map entries to list and sort on MS1 scan number
		
		List<Map.Entry<Integer, Internal_IdsForSingleMS1ScanNumber>> internal_IdsForSingleMS1ScanNumber_MapEntry_List = new ArrayList<>( internal_IdsForSingleMS1ScanNumber__Map_Key_Ms1ScanNumber.entrySet() );

		Collections.sort( internal_IdsForSingleMS1ScanNumber_MapEntry_List, new Comparator<Map.Entry<Integer, Internal_IdsForSingleMS1ScanNumber>>() {
			
			@Override
			public int compare(Map.Entry<Integer, Internal_IdsForSingleMS1ScanNumber> o1, Map.Entry<Integer, Internal_IdsForSingleMS1ScanNumber> o2) {
				
				return o1.getKey().compareTo( o2.getKey() );
			}
		});

		int[][] ids_ForSingle_MS1_ScanNumber__ForEach_MS1_ScanNumber = new int[ internal_IdsForSingleMS1ScanNumber_MapEntry_List.size() ][];
		
		int ids_ForSingle_MS1_ScanNumber__ForEach_MS1_ScanNumber__INDEX = 0;
		for ( Map.Entry<Integer, Internal_IdsForSingleMS1ScanNumber> mapEntry : internal_IdsForSingleMS1ScanNumber_MapEntry_List ) {
			
			ids_ForSingle_MS1_ScanNumber__ForEach_MS1_ScanNumber[ ids_ForSingle_MS1_ScanNumber__ForEach_MS1_ScanNumber__INDEX ] = mapEntry.getValue().getIdsArray();
			
			ids_ForSingle_MS1_ScanNumber__ForEach_MS1_ScanNumber__INDEX++;
		}
		
		FeatureDetection_SingularFeature_Id_MS1_ScanNumber_For_FeatureDetectionRootId_Searcher_Result result = new FeatureDetection_SingularFeature_Id_MS1_ScanNumber_For_FeatureDetectionRootId_Searcher_Result();
		result.ids_ForSingle_MS1_ScanNumber__ForEach_MS1_ScanNumber = ids_ForSingle_MS1_ScanNumber__ForEach_MS1_ScanNumber;
		
		return result;
	}

	//  INTERNAL classes

	/**
	 * 
	 *
	 */
	private static class Internal_IdsForSingleMS1ScanNumber {
    	
		private int[] ids = new int[50]; 

		private int lengthPopulated = 0;
				
		/**
		 * @param id
		 * @throws LimelightImporterInternalException 
		 */
		void addId(int id) throws LimelightImporterInternalException {
			
			if ( ids == null ) {
				String msg = "Cannot call addId(int id) after call getIdsArray()";
				log.error(msg);
				throw new LimelightImporterInternalException(msg);
			}

			if ( ids.length == lengthPopulated ) {
				//  enlarge ids.  create new array and copy in existing array

				int[] ids_New = new int[ ids.length + 50 ];

				System.arraycopy(ids, 0, ids_New, 0, ids.length);

				ids = ids_New;
			}
			ids[lengthPopulated] = id;
			lengthPopulated++;
		}


		/**
		 * @return
		 * @throws LimelightImporterInternalException 
		 */
		int[] getIdsArray() throws LimelightImporterInternalException {

			if ( ids == null ) {
				String msg = "Cannot call getIdsArray() after call getIdsArray()";
				log.error(msg);
				throw new LimelightImporterInternalException(msg);
			}
			
			int[] ids_Result = new int[lengthPopulated]; 

			System.arraycopy(ids, 0, ids_Result, 0, lengthPopulated);
			
			ids = null;
			
			return ids_Result;
		}
	}
}
