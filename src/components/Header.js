import {useAuthContext} from "../auth/Auth";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function Header() {
  const { authed, logout } = useAuthContext();
  const navigate = useNavigate();


  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(100);
  const [brand, setBrand] = useState('');

  const location = useLocation();


  const [brands, setBrands] = useState([]);
  useEffect(() => {
    fetch(`/api/phones/brands`)
      .then(res => res.json())
      .then(brands => {
        setBrands(brands);
      })
  }, []);

  const handleClickSearch = () => {
    navigate(`/search?title=${title}&price=${price * 20}&brand=${brand}`);
  }
  const handleClickByPrice = () => {
    navigate(`/search?title=${title}&price=${price * 20}&brand=${brand}`);
  }

  const handleClickByBrand = () => {
    navigate(`/search?title=${title}&price=${price * 20}&brand=${brand}`);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">OldPhoneDeals</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              {authed && <Link className="nav-link" to="/checkout">Checkout</Link>}
            </li>
          </ul>
          <div className={'d-flex align-content-start flex-grow-1 align-items-center me-auto'}>
          {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/profile' && location.pathname !== '/checkout' && (

              <>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className={'form-control w-25 me-3'}
                  placeholder={'Search...'}/>
                <button onClick={handleClickSearch} className={'btn btn-primary me-2'}>Search</button>
                <select
                  style={{width: 200}}
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                  className={'form-select'}>
                  <option key={'empty'} value={''}>Select Brand</option>
                  {brands.map(brand => {
                    return (
                      <option key={brand}>{brand}</option>
                    )
                  })}
                </select>
                <div className={'ms-2 me-2'}>
                  <label htmlFor="customRange1" className="form-label">Max price: {price * 20}</label>
                  <input type="range"
                         value={price}
                         onChange={e => {
                           setPrice(Number(e.target.value))
                         }}
                         className="form-range" id="customRange1" />
                </div>
                <button onClick={handleClickByBrand} className={'btn btn-primary me-1'}>Brand Filter</button>
                <button onClick={handleClickByPrice} className={'btn btn-primary'}>Price Filter</button>
              </>
          )}
          </div>
          {authed && (
            <Link to={'/profile'}>Profile</Link>
          )}
          {authed && (
            <button onClick={() => {
              logout();
              navigate('/login');
            }} className={'btn btn-link'}>Log out</button>
          )}
          {!authed && (
            <>
              <Link to={'/login'}>Login</Link>
              /
              <Link to={'/register'}>Register</Link>
            </>
          )}

        </div>
      </div>
    </nav>
  )
}
export default Header;