const TimeProgress = ({ startTime, endTime }) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const now = new Date();

  const totalTime = end - start;

  const elapsedTime = now - start;
  const progress = (elapsedTime / totalTime) * 100;

  const progressPercentage = Math.min(100, Math.max(0, progress));


  return (
    <>

        {progressPercentage.toFixed(2)}%

    </>
  );
};

export default TimeProgress;
