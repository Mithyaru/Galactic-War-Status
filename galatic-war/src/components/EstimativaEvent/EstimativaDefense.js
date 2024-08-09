const EstimativaDefense = ({ planetCampanhas, planetSnapshot }) => {
    if (planetSnapshot.length === 0) {
        return <span>Waiting Data...</span>;
      }
    
      // console.log(planetSnapshot)
    
      const comparison = planetCampanhas.map((planetCampanha) => {
        const planetSnap = planetSnapshot.find((p) => p.id === planetCampanha.id);
    
        if (!planetSnap) {
          return null;
        }
    
        const progressoCampanha = planetCampanha.planet.event.maxHealth - planetCampanha.planet.event.health;
        const progressoSnapshot = planetSnap.planet.event.maxHealth - planetSnap.planet.event.health;
    
        const diffProgresso = progressoCampanha - progressoSnapshot;
        
        const calculo = (progresso, Max) => {
            const porcentagem = (progresso/Max) * 100
            const porHora = porcentagem * 12
            return porHora.toFixed(2)
          }
    
        return (
          <div key={planetCampanha.id}>
            {calculo(diffProgresso, planetCampanha.planet.event.maxHealth) + '% / HOUR'}
          </div>
        );
      });
    
      return <div>{comparison}</div>;
    };


export default EstimativaDefense;
