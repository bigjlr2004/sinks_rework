const mainContainer = document.querySelector("#container")
const applicationState = {

}

const API = "http://localhost:8088"

export const fetchData = (data) => {
    return fetch(`${API}/${data}`)
        .then(response => response.json())
        .then(
            (dataReturned) => {
                // Store the external state in application state
                applicationState[data] = dataReturned
            }
        )
}
export const getData = (data) => {
   return applicationState[data].map(arr =>({...arr}))
}

export const sendData = (data, where) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
   

    return fetch(`${API}/${where}`, fetchOptions)
        .then(response => response.json())
        .then(() => {
                mainContainer.dispatchEvent( new CustomEvent("stateChanged"))
        })
}
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}