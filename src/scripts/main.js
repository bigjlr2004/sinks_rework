import { SinkRepair } from "./SinkRepair.js"
import { fetchData } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener( "stateChanged", customEvent => {render()})

const render = () => {
    fetchData("requests"). then(() => 
    fetchData("plumbers")).then(() => 
    fetchData("completions")).then(() => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
  
}

render()

