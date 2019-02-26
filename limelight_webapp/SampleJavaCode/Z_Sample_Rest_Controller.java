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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controllers;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Sample with POST and convert response to byte[] for caching
 *
 */

@RestController
public class Z_Sample_Rest_Controller {
  
	private static final Logger log = LoggerFactory.getLogger();

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;
	
    /**
	 * 
	 */
	public Z_Sample_Rest_Controller() {
		super();
//		log.warn( "constructor no params called" );
	}
	
	//  Convert JSON to byte[] so can cache it

	//  These 2 annotations work the same
	
	@PostMapping( path = AA_RestWSControllerPaths_Constants.XXXXXXXX_REST_WEBSERVICE_CONTROLLER,
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.XXXXXXXXX_REST_WEBSERVICE_CONTROLLER,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  projectList(
    		@RequestBody ProjectListRequest projectListRequest,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
//    		@RequestBody LoginForm loginForm
    		) throws IOException {
//		log.warn( "projectList(...) called" );
		
		List<ProjectItem> projectList = new ArrayList<>();
		
		ProjectItem projectItem = new ProjectItem();
		projectItem.id = 1;
		projectItem.name = "ss";
		projectList.add( projectItem );
		
		ProjectListResult projectListResult = new ProjectListResult();
		projectListResult.projectList = projectList;
		
		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( projectListResult );
	    return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );
    }
    

	
    public static class ProjectListRequest {
    	//  No params
    }
    
    public static class ProjectListResult {
    	List<ProjectItem> projectList;

		public List<ProjectItem> getProjectList() {
			return projectList;
		}

		public void setProjectList(List<ProjectItem> projectList) {
			this.projectList = projectList;
		}
    }
    
    public static class ProjectItem {
    	int id;
    	String name;
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
    	
    }

}


