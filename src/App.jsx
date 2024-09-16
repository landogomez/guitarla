import { useState, useEffect } from "react"
import Header from "./comoponents/Header"
import Guitar from "./comoponents/Guitar"
import { db } from './data/db'

function App() {
  // State
  /*const [auth, setAuth] = useState([])
  const [Total, setTotal] = useState(0)
  const [cart, setCart] = useState([])*/

  //useEffect
  /*useEffect( () => {
    console.log('Componente Listo')
  }, [])*/

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : [] 
  }

  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart) //Carrito de compras
  
  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item){
    const itemExists = cart.findIndex(i => i.id === item.id)
    if(itemExists >= 0) {
      if(cart[itemExists].quantity >= MAX_ITEMS) return
        const updatedCart = [...cart] // Creo una copia del state porque es inmutable el original
        updatedCart[itemExists].quantity++ // Modifico la copia
        setCart(updatedCart) // Actualizo el original
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart(id) {
    setCart(prevState => prevState.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id){
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEMS) {
        return{
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    }) 
    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return {
          ...item,
          quantity: item.quantity -1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }


  return (
    <>
    
    <Header 
      cart={cart}
      removeFromCart = {removeFromCart}
      increaseQuantity = {increaseQuantity}
      decreaseQuantity = {decreaseQuantity}
      clearCart = {clearCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {data.map((guitar) => (
            <Guitar 
            //Añadiendo props
            key={guitar.id}
            guitar = {guitar}
            setCart = {setCart}
            addToCart={addToCart}
            />
          ))}
            
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
