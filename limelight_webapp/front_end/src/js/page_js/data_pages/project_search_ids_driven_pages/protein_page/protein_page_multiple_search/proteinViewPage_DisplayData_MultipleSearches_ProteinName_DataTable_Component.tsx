/**
 * proteinViewPage_DisplayData_MultipleSearches_ProteinName_DataTable_Component.tsx
 * 
 * Protein Page Multiple Searches - Protein List - React Component for Protein Name for Data Table
 * 
 * Implemented to support tooltip on Protein Name
 */


import { _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_MULTIPLE_SEARCHES } from './proteinViewPage_DisplayData_MultipleSearches_Constants';


import React from 'react'

/**
 * Class for cellMgmt_ExternalReactComponent_Data property in MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_Props
 */
export class MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_Props_Data {
    
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
export interface MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_Props {

    //  Standard required props property name for Component used in Data Table
    cellMgmt_ExternalReactComponent_Data : MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_Props_Data
}

interface MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_State {

    _placeholder: any
}



/**
 * 
 */
export class MultipleSearches_ProteinList_ProteinName_ExternalReactComponent extends React.Component< MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_Props, MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_State > {

    /**
     * 
     */
    constructor(props : MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_Props) {
        super(props);

        // this.state = {};
    }


    render() {

        if ( ! ( this.props.cellMgmt_ExternalReactComponent_Data instanceof MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_Props_Data ) ) {
            const msg = "MultipleSearches_ProteinList_ProteinName_ExternalReactComponent: if ( ! ( this.props.cellMgmt_ExternalReactComponent_Data instanceof MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_Props_Data ) )"
            console.warn( msg );
            throw Error( msg );
        }

        return (
            <div className={ _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_MULTIPLE_SEARCHES } 
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

