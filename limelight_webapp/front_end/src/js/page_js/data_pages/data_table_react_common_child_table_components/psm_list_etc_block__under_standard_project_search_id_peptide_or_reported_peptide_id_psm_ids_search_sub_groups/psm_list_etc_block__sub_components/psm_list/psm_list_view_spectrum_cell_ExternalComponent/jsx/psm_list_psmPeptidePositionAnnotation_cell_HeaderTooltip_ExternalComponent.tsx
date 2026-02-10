/**
 * psm_list_psmPeptidePositionAnnotation_cell_HeaderTooltip_ExternalComponent.tsx
 */

import React from 'react'
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";


export const get_Psm_list_psmPeptidePositionAnnotation_cell_HeaderTooltip_ExternalComponent = function (
    inputParams: Internal__Psm_list_psmPeptidePositionAnnotation_cell_HeaderTooltip_ExternalComponent_InputParams
): React.JSX.Element {

    return (
        <Internal__Psm_list_psmPeptidePositionAnnotation_cell_HeaderTooltip_ExternalComponent
            inputParams={ inputParams }
        />
    )
}

/**
 *
 */
export interface Internal__Psm_list_psmPeptidePositionAnnotation_cell_HeaderTooltip_ExternalComponent_InputParams {

    annotationName: string
}

/**
 *
 */
interface Internal__Psm_list_psmPeptidePositionAnnotation_cell_HeaderTooltip_ExternalComponent_Props {

    inputParams: Internal__Psm_list_psmPeptidePositionAnnotation_cell_HeaderTooltip_ExternalComponent_InputParams
}

interface Internal__Psm_list_psmPeptidePositionAnnotation_cell_HeaderTooltip_ExternalComponent_State {

    _placeholder: unknown
}

/**
 *
 */
class Internal__Psm_list_psmPeptidePositionAnnotation_cell_HeaderTooltip_ExternalComponent extends React.Component< Internal__Psm_list_psmPeptidePositionAnnotation_cell_HeaderTooltip_ExternalComponent_Props, Internal__Psm_list_psmPeptidePositionAnnotation_cell_HeaderTooltip_ExternalComponent_State > {

    /**
     *
     */
    constructor( props: Internal__Psm_list_psmPeptidePositionAnnotation_cell_HeaderTooltip_ExternalComponent_Props ) {
        super( props );

        this.state = { _placeholder: null };
    }

    render() { try {

        return (
            <div>
                <div>
                    PSM Peptide Position Annotation: { this.props.inputParams.annotationName }
                </div>
                <div style={ { marginTop: 6 } }>
                    Sort column on worst value for each PSM.
                </div>
            </div>
        )

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

}
