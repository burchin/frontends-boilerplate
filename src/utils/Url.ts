const Url = {
  getQueryString: name => {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'); // 匹配目标参数
    const result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
    if (result != null) {
      return decodeURIComponent(result[2]);
    } else {
      return null;
    }
  },

  getDocumentUrl: () => {
    return `${location.protocol}//${location.host}${location.pathname}`;
  }
};

export default Url;
