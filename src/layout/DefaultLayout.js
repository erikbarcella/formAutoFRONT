import React,{useEffect} from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import api from '../services/api'
// import { useAuth } from '../context/AuthContext'

const DefaultLayout = () => {
  useEffect(() => {
    const intervalId = setInterval(sendHeartbeat, 300000); // Envia um heartbeat a cada 5 minutos
    sendHeartbeat(); // Envia um heartbeat imediatamente ao montar o componente
    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente desmontar
}, []);

  return (
    
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout

const sendHeartbeat = async () => {
  try {
    let res = await api.post('/user/update/status');
    console.log(res.data)
  } catch (error) {
      console.error('Error updating user status', error);
  }
};