/**
 * tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component.tsx
 */



import React from "react";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_NOT_FollowMousePointer_DefaultPosition,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";


const _DEFAULT_FONT_SIZE_FOR_QUESTION_MARK_IN_CIRCLE__WHEN_CANNOT_COMPUTE_SURROUNDING_FONT_SIZE__OR_FONT_SIZE_RETURNED_NOT_IN_PIXELS = 14;

const _FONT_SIZE_CUTOFF_FOR_NOT_MAKE___QUESTION_MARK_IN_CIRCLE__THAN_SURROUNDING_FONT_SIZE = 16


/**
 *
 */
interface Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component_Props {

    _placeHolder?: unknown
    title: React.ReactNode;
}

/**
 *
 */
interface Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component_State {
    forceRerender_Object?: object
}

/**
 *
 */
export class Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component extends React.Component< Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component_Props, Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component_State > {

    private _container_Ref :  React.RefObject<HTMLDivElement>;

    private _fontSize_ContainingBlock: number

    /**
     *
     */
    constructor( props: Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component_Props ) {
        super( props );

        this._container_Ref = React.createRef();

        this.state = {
            forceRerender_Object: {}
        }
    }

    componentDidMount() {

        this._compute__fontSize_ContainingBlock()
    }

    private _compute__fontSize_ContainingBlock() {

        //  fontSize_ContainingBlock should always be computed a value.  Default is a Just in case

        let fontSize_ContainingBlock: number = _DEFAULT_FONT_SIZE_FOR_QUESTION_MARK_IN_CIRCLE__WHEN_CANNOT_COMPUTE_SURROUNDING_FONT_SIZE__OR_FONT_SIZE_RETURNED_NOT_IN_PIXELS


        const computedStyle = window.getComputedStyle( this._container_Ref.current )

        const fontSize_String = computedStyle.fontSize // fontSize is string with "px" attached.  is "px" regardless of unit used to specify font size

        if ( fontSize_String.endsWith( "px" ) ) {

            const fontSize_Number = Number.parseFloat( fontSize_String )
            if ( ! Number.isNaN( fontSize_Number ) ) {

                fontSize_ContainingBlock = Math.round( fontSize_Number )
            }
        }


        this._fontSize_ContainingBlock = fontSize_ContainingBlock

        this.setState({ forceRerender_Object: {} })
    }


    render() {

        let width_ReserveSpace = "0.9em"  //  Reserve space since i in circle is in <div> position: absolute

        let size_Font_DivWithBorder = "0.6em"

        if ( this._fontSize_ContainingBlock <= _FONT_SIZE_CUTOFF_FOR_NOT_MAKE___QUESTION_MARK_IN_CIRCLE__THAN_SURROUNDING_FONT_SIZE ) {

            width_ReserveSpace = "1.1em"

            size_Font_DivWithBorder = "0.8em"

        }

        const tooltip_Main_Props = limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_NOT_FollowMousePointer_DefaultPosition();

        return (
            <span ref={ this._container_Ref } style={ { marginLeft: "0.3em", paddingRight: width_ReserveSpace } } // marginRight: ( ! this._fontSize_ContainingBlock ) ? width_ReserveSpace : 0
            >

                { this._fontSize_ContainingBlock ? (

                    // width  to reserve space since child is position absolute
                    <div style={ { display: "inline-block", position: "relative"} } // , width: ( this._fontSize_ContainingBlock ) ? width_ReserveSpace : 0
                    >

                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={ this.props.title }
                            { ...tooltip_Main_Props }
                            //  Next override items in 'tooltip_Main_Props'
                            disableInteractive={ false }
                            arrow={ true }
                            placement={ "bottom-start" }
                        >
                            <div
                                className=" standard-border-color-dark "
                                style={ {
                                    position: "absolute",
                                    top: "-0.90em", // Position top at about top of characters next to
                                    width: size_Font_DivWithBorder,
                                    height: size_Font_DivWithBorder,

                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",

                                    borderRadius: "50%", borderStyle: "solid", borderWidth: 2
                                } }
                            >
                                <div
                                    style={ { fontSize: size_Font_DivWithBorder, fontWeight: "bold", cursor: "default" } }
                                    className=" font-site-color-dark "
                                >
                                    ?
                                </div>
                            </div>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </div>
                ) : null }

            </span>
        );
    }
}