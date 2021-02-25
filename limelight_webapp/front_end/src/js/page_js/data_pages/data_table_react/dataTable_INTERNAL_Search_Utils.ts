/**
 *  dataTable_INTERNAL_Search_Utils.ts
 *
 *  DataTable INTERNAL Search Utils
 */

//  !!!   At bottom of file:  export class DataTable_INTERNAL_Search_Utils{  ...  }

/**
 * Change Character String case for searching so have consistent lower case in the Character String searching with and Character String to be searched
 * @param text
 */
const search_ChangeCharacterStringCase_ForSearching = function (text : string ) : string {

    return text.toLocaleLowerCase();
}

/**
 *
 */
export class DataTable_INTERNAL_Search_Utils {

    static search_ChangeCharacterStringCase_ForSearching = search_ChangeCharacterStringCase_ForSearching
}
