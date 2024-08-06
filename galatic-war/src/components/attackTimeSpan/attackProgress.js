const AttackProgress = ({ startTime, endTime }) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const totalTime = end - start;
  const totalHours = totalTime / (1000 * 60 * 60);
  const progressPerHour = 100 / totalHours;
  

  return (
    <>
      {progressPerHour.toFixed(2)}%
    </>
  );
};

export default AttackProgress;
