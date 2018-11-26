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
package org.yeastrc.limelight.limelight_webapp.services;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchCommentDTO;
import org.yeastrc.limelight.limelight_shared.dto.ProjectSearchWebLinksDTO;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearch_Comments_ForProjectSearchIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectSearch_WebLinks_ForProjectSearchIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers.SearchFileProjectSearch_ForProjectSearchIdsSearcherIF;
import org.yeastrc.limelight.limelight_webapp.searchers_results.SearchFileProjectSearch_ForProjectSearchIds_Item;
import org.yeastrc.limelight.limelight_webapp.services_result_objects.SearchDetails_ProjectPage_Comment_Item;
import org.yeastrc.limelight.limelight_webapp.services_result_objects.SearchDetails_ProjectPage_PerProjectSearchId_Item;
import org.yeastrc.limelight.limelight_webapp.services_result_objects.SearchDetails_ProjectPage_PerProjectSearchId_Result;
import org.yeastrc.limelight.limelight_webapp.services_result_objects.SearchDetails_ProjectPage_SearchFile_Item;
import org.yeastrc.limelight.limelight_webapp.services_result_objects.SearchDetails_ProjectPage_WebLink_Item;

/**
 * Data for Search Details (When Expand a Search)
 *
 */
@Component
public class Get_SearchDetails_ProjectPage_For_ProjectSearchIds_Service implements Get_SearchDetails_ProjectPage_For_ProjectSearchIds_ServiceIF {

	private static final Logger log = LoggerFactory.getLogger( Get_SearchDetails_ProjectPage_For_ProjectSearchIds_Service.class );
	
	public enum IsProjectOwnerAllowed { YES, NO }
	public enum IsAssistantProjectOwnerAllowed { YES, NO }
	
	@Autowired
	private SearchFileProjectSearch_ForProjectSearchIdsSearcherIF searchFileProjectSearch_ForProjectSearchIdsSearcher;
	
	@Autowired
	private ProjectSearch_WebLinks_ForProjectSearchIdsSearcherIF projectSearch_WebLinks_ForProjectSearchIdsSearcher;
	
	@Autowired
	private ProjectSearch_Comments_ForProjectSearchIdsSearcherIF projectSearch_Comments_ForProjectSearchIdsSearcher;
	
	/**
	 * @param projectSearchIds
	 * @param isProjectOwnerAllowed
	 * @param userId
	 * @return
	 * @throws SQLException
	 */
	@Override
	public SearchDetails_ProjectPage_PerProjectSearchId_Result get_SearchDetails_ProjectPage_For_ProjectSearchIds(
			
			List<Integer> projectSearchIds,
			IsProjectOwnerAllowed isProjectOwnerAllowed,
			IsAssistantProjectOwnerAllowed isAssistantProjectOwnerAllowed,
			Integer userId ) throws SQLException {
		
		//  returned SearchDetails_ProjectPage_PerProjectSearchId_Result is also changed in webservice controller
		
		SearchDetails_ProjectPage_PerProjectSearchId_Result result = new SearchDetails_ProjectPage_PerProjectSearchId_Result();

		Map<Integer, SearchDetails_ProjectPage_PerProjectSearchId_Item> resultsKeyProjectSearchId = new HashMap<>();
		
		// Get and Save Search Files
		
		{
			List<SearchFileProjectSearch_ForProjectSearchIds_Item> searchFileProjectSearch_ForProjectSearchIds_ItemList = 
					searchFileProjectSearch_ForProjectSearchIdsSearcher
					.getSearchFileProjectSearch_ForProjectSearchIds( projectSearchIds );

			for ( SearchFileProjectSearch_ForProjectSearchIds_Item item : searchFileProjectSearch_ForProjectSearchIds_ItemList ) {

				SearchDetails_ProjectPage_PerProjectSearchId_Item perProjSearchItem = resultsKeyProjectSearchId.get( item.getProjectSearchId() );
				if ( perProjSearchItem == null ) {
					perProjSearchItem = new SearchDetails_ProjectPage_PerProjectSearchId_Item();
					perProjSearchItem.setProjectSearchId( item.getProjectSearchId() );
					resultsKeyProjectSearchId.put( item.getProjectSearchId(), perProjSearchItem );
				}
				List<SearchDetails_ProjectPage_SearchFile_Item> searchFileList = perProjSearchItem.getSearchFileList();
				if ( searchFileList == null ) {
					searchFileList = new ArrayList<>();
					perProjSearchItem.setSearchFileList( searchFileList );
				}
				SearchDetails_ProjectPage_SearchFile_Item searchDetails_ProjectPage_SearchFile_Item = new SearchDetails_ProjectPage_SearchFile_Item();
				searchFileList.add( searchDetails_ProjectPage_SearchFile_Item );
				searchDetails_ProjectPage_SearchFile_Item.setId( item.getId() );
				searchDetails_ProjectPage_SearchFile_Item.setName( item.getDisplayName() );
				if ( isProjectOwnerAllowed == IsProjectOwnerAllowed.YES ) {
					searchDetails_ProjectPage_SearchFile_Item.setCanEdit( true );
				}
			}
		}
		
		{
			List<ProjectSearchWebLinksDTO> results = 
					projectSearch_WebLinks_ForProjectSearchIdsSearcher.getProjectSearchWebLinksDTO_ForProjectSearchIds( projectSearchIds );

			for ( ProjectSearchWebLinksDTO item : results ) {

				SearchDetails_ProjectPage_PerProjectSearchId_Item perProjSearchItem = resultsKeyProjectSearchId.get( item.getProjectSearchId() );
				if ( perProjSearchItem == null ) {
					perProjSearchItem = new SearchDetails_ProjectPage_PerProjectSearchId_Item();
					perProjSearchItem.setProjectSearchId( item.getProjectSearchId() );
					resultsKeyProjectSearchId.put( item.getProjectSearchId(), perProjSearchItem );
				}
				List<SearchDetails_ProjectPage_WebLink_Item> webLinkList = perProjSearchItem.getWebLinkList();
				if ( webLinkList == null ) {
					webLinkList = new ArrayList<>();
					perProjSearchItem.setWebLinkList( webLinkList );
				}
				SearchDetails_ProjectPage_WebLink_Item webLink_Item = new SearchDetails_ProjectPage_WebLink_Item();
				webLinkList.add( webLink_Item );
				webLink_Item.setId( item.getId() );
				webLink_Item.setLinkURL( item.getLinkURL() );
				webLink_Item.setLinkLabel( item.getLinkLabel() );
				if ( isProjectOwnerAllowed == IsProjectOwnerAllowed.YES ) {
					webLink_Item.setCanDelete( true );
				}
			}
		}
		
		{
			List<ProjectSearchCommentDTO> results = 
					projectSearch_Comments_ForProjectSearchIdsSearcher.getProjectSearchCommentDTO_ForProjectSearchIds( projectSearchIds );

			SimpleDateFormat simpleDateFormatComment = new SimpleDateFormat("yyyy-MM-dd");

			for ( ProjectSearchCommentDTO item : results ) {

				SearchDetails_ProjectPage_PerProjectSearchId_Item perProjSearchItem = resultsKeyProjectSearchId.get( item.getProjectSearchId() );
				if ( perProjSearchItem == null ) {
					perProjSearchItem = new SearchDetails_ProjectPage_PerProjectSearchId_Item();
					perProjSearchItem.setProjectSearchId( item.getProjectSearchId() );
					resultsKeyProjectSearchId.put( item.getProjectSearchId(), perProjSearchItem );
				}
				List<SearchDetails_ProjectPage_Comment_Item> commentList = perProjSearchItem.getCommentList();
				if ( commentList == null ) {
					commentList = new ArrayList<>();
					perProjSearchItem.setCommentList( commentList );
				}
				String commentDate = simpleDateFormatComment.format( item.getTimestampLastUpdated() );
				SearchDetails_ProjectPage_Comment_Item comment_Item = new SearchDetails_ProjectPage_Comment_Item();
				commentList.add( comment_Item );
				comment_Item.setId( item.getId() );
				comment_Item.setCommentText( item.getCommentText() );
				comment_Item.setCommentDate( commentDate );
				if ( isProjectOwnerAllowed == IsProjectOwnerAllowed.YES
						|| ( isAssistantProjectOwnerAllowed == IsAssistantProjectOwnerAllowed.YES
								&& userId != null // Have Session User Id
								&& item.getUserIdCreated() != null 
								&& userId.intValue() == item.getUserIdCreated().intValue() )  ) {
					comment_Item.setCanEdit( true );
					comment_Item.setCanDelete( true );
				}
			}
			
		}
		
		//  Transfer map to result list
		List<SearchDetails_ProjectPage_PerProjectSearchId_Item> resultPerProjectSearchId = new ArrayList<>( resultsKeyProjectSearchId.size() );
		
		for ( Map.Entry<Integer, SearchDetails_ProjectPage_PerProjectSearchId_Item> entry : resultsKeyProjectSearchId.entrySet() ) {
			resultPerProjectSearchId.add( entry.getValue() );
		}

		
		//  For Comments SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

		result.setResultPerProjectSearchId( resultPerProjectSearchId );
		

		//  returned SearchDetails_ProjectPage_PerProjectSearchId_Result is also changed in webservice controller
		
		return result;
	}
	
}
