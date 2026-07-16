/**
 * sanitizeURL_ForHrefOrNavigation.ts
 *
 * URL sanitization to defend against DOM-based XSS via javascript:/data:/vbscript:
 * URLs, and against open redirects. Use before placing a NON-hardcoded URL into an
 * <a href> / element .src, or before navigating to it (window.location.href /
 * window.open). Hardcoded / app-constant URLs do not need this.
 *
 * Two entry points:
 *   - __ExternalLinkSafeUrlOrNull : for USER-PROVIDED external links (e.g. search web
 *       links). Allows http/https absolute URLs and same-origin URLs; rejects
 *       javascript:, data:, vbscript:, file:, etc.
 *   - __SameOriginSafeUrlOrNull   : for APP-INTERNAL navigation (redirect-after-login,
 *       saved views). Allows ONLY same-origin / relative URLs -- this also blocks open
 *       redirects to other origins, not just script-URL schemes.
 *
 * Both return the original (trimmed) url string when safe, or null when not. The caller
 * decides the fallback (drop the link, or navigate to a safe default).
 *
 * Robustness: parsing uses the WHATWG URL constructor (new URL(url, base)), which mirrors
 * the browser's own URL parsing -- including stripping the tab/newline and leading control
 * characters used to obfuscate schemes like "java\tscript:alert(1)". A plain regex scheme
 * check would miss those.
 */

//  Absolute-URL schemes permitted for USER-PROVIDED external links.
const _ALLOWED_EXTERNAL_SCHEMES : string[] = [ "http:", "https:" ];

/**
 * For a user-provided EXTERNAL link rendered into an <a href> (e.g. search web links).
 * @return the trimmed url if it is http/https or resolves same-origin; else null.
 */
export const sanitizeURL_ForHrefOrNavigation__ExternalLinkSafeUrlOrNull = function( url : string ) : string | null {
	return _safeUrlOrNull( url, /* allowExternalHttp */ true );
}

/**
 * For NAVIGATING to an app-internal URL (redirect-after-login, saved views). Same-origin
 * / relative only -- blocks both javascript:-style XSS and open redirects to other origins.
 * @return the trimmed url if it resolves same-origin; else null.
 */
export const sanitizeURL_ForHrefOrNavigation__SameOriginSafeUrlOrNull = function( url : string ) : string | null {
	return _safeUrlOrNull( url, /* allowExternalHttp */ false );
}

/**
 *
 */
const _safeUrlOrNull = function( url : string, allowExternalHttp : boolean ) : string | null {

	if ( url === undefined || url === null ) {
		return null;
	}
	const trimmed = url.trim();
	if ( trimmed === "" ) {
		return null;
	}

	let parsed : URL = null;
	try {
		//  Resolve relative to the current page so relative URLs are accepted; the URL parser
		//  also strips the tab/newline/leading-control-chars that are used to obfuscate schemes.
		parsed = new URL( trimmed, window.location.href );
	} catch ( e ) {
		return null;  //  unparseable -> reject
	}

	if ( parsed.origin === window.location.origin ) {
		//  Same-origin (only reachable with an http(s) scheme). Safe for href and navigation.
		return trimmed;
	}

	//  Off-origin, or an opaque-origin scheme (mailto:, javascript:, data:, vbscript:, ...).

	if ( ! allowExternalHttp ) {
		_logBlocked( trimmed, "not same-origin" );
		return null;
	}

	const protocol = parsed.protocol.toLowerCase();
	if ( _ALLOWED_EXTERNAL_SCHEMES.indexOf( protocol ) !== -1 ) {
		return trimmed;
	}

	_logBlocked( trimmed, "disallowed scheme '" + protocol + "'" );
	return null;
}

/**
 *  Developer aid only (never the user's only channel). Helps diagnose why a URL was blocked.
 */
const _logBlocked = function( url : string, reason : string ) : void {
	try {
		console.warn( "sanitizeURL_ForHrefOrNavigation: blocked URL (" + reason + "): " + url );
	} catch ( e ) {
		//  ignore
	}
}
