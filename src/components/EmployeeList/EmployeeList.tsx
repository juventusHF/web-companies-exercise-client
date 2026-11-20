import type { Employee } from '../../model/Employee'
import common from '../../styles/common.module.css'
import styles from './EmployeeList.module.css'
// TODO (Exercise 3): import the EmployeeItem component

interface Props {
  employees: Employee[]
}

function EmployeeList({ employees }: Props) {
  // TODO (Exercise 3): if there are no employees, return
  //  <p className={common.muted}>No employees.</p> instead of the table

  return (
    <table className={styles.employees}>
      <thead>
        <tr>
          <th>Employee</th>
          <th className={styles.salary}>Salary</th>
        </tr>
      </thead>
      <tbody>
        {/* TODO (Exercise 3): render one <EmployeeItem> per employee.
            Don't forget the `key` prop! */}
        <tr>
          <td colSpan={2} className={common.muted}>
            TODO: {employees.length} employee(s) to render
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default EmployeeList
