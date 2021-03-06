const express = require('express');
const router = express.Router();

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

// Get All (and search by query)

router.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;

//   notes.filter(searchTerm, (err, list) => {
//     if (err) {
//       return next(err);
//     }
//     res.json(list);
//   });
// });
//////////////////Making Filter promise//////
notes.filter(searchTerm)
  .then(list => {
    if(list){
      console.log(list);
      res.json(list);
    } else {
      next();
    }
  })
  .catch(err => {
    next(err);
  });
});

////////////////////////////////////////////

// Get a single item
router.get('/notes/:id', (req, res, next) => {
  const id = req.params.id;

  notes.find(id)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err)
    });
});

//Delete an item
router.delete('/notes/:id', (req, res, next) => {
    const id = req.params.id;
    // notes.delete(id, err => {
    //     if(err){
    //         return res.status(500) && next(err);
    //     }
    //     if(!err){
    //         return res.status(204).end();
    //     }
        
    // });
    /////////////////////////Creating Delete Promise ////////
    notes.delete(id)
      .then(item => {
        if(item){
          return res.status(204).end();
        }
      }) 
      .catch(err => {
        return res.status(500) && next(err);
      });
});

// Post (insert) an item
router.post('/notes', (req, res, next) => {
    const { title, content } = req.body;
  
    const newItem = { title, content };
    /***** Never trust users - validate input *****/
    if (!newItem.title) {
      const err = new Error('Missing `title` in request body');
      err.status = 400;
      return next(err);
    }
  
  //   notes.create(newItem, (err, item) => {
  //     if (err) {
  //       return next(err);
  //     }
  //     if (item) {
  //       res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
  //     } else {
  //       next();
  //     }
  //   });
  // });
  /////////////////////Create Promise Now //////////////
  notes.create(newItem)
    .then(item => {
      if(item) {
        res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
  });
    ////////////////////////////////////////////
// Put update an item
router.put('/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['title', 'content'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

//   notes.update(id, updateObj, (err, item) => {
//     if (err) {
//       return next(err);
//     }
//     if (item) {
//       res.json(item);
//     } else {
//       next();
//     }
//   });
// });
///////////////////////create update promise /////////////////////////
notes.update(id, updateObj)
  .then(item => {
    if(item) {
      res.json(item);
    } else {
      next();
    }
  })
  .catch(err => {
    next(err)
  });
  });
/////////////////////////////////////////////////////////

  module.exports=router;