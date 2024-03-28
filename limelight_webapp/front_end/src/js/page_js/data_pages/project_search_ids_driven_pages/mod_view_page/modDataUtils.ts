import {UnlocalizedStartEnd} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modProteinSearchPeptideList_SubTableGenerator";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";

export class ModDataUtils {

    static getSearchNameForProjectSearchId(
        {
            projectSearchId,
            dataPageStateManager_DataFrom_Server
        } : {
            projectSearchId: number,
            dataPageStateManager_DataFrom_Server:DataPageStateManager
        }) {

        let projectSearchIdInt = projectSearchId;

        if ( ! limelight__variable_is_type_number_Check( projectSearchId ) ) {
            const projectSearchIdString = projectSearchId as unknown as string;
            const projectSearchIdInt = Number.parseInt( projectSearchIdString ); // projectSearchId is string

            if ( Number.isNaN( projectSearchIdInt ) ) {
                const msg = "getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): projectSearchId does not parse to int. projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }

            console.warn( "getSearchNameForProjectSearchId(...) projectSearchId param is declared number but is not a number ")
        }

        const projectSearchObject = dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId(projectSearchIdInt);

        if (!projectSearchObject) {
            const msg = "getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): No entry in searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root() for projectSearchIdInt: " + projectSearchIdInt;
            console.warn( msg );
            throw Error( msg );
        }

        const searchName = projectSearchObject.name;

        return searchName;
    }

    static getSearchShortNameForProjectSearchId(
        {
            projectSearchId,
            dataPageStateManager_DataFrom_Server
        } : {
            projectSearchId: number,
            dataPageStateManager_DataFrom_Server:DataPageStateManager
        }) {

        let projectSearchIdInt = projectSearchId;

        if ( ! limelight__variable_is_type_number_Check( projectSearchId ) ) {
            const projectSearchIdString = projectSearchId as unknown as string;
            const projectSearchIdInt = Number.parseInt( projectSearchIdString ); // projectSearchId is string

            if ( Number.isNaN( projectSearchIdInt ) ) {
                const msg = "getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): projectSearchId does not parse to int. projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }

            console.warn( "getSearchNameForProjectSearchId(...) projectSearchId param is declared number but is not a number ")
        }

        const projectSearchObject = dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId(projectSearchIdInt);

        if (!projectSearchObject) {
            const msg = "getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): No entry in searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root() for projectSearchIdInt: " + projectSearchIdInt;
            console.warn( msg );
            throw Error( msg );
        }

        const searchShortName = projectSearchObject.searchShortName;

        return searchShortName;
    }

    static getSearchShortNameXorSearchIdForProjectSearchId(
        {
            projectSearchId,
            dataPageStateManager_DataFrom_Server
        } : {
            projectSearchId: number,
            dataPageStateManager_DataFrom_Server:DataPageStateManager
        }) {

        let projectSearchIdInt = projectSearchId;

        if ( ! limelight__variable_is_type_number_Check( projectSearchId ) ) {
            const projectSearchIdString = projectSearchId as unknown as string;
            const projectSearchIdInt = Number.parseInt( projectSearchIdString ); // projectSearchId is string

            if ( Number.isNaN( projectSearchIdInt ) ) {
                const msg = "getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): projectSearchId does not parse to int. projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }

            console.warn( "getSearchNameForProjectSearchId(...) projectSearchId param is declared number but is not a number ")
        }

        const projectSearchObject = dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId(projectSearchIdInt);

        if (!projectSearchObject) {
            const msg = "getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): No entry in searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root() for projectSearchIdInt: " + projectSearchIdInt;
            console.warn( msg );
            throw Error( msg );
        }

        const searchShortName = projectSearchObject.searchLabel__SearchShortName_OR_SearchId;

        return searchShortName;
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