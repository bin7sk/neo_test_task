import "./Footer.css";
import { ReactComponent as Favourite} from "../icons/Favourite.svg";
import { ReactComponent as Basket} from "../icons/Basket.svg";
import { ReactComponent as Network} from "../icons/Network.svg";
import { ReactComponent as VK} from "../icons/VK.svg";
import { ReactComponent as Telegram} from "../icons/Telegram.svg";
import { ReactComponent as WhatsApp} from "../icons/WhatsApp.svg";
import { useNavigate } from 'react-router-dom'

export function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="Footer">
      <a href="/" className="FooterLogo">QPIC</a>
      <ul className="Footerul1">
        <li><button className="FooterButton">Избранное</button></li>
        <li><button className="FooterButton" onClick={() => navigate('/shopping-cart')}>Корзина</button></li>
        <li><button className="FooterButton">Контакты</button></li>
      </ul>
      <ul className="Footerul2">
        <li><button className="FooterButton">Условия сервиса</button></li>
      </ul>
      <ul className="FooterulLang">
        <li style={{}}><Network /></li>
        <li style={{color: "#FFA542" }}>Рус</li>
        <li>Eng</li>
      </ul>
      <ul className="FooterulMedia">
        <li className="FooterulMediaSign"><VK /></li>
        <li className="FooterulMediaSign"><Telegram /></li>
        <li className="FooterulMediaSign"><WhatsApp /></li>
      </ul>
    </footer>
  )
}