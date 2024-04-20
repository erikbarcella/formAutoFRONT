// Register.js

import React, { useState } from 'react';
import {
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
import registerUser from './../../../services/registerUser'; // Importar a função de registro

const Register = () => {
  // Estado para os dados do formulário
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Função para lidar com o envio do formulário
  const handleRegister = async () => {
    try {
      // Verificar se as senhas coincidem
      if (userData.password !== userData.confirmPassword) {
        alert('As senhas não coincidem');
        return;
      }

      // Chamar a função de registro com os dados do usuário
      const response = await registerUser(userData);

      // Se o registro for bem-sucedido, você pode lidar com a resposta aqui
      console.log('Usuário registrado com sucesso:', response);
      alert('Usuário registrado com sucesso!');
      
      // Limpar os campos após o registro
      setUserData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error.message);
      alert('Erro ao registrar usuário. Por favor, tente novamente.');
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
                  <h1>Register</h1>
                  <p className="text-body-secondary">Crie sua conta</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      placeholder="Nome"
                      autoComplete="username"
                    />
                  </CInputGroup>
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
