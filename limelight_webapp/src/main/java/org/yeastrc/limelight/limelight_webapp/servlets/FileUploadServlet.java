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
package org.yeastrc.limelight.limelight_webapp.servlets;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * Is called, so no issue co-existing with Spring MVC
 */
@WebServlet(name="FileUploadServlet", urlPatterns={"/data/fileUpload/*"})
public class FileUploadServlet extends HttpServlet {


	public static final int COPY_FILE_ARRAY_SIZE = 32 * 1024; // 32 KB

	private static final long serialVersionUID = 1L;

	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config); // required so getServletContext() works

	}
	
	/* (non-Javadoc)
	 * @see org.apache.struts.action.Action#execute(org.apache.struts.action.ActionMapping, org.apache.struts.action.ActionForm, javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	protected void doPost( HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse )
			throws ServletException, IOException {

//		String contextPath = httpServletRequest.getContextPath();
//		String basePath = httpServletRequest.getScheme()+"://"+httpServletRequest.getServerName()+":"+httpServletRequest.getServerPort()+contextPath+"/";
//		
//
//		String httpServletRequestURI = httpServletRequest.getRequestURI();
//		StringBuffer httpServletRequestURLSB = httpServletRequest.getRequestURL();
//		String httpServletRequestURL = httpServletRequestURLSB.toString();
//		
//		String queryString = httpServletRequest.getQueryString();
//		
//		ServletContext servletContext = getServletContext();
//		
//		Map<String,String[]> paramMap = httpServletRequest.getParameterMap();
//
//		long httpServletRequest_getContentLength = httpServletRequest.getContentLengthLong();
//		
//		//  Copy InputStream containing POST body into byte array
//		InputStream inputStreamFromPOSTLocal = httpServletRequest.getInputStream();
//		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream( httpServletRequest.getContentLength() );
//		byte[] buf = new byte[ COPY_FILE_ARRAY_SIZE ];
//		int len;
//		while ((len = inputStreamFromPOSTLocal.read(buf)) > 0){
//			byteArrayOutputStream.write(buf, 0, len);
//		}
//		byte[] postContents = byteArrayOutputStream.toByteArray();
//		
//		int x = 0;
//		
//		int z = 0;
		
	}
}
