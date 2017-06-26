/**
 * Created by frances.fearon on 11/05/2017.
 */
angular.module('secur').factory('sessionDataFactory',sessionDataFactory);

function sessionDataFactory($http) {
    return {
        sessionList: sessionList,
        sessionListAll: sessionListAll,
        sessionDisplay: sessionDisplay,

        postNewSession:postNewSession,
        putSession:putSession,
        deleteSession:deleteSession
    };

    function sessionListAll() {
         return $http.get('/api/sessions').then(complete).catch(failed);
    }

    function sessionList(userId) {
      //  return $http.get('/api/sessions').then(complete).catch(failed);

        return $http.get('/api/sessions/'+ userId).then(complete).catch(failed);
    }

    function sessionDisplay(id) {
        return $http.get('/api/session/' + id).then(complete).catch(failed);

    }



    function postNewSession(session) {
        return $http.post('/api/sessions',session).then(complete).catch(failed);
    }

    function putSession(id,session) {
        return $http.put('/api/session/' + id  , session).then(complete).catch(failed);
    }

    function deleteSession(id) {
        return $http.delete('/api/session/' + id ).then(complete).catch(failed);
    }



    function complete(response) {
        return response;
    }

    function failed(error) {
        return error.statusText;
    }
}
