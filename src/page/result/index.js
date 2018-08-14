/*
 * @Author: wyatt 
 * @Date: 2018-08-14 22:46:50 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-08-14 23:21:03
 */

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function () {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    //显示对应的提示元素
    $element.show()
})