(function (b, c) {
    var a = 0;
    b.widget("ech.multiselect", {
        options: {
            header: true,
            height: 175,
            minWidth: 150,
            maxWidth: 400,
            classes: "",
            checkAllText: "Check all",
            uncheckAllText: "Uncheck all",
            noneSelectedText: "Select options",
            selectedText: "# selected",
            selectedList: 0,
            show: "",
            hide: "",
            autoOpen: false,
            multiple: true,
            position: {}
        }, _create: function () {
            var k = this.element.hide(), e = this.options;
            this.speed = b.fx.speeds._default;
            this._isOpen = false;
            var i = (this.button = b('<button type="button"><span class="ui-icon ui-icon-triangle-2-n-s"></span></button>')).addClass("ui-multiselect ui-widget ui-state-default ui-corner-all").addClass(e.classes).attr({
                title: k.attr("title"),
                "aria-haspopup": true,
                tabIndex: k.attr("tabIndex")
            }).insertAfter(k).width(e.minWidth);
            var j = (this.buttonlabel = b("<span/>")).css("display", "inline-block").css("white-space", "nowrap").css("overflow", "hidden").html(e.noneSelectedText).appendTo(i).width(i.width() - 22);
            b(window).resize(function () {
                j.width(i.width() - 22)
            });
            var h = (this.menu = b("<div />")).addClass("ui-multiselect-menu ui-widget ui-widget-content ui-corner-all").addClass(e.classes).insertAfter(i),
                g = (this.header = b("<div />")).addClass("ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix").appendTo(h),
                d = (this.headerLinkContainer = b("<ul />")).addClass("ui-helper-reset").html(function () {
                    if (e.header === true) {
                        return '<li><a class="ui-multiselect-all" href="#"><span class="ui-icon ui-icon-check"></span><span>' + e.checkAllText + '</span></a></li><li><a class="ui-multiselect-none" href="#"><span class="ui-icon ui-icon-closethick"></span><span>' + e.uncheckAllText + "</span></a></li>"
                    } else {
                        if (typeof e.header === "string") {
                            return "<li>" + e.header + "</li>"
                        } else {
                            return ""
                        }
                    }
                }).append('<li class="ui-multiselect-close"><a href="#" class="ui-multiselect-close"><span class="ui-icon ui-icon-circle-close"></span></a></li>').appendTo(g),
                f = (this.checkboxContainer = b("<ul />")).addClass("ui-multiselect-checkboxes ui-helper-reset").appendTo(h).attr("sname", k.attr("name"));
            if (k.attr("require") == "true") {
            }
            this._bindEvents();
            this.refresh(true);
            if (!e.multiple) {
                h.addClass("ui-multiselect-single")
            }
        }, _init: function () {
            if (this.options.header === false) {
                this.header.hide()
            }
            if (!this.options.multiple) {
                this.headerLinkContainer.find(".ui-multiselect-all, .ui-multiselect-none").hide()
            }
            if (this.options.autoOpen) {
                this.open()
            }
            if (this.element.is(":disabled")) {
                this.disable()
            }
        }, refresh: function (e) {
            var i = this.element, h = this.options, k = this.menu, g = this.checkboxContainer, j = [], d = [],
                f = i.attr("id") || a++;
            this.element.find("option").each(function (n) {
                var o = b(this), s = this.parentNode, q = this.innerHTML, u = this.title, r = this.value,
                    m = this.id || "ui-multiselect-" + f + "-option-" + n, v = this.disabled, l = this.selected,
                    p = ["ui-corner-all"], t;
                if (h.multiple && o.val() == "") {
                    return
                }
                if (s.tagName.toLowerCase() === "optgroup") {
                    t = s.getAttribute("label");
                    if (b.inArray(t, j) === -1) {
                        if (h.groupLabel === false) {
                            d.push('<li class="ui-multiselect-optgroup-label"></li>')
                        } else {
                            d.push('<li class="ui-multiselect-optgroup-label"><a href="#">' + t + "</a></li>")
                        }
                        j.push(t)
                    }
                }
                if (v) {
                    p.push("ui-state-disabled")
                }
                if (h.multiple) {
                    if (o.val() == "" && n == 0) {
                        l = false
                    }
                } else {
                    if (!i.val() && n == 0) {
                        l = true;
                        i.find("option:eq(0)").attr("selected", "selected")
                    }
                }
                if (l && !h.multiple) {
                    p.push("ui-state-active")
                }
                d.push('<li class="' + (v ? "ui-multiselect-disabled" : "") + '">');
                d.push('<label for="' + m + '" title="' + u + '" class="' + p.join(" ") + '">');
                d.push('<input id="' + m + '" name="multiselect_' + f + '" type="' + (h.multiple ? "checkbox" : "radio") + '" value="' + r + '" title="' + q + '"');
                if (l) {
                    d.push(' checked="checked"');
                    d.push(' aria-selected="true"')
                }
                if (v) {
                    d.push(' disabled="disabled"');
                    d.push(' aria-disabled="true"')
                }
                d.push(" /><span>" + q + "</span></label></li>")
            });
            g.html(d.join(""));
            this.labels = k.find("label");
            this._setButtonWidth();
            this._setMenuWidth();
            this.button[0].defaultValue = this.update();
            if (!e) {
                this._trigger("refresh")
            }
        }, update: function () {
            var d = this.options, f = this.labels.find("input"), e = f.filter(":checked"), g = e.length, h;
            if (g === 0) {
                h = d.noneSelectedText
            } else {
                if (b.isFunction(d.selectedText)) {
                    h = d.selectedText.call(this, g, f.length, e.get())
                } else {
                    if (/\d/.test(d.selectedList) && d.selectedList > 0 && g <= d.selectedList) {
                        h = e.map(function () {
                            return this.title
                        }).get().join(", ")
                    } else {
                        h = d.selectedText.replace("#", g).replace("#", f.length)
                    }
                }
            }
            this.buttonlabel.html(h);
            return h
        }, _bindEvents: function () {
            var d = this, e = this.button;

            function f() {
                d[d._isOpen ? "close" : "open"]();
                return false
            }

            e.find("span").bind("click.multiselect", f);
            e.bind({
                click: f, keypress: function (g) {
                    switch (g.which) {
                        case 27:
                        case 38:
                        case 37:
                            d.close();
                            break;
                        case 39:
                        case 40:
                            d.open();
                            break
                    }
                }, mouseenter: function () {
                    if (!e.hasClass("ui-state-disabled")) {
                        b(this).addClass("ui-state-hover")
                    }
                }, mouseleave: function () {
                    b(this).removeClass("ui-state-hover")
                }, focus: function () {
                    if (!e.hasClass("ui-state-disabled")) {
                        b(this).addClass("ui-state-focus")
                    }
                }, blur: function () {
                    b(this).removeClass("ui-state-focus")
                }
            });
            this.header.delegate("a", "click.multiselect", function (g) {
                if (b(this).hasClass("ui-multiselect-close")) {
                    d.close()
                } else {
                    d[b(this).hasClass("ui-multiselect-all") ? "checkAll" : "uncheckAll"]()
                }
                g.preventDefault()
            });
            this.menu.delegate("li.ui-multiselect-optgroup-label a", "click.multiselect", function (g) {
                g.preventDefault();
                var k = b(this),
                    j = k.parent().nextUntil("li.ui-multiselect-optgroup-label").find("input:visible:not(:disabled)"),
                    h = j.get(), i = k.parent().text();
                if (d._trigger("beforeoptgrouptoggle", g, {inputs: h, label: i}) === false) {
                    return
                }
                d._toggleChecked(j.filter(":checked").length !== j.length, j);
                d._trigger("optgrouptoggle", g, {inputs: h, label: i, checked: h[0].checked});
                if (!d.options.multiple) {
                    d.labels.removeClass("ui-state-active");
                    j.closest("label").filter(":last").toggleClass("ui-state-active", true);
                    d.close()
                }
            }).delegate("label", "mouseenter.multiselect", function () {
                if (!b(this).hasClass("ui-state-disabled")) {
                    d.labels.removeClass("ui-state-hover");
                    b(this).addClass("ui-state-hover").find("input").focus()
                }
            }).delegate("label", "keydown.multiselect", function (g) {
                g.preventDefault();
                switch (g.which) {
                    case 9:
                    case 27:
                        d.close();
                        break;
                    case 38:
                    case 40:
                    case 37:
                    case 39:
                        d._traverse(g.which, this);
                        break;
                    case 13:
                        b(this).find("input")[0].click();
                        break
                }
            }).delegate('input[type="checkbox"], input[type="radio"]', "click.multiselect", function (k) {
                var j = b(this), m = this.value, h = this.checked, g = d.element.find("option");
                var i = d.options.maxCheck;
                if (d.getChecked().length > i) {
                    var l = d.options.maxCheckText.replace("#", i);
                    alert(l);
                    return false
                }
                if (this.disabled || d._trigger("click", k, {value: m, text: this.title, checked: h}) === false) {
                    k.preventDefault();
                    return
                }
                j.attr("aria-selected", h);
                g.each(function () {
                    if (this.value === m) {
                        this.selected = h;
                        if (h) {
                            this.setAttribute("selected", "selected")
                        } else {
                            b(this).removeAttr("selected")
                        }
                    } else {
                        if (!d.options.multiple) {
                            b(this).removeAttr("selected")
                        }
                    }
                });
                if (!d.options.multiple) {
                    d.labels.removeClass("ui-state-active");
                    j.closest("label").toggleClass("ui-state-active", h);
                    d.close()
                }
                d.element.trigger("change");
                setTimeout(b.proxy(d.update, d), 10)
            });
            b(document).bind("mousedown.multiselect", function (g) {
                if (d._isOpen && !b.contains(d.menu[0], g.target) && !b.contains(d.button[0], g.target) && g.target !== d.button[0]) {
                    d.close()
                }
            });
            b(this.element[0].form).bind("reset.multiselect", function () {
                setTimeout(function () {
                    d.update()
                }, 10)
            })
        }, _setButtonWidth: function () {
            var d = this.element.outerWidth(), e = this.options;
            if (/\d/.test(e.minWidth) && d < e.minWidth) {
                d = e.minWidth
            }
            d = e.minWidth;
            this.button.width(d)
        }, _setMenuWidth: function () {
            var d = this.menu,
                e = this.button.outerWidth() - parseInt(d.css("padding-left"), 10) - parseInt(d.css("padding-right"), 10) - parseInt(d.css("border-right-width"), 10) - parseInt(d.css("border-left-width"), 10);
            d.width(e || this.button.outerWidth())
        }, _traverse: function (h, d) {
            var f = b(d), e = h === 38 || h === 37,
                i = f.parent()[e ? "prevAll" : "nextAll"]("li:not(.ui-multiselect-disabled, .ui-multiselect-optgroup-label)")[e ? "last" : "first"]();
            if (!i.length) {
                var g = this.menu.find("ul:last");
                this.menu.find("label")[e ? "last" : "first"]().trigger("mouseover");
                g.scrollTop(e ? g.height() : 0)
            } else {
                i.find("label").trigger("mouseover")
            }
        }, _toggleCheckbox: function (e, d) {
            return function () {
                !this.disabled && (this[e] = d);
                if (d) {
                    this.setAttribute("aria-selected", true)
                } else {
                    this.removeAttribute("aria-selected")
                }
            }
        }, _toggleChecked: function (e, d) {
            var h = (d && d.length) ? d : this.labels.find("input"), g = this;
            h.each(this._toggleCheckbox("checked", e));
            this.update();
            var f = h.map(function () {
                return this.value
            }).get();
            this.element.find("option").each(function () {
                if (!this.disabled && b.inArray(this.value, f) > -1) {
                    g._toggleCheckbox("selected", e).call(this)
                }
            });
            if (h.length) {
                this.element.trigger("change")
            }
        }, _toggleDisabled: function (d) {
            this.button.attr({disabled: d, "aria-disabled": d})[d ? "addClass" : "removeClass"]("ui-state-disabled");
            this.menu.find("input").attr({
                disabled: d,
                "aria-disabled": d
            }).parent()[d ? "addClass" : "removeClass"]("ui-state-disabled");
            this.element.attr({disabled: d, "aria-disabled": d})
        }, open: function (n) {
            var f = this, l = this.button, e = this.menu, g = this.speed, k = this.options;
            if (this._trigger("beforeopen") === false || l.hasClass("ui-state-disabled") || this._isOpen) {
                return
            }
            var d = e.find("ul:last"), i = k.show, m = l.position();
            if (b.isArray(k.show)) {
                i = k.show[0];
                g = k.show[1] || f.speed
            }
            var q = l.width() - 2;
            var h = e.width("auto").width() + ((k.multiple) ? 45 : 30);
            e.width((q > h) ? q : ((h > k.maxWidth) ? k.maxWidth : h));
            if (b.ui.position && !b.isEmptyObject(k.position)) {
                k.position.of = k.position.of || l;
                e.show().position(k.position).hide().show(i, g)
            } else {
                var p = m.top + l.outerHeight();
                if (k.showUp === true) {
                    p = m.top - (e.height() + 8)
                }
                var j = e.find("ul[sname]").css("max-height");
                e.css({top: p, left: m.left}).show(i, g);
                if (k.showUp === true && j == "none") {
                    setTimeout(function () {
                        p = m.top - (e.height() + 8);
                        e.css({top: p})
                    }, 0)
                }
            }
            d.scrollTop(0).css({"max-height": k.height + "px"});
            this.labels.eq(0).trigger("mouseover").trigger("mouseenter").find("input").trigger("focus");
            l.addClass("ui-state-active");
            this._isOpen = true;
            this._trigger("open")
        }, close: function () {
            if (this._trigger("beforeclose") === false) {
                return
            }
            var f = this.options, d = f.hide, e = this.speed;
            if (b.isArray(f.hide)) {
                d = f.hide[0];
                e = f.hide[1] || this.speed
            }
            this.menu.hide(d, e);
            this.button.removeClass("ui-state-active").trigger("blur").trigger("mouseleave");
            this._isOpen = false;
            this._trigger("close")
        }, enable: function () {
            this._toggleDisabled(false)
        }, disable: function () {
            this._toggleDisabled(true)
        }, checkAll: function (d) {
            this._toggleChecked(true);
            this._trigger("checkAll")
        }, uncheckAll: function () {
            this._toggleChecked(false);
            this._trigger("uncheckAll")
        }, getChecked: function () {
            return this.menu.find("input").filter(":checked")
        }, destroy: function () {
            b.Widget.prototype.destroy.call(this);
            this.button.remove();
            this.menu.remove();
            this.element.show();
            return this
        }, isOpen: function () {
            return this._isOpen
        }, widget: function () {
            return this.menu
        }, _setOption: function (d, e) {
            var f = this.menu;
            switch (d) {
                case"header":
                    f.find("div.ui-multiselect-header")[e ? "show" : "hide"]();
                    break;
                case"checkAllText":
                    f.find("a.ui-multiselect-all span").eq(-1).text(e);
                    break;
                case"uncheckAllText":
                    f.find("a.ui-multiselect-none span").eq(-1).text(e);
                    break;
                case"height":
                    f.find("ul:last").height(parseInt(e, 10));
                    break;
                case"minWidth":
                    this.options[d] = parseInt(e, 10);
                    this._setButtonWidth();
                    this._setMenuWidth();
                    break;
                case"selectedText":
                case"selectedList":
                case"noneSelectedText":
                    this.options[d] = e;
                    this.update();
                    break;
                case"classes":
                    f.add(this.button).removeClass(this.options.classes).addClass(e);
                    break
            }
            b.Widget.prototype._setOption.apply(this, arguments)
        }
    })
})(jQuery);