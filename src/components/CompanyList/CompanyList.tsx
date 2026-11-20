import type { Company } from '../../model/Company'
import CompanyItem from '../CompanyItem/CompanyItem'
import styles from './CompanyList.module.css'

interface Props {
  companies: Company[]
  onEdit: (company: Company) => void
  onDelete: (company: Company) => void
}

function CompanyList({ companies, onEdit, onDelete }: Props) {
  // TODO (Exercise 2a): add a state variable `expandedId` (string | null) that stores the id
  //  of the currently expanded company. At most one company should be expanded at a time.

  return (
    <ul className={styles.companyList}>
      {companies.map((company) => (
        <CompanyItem
          key={company.id}
          company={company}
          // TODO (Exercise 2a): `expanded` should be true if this company's id equals `expandedId`
          expanded={false}
          // TODO (Exercise 2a): toggle — collapse if this company is expanded, otherwise expand it
          onToggle={() => {}}
          onEdit={() => onEdit(company)}
          onDelete={() => onDelete(company)}
        />
      ))}
    </ul>
  )
}

export default CompanyList
