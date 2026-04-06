/**
 * needlemanWunsch_Algorithm_Implementation.ts
 */



// =============================================================================
// Needleman-Wunsch Global Pairwise Sequence Alignment
// Scoring: BLOSUM62 substitution matrix, affine gap penalties
// =============================================================================

// ---------------------------------------------------------------------------
// BLOSUM62 substitution matrix
// ---------------------------------------------------------------------------

const BLOSUM62_AMINO_ACIDS = "ARNDCQEGHILKMFPSTWYV";

const BLOSUM62_RAW: number[][] = [
    // A   R   N   D   C   Q   E   G   H   I   L   K   M   F   P   S   T   W   Y   V
    [  4, -1, -2, -2,  0, -1, -1,  0, -2, -1, -1, -1, -1, -2, -1,  1,  0, -3, -2,  0], // A
    [ -1,  5,  0, -2, -3,  1,  0, -2,  0, -3, -2,  2, -1, -3, -2, -1, -1, -3, -2, -3], // R
    [ -2,  0,  6,  1, -3,  0,  0,  0,  1, -3, -3,  0, -2, -3, -2,  1,  0, -4, -2, -3], // N
    [ -2, -2,  1,  6, -3,  0,  2, -1, -1, -3, -4, -1, -3, -3, -1,  0, -1, -4, -3, -3], // D
    [  0, -3, -3, -3,  9, -3, -4, -3, -3, -1, -1, -3, -1, -2, -3, -1, -1, -2, -2, -1], // C
    [ -1,  1,  0,  0, -3,  5,  2, -2,  0, -3, -2,  1,  0, -3, -1,  0, -1, -2, -1, -2], // Q
    [ -1,  0,  0,  2, -4,  2,  5, -2,  0, -3, -3,  1, -2, -3, -1,  0, -1, -3, -2, -2], // E
    [  0, -2,  0, -1, -3, -2, -2,  6, -2, -4, -4, -2, -3, -3, -2,  0, -2, -2, -3, -3], // G
    [ -2,  0,  1, -1, -3,  0,  0, -2,  8, -3, -3, -1, -2, -1, -2, -1, -2, -2,  2, -3], // H
    [ -1, -3, -3, -3, -1, -3, -3, -4, -3,  4,  2, -3,  1,  0, -3, -2, -1, -3, -1,  3], // I
    [ -1, -2, -3, -4, -1, -2, -3, -4, -3,  2,  4, -2,  2,  0, -3, -2, -1, -2, -1,  1], // L
    [ -1,  2,  0, -1, -3,  1,  1, -2, -1, -3, -2,  5, -1, -3, -1,  0, -1, -3, -2, -2], // K
    [ -1, -1, -2, -3, -1,  0, -2, -3, -2,  1,  2, -1,  5,  0, -2, -1, -1, -1, -1,  1], // M
    [ -2, -3, -3, -3, -2, -3, -3, -3, -1,  0,  0, -3,  0,  6, -4, -2, -2,  1,  3, -1], // F
    [ -1, -2, -2, -1, -3, -1, -1, -2, -2, -3, -3, -1, -2, -4,  7, -1, -1, -4, -3, -2], // P
    [  1, -1,  1,  0, -1,  0,  0,  0, -1, -2, -2,  0, -1, -2, -1,  4,  1, -3, -2, -2], // S
    [  0, -1,  0, -1, -1, -1, -1, -2, -2, -1, -1, -1, -1, -2, -1,  1,  5, -2, -2,  0], // T
    [ -3, -3, -4, -4, -2, -2, -3, -2, -2, -3, -2, -3, -1,  1, -4, -3, -2, 11,  2, -3], // W
    [ -2, -2, -2, -3, -2, -1, -2, -3,  2, -1, -1, -2, -1,  3, -3, -2, -2,  2,  7, -1], // Y
    [  0, -3, -3, -3, -1, -2, -2, -3, -3,  3,  1, -2,  1, -1, -2, -2,  0, -3, -1,  4], // V
];

/** Pre-built lookup map for O(1) substitution score access */
const BLOSUM62: Map<string, number> = (() => {
    const map = new Map<string, number>();
    for (let i = 0; i < BLOSUM62_AMINO_ACIDS.length; i++) {
        for (let j = 0; j < BLOSUM62_AMINO_ACIDS.length; j++) {
            map.set(`${BLOSUM62_AMINO_ACIDS[i]},${BLOSUM62_AMINO_ACIDS[j]}`, BLOSUM62_RAW[i][j]);
        }
    }
    return map;
})();

/**
 * Returns the BLOSUM62 substitution score for two amino acid characters.
 * Unknown residues return the mismatch fallback value.
 */
export function getBlosum62Score(a: string, b: string, unknownFallback = -4): number {
    return BLOSUM62.get(`${a.toUpperCase()},${b.toUpperCase()}`) ?? unknownFallback;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NeedlemanWunsch_Algorithm_AlignmentOptions {
    /** Gap open penalty (positive = penalizing). Default: 11 */
    gapOpen?: number;
    /** Gap extend penalty (positive = penalizing). Default: 1 */
    gapExtend?: number;
    /** Score for unknown residue pairs. Default: -4 */
    unknownFallback?: number;
}

export interface NeedlemanWunsch_Algorithm_AlignmentResult {
    /** Aligned version of seq1, with '-' for gaps */
    alignedSeq1: string;
    /** Aligned version of seq2, with '-' for gaps */
    alignedSeq2: string;
    /**
     * Consensus / match string:
     *   '|' = identical residues
     *   '+' = positive BLOSUM62 score (conservative substitution)
     *   '.' = negative / zero BLOSUM62 score (mismatch)
     *   ' ' = gap position
     */
    consensus: string;
    /** Raw alignment score */
    score: number;
    /** Number of identical positions */
    identities: number;
    /** Number of positions with positive substitution score (includes identities) */
    positives: number;
    /** Number of gap characters across both aligned sequences */
    gaps: number;
    /** Alignment length (length of alignedSeq1 / alignedSeq2 / consensus — they are equal) */
    alignmentLength: number;
    /** Percent identity (identities / alignmentLength * 100, rounded to 2 dp) */
    percentIdentity: number;
    /** Percent positives (positives / alignmentLength * 100, rounded to 2 dp) */
    percentPositives: number;
}

// ---------------------------------------------------------------------------
// Internal traceback constants
// ---------------------------------------------------------------------------

const DIAG  = 1;
const UP    = 2;
const LEFT  = 3;

// ---------------------------------------------------------------------------
// Core alignment function
// ---------------------------------------------------------------------------

/**
 * Performs global pairwise sequence alignment using the Needleman-Wunsch
 * algorithm with affine gap penalties and the BLOSUM62 scoring matrix.
 *
 * @param seq1 - First protein sequence (single-letter amino acid codes)
 * @param seq2 - Second protein sequence (single-letter amino acid codes)
 * @param options - Scoring parameters (gap penalties, unknown residue fallback)
 * @returns AlignmentResult with aligned sequences, consensus, and statistics
 *
 * @example
 * ```ts
 * import { alignSequences } from './needlemanWunsch';
 *
 * const result = alignSequences('HEAGAWGHEE', 'PAWHEAE');
 * console.log(result.alignedSeq1); // "HEAGAWGHE-E"
 * console.log(result.consensus);
 * console.log(result.alignedSeq2); // "--P-AW-HEAE"
 * console.log(result.percentIdentity);
 * ```
 */
export function needlemanWunsch_Algorithm_AlignSequences(
    seq1: string,
    seq2: string,
    options: NeedlemanWunsch_Algorithm_AlignmentOptions = {}
): NeedlemanWunsch_Algorithm_AlignmentResult {
    const gapOpen    = options.gapOpen    ?? 11;
    const gapExtend  = options.gapExtend  ?? 1;
    const unknownFallback = options.unknownFallback ?? -4;

    const s1 = seq1.toUpperCase().replace(/\s/g, "");
    const s2 = seq2.toUpperCase().replace(/\s/g, "");
    const m  = s1.length;
    const n  = s2.length;

    if (m === 0 || n === 0) {
        throw new Error("Both sequences must be non-empty.");
    }

    // ---- Allocate DP matrices ------------------------------------------------
    // Three matrices for affine gap scoring:
    //   M  – best score ending in a match/mismatch
    //   Ix – best score ending in a gap in seq2 (gap opened in seq1 direction)
    //   Iy – best score ending in a gap in seq1 (gap opened in seq2 direction)
    const NEG_INF = -Infinity;
    const M  = Array.from({ length: m + 1 }, () => new Float64Array(n + 1).fill(NEG_INF));
    const Ix = Array.from({ length: m + 1 }, () => new Float64Array(n + 1).fill(NEG_INF));
    const Iy = Array.from({ length: m + 1 }, () => new Float64Array(n + 1).fill(NEG_INF));

    // Traceback matrix (stores which matrix the best predecessor came from)
    // Encoded as: matrix * 10 + direction  (e.g. 11=M+DIAG, 22=Ix+UP, 33=Iy+LEFT)
    const TB = Array.from({ length: m + 1 }, () => new Uint8Array(n + 1));

    // ---- Initialise ----------------------------------------------------------
    M[0][0]  = 0;
    Ix[0][0] = NEG_INF;
    Iy[0][0] = NEG_INF;

    for (let i = 1; i <= m; i++) {
        Ix[i][0] = -(gapOpen + gapExtend * (i - 1));
        M[i][0]  = NEG_INF;
        Iy[i][0] = NEG_INF;
        TB[i][0] = 20 + UP; // Ix + UP
    }
    for (let j = 1; j <= n; j++) {
        Iy[0][j] = -(gapOpen + gapExtend * (j - 1));
        M[0][j]  = NEG_INF;
        Ix[0][j] = NEG_INF;
        TB[0][j] = 30 + LEFT; // Iy + LEFT
    }

    // ---- Fill ----------------------------------------------------------------
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const sub = getBlosum62Score(s1[i - 1], s2[j - 1], unknownFallback);

            // Best score for M[i][j] — must come from diagonal
            const mFromM  = M[i - 1][j - 1]  + sub;
            const mFromIx = Ix[i - 1][j - 1] + sub;
            const mFromIy = Iy[i - 1][j - 1] + sub;
            if (mFromM >= mFromIx && mFromM >= mFromIy) {
                M[i][j] = mFromM; TB[i][j] = 10 + DIAG;
            } else if (mFromIx >= mFromIy) {
                M[i][j] = mFromIx; TB[i][j] = 20 + DIAG;
            } else {
                M[i][j] = mFromIy; TB[i][j] = 30 + DIAG;
            }

            // Ix[i][j] — gap in seq2 (extend along seq1)
            const ixOpen   = (M[i - 1][j]  === NEG_INF ? NEG_INF : M[i - 1][j]  - gapOpen);
            const ixExtend = (Ix[i - 1][j] === NEG_INF ? NEG_INF : Ix[i - 1][j] - gapExtend);
            if (ixOpen >= ixExtend) {
                Ix[i][j] = ixOpen;
            } else {
                Ix[i][j] = ixExtend;
            }

            // Iy[i][j] — gap in seq1 (extend along seq2)
            const iyOpen   = (M[i][j - 1]  === NEG_INF ? NEG_INF : M[i][j - 1]  - gapOpen);
            const iyExtend = (Iy[i][j - 1] === NEG_INF ? NEG_INF : Iy[i][j - 1] - gapExtend);
            if (iyOpen >= iyExtend) {
                Iy[i][j] = iyOpen;
            } else {
                Iy[i][j] = iyExtend;
            }
        }
    }

    // ---- Choose best terminal cell -------------------------------------------
    const finalM  = M[m][n]  === NEG_INF ? NEG_INF : M[m][n];
    const finalIx = Ix[m][n] === NEG_INF ? NEG_INF : Ix[m][n];
    const finalIy = Iy[m][n] === NEG_INF ? NEG_INF : Iy[m][n];

    let score: number;
    let curMatrix: number; // 1=M, 2=Ix, 3=Iy

    if (finalM >= finalIx && finalM >= finalIy) {
        score = finalM; curMatrix = 1;
    } else if (finalIx >= finalIy) {
        score = finalIx; curMatrix = 2;
    } else {
        score = finalIy; curMatrix = 3;
    }

    // ---- Traceback -----------------------------------------------------------
    const aln1: string[] = [];
    const aln2: string[] = [];
    let ci = m, cj = n;

    while (ci > 0 || cj > 0) {
        if (ci === 0) {
            // Must consume remaining seq2 as gaps in seq1
            aln1.push("-");
            aln2.push(s2[cj - 1]);
            cj--;
            continue;
        }
        if (cj === 0) {
            aln1.push(s1[ci - 1]);
            aln2.push("-");
            ci--;
            continue;
        }

        if (curMatrix === 1) {
            // We arrived at M[ci][cj] from a diagonal step
            aln1.push(s1[ci - 1]);
            aln2.push(s2[cj - 1]);
            const tb = TB[ci][cj];
            curMatrix = Math.floor(tb / 10);
            ci--; cj--;
        } else if (curMatrix === 2) {
            // Gap in seq2 — we moved down in seq1
            aln1.push(s1[ci - 1]);
            aln2.push("-");
            // Determine whether gap was opened or extended
            const ixOpen   = M[ci - 1][cj]  === NEG_INF ? NEG_INF : M[ci - 1][cj]  - gapOpen;
            const ixExtend = Ix[ci - 1][cj] === NEG_INF ? NEG_INF : Ix[ci - 1][cj] - gapExtend;
            curMatrix = ixOpen >= ixExtend ? 1 : 2;
            ci--;
        } else {
            // Gap in seq1 — we moved right in seq2
            aln1.push("-");
            aln2.push(s2[cj - 1]);
            const iyOpen   = M[ci][cj - 1]  === NEG_INF ? NEG_INF : M[ci][cj - 1]  - gapOpen;
            const iyExtend = Iy[ci][cj - 1] === NEG_INF ? NEG_INF : Iy[ci][cj - 1] - gapExtend;
            curMatrix = iyOpen >= iyExtend ? 1 : 3;
            cj--;
        }
    }

    aln1.reverse();
    aln2.reverse();

    // ---- Build consensus + statistics ---------------------------------------
    let identities = 0;
    let positives  = 0;
    let gaps       = 0;
    const consensusArr: string[] = [];

    for (let k = 0; k < aln1.length; k++) {
        const a = aln1[k];
        const b = aln2[k];
        if (a === "-" || b === "-") {
            gaps++;
            consensusArr.push(" ");
        } else if (a === b) {
            identities++;
            positives++;
            consensusArr.push("|");
        } else {
            const s = getBlosum62Score(a, b, unknownFallback);
            if (s > 0) {
                positives++;
                consensusArr.push("+");
            } else {
                consensusArr.push(".");
            }
        }
    }

    const alignmentLength = aln1.length;
    const r2 = (v: number) => Math.round(v * 100) / 100;

    return {
        alignedSeq1:     aln1.join(""),
        alignedSeq2:     aln2.join(""),
        consensus:       consensusArr.join(""),
        score,
        identities,
        positives,
        gaps,
        alignmentLength,
        percentIdentity:  r2((identities / alignmentLength) * 100),
        percentPositives: r2((positives  / alignmentLength) * 100),
    };
}

// ---------------------------------------------------------------------------
// Utility: format alignment for display (BLAST-style chunked output)
// ---------------------------------------------------------------------------

export interface FormattedAlignmentBlock {
    /** 1-based start position in seq1 for this block */
    seq1Start: number;
    /** 1-based end position in seq1 for this block */
    seq1End: number;
    /** Aligned portion of seq1 for this block */
    seq1Chunk: string;
    /** Consensus characters for this block */
    consensusChunk: string;
    /** Aligned portion of seq2 for this block */
    seq2Chunk: string;
    /** 1-based start position in seq2 for this block */
    seq2Start: number;
    /** 1-based end position in seq2 for this block */
    seq2End: number;
}

/**
 * Splits an AlignmentResult into fixed-width blocks for display,
 * tracking residue positions in each original sequence (gaps excluded).
 *
 * @param result   - The AlignmentResult returned by alignSequences()
 * @param lineWidth - Characters per alignment block. Default: 60
 * @returns Array of FormattedAlignmentBlock, one per display line
 *
 * @example
 * ```ts
 * const blocks = formatAlignment(result);
 * blocks.forEach(b => {
 *   console.log(`Query  ${b.seq1Start.toString().padStart(4)}  ${b.seq1Chunk}  ${b.seq1End}`);
 *   console.log(`             ${b.consensusChunk}`);
 *   console.log(`Sbjct  ${b.seq2Start.toString().padStart(4)}  ${b.seq2Chunk}  ${b.seq2End}`);
 * });
 * ```
 */
export function formatAlignment(
    result: NeedlemanWunsch_Algorithm_AlignmentResult,
    lineWidth = 60
): FormattedAlignmentBlock[] {
    const { alignedSeq1, alignedSeq2, consensus } = result;
    const blocks: FormattedAlignmentBlock[] = [];

    let pos1 = 0; // residue pointer for seq1
    let pos2 = 0; // residue pointer for seq2

    for (let start = 0; start < alignedSeq1.length; start += lineWidth) {
        const end = Math.min(start + lineWidth, alignedSeq1.length);

        const chunk1 = alignedSeq1.slice(start, end);
        const chunk2 = alignedSeq2.slice(start, end);
        const chunkC = consensus.slice(start, end);

        const seq1Start = pos1 + 1;
        const seq2Start = pos2 + 1;

        for (const c of chunk1) if (c !== "-") pos1++;
        for (const c of chunk2) if (c !== "-") pos2++;

        blocks.push({
            seq1Start,
            seq1End:        pos1,
            seq1Chunk:      chunk1,
            consensusChunk: chunkC,
            seq2Chunk:      chunk2,
            seq2Start,
            seq2End:        pos2,
        });
    }

    return blocks;
}

