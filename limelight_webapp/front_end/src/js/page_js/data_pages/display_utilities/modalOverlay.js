"use strict";

let Handlebars = require('handlebars/runtime');

let _common_template_bundle = 
	require("../../../../../handlebars_templates_precompiled/common/common_template-bundle.js" );

export class ModalOverlay {

    constructor( { $containerDiv, $contentDiv, width, height, title, hideOnBackgroundClick, callbackOnClickedHide } ) {
        this.$containerDiv = $containerDiv;
        this.$contentDiv = $contentDiv;
        this.width = width;
        this.height = height;
        this.title = title;
        this.hideOnBackgroundClick = hideOnBackgroundClick;
        this.callbackOnClickedHide = callbackOnClickedHide; // Not called on .hide() method called
        this.$overlayDiv = undefined;
        this.$backgroundDiv = undefined;
    }


    createOverlayDiv() {

        let objectThis = this;

        let template = Handlebars.templates.modalOverlay;
        let html = template( { title : this.title } );
        this.$overlayDiv = $( html );

        template = Handlebars.templates.modalBackground;
        html = template( { hideOnBackgroundClick : this.hideOnBackgroundClick } );
        this.$backgroundDiv = $( html );


        let $modalOverlayContainer = this.$overlayDiv;
        let $modalOverlayBackground = this.$backgroundDiv

        const $window = $(window);
        const viewportHeight = $window.height();
        const scrollTopWindow = $window.scrollTop();

        const topOfModalOverlay = ( viewportHeight / 2 ) - ( this.height /* modal overlay height */ / 2 ) + scrollTopWindow;

        $modalOverlayContainer.css( 'width', this.width + 'px' );
        $modalOverlayContainer.css( 'left', '50%' );
        $modalOverlayContainer.css( 'top', topOfModalOverlay + 'px' );
        $modalOverlayContainer.css( 'margin-left', '-' + ( this.width / 2 ) + 'px' );
        $modalOverlayContainer.css( 'height', this.height + 'px' );

        $modalOverlayContainer.find('div.modal-overlay-content-body').empty();
        $modalOverlayContainer.find('div.modal-overlay-content-body').append( this.$contentDiv );

        this.$containerDiv.append( this.$backgroundDiv );
        this.$containerDiv.append( this.$overlayDiv );

        // add click handlers

        if ( this.hideOnBackgroundClick ) {
        	$modalOverlayBackground.click( function( e ) {
        		e.preventDefault();
        		objectThis.hide();
                if ( objectThis.callbackOnClickedHide ) {
                	objectThis.callbackOnClickedHide();
                }
        	});
        }
        
        //  Breaks form controls inside a modal dialog, 
        //     Example: checkbox (unable to check the checkbox since it reverts to unchecked, and is not broke when this .click is commented out)
        $modalOverlayContainer.click( function( e ) {
        	e.preventDefault();
            return false;
        })

        $modalOverlayContainer.find( '.modal-overlay-X-icon' ).click( function( e ) {
        	e.preventDefault();
            objectThis.hide();
            if ( objectThis.callbackOnClickedHide ) {
            	objectThis.callbackOnClickedHide();
            }
        });
    }

    // always open this overlay on top of all other overlays
    show() {

        if( this.$overlayDiv === undefined ) {
            this.createOverlayDiv();
        }

        this.$backgroundDiv.show();
        this.$overlayDiv.show();

    }

    // always open this overlay on top of all other overlays
    hide() {

        if( !this.$overlayDiv ) {
            return;
        }

        this.$backgroundDiv.hide();
        this.$overlayDiv.hide();
    }

    // remove this overlay from the page
    remove() {

        if( this.$overlayDiv ) {
            this.$backgroundDiv.remove();
            this.$overlayDiv.remove();
        }

        this.$backgroundDiv = undefined;
        this.$overlayDiv = undefined;
    }

}