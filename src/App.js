import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PrivateRoute } from "./routes/privateRoutes";
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
// LAZY PARA CARREGAMENTO LENTO 
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Forgot = React.lazy(() => import('./views/pages/forgot/Forgot'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          ROTAS QUE SERÃO RENDERIZADAS FORA DO CONTAINER COM ESTILO PROPRIO
          {/* <Route exact path="/login" name="Login Page" element={<Login />} /> */}
          {/* <Route exact path="/register" name="Register Page" element={<Register />} /> */}
          {/* <Route exact path="/forgotPassword" name="Forgot Password Page" element={<Forgot />} /> */}
          {/* <Route exact path="/404" name="Page 404" element={<Page404 />} /> */}
          <Route path="/500" name="Page 500" element={<Page500 />} />
        {/* ROUTE PRIVATE EXAMPLE FOR NEED TO AUTH ON APP
        AQUI PODERIA RENDERIZAR UM LAYOUT PARA O ADMIN E OUTRO PARA OS DEMAIS USUARIOS  */}
          {/* <Route path="*" name="App Home"  element={ <PrivateRoute> <DefaultLayout /> </PrivateRoute> } />  */}
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
