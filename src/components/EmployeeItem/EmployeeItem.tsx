import type { Employee } from '../../model/Employee'
import styles from './EmployeeItem.module.css'

interface Props {
  employee: Employee
}

const salaryFormat = new Intl.NumberFormat('de-CH', { maximumFractionDigits: 2 })

function EmployeeItem({ employee }: Props) {
  return (
    <tr>
      <td>{employee.name}</td>
      <td className={styles.salary}>{salaryFormat.format(employee.salary)} CHF</td>
    </tr>
  )
}

export default EmployeeItem
