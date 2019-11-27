/**
 * proteinViewPage_DisplayData_SingleSearch_ImportHandlebarsTemplates.js
 * 
 *  Import Handlebars Templates for proteinViewPage_DisplayData_SingleSearch.ts
 * 
 */


let Handlebars = require('handlebars/runtime');

//  for DataTable
const _common_template_bundle = require("../../../../../../../handlebars_templates_precompiled/common/common_template-bundle.js" );

let _protein_table_template_bundle = require("../../../../../../../handlebars_templates_precompiled/protein_page/protein_page_single_search_template-bundle.js" );

export { Handlebars, _common_template_bundle, _protein_table_template_bundle }
