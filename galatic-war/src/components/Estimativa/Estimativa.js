const Estimativa = ({ planetCampanhas, planetSnapshot }) => {
  if (planetSnapshot.length === 0) {
    return <span>Aguardando dados...</span>;
  }

  console.log(planetSnapshot)

  const comparison = planetCampanhas.map((planetCampanha) => {
    const planetSnap = planetSnapshot.find((p) => p.id === planetCampanha.id);

    if (!planetSnap) {
      return null;
    }

    const progressoCampanha = planetCampanha.planet.maxHealth - planetCampanha.planet.health;
    const progressoSnapshot = planetSnap.planet.maxHealth - planetSnap.planet.health;

    const diffProgresso = progressoCampanha - progressoSnapshot;
    
    const calculo = (progresso, Max) => {
        const porcentagem = (progresso/Max) * 100
        const porHora = porcentagem * 12
        return porHora.toFixed(2)
      }

      const calculoEnemy = (progresso, Max) => {
        const porcentagem = (progresso / Max) * 100
        const porcentagemHora = porcentagem * 60 * 60
        return porcentagemHora.toFixed(2)
      }

      // const calculoFinal = ((calculoEnemy(planetCampanha.planet.regenPerSecond, planetCampanha.planet.maxHealth) - calculo(diffProgresso, planetCampanha.planet.maxHealth))).toFixed(2)
      // console.log(calculoFinal)

      if(calculo(diffProgresso, planetCampanha.planet.maxHealth) < calculoEnemy(planetCampanha.planet.regenPerSecond, planetCampanha.planet.maxHealth)) {
        // console.log('humanos perdendo em ' + planetCampanha.planet.name)
        return (
          <span>{(calculo(diffProgresso, planetCampanha.planet.maxHealth) - calculoEnemy(planetCampanha.planet.regenPerSecond, planetCampanha.planet.maxHealth)).toFixed(2) + '% / HORA'}</span>
        )
      } else {
        // console.log('humanos ganhando em ' + planetCampanha.planet.name)
        return (
        <span> {calculo(diffProgresso, planetCampanha.planet.maxHealth)  + '% / HORA'}</span>
      )
      }
  });

  return <div>{comparison}</div>;
};

export default Estimativa;
