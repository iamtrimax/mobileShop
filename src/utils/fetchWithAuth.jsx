const fetchWithAuth = async (url, options = {}) => {
    let accessToken = localStorage.getItem("token");
  
    let res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    });
  
    // Nếu token hết hạn (401), thử refresh
    if (res.status === 401) {
      const refreshRes = await fetch("http://localhost:3000/api/refresh-token", {
        method: "POST",
        credentials: "include" // để gửi cookie
      });
  
      const refreshData = await refreshRes.json();
            
      if (refreshData.accessToken) {
        localStorage.setItem("token", refreshData.accessToken);
  
        // Thử lại request ban đầu
        res = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${refreshData.accessToken}`,
          }
        });
      }
    }
  
    return res;
  };
  export default fetchWithAuth