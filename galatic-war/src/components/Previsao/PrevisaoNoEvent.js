const PrevisaoNoEvent = ({ planetCampanhas, planetSnapshot }) => {

    if (planetSnapshot.length === 0) {
        return <span>Aguardando dados...</span>;
      }
      
      const comparison = planetCampanhas.map((planetCampanha) => {
        const planetSnap = planetSnapshot.find((p) => p.id === planetCampanha.id);
    
        if (!planetSnap) {
          return null;
        }
    
        const progressoCampanha =
          planetCampanha.planet.maxHealth -
          planetCampanha.planet.health;
        const progressoSnapshot =
          planetSnap.planet.maxHealth - planetSnap.planet.health;
    
        const diffProgresso = progressoCampanha - progressoSnapshot;
        // console.log(progressoCampanha)
        // console.log(progressoSnapshot)
        // console.log(diffProgresso)
    
        const calculo = (progresso, Max) => {
          const porcentagem = (progresso / Max) * 100;
    
          const porHora = porcentagem * 12;
    
          return porHora.toFixed(2);
        };
    
    
        const calculoDef = (Max, Now) => {
          const progresso = Max - Now;
          const porcentagem = (progresso / Max) * 100;
          return porcentagem.toFixed(2);
        };
    
    
        // console.log(calculo(diffProgresso, planetCampanha.planet.maxHealth))
        const prediction = (100 - calculoDef(planetCampanha.planet.maxHealth, planetCampanha.planet.health)) / calculo(diffProgresso, planetCampanha.planet.maxHealth)
        const predictionTime = prediction.toFixed(2)
        // console.log(predictionTime)
    
        const totalHours = Math.floor(predictionTime); // Parte inteira são as horas
    const minutes = Math.round((predictionTime - totalHours) * 60); // Parte decimal convertida para minutos
    
    // Calcula dias, horas e minutos
    const days = Math.floor(totalHours / 24); // Dias completos
    const hours = totalHours % 24; // Horas restantes
    
    // Resultado formatado
    let result = "";
    
    if (days > 0) {
        result += `${days} dia${days > 1 ? 's' : ''} `;
    }
    if (hours > 0) {
        result += `${hours} hora${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
        result += `${minutes} minuto${minutes > 1 ? 's' : ''}`;
    } 
    
    result = result.trim();
    // console.log(result)
    // console.log(calculoDef(planetCampanha.planet.maxHealth, planetCampanha.planet.health))
    // console.log(planetCampanha.planet.maxHealth - planetCampanha.planet.health)
   
    
    
        
        if (
              calculo(diffProgresso, planetCampanha.planet.maxHealth) > 0 && calculoDef(planetCampanha.planet.maxHealth, planetCampanha.planet.health) > 0
        ) {
          return (
            <>
              <div>{result}</div>
            </>
          );
        } else if (calculo(diffProgresso, planetCampanha.planet.maxHealth) < 0) {
            return (
            <>
            <div>
                LOSING GROUND
            </div>
            </>
            )
        }
        else {
          return (
            <>
              <div>STALEMATE</div>
            </>
          );
        }
      });
      return <>{comparison}</>;
}

export default PrevisaoNoEvent