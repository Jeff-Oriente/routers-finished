/* global $ */
'use strict';

const api = {

  // search: function (query, callback) {
  //   $.ajax({
  //     type: 'GET',
  //     url: '/api/notes/',
  //     dataType: 'json',
  //     data: query,
  //     success: callback
  //   });
  // },
////////updated Promise search //////
  search: function (query) {
    return $.ajax({
      type: 'GET',
      url: '/api/notes/',
      dataType: 'json',
      data: query
    });
  },
  ///////updated Promise search above cause return//////


  
  // details: function (id, callback) {
  //   $.ajax({
  //     type: 'GET',
  //     dataType: 'json',
  //     url: `/api/notes/${id}`,
  //     success: callback
  //   });
  // },
  /////////////////////updated Promise for details below///////
  details: function (id) {
    return $.ajax({
      type: 'GET',
      dataType: 'json',
      url: `/api/notes/${id}`
    });
  },


  //////////////////////update Promise for details///////

  // update: function (id, obj, callback) {
  //   $.ajax({
  //     type: 'PUT',
  //     url: `/api/notes/${id}`,
  //     contentType: 'application/json',
  //     dataType: 'json',
  //     data: JSON.stringify(obj),
  //     success: callback
  //   });
  // },
///////////////////update Promise now /////////
update: function(id, obj){
  return $.ajax({
    type: 'PUT',
    url: `/api/notes/${id}`,
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(obj),
  });
},


///////////////////////////////////////

  // create: function (obj, callback) {
  //   $.ajax({
  //     type: 'POST',
  //     url: '/api/notes',
  //     contentType: 'application/json',
  //     dataType: 'json',
  //     processData: false,
  //     data: JSON.stringify(obj),
  //     success: callback
  //   });
  // },

  //////////////////doing create Promise now/////////
  create: function (obj) {
    return $.ajax({
      type: 'POST',
      url: '/api/notes',
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      data: JSON.stringify(obj)
    });
  },
  /////////////////////////////////////


//   remove: function (id, callback) {
//     return $.ajax({
//       type: 'DELETE',
//       url: `/api/notes/${id}`,
//       dataType: 'json',
//       success: callback
//     });
//   }
// };

///////////////Doing Remove Promise now ////////////
  remove: function (id) {
    return $.ajax({
      type: 'DELETE',
      url: `/api/notes/${id}`,
      dataType: 'json'
    });
  }

};