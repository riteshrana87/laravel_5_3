/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here.
    // For complete reference see:
    // http://docs.ckeditor.com/#!/api/CKEDITOR.config

    // The toolbar groups arrangement, optimized for two toolbar rows.
    config.toolbarGroups = [
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ] },
        { name: 'links' },
        { name: 'insert' },
        { name: 'forms' },
        { name: 'tools' },
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'others' },
        '/',
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
        { name: 'styles' },
        { name: 'colors' },
        { name: 'about' }
    ];

    // Remove some buttons provided by the standard plugins, which are
    // not needed in the Standard(s) toolbar.
    config.removeButtons = 'Underline,Subscript,Superscript';

    // Set the most common block elements.
    config.format_tags = 'p;h1;h2;h3;pre';

    // Simplify the dialog windows.
    config.removeDialogTabs = 'image:advanced;link:advanced';

    //remove p tag
    config.enterMode = CKEDITOR.ENTER_BR;

    //image plugin
    //config.extraPlugins = 'image,filebrowser';

    //config.extraPlugins = 'filebrowser';

    /**
     * A list of additional plugins to be loaded. This setting makes it easier
     * to add new plugins without having to touch the {@link CKEDITOR.config#plugins} setting.
     *
     * **Note:** The most recommended way to
     * [add CKEditor plugins](http://docs.ckeditor.com/#!/guide/dev_plugins) is through
     * [CKEditor Builder](http://ckeditor.com/builder).
     *
     *        config.extraPlugins = 'myplugin,anotherplugin';
     *
     * @cfg
     */
    config.filebrowserFlashUploadUrl = '/uploader/upload.php?type=Flash';

};
