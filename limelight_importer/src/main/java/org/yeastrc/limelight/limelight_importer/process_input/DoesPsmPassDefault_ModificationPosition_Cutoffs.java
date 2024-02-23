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
package org.yeastrc.limelight.limelight_importer.process_input;

import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDataException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeFilterableDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmModificationPositionFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPosition_FilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;

/**
 * 
 *
 */
public class DoesPsmPassDefault_ModificationPosition_Cutoffs {
	
	private static final Logger log = LoggerFactory.getLogger( DoesPsmPassDefault_ModificationPosition_Cutoffs.class );
	
	//  private constructor 
	private DoesPsmPassDefault_ModificationPosition_Cutoffs() {}
	public static DoesPsmPassDefault_ModificationPosition_Cutoffs getInstance() { return new DoesPsmPassDefault_ModificationPosition_Cutoffs(); }

	/**
	 * Does Psm Pass Default Modification Position Cutoffs
	 * 
	 * @param currentPsm_psmAnnotationDTO_Filterable_List
	 * @param bestPsmAnnotationDTO_KeyedOn_AnnotationTypeId
	 * @param filterablePsmAnnotationTypesOnId
	 * @return
	 * @throws LimelightImporterDataException
	 * @throws LimelightImporterInternalException
	 */
	public boolean doesPsmPassDefault_ModificationPosition_Cutoffs( 
			List<PsmModificationPositionFilterableAnnotationDTO> psmModificationPositionFilterableAnnotationDTO_Filterable_List,
			List<PsmOpenModificationPosition_FilterableAnnotationDTO> psmOpenModificationPosition_FilterableAnnotationDTO_List__ALL_OpenMods,
			Map<Integer, AnnotationTypeDTO> filterable_ModificationPosition_AnnotationTypesOnId
			) throws LimelightImporterDataException, LimelightImporterInternalException {
		
		if ( filterable_ModificationPosition_AnnotationTypesOnId == null || filterable_ModificationPosition_AnnotationTypesOnId.isEmpty() ) {
			
			//  NO annotation types so should not be any values
			
			boolean no__Filterable_List = true;
			boolean no__Filterable_List__ALL_OpenMods = true;
			
			if ( psmModificationPositionFilterableAnnotationDTO_Filterable_List != null && ( ! psmModificationPositionFilterableAnnotationDTO_Filterable_List.isEmpty() ) ) {
				no__Filterable_List = false;
			}
			
			if ( psmOpenModificationPosition_FilterableAnnotationDTO_List__ALL_OpenMods != null && ( ! psmOpenModificationPosition_FilterableAnnotationDTO_List__ALL_OpenMods.isEmpty() ) ) {
				no__Filterable_List__ALL_OpenMods = false;
			}
			
			if ( ! ( no__Filterable_List && no__Filterable_List__ALL_OpenMods ) ) {
				String msg = "( filterable_ModificationPosition_AnnotationTypesOnId == null || filterable_ModificationPosition_AnnotationTypesOnId.isEmpty() ) AND ( ! ( no__Filterable_List && no__Filterable_List__ALL_OpenMods ) )";
				log.error( msg );
				throw new LimelightImporterInternalException(msg);
			}
			
			return true; //  EARLY RETURN
		}
		
		
		boolean doesPsmPassDefaultCutoffs = true;  // Default to 'true' and set to 'false' below
		
		if ( psmModificationPositionFilterableAnnotationDTO_Filterable_List != null ) {

			for ( PsmModificationPositionFilterableAnnotationDTO psmModificationPositionFilterableAnnotationDTO_Filterable_Entry : psmModificationPositionFilterableAnnotationDTO_Filterable_List ) {

				Integer annotationTypeId = psmModificationPositionFilterableAnnotationDTO_Filterable_Entry.getAnnotationTypeId();
				AnnotationTypeDTO annotationType = filterable_ModificationPosition_AnnotationTypesOnId.get( annotationTypeId );

				if ( annotationType == null ) {
					String msg = "annotationType == null for annotationTypeId: " + annotationTypeId;
					log.error( msg );
					throw new LimelightImporterInternalException(msg);
				}
				AnnotationTypeFilterableDTO annotationTypeFilterableDTO = annotationType.getAnnotationTypeFilterableDTO();
				if ( annotationTypeFilterableDTO == null ) {
					String msg = "annotationTypeFilterableDTO == null for annotationTypeId: " + annotationTypeId;
					log.error( msg );
					throw new LimelightImporterInternalException(msg);
				}
				
				/////////   Does Entry pass default cutoffs
				
				if ( annotationTypeFilterableDTO.isDefaultFilter() ) {

					if ( annotationTypeFilterableDTO.getDefaultFilterValueAtDatabaseLoad() == null ) {

						//  doesPsmPassDefaultCutoffs = true;  // TODO  Is this RIGHT?????  !!!!!!!!!!!!!  Should probably fail the import instead

					} else if ( annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
						if ( psmModificationPositionFilterableAnnotationDTO_Filterable_Entry.getValueDouble() 
								< annotationTypeFilterableDTO.getDefaultFilterValueAtDatabaseLoad() ) {
							doesPsmPassDefaultCutoffs = false;
						}
					} else if ( annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.BELOW ) {
						if ( psmModificationPositionFilterableAnnotationDTO_Filterable_Entry.getValueDouble() 
								> annotationTypeFilterableDTO.getDefaultFilterValueAtDatabaseLoad() ) {
							doesPsmPassDefaultCutoffs = false;
						}
					} else {
						String msg = " Unexpected FilterDirectionType value:  " + annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum()
						+ ", for annotationTypeId: " + annotationTypeId;
						log.error( msg );
						throw new LimelightImporterDataException(msg);
					}

				}
			}	
		}
		
		if ( doesPsmPassDefaultCutoffs ) {
			
			if ( psmOpenModificationPosition_FilterableAnnotationDTO_List__ALL_OpenMods != null ) {

				for ( PsmOpenModificationPosition_FilterableAnnotationDTO psmModificationPositionFilterableAnnotationDTO_Filterable_Entry : psmOpenModificationPosition_FilterableAnnotationDTO_List__ALL_OpenMods ) {

					Integer annotationTypeId = psmModificationPositionFilterableAnnotationDTO_Filterable_Entry.getAnnotationTypeId();
					AnnotationTypeDTO annotationType = filterable_ModificationPosition_AnnotationTypesOnId.get( annotationTypeId );

					if ( annotationType == null ) {
						String msg = "annotationType == null for annotationTypeId: " + annotationTypeId;
						log.error( msg );
						throw new LimelightImporterInternalException(msg);
					}
					AnnotationTypeFilterableDTO annotationTypeFilterableDTO = annotationType.getAnnotationTypeFilterableDTO();
					if ( annotationTypeFilterableDTO == null ) {
						String msg = "annotationTypeFilterableDTO == null for annotationTypeId: " + annotationTypeId;
						log.error( msg );
						throw new LimelightImporterInternalException(msg);
					}
					
					/////////   Does Entry pass default cutoffs
					
					if ( annotationTypeFilterableDTO.isDefaultFilter() ) {

						if ( annotationTypeFilterableDTO.getDefaultFilterValueAtDatabaseLoad() == null ) {

							//  doesPsmPassDefaultCutoffs = true;  // TODO  Is this RIGHT?????  !!!!!!!!!!!!!  Should probably fail the import instead

						} else if ( annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
							if ( psmModificationPositionFilterableAnnotationDTO_Filterable_Entry.getValueDouble() 
									< annotationTypeFilterableDTO.getDefaultFilterValueAtDatabaseLoad() ) {
								doesPsmPassDefaultCutoffs = false;
							}
						} else if ( annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.BELOW ) {
							if ( psmModificationPositionFilterableAnnotationDTO_Filterable_Entry.getValueDouble() 
									> annotationTypeFilterableDTO.getDefaultFilterValueAtDatabaseLoad() ) {
								doesPsmPassDefaultCutoffs = false;
							}
						} else {
							String msg = " Unexpected FilterDirectionType value:  " + annotationTypeFilterableDTO.getFilterDirectionTypeJavaCodeEnum()
							+ ", for annotationTypeId: " + annotationTypeId;
							log.error( msg );
							throw new LimelightImporterDataException(msg);
						}

					}
				}	
			}
		}
		
		return doesPsmPassDefaultCutoffs;
	}
}
