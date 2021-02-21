/**
 * proteinViewPage_DisplayData_SingleSearch_ProteinDescription_DataTable_Component.tsx
 * 
 * Protein Page Single Search - Protein List - React Component for Protein Description for Data Table
 * 
 * Implemented to support tooltip on Protein Description
 */


import { _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_SINGLE_SEARCH } from './proteinViewPage_DisplayData_SingleSearch_Constants'



import React from 'react'

export const get_SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent = function (
    {
        proteinDescription,
        proteinSequenceVersionId
    } : {
        proteinDescription : string
        proteinSequenceVersionId : number

    }) : JSX.Element {

    return (
        <SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent
            proteinDescription={ proteinDescription }
            proteinSequenceVersionId={ proteinSequenceVersionId }
        />
    )
}

/**
 * 
 */
export interface SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props {

    proteinDescription : string
    proteinSequenceVersionId : number
}

interface SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_State {

    _placeholder: any
}



/**
 * 
 */
export class SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent extends React.Component< SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props, SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_State > {

    /**
     * 
     */
    constructor(props : SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props) {
        super(props);

        // this.state = {};
    }


    render() {

        return (
            <div className={ _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_SINGLE_SEARCH } 
                style={ {  whiteSpace : "nowrap", overflow:"hidden", textOverflow: "ellipsis" } }
                data-protein-id={ this.props.proteinSequenceVersionId.toString() }
            >
                    { this.props.proteinDescription }
            </div>
        );
    }
}

