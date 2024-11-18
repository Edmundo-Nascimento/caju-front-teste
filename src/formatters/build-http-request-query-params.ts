const buildHttpRequestQueryParams = params => {
  let queryParams = '';
  for (let key in params) {
    if (params[key] !== null && params[key] !== ' ' && params[key] !== '') {
      queryParams += `${key}=${params[key]}&`;
    }
  }
  return removeLastSignal(queryParams, queryParams.length);
};

const removeLastSignal = (queryParam, stringLength) => {
  return queryParam.slice(0, stringLength - 1);
};

export default buildHttpRequestQueryParams;
