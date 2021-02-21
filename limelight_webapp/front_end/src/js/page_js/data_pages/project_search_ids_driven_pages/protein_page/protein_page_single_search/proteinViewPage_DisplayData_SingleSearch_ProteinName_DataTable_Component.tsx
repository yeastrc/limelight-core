/**
 * proteinViewPage_DisplayData_SingleSearch_ProteinName_DataTable_Component.tsx
 * 
 * Protein Page Single Search - Protein List - React Component for Protein Name for Data Table
 * 
 * Implemented to support tooltip on Protein Name
 */


import { _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_SINGLE_SEARCH } from './proteinViewPage_DisplayData_SingleSearch_Constants'



import React from 'react'

/**
 *
 * @param proteinName
 * @param proteinSequenceVersionId
 */
export const get_SingleSearch_ProteinList_ProteinName_ExternalReactComponent = function (
    {
        proteinName,
        proteinSequenceVersionId
    } : {
        proteinName : string
        proteinSequenceVersionId : number

    }) : JSX.Element {

    return (
        <SingleSearch_ProteinList_ProteinName_ExternalReactComponent
            proteinName={ proteinName }
            proteinSequenceVersionId={ proteinSequenceVersionId }
        />
    )
}

/**
 * 
 */
export interface SingleSearch_ProteinList_ProteinName_ExternalReactComponent_Props {

    proteinName : string
    proteinSequenceVersionId : number
}

interface SingleSearch_ProteinList_ProteinName_ExternalReactComponent_State {

    _placeholder: any
}



/**
 * 
 */
export class SingleSearch_ProteinList_ProteinName_ExternalReactComponent extends React.Component< SingleSearch_ProteinList_ProteinName_ExternalReactComponent_Props, SingleSearch_ProteinList_ProteinName_ExternalReactComponent_State > {

    /**
     * 
     */
    constructor(props : SingleSearch_ProteinList_ProteinName_ExternalReactComponent_Props) {
        super(props);

        // this.state = {};
    }


    render() {

        return (
            <div className={ _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_SINGLE_SEARCH } 
                style={ { whiteSpace : "nowrap", overflowX:"auto" } }
                data-protein-id={ this.props.proteinSequenceVersionId.toString() }
            >
                    { this.props.proteinName }
            </div>
        );
    }
}

