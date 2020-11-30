interface outputs {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercisesC = (days: Array<number>, t: number): outputs => {
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

interface Args {
  target: number
  hours: number[]
}

const parseArguments = (args: Array<string>) : Args => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const hours = args.slice(3).map(h => Number(h));

  const over24 = hours.some(h => h > 24);
  if (over24) throw new Error("meh!!! Wish I have more than 24hrs a day as well!")

  return {
    target, hours
  };
};

try {
  const {target, hours} = parseArguments(process.argv);
console.log(calculateExercisesC(hours, target));
} catch (error) {
  console.log(error);
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))