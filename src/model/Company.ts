import type { Address } from './Address'
import type { Employee } from './Employee'

export interface Company {
  id: string
  name: string
  address: Address
  employees: Employee[]
}

export type CompanyInput = Omit<Company, 'id'>
