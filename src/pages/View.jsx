//rafce
import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWhishlist } from '../redux/slices/wishListSlice'

const View = () => {
  const dispatch = useDispatch()
  const userWishlist = useSelector(state=>state.wishlistReducer)
  const [recipe,setRecipes]=useState({})
  const {id}=useParams()
  // console.log(id);
  // console.log(product);

  useEffect(()=>{
    if(sessionStorage.getItem("allRecipes")){
      const allRecipes = JSON.parse(sessionStorage.getItem("allRecipes"))
      setRecipes(allRecipes.find(item=>item.id==id))
    }
  },[])

  const handleWishlist = ()=>{
    const existingProduct = userWishlist?.find(item=>item?.id==id)
    if(existingProduct){
      alert("Recipe already in your Favourites!!!")
    }else{
      alert("Recipe Added to your Favourites")
      dispatch(addToWhishlist(recipe))
    }
  }

  const handleImageClick = (recipe) => {
    const query = encodeURIComponent(recipe + " recipe"); 
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  return (
    <>
    <Header/>
    <>
    <div className="flex flex-col mx-5">
      <div className="grid grid-cols-2 items-center gap-4 mt-20">
        <div className="flex flex-col justify-center items-center">
          <img className="block" width={'300px'} height={'200px'} src={recipe?.image} onClick={() => handleImageClick(recipe.name)} alt={recipe.name}  />
          <p>Click on the image for the recipe videos </p>
          <div className="flex justify-around mt-5">
            <button onClick={handleWishlist} className="bg-yellow-400 text-white text-lg rounded p-2">
              ADD TO FAVOURITES
            </button>
          </div>
        </div>

        <div className="mx-5 sm:mx-2 me-5">
          <p className="text-gray-800 font-bold">RECIPE: {recipe?.id}</p>
          <h1 className="text-4xl font-bold text-red-600 mb-5">{recipe?.name}</h1>
          <p className="text-md">Cuisine : {recipe?.cuisine}</p>
          <p className="text-md">Category : {recipe?.mealType}</p>
          <p className="mt-2 text-lg">
            <span className="font-bold">Ingredients : </span> {recipe?.ingredients}
          </p>
          <h3 className="text-red-600 text-2xl font-bold">Rating : {recipe?.rating}</h3>
        </div>
      </div>

      <div className="mt-5">
        <h1 className="text-3xl font-bold text-red-600 text-center">INSTRUCTIONS</h1>
        <p className="text-2xl mb-5">{recipe?.instructions}</p>
      </div>
    </div>
    </>
    </>
  )
}

export default View