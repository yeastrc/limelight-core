/**
 * searchDetailsAndOtherFiltersOuterBlock_Layout.tsx
 *
 * Root of Search Details And Other Filters Outer Block
 */


import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


/**
 *
 */
export interface SearchDetailsAndOtherFiltersOuterBlock_Layout_Props {

}

/**
 *
 */
interface SearchDetailsAndOtherFiltersOuterBlock_Layout_State {

    _placeholder?: any
}

/**
 *
 */
export class SearchDetailsAndOtherFiltersOuterBlock_Layout extends React.Component< SearchDetailsAndOtherFiltersOuterBlock_Layout_Props, SearchDetailsAndOtherFiltersOuterBlock_Layout_State > {

    /**
     *
     */
    constructor(props : SearchDetailsAndOtherFiltersOuterBlock_Layout_Props) {
        super(props);

        this.state = {};
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        return (
            <table style={ { borderWidth : 0 } } >
                <tbody>
                    { this.props.children }
                </tbody>
            </table>
        )
    }
}
