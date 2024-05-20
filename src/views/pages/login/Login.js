import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import loginUser from './../../../services/loginUser';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {

  const [alert, setAlert] = useState(null);
  const {login, isAuthenticated, logout} = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await loginUser(formData);
      const userData = {...response.user}; 
      delete userData.token;
      login(userData, response.user.token);
      setAlert({ color: 'success', message: 'Login bem sucedido' });
      // Limpar os campos após o registro
      setFormData({
        username: '',
        password: '',
      });
      // Redirecionar para o dashboard após um curto atraso
      setTimeout(() => {
        window.location.href = '/#/dashboard';
      }, 2000);
    } catch (error) {
      console.log('handle login error', error);
      logout();
      let message = 'Erro durante o login';
      if (error.data.error) message += `, ${error.data.error}`;
      setAlert({ color: 'danger', message: `${message}` });
    }
  };
  
  
  useEffect(() => {
    if (isAuthenticated()) {
      // Aguardar 2 segundos antes de redirecionar para o dashboard
      const redirectTimeout = setTimeout(() => {
        setShouldRedirect(true);
      }, 1000);
      // Limpar o timeout ao desmontar o componente
      return () => clearTimeout(redirectTimeout);
    }
  }, [isAuthenticated]);
  
  useEffect(() => {
    if (shouldRedirect) {
      window.location.href = '/#/dashboard';
    }
  }, [shouldRedirect]);  

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    {alert && (
                    <CAlert color={alert.color}>
                      {alert.message}
                    </CAlert>
                  )}
                    <p className="text-body-secondary">Faça login em sua conta</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        < Link to="/forgotPassword">
                        <CButton color="link" className="px-0">
                          Esqueceu a senha?
                        </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" >
                <CCardBody className="text-center">
                  <div>
                    <h2>Registre-se</h2>
                    <p>
                      Se você não tem uma conta, registre-se agora e comece a usar nosso sistema
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Registre agora
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
