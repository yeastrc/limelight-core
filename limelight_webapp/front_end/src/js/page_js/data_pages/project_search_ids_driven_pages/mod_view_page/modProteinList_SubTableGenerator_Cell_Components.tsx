
/**
 * modProteinList_SubTableGenerator_Cell_Components.tsx
 *
 * Create JSX Elements for modProteinList_SubTableGenerator.ts
 *
 *
 */

import React from 'react'

export class modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback_Params {

    proteinId: number
    proteinName: string
    modMass: number
    ctrlKey_From_ClickEvent: boolean
    metaKey_From_ClickEvent: boolean
}

export type modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback =
    ( params: modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback_Params) => void;

/**
 * Contents for cell Protein Name
 */
export const modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents = function (
    {
        proteinId,
        proteinName,
        modMass,
        clickCallback
    } : {
        proteinId: number
        proteinName: string
        modMass: number
        clickCallback:modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback

    }) : JSX.Element {

    return (
        <Cell_Protein_Name_Contents_Component
            proteinId={proteinId}
            proteinName={ proteinName }
            modMass={modMass}
            clickCallback={clickCallback}
        />
    )
}


interface Cell_Protein_Name_Contents_Component_Props {

    proteinId: number
    proteinName: string
    modMass: number
    clickCallback:modProteinList_SubTableGenerator_Subcomponents__Cell_Protein_Name_Contents_Click_Callback
}

interface Cell_Protein_Name_Contents_Component_State {
    _placeholder
}

/**
 *
 *
 */
class Cell_Protein_Name_Contents_Component extends React.Component< Cell_Protein_Name_Contents_Component_Props, Cell_Protein_Name_Contents_Component_State > {

    private _onClick_BindThis = this._onClick.bind(this);

    /**
     *
     *
     */
    constructor(props: Cell_Protein_Name_Contents_Component_Props) {
        super(props);

    }

    /**
     *
     */
    private _onClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {

        event.stopPropagation();

        this.props.clickCallback({
            proteinId: this.props.proteinId,
            proteinName: this.props.proteinName,
            modMass: this.props.modMass,
            ctrlKey_From_ClickEvent: event.ctrlKey,
            metaKey_From_ClickEvent: event.metaKey
        });
    }


    /**
     *
     */
    render() {

        return (
            <span
                className=" fake-link "
                onClick={this._onClick_BindThis}
            >
                {this.props.proteinName}
            </span>
        );
    }
}
