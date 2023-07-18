/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/semi */
import { useEffect, useRef, useState, useMemo } from "react"
import "./App.css"
import { sortBy, type RandomUser } from "./types/RandomUser"
import RandomUserList from "./components/RandomUserList"

function App() {
  const [users, setUsers] = useState<RandomUser[]>([])
  const [ShowColors, setShowColors] = useState(false)
  const [Sorting, setSorting] = useState<sortBy>(sortBy.NONE)
  const [FilterCountry, setFilterCountry] = useState("")
  const originalUsers = useRef<RandomUser[]>([])
  const toggleColors = () => {
    setShowColors(!ShowColors)
  }
  const sortByCountry = () => {
    setSorting((prevState) =>
      prevState === sortBy.COUNTRY ? sortBy.NONE : sortBy.COUNTRY
    )
  }

  const filteredUsers = useMemo(() => {
    return typeof FilterCountry === "string" && FilterCountry.trim().length > 0
      ? users.filter((user) =>
          user.location.country
            .toLowerCase()
            .includes(FilterCountry.toLowerCase())
        )
      : users
  }, [users, FilterCountry])
  const sortedUsers = useMemo(() => {
    if (Sorting === sortBy.NAME) {
      return filteredUsers.toSorted((a, b) => {
        return a.name.first.localeCompare(b.name.first)
      })
    }
    if (Sorting === sortBy.LAST) {
      return filteredUsers.toSorted((a, b) => {
        return a.name.last.localeCompare(b.name.last)
      })
    }
    if (Sorting === sortBy.COUNTRY) {
      return filteredUsers.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country)
      })
    }
    return filteredUsers
  }, [filteredUsers, Sorting])

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const resetState = () => {
    setSorting(sortBy.NONE)
    setUsers(originalUsers.current)
  }
  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <h1>Prueba tecnica</h1>
      <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
        <button type="button" onClick={toggleColors}>
          Colorear filas
        </button>
        <button type="button" onClick={sortByCountry}>
          {Sorting === sortBy.COUNTRY
            ? "No ordenar por Pais"
            : "Ordenar por Pais"}
        </button>
        <button type="button" onClick={resetState}>
          Resetear estado
        </button>
        <input
          style={{ padding: 4, borderRadius: 8 }}
          type="text"
          onChange={(e) => {
            setFilterCountry(e.target.value)
          }}
          placeholder="Ingrese el pais"
        />
      </div>
      <RandomUserList
        handleDelete={handleDelete}
        showColors={ShowColors}
        users={sortedUsers}
        setSortingCol={setSorting}
      />
    </>
  )
}

export default App
