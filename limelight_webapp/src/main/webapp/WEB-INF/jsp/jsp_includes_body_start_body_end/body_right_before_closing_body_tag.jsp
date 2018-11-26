<%--
	body_right_before_closing_body_tag.jsp
	
	Add right before the </body> to add any last things to the page
--%>

<%@ include file="/WEB-INF/jsp/jsp_includes_taglib_imports/taglibImport.jsp" %>



	<%--  Add Google Analytics if a tracking code is in the config  --%>
  <c:if test="${ not empty configSystemValues.googleAnalyticsTrackingCode }">
  
  	<script id="google_analytics_tracking_code" type="text/text"><c:out value="${ configSystemValues.googleAnalyticsTrackingCode }" escapeXml="false"></c:out></script>
	<script type="text/javascript" src="static/js/page_js/mainPages_GoogleAnalytics.js"></script>
  </c:if>
  