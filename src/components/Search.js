import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import PhoneList from "./PhoneList";

function Search() {
  const location = useLocation();
  const locationSearch = location.search;
  const locationSearchSplits = locationSearch.split('&');
  const title = locationSearchSplits[0].split('=')[1];
  const price = locationSearchSplits[1].split('=')[1];
  const brand = locationSearchSplits[2].split('=')[1];

  const [phones, setPhones] = useState([]);
  useEffect(() => {
    fetch(`/api/phones/search?title=${title}&maxPrice=${price}&brand=${brand}`)
      .then(res => res.json())
      .then(data => {
        setPhones(data);
      });
  }, [location]);

  return (
    <div className={'container'}>
      <PhoneList phones={phones} title={'Search Result'}/>
    </div>
  )
}

export default Search;