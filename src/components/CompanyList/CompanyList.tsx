import { useState } from 'react'
import type { Company } from '../../model/Company'
import CompanyItem from '../CompanyItem/CompanyItem'
import styles from './CompanyList.module.css'

interface Props {
  companies: Company[]
  onEdit: (company: Company) => void
  onDelete: (company: Company) => void
}

function CompanyList({ companies, onEdit, onDelete }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <ul className={styles.companyList}>
      {companies.map((company) => {
        const expanded = expandedId === company.id
        return (
          <CompanyItem
            key={company.id}
            company={company}
            expanded={expanded}
            onToggle={() => setExpandedId(expanded ? null : company.id)}
            onEdit={() => onEdit(company)}
            onDelete={() => onDelete(company)}
          />
        )
      })}
    </ul>
  )
}

export default CompanyList
