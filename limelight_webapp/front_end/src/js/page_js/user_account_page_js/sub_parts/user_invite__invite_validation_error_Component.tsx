/**
 * user_invite__invite_validation_error_Component.tsx
 */


import React from "react";


export class User_invite__invite_validation_error_Component_Props {
    inviteTrackingCodeNotValidReason
}

export const User_invite__invite_validation_error_Component = function ({ inviteTrackingCodeNotValidReason } : User_invite__invite_validation_error_Component_Props ) {

    return (
        <>
            <div style={ { fontSize: 16, fontWeight: "bold", marginTop: 20, marginBottom: 20 } }>
                An Error occurred processing this invite.
            </div>
            <div style={ { fontSize: 16, fontWeight: "bold", marginBottom: 20 } }>
                { inviteTrackingCodeNotValidReason.invalidInviteCode ? (
                        <div>
                    The invite code is invalid.
                        </div>
                ) : inviteTrackingCodeNotValidReason.inviteCodeAlreadyUsed ? (
                    <div>
                    The invite code has already been used.
                    </div>
                ) : inviteTrackingCodeNotValidReason.inviteCodeReplacedByNewer ? (
                <div>
                    The invite code has been replaced by a newer one.  Please use the more recent invite email.
                    </div>
                ) : inviteTrackingCodeNotValidReason.inviteCodeRevoked ? (
                    <div>
                    The invite code has been revoked.
                    </div>
                ) : inviteTrackingCodeNotValidReason.projectNotExist ? (
                        <div>
                        The project no longer exists for this invite code.
                    </div>
                ) : null }
            </div>
        </>
    )
}