/**
 * modPage_Get_Protein_NamesAndDescriptions_UTIL.ts
 */



import {
    CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters";


export class ModPage_Get_Protein_NamesAndDescriptions_UTIL_Result {

    proteinNames_AndDescriptions_Array_Entry_ProteinName_ProteinDescription_Pair: ReadonlyArray<{
        readonly proteinName: string
        readonly proteinDescription: string
    }>
}

/**
 *
 *
 */
export const modPage_Get_Protein_NamesAndDescriptions_UTIL = function (
    {
        proteinSequenceVersionId,
        projectSearchIds,
        proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId
    }: {
        proteinSequenceVersionId: number
        projectSearchIds: Array<number>
        proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder>
    }) : ModPage_Get_Protein_NamesAndDescriptions_UTIL_Result
{

    const internal_ProteinName_ProteinDescription_Accumulate_Root: INTERNAL_ProteinName_ProteinDescription_Accumulate_Root = {
        proteinName_ProteinDescription_Accumulate_Map_Key_ProteinName: new Map()
    }

    for (const projectSearchId of projectSearchIds) {

        const proteinInfo_For_MainFilters_Holder =
            proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId)
        if ( ! proteinInfo_For_MainFilters_Holder ) {
            throw Error("proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId) returned Nothing for projectSearchId:" + projectSearchId )
        }

        _get_ProteinNameDescription_Strings_For_SingleProtein_ForSingleSearch({
            proteinSequenceVersionId,
            projectSearchId,
            proteinInfo_For_MainFilters_Holder,
            //  Updated
            internal_ProteinName_ProteinDescription_Accumulate_Root
        })
    }

    const modPage_Get_Protein_NamesAndDescriptions_Result =
        _get_ProteinNameDescription_Strings_For_SingleProtein_AfterProcessing_OfSingleSearches({
            proteinSequenceVersionId,
            internal_ProteinName_ProteinDescription_Accumulate_Root
        })

    return modPage_Get_Protein_NamesAndDescriptions_Result
}

/**
 *
 *
 */
const _get_ProteinNameDescription_Strings_For_SingleProtein_AfterProcessing_OfSingleSearches = function (
    {
        proteinSequenceVersionId,
        internal_ProteinName_ProteinDescription_Accumulate_Root
    }: {
        proteinSequenceVersionId: number
        internal_ProteinName_ProteinDescription_Accumulate_Root: INTERNAL_ProteinName_ProteinDescription_Accumulate_Root

    }) : ModPage_Get_Protein_NamesAndDescriptions_UTIL_Result {

    const proteinNames_AndDescriptions_Array_Entry_ProteinName_ProteinDescription_Pair: Array<{
        readonly proteinName: string
        readonly proteinDescription: string
    }> = []

    if ( internal_ProteinName_ProteinDescription_Accumulate_Root.proteinName_ProteinDescription_Accumulate_Map_Key_ProteinName.size === 0 ) {
        const msg = "No Protein names found in any search for proteinSequenceVersionId: " + proteinSequenceVersionId;
        console.warn(msg);
        throw Error(msg);
    }

    const proteinNames_All_Set: Set<string> = new Set( internal_ProteinName_ProteinDescription_Accumulate_Root.proteinName_ProteinDescription_Accumulate_Map_Key_ProteinName.keys() )

    const proteinNames_All_Array_Sorted = Array.from( proteinNames_All_Set ).sort()

    for ( const proteinName of proteinNames_All_Array_Sorted ) {

        const entry = internal_ProteinName_ProteinDescription_Accumulate_Root.proteinName_ProteinDescription_Accumulate_Map_Key_ProteinName.get( proteinName )

        let proteinDescription = 'No description found.'

        if ( entry.proteinDescriptions_Set.size === 0 ) {

            proteinNames_AndDescriptions_Array_Entry_ProteinName_ProteinDescription_Pair.push({ proteinName, proteinDescription:'No description found.' })
        } else {

            const proteinDescription_Array_Sorted = Array.from( entry.proteinDescriptions_Set ).sort()

            for ( const proteinDescription of proteinDescription_Array_Sorted ) {
                proteinNames_AndDescriptions_Array_Entry_ProteinName_ProteinDescription_Pair.push({ proteinName, proteinDescription })
            }
        }
    }

    const modPage_Get_Protein_NamesAndDescriptions_Result: ModPage_Get_Protein_NamesAndDescriptions_UTIL_Result = {
        proteinNames_AndDescriptions_Array_Entry_ProteinName_ProteinDescription_Pair
    }

    return modPage_Get_Protein_NamesAndDescriptions_Result
}

/**
 *
 *
 */
const _get_ProteinNameDescription_Strings_For_SingleProtein_ForSingleSearch = function (
    {
        proteinSequenceVersionId,
        projectSearchId,
        proteinInfo_For_MainFilters_Holder,
        //  Updated
        internal_ProteinName_ProteinDescription_Accumulate_Root
    }: {
        proteinSequenceVersionId: number
        projectSearchId: number
        proteinInfo_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder

        internal_ProteinName_ProteinDescription_Accumulate_Root: INTERNAL_ProteinName_ProteinDescription_Accumulate_Root
    }) : void {

    let proteinInfo = proteinInfo_For_MainFilters_Holder.get_ProteinInfo_For_ProteinSequenceVersionId(proteinSequenceVersionId);
    if (proteinInfo === undefined) {
        //  proteinSequenceVersionId NOT in this search.  Skip to next

        return;  // EARLY RETURN
    }

    const annotations = proteinInfo.annotations;
    if (annotations) {
        for (const annotation of annotations) {
            const name = annotation.name;
            const description = annotation.description;
            const taxonomy = annotation.taxonomy;

            let proteinName_ProteinDescription_Accumulate_Map_Entry = internal_ProteinName_ProteinDescription_Accumulate_Root.proteinName_ProteinDescription_Accumulate_Map_Key_ProteinName.get( name )
            if ( ! proteinName_ProteinDescription_Accumulate_Map_Entry ) {
                proteinName_ProteinDescription_Accumulate_Map_Entry = {
                    proteinName: name,
                    proteinDescriptions_Set: new Set()
                }
                internal_ProteinName_ProteinDescription_Accumulate_Root.proteinName_ProteinDescription_Accumulate_Map_Key_ProteinName.set( name, proteinName_ProteinDescription_Accumulate_Map_Entry )
            }

            if ( description ) {
                proteinName_ProteinDescription_Accumulate_Map_Entry.proteinDescriptions_Set.add( description );
            }
        }
    }
}



class INTERNAL_ProteinName_ProteinDescription_Accumulate_Root {

    proteinName_ProteinDescription_Accumulate_Map_Key_ProteinName: Map<string, INTERNAL_ProteinName_ProteinDescription_Accumulate_SingleProteinName>
}

class INTERNAL_ProteinName_ProteinDescription_Accumulate_SingleProteinName {

    proteinName: string
    proteinDescriptions_Set: Set<string>
}
