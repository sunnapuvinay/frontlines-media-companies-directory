import axios from 'axios'
import type { Company } from '../types/Company'


const SOURCE = '/companies.json'

async function fetchRaw(): Promise<Company[]> {
  const res = await axios.get(SOURCE)
  const data = res.data
  if (Array.isArray(data)) return data as Company[]
  if (Array.isArray(data?.companies)) return data.companies as Company[]
  throw new Error('Unexpected companies.json format')
}

// fetch full list (with a small simulated delay for UX realism)
export async function fetchAllCompanies(simulatedDelay = 300): Promise<Company[]> {
  const companies = await fetchRaw()
  if (simulatedDelay > 0) await new Promise((r) => setTimeout(r, simulatedDelay))
  return companies
}

export default { fetchAllCompanies }
