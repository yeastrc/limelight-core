import {ModViewDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
import {ProteinPositionFilterDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ProteinPositionFilterDataManager";
import {ModView_VizOptionsData} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";


export class ModViewDataUtilities {

    /**
     * Return true if the given psm has a mod w/ the given mass that falls within the current
     * defined protein position filter
     *
     * @param projectSearchId
     * @param modMass
     * @param reportedPeptideId
     * @param vizOptionsData
     * @param modViewDataManager
     * @param psm
     */
    static async psmHasModInProteinPositionFilter(
        {
            projectSearchId,
            modMass,
            reportedPeptideId,
            vizOptionsData,
            modViewDataManager,
            psm
        } : {
            projectSearchId:number,
            modMass:number,
            reportedPeptideId:number,
            vizOptionsData: ModView_VizOptionsData,
            modViewDataManager:ModViewDataManager,
            psm:any
        }
    ):Promise<boolean> {

        if(psm.variable !== null && psm.variable !== undefined) {
            if(await ModViewDataUtilities.variableModPositionInProteinPositionFilter({
                projectSearchId,
                modMass,
                reportedPeptideId,
                vizOptionsData,
                modViewDataManager
            })) {
                return true;
            }
        }

        if(psm.open !== null && psm.open !== undefined) {
            if(await ModViewDataUtilities.openModPSMInProteinPositionFilter({
                projectSearchId,
                modMass,
                reportedPeptideId,
                vizOptionsData,
                modViewDataManager,
                psmId:psm.psmId
            })) {
                return true;
            }
        }

        return false;
    }

    static async variableModPositionInProteinPositionFilter(
        {
            projectSearchId,
            modMass,
            reportedPeptideId,
            vizOptionsData,
            modViewDataManager
        } : {
            projectSearchId:number,
            modMass:number,
            reportedPeptideId:number,
            vizOptionsData: ModView_VizOptionsData,
            modViewDataManager:ModViewDataManager
        }
    ):Promise<boolean> {

        const proteinPositionFilter:ProteinPositionFilterDataManager = vizOptionsData.data.proteinPositionFilter;
        if(proteinPositionFilter === undefined) {
            return true;
        }

        const reportedPeptidesForSearch = await modViewDataManager.getReportedPeptides({projectSearchId});

        if(!(reportedPeptidesForSearch.has(reportedPeptideId))) {
            throw new Error("Did not find reportedPeptideId in reported peptides?");
        }

        const reportedPeptideData = reportedPeptidesForSearch.get(reportedPeptideId);
        if(!(reportedPeptideData.variableMods.has(modMass))) {
            throw new Error("Did not find modmass for reported peptide?");
        }

        const variableMod = reportedPeptideData.variableMods.get(modMass);
        const positions = new Set<number>();

        if(variableMod.isNTerm) { positions.add(1); }
        if(variableMod.isCTerm) { positions.add(reportedPeptideData.sequence.length); }
        if(variableMod.positions !== null && variableMod.positions !== undefined) {
            for(const pos of variableMod.positions) {
                positions.add(pos);
            }
        }

        for(const [proteinId, proteinPositions] of reportedPeptideData.proteinMatches) {
            for(const proteinPosition of proteinPositions) {
                for(const peptidePosition of positions) {

                    const finalPosition = proteinPosition + peptidePosition - 1;
                    if(proteinPositionFilter.isProteinPositionInFilter({proteinId, position:finalPosition})) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    /**
     * Returns true if the supplied psm with the supplied open mod mod mass has a localization for that open
     * mod mod mass that is contained within a range defined in the protein position filter. If the open mod
     * is unlocalized, the entire range of the peptide's mapping to a protein will be used and if any part
     * of that range is contained within a range defined in the protein position filter, return true.
     *
     * @param projectSearchId
     * @param modMass
     * @param reportedPeptideId
     * @param vizOptionsData
     * @param modViewDataManager
     * @param psmId
     */
    static async openModPSMInProteinPositionFilter(
        {
            projectSearchId,
            modMass,
            reportedPeptideId,
            vizOptionsData,
            modViewDataManager,
            psmId
        } : {
            projectSearchId:number,
            modMass:number,
            reportedPeptideId:number,
            vizOptionsData: ModView_VizOptionsData,
            modViewDataManager:ModViewDataManager,
            psmId:number
        }
    ):Promise<boolean> {

        //console.log("calling openModPositionInProteinPositionFilter()");

        const proteinPositionFilter:ProteinPositionFilterDataManager = vizOptionsData.data.proteinPositionFilter;
        if(proteinPositionFilter === undefined) {
            return true;
        }

        const reportedPeptidesForSearch = await modViewDataManager.getReportedPeptides({projectSearchId});
        const reportedPeptideData = reportedPeptidesForSearch.get(reportedPeptideId);

        const psmItem = await modViewDataManager.getOpenModPsmForModMassReportedPeptideIdPsmId({projectSearchId, reportedPeptideId, modMass, psmId});

        if( psmItem === null) {
            console.log('Did not find PSM for psm', psmId);
            return false;
        }

        if( psmItem.open === undefined) {
            throw new Error("open mod psm has no open mod data.");
        }

        if(!(reportedPeptidesForSearch.has(reportedPeptideId))) {
            throw new Error("Did not find reportedPeptideId in reported peptides?");
        }


        const openModData = psmItem.open;

        if( openModData.unloc ) {

            // unlocalized open mod

            for(const [proteinId, proteinPositions] of reportedPeptideData.proteinMatches) {
                for(const proteinPosition of proteinPositions) {
                    const start = proteinPosition;
                    const end = proteinPosition + reportedPeptideData.sequence.length - 1;

                    if(proteinPositionFilter.isProteinRangeInFilter({proteinId, start, end})) {
                        return true;
                    }
                }
            }

        } else {

            // localized open mod

            const positions = new Set<number>();

            if(openModData.nterm) { positions.add(1); }
            if(openModData.cterm) { positions.add(reportedPeptideData.sequence.length); }
            if(openModData.loc !== null && openModData.loc !== undefined) {
                for(const pos of openModData.loc) {
                    positions.add(pos);
                }
            }

            for(const [proteinId, proteinPositions] of reportedPeptideData.proteinMatches) {
                for(const proteinPosition of proteinPositions) {
                    for(const peptidePosition of positions) {

                        const finalPosition = proteinPosition + peptidePosition - 1;
                        if(proteinPositionFilter.isProteinPositionInFilter({proteinId, position:finalPosition})) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }

    static async anyOpenModPSMInProteinPositionFilter(
        {
            projectSearchId,
            modMass,
            reportedPeptideId,
            vizOptionsData,
            modViewDataManager,
            psmIds
        } : {
            projectSearchId:number,
            modMass:number,
            reportedPeptideId:number,
            vizOptionsData: ModView_VizOptionsData,
            modViewDataManager:ModViewDataManager,
            psmIds:Array<number>
        }
    ):Promise<boolean> {

        //console.log("calling openModPositionInProteinPositionFilter()");

        for(const psmId of psmIds) {
            if(await ModViewDataUtilities.openModPSMInProteinPositionFilter({
                projectSearchId,
                modMass,
                reportedPeptideId,
                vizOptionsData,
                modViewDataManager,
                psmId
            })) {
                return true;
            }
        }

        return false;
    }

}