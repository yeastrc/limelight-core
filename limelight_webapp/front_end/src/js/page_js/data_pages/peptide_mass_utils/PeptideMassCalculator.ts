class AminoAcid {
    code: string;
    shortName: string;
    name: string;
    mono: number;
    avg: number;

    constructor(aaCode: string, aaShortName: string, aaName: string, monoMass: number, avgMass: number) {
        this.code = aaCode;
        this.shortName = aaShortName;
        this.name = aaName;
        this.mono = monoMass;
        this.avg = avgMass;
    }
}

class AminoAcidDatabase {
    static aa: Record<string, AminoAcid> = {};

    static addAminoAcid(aminoAcid: AminoAcid) {
        this.aa[aminoAcid.code] = aminoAcid;
    }

    static getAminoAcid(aaCode: string): AminoAcid {
        if(this.aa[aaCode]) {
            return this.aa[aaCode];
        } else {
            return new AminoAcid(aaCode, aaCode, aaCode,0.0, 0.0);
        }
    }
}

// Creating instances of AminoAcid and adding them to AminoAcidDatabase
AminoAcidDatabase.addAminoAcid(new AminoAcid("A", "Ala", "Alanine", 71.037113805, 71.0779));
AminoAcidDatabase.addAminoAcid(new AminoAcid("R", "Arg", "Arginine", 156.101111050, 156.18568));
AminoAcidDatabase.addAminoAcid(new AminoAcid("N", "Asn", "Asparagine", 114.042927470, 114.10264));
AminoAcidDatabase.addAminoAcid(new AminoAcid("D", "Asp", "Aspartic Acid", 115.026943065, 115.0874));
AminoAcidDatabase.addAminoAcid(new AminoAcid("C", "Cys", "Cysteine", 103.009184505, 103.1429));
AminoAcidDatabase.addAminoAcid(new AminoAcid("E", "Glu", "Glutamine", 129.042593135, 129.11398));
AminoAcidDatabase.addAminoAcid(new AminoAcid("Q", "Gln", "Glutamic Acid", 128.058577540, 128.12922));
AminoAcidDatabase.addAminoAcid(new AminoAcid("G", "Gly", "Glycine", 57.021463735, 57.05132));
AminoAcidDatabase.addAminoAcid(new AminoAcid("H", "His", "Histidine", 137.058911875, 137.13928));
AminoAcidDatabase.addAminoAcid(new AminoAcid("I", "Ile", "Isoleucine", 113.084064015, 113.15764));
AminoAcidDatabase.addAminoAcid(new AminoAcid("L", "Leu", "Leucine", 113.084064015, 113.15764));
AminoAcidDatabase.addAminoAcid(new AminoAcid("K", "Lys", "Lysine", 128.094963050, 128.17228));
AminoAcidDatabase.addAminoAcid(new AminoAcid("M", "Met", "Methionine", 131.040484645, 131.19606));
AminoAcidDatabase.addAminoAcid(new AminoAcid("F", "Phe", "Phenylalanine", 147.068413945, 147.17386));
AminoAcidDatabase.addAminoAcid(new AminoAcid("P", "Pro", "Proline", 97.052763875, 97.11518));
AminoAcidDatabase.addAminoAcid(new AminoAcid("S", "Ser", "Serine", 87.032028435, 87.0773));
AminoAcidDatabase.addAminoAcid(new AminoAcid("T", "Thr", "Threonine", 101.047678505, 101.10388));
AminoAcidDatabase.addAminoAcid(new AminoAcid("W", "Trp", "Tryptophan", 186.079312980, 186.2099));
AminoAcidDatabase.addAminoAcid(new AminoAcid("Y", "Tyr", "Tyrosine", 163.063328575, 163.17326));
AminoAcidDatabase.addAminoAcid(new AminoAcid("V", "Val", "Valine", 99.068413945, 99.13106));

class PeptideMassCalculator {

    static calculatePeptideMass(peptide: string, modifications: number[]): number {
        let mass = 0;
        for (let char of peptide) {
            mass += AminoAcidDatabase.getAminoAcid(char).mono;
        }

        for (let mod of modifications) {
            mass += mod;
        }

        mass += OXYGEN_MONOISOTOPIC_MASS;
        mass += 2 * HYDROGEN_MONOISOTOPIC_MASS;

        return mass;
    }

    static calculateMZ(peptide: string, modifications: number[], charge: number): number {

        let peptideMass = PeptideMassCalculator.calculatePeptideMass(peptide, modifications);
        let mz = (peptideMass + (PROTON_MASS * charge)) / charge;

        return mz;
    }
}

const PROTON_MASS    = 1.00727647;
const C13_MASS_DELTA = 1.0033548352;
const HYDROGEN_MONOISOTOPIC_MASS = 1.00782503207;
const OXYGEN_MONOISOTOPIC_MASS = 15.99491461956;

export { PeptideMassCalculator, PROTON_MASS, C13_MASS_DELTA, HYDROGEN_MONOISOTOPIC_MASS, OXYGEN_MONOISOTOPIC_MASS };
