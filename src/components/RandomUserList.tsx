import { sortBy, type RandomUser } from "../types/RandomUser"
import RandomUserItem from "./RandomUserItem"

interface RandomUserListProps {
  handleDelete: (email: string) => void
  users: RandomUser[]
  showColors: boolean
  setSortingCol: React.Dispatch<React.SetStateAction<sortBy>>
}
export default function RandomUserList({
  handleDelete,
  setSortingCol,
  users,
  showColors
}: RandomUserListProps) {
  const changeSorting = (newSorting: sortBy) => {
    setSortingCol(newSorting)
  }
  return (
    <table width="100%" cellPadding={4}>
      <thead>
        <tr>
          <th>Foto</th>
          <th
            onClick={() => {
              changeSorting(sortBy.NAME)
            }}
          >
            Nombre
          </th>
          <th
            onClick={() => {
              changeSorting(sortBy.LAST)
            }}
          >
            Apellido
          </th>
          <th
            onClick={() => {
              changeSorting(sortBy.COUNTRY)
            }}
          >
            Pais
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const bgColorCell = index % 2 === 0 ? "#333" : "#555"

          return (
            <RandomUserItem
              bgColorCell={showColors ? bgColorCell : "transparent"}
              user={user}
              key={user.email}
              handleDelete={handleDelete}
              index={index}
            />
          )
        })}
      </tbody>
    </table>
  )
}
