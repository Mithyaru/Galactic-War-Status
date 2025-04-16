import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/campanha/Card";
import Header from "./components/Header/Header";



function App() {
  const [campanhas, setCampanhas] = useState([]);
  const [snapshot, setSnapshot] = useState([]);

  const apiCall = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_BACKEND);
      console.log("atualizando")
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
        console.log(data)
        setCampanhas(data.atual);
        setSnapshot(data.historico)
      }
    }
    fetchData()
    const interval = setInterval(() => {
      fetchData();
    }, 60000);
    return () => clearInterval(interval);
  }, [])


  // const click = async () => {
  //   const dataPlanets = await planetsCall();
  //   if (dataPlanets) {
  //     setPlanets(dataPlanets);
  //   }
  //   console.log(planetsCall);
  //   const data = await apiCall();
  //   if (data) {
  //     setCampanhas(data);
  //     setCue(true);
  //   }
  // };


  console.log(campanhas, snapshot);


  return (
    <div className="App">
      <Header></Header>
      <div className="page">
        {campanhas.length !== 0 ? (
          <div className="campanhas">
            <span className="campanhasTitle">ON GOING CAMPAINGS</span>
            <Card campanhas={campanhas} snapshot={snapshot}></Card>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
