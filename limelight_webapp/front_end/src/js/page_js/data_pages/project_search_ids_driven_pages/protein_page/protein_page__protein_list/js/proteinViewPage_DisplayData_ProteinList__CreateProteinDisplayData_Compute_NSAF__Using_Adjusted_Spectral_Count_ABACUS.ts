/**
 * proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_NSAF__Using_Adjusted_Spectral_Count_ABACUS.ts
 */
import {
    ProteinDataDisplay_ProteinList_Item,
    ProteinDisplayData_From_createProteinDisplayData_ProteinList
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import { NSAFAnnotationCalculator } from "page_js/data_pages/calculated_annotations/NSAF_annotation_calculator";


export const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_NSAF__Using_Adjusted_Spectral_Count_ABACUS = function (
    {
        searchSubGroup_Ids_Selected, // Set<number>  undefined/null if not set
        projectSearchIds,
        proteinDisplayData,
    } : {
        searchSubGroup_Ids_Selected: Set<number>
        projectSearchIds : Array<number>
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
    }) : void {

    if (proteinDisplayData.proteinList.length === 0) {
        // No entries to process
        return; // EARLY RETURN
    }

    //  First get all ProteinDataDisplay_ProteinList_Item into a single array since they may be in groups

    const proteinItems_Array: Array<ProteinDataDisplay_ProteinList_Item> = []

    if (proteinDisplayData.proteinGroupsList) {
        for (const proteinGroupItem of proteinDisplayData.proteinGroupsList) {

            for ( const proteinItem of proteinGroupItem.proteinList_Grouped ) {
                proteinItems_Array.push(proteinItem);
            }
        }
    } else {

        for ( const proteinItem of proteinDisplayData.proteinList ) {
            proteinItems_Array.push(proteinItem);
        }

    }


    const proteinLength_Map_Key_ProteinSequenceVersionId: Map<number, number> = new Map();

    const adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId: Map<number, Map<number, number>> = new Map();
    const adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId: Map<number, Map<number, number>> = new Map();

    for ( const proteinItems_Array_Entry of proteinItems_Array ) {

        const proteinSequenceVersionId = proteinItems_Array_Entry.proteinSequenceVersionId;

        //  Process Per ProjectSearchId and also get protein length

        let proteinLength: number = undefined;

        for ( const protein_SubItem_Records_Map_Key_projectSearchId_Entry of proteinItems_Array_Entry.protein_SubItem_Records_Map_Key_projectSearchId.entries() ) {
            const projectSearchId = protein_SubItem_Records_Map_Key_projectSearchId_Entry[0];
            const protein_SubItem = protein_SubItem_Records_Map_Key_projectSearchId_Entry[1];

            proteinLength = protein_SubItem.proteinInfo.proteinLength;

            let adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map = adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId.get(projectSearchId);
            if ( ! adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map ) {
                adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map = new Map();
                adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId.set(projectSearchId, adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map);
            }
            adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map.set(proteinSequenceVersionId, protein_SubItem.adjusted_Spectral_Count_ABACUS);
        }
        if ( proteinLength === undefined ) {
            const msg = "No entry in proteinItems_Array_Entry.protein_SubItem_Records_Map_Key_projectSearchId for any of projectSearchIds: " + projectSearchIds.join(",");
            console.warn(msg);
            throw Error(msg);
        }

        proteinLength_Map_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinLength );

        if ( searchSubGroup_Ids_Selected ) {
            if (proteinItems_Array_Entry.protein_SubItem_Records_Map_Key_SubGroup_Id && proteinItems_Array_Entry.protein_SubItem_Records_Map_Key_SubGroup_Id.size > 0) {

                //  Process Per Sub Group Id
                for (const protein_SubItem_For_SubGroup_Id_MapEntry of proteinItems_Array_Entry.protein_SubItem_Records_Map_Key_SubGroup_Id.entries()) {

                    const searchSubGroup_Id = protein_SubItem_For_SubGroup_Id_MapEntry[0];
                    const protein_SubItem = protein_SubItem_For_SubGroup_Id_MapEntry[1];

                    let adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId = adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId.get(searchSubGroup_Id);
                    if ( ! adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId ) {
                        adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId = new Map();
                        adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId.set(searchSubGroup_Id, adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId);
                    }
                    adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId.set(proteinSequenceVersionId, protein_SubItem.adjusted_Spectral_Count_ABACUS);
                }
            }
        }
    }

    //  Compute NSAF

    //  NSAF Per Search:  If > 1 search OR ( Single Search AND No Sub Groups )
    if ( projectSearchIds.length > 1 || ( projectSearchIds.length === 1 && ( ! searchSubGroup_Ids_Selected ) ) ) {

        const nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId: Map<number, Map<number, number>> = new Map();

        for (const adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId_Entry of adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId.entries()) {

            const projectSearchId = adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId_Entry[0];
            const adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map = adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId_Entry[1];

            for ( const proteinSequenceVersionId of proteinLength_Map_Key_ProteinSequenceVersionId.keys() ) {
                if ( ! adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map.has( proteinSequenceVersionId ) ) {
                    adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map.set( proteinSequenceVersionId, 0 );
                }
            }

            const nsaf_Map_Key_ProteinSequenceVersionId_Map: Map<number, number> =
                NSAFAnnotationCalculator.getNSAFAnnotations({
                    proteinLengthMap: proteinLength_Map_Key_ProteinSequenceVersionId,
                    proteinPsmCountMap: adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map
                });
            nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId.set(projectSearchId, nsaf_Map_Key_ProteinSequenceVersionId_Map);
        }

        for ( const proteinItems_Array_Entry of proteinItems_Array ) {

            const proteinSequenceVersionId = proteinItems_Array_Entry.proteinSequenceVersionId;

            for ( const protein_SubItem_Records_Map_Key_projectSearchId_Entry of proteinItems_Array_Entry.protein_SubItem_Records_Map_Key_projectSearchId.entries() ) {
                const projectSearchId = protein_SubItem_Records_Map_Key_projectSearchId_Entry[0];
                const protein_SubItem = protein_SubItem_Records_Map_Key_projectSearchId_Entry[1];

                const nsaf_Map_Key_ProteinSequenceVersionId = nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId.get(projectSearchId);
                if ( ! nsaf_Map_Key_ProteinSequenceVersionId ) {
                    const msg = "NSAF Per Search: No entry in nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId for projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                const nsaf = nsaf_Map_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId);
                if ( nsaf === undefined ) {
                    const msg = "NSAF Per Search: No entry in nsaf_Map_Key_ProteinSequenceVersionId for proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                protein_SubItem.nsaf__Using_Adjusted_Spectral_Count_ABACUS = nsaf;
            }
        }

    }

    //  NSAF Per Sub Group
    if ( searchSubGroup_Ids_Selected ) {

        const nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId: Map<number, Map<number, number>> = new Map();

        for ( const adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId_Entry of adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId.entries()) {

            const searchSubGroup_Id = adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId_Entry[0];
            const adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map = adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId_Entry[1];

            for ( const proteinSequenceVersionId of proteinLength_Map_Key_ProteinSequenceVersionId.keys() ) {
                if ( ! adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map.has( proteinSequenceVersionId ) ) {
                    adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map.set( proteinSequenceVersionId, 0 );
                }
            }

            const nsaf_Map_Key_ProteinSequenceVersionId_Map : Map<number,number> =
                NSAFAnnotationCalculator.getNSAFAnnotations({ proteinLengthMap: proteinLength_Map_Key_ProteinSequenceVersionId, proteinPsmCountMap: adjusted_Spectral_Count_ABACUS_Map_Key_ProteinSequenceVersionId_Map});

            nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId.set(searchSubGroup_Id, nsaf_Map_Key_ProteinSequenceVersionId_Map);
        }

        for ( const proteinItems_Array_Entry of proteinItems_Array ) {

            const proteinSequenceVersionId = proteinItems_Array_Entry.proteinSequenceVersionId;

            for ( const protein_SubItem_Records_Map_Key_SubGroup_Id_Entry of proteinItems_Array_Entry.protein_SubItem_Records_Map_Key_SubGroup_Id.entries() ) {
                const subGroup_Id = protein_SubItem_Records_Map_Key_SubGroup_Id_Entry[0];
                const protein_SubItem = protein_SubItem_Records_Map_Key_SubGroup_Id_Entry[1];

                const nsaf_Map_Key_ProteinSequenceVersionId = nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId.get(subGroup_Id);
                if ( ! nsaf_Map_Key_ProteinSequenceVersionId ) {
                    const msg = "NSAF Per Search: No entry in nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId for subGroup_Id: " + subGroup_Id;
                    console.warn(msg);
                    throw Error(msg);
                }

                const nsaf = nsaf_Map_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId);
                if ( nsaf === undefined ) {
                    const msg = "NSAF Per Search: No entry in nsaf_Map_Key_ProteinSequenceVersionId for proteinSequenceVersionId: " + proteinSequenceVersionId + ", subGroup_Id: " + subGroup_Id;
                    console.warn(msg);
                    throw Error(msg);
                }

                protein_SubItem.nsaf__Using_Adjusted_Spectral_Count_ABACUS = nsaf;
            }
        }

    }


}

