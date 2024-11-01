import { GeneralApi } from "./Api";

export const MakeRequestForManangee = (controller, channel, einheit) => {
    return fetch(`${GeneralApi}${controller}/${channel}/${einheit}`)
        .then(response => response.json()) // Parse JSON from response
        .then(data => {
          
            return data; // Return data to be used elsewhere
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            throw error; // Propagate the error for further handling if needed
        });
};