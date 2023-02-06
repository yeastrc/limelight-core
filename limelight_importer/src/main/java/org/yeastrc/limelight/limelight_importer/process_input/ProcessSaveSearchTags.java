/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2019 University of Washington - Seattle, WA
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

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer.constants.SearchTags_Importer_Constants;
import org.yeastrc.limelight.limelight_importer.dao.ProjectSearch_TagCategoryInProject_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.ProjectSearch_TagMapping_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.dao.ProjectSearch_TagStringInProject_DAO_Importer;
import org.yeastrc.limelight.limelight_importer.dto.ProjectSearchDTO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_importer.objects.SearchTags_SearchTagCategories_Root_And_SubParts_InputData;
import org.yeastrc.limelight.limelight_importer.objects.SearchTags_SearchTagCategories_Root_And_SubParts_InputData.SearchTags_SearchTagCategories__SingleCategoryAndItsTags;
import org.yeastrc.limelight.limelight_shared.constants.FieldLengthConstants__LimelightSharedCode;
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearch_TagCategoryInProject_DTO;
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearch_TagStringInProject_DTO;

/**
 * Save the Search Tags from the command line or in the Submitted Import request, if there are any
 *
 */
public class ProcessSaveSearchTags {

	private static final Logger log = LoggerFactory.getLogger( ProcessSaveSearchTags.class );
	

	/**
	 * private constructor
	 */
	private ProcessSaveSearchTags(){}
	public static ProcessSaveSearchTags getInstance() {
		return new ProcessSaveSearchTags();
	}
	
	public void processSearchTags( 
			int projectId,
			SearchTags_SearchTagCategories_Root_And_SubParts_InputData searchTags_SearchTagCategories_Root_And_SubParts_InputData, 
			ProjectSearchDTO projectSearchDTOInserted,
			Integer userIdInsertingSearch ) throws Exception {
		
		try {
			if ( 
					searchTags_SearchTagCategories_Root_And_SubParts_InputData == null 
					|| ( searchTags_SearchTagCategories_Root_And_SubParts_InputData.getSearchTagCategories_AndTheir_SearchTags() == null
							|| searchTags_SearchTagCategories_Root_And_SubParts_InputData.getSearchTagCategories_AndTheir_SearchTags().isEmpty()
							)
					&& ( searchTags_SearchTagCategories_Root_And_SubParts_InputData.getSearchTags_Uncategorized() == null 
					|| searchTags_SearchTagCategories_Root_And_SubParts_InputData.getSearchTags_Uncategorized().isEmpty() ) ) {
				// none so exit
				return; // EARLY EXIT
			}

			//  ids of projectSearch_TagStringInProject_DTO__Ids
			Set<Integer> projectSearch_TagStringInProject_DTO__Ids = new HashSet<>();
				

			//  "Uncategorized" Search Tags
			
			if ( searchTags_SearchTagCategories_Root_And_SubParts_InputData.getSearchTags_Uncategorized() != null 
					&& ( ! searchTags_SearchTagCategories_Root_And_SubParts_InputData.getSearchTags_Uncategorized().isEmpty() ) ) {

				//  Process "Uncategorized" Search Tags
				
				//  Get tagCategoryId_For_TagstringRecord for "Uncategorized" or insert if not in db
				
				Integer tagCategoryId_For_Uncategorized_InDB =
						ProjectSearch_TagCategoryInProject_DAO_Importer.getInstance().getId_For_UncategorizedFakeRecord();
				
				if ( tagCategoryId_For_Uncategorized_InDB == null ) {
					
					ProjectSearch_TagCategoryInProject_DAO_Importer.getInstance().insertIfNotExist_UncategorizedFakeRecord();
					
					tagCategoryId_For_Uncategorized_InDB =
							ProjectSearch_TagCategoryInProject_DAO_Importer.getInstance().getId_For_UncategorizedFakeRecord();

	    			if ( tagCategoryId_For_Uncategorized_InDB == null ) {
	    			
	    				String msg = "Failed to Retrieve Uncategorized Fake Record ID after calling insertIfNotExist";
	    				log.error(msg);
	    				throw new LimelightImporterInternalException(msg);
	    			}
				}
				
				insertSearchTags( 
						searchTags_SearchTagCategories_Root_And_SubParts_InputData.getSearchTags_Uncategorized(),
						tagCategoryId_For_Uncategorized_InDB,
						projectId,
						userIdInsertingSearch,
						//  UPDATED: ids of projectSearch_TagStringInProject_DTO__Ids
						projectSearch_TagStringInProject_DTO__Ids
						);
			}

			//   "Categorized" Search Tags
			
			if ( searchTags_SearchTagCategories_Root_And_SubParts_InputData.getSearchTagCategories_AndTheir_SearchTags() != null 
					&& ( ! searchTags_SearchTagCategories_Root_And_SubParts_InputData.getSearchTagCategories_AndTheir_SearchTags().isEmpty() ) ) {

				//  Process "Categorized" Search Tags
				
				for ( SearchTags_SearchTagCategories__SingleCategoryAndItsTags category : searchTags_SearchTagCategories_Root_And_SubParts_InputData.getSearchTagCategories_AndTheir_SearchTags() ) {

					if ( category.getSearchTagStrings() == null 
							|| ( category.getSearchTagStrings().isEmpty() ) ) {
						//  No tags so skip
						continue; // EARLY CONTINUE
					}
					
					Integer id_For_CategoryLabel = ProjectSearch_TagCategoryInProject_DAO_Importer.getInstance().getId_For_ProjectId_CategoryLabel(projectId, category.getCategoryLabel());
					
					if ( id_For_CategoryLabel == null ) {

						//  No existing so save
			    		
						ProjectSearch_TagCategoryInProject_DTO item = new ProjectSearch_TagCategoryInProject_DTO();
						item.setProjectId(projectId);
						item.setCategoryLabel(category.getCategoryLabel());
						item.setCreatedBy_UserId(userIdInsertingSearch);
						item.setUpdatedBy_UserId(userIdInsertingSearch);

						ProjectSearch_TagCategoryInProject_DAO_Importer.getInstance().save__NOT_SET_ID( item );

						id_For_CategoryLabel = ProjectSearch_TagCategoryInProject_DAO_Importer.getInstance().getId_For_ProjectId_CategoryLabel(projectId, category.getCategoryLabel());

						if ( id_For_CategoryLabel == null ) {
							String msg = "id_For_CategoryLabel == null  Failed to retrieve id after save.";
							log.error( msg );
							throw new LimelightImporterDatabaseException(msg);
						}
					}

					insertSearchTags( 
							category.getSearchTagStrings(),
							id_For_CategoryLabel,
							projectId,
							userIdInsertingSearch,
							//  UPDATED: ids of projectSearch_TagStringInProject_DTO__Ids
							projectSearch_TagStringInProject_DTO__Ids
							);
				}
				
			}
			

			//  Last: Insert all mapping entries
			{
				for ( Integer tagId : projectSearch_TagStringInProject_DTO__Ids ) {
					ProjectSearch_TagMapping_DAO_Importer.getInstance().save(projectSearchDTOInserted.getId(), tagId);
				}
			}
			
		} catch ( Exception e ) {
			
			log.error("Failed to save Search Tags and Tag Categories to DB", e);
			throw e;
		}
			
	}
	
	private void insertSearchTags( 
			
			List<String> searchTagStrings,
			
			int tagCategoryId,
			
			int projectId,
			
			Integer userIdInsertingSearch,

			//  UPDATED: ids of projectSearch_TagStringInProject_DTO__Ids
			Set<Integer> projectSearch_TagStringInProject_DTO__Ids
			) throws Exception {

		for ( String searchTag : searchTagStrings ) {

			String searchTag_Truncated = searchTag;

			if ( searchTag_Truncated.length() > FieldLengthConstants__LimelightSharedCode.SEARCH_TAG_MAX_LENGTH__TAG_STRING ) {
				searchTag_Truncated = searchTag.substring(0, FieldLengthConstants__LimelightSharedCode.SEARCH_TAG_MAX_LENGTH__TAG_STRING);
			}

			ProjectSearch_TagStringInProject_DTO projectSearch_TagStringInProject_DTO = new ProjectSearch_TagStringInProject_DTO();

			projectSearch_TagStringInProject_DTO.setProjectId(projectId);
			projectSearch_TagStringInProject_DTO.setTagCategoryId( tagCategoryId );
			projectSearch_TagStringInProject_DTO.setTag_string(searchTag);
			projectSearch_TagStringInProject_DTO.setTag_Color_Font( SearchTags_Importer_Constants.SEARCH_TAGS__DEFAULT_FONT_COLOR );
			projectSearch_TagStringInProject_DTO.setTag_Color_Background( SearchTags_Importer_Constants.SEARCH_TAGS__DEFAULT_BACKGROUND_COLOR );
			projectSearch_TagStringInProject_DTO.setTag_Color_Border( null );
			projectSearch_TagStringInProject_DTO.setCreatedBy_UserId(userIdInsertingSearch);
			projectSearch_TagStringInProject_DTO.setUpdatedBy_UserId(userIdInsertingSearch);

			ProjectSearch_TagStringInProject_DAO_Importer.getInstance().save__NOT_SET_ID(projectSearch_TagStringInProject_DTO);
			
			Integer insertedId = ProjectSearch_TagStringInProject_DAO_Importer.getInstance().getId_For_ProjectId_TagCategoryId_TagString(projectId, tagCategoryId, searchTag);

			if ( insertedId == null ) {
				String msg = "Failed to insert projectSearch_TagStringInProject_DTO for projectId: " + projectId + ", tagString: " + searchTag;
				log.error(msg);
				throw new LimelightImporterDatabaseException(msg);
			}
			
			projectSearch_TagStringInProject_DTO__Ids.add(insertedId);
		}
	
	}
}
