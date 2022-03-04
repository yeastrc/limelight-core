/**
 * limelight__Encode_TextString_Escaping_HTML.js
 *
 * Javascript  to encode a Text String Escaping HTML - Uses Handlebars
 *
 */


import _common_template_bundle =
    require("../../../../handlebars_templates_precompiled/common/common_template-bundle.js" );

/**
 * encode a Text String Escaping HTML - Uses Handlebars
 * @param text
 */
export const limelight__Encode_TextString_Escaping_HTML = function (text: string) : string {

    const text_HTMLEncoded = _common_template_bundle.genericSingleValueOnly({ value: text });

    return text_HTMLEncoded;
}