'use strict';
angular.module('myApp.vadlamani', []).
factory('patientInfo', ['$resource',
    function ($resource) {
        return $resource('client-apps/vadlamani/ptif-data.json', {}, {
            query: {
                method: 'GET',
                params: {
                    patientId: 'patientId'
                },
                isArray: false
            }
        });
    }
]);


