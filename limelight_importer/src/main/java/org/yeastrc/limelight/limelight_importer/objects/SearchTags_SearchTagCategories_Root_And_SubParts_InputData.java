package org.yeastrc.limelight.limelight_importer.objects;

import java.util.List;

/**
 * Input Search Tags and Search Tag Categories
 *
 */
public class SearchTags_SearchTagCategories_Root_And_SubParts_InputData {
	
	private List<String> searchTags_Uncategorized;
	
	private List<SearchTags_SearchTagCategories__SingleCategoryAndItsTags> searchTagCategories_AndTheir_SearchTags;

	/**
	 * 
	 *
	 */
	public static class SearchTags_SearchTagCategories__SingleCategoryAndItsTags {

		private String categoryLabel;
		private List<String> searchTagStrings;
		
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

	public List<String> getSearchTags_Uncategorized() {
		return searchTags_Uncategorized;
	}

	public void setSearchTags_Uncategorized(
			List<String> searchTags_Uncategorized) {
		this.searchTags_Uncategorized = searchTags_Uncategorized;
	}

	public List<SearchTags_SearchTagCategories__SingleCategoryAndItsTags> getSearchTagCategories_AndTheir_SearchTags() {
		return searchTagCategories_AndTheir_SearchTags;
	}

	public void setSearchTagCategories_AndTheir_SearchTags(
			List<SearchTags_SearchTagCategories__SingleCategoryAndItsTags> searchTagCategories_AndTheir_SearchTags) {
		this.searchTagCategories_AndTheir_SearchTags = searchTagCategories_AndTheir_SearchTags;
	}
}
