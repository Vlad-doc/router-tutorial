import { NavLink, Outlet, useSearchParams } from "react-router-dom"
import { getInvoices } from "../data"

export default function Invoices() {
  let invoices = getInvoices()
  const [searchParams, setSearchParams] = useSearchParams()
  console.log(searchParams)

  return (
    <div style={{ display: "flex" }}>
      <nav style={{ borderRight: "solid, 1px", padding: "1rem" }}>
        <input
          type="text"
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value
            if (filter) {
              setSearchParams({ filter })
            } else {
              setSearchParams({})
            }
          }}
        />
        {invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter")
            if (!filter) return true
            let name = invoice.name.toLocaleLowerCase()
            return name.startsWith(filter.toLocaleLowerCase())
          })

          .map((invoice) => (
            <NavLink
              key={invoice.number}
              to={`/invoices/${invoice.number}`}
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                }
              }}
            >
              {invoice.name}
            </NavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  )
}
