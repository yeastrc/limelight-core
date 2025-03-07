import {
    ModPage_ModViewDataManager_PSM_Data_ForModMasses_SinglePsmEntry,
    ModViewDataManager
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
import {ProteinPositionFilterDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ProteinPositionFilterDataManager";
import {ModView_VizOptionsData} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";


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
            psm:  ModPage_ModViewDataManager_PSM_Data_ForModMasses_SinglePsmEntry
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

    static async psmIsUnlocalized(
        {
            projectSearchId,
            modMass,
            reportedPeptideId,
            modViewDataManager,
            psm
        } : {
            projectSearchId:number,
            modMass:number,
            reportedPeptideId:number,
            modViewDataManager:ModViewDataManager,
            psm: ModPage_ModViewDataManager_PSM_Data_ForModMasses_SinglePsmEntry
        }
    ):Promise<boolean> {

        if(psm.open !== null && psm.open !== undefined) {
            if(await ModViewDataUtilities.openModPSMIsUnlocalized({
                projectSearchId,
                modMass,
                reportedPeptideId,
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
     * Return true if the given open mod PSM is unlocalized (open mod mass not assigned to any position)
     *
     * @param projectSearchId
     * @param modMass
     * @param reportedPeptideId
     * @param modViewDataManager
     * @param psmId
     */
    static async openModPSMIsUnlocalized(
        {
            projectSearchId,
            modMass,
            reportedPeptideId,
            modViewDataManager,
            psmId
        } : {
            projectSearchId:number,
            modMass:number,
            reportedPeptideId:number,
            modViewDataManager:ModViewDataManager,
            psmId:number
        }
    ):Promise<boolean> {

        const psmItem = await modViewDataManager.getOpenModPsmForModMassReportedPeptideIdPsmId({projectSearchId, reportedPeptideId, modMass, psmId});

        if( psmItem === null) {
            throw new Error("could not find open mod psm.");
        }

        if( psmItem.open === undefined) {
            throw new Error("open mod psm has no open mod data.");
        }


        const openModData = psmItem.open;
        return openModData.unloc;
    }

    /**
     * Return true if all the supplied open mod PSMs are unlocalized, false otherwise
     *
     * @param projectSearchId
     * @param modMass
     * @param reportedPeptideId
     * @param modViewDataManager
     * @param psmIds
     */
    static async allOpenModPSMsAreUnlocalized(
        {
            projectSearchId,
            modMass,
            reportedPeptideId,
            modViewDataManager,
            psmIds
        } : {
            projectSearchId:number,
            modMass:number,
            reportedPeptideId:number,
            modViewDataManager:ModViewDataManager,
            psmIds:Array<number>
        }
    ):Promise<boolean> {

        for(const psmId of psmIds) {
            if(!(await ModViewDataUtilities.openModPSMIsUnlocalized({
                projectSearchId,
                modMass,
                reportedPeptideId,
                modViewDataManager,
                psmId
            }))) {
                return false;
            }
        }

        return true;
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

        if( psmItem === null || psmItem === undefined ) {
            console.log('Did not find PSM for psm', psmId);
            return false;
        }

        if( psmItem.open === undefined || psmItem.open === null ) {
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

    /**
     * Get the n-terminal residue(s) (single letter amino acid code) in the sequence for this protein for this reported peptide id.
     * This is based on the mapping of this peptide to this protein from the database, not a direct
     * string match. If this peptide is found in multiple places in this same protein, all unique
     * n-terminal residues are returned. If there is no n-terminal residue (peptide is n-terminal)
     * in the protein, 'n' will be returned as the residue.
     *
     * @param projectSearchId
     * @param proteinSequenceVersionId
     * @param reportedPeptideId
     */
    static async getPreResidueForPeptideProtein(
        {
            projectSearchId,
            proteinSequenceVersionId,
            reportedPeptideIds,
            modViewDataManager
        } : {
            projectSearchId:number,
            proteinSequenceVersionId:number,
            reportedPeptideIds:Array<number>,
            modViewDataManager:ModViewDataManager
        }
    ):Promise<Array<string>> {

        const proteinSequence = await modViewDataManager.getProteinSequence({projectSearchId, proteinSequenceVersionId});
        const reportedPeptides = await modViewDataManager.getReportedPeptides({projectSearchId});

        const residuesSet:Set<string> = new Set();
        let isNTerminal = false;

        for(const reportedPeptideId of reportedPeptideIds) {
            const reportedPeptide = reportedPeptides.get(reportedPeptideId);


            // this reported peptide wasn't found.
            if (!reportedPeptide) {
                const error = new Error("Could not find reported peptide in the supplied search.");
                reportWebErrorToServer.reportErrorObjectToServer({errorException: error});
                throw(error);
            }

            if (reportedPeptide.proteinMatches.has(proteinSequenceVersionId)) {

                for (const position of reportedPeptide.proteinMatches.get(proteinSequenceVersionId)) {

                    if (position !== 1) {
                        residuesSet.add(proteinSequence.substring(position - 2, position - 1));
                    } else {
                        isNTerminal = true;
                    }
                }

            } else {

                const error = new Error("Could not find reported peptide in supplied protein.");
                reportWebErrorToServer.reportErrorObjectToServer({errorException: error});
                throw(error);
            }
        }


        const residues:Array<string> = Array.from(residuesSet).sort();
        if(isNTerminal) {
            residues.unshift('n');
        }

        return residues;
    }


    /**
     * Get the c-terminal residue(s) (single letter amino acid code) in the sequence for this protein for this reported peptide id.
     * This is based on the mapping of this peptide to this protein from the database, not a direct
     * string match. If this peptide is found in multiple places in this same protein, all unique
     * c-terminal residues are returned. If there is no c-terminal residue (peptide is c-terminal)
     * in the protein, 'c' will be returned as the residue.
     *
     * @param projectSearchId
     * @param proteinSequenceVersionId
     * @param reportedPeptideId
     */
    static async getPostResidueForPeptideProtein(
        {
            projectSearchId,
            proteinSequenceVersionId,
            reportedPeptideIds,
            modViewDataManager
        } : {
            projectSearchId:number,
            proteinSequenceVersionId:number,
            reportedPeptideIds:Array<number>,
            modViewDataManager:ModViewDataManager
        }
    ):Promise<Array<string>> {

        const proteinSequence = await modViewDataManager.getProteinSequence({projectSearchId, proteinSequenceVersionId});
        const reportedPeptides = await modViewDataManager.getReportedPeptides({projectSearchId});

        const residuesSet:Set<string> = new Set();
        let isCTerminal = false;

        for(const reportedPeptideId of reportedPeptideIds) {

            const reportedPeptide = reportedPeptides.get(reportedPeptideId);

            // this reported peptide wasn't found.
            if (!reportedPeptide) {
                const error = new Error("Could not find reported peptide in the supplied search.");
                reportWebErrorToServer.reportErrorObjectToServer({errorException: error});
                throw(error);
            }

            if (reportedPeptide.proteinMatches.has(proteinSequenceVersionId)) {

                const peptideLength = reportedPeptide.sequence.length;

                for (const position of reportedPeptide.proteinMatches.get(proteinSequenceVersionId)) {

                    if (position <= proteinSequence.length - peptideLength + 1) {
                        residuesSet.add(proteinSequence.substring(position + peptideLength - 1, position + peptideLength));
                    } else {
                        isCTerminal = true;
                    }

                }

            } else {

                const error = new Error("Could not find reported peptide in supplied protein.");
                reportWebErrorToServer.reportErrorObjectToServer({errorException: error});
                throw(error);
            }
        }

        const residues:Array<string> = Array.from(residuesSet).sort();
        if(isCTerminal) {
            residues.push('c');
        }

        return residues;
    }

}