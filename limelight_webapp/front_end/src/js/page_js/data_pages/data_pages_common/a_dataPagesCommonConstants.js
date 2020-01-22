/**
 * a_dataPagesCommonConstants.js
 * 
 * Javascript Common constants on every data page
 * 
 * 
 */


const _PATH_SEPARATOR = "/";

const _EXPERIMENT_ID_IDENTIFIER = 'e';

const _SEARCH_DATA_LOOKUP_PARAMETERS_CODE_IDENTIFIER = 'c';  //  Only for Experiment Id based pages

const _STANDARD_PAGE_STATE_IDENTIFIER = 'q';

const _REFERRER_PATH_STRING = "r"; // Must match Server value and what is placed in URLs in templates

const _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR = _PATH_SEPARATOR + _REFERRER_PATH_STRING;


export { _PATH_SEPARATOR, _EXPERIMENT_ID_IDENTIFIER, _SEARCH_DATA_LOOKUP_PARAMETERS_CODE_IDENTIFIER, _STANDARD_PAGE_STATE_IDENTIFIER, _REFERRER_PATH_STRING, _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR };
