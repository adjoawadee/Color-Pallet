var app = angular.module('ColorPallet', ['ngMaterial']);

app.controller("GenerateColorController", ["$scope", "$mdToast", function ($scope, $mdToast) {
    $scope.color = {
        r: 0,
        g: 0,
        b: 0
    }
    
    $scope.pallet = [];

    $scope.saveToPallet = function (color) {

        if($scope.pallet.length < 4){
            $scope.pallet.push(color);
            $scope.color = { r: 0,
                g: 0,
                b: 0}
            console.log($scope.pallet);
        }
        else
            this.showActionToast();
    }

    $scope.reset = function () {
        $scope.pallet = [];
        $scope.color =  {
            r: 0,
            g: 0,
            b: 0
        };
        $scope.$applyAsync();
    }

    $scope.showActionToast = function() {
        var pinTo = $scope.getToastPosition();
        var toast = $mdToast.simple()
            .textContent('Pallet is full')
            .action('RESET')
            .highlightAction(true)
            .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
            .position(pinTo);

        $mdToast.show(toast).then(function(response) {
            if ( response == 'ok' ) {
                setTimeout(function(){
                    $scope.pallet =[];
                    $scope.$applyAsync();
                });
            }
        });
    };

    var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };

    $scope.toastPosition = angular.extend({},last);

    $scope.getToastPosition = function() {
        sanitizePosition();

        return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
    };
    function sanitizePosition() {
        var current = $scope.toastPosition;

        if ( current.bottom && last.top ) current.top = false;
        if ( current.top && last.bottom ) current.bottom = false;
        if ( current.right && last.left ) current.left = false;
        if ( current.left && last.right ) current.right = false;

        last = angular.extend({},current);
    }

}]);