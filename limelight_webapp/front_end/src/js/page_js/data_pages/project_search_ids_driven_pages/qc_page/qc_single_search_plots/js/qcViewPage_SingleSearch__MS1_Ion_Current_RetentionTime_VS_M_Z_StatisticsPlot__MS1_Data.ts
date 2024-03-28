/**
 * qcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__MS1_Data.ts
 *
 * QC Page Single Search : MS1 Ion Current - Retention Time vs M/Z Statistics - MS 1 Data for Chart
 *
 */

import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import {quantile} from "d3";

//  ASCII  Use for any downloads
// const _GREATER_THAN_EQUALS_STRING_ASCII = ">=";
// const _LESS_THAN_EQUALS_STRING_ASCII = "<=";

const _GREATER_THAN_EQUALS_STRING_UNICODE = "\u2265"; // ">=" as a single character
const _LESS_THAN_EQUALS_STRING_UNICODE = "\u2264"; // "<=" as a single character


/**
 *
 */
export class QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__MS1_Data_Root {

    chart_X_Min: number
    chart_X_Max: number
    chart_Y_Min: number
    chart_Y_Max: number
    ms1_IntensityScaleBar_Tick_Values : Array<number>
    ms1_IntensityScaleBar_Tick_Labels : Array<string>

    chart_X : Array<number>
    chart_Y : Array<number>
    chart_Z : Array<Array<number>>
    intensity_Max_For_ColorBar_Computations_Log: number
    intensity_Min_For_ColorBar_Computations_Log: number
    chart_TextEntries_ForTooltip : Array<Array<string>>
}

/**
 *
 */
export const qcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__Compute_MS1_Data = function (
    {
        ms1_PeakIntensityBinnedOn_RT_MZ_OverallData
    } : {
        ms1_PeakIntensityBinnedOn_RT_MZ_OverallData: any  //  From Spectr
    }
) : QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__MS1_Data_Root {

    const jsonContents = ms1_PeakIntensityBinnedOn_RT_MZ_OverallData.jsonContents;
    const summaryData = ms1_PeakIntensityBinnedOn_RT_MZ_OverallData.summaryData;

    let totalSummedIonCurrent = 0;

    const intensity_Entries_All_Log : Array<number> = [];

    let intensity_Min : number = undefined;
    let intensity_Max : number = undefined;

    let retentionTime_Seconds_Binned_Min: number = undefined;
    let retentionTime_Seconds_Binned_Max: number = undefined;
    let m_z_Binned_Min: number = undefined;
    let m_z_Binned_Max: number = undefined;

    //  Copy data into Map with key is number
    const intensity_Map_Key_M_Z_Map_Key_RetentionTime_Seconds : Map<number,Map<number,number>> = new Map();

    const ms1_IntensitiesBinnedSummed_ObjectAsMap = ms1_PeakIntensityBinnedOn_RT_MZ_OverallData.ms1_IntensitiesBinnedSummedMap;


    const ms1_IntensitiesBinnedSummed_ObjectAsMap_Keys = Object.keys( ms1_IntensitiesBinnedSummed_ObjectAsMap );

    //  Compute MIN, MAX of Retention Time and M/Z and totalSummedIonCurrent

    for ( const outerKey_RetentionTime_Seconds_Binned_String of ms1_IntensitiesBinnedSummed_ObjectAsMap_Keys ) {

        const outerKey_RetentionTime_Seconds_Binned_Number = Number.parseFloat(outerKey_RetentionTime_Seconds_Binned_String);
        if ( Number.isNaN( outerKey_RetentionTime_Seconds_Binned_Number ) ) {
            const msg = "( Number.isNaN( outerKey_RetentionTime_Seconds_Binned_Number ) ) . outerKey_RetentionTime_Seconds_Binned_String: " + outerKey_RetentionTime_Seconds_Binned_String;
            console.warn(msg);
            throw Error(msg);
        }

        if ( retentionTime_Seconds_Binned_Min === undefined ) {
            retentionTime_Seconds_Binned_Min = outerKey_RetentionTime_Seconds_Binned_Number;
            retentionTime_Seconds_Binned_Max = outerKey_RetentionTime_Seconds_Binned_Number;
        } else {
            if ( retentionTime_Seconds_Binned_Min > outerKey_RetentionTime_Seconds_Binned_Number ) {
                retentionTime_Seconds_Binned_Min = outerKey_RetentionTime_Seconds_Binned_Number;
            }
            if ( retentionTime_Seconds_Binned_Max < outerKey_RetentionTime_Seconds_Binned_Number ) {
                retentionTime_Seconds_Binned_Max = outerKey_RetentionTime_Seconds_Binned_Number;
            }
        }

        const intensity_Map_Key_M_Z : Map<number,number> = new Map();

        let summedIonCurrent_For_RetentionTime: number = 0;

        const innerObjectAsMap_Per_M_Z = ms1_IntensitiesBinnedSummed_ObjectAsMap[ outerKey_RetentionTime_Seconds_Binned_String ];

        const innerObjectAsMap_Per_M_Z__Keys = Object.keys(innerObjectAsMap_Per_M_Z);

        for ( const innerObjectAsMap_Per_M_Z__Key of innerObjectAsMap_Per_M_Z__Keys ) {

            const innerKey_M_Z_Binned_Number = Number.parseFloat(innerObjectAsMap_Per_M_Z__Key);
            if ( Number.isNaN( innerKey_M_Z_Binned_Number ) ) {
                const msg = "( Number.isNaN( innerKey_M_Z_Binned_Number ) ) . innerObjectAsMap_Per_M_Z__Key: " + innerObjectAsMap_Per_M_Z__Key;
                console.warn(msg);
                throw Error(msg);
            }

            if ( m_z_Binned_Min === undefined ) {
                m_z_Binned_Min = innerKey_M_Z_Binned_Number;
                m_z_Binned_Max = innerKey_M_Z_Binned_Number;
            } else {
                if ( m_z_Binned_Min > innerKey_M_Z_Binned_Number ) {
                    m_z_Binned_Min = innerKey_M_Z_Binned_Number;
                }
                if ( m_z_Binned_Max < innerKey_M_Z_Binned_Number ) {
                    m_z_Binned_Max = innerKey_M_Z_Binned_Number;
                }
            }

            const binnedIonCurrent = innerObjectAsMap_Per_M_Z[ innerObjectAsMap_Per_M_Z__Key ];

            if ( ! limelight__variable_is_type_number_Check( binnedIonCurrent ) ) {
                const msg = "( ! limelight__variable_is_type_number_Check( binnedIonCurrent ) ) . binnedIonCurrent: " + binnedIonCurrent;
                console.warn(msg);
                throw Error(msg);
            }

            intensity_Map_Key_M_Z.set(innerKey_M_Z_Binned_Number, binnedIonCurrent );

            summedIonCurrent_For_RetentionTime += binnedIonCurrent;

            intensity_Entries_All_Log.push( Math.log( binnedIonCurrent ) );

            if ( intensity_Min === undefined ) {
                intensity_Min = binnedIonCurrent;
                intensity_Max = binnedIonCurrent;
            } else {
                if ( intensity_Min > binnedIonCurrent ) {
                    intensity_Min = binnedIonCurrent;
                }
                if ( intensity_Max < binnedIonCurrent ) {
                    intensity_Max = binnedIonCurrent;
                }
            }
        }

        intensity_Map_Key_M_Z_Map_Key_RetentionTime_Seconds.set(outerKey_RetentionTime_Seconds_Binned_Number, intensity_Map_Key_M_Z );

        totalSummedIonCurrent += summedIonCurrent_For_RetentionTime;
    }

    //  Put Binned Intensities into Array of Array for Heatmap

    //   [ row index ] [ column index ] = Array for Heatmap

    //  [ Outer: M/Z ] [ Inner: Retention Time ]

    const chart_Z : Array<Array<number>> = [];  // Each inner array is a row of the heatmap.  The outer array holds the rows of the heatmap

    // console.warn( "FAKE add if ( intensity > XXXXX ) { ") //  TODO

    for ( const intensity_Map_Key_M_Z_Map_Key_RetentionTime_Seconds_Entry of intensity_Map_Key_M_Z_Map_Key_RetentionTime_Seconds.entries() ) {

        const retentionTime_Seconds = intensity_Map_Key_M_Z_Map_Key_RetentionTime_Seconds_Entry[0];
        const intensity_Map_Key_M_Z_Map = intensity_Map_Key_M_Z_Map_Key_RetentionTime_Seconds_Entry[1];

        for ( const intensity_Map_Key_M_Z_Map_Entry of intensity_Map_Key_M_Z_Map.entries() ) {

            const mz = intensity_Map_Key_M_Z_Map_Entry[0];
            const intensity = intensity_Map_Key_M_Z_Map_Entry[1];

            //  compute offset from m_z_Binned_Min

            const mz_Index = mz - m_z_Binned_Min;

            if ( ! chart_Z[ mz_Index ] ) {
                chart_Z[ mz_Index ] = [];
            }
            const chart_Z_Row : Array<number> = chart_Z[ mz_Index ];

            //  compute offset from retentionTime_Seconds_Binned_Min

            const rt_Index = retentionTime_Seconds - retentionTime_Seconds_Binned_Min;

            const intensity_Log = Math.log( intensity );

            chart_Z_Row[rt_Index] = intensity_Log;  // Comment out if uncomment following test code
        }
    }

    //  For NOW: Fill gaps in chart_Z with empty arrays

    for ( let index = 0; index < chart_Z.length; index++ ) {
        if ( ! chart_Z[ index ] ) {
            chart_Z[ index ] = [];
        }
    }

    //  Create Chart Data for MS1 Trace

    //  Create chart_X and chart_Y

    const chart_X : Array<number> = [];
    const chart_Y : Array<number> = [];

    const chart_X_Min = retentionTime_Seconds_Binned_Min / 60;
    const chart_X_Max = retentionTime_Seconds_Binned_Max / 60;
    const chart_Y_Min = m_z_Binned_Min;
    const chart_Y_Max = m_z_Binned_Max;


    {
        for ( let retentionTime_Seconds_Binned = retentionTime_Seconds_Binned_Min; retentionTime_Seconds_Binned <= retentionTime_Seconds_Binned_Max; retentionTime_Seconds_Binned++ ) {
            chart_X.push(retentionTime_Seconds_Binned / 60 );
        }

        for ( let m_z_Binned = m_z_Binned_Min; m_z_Binned <= m_z_Binned_Max; m_z_Binned++ ) {
            chart_Y.push(m_z_Binned);
        }
    }

    console.warn( "MS 1 retentionTime_InMinutes_Min: " + retentionTime_Seconds_Binned_Min / 60 +
        ", MS 1 retentionTime_InMinutes_Max: " + retentionTime_Seconds_Binned_Max / 60 +
        ", MS 1 m_z_Binned_Min: " + m_z_Binned_Min +
        ", MS 1 m_z_Binned_Max: " + m_z_Binned_Max
    );

    console.log( "Chart: MS1 Binned Ion Current: m/z vs/ Retention Time.  totalSummedIonCurrent: " + totalSummedIonCurrent )

    //  Tooltip Contents
    const chart_TextEntries_ForTooltip : Array<Array<string>> = [];

    {
        const outerLength = chart_Z.length;
        for ( let outerIndex = 0; outerIndex < outerLength; outerIndex++ ) {

            const textEntriesInner: Array<string> = [];
            chart_TextEntries_ForTooltip.push( textEntriesInner );
            const innerArray = chart_Z[ outerIndex ];

            const innerLength = innerArray.length;
            for ( let innerIndex = 0; innerIndex < innerLength; innerIndex++ ) {
                const entry = innerArray[ innerIndex ];
                if ( entry ) {
                    const ionCurrent = Math.exp( entry );
                    const ionCurrentString = ionCurrent.toExponential(3);
                    const retentionTime_InMinutes = ( innerIndex + retentionTime_Seconds_Binned_Min ) / 60;
                    let retentionTime_InMinutes_String = retentionTime_InMinutes.toFixed( 3 );
                    const text =
                        '<b>Ion Current</b>: ' + ionCurrentString +
                        '<br><b>Retention Time</b>: ' + retentionTime_InMinutes_String +
                        '<br><b>m/z</b>: ' + ( outerIndex + m_z_Binned_Min );
                    textEntriesInner.push( text );
                } else {
                    textEntriesInner.push(null);
                }
            }
        }
    }

    const ms1_IntensityScaleBar_Tick_Values : Array<number> = [];
    const ms1_IntensityScaleBar_Tick_Labels : Array<string> = [];

    const intensity_Max_Log: number = Math.log( intensity_Max );
    const intensity_Min_Log: number = Math.log( intensity_Min );

    //  create Max/Min For_ColorBar_Computations_Log to remove outliers from Intensity color range

    let intensity_Max_For_ColorBar_Computations_Log: number = undefined; // intensity_Max_Log;  // Subtract from intensity_Max_Log
    let intensity_Min_For_ColorBar_Computations_Log: number = undefined; // intensity_Min_Log;  // Add to intensity_Min_Log

    {
        intensity_Entries_All_Log.sort( (a,b) => {
            if ( a < b ) {
                return -1;
            }
            if ( a > b ) {
                return 1;
            }
            return 0
        });

        const FIRST_QUARTER_PERCENTILE = 0.25;
        const THIRD_QUARTER_PERCENTILE = 0.75;
        const QUARTILE_MULTIPLIER = 2;

        const intensity_First_Quartile_Log = quantile( intensity_Entries_All_Log, FIRST_QUARTER_PERCENTILE );
        const intensity_Third_Quartile_Log = quantile( intensity_Entries_All_Log, THIRD_QUARTER_PERCENTILE );

        const iqr = intensity_Third_Quartile_Log - intensity_First_Quartile_Log; // Interquartile Range
        intensity_Min_For_ColorBar_Computations_Log = intensity_First_Quartile_Log - QUARTILE_MULTIPLIER * iqr;
        intensity_Max_For_ColorBar_Computations_Log = intensity_Third_Quartile_Log + QUARTILE_MULTIPLIER * iqr;

        if ( intensity_Min_For_ColorBar_Computations_Log < intensity_Min_Log ) {
            intensity_Min_For_ColorBar_Computations_Log = intensity_Min_Log;
        }
        if ( intensity_Max_For_ColorBar_Computations_Log > intensity_Max_Log ) {
            intensity_Max_For_ColorBar_Computations_Log = intensity_Max_Log;
        }

        if ( intensity_Min_For_ColorBar_Computations_Log > intensity_Max_For_ColorBar_Computations_Log ) {
            intensity_Min_For_ColorBar_Computations_Log = intensity_Max_For_ColorBar_Computations_Log
        }

    }

    {
        const num_significant_digits = 3;

        //  Shift Min/Max Tick Mark values from very end of Color Bar
        const tickValue_Min_Max_Shift_ToMoveLabelFromEdge = (intensity_Max_For_ColorBar_Computations_Log - intensity_Min_For_ColorBar_Computations_Log) * .008;

        {  //  Max value
            const intensityValue_Log = intensity_Max_For_ColorBar_Computations_Log

            const intensityValue = Math.exp( intensityValue_Log );
            const tickValue = intensityValue_Log - tickValue_Min_Max_Shift_ToMoveLabelFromEdge; // Alter to shift position of label
            const tickLabel = _GREATER_THAN_EQUALS_STRING_UNICODE + " " + intensityValue.toExponential( num_significant_digits );

            ms1_IntensityScaleBar_Tick_Values.push( tickValue );
            ms1_IntensityScaleBar_Tick_Labels.push( tickLabel );
        }
        {  //  Min value
            const intensityValue_Log = intensity_Min_For_ColorBar_Computations_Log;

            const intensityValue = Math.exp( intensityValue_Log );
            const tickValue = intensityValue_Log + tickValue_Min_Max_Shift_ToMoveLabelFromEdge; // Alter to shift position of label
            const tickLabel = _LESS_THAN_EQUALS_STRING_UNICODE + " " + intensityValue.toExponential( num_significant_digits );

            ms1_IntensityScaleBar_Tick_Values.push( tickValue );
            ms1_IntensityScaleBar_Tick_Labels.push( tickLabel );
        }
        {  //  Mid Point value
            const intensityValue_Log = ( intensity_Max_For_ColorBar_Computations_Log + intensity_Min_For_ColorBar_Computations_Log ) / 2;

            const intensityValue = Math.exp( intensityValue_Log );
            const tickValue = intensityValue_Log;
            const tickLabel = intensityValue.toExponential( num_significant_digits );

            ms1_IntensityScaleBar_Tick_Values.push( tickValue );
            ms1_IntensityScaleBar_Tick_Labels.push( tickLabel );
        }
        {  //  75% value
            const percentage = 0.75;

            const intensityValue_Log = ( ( intensity_Max_For_ColorBar_Computations_Log - intensity_Min_For_ColorBar_Computations_Log ) * percentage ) + intensity_Min_For_ColorBar_Computations_Log ;

            const intensityValue = Math.exp( intensityValue_Log );
            const tickValue = intensityValue_Log;
            const tickLabel = intensityValue.toExponential( num_significant_digits );

            ms1_IntensityScaleBar_Tick_Values.push( tickValue );
            ms1_IntensityScaleBar_Tick_Labels.push( tickLabel );
        }
        {  //  25% value
            const percentage = 0.25;

            const intensityValue_Log = ( ( intensity_Max_For_ColorBar_Computations_Log - intensity_Min_For_ColorBar_Computations_Log ) * percentage ) + intensity_Min_For_ColorBar_Computations_Log ;

            const intensityValue = Math.exp( intensityValue_Log );
            const tickValue = intensityValue_Log;
            const tickLabel = intensityValue.toExponential( num_significant_digits );

            ms1_IntensityScaleBar_Tick_Values.push( tickValue );
            ms1_IntensityScaleBar_Tick_Labels.push( tickLabel );
        }
    }

    const result : QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__MS1_Data_Root = {

        chart_X_Min,
        chart_X_Max,
        chart_Y_Min,
        chart_Y_Max,
        ms1_IntensityScaleBar_Tick_Values,
        ms1_IntensityScaleBar_Tick_Labels,

        chart_X,
        chart_Y,
        chart_Z,
        intensity_Max_For_ColorBar_Computations_Log,
        intensity_Min_For_ColorBar_Computations_Log,
        chart_TextEntries_ForTooltip
    }

    return result;

}