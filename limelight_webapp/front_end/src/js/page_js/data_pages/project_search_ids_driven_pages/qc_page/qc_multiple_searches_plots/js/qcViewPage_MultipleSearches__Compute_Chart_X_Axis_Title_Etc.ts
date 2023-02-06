/**
 * qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc.ts
 *
 * QC Page Multiple Searches : Compute what the X Axis Title in the chart should be since sometimes it is the Search Short Name and sometimes it is the Search Id
 *
 */

import {SearchData_SearchName_Etc_Root__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";

/**
 *
 */
export class QcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc_Result {

    xAxisTitle: string
}

/**
 *
 * @param projectSearchIds
 * @param searchData_SearchName_Etc_Root
 */
export const qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc = function (
    {
        projectSearchIds, searchData_SearchName_Etc_Root
    } : {
        projectSearchIds: number[]
        searchData_SearchName_Etc_Root: SearchData_SearchName_Etc_Root__DataPageStateManagerEntry
    }
) : QcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc_Result {

    let all__searchLabel_FromSearchShortName = true;
    let all__searchLabel_FromSearchId = true

    for (const projectSearchId of projectSearchIds) {

        const searchData = searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId );
        if ( ! searchData ) {
            const msg = "searchNames_AsMap.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        if ( ! searchData.searchLabel_FromSearchShortName ) {
            all__searchLabel_FromSearchShortName = false
        }
        if ( ! searchData.searchLabel_FromSearchId ) {
            all__searchLabel_FromSearchId = false
        }
    }


    let xAxisTitle = "Search Label";

    if ( all__searchLabel_FromSearchShortName ) {

        xAxisTitle = "Search Label";

    } else if ( all__searchLabel_FromSearchId ) {

        xAxisTitle = "Search Number";
    }

    return { xAxisTitle }
}
