import { Button,FormControl,InputLabel,MenuItem,Select,TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"
import ITag from "../../../interfaces/Itag"

const FormularioPrato = () => {

	const [nomePrato, setNomePrato] = useState('')
	const [descricao, setDescricao] = useState('')
	const [tag, setTag] = useState('')
	const [restaurante, setRestaurante] = useState('')
	const [imagem, setImagem] = useState<File | null>(null)
	
	const [tags, setTags] = useState<ITag[]>([])
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

	useEffect(() => {
		http.get< { tags: ITag[] } >('tags/')
			.then(resposta => setTags(resposta.data.tags))
		http.get<IRestaurante[]>('restaurantes/')
			.then(resposta => setRestaurantes(resposta.data))
	},[])

	const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.files?.length) {
			setImagem(event.target.files[0])
		} else {
			setImagem(null)
		}
	}

	const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData()
		
		formData.append('nome', nomePrato)
		formData.append('descricao', descricao)
		formData.append('tag', tag)
		formData.append('restaurante', restaurante)
		if(imagem) {
			formData.append('imagem', imagem)
		}
		
		http.request({
			url: 'pratos/',
			method: 'POST',
			headers:{
				'Content-Type': 'multipart/form-data'
			},
			data: formData
		})
			.then(() => alert('Prato cadastrado com sucesso!'))
			.catch(erro => console.log(erro))
	}

	return (
		<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
			<Typography component="h1" variant="h6"> Formulário de Pratos </Typography>
			<Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmitForm}>
				{/* Campo nome */}
				<TextField
					value={nomePrato}
					onChange={event => setNomePrato(event.target.value)}
					label="Nome do Prato"
					variant="standard"
					fullWidth
					required
					margin="dense"
				/>
				{/* Campo descrição */}
				<TextField
					value={descricao}
					onChange={event => setDescricao(event.target.value)}
					label="Descrição do Prato"
					variant="standard"
					fullWidth
					required
					margin="dense"
				/>
				{/* Campo tag */}				
				<FormControl margin="dense" fullWidth>
					<InputLabel id="select-tag">Tag</InputLabel>
					<Select labelId="select-tag" value={tag} onChange={event => setTag(event.target.value)}>
						{tags.map(tag => 
						<MenuItem key={tag.id} value={tag.value}>
							{tag.value}
						</MenuItem>)}
					</Select>
				</FormControl>
				{/* Campo restaurante */}				
				<FormControl margin="dense" fullWidth>
					<InputLabel id="select-restaurante">Restaurante</InputLabel>
					<Select labelId="select-restaurante" value={restaurante} onChange={event => setRestaurante(event.target.value)}>
						{restaurantes.map(restaurante => 
						<MenuItem key={restaurante.id} value={restaurante.id}>
							{restaurante.nome}
						</MenuItem>)}
					</Select>
				</FormControl>
				{/* Campo imagem */}
				<input type="file" onChange={selecionarArquivo}/>
				
				
				<Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Salvar</Button>
			</Box>
		</Box>
	)
}

export default FormularioPrato