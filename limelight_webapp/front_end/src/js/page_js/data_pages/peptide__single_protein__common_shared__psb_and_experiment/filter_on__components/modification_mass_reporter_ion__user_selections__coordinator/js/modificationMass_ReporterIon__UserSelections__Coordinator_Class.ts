/**
 * modificationMass_ReporterIon__UserSelections__Coordinator_Class.ts
 *
 * Coordinates selections between Modification Mass and Reporter Ion User selections.
 *
 * Required to track:
 *
 *   "First Selected OR/AND/EXCLUDE" selection since will display "ADD" button instead "OR"/"AND" buttons.
 *   "Second Selected OR/AND" selection since need
 *      to replace first selection if was "ADD" with the "OR" or "AND" of the second selection.
 */


import {ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ReporterIonMass_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject";


/**
 *
 */
export class ModificationMass_ReporterIon__UserSelections__Coordinator_Class {

    private _contents_Changed_Callback: ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback

    private _modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject
    private _reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject

    private _total_ANY_ALL_Selections_Count = 0;

    ///  Bind local callback functions that are passed to the sub part objects for Variable and Open Modifications

    //  Callbacks from Modifications State Object on on change
    private _selection__Added__Pre_Post_Set_Callback_BindThis = this._selection__Added__Pre_Post_Set_Callback.bind(this);
    private _selection__Updated_Callback_BindThis = this._selection__Updated_Callback.bind(this);

    private _DO_NOT_CALL() {

        const _selection__Added__Pre_Post_Set_Callback : ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback = this._selection__Added__Pre_Post_Set_Callback;
        const _selection__Updated_Callback : ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Updated__Callback = this._selection__Updated_Callback;
    }

    /**
     *
     * @param contents_Changed_Callback
     * @param modificationMass_UserSelections_StateObject
     * @param reporterIonMass_UserSelections_StateObject
     */
    constructor(
        {
            contents_Changed_Callback,
            modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject
        } : {
            contents_Changed_Callback: ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback
            modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject
            reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
        }
    ) {
        this._contents_Changed_Callback = contents_Changed_Callback;

        this._modificationMass_UserSelections_StateObject = modificationMass_UserSelections_StateObject;
        this._reporterIonMass_UserSelections_StateObject = reporterIonMass_UserSelections_StateObject;

        this._modificationMass_UserSelections_StateObject.add__ModificationMass_UserSelections_StateObject__Selection__Added__Pre_Post_Set_Callback(
            this._selection__Added__Pre_Post_Set_Callback_BindThis
        )
        this._modificationMass_UserSelections_StateObject.add__ModificationMass_UserSelections_StateObject__Selection__Updated__Callback(
            this._selection__Updated_Callback_BindThis
        )
        this._reporterIonMass_UserSelections_StateObject.add__ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback(
            this._selection__Added__Pre_Post_Set_Callback_BindThis
        )
        this._reporterIonMass_UserSelections_StateObject.add__ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Updated__Callback(
            this._selection__Updated_Callback_BindThis
        )

        //  Set Initial value for this._total_ANY_ALL_Selections_Count
        this._update_Total_ANY_ALL_Selections_Count();
    }

    /**
     * Create object of class ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class
     * based on current contents
     */
    get_Current_ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class() : ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class {

        let show_Add_Option_InsteadOf_OR_AND = false;
        if ( this._total_ANY_ALL_Selections_Count === 0 ) {
            show_Add_Option_InsteadOf_OR_AND = true;
        }
        let single_OR_AND_Selected = false;
        if ( this._total_ANY_ALL_Selections_Count === 1 ) {
            single_OR_AND_Selected = true;
        }

        const result = new ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class({
            show_Add_Option_InsteadOf_OR_AND,
            single_OR_AND_Selected
        });

        return result;
    }


    private _selection__Added__Pre_Post_Set_Callback( params : ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback_Params) : void {

        this._update_Total_ANY_ALL_Selections_Count();

        if ( params.pre_post_Set === ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_ENUM.POST_SET ) {

            let old_Value_is_ANY_or_ALL = false;  //  Internal code uses ANY/ALL instead of shown OR/AND
            let new_Value_is_ANY_or_ALL = false;

            if ( params.oldValue_singleProtein_Filter_SelectionType ) {
                if ( params.oldValue_singleProtein_Filter_SelectionType === SingleProtein_Filter_SelectionType.ANY
                    || params.oldValue_singleProtein_Filter_SelectionType === SingleProtein_Filter_SelectionType.ALL ) {
                    old_Value_is_ANY_or_ALL = true;
                }
            }
            if ( params.newValue_singleProtein_Filter_SelectionType ) {
                if ( params.newValue_singleProtein_Filter_SelectionType === SingleProtein_Filter_SelectionType.ANY
                    || params.newValue_singleProtein_Filter_SelectionType === SingleProtein_Filter_SelectionType.ALL ) {
                    new_Value_is_ANY_or_ALL = true;
                }
            }

            if ( (! old_Value_is_ANY_or_ALL ) && new_Value_is_ANY_or_ALL ) {

                //  Prev was not ANY/ALL and now is ANY/ALL

                if ( this._total_ANY_ALL_Selections_Count === 2 ) {

                    //  NOW have 2 ANY/ALL entries so previously had 1 ANY/ALL entry
                    //    Force change both entries to be of the type currently being set

                    this._modificationMass_UserSelections_StateObject.forceUpdate_SetEvery_ANY_ALL_Entries_To_SingleProtein_Filter_SelectionType_Parameter(
                        params.newValue_singleProtein_Filter_SelectionType
                    );

                    this._reporterIonMass_UserSelections_StateObject.forceUpdate_SetEvery_ANY_ALL_Entries_To_SingleProtein_Filter_SelectionType_Parameter(
                        params.newValue_singleProtein_Filter_SelectionType
                    );
                }
            }

        }
    }

    private _selection__Updated_Callback() : void {

        this._update_Total_ANY_ALL_Selections_Count();

        this._contents_Changed_Callback({})
    }

    private _update_Total_ANY_ALL_Selections_Count() {

        this._total_ANY_ALL_Selections_Count = this._modificationMass_UserSelections_StateObject.get_NumberOf_ANY_ALL_Selections() +
            this._reporterIonMass_UserSelections_StateObject.get_NumberOf_ANY_ALL_Selections();
    }


}


//  Callback Types for from Parent Object

export class ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback_Params {

}

export type ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback =
    ( params : ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback_Params ) => void

export type ReporterIonMass_UserSelections_StateObject__Selection__Updated__Callback = () => void


//  Callback Types for from Child Objects ( Page State objects)


///////

/**
 * Enum for Pre or Post Set
 *
 *  Typescript Enum:  in Javascript will see the string values
 */
export enum ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_ENUM {
    PRE_SET = "PRE_SET",
    POST_SET = "POST_SET"
}

/**
 * When entry is added to this State Object, call this function with this param before and after the new entry is added to the State Object
 */
export class ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback_Params {
    oldValue_singleProtein_Filter_SelectionType : SingleProtein_Filter_SelectionType
    newValue_singleProtein_Filter_SelectionType : SingleProtein_Filter_SelectionType
    pre_post_Set : ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_ENUM
}

/**
 * When entry is added to this State Object, call this function with this param before and after the new entry is added to the State Object
 */
export type ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback =
    ( params : ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback_Params ) => void

/**
 * When any or all entries are removed to this State Object, call this function before the entry or entries is removed from the State Object
 */
export type ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Updated__Callback =
    () => void


