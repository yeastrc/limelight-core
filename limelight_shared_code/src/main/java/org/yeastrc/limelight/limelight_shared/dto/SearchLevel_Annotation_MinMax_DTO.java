package org.yeastrc.limelight.limelight_shared.dto;

/**
 * 
 * Table search_level_annotation_min_max_tbl
 *
 */
public class SearchLevel_Annotation_MinMax_DTO {

	private int searchId;
	private int annotationTypeId;
	
	/**
	 * 
	 */
	private Double min_ValueDouble;
	
	/**
	 * value closest to positive infinity
	 */
	private Double max_ValueDouble;
	
	/**
	 * best value per annotation type
	 */
	private Double best_ValueDouble;

	/**
	 * worst value per annotation type
	 */
	private Double worst_ValueDouble;
	

	@Override
	public String toString() {
		return "SearchLevel_Annotation_MinMax_DTO [searchId=" + searchId + ", annotationTypeId=" + annotationTypeId
				+ ", min_ValueDouble=" + min_ValueDouble + ", max_ValueDouble=" + max_ValueDouble
				+ ", best_ValueDouble=" + best_ValueDouble + ", worst_ValueDouble=" + worst_ValueDouble + "]";
	}

	
	public int getSearchId() {
		return searchId;
	}

	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}

	public int getAnnotationTypeId() {
		return annotationTypeId;
	}

	public void setAnnotationTypeId(int annotationTypeId) {
		this.annotationTypeId = annotationTypeId;
	}

	public Double getMin_ValueDouble() {
		return min_ValueDouble;
	}

	public void setMin_ValueDouble(Double min_ValueDouble) {
		this.min_ValueDouble = min_ValueDouble;
	}

	public Double getMax_ValueDouble() {
		return max_ValueDouble;
	}

	public void setMax_ValueDouble(Double max_ValueDouble) {
		this.max_ValueDouble = max_ValueDouble;
	}

	public Double getBest_ValueDouble() {
		return best_ValueDouble;
	}

	public void setBest_ValueDouble(Double best_ValueDouble) {
		this.best_ValueDouble = best_ValueDouble;
	}

	public Double getWorst_ValueDouble() {
		return worst_ValueDouble;
	}

	public void setWorst_ValueDouble(Double worst_ValueDouble) {
		this.worst_ValueDouble = worst_ValueDouble;
	}
	
}
