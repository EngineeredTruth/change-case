angular.module('app')
    .service('srvc', function() {
        this.test = 'matt'

    })
    .factory('factory', function($http) {
            return {
                getUserData: function() {
                    return $http({
                        method: 'GET',
                        url: '/getUserData'
                    }).then(function(response){
                        return response.data;
                    })
                  },
                  addWord: function(word, userId){
                    return $http({
                      method: 'POST',
                      url: '/addWord',
                      data: {"word":word, "userId":userId}
                    }).then(function(response){
                      return response.data;
                    })
                  }
                }
              }
            )
