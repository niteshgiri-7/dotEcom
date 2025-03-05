import { Filter, Search } from 'lucide-react';
import React, { useState } from 'react';
import Loader from '../../Components/Loader';
import ProductCard from '../../Components/user/ProductCard';
import WowSuchEmpty from '../../Components/WowSuchEmpty';
import { useCategories } from '../../hooks/useCategories';
import { useErrorNotification } from '../../hooks/useErrorNotification';
import { useProducts } from '../../hooks/useProduct';
import { Toaster } from 'react-hot-toast';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsFromLocalStorage, TCartItem } from '../../redux/cartSlice';

const HomePage: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const { productsArray, isError, isPending, error } = useProducts();
  const {categories} = useCategories();
  useErrorNotification(isError,error);

  const itemsInStore = useSelector((store:RootState)=>store.cart.cartItems)

  const dispatch = useDispatch<AppDispatch>();

  let cartItems:TCartItem[] = itemsInStore; 

  if(itemsInStore?.length===0){
    cartItems =JSON.parse(localStorage.getItem("cartItems")as string);
    if(cartItems && cartItems.length>0)
    dispatch(addItemsFromLocalStorage(cartItems)); 
  }

const filteredProducts = productsArray?.filter(product => {
  const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory = !selectedCategory || product.category === selectedCategory;
  return matchesSearch && matchesCategory;
}) || [];


const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(e.target.value);
}

const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedCategory(e.target.value);
}
  return (
    <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Discover Our Products</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => handleSearch(e)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">All Categories</option>
              {categories?.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {
        isPending ?
          <Loader />
          : filteredProducts?.length === 0 ?
           <WowSuchEmpty/>
            :
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
      }
      <Toaster position="top-left"/>
    </div>
  );
};

export default HomePage;




