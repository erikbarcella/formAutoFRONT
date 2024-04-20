import React, { useState } from 'react';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import registerUser from './../../../services/registerUser';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [alert, setAlert] = useState(null);

  // Função para lidar com o envio do formulário
  const handleRegister = async () => {
    try {
      // Verificar se as senhas coincidem
      if (userData.password !== userData.confirmPassword) {
        setAlert({ color: 'danger', message: 'As senhas não coincidem' });
        return;
      }
      // Chamar a função de registro com os dados do usuário
      const response = await registerUser(userData);
      // Se o registro for bem-sucedido, configurar o alerta de sucesso
      setAlert({ color: 'success', message: 'Usuário registrado com sucesso' });
      // Limpar os campos após o registro
      setUserData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      // Se ocorrer um erro, configurar o alerta de erro
      setAlert({ color: 'danger', message: 'Erro ao registrar usuário. Por favor, tente novamente.' });
    }
  };

  // Função para atualizar o estado com os dados do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Registre-se</h1>
                  <p className="text-body-secondary">Crie sua conta</p>
                  {alert && (
                    <CAlert color={alert.color}>
                      {alert.message}
                    </CAlert>
                  )}
                     <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      type="password"
                      placeholder="Senha"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="confirmPassword"
                      value={userData.confirmPassword}
                      onChange={handleChange}
                      type="password"
                      placeholder="Confirme sua senha"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={handleRegister}>
                      Criar conta
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
