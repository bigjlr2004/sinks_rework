import { getRequests, getPlumbers, sendCompletion, getCompletions } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})
const completeElements =(request) => {
    const completions = getCompletions()
    const completionSet = completions.find(complete => complete.requestId === request.id)
    if(completionSet) {
    const plumbers = getPlumbers();
    
   
    return `<li> <div class="completion_row">
    ${request.description}

    
</select>
    <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>

  </div>  </li>`
}
}


const requestToListElement = (request) => {
    const completions = getCompletions()
    const completionSet = completions.find(complete => complete.requestId === request.id)
    if(!completionSet) {
    const plumbers = getPlumbers();
    
   
    return `<li class=request_row>
    <div id="test">
    ${request.description}
    </div>
    <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${
        plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
</select>
    <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>

  </li>`
}}



export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul id="myul">
            ${
                requests.map(
                    (request) => {
                        return requestToListElement(request)
                    }
                ).join("")
            }
        </ul>
    `

    return html
}

export const Completions = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(
                    (request) => {
                        return completeElements(request)
                    }
                ).join("")
            }
        </ul>
    `

    return html
}


mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
                const completion ={ 
                    requestId: parseInt(requestId),
                    plumberId: parseInt(plumberId),
                    date_created: Date.now

                }
                
         
          sendCompletion(completion)
        
        }
    }
)