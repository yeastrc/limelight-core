package org.yeastrc.limelight.limelight_feature_detection_run_import.insert_mapping_singular_persistent_to_db;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.FeatureDetectionSingularFeatureEntry_DAO;
import org.yeastrc.limelight.limelight_feature_detection_run_import.dao.FeatureDetection_Map_PersistentToSingularFeatureDAO;
import org.yeastrc.limelight.limelight_feature_detection_run_import.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_feature_detection_run_import.searcher.FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher;
import org.yeastrc.limelight.limelight_feature_detection_run_import.searcher.FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher.FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result;
import org.yeastrc.limelight.limelight_feature_detection_run_import.searcher.FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher.FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetectionSingularFeatureEntryDTO;
import org.yeastrc.limelight.limelight_shared.dto.FeatureDetection_Map_PersistentToSingularFeatureDTO;
import org.yeastrc.spectral_storage.get_data_webapp.shared_server_client.webservice_request_response.sub_parts.SingleScan_SubResponse;

/**
 * 
 *
 */
public class Insert_Mapping_Singular_Persistent_ToDB {

	private static final Logger log = LoggerFactory.getLogger( Insert_Mapping_Singular_Persistent_ToDB.class );

	private Insert_Mapping_Singular_Persistent_ToDB() { }
	public static Insert_Mapping_Singular_Persistent_ToDB getInstance() { return new Insert_Mapping_Singular_Persistent_ToDB(); }

	public static class Insert_Mapping_Singular_Persistent_ToDB__Params {

		int featureDetectionRootId;
			
		Map<Integer, SingleScan_SubResponse> ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber;

		public void setFeatureDetectionRootId(int featureDetectionRootId) {
			this.featureDetectionRootId = featureDetectionRootId;
		}

		public void setMs_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber(
				Map<Integer, SingleScan_SubResponse> ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber) {
			this.ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber = ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber;
		}

	}


	/**
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public void insert_Mapping_Singular_Persistent_ToDB(
			Insert_Mapping_Singular_Persistent_ToDB__Params params
			) throws Exception {

		int featureDetectionRootId = params.featureDetectionRootId;

		Map<Integer, SingleScan_SubResponse> ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber = params.ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber;
		

		List<FeatureDetectionSingularFeatureEntryDTO> featureDetectionSingularFeatureEntryDTO_List = 
				FeatureDetectionSingularFeatureEntry_DAO.getInstance().getAll_For_FeatureDetectionRootId(featureDetectionRootId);

		FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result featureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result =
				FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher.getInstance().getForFeatureDetectionRootId(featureDetectionRootId);

		List<FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item> featureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item_List =
				featureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result.getEntries();

//		long getFromDB_EndTime = System.nanoTime();
//		
//		long getFromDB_Time = getFromDB_EndTime - getFromDB_StartTime;
//		
//		log.warn( "Total time spent getting Singular and Persistent entries from DB (Nanoseconds): " + getFromDB_Time );
		
		
		//  Create "Internal" Persistent Feature Item Objects List from DB data, aka the Persistent Feature "Windows"
		
		List<Internal__PersistentFeatureData_Item> internal__PersistentFeatureData_Item_List = new ArrayList<>( featureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item_List.size() );

		for ( FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item persistentFeature_ResultItem : featureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item_List ) {

			Internal__PersistentFeatureData_Item internal__PersistentFeatureData_Item = new Internal__PersistentFeatureData_Item();
			
			internal__PersistentFeatureData_Item.persistentFeature_ResultItem = persistentFeature_ResultItem;
			
			double ppe = persistentFeature_ResultItem.getMonoisotopicMass() * 10.0d / 1000000d;  //  1000000d is for 1E6;
			
			internal__PersistentFeatureData_Item.lowermz = persistentFeature_ResultItem.getMonoisotopicMass() - ppe;
			
			internal__PersistentFeatureData_Item.uppermz = persistentFeature_ResultItem.getMonoisotopicMass() + ppe;

			internal__PersistentFeatureData_Item.persistentFeature_RT_Start_Seconds_Minus_30 = ( persistentFeature_ResultItem.getRetentionTimeRange_Start() * 60 ) - 30;
			internal__PersistentFeatureData_Item.persistentFeature_RT_End_Seconds_Plus_30 = ( persistentFeature_ResultItem.getRetentionTimeRange_End() * 60 ) + 30;
			
			internal__PersistentFeatureData_Item_List.add( internal__PersistentFeatureData_Item );
		}
		
		//  Sort lowermz ascending
		
		Collections.sort( internal__PersistentFeatureData_Item_List, new Comparator<Internal__PersistentFeatureData_Item>() {
			
			@Override
			public int compare(Internal__PersistentFeatureData_Item o1, Internal__PersistentFeatureData_Item o2) {
				
				if ( o1.lowermz < o2.lowermz ) {
					return -1;
				}
				if ( o1.lowermz > o2.lowermz ) {
					return 1;
				}
				return 0;
			}
		});
		
		
		//  Output list for batching
		List<FeatureDetection_Map_PersistentToSingularFeatureDTO> featureDetection_Map_PersistentToSingularFeatureDTO_List = new ArrayList<>( FeatureDetection_Map_PersistentToSingularFeatureDAO.DEFAULT_INSERT_ENTRIES_ARRAY_SIZE );
		
		//  TIMING
		
//		int inserted_MappingEntries_Count = 0;
//		
//		long mapping_And_InsertDB_StartTime = System.nanoTime();
//		
//		long insertDB_Only_Time = 0;
		

	    Map<Integer, Internal__SingularFeatureData_Entries_For_One_MS1_Scan_Item> singularFeatureData_Entries_For_One_MS1_Scan_Item_Map_Key_MS1_ScanNumber = new HashMap<>( featureDetectionSingularFeatureEntryDTO_List.size() );
	    	

		for ( FeatureDetectionSingularFeatureEntryDTO singularFeatureEntry : featureDetectionSingularFeatureEntryDTO_List ) {
			
			Integer ms_1_scanNumber = singularFeatureEntry.getMs_1_scanNumber();
			
			Internal__SingularFeatureData_Entries_For_One_MS1_Scan_Item singularFeatureData_Entries_For_One_MS1_Scan_Item = singularFeatureData_Entries_For_One_MS1_Scan_Item_Map_Key_MS1_ScanNumber.get(ms_1_scanNumber);
			if ( singularFeatureData_Entries_For_One_MS1_Scan_Item == null ) {
				singularFeatureData_Entries_For_One_MS1_Scan_Item = new Internal__SingularFeatureData_Entries_For_One_MS1_Scan_Item();
				singularFeatureData_Entries_For_One_MS1_Scan_Item.ms_1_ScanNumber = ms_1_scanNumber;
				singularFeatureData_Entries_For_One_MS1_Scan_Item_Map_Key_MS1_ScanNumber.put(ms_1_scanNumber, singularFeatureData_Entries_For_One_MS1_Scan_Item );
			}
			
			singularFeatureData_Entries_For_One_MS1_Scan_Item.singularFeatureEntries.add(singularFeatureEntry);
		}
		
		for ( Internal__SingularFeatureData_Entries_For_One_MS1_Scan_Item singularFeatureData_Entries_For_One_MS1_Scan_Item : singularFeatureData_Entries_For_One_MS1_Scan_Item_Map_Key_MS1_ScanNumber.values() ) {
			
			//  Process All Singular Features for a MS1 scan
			
			//  Looked up below using 'singularFeatureEntry.getMs_1_scanNumber()'   SO   Only need to look up once per 'singularFeatureEntry' value
			SingleScan_SubResponse singleScan_SubResponse_FOR_singularFeatureEntry_MS_1_ScanNumber = null;
			
			for ( Internal__PersistentFeatureData_Item internal__PersistentFeatureData_Item : internal__PersistentFeatureData_Item_List ) {

				//  Process ALL Persistent Features matching to Singular Features for this MS1 Scan

				//   "Best" Singular Feature entry to match this Persistent Feature Entry within this MS1 Scan
				FeatureDetectionSingularFeatureEntryDTO singularFeatureEntry_BestEntry = null;
				
				double singularFeatureEntry_BestEntry__MonoisotopicMass_Difference_AbsoluteValue = 0;;
				
				
				
				for ( FeatureDetectionSingularFeatureEntryDTO singularFeatureEntry : singularFeatureData_Entries_For_One_MS1_Scan_Item.singularFeatureEntries ) {

					//  Process Each Singular Feature for the MS1 scan

					//  Compare for early skip rest of Persistent entries in 'internal__PersistentFeatureData_Item_List'

					if ( singularFeatureEntry.getMonoisotopicMass() < internal__PersistentFeatureData_Item.lowermz ) {

						//  Skip rest of entries in 'internal__PersistentFeatureData_Item_List'
						//		since singularFeatureEntry.getMonoisotopicMass() is LESS THAN than rest of internal__PersistentFeatureData_Item.lowermz
						//		Since internal__PersistentFeatureData_Item_List' sorted on lowermz ascending

						continue;  //  EARLY CONTINUE
					}

					// Main compare

					if ( singularFeatureEntry.getMonoisotopicMass() >= internal__PersistentFeatureData_Item.lowermz
							&& singularFeatureEntry.getMonoisotopicMass() <= internal__PersistentFeatureData_Item.uppermz ) {

						if ( singleScan_SubResponse_FOR_singularFeatureEntry_MS_1_ScanNumber == null ) {

							//  Get from Map:  singleScan_SubResponse FOR singularFeatureEntry.getMs_1_scanNumber()
							singleScan_SubResponse_FOR_singularFeatureEntry_MS_1_ScanNumber = ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber.get( singularFeatureEntry.getMs_1_scanNumber() );

							if ( singleScan_SubResponse_FOR_singularFeatureEntry_MS_1_ScanNumber == null ) {
								String msg = "ms_1_Scans__scanData_From_SpectralStorage_Map_Key_Ms_1_ScanNumber returned null for singularFeatureEntry.getMs_1_scanNumber(): " + singularFeatureEntry.getMs_1_scanNumber() ;
								log.warn(msg);
								throw new LimelightImporterDataException(msg);
							}
						}

						if ( singleScan_SubResponse_FOR_singularFeatureEntry_MS_1_ScanNumber.getRetentionTime() >= internal__PersistentFeatureData_Item.persistentFeature_RT_Start_Seconds_Minus_30 
								&& singleScan_SubResponse_FOR_singularFeatureEntry_MS_1_ScanNumber.getRetentionTime() <= internal__PersistentFeatureData_Item.persistentFeature_RT_End_Seconds_Plus_30 ) {

							//  Have a match within the range so save the match

							//							inserted_MappingEntries_Count++;
							

							double singularFeatureEntry_MonoisotopicMass_Difference_AbsoluteValue = 
									Math.abs( 
											internal__PersistentFeatureData_Item.persistentFeature_ResultItem.getMonoisotopicMass() 
											- singularFeatureEntry.getMonoisotopicMass() );
							
							if ( singularFeatureEntry_BestEntry == null ) {

								singularFeatureEntry_BestEntry = singularFeatureEntry;
								
								singularFeatureEntry_BestEntry__MonoisotopicMass_Difference_AbsoluteValue = singularFeatureEntry_MonoisotopicMass_Difference_AbsoluteValue;
								
							} else {
								
								if ( singularFeatureEntry_MonoisotopicMass_Difference_AbsoluteValue < singularFeatureEntry_BestEntry__MonoisotopicMass_Difference_AbsoluteValue ) {
									//  singularFeatureEntry is closer to predicted monoisotopic mass of persistent

									singularFeatureEntry_BestEntry = singularFeatureEntry;

									singularFeatureEntry_BestEntry__MonoisotopicMass_Difference_AbsoluteValue = singularFeatureEntry_MonoisotopicMass_Difference_AbsoluteValue;
								}
							}
						}
					}
				}
				
				if ( singularFeatureEntry_BestEntry != null ) {

					FeatureDetection_Map_PersistentToSingularFeatureDTO featureDetection_Map_PersistentToSingularFeatureDTO = new FeatureDetection_Map_PersistentToSingularFeatureDTO();

					featureDetection_Map_PersistentToSingularFeatureDTO.setFeatureDetection_PersistentFeatureEntryId(
							internal__PersistentFeatureData_Item.persistentFeature_ResultItem.getId_PersistentFeature_Entry()
							);

					featureDetection_Map_PersistentToSingularFeatureDTO.setFeatureDetection_SingularFeatureEntryId(singularFeatureEntry_BestEntry.getId());

					featureDetection_Map_PersistentToSingularFeatureDTO.setFeatureDetectionRootId(featureDetectionRootId);
					
					//  Add to batch
					featureDetection_Map_PersistentToSingularFeatureDTO_List.add(featureDetection_Map_PersistentToSingularFeatureDTO);

					if ( featureDetection_Map_PersistentToSingularFeatureDTO_List.size() >= FeatureDetection_Map_PersistentToSingularFeatureDAO.DEFAULT_INSERT_ENTRIES_ARRAY_SIZE ) {

						//  TIMING

						//								long insertDB_ONLY_StartTime = System.nanoTime();

						FeatureDetection_Map_PersistentToSingularFeatureDAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams(featureDetection_Map_PersistentToSingularFeatureDTO_List);

						//								long insertDB_ONLY_EndTime = System.nanoTime();
						//
						//								insertDB_Only_Time += ( insertDB_ONLY_EndTime - insertDB_ONLY_StartTime );

						//  Reset for next batch
						featureDetection_Map_PersistentToSingularFeatureDTO_List.clear();
					}
				}
			}
		}
		
		if ( ! featureDetection_Map_PersistentToSingularFeatureDTO_List.isEmpty() ) {

			//  Save last batch

			//  TIMING
			
//			long insertDB_ONLY_StartTime = System.nanoTime();
			
			FeatureDetection_Map_PersistentToSingularFeatureDAO.getInstance().insert_NOT_Update_ID_Property_InDTOParams(featureDetection_Map_PersistentToSingularFeatureDTO_List);
			
//			long insertDB_ONLY_EndTime = System.nanoTime();
//
//			insertDB_Only_Time += ( insertDB_ONLY_EndTime - insertDB_ONLY_StartTime );
			
		}


		
	}
	

    
    ////////////////////
    
    //  INTERNAL classes
    
    private static class Internal__PersistentFeatureData_Item {
    	
    	FeatureDetection_PersistentFeature_Entries_For_FeatureDetectionRootId_Searcher_Result_Item persistentFeature_ResultItem;
		double lowermz;
		
		double uppermz;

		float persistentFeature_RT_Start_Seconds_Minus_30;
		float persistentFeature_RT_End_Seconds_Plus_30;
    }
    

    private static class Internal__SingularFeatureData_Entries_For_One_MS1_Scan_Item {
    	
    	List<FeatureDetectionSingularFeatureEntryDTO> singularFeatureEntries = new ArrayList<>( 100 );

    	int ms_1_ScanNumber;
    }
    
    
}
