const files = require('./files');
const shortid = require('shortid');



class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }



  save(object) {
    object.id = shortid.generate();
    const serialObject = JSON.stringify(object);
    const fileName = `./${this.folder}/${object.id}.json`;
    return files.writeFile(fileName, serialObject)
      .then(() => {
        return object;
      })
      .catch(err => {
        console.log('***ERROR:', err);
      });
  }
  

  get(id) {
    const filepath = `./${this.folder}/${id}.json`;
    return files.readFile(filepath)
      .then((contents) => {
        console.log(JSON.parse(contents));
        return JSON.parse(contents);
      })
      .catch(err => {
        console.log('***ERROR:', err);
      });
  }

  getAll() {
    return files.readdir(this.folder)
      .then((filesArray) => {
        // console.log(filesArray);
        return Promise.all(
          filesArray.map(file => {
            return this.get(file.substring(0, file.length - 5));
          }));
      })
      .catch(err => { console.log(err); });
  }
}




module.exports = DocumentCollection;


