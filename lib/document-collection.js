const files = require('./files');
const shortid = require('shortid');

// use npm to find a module for creating ids


class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }



  save(object) {
    // TODO:
    // 1. assign an id
    object.id = shortid.generate();
      // 2. serialize object
    const serialObject = JSON.stringify(object);
      // 3. use promisified fs to write to folder path using id.json as file name
    const fileName = `./${object.id}.json`;
      // 4. "return" object (which now has an id)
    return files.writeFile(fileName, serialObject)
      .then(() => {
        return object;
      })
      .catch(err => {
        console.log('***ERROR:', err);
      });
  }
  

  get(id) {
    const filepath = `./${id}.json`;
    return files.readFile(filepath)
      .then((contents) => {
        return JSON.parse(contents);
      })
      .catch(err => {
        console.log('***ERROR:', err);
      });
  }

  getAll() {
    // TODO:
    // 1. read folder file names
    // 2. use Promise.all and map each file name to a this.get call (remove .json file extension!)
    // 3. "return" array of objects
    // 4. if expected, turn promisified fs errors into meaningful database errors
  }
}

module.exports = DocumentCollection;


