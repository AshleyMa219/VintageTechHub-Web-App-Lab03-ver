import {getImage} from "./getImage";
import {Link, useNavigate} from "react-router-dom";


function PhoneList({phones = [], title = ''}) {
  const navigate = useNavigate();

  return (
    <div className={'mt-3'}>
      <table className="table table-info">
        <thead class="table-primary">
          <tr>
            <th className={'text-center'} colSpan={3}>
              {title}
            </th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Image</th>
          <th scope="col">Price</th>
        </tr>
        {phones.map(phone => {
          return <tr key={phone._id}>
            <td style={{width: 400}}>
              <Link to={`/phone/${phone._id}`}>{phone.title}</Link>
            </td>
            <td>
              <img width={200} src={getImage(phone.brand)}/>
            </td>
            <td>{phone.price}</td>
          </tr>


        })}

        </tbody>
      </table>
    </div>


  )
}

export default PhoneList;