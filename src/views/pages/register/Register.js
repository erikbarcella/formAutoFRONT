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

  const handleRegister = async () => {
    try {
      if (userData.password !== userData.confirmPassword) {
        setAlert({ color: 'danger', message: 'As senhas não coincidem' });
        return;
      }
      const response = await registerUser(userData);
      setAlert({ color: 'success', message: 'Usuário registrado com sucesso' });
      // Limpar os campos após o registro
      setUserData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      let message = 'Erro ao registrar usuário';
      if (error.data.error) message += ` ${error.data.error}`;
      setAlert({ color: 'danger', message: `${message}` });
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
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                    <CFormInput
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      placeholder="Insira seu nome"
                      autoComplete="name"
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
