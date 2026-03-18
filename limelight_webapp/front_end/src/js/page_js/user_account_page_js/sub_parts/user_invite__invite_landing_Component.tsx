/**
 * user_invite__invite_landing_Component.tsx
 */


import React from "react";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";


export class User_invite__invite_landing_Component_Props {
    inviteProjectTitle: any

    callback_On_Mount: () => void
}

interface User_invite__invite_landing_Component_State {

    _placeholder?: unknown
}

/**
 *
 */
export class User_invite__invite_landing_Component extends React.Component< User_invite__invite_landing_Component_Props, User_invite__invite_landing_Component_State > {

    /**
     *
     */
    constructor( props: User_invite__invite_landing_Component_Props ) {
        super( props );

        this.state = {}
    }

    /**
     *
     */
    componentDidMount() {
        try {

            window.setTimeout( () => {
                try {

                    if ( this.props.callback_On_Mount ) {

                        this.props.callback_On_Mount()
                    }
                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e;
                }

            }, 10 )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        return (
            <div>

                { this.props.inviteProjectTitle ? (
                    <>
                        <div className="page-label">
                            Project Invitation
                        </div>

                        <div className="page-text" style={ { marginBottom: 20 } }>
                            You have been invited to a limelight project:
                        </div>

                        <div className="page-text" style={ { marginBottom: 20 } }>
                            { this.props.inviteProjectTitle }
                        </div>
                    </>
                ) : null }

                <div className="page-text sign-in-above-text">
                    If you already have an account, sign in:
                </div>

                <div>
                    <input id="invite_landing_sign_in_choice" type="button" className="submit-button"
                           value="Sign In"/>
                </div>

                <div className="page-text create-account-above-text">
                    If you do not have an account, please create one:
                </div>

                <div>
                    <input id="invite_landing_create_acct_choice" type="button" className="submit-button"
                           value="Create Account"/>
                </div>

            </div>
        )
    }
}