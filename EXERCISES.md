# Exercises

In this exercise you will finish a small React app that manages **companies** and their
**employees**. The app talks to a REST backend
([web-companies-exercise-server](https://github.com/juventusHF/web-companies-exercise-server))
and supports the full CRUD cycle: list, create, edit and delete companies.

The project structure, styling, data model and most of the markup are already there. Your job
is to fill in the missing pieces. Every place you need to change is marked with a comment like:

```ts
// TODO (Exercise 3): ...
```

Tip: search the project for `TODO (Exercise` to find all of them.

## Setup

1. Start the backend server (see its README). It must run on `http://localhost:3000`.
2. In this project, run:

   ```sh
   npm install
   npm run dev
   ```

3. Open http://localhost:5173 in your browser.

The Vite dev server forwards every request to `/api/...` to the backend (see `vite.config.ts`),
so in the frontend you can simply fetch `/api/companies`.

Before you start, take a few minutes to look around:

- `src/model/` – the TypeScript types for `Company`, `Address` and `Employee`
- `src/service/companyService.ts` – functions that talk to the backend
- `src/components/` – one folder per component, each with a `.tsx` file and a CSS module

Component tree:

```
App
├── CompanyList
│   └── CompanyItem
│       └── EmployeeList
│           └── EmployeeItem
└── CompanyForm
```

Work through the exercises in order. After each one, check the result in the browser and run
`npm run lint` and `npm run build` to make sure there are no errors.

---

## Exercise 1 – Load the companies (`useState`, `useEffect`)

**File:** `src/components/App/App.tsx`

Right now the app always shows "No companies yet", because `companies` is just an empty array.

1. Turn `companies`, `loading` and `error` into state with `useState`.
   - `companies` starts as an empty array
   - `loading` starts as `true`
   - `error` starts as `null` (type `string | null`)
2. Use `useEffect` with an empty dependency array (`[]`) to load the data once when the
   component is first shown:
   - call `getCompanies()` from the service
   - on success, store the list in `companies`
   - on failure, set `error` to `Could not load companies: <message>`
   - in both cases, set `loading` to `false` at the end
3. **Bonus:** return a cleanup function from the effect that sets a `cancelled` flag, and only
   update the state if the effect was not cancelled. (Why could this matter? Hint: React's
   `StrictMode` runs effects twice in development.)

✅ **Check:** You see "Loading…" briefly, then the list of company names from the server. If
you stop the backend and reload, you see an error message.

---

## Exercise 2 – Expand and collapse a company (state, props, conditional rendering)

### 2a – Remember which company is expanded

**File:** `src/components/CompanyList/CompanyList.tsx`

1. Add a state variable `expandedId` of type `string | null`, starting at `null`.
2. Pass `expanded={true}` to a `CompanyItem` only if its `id` equals `expandedId`.
3. Implement `onToggle`: if the clicked company is already expanded, collapse it (set
   `expandedId` to `null`), otherwise expand it.

> Think about it: why does the state live in `CompanyList` and not in each `CompanyItem`?
> (Hint: only one company may be open at the same time.)

### 2b – Show the details

**File:** `src/components/CompanyItem/CompanyItem.tsx`

1. In the toggle button, show `▾` in front of the name when expanded and `▸` when collapsed.
2. After `city, country`, show the number of employees, e.g. ` · 3 employees`. Use the
   singular `employee` when there is exactly one.
3. Only when `expanded` is `true`, render a `<div className={styles.companyDetails}>` with:
   - a `<p>` containing the full address: `<street> <number>, <city>, <country>`
   - an `<EmployeeList>` with the company's employees (don't forget to import it)

✅ **Check:** Clicking a company name opens it and shows its address; clicking another one
closes the first. The employee table shows a placeholder row for now.

---

## Exercise 3 – Render a list (`map`, `key`)

**File:** `src/components/EmployeeList/EmployeeList.tsx`

1. If the `employees` array is empty, return `<p className={common.muted}>No employees.</p>`
   instead of the table (an *early return*).
2. Replace the placeholder row: use `employees.map(...)` to render one `<EmployeeItem>` per
   employee. Every element in a list needs a `key` prop.

> Think about it: the employees have no `id`. What could you use as `key`, and what are the
> drawbacks?

✅ **Check:** An expanded company shows one row per employee (the salary still shows "TODO").
A company without employees shows "No employees."

---

## Exercise 4 – Display data from props

**File:** `src/components/EmployeeItem/EmployeeItem.tsx`

1. Import the CSS module `./EmployeeItem.module.css` as `styles`.
2. Outside the component, create a number formatter:
   `new Intl.NumberFormat('de-CH', { maximumFractionDigits: 2 })`
3. In the second cell, show the formatted salary followed by ` CHF`, and give the cell the
   class `styles.salary` so it is right-aligned.

> Think about it: why is it better to create the formatter outside the component function?

✅ **Check:** Salaries are shown like `85’000 CHF`, aligned to the right.

---

## Exercise 5 – Controlled inputs

**File:** `src/components/CompanyForm/CompanyForm.tsx`

Click **+ New company** or **Edit** to see the form. The company name and street are already
implemented as *controlled inputs*: their `value` comes from state and `onChange` updates
that state.

1. Following the "Street" example, add the missing **Number** input (label class
   `styles.small`).
2. In the second row, add **City** and **Country** inputs (label class `styles.grow`).
3. All address fields are `required`.

Look closely at `updateAddress`: why do we create a new object with `{ ...a, [field]: value }`
instead of just writing `a[field] = value`?

✅ **Check:** When editing a company, all four address fields are pre-filled and you can type
in them.

---

## Exercise 6 – A dynamic list of inputs

**File:** `src/components/CompanyForm/CompanyForm.tsx`

The employees in the form are stored as `EmployeeDraft` objects – the salary is a `string` so
that the input can be empty while typing.

1. Add the setter `setEmployees` to the `employees` `useState` line.
2. Write a helper `updateEmployee(index, field, value)` that updates a single field of the
   employee at position `index`. Use `.map((e, i) => ...)` and create a new object for the
   changed employee (just like `updateAddress`).
3. Render one `<div className={styles.row}>` per employee containing:
   - a **Name** input (label class `styles.grow`, `required`)
   - a **Salary** input with `type="number"`, `min="0"`, `step="any"`
     (label class `styles.small`, `required`)
   - a **Remove** button (`type="button"`, class `common.danger`) that removes this employee.
     Hint: `list.filter((_, i) => i !== index)`
4. Make the **+ Add employee** button append a new empty employee `{ name: '', salary: '' }`.

> Why do the buttons need `type="button"`? What happens without it?

✅ **Check:** You can add, edit and remove employee rows in the form.

---

## Exercise 7 – Submitting the form

**File:** `src/components/CompanyForm/CompanyForm.tsx`

1. Add the setters `setError` and `setSaving` to their `useState` lines.
2. Implement `handleSubmit`:
   - call `event.preventDefault()` – otherwise the browser reloads the page
   - reset `error` to `null` and set `saving` to `true`
   - call `await onSubmit(...)` with a `CompanyInput` built from the state:
     - trim all strings (`.trim()`)
     - convert every salary back to a number (`Number(e.salary)`)
   - if `onSubmit` throws, put the error message into `error`
   - in a `finally` block, set `saving` back to `false`
3. Remove the `console.log` placeholder.

✅ **Check:** Submitting the form logs `TODO: create` / `TODO: update` with the correct data in
the browser console (that comes from `App`, which you'll finish in exercise 9). While saving,
the button shows "Saving…".

---

## Exercise 8 – Talking to the backend (`fetch`)

**File:** `src/service/companyService.ts`

Have a look at the `request` helper and at `getCompanies`. Then implement:

1. `createCompany(company)` – `POST` to `/api/companies` with the company as JSON body
2. `updateCompany(id, company)` – `PUT` to `/api/companies/<id>` with the company as JSON body
3. `deleteCompany(id)` – `DELETE` to `/api/companies/<id>`

Hints:

- pass an options object as second argument: `request<Company>(url, { method: 'POST', body: ... })`
- use `JSON.stringify(company)` for the body
- use `encodeURIComponent(id)` when building the URL

✅ **Check:** There's nothing new to see yet – this will be wired up in the next exercise.
Make sure `npm run build` has no errors.

---

## Exercise 9 – Wire everything together (immutable state updates)

**File:** `src/components/App/App.tsx`

Import `createCompany`, `updateCompany` and `deleteCompany` and implement the three handlers.
Always update state **immutably** (create a new array, never modify the old one) and use the
functional form of the setter: `setCompanies((list) => ...)`.

1. `handleCreate(input)`:
   - `await createCompany(input)`
   - append the returned company to the list (`[...list, created]`)
   - switch back to the list view (`setMode({ kind: 'list' })`)
2. `handleUpdate(id, input)`:
   - `await updateCompany(id, input)`
   - replace the matching company in the list (hint: `list.map(...)`)
   - switch back to the list view
3. `handleDelete(company)`:
   - ask `confirm(\`Delete "${company.name}"?\`)` and stop if the user cancels
   - `await deleteCompany(company.id)` and remove it from the list (hint: `list.filter(...)`)
   - if deleting fails, set `error` to `Could not delete company: <message>`

> Why don't `handleCreate` and `handleUpdate` need their own `try`/`catch`?
> (Hint: look at `handleSubmit` in `CompanyForm`.)

✅ **Check:** You can create, edit and delete companies, and the changes are still there after
reloading the page. If the backend rejects a request, the error is shown in the form.

---

## Bonus ideas

- Show the total salary of all employees of a company in the details view.
- Add a search field above the list that filters companies by name.
- Sort the company list alphabetically.
- Show a "Saving…" or "Deleting…" indicator while a company is being deleted.
- Validate that a salary is not negative before submitting and show a message in the form.
