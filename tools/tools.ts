export function generateRandomSalary(digits: number): string {

  const min_value: number = Math.pow(10, digits - 1);
  const max_value: number = Math.pow(10, digits) - 1;

  let randomSalary = Math.floor(Math.random() * (max_value - min_value + 1)) + min_value;

  randomSalary = Math.round(randomSalary / 500) * 500

  const convertSalary = randomSalary.toLocaleString('en-US', { minimumIntegerDigits: 1 });

  return convertSalary.replace(',', ' ')

}