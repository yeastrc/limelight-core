/**
 * proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes.ts
 *
 * Create Display Data for Protein List - ProteinDisplayData_...  classes
 */


import {ProteinGroup} from "page_js/data_pages/protein_inference/ProteinGroup";
import {ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";

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
}


/**
 * Entry in proteinList
 */
export class ProteinDataDisplay_ProteinList_Item {

    proteinSequenceVersionId : number
    proteinNames : string
    proteinDescriptions : string

    //  Overall
    numPsms_Overall : number = 0;
    generatedPeptides_Overall_Set: Set<string> = new Set();
    uniquePeptideCount_Overall: number //  Computed last across the protein items

    /**
     *
     * @param searchSubGroup_Ids_Selected - Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
     * @param projectSearchIds
     */
    get_psm_Count_MaxValueForSubType(
        {
            searchSubGroup_Ids_Selected,
            projectSearchIds
        } : {
            searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
            projectSearchIds: Array<number>
        }
    ) : number {

        let psm_Count_MaxValueForSubType = 0;

        if ( searchSubGroup_Ids_Selected && this.protein_SubItem_Records_Map_Key_SubGroup_Id ) {

            for ( const searchSubGroup_Id of searchSubGroup_Ids_Selected ) {

                const protein_SubItem_Record = this.protein_SubItem_Records_Map_Key_SubGroup_Id.get( searchSubGroup_Id );
                if ( protein_SubItem_Record ) {
                    if ( psm_Count_MaxValueForSubType < protein_SubItem_Record.numPsms ) {
                        psm_Count_MaxValueForSubType = protein_SubItem_Record.numPsms;
                    }
                }
            }

        } else if ( this.experiment_SubData ) {

            for ( const protein_SubItem_Record of this.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId.values() ) {

                if ( psm_Count_MaxValueForSubType < protein_SubItem_Record.numPsms ) {
                    psm_Count_MaxValueForSubType = protein_SubItem_Record.numPsms;
                }
            }
        } else {

            for ( const projectSearchId of projectSearchIds ) {

                const protein_SubItem_Record = this.protein_SubItem_Records_Map_Key_projectSearchId.get( projectSearchId );
                if ( protein_SubItem_Record ) {
                    if ( psm_Count_MaxValueForSubType < protein_SubItem_Record.numPsms ) {
                        psm_Count_MaxValueForSubType = protein_SubItem_Record.numPsms;
                    }
                }
            }
        }

        return psm_Count_MaxValueForSubType;
    }

    /**
     *
     * @param searchSubGroup_Ids_Selected - Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
     * @param projectSearchIds
     */
    get_generatedPeptides_Count_MaxValueForSubType(
        {
            searchSubGroup_Ids_Selected,
            projectSearchIds
        } : {
            searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
            projectSearchIds: Array<number>
        }
    ) : number {

        let generatedPeptides_Count_MaxValueForSubType = 0;

        if ( searchSubGroup_Ids_Selected && this.protein_SubItem_Records_Map_Key_SubGroup_Id ) {

            for ( const searchSubGroup_Id of searchSubGroup_Ids_Selected ) {

                const protein_SubItem_Record = this.protein_SubItem_Records_Map_Key_SubGroup_Id.get( searchSubGroup_Id );
                if ( protein_SubItem_Record ) {
                    if ( generatedPeptides_Count_MaxValueForSubType < protein_SubItem_Record.peptideCount ) {
                        generatedPeptides_Count_MaxValueForSubType = protein_SubItem_Record.peptideCount;
                    }
                }
            }

        } else if ( this.experiment_SubData ) {

            for ( const protein_SubItem_Record of this.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId.values() ) {

                if ( generatedPeptides_Count_MaxValueForSubType < protein_SubItem_Record.peptideCount ) {
                    generatedPeptides_Count_MaxValueForSubType = protein_SubItem_Record.peptideCount;
                }
            }
        } else {

            for ( const projectSearchId of projectSearchIds ) {

                const protein_SubItem_Record = this.protein_SubItem_Records_Map_Key_projectSearchId.get( projectSearchId );
                if ( protein_SubItem_Record ) {
                    if ( generatedPeptides_Count_MaxValueForSubType < protein_SubItem_Record.peptideCount ) {
                        generatedPeptides_Count_MaxValueForSubType = protein_SubItem_Record.peptideCount;
                    }
                }
            }
        }

        return generatedPeptides_Count_MaxValueForSubType;
    }

    /**
     *
     * @param searchSubGroup_Ids_Selected - Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
     * @param projectSearchIds
     */
    get_uniquePeptideCount_Count_MaxValueForSubType(
        {
            searchSubGroup_Ids_Selected,
            projectSearchIds
        } : {
            searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
            projectSearchIds: Array<number>
        }
    ) : number {

        let uniquePeptideCount_Count_MaxValueForSubType = 0;

        if ( searchSubGroup_Ids_Selected && this.protein_SubItem_Records_Map_Key_SubGroup_Id ) {

            for (const searchSubGroup_Id of searchSubGroup_Ids_Selected) {

                const protein_SubItem_Record = this.protein_SubItem_Records_Map_Key_SubGroup_Id.get(searchSubGroup_Id);
                if (protein_SubItem_Record) {
                    if (uniquePeptideCount_Count_MaxValueForSubType < protein_SubItem_Record.uniquePeptideCount) {
                        uniquePeptideCount_Count_MaxValueForSubType = protein_SubItem_Record.uniquePeptideCount;
                    }
                }
            }

        } else if ( this.experiment_SubData ) {

            for ( const protein_SubItem_Record of this.experiment_SubData.experiment_SubData_PerCondition_Map_Key_ConditionId.values() ) {

                if ( uniquePeptideCount_Count_MaxValueForSubType < protein_SubItem_Record.uniquePeptideCount ) {
                    uniquePeptideCount_Count_MaxValueForSubType = protein_SubItem_Record.uniquePeptideCount;
                }
            }
        } else {

            for ( const projectSearchId of projectSearchIds ) {

                const protein_SubItem_Record = this.protein_SubItem_Records_Map_Key_projectSearchId.get( projectSearchId );
                if ( protein_SubItem_Record ) {
                    if ( uniquePeptideCount_Count_MaxValueForSubType < protein_SubItem_Record.uniquePeptideCount ) {
                        uniquePeptideCount_Count_MaxValueForSubType = protein_SubItem_Record.uniquePeptideCount;
                    }
                }
            }
        }

        return uniquePeptideCount_Count_MaxValueForSubType;
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

    /**
     * WARNING::  For Proteins in a Protein Group, this represents the count for ALL the proteins in the group
     */
    adjusted_Spectral_Count_ABACUS : number = -9995

    nsaf__Using_Adjusted_Spectral_Count_ABACUS: number = -9998

    numPsms: number = 0;
    reportedPeptide_CommonValue_EncodedString_ForProtein_Set: Set<string>

    //  in a given experiment condition, unique peptides would be the number of peptides unique to that protein (or protein group) in that condition
    uniquePeptideCount: number

    //  ProteinDataDisplay_ProteinList_Sub_Item objects for Project Search Ids that make up this condition
    protein_SubItem_Record_Map_Key_ProjectSearchId: Map<number, ProteinDataDisplay_ProteinList_Sub_Item>

    //  Cache computed values

    private _proteinCoverageData : {
        proteinCoverageRatio: number
        proteinCoverageRatioDisplay : string
    }

    /**
     * Save the proteinCoverageData to this object for future retrieval
     * @param proteinCoverageData
     */
    save_To_CachedData__ProteinCoverageData(
        proteinCoverageData : {
            proteinCoverageRatio: number
            proteinCoverageRatioDisplay : string
        }
    ) : void {
        this._proteinCoverageData = proteinCoverageData
    }

    /**
     * returns object saved to this object by calling save_To_CachedData__ProteinCoverageData(...)
     */
    get_From_CachedData__ProteinCoverageData()  {
        return this._proteinCoverageData
    }

    /**
     *
     */
    get peptideCount() {
        if ( ! this.reportedPeptide_CommonValue_EncodedString_ForProtein_Set ) {
            return 0;
        }
        return this.reportedPeptide_CommonValue_EncodedString_ForProtein_Set.size;
    }

    private _DoNotCall_JustForceUseConstructor() {}
}

/**
 * Entry in ProteinList_Item map protein_SubItem_Records_Map_Key_projectSearchId or map protein_SubItem_Records_Map_Key_SubGroup_Id
 */
export class ProteinDataDisplay_ProteinList_Sub_Item {

    constructor(
        {
            proteinSequenceVersionId, projectSearchId, proteinInfo, reportedPeptide_CommonValue_EncodedString_ForProtein_Set,
            uniquePeptideCount, numPsms, reportedPeptideIds_NoPsmFilters, reportedPeptideIds_AndTheirPsmIds,
        } : {
            proteinSequenceVersionId: number,
            projectSearchId: number
            proteinInfo: ProteinDataDisplay_ProteinList_Item_ProteinInfo,
            reportedPeptide_CommonValue_EncodedString_ForProtein_Set: Set<string>,
            uniquePeptideCount?: number,
            numPsms: number,
            reportedPeptideIds_NoPsmFilters: Set<number>,
            reportedPeptideIds_AndTheirPsmIds: Map<number, Set<number>>
        }) {
        this.proteinSequenceVersionId = proteinSequenceVersionId;
        this.projectSearchId = projectSearchId;
        this.proteinInfo = proteinInfo;
        this.reportedPeptide_CommonValue_EncodedString_ForProtein_Set = reportedPeptide_CommonValue_EncodedString_ForProtein_Set;
        this.uniquePeptideCount = uniquePeptideCount;
        this.numPsms = numPsms;
        this.reportedPeptideIds_NoPsmFilters = reportedPeptideIds_NoPsmFilters;
        this.reportedPeptideIds_AndTheirPsmIds = reportedPeptideIds_AndTheirPsmIds;
    }

    proteinSequenceVersionId: number
    projectSearchId: number  //  Only really useful if per projectSearchId
    proteinInfo: ProteinDataDisplay_ProteinList_Item_ProteinInfo
    reportedPeptide_CommonValue_EncodedString_ForProtein_Set: Set<string> = new Set()
    //  Computed: peptideCount: number // (length of Set),
    uniquePeptideCount?: number //  Computed last across the protein items
    numPsms : number

    nsaf : number = -9998;

    /**
     * WARNING::  For Proteins in a Protein Group, this represents the count for ALL the proteins in the group
     */
    adjusted_Spectral_Count_ABACUS : number = -9995

    nsaf__Using_Adjusted_Spectral_Count_ABACUS : number = -9995

    dataPerReportedPeptideId_Entries_Array: Array<ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry> = []

    reportedPeptideIds_NoPsmFilters: Set<number>

    reportedPeptideIds_AndTheirPsmIds: Map<number, Set<number>>

    proteinCoverageRatio : number
    proteinCoverageRatioDisplay : string

    filterableDescriptiveAnnotationDisplayItem_Map_Key_AnnotationTypeId: Map<number, ProteinDataDisplay_ProteinList_Sub_Item__FilterableDescriptiveAnnotationDisplayItem>

    get peptideCount() {
        if ( ! this.reportedPeptide_CommonValue_EncodedString_ForProtein_Set ) {
            return 0;
        }
        return this.reportedPeptide_CommonValue_EncodedString_ForProtein_Set.size;
    }
}

/**
 *
 */
export class ProteinDataDisplay_ProteinList_Sub_Item__FilterableDescriptiveAnnotationDisplayItem {

    annotationTypeId: number
    valueDisplay: string
    valueSort: number | string //  DataTable valueSort
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

    constructor(
        {
            reportedPeptideId, all_PsmIds_BasedOnFilterCutoffs
        } : {
            reportedPeptideId : number
            //  Initial Values
            all_PsmIds_BasedOnFilterCutoffs: boolean
        }) {
        this.reportedPeptideId = reportedPeptideId;
        this.all_PsmIds_BasedOnFilterCutoffs = all_PsmIds_BasedOnFilterCutoffs;
    }

    private _onlyForceUseConstructor() {}
}


