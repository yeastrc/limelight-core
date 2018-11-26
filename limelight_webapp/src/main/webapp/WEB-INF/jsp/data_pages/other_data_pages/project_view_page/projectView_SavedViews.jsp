<%--   projectView_SavedViews.jsp

	Page Section:   Saved Views
--%>

<div class="top-level-container selector_collapsable_container" >

	<div  class="collapsable-link-container top-level-collapsable-link-container selector_collapsable_link_container" style="">
		<img  src="static/images/pointer-down.png"
			class=" icon-large fake-link-image top-level-collapsable-link selector_collapsable_collapse_link">
		<img  src="static/images/pointer-right.png" 
			class=" icon-large fake-link-image top-level-collapsable-link selector_collapsable_expand_link" style="display: none;">
	</div>

	<div class="top-level-label">
	  Saved Views
	</div>
	
	<div class="top-level-label-bottom-border" ></div>

		<%-- Left align search text with 'Title' in Project Info so 40(pos of Title) - 16(width of cell for icon) --%>
	<div class="  selector_collapsable_item" style="margin-left: 26px;">
		
		<%-- 
		<div id="saved_views_list_above_block" style="margin-bottom: 10px;">
		</div>
		--%>
	
	  <div style="margin-bottom: 10px;">
	  
		<div id="saved_views_list" >
			Loading
		</div>
		
		<div id="saved_views_no_entries" style="display: none;">
			No Saved Views
		</div>	  
	  </div>


  	</div>
  	
</div>
