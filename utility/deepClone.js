export default function deepClone(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  let newObject = {};
  if (Array.isArray(obj)) {
    newObject = obj.map(item => deepClone(item));
  } else {
    Object.keys(obj).forEach((key) => {
      return newObject[key] = deepClone(obj[key]);
    })
  };
  return newObject;
};