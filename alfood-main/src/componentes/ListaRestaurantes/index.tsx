import { Box, Button, FormControl, InputLabel, MenuItem, NativeSelect, Select, TextField } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { IParametrosBusca } from '../../interfaces/IParametrosBusca';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';


const ListaRestaurantes = () => {
  
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')

  const [busca, setBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('')

  // agora, o carregarDados recebe opcionalmente opções de configuração do axios
  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {

    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  // a cada busca, montamos um objeto de opções
  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const opcoes = {
      params: {

      } as IParametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca
    }
    if (ordenacao) {
      opcoes.params.ordering = ordenacao
    }
    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes)
  }

  useEffect(() => {
    // obter restaurantes
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>

      <form onSubmit={buscar}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          margin: 3
        }}>
          <TextField sx={{margin: 1}} id="outlined-basic" label="Restaurante" variant="outlined" value={busca} onChange={evento => setBusca(evento.target.value)} />
          <FormControl >
            <InputLabel id="select-ordenacao">Ordenação</InputLabel>
            <Select
              labelId="select-ordenacao"
              id="select-ordenacao"
              value={ordenacao}
              label="Padrão"
              onChange={evento => setOrdenacao(evento.target.value)}
              sx={{minWidth: 140}}
            >
              <MenuItem value="">Padrão</MenuItem>
              <MenuItem value="id">Por ID</MenuItem>
              <MenuItem value="nome">Por Nome</MenuItem>
            </Select>
          </FormControl>
          <Button sx={{margin: 1, background: 'gray'}} variant='contained' type='submit'>buscar</Button>
        </Box>
      </form>

      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
   
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: 3
      }}>
        <Button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior} sx={{color: 'darkgray', mx: 5}}>
          Página Anterior
        </Button>
        <Button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina} sx={{color: 'darkgray', mx: 5}}>
          Próxima página
        </Button>
      </Box>
    </section>)
}

export default ListaRestaurantes

/* 

A lista de restaurantes foi substituída por uma resposta gerada através da solicitação feita à API utilizando o axios (axios.get)

A resposta é exibida com o preenchimento da variável setRestaurantes.

*/

/*<div>
  <label htmlFor="select-ordenacao">Ordenação</label>
  <select
    name="select-ordenacao"
    id="select-ordenacao"
    value={ordenacao}
    onChange={evento => setOrdenacao(evento.target.value)}
  >
    <option value="">Padrão</option>
    <option value="id">Por ID</option>
    <option value="nome">Por Nome</option>
  </select>
</div>*/