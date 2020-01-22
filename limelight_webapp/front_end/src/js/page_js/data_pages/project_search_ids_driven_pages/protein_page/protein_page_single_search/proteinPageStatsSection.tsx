/**
 * proteinPageStatsSection.tsx
 * 
 * Add Conditions Section
 * 
 * Shown when "Add Replicate" is clicked
 */


import React from 'react'


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

export interface ProteinViewPage_StatsSection_Props {

    data
}

/**
 * 
 */
export class ProteinViewPage_StatsSection extends React.Component< ProteinViewPage_StatsSection_Props, {} > {

    constructor(props : ProteinViewPage_StatsSection_Props) {
        super(props);

        //  bind to 'this' for passing as parameters
        // this._mainCellClickHandler_BindThis = this._mainCellClickHandler.bind(this);
        
        this.state = {
        };
    }



    /**
     * 
     */
    render () {

        return (
            <table>
                <thead>
                    <tr>
                        <th>#MS2 scans</th>
                        <th>Total #PSMs</th>
                        <th>Total #peptides</th>
                        <th>Total #proteins</th>
                        <th>Total #unmodified PSMs</th>
                        <th>Total #modified PSMs</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{ this.props.data.ms2ScanCount }</td>
                        <td>{ this.props.data.psmCount }</td>
                        <td>{ this.props.data.reportedPeptideCount }</td>
                        <td>{ this.props.data.proteinCount }</td>
                        <td>{ this.props.data.psmsNoVariableModsCount }</td>
                        <td>{ this.props.data.psmsYesVariableModsCount }</td>
                    </tr>
                </tbody>
			
		    </table>
        );

    }

}