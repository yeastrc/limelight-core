/**
 * modPage_CompressUnlocalizedRanges.ts
 */
import {
    ModPage_Mod_Unlocalized_StartEnd_ContainerClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModPage_Mod_Unlocalized_StartEnd_ContainerClass";

/**
 *
 * @param unlocalizedRanges
 *
 * FROM:  ModDataUtils.compressUnlocalizedRanges
 */
export const modPage_CompressUnlocalizedRanges = function (unlocalizedRanges:Array<ModPage_Mod_Unlocalized_StartEnd_ContainerClass>):Array<ModPage_Mod_Unlocalized_StartEnd_ContainerClass> {

    unlocalizedRanges.sort( function(a, b):number {
        if(a.start === b.start) {
            return a.end - b.end;
        }

        return a.start - b.start;
    });

    const retArray:Array<ModPage_Mod_Unlocalized_StartEnd_ContainerClass> = new Array();

for(const loc of unlocalizedRanges) {
    if(retArray.length === 0) {
        retArray.push(loc);
    } else {

        if(loc.start <= retArray[retArray.length - 1].end) {
            const start = retArray[retArray.length - 1].start;
            const end = loc.end;

            retArray.pop();
            retArray.push(new ModPage_Mod_Unlocalized_StartEnd_ContainerClass({start, end}));
        } else {
            retArray.push(loc);
        }
    }
}

return retArray;
}
