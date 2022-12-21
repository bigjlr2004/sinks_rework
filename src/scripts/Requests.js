import { getData, deleteRequest, sendData } from "./dataAccess.js"

const convertPlumbers = (data) => {
    const plumbers = getData("plumbers")
    return `
    <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${
        plumbers.map(
            plumber => {
                return `<option value="${data.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
    </select>`
}
const convertCompletion = (data) => {
    const completed = getData("completions")
     const completionSet = completed.find(complete => complete.requestId === data.id)
    if(completionSet){
    return `<li class="request-row" id="completion">${data.description}
            <button class="request__delete"
                id="request--${data.id}">Delete
            </button></li>`
}}

const convertItems = (data) => {
    const completed = getData("completions")
     const completionSet = completed.find(complete => complete.requestId === data.id)
    if(!completionSet){
    return `<li class="request-row request"><div class="description">${data.description}</div>
            ${convertPlumbers(data)}
            <button class="request__delete"
                id="request--${data.id}">Delete
            </button></li>`
}}

export const Requests = () => {
    const requests = getData("requests")
    let html = `
        <ul class="request-ul">
            ${requests.map(request => convertItems(request)).join("")}
            ${requests.map(request => convertCompletion(request)).join("")}
        </ul>
    `
    return html
}


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
     if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})
mainContainer.addEventListener("change",(event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            const dataToSendToAPI = {
                plumberId: parseInt(plumberId),
                requestId: parseInt(requestId),
                dateCompleted: Date.now()
            }
            sendData(dataToSendToAPI,"completions")
        }
        }
)
