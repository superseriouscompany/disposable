export const baseUrl = __DEV__ ?
  'https://superserious.ngrok.io' :
  'https://disposable.superserious.co';

export default {
  request: function(path, options) {
    if( path[0] != '/' ) path = `/${path}`;
    return fetch(
      `${baseUrl}${path}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      },
    ).then((response) => {
      if( !response.ok ) { throw new Error('' + response.status) }
      if( response.status === 204 ) { return true }
      return response.json()
    })
  }
}
