interface outputs {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export const calculateExercises = (days: Array<number>, t: number): outputs => {
  const numberOfDays = days.length;
  const numberOfTrainingDays = days.filter(d => d !== 0).length;
  const avg = days.reduce((p,c) => p + c, 0)  / numberOfDays;
  const isSuccess = avg > t ? true : false;
  const ratingMetric = avg <= 1 ? 1 : avg <= 2 ? 2 : 3;
  const desc = ratingMetric === 1 ? 'need some work' : ratingMetric === 2 ? 'not too bad' : 'excellent';

  return {
    periodLength: numberOfDays,
    trainingDays: numberOfTrainingDays,
    success: isSuccess,
    rating: ratingMetric,
    ratingDescription: desc,
    target: t,
    average: avg,
  };
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));