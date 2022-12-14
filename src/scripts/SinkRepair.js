import { Requests, Completions } from "./Requests.js"
import { ServiceForm } from "./ServiceForm.js"


export const SinkRepair = () => {
    return `
        <h1>Maude and Merle's Sink Repair</h1>
        <section class="serviceForm">
        ${ServiceForm()}
        </section>

        
            <h2>Service Requests</h2>
            <section class="serviceRequests">
            <div class="request_header">
                <div>Description</div>
                <div class="completed_by_header">Completed By</div>
            </div>
            ${Requests()}
            ${Completions()}
        </section>
    `
}