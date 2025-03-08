import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types/product';
import { useDispatch } from 'react-redux';
import { addItemInCart } from '../../redux/cartSlice';
import toast from 'react-hot-toast';



const ProductCard= ({ product }:{product:Product}) => {
  
  const dispatch = useDispatch();

  const handleAddToCart = (product:Product)=>{
     dispatch(addItemInCart(product))
     toast.success("Item added to cart")
  }

  return (
    <div className="bg-white rounded-lg shadow-lg shadow-gray-300 overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img 
          src={product.photo.secure_url} 
          alt={product.name} 
          className="w-full h-full object-contain p-2"
        />
      </div>
      <hr></hr>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
          <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        {/* <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p> */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button 
            className="bg-indigo-600 hover:bg-indigo-800 text-white px-3 py-2 rounded-md flex items-center text-sm transition-colors duration-300"
            onClick={()=>handleAddToCart(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;