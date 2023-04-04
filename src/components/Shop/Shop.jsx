import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';


const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    useEffect( () =>{
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, []);
    
    useEffect(() =>{
        const storedCart = getShoppingCart()
        const savedCard = [];
        // step 1: get id of the addedProduct
        for(const id in storedCart){
            // step 2: get product form products state by using id
            const addedProduct = products.find(product => product.id === id)
            if(addedProduct){
                // step 3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the addedProduct to the saved cart
                savedCard.push(addedProduct)
            }
            // console.log('added Product', addedProduct)
        }
        // step 5: set the cart
        setCart(savedCard)
    }, [products])

    const handleAddToCart = (product) =>{
        // cart.push(product)
        const newCart = [...cart, product];
        setCart(newCart)
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}

                    ></Product>)
                }
            </div>
            <div className="cart-container">
                    <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;