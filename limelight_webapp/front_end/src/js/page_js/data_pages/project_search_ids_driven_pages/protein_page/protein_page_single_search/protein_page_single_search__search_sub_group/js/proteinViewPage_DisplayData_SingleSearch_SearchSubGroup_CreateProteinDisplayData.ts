/**
 * proteinViewPage_DisplayData_SingleSearch_SearchSubGroup_CreateProteinDisplayData.ts
 *
 * Create Display Data for Protein List for Single Search / Search Sub Group
 */

import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";

/**
 * returned from function createProteinDisplayData_SingleSearch_SearchSubGroup
 */
export class ProteinDisplayData_From_createProteinDisplayData_SingleSearch_SearchSubGroup {

    proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch_SearchSubGroup>
    reportedPeptideCount_TotalForSearch : number
    psmCount_TotalForSearch : number

}

/**
 * Entry in proteinList
 */
export class ProteinDataDisplay_ProteinListItem_SingleSearch_SearchSubGroup {

    proteinSequenceVersionId : number
    numPsms : number //  numPsms to be consistent with single search code
    proteinNames : string
    proteinDescriptions : string
    proteinItem : {
        proteinSequenceVersionId : number
        proteinInfo : { proteinLength : number, annotations : Array<{ name : string, description : string, taxonomy : number }> } // Map Value from loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()
        numPsms : number
        numPsms_Map_Key_SearchSubGroupId: Map<number,number>
        numReportedPeptides : number
        numReportedPeptidesUnique : number
        reportedPeptideIds : Array<number>
    }
}

/**
 * Entry in incoming Map
 */
export class ProteinNameDescriptionCacheEntry_SingleSearch_SearchSubGroup {
    name : string
    description: string
}

/**
 * Entry in incoming Map
 */
export class CountsFor_proteinSequenceVersionIdEntry_SingleSearch_SearchSubGroup {
    numReportedPeptides : number
    numReportedPeptidesUnique : number
    numPsms : number
}


/////////////

/**
 * Create Protein Data for Display
 *
 * Return:
 * Protein List
 * Number of Proteins
 * Number of Reported Peptides Total
 * Number of PSMs total
 */
export const createProteinDisplayData_SingleSearch_SearchSubGroup = function(
    {
        searchSubGroup_Ids,
        projectSearchId,
        loadedDataPerProjectSearchIdHolder,

        proteinNameDescription_Key_ProteinSequenceVersionId,
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
        peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId
    } : {
        searchSubGroup_Ids : Array<number>
        projectSearchId : number
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

        proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry_SingleSearch_SearchSubGroup>
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry_SingleSearch_SearchSubGroup>>
        peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId : Map<number, CountsFor_proteinSequenceVersionIdEntry_SingleSearch_SearchSubGroup>

    } ) : ProteinDisplayData_From_createProteinDisplayData_SingleSearch_SearchSubGroup {

    const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()

    //  Used to determine if a reported peptide is unique (maps to only 1 protein)
    const proteinSequenceVersionIdsPerReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsKeyReportedPeptideId();

    const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

    //  Use proteinSequenceVersionIdsArray since it has the proteinSequenceVersionIds for the current Reported Peptide Ids for the current cutoffs/filters
    const proteinSequenceVersionIdsArray = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsArray();


    //  Map<proteinSequenceVersionId, {object}>
    const proteinItemRecordsMap_Key_proteinSequenceVersionId:

        Map<number, {
            proteinSequenceVersionId: number
            proteinInfo: { proteinLength: number, annotations: Array<{ name: string, description: string, taxonomy: number }> } // Map Value from loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()
            numPsms: number
            numPsms_Map_Key_SearchSubGroupId: Map<number,number>
            numReportedPeptides: number
            numReportedPeptidesUnique: number
            reportedPeptideIds: Array<number>
        }>
        = new Map();

    //  Get Totals for Search Values: Reported Peptide Count and PSM Count

    let reportedPeptideIds_TotalForSearch = new Set<number>();
    let psmCount_Per_ReportedPeptideId_TotalForSearch = new Map<number,number>();


    for ( const proteinSequenceVersionId of proteinSequenceVersionIdsArray ) {

        const proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get(proteinSequenceVersionId);
        if (proteinInfo === undefined) {
            throw Error("No proteinInfo found.  proteinSequenceVersionId: " + proteinSequenceVersionId);
        }

        const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);
        if (proteinCoverageObject === undefined) {
            throw Error("No proteinCoverageObject found.  proteinSequenceVersionId: " + proteinSequenceVersionId);
        }
        // const proteinCoverageRatio = proteinCoverageObject.getProteinSequenceCoverageRatio();

        let numReportedPeptides = 0;
        let numReportedPeptidesUnique = 0; // 'Unique' == map to only one protein
        let numPsms = 0;
        const numPsms_Map_Key_SearchSubGroupId: Map<number,number> = new Map()

        const numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map = loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map();
        if ( ! numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map ) {

            const msg = "proteinViewPage_DisplayData_SingleSearch__SearchSubGroup.ts: _createProteinDisplayData(...) ( ! loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map() ). projectSearchId: " + projectSearchId;
            console.warn( msg );
            throw Error( msg );
        }

        //  reportedPeptideIds for proteinSequenceVersionId
        const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId().get(proteinSequenceVersionId);

        for ( const reportedPeptideId of reportedPeptideIds ) {

            let numberOfPSMsForReportedPeptide = 0;

            for ( const searchSubGroup_Id of searchSubGroup_Ids ) {

                const numPsmsFor_SearchSubGroupId = numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map.get(reportedPeptideId)
                if ( numPsmsFor_SearchSubGroupId ) {

                    const numPsms = numPsmsFor_SearchSubGroupId.get(searchSubGroup_Id);
                    if ( numPsms !== undefined ) {
                        let numPsms_Map_Key_SearchSubGroupId_Entry = numPsms_Map_Key_SearchSubGroupId.get( searchSubGroup_Id );
                        if ( ! numPsms_Map_Key_SearchSubGroupId_Entry ) {
                            numPsms_Map_Key_SearchSubGroupId_Entry = 0;  // was undefined since not in map. change to zero so can add to numPsms
                        }
                        const numPsms_Map_Key_SearchSubGroupId_Entry_NewValue = numPsms_Map_Key_SearchSubGroupId_Entry + numPsms;
                        numPsms_Map_Key_SearchSubGroupId.set( searchSubGroup_Id, numPsms_Map_Key_SearchSubGroupId_Entry_NewValue );

                        numberOfPSMsForReportedPeptide += numPsms;
                    }
                }
            }

            if ( numberOfPSMsForReportedPeptide === 0 ) {

                //  NO PSMs found for this ReportedPeptideId for selected search sub groups

                continue;  //  EARLY CONTINUE
            }

            // let numberOfPSMsForReportedPeptide = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap().get(reportedPeptideId);
            //
            // if (numberOfPSMsForReportedPeptide === undefined || numberOfPSMsForReportedPeptide === null) {
            //     throw Error("number of PSMs Not Found for reportedPeptideId: " + reportedPeptideId);
            // }

            numReportedPeptides++;
            numPsms += numberOfPSMsForReportedPeptide;


            reportedPeptideIds_TotalForSearch.add( reportedPeptideId );
            psmCount_Per_ReportedPeptideId_TotalForSearch.set( reportedPeptideId, numberOfPSMsForReportedPeptide );

            //  Is this Reported Peptide Unique?
            // proteinSequenceVersionIds array of proteinSequenceVersionIds for this reported peptide id
            const proteinSequenceVersionIds = proteinSequenceVersionIdsPerReportedPeptideId.get(reportedPeptideId);
            if (!proteinSequenceVersionIds) {
                throw Error("No proteinSequenceVersionIds for reportedPeptideId: " + reportedPeptideId);
            }
            if (proteinSequenceVersionIds.length === 1) {
                numReportedPeptidesUnique++
            }
        }

        //  Stored computed values per proteinSequenceVersionId
        const countsFor_proteinSequenceVersionId = {
            numReportedPeptides,
            numReportedPeptidesUnique,
            numPsms
        }
        peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId.set(proteinSequenceVersionId, countsFor_proteinSequenceVersionId);

        //  output Protein Item for this projectSearchId

        const proteinItem_For_proteinSequenceVersionId = {
            proteinSequenceVersionId: proteinSequenceVersionId,
            proteinInfo,
            numPsms,
            numPsms_Map_Key_SearchSubGroupId,
            numReportedPeptides,
            numReportedPeptidesUnique,
            reportedPeptideIds
        };

        proteinItemRecordsMap_Key_proteinSequenceVersionId.set(proteinSequenceVersionId, proteinItem_For_proteinSequenceVersionId);
    }

    //  Build output array from Map of Maps

    const proteinResultListResult: Array<ProteinDataDisplay_ProteinListItem_SingleSearch_SearchSubGroup> = [];

    for (const outputRecordsMap_Per_proteinSequenceVersionId_Entry of proteinItemRecordsMap_Key_proteinSequenceVersionId.entries()) {

        let psmCountForThis_proteinSequenceVersionId = 0;

        //  So add only once to result
        const proteinNamesUniqueSet: Set<string> = new Set();
        const proteinDescriptionsUniqueSet: Set<string> = new Set();

        //  To combine with "," separator
        const proteinNamesArray: Array<string> = [];
        const proteinDescriptionsArray: Array<string> = [];

        const proteinNamesAndDescriptionsArray: Array<{ name: string, description: string }> = [];  // For Tooltip

        const proteinSequenceVersionId = outputRecordsMap_Per_proteinSequenceVersionId_Entry[0];
        const proteinItem = outputRecordsMap_Per_proteinSequenceVersionId_Entry[1];

        {
            if ( proteinItem.numPsms_Map_Key_SearchSubGroupId.size === 0 ) {
                //  Skip this entry if no numPsms for any SearchSubGroupId
                continue; // EARLY CONTINUE
            }
            {
                let found_any_numPsms_greaterThan_Zero = false;
                for ( const entry of proteinItem.numPsms_Map_Key_SearchSubGroupId ) {

                    const numPsms_For_SearchSubGroupId = entry[ 1 ]; //  Map Entry Value
                    if ( numPsms_For_SearchSubGroupId > 0 ) {
                        found_any_numPsms_greaterThan_Zero = true;
                        break;
                    }
                }
                if ( ! found_any_numPsms_greaterThan_Zero ) {
                    //  Skip this entry if no numPsms for any SearchSubGroupId > zero
                    continue; // EARLY CONTINUE
                }
            }
        }

        psmCountForThis_proteinSequenceVersionId += proteinItem.numPsms;

        //  Get Protein Names and Descriptions

        let foundProteinName = false;

        const proteinInfo = proteinItem.proteinInfo;
        if (!proteinInfo) {
            throw Error("No proteinInfo property for proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId);
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
            throw Error("No Data found for protein name.  proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId);
        }

        const proteinNamesString = proteinNamesArray.join(",");
        const proteinDescriptionsString = proteinDescriptionsArray.join(",");

        const proteinNameDescriptionEntry = {proteinSequenceVersionId, name: proteinNamesString, description: proteinDescriptionsString};
        proteinNameDescription_Key_ProteinSequenceVersionId.set(proteinSequenceVersionId, proteinNameDescriptionEntry);

        //   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId.set(proteinSequenceVersionId, proteinNamesAndDescriptionsArray);

        const proteinResultEntry: ProteinDataDisplay_ProteinListItem_SingleSearch_SearchSubGroup = {
            proteinSequenceVersionId,
            numPsms: psmCountForThis_proteinSequenceVersionId, //  numPsms to be consistent with single search code
            proteinNames: proteinNamesString,
            proteinDescriptions: proteinDescriptionsString,
            proteinItem
        };

        proteinResultListResult.push(proteinResultEntry);
    }

    _sortProteinList({proteinList: proteinResultListResult});


    let psmCount_TotalForSearch = 0;

    for ( const mapEntry of psmCount_Per_ReportedPeptideId_TotalForSearch.entries() ) {

        const mapValue = mapEntry[ 1 ];
        psmCount_TotalForSearch += mapValue;
    }

    return { proteinList : proteinResultListResult, reportedPeptideCount_TotalForSearch : reportedPeptideIds_TotalForSearch.size, psmCount_TotalForSearch };
}

//   Maybe not valid sort since not displaying the sorted on number of numPsms (Total across searches)

/**
 *
 */
const _sortProteinList = function ({proteinList}: {

    proteinList: Array<ProteinDataDisplay_ProteinListItem_SingleSearch_SearchSubGroup>

}) {

    //   Sort Proteins Array on PSM Count Descending and then Protein Name then Protein Sequence Version Id

    proteinList.sort(function (a, b) {

        // PSM Count (numPsms) Descending so reverse comparisons '>' '<'

        if (a.numPsms > b.numPsms) {
            return -1;
        }
        if (a.numPsms < b.numPsms) {
            return 1;
        }

        if (a.proteinNames < b.proteinNames) {
            return -1;
        }
        if (a.proteinNames > b.proteinNames) {
            return 1;
        }

        //  All others match so order on proteinSequenceVersionId
        if (a.proteinSequenceVersionId < b.proteinSequenceVersionId) {
            return -1;
        }
        if (a.proteinSequenceVersionId > b.proteinSequenceVersionId) {
            return 1;
        }
        return 0;

    });
}
