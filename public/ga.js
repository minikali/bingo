export const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID; // Replace with your Measurement ID

export const pageview = (url) => {
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};
