/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module basic-styles/underline/underlineediting
 */

import { Plugin } from 'ckeditor5/src/core.js';
import AttributeCommand from '../attributecommand.js';
import type { accessibilityMetadata } from 'ckeditor5/src/ui.js';

const UNDERLINE = 'underline';

/**
 * The underline editing feature.
 *
 * It registers the `'underline'` command, the <kbd>Ctrl+U</kbd> keystroke
 * and introduces the `underline` attribute in the model which renders to the view as an `<u>` element.
 */
export default class UnderlineEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	public static get pluginName() {
		return 'UnderlineEditing' as const;
	}

	/**
	 * @inheritDoc
	 */
	public init(): void {
		const editor = this.editor;

		// Allow strikethrough attribute on text nodes.
		editor.model.schema.extend( '$text', { allowAttributes: UNDERLINE } );
		editor.model.schema.setAttributeProperties( UNDERLINE, {
			isFormatting: true,
			copyOnEnter: true
		} );

		editor.conversion.attributeToElement( {
			model: UNDERLINE,
			view: 'u',
			upcastAlso: {
				styles: {
					'text-decoration': 'underline'
				}
			}
		} );

		// Create underline command.
		editor.commands.add( UNDERLINE, new AttributeCommand( editor, UNDERLINE ) );

		// Set the Ctrl+U keystroke.
		editor.keystrokes.set( 'CTRL+U', 'underline' );
	}

	/**
	 * @inheritDoc
	 */
	public get accessibilityMetadata(): accessibilityMetadata {
		const t = this.editor.t;

		return {
			keystrokes: [
				{
					label: t( 'Underline text' ),
					keystroke: 'CTRL+U'
				}
			]
		};
	}
}
