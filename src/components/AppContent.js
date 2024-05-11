import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { useAuth } from '../context/AuthContext';
// routes config
import routes from '../routes'

// Implementar estrategia de AUTH
const AppContent = () => {
  const { user } = useAuth();

  const isAuthorized = (route) => {
    if (!route.allowedRoles || route.allowedRoles.length === 0) {
      // Se não há roles definidas, a rota é acessível por padrão
      return true;
    }
    // Verifique se o usuário tem pelo menos uma das roles permitidas
    return user && user.roles && route.allowedRoles.some(role => user.roles.includes(role));
  };

  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
        {routes.map((route, idx) => {
            if (route.element && isAuthorized(route)) {
              return (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              );
            } else {
              // Exibe uma mensagem ou alerta para o usuário sem permissão
              return (
                <Route
                  key={idx}
                  path={route.path}
                  element={<UnauthorizedPage />}
                />
              );
            }
            return null;
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}
const UnauthorizedPage = () => {
  return (
    <div>
      <h1>Você não tem permissão para acessar esta página.</h1>
      {/* Aqui você pode exibir uma mensagem mais detalhada ou instruções */}
    </div>
  );
};
export default React.memo(AppContent)
