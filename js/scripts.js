


var app = angular.module('myApp', ['angular-loading-bar']);

app.controller('myCtrl', function($scope,$http) {
    $scope.cpfBenAtual = "";
    $scope.boletos      = [];
 

    $scope.buscaBoleto = function(){


        $scope.boletos      = [];

//02168552843 para teste


         $http.get("https://felipe-10f7b37c-eval-test.apigee.net/boleto-sf/BoletoSAUDE/Boleto?acao=listar&cpf=" + $scope.cpfBenAtual)
          .then(function(response) {

            if(response.data.boletos.length > 0){

              angular.forEach(response.data.boletos, function(value, key) {
                
               
                separarar = value.nossoNumero.split(" ");

                value.nossoNumero   =   separarar.pop ();
                
                $scope.boletos.push(value);
              });
           }
          
           //$scope.cpfBenAtual = "";

        });





    }


});


app.run(function($window, $rootScope) {
    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function () {
      $rootScope.$apply(function() {
        $rootScope.online = false;
      });
    }, false);
    $window.addEventListener("online", function () {
      $rootScope.$apply(function() {
        $rootScope.online = true;
      });
    }, false);
});


if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('./service-worker.js')
    .then(function(reg) {
        console.log('Service worker Registered');
   
    })
    .catch(function (err) {
        console.log('erro', err);
    });
}