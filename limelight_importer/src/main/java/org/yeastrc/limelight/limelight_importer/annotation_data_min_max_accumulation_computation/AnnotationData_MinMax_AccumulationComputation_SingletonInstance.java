package org.yeastrc.limelight.limelight_importer.annotation_data_min_max_accumulation_computation;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.dao.SearchLevel_Annotation_MinMax_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationDataBaseDTO;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchLevel_Annotation_MinMax_DTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;

/**
 * 
 * Class to accumulate the Min and Max of Annotation Data per Annotation Type Id.
 * 
 * Will be inserted into the DB at the end of processing.
 *
 */
public class AnnotationData_MinMax_AccumulationComputation_SingletonInstance {

	private static final Logger log = LoggerFactory.getLogger( AnnotationData_MinMax_AccumulationComputation_SingletonInstance.class );
	
	private static AnnotationData_MinMax_AccumulationComputation_SingletonInstance singletonInstance = new AnnotationData_MinMax_AccumulationComputation_SingletonInstance();
	
	public static AnnotationData_MinMax_AccumulationComputation_SingletonInstance getSingletonInstance() {
		return singletonInstance;
	}
	
	private Map<Integer, AnnotationTypeDTO> annotationTypeDTO_Map_Key_AnnotationTypeId = new HashMap<>();
	
	private Map<Integer, SearchLevel_Annotation_MinMax_DTO> searchLevel_Annotation_MinMax_DTO_Map_Key_AnnotationTypeId = new HashMap<>();
	
	
	/**
	 * 
	 * @param annotationTypeDTO
	 */
	public void store_AnnotationTypeDTO_OnlyWhenContains_AnnotationTypeFilterableDTO(
			
			AnnotationTypeDTO annotationTypeDTO
			) {
		
		if ( annotationTypeDTO.getAnnotationTypeFilterableDTO() == null ) {
			
			//  NO Filterable so skip
			
			return;  // EARLY RETURN
		}
		
		annotationTypeDTO_Map_Key_AnnotationTypeId.put( annotationTypeDTO.getId(), annotationTypeDTO );
	}
	
	
	/**
	 * 
	 * @param annotationDataBaseDTO
	 * @throws LimelightImporterInternalException 
	 */
	public void add_AnnotationDataBaseDTO( AnnotationDataBaseDTO annotationDataBaseDTO ) throws LimelightImporterInternalException {
		
		AnnotationTypeDTO annotationTypeDTO = annotationTypeDTO_Map_Key_AnnotationTypeId.get( annotationDataBaseDTO.getAnnotationTypeId() );
		
		if ( annotationTypeDTO == null ) {
			String msg = "add_AnnotationDataBaseDTO(...): annotationTypeDTO_Map_Key_AnnotationTypeId.get( annotationDataBaseDTO.getAnnotationTypeId() ); returned null. annotationDataBaseDTO.getAnnotationTypeId(): " + annotationDataBaseDTO.getAnnotationTypeId();
			log.error(msg);
			throw new LimelightImporterInternalException(msg);
		}
		
		SearchLevel_Annotation_MinMax_DTO searchLevel_Annotation_MinMax_DTO =
				searchLevel_Annotation_MinMax_DTO_Map_Key_AnnotationTypeId.get( annotationDataBaseDTO.getAnnotationTypeId() );
		
		if ( searchLevel_Annotation_MinMax_DTO == null ) {
			
			searchLevel_Annotation_MinMax_DTO = new SearchLevel_Annotation_MinMax_DTO();
			searchLevel_Annotation_MinMax_DTO.setAnnotationTypeId( annotationDataBaseDTO.getAnnotationTypeId() );
			searchLevel_Annotation_MinMax_DTO.setMin_ValueDouble( annotationDataBaseDTO.getValueDouble() );
			searchLevel_Annotation_MinMax_DTO.setMax_ValueDouble( annotationDataBaseDTO.getValueDouble() );
			searchLevel_Annotation_MinMax_DTO.setBest_ValueDouble( annotationDataBaseDTO.getValueDouble() );
			searchLevel_Annotation_MinMax_DTO.setWorst_ValueDouble( annotationDataBaseDTO.getValueDouble() );
			
			searchLevel_Annotation_MinMax_DTO_Map_Key_AnnotationTypeId.put( annotationDataBaseDTO.getAnnotationTypeId(), searchLevel_Annotation_MinMax_DTO );
			
		} else {
			
			if ( searchLevel_Annotation_MinMax_DTO.getMin_ValueDouble() > annotationDataBaseDTO.getValueDouble() ) {
				
				searchLevel_Annotation_MinMax_DTO.setMin_ValueDouble( annotationDataBaseDTO.getValueDouble() );
			}

			if ( searchLevel_Annotation_MinMax_DTO.getMax_ValueDouble() < annotationDataBaseDTO.getValueDouble() ) {
				
				searchLevel_Annotation_MinMax_DTO.setMax_ValueDouble( annotationDataBaseDTO.getValueDouble() );
			}

			if ( annotationTypeDTO.getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {

				if ( searchLevel_Annotation_MinMax_DTO.getBest_ValueDouble() < annotationDataBaseDTO.getValueDouble() ) {

					searchLevel_Annotation_MinMax_DTO.setBest_ValueDouble( annotationDataBaseDTO.getValueDouble() );
				}
				if ( searchLevel_Annotation_MinMax_DTO.getWorst_ValueDouble() > annotationDataBaseDTO.getValueDouble() ) {

					searchLevel_Annotation_MinMax_DTO.setWorst_ValueDouble( annotationDataBaseDTO.getValueDouble() );
				}
			
			} else if ( annotationTypeDTO.getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.BELOW ) {

				if ( searchLevel_Annotation_MinMax_DTO.getBest_ValueDouble() > annotationDataBaseDTO.getValueDouble() ) {

					searchLevel_Annotation_MinMax_DTO.setBest_ValueDouble( annotationDataBaseDTO.getValueDouble() );
				}
				if ( searchLevel_Annotation_MinMax_DTO.getWorst_ValueDouble() < annotationDataBaseDTO.getValueDouble() ) {

					searchLevel_Annotation_MinMax_DTO.setWorst_ValueDouble( annotationDataBaseDTO.getValueDouble() );
				}
				
			} else {
				String msg = "add_AnnotationDataBaseDTO(...): annotationTypeDTO.getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() is NOT ABOVE or BELOW. annotationTypeDTO.getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum(): " + annotationTypeDTO.getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum();
				log.error(msg);
				throw new LimelightImporterInternalException(msg);
			}
		}
	}
	
	/**
	 * 
	 * @param searchId
	 * @throws Exception
	 */
	public void storeInDB( int searchId ) throws Exception {
		
		SearchLevel_Annotation_MinMax_DAO_Importer dao = SearchLevel_Annotation_MinMax_DAO_Importer.getInstance();
		
		for ( SearchLevel_Annotation_MinMax_DTO searchLevel_Annotation_MinMax_DTO : searchLevel_Annotation_MinMax_DTO_Map_Key_AnnotationTypeId.values() ) {
			
			searchLevel_Annotation_MinMax_DTO.setSearchId( searchId );
			
			dao.saveToDatabase( searchLevel_Annotation_MinMax_DTO );
		}
		
	}
}
