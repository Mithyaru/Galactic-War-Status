import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const ApiContext = createContext()

export const ApiProvider = ({ children }) => {
    const [campanhas, setCampanhas] = useState([]);
  // const [planets, setPlanets] = useState([]);
  const [snapshot, setSnapshot] = useState([]);
  const [cue, setCue] = useState(false);

  const apiCall = async () => {
    try {
      const response = await axios.get("https://galactic-war-tracker-deploy-server.vercel.app/campanhas");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiCall()
      console.log('data foi')
      if (data) {
        console.log('condição verdadeira')
        setCampanhas(data);
        setCue(true);
      }
      
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (cue) {
      const interval = setInterval(async () => {
        setSnapshot(campanhas);
        const newData = await apiCall();
        setCampanhas(newData);
      }, 300000);

      return () => clearInterval(interval);
    }
  }, [cue, campanhas]);

  console.log(campanhas, snapshot);

  return (
    <ApiContext.Provider value={{ campanhas, snapshot }}>
        {children}
    </ApiContext.Provider>
  )
}