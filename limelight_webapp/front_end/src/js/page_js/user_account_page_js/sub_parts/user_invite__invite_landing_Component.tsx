/**
 * user_invite__invite_landing_Component.tsx
 */


import React from "react";


export class User_invite__invite_landing_Component_Props {
    inviteProjectTitle: any
}

export const User_invite__invite_landing_Component = function ({ inviteProjectTitle } : User_invite__invite_landing_Component_Props ) {

    return (
        <div>

            { inviteProjectTitle ? (
                <>
                    <div  className="page-label">
                        Project Invitation
                    </div>

                    <div className="page-text" style={ { marginBottom: 20 } }>
                        You have been invited to a limelight project:
                    </div>

                    <div className="page-text" style={ { marginBottom: 20 } }>
                        { inviteProjectTitle }
                    </div>
                </>
            ) : null }

            <div className="page-text sign-in-above-text">
                If you already have an account, sign in:
            </div>

            <div>
                <input id="invite_landing_sign_in_choice" type="button" className="submit-button"
                       value="Sign In" />
            </div>

            <div className="page-text create-account-above-text">
                If you do not have an account, please create one:
            </div>

            <div>
                <input id="invite_landing_create_acct_choice"  type="button" className="submit-button"
                       value="Create Account" />
            </div>

        </div>
    )
}