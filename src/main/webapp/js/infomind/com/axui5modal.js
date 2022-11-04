var ax5modal;
if (window.parent && window.parent.ax5modal) {
    ax5modal = window.parent.ax5modal;
} else {
    ax5modal = (function () {
        var _d = {
            width: 600,
            height: 500
        };
        var modalStack = [];
        var mask = new ax5.ui.mask();
        return {
            open: function(config, callback) {

                if(typeof config.iframe.param === 'object') {
                    var convertJsonToFormData = function (_obj) {
                        var result = {};
                        var convertFormData = function(_data, _prefix) {
                            Object.entries(_data).map(function(p) {
                                if(typeof p[1] !== 'object') {
                                    var key = (_prefix?_prefix+'.'+p[0]:p[0]);
                                    key = key.replace(/.([\d]+)./, '[$1].')
                                    result[key] = p[1]
                                }else{
                                    convertFormData(p[1], (_prefix?_prefix+'.'+p[0]:p[0]))
                                }
                            })
                        };
                        convertFormData(_obj);
                        return result;
                    }
                    config.iframe.param = convertJsonToFormData(config.iframe.param);
                }

                var modal = new ax5.ui.modal();
                modalStack.push(modal);
                var _o = $.extend(_d, config);
                modal.open(_o);
                modal.f = callback || function() {};
                mask.open();
            },
            callback: function(d) {
                if (modalStack.length > 0) {
                    var modal = modalStack[modalStack.length-1];
                    modal.f(d);
                }
            },
            close: function() {
                if (modalStack.length > 0)
                    modalStack.pop().close();
                if (modalStack.length == 0)
                    mask.close();
            }
        }
    })();
}