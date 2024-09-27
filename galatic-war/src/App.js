import "./App.css";
import Card from "./components/campanha/Card";
import Header from "./components/Header/Header";
import { ApiContext } from "./Context/ApiContext";
import { useContext } from "react";

function App() {
  // const [campanhas, setCampanhas] = useState([]);
  // // const [planets, setPlanets] = useState([]);
  // const [snapshot, setSnapshot] = useState([]);
  // const [cue, setCue] = useState(false);

  // // const planetsCall = async () => {
  // //   try {
  // //     const response = await axios.get("http://localhost:4000/planets");
  // //     return response.data;
  // //   } catch (error) {
  // //     console.error("Erro ao buscar dados da API", error);
  // //     return null;
  // //   }
  // // };

  // const apiCall = async () => {
  //   try {
  //     const response = await axios.get("https://galactic-war-tracker-deploy-server.vercel.app/campanhas");
  //     return response.data;
  //   } catch (error) {
  //     console.error("Erro ao buscar dados da API", error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await apiCall()
  //     console.log('data foi')
  //     if (data) {
  //       console.log('condição verdadeira')
  //       setCampanhas(data);
  //       setCue(true);
  //     }
      
  //   }
  //   fetchData()
  // }, [])


  // // const click = async () => {
  // //   const dataPlanets = await planetsCall();
  // //   if (dataPlanets) {
  // //     setPlanets(dataPlanets);
  // //   }
  // //   console.log(planetsCall);
  // //   const data = await apiCall();
  // //   if (data) {
  // //     setCampanhas(data);
  // //     setCue(true);
  // //   }
  // // };

  // useEffect(() => {
  //   if (cue) {
  //     const interval = setInterval(async () => {
  //       setSnapshot(campanhas);
  //       const newData = await apiCall();
  //       setCampanhas(newData);
  //     }, 300000);

  //     return () => clearInterval(interval);
  //   }
  // }, [cue, campanhas]);

  // console.log(campanhas, snapshot);
 

  const { campanhas, snapshot } = useContext(ApiContext)

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