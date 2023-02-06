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
package org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services;

import org.slf4j.LoggerFactory;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.dto.ProjectScanFilename_SearchScanFile_Mapping_DTO;
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearch_TagCategoryInProject_DTO;
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearch_TagStringInProject_DTO;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFilename_DTO;
import org.yeastrc.limelight.limelight_shared.dto.SearchScanFileDTO;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectScanFileDAO;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectScanFileDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectScanFilename_DAO;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectScanFilename_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectScanFilename_SearchScnFile_Mapping_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearchComment_WebDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearchDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearchWebLinks_WebDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearch_TagCategoryInProject_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearch_TagMapping_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearch_TagStringInProject_DAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.SearchFileProjectSearch_WebDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectSearchDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightDatabaseException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchIdAssocSearchIdInProjectIdSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchTags_ForProjectSearchIdsSearcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchScanFile_For_SearchIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearchTags_ForProjectSearchIdsSearcher.ProjectSearchTags_ForProjectSearchIdsSearcher_ResultItem;

/**
 * Copy Project Search Ids to Different Project Id
 * 
 * !!!!  Important.  This cannot throw checked exceptions.  Otherwise Spring will not roll back the transaction
 *
 */
@Service
public class CopyProjectSearchIdToNewProjectUsingDBTransactionService implements CopyProjectSearchIdToNewProjectUsingDBTransactionServiceIF {

	private static final Logger log = LoggerFactory.getLogger( CopyProjectSearchIdToNewProjectUsingDBTransactionService.class );
	
	public enum Log_DuplicateKeyException { YES, NO }

	@Autowired
	private ProjectSearchIdAssocSearchIdInProjectIdSearcherIF projectSearchIdAssocSearchIdInProjectIdSearcher;

	@Autowired
	private ProjectSearchDAO_IF projectSearchDAO;
	
	@Autowired
	private SearchFileProjectSearch_WebDAO_IF searchFileProjectSearch_WebDAO;
	
	@Autowired
	private ProjectSearchWebLinks_WebDAO_IF projectSearchWebLinks_WebDAO;
	
	@Autowired
	private ProjectSearchComment_WebDAO_IF projectSearchComment_WebDAO;
	
	@Autowired
	private SearchScanFile_For_SearchIds_Searcher_IF searchScanFile_For_SearchIds_Searcher;
	
	@Autowired
	private ProjectScanFileDAO_IF projectScanFileDAO;
	
	@Autowired
	private ProjectScanFilename_DAO_IF projectScanFilename_DAO;
	
	@Autowired
	private ProjectScanFilename_SearchScnFile_Mapping_DAO_IF projectScanFilename_SearchScnFile_Mapping_DAO;
	
	@Autowired
	private ProjectSearchTags_ForProjectSearchIdsSearcher_IF projectSearchTags_ForProjectSearchIdsSearcher;
	
	@Autowired
	private ProjectSearch_TagStringInProject_DAO_IF projectSearch_TagStringInProject_DAO;
	
	@Autowired
	private ProjectSearch_TagCategoryInProject_DAO_IF projectSearch_TagCategoryInProject_DAO;

	@Autowired
	private ProjectSearch_TagMapping_DAO_IF projectSearch_TagMapping_DAO;

	/**
	 * @param item
	 * @param projectUserDTO
	 */
	
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions
	
	public void copyProjectSearchIdsToNewProjectId( 
			
			List<Integer> projectSearchIdList, int newProjectId, boolean copyAnyAssociatedTags, int creatingUserId, Log_DuplicateKeyException log_DuplicateKeyException ) { //  No 'Throws' allowed due to
		
		try {
			List<ProjectSearchTags_ForProjectSearchIdsSearcher_ResultItem> projectSearchTags_ForProjectSearchIdsSearcher_ResultItem_List = null; 
			try {
				projectSearchTags_ForProjectSearchIdsSearcher_ResultItem_List =
						projectSearchTags_ForProjectSearchIdsSearcher.getProjectSearchTags_ForProjectSearchIds(projectSearchIdList);
			} catch (Exception e) {
				//  Convert to RuntimeException
				throw new LimelightDatabaseException(e);
			}
			
			for ( int projectSearchId : projectSearchIdList ) {
				boolean copySearch = true;
				// First determine if searchId for projectSearchId is already in newProjectId
				if ( projectSearchIdAssocSearchIdInProjectIdSearcher
						.isSearchIdAssocWithProjectSearchIdInProjectId(
								projectSearchId, newProjectId ) ) {
					//  already in newProjectId so do not move it there
					copySearch = false;
				}
				if ( copySearch ) {
					copyProjectSearchIdToProjectId( 
							projectSearchId, newProjectId, copyAnyAssociatedTags, 
							projectSearchTags_ForProjectSearchIdsSearcher_ResultItem_List, creatingUserId, log_DuplicateKeyException );
				}
			}
			
		} catch ( org.springframework.dao.DuplicateKeyException duplicateKeyException ) {
			
			if ( log_DuplicateKeyException == Log_DuplicateKeyException.YES ) {
				String msg = "fail addProject(...)";
				log.error( msg, duplicateKeyException );
			}
			
			throw duplicateKeyException;
			
		} catch ( RuntimeException e ) {
			String msg = "fail copyProjectSearchIdsToNewProjectId(...)";
			log.error( msg, e );
			throw e;
		} catch (Exception e ) {
			String msg = "fail copyProjectSearchIdsToNewProjectId(...)";
			log.error( msg, e );
			throw new RuntimeException( e );
		}
	}

	/**
	 * @param projectSearchId_Existing
	 * @param newProjectId
	 * @return insertedProjectsearchId
	 * @throws Exception 
	 */
	private int copyProjectSearchIdToProjectId( 
			
			int projectSearchId_Existing, int newProjectId, boolean copyAnyAssociatedTags, 
			List<ProjectSearchTags_ForProjectSearchIdsSearcher_ResultItem> projectSearchTags_ForProjectSearchIdsSearcher_ResultItem_List,
			int creatingUserId, Log_DuplicateKeyException log_DuplicateKeyException ) throws Exception {
		
		ProjectSearchDTO projectSearchDTO = projectSearchDAO.getFromId( projectSearchId_Existing );  // Get existing record
		
		projectSearchDTO.setProjectId( newProjectId );  //  Update Project
		projectSearchDTO.setCreatedByUserId( creatingUserId );
		projectSearchDTO.setSearchDisplayOrder(0); //  reset display order to zero
		
		projectSearchDAO.save( projectSearchDTO);  //  Save to new Project, creating new record in project_search_tbl
		
		int insertedProjectsearchId = projectSearchDTO.getId();

		searchFileProjectSearch_WebDAO
		.duplicateRecordsForProjectSearchIdWithNewProjectSearchId( projectSearchId_Existing, insertedProjectsearchId );

		projectSearchWebLinks_WebDAO
		.duplicateRecordsForProjectSearchIdWithNewProjectSearchId( projectSearchId_Existing, insertedProjectsearchId );
		
		projectSearchComment_WebDAO
		.duplicateRecordsForProjectSearchIdWithNewProjectSearchId( projectSearchId_Existing, insertedProjectsearchId );
		
		copy_Search_SearchTags_ToNewProject(
				copyAnyAssociatedTags, projectSearchId_Existing, insertedProjectsearchId, newProjectId, 
				projectSearchTags_ForProjectSearchIdsSearcher_ResultItem_List, creatingUserId, log_DuplicateKeyException);
		
		insert_ProjectScanFile_And_Children_To_New_Project( projectSearchId_Existing, newProjectId, projectSearchDTO, log_DuplicateKeyException );
		
		return insertedProjectsearchId;
	}
	
	/**
	 * @param copyAnyAssociatedTags
	 * @param projectSearchId
	 * @param newProjectId
	 * @param projectSearchTags_ForProjectSearchIdsSearcher_ResultItem_List
	 * @param creatingUserId
	 * @param log_DuplicateKeyException
	 */
	private void copy_Search_SearchTags_ToNewProject(
			
			boolean copyAnyAssociatedTags,
			int projectSearchId_Existing, 
			int projectsearchId_NewInserted,
			int newProjectId,
			List<ProjectSearchTags_ForProjectSearchIdsSearcher_ResultItem> projectSearchTags_ForProjectSearchIdsSearcher_ResultItem_List,
			int creatingUserId, 
			Log_DuplicateKeyException log_DuplicateKeyException 
			) {

		if ( copyAnyAssociatedTags && ( ! projectSearchTags_ForProjectSearchIdsSearcher_ResultItem_List.isEmpty() ) ) {
			
			//  Get Search Tag Category record for "Uncategorized"
			
			Integer id_For_UncategorizedFakeRecord = projectSearch_TagCategoryInProject_DAO.getId_For_UncategorizedFakeRecord(); 
			
			//  Copy Search Tag records.  Copy Search Tag Category records as needed
			
			Map<Integer, Integer> tagCategoryId_OnTagRecord_OnNewRecord_Map_Key_tagCategoryId_OnTagRecord_OnExistingRecord = new HashMap<>();
			
			
			for ( ProjectSearchTags_ForProjectSearchIdsSearcher_ResultItem projectSearchTags_ForProjectSearchIdsSearcher_ResultItem : projectSearchTags_ForProjectSearchIdsSearcher_ResultItem_List ) {
				
				int tagCategoryId_OnTagRecord_OnExistingRecord = projectSearchTags_ForProjectSearchIdsSearcher_ResultItem.getTag_category_id();
				
				int tagCategoryId_OnTagRecord_OnNewRecord = tagCategoryId_OnTagRecord_OnExistingRecord;
				
				if ( id_For_UncategorizedFakeRecord == null || id_For_UncategorizedFakeRecord.intValue() != tagCategoryId_OnTagRecord_OnExistingRecord ) {
					
					// tagCategoryId on Existing Tag record is NOT "Uncategorized" fake record
					
					Integer tagCategoryId_OnTagRecord_OnNewRecord_FromMap = tagCategoryId_OnTagRecord_OnNewRecord_Map_Key_tagCategoryId_OnTagRecord_OnExistingRecord.get(tagCategoryId_OnTagRecord_OnExistingRecord);
					if ( tagCategoryId_OnTagRecord_OnNewRecord_FromMap != null ) {
						//  Already mapped tagCategoryId_OnTagRecord_OnExistingRecord to tagCategoryId_OnTagRecord_OnNewRecord_FromMap so use value from Map
						tagCategoryId_OnTagRecord_OnNewRecord = tagCategoryId_OnTagRecord_OnNewRecord_FromMap;
					} else {
						//  tagCategoryId not already mapped so get tag category id in new project and copy tag category to new project if needed
						
						ProjectSearch_TagCategoryInProject_DTO existingTagCategoryRecord_OldProjectId = projectSearch_TagCategoryInProject_DAO.getRecord_For_Id(tagCategoryId_OnTagRecord_OnExistingRecord);
						if ( existingTagCategoryRecord_OldProjectId == null ) {
							//  Existing Category record no longer exists for old project id.  
							
							//  Skip processing this search tag as it likely no longer exists
							
							continue; // EARLY CONTINUE  !!!!!
						}
						
						Integer tagCategoryId_OnTagRecord_OnNewRecord_FromDB = 
								projectSearch_TagCategoryInProject_DAO.getId_For_ProjectId_CategoryLabel(newProjectId, existingTagCategoryRecord_OldProjectId.getCategoryLabel());
						
						if ( tagCategoryId_OnTagRecord_OnNewRecord_FromDB != null ) {
							
							//  Category Label already exists in new project so use this id
							tagCategoryId_OnTagRecord_OnNewRecord = tagCategoryId_OnTagRecord_OnNewRecord_FromDB;
							
						} else {
							//  Category Label NOT already exists in new project so add it 
							
							ProjectSearch_TagCategoryInProject_DTO newTagCategoryRecord_NewProjectId = new ProjectSearch_TagCategoryInProject_DTO();
							newTagCategoryRecord_NewProjectId.setProjectId(newProjectId);
							newTagCategoryRecord_NewProjectId.setCategoryLabel( existingTagCategoryRecord_OldProjectId.getCategoryLabel() );
							newTagCategoryRecord_NewProjectId.setLabel_Color_Font(existingTagCategoryRecord_OldProjectId.getLabel_Color_Font());
							newTagCategoryRecord_NewProjectId.setLabel_Color_Background(existingTagCategoryRecord_OldProjectId.getLabel_Color_Background());
							newTagCategoryRecord_NewProjectId.setLabel_Color_Border(existingTagCategoryRecord_OldProjectId.getLabel_Color_Border());
							newTagCategoryRecord_NewProjectId.setCreatedBy_UserId(creatingUserId);
							newTagCategoryRecord_NewProjectId.setUpdatedBy_UserId(creatingUserId);
							
							projectSearch_TagCategoryInProject_DAO.save__NOT_SET_ID(newTagCategoryRecord_NewProjectId);

							Integer tagCategoryId_OnTagRecord_OnNewRecord_FromDB_AfterSave = 
									projectSearch_TagCategoryInProject_DAO.getId_For_ProjectId_CategoryLabel(newProjectId, existingTagCategoryRecord_OldProjectId.getCategoryLabel());
							
							if ( tagCategoryId_OnTagRecord_OnNewRecord_FromDB_AfterSave == null ) {
								String msg = "Failed to get tagCategoryId of record for new project id and category label after call projectSearch_TagCategoryInProject_DAO.save__NOT_SET_ID(...) with newProjectId: "
										+ newProjectId 
										+ ", CategoryLabel: " + existingTagCategoryRecord_OldProjectId.getCategoryLabel();
								log.error(msg);
								throw new LimelightInternalErrorException(msg);
							}
							
							tagCategoryId_OnTagRecord_OnNewRecord = tagCategoryId_OnTagRecord_OnNewRecord_FromDB_AfterSave;
						}
					}
				}
				
				if ( projectSearchTags_ForProjectSearchIdsSearcher_ResultItem.getProjectSearchId() == projectSearchId_Existing ) {
					//  Record for this projectSearchId so process

					//  Add new ProjectSearch_TagStringInProject_DTO if not exist in new project
	    			ProjectSearch_TagStringInProject_DTO item = new ProjectSearch_TagStringInProject_DTO();
	    			item.setProjectId(newProjectId);
	    			item.setTagCategoryId(tagCategoryId_OnTagRecord_OnNewRecord);
	    			item.setTag_string(projectSearchTags_ForProjectSearchIdsSearcher_ResultItem.getTag_string());
	    			item.setTag_Color_Background(projectSearchTags_ForProjectSearchIdsSearcher_ResultItem.getTag_Color_Background());
	    			item.setCreatedBy_UserId(creatingUserId);
	    			item.setUpdatedBy_UserId(creatingUserId);

	    			projectSearch_TagStringInProject_DAO.save__NOT_SET_ID( item );
	    			
	    			Integer searchTagId = projectSearch_TagStringInProject_DAO.getId_For_ProjectId_TagCategoryId_TagString(newProjectId, tagCategoryId_OnTagRecord_OnNewRecord, projectSearchTags_ForProjectSearchIdsSearcher_ResultItem.getTag_string());
	    			
	    			if ( searchTagId == null ) {
	    				String msg = "searchTagId == null.  Not found in DB: newProjectId: " + newProjectId 
	    						+ ", Tag_string: "
	    						+ projectSearchTags_ForProjectSearchIdsSearcher_ResultItem.getTag_string();
	        			log.error( msg );
	        			throw new LimelightInternalErrorException(msg);
	    			}

					projectSearch_TagMapping_DAO.save(projectsearchId_NewInserted, searchTagId);
	    			
				}
			}
		}
		
	}
	
	/**
	 * @param projectSearchId
	 * @param newProjectId
	 * @throws SQLException 
	 */
	private void insert_ProjectScanFile_And_Children_To_New_Project( 
			
			int projectSearchId_OLD, int newProjectId, ProjectSearchDTO projectSearchDTO_Inserted,
			Log_DuplicateKeyException log_DuplicateKeyException ) throws SQLException {
		
		Collection<Integer> searchIds = new ArrayList<>( 1 );
		searchIds.add( projectSearchDTO_Inserted.getSearchId() );
		
		List<SearchScanFileDTO> searchScanFileDTOList = 
				searchScanFile_For_SearchIds_Searcher.getSearchScanFile_For_SearchIds(searchIds);

		if ( searchScanFileDTOList.isEmpty() ) {
			//  NO records to copy so exit
			
			return; // EARLY RETURN
		}
		
		for ( SearchScanFileDTO searchScanFileDTO : searchScanFileDTOList ) {
			if ( searchScanFileDTO.getScanFileId() != null ) {
				
				Project_ScanFile_DTO projectScanFileDTO = new Project_ScanFile_DTO();
				{
					projectScanFileDTO.setProjectId(newProjectId);
					projectScanFileDTO.setScanFileId(searchScanFileDTO.getScanFileId());

					ProjectScanFileDAO.Log_DuplicateKeyException projectScanFileDAO__Log_DuplicateKeyException = ProjectScanFileDAO.Log_DuplicateKeyException.NO;

					if ( log_DuplicateKeyException == Log_DuplicateKeyException.YES ) {
						projectScanFileDAO__Log_DuplicateKeyException = ProjectScanFileDAO.Log_DuplicateKeyException.YES;
					}

					projectScanFileDAO.save__NOT_SET_ID(projectScanFileDTO, projectScanFileDAO__Log_DuplicateKeyException);

					Integer projectScanFileDTO_Id = projectScanFileDAO.getId_For_ProjectId_ScanFileId(newProjectId, searchScanFileDTO.getScanFileId());
					if ( projectScanFileDTO_Id == null ) {
						String msg = "projectScanFileDAO.getId_For_ProjectId_ScanFileId(newProjectId, searchScanFileDTO.getScanFileId()); returns null after call projectScanFileDAO.save__NOT_SET_ID(projectScanFileDTO); projectScanFileDTO: " + projectScanFileDTO;
						log.error(msg);
						throw new LimelightInternalErrorException(msg);
					}

					projectScanFileDTO.setId(projectScanFileDTO_Id);
				}
				
				Project_ScanFilename_DTO project_ScanFilename_DTO = new Project_ScanFilename_DTO();
				
				{
					project_ScanFilename_DTO.setProjectScanFileId(projectScanFileDTO.getId());
					project_ScanFilename_DTO.setScanFilename(searchScanFileDTO.getFilename());

					ProjectScanFilename_DAO.Log_DuplicateKeyException projectScanFilename_DAO__Log_DuplicateKeyException = ProjectScanFilename_DAO.Log_DuplicateKeyException.NO;

					if ( log_DuplicateKeyException == Log_DuplicateKeyException.YES ) {
						projectScanFilename_DAO__Log_DuplicateKeyException = ProjectScanFilename_DAO.Log_DuplicateKeyException.YES;
					}

					projectScanFilename_DAO.save__NOT_SET_ID(project_ScanFilename_DTO, projectScanFilename_DAO__Log_DuplicateKeyException);

					Integer project_ScanFilename_DTO_Id = projectScanFilename_DAO.getId_For_ProjectScanFileId_ScanFilename(projectScanFileDTO.getId(), searchScanFileDTO.getFilename());
					if ( project_ScanFilename_DTO_Id == null ) {
						String msg = "projectScanFilename_DAO.getId_For_ProjectScanFileId_ScanFilename(projectScanFileDTO.getId(), searchScanFileDTO.getFilename()); returns null after call projectScanFilename_DAO.save__NOT_SET_ID(project_ScanFilename_DTO); project_ScanFilename_DTO: " + project_ScanFilename_DTO;
						log.error(msg);
						throw new LimelightInternalErrorException(msg);
					}

					project_ScanFilename_DTO.setId(project_ScanFilename_DTO_Id);
				}
				
				ProjectScanFilename_SearchScanFile_Mapping_DTO projectScanFilename_SearchScanFile_Mapping_DTO = new ProjectScanFilename_SearchScanFile_Mapping_DTO();
				
				projectScanFilename_SearchScanFile_Mapping_DTO.setProjectSearchId(projectSearchDTO_Inserted.getId());
				projectScanFilename_SearchScanFile_Mapping_DTO.setSearchScanFileId(searchScanFileDTO.getId());
				projectScanFilename_SearchScanFile_Mapping_DTO.setProjectScanFilenameId(project_ScanFilename_DTO.getId());
				
				projectScanFilename_SearchScnFile_Mapping_DAO.save(projectScanFilename_SearchScanFile_Mapping_DTO);
			}
		}
	}
	
}
