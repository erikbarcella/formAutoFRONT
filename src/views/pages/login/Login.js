import React,{ useState } from 'react'
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
  const {user,login,isAuthenticated} = useAuth();
  
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
      console.log("response", response)
      login(response.user,response.user.token)
      window.location.href = '/#/dashboard';
      setAlert({ color: 'success', message: 'Login bem sucedido' });
      // Limpar os campos após o registro
      setFormData({
        username: '',
        password: '',
      });
    } catch (error) {
      console.log("error", error)
      let message = 'Erro durante o login';
      if (error.data.error) message += ` ${error.data.error}`;
      setAlert({ color: 'danger', message: `${message}` });
    }
  };


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
                        <CButton color="link" className="px-0">
                          Esqueceu a senha?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
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
