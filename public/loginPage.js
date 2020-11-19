"use strict";

const userObject = new UserForm();

userObject.loginFormCallback = function(data) {
    ApiConnector.login(data, (callback) => {
       if( callback.success) {
           location.reload();
       } else {
           userObject.setLoginErrorMessage("неверный логин или пароль");
       }
    })
}

userObject.registerFormCallback = function(data) {
    ApiConnector.register(data,(callback) => {
        if( callback.success) {
            location.reload();
        } else {
            userObject.setRegisterErrorMessage("ошибка");
        } 
    })
}
