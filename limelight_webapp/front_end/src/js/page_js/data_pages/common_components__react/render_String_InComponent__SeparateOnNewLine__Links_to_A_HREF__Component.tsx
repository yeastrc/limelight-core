/**
 * render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component.tsx
 *
 * One place used: Project Page - Project Information - Notes
 *
 * Process the supplied string:
 *
 *    1)   New Lines will result in the text broken on lines in the rendered result.  '\n'  to '<br/>'.  Not use <div> since want edit and delete icons to appear to right of last line.
 *
 *    2)   Strings that start with 'http' will be turned into links 'a href="[link]">[link]</a>'
 */


import React from "react";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";


const _urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

/**
 *
 */
export interface Render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component_Props {

    string_ToRender: string
}

/**
 *
 */
interface Render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component_State {

    _placeHolder?: object
}

/**
 *
 */
export class Render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component extends React.Component< Render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component_Props, Render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component_State > {

    /**
     *
     */
    constructor( props: Render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component_Props ) {
        super( props )

        this.state = {}
    }

    shouldComponentUpdate( nextProps: Readonly<Render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component_Props>, nextState: Readonly<Render_String_InComponent__SeparateOnNewLine__Links_to_A_HREF__Component_State>, nextContext: any ): boolean {
        if ( nextProps.string_ToRender !== this.props.string_ToRender ) {
            //  Update and rerender since string_ToRender changed
            return true
        }
        return false
    }

    render() {
        try {
            let textString_After_Remove_NewLine_AtEnd = this.props.string_ToRender;

            while ( textString_After_Remove_NewLine_AtEnd.endsWith("\n") ) {
                textString_After_Remove_NewLine_AtEnd = textString_After_Remove_NewLine_AtEnd.substring(0, textString_After_Remove_NewLine_AtEnd.length - 1 );
            }

            const textString_Split_NewLine = textString_After_Remove_NewLine_AtEnd.split("\n")

            const displayElements: Array<JSX.Element> = []

            {
                let displayElements_Key_Counter = 0

                const textString_Split_NewLine_Length = textString_Split_NewLine.length
                for ( let textString_Split_NewLine_Index = 0; textString_Split_NewLine_Index < textString_Split_NewLine_Length; textString_Split_NewLine_Index++ ) {
                    const textLine = textString_Split_NewLine[ textString_Split_NewLine_Index ]

                    {
                        {
                            //  Find and process any links embedded in the note text

                            const urlMatches = textLine.match(_urlRegex)

                            if ( ( ! urlMatches ) || urlMatches.length === 0 ) {

                                //  Special case of NO matches so simply output the textLine
                                displayElements_Key_Counter++
                                displayElements.push( <span key={ displayElements_Key_Counter }>{ textLine }</span> )

                            } else {
                                //  Have URL matches so add them as <a href="...">...</a>

                                let textLine_StartIndex = 0;

                                for ( const urlMatch of urlMatches ) {

                                    const urlMatch_Index = textLine.indexOf( urlMatch, textLine_StartIndex )
                                    if ( urlMatch_Index === -1 ) {
                                        const msg = "Failed to find urlMatch using textLine.indexOf( urlMatch, textLine_StartIndex ).  textLine_StartIndex: " +
                                            textLine_StartIndex + ", urlMatch: '" + urlMatch + "', textLine: '" + textLine + "'"
                                        console.warn(msg)
                                        throw Error(msg)
                                    }

                                    if ( urlMatch_Index > textLine_StartIndex ) {
                                        //  Have text before the URL so add that first

                                        const textLine_BeforeURL = textLine.substring( textLine_StartIndex, urlMatch_Index )

                                        displayElements_Key_Counter++
                                        displayElements.push( <span key={ displayElements_Key_Counter }>{ textLine_BeforeURL }</span> )
                                    }

                                    //  Add URL

                                    displayElements_Key_Counter++
                                    displayElements.push( <a key={ displayElements_Key_Counter } target="_blank" href={ urlMatch }>{ urlMatch }</a> )

                                    //  Advance textLine_StartIndex beyond the urlMatch

                                    textLine_StartIndex = urlMatch_Index + urlMatch.length
                                }

                                //  If exists, add text after last urlMatch

                                if ( textLine_StartIndex < textLine.length ) {

                                    const textLine_BeforeURL = textLine.substring( textLine_StartIndex )

                                    displayElements_Key_Counter++
                                    displayElements.push( <span key={ displayElements_Key_Counter }>{ textLine_BeforeURL }</span> )
                                }
                            }


                        }

                    }

                    if ( textString_Split_NewLine_Index !== ( textString_Split_NewLine_Length - 1 ) ) {

                        //  NOT last line so add <br/> line separator.  NOT use <div> since want 'edit note' 'delete note' to be on same line as last line of note
                        displayElements_Key_Counter++

                        displayElements.push( <br key={ displayElements_Key_Counter }/> )
                    }
                }
            }

            return (
                displayElements
            );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

}

