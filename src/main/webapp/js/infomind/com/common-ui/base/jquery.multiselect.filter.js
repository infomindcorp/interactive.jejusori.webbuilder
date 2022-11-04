(function (a) {
    var b = /[\-\[\]{}()*+?.,\\^$|#\s]/g;
    a.widget("ech.multiselectfilter", {
        options: {label: "Filter:", width: null, placeholder: "Enter keywords"}, _create: function () {
            var e = this, f = this.options, d = (this.instance = a(this.element).data("multiselect")),
                c = (this.header = d.menu.find(".ui-multiselect-header").addClass("ui-multiselect-hasfilter")),
                g = (this.wrapper = a('<div class="ui-multiselect-filter">' + (f.label.length ? f.label : "") + '<input placeholder="' + f.placeholder + '" type="search"' + (/\d/.test(f.width) ? 'style="width:' + f.width + 'px"' : "") + " /></div>").prependTo(this.header));
            this.inputs = d.menu.find('input[type="checkbox"], input[type="radio"]');
            this.input = g.find("input").bind({
                keydown: function (h) {
                    if (h.which === 13) {
                        h.preventDefault()
                    }
                }, keyup: a.proxy(e._handler, e), click: a.proxy(e._handler, e)
            });
            this.updateCache();
            d._toggleChecked = function (h, k) {
                var i = (k && k.length) ? k : this.labels.find("input"), l = this,
                    j = e.instance._isOpen ? ":disabled, :hidden" : ":disabled";
                i = i.not(j).each(this._toggleCheckbox("checked", h));
                this.update();
                var m = i.map(function () {
                    return this.value
                }).get();
                this.element.find("option").filter(function () {
                    if (!this.disabled && a.inArray(this.value, m) > -1) {
                        l._toggleCheckbox("selected", h).call(this)
                    }
                });
                if (i.length) {
                    this.element.trigger("change")
                }
            };
            a(document).bind("multiselectrefresh", function () {
                e.updateCache();
                e._handler()
            })
        }, _handler: function (c) {
            var f = a.trim(this.input[0].value.toLowerCase()), h = this.rows, i = this.inputs, d = this.cache;
            if (!f) {
                h.show()
            } else {
                h.hide();
                var g = new RegExp(f.replace(b, "\\$&"), "gi");
                this._trigger("filter", c, a.map(d, function (e, j) {
                    if (e.search(g) !== -1) {
                        h.eq(j).show();
                        return i.get(j)
                    }
                    return null
                }))
            }
            this.instance.menu.find(".ui-multiselect-optgroup-label").each(function () {
                var e = a(this);
                e[e.nextUntil(".ui-multiselect-optgroup-label").filter(":visible").length ? "show" : "hide"]()
            })
        }, updateCache: function () {
            this.rows = this.instance.menu.find(".ui-multiselect-checkboxes li:not(.ui-multiselect-optgroup-label)");
            this.cache = this.element.children().map(function () {
                var c = a(this);
                if (this.tagName.toLowerCase() === "optgroup") {
                    c = c.children()
                }
                if (c.val() == "") {
                    return
                }
                return c.map(function () {
                    return this.innerHTML.toLowerCase()
                }).get()
            }).get()
        }, widget: function () {
            return this.wrapper
        }, destroy: function () {
            a.Widget.prototype.destroy.call(this);
            this.input.val("").trigger("keyup");
            this.wrapper.remove()
        }
    })
})(jQuery);