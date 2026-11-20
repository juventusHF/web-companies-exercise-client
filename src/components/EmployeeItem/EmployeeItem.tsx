import type { Employee } from '../../model/Employee'
// TODO (Exercise 4): import the CSS module `./EmployeeItem.module.css` as `styles`

interface Props {
  employee: Employee
}

// TODO (Exercise 4): create an `Intl.NumberFormat` for 'de-CH' with at most 2 fraction digits
//  to format the salary (e.g. 85000 -> "85’000").

function EmployeeItem({ employee }: Props) {
  // TODO (Exercise 4): render one table row (<tr>) with two cells (<td>):
  //  - the employee's name
  //  - the formatted salary followed by " CHF" (use the `styles.salary` class to right-align it)
  return (
    <tr>
      <td>{employee.name}</td>
      <td>TODO</td>
    </tr>
  )
}

export default EmployeeItem
