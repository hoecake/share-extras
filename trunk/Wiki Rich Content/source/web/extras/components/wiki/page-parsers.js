/**
 * Copyright (C) 20010-2011 Share Extras contributors
 *
 * This file is part of the Share Extras project.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
* Extras root namespace.
* 
* @namespace Extras
*/
if (typeof Extras == "undefined" || !Extras)
{
   var Extras = {};
}

/**
 * Extras.WikiPageParsers
 * 
 * @namespace Alfresco
 * @class Extras.WikiPageParsers
 * @extends Alfresco.component.Base
 */
(function()
{
   /**
    * YUI Library aliases
    */
   var Dom = YAHOO.util.Dom;

   /**
    * Alfresco Slingshot aliases
    */
   var $html = Alfresco.util.encodeHTML;
    
   /**
    * WikiPageParsers constructor.
    * 
    * @param {String} htmlId The HTML id of the parent element
    * @return {Extras.WikiPageParsers} The new Wiki instance
    * @constructor
    */
   Extras.WikiPageParsers = function(htmlId)
   {
      Extras.WikiPageParsers.superclass.constructor.call(this, "Extras.WikiPageParsers", htmlId, ["button", "container", "connection", "editor", "tabview", "datatable", "datasource", "paginator", "uploader"]);
      // Optional parsers, to be fired via Bubbling
      if (typeof Extras.WikiTOCParser == "function")
      {
          new Extras.WikiTOCParser();
      }
      if (typeof Extras.WikiDocumentParser == "function")
      {
          new Extras.WikiDocumentParser();
      }
      if (typeof Extras.WikiPrettyprintParser == "function")
      {
          new Extras.WikiPrettyprintParser();
      }
      if (typeof Extras.WikiTableParser == "function")
      {
          new Extras.WikiTableParser();
      }
      if (typeof Extras.WikiVideoParser == "function")
      {
          new Extras.WikiVideoParser();
      }
      if (typeof Extras.WikiDocumentParser == "function")
      {
          new Extras.WikiDocumentParser();
      }
      
      YAHOO.Bubbling.on("userAccess", function() {
          this._parse();
      }, this);
      
      return this;
   };

   YAHOO.extend(Extras.WikiPageParsers, Alfresco.component.Base,
   {
      /**
       * Object container for initialization options
       *
       * @property options
       * @type object
       */
      options:
      {
         /**
          * Current siteId.
          *
          * @property siteId
          * @type string
          * @default ""
          */
         siteId: "",

         /**
          * The posts title.
          *
          * @property pageTitle
          * @type string
          * @default ""
          */
         pageTitle: "",

         /**
          * The display mode
          *
          * @property mode
          * @type string
          * @default "view"
          */
         mode: "view",

         /**
          * Tags for the wiki post.
          *
          * @property tags
          * @type array
          * @default []
          */
         tags: [],

         /**
          * Versions of this the post.
          *
          * @property versions
          * @type array
          * @default []
          */
         versions: [],

         /**
          * Permissions for the current user for the wiki post.
          *
          * @property permissions
          * @type array
          * @default []
          */
         permissions: {},

         /**
          * The current users locale
          *
          * @property locale
          * @type string
          * @default ""
          */
         locale: "",

         /**
          * Whether a table of contents should be inserted into the wiki page
          *
          * @property tocEnabled
          * @type boolean
          * @default true
          */
         tocEnabled: true,

         /**
          * Whether tables in the wiki page should be converted into YUI DataTables
          *
          * @property convertTables
          * @type boolean
          * @default true
          */
         convertTables: true
      },

      /**
       * Fired by YUI when parent element is available for scripting.
       * Initialises components, including YUI widgets.
       *
       * @method onReady
       */
      onReady: function WikiPageParsers_onReady()
      {
          /*
           * Do nothing. We cannot make changes to the DOM here because the built-in page
           * text parser in page.js re-populates the innerHTML, which wipes out any 
           * listeners we have added using Event.addListener()
           * 
           * Fortunately, page.js fires a Bubbling event immediately after it has finished
           * the parsing, so instead we take advantage of this.
           */
      },

      /**
       * Parse the wiki page content
       *
       * @method _parse
       */
      _parse: function WikiPageParsers__parse()
      {
         if (this.options.mode === "edit")
         {
            this._setupEditForm();
         }
         else if (this.options.mode === "details")
         {
            this._setupPageDetails();
         }
         
         // Content area
         var pageText = Dom.get(this.id + "-page");
         if (pageText)
         {
            // Fire event to inform any listening plugins that the content is ready
            YAHOO.Bubbling.fire("pageContentAvailable",
            {
               pageObj: this,
               textEl: pageText
            });
         }
      },
      
      /**
       * Configure the page for "details" mode
       *
       * @method _setupPageDetails
       * @private
       */
      _setupPageDetails: function WikiPageParsers__setupPageDetails()
      {
      },

      /**
       * Called via init if the page is in edit mode
       *
       * @method _setupEditForm
       */
      _setupEditForm: function WikiPageParsers__setupEditForm()
      {
      }

   });
})();