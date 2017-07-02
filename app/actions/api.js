export const baseUrl = __DEV__ ?
  'https://disposable.superserious.co' :
  // 'https://superserious.ngrok.io' :
  'https://disposable.superserious.co';

export default function request(path, options = {}) {
  if( path[0] != '/' ) path = `/${path}`;
  if( options.body && typeof options.body !== 'string' ) {
    options.body = JSON.stringify(options.body)
  }

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
