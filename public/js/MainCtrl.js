angular.module('app').controller('MainCtrl', function($scope, srvc, promiseObj, factory){

  console.log('promiseObj: ', promiseObj)
  $scope.user = promiseObj
  let store = '';

  $scope.name = srvc.test;
  $scope.string = 'Enter a sentence that you want to change case';

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
    results[0] = results[0].toLowerCase();
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

  $scope.undoBtn = 'Remove Spaces'

  $scope.removeSpaces = function(){
    if($scope.undoBtn === 'Remove Spaces'){
      store = $scope.string
      $scope.string = $scope.string.replace(/\s/g,'');
      $scope.undoBtn = 'Undo'
    } else if($scope.undoBtn === 'Undo'){
      $scope.undoBtn = 'Remove Spaces'
      $scope.string = store;
    }
  }

  $scope.noun = ''

  $scope.status = '';

  $scope.addWord = function(word){
    console.log('Ctrl: Adding word to ', $scope.user.id)
    factory.addWord(word, $scope.user.id).then(function(response){
      console.log('Response from Addword: ', response)
      $scope.status = response.status;
    })
  }

})
