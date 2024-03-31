import "./Catalog.css";
import { ReactComponent as Star} from "../icons/Star.svg";
import { useShoppingCart } from "../App"

export type Item = {
    img: string
    title: string
    price: number
    oldPrice?: number
    rate: number
}

function ItemCard({item} : {item: Item}) {
    const ShoppingCart = useShoppingCart()
    return <div className="ItemCard">
            <img src={item.img} alt={item.title} className="CardImage"/>
            <div className="ItemCardFooter">
                <span className="ItemTitle">{item.title}</span>
                <span className="ItemPrice">{item.price.toString()}&nbsp;₽</span>
                {item.oldPrice ? <span className="ItemOldPrice">{item.oldPrice.toString()}&nbsp;₽</span>: <></>}
                <span className="ItemRate">
                    <Star />
                    <span className="ItemRateNumber">{item.rate.toString()}</span>
                </span>
                <button className="BuyButon" onClick={() => ShoppingCart.AddToCart(item)}>Купить</button>
            </div>
        </div>
}

function List({type, items}: {type:string, items:Array<Item>}) {
    return <>
                <h2 className="CatalogTypeName">{type}</h2>
                <div className="CatalogList">
                    {items.map((item) => (<ItemCard item={item} />))}
                </div>
           </>
}

export type CatalogSection = {
    type: string
    items: Array<Item>
}

export function Catalog({CatalogTypes} : {CatalogTypes: Array<CatalogSection>}) {
    return <div className="Catalog">
        {CatalogTypes.map((type) => (<List type={type.type} items={type.items} />))}
            </div>

}