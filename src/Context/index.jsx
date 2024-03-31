import { createContext, useState , useEffect } from 'react'
import { apiUrl } from '../API'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {
  // Shopping Cart · Increment quantity
  const [count, setCount] = useState(0)

  // Product Detail · Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)

// Checkout Side Menu · Open/Close
const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)


  // Product Detail · Show product
  const [productToShow, setProductToShow] = useState({})
 // Shopping Cart · Add products to cart
  const [cartProducts, setCartProducts] = useState([])

 // Shopping Cart · Order
   const [order, setOrder] = useState([])

    // Get Products
   const [items, setItems] = useState(null)

    // Get Products
    const [filteredItems, setFilteredItems] = useState(null)

   //Get Products by Title
   const [searchByTitle, setSearchByTitle] = useState(null)

   //Get Products by Category
   const [searchByCategory,  setSearchByCategory] = useState(null)

  
   

   useEffect(()=>{
    fetch(`${apiUrl}/products`)
    //fetch("https://api.escuelajs.co/api/v1/products")
    .then(response => response.json())     
    .then(data => setItems(data))
    //.then(data => console.log('jjjj', data))
    .catch(err => console.error(err))
  },[])

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if(searchType === 'BY_TITLE_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
    
    if(searchType === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle)
    }

    if(searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)
    }

    if(!searchType) {
      return items
    }

  }

  useEffect(()=>{   
    if(searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY',items, searchByTitle, searchByCategory))
    if(searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE',items, searchByTitle, searchByCategory))
    if(searchByCategory && !searchByTitle) setFilteredItems(filterBy('BY_CATEGORY',items, searchByTitle, searchByCategory))
    if(!searchByCategory && !searchByTitle) setFilteredItems(filterBy(null,items, searchByTitle, searchByCategory))
  },[items, searchByTitle, searchByCategory])



  return (
    <ShoppingCartContext.Provider value={{
      count,
      setCount,
      openProductDetail,
      closeProductDetail,
      isProductDetailOpen,
      productToShow,
      setProductToShow,
      cartProducts,
      setCartProducts,
      isCheckoutSideMenuOpen,
      openCheckoutSideMenu,
      closeCheckoutSideMenu,
      order,
      setOrder,
      items,
      setItems,
      searchByTitle,
      setSearchByTitle,
      filteredItems, 
      setFilteredItems,
      searchByCategory,
      setSearchByCategory

    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}