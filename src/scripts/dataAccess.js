const applicationState = {
    requests:[]
}

// variable holding the path to the remote data
const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}`)
    .then(response => response.json())
    .then(
        (serviceRequests) => {
            //Store the external state in the application state
            applicationState.requests =serviceRequests
        }
    )
}



/* define and export a function names getRequests that returns a copy
/ of the requests state */

export const getRequests = () => {
    return database.requests.map(request => ({...request}))
}
