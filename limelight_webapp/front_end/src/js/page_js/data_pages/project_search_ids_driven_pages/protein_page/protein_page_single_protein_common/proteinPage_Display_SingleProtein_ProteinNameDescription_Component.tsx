/**
 * proteinPage_Display_SingleProtein_ProteinNameDescription_Component.tsx
 *
 * Block that displays Protein Name and Description in Single Protein
 *
 * Broken out so can display in Loading Message when available
 *
 */


import React from "react";



////////

export interface ProteinPage_Display_SingleProtein_ProteinNameDescription_Component_Props {

    proteinNames : string
    proteinDescriptions : string
}

interface ProteinPage_Display_SingleProtein_ProteinNameDescription_Component_State {

    _placeholder?: any
}

/**
 * Display of Protein Name and Description
 *
 */
export class ProteinPage_Display_SingleProtein_ProteinNameDescription_Component extends React.Component< ProteinPage_Display_SingleProtein_ProteinNameDescription_Component_Props, ProteinPage_Display_SingleProtein_ProteinNameDescription_Component_State > {

    constructor(props : ProteinPage_Display_SingleProtein_ProteinNameDescription_Component_Props) {
        super(props);

        this.state = {
        };
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <div style={ { fontSize: 24, fontWeight: "bold" } }>
                    Name (from FASTA): <span style={ { overflowWrap : "break-word" } }>{ this.props.proteinNames }</span>
                </div>
                { ( ! this.props.proteinDescriptions ? null :
                        <div style={ { fontSize: 14, fontWeight: "bold", paddingTop: 10 } }>
                            <span style={ { overflowWrap : "break-word" } }>{ this.props.proteinDescriptions }</span>
                        </div>
                ) }
            </React.Fragment>
        );
    }

}