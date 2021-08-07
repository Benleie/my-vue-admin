import axios from 'axios'

export function fetchTableData(query) {
  return axios.get('http://localhost:3333/score', { params: query })
}
