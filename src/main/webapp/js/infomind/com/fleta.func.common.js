$(document).ready(function(){});function convertJSON(b){var a=undefined;try{a=$.parseJSON(b)}catch(c){}return a}function getJsonData(b){if(b!=undefined&&b!="null"&&b!=""){var a;if(typeof b=="string"){a=$.parseJSON(b)}else{a=b}if(a.length!=0){return a}}return null}function showServerMessage(e,a){try{if($.isFunction(cfn_ajaxResponseCheck)){cfn_ajaxResponseCheck(e,a.showMessage);return}}catch(d){}var c=null;var b=null;var f=null;if(e.readyState==0){}else{if(e.readyState==1){}else{if(e.readyState==2){}else{if(e.readyState==3){}else{if(e.readyState==4){c=e.status;if(c==200){b=getServerMessage(e.responseText)}else{if(c==403){b=e.responseText;f=$.uimsg.error.http403}else{if(c==404){b=e.responseText;f=$.uimsg.error.http404}else{if(c==500){b=e.responseText;f=$.uimsg.error.http500}}}}}}}}}var g="";if(f!=null){g={status:c,serviceMessage:f,causeMessage:encodeURIComponent(b)}}else{if(b!=null){if(typeof b=="object"){if($.isArray(b)){g=b.join("\n")}else{g=b}}else{g=b}if(g){if(!$.isArray(g)&&g.status=="fatal"){}else{if(a.showMessage){alert(g)}}}}}return g}function getServerMessage(c){var a=getJsonData(c);if(a!=null){var b=new Array();if($.isArray(a)){$.each(a,function(d){if(this.serviceMessage){b.push(this.serviceMessage)}})}else{if(a.page==undefined&&a.rows==undefined){if(a.status=="fatal"){return a}else{if(a.serviceMessage){b.push(a.serviceMessage)}}}}if(b.length>0){return b}}return null}function isValidMessage(b){var a=true;if(b){if(b.indexOf("error")!=-1){a=false}else{if(b.substring(4,5)=="E"){a=false}}}return a}function sleep(a){var b=new Date();b.setTime(b.getTime()+a);while(new Date().getTime()<b.getTime()){}}var createMessage=function(b){var a=$.makeArray(arguments).slice(1);if(b===undefined){b=""}return b.replace(/\{(\d+)\}/g,function(c,d){return a[d]})};function supportsCanvasToDataURL(){if(!(!!document.createElement("canvas").getContext)){return false}return(document.createElement("canvas").toDataURL("image/png").indexOf("data:image/png")==0)}var POPUP_WIN=null;var POPUP_DATA_KEY="popup";function popupWindow(a){if(a.timeout){setTimeout(function(){return popupWindowOpen(a)},a.timeout)}else{return popupWindowOpen(a)}}function popupWindowOpen(k){if(!k){return null}var h;var m=k.modal?k.modal:false;var f=k.width?k.width:800;var g=k.height?k.height:600;var r=(k.scroll==false)?"no":"yes";var d=(k.resize==false)?"no":"yes";var b=(k.location==false)?"no":"yes";var s=k.reload?k.reload:false;var l=k.windowNm?k.windowNm:"_popup";var e=k.method?k.method:"get";var o=k.url;var p=$.extend({windowNm:l},k.param);var i={};if(p){if(typeof(p)=="string"){i=getMasterParams(p)}else{i=p}var a="";for(nm in i){var c=i[nm];c=encodeURIComponent(c);if(i.hasOwnProperty(nm)){if(c){a+=(a)?"&":"";a+=(nm+"="+c)}}}if(o&&a&&e=="get"){if(o.indexOf("?")!=-1){o=o+"&"+a}else{o=o+"?"+a}}}var n=$.extend({},$(document.body).data(POPUP_DATA_KEY));n[l]=k.callback;$(document.body).data(POPUP_DATA_KEY,n);if(m===true&&window.showModalDialog){h="dialogWidth:"+f+"px;dialogHeight:"+g+"px;scroll:"+r+";resizable:"+d+";location:"+b+";help:no;center:yes;status:no;edge:raised;unadorned:no;";POPUP_WIN=window.showModalDialog(o,window,h);if($.isFunction(k.callback)){k.callback(POPUP_WIN.param)}}else{var j=window.center({width:k.width,height:k.height});if(POPUP_WIN!=null&&s!=true){try{if(POPUP_WIN.name==l){POPUP_WIN.focus();return POPUP_WIN}}catch(q){POPUP_WIN=null}}h="left="+j.x+",top="+j.y+",height="+g+",width="+f+",scrollbars="+r+",resizable="+d+",location=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,linemenubar=no,modal=yes,dependent=yes";if(e=="post"){POPUP_WIN=window.open("",l,h,false);submitDynamicForm("_popupWindowOpenForm",o,"post",i,l)}else{POPUP_WIN=window.open(o,l,h,false)}if(POPUP_WIN==null){if($.uimsg.warning.noPopWin){alert($.uimsg.warning.noPopWin)}}else{POPUP_WIN.focus()}}return POPUP_WIN}function popupWindowClose(a){window.close()}function popupCallback(a){if(typeof(a)!="object"){return}if(window.dialogArguments){window.returnValue=a}else{a.windowNm=window.name;opener.popupCallbackOpener(a);opener.focus()}if(a.close!==false){window.close()}}function popupCallbackOpener(b){var a=$(document.body).data(POPUP_DATA_KEY);if(b.windowNm){var c=a[b.windowNm];if($.isFunction(c)){c(b.param)}}}function popupLayer(a){var c=$.extend({modal:true,draggable:true,resizable:false,position:["center",100],width:a.width||"auto",height:a.height||"auto",minWidth:150,minHeight:150,create:function(f,g){},open:function(f,g){},beforeClose:function(f,g){},close:function(f,g){},focus:function(f,g){},dragStart:function(f,g){},drag:function(f,g){},dragStop:function(f,g){},resizeStart:function(f,g){},resize:function(f,g){},resizeStop:function(f,g){}},a);var d=$("div.ui-dialog-content[id="+a.id+"]");if(d.attr("id")&&a.remove!=false){$("div[id="+d.attr("id")+"]").dialog("moveToTop");return}c.open=function(f,g){if($.isFunction(a.open)){a.open.call(this,f,g)}};c.close=function(g,h){if(a.remove!==false){var f=$("div.ui-dialog-content[id^="+this.id+"_]").closest("div[role=dialog] *");f.remove();$("div[id="+a.id+"]").remove()}if($.isFunction(a.close)){a.close.call(this,g,h)}};if(c.id===undefined){alert("id is null!");return}else{c.id=c.id.replace(/#/gi,"");c.param=$.extend({wid:c.id},c.param)}var b=true;var e=$("div[id="+c.id+"]");if(e.length==0){if(c.url){$.ajax({async:false,type:"POST",url:c.url,data:c.param,dataType:"html",success:function(i,f){try{var h=convertJSON(i);if(h!=undefined){b=false}else{e=createDynamicDiv(c);e.html(i)}}catch(g){}},complete:function(h,f){if(f=="success"){}try{cfn_ajaxResponseCheck(h)}catch(g){}}})}else{e=createDynamicDiv(c)}}if(e.length>0&&b==true){e.dialog(c)}return e}function popupLayerClose(b){var c=$.extend({},b);var a=c.id.replace(/#/gi,"");if(c.remove!==false){$("#"+a).dialog(c).dialog("close").remove()}else{$("#"+a).dialog(c).dialog("close")}}function createDynamicDiv(b){var a=$(document.createElement("div"));a.attr("id",b.id).hide();$("body").append(a);return a}function dialogMessage(b){if(!b.width){b.width=500}if(!b.height){b.height=500}var a=window.center({width:b.width,height:b.height});$.jgrid.info_dialog("메세지",b.msg,"닫기",{left:a.x,top:a.y,jqModal:true,modal:true})}function ajaxCheckOptions(a){var b=$.extend(true,{async:true,showMessage:true,confirmMessage:true},a||{});if($.isFunction(b.callback)){if(!b.async){b.async=false}}return b}function ajaxCheckOptions2(b){var a=$.extend(true,{},$.ajaxOptions||{});a=$.extend(true,a,b||{});var c=$.extend(true,{requestDataType:"form",async:true,url:undefined,param:{},searchMaster:{id:undefined,toMasterId:undefined},searchDetail:{id:undefined,rowId:undefined,subId:undefined,selected:true,reload:false,toDetailId:undefined,toSubDetailId:undefined},master:{id:undefined,ids:[]},detail:{id:undefined,ids:[],stateFlag:[],checked:false,reload:false},paramExecute:true,arrValJoin:false,showMessage:true,warningMessage:true,confirmMessage:false,block:true},a);a=null;if($.isFunction(c.callback)){if(!c.async){c.async=false}}return c}function ajaxLoadSelect(a){if(a.constructor!=Object||$.isEmptyObject(a)){alert("ERROR : Invalid Parameter(Object)")}var f=false;$.each(a.params,function(){if(this.name=="p1"){if(this.value==""){f=true;return false}}});var b;if(a.selectcomId){b=$("#"+a.selectcomId+" select[name="+a.selectboxNm+"]")}else{b=$("select[name="+a.selectboxNm+"]")}var e=b.attr("val");if(!a.firstOption){var d=(b.attr("multi")=="true")?true:false;var c=(b.attr("group")=="true")?true:false;if(d||c){a.firstOption={code:"",codeNm:""}}}if(f){b.loadSelect([],a.firstOption,e);b.change();return}a=ajaxCheckOptions(a);$.ajax({url:a.url,type:"post",dataType:"json",data:a.params,async:a.async,success:function(h,g,i){b.loadSelect(h,a.firstOption,e);b.change()},complete:function(h,i){var j=null;try{j=getJsonData(h.responseText)}catch(g){}if($.isFunction(a.callback)){a.callback(i,j)}}})}function submitDynamicForm(d,a,e,c,b){var g=$("form[id="+d+"]");if(g.length==0){if(b==undefined){b=null}g=$(document.createElement("form")).attr("id",d).attr("name",d).attr("action",a).attr("method",e).attr("target",b).hide();$("body").append(g)}else{g.attr("action",a).attr("method",e)}g.empty();if($.isArray(c)){$.each(c,function(){$("<input>").attr({type:"hidden",name:this.name,value:this.value}).appendTo(g)})}else{if(!$.isEmptyObject(c)&&c.constructor==Object){for(var f in c){$("<input>").attr({type:"hidden",name:f,value:c[f]}).appendTo(g)}}}g.submit()}function downloadExcel(d,c){var b=getMasterParams(d);if(c!=undefined){for(var a in c){b.push({name:a,value:c[a]})}}submitDynamicForm("_downloadExcelForm",contextPath+"/common/workbookExcelDownload.do","post",b)}function downloadGridExcel(a,e){var c=a.replace(/#/gi,"");var d=$("#"+c).getGridParam("searchParams");var b=new Array();if(d!=undefined){$.each(d,function(){b.push({name:this.name,value:this.value})})}if(e!=undefined){$.each(e,function(f,g){b.push({name:f,value:g})})}submitDynamicForm("_downloadExcelForm",contextPath+"/common/workbookExcelDownload.do","post",b)}function getFileSizeUnit(g){var d=parseInt(g);var f="bytes";var b=[[1024*1024*1024,"GB"],[1024*1024,"MB"],[1024,"KB"],[1,"bytes"]];for(var c=0;c<b.length;c++){var a=b[c][0];var e=b[c][1];if(d>=a){d=d/a;d=Math.ceil(d*10)/10;f=e;break}}return d+""+f}function _validDate(a){var c;if(a===undefined||$.isArray(a)==false||a.length<3){return c}if(a[0]>9999||a[0]<0){c=$.uimsg.valid.date002}else{if(a[1]>12||a[1]<1){c=$.uimsg.valid.date003}else{if(a[1]!=2){if(a[1]==4||a[1]==6||a[1]==9||a[1]==11){if(a[2]>30||a[2]<1){c=createMessage($.uimsg.valid.date004,a[0],a[1],"30")}}else{if(a[1]==1||a[1]==3||a[1]==5||a[1]==7||a[1]==8||a[1]==10||a[1]==12){if(a[2]>31||a[2]<1){c=createMessage($.uimsg.valid.date004,a[0],a[1],"31")}}}}else{var b;if((a[0]%400==0)||((a[0]%4==0)&&(a[0]%100!=0))){b=29}else{b=28}if(a[2]>b){c=createMessage($.uimsg.valid.date004,a[0],a[1],b)}}}}return c}function validDate(b){var c;var a=b.split(DATE_SEP);if(a[0]==null||a[1]==null||a[2]==null){c=$.uimsg.valid.date001}else{c=_validDate(a)}return c}function validDateHm(c){var d;var b=c.split(" ");if(b.length<2){b.push("")}var e=b[0].split(DATE_SEP);var a=b[1].split(TIME_SEP);if(e[0]==null||e[1]==null||e[2]==null||a[0]==null||a[1]==null){d=$.uimsg.valid.date005}else{d=_validDate(e);if(a[0]>23||a[0]<0||a[1]>59||a[1]<0){d=d==undefined?$.uimsg.valid.date006:$.uimsg.valid.date005}}return d}function validDateHms(d){var c;var b=d.split(" ");if(b.length<2){b.push("")}var e=b[0].split(DATE_SEP);var a=b[1].split(TIME_SEP);if(e[0]==null||e[1]==null||e[2]==null||a[0]==null||a[1]==null||a[2]==null){c=$.uimsg.valid.date007}else{c=_validDate(e);if(a[0]>23||a[0]<0||a[1]>59||a[1]<0||a[2]>59||a[2]<0){c=c==undefined?$.uimsg.valid.date008:$.uimsg.valid.date007}}return c}function debugProperties(a){var b="";if($.isArray(a)){b="Array:";var d=0;$.each(a,function(e){if(e>0){b+=","}b+=debugObject(a[e]);++e})}else{if(typeof(a)==="object"){b="Object:";var d=0;for(var c in a){if(a.hasOwnProperty(c)){if(d>0){b+=","}b+="name:"+c+", value:"+a[c];++d}}}}if(b!=""){alert(b)}}function debugObject(a){var b="";if(typeof(a)==="object"){var d=0;for(var c in a){if(a.hasOwnProperty(c)){if(d>0){b+=","}b+=c+"="+a[c];++d}}}else{b=a}return b}function callAjax(e,c,a,b){var f=new Array();if(c!=undefined){f=getMasterParams(c)}if(a!=undefined){for(var d in a){f.push({name:d,value:a[d]})}}$.ajax({url:e,type:"post",dataType:"json",data:f,async:true,success:function(h,g,i){},error:function(i,g,h){},complete:function(h,g){showServerMessage(h);if($.isFunction(b)){b(h.responseText,g)}}})};