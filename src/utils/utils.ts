/**
 * get the server url
 * we need it to connect to the parse server or an server side api (ex: via axios)
 * NOTE: this function should be called after defining the window.LOCAL, window.PREPROD, window.PROD first
 * @returns
 */
export const getServerUrl = (): string => {
  if ((window as any).LOCAL) {
    const SERVER_PORT = 8088;
    const location = window.location;
    return location.protocol + '//' + location.hostname + ':' + SERVER_PORT;
  }

  if ((window as any).PREPROD) {
    return 'https://preprod-url.com';
  }

  return 'https://prod-url.com';
};
