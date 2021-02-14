/**
 * proteinPageSearchesSummarySectionCreator_MultipleSearches.ts
 * 
 * Javascript for proteinView.jsp page - Summary section above protein list when link clicked
 * 
 */

import React from 'react';
import ReactDOM from 'react-dom';

import {
    ProteinPageSearchesSummarySectionData_Component, ProteinPageSearchesSummarySectionData_Component_Props,
    ProteinPageSearchesSummarySectionData_Root
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/proteinPageSearchesSummarySection";


/**
 * 
 */
export class ProteinPageSearchesSummarySectionCreator_MultipleSearches {

    private _combined_searches_show_summary_data_per_search_linkClick_BindThis = this._combined_searches_show_summary_data_per_search_linkClick.bind(this);

    private _summarySectionData : ProteinPageSearchesSummarySectionData_Root

    private _showingSection : boolean

	/**
	 * 
	 */
	constructor({ 
    } : {
    }) {
    }

	/**
	 * Called from ProteinViewPage_Display_SingleSearch._renderToPageProteinList(...)  in proteinViewPage_DisplayData_SingleSearch.js
     * 
     * @param proteinListData - computed data when generate protein list
	 */
    setSummaryData({ summarySectionData } : { summarySectionData : ProteinPageSearchesSummarySectionData_Root }) {

        this._summarySectionData = summarySectionData;

        if ( this._showingSection ) {

            this._populateSummarySection(); // Update section
        }
    }

	/**
	 * Will be called repeatedly so either track or remove and add
	 */
    addDisplayClickHandler() {

        const combined_searches_show_summary_data_per_search_linkDOM = document.getElementById("combined_searches_show_summary_data_per_search_link");

        if ( combined_searches_show_summary_data_per_search_linkDOM === undefined || combined_searches_show_summary_data_per_search_linkDOM === null ) {
            throw Error("No DOM element with id 'combined_searches_show_summary_data_per_search_link'");
        }

        combined_searches_show_summary_data_per_search_linkDOM.removeEventListener( "click", this._combined_searches_show_summary_data_per_search_linkClick_BindThis );

        combined_searches_show_summary_data_per_search_linkDOM.addEventListener("click", this._combined_searches_show_summary_data_per_search_linkClick_BindThis );

        // const $combined_searches_show_summary_data_per_search_linkDOM = $( combined_searches_show_summary_data_per_search_linkDOM );

        // $combined_searches_show_summary_data_per_search_linkDOM.show();

        combined_searches_show_summary_data_per_search_linkDOM.style.display = ""; // show


        const containerDOMElement = document.getElementById("combined_searches_psm_counts_per_search_container");

        if ( containerDOMElement === undefined || containerDOMElement === null ) {
            throw Error("No DOM element with id 'combined_searches_psm_counts_per_search_container'");
        }

        containerDOMElement.style.display = "none"; // hide
    }

    /**
     *
     */
    _combined_searches_show_summary_data_per_search_linkClick(event: any) {

        event.preventDefault();

        this._showingSection = true;

        this._populateSummarySection();
    }

    ///////////////////////////

	/**
	 * 
	 */
    _populateSummarySection() {


        const containerDOMElement = document.getElementById("combined_searches_psm_counts_per_search_container");

        if ( containerDOMElement === undefined || containerDOMElement === null ) {
            throw Error("No DOM element with id 'combined_searches_psm_counts_per_search_container'");
        }

        const callbackFcn: any = undefined;

        const componentProps : ProteinPageSearchesSummarySectionData_Component_Props = {
            summarySectionData : this._summarySectionData
        }

        const react_Component = (
			React.createElement(
                ProteinPageSearchesSummarySectionData_Component,
                componentProps,
                null
            )
        );

        const renderedReactComponent = ReactDOM.render(
            react_Component,
            containerDOMElement,
            callbackFcn 
        );

        containerDOMElement.style.display = ""; // show

    }

}

