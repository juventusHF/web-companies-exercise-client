import { useEffect, useState } from 'react'
import { createCompany, deleteCompany, getCompanies, updateCompany } from '../../service/companyService'
import CompanyForm from '../CompanyForm/CompanyForm'
import CompanyList from '../CompanyList/CompanyList'
import type { Company, CompanyInput } from '../../model/Company'
import common from '../../styles/common.module.css'
import styles from './App.module.css'

type Mode = { kind: 'list' } | { kind: 'create' } | { kind: 'edit'; company: Company }

function App() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<Mode>({ kind: 'list' })

  useEffect(() => {
    let cancelled = false
    getCompanies()
      .then((list) => !cancelled && setCompanies(list))
      .catch(
        (err) =>
          !cancelled &&
          setError(`Could not load companies: ${err instanceof Error ? err.message : err}`),
      )
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [])

  const handleCreate = async (input: CompanyInput) => {
    const created = await createCompany(input)
    setCompanies((list) => [...list, created])
    setMode({ kind: 'list' })
  }

  const handleUpdate = async (id: string, input: CompanyInput) => {
    const updated = await updateCompany(id, input)
    setCompanies((list) => list.map((c) => (c.id === id ? updated : c)))
    setMode({ kind: 'list' })
  }

  const handleDelete = async (company: Company) => {
    if (!confirm(`Delete "${company.name}"?`)) return
    try {
      await deleteCompany(company.id)
      setCompanies((list) => list.filter((c) => c.id !== company.id))
    } catch (err) {
      setError(`Could not delete company: ${err instanceof Error ? err.message : err}`)
    }
  }

  if (mode.kind === 'create') {
    return (
      <main>
        <h1>New company</h1>
        <CompanyForm
          submitLabel="Create"
          onSubmit={handleCreate}
          onCancel={() => setMode({ kind: 'list' })}
        />
      </main>
    )
  }

  if (mode.kind === 'edit') {
    const { company } = mode
    return (
      <main>
        <h1>Edit company</h1>
        <CompanyForm
          initial={company}
          submitLabel="Save"
          onSubmit={(input) => handleUpdate(company.id, input)}
          onCancel={() => setMode({ kind: 'list' })}
        />
      </main>
    )
  }

  return (
    <main>
      <header className={styles.toolbar}>
        <h1>Companies</h1>
        <button className={common.primary} onClick={() => setMode({ kind: 'create' })}>
          + New company
        </button>
      </header>

      {error && <p className={common.error}>{error}</p>}
      {loading && <p className={common.muted}>Loading…</p>}
      {!loading && !error && companies.length === 0 && (
        <p className={common.muted}>No companies yet. Create the first one!</p>
      )}

      <CompanyList
        companies={companies}
        onEdit={(company) => setMode({ kind: 'edit', company })}
        onDelete={handleDelete}
      />
    </main>
  )
}

export default App
