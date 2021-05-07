<%--   projectView_SearchList.jsp

	Page Section:   Search List
--%>
<%@ page import="org.yeastrc.limelight.limelight_webapp.constants.ProjectSearchId_Based_Pages_Constants" %>
<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>

<div class="top-level-container selector_collapsable_container" >

	<div  class="collapsable-link-container top-level-collapsable-link-container selector_collapsable_link_container" style="">
		<img  src="static/images/pointer-down.png"
			class=" icon-large fake-link-image top-level-collapsable-link selector_collapsable_collapse_link">
		<img  src="static/images/pointer-right.png" 
			class=" icon-large fake-link-image top-level-collapsable-link selector_collapsable_expand_link" style="display: none;">
	</div>

	<div class="top-level-label">
	
		<div style=" display: grid; grid-template-columns: min-content min-content; ">
		
			<%--  2 column grid --%>

		  <div style=" white-space: nowrap ">  <%--  column 1 --%>
		  
			  Explore Search Results
		  </div>
		  
  		  <div class="top-level-label-help-tip-symbol">  <%--  column 2  --%>
		  		
		  		<p class="top-level-label-help-tip-actual"> <%--  Displayed on hover of ? --%>
		  			View the results and associated metadata for each search uploaded to the project.
		  		</p>
		  </div>
		</div>
			  
	</div>
	
	<div class="top-level-label-bottom-border" ></div>
	
	<script type="text/text" id="project_search_id_code_block_start_end_identifier_strings"><%= ProjectSearchId_Based_Pages_Constants.PROJECT_SEARCH_ID_CODE_BLOCK_START_END_IDENTIFIER_STRINGS %></script>
	<script type="text/text" id="project_search_id_code_separator"><%= ProjectSearchId_Based_Pages_Constants.PROJECT_SEARCH_ID_CODE_SEPARATOR %></script>
	

		<%-- Left align search text with 'Title' in Project Info so 40(pos of Title) - 16(width of cell for icon) --%>
	<div class="  selector_collapsable_item" style="margin-left: 26px;">
	
			<%--  This contains the Search List with buttons above and below --%>
		<div id="explore_data_section__contents_block"></div>
		
			<%--  This contains the Organize Searches Block --%>
		<div id="explore_data_section__organize_searches__contents_block"></div>
		
  	</div>
  	
</div>
