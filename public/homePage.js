const logoutButton = new LogoutButton();
logoutButton.action = function(){
    ApiConnector.logout((callback) => {
        if (callback.success){
            location.reload();
        }
    })
}
ApiConnector.current((callback) => {
    if (callback.success){
        ProfileWidget.showProfile(callback.data)
    }
})

const ratesBoard = new RatesBoard();
function getACourse() {
    ApiConnector.getStocks((callback) => {
        if(callback.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(callback.data);
        }
    })
    
};
getACourse();
setInterval(getACourse, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function(data){
    ApiConnector.addMoney(data,(callback) => {
        if(callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(true, "Успех! Баланс пополнен.");
        }else {
            moneyManager.setMessage(false,"Ошибка! Баланс не пополнен.");
        }
    })
}

moneyManager.conversionMoneyCallback = function(data){
    ApiConnector.convertMoney(data,(callback) => {
        if(callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(true,"Успех! Конвертация выполнена.");
        }else {
            moneyManager.setMessage(false,"Ошибка! Конвертация не выолнена.");
        }
    })
}

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data,(callback) => {
        if(callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(true,"Успех! Перевод выполнен.");
        }else {
            moneyManager.setMessage(false,"Ошибка! Перевод не пополнен.");
        }
    })
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(function(callback) {
    if (callback.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(callback.data);
        moneyManager.updateUsersList(callback.data);
    }
})

favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, (callback) => {
        if (callback.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(callback.data);
            moneyManager.updateUsersList(callback.data);
            favoritesWidget.setMessage(true, "Успех! Пользователь добавлен");
        } else {
            favoritesWidget.setMessage(false, "Ошибка! Пользователь не добавлен");
        }
    })
}

favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, (callback) => { 
        if (callback.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(callback.data);
            moneyManager.updateUsersList(callback.data);
            favoritesWidget.setMessage(true, "Успех! Пользователь удален");
        } else {
            favoritesWidget.setMessage(false, "Ошибка! Пользователь не удален");
        }
    })
}