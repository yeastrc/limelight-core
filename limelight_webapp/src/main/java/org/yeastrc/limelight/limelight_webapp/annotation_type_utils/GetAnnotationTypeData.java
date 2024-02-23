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
package org.yeastrc.limelight.limelight_webapp.annotation_type_utils;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterableDescriptiveAnnotationType;
import org.yeastrc.limelight.limelight_shared.enum_classes.PsmPeptideMatchedProteinAnnotationType;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.searchers.AnnotationTypeListForSearchIdSearcherIF;

/**
 * Get Annotation Type Data
 *
 */
@Component
public class GetAnnotationTypeData implements GetAnnotationTypeDataIF {

	private static final Logger log = LoggerFactory.getLogger( GetAnnotationTypeData.class );
	
	@Autowired
	private AnnotationTypeListForSearchIdSearcherIF annotationTypeListForSearchIdSearcher;
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.annotation_utils.GetAnnotationTypeDataIF#getAnnotationTypeDataForSearchId(int)
	 */
	@Override
	public GetAnnotationTypeDataResult getAnnotationTypeDataForSearchId( int searchId ) throws SQLException {
		
		GetAnnotationTypeDataResult result = new GetAnnotationTypeDataResult();

		List<AnnotationTypeDTO> annotationTypeDTOList =
				annotationTypeListForSearchIdSearcher.getAnnotationTypeListForSearchId( searchId );

    	// Process Annotation Types from DB
		for ( AnnotationTypeDTO annotationTypeDTO : annotationTypeDTOList ) {
			
			result.allEntriesAnnotationTypeData.put( annotationTypeDTO.getId(), annotationTypeDTO );
			
			if ( annotationTypeDTO.getFilterableDescriptiveAnnotationType() == FilterableDescriptiveAnnotationType.FILTERABLE ) {
				
				if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PSM ) {
					result.psmFilterableAnnotationTypeData.put( annotationTypeDTO.getId(), annotationTypeDTO );
				} else if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PEPTIDE ) {
					result.reportedPeptideFilterableAnnotationTypeData.put( annotationTypeDTO.getId(), annotationTypeDTO );
				} else if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.MATCHED_PROTEIN ) {
					result.matchedProteinFilterableAnnotationTypeData.put( annotationTypeDTO.getId(), annotationTypeDTO );
				} else if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.MODIFICATION_POSITION ) {
					result.modificationPositionFilterableAnnotationTypeData.put( annotationTypeDTO.getId(), annotationTypeDTO );
				} else {
					String msg = "Unknow value for 'PsmPeptideMatchedProteinAnnotationType'.  Annotation type id: " 
	    					+ annotationTypeDTO.getId()
	    					+ ", 'PsmPeptideMatchedProteinAnnotationType' value: " + annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType();
	    			log.error( msg );
	    			throw new LimelightInternalErrorException(msg);
				}
			} else if ( annotationTypeDTO.getFilterableDescriptiveAnnotationType() == FilterableDescriptiveAnnotationType.DESCRIPTIVE ) {
				
				if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PSM ) {
					result.psmDescriptiveAnnotationTypeData.put( annotationTypeDTO.getId(), annotationTypeDTO );
				} else if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.PEPTIDE ) {
					result.reportedPeptideDescriptiveAnnotationTypeData.put( annotationTypeDTO.getId(), annotationTypeDTO );
				} else if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.MATCHED_PROTEIN ) {
					result.matchedProteinDescriptiveAnnotationTypeData.put( annotationTypeDTO.getId(), annotationTypeDTO );
				} else if ( annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType() == PsmPeptideMatchedProteinAnnotationType.MODIFICATION_POSITION ) {
					result.modificationPositionDescriptiveAnnotationTypeData.put( annotationTypeDTO.getId(), annotationTypeDTO );
				} else {
					String msg = "Unknow value for 'PsmPeptideMatchedProteinAnnotationType'.  Annotation type id: " 
	    					+ annotationTypeDTO.getId()
	    					+ ", 'PsmPeptideMatchedProteinAnnotationType' value: " + annotationTypeDTO.getPsmPeptideMatchedProteinAnnotationType();
	    			log.error( msg );
	    			throw new LimelightInternalErrorException(msg);
				}
			} else {
				String msg = "Unknow value for 'FilterableDescriptiveAnnotationType'.  Annotation type id: " 
    					+ annotationTypeDTO.getId()
    					+ ", 'FilterableDescriptiveAnnotationType' value: " + annotationTypeDTO.getFilterableDescriptiveAnnotationType();
    			log.error( msg );
    			throw new LimelightInternalErrorException(msg);
			}
		}
		
		return result;
	}

	/**
	 * 
	 *
	 */
	public static class GetAnnotationTypeDataResult {
		
		private Map<Integer, AnnotationTypeDTO> allEntriesAnnotationTypeData = new HashMap<>();
		
		private Map<Integer, AnnotationTypeDTO> psmFilterableAnnotationTypeData = new HashMap<>();
		private Map<Integer, AnnotationTypeDTO> psmDescriptiveAnnotationTypeData = new HashMap<>();
		private Map<Integer, AnnotationTypeDTO> reportedPeptideFilterableAnnotationTypeData = new HashMap<>();
		private Map<Integer, AnnotationTypeDTO> reportedPeptideDescriptiveAnnotationTypeData = new HashMap<>();
		private Map<Integer, AnnotationTypeDTO> matchedProteinFilterableAnnotationTypeData = new HashMap<>();
		private Map<Integer, AnnotationTypeDTO> matchedProteinDescriptiveAnnotationTypeData = new HashMap<>();
		private Map<Integer, AnnotationTypeDTO> modificationPositionFilterableAnnotationTypeData = new HashMap<>();
		private Map<Integer, AnnotationTypeDTO> modificationPositionDescriptiveAnnotationTypeData = new HashMap<>();
		
		public Map<Integer, AnnotationTypeDTO> getAllEntriesAnnotationTypeData() {
			return allEntriesAnnotationTypeData;
		}
		public void setAllEntriesAnnotationTypeData(Map<Integer, AnnotationTypeDTO> allEntriesAnnotationTypeData) {
			this.allEntriesAnnotationTypeData = allEntriesAnnotationTypeData;
		}
		public Map<Integer, AnnotationTypeDTO> getPsmFilterableAnnotationTypeData() {
			return psmFilterableAnnotationTypeData;
		}
		public void setPsmFilterableAnnotationTypeData(Map<Integer, AnnotationTypeDTO> psmFilterableAnnotationTypeData) {
			this.psmFilterableAnnotationTypeData = psmFilterableAnnotationTypeData;
		}
		public Map<Integer, AnnotationTypeDTO> getPsmDescriptiveAnnotationTypeData() {
			return psmDescriptiveAnnotationTypeData;
		}
		public void setPsmDescriptiveAnnotationTypeData(Map<Integer, AnnotationTypeDTO> psmDescriptiveAnnotationTypeData) {
			this.psmDescriptiveAnnotationTypeData = psmDescriptiveAnnotationTypeData;
		}
		public Map<Integer, AnnotationTypeDTO> getReportedPeptideFilterableAnnotationTypeData() {
			return reportedPeptideFilterableAnnotationTypeData;
		}
		public void setReportedPeptideFilterableAnnotationTypeData(
				Map<Integer, AnnotationTypeDTO> reportedPeptideFilterableAnnotationTypeData) {
			this.reportedPeptideFilterableAnnotationTypeData = reportedPeptideFilterableAnnotationTypeData;
		}
		public Map<Integer, AnnotationTypeDTO> getReportedPeptideDescriptiveAnnotationTypeData() {
			return reportedPeptideDescriptiveAnnotationTypeData;
		}
		public void setReportedPeptideDescriptiveAnnotationTypeData(
				Map<Integer, AnnotationTypeDTO> reportedPeptideDescriptiveAnnotationTypeData) {
			this.reportedPeptideDescriptiveAnnotationTypeData = reportedPeptideDescriptiveAnnotationTypeData;
		}
		public Map<Integer, AnnotationTypeDTO> getMatchedProteinFilterableAnnotationTypeData() {
			return matchedProteinFilterableAnnotationTypeData;
		}
		public void setMatchedProteinFilterableAnnotationTypeData(
				Map<Integer, AnnotationTypeDTO> matchedProteinFilterableAnnotationTypeData) {
			this.matchedProteinFilterableAnnotationTypeData = matchedProteinFilterableAnnotationTypeData;
		}
		public Map<Integer, AnnotationTypeDTO> getMatchedProteinDescriptiveAnnotationTypeData() {
			return matchedProteinDescriptiveAnnotationTypeData;
		}
		public void setMatchedProteinDescriptiveAnnotationTypeData(
				Map<Integer, AnnotationTypeDTO> matchedProteinDescriptiveAnnotationTypeData) {
			this.matchedProteinDescriptiveAnnotationTypeData = matchedProteinDescriptiveAnnotationTypeData;
		}
		public Map<Integer, AnnotationTypeDTO> getModificationPositionFilterableAnnotationTypeData() {
			return modificationPositionFilterableAnnotationTypeData;
		}
		public void setModificationPositionFilterableAnnotationTypeData(
				Map<Integer, AnnotationTypeDTO> modificationPositionFilterableAnnotationTypeData) {
			this.modificationPositionFilterableAnnotationTypeData = modificationPositionFilterableAnnotationTypeData;
		}
		public Map<Integer, AnnotationTypeDTO> getModificationPositionDescriptiveAnnotationTypeData() {
			return modificationPositionDescriptiveAnnotationTypeData;
		}
		public void setModificationPositionDescriptiveAnnotationTypeData(
				Map<Integer, AnnotationTypeDTO> modificationPositionDescriptiveAnnotationTypeData) {
			this.modificationPositionDescriptiveAnnotationTypeData = modificationPositionDescriptiveAnnotationTypeData;
		}
		
	}
}
