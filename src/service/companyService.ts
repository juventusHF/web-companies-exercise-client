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

// TODO (Exercise 8): send a POST request to BASE_URL with the company as JSON body.
//  Hint: look at how `getCompanies` uses `request`, and pass `{ method, body }` as second argument.
//  Use JSON.stringify to turn the object into a string.
export const createCompany = (company: CompanyInput): Promise<Company> =>
  Promise.reject(new Error(`createCompany not implemented yet (${company.name})`))

// TODO (Exercise 8): send a PUT request to `${BASE_URL}/<id>` with the company as JSON body.
//  Use encodeURIComponent(id) when putting the id into the URL.
export const updateCompany = (id: string, company: CompanyInput): Promise<Company> =>
  Promise.reject(new Error(`updateCompany not implemented yet (${id}, ${company.name})`))

// TODO (Exercise 8): send a DELETE request to `${BASE_URL}/<id>` (no body needed).
export const deleteCompany = (id: string): Promise<void> =>
  Promise.reject(new Error(`deleteCompany not implemented yet (${id})`))
