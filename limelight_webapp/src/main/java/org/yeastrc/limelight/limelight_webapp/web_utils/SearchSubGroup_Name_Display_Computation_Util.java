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
package org.yeastrc.limelight.limelight_webapp.web_utils;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

/**
 * 
 *
 */
@Component
public class SearchSubGroup_Name_Display_Computation_Util {
	
	private static final int MAX_LENGTH_OF_DISPLAY_STRING = 8;

	private static final int MIN_LENGTH_OF_DISPLAY_STRING = 2;

	public static class SearchSubGroup_Name_Display_Computation_Entry {

		private int searchSubGroupId; // Unique within a search id
		private Integer displayOrder;
		private String subgroupName_fromImportFile;
		private String subgroupName_Display_FromServer_IfUserEnteredAValue; // null until user enters a value
		private String subgroupName_Display; //  Populated in SearchSubGroup_Name_Display_Computation_Util

		public int getSearchSubGroupId() {
			return searchSubGroupId;
		}
		public void setSearchSubGroupId(int searchSubGroupId) {
			this.searchSubGroupId = searchSubGroupId;
		}
		public String getSubgroupName_fromImportFile() {
			return subgroupName_fromImportFile;
		}
		public void setSubgroupName_fromImportFile(String subgroupName_fromImportFile) {
			this.subgroupName_fromImportFile = subgroupName_fromImportFile;
		}
		public String getSubgroupName_Display_FromServer_IfUserEnteredAValue() {
			return subgroupName_Display_FromServer_IfUserEnteredAValue;
		}
		public void setSubgroupName_Display_FromServer_IfUserEnteredAValue(
				String subgroupName_Display_FromServer_IfUserEnteredAValue) {
			this.subgroupName_Display_FromServer_IfUserEnteredAValue = subgroupName_Display_FromServer_IfUserEnteredAValue;
		}
		public String getSubgroupName_Display() {
			return subgroupName_Display;
		}
		public void setSubgroupName_Display(String subgroupName_Display) {
			this.subgroupName_Display = subgroupName_Display;
		}
		public Integer getDisplayOrder() {
			return displayOrder;
		}
		public void setDisplayOrder(Integer displayOrder) {
			this.displayOrder = displayOrder;
		}
	}

	/**
	 * @param searchNameFromDB
	 * @param searchId
	 * @return
	 */
	public void searchSubGroup_Name_Display_Computation__SortOn_DisplayOrder_SubGroupNameDisplay__Util( List<SearchSubGroup_Name_Display_Computation_Entry> entriesToUpdate ) {

		String subGroupName_ShortestCommon = null;
		
		int longestLength_searchSubgroupName_fromImportFile = 0;

		for (SearchSubGroup_Name_Display_Computation_Entry entry : entriesToUpdate ) {

			//  Skip following code since even if user sets value still use for determining Shortest Common String
			
//			if ( entry.subgroupName_Display_FromServer_IfUserEnteredAValue != null ) {
//				//  has a value so skip
//				continue;  // EARLY CONTINUE
//			}
			
			String searchSubgroupName_fromImportFile = entry.subgroupName_fromImportFile;
			
			{
				int length = searchSubgroupName_fromImportFile.length() ;
				if ( length > longestLength_searchSubgroupName_fromImportFile ) {
					longestLength_searchSubgroupName_fromImportFile = length;
				}
			}
			
			if ( subGroupName_ShortestCommon == null ) {
				//  First record where  not set so assign and skip to next
				subGroupName_ShortestCommon = searchSubgroupName_fromImportFile;
				continue;  // EARLY CONTINUE
			}
			if ( searchSubgroupName_fromImportFile.startsWith( subGroupName_ShortestCommon ) ) {
				//  searchSubgroupName_fromImportFile.startsWith( subGroupName_ShortestCommon ) so next
				continue;  // EARLY CONTINUE
			}
			int firstDifferentIndex = 0;
			{
				int index = 0;
				while ( subGroupName_ShortestCommon.charAt( index ) == searchSubgroupName_fromImportFile.charAt( index ) ) {
					index++;
				}
				firstDifferentIndex = index;
			}
			if ( firstDifferentIndex == 0 ) {
				//  No Part of Strings in Common so start at beginning of string and exit loop

				subGroupName_ShortestCommon = "";

				break;  // EARLY BREAK LOOP
			}

			subGroupName_ShortestCommon = subGroupName_ShortestCommon.substring( 0, firstDifferentIndex );
		}

		int searchSubgroupName_fromImportFile_StartIndex = subGroupName_ShortestCommon.length();
		
		{
			//  Compute Start Index to display last MAX_LENGTH_OF_DISPLAY_STRING characters for Longest searchSubgroupName_fromImportFile String
			int startIndex = longestLength_searchSubgroupName_fromImportFile - MAX_LENGTH_OF_DISPLAY_STRING;
			if ( startIndex < 0 ) {
				startIndex = 0; // Set to zero if less than zero
			}
			if ( searchSubgroupName_fromImportFile_StartIndex > startIndex ) {
				searchSubgroupName_fromImportFile_StartIndex = startIndex; // Change since can show more of all searchSubgroupName_fromImportFile String
			}
		}

		for ( SearchSubGroup_Name_Display_Computation_Entry entry : entriesToUpdate ) {

			if ( StringUtils.isNotEmpty( entry.subgroupName_Display_FromServer_IfUserEnteredAValue ) ) {
				//  has a value so copy and skip
				
				entry.subgroupName_Display = entry.subgroupName_Display_FromServer_IfUserEnteredAValue;
				
				continue;  // EARLY CONTINUE
			}
			
			String searchSubgroupName_fromImportFile = entry.subgroupName_fromImportFile;
			
			int searchSubgroupName_fromImportFile_EndIndex = searchSubgroupName_fromImportFile.length();
			if ( ( searchSubgroupName_fromImportFile_EndIndex - searchSubgroupName_fromImportFile_StartIndex ) > MAX_LENGTH_OF_DISPLAY_STRING ) {
				searchSubgroupName_fromImportFile_EndIndex = searchSubgroupName_fromImportFile_StartIndex + MAX_LENGTH_OF_DISPLAY_STRING;
			}
			String subgroupName_Display = searchSubgroupName_fromImportFile.substring( searchSubgroupName_fromImportFile_StartIndex, searchSubgroupName_fromImportFile_EndIndex );
			entry.subgroupName_Display = subgroupName_Display;
		}
		
		//  Change as needed so NO Duplicate Display Names
		
		{
			Set<String> displayNames_Set = new HashSet<>();
			
			int counter = 0;

			for ( SearchSubGroup_Name_Display_Computation_Entry entry : entriesToUpdate ) {
				
				counter++;

				String subgroupName_Display_Altered = entry.subgroupName_Display;

				boolean addSuccessful = false;

				while ( ( ! addSuccessful ) && subgroupName_Display_Altered.length() > MIN_LENGTH_OF_DISPLAY_STRING ) {

					if ( displayNames_Set.add( subgroupName_Display_Altered ) ) {

						addSuccessful = true;

						break;  //  EARLY EXIT LOOP
					}

					subgroupName_Display_Altered = subgroupName_Display_Altered.substring( 0, subgroupName_Display_Altered.length() - 1 );  // Remove last character
				}

				if ( ! addSuccessful ) {

					subgroupName_Display_Altered = entry.subgroupName_Display;  // Reset to full value

					while ( ( ! addSuccessful ) && subgroupName_Display_Altered.length() > MIN_LENGTH_OF_DISPLAY_STRING ) {

						if ( displayNames_Set.add( subgroupName_Display_Altered ) ) {

							addSuccessful = true;

							break;  //  EARLY EXIT LOOP
						}

						subgroupName_Display_Altered = subgroupName_Display_Altered.substring( 1 );  // Remove first character
					}
				}
				
				if ( ! addSuccessful ) {

					//  Try Add counter

					subgroupName_Display_Altered = entry.subgroupName_Display;  // Reset to full value

					if( subgroupName_Display_Altered.length() >= MAX_LENGTH_OF_DISPLAY_STRING - 1 ) {
						//  Remove last 1 or 2 characters to provide length under max length for up to 2 digit counter
						
						subgroupName_Display_Altered = subgroupName_Display_Altered.substring( 0, subgroupName_Display_Altered.length() - 2 );  // Remove last 2 characters
					}
					
					subgroupName_Display_Altered = subgroupName_Display_Altered + counter;

					if ( displayNames_Set.add( subgroupName_Display_Altered ) ) {

						addSuccessful = true;
					}
				}

				if ( ! addSuccessful ) {

					//  real mess.

					// Give up for now
				}
				
				entry.subgroupName_Display = subgroupName_Display_Altered;  // Save new value back to entry
			}
		}		

		Collections.sort( entriesToUpdate, new Comparator<SearchSubGroup_Name_Display_Computation_Entry>() {

			@Override
			public int compare(SearchSubGroup_Name_Display_Computation_Entry o1, SearchSubGroup_Name_Display_Computation_Entry o2) {
				
				if ( o1.getDisplayOrder() == null && o2.getDisplayOrder() == null ) {
					//  Neither entry has Display Order set so sort on Sub Group Name Display (Truncated strings created above)
					return o1.getSubgroupName_Display().compareTo( o2.getSubgroupName_Display() );
				}
				if ( o1.getDisplayOrder() != null && o2.getDisplayOrder() == null ) {
					//  Sort record without sort order after record with sort order
					return -1;
				}
				if ( o1.getDisplayOrder() == null && o2.getDisplayOrder() != null ) {
					//  Sort record without sort order after record with sort order
					return 1;
				}
				if ( o1.getDisplayOrder().intValue() < o2.getDisplayOrder().intValue() ) {
					return -1;
				}
				if ( o1.getDisplayOrder().intValue() > o2.getDisplayOrder().intValue() ) {
					return 1;
				}
				return 0;
			}
		});
		
	}

}
