/**
 * protein_Structure_WidgetDisplay__Main_Component.tsx
 * 
 * Protein Structure Widget Display - On Search Based pages --  Different for Experiment pages
 * 
 */




import React from 'react'
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";

import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {
    CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";
import { DataPageStateManager, SearchNames_AsMap } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    SearchDetailsBlockDataMgmtProcessing
} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import {
    SearchDataLookupParameters_Root
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    ProteinSequenceWidget_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject";
import { ProteinSequence_Bar_Widget_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_bar_widget/js/proteinSequence_Bar_Widget_StateObject";
import {
    CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters";
import { Limelight_AnyFilter__HasFilterValue } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/any_filter__has_filter_value/Limelight_AnyFilter__HasFilterValue";
import {
    ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import { ModificationMass_UserSelections_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";


const _MAX_PROTEIN_LENGTH_TO_DISPLAY = 100000

const _PROTEIN_BAR__SELECTED_PROJECT_SEARCH_ID__FOR__ALL_COMBINED = 0
const _PROTEIN_BAR__SELECTED_PROJECT_SEARCH_ID__DEFAULT = _PROTEIN_BAR__SELECTED_PROJECT_SEARCH_ID__FOR__ALL_COMBINED

/**
 * 
 */
export interface Protein_Structure_WidgetDisplay__Main_Component_Props {

    proteinSequence_Bar_Widget_StateObject : ProteinSequence_Bar_Widget_StateObject

    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject

    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;  // Used for filtering modification masses

    limelight_AnyFilter__HasFilterValue : Limelight_AnyFilter__HasFilterValue

    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

    /**
     * Use change of object to trigger computation of new data to display
     */
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

    projectSearchIds : Array<number>;
    proteinSequenceVersionId : number;
    proteinNames : string;
    proteinDescriptions : string
    proteinSequenceString : string

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder

    dataPageStateManager : DataPageStateManager
    dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
    searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;

    searchNamesMap_KeyProjectSearchId : SearchNames_AsMap;
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root;

    updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback: () => void
}

interface Protein_Structure_WidgetDisplay__Main_Component_State {

    _placeholder?: unknown
}

/**
 * Search Based -- as opposed to Experiment Based
 */
export class Protein_Structure_WidgetDisplay__Main_Component extends React.Component< Protein_Structure_WidgetDisplay__Main_Component_Props, Protein_Structure_WidgetDisplay__Main_Component_State > {

    //  bind to 'this' for passing as parameters
    // private _selected_Search_OnChange_Callback_BindThis = this._selected_Search_OnChange_Callback.bind(this);

    private _proteinStructure_ViewerContainer_Ref:  React.RefObject<HTMLDivElement>

    private _neverRender_ActualValue = false

    private _renderMsg__ProteinLength_TooLong = false



    /**
     * Store as Array so that can just pass to child component instead of create new Array object on every render()
     */
    private _selected_ProjectSearchId_As_Array = [ _PROTEIN_BAR__SELECTED_PROJECT_SEARCH_ID__DEFAULT ]

    /**
     * 
     */    
    constructor(props : Protein_Structure_WidgetDisplay__Main_Component_Props) { try {
        super(props);

        this._proteinStructure_ViewerContainer_Ref = React.createRef();

        if ( this.props.proteinSequenceString.length > _MAX_PROTEIN_LENGTH_TO_DISPLAY ) {

            this._renderMsg__ProteinLength_TooLong = true

            this._neverRender_ActualValue = true
        }

        this.state = {  };

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }


    /**
     * After render()
     */
    componentDidMount() { try {

        if ( this._neverRender_ActualValue ) {
            return // EARLY RETURN
        }

        this._loadData_OnMount()

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }


    /**
     *
     */
    private _loadData_OnMount() {

        if ( this.props.projectSearchIds.length > 1 ) {

            //  Have > 1 search so need to compute which searches have THIS ProteinSequenceVersionId for the Search Selection

            const proteinSequenceVersionId = this.props.proteinSequenceVersionId

            const proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder> = new Map()

            const promises: Array<Promise<void>> = [];

            for ( const projectSearchId of this.props.projectSearchIds ) {

                const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId )

                const get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters().
                    get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch()

                if ( get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.data ) {
                    proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId,
                        get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.data.proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder )
                } else if ( get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise.catch(reason => reject(reason))
                        get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise.then(value => { try {
                            proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                projectSearchId, value.proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
                            );
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result Not has data or promise")
                }
            }

            if ( promises.length === 0 ) {

                this._loadData_OnMount_After_LoadData({
                    proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId
                })
            }

            const promisesAll = Promise.all(promises)

            promisesAll.catch(reason => {
                try {
                    // reject(reason);
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            });
            promisesAll.then(result => {
                try {
                    this._loadData_OnMount_After_LoadData({
                        proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId
                    })

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            });
        }
    }

    private async _loadData_OnMount_After_LoadData(
        {
            proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId
        } : {
            proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder>
        }
    ) { try {

        // if ( ! this._proteinStructure_ViewerContainer_Ref.current ) {
        //     const msg = "In _loadData_OnMount_After_LoadData: ( ! this._proteinStructure_ViewerContainer_Ref.current ) "
        //     console.warn(msg)
        //     throw Error(msg)
        // }

        // // Create viewer
        // // const plugin = await molstarGallery.createRootViewer();
        // const plugin = await createPluginUI({
        //     target: this._proteinStructure_ViewerContainer_Ref.current,
        //     render: undefined
        //     // ... plugin configuration
        // });
        //
        // // Download PDB
        // const fileData = await plugin.builders.data.download(
        //     { url: "https://models.rcsb.org/4hhb.bcif", isBinary: true }
        // );
        //
        // // Load PDB and create representation
        // const trajectory = await plugin.builders.structure.parseTrajectory(fileData, "mmcif");
        // await plugin.builders.structure.hierarchy.applyPreset(trajectory, "default");
        //
        // // Query all ligands using prebuilt query
        // const ligandExp = StructureSelectionQueries.ligand.expression;
        // // Using MolScript, build a new expression to include surroundings of each ligand
        // const expression = MolScriptBuilder.struct.modifier.includeSurroundings({
        //     0: ligandExp,
        //     radius: 4.5,
        //     'as-whole-residues': true
        // });
        // // Create a new selection from the expression
        // // And use the selection manager to add the SelectionQuery to the current selection
        // plugin.managers.structure.selection.fromSelectionQuery('add', StructureSelectionQuery('ligand-and-surroundings-1', expression))

    } catch (e) {
        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
        throw e;
    }
    }

    /**
     * Clean Up
     */
    // componentWillUnmount() {

    // }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate( nextProps: Readonly<Protein_Structure_WidgetDisplay__Main_Component_Props>, nextState: Readonly<Protein_Structure_WidgetDisplay__Main_Component_State>, nextContext: any ): boolean { try {

        if ( nextProps.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds !== this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
            || nextProps.projectSearchIds !== this.props.projectSearchIds
        ) {

            return true
        }

        return false

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     * After render()
     *
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate( prevProps: Readonly<Protein_Structure_WidgetDisplay__Main_Component_Props>, prevState: Readonly<Protein_Structure_WidgetDisplay__Main_Component_State>, snapshot?: any ) { try {

        if ( prevProps.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds !== this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
            || prevProps.projectSearchIds !== this.props.projectSearchIds
        ) {

            // this._compute_DerivedDisplay()
        }

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     * 
     */    
    render() { try {

        if ( ! this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds ) {
            const msg = "No value for this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds";
            console.warn( msg );
            throw Error( msg );
        }

        {
            if ( this._renderMsg__ProteinLength_TooLong ) {

                //  Protein sequence is too long to display so display this message instead

                return (
                    <div style={ { marginTop: 10 } }>
                        <div>
                            Unable to display sequence coverage for proteins with length greater than { _MAX_PROTEIN_LENGTH_TO_DISPLAY.toLocaleString() }.
                        </div>
                        <div style={ { marginTop: 5 } }>
                            Length of current protein sequence is { this.props.proteinSequenceString.length.toLocaleString() }.
                        </div>
                    </div>
                )
            }
        }

        if ( this._neverRender_ActualValue ) {

            return null  // EARLY RETURN
        }

        return (
            <div style={ { marginBottom: 10 } }>

                <div>
                    Protein Structure - Main Component
                </div>

                {/*<div>*/}
                {/*    Protein Structure - Viewer Container*/}
                {/*</div>*/}

                {/*<div ref={ this._proteinStructure_ViewerContainer_Ref }></div>*/}

            </div>
        )

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

}
