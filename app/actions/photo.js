'use strict'

import {baseUrl} from './api'

export function uploadPhoto(groupId, photo) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      var body = new FormData();

      body.append('photo', {uri: `file://${photo.uri}`, name: 'photo.jpg', type: 'image/jpeg'});

      var xhr = new XMLHttpRequest;
      xhr.onreadystatechange = (e) => {
        if( xhr.readyState !== 4 ) { return; }

        if( 200 <= xhr.status && xhr.status <= 299 ) {
          console.warn(xhr.responseText, xhr.status)
          let json;
          try {
            json = JSON.parse(xhr.responseText);
          } catch(err) {
            return reject(err)
          }
          return resolve(json)
        } else if( xhr.status === 0 ){
          reject(new Error('Sync failed. You might not be connected to the internet?'))
        } else {
          reject(xhr.status + ': ' + xhr.responseText);
        }
      }
      xhr.open('POST', `${baseUrl}/albums/${groupId}/photos`);
      xhr.send(body);
    }).catch((err) => {
      throw err
    })
  }
}
