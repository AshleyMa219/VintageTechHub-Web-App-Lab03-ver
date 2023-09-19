import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {getImage} from "./getImage";
import {useAuthContext} from "../auth/Auth";

function Phone() {
  const {phoneId} = useParams();
  const [phone, setPhone] = useState();
  const [showReviewCount, setShowReviewCount] = useState(1);
  const [cart, setCart] = useState();
  const {authed} = useAuthContext();
  const [reloadCart, setReloadCart] = useState(true);
  const [reload, setReload] = useState(true);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`/api/phones/${phoneId}`)
      .then(res => res.json())
      .then(data => {
        setPhone(data);
      });
  }, [phoneId, reload]);

  useEffect(() => {
    if (phoneId && authed) {
      fetch(`/api/carts/${phoneId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('u_token')}`
        }
      }).then(res => res.json())
        .then(data => {
          if (data) {
            setCart(data);
          }
        })
    }
  }, [phoneId, reloadCart]);



  const reviews = useMemo(() => {
    if(phone) {
      return phone.reviews.slice( 0, showReviewCount * 3 );
    } else {
      return []
    }
  }, [phone, showReviewCount]);

  const handleClickAddToCart = () => {
    if (!authed) {
      alert("Please login firstly!");
      navigate('/login?redirect=/phone/' + phoneId)

    } else {
      const count = window.prompt("Please enter add count");
      if (count && Number(count) > 0) {
        fetch(`/api/carts/${phoneId}/add/${count}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('u_token')}`
          }
        }).then(() => {
          alert("Add successfully!");
          setReloadCart(!reloadCart);
        })
      }
    }
  }

  const handleSendComment = async () => {
    if (comment && rating) {
      if (Number(rating) < -1 || Number(rating) > 5) {
        return alert("Please give an valid rating(1-5)");
      }
      console.log(phoneId)
      fetch(`/api/phones/${phoneId}/comment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('u_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comment,
          rating: Number(rating)
        })
      })
        .then(res => {
          if (res.status === 201) {
            setReload(!reload);
            alert("Comment successfully!");
            setRating('');
            setComment('');
          }
        })
    } else {
      alert("Please enter comment and rating(1-5)");
    }
  }

  if (!phone) {
    return <></>;
  }
  return (
    <div className={'container'}>
      <div className={'card shadow'}>

        <div className={'card-body'}>
          <div className={'row'}>
            <div className={'col-4'}>
              <img src={getImage(phone.brand)}/>
            </div>
            <div className={'col-8'}>
              <h2>{phone.title}</h2>
              <h4>Price: ${phone.price}</h4>
              <div>
                <span className="badge text-bg-info">{phone.brand}</span>
              </div>
              <h6 className={'mt-2'}>
                Stock:
                {phone.stock}
              </h6>
              <h6>
                Seller: {phone?.seller?.firstname} {phone?.seller?.lastname}
              </h6>
              <div>
                <button className={'btn btn-info text-white me-2'}>
                  <i className="bi bi-bag-check-fill me-2"></i>
                  {cart ? cart.count: 0}
                </button>
                <button onClick={handleClickAddToCart} className={'btn btn-danger'}>Add to Cart</button>
              </div>

            </div>
          </div>

          <div className={'mt-2'}>
            <h4>Reviews</h4>
            <ul className="list-group">
              {reviews.map(review => {
                return (
                  <li key={review._id} className="list-group-item">
                    <div>
                      <i className="bi bi-person-circle me-2"></i>
                      <strong>{review?.reviewer?.firstname} {review?.reviewer?.lastname}</strong>
                    </div>
                    <p>
                      {review.comment?.slice(0, 200)}
                    </p>
                    <p>
                      <span className="badge text-bg-warning text-white">
                        <i className="bi bi-star-fill me-1"></i>
                        {review.rating}
                      </span>
                    </p>
                  </li>
                )
              })}
            </ul>
            <button onClick={() => setShowReviewCount(showReviewCount + 1)} className={'btn btn-link'}>Show More</button>
            <div className={'mt-2 d-flex'}>
              <input value={comment}
                     onChange={e => setComment(e.target.value)}
                     className={'form-control rounded-0'} placeholder={'Enter your comment ...'}/>
              <input className={'form-control'} step={1} type={'number'}
                     value={rating}
                     onChange={e => setRating(e.target.value)}
                     style={{width: 150}} placeholder={'Rating'}/>
              <button
                onClick={handleSendComment}
                className={'btn btn-primary rounded-0'}>Send</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Phone;