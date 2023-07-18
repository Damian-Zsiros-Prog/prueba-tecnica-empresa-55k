import { type RandomUser } from "../types/RandomUser"

interface Props {
  handleDelete: (email: string) => void
  user: RandomUser
  bgColorCell: string
}

export default function RandomUserItem({
  handleDelete,
  bgColorCell,
  user
}: Props) {
  return (
    <tr style={{ backgroundColor: bgColorCell }}>
      <td>
        <img src={user.picture.thumbnail} alt={user.name.title} />
      </td>
      <td>{user.name.first}</td>
      <td>{user.name.last}</td>
      <td>{user.location.country}</td>
      <td>
        <button
          type="button"
          onClick={() => {
            handleDelete(user.email)
          }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}
