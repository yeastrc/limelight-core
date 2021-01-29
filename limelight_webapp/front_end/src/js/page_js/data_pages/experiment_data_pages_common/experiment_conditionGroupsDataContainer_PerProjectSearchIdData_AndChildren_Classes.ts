/**
 * experiment_conditionGroupsDataContainer_PerProjectSearchIdData_AndChildren_Classes.ts
 * 
 */



const _VERSION = 1;

/**
 * Entry in Experiment_ConditionGroupsDataContainer for get_data_ForProjectSearchId
 * 
 * It is preferred to not directly access these properties but to be compatible with the previous code in SearchDetailsAndFilterBlock_UserInputInOverlay the leading "_" is removed.
 * 
 * This object can be serialized to JSON and sent to the server where SearchDataLookupParams_For_Single_ProjectSearchId is expected.
 * 
 * Format of contents match Java class SearchDataLookupParams_For_Single_ProjectSearchId and children.
 * Also matches format of data in Javascript class SearchDetailsAndFilterBlock_UserInputInOverlay.
 * 
 */
class Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData {

    //     Array of ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data

    private psmFilters : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> = undefined;
    private reportedPeptideFilters : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> = undefined;
    private matchedProteinFilters : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> = undefined;

    //    Array of Integer of Annotation Type Id values

    private psmAnnTypeDisplay : Array<number> = undefined;
    private reportedPeptideAnnTypeDisplay : Array<number> = undefined;
    private matchedProteinAnnTypeDisplay : Array<number> = undefined;

    //  Matching Java classes:
    // class SearchDataLookupParams_For_Single_ProjectSearchId {
    //         //  Filter values (cutoffs per annotation type)
    //     private List<SearchDataLookupParams_Filter_Per_AnnotationType> psmFilters;
    //     private List<SearchDataLookupParams_Filter_Per_AnnotationType> reportedPeptideFilters;
    //     private List<SearchDataLookupParams_Filter_Per_AnnotationType> matchedProteinFilters;

    //     //  Annotation Type Ids to Display
    //     private List<Integer> psmAnnTypeDisplay;
    //     private List<Integer> reportedPeptideAnnTypeDisplay;
    //     private List<Integer> matchedProteinAnnTypeDisplay;
    // }

    
    /**
     * 
     * 
     */
    constructor() {

    }

    /**
     * 
     * @returns Array of ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data, or undefined or null
     */
    get_psmFilters_PerProjectSearchId() : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> {

        return this.psmFilters;
    }
    /**
     * 
     * @param Array of ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data, or undefined or null
     */
    set_psmFilters_PerProjectSearchId( psmFilters : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> ) {

        if ( psmFilters ) {
            if ( ! ( psmFilters instanceof Array ) ) {
                throw Error("set_psmFilters_PerProjectSearchId, param is not Array");
            }
            this._sortFilters({ filters : psmFilters });
        }

        this.psmFilters = psmFilters;
    }

    /**
     * 
     * @returns Array of ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data, or undefined or null
     */
    get_reportedPeptideFilters_PerProjectSearchId() : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> {

        return this.reportedPeptideFilters;
    }
    /**
     * 
     * @param reportedPeptideFilters - Array of ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data, or undefined or null
     */
    set_reportedPeptideFilters_PerProjectSearchId( reportedPeptideFilters : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> ) {

        if ( reportedPeptideFilters ) {
            if ( ! ( reportedPeptideFilters instanceof Array ) ) {
                throw Error("set_reportedPeptideFilters_PerProjectSearchId, param is not Array");
            }
            this._sortFilters({ filters : reportedPeptideFilters });
        }

        this.reportedPeptideFilters = reportedPeptideFilters;
    }

    /**
     * 
     * @returns Array of ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data, or undefined or null
     */
    get_matchedProteinFilters_PerProjectSearchId() : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> {

        return this.matchedProteinFilters;
    }
    /**
     * 
     * @param Array of ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data, or undefined or null
     */
    set_matchedProteinFilters_PerProjectSearchId( matchedProteinFilters : Array<Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data> ) {

        if ( matchedProteinFilters ) {
            if ( ! ( matchedProteinFilters instanceof Array ) ) {
                throw Error("set_matchedProteinFilters_PerProjectSearchId, param is not Array");
            }
            this._sortFilters({ filters : matchedProteinFilters });
        }

        this.matchedProteinFilters = matchedProteinFilters;
    }

    /**
     * 
     * @returns Array of ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data, or undefined or null
     */
    get_psmAnnTypeDisplay_PerProjectSearchId() : Array<number> {

        return this.psmAnnTypeDisplay;
    }
    /**
     * 
     * @param Array of ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data, or undefined or null
     */
    set_psmAnnTypeDisplay_PerProjectSearchId( psmAnnTypeDisplay : Array<number> ) {

        if ( psmAnnTypeDisplay ) {
            if ( ! ( psmAnnTypeDisplay instanceof Array ) ) {
                throw Error("set_psmAnnTypeDisplay_PerProjectSearchId, param is not Array");
            }
        }

        this.psmAnnTypeDisplay = psmAnnTypeDisplay;
    }

    /**
     * 
     * @returns Array of ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data, or undefined or null
     */
    get_reportedPeptideAnnTypeDisplay_PerProjectSearchId() : Array<number> {

        return this.reportedPeptideAnnTypeDisplay;
    }
    /**
     * 
     * @param Array of ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data, or undefined or null
     */
    set_reportedPeptideAnnTypeDisplay_PerProjectSearchId( reportedPeptideAnnTypeDisplay : Array<number> ) {

        if ( reportedPeptideAnnTypeDisplay ) {
            if ( ! ( reportedPeptideAnnTypeDisplay instanceof Array ) ) {
                throw Error("set_reportedPeptideAnnTypeDisplay_PerProjectSearchId, param is not Array");
            }
        }

        this.reportedPeptideAnnTypeDisplay = reportedPeptideAnnTypeDisplay;
    }

    /**
     * 
     * @returns Array of ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data, or undefined or null
     */
    get_matchedProteinAnnTypeDisplay_PerProjectSearchId() : Array<number> {

        return this.matchedProteinAnnTypeDisplay;
    }
    /**
     * 
     * @param Array of ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data, or undefined or null
     */
    set_matchedProteinAnnTypeDisplay_PerProjectSearchId( matchedProteinAnnTypeDisplay : Array<number> ) {

        if ( matchedProteinAnnTypeDisplay ) {
            if ( ! ( matchedProteinAnnTypeDisplay instanceof Array ) ) {
                throw Error("set_matchedProteinAnnTypeDisplay_PerProjectSearchId, param is not Array");
            }
        }

        this.matchedProteinAnnTypeDisplay = matchedProteinAnnTypeDisplay;
    }

    ////////////////////////

    /**
     * 
     * @param filters
     */
    _sortFilters({ filters }) {

        if ( ! filters ) {
            return;
        }

        filters.sort( (a,b) => {
            if ( a.get_annTypeId() < b.get_annTypeId() ) {
                return -1;
            }
            if ( a.get_annTypeId() > b.get_annTypeId() ) {
                return 1;
            }
            return 0;
        })
    }

}


/**
 * Entry in ConditionGroupsDataContainer_PerProjectSearchIdData for type (psm,reported peptide, matched protein)
 * 
 * Format of contents match Java class SearchDataLookupParams_For_Single_ProjectSearchId and children.
 * Also matches format of data in Javascript class SearchDetailsAndFilterBlock_UserInputInOverlay.
 * 
 */
class Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data {

    private annTypeId : number = undefined;
    private value : number = undefined;

    // class SearchDataLookupParams_Filter_Per_AnnotationType {}
    //     /**
    //      * Annotation Type Id
    //      */
    //     private Integer annTypeId;
    //     private Double value;
    // }
    
    /**
     * 
     * 
     */
    constructor() {

    }

    get_annTypeId() {
        return this.annTypeId
    }
    set_annTypeId( annTypeId ) {
        this.annTypeId = annTypeId;
    }

    get_value() {
        return this.value
    }
    set_value( value ) {
        this.value = value;
    }
}


export { Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData, Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data }
