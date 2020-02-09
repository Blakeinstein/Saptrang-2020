/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
!function(window,document,$,undefined){"use strict";var H=$("html"),W=$(window),D=$(document),F=$.fancybox=function(){F.open.apply(this,arguments)},IE=navigator.userAgent.match(/msie/i),didUpdate=null,isTouch=void 0!==document.createTouch,isQuery=function(obj){return obj&&obj.hasOwnProperty&&obj instanceof $},isString=function(str){return str&&"string"===$.type(str)},isPercentage=function(str){return isString(str)&&str.indexOf("%")>0},isScrollable=function(el){return el&&!(el.style.overflow&&"hidden"===el.style.overflow)&&(el.clientWidth&&el.scrollWidth>el.clientWidth||el.clientHeight&&el.scrollHeight>el.clientHeight)},getScalar=function(orig,dim){var value=parseInt(orig,10)||0;return dim&&isPercentage(orig)&&(value=F.getViewport()[dim]/100*value),Math.ceil(value)},getValue=function(value,dim){return getScalar(value,dim)+"px"};$.extend(F,{version:"2.1.5",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!isTouch,fitToView:!0,aspectRatio:!1,topRatio:.5,leftRatio:.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3e3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" vspace="0" hspace="0" allowFullScreen'+(IE?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:$.noop,beforeLoad:$.noop,afterLoad:$.noop,beforeShow:$.noop,afterShow:$.noop,beforeChange:$.noop,beforeClose:$.noop,afterClose:$.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(group,opts){if(group&&($.isPlainObject(opts)||(opts={}),!1!==F.close(!0)))return $.isArray(group)||(group=isQuery(group)?$(group).get():[group]),$.each(group,(function(i,element){var obj={},href,title,content,type,rez,hrefParts,selector;"object"===$.type(element)&&(element.nodeType&&(element=$(element)),isQuery(element)?(obj={href:element.data("fancybox-href")||element.attr("href"),title:element.data("fancybox-title")||element.attr("title"),isDom:!0,element:element},$.metadata&&$.extend(!0,obj,element.metadata())):obj=element),href=opts.href||obj.href||(isString(element)?element:null),title=void 0!==opts.title?opts.title:obj.title||"",!(type=(content=opts.content||obj.content)?"html":opts.type||obj.type)&&obj.isDom&&((type=element.data("fancybox-type"))||(type=(rez=element.prop("class").match(/fancybox\.(\w+)/))?rez[1]:null)),isString(href)&&(type||(F.isImage(href)?type="image":F.isSWF(href)?type="swf":"#"===href.charAt(0)?type="inline":isString(element)&&(type="html",content=element)),"ajax"===type&&(hrefParts=href.split(/\s+/,2),href=hrefParts.shift(),selector=hrefParts.shift())),content||("inline"===type?href?content=$(isString(href)?href.replace(/.*(?=#[^\s]+$)/,""):href):obj.isDom&&(content=element):"html"===type?content=href:type||href||!obj.isDom||(type="inline",content=element)),$.extend(obj,{href:href,type:type,content:content,title:title,selector:selector}),group[i]=obj})),F.opts=$.extend(!0,{},F.defaults,opts),void 0!==opts.keys&&(F.opts.keys=!!opts.keys&&$.extend({},F.defaults.keys,opts.keys)),F.group=group,F._start(F.opts.index)},cancel:function(){var coming=F.coming;coming&&!1!==F.trigger("onCancel")&&(F.hideLoading(),F.ajaxLoad&&F.ajaxLoad.abort(),F.ajaxLoad=null,F.imgPreload&&(F.imgPreload.onload=F.imgPreload.onerror=null),coming.wrap&&coming.wrap.stop(!0,!0).trigger("onReset").remove(),F.coming=null,F.current||F._afterZoomOut(coming))},close:function(event){F.cancel(),!1!==F.trigger("beforeClose")&&(F.unbindEvents(),F.isActive&&(F.isOpen&&!0!==event?(F.isOpen=F.isOpened=!1,F.isClosing=!0,$(".fancybox-item, .fancybox-nav").remove(),F.wrap.stop(!0,!0).removeClass("fancybox-opened"),F.transitions[F.current.closeMethod]()):($(".fancybox-wrap").stop(!0).trigger("onReset").remove(),F._afterZoomOut())))},play:function(action){var clear=function(){clearTimeout(F.player.timer)},set=function(){clear(),F.current&&F.player.isActive&&(F.player.timer=setTimeout(F.next,F.current.playSpeed))},stop=function(){clear(),D.unbind(".player"),F.player.isActive=!1,F.trigger("onPlayEnd")},start=function(){F.current&&(F.current.loop||F.current.index<F.group.length-1)&&(F.player.isActive=!0,D.bind({"onCancel.player beforeClose.player":stop,"onUpdate.player":set,"beforeLoad.player":clear}),set(),F.trigger("onPlayStart"))};!0===action||!F.player.isActive&&!1!==action?start():stop()},next:function(direction){var current=F.current;current&&(isString(direction)||(direction=current.direction.next),F.jumpto(current.index+1,direction,"next"))},prev:function(direction){var current=F.current;current&&(isString(direction)||(direction=current.direction.prev),F.jumpto(current.index-1,direction,"prev"))},jumpto:function(index,direction,router){var current=F.current;current&&(index=getScalar(index),F.direction=direction||current.direction[index>=current.index?"next":"prev"],F.router=router||"jumpto",current.loop&&(index<0&&(index=current.group.length+index%current.group.length),index%=current.group.length),void 0!==current.group[index]&&(F.cancel(),F._start(index)))},reposition:function(e,onlyAbsolute){var current=F.current,wrap=current?current.wrap:null,pos;wrap&&(pos=F._getPosition(onlyAbsolute),e&&"scroll"===e.type?(delete pos.position,wrap.stop(!0,!0).animate(pos,200)):(wrap.css(pos),current.pos=$.extend({},current.dim,pos)))},update:function(e){var type=e&&e.type,anyway=!type||"orientationchange"===type;anyway&&(clearTimeout(didUpdate),didUpdate=null),F.isOpen&&!didUpdate&&(didUpdate=setTimeout((function(){var current=F.current;current&&!F.isClosing&&(F.wrap.removeClass("fancybox-tmp"),(anyway||"load"===type||"resize"===type&&current.autoResize)&&F._setDimension(),"scroll"===type&&current.canShrink||F.reposition(e),F.trigger("onUpdate"),didUpdate=null)}),anyway&&!isTouch?0:300))},toggle:function(action){F.isOpen&&(F.current.fitToView="boolean"===$.type(action)?action:!F.current.fitToView,isTouch&&(F.wrap.removeAttr("style").addClass("fancybox-tmp"),F.trigger("onUpdate")),F.update())},hideLoading:function(){D.unbind(".loading"),$("#fancybox-loading").remove()},showLoading:function(){var el,viewport;F.hideLoading(),el=$('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo("body"),D.bind("keydown.loading",(function(e){27===(e.which||e.keyCode)&&(e.preventDefault(),F.cancel())})),F.defaults.fixed||(viewport=F.getViewport(),el.css({position:"absolute",top:.5*viewport.h+viewport.y,left:.5*viewport.w+viewport.x}))},getViewport:function(){var locked=F.current&&F.current.locked||!1,rez={x:W.scrollLeft(),y:W.scrollTop()};return locked?(rez.w=locked[0].clientWidth,rez.h=locked[0].clientHeight):(rez.w=isTouch&&window.innerWidth?window.innerWidth:W.width(),rez.h=isTouch&&window.innerHeight?window.innerHeight:W.height()),rez},unbindEvents:function(){F.wrap&&isQuery(F.wrap)&&F.wrap.unbind(".fb"),D.unbind(".fb"),W.unbind(".fb")},bindEvents:function(){var current=F.current,keys;current&&(W.bind("orientationchange.fb"+(isTouch?"":" resize.fb")+(current.autoCenter&&!current.locked?" scroll.fb":""),F.update),(keys=current.keys)&&D.bind("keydown.fb",(function(e){var code=e.which||e.keyCode,target=e.target||e.srcElement;if(27===code&&F.coming)return!1;e.ctrlKey||e.altKey||e.shiftKey||e.metaKey||target&&(target.type||$(target).is("[contenteditable]"))||$.each(keys,(function(i,val){return current.group.length>1&&void 0!==val[code]?(F[i](val[code]),e.preventDefault(),!1):$.inArray(code,val)>-1?(F[i](),e.preventDefault(),!1):void 0}))})),$.fn.mousewheel&&current.mouseWheel&&F.wrap.bind("mousewheel.fb",(function(e,delta,deltaX,deltaY){for(var target=e.target||null,parent=$(target),canScroll=!1;parent.length&&!(canScroll||parent.is(".fancybox-skin")||parent.is(".fancybox-wrap"));)canScroll=isScrollable(parent[0]),parent=$(parent).parent();0===delta||canScroll||F.group.length>1&&!current.canShrink&&(deltaY>0||deltaX>0?F.prev(deltaY>0?"down":"left"):(deltaY<0||deltaX<0)&&F.next(deltaY<0?"up":"right"),e.preventDefault())})))},trigger:function(event,o){var ret,obj=o||F.coming||F.current;if(obj){if($.isFunction(obj[event])&&(ret=obj[event].apply(obj,Array.prototype.slice.call(arguments,1))),!1===ret)return!1;obj.helpers&&$.each(obj.helpers,(function(helper,opts){opts&&F.helpers[helper]&&$.isFunction(F.helpers[helper][event])&&F.helpers[helper][event]($.extend(!0,{},F.helpers[helper].defaults,opts),obj)})),D.trigger(event)}},isImage:function(str){return isString(str)&&str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(str){return isString(str)&&str.match(/\.(swf)((\?|#).*)?$/i)},_start:function(index){var coming={},obj,href,type,margin,padding;if(index=getScalar(index),!(obj=F.group[index]||null))return!1;if(margin=(coming=$.extend(!0,{},F.opts,obj)).margin,padding=coming.padding,"number"===$.type(margin)&&(coming.margin=[margin,margin,margin,margin]),"number"===$.type(padding)&&(coming.padding=[padding,padding,padding,padding]),coming.modal&&$.extend(!0,coming,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}}),coming.autoSize&&(coming.autoWidth=coming.autoHeight=!0),"auto"===coming.width&&(coming.autoWidth=!0),"auto"===coming.height&&(coming.autoHeight=!0),coming.group=F.group,coming.index=index,F.coming=coming,!1!==F.trigger("beforeLoad")){if(type=coming.type,href=coming.href,!type)return F.coming=null,!(!F.current||!F.router||"jumpto"===F.router)&&(F.current.index=index,F[F.router](F.direction));if(F.isActive=!0,"image"!==type&&"swf"!==type||(coming.autoHeight=coming.autoWidth=!1,coming.scrolling="visible"),"image"===type&&(coming.aspectRatio=!0),"iframe"===type&&isTouch&&(coming.scrolling="scroll"),coming.wrap=$(coming.tpl.wrap).addClass("fancybox-"+(isTouch?"mobile":"desktop")+" fancybox-type-"+type+" fancybox-tmp "+coming.wrapCSS).appendTo(coming.parent||"body"),$.extend(coming,{skin:$(".fancybox-skin",coming.wrap),outer:$(".fancybox-outer",coming.wrap),inner:$(".fancybox-inner",coming.wrap)}),$.each(["Top","Right","Bottom","Left"],(function(i,v){coming.skin.css("padding"+v,getValue(coming.padding[i]))})),F.trigger("onReady"),"inline"===type||"html"===type){if(!coming.content||!coming.content.length)return F._error("content")}else if(!href)return F._error("href");"image"===type?F._loadImage():"ajax"===type?F._loadAjax():"iframe"===type?F._loadIframe():F._afterLoad()}else F.coming=null},_error:function(type){$.extend(F.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:type,content:F.coming.tpl.error}),F._afterLoad()},_loadImage:function(){var img=F.imgPreload=new Image;img.onload=function(){this.onload=this.onerror=null,F.coming.width=this.width/F.opts.pixelRatio,F.coming.height=this.height/F.opts.pixelRatio,F._afterLoad()},img.onerror=function(){this.onload=this.onerror=null,F._error("image")},img.src=F.coming.href,!0!==img.complete&&F.showLoading()},_loadAjax:function(){var coming=F.coming;F.showLoading(),F.ajaxLoad=$.ajax($.extend({},coming.ajax,{url:coming.href,error:function(jqXHR,textStatus){F.coming&&"abort"!==textStatus?F._error("ajax",jqXHR):F.hideLoading()},success:function(data,textStatus){"success"===textStatus&&(coming.content=data,F._afterLoad())}}))},_loadIframe:function(){var coming=F.coming,iframe=$(coming.tpl.iframe.replace(/\{rnd}/g,(new Date).getTime())).attr("scrolling",isTouch?"auto":coming.iframe.scrolling).attr("src",coming.href);$(coming.wrap).bind("onReset",(function(){try{$(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(e){}})),coming.iframe.preload&&(F.showLoading(),iframe.one("load",(function(){$(this).data("ready",1),isTouch||$(this).bind("load.fb",F.update),$(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(),F._afterLoad()}))),coming.content=iframe.appendTo(coming.inner),coming.iframe.preload||F._afterLoad()},_preloadImages:function(){var group=F.group,current=F.current,len=group.length,cnt=current.preload?Math.min(current.preload,len-1):0,item,i;for(i=1;i<=cnt;i+=1)"image"===(item=group[(current.index+i)%len]).type&&item.href&&((new Image).src=item.href)},_afterLoad:function(){var coming=F.coming,previous=F.current,placeholder="fancybox-placeholder",current,content,type,scrolling,href,embed;if(F.hideLoading(),coming&&!1!==F.isActive){if(!1===F.trigger("afterLoad",coming,previous))return coming.wrap.stop(!0).trigger("onReset").remove(),void(F.coming=null);switch(previous&&(F.trigger("beforeChange",previous),previous.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()),F.unbindEvents(),current=coming,content=coming.content,type=coming.type,scrolling=coming.scrolling,$.extend(F,{wrap:current.wrap,skin:current.skin,outer:current.outer,inner:current.inner,current:current,previous:previous}),href=current.href,type){case"inline":case"ajax":case"html":current.selector?content=$("<div>").html(content).find(current.selector):isQuery(content)&&(content.data(placeholder)||content.data(placeholder,$('<div class="'+placeholder+'"></div>').insertAfter(content).hide()),content=content.show().detach(),current.wrap.bind("onReset",(function(){$(this).find(content).length&&content.hide().replaceAll(content.data(placeholder)).data(placeholder,!1)})));break;case"image":content=current.tpl.image.replace("{href}",href);break;case"swf":content='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+href+'"></param>',embed="",$.each(current.swf,(function(name,val){content+='<param name="'+name+'" value="'+val+'"></param>',embed+=" "+name+'="'+val+'"'})),content+='<embed src="'+href+'" type="application/x-shockwave-flash" width="100%" height="100%"'+embed+"></embed></object>"}isQuery(content)&&content.parent().is(current.inner)||current.inner.append(content),F.trigger("beforeShow"),current.inner.css("overflow","yes"===scrolling?"scroll":"no"===scrolling?"hidden":scrolling),F._setDimension(),F.reposition(),F.isOpen=!1,F.coming=null,F.bindEvents(),F.isOpened?previous.prevMethod&&F.transitions[previous.prevMethod]():$(".fancybox-wrap").not(current.wrap).stop(!0).trigger("onReset").remove(),F.transitions[F.isOpened?current.nextMethod:current.openMethod](),F._preloadImages()}},_setDimension:function(){var viewport=F.getViewport(),steps=0,canShrink=!1,canExpand=!1,wrap=F.wrap,skin=F.skin,inner=F.inner,current=F.current,width=current.width,height=current.height,minWidth=current.minWidth,minHeight=current.minHeight,maxWidth=current.maxWidth,maxHeight=current.maxHeight,scrolling=current.scrolling,scrollOut=current.scrollOutside?current.scrollbarWidth:0,margin=current.margin,wMargin=getScalar(margin[1]+margin[3]),hMargin=getScalar(margin[0]+margin[2]),wPadding,hPadding,wSpace,hSpace,origWidth,origHeight,origMaxWidth,origMaxHeight,ratio,width_,height_,maxWidth_,maxHeight_,iframe,body;if(wrap.add(skin).add(inner).width("auto").height("auto").removeClass("fancybox-tmp"),wSpace=wMargin+(wPadding=getScalar(skin.outerWidth(!0)-skin.width())),hSpace=hMargin+(hPadding=getScalar(skin.outerHeight(!0)-skin.height())),origWidth=isPercentage(width)?(viewport.w-wSpace)*getScalar(width)/100:width,origHeight=isPercentage(height)?(viewport.h-hSpace)*getScalar(height)/100:height,"iframe"===current.type){if(iframe=current.content,current.autoHeight&&1===iframe.data("ready"))try{iframe[0].contentWindow.document.location&&(inner.width(origWidth).height(9999),body=iframe.contents().find("body"),scrollOut&&body.css("overflow-x","hidden"),origHeight=body.outerHeight(!0))}catch(e){}}else(current.autoWidth||current.autoHeight)&&(inner.addClass("fancybox-tmp"),current.autoWidth||inner.width(origWidth),current.autoHeight||inner.height(origHeight),current.autoWidth&&(origWidth=inner.width()),current.autoHeight&&(origHeight=inner.height()),inner.removeClass("fancybox-tmp"));if(width=getScalar(origWidth),height=getScalar(origHeight),ratio=origWidth/origHeight,minWidth=getScalar(isPercentage(minWidth)?getScalar(minWidth,"w")-wSpace:minWidth),maxWidth=getScalar(isPercentage(maxWidth)?getScalar(maxWidth,"w")-wSpace:maxWidth),minHeight=getScalar(isPercentage(minHeight)?getScalar(minHeight,"h")-hSpace:minHeight),origMaxWidth=maxWidth,origMaxHeight=maxHeight=getScalar(isPercentage(maxHeight)?getScalar(maxHeight,"h")-hSpace:maxHeight),current.fitToView&&(maxWidth=Math.min(viewport.w-wSpace,maxWidth),maxHeight=Math.min(viewport.h-hSpace,maxHeight)),maxWidth_=viewport.w-wMargin,maxHeight_=viewport.h-hMargin,current.aspectRatio?(width>maxWidth&&(height=getScalar((width=maxWidth)/ratio)),height>maxHeight&&(width=getScalar((height=maxHeight)*ratio)),width<minWidth&&(height=getScalar((width=minWidth)/ratio)),height<minHeight&&(width=getScalar((height=minHeight)*ratio))):(width=Math.max(minWidth,Math.min(width,maxWidth)),current.autoHeight&&"iframe"!==current.type&&(inner.width(width),height=inner.height()),height=Math.max(minHeight,Math.min(height,maxHeight))),current.fitToView)if(inner.width(width).height(height),wrap.width(width+wPadding),width_=wrap.width(),height_=wrap.height(),current.aspectRatio)for(;(width_>maxWidth_||height_>maxHeight_)&&width>minWidth&&height>minHeight&&!(steps++>19);)height=Math.max(minHeight,Math.min(maxHeight,height-10)),(width=getScalar(height*ratio))<minWidth&&(height=getScalar((width=minWidth)/ratio)),width>maxWidth&&(height=getScalar((width=maxWidth)/ratio)),inner.width(width).height(height),wrap.width(width+wPadding),width_=wrap.width(),height_=wrap.height();else width=Math.max(minWidth,Math.min(width,width-(width_-maxWidth_))),height=Math.max(minHeight,Math.min(height,height-(height_-maxHeight_)));scrollOut&&"auto"===scrolling&&height<origHeight&&width+wPadding+scrollOut<maxWidth_&&(width+=scrollOut),inner.width(width).height(height),wrap.width(width+wPadding),width_=wrap.width(),height_=wrap.height(),canShrink=(width_>maxWidth_||height_>maxHeight_)&&width>minWidth&&height>minHeight,canExpand=current.aspectRatio?width<origMaxWidth&&height<origMaxHeight&&width<origWidth&&height<origHeight:(width<origMaxWidth||height<origMaxHeight)&&(width<origWidth||height<origHeight),$.extend(current,{dim:{width:getValue(width_),height:getValue(height_)},origWidth:origWidth,origHeight:origHeight,canShrink:canShrink,canExpand:canExpand,wPadding:wPadding,hPadding:hPadding,wrapSpace:height_-skin.outerHeight(!0),skinSpace:skin.height()-height}),!iframe&&current.autoHeight&&height>minHeight&&height<maxHeight&&!canExpand&&inner.height("auto")},_getPosition:function(onlyAbsolute){var current=F.current,viewport=F.getViewport(),margin=current.margin,width=F.wrap.width()+margin[1]+margin[3],height=F.wrap.height()+margin[0]+margin[2],rez={position:"absolute",top:margin[0],left:margin[3]};return current.autoCenter&&current.fixed&&!onlyAbsolute&&height<=viewport.h&&width<=viewport.w?rez.position="fixed":current.locked||(rez.top+=viewport.y,rez.left+=viewport.x),rez.top=getValue(Math.max(rez.top,rez.top+(viewport.h-height)*current.topRatio)),rez.left=getValue(Math.max(rez.left,rez.left+(viewport.w-width)*current.leftRatio)),rez},_afterZoomIn:function(){var current=F.current;current&&(F.isOpen=F.isOpened=!0,F.wrap.css("overflow","visible").addClass("fancybox-opened"),F.update(),(current.closeClick||current.nextClick&&F.group.length>1)&&F.inner.css("cursor","pointer").bind("click.fb",(function(e){$(e.target).is("a")||$(e.target).parent().is("a")||(e.preventDefault(),F[current.closeClick?"close":"next"]())})),current.closeBtn&&$(current.tpl.closeBtn).appendTo(F.skin).bind("click.fb",(function(e){e.preventDefault(),F.close()})),current.arrows&&F.group.length>1&&((current.loop||current.index>0)&&$(current.tpl.prev).appendTo(F.outer).bind("click.fb",F.prev),(current.loop||current.index<F.group.length-1)&&$(current.tpl.next).appendTo(F.outer).bind("click.fb",F.next)),F.trigger("afterShow"),current.loop||current.index!==current.group.length-1?F.opts.autoPlay&&!F.player.isActive&&(F.opts.autoPlay=!1,F.play()):F.play(!1))},_afterZoomOut:function(obj){obj=obj||F.current,$(".fancybox-wrap").trigger("onReset").remove(),$.extend(F,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null}),F.trigger("afterClose",obj)}}),F.transitions={getOrigPosition:function(){var current=F.current,element=current.element,orig=current.orig,pos={},width=50,height=50,hPadding=current.hPadding,wPadding=current.wPadding,viewport=F.getViewport();return!orig&&current.isDom&&element.is(":visible")&&((orig=element.find("img:first")).length||(orig=element)),isQuery(orig)?(pos=orig.offset(),orig.is("img")&&(width=orig.outerWidth(),height=orig.outerHeight())):(pos.top=viewport.y+(viewport.h-height)*current.topRatio,pos.left=viewport.x+(viewport.w-width)*current.leftRatio),("fixed"===F.wrap.css("position")||current.locked)&&(pos.top-=viewport.y,pos.left-=viewport.x),pos={top:getValue(pos.top-hPadding*current.topRatio),left:getValue(pos.left-wPadding*current.leftRatio),width:getValue(width+wPadding),height:getValue(height+hPadding)}},step:function(now,fx){var ratio,padding,value,prop=fx.prop,current=F.current,wrapSpace=current.wrapSpace,skinSpace=current.skinSpace;"width"!==prop&&"height"!==prop||(ratio=fx.end===fx.start?1:(now-fx.start)/(fx.end-fx.start),F.isClosing&&(ratio=1-ratio),value=now-(padding="width"===prop?current.wPadding:current.hPadding),F.skin[prop](getScalar("width"===prop?value:value-wrapSpace*ratio)),F.inner[prop](getScalar("width"===prop?value:value-wrapSpace*ratio-skinSpace*ratio)))},zoomIn:function(){var current=F.current,startPos=current.pos,effect=current.openEffect,elastic="elastic"===effect,endPos=$.extend({opacity:1},startPos);delete endPos.position,elastic?(startPos=this.getOrigPosition(),current.openOpacity&&(startPos.opacity=.1)):"fade"===effect&&(startPos.opacity=.1),F.wrap.css(startPos).animate(endPos,{duration:"none"===effect?0:current.openSpeed,easing:current.openEasing,step:elastic?this.step:null,complete:F._afterZoomIn})},zoomOut:function(){var current=F.current,effect=current.closeEffect,elastic="elastic"===effect,endPos={opacity:.1};elastic&&(endPos=this.getOrigPosition(),current.closeOpacity&&(endPos.opacity=.1)),F.wrap.animate(endPos,{duration:"none"===effect?0:current.closeSpeed,easing:current.closeEasing,step:elastic?this.step:null,complete:F._afterZoomOut})},changeIn:function(){var current=F.current,effect=current.nextEffect,startPos=current.pos,endPos={opacity:1},direction=F.direction,distance=200,field;startPos.opacity=.1,"elastic"===effect&&(field="down"===direction||"up"===direction?"top":"left","down"===direction||"right"===direction?(startPos[field]=getValue(getScalar(startPos[field])-200),endPos[field]="+=200px"):(startPos[field]=getValue(getScalar(startPos[field])+200),endPos[field]="-=200px")),"none"===effect?F._afterZoomIn():F.wrap.css(startPos).animate(endPos,{duration:current.nextSpeed,easing:current.nextEasing,complete:F._afterZoomIn})},changeOut:function(){var previous=F.previous,effect=previous.prevEffect,endPos={opacity:.1},direction=F.direction,distance=200;"elastic"===effect&&(endPos["down"===direction||"up"===direction?"top":"left"]=("up"===direction||"left"===direction?"-":"+")+"=200px"),previous.wrap.animate(endPos,{duration:"none"===effect?0:previous.prevSpeed,easing:previous.prevEasing,complete:function(){$(this).trigger("onReset").remove()}})}},F.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!isTouch,fixed:!0},overlay:null,fixed:!1,el:$("html"),create:function(opts){opts=$.extend({},this.defaults,opts),this.overlay&&this.close(),this.overlay=$('<div class="fancybox-overlay"></div>').appendTo(F.coming?F.coming.parent:opts.parent),this.fixed=!1,opts.fixed&&F.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(opts){var that=this;opts=$.extend({},this.defaults,opts),this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(opts),this.fixed||(W.bind("resize.overlay",$.proxy(this.update,this)),this.update()),opts.closeClick&&this.overlay.bind("click.overlay",(function(e){if($(e.target).hasClass("fancybox-overlay"))return F.isActive?F.close():that.close(),!1})),this.overlay.css(opts.css).show()},close:function(){var scrollV,scrollH;W.unbind("resize.overlay"),this.el.hasClass("fancybox-lock")&&($(".fancybox-margin").removeClass("fancybox-margin"),scrollV=W.scrollTop(),scrollH=W.scrollLeft(),this.el.removeClass("fancybox-lock"),W.scrollTop(scrollV).scrollLeft(scrollH)),$(".fancybox-overlay").remove().hide(),$.extend(this,{overlay:null,fixed:!1})},update:function(){var width="100%",offsetWidth;this.overlay.width(width).height("100%"),IE?(offsetWidth=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth),D.width()>offsetWidth&&(width=D.width())):D.width()>W.width()&&(width=D.width()),this.overlay.width(width).height(D.height())},onReady:function(opts,obj){var overlay=this.overlay;$(".fancybox-overlay").stop(!0,!0),overlay||this.create(opts),opts.locked&&this.fixed&&obj.fixed&&(overlay||(this.margin=D.height()>W.height()&&$("html").css("margin-right").replace("px","")),obj.locked=this.overlay.append(obj.wrap),obj.fixed=!1),!0===opts.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(opts,obj){var scrollV,scrollH;obj.locked&&(!1!==this.margin&&($("*").filter((function(){return"fixed"===$(this).css("position")&&!$(this).hasClass("fancybox-overlay")&&!$(this).hasClass("fancybox-wrap")})).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),scrollV=W.scrollTop(),scrollH=W.scrollLeft(),this.el.addClass("fancybox-lock"),W.scrollTop(scrollV).scrollLeft(scrollH)),this.open(opts)},onUpdate:function(){this.fixed||this.update()},afterClose:function(opts){this.overlay&&!F.coming&&this.overlay.fadeOut(opts.speedOut,$.proxy(this.close,this))}},F.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(opts){var current=F.current,text=current.title,type=opts.type,title,target;if($.isFunction(text)&&(text=text.call(current.element,current)),isString(text)&&""!==$.trim(text)){switch(title=$('<div class="fancybox-title fancybox-title-'+type+'-wrap">'+text+"</div>"),type){case"inside":target=F.skin;break;case"outside":target=F.wrap;break;case"over":target=F.inner;break;default:target=F.skin,title.appendTo("body"),IE&&title.width(title.width()),title.wrapInner('<span class="child"></span>'),F.current.margin[2]+=Math.abs(getScalar(title.css("margin-bottom")))}title["top"===opts.position?"prependTo":"appendTo"](target)}}},$.fn.fancybox=function(options){var index,that=$(this),selector=this.selector||"",run=function(e){var what=$(this).blur(),idx=index,relType,relVal;e.ctrlKey||e.altKey||e.shiftKey||e.metaKey||what.is(".fancybox-wrap")||(relType=options.groupAttr||"data-fancybox-group",(relVal=what.attr(relType))||(relType="rel",relVal=what.get(0)[relType]),relVal&&""!==relVal&&"nofollow"!==relVal&&(idx=(what=(what=selector.length?$(selector):that).filter("["+relType+'="'+relVal+'"]')).index(this)),options.index=idx,!1!==F.open(what,options)&&e.preventDefault())};return index=(options=options||{}).index||0,selector&&!1!==options.live?D.undelegate(selector,"click.fb-start").delegate(selector+":not('.fancybox-item, .fancybox-nav')","click.fb-start",run):that.unbind("click.fb-start").bind("click.fb-start",run),this.filter("[data-fancybox-start=1]").trigger("click"),this},D.ready((function(){var w1,w2,elem,fixed;void 0===$.scrollbarWidth&&($.scrollbarWidth=function(){var parent=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),child=parent.children(),width=child.innerWidth()-child.height(99).innerWidth();return parent.remove(),width}),void 0===$.support.fixedPosition&&($.support.fixedPosition=(elem=$('<div style="position:fixed;top:20px;"></div>').appendTo("body"),fixed=20===elem[0].offsetTop||15===elem[0].offsetTop,elem.remove(),fixed)),$.extend(F.defaults,{scrollbarWidth:$.scrollbarWidth(),fixed:$.support.fixedPosition,parent:$("body")}),w1=$(window).width(),H.addClass("fancybox-lock-test"),w2=$(window).width(),H.removeClass("fancybox-lock-test"),$("<style>.fancybox-margin{margin-right:"+(w2-w1)+"px;}</style>").appendTo("head")}))}(window,document,jQuery);