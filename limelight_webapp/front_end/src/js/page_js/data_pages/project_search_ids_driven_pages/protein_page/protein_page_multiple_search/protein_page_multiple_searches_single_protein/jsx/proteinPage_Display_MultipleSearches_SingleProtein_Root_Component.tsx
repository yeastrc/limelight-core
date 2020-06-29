/**
 * proteinPage_Display_MultipleSearches__SingleProtein_Root_Component.tsx
 * 
 * Root of Protein Page - Multiple Searches - Single Protein - inserted into <div> with id '???' in 
 * 
 * Shown when A Protein is clicked
 */


import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { ProteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component, ProteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component_Props_Prop } from './proteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component'
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {ProteinPage_Display_SingleProtein_ProteinNameDescription_Component} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_Display_SingleProtein_ProteinNameDescription_Component";



/////////////////////////

//  Constants

// Min width for outer container. Increase to 1120 to fit 5 digits.
const _OUTERMOST_CONTAINER_MIN_WIDTH = 1120; 

//////////////////////////////////


/**
 * 
 */
export interface ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component_closeOverlayClickHandler {
    () : void
}

/**
 * 
 */
export interface ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component_Props {

    closeOverlayClickHandler : ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component_closeOverlayClickHandler;

    //  Optional.  Do NOT have when loading URL and directly displaying Single Protein Overlay
    proteinNames : string
    proteinDescriptions : string
}

/**
 * 
 */
interface ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component_State {

    proteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component_Props_Prop? : ProteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component_Props_Prop

    component_SubTree_Has_Error? : boolean
}

/**
 * 
 */
export class ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component extends React.Component< ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component_Props, ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component_State > {

    //  bind to 'this' for passing as parameters

    private _closeOverlayClickHandler_BindThis = this._closeOverlayClickHandler.bind(this);
    private _setWidth__view_single_protein_inner_overlay_div_BindThis = this._setWidth__view_single_protein_inner_overlay_div.bind(this);

    private _view_single_protein_inner_overlay_div_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div> id: view_single_protein_inner_overlay_div

    private _view_single_protein_inner_overlay_div_Width : number = undefined;

    //  Set when component mounts
    private _view_single_protein_inner_overlay_div_Width_Initial : number = undefined;

    private _view_single_protein_overlay_body_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div> id: view_single_protein_overlay_body
    private _view_single_protein_overlay_body_PaddingLeft : number = undefined;
    private _view_single_protein_overlay_body_PaddingRight : number = undefined;

    /**
     * 
     */    
    constructor(props : ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component_Props) {
        super(props);

        this._view_single_protein_inner_overlay_div_Ref = React.createRef<HTMLDivElement>();
        this._view_single_protein_overlay_body_Ref = React.createRef<HTMLDivElement>();

        this.state = { 
            proteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component_Props_Prop : null
        };
    }

    /**
     * 
     */ 
    add_ProteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component_Props_Prop({  

        proteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component_Props_Prop
    } : {
        proteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component_Props_Prop : ProteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component_Props_Prop
    }) {

        this.setState( (state: ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component_State, props: ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component_Props ) : ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component_State => {

            return { proteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component_Props_Prop }
        });
    }
    
    /**
     * 
     */ 
    static getDerivedStateFromError( error : any ) : ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component_State {
        // Update state so the next render will show the fallback UI.
        return { component_SubTree_Has_Error: true };
    }

    /**
     * 
     */ 
    componentDidCatch( error : any, errorInfo : any ) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'ProteinPage_Display_MultipleSearches_SingleProtein_Root_Component'. componentDidCatch: ", error, errorInfo );
        // logErrorToMyService(error, errorInfo);
    }

    /**
     * 
     */   
    componentDidMount() {

        {
            //  this._view_single_protein_inner_overlay_div_Ref

            const element_Ref_DOM = this._view_single_protein_inner_overlay_div_Ref.current;

            // const containerRect = element_Ref_DOM.getBoundingClientRect();

            const element_ComputedStyle = window.getComputedStyle( element_Ref_DOM, null );

            {
                const width_String =  element_ComputedStyle.width;
                if ( ! width_String.endsWith("px") ) {
                    const msg = "Code only designed to handle width that is in 'px'. _view_single_protein_inner_overlay_div_Ref.current element_ComputedStyle.width: " + width_String;
                    console.warn( msg );
                    throw Error( msg );
                }
                const width_NumberInPx = Number.parseFloat( width_String );
                if ( Number.isNaN( width_NumberInPx ) ) {
                    const msg = "_view_single_protein_inner_overlay_div_Ref.current width fail to parse to int.  element_ComputedStyle.width: " + width_String;
                    console.warn( msg );
                    throw Error( msg );
                }

                this._view_single_protein_inner_overlay_div_Width = width_NumberInPx;

                this._view_single_protein_inner_overlay_div_Width_Initial = width_NumberInPx;
            }
        }
        {  //  _view_single_protein_overlay_body_Ref

            const element_Ref_DOM = this._view_single_protein_overlay_body_Ref.current;

            // const containerRect = element_Ref_DOM.getBoundingClientRect();

            const element_ComputedStyle = window.getComputedStyle( element_Ref_DOM, null );

            {
                const paddingLeft_String =  element_ComputedStyle.paddingLeft;
                if ( ! paddingLeft_String.endsWith("px") ) {
                    const msg = "Code only designed to handle paddingLeft that is in 'px'. _view_single_protein_inner_overlay_div_Ref.current element_ComputedStyle.paddingLeft: " + paddingLeft_String;
                    console.warn( msg );
                    throw Error( msg );
                }
                const paddingLeft_NumberInPx = Number.parseFloat( paddingLeft_String );
                if ( Number.isNaN( paddingLeft_NumberInPx ) ) {
                    const msg = "_view_single_protein_inner_overlay_div_Ref.current paddingLeft fail to parse to int.  element_ComputedStyle.paddingLeft: " + paddingLeft_String;
                    console.warn( msg );
                    throw Error( msg );
                }
                this._view_single_protein_overlay_body_PaddingLeft = paddingLeft_NumberInPx;
            }
            {
                const paddingRight_String = element_ComputedStyle.paddingRight;
                if ( ! paddingRight_String.endsWith("px") ) {
                    const msg = "Code only designed to handle paddingRight that is in 'px'. _view_single_protein_inner_overlay_div_Ref.current element_ComputedStyle.paddingRight: " + paddingRight_String;
                    console.warn( msg );
                    throw Error( msg );
                }
                const paddingRight_NumberInPx = Number.parseFloat( paddingRight_String );
                if ( Number.isNaN( paddingRight_NumberInPx ) ) {
                    const msg = "_view_single_protein_inner_overlay_div_Ref.current paddingRight fail to parse to int.  element_ComputedStyle.paddingRight: " + paddingRight_String;
                    console.warn( msg );
                    throw Error( msg );
                }
                this._view_single_protein_overlay_body_PaddingRight = paddingRight_NumberInPx;
            }
        }
    }

    /**
     * 
     */   
    componentWillUnmount() {

    }

    /**
     * 
     */    
    _closeOverlayClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {
        try {
            // event.preventDefault();
            // event.stopPropagation();

            if ( this.props.closeOverlayClickHandler ) {
                this.props.closeOverlayClickHandler();
            }
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * Called by child component
     */  
    _setWidth__view_single_protein_inner_overlay_div({ width } : { width : number }) : void {

        if ( this._view_single_protein_inner_overlay_div_Width !== width ) {

            this._view_single_protein_inner_overlay_div_Width = width;

            this._view_single_protein_inner_overlay_div_Ref.current.style.width = width + 'px';
        }
    }

    ////////////////////////////////////////

    /**
     * 
     */    
    render() {

        let closeOverlayClickHandler = undefined;

        if ( this.props.closeOverlayClickHandler ) {
            closeOverlayClickHandler = this._closeOverlayClickHandler_BindThis
        }

        let component_SubTree_ErrorMessage : JSX.Element = undefined;

        let mainContent : JSX.Element = undefined;


        if ( this.state.component_SubTree_Has_Error ) {

            component_SubTree_ErrorMessage = (

                <div >An Error has Occurred.  Please reload the page and try again.</div>
            );

        } else if ( this.state.proteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component_Props_Prop ) {

            mainContent = (
                <ProteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component
                    propsValue={ this.state.proteinPage_Display_MultipleSearches_SingleProtein_MainContent_Component_Props_Prop }
                    view_single_protein_inner_overlay_div_Width_Initial={ this._view_single_protein_inner_overlay_div_Width_Initial }
                    setWidth__view_single_protein_inner_overlay_div={ this._setWidth__view_single_protein_inner_overlay_div_BindThis }
                    view_single_protein_overlay_body_PaddingLeft={ this._view_single_protein_overlay_body_PaddingLeft }
                    view_single_protein_overlay_body_PaddingRight={ this._view_single_protein_overlay_body_PaddingRight }
                />
            );

        } else {

            mainContent = (
                <div>
                    { ( this.props.proteinNames !== undefined ) ? ( //  Display proteinNames/proteinDescriptions if have them

                        <div style={ { marginBottom: 15 } }>
                            <ProteinPage_Display_SingleProtein_ProteinNameDescription_Component
                                proteinNames={ this.props.proteinNames }
                                proteinDescriptions={ this.props.proteinDescriptions }
                            />
                        </div>
                    ) : null
                    }
                    <div style={ { fontSize: 18 }} >
                        Loading Data
                    </div>
                    <div style={ { marginTop: 40 } }>
                        <Spinner_Limelight_Component/>
                    </div>
                </div>
            )
        }

        return (
            <div >
                <div id="single_protein_overlay_background" className="single-protein-modal-dialog-overlay-background" >

                </div>

                <div id="view_single_protein_overlay_div" className=" overall-enclosing-block " 
                    style={ { marginLeft: "auto", marginRight: "auto", paddingLeft: 0, paddingRight: 0 } } >

                    <div id="view_single_protein_inner_overlay_div"  className=" view-single-protein-overlay-div " ref={ this._view_single_protein_inner_overlay_div_Ref }>

                        <div id="view_single_protein_overlay_header" className="view-single-protein-overlay-header" style={ { width: "100%" } } >

                            <h1 id="view_single_protein_overlay_X_for_exit_overlay" className="view-single-protein-overlay-X-for-exit-overlay" onClick={ closeOverlayClickHandler }
                            >X</h1>
                                                
                            <h1 id="view_single_protein_overlay_header_text" className="view-single-protein-overlay-header-text" >Protein Data</h1>
                        </div>
                        <div id="view_single_protein_overlay_body" className="view-single-protein-overlay-body" ref={ this._view_single_protein_overlay_body_Ref } >

                            { component_SubTree_ErrorMessage }
                            { mainContent }
                        </div>
                    </div>
                </div>	

            </div>
        );
    }

}
