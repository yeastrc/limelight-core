<%--  

	footer_main.jsp    /WEB-INF/jsp/jsp_header_footer/footer_main.jsp

	This is included in every page 
--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

	<div class="footer-outer-container" id="footer_outer_container_div">
	
		<%--  Footer contents left edge --%>
		<div class="footer-left-container">
			
			<div class="footer-left-container-image-outer-container">
				<img id="footer-logo-img" src="static/images/header-footer-logo.png">
			</div>
			
			<div class="footer-left-container-version-outer-container">
			
				<div class="footer-left-container-version-inner-container">
					<span><a 
								target="_blank"
								rel="noopener noreferrer"
								title="Limelight Releases"
								href="https://github.com/yeastrc/limelight-core/releases">Release</a>: </span>
								
					<span>
						<c:choose>
							<c:when test="${ not empty Webapp_VersionAndGitInfo_FromBuild.limelightRelease_Tag_EnvironmentVariableValue_OrDefault }">
								
								<c:choose>
									<c:when test="${ not empty Webapp_VersionAndGitInfo_FromBuild.limelightRelease_URL_EnvironmentVariableValue_OrDefault }">
										
										<c:choose>
											<c:when test="${ not empty Webapp_VersionAndGitInfo_FromBuild.limelightRelease_TooltipText_EnvironmentVariableValue_OrDefault }">
												<a 
													target="_blank"
													rel="noopener noreferrer"
													href="${ Webapp_VersionAndGitInfo_FromBuild.limelightRelease_URL_EnvironmentVariableValue_OrDefault }"
													title="<c:out value="${ Webapp_VersionAndGitInfo_FromBuild.limelightRelease_TooltipText_EnvironmentVariableValue_OrDefault }"></c:out>"
												><c:out value="${ Webapp_VersionAndGitInfo_FromBuild.limelightRelease_Tag_EnvironmentVariableValue_OrDefault }"></c:out></a>
											</c:when>
											<c:otherwise>
												<a 
													target="_blank"
													rel="noopener noreferrer"
													href="${ Webapp_VersionAndGitInfo_FromBuild.limelightRelease_URL_EnvironmentVariableValue_OrDefault }"
												><c:out value="${ Webapp_VersionAndGitInfo_FromBuild.limelightRelease_Tag_EnvironmentVariableValue_OrDefault }"></c:out></a>
											</c:otherwise>
										</c:choose>
									</c:when>
									<c:otherwise>
										<c:out value="${ Webapp_VersionAndGitInfo_FromBuild.limelightRelease_Tag_EnvironmentVariableValue_OrDefault }"></c:out>
									</c:otherwise>
								</c:choose>
							</c:when>
							<c:when test="${ not empty Webapp_VersionAndGitInfo_FromBuild.repo_Tag_Name_From_GIT }">
								<a 
									target="_blank"
									rel="noopener noreferrer"
									title="GIT tag of current Limelight web application"
									href="https://github.com/yeastrc/limelight-core/releases/tag/<c:out value="${ Webapp_VersionAndGitInfo_FromBuild.repo_Tag_Name_From_GIT }"></c:out>">
									<c:out value="${ Webapp_VersionAndGitInfo_FromBuild.repo_Tag_Name_From_GIT }"></c:out>
								</a>
							</c:when>
							<c:otherwise>
								<a 
									target="_blank"
									rel="noopener noreferrer"
									title="GIT commit of current Limelight web application"
									href="https://github.com/yeastrc/limelight-core/commit/<c:out value="${ Webapp_VersionAndGitInfo_FromBuild.repo_Hash_Full_From_GIT }"></c:out>">
									<c:out value="${ Webapp_VersionAndGitInfo_FromBuild.repo_Hash_Short_From_GIT }"></c:out>
								</a>
							</c:otherwise>
						
						</c:choose>
					</span>
				</div>
			</div>
		</div>
		
		<%--  Footer contents right edge --%>
		<div class="footer-right-container">
			&copy; 2026 University of Washington
			<%--
				When Add Terms of Service, update link to page
			
			 --%>
			<%--
			<c:if test="${ configSystemValues.termsOfServiceEnabled }">
				(<a href="XXXXXX" target="terms_of_service" >Terms of Service</a>)
			</c:if>			
			 --%>
		</div>
		
		<%--  Footer contents center --%>
		<div class="footer-center-outer-container">
		  <div class="footer-center-container" >
			<%--  'id' used by manage configuration to update this div with admin entered data --%>
			<div id="footer_center_container" >
				<c:out value="${ configSystemValues.footerCenterOfPageHTML }" escapeXml="false"></c:out>
			</div>
		  </div>
		</div>
	
	</div>
	
	