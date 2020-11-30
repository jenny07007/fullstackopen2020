const calculateBmi = (h: number, w: number) => {
  const bmi = w / (h/100) ** 2;
  if (bmi < 18.5) {
    console.log("Underweight")
  } else if (bmi >= 18.5 && bmi < 25) {
    console.log("Normal (Healthy Weight)")
  } else if (bmi >= 25 && bmi < 30) {
    console.log("Overweight")
  } else {
    console.log("Obese")
  }
}

const h: number = Number(process.argv[2])
const v: number = Number(process.argv[3])

calculateBmi(h, v)