import type { Company, CompanyInput } from '../model/Company'

const BASE_URL = '/api/companies'

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`${res.status} ${res.statusText}${text ? `: ${text}` : ''}`)
  }
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export const getCompanies = () => request<Company[]>(BASE_URL)

export const createCompany = (company: CompanyInput) =>
  request<Company>(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(company),
  })

export const updateCompany = (id: string, company: CompanyInput) =>
  request<Company>(`${BASE_URL}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(company),
  })

export const deleteCompany = (id: string) =>
  request<void>(`${BASE_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' })
