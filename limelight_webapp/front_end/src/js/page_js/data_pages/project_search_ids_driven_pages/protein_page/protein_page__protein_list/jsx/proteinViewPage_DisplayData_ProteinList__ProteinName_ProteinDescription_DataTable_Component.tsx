/**
 * proteinViewPage_DisplayData_ProteinList_Integrated_SingleMultipleSearchSubGroups_ProteinName_DataTable_Component.tsx
 * 
 * Protein Page Multiple Searches - Protein List - React Component for Protein Name for Data Table
 * 
 * Implemented to support tooltip on Protein Name
 */

/**
 * proteinViewPage_DisplayData_ProteinList_Integrated_SingleMultipleSearchSubGroups_ProteinName_ProteinDescription_DataTable_Component.tsx
 *
 * Protein Page Single Search - Protein List -
 *
 *    React Component for Protein Name  for Data Table
 *    React Component for Protein Description  for Data Table
 *
 * Implemented to support tooltip on Protein Name and Protein Description
 */

import React from 'react'
import {ProteinNameDescriptionCacheEntry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped";

export const get_ProteinName_ProteinDescription_Tooltip_Contents = function (
    {
        proteinNameDescriptionForToolip
    } : {
        proteinNameDescriptionForToolip : Array<ProteinNameDescriptionCacheEntry>
    }
) {

    return (
        <div style={ { marginBottom: 10 } } >

            <div style={ { marginBottom: 10 } } >
                <span>Name(s) and description(s) uploaded to Limelight:</span>
            </div>

            { proteinNameDescriptionForToolip.map( (value, index) => {

                    return (
                        <div key={ index }
                             style={ { marginBottom : 15 ,marginLeft : 10 } }
                        >
                            <span>{ value.name }</span>
                            <span> </span>
                            <span>{ value.description }</span>
                        </div>
                    )
                }
            )
            }

        </div>

    );
}

