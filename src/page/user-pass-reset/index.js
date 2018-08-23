/*
 * @Author: wyatt 
 * @Date: 2018-08-16 09:46:02 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-08-17 16:57:13
 */


'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

//表单里的错误提示
var formError = {
    show : function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
}


// page 逻辑部分

var page = {
    data : {
        username    : '',
        question    : '',
        answer      : '',
        token       : ''
    },
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad  : function () {
        this.loadStepUsername();
    },
    bindEvent : function () {
        var _this = this;
        //输入用户名下一步按钮的点击
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            //y用户名存在
            if (username) {
                _user.getQuestion(username, function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            }
            // 用户名为空
            else{
                formError('请输入用户名')
            }
        });
        // 输入密码提示答案中的按钮
        $('#submit-question').click(function () {
            var answer = $.trim($('#answer').val());
            //y用户名存在
            if (answer) {
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer
                }, function (res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            }
            // 
            else{
                formError('请输入密码提示问题答案')
            }
        });
        // 输入新密码按钮的按钮
        $('#submit-password').click(function () {
            var password = $.trim($('#password').val());
            //y用户名存在
            if (password && password.length >=6) {
                _user.resetPassword({
                    username    : _this.data.username,
                    passwordNew : password,
                    forgetToken : _this.data.token
                }, function (res) {
                    window.location.href = './result.html?type=pass-reset';
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            }
            // 密码为空
            else{
                formError('请输入不少于6位的新密码')
            }
        });
    },
    // 加载输入用户名的第一步
    loadStepUsername : function () {
        $('.step-username').show();
    },
    // 加载输入密码提示问题答案的一步
    loadStepQuestion : function () {
        // 清除错误提示框
        formError.hide();
        // 容器切换
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    // 加载输入密码的一步
    loadStepPassword : function () {
        // 清除错误提示框
        formError.hide();
        // 容器切换
        $('.step-question').hide()
            .siblings('.step-password').show();
    },
    
}

$(function () {
    page.init()
})