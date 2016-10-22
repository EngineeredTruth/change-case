angular.module('app').controller('MainCtrl', function($scope, srvc, promiseObj){

  console.log('promiseObj: ', promiseObj)
  $scope.name = srvc.test;
  $scope.string = 'this is a test';

  $scope.log = function(){console.log($scope.string)}

  $scope.lowerCase = function(){
    $scope.string = $scope.string.toLowerCase();
  };

  $scope.upperCase = function(){
    $scope.string = $scope.string.toUpperCase();
  };

  $scope.capitalCase = function(){
    let results = $scope.string.split('')

    results[0] = results[0].toUpperCase();

    console.log(results)

    for(let i = 1; i < results.length; i++){
      if(results[i-1] === ' '){
        results[i] = results[i].toUpperCase()
        console.log('i: ',results[i])
      }
      else {
        results[i] = results[i].toLowerCase()
      }
    }

    $scope.string = results.join('');
  };

  $scope.camelCase = function(){
    let results = $scope.string.split('')

    console.log(results)

    for(let i = 1; i < results.length; i++){
      if(results[i-1] === ' '){
        results[i] = results[i].toUpperCase()
        console.log('i: ',results[i])
      }
      else {
        results[i] = results[i].toLowerCase()
      }
    }

    $scope.string = results.join('');
  };

  $scope.removeSpaces = function(){
    $scope.string = $scope.string.replace(/\s/g,'');
  }

})
