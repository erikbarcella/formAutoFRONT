import {
	CAlert,
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
	const [alert, setAlert] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchUsers() {
			try {
				const response = await api.get('/user');
				console.log(response.data)
				if (response.data.users) setUsers(response.data.users);

			} catch (err) {
				let message = 'Erro ao buscar usúarios ';
				if (err.response && err.response.data.message) {
					message += `, ${err.response.data.message}`;
					setAlert({ color: 'danger', message: `${message}` });
				}
				if (err.response && err.response.data.status == '401') {
					message = 'Faça login novamente token expirado!'
					setAlert({ color: 'danger', message: `${message}` });
					err.response.data.logout == true ? setTimeout(logout, 5000) : ''// 3 seconds timeout to logout
				}
				console.log("err admin ", err.response.data)
			} finally {setIsLoading(false);}
		}
		fetchUsers();
	}, [logout]);

	return (
		<CCol xs={12}>
			<CCard className="mb-4">
				<CCardHeader>
					<br />
					<strong>Gerenciar usúarios</strong>
					{/* <small>Hoverable rows</small> */}
				</CCardHeader>
				<CCardBody>
					<p className="text-body-secondary small">
						Utilize o botão de ação para configurar os usúarios.
					</p>
					{alert && (
						<CAlert color={alert.color}>
							{alert.message}
						</CAlert>
					)}
					{isLoading ? (
						<div className="text-center">Carregando...</div>
					) : (
						<CTable color="auto" hover striped responsive="md">
							<CTableHead align="middle">
								<CTableRow>
									<CTableHeaderCell scope="col">Online</CTableHeaderCell>
									<CTableHeaderCell scope="col">Nome</CTableHeaderCell>
									<CTableHeaderCell scope="col">Email</CTableHeaderCell>
									<CTableHeaderCell scope="col">Status</CTableHeaderCell>
									<CTableHeaderCell scope="col">Permissões</CTableHeaderCell>
									<CTableHeaderCell scope="col">Visto por último</CTableHeaderCell>
									<CTableHeaderCell scope="col">Action</CTableHeaderCell>
								</CTableRow>
							</CTableHead>
							<CTableBody align="middle">
								{users.map((user, index) => (
									<CTableRow key={index}>
										<CTableHeaderCell scope="row">1</CTableHeaderCell>
										<CTableDataCell>{user.name}</CTableDataCell>
										<CTableDataCell>{user.email}</CTableDataCell>
										<CTableDataCell>{user.active ? 'Ativo' : 'Inativo'}</CTableDataCell>
										<CTableDataCell>{user.roles.join(', ')}</CTableDataCell>
										<CTableDataCell>{user.lastActive}</CTableDataCell>
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
								))}
							</CTableBody>
						</CTable>
					)}
				</CCardBody>
			</CCard>
		</CCol>
	)
}

export default Admin;