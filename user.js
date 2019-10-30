// ==UserScript==
// @name         Google、Bing、Baidu 搜索结果屏蔽垃圾 SEO 站点
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       you
// @match        www.google.com/search?*
// @match        cn.bing.com/search?*
// @match        www.baidu.com/s?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var black_lists = [
        's='
        ,'so.php'
        ,'csdn.net'
        ,'voidcn.com'
        ,'voidcc.com'
        ,'codeday.me'
        ,'bbsmax.com'
        ,'kknews.cc'
        ,'outofmemory.cn'
        ,'mudbest.com'
        ,'doulike.me'
        ,'jingcai360.net'
        ,'tuicool.com'
    ];

    var url = document.location.host;
    console.log('current url', url)
    switch(url) {
        case 'www.google.com':
            pro_google(black_lists);
            break;
        case 'cn.bing.com':
            pro_bing(black_lists);
            break;
        case 'www.baidu.com':
            pro_baidu(black_lists);
            break;
    }

    function pro_google(black_lists) {
        [...document.getElementsByClassName('r')].map(item => {
            if(item.hasChildNodes()) {
                var children = item.childNodes;
                var url = children[0].getAttribute('href');
                for (let str of black_lists) {
                    if (url.indexOf(str) > -1) {
                        console.log('process', url, str);
                        item.parentNode.parentNode.remove();
                        break;
                    }
                }
            }
        });
    }

    function pro_bing(black_lists) {
        [...document.getElementsByClassName('b_attribution')].map(item => {
            if(item.hasChildNodes()) {
                var children = item.childNodes;
                var url = children[0].innerHTML;
                for (let str of black_lists) {
                    if (url.indexOf(str) > -1) {
                        console.log('process', url, str);
                        item.parentNode.parentNode.remove();
                        break;
                    }
                }
            }
        });
    }

    function pro_baidu(black_lists) {
        [...document.getElementsByClassName('f13')].map(item => {
            if(item.hasChildNodes()) {
                var children = item.childNodes;
                var url = children[0].innerHTML;
                if ('string' == typeof(url)) {
                    for (let str of black_lists) {
                        if (url.indexOf(str) > -1) {
                            console.log('process', url, str);
                            // 百度特例的三层父级包含 result 要移除
                            var _parent = item.parentNode.parentNode.parentNode;
                            if (_parent.getAttribute("class").indexOf('result') > -1) {
                                item.parentNode.parentNode.parentNode.remove()
                            } else {
                                item.parentNode.remove();
                            }
                            break;
                        }
                    }
                }
            }
        });
    }

})();
