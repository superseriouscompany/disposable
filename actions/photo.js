'use strict'

import {baseUrl} from './api'

export function uploadPhoto(photo) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      var body = new FormData();

      body.append('photo', {uri: `file://${photo.uri}`, name: 'photo.jpg', type: 'image/jpeg'});

      var xhr = new XMLHttpRequest;
      xhr.onreadystatechange = (e) => {
        if( xhr.readyState !== 4 ) { return; }

        if( xhr.status < 299 ) {
          console.warn(xhr.responseText)
          const json = JSON.parse(xhr.responseText);
          return resolve(json)
        } else {
          reject(xhr.status + ': ' + xhr.responseText);
        }
      }
      xhr.open('POST', `${baseUrl}/photos`);
      xhr.send(body);
    }).then(() => {
      console.warn('Uploaded.')
    }).catch((err) => {
      console.error(err)
      alert(err.message)
    })
  }
}
