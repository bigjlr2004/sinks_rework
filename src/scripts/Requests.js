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

const convertItems = (data) => {
    return `<li>${data.description}
            ${convertPlumbers(data)}
            <button class="request__delete"
                id="request--${data.id}">Delete
            </button></li>`
}

export const Requests = () => {
    const requests = getData("requests")
    let html = `
        <ul>
            ${requests.map(request => convertItems(request)).join("")}
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
                plumberId: plumberId,
                requestId: requestId,
                dateCompleted: Date.now()
            }
            sendData(dataToSendToAPI,"completions")
        }
        }
)
