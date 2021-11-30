/**
 * proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes.ts
 *
 * Create Display Data for Protein List - ProteinDisplayData_...  classes
 */




import {ProteinGroup} from "page_js/data_pages/protein_inference/ProteinGroup";
import {ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";

/**
 * returned from function
 */
export class ProteinDisplayData_From_createProteinDisplayData_ProteinList{

    proteinList: Array<ProteinDataDisplay_ProteinList_Item>;
    proteinGroupsList: Array<ProteinDataDisplay_ProteinList_GroupedProtein_Item>;

    summaryMap_Key_ProjectSearchId? : Map<number, ProteinDataDisplay__Summary_PerSearch>

    reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container__After_All_Filtering?: ProteinDataDisplay__ReportedPeptideIds_AndTheir_PsmIds_PerSearch_Container

    distinctPeptide_TotalCount: number
    psm_TotalCount: number

    shallowClone() : ProteinDisplayData_From_createProteinDisplayData_ProteinList {
        const clone = new ProteinDisplayData_From_createProteinDisplayData_ProteinList();
        clone.proteinList = this.proteinList;
        clone.proteinGroupsList = this.proteinGroupsList;
        clone.summaryMap_Key_ProjectSearchId = this.summaryMap_Key_ProjectSearchId;
        clone.reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container__After_All_Filtering = this.reportedPeptideIds_AndTheir_PsmIds_PerSearch_Container__After_All_Filtering;
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

    isSubsetGroup: boolean  //   Set to true when proteinGroup.passesFilter is false.
                            //   True when "Parsimonious" selected and this is not part of "Parsimonious" proteins
                            //   True when "No Subgroups" selected and this is a subset group

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

    nsaf : number = -9998;

    get peptideCount_Overall() : number {

        return this.generatedPeptides_Overall_Set.size;
    }

    protein_SubItem_Records_Map_Key_projectSearchId : Map<number, ProteinDataDisplay_ProteinList_Sub_Item> = new Map();

    protein_SubItem_Records_Map_Key_SubGroup_Id : Map<number, ProteinDataDisplay_ProteinList_Sub_Item> = new Map();

    //  ONLY populate for Experiment
    experiment_SubData: ProteinDataDisplay_ProteinList_Experiment_SubData
}

/**
 * Entry in ProteinList_Item
 */
export class ProteinDataDisplay_ProteinList_Experiment_SubData {

    experiment_SubData_PerCondition_Map_Key_ConditionId : Map<number, ProteinDataDisplay_ProteinList_Experiment_SubData_PerCondition> = new Map()

    private _DoNotCall_JustForceUseConstructor() {}
}

/**
 * Entry in ProteinList_Item
 */
export class ProteinDataDisplay_ProteinList_Experiment_SubData_PerCondition {

    nsaf: number = 0;
    numPsms: number = 0;
    reportedPeptide_CommonValue_EncodedString_ForProtein_Set: Set<string>

    //  in a given experiment condition, unique peptides would be the number of peptides unique to that protein (or protein group) in that condition
    uniquePeptideCount: number

    //  ProteinDataDisplay_ProteinList_Sub_Item objects for Project Search Ids that make up this condition
    protein_SubItem_Record_Map_Key_ProjectSearchId: Map<number, ProteinDataDisplay_ProteinList_Sub_Item>

    //  Cache computed values
    private _proteinCoverageRatio: number
    private _proteinCoverageRatioDisplay : string

    get peptideCount() {
        if ( ! this.reportedPeptide_CommonValue_EncodedString_ForProtein_Set ) {
            return 0;
        }
        return this.reportedPeptide_CommonValue_EncodedString_ForProtein_Set.size;
    }

    /**
     * Compute Sequence coverage and return it
     */
    compute_SequenceCoverage() : {
        proteinCoverageRatio: number
        proteinCoverageRatioDisplay : string
    } {
        if ( this._proteinCoverageRatio !== undefined ) {
            //  Already computed so return it
            return {  //  EARLY RETURN
                proteinCoverageRatio: this._proteinCoverageRatio,
                proteinCoverageRatioDisplay: this._proteinCoverageRatioDisplay
            }
        }

        let proteinLength: number = undefined;

        const proteinCoverage_BooleanArrayOfProteinCoverage_AllSearches : Array<boolean> = [];

        for ( const protein_SubItem_For_ProjectSearchId of this.protein_SubItem_Record_Map_Key_ProjectSearchId.values() ) {

            const proteinCoverage_KeyProteinSequenceVersionId = protein_SubItem_For_ProjectSearchId.loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

            const reportedPeptideIds_For_Protein = new Set<number>();

            if ( protein_SubItem_For_ProjectSearchId.reportedPeptideIds_AndTheirPsmIds && protein_SubItem_For_ProjectSearchId.reportedPeptideIds_AndTheirPsmIds.size > 0 ) {
                for ( const reportedPeptideId of protein_SubItem_For_ProjectSearchId.reportedPeptideIds_AndTheirPsmIds.keys() ) {
                    reportedPeptideIds_For_Protein.add( reportedPeptideId );
                }
            }
            if ( protein_SubItem_For_ProjectSearchId.reportedPeptideIds_NoPsmFilters && protein_SubItem_For_ProjectSearchId.reportedPeptideIds_NoPsmFilters.size > 0 ) {
                for ( const reportedPeptideId of protein_SubItem_For_ProjectSearchId.reportedPeptideIds_NoPsmFilters ) {
                    reportedPeptideIds_For_Protein.add( reportedPeptideId );
                }
            }

            const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get(protein_SubItem_For_ProjectSearchId.proteinSequenceVersionId);
            if (proteinCoverageObject === undefined) {
                throw Error("No proteinCoverageObject found.  proteinSequenceVersionId: " + protein_SubItem_For_ProjectSearchId.proteinSequenceVersionId);
            }

            proteinLength = proteinCoverageObject.getProteinLength();

            const proteinCoverage_BooleanArrayOfProteinCoverage = proteinCoverageObject.getBooleanArrayOfProteinCoverage_FilteringOnReportedPeptideIds({ reportedPeptideIds_For_Protein });

            //  Copy ProteinCoverage for Search to ProteinCoverage for All

            const proteinCoverage_BooleanArrayOfProteinCoverage_Length = proteinCoverage_BooleanArrayOfProteinCoverage.length;
            for ( let index = 0; index < proteinCoverage_BooleanArrayOfProteinCoverage_Length; index++ ) {
                if ( proteinCoverage_BooleanArrayOfProteinCoverage[ index ] ) {
                    proteinCoverage_BooleanArrayOfProteinCoverage_AllSearches[ index ] = true;
                }
            }
        }

        if ( proteinCoverage_BooleanArrayOfProteinCoverage_AllSearches.length === 0 ) {
            //  No Coverage entries

            this._proteinCoverageRatio = 0;
            this._proteinCoverageRatioDisplay = "0";

        } else {

            let proteinCoverage_Count = 0;

            const proteinCoverage_BooleanArrayOfProteinCoverage_AllSearches_Length = proteinCoverage_BooleanArrayOfProteinCoverage_AllSearches.length;
            for ( let index = 0; index < proteinCoverage_BooleanArrayOfProteinCoverage_AllSearches_Length; index++ ) {
                if (proteinCoverage_BooleanArrayOfProteinCoverage_AllSearches[index]) {
                    proteinCoverage_Count++;
                }
            }

            const proteinCoverageRatio = proteinCoverage_Count / proteinLength;

            this._proteinCoverageRatio = proteinCoverageRatio;
            this._proteinCoverageRatioDisplay = proteinCoverageRatio.toFixed(3);;
        }

        return {
            proteinCoverageRatio: this._proteinCoverageRatio,
            proteinCoverageRatioDisplay: this._proteinCoverageRatioDisplay
        }
    }

    private _DoNotCall_JustForceUseConstructor() {}
}

/**
 * Entry in ProteinList_Item map protein_SubItem_Records_Map_Key_projectSearchId or map protein_SubItem_Records_Map_Key_SubGroup_Id
 */
export class ProteinDataDisplay_ProteinList_Sub_Item {

    constructor(
        {
            proteinSequenceVersionId, proteinInfo, reportedPeptide_CommonValue_EncodedString_ForProtein_Set,
            uniquePeptideCount, numPsms, reportedPeptideIds_NoPsmFilters, reportedPeptideIds_AndTheirPsmIds,
            loadedDataPerProjectSearchIdHolder
        } : {
            proteinSequenceVersionId: number,
            proteinInfo: ProteinDataDisplay_ProteinList_Item_ProteinInfo,
            reportedPeptide_CommonValue_EncodedString_ForProtein_Set: Set<string>,
            uniquePeptideCount?: number,
            numPsms: number,
            reportedPeptideIds_NoPsmFilters: Set<number>,
            reportedPeptideIds_AndTheirPsmIds: Map<number, Set<number>>
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }) {
        this.proteinSequenceVersionId = proteinSequenceVersionId;
        this.proteinInfo = proteinInfo;
        this.reportedPeptide_CommonValue_EncodedString_ForProtein_Set = reportedPeptide_CommonValue_EncodedString_ForProtein_Set;
        this.uniquePeptideCount = uniquePeptideCount;
        this.numPsms = numPsms;
        this.reportedPeptideIds_NoPsmFilters = reportedPeptideIds_NoPsmFilters;
        this.reportedPeptideIds_AndTheirPsmIds = reportedPeptideIds_AndTheirPsmIds;
        this.loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder;
    }

    proteinSequenceVersionId: number
    proteinInfo: ProteinDataDisplay_ProteinList_Item_ProteinInfo // Map Value from loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()
    reportedPeptide_CommonValue_EncodedString_ForProtein_Set: Set<string> = new Set()
    //  Computed: peptideCount: number // (length of Set),
    uniquePeptideCount?: number //  Computed last across the protein items
    numPsms : number

    nsaf : number = -9998;

    dataPerReportedPeptideId_Entries_Array: Array<ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry> = []

    reportedPeptideIds_NoPsmFilters: Set<number>

    reportedPeptideIds_AndTheirPsmIds: Map<number, Set<number>>

    loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    proteinCoverageRatio : number
    proteinCoverageRatioDisplay : string

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


