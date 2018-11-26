<%--   projectView_SearchList.jsp

	Page Section:   Search List
--%>

<div class="top-level-container selector_collapsable_container" >

	<div  class="collapsable-link-container top-level-collapsable-link-container selector_collapsable_link_container" style="">
		<img  src="static/images/pointer-down.png"
			class=" icon-large fake-link-image top-level-collapsable-link selector_collapsable_collapse_link">
		<img  src="static/images/pointer-right.png" 
			class=" icon-large fake-link-image top-level-collapsable-link selector_collapsable_expand_link" style="display: none;">
	</div>

	<div class="top-level-label">
	  Explore Data
	</div>
	
	<div class="top-level-label-bottom-border" ></div>

		<%-- Left align search text with 'Title' in Project Info so 40(pos of Title) - 16(width of cell for icon) --%>
	<div class="  selector_collapsable_item" style="margin-left: 26px;">
		
		<div id="search_list_above_block" style="margin-bottom: 10px;">
		</div>
	
		<div id="search_list" style="margin-bottom: 10px;">
		</div>
	  
	  <%--  Uncomment when uncomment any of the Merge Buttons just below this
		<div id="need_2_or_more_searches_selected_to_merge_msg" style="display: none;">
	  		Need 2 or more searches selected to merge.
		</div>
	  --%>
	  	<div >
		  <%--  Not implemented on Peptide Page yet 
			<input type="button" value="Merge Peptide View" id="merge_peptide_view_button" class=" merge_searches_button_jq ">
		  --%>
		  <%--  Not implemented on Protein Page yet 
			<input type="button" value="Merge Protein View" id="merge_protein_view_button" class=" merge_searches_button_jq ">
		  --%>
		  <%--  Not implemented on Mod Page yet 		  --%>
			<input type="button" value="Merge Mod View" id="merge_mod_view_button" class=" merge_searches_button_jq ">

		</div>
  	</div>
  	
</div>
