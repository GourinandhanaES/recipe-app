//rafce 
import React from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem } from '../redux/slices/wishListSlice'

const Wishlist = () => {
  const dispatch = useDispatch()
  const userWishlist = useSelector(state=>state.wishlistReducer)

  const handleImageClick = (recipe) => {
    const query = encodeURIComponent(recipe + " recipe"); 
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };
  
  return (
    <>
    <Header/>
    <div style={{paddingTop:'100px'}} className='px-5'>
      {
        userWishlist?.length>0?
        <>
    <h1 className="text-5xl font-bold text-orange-600 mb-4">My Favourites</h1>
      <div className="grid grid-cols-4 gap-4">
        {
          userWishlist?.map(recipe=>(
            <div key={recipe?.id} className="rounded border p-2 shadow">
              <img width={'100%'} height={'200px'} src={recipe?.image} onClick={() => handleImageClick(recipe.name)} alt={recipe.name} />
              <div className="text-center">
                <h3 className="text-xl font-bold">{recipe?.name} </h3>
                <div className="flex justify-evenly mt-3">
                <button onClick={()=>dispatch(removeItem(recipe?.id))} className='text-xl'><i className="fa-solid fa-heart-circle-xmark text-red-500"></i></button>
            </div>
          </div>
        </div>
          ))
        }
      </div>
    </>
    :
    <div className="flex flex-col justify-center items-center">
      <img className='w-[620px]  h-1/2' src="https://i.pinimg.com/originals/29/a9/0e/29a90ed99d561dbcdbfe36df884b1709.gif" width={'500px'} alt="" />
      <h1 className='text-4xl text-red-600 mt-3'>Your Favourites is Empty!!!!</h1>
    </div>
      }
    </div>
    </>
  )
}

export default Wishlist