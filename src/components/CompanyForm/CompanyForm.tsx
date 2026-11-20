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
  const [employees, setEmployees] = useState<EmployeeDraft[]>(
    initial.employees.map((e) => ({ name: e.name, salary: String(e.salary) })),
  )
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const updateAddress = (field: keyof CompanyInput['address'], value: string) =>
    setAddress((a) => ({ ...a, [field]: value }))

  const updateEmployee = (index: number, field: keyof EmployeeDraft, value: string) =>
    setEmployees((list) => list.map((e, i) => (i === index ? { ...e, [field]: value } : e)))

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setSaving(true)
    try {
      await onSubmit({
        name: name.trim(),
        address: {
          street: address.street.trim(),
          number: address.number.trim(),
          city: address.city.trim(),
          country: address.country.trim(),
        },
        employees: employees.map((e) => ({ name: e.name.trim(), salary: Number(e.salary) })),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setSaving(false)
    }
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
          <label className={styles.small}>
            Number
            <input
              value={address.number}
              onChange={(e) => updateAddress('number', e.target.value)}
              required
            />
          </label>
        </div>
        <div className={styles.row}>
          <label className={styles.grow}>
            City
            <input
              value={address.city}
              onChange={(e) => updateAddress('city', e.target.value)}
              required
            />
          </label>
          <label className={styles.grow}>
            Country
            <input
              value={address.country}
              onChange={(e) => updateAddress('country', e.target.value)}
              required
            />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Employees</legend>
        {employees.length === 0 && <p className={common.muted}>No employees yet.</p>}
        {employees.map((employee, index) => (
          <div className={styles.row} key={index}>
            <label className={styles.grow}>
              Name
              <input
                value={employee.name}
                onChange={(e) => updateEmployee(index, 'name', e.target.value)}
                required
              />
            </label>
            <label className={styles.small}>
              Salary
              <input
                type="number"
                min="0"
                step="any"
                value={employee.salary}
                onChange={(e) => updateEmployee(index, 'salary', e.target.value)}
                required
              />
            </label>
            <button
              type="button"
              className={common.danger}
              onClick={() => setEmployees((list) => list.filter((_, i) => i !== index))}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setEmployees((list) => [...list, { name: '', salary: '' }])}
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
