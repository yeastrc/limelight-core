<%--
		top_of_every_page_doctype__jsp_cache_directives.jsp

--%>


<%
response.setHeader("Pragma", "No-cache");
response.setHeader("Cache-Control","no-cache");
response.setDateHeader("Expires", 0);
response.addHeader("Cache-control", "no-store"); // tell proxy not to cache
response.addHeader("Cache-control", "max-age=0"); // stale right away

//  Anti-clickjacking. These MUST be response headers -- both X-Frame-Options and the CSP
//  'frame-ancestors' directive are IGNORED when delivered via a <meta> tag (the main CSP is a
//  <meta> in head_section_include_every_page.jsp, so it cannot carry frame-ancestors). Limelight is
//  a stand-alone app and is never meant to be embedded in another site, so restrict framing to
//  same-origin. Verify the header arrives via browser DevTools -> Network -> (page) -> Response Headers.
response.setHeader("X-Frame-Options", "SAMEORIGIN"); // broad/legacy browser support
//  Modern equivalent. A separate CSP policy containing ONLY frame-ancestors -- it adds frame-ancestors
//  enforcement without affecting the main <meta> CSP (each delivered CSP policy is enforced independently).
response.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
%>

<%--
	HTML5 DOCTYPE
	
	The DOCTYPE is partially put in to make IE not go into quirks mode (the default when there is no DOCTYPE).

--%>

<!DOCTYPE html>

