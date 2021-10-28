const {
  getDoc
} = require('firebase/firestore');

async function hydrate(dataArray) {
  const result = [];
  for (const ref of dataArray) {
    const dataDoc = await getDoc(ref);
    result.push(dataDoc.data());
  }
  return result;
}

module.exports = {hydrate}
