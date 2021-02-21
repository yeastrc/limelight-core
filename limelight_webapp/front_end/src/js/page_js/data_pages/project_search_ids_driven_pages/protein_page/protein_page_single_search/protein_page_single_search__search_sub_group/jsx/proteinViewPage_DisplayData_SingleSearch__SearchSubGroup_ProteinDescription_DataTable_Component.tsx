/**
 * proteinViewPage_DisplayData_SingleSearch__SearchSubGroup_ProteinDescription_DataTable_Component.tsx
 * 
 * Protein Page Single Search with Search Sub Groups - Protein List - React Component for Protein Description for Data Table
 * 
 * Implemented to support tooltip on Protein Description
 */


import React from 'react'
import {_CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_SINGLE_SEARCH_SEARCH_SUB_GROUPS} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/protein_page_single_search__search_sub_group/js/proteinViewPage_DisplayData_SingleSearch__SearchSubGroup_Constants";

export const get_SingleSearch__SearchSubGroup_ProteinList_ProteinDescription_ExternalReactComponent = function (
    {
        proteinDescription,
        proteinSequenceVersionId
    } : {
        proteinDescription : string
        proteinSequenceVersionId : number

    }) : JSX.Element {

    return (
        <SingleSearch__SearchSubGroup_ProteinList_ProteinDescription_ExternalReactComponent
            proteinDescription={ proteinDescription }
            proteinSequenceVersionId={ proteinSequenceVersionId }
        />
    )
}

/**
 *
 */
interface SingleSearch__SearchSubGroup_ProteinList_ProteinDescription_ExternalReactComponent_Props {

    proteinDescription : string
    proteinSequenceVersionId : number
}

interface SingleSearch__SearchSubGroup_ProteinList_ProteinDescription_ExternalReactComponent_State {

    _placeholder: any
}



/**
 *
 */
class SingleSearch__SearchSubGroup_ProteinList_ProteinDescription_ExternalReactComponent extends React.Component< SingleSearch__SearchSubGroup_ProteinList_ProteinDescription_ExternalReactComponent_Props, SingleSearch__SearchSubGroup_ProteinList_ProteinDescription_ExternalReactComponent_State > {

    /**
     *
     */
    constructor(props : SingleSearch__SearchSubGroup_ProteinList_ProteinDescription_ExternalReactComponent_Props) {
        super(props);

        // this.state = {};
    }


    render() {

        return (
            <div className={ _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_SINGLE_SEARCH_SEARCH_SUB_GROUPS }
                style={ {  whiteSpace : "nowrap", overflow:"hidden", textOverflow: "ellipsis", fontSize: 12 } }
                data-protein-id={ this.props.proteinSequenceVersionId.toString() }
            >
                <span style={ { overflowWrap : "break-word" } }>
                    { this.props.proteinDescription }
                </span>
            </div>
        );
    }
}

