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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.dao;

import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;

/**
 * 
 *
 */
@Component
public class ProjectDAO {

	private static final Logger log = LoggerFactory.getLogger();
	
	@Autowired
	private JdbcTemplate jdbcTemplate;


	/**
	 * @param id
	 * @return
	 */
	public ProjectDTO getForId( int id ) {
		
		final String querySQL = "SELECT id, title FROM project_tbl WHERE id = ?";
		
		Object[] bindVariablesParams = new Object[] { id };
		
		List<ProjectDTO> projectList = 
				jdbcTemplate.query( 
						querySQL, 
						bindVariablesParams,
						new ProjectTableRowMapper() );

		if ( projectList.isEmpty() ) {
			return null;
		}
		
		return projectList.get( 0 );
	}


	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}


	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	

	//  Equivalent Straight JDBC:
	
//	private void runQueryJDBC() throws SQLException {
//		
//		log.info( "runQueryJDBC()" );
//		
//		List<Project> projects = new ArrayList<>();
//		
//		final String querySQL = "SELECT id, title FROM project_tbl WHERE title = ?";
//		
//		DataSource ds = jdbcTemplate.getDataSource();
//		
//		try (Connection connection = ds.getConnection();
//			     PreparedStatement statement = connection.prepareStatement( querySQL ) ){
//			    	 
//			statement.setString( 1, "ss" );
//			try ( ResultSet rs = statement.executeQuery() ) {
//				while ( rs.next() ) {
//					Project project = new Project();
//					project.setId(rs.getInt("id"));
//					project.setTitle(rs.getString("title"));
//					projects.add(project);
//				}
//			}
//			
//		}
//
//	}
	


}
