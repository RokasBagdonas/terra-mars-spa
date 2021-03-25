export function objectToDictionary(obj: object) {
  let dict = {};
  for (let prop in obj) {
    dict[prop] = obj[prop];
    console.log(prop);
  }
  return dict;
}
