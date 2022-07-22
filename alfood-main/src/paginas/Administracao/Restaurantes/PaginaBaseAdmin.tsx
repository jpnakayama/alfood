import { AppBar, Button, Container, Link, Paper, TextField, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Link as RouterLink } from 'react-router-dom'

const PaginaBaseAdmin = () => {

	return (
		<>
			<AppBar position='static'>
				<Container maxWidth='xl'>
					<Toolbar>
						<Typography variant='h6'>
							Administração
						</Typography>
						<Box sx={{ display: 'flex', flexGrow: 1 }}>
							<Link component={RouterLink} to='/admin/restaurantes'>
								<Button sx={{ my: 2, mx: 2, color: 'white' }}>
									Restaurantes
								</Button>
							</Link>
							<Link component={RouterLink} to='/admin/restaurantes/novo'>
								<Button sx={{ my: 2, mx: 2, color: 'white' }}>
									Novo restaurante
								</Button>
							</Link>
							<Link component={RouterLink} to='/admin/pratos'>
								<Button sx={{ my: 2, mx: 2, color: 'white' }}>
									Pratos
								</Button>
							</Link>
							<Link component={RouterLink} to='/admin/pratos/novo'>
								<Button sx={{ my: 2, mx: 2, color: 'white' }}>
									Novo prato
								</Button>
							</Link>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<Box>
				<Container maxWidth="lg" sx={{ mt: 1 }}>
					<Paper sx={{ p: 2 }}>
						<Outlet />
					</Paper>
				</Container>
			</Box>
		</>
	)
}

export default PaginaBaseAdmin