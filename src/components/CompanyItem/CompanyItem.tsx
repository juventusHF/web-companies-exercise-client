import type { Company } from '../../model/Company'
import common from '../../styles/common.module.css'
import EmployeeList from '../EmployeeList/EmployeeList'
import styles from './CompanyItem.module.css'

interface Props {
  company: Company
  expanded: boolean
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
}

function CompanyItem({ company, expanded, onToggle, onEdit, onDelete }: Props) {
  const { street, number, city, country } = company.address

  return (
    <li className={styles.companyCard}>
      <div className={styles.companyHeader}>
        <button className={styles.toggle} onClick={onToggle} aria-expanded={expanded}>
          {expanded ? '▾' : '▸'} {company.name}
        </button>
        <span className={common.muted}>
          {city}, {country} · {company.employees.length} employee
          {company.employees.length === 1 ? '' : 's'}
        </span>
        <div className={`${common.actions} ${styles.headerActions}`}>
          <button onClick={onEdit}>Edit</button>
          <button className={common.danger} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>

      {expanded && (
        <div className={styles.companyDetails}>
          <p>
            {street} {number}, {city}, {country}
          </p>
          <EmployeeList employees={company.employees} />
        </div>
      )}
    </li>
  )
}

export default CompanyItem
