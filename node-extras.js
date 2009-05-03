YUI.add('node-extras', function(Y) {
    var L = Y.Lang,
        INNER = 'innerHTML';
    /**
     * This class adds a sugar layer to extend Node and NodeList.
     * @module node-extras
     */     
    /**
     * This class adds a sugar layer to extend Node and NodeList.
     * @class node-extras
     * @extends Node
     */

    Y.mix(Y.Node.prototype, {
        /**
        * Holder for hover events so they can be detached
        * @private
        * @property _overs
        */
        _overs: null,
        /**
        * Adds support for adding mouseover/mouseout on the given Node.
        * Pass nothing to remove the listeners.
        * @method hover
        * @param {Function} over The method to be called on mouseover
        * @param {Function} out The method to be called on mouseout
        */
        hover: function(over, out) {
            if (over && out) {
                this._overs = [
                    this.on('mouseover', Y.bind(over, this)),
                    this.on('mouseout', Y.bind(out, this))
                ];
            } else {
                if (this._overs) {
                    Y.each(this._overs, function(v) {
                        v.detach();
                    });
                    this._overs = null;
                }
            }
            return this;
        },
        /**
        * Appends a string of html to the Nodes innerHTML.
        * @method append
        * @param {String} str The string of HTML to append to the Node's innerHTML
        */
        append: function(str) {
            this.set(INNER, this.get(INNER) + str);
            return this;
        },
        /**
        * Prepends a string of html to the Nodes innerHTML.
        * @method prepend
        * @param {String} str The string of HTML to prepend to the Node's innerHTML
        */
        prepend: function(str) {
            this.set(INNER, str + this.get(INNER));
            return this;
        },
        /**
        * Replaces the innerHTML on the Node with the given string.
        * @method html
        * @param {String} html The string of HTML to use as the Node's innerHTML.
        */
        html: function(html) {
            if (L.isUndefined(html)) {
                return this.get(INNER);
            }
            return this.set(INNER, html);
        },
        /**
        * setStyle/getStyle sugar layer: .css('color', 'red'); //Sets color: red .css('color'); //Gets 'color'
        * @method css
        * @param {String} prop The property to get/set.
        * @param {String} value The value if setting.
        */
        css: function(prop, value) {
            if (L.isUndefined(value)) {
                return this.getStyle(prop, value);
            }
            return this.setStyle(prop, value);
        },
        /**
        * Remove the Node from it's parent, but still use it. Returns the removed Node, not it's parent.
        * @method remove
        */
        remove: function() {
            this.get('parentNode').removeChild(this);
            return this;
        },
        /**
        * Remove the Node's innerHTML.
        * @method empty
        */
        empty: function() {
            this.html('');
            return this;
        }
    }, true);

    Y.mix(Y.NodeList.prototype, {
        /**
        * NodeList: The last NodeList used (when using odd() or even() so you can get back after filtering.
        * @private
        * @property _last
        */
        _last: null,
        /**
        * NodeList: Return a NodeList of all the odd members. Use end() to get back to the original.
        * @method odd
        */
        odd: function() {
            var o = [];
            this.each(function(v, k) {
                if (!(k % 2)) {
                    o.push(v);
                }
            });
            var ret = new Y.NodeList({nodes: o });
            ret._last = this;
            return ret;
        },
        /**
        * NodeList: Return a NodeList of all the event members. Use end() to get back to the original.
        * @method even
        */
        even: function() {
            this._last = this;
            var o = [];
            this.each(function(v, k) {
                if (k % 2) {
                    o.push(v);
                }
            });
            var ret = new Y.NodeList({nodes: o });
            ret._last = this;
            return ret;
        },
        /**
        * NodeList: Return to the NodeList after filtering with odd() or even()
        * @method end
        */
        end: function() {
            return this._last || this;
        },
        /**
        * NodeList: Sugar layer to set the CSS on the NodeList. Passes through to setStyle
        * @method css
        * @param {String} prop The property to set.
        * @param {String} value The value to set.
        */
        css: function(prop, value) {
            return this.setStyle(prop, value);
        },
        /**
        * NodeList: Sets the HTML on all elements to the given string.
        * @method html
        * @param {String} html The HTML to use as the innerHTML
        */
        html: function(html) {
            this.each(function(v) {
                v.html(html);
            });
            return this;
        },
        /**
        * NodeList: Append the string to the innerHTML of all the Nodes
        * @method append
        * @param {String} html The HTML to append
        */
        append: function(html) {
            this.each(function(v) {
                v.append(html);
            });
            return this;
        },
        /**
        * NodeList: Prepend the string to the innerHTML of all the Nodes
        * @method prepend
        * @param {String} html The HTML to prepend 
        */
        prepend: function(html) {
            this.each(function(v) {
                v.prepend(html);
            });
            return this;
        },
        /**
        * NodeList: Remove all the nodes from their parentNodes
        * @method remove
        */
        remove: function() {
            this.each(function(v) {
                v.remove();
            });
            return this;
        },
        /**
        * NodeList: Remove all the content from all the Nodes
        * @method empty 
        */
        empty: function() {
            this.each(function(v) {
                v.empty();
            });
            return this;
        },
        /**
        * NodeList: Adds support for adding mouseover/mouseout on the given Node.
        * Pass nothing to remove the listeners.
        * @method hover
        * @param {Function} over The method to be called on mouseover
        * @param {Function} out The method to be called on mouseout
        */
        hover: function(over, out) {
            this.each(function(v) {
                v.hover(over, out);
            });
            return this;
        }
    }, true);
    
}, '1.0', { requires: ['node'], skinnable:false});
