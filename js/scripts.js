
var app = angular.module('myApp', ['angular-loading-bar']);

app.controller('myCtrl', function($scope,$http,$window) {
    $scope.cpfBenAtual = "";
    $scope.boletos      = [];
    $scope.base = "";
 

    // $scope.buscaBoleto = function(){


    //     $scope.boletos      = [];


    //      $http.get("https://felipe-10f7b37c-eval-test.apigee.net/boleto-sf/Boleto"+ $scope.base +"/Boleto?acao=listar&cpf=" + $scope.cpfBenAtual)
    //       .then(function(response) {

    //         if(response.data.boletos.length > 0){

    //           angular.forEach(response.data.boletos, function(value, key) {
               
    //             separarar = value.nossoNumero.split(" ");

    //             value.nossoNumero   =   separarar.pop ();
                
    //             $scope.boletos.push(value);
    //           });
    //        }else{
    //          alert('Não existem boletos para o cpf informado!');
    //        }
          
    //        //$scope.cpfBenAtual = "";

    //     });

    // }


    $scope.buscaBoletoV2 = function(){


      $scope.boletos      = [];

      
      if($scope.base == 'ODONTO'){

        $scope.cedente ='02727724000167' ;

      }else{
        $scope.cedente ='01613433000185' ;
      }


      var req = {
        method: 'POST',
        url: 'https://apigateway.saofrancisco.com.br/boleto/cobranca/listaBoletoRegistrado',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          inscCedente 	    : $scope.cedente,
          inscSacado			: $scope.cpfBenAtual.toString()
            
        }
      };


      if($scope.cpfBenAtual.toString().length > 10){
        
        $http(req).success(function(data){
          console.log(data);
  
  
          if(data && data.length > 0){
  
            angular.forEach(data, function(value, key) {
              
              // value.linkTotem = value.linkTotem.replace(/^http:\/\//i, 'https://');
              $scope.boletos.push(value);
            });
         }else{
           alert('Não existem boletos para o cpf informado!');
         }
  
        
        }).error(function(error){
        //Esta parte trata o retorno com erro
          alert("Erro...")
        });

        

      }else{
        alert('Documento inválido');
      }              






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