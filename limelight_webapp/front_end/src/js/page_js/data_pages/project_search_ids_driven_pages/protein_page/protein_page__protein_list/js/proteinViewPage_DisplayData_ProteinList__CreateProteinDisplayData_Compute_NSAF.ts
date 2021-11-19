/**
 * proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_NSAF.ts
 *
 * Create Display Data for Protein List - Compute NSAF for the final displayed Protein List
 *
 */

import {
    ProteinDataDisplay_ProteinList_Item,
    ProteinDisplayData_From_createProteinDisplayData_ProteinList,
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {NSAFAnnotationCalculator} from "page_js/data_pages/calculated_annotations/NSAF_annotation_calculator";

/**
 *
 */
export const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_NSAF = function (
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

    const psmCount_Map_Key_ProteinSequenceVersionId: Map<number, number> = new Map();

    const psmCount_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId: Map<number, Map<number, number>> = new Map();
    const psmCount_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId: Map<number, Map<number, number>> = new Map();

    for ( const proteinItems_Array_Entry of proteinItems_Array ) {

        const proteinSequenceVersionId = proteinItems_Array_Entry.proteinSequenceVersionId;

        psmCount_Map_Key_ProteinSequenceVersionId.set(proteinSequenceVersionId, proteinItems_Array_Entry.numPsms_Overall);

        //  Process Per ProjectSearchId and also get protein length

        let proteinLength: number = undefined;

        for ( const protein_SubItem_Records_Map_Key_projectSearchId_Entry of proteinItems_Array_Entry.protein_SubItem_Records_Map_Key_projectSearchId.entries() ) {
            const projectSearchId = protein_SubItem_Records_Map_Key_projectSearchId_Entry[0];
            const protein_SubItem = protein_SubItem_Records_Map_Key_projectSearchId_Entry[1];

            proteinLength = protein_SubItem.proteinInfo.proteinLength;

            let psmCount_Map_Key_ProteinSequenceVersionId_Map = psmCount_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId.get(projectSearchId);
            if ( ! psmCount_Map_Key_ProteinSequenceVersionId_Map ) {
                psmCount_Map_Key_ProteinSequenceVersionId_Map = new Map();
                psmCount_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId.set(projectSearchId, psmCount_Map_Key_ProteinSequenceVersionId_Map);
            }
            psmCount_Map_Key_ProteinSequenceVersionId_Map.set(proteinSequenceVersionId, protein_SubItem.numPsms);
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

                    let psmCount_Map_Key_ProteinSequenceVersionId = psmCount_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId.get(searchSubGroup_Id);
                    if ( ! psmCount_Map_Key_ProteinSequenceVersionId ) {
                        psmCount_Map_Key_ProteinSequenceVersionId = new Map();
                        psmCount_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId.set(searchSubGroup_Id, psmCount_Map_Key_ProteinSequenceVersionId);
                    }
                    psmCount_Map_Key_ProteinSequenceVersionId.set(proteinSequenceVersionId, protein_SubItem.numPsms);
                }
            }
        }
    }

    //  Compute NSAF

    //  NSAF Overall
    if ( projectSearchIds.length === 1 && ( ! searchSubGroup_Ids_Selected ) ) {

        const nsaf_Map_Key_ProteinSequenceVersionId: Map<number, number> =
            NSAFAnnotationCalculator.getNSAFAnnotations({
                proteinLengthMap: proteinLength_Map_Key_ProteinSequenceVersionId,
                proteinPsmCountMap: psmCount_Map_Key_ProteinSequenceVersionId
            });

        for ( const proteinItems_Array_Entry of proteinItems_Array ) {

            const proteinSequenceVersionId = proteinItems_Array_Entry.proteinSequenceVersionId;

            const nsaf = nsaf_Map_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId);

            if ( nsaf === undefined ) {
                const msg = "NSAF Overall: No entry in nsaf_Map_Key_ProteinSequenceVersionId for proteinSequenceVersionId: " + proteinSequenceVersionId;
                console.warn(msg);
                throw Error(msg);
            }

            proteinItems_Array_Entry.nsaf = nsaf
        }
    }

    //  NSAF Per Search
    if ( projectSearchIds.length > 1 && ( ! searchSubGroup_Ids_Selected ) ) {

        const nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId: Map<number, Map<number, number>> = new Map();

        for (const psmCount_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId_Entry of psmCount_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId.entries()) {

            const projectSearchId = psmCount_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId_Entry[0];
            const psmCount_Map_Key_ProteinSequenceVersionId_Map = psmCount_Map_Key_ProteinSequenceVersionId_Map_Key_ProjectSearchId_Entry[1];

            for ( const proteinSequenceVersionId of proteinLength_Map_Key_ProteinSequenceVersionId.keys() ) {
                if ( ! psmCount_Map_Key_ProteinSequenceVersionId_Map.has( proteinSequenceVersionId ) ) {
                    psmCount_Map_Key_ProteinSequenceVersionId_Map.set( proteinSequenceVersionId, 0 );
                }
            }

            const nsaf_Map_Key_ProteinSequenceVersionId_Map: Map<number, number> =
                NSAFAnnotationCalculator.getNSAFAnnotations({
                    proteinLengthMap: proteinLength_Map_Key_ProteinSequenceVersionId,
                    proteinPsmCountMap: psmCount_Map_Key_ProteinSequenceVersionId_Map
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

                protein_SubItem.nsaf = nsaf;
            }
        }

    }

    //  NSAF Per Sub Group
    if ( searchSubGroup_Ids_Selected ) {

        const nsaf_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId: Map<number, Map<number, number>> = new Map();

        for ( const psmCount_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId_Entry of psmCount_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId.entries()) {

            const searchSubGroup_Id = psmCount_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId_Entry[0];
            const psmCount_Map_Key_ProteinSequenceVersionId_Map = psmCount_Map_Key_ProteinSequenceVersionId_Map_Key_SubGroupId_Entry[1];

            for ( const proteinSequenceVersionId of proteinLength_Map_Key_ProteinSequenceVersionId.keys() ) {
                if ( ! psmCount_Map_Key_ProteinSequenceVersionId_Map.has( proteinSequenceVersionId ) ) {
                    psmCount_Map_Key_ProteinSequenceVersionId_Map.set( proteinSequenceVersionId, 0 );
                }
            }

            const nsaf_Map_Key_ProteinSequenceVersionId_Map : Map<number,number> =
                NSAFAnnotationCalculator.getNSAFAnnotations({ proteinLengthMap: proteinLength_Map_Key_ProteinSequenceVersionId, proteinPsmCountMap: psmCount_Map_Key_ProteinSequenceVersionId_Map});

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

                protein_SubItem.nsaf = nsaf;
            }
        }

    }


}