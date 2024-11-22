import { analysisApi, analysisKompApi, GeneralApi } from "./Api";

export const MakeRequestForManangee = (controller, channel, einheit , Desc) => {
    const url = `${GeneralApi}${controller}/${channel}/${einheit}/${Desc}`;
    console.log("Request URL:", url); 
    return fetch(url)
        .then(response => response.json()) 
        .then(data => {
            return data; 
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            throw error; 
        });
};


export const VonBisRequest = (controller, channel, einheit ,von,bis,RowNUM) => {
    const url = `${analysisApi}${controller}/${channel}/${einheit}/${von}/${bis}/${RowNUM}`;
    console.log("this is the url:", url); 
    return fetch(url)
        .then(response => response.json()) 
        .then(data => {
            return data; 
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            throw error; 
        });
};

export const VonBisKompRequest = (controller, channel, einheit ,von,bis,RowNUM) => {
    const url = `${analysisKompApi}${controller}/${channel}/${einheit}/${von}/${bis}/${RowNUM}`;
    console.log("this is the url:", url); 
    return fetch(url)
        .then(response => response.json()) 
        .then(data => {
            return data; 
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            throw error; 
        });
};