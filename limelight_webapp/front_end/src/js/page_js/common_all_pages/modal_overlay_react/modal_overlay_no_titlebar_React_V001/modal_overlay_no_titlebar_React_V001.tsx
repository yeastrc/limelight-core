/**
 * modal_overlay_no_titlebar_React_V001
 *
 * Version v001
 *
 * Modal Overlay with NO Title Bar on Top - Built using React
 *
 * Has React component in this file
 */


import React from 'react'

/**
 * ModalOverlay NO Title Bar - Local to Limelight (Not use a Library) - React Based
 *
 */
export class ModalOverlay_No_Titlebar_Limelight_Component_v001_Props {

    set_CSS_Position_Fixed? : boolean  //  USE WITH CARE:  Setting position: flex;  eliminates the ability to use browser scrollbars to get to parts of modal dialog outside of the viewport
    heightMaximum : number
    heightMinimum : number
    widthMaximum : number
    widthMinimum : number
    callbackOnClicked_Background : () => void;

    constructor( { heightMaximum, heightMinimum, widthMaximum, callbackOnClicked_Background } : {
        heightMaximum : number
        heightMinimum : number
        widthMaximum : number
        hideOnBackgroundClick : boolean
        callbackOnClicked_Background : () => void;
    }) {
        this.heightMaximum = heightMaximum
        this.heightMinimum = heightMinimum
        this.widthMaximum = widthMaximum
        this.callbackOnClicked_Background = callbackOnClicked_Background
    }
}

interface ModalOverlay_No_Titlebar_Limelight_Component_v001_State {

    _placeholder
}


/**
 * ModalOverlay NO Title Bar - Local to Limelight (Not use a Library) - React Based
 *
 */
export class ModalOverlay_No_Titlebar_Limelight_Component_v001 extends React.Component< ModalOverlay_No_Titlebar_Limelight_Component_v001_Props, ModalOverlay_No_Titlebar_Limelight_Component_v001_State > {

    /**
     *
     *
     */
    constructor(props : ModalOverlay_No_Titlebar_Limelight_Component_v001_Props) {
        super(props);

    }

    /**
     *
     */
    render () {

        const background_ClassName_Main = "modal-overlay-page-background "

        let background_ClassName_Addition = "";

        if ( this.props.callbackOnClicked_Background ) {
            background_ClassName_Addition = " modal-overlay-page-background-clickable "
        }

        const background_ClassName = background_ClassName_Main + background_ClassName_Addition;

        //  Width and Height:
        //          Starting size Computation: Smaller of  (80% of viewport) OR (100% viewport - 100 px)  --  100px to provide 50 px margin on each side
        //          Restricted by provided __Minimum and __Maximum values

        //  Left and Top compute to center in the viewport

        //  When viewport too small to fit __Minimum values, the __Minimum are used and the browser main scrollbars provide access all parts of the overlay.

        const width = "min( max( min( 80vw, calc( 100vw - 100px ) ), " + this.props.widthMinimum + "px), " + this.props.widthMaximum + "px )";

        const left = "max( calc( calc( calc( 100vw - 6px ) / 2) - calc( min( max( min( 80vw, calc( 100vw - 100px ) ), " + this.props.widthMinimum + "px), " + this.props.widthMaximum + "px ) / 2 ) ), 10px)";

        const height = "min( max( min( 80vh, calc( 100vh - 100px ) ), " + this.props.heightMinimum + "px), " + this.props.heightMaximum + "px )";

        const top = "max( calc( calc( calc( 100vh - 6px ) / 2) - calc( min( max( min( 80vh, calc( 100vh - 100px ) ), " + this.props.heightMinimum + "px), " + this.props.heightMaximum + "px ) / 2 ) ), 10px)";

        const modal_overlay_container_css : React.CSSProperties = {
            width: width,
            height: height,
            left: left,
            top: top
        }

        if ( this.props.set_CSS_Position_Fixed ) {
            modal_overlay_container_css.position = "fixed";
        }

        return (
            <div >
                <div className={ background_ClassName } onClick={ this.props.callbackOnClicked_Background }>
                </div>

                <div className="modal-overlay-container modal-overlay-flexbox-overflow-control-no-header-container"
                     style={ modal_overlay_container_css }>

                    { this.props.children }

                </div>

            </div>
        );
    }
}
