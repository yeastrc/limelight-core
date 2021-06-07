<%--   projectView_ExperimentList.jsp

	Page Section:   Experiment List
--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>
	
	
<c:if test="${ showExperimentsBlock }">

	<%--  If <script > is NOT present, then there is no Experiments block and JS will skip processing --%>
	<script type="text/text" id="experiments_section_block_shown">Y</script>

<div id="experiments_section__top_level_block"
	class="top-level-container selector_collapsable_container"
	style="display: none;" >

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
		  
			  Experiments
		  </div>
		  
  		  <div class="project-page--top-level-label-help-tip-symbol">  <%--  column 2  --%>
		  		
		  		<p class="top-level-label-help-tip-actual"> <%--  Displayed on hover of ? --%>
		  			Experiments allow you to define a structure for your searches, 
		  			including conditions, timepoints, and replicates; 
		  			and provides appropriate default views of the data.
		  		</p>
		  </div>
		</div>
	</div>
	
	<div class="top-level-label-bottom-border" ></div>

		<%-- Left align search text with 'Title' in Project Info so 40(pos of Title) - 16(width of cell for icon) --%>
	<div class="  selector_collapsable_item" style="margin-left: 26px;">
	
			<%--  This contains the Experiments List with buttons above and below --%>
		<div id="experiments_section__contents_block"></div>
		
			<%--  This contains a Single Experiment For New or Maintenance  --%>
		<div id="experiments_section_single_experiment_maint_content_block"></div>
		
  	</div>
  	
</div>

</c:if>

