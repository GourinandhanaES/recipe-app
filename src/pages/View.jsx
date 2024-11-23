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

  const formattedInstructions = Array.isArray(recipe?.instructions)
  ? recipe.instructions
  : [];

  return (
    <>
    <Header/>
    <>
    <div className="flex flex-col mx-5">
        <div className="flex flex-col justify-center items-center">
          <img className="mt-20" width={'300px'} height={'200px'} src={recipe?.image} onClick={() => handleImageClick(recipe.name)} alt={recipe.name}  />
          <p>Click on the image for the recipe videos </p>
          <div className="flex justify-around mt-5">
            <button onClick={handleWishlist} className="bg-yellow-600 text-white text-lg rounded p-2">
              ADD TO FAVOURITES
            </button>
          </div>
        </div>

        <div className="mx-5 sm:mx-2 me-5">
          <p className="text-gray-800 font-bold">RECIPE: {recipe?.id}</p>
          <h1 className="text-4xl font-bold text-red-600 mb-5">{recipe?.name}</h1>
          <h3 className="text-red-600 text-2xl font-bold">Rating : {recipe?.rating}</h3>
          <p className="text-md">Cuisine : {recipe?.cuisine}</p>
          <p className="text-md">Category : {recipe?.mealType}</p>
          <p className="mt-2 text-lg">
            <span className="font-bold">Ingredients: </span>
            {Array.isArray(recipe?.ingredients) ? recipe.ingredients.join(', ') : 'No ingredients available'}
          </p>
        </div>

        <div className="mt-5 mx-5 p-5 bg-gray-100 rounded-lg shadow-md">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-bold text-gray-700">Prep Time</h3>
              <p className="text-gray-600">{recipe?.prepTimeMinutes} mins</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-bold text-gray-700">Cook Time</h3>
              <p className="text-gray-600">{recipe?.cookTimeMinutes} mins</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-bold text-gray-700">Servings</h3>
              <p className="text-gray-600">{recipe?.servings}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-bold text-gray-700">Difficulty</h3>
              <p className={`text-gray-600 font-semibold ${recipe?.difficulty === 'Easy' ? 'text-green-500' : recipe?.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                {recipe?.difficulty}
              </p>
            </div>
          </div>
        </div>


        <div className="mt-5">
          <h1 className="text-3xl font-bold text-red-600 text-center">INSTRUCTIONS</h1>
          <ol className="list-decimal list-inside text-lg mb-5">
            {formattedInstructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
    </div>
    </>
    </>
  )
}

export default View