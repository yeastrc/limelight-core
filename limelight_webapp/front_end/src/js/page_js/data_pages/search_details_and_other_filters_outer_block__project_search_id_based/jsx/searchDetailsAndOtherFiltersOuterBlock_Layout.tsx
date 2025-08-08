/**
 * searchDetailsAndOtherFiltersOuterBlock_Layout.tsx
 *
 * Root of Search Details And Other Filters Outer Block
 */


import React from 'react'

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';


/**
 *
 */
export interface SearchDetailsAndOtherFiltersOuterBlock_Layout_Props {

    projectSearchIds: Array<number>
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

        const divStyle: React.CSSProperties = {
            display: "grid", rowGap: 2, marginBottom: 3
        }

        if ( this.props.projectSearchIds.length === 1 ) {

            divStyle.gridTemplateColumns = "max-content minmax(min-content, 0) auto"
        } else {

            divStyle.gridTemplateColumns = "max-content auto"
        }

        return (
            <div
                style={ divStyle }
            >

                { this.props.children }

            </div>
        )
    }
}
