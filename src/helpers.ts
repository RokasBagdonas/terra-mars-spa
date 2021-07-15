export function objectToDictionary(obj: object) {
  let dict = {};
  for (let prop in obj) {
    dict[prop] = obj[prop];
  }
  return dict;
}
