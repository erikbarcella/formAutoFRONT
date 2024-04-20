const getTokenLocal = () => {
    return localStorage.getItem('token');
  };
  
  const setTokenLocal = (token) => {
    localStorage.setItem('token', token);
  };
  
  const removeTokenLocal = () => {
    localStorage.removeItem('token');
  };
  
  
  export { getTokenLocal, setTokenLocal, removeTokenLocal};
  