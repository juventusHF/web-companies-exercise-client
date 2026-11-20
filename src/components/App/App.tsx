import { useState } from 'react'
import type { Company, CompanyInput } from '../../model/Company'
import CompanyForm from '../CompanyForm/CompanyForm'
import CompanyList from '../CompanyList/CompanyList'
import common from '../../styles/common.module.css'
import styles from './App.module.css'
// TODO (Exercise 1): import `useEffect` from 'react' and `getCompanies` from the company service
// TODO (Exercise 9): import `createCompany`, `updateCompany` and `deleteCompany` from the company service

type Mode = { kind: 'list' } | { kind: 'create' } | { kind: 'edit'; company: Company }

function App() {
  // TODO (Exercise 1): turn `companies`, `loading` and `error` into state variables with useState
  const companies: Company[] = []
  const loading = false
  const error: string | null = null
  const [mode, setMode] = useState<Mode>({ kind: 'list' })

  // TODO (Exercise 1): load the companies from the server when the component is first rendered
  //  - use useEffect with an empty dependency array
  //  - call getCompanies() and store the result in `companies`
  //  - if it fails, set `error` to "Could not load companies: <message>"
  //  - when done (success or failure), set `loading` to false

  const handleCreate = async (input: CompanyInput) => {
    // TODO (Exercise 9): create the company on the server, append the returned company
    //  to `companies` and go back to the list view
    console.log('TODO: create', input)
  }

  const handleUpdate = async (id: string, input: CompanyInput) => {
    // TODO (Exercise 9): update the company on the server, replace the matching company
    //  in `companies` with the returned one and go back to the list view
    console.log('TODO: update', id, input)
  }

  const handleDelete = async (company: Company) => {
    // TODO (Exercise 9): ask the user for confirmation with confirm(`Delete "<name>"?`),
    //  delete the company on the server and remove it from `companies`.
    //  If deleting fails, set `error` to "Could not delete company: <message>"
    console.log('TODO: delete', company)
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
