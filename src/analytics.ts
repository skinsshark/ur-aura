import ReactGA from 'react-ga4';

export const trackCustomEvent = (eventName: string) => {
  console.log('asdf');
  ReactGA.event({
    category: 'user-action',
    action: eventName,
  });
};
