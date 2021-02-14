/**
 * proteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinName_DataTable_Component.tsx
 * 
 * Protein Page Single Search with Search Sub Groups - Protein List - React Component for Protein Name for Data Table
 * 
 * Implemented to support tooltip on Protein Name
 */


import React from 'react'
import {_CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_SINGLE_SEARCH_SEARCH_SUB_GROUPS} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/protein_page_single_search__search_sub_group/js/proteinViewPage_DisplayData_SingleSearch__SearchSubGroup_Constants";

/**
 * Class for cellMgmt_ExternalReactComponent_Data property in SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent_Props
 */
export class SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent_Props_Data {
    
    proteinName : string
    proteinSequenceVersionId : number

    constructor({ proteinName, proteinSequenceVersionId } : {
        proteinName : string
        proteinSequenceVersionId : number
    }) {
        this.proteinName = proteinName;
        this.proteinSequenceVersionId = proteinSequenceVersionId;
    }
}

/**
 * 
 */
export interface SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent_Props {

    //  Standard required props property name for Component used in Data Table
    cellMgmt_ExternalReactComponent_Data : SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent_Props_Data
}

interface SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent_State {

    _placeholder: any
}



/**
 * 
 */
export class SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent extends React.Component< SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent_Props, SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent_State > {

    /**
     * 
     */
    constructor(props : SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent_Props) {
        super(props);

        // this.state = {};
    }


    render() {

        if ( ! ( this.props.cellMgmt_ExternalReactComponent_Data instanceof SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent_Props_Data ) ) {
            const msg = "SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent: if ( ! ( this.props.cellMgmt_ExternalReactComponent_Data instanceof SingleSearch__SearchSubGroup_ProteinList_ProteinName_ExternalReactComponent_Props_Data ) )"
            console.warn( msg );
            throw Error( msg );
        }

        return (
            <div className={ _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_SINGLE_SEARCH_SEARCH_SUB_GROUPS } 
                style={ { whiteSpace : "nowrap", overflowX:"auto", fontSize: 12 } }
                data-protein-id={ this.props.cellMgmt_ExternalReactComponent_Data.proteinSequenceVersionId.toString() }
            >
                <span style={ { overflowWrap : "break-word" } }>
                    { this.props.cellMgmt_ExternalReactComponent_Data.proteinName }
                </span>
            </div>
        );
    }
}

