let baseUrl = staticConfig.baseUrl;
const GetServiceUrl = () => {
  // console.log("baseUrl", baseUrl);
  let serviceUrl = "";
  if (import.meta.env.VITE_IsMock !== "1") {
    if (baseUrl !== "") {
      serviceUrl = baseUrl;
    } else {
      serviceUrl = import.meta.env.VITE_SERVE_URL;
    }
  }
  return serviceUrl;
};
export { baseUrl, GetServiceUrl };
