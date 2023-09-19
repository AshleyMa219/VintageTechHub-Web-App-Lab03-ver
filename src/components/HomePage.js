import PhoneList from "./PhoneList";
import {useEffect, useMemo, useState} from "react";

function HomePage() {


  const [allSoldOutPhones, setAllSoldOutPhones] = useState([]);
  const [bestSellerPhones, setBestSellerPhones] = useState([]);




  useEffect(() => {
    fetch('/api/phones/sold-out-soon')
      .then(res => res.json())
      .then(data => {
        setAllSoldOutPhones(data);
      });

    fetch('/api/phones/best-sellers')
      .then(res => res.json())
      .then(data => {
        setBestSellerPhones(data);
      })
  }, []);





  return (
    <div className={'container'}>
      <div>
        <div>
          <PhoneList title={'Sold out soon!'} phones={allSoldOutPhones}/>
        </div>
        <div>
          <PhoneList title={'Best sellers'} phones={bestSellerPhones}/>
        </div>
      </div>
    </div>
  )
}

export default HomePage;