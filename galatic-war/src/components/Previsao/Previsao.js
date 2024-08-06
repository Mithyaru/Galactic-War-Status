const PrevisaoEvent = ({ planetCampanhas, planetSnapshot, startTime, endTime }) => {
  if (planetSnapshot.length === 0) {
    return <span>Aguardando dados...</span>;
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  const totalTime = end - start;
  const totalHours = totalTime / (1000 * 60 * 60);
  const progressPerHour = 100 / totalHours;

  const comparison = planetCampanhas.map((planetCampanha) => {
    const planetSnap = planetSnapshot.find((p) => p.id === planetCampanha.id);

    if (!planetSnap) {
      return null;
    }

    const progressoCampanha =
      planetCampanha.planet.event.maxHealth -
      planetCampanha.planet.event.health;
    const progressoSnapshot =
      planetSnap.planet.event.maxHealth - planetSnap.planet.event.health;

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


    // console.log(calculo(diffProgresso, planetCampanha.planet.event.maxHealth))
    const prediction = (100 - calculoDef(planetCampanha.planet.event.maxHealth, planetCampanha.planet.event.health)) / calculo(diffProgresso, planetCampanha.planet.event.maxHealth)
    const predictionTime = prediction.toFixed(2)
    // console.log(predictionTime)

    const totalHours = Math.floor(predictionTime); // Parte inteira são as horas
const minutes = Math.round((predictionTime - totalHours) * 60); // Parte decimal convertida para minutos


const days = Math.floor(totalHours / 24); // Dias completos
const hours = totalHours % 24; // Horas restantes


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



    
    if (
      calculo(diffProgresso, planetCampanha.planet.event.maxHealth) >
      progressPerHour
    ) {
      return (
        <>
          <div>{result}</div>
        </>
      );
    } else {
      return (
        <>
          <div>FALHANDO</div>
        </>
      );
    }
  });
  return <>{comparison}</>;
};

export default PrevisaoEvent;
