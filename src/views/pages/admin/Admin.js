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

const Admin = () => {
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
										<CDropdownToggle color="primary" size="sm">Action</CDropdownToggle>
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

export default Admin