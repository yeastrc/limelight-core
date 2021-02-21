/**
 * proteinViewPage_DisplayData_MultipleSearches_ProteinDescription_DataTable_Component.tsx
 * 
 * Protein Page Multiple Searches - Protein List - React Component for Protein Description for Data Table
 * 
 * Implemented to support tooltip on Protein Description
 */

import { _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_MULTIPLE_SEARCHES } from './proteinViewPage_DisplayData_MultipleSearches_Constants';


import React from 'react'


export const get_MultipleSearches_ProteinList_ProteinDescription_ExternalReactComponent = function (
    {
        proteinDescription,
        proteinSequenceVersionId
    } : {
        proteinDescription : string
        proteinSequenceVersionId : number

    }) : JSX.Element {

    return (
        <MultipleSearches_ProteinList_ProteinDescription_ExternalReactComponent
            proteinDescription={ proteinDescription }
            proteinSequenceVersionId={ proteinSequenceVersionId }
        />
    )
}

/**
 * 
 */
interface MultipleSearches_ProteinList_ProteinDescription_ExternalReactComponent_Props {

    proteinDescription : string
    proteinSequenceVersionId : number
}

interface MultipleSearches_ProteinList_ProteinDescription_ExternalReactComponent_State {

    _placeholder: any
}



/**
 * 
 */
class MultipleSearches_ProteinList_ProteinDescription_ExternalReactComponent extends React.Component< MultipleSearches_ProteinList_ProteinDescription_ExternalReactComponent_Props, MultipleSearches_ProteinList_ProteinDescription_ExternalReactComponent_State > {

    /**
     * 
     */
    constructor(props : MultipleSearches_ProteinList_ProteinDescription_ExternalReactComponent_Props) {
        super(props);

        // this.state = {};
    }


    render() {

        return (
            <div className={ _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_MULTIPLE_SEARCHES } 
                style={ {  whiteSpace : "nowrap", overflow:"hidden", textOverflow: "ellipsis" } }
                data-protein-id={ this.props.proteinSequenceVersionId.toString() }
            >
                    { this.props.proteinDescription }
            </div>
        );
    }
}

