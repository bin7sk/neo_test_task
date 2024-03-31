import "./Navbar.css";
import { ReactComponent as Favourite} from "../icons/Favourite.svg";
import { ReactComponent as Basket} from "../icons/Basket.svg";
import { useShoppingCart } from "../App"
import { useNavigate } from 'react-router-dom'


export function Navbar() {
  const navigate = useNavigate()
  const ShoppingCart = useShoppingCart();
  return (
    <nav className="Navbar">
      <a href="/" className="NavbarLogo">QPIC</a>
      <span className="nav-icons">
      <button className="nav-button-fav">
        <Favourite />
      </button>
      <button className="nav-button-basket" onClick={() => navigate('/shopping-cart')}>
        <Basket />
        { ShoppingCart.BuyAmount > 0 && <span className="items-counter-circle" ><span>{ShoppingCart.BuyAmount}</span></span>}
      </button>
      </span>

    </nav>

  )
}