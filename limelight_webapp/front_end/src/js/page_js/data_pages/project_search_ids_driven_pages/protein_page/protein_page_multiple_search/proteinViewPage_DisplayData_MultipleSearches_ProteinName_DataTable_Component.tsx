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
 *
 * @param proteinName
 * @param proteinSequenceVersionId
 */
export const get_MultipleSearches_ProteinList_ProteinName_ExternalReactComponent = function (
    {
        proteinName,
        proteinSequenceVersionId
    } : {
        proteinName : string
        proteinSequenceVersionId : number

    }) : JSX.Element {

    return (
        <MultipleSearches_ProteinList_ProteinName_ExternalReactComponent
            proteinName={ proteinName }
            proteinSequenceVersionId={ proteinSequenceVersionId }
        />
    )
}

/**
 * 
 */
export interface MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_Props {

    proteinName : string
    proteinSequenceVersionId : number
}

interface MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_State {

    _placeholder: any
}



/**
 * 
 */
class MultipleSearches_ProteinList_ProteinName_ExternalReactComponent extends React.Component< MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_Props, MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_State > {

    /**
     * 
     */
    constructor(props : MultipleSearches_ProteinList_ProteinName_ExternalReactComponent_Props) {
        super(props);

        // this.state = {};
    }


    render() {

        return (
            <div className={ _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_MULTIPLE_SEARCHES } 
                style={ { whiteSpace : "nowrap", overflowX:"auto" } }
                data-protein-id={ this.props.proteinSequenceVersionId.toString() }
            >
                    { this.props.proteinName }
            </div>
        );
    }
}

