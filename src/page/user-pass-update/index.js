/*
 * @Author: wyatt 
 * @Date: 2018-08-22 15:00:44 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-08-22 15:47:33
 */


require('./index.css')
require('page/common/header/index.js')
require('page/common/nav/index.js')
var navSide = require('page/common/nav-side/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user-service.js');


// page 逻辑部分

var page = {
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        //初始化左侧菜单
        navSide.init({
            name : 'user-pass-update'
        });
    },
    bindEvent : function () {
        var _this = this;
        //点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function () {
           var userInfo = {
               password             : $.trim($('#password').val()),
               passwordNew          : $.trim($('#password-new').val()),
               passwordConfrim      : $.trim($('#password-confirm').val())
           };
           validateResult = _this.validateForm(userInfo);
           if (validateResult.status) {
               //修改密码
                _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                }, function (res, msg) {
                    _mm.successTips(msg);
                    window.location.href = './user-pass-update.html';
               }, function (errMsg) {
                   _mm.errorTips(errMsg);
               })
           }
           else{
               _mm.errorTips(validateResult.msg);
           }
        });
    },
    validateForm : function (formData) {
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证原始密码
        if(!_mm.validate(formData.password, 'require')){
            result.msg = '原始密码不能为空';
            return result;
        }
        // 验证新密码长度
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '新密码长度不能小于6位';
            return result;
        }
        // 验证两次输入的新密码是否一样
        if(formData.passwordNew !== formData.passwordConfrim){
            result.msg = '两次新密码输入不一致';
            return result;
        }
        //通过验证，返回正确提示
        result.status = true;
        result.msg    = '验证通过';
        return result;
    }
}

$(function () {
    page.init()
})