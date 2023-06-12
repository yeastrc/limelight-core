package org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects;

import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;

/**
 * Entry for each Annotation 
 * 
 *  !!!!  Warning:  Has equals(...) and hashCode() that need to be updated if properties change   !!!!
 *  
 *  equals(...) and hashCode() ONLY use fields:
 *  
 *  	annotationTypeId
 *  	annotationCutoffValue
 *  
 *    All other fields are related to those fields
 *    
 *    
 *    Made Immutable once the build() is called:
 *    
 *       Assumes that contained property AnnotationTypeDTO annotationTypeDTO does not change
 *
 */
public class SearcherCutoffValuesAnnotationLevel {

	//  !!!!  Warning:  Has equals(...) and hashCode() that need to be updated if properties change   !!!!
	
	private int annotationTypeId;
	private double annotationCutoffValue;

	private AnnotationTypeDTO annotationTypeDTO;
	
	/**
	 * Private Constructor
	 */
	private SearcherCutoffValuesAnnotationLevel() {}
 	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(annotationCutoffValue);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + annotationTypeId;
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
		SearcherCutoffValuesAnnotationLevel other = (SearcherCutoffValuesAnnotationLevel) obj;
		if (Double.doubleToLongBits(annotationCutoffValue) != Double.doubleToLongBits(other.annotationCutoffValue))
			return false;
		if (annotationTypeId != other.annotationTypeId)
			return false;
		return true;
	}


	@Override
	public String toString() {
		return "SearcherCutoffValuesAnnotationLevel [annotationTypeId=" + annotationTypeId + ", annotationCutoffValue="
				+ annotationCutoffValue + "]";
	}


	public int getAnnotationTypeId() {
		return annotationTypeId;
	}
	public double getAnnotationCutoffValue() {
		return annotationCutoffValue;
	}
	public AnnotationTypeDTO getAnnotationTypeDTO() {
		return annotationTypeDTO;
	}


	/**
	 * Get Builder
	 * @return
	 */
	public static SearcherCutoffValuesAnnotationLevel_Builder builder() {
		
		return new SearcherCutoffValuesAnnotationLevel_Builder();
	}
	
	
	/**
	 * Builder
	 *
	 */
	public static class SearcherCutoffValuesAnnotationLevel_Builder {
		
		private SearcherCutoffValuesAnnotationLevel newInstance = new SearcherCutoffValuesAnnotationLevel();
		
		/**
		 * private constructor
		 */
		private SearcherCutoffValuesAnnotationLevel_Builder() {}

		public SearcherCutoffValuesAnnotationLevel build() {
			return newInstance;
		}
		
		public SearcherCutoffValuesAnnotationLevel_Builder setAnnotationCutoffValue(double annotationCutoffValue) {
			newInstance.annotationCutoffValue = annotationCutoffValue;
			return this;
		}

		public SearcherCutoffValuesAnnotationLevel_Builder setAnnotationTypeId(int annotationTypeId) {
			newInstance.annotationTypeId = annotationTypeId;
			return this;
		}

		public SearcherCutoffValuesAnnotationLevel_Builder setAnnotationTypeDTO(AnnotationTypeDTO annotationTypeDTO) {
			newInstance.annotationTypeDTO = annotationTypeDTO;
			return this;
		}

	}
}
