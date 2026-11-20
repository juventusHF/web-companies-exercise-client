import type { Employee } from '../../model/Employee'
import common from '../../styles/common.module.css'
import EmployeeItem from '../EmployeeItem/EmployeeItem'
import styles from './EmployeeList.module.css'

interface Props {
  employees: Employee[]
}

function EmployeeList({ employees }: Props) {
  if (employees.length === 0) {
    return <p className={common.muted}>No employees.</p>
  }

  return (
    <table className={styles.employees}>
      <thead>
        <tr>
          <th>Employee</th>
          <th className={styles.salary}>Salary</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, i) => (
          <EmployeeItem key={i} employee={employee} />
        ))}
      </tbody>
    </table>
  )
}

export default EmployeeList
