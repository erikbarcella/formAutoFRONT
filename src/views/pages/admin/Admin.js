import {
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
	CDropdown,
	CDropdownToggle,
	CDropdownMenu,
	CDropdownItem,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import api from '../../../services/api'

const Admin = () => {

	const [users, setUsers] = useState([]);
	const { logout } = useAuth();

	useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get('/user');
		console.log("carregando usuarios")
		console.log(response.data)
        if (response.data.users) {
          setUsers(response.data.users);
        }
      } catch (err) {
		console.log("err admin ", err)
        if (err.response && err.response.data === 'Unauthorized') {
          logout();
          return alert("Token expirado. Faça login novamente.");
        }
      } finally {
        // setLoading(false);	
      }
    }

    fetchUsers();
  }, [logout]);

	return (
		<CCol xs={12}>
			<CCard className="mb-4">
				<CCardHeader>
					<strong>Gerenciar usúarios</strong>
					{/* <small>Hoverable rows</small> */}
				</CCardHeader>
				<CCardBody>
					<p className="text-body-secondary small">
						Utilize o botão de ação para configurar os usúarios.
					</p>

					<CTable color="auto" hover>
						<CTableHead>
							<CTableRow>
								<CTableHeaderCell scope="col">Online</CTableHeaderCell>
								<CTableHeaderCell scope="col">Nome</CTableHeaderCell>
								<CTableHeaderCell scope="col">Email</CTableHeaderCell>
								<CTableHeaderCell scope="col">Status</CTableHeaderCell>
								<CTableHeaderCell scope="col">Action</CTableHeaderCell>
							</CTableRow>
						</CTableHead>
						<CTableBody>
							<CTableRow>
								<CTableHeaderCell scope="row">1</CTableHeaderCell>
								<CTableDataCell>Mark</CTableDataCell>
								<CTableDataCell>mark@gmail.com</CTableDataCell>
								<CTableDataCell>Ativo</CTableDataCell>
								<CTableDataCell>
									<CDropdown variant="btn-group">
										<CDropdownToggle color="success" size="sm">Action</CDropdownToggle>
										<CDropdownMenu>
											<CDropdownItem href="#">Action</CDropdownItem>
											<CDropdownItem href="#">Another action</CDropdownItem>
											<CDropdownItem href="#">Something else here</CDropdownItem>
										</CDropdownMenu>
									</CDropdown>
								</CTableDataCell>
							</CTableRow>
						</CTableBody>
					</CTable>

				</CCardBody>
			</CCard>
		</CCol>
	)
}

export default Admin;