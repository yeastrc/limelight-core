<%--   projectView_SavedViews.jsp

	Page Section:   Highlighted Results: Previously Known as: Saved Views
--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>
	
	
<c:if test="${ showSavedViewsBlock }">

	<%--  If <script > is NOT present, then there is no 'Highlighted Results' (AKA saved views) block and JS will skip processing --%>
	<script type="text/text" id="saved_views_block_shown">Y</script>

<div class="top-level-container selector_collapsable_container" >

	<div  class="collapsable-link-container top-level-collapsable-link-container selector_collapsable_link_container" style="">
		<img  src="static/images/pointer-down.png"
			class=" icon-large fake-link-image top-level-collapsable-link selector_collapsable_collapse_link">
		<img  src="static/images/pointer-right.png" 
			class=" icon-large fake-link-image top-level-collapsable-link selector_collapsable_expand_link" style="display: none;">
	</div>

	<div class="top-level-label"> <%--  (AKA saved views) --%>
	
		<div style=" display: grid; grid-template-columns: min-content min-content; ">
		
			<%--  2 column grid --%>

		  <div style=" white-space: nowrap ">  <%--  column 1 --%>
		  
	  		Highlighted Results
  		 </div>
		  
  		  <div class="top-level-label-help-tip-symbol">  <%--  column 2  --%>
		  		
		  		<p class="top-level-label-help-tip-actual"> <%--  Displayed on hover of ? --%>
		  			Links to views of data in Limelight that the project owner wishes to highlight.
		  		</p>
		  </div>
		</div>
			
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
			No Highlighted Results
		</div>	  
	  </div>


  	</div>
  	
</div>

</c:if>

