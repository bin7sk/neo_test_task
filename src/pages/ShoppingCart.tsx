import "./ShoppingCart.css"
import {Item} from "./Catalog";
import { useShoppingCart } from "../App"
import { ReactComponent as Minus} from "../icons/Minus.svg";
import { ReactComponent as Plus} from "../icons/Plus.svg";
import { ReactComponent as Garbage} from "../icons/Garbage.svg";

function BuyCard({item}: {item: [Item, number]}) {
    const ShoppingCart = useShoppingCart()
    return <div className="BuyCard">
            <img src={item[0].img} alt={item[0].title} className="BuyCardImg" />
            <span className="BuyCardTitle">{item[0].title}</span>
            <span className="BuyCardPrice">{item[0].price}</span>
            <span className="BuyCardMinus" onClick={() => ShoppingCart.DecreaseFromCart(item[0])}><Minus /></span>
            <span className="BuyCardPlus" onClick={() => ShoppingCart.AddToCart(item[0])}><Plus /></span>
            <span className="BuyCardAmount">{item[1]}</span>
            <span className="BuyCardGarbage" onClick={() => ShoppingCart.removeFromCart(item[0])}><Garbage /></span>
            <span className="BuyCardTotal">{item[1] * item[0].price}&nbsp;₽</span>
        </div>
}

export function ShoppingCart() {
    const ShoppingCart = useShoppingCart()
    let total = 0
    for (let buy of ShoppingCart.Cart) {
        total += buy[1] * buy[0].price
    }
    return <section className="ShoppingCartSection">
    <div className="ShoppingCart">
        <span className="spn3">Корзина</span>
        {ShoppingCart.Cart.length > 0 ? ShoppingCart.Cart.map((buy) => (<BuyCard item={buy} />)) : <div style={{height: "400px"}}></div>}
    </div>
    <div className="ShoppingTotal">
        <span className="spn1">Итого</span>
        <span className="spn2" >₽&nbsp;{total}</span>
        <button className="ShoppingTotalButton">Перейти к оформлению</button>
    </div>
    </section>;
}