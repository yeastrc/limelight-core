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
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightErrorDataInWebRequestException;
import org.yeastrc.limelight.limelight_webapp.searchers.ProjectIdsForProjectSearchIdsSearcherIF;

/**
 * 
 *
 */
@Component
public class Get_ProjectIds_For_ProjectSearchIds_Service implements Get_ProjectIds_For_ProjectSearchIds_ServiceIF {

	private static final Logger log = LoggerFactory.getLogger( Get_ProjectIds_For_ProjectSearchIds_Service.class );
	
	@Autowired
	private ProjectIdsForProjectSearchIdsSearcherIF projectIdsForProjectSearchIdsSearcher;
	
	/**
	 * @param projectSearchIds
	 * @return
	 * @throws SQLException 
	 */
	@Override
	public List<Integer> get_ProjectIds_For_ProjectSearchIds_Service( List<Integer> projectSearchIds ) throws SQLException {

		Map<Integer,Integer> projectIdMap_Key_ProjectSearchId = projectIdsForProjectSearchIdsSearcher.getProjectIdMappingForProjectSearchIds( projectSearchIds );

		if ( projectIdMap_Key_ProjectSearchId.isEmpty() ) {
//			String msg = "No projectIds found. projectsearchIds: " + projectSearchIds;
//			log.warn( msg );
//			throw new LimelightErrorDataInWebRequestException( msg );
			return new ArrayList<>();
		}
		
		Set<Integer> projectIdsSet = new HashSet<>();
		
		for ( Integer projectSearchId : projectSearchIds ) {
			Integer projectIdForProjectSearchId = projectIdMap_Key_ProjectSearchId.get( projectSearchId );
			if ( projectIdForProjectSearchId == null ) {
				String msg = "projectsearchId not found in database: " + projectSearchId;
				log.warn( msg );
				throw new LimelightErrorDataInWebRequestException( msg );
			}
			projectIdsSet.add( projectIdForProjectSearchId );
		}
		
		List<Integer> projectIds = new ArrayList<>( projectIdsSet );
		
		return projectIds;
	}
}
