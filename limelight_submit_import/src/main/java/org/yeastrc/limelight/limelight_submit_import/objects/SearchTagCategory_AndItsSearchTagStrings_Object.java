package org.yeastrc.limelight.limelight_submit_import.objects;

import java.util.ArrayList;
import java.util.List;

public class SearchTagCategory_AndItsSearchTagStrings_Object {

	private String categoryLabel;
	private List<String> searchTagStrings = new ArrayList<>();
	
	public String getCategoryLabel() {
		return categoryLabel;
	}
	public void setCategoryLabel(String categoryLabel) {
		this.categoryLabel = categoryLabel;
	}
	public List<String> getSearchTagStrings() {
		return searchTagStrings;
	}
	public void setSearchTagStrings(List<String> searchTagStrings) {
		this.searchTagStrings = searchTagStrings;
	}
}
