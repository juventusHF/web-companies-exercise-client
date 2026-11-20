import type { Company } from '../../model/Company'
import common from '../../styles/common.module.css'
import styles from './CompanyItem.module.css'
// TODO (Exercise 2b): import the EmployeeList component

interface Props {
  company: Company
  expanded: boolean
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
}

function CompanyItem({ company, expanded, onToggle, onEdit, onDelete }: Props) {
  const { city, country } = company.address

  return (
    <li className={styles.companyCard}>
      <div className={styles.companyHeader}>
        <button className={styles.toggle} onClick={onToggle} aria-expanded={expanded}>
          {/* TODO (Exercise 2b): show '▾' when expanded and '▸' when collapsed */}
          {company.name}
        </button>
        <span className={common.muted}>
          {city}, {country}
          {/* TODO (Exercise 2b): append " · N employees" (use "employee" singular when N is 1) */}
        </span>
        <div className={`${common.actions} ${styles.headerActions}`}>
          <button onClick={onEdit}>Edit</button>
          <button className={common.danger} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>

      {/* TODO (Exercise 2b): only when `expanded` is true, render
          <div className={styles.companyDetails}> containing:
           - a <p> with the full address: "<street> <number>, <city>, <country>"
           - the <EmployeeList> for this company's employees */}
    </li>
  )
}

export default CompanyItem
