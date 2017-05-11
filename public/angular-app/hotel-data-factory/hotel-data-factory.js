/**
 * Created by frances.fearon on 27/04/2017.
 */
angular.module('secur').factory('hotelDataFactory',hotelDataFactory);

function hotelDataFactory($http) {
    return {
        hotelList: hotelList,
        hotelDisplay: hotelDisplay,
        postReview: postReview,
        postNewHotel:postNewHotel,
        putHotel:putHotel,
        deleteHotel:deleteHotel
    };


    function hotelList() {
        return $http.get('/api/sessions').then(complete).catch(failed);
    }

    function hotelDisplay(id) {
        return $http.get('/api/sessions/' + id).then(complete).catch(failed);

    }

    function postReview(id,review) {
        return $http.post('/api/hotels/' + id + '/reviews',review).then(complete).catch(failed);
    }

    function postNewHotel(hotel) {
        return $http.post('/api/hotels',hotel).then(complete).catch(failed);
    }

    function putHotel(id,hotel) {
        return $http.put('/api/hotels/' + id  , hotel).then(complete).catch(failed);
    }

    function deleteHotel(id) {
        return $http.delete('/api/hotels/' + id ).then(complete).catch(failed);
    }



    function complete(response) {
        return response;
    }

    function failed(error) {
        return error.statusText;
    }
}