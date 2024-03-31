import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Catalog } from "./pages/Catalog"
import type { Item, CatalogSection } from "./pages/Catalog"
import { ShoppingCart } from "./pages/ShoppingCart"
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import "./App.css"
import { useSessionStorage } from "@uidotdev/usehooks";
import { isEqual } from '@react-hookz/deep-equal';
import { ReactNode, createContext} from "react"
import { useContext} from "react"

const Goods:Array<CatalogSection> = [
  {
    type: "Наушники",
    items : [{
      img: "./assets/headphones/Apple BYZ S852I.png",
      title: "Apple BYZ S852I",
      price: 2927,
      oldPrice: 3527,
      rate: 4.7,
    }, {
      img: "./assets/headphones/Apple EarPods.png",
      title: "Apple EarPods",
      price: 2327,
      rate: 4.5,
    }, {
      img: "./assets/headphones/Apple TearPods.png",
      title: "Apple TearPods",
      price: 2327,
      rate: 4.5,
    }, {
      img: "./assets/headphones/Apple BYZ S852I.png",
      title: "Apple BYZ S852I2",
      price: 2927,
      rate: 4.7,
    }, {
      img: "./assets/headphones/Apple EarPods.png",
      title: "Apple EarPods2",
      price: 2327,
      rate: 4.5,
    }, {
      img: "./assets/headphones/Apple TearPods.png",
      title: "Apple TearPods2",
      price: 2327,
      rate: 4.5,
    }, 
    ]
  }, {
    type: "Беспроводные наушники",
    items: [{
        img: "./assets/wireless_headphones/Apple AirPods.png",
        title: "Apple AirPods",
        price: 9527,
        rate: 4.7,
      }, {
        img: "./assets/wireless_headphones/GERLAX GH-04.png",
        title: "GERLAX GH-04",
        price: 6527,
        rate: 4.7,
      }, {
        img: "./assets/wireless_headphones/BOROFONE BO4.png",
        title: "BOROFONE BO4",
        price: 6527,
        rate: 4.7,
      }
    ]
  }
]

// const CartDefault: [Item, Number][] = []
// for (let section of Goods) {
//   for (let item of section.items) {
//     CartDefault.push([item, 0])
//   }
// }

type ShoppingCartContext = {
  Cart: [Item, number][]
  removeFromCart: (deletedItem: Item) => void
  DecreaseFromCart: (decreasedItem: Item) => void
  AddToCart: (decreasedItem: Item) => void
  BuyAmount : number
  BuyTotal : number
}
const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

function ShoppingCartProvider({ children }: { children: ReactNode }) {
  const [Cart, setCartItems] = useSessionStorage<[Item, number][]>("shopping-cart", [])
  const [BuyAmount, setBuyAmount]  = useSessionStorage<number>("buy-amount", 0)
  const [BuyTotal, setBuyTotal]  = useSessionStorage<number>("buy-total", 0)
  
  function CountAmountAndTotal(newCart: [Item, number][])
  {
    let amount = 0
    let total = 0
    for (const item of newCart) {
      amount += item[1]
      total += item[1] * item[0].price
    }
    console.log(amount)
    setBuyAmount(amount)
    setBuyTotal(total)
  }
  
  function AddToCart(newItem: Item)
  {
    let newCart: [Item, number][] = []
    setCartItems(Cart => {
      if (Cart.find(item => isEqual(item[0], newItem)) == null) {
        newCart = [...Cart, [newItem, 1]]
      } else {
        newCart = Cart.map(item => {
          if (isEqual(item[0], newItem)) {
            return [item[0], item[1] + 1]
          } else {
            return item
          }
        })
      }
      return newCart
    })
    console.log(Cart)
    CountAmountAndTotal(newCart)
  }
  
  function DecreaseFromCart(decreasedItem: Item)
  {
    let newCart: [Item, number][] = []
    setCartItems(Cart => {
      if (Cart.find(item => isEqual(item[0], decreasedItem)) == null) {
        newCart = [...Cart]
      } else {
        newCart = Cart.map(item => {
          if (isEqual(item[0], decreasedItem)) {
            return [item[0], item[1] - 1]
          } else {
            return item
          }
        })
        newCart = newCart.filter(item => item[1] > 0)
      }
      return newCart
    })
    CountAmountAndTotal(newCart)
  }
  
  function removeFromCart(deletedItem: Item) {
    let newCart: [Item, number][] = []
    setCartItems(Cart => {
      newCart = Cart.filter(item => !isEqual(item[0], deletedItem))
      return newCart
    })
    CountAmountAndTotal(newCart)
  }

  return (
    <ShoppingCartContext.Provider value={{Cart, removeFromCart, DecreaseFromCart, AddToCart, BuyAmount, BuyTotal}} >
      {children}
    </ShoppingCartContext.Provider>
  )
}

function App() {
  return (
      <Container className="App">
        <ShoppingCartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Catalog CatalogTypes={Goods} />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
        </Routes>
        <Footer />
        </ShoppingCartProvider>
      </Container>
  )
}

export default App