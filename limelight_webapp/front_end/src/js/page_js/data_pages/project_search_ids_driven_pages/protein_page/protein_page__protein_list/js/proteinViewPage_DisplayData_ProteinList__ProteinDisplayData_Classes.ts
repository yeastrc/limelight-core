/**
 * proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes.ts
 *
 * Create Display Data for Protein List - ProteinDisplayData_...  classes
 */




import {ProteinGroup} from "page_js/data_pages/protein_inference/ProteinGroup";

/**
 * returned from function
 */
export class ProteinDisplayData_From_createProteinDisplayData_ProteinList{

    proteinList: Array<ProteinDataDisplay_ProteinList_Item>;
    proteinGroupsList: Array<ProteinDataDisplay_ProteinList_GroupedProtein_Item>;

    summaryMap_Key_ProjectSearchId? : Map<number, ProteinDataDisplay__Summary_PerSearch>

    reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container?: ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_Container

    distinctPeptide_TotalCount: number
    psm_TotalCount: number

    shallowClone() : ProteinDisplayData_From_createProteinDisplayData_ProteinList {
        const clone = new ProteinDisplayData_From_createProteinDisplayData_ProteinList();
        clone.proteinList = this.proteinList;
        clone.proteinGroupsList = this.proteinGroupsList;
        clone.summaryMap_Key_ProjectSearchId = this.summaryMap_Key_ProjectSearchId;
        clone.reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container = this.reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container;
        clone.distinctPeptide_TotalCount = this.distinctPeptide_TotalCount;
        clone.psm_TotalCount = this.psm_TotalCount;

        return clone;
    }
}

/**
 *
 * Summary Data Per Search
 */
export class ProteinDataDisplay__Summary_PerSearch {

    projectSearchId : number

    proteinCount_TotalForSearch : number = 0;
    distinctPeptideCount_TotalForSearch : number = 0;
    psmCount_TotalForSearch : number = 0;
}

/**
 * Entry in proteinGroupsList
 */
export class ProteinDataDisplay_ProteinList_GroupedProtein_Item {
    proteinList_Grouped : Array<ProteinDataDisplay_ProteinList_Item>
    proteinGroup : ProteinGroup
    isSubsetGroup: boolean
    uniquePeptideCount_Overall: number //  Computed last across the protein groups
}


/**
 * Entry in proteinList
 */
export class ProteinDataDisplay_ProteinList_Item {

    proteinSequenceVersionId : number
    proteinNames : string
    proteinDescriptions : string

    //  Overall
    generatedPeptides_Overall_Set: Set<string> = new Set();
    uniquePeptideCount_Overall: number //  Computed last across the protein items
    numPsms_Overall : number = 0;

    get peptideCount_Overall() : number {

        return this.generatedPeptides_Overall_Set.size;
    }

    //  ONLY populated when Single Search and NO Sub Groups
    proteinCoverageRatio_SingleSearch_NoSubGroups : number //  from const proteinCoverageRatio = proteinCoverageObject.getProteinSequenceCoverageRatio();
    proteinCoverageRatioDisplay_SingleSearch_NoSubGroups : string

    protein_SubItem_Records_Map_Key_projectSearchId : Map<number, ProteinDataDisplay_ProteinList_Sub_Item> = new Map();

    protein_SubItem_Records_Map_Key_SubGroup_Id : Map<number, ProteinDataDisplay_ProteinList_Sub_Item> = new Map();
}

/**
 * Entry in ProteinList_Item
 */
export class ProteinDataDisplay_ProteinList_Sub_Item {

    constructor(
        {
            proteinSequenceVersionId, proteinInfo, reportedPeptide_CommonValue_EncodedString_ForProtein_Set,
            uniquePeptideCount, numPsms, reportedPeptideIds_NoPsmFilters, reportedPeptideIds_AndTheirPsmIds
        } : {
            proteinSequenceVersionId: number,
            proteinInfo: ProteinDataDisplay_ProteinList_Item_ProteinInfo,
            reportedPeptide_CommonValue_EncodedString_ForProtein_Set: Set<string>,
            uniquePeptideCount?: number,
            numPsms: number,
            reportedPeptideIds_NoPsmFilters: Set<number>,
            reportedPeptideIds_AndTheirPsmIds: Map<number, Set<number>>
        }) {
        this.proteinSequenceVersionId = proteinSequenceVersionId;
        this.proteinInfo = proteinInfo;
        this.reportedPeptide_CommonValue_EncodedString_ForProtein_Set = reportedPeptide_CommonValue_EncodedString_ForProtein_Set;
        this.uniquePeptideCount = uniquePeptideCount;
        this.numPsms = numPsms;
        this.reportedPeptideIds_NoPsmFilters = reportedPeptideIds_NoPsmFilters;
        this.reportedPeptideIds_AndTheirPsmIds = reportedPeptideIds_AndTheirPsmIds;
    }

    proteinSequenceVersionId: number
    proteinInfo: ProteinDataDisplay_ProteinList_Item_ProteinInfo // Map Value from loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()
    reportedPeptide_CommonValue_EncodedString_ForProtein_Set: Set<string>
    //  Computed: peptideCount: number // (length of Set),
    uniquePeptideCount?: number //  Computed last across the protein items
    numPsms : number

    //  for downloads

    reportedPeptideIds_NoPsmFilters: Set<number>

    reportedPeptideIds_AndTheirPsmIds: Map<number, Set<number>>

    get peptideCount() {
        if ( ! this.reportedPeptide_CommonValue_EncodedString_ForProtein_Set ) {
            return 0;
        }
        return this.reportedPeptide_CommonValue_EncodedString_ForProtein_Set.size;
    }
}

/**
 * ProteinList_Item Protein Info
 */
export class ProteinDataDisplay_ProteinList_Item_ProteinInfo {
    proteinLength : number
    annotations : Array<{ name : string, description : string, taxonomy : number }>
}


/**
 *
 * Reported Peptide Ids and their PSM Ids Data Per Search Container
 */
export class ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_Container {

    data_Per_ProjectSearchId_Map_Key_ProjectSearchId : Map<number, ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_SingleSearch> = new Map();

    constructor() {}

    private _onlyForceUseConstructor() {}
}

/**
 *
 * Reported Peptide Ids and their PSM Ids Data Per Search - Single Search
 */
export class ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_SingleSearch {

    projectSearchId : number

    data_Per_ReportedPeptideId_Map_Key_ReportedPeptideId : Map<number, ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_SingleReportedPeptideId> = new Map();

    constructor({ projectSearchId } : { projectSearchId : number }) {
        this.projectSearchId = projectSearchId;
    }

    private _onlyForceUseConstructor() {}
}

/**
 *
 * Reported Peptide Ids and their PSM Ids Data Per Search - Single Reported Peptide Id
 */
export class ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_SingleReportedPeptideId {

    reportedPeptideId : number

    all_PsmIds_BasedOnFilterCutoffs: boolean
    psmIds: Set<number>  //  undefined or null if all_PsmIds_BasedOnFilterCutoffs is true

    constructor({ reportedPeptideId } : { reportedPeptideId : number }) {
        this.reportedPeptideId = reportedPeptideId;
    }

    private _onlyForceUseConstructor() {}
}


