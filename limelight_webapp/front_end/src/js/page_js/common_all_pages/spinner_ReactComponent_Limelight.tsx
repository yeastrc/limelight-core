/**
 * spinner_ReactComponent_Limelight.tsx
 *
 * Creates spinner using code in spinner.ts
 * 
 * Creates spinner on mount and removes on unmount
 *
 */


import React from "react";
import {create_SpinnerManagerClass_Limelight, SpinnerManagerClass_Limelight} from "page_js/common_all_pages/spinner";





////////

export interface Spinner_Limelight_Component_Props {
}

interface Spinner_Limelight_Component_State {

    _placeholder?: unknown
}

/**
 * * Creates spinner on mount and removes on unmount
 *
 */
export class Spinner_Limelight_Component extends React.Component< Spinner_Limelight_Component_Props, Spinner_Limelight_Component_State > {

    private readonly _spinner_container_Ref :  React.RefObject<HTMLDivElement>

    private _spinnerManagerClass_Limelight : SpinnerManagerClass_Limelight

    constructor(props : Spinner_Limelight_Component_Props) {
        super(props);

        this._spinner_container_Ref = React.createRef();

        this.state = {
        };
    }

    componentDidMount() {

        this._spinnerManagerClass_Limelight = create_SpinnerManagerClass_Limelight({ dom_DivElementToInsertInto : this._spinner_container_Ref.current })
        this._spinnerManagerClass_Limelight.createSpinner();
    }

    componentWillUnmount(): void {
        if ( this._spinnerManagerClass_Limelight ) {
            this._spinnerManagerClass_Limelight.destroySpinner()
        }
    }

    render(): React.ReactNode {
        return (
            <div ref={ this._spinner_container_Ref }></div>
        );
    }

}