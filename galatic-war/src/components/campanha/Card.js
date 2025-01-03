import Estimativa from "../Estimativa/Estimativa";
import TimeProgress from "../defenseTimeSpan/timeProgress";
import AttackProgress from "../attackTimeSpan/attackProgress";
import "./Card.css";
import EstimativaDefense from "../EstimativaEvent/EstimativaDefense.js";
import PrevisaoEvent from "../Previsao/Previsao.js";
import PrevisaoNoEvent from "../Previsao/PrevisaoNoEvent.js";
import AutomatonImg from "../../Assets/automaton.png";
import TerminidImg from "../../Assets/terminid.png";
import IlluminateImg from "../../Assets/illuminate.png";

const Card = ({ campanhas, snapshot }) => {
  const getClassName = (currentOwner) => {
    switch (currentOwner) {
      case "Automaton":
        return "cardAut";
      case "Terminids":
        return "cardTer";
      case "Illuminate":
        return "cardIllu";
      default:
        return "card";
    }
  };

  const getIcon = (currentOwner) => {
    switch (currentOwner) {
      case "Automaton":
        return AutomatonImg;
      case "Terminids":
        return TerminidImg;
      case "Illuminate":
        return IlluminateImg;
      default:
        return "card";
    }
  };

  const calculo = (Max, Now) => {
    const progresso = Max - Now;
    const porcentagem = (progresso / Max) * 100;
    return porcentagem.toFixed(2);
  };

  const calculoEnemy = (Max, Pr) => {
    const porcentagem = (Pr / Max) * 100;
    const porcentagemHora = porcentagem * 60 * 60;
    return porcentagemHora.toFixed(2);
  };

  const sortedCampanhas = campanhas
    .slice()
    .sort((a, b) => a.planet.health - b.planet.health);

  const sortedCampanhasFiltro = sortedCampanhas
    .slice()
    .sort(
      (a, b) =>
        b.planet.statistics.playerCount - a.planet.statistics.playerCount
    );

  const nonNullEvents = sortedCampanhasFiltro.filter(
    (item) => item.planet.event !== null
  );
  const nullEvents = sortedCampanhasFiltro.filter(
    (item) => item.planet.event === null
  );

  const sortedEvent = nonNullEvents
    .slice()
    .sort(
      (a, b) =>
        a.planet.event.maxHealth -
        a.planet.event.health -
        b.planet.event.maxHealth -
        b.planet.event.health
    );

  const filteredCampanhas = [...sortedEvent, ...nullEvents];

  return (
    <>
      {filteredCampanhas.length !== 0 ? (
        <>
          <div className="containerCards">
            <div className="scrollEffect">
              {filteredCampanhas.map((item, index) => (
                <div key={index} className="cardContainer">
                  {item.planet.event === null ? (
                    <>
                      <div className={getClassName(item.planet.currentOwner)}>
                        <div className="cardHeader">
                          <div className="headerLeft">
                            <div className="headerLeftEsquerda">
                              <div>{item.planet.name + " "}</div>
                              <div>{"Sector: " + item.planet.sector + " "}</div>
                            </div>
                            <div className="headerLeftDireita">
                              <img
                                alt=""
                                src={getIcon(item.planet.currentOwner)}
                                width={25}
                              ></img>
                            </div>
                          </div>
                          <div className="headerRigth">
                            <div>{item.planet.biome.name + " "}</div>
                            <div className="hazards">
                              {item.planet.hazards.map((hazard, index) => (
                                <span key={index}>{hazard.name + " "}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* <div className="separador">
                        {" "}
                        ----------------------------------------------------------------------------------------{" "}
                      </div> */}
                        <div className="cardContent">
                          <div className="lines">
                            <span>LIBERATION:</span>
                            <span>
                              {calculo(
                                item.planet.maxHealth,
                                item.planet.health
                              ) + "%"}
                            </span>
                          </div>
                          <div className="lines">
                            <span>LIBERATION RATE:</span>
                            <Estimativa
                              planetCampanhas={[item]}
                              planetSnapshot={snapshot}
                            ></Estimativa>
                          </div>
                          <div className="lines">
                            <span>PREDICTION</span>
                            <span>
                              <PrevisaoNoEvent
                                planetCampanhas={[item]}
                                planetSnapshot={snapshot}
                              ></PrevisaoNoEvent>
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="indStats">
                            <div>
                              {"Enemy progress: " +
                                calculoEnemy(
                                  item.planet.maxHealth,
                                  item.planet.regenPerSecond
                                ) +
                                "%"}
                            </div>
                            <div>
                              {"Players: " + item.planet.statistics.playerCount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={getClassName(item.planet.event.faction)}>
                        <div className="cardHeader">
                          <div className="headerLeft">
                            <div className="headerLeftEsquerda">
                              <div>{item.planet.name + " "}</div>
                              <div>{"Sector: " + item.planet.sector + " "}</div>
                            </div>
                            <div className="HeaderLeftDireita">
                              <img
                                alt=""
                                src={getIcon(item.planet.event.faction)}
                                width={25}
                              ></img>
                            </div>
                          </div>
                          <div className="headerRigth">
                            <div>{item.planet.biome.name + " "}</div>
                            <div className="hazards">
                              {item.planet.hazards.map((hazard, index) => (
                                <span>{hazard.name + " "}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="cardContent">
                          <div className="lines">
                            <div className="defend">
                              <span>DEFENSE: </span>
                              <span>
                                {calculo(
                                  item.planet.event.maxHealth,
                                  item.planet.event.health
                                ) + "%"}
                              </span>
                            </div>
                            <div className="attack">
                              <span>ENEMYS: </span>
                              <span>
                                <TimeProgress
                                  startTime={item.planet.event.startTime}
                                  endTime={item.planet.event.endTime}
                                ></TimeProgress>
                              </span>
                            </div>
                          </div>
                          <div className="lines">
                            <span>DEFENSE RATE</span>
                            <EstimativaDefense
                              planetCampanhas={[item]}
                              planetSnapshot={snapshot}
                            ></EstimativaDefense>
                          </div>
                          <div className="lines">
                            <span>PREDICTION</span>
                            <span>
                              <PrevisaoEvent
                                planetCampanhas={[item]}
                                planetSnapshot={snapshot}
                                startTime={item.planet.event.startTime}
                                endTime={item.planet.event.endTime}
                              ></PrevisaoEvent>
                            </span>
                          </div>
                        </div>
                        <div className="indStats">
                          <div>
                            <span>Enemy progress{": "} </span>
                            <AttackProgress
                              startTime={item.planet.event.startTime}
                              endTime={item.planet.event.endTime}
                            ></AttackProgress>
                          </div>
                          <div>
                            {"Players: " + item.planet.statistics.playerCount}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Card;
