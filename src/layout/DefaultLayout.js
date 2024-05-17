import React,{useEffect, useState} from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import api from '../services/api'
import {
	CAlert,
} from '@coreui/react'
import { useAuth } from '../context/AuthContext'

const DefaultLayout = () => {
  const [alert, setAlert] = useState(null);
  const { logout } = useAuth();
  useEffect(() => {
    const intervalId = setInterval(sendHeartbeat, 300000); // Envia um heartbeat a cada 5 minutos
    sendHeartbeat(); // Envia um heartbeat imediatamente ao montar o componente
    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente desmontar
}, []);

const sendHeartbeat = async () => {
  try {
    let res = await api.post('/user/update/status');
    console.log(res.data)
  } catch (err) {
    let message = 'Erro durante a sessão';
    if (err.response && err.response.data.message) {
      message += `, ${err.response.data.message}`;
      setAlert({ color: 'danger', message: `${message}` });
    }
    if (err.response && err.response.data.status == '401') {
      message = 'Faça login novamente token expirado!'
      setAlert({ color: 'danger', message: `${message}` });
      err.response.data.logout == true ? setTimeout(logout, 5000) : ''// 3 seconds timeout to logout
    }
  }
};

  return (
    
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        {alert && (
						<CAlert color={alert.color}>
							{alert.message}
						</CAlert>
					)}
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout

