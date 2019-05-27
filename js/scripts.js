
var app = angular.module('myApp', ['angular-loading-bar']);

app.controller('myCtrl', function($scope,$http,$window) {
    $scope.cpfBenAtual = "";
    $scope.boletos      = [];
    $scope.base = "";
 

    $scope.buscaBoleto = function(){


        $scope.boletos      = [];

//02168552843 para teste



         $http.get("https://felipe-10f7b37c-eval-test.apigee.net/boleto-sf/Boleto"+ $scope.base +"/Boleto?acao=listar&cpf=" + $scope.cpfBenAtual)
          .then(function(response) {

            if(response.data.boletos.length > 0){

              angular.forEach(response.data.boletos, function(value, key) {
               
                separarar = value.nossoNumero.split(" ");

                value.nossoNumero   =   separarar.pop ();
                
                $scope.boletos.push(value);
              });
           }else{
             alert('Não existem boletos para o cpf informado!');
           }
          
           //$scope.cpfBenAtual = "";

        });





    }

// $scope.imprimir = function (nossoNumero){

// $scope.url = 'http://oss.saofrancisco.com.br/BoletoSAUDE/GetBoleto/'+$scope.cpfBenAtual+'_'+nossoNumero+'_0.pdf';
// $window.open($scope.url);


// }


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