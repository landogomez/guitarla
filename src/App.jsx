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

  const [data, setData] = useState([])

  useEffect(() => {
    setData(db)
  }, [])

  console.log(data)
  

  return (
    <>
    
    <Header />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {data.map((i) => (
            <Guitar 
            //Añadiendo props
            i = {i}
            
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
