export const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

export const getRandomInteger = (max: number): number => {
  return Math.floor(Math.random() * max);
}

export const getIncompleteFields = (
  values: any,
  requiredFields: any
): IncompleteField[] => {
  // Checks if values are all filled and puts an empty string if they aren't
  // (so firebase doesn't complain)
  let incompleteFields = [];
  Object.entries(requiredFields).forEach(([field, name]) => {
    if (
      !(field in values) ||
      values[field] === undefined ||
      values[field] === "" ||
      values[field] === false
    ) {
      values[field] = "";
      incompleteFields.push({ field, name });
    }
  });
  return incompleteFields;
};
