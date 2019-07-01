<%--
	data_pages_navigation_links.jsp
	
	Included on Data Pages Header In: head_section_include_data_pages.jsp
	
	  (inside <script type="text/text" id="page_navigation_links_template">)

--%>

<%@page import="org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.page_controllers.AA_PageControllerPaths_Constants"%>

<div id="data_pages_nav_links_outer_container" style="display: none;">

  <span class=" selector_nav_link_outer_container">
	[<a class=" selector_nav_link  selector_tool_tip_attached" data-tooltip="View peptides"
		data-nav_link_base_url="<%= AA_PageControllerPaths_Constants.PEPTIDE_VIEW_PAGE_CONTROLLER %>" 
<%-- uncomment when multiple Project Search Ids supported
		data-supports_multiple_project_search_ids="true"
--%>
		href=""
		>Peptide View</a>]</span>

  <span class=" selector_nav_link_outer_container">
	[<a class=" selector_nav_link  selector_tool_tip_attached" data-tooltip="View proteins"
		data-nav_link_base_url="<%= AA_PageControllerPaths_Constants.PROTEIN_VIEW_PAGE_CONTROLLER %>" 
<%-- uncomment when multiple Project Search Ids supported
		data-supports_multiple_project_search_ids="true"
--%>
		href=""
		>Proteins View</a>]</span>

  <span class=" selector_nav_link_outer_container">
	[<a class=" selector_nav_link  selector_tool_tip_attached" data-tooltip="View modifications"
		data-nav_link_base_url="<%= AA_PageControllerPaths_Constants.MOD_VIEW_PAGE_CONTROLLER %>" 
<%-- uncomment when multiple Project Search Ids supported
		data-supports_multiple_project_search_ids="true"
--%>
		href=""
		>Modifications View</a>]</span>
		
</div>
