const GetServiceUrl = () => {
  // console.log("baseUrl222");
  let serviceUrl = "";
  if (import.meta.env.VITE_IsMock !== "1") {
      serviceUrl = import.meta.env.VITE_SERVE_URL_ENERGY;
  }
  return serviceUrl;
};
export { GetServiceUrl };
