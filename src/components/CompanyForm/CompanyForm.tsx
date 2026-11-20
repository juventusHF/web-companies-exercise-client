import { useState, type FormEvent } from 'react'
import type { CompanyInput } from '../../model/Company'
import common from '../../styles/common.module.css'
import styles from './CompanyForm.module.css'

interface Props {
  initial?: CompanyInput
  submitLabel: string
  onSubmit: (company: CompanyInput) => Promise<void>
  onCancel: () => void
}

// Salary is kept as a string while editing so the input can be empty
interface EmployeeDraft {
  name: string
  salary: string
}

const emptyCompany: CompanyInput = {
  name: '',
  address: { street: '', number: '', city: '', country: '' },
  employees: [],
}

function CompanyForm({ initial = emptyCompany, submitLabel, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initial.name)
  const [address, setAddress] = useState(initial.address)
  // TODO (Exercise 6): add the remaining setter (`setEmployees`) so the list can be changed
  const [employees] = useState<EmployeeDraft[]>(
    initial.employees.map((e) => ({ name: e.name, salary: String(e.salary) })),
  )
  // TODO (Exercise 7): add the remaining setters (`setError`, `setSaving`)
  const [error] = useState<string | null>(null)
  const [saving] = useState(false)

  const updateAddress = (field: keyof CompanyInput['address'], value: string) =>
    setAddress((a) => ({ ...a, [field]: value }))

  // TODO (Exercise 6): write a function `updateEmployee(index, field, value)` that returns a new
  //  employees array where only the employee at `index` has `field` set to `value`.
  //  Hint: use `.map((e, i) => ...)` and the spread operator, like `updateAddress` above.

  const handleSubmit = async (event: FormEvent) => {
    // TODO (Exercise 7):
    //  - prevent the default browser form submission (it would reload the page!)
    //  - reset `error` and set `saving` to true
    //  - call `onSubmit` with a CompanyInput built from the state:
    //      * trim all strings
    //      * convert each employee's salary back to a number
    //  - if `onSubmit` throws, show the error message in `error`
    //  - finally set `saving` back to false
    console.log('TODO: submit', event, onSubmit, name, address, employees)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>

      <fieldset>
        <legend>Address</legend>
        <div className={styles.row}>
          <label className={styles.grow}>
            Street
            <input
              value={address.street}
              onChange={(e) => updateAddress('street', e.target.value)}
              required
            />
          </label>
          {/* TODO (Exercise 5): add a controlled "Number" input (use className={styles.small}
              on the label) following the "Street" example above */}
        </div>
        <div className={styles.row}>
          {/* TODO (Exercise 5): add controlled "City" and "Country" inputs
              (use className={styles.grow} on the labels) */}
        </div>
      </fieldset>

      <fieldset>
        <legend>Employees</legend>
        {employees.length === 0 && <p className={common.muted}>No employees yet.</p>}
        {/* TODO (Exercise 6): render one row (<div className={styles.row}>) per employee with:
             - a controlled "Name" input (label className={styles.grow})
             - a controlled "Salary" input of type="number", min="0", step="any"
               (label className={styles.small})
             - a "Remove" button (type="button", className={common.danger}) that removes
               this employee from the list (hint: `.filter((_, i) => i !== index)`) */}
        <button
          type="button"
          // TODO (Exercise 6): append a new empty employee { name: '', salary: '' } to the list
          onClick={() => {}}
        >
          + Add employee
        </button>
      </fieldset>

      {error && <p className={common.error}>{error}</p>}

      <div className={common.actions}>
        <button type="submit" className={common.primary} disabled={saving}>
          {saving ? 'Saving…' : submitLabel}
        </button>
        <button type="button" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default CompanyForm
