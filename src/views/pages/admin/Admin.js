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
import {
	cilCheckCircle,
	cilPowerStandby,
	cilPencil,
	cilLockLocked,
	cilPin,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import api from '../../../services/api'
import { right } from '@popperjs/core'

const Admin = () => {

	let [users, setUsers] = useState([]);
	const { logout } = useAuth();
	const [alert, setAlert] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const formatDate = isoString => new Date(isoString).toLocaleString('pt-BR', { timeZone: 'UTC', hour12: false }).replace(',', ' -').slice(0, -3);
	const isUserOnline = (lastActive) => {
		let lastActiveDate = new Date(lastActive);
		lastActiveDate.setHours(lastActiveDate.getHours() + 3);
		lastActiveDate.toTimeString('pr-BR', { timeZone: 'UTC', hour12: false });
		const now = new Date()
		const fiveMinutesInMilliseconds = 5 * 60 * 1000;
		let status = now - lastActiveDate < fiveMinutesInMilliseconds ? true : false
		return status;
	};

	useEffect(() => {
		async function fetchUsers() {
			try {
				const response = await api.get('/user');
				if (response.data.users) {
					setUsers(response.data.users);
					// let filteredUsers = response.data.users.filter(user => user.roles.includes('manage_users'));
					// setUsers(filteredUsers);
				}
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
			} finally { setIsLoading(false); }
		}
		fetchUsers();
	}, [logout]);

	const sortUsersByOnlineStatus = (users) => {
		return [...users].sort((a, b) => {
			const onlineA = isUserOnline(a.lastActive);
			const onlineB = isUserOnline(b.lastActive);
			if (onlineA !== onlineB) return onlineB - onlineA; // Usuários online primeiro
			if (a.isApproved !== b.isApproved) return b.isApproved - a.isApproved; // Usuários aprovados primeiro
			return 0; // Manter ordem original se online e isApproved forem iguais
		});
	};
	const sortedUsers = sortUsersByOnlineStatus(users);

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
						<CTable color="auto" hover responsive="md">
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

								{sortedUsers.map((user, index) => (
									<CTableRow key={index}>
										<CTableHeaderCell scope="row">{isUserOnline(user.lastActive) ? <CIcon icon={cilCheckCircle} className="text-success" /> : <CIcon icon={cilPowerStandby} className="text-danger" />}</CTableHeaderCell>
										<CTableDataCell>{user.name}</CTableDataCell>
										<CTableDataCell>{user.email}</CTableDataCell>
										<CTableDataCell>{user.isApproved ? <CIcon icon={cilCheckCircle} className="text-success" /> : <CIcon icon={cilPowerStandby} className="text-danger" />}</CTableDataCell>
										<CTableDataCell>{user.roles.join(', ')}</CTableDataCell>
										<CTableDataCell>{formatDate(user.lastActive)}</CTableDataCell>
										<CTableDataCell>
											<CDropdown variant="btn-group" style={{ float: 'right' }}>
												<CDropdownToggle color="success" size="sm">Opções</CDropdownToggle>
												<CDropdownMenu>
													{/* BOTAO DE SALVAR AS INFOS OU  EXCLUIR O USUARIO */}
													<CDropdownItem href="#"><CIcon icon={cilPencil}/>Editar</CDropdownItem>
													<CDropdownItem href="#"><CIcon icon={cilPin}/>Alterar senha</CDropdownItem>
													<CDropdownItem href="#"><CIcon icon={cilLockLocked}/>Bloquear Acesso</CDropdownItem>
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