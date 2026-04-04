/**
 * proteinPage_Display__SingleProtein_Root_Component.tsx
 * 
 * Root of Protein Page - Multiple Searches - Single Protein - inserted into <div> with id '???' in 
 * 
 * Shown when A Protein is clicked
 */


import React from 'react'

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';
import { ProteinPage_Display__SingleProtein_MainContent_Component, ProteinPage_Display__SingleProtein_MainContent_Component_Props_Prop } from './proteinPage_Display__SingleProtein_MainContent_Component'
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {ProteinPage_Display_SingleProtein_ProteinNameDescription_Component} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_Display_SingleProtein_ProteinNameDescription_Component";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";



/////////////////////////

//  Constants

const _SINGLE_PROTEIN_GREY_FAKE_BACKGROUND_WIDTH = 40  // in px

//////////////////////////////////


/**
 * 
 */
export interface ProteinPage_Display__SingleProtein_Root_Component_closeOverlayClickHandler {
    () : void
}

/**
 * 
 */
export interface ProteinPage_Display__SingleProtein_Root_Component_Props {

    component_OnInstantiate_Pass_Self_Callback: ( self: ProteinPage_Display__SingleProtein_Root_Component ) => void
    component_OnMount_Callback: () => void

    closeOverlayClickHandler : ProteinPage_Display__SingleProtein_Root_Component_closeOverlayClickHandler;

    standard_Page_Header_Height: number

    //  Optional.  Do NOT have when loading URL and directly displaying Single Protein Overlay
    proteinNames : string
    proteinDescriptions : string
}

/**
 * 
 */
interface ProteinPage_Display__SingleProtein_Root_Component_State {

    proteinPage_Display__SingleProtein_MainContent_Component_Props_Prop? : ProteinPage_Display__SingleProtein_MainContent_Component_Props_Prop

    component_SubTree_Has_Error? : boolean
}

/**
 * 
 */
export class ProteinPage_Display__SingleProtein_Root_Component extends React.Component< ProteinPage_Display__SingleProtein_Root_Component_Props, ProteinPage_Display__SingleProtein_Root_Component_State > {

    //  bind to 'this' for passing as parameters

    private _closeOverlayClickHandler_BindThis = this._closeOverlayClickHandler.bind(this);
    private _update_OnScroll_BindThis = this._update_OnScroll.bind(this);

    private view_single_protein_overlay_header_inner_container_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()

    private _update_OnScroll_Timeout : number;
    private _update_Header_Left_For_Scroll_X__Last_ScrollX_Position : number;

    //  Set when component mounts
    private _view_single_protein_inner_overlay_div_Width_Initial : number = undefined;

    private _view_single_protein_overlay_body_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div> id: view_single_protein_overlay_body
    private _view_single_protein_overlay_body_PaddingLeft : number = undefined;
    private _view_single_protein_overlay_body_PaddingRight : number = undefined;

    /**
     * 
     */    
    constructor(props : ProteinPage_Display__SingleProtein_Root_Component_Props) {
        super(props);

        // this._view_single_protein_inner_overlay_div_Ref = React.createRef<HTMLDivElement>();
        this.view_single_protein_overlay_header_inner_container_Ref = React.createRef<HTMLDivElement>();
        this._view_single_protein_overlay_body_Ref = React.createRef<HTMLDivElement>();

        this.props.component_OnInstantiate_Pass_Self_Callback( this )

        this.state = {
            proteinPage_Display__SingleProtein_MainContent_Component_Props_Prop : null
        };
    }

    /**
     * 
     */ 
    add_ProteinPage_Display__SingleProtein_MainContent_Component_Props_Prop({  

        proteinPage_Display__SingleProtein_MainContent_Component_Props_Prop
    } : {
        proteinPage_Display__SingleProtein_MainContent_Component_Props_Prop : ProteinPage_Display__SingleProtein_MainContent_Component_Props_Prop
    }) {

        this.setState( (state: ProteinPage_Display__SingleProtein_Root_Component_State, props: ProteinPage_Display__SingleProtein_Root_Component_Props ) : ProteinPage_Display__SingleProtein_Root_Component_State => {

            return { proteinPage_Display__SingleProtein_MainContent_Component_Props_Prop }
        });
    }
    
    /**
     * 
     */ 
    static getDerivedStateFromError( error : any ) : ProteinPage_Display__SingleProtein_Root_Component_State {
        // Update state so the next render will show the fallback UI.
        return { component_SubTree_Has_Error: true };
    }

    /**
     * 
     */ 
    componentDidCatch( error : any, errorInfo : any ) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'ProteinPage_Display__SingleProtein_Root_Component'. componentDidCatch: ", error, errorInfo );
        // logErrorToMyService(error, errorInfo);
    }

    /**
     * 
     */   
    componentDidMount() { try {

        {
            this.props.component_OnMount_Callback()
        }

        {
            //  Add a scroll event handler to hide the tooltip on scroll
            window.addEventListener( "scroll", this._update_OnScroll_BindThis, { passive: true } );

            this._update_Header_Left_For_Scroll_X(); //  Run for initial scroll position
        }

    } catch (e) {
        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
        throw e;
    }}

    /**
     * 
     */   
    componentWillUnmount() { try {
        window.removeEventListener( "scroll", this._update_OnScroll_BindThis );

    } catch (e) {
        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
        throw e;
    }}

    /**
     * 
     */    
    _closeOverlayClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {
        try {
            if ( this.props.closeOverlayClickHandler ) {
                this.props.closeOverlayClickHandler();
            }
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * Event Listener on 'scroll'
     */
    private _update_OnScroll() {

        if ( this._update_OnScroll_Timeout ) {
            window.clearTimeout( this._update_OnScroll_Timeout );
        }
        this._update_OnScroll_Timeout = window.setTimeout( ( ) => {
            this._update_Header_Left_For_Scroll_X();
        }, 50 )
    }

    /**
     * Updates Header Contents 'left' to keep Header contents in viewport
     */
    private _update_Header_Left_For_Scroll_X() : void {

        const scrollX = window.scrollX;

        if ( scrollX === this._update_Header_Left_For_Scroll_X__Last_ScrollX_Position ) {
            // scrollX not change so exit
            return; // EARLY RETURN
        }

        this._update_Header_Left_For_Scroll_X__Last_ScrollX_Position = scrollX;

        let marginLeft = scrollX - _SINGLE_PROTEIN_GREY_FAKE_BACKGROUND_WIDTH
        if ( marginLeft < 0 ) {
            marginLeft = 0
        }

        this.view_single_protein_overlay_header_inner_container_Ref.current.style.marginLeft = marginLeft + "px";
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

        let component_SubTree_ErrorMessage : React.JSX.Element = undefined;

        let mainContent : React.JSX.Element = undefined;


        if ( this.state.component_SubTree_Has_Error ) {

            component_SubTree_ErrorMessage = (

                <div >An Error has Occurred.  Please reload the page and try again.</div>
            );

        } else if ( this.state.proteinPage_Display__SingleProtein_MainContent_Component_Props_Prop ) {

            mainContent = (
                <ProteinPage_Display__SingleProtein_MainContent_Component
                    propsValue={ this.state.proteinPage_Display__SingleProtein_MainContent_Component_Props_Prop }
                    view_single_protein_inner_overlay_div_Width_Initial={ this._view_single_protein_inner_overlay_div_Width_Initial }
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

        let proteinName_Display_Header = null;

        if ( this.props.proteinNames ) {
            proteinName_Display_Header = this.props.proteinNames;
        } else {
            if (this.state.proteinPage_Display__SingleProtein_MainContent_Component_Props_Prop) {
                if ( this.state.proteinPage_Display__SingleProtein_MainContent_Component_Props_Prop.proteinNames) {
                    proteinName_Display_Header = this.state.proteinPage_Display__SingleProtein_MainContent_Component_Props_Prop.proteinNames;
                }
            }
        }

        return (
            <div style={ { display: "grid", gridTemplateColumns: _SINGLE_PROTEIN_GREY_FAKE_BACKGROUND_WIDTH + "px 1fr" } }>

                {/*  "Background" which is now a color to left  */ }
                <div
                    className="single-protein-modal-dialog-overlay-background"
                    style={ {
                        height: "100%"
                    } }
                >
                </div>

                <div
                    className=" overall-enclosing-block " //  Class used on main page as well as Single Protein "Overlay"
                    style={ {
                        paddingLeft: 0, paddingRight: 0 //  paddingLeft: 0, paddingRight: 0 To override the class
                    } }
                >

                    <div
                        className=" view-single-protein-overlay-div "
                        style={ { minHeight: "calc(-100px + 100dvh)" } }
                    >

                        <div className="view-single-protein-overlay-header" style={ { top: this.props.standard_Page_Header_Height } }>

                            {/*   This div is adjusted with margin left when viewport is scrolled to keep the "X" for close at the left edge of the viewport   */ }
                            <div
                                ref={ this.view_single_protein_overlay_header_inner_container_Ref }
                            >

                                <div style={ { display: "grid", gridTemplateColumns: "min-content auto" } }>
                                    {/* Next elements in the header are in a CSS Grid */ }

                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <span>
                                                Close
                                            </span>
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <h1 className="view-single-protein-overlay-X-for-exit-overlay" onClick={ closeOverlayClickHandler }
                                        >X</h1>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            proteinName_Display_Header ? (
                                                <span>
                                                    { proteinName_Display_Header }
                                                </span>
                                            ) : null
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <h1 className="view-single-protein-overlay-header-text"
                                        >
                                            <span>Protein</span>
                                            { proteinName_Display_Header ? (
                                                <span>: </span>
                                            ) : null }
                                            { proteinName_Display_Header }
                                        </h1>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                </div>
                            </div>
                        </div>
                        <div id="view_single_protein_overlay_body" className="view-single-protein-overlay-body" ref={ this._view_single_protein_overlay_body_Ref }>

                            { component_SubTree_ErrorMessage }
                            { mainContent }
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

