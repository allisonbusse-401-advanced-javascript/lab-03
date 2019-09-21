const DocumentCollection = require('./lib/document-collection');

const documents = new DocumentCollection('./documents');
const objExample = { name: 'Allison' };
documents.save(objExample)
  .then(objExample => {
    console.log(objExample);
    documents.get(objExample.id)
      .then(returnedObjects => {
        console.log(returnedObjects);
      })
      .then(() => {
        documents.getAll()
          .then(res => {
            console.log(res);
          });
      });
  }
  );


