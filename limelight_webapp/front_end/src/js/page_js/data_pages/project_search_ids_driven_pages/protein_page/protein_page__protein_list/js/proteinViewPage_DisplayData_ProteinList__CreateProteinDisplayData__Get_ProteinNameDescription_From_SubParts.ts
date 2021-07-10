/**
 * proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Get_ProteinNameDescription_From_SubParts.ts
 *
 * Create Display Data for Protein List:   Protein Name and Description and for Tooltip for Single Protein Sequence Version Id
 */



import {ProteinDataDisplay_ProteinList_Sub_Item} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";

/**
 *
 */
export const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Get_ProteinNameDescription_From_SubParts = function (
    {
        proteinSequenceVersionId, protein_SubItem_Records_Array
    } : {
        proteinSequenceVersionId: number
        protein_SubItem_Records_Array : Array<ProteinDataDisplay_ProteinList_Sub_Item>
    }) : {
    proteinNameDescriptionEntry : {proteinSequenceVersionId: number, name: string, description: string},
    proteinNamesAndDescriptionsArray: Array<{ name: string, description: string }>
} {

    //  So add only once to result
    const proteinNamesUniqueSet: Set<string> = new Set();
    const proteinDescriptionsUniqueSet: Set<string> = new Set();

    //  To combine with "," separator
    const proteinNamesArray: Array<string> = [];
    const proteinDescriptionsArray: Array<string> = [];

    const proteinNamesAndDescriptionsArray: Array<{ name: string, description: string }> = [];  // For Tooltip

    for (const proteinItem of protein_SubItem_Records_Array) {

        //  Get Protein Names and Descriptions

        let foundProteinName = false;

        const proteinInfo = proteinItem.proteinInfo;
        if (!proteinInfo) {
            throw Error("No proteinInfo property for proteinSequenceVersionId: " + proteinSequenceVersionId );
        }
        const annotations = proteinInfo.annotations;
        if (annotations) {
            foundProteinName = true;
            for (const annotation of annotations) {
                const name = annotation.name;
                const description = annotation.description;
                const taxonomy = annotation.taxonomy;
                if (!proteinNamesUniqueSet.has(name)) {
                    proteinNamesUniqueSet.add(name);
                    proteinNamesArray.push(name);
                }
                if (description) {
                    if (!proteinDescriptionsUniqueSet.has(description)) {
                        proteinDescriptionsUniqueSet.add(description);
                        proteinDescriptionsArray.push(description);
                    }
                }
                { // For Tooltip, matches Tooltip template
                    const proteinNamesAndDescriptionsNewEntry = {
                        name: name,
                        description: description
                    };
                    //  Only add to proteinNamesAndDescriptionsArray if combination of name and description is not already in array
                    let nameDescriptionComboFoundInArray = false;
                    for (const entry of proteinNamesAndDescriptionsArray) {
                        if (entry.name === proteinNamesAndDescriptionsNewEntry.name && entry.description === proteinNamesAndDescriptionsNewEntry.description) {
                            nameDescriptionComboFoundInArray = true;
                            break;
                        }
                    }
                    if (!nameDescriptionComboFoundInArray) {
                        proteinNamesAndDescriptionsArray.push(proteinNamesAndDescriptionsNewEntry);
                    }
                }
            }
        }

        if (!foundProteinName) {
            throw Error("No Data found for protein name.  proteinSequenceVersionId: " + proteinSequenceVersionId );
        }

    }

    const proteinNamesString = proteinNamesArray.join(",");
    const proteinDescriptionsString = proteinDescriptionsArray.join(",");

    const proteinNameDescriptionEntry = {proteinSequenceVersionId, name: proteinNamesString, description: proteinDescriptionsString};

    return {
        proteinNameDescriptionEntry, proteinNamesAndDescriptionsArray
    }
}
