import {UnlocalizedStartEnd} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinSearchPeptideList_SubTableGenerator";

export class ModDataUtils {

    static getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}) {

        const projectSearchIdInt = Number.parseInt( projectSearchId ); // projectSearchId is string

        if ( Number.isNaN( projectSearchIdInt ) ) {
            const msg = "getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): projectSearchId does not parse to int. projectSearchId: " + projectSearchId;
            console.warn( msg );
            throw Error( msg );
        }

        const searchNameObject = searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap().get( projectSearchIdInt );
        if ( ! searchNameObject ) {
            const msg = "getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): No entry in searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap() for projectSearchIdInt: " + projectSearchIdInt;
            console.warn( msg );
            throw Error( msg );
        }

        const searchName = searchNameObject.name;

        return searchName;
    }

    static compressUnlocalizedRanges(unlocalizedRanges:Array<UnlocalizedStartEnd>):Array<UnlocalizedStartEnd> {

        unlocalizedRanges.sort( function(a, b):number {
            if(a.start === b.start) {
                return a.end - b.end;
            }

            return a.start - b.start;
        });

        const retArray:Array<UnlocalizedStartEnd> = new Array();

        for(const loc of unlocalizedRanges) {
            if(retArray.length === 0) {
                retArray.push(loc);
            } else {

                if(loc.start <= retArray[retArray.length - 1].end) {
                    const start = retArray[retArray.length - 1].start;
                    const end = loc.end;

                    retArray.pop();
                    retArray.push(new UnlocalizedStartEnd({start, end}));
                } else {
                    retArray.push(loc);
                }
            }
        }

        return retArray;
    }


}