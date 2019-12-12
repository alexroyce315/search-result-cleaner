// ==UserScript==
// @name         Google、Bing、Baidu 搜索结果屏蔽垃圾 SEO 站点
// @namespace    http://tampermonkey.net/
// @version      0.2
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
        ,'q='
        ,'so.php'
        ,'.xp.cn'
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
        ,'398k.com'
        ,'thinbug.com'
        ,'bunian.cn'
        ,'guanfu.net.cn'
        ,'0818tuan.com'
        ,'www-599139.com'
        ,'liqucn.com'
        ,'18dq.com.cn'
        ,'wntzx.cn'
        ,'shoukuanzhifu.com'
        ,'qz40.com'
        ,'51ttxue.com'
        ,'haokan123.net.cn'
        ,'flyfun.site'
        ,'9ihb.com'
        ,'joyk.com'
        ,'kumaoke.com'
        ,'3kkg.com'
        ,'yqhd8.com'
        ,'ae36.com'
        ,'wemp.app'
        ,'smjjl.com'
        ,'52huixz.com'
        ,'kumaoke.com'
        ,'searchman.com'
        ,'xbw0.com'
        ,'r8rxt.com'
        ,'976419.top'
        ,'wdngh.com'
        ,'0714news.com'
        ,'lanmaoyouhui.com'
        ,'xb636.com'
        ,'xzjlwscl.com'
        ,'mgjiaotong.com'
        ,'029hsmy.com'
        ,'sxn8452.com'
        ,'kauuu.cc'
        ,'xuezishi.net'
        ,'usd-cny.com'
        ,'app-store.net.cn'
        ,'islongs.com'
        ,'jiechunqiu.com'
        ,'foufu.com'
    ];

    var url = document.location.host;
    console.log('current url', url)
    switch(url) {
        case 'www.google.com':
            pro_google();
            break;
        case 'cn.bing.com':
            pro_bing();
            break;
        case 'www.baidu.com':
            pro_baidu();
            break;
    }

    function pro_google() {
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

    function pro_bing() {
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

    function pro_baidu() {
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
