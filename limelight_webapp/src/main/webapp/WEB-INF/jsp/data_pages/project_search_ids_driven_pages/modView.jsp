<%--
	modView.jsp
	
	View mods for a project search or multiple

// String path = request.getContextPath();
// String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
--%><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/pageEncodingDirective.jsp" %> <%-- Put on Every Page --%>


<%@ include file="/WEB-INF/jsp/jsp_includes_head_section/top_of_every_page_doctype__jsp_cache_directives.jsp" %>

<html>
<head>
	<title><%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_title_start.jsp" 
				%> Mod</title>
	
	<script id="controller_path" type="text/text"><%= AA_PageControllerPaths_Constants.MOD_VIEW_PAGE_CONTROLLER %></script>
	
 <%@ include file="/WEB-INF/jsp/jsp_includes_head_section/head_section_include_data_pages.jsp" %> 

</head>
<body class=" <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_standard_header_pages.jsp" 
		  		%><%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_tag_class_start_include_data_pages.jsp" 
				%> mod-page ">

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_body_tag_start_include_data_pages.jsp" %>

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/header_main_pages.jsp" %>

   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_after_header_include_data_pages.jsp" %>

	<!--  Navigation Links --> <%--  Contents inserted by Javascript --%>
	<div id="data_pages_nav_links_page_container" ></div>

	<h1>
		Modifications View
	</h1>
	
	<%--  Search Details and Filters (PSM, Peptide, and Protein).  Also Buttons underneath for Save Default, Save View, Share Page --%>
	<div id="search_details_and_other_filters_outer_block_react_root_container"></div>


	<%-- Initial Loading message.  Removed from DOM during initial Javascript processing --%>
    <div id="mod_list_loading_data_container">
  
	  <h2 id="loading-message">Loading modification data...</h2>
 	
    </div>
  
    <div>
    	<%--  Main Data displayed --%>
    
    	<%-- The Options form above the visualization.    NEVER call .empty() on it --%>
       <div id="data_viz_options__outer_container"></div>
       
       <%-- 
       			The visualization graphic "Selection Text" AND "Clear Selection" link.  This is for selections IN the visualization graphic.
       			NEVER call .empty() on it 
	   --%>
       <div id="data_viz_selections__text_and_clear_link__outer_container"></div>
       
       <%--  The visualization graphic --%>
       
       <div style="position: relative; display: inline-block;"> <%-- inline-block; so as wide as contained elements --%>
       
            <div style="position: relative; display: inline-block;"> <%-- inline-block; so as wide as contained elements --%>
       
	   			<div id="data-viz-container"></div>
	   			
	   			<%--
	   			<div style="position: absolute; left: 10px; top: 10px; width: max-content; height: 10px;">
	   				<span class="fake-link">Reset selection</span>
	   			</div>
	   			--%>
   			</div>
		   
			<%--Data Table below the graphic --%>
	       <div >
		       <div id="data-table-container-container" style="display: none;"> <%--  id for show/hide.  NEVER call .empty() on it --%>
		       
				    <div style="margin-top:15px;margin-bottom:5px;">
				        <span style="font-size:16pt;">Modification List</span>
				        <span style="font-size:12pt;">(click row to view proteins)</span>
				    </div>
				    <%--  A React Root is attached to a child of this element.    NEVER call .empty() on it --%>
				    <div id="data-table-container"></div>
				</div>
	       </div>
  
	     <%-- 
	   		<div 
	   			id="data-viz-container-data-table-container-container--overlay-update-button"
	   			style="position: absolute; inset: 0; border-style: solid; border-width: 2px; border-color: red;"
	   			class=" standard-background-color "
	   		>
	   			<div style="margin-left: 30px; margin-top: 30px; ">
		   			<button>
		   				Update
		   			</button>
	   			</div>
	   		</div>
   		 --%>
   		 </div>
    </div>
  
   <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_footer_include_data_pages.jsp" %>

  <%@ include file="/WEB-INF/jsp/jsp_header_footer/footer_main.jsp" %>

 <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_closing_body_tag_include_data_pages.jsp" %>
 
  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_right_before_closing_body_tag.jsp" %>
  
  <%@ include file="/WEB-INF/jsp/jsp_includes_body_start_body_end/body_before_main_script_include__script_include_libs__page_header_js.jsp" %>
  
 	<%--  Determine which Javascript bundle to load based on user type --%>
  <c:choose>
    <c:when test="${ webSessionAuthAccessLevel.assistantProjectOwnerAllowed }">
	  	<%--  Project Owner or Researcher and Project is NOT locked --%>
	  <script type="text/javascript" src="static/js_generated_bundles/data_pages/modViewPage_RootLaunch_LoggedInUsers-bundle.js?x=${ cacheBustValue }"></script>
  	</c:when>
  	<c:otherwise>
	  	<%--  Public User or Project is Locked --%>
	  <script type="text/javascript" src="static/js_generated_bundles/data_pages/modViewPage_RootLaunch_PublicUser-bundle.js?x=${ cacheBustValue }"></script>
  	</c:otherwise>
  </c:choose>
		
</body>
</html>