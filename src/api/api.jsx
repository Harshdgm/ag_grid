import axios from "axios";
import { generateDiabetesData } from "../utils/generateDiabetesData";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

const olympicapi = axios.create({
  baseURL: "https://www.ag-grid.com/example-assets/",
});

export const fetchData = async()=>{
//     const res = await api.get(`/diabetes`);
//     return {
//     status: res.status, 
//     data: res.data      
//   }; 
    const res = { status: 200, data: generateDiabetesData() };
    return res;
}

// fetch individual data -----
export const fetchInvData =async (id)=>{
    try{
       const res = await api.get(`posts/${id}`);
       return res.status===200?res.data : [];
    }catch(error){
        console.log(error);
    }
}

// Game related data -----
export const fetchGamesData = async()=>{
    const res = await api.get(`/Games`);
    return {
    status: res.status, 
    data: res.data      
  }; 
}

//olympic game api data -------------
export const fetchOlympicWinners = async () => {
   try {
    const res = await olympicapi.get("olympic-winners.json");
    return res.data;
  } catch (error) {
    console.error("Axios Olympic API Error:", error);
    throw error;
  }
};

export const fetchOlympicData = async () => {
   try {
    const res = await olympicapi.get("olympic-winners.json");
    return res.data;
  } catch (error) {
    console.error("Axios Olympic API Error:", error);
    throw error;
  }
};
