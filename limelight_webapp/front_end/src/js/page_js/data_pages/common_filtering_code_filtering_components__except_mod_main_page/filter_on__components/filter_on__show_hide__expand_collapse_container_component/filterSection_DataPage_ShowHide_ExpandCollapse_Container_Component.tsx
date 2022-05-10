/**
 * filterSection_DataPage_ShowHide_ExpandCollapse_Container_Component.tsx
 *
 * Filter Section Container to support Show/Hide  Expand/Collapse
 *
 */

import React from "react";

/**
 *
 */
export interface FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component_Props {

}



interface FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component_State {

    showChildren? : boolean
}

/**
 *
 */
export class FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component extends React.Component< FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component_Props, FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component_State > {

    constructor(props: FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component_Props) {
        super(props);

        this.state = { showChildren: false }
    }

    render() {

        return (

            <React.Fragment>

                <div
                    className=" show-hide-text-container "
                    style={ { gridColumn: "1/-1" } }
                >
                    {/*  Span all columns of CSS Grid parent <div> */}

                    { ( ! this.state.showChildren ) ? (
                        <React.Fragment>
                            <div
                                className=" triangle-container-span " style={ { display: "inline-block" } }
                                onClick={ event => {
                                    this.setState({ showChildren: true });
                                }}
                            >
                                <img className="icon-small fake-link-image " src="static/images/pointer-right.png" />
                            </div>
                            <div
                                className=" show-hide-text "
                                style={ { display: "inline-block" } }
                                onClick={ event => {
                                    this.setState({ showChildren: true });
                                }}
                            >
                                Click to Show Filters and Options
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <div
                                className=" triangle-container-span " style={ { display: "inline-block" } }
                                onClick={ event => {
                                    this.setState({ showChildren: false });
                                }}
                            >
                                <img className="icon-small fake-link-image " src="static/images/pointer-down.png" />
                            </div>
                            <div
                                className=" show-hide-text "
                                style={ { display: "inline-block" } }
                                onClick={ event => {
                                    this.setState({ showChildren: false });
                                }}
                            >
                                Click to Hide Filters and Options
                            </div>
                        </React.Fragment>
                    )}
                </div>

                {/*  Cannot surround 'this.props.children' and use <div display: none>  to show/hide since this is a 2 column CSS Grid,

                     Cannot move the 2 column CSS Grid inside this since it is used for formatting of "Current filters:" before this component
                     so that that component's data aligns with the data for each filter component.

                  */}

                { ( this.state.showChildren ) ? (
                    this.props.children
                ) : null }

            </React.Fragment>
        )
    }

}


