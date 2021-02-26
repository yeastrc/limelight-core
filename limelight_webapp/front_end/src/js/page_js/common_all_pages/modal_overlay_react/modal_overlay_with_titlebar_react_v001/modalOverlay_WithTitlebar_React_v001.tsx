/**
 * modalOverlay_WithTitlebar_React_v001.tsx
 *
 * Version v001
 * 
 * Modal Overlay with Title Bar on Top - Built using React
 * 
 * Has React component in this file
 */


import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

/**
 * ModalOverlay - Local to Limelight (Not use a Library) - React Based
 *
 */
export class ModalOverlay_Limelight_Component_Props {

    height : number
    width : number
    title : string
    close_OnBackgroundClick : boolean
    callbackOnClicked_Close : () => void;

    constructor( { height, width, title, hideOnBackgroundClick, callbackOnClicked_Close } : {
        height : number
        width : number
        title : string
        hideOnBackgroundClick : boolean
        callbackOnClicked_Close : () => void;
    }) {
        this.height = height
        this.width = width
        this.title = title
        this.close_OnBackgroundClick = hideOnBackgroundClick
        this.callbackOnClicked_Close = callbackOnClicked_Close
    }
}

interface ModalOverlay_Limelight_Component_State {

    modalOverlay_Left? : number;
    modalOverlay_Top_PositionAbsolute? : number;  // modalOverlay_Top when use position absolute
}


/**
 * ModalOverlay - Local to Limelight (Not use a Library) - React Based
 *
 */
export class ModalOverlay_Limelight_Component extends React.Component< ModalOverlay_Limelight_Component_Props, ModalOverlay_Limelight_Component_State > {

    private modalOverlay_outer_Ref

    /**
     *
     *
     */
    constructor(props : ModalOverlay_Limelight_Component_Props) {
        super(props);

        this.modalOverlay_outer_Ref = React.createRef();

        const { modalOverlay_Left, modalOverlay_Top_PositionAbsolute } : { modalOverlay_Left : number, modalOverlay_Top_PositionAbsolute : number } = (
            this._computeModalPosition({ width : props.width, height : props.height })
        )

        this.state = {
            modalOverlay_Top_PositionAbsolute,
            modalOverlay_Left
        };
        // console.log("class ModalOverlayComponent: constructor()");
    }

    // componentDidMount() {


    // }

    /**
     *
     *
     */
    private _computeModalPosition({ height, width } : {

        height : number
        width : number

    }) : { modalOverlay_Left : number, modalOverlay_Top_PositionAbsolute : number } {

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const windowScrollX = window.scrollX;
        const windowScrollY = window.scrollY;

        let topOfModalOverlay = ( windowHeight / 2 ) - ( height /* modal overlay height */ / 2 ) + windowScrollY;
        if ( topOfModalOverlay < 1 ) {
            topOfModalOverlay = 1;
        }
        if ( topOfModalOverlay < windowScrollY ) {
            topOfModalOverlay = windowScrollY;
        }

        let leftOfModalOverlay = ( windowWidth / 2 ) - ( width /* modal overlay width */ / 2 ) + windowScrollX;
        if ( leftOfModalOverlay < 1 ) {
            leftOfModalOverlay = 1;
        }

        return { modalOverlay_Left : leftOfModalOverlay , modalOverlay_Top_PositionAbsolute : topOfModalOverlay }
    }

    // componentWillUnmount() {
    //     // console.log("class ModalOverlayComponent: componentWillUnmount()");
    // }

    /**
     *
     */
    render () {

        // const modalOverlay_Left = this.state.modalOverlay_Left;
        // const modalOverlay_Top = this.state.modalOverlay_Top_PositionAbsolute;

        const background_ClassName_Main = "modal-overlay-page-background "

        let background_ClassName_Addition = "";

        if ( this.props.close_OnBackgroundClick ) {
            background_ClassName_Addition = " modal-overlay-page-background-clickable "
        }

        const background_ClassName = background_ClassName_Main + background_ClassName_Addition;

        // height : number
        // width : number
        // title : string
        // hideOnBackgroundClick : boolean
        // callbackOnClicked_Close : () => void;

        return (
            <div >
                <div className={ background_ClassName } >
                </div>

                <div className="modal-overlay-container"
                     style={ { width: this.props.width, height: this.props.height, left: this.state.modalOverlay_Left, top: this.state.modalOverlay_Top_PositionAbsolute } }>

                    <div className="modal-overlay-header" style={ { width: "100%" } }>
                        <h1 className="modal-overlay-X-icon" onClick={ this.props.callbackOnClicked_Close } >X</h1>
                        <h1 className="modal-overlay-header-text">{ this.props.title }</h1>
                    </div>

                    <div className="modal-overlay-content-body">
                        { this.props.children }
                    </div>
                </div>

            </div>
        );
    }
}
