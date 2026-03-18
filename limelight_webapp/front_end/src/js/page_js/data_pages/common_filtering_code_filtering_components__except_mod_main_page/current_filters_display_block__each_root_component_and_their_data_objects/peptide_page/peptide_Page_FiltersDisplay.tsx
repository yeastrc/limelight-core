/**
 * peptide_Page_FiltersDisplay.tsx
 * 
 * Display currently applied Peptide Page Filters.
 * 
 * Includes the "clear all" link to clear all filters
 *
 * 
 */

import React from 'react'

import {currentFiltersDisplayBlock__PSB__SearchSubGroups} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_psb__display_elements/currentFiltersDisplayBlock__PSB__SearchSubGroups";
import {currentFiltersDisplayBlock__Modifications_and_ReporterIons} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__Modifications_and_ReporterIons";
import {currentFiltersDisplayBlock__ScanFilenameId_On_PSM_Filter_UserSelection} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__ScanFilenameId_On_PSM_Filter_UserSelection";
import {currentFiltersDisplayBlock__Scan_RetentionTime_MZ_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__Scan_RetentionTime_MZ_UserSelections";
import {currentFiltersDisplayBlock__Peptide_QC__PeptideUnique_UserSelection} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__peptide_qc__display_elements/currentFiltersDisplayBlock__Peptide_QC__PeptideUnique_UserSelection";
import {currentFiltersDisplayBlock__Peptide_QC__PeptideSequence_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__peptide_qc__display_elements/currentFiltersDisplayBlock__Peptide_QC__PeptideSequence_UserSelections";
import {currentFiltersDisplayBlock__Peptide_SingleProtein__PeptideList__FilterOnCounts_PSM_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__peptide__single_protein___display_elements/currentFiltersDisplayBlock__Peptide_SingleProtein__PeptideList__FilterOnCounts_PSM_UserSelections";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {Peptide_Page_FiltersDisplay_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__each_root_component_and_their_data_objects/peptide_page/peptide_Page_FiltersDisplay_ComponentData";
import {currentFiltersDisplayBlock__Charge_On_PSM_Filter_UserSelection} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__Charge_On_PSM_Filter_UserSelection";
import {currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_Container_GetsDataForDisplay} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__peptide_qc__display_elements/currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_Container_GetsDataForDisplay";
import {currentFiltersDisplayBlock__PSM_Exclude_IndependentDecoy_PSMs_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__PSM_Exclude_IndependentDecoy_PSMs_UserSelections";
import {Page_MainFiltersDisplay_CommonDisplayContainer_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__each_root_component_and_their_data_objects/common/page_MainFiltersDisplay_CommonDisplayContainer_Component";
import {currentFiltersDisplayBlock__PeptideSequence_MissedCleavageCount_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__PeptideSequence_MissedCleavageCount_UserSelections";
import {currentFiltersDisplayBlock__PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections";
import {
    currentFiltersDisplayBlock__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection";
import {
    currentFiltersDisplayBlock__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__common_and_page_specific/current_filters_display_block__common_display_elements/currentFiltersDisplayBlock__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection";




/**
 * 
 */
export type Peptide_Page_FiltersDisplay_clearAllFiltersClickHandler = () => void;

/**
 * 
 */
export interface Peptide_Page_FiltersDisplay_Props {

    peptide_Page_FiltersDisplay_ComponentData : Peptide_Page_FiltersDisplay_ComponentData;

    //  All called clearAllFiltersClickHandler  has been modified to NOT clear ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    clearAllFiltersClickHandler : Peptide_Page_FiltersDisplay_clearAllFiltersClickHandler;
}

/**
 * 
 */
interface Peptide_Page_FiltersDisplay_State {

    prev_peptide_Page_FiltersDisplay_ComponentData : Peptide_Page_FiltersDisplay_ComponentData;
}

/**
 * 
 */
export class Peptide_Page_FiltersDisplay extends React.Component< Peptide_Page_FiltersDisplay_Props, Peptide_Page_FiltersDisplay_State > {

    //  bind to 'this' for passing as parameters
    private _clearAllFiltersClickHandler_BindThis = this._clearAllFiltersClickHandler.bind(this);

    /**
     * 
     */    
    constructor(props : Peptide_Page_FiltersDisplay_Props) {
        super(props);

        this.state = { prev_peptide_Page_FiltersDisplay_ComponentData : props.peptide_Page_FiltersDisplay_ComponentData };
    }

    /**
     * 
     */   
    shouldComponentUpdate( nextProps: Readonly<Peptide_Page_FiltersDisplay_Props>, nextState: Readonly<Peptide_Page_FiltersDisplay_State>, nextContext: any) : boolean {

        if ( nextProps.peptide_Page_FiltersDisplay_ComponentData !== this.props.peptide_Page_FiltersDisplay_ComponentData ) {
            return true;
        }
        return false;
    }

    /**
     * 
     */    
    _clearAllFiltersClickHandler( event : React.MouseEvent<HTMLSpanElement, MouseEvent> ) : void {

        // event.preventDefault();
        // event.stopPropagation();

        if ( this.props.clearAllFiltersClickHandler ) {
            this.props.clearAllFiltersClickHandler();
        }
    }

    ////////////////////////////////////////

    /**
     * 
     */    
    render() {
        try {

            const currentFiltersArray : Array<React.JSX.Element> = []

            {  //  scanFilenameId_On_PSM_Filter_UserSelection

                const currentFilter = currentFiltersDisplayBlock__ScanFilenameId_On_PSM_Filter_UserSelection({
                    scanFilenameId_On_PSM_Filter_UserSelection_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: this.props.peptide_Page_FiltersDisplay_ComponentData.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            { // SearchSubGroups - NOT on Experiment Page

                const currentFilter = currentFiltersDisplayBlock__PSB__SearchSubGroups({
                    searchSubGroup_Are_All_SearchSubGroupIds_Selected: this.props.peptide_Page_FiltersDisplay_ComponentData.searchSubGroup_Are_All_SearchSubGroupIds_Selected,
                    searchSubGroup_PropValue: this.props.peptide_Page_FiltersDisplay_ComponentData.searchSubGroup_PropValue
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Modifications and Reporter Ions

                const currentFilter = currentFiltersDisplayBlock__Modifications_and_ReporterIons({
                    modificationMass_UserSelections_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.modificationMass_UserSelections_StateObject,
                    reporterIonMass_UserSelections_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.reporterIonMass_UserSelections_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Scan_RetentionTime_MZ_UserSelections

                const currentFilter = currentFiltersDisplayBlock__Scan_RetentionTime_MZ_UserSelections({
                    scan_RetentionTime_MZ_UserSelections_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.scan_RetentionTime_MZ_UserSelections_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  PSM Charge Filter

                const currentFilter = currentFiltersDisplayBlock__Charge_On_PSM_Filter_UserSelection({
                    psm_Charge_Filter_UserSelection_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.psm_Charge_Filter_UserSelection_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Scan Peak Filter

                const currentFilter = currentFiltersDisplayBlock__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection({
                    scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
                })
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  PSM Hide Independent Decoy PSMs Filter

                const currentFilter = currentFiltersDisplayBlock__PSM_Exclude_IndependentDecoy_PSMs_UserSelections({
                    psm_Exclude_IndependentDecoy_PSMs_UserSelections_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  PSM Count Filter

                const currentFilter = currentFiltersDisplayBlock__Peptide_SingleProtein__PeptideList__FilterOnCounts_PSM_UserSelections({
                    peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Scan Number Filter
                const currentFilter = currentFiltersDisplayBlock__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection({
                    scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
                    projectSearchIds: this.props.peptide_Page_FiltersDisplay_ComponentData.projectSearchIds,
                    dataPageStateManager: this.props.peptide_Page_FiltersDisplay_ComponentData.dataPageStateManager,
                    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: this.props.peptide_Page_FiltersDisplay_ComponentData.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Peptide Unique UserSelections

                const currentFilter = currentFiltersDisplayBlock__Peptide_QC__PeptideUnique_UserSelection({
                    peptideUnique_UserSelection_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.peptideUnique_UserSelection_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }


            {  //  Peptide Sequence UserSelections

                const currentFilter = currentFiltersDisplayBlock__Peptide_QC__PeptideSequence_UserSelections({
                    peptideSequence_UserSelections_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.peptideSequence_UserSelections_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Peptide Sequence Missed Cleavage Count UserSelections
                const currentFilter = currentFiltersDisplayBlock__PeptideSequence_MissedCleavageCount_UserSelections({
                    peptideSequence_MissedCleavageCount_UserSelections_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.peptideSequence_MissedCleavageCount_UserSelections_StateObject
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Peptide Tryptic UserSelections
                const currentFilter = currentFiltersDisplayBlock__PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections({
                    peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
                })
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            {  //  Protein Position Filter UserSelections

                const currentFilter = currentFiltersDisplayBlock__Peptide_QC__ProteinPositionFilter_UserSelections_Container_GetsDataForDisplay({
                    proteinPositionFilter_UserSelections_StateObject: this.props.peptide_Page_FiltersDisplay_ComponentData.proteinPositionFilter_UserSelections_StateObject,
                    proteinPositionFilter_UserSelections_StateObject_Changed_ForceRebuildRender_Object: this.props.peptide_Page_FiltersDisplay_ComponentData,
                    projectSearchIds: this.props.peptide_Page_FiltersDisplay_ComponentData.projectSearchIds,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.peptide_Page_FiltersDisplay_ComponentData.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                });
                if ( currentFilter ) {
                    currentFiltersArray.push( currentFilter );
                }
            }

            if ( currentFiltersArray.length === 0 ) {

                //  NO Filter Display returned anything to display

                return null; // EARLY RETURN
            }

            return (
                <Page_MainFiltersDisplay_CommonDisplayContainer_Component clearAllFiltersClickHandler={ this.props.clearAllFiltersClickHandler } >
                    { currentFiltersArray }
                </Page_MainFiltersDisplay_CommonDisplayContainer_Component>
            );

        } catch( e ) {
            console.warn("Exception caught in render()");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
}

//////////////////////
//////////////////////
//////////////////////

//  NOT in any class

