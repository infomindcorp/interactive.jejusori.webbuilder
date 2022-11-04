'use strict';
(function($) {
    var contextPath = "";
    var pivot = (function() {

        var SortedSet = (function () {

            function find(val, array, comparator) {
                var l = 0;
                var r = array.length - 1;
                var i;
                var compare;
                while (l <= r) {
                    i = ((l + r) / 2) | 0;
                    compare = comparator(array[i], val);
                    if (compare < 0) {
                        l = i + 1;
                        continue;
                    }
                    if (compare > 0) {
                        r = i - 1;
                        continue;
                    }
                    return i;
                }
                return null;
            }

            var concat = (function(){
                var a = [];
                var c = a.concat;
                function concat(){
                    return c.apply(a, arguments);
                }
                return concat;
            }());


            function insert(value, comparator, values) {
                var r = values.length - 1;
                if (r === -1) {
                    return [value];
                }
                var l = 0;
                var i, compare;
                while (l <= r) {
                    i = ((l + r) / 2) | 0;
                    compare = comparator(values[i], value);
                    if (compare < 0) {
                        //array[i] is less than our value
                        l = i + 1;

                    } else if (compare > 0) {
                        r = i - 1;
                    } else {
                        //already here
                        return values;
                    }
                }
                if (comparator(values[i], value) < 0) {
                    //insert after i
                    return concat(values.slice(0, i + 1), [value], values.slice(i + 1));
                } else {
                    //insert before i

                    return concat(values.slice(0, i), [value], values.slice(i));
                }
            }

            function SortedSet(comparator) {
                this.comparator = comparator;
                this.values = [];
            }

            SortedSet.prototype.insert = function(value) {
                this.values = insert(value, this.comparator, this.values);
            };

            SortedSet.prototype.indexOf = function(value) {
                return find(value, this.values, this.comparator);
            };

            SortedSet.prototype.size = function() {
                return this.values.length;
            };

            return SortedSet;
        }());

        var Utils = {
            copyProperties : function(source, dest) {
                for (var k in source) {
                    if (source.hasOwnProperty(k)) {
                        dest[k] = source[k];
                    }
                }
            },
            isArray : function(testObject) {
                return testObject && !(testObject.propertyIsEnumerable('length'))
                    && typeof testObject === 'object' && typeof testObject.length === 'number';
            },
            stringComparator : function(a, b) {
                return a.localeCompare(b);
            },
            numberComparator : function(a, b) {
                if (a > b) {
                    return 1;
                } else if (b > a) {
                    return -1;
                } else {
                    return 0;
                }
            },
            defaultComparator : function() {
                return 0;
            },
            makeComparator : function(fields, data, comparators) {
                var len = fields.length;
                var i;
                var c = [];
                for (i = 0; i < len; i++) {
                    var entry = data[0][fields[i]];
                    var entryType = typeof entry;
                    if (typeof comparators[fields[i]] === 'function'){
                        c[i] = comparators[fields[i]];
                    } else if (entryType === 'number') {
                        c[i] = this.numberComparator;
                    } else if (entryType === 'string') {
                        c[i] = this.stringComparator;
                    } else if (Utils.isArray(entry)) {
                        c[i] = this.defaultComparator;
                    } else {
                        c[i] = this.defaultComparator;
                    }
                }
                return function(a, b) {
                    var v = 0;
                    for (i = 0; i < len; i++) {
                        var field = fields[i];
                        v = c[i](a[field], b[field]);
                        if (v !== 0) {
                            return v;
                        }
                    }
                    return 0;
                }
            }
        };

        var pivot = (function() {

            var defaultOptions = {
                extractor : null,
                comparators : {}
            };

            function extractData(data, options) {
                var extractor = options.extractor;
                if (typeof extractor === 'function') {
                    var extracted = [];
                    var length = data.length;
                    for (var i = 0; i < length; i++) {
                        extracted = extracted.concat(extractor(data[i]));
                    }
                    return extracted;
                } else {
                    return data;
                }
            }

            function buildPivotResult(data, leftSet, topSet) {
                var len = data.length;
                var dat;
                var i;
                for (i = 0; i < len; i++) {
                    dat = data[i];
                    leftSet.insert(dat);
                    topSet.insert(dat);
                }

                var result = [];
                result.length = leftSet.size();

                for (i = 0; i < len; i++) {
                    dat = data[i];
                    var rowIndex = leftSet.indexOf(dat);
                    var colIndex = topSet.indexOf(dat);
                    var row = result[rowIndex];
                    if (row === undefined) {
                        row = [];
                        row.length = topSet.size();
                        result[rowIndex] = row;
                    }
                    var entry = row[colIndex];
                    if (entry === undefined) {
                        row[colIndex] = [dat];
                    } else {
                        entry.push(dat);
                    }
                }
                return result;
            }

            function makeHeaders(data, fieldNames){
                var result = [];
                var dataLength = data.length;
                var namesLength = fieldNames.length;
                var i,j;
                for (i=0; i<dataLength; i++){
                    var datum = data[i];
                    var entry = [];
                    for (j=0; j<namesLength; j++){
                        entry[j] = datum[fieldNames[j]];
                    }
                    result[i] = entry;
                }
                return result;
            }

            function pivotData(data, rowNames, columnNames, userOptions) {
                if (userOptions === undefined){
                    userOptions = {};
                }
                var options = {};
                Utils.copyProperties(defaultOptions, options);
                if (userOptions) {
                    Utils.copyProperties(userOptions, options);
                }

                var leftSet = new SortedSet(Utils.makeComparator(rowNames, data, options));
                var topSet = new SortedSet(Utils.makeComparator(columnNames, data, options));

                data = extractData(data, options);

                var result = buildPivotResult(data, leftSet, topSet);
                result.rowHeaders = makeHeaders(leftSet.values, rowNames);
                result.columnHeaders = makeHeaders(topSet.values, columnNames);
                return result;
            }

            return pivotData;
        }());

        return pivot;
    }());

    var uploader = function(targetSelector, attachFileInputSelector, _option) {

        var uploaderOption = $.extend(true, {
            url: contextPath + "cms/info/file/upload.do",
            atchFileId: $(attachFileInputSelector).val(),
            viewUrl: contextPath + "cms/info/file/ImageView.do",
            multiple:true,
            dragDrop:true,
            fileName:"uploadfile",
            maxFileCount:1,
            returnType:"json",
            showPreview:true,
            previewHeight: "100px",
            previewWidth: "100px",
            showDelete: true,
            showDownload:true,
            sequential:true,
            sequentialCount:1,
            onLoad:function(obj) {
                $.ajax({
                    cache: false,
                    url: contextPath + "cms/info/file/tempList.do",
                    dataType: "json",
                    data:{
                        atchFileId: $(attachFileInputSelector).val()
                    },
                    success: function(data) {
                        for(var i=0;i<data.length;i++) {
                            obj.createProgress(data[i]);
                        }
                    }
                });
            },
            onSubmit:function(files) {
            },
            onSuccess:function(files,data,xhr,pd) {
                $("#atchFileId").val(data.atchFileId);
            },
            afterUploadAll:function(obj) {
            },
            dynamicFormData: function() {
                var data ={
                    atchFileId:$(attachFileInputSelector).val(),
                    prixFixe:'PAGE_'
                }
                return data;
            },
            onError: function(files,status,errMsg,pd) {
            },
            deleteCallback: function (data, pd) {
                $.ajax({
                    cache: false,
                    url: contextPath + "cms/info/file/delete.do",
                    dataType: "json",
                    data:{
                        atchFileId:data.atchFileId,
                        fileSn:data.fileSn
                    },
                    success: function(data) {
                        pd.statusbar.hide(); //You choice.
                    }
                });
            },
            downloadCallback:function(data,pd) {
                location.href= contextPath + "cms/info/file/fileDown.do?atchFileId="+data.atchFileId+"&fileSn="+data.fileSn;
            }
        }, _option);
        $(targetSelector).uploadFile(uploaderOption);
    }

    var treeBuilder = function () {
        /* http://www.treejs.cn/v3/api.php 를 참고하세요. */

        var defaultTreeSetting = {};

        var treeClass = function treeClass(_target, _setting, _zNodes) {
            this.targetId = "";
            this.$target = null;
            this.setting = {};
            this.zNodes = [];
            var callbackFlag = true;

            this.setData = function (_zNodes) {
                if (typeof _zNodes !== "undefined") this.zNodes = ax5.util.deepCopy(_zNodes);
                $.fn.zTree.init(this.$target, this.setting, this.zNodes);
            };
            this.getData = function () {
                return this.zTree.getNodes();
            };
            this.selectNode = function (_treeNode) {
                this.zTree.selectNode(_treeNode);
            };
            this.cancelSelectedNode = function () {
                this.zTree.cancelSelectedNode();
            };
            this.getSelectedNodes = function () {
                return this.zTree.getSelectedNodes();
            };
            this.editName = function () {
                var nodes = this.zTree.getSelectedNodes();
                if (nodes.length == 0) {
                    alert("Please select one node at first...");
                    return;
                }
                this.zTree.editName(nodes[0]);
            };
            this.removeNode = function (treeNode) {
                var nodes = this.zTree.getSelectedNodes();
                if (nodes.length == 0) {
                    alert("Please select one node at first...");
                    return;
                }
                zTree.removeNode(nodes[0], callbackFlag);
            };
            this.addNode = function () {};
            this.convertList2Tree = function (_list, _config) {
                _list = JSON.parse(JSON.stringify(_list));

                var childKey = _config.childKey;
                var parentKey = _config.parentKey;
                var childrenKey = _config.childrenKey || "children";
                var labelKey = _config.labelKey;
                var seq = 0;
                var hashDigit = 3;
                var tree = [];
                var pointer = {};
                for (var i = 0, l = _list.length; i < l; i++) {
                    pointer[_list[i][childKey]] = i;
                    if (_list[i][parentKey] === 'root') {
                        var item = _list[i];
                        item.pHash = ax5.util.setDigit("0", hashDigit);
                        item.hash = ax5.util.setDigit("0", hashDigit) + "_" + ax5.util.setDigit(seq, hashDigit);

                        var pushItem = {
                            id: item[childKey],
                            name: item[labelKey],
                            label: item[labelKey],
                            pHash: ax5.util.setDigit("0", hashDigit),
                            hash: ax5.util.setDigit("0", hashDigit) + "_" + ax5.util.setDigit(seq, hashDigit),
                            data: $.extend({}, item),
                            __subTreeLength: 0
                        };
                        pushItem[childrenKey] = [];

                        tree.push(pushItem);
                        seq++;
                    }
                }
                for (var i = 0, l = _list.length; i < l; i++) {
                    if (_list[i][parentKey] != 'root') {
                        var item = _list[i];

                        var pItem = _list[pointer[item[parentKey]]];
                        var pHash = pItem["hash"];
                        var pHashs = pHash.split(/_/g);
                        var pTree = tree;
                        var pTreeItem = {};
                        var __subTreeLength = typeof pItem.__subTreeLength !== "undefined" ? pItem.__subTreeLength : 0;

                        pHashs.forEach(function (T, idx) {
                            if (idx > 0) {
                                pTreeItem = pTree[Number(T)];
                                pTree = pTree[Number(T)][childrenKey];
                            }
                        });

                        item[childrenKey] = [];
                        item["pHash"] = pHash;
                        item["hash"] = pHash + "_" + ax5.util.setDigit(__subTreeLength, hashDigit);

                        var pushItem = {
                            name: item[labelKey],
                            label: item[labelKey],
                            pHash: pHash,
                            hash: pHash + "_" + ax5.util.setDigit(__subTreeLength, hashDigit),
                            data: $.extend({}, item)
                        };
                        pushItem[childrenKey] = [];
                        pTree.push(pushItem);

                        if (typeof pItem.__subTreeLength === "undefined") pItem.__subTreeLength = 1;else pItem.__subTreeLength++;

                        pTreeItem.__subTreeLength = pItem.__subTreeLength;
                    }
                }
                return tree;
            };

            this.$target = _target;
            if (!this.$target.get(0).id) {
                this.$target.get(0).id = "axboot-tree-" + ax5.getGuid();
            }
            this.targetId = this.$target.get(0).id;
            this.setting = $.extend(true, {}, defaultTreeSetting, _setting);
            if (typeof _zNodes !== "undefined") this.zNodes = ax5.util.deepCopy(_zNodes);

            $.fn.zTree.init(this.$target, this.setting, this.zNodes);
            this.zTree = $.fn.zTree.getZTreeObj(this.targetId);
        };

        return function (_target, _setting, _zNodes) {
            return new treeClass(_target, _setting, _zNodes);
        };
    }();

    /**
     * Convert Json To FormData (Key, Value)
     * @param _data
     * @returns {{}}
     */
    var convertJsonToFormData = function(_data) {
        var result = {};
        var convertData = function (_data, _prefix) {
            if(typeof p[1] !== 'object') {
                var key = (_prefix?_prefix+'.'+p[0]:p[0]);
                key = key.replace(/.([\d]+)./, '[$1].')
                result[key] = p[1]
            }else{
                convertData(p[1], (_prefix?_prefix+'.'+p[0]:p[0]))
            }
        }
        return result;
    }

    /**
     * InfoCms Common Ajax
     * @param _url
     * @param _option
     * @returns {*|jQuery|boolean|undefined}
     */
    var ajax = function (_url, _option) {

        var ajaxOption = $.extend(true, {
            cache: false,
            method: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url : _url,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("AJAX", "true");
            },
            success: function(res) {},
            error:function(xhr, status, error) {},
        }, _option)

        return $.ajax(ajaxOption)
    }

    /**
     * Promise Class
     * @returns {icPromiseClass}
     */
    var promise = function () {

        var icPromiseClass = function () {
            this.busy = false;
            this.queue = [];

            this.then = function (fn) {
                this.queue.push(fn);
                this.exec();
                return this;
            };

            // 함수 실행자 (큐가 남아 있으면 실행합니다.)
            this.exec = function (data) {
                if (this.busy) return this; // 바쁘니까 다음에 다시 봅시다.
                var Q = this.queue.shift(),
                    self = this;

                if (Q) {
                    this.busy = true;

                    try {
                        // 큐에 함수를 실행 인자는 ok, err, data 로
                        Q(
                            function (a) {
                                self.busy = false;
                                self.exec(a);
                            },
                            function (e) {
                                self._catch(e);
                            },
                            data
                        );
                    }
                    catch (e) {
                        console.log(e)
                        this._catch(e);
                    }
                } else {
                    this.busy = false;
                }
            };

            // 에러가 발생되면.. 호출 하려고 둠.
            this.catch = function (fn) {
                this._catch = fn;
            };
        };
        return new icPromiseClass();
    }
    var isEmpty = function(value) {
        if (value === null) return true
        if (typeof value === 'undefined') return true
        if (typeof value === 'string' && value === '') return true
        if (Array.isArray(value) && value.length < 1) return true
        if (typeof value === 'object' && value.constructor.name === 'Object' && Object.keys(value).length < 1 && Object.getOwnPropertyNames(value) < 1) return true
        if (typeof value === 'object' && value.constructor.name === 'String' && Object.keys(value).length < 1) return true // new String()
        return false
    }
    var isNotEmpty = function(value) {
        return !isEmpty(value);
    }

    var setThumbnail = function (event, querySelector, _option) {
        var option = $.extend(true, {
            'width': '150px',
            'height': '200px'
        }, _option);
        var reader = new FileReader();
        reader.onload = function (event) {
            var el = document.querySelector(querySelector);
            el.setAttribute("src", event.target.result);
            el.style['width'] = option['width']
            el.style['height'] = option['height']
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    var numberComma = function (_number) {
        if (this.isNotEmpty(_number)) {

            var regexp = /\B(?=(\d{3})+(?!\d))/g;


            return _number.toString().replace(regexp, ",");
        }
    }

    var groupBy = function (data, key) {
        return data.reduce(function (carry, el) {
            var group = el[key];
            if (carry[group] === undefined) {
                carry[group] = []
            }
            carry[group].push(el)
            return carry
        }, {})
    }

    var mergeTable = function (target, index) {
        var loop = null;
        var start_idx = 0;  //최초 td테그의 인덱스를 담을 변수 입니다.
        var add_num = 1;    //마지막 td 테그의 인덱스를 담을 변수 입니다.
        $(target).find('tr').each(function (idx) {
            var target_text = $(this).find('td').eq(index).text();
            if (!loop) {  //최초 동작이면
                loop = target_text;
                start_idx = idx;
            } else if (target_text == loop) {  //같은 열이 발견된 것 이라면
                add_num++;
                //같은열이긴 한데 근데 마지막이면
                if (idx == $(target).find('tr').length - 1) {
                    $(target).find('tr').eq(start_idx).find('td').eq(index).attr("rowSpan", add_num).css('vertical-align', 'middle');
                    for (var i = start_idx + 1; i < start_idx + add_num; i++) {
                        $(target).find('tr').eq(i).find('td').eq(index).hide(); //hide로 변경
                    }
                }
            } else { //다른 텍스트가 발견된 것 이라면
                if (add_num != 1) {    //머지가 필요한 경우라면
                    $(target).find('tr').eq(start_idx).find('td').eq(index).attr("rowSpan", add_num).css('vertical-align', 'middle');
                    for (var i = start_idx + 1; i < start_idx + add_num; i++) {
                        $(target).find('tr').eq(i).find('td').eq(index).hide(); //hide로 변경
                    }
                }
                start_idx = idx;
                loop = target_text;
                add_num = 1;
            }
        });
    }

    var $ifx = {
        contextPath: contextPath,
        $: $,
        pivot: pivot,
        uploader: uploader,
        treeBuilder: treeBuilder,
        ajax: ajax,
        promise: promise,
        convertJsonToFormData: convertJsonToFormData,
        isEmpty: isEmpty,
        isNotEmpty: isNotEmpty,
        setThumbnail: setThumbnail,
        numberComma: numberComma,
        groupBy: groupBy,
        mergeTable: mergeTable
    }
    window.$ifx = $ifx;
})(jQuery);