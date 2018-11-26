/**
 * a_dataPagesCommonConstants.js
 * 
 * Javascript Common constants on every data page
 * 
 * 
 */


const _PATH_SEPARATOR = "/";

const _STANDARD_PAGE_STATE_IDENTIFIER = 'q';

const _REFERRER_PATH_STRING = "r"; // Must match Server value and what is placed in URLs in templates

const _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR = _PATH_SEPARATOR + _REFERRER_PATH_STRING;


export { _PATH_SEPARATOR, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR };
