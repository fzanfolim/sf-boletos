


var app = angular.module('myApp', ['angular-loading-bar']);

app.controller('myCtrl', function($scope,$http) {
    $scope.cpfBenAtual = "";
    $scope.boletos      = [];
 

    $scope.buscaBoleto = function(){


        $scope.boletos      = [];



        // $http.get("http://oss.saofrancisco.com.br/BoletoSAUDE/Boleto?acao=listar&cpf=02168552843")
        //   .then(function(response) {
        //       console.log(response.data);

        //       angular.forEach(response.data.boletos, function(value, key) {
        //         value.nossoNumero   =   value.nossoNumero.slice(-8);
        //         $scope.boletos.push(value);
                
                
        //       });


        //       $http.get("http://oss.saofrancisco.com.br/BoletoSAUDE/Boleto?acao=listar&cpf=" + $scope.cpfBenAtual)
        //         .then(function(response) {

        //           if(response.data.boletos.length > 0){

        //             angular.forEach(response.data.boletos, function(value, key) {
        //               value.nossoNumero   =   value.nossoNumero.slice(-8);
        //               $scope.boletos.push(value);
        //             });
        //          }
                
        //          //$scope.cpfBenAtual = "";

        //       });


        //       // alert($scope.boletos);
        //   });
        

          $http.get("http://oss.saofrancisco.com.br/BoletoSAUDE/Boleto?acao=listar&cpf=" + $scope.cpfBenAtual)
          .then(function(response) {

            if(response.data.boletos.length > 0){

              angular.forEach(response.data.boletos, function(value, key) {
                value.nossoNumero   =   value.nossoNumero.slice(-8);
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