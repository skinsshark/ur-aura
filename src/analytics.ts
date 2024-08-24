import ReactGA from 'react-ga4';

export const trackCustomEvent = (eventName: string) => {
  ReactGA.event({
    category: 'user-action',
    action: eventName,
  });
};
