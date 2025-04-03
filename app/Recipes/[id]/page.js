'use client'

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const RecipeDetail = () => {
    const [recipe, setRecipe] = useState({ image: null })
    const { id } = useParams();
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    useEffect(() => {
        if (id) {
            async function fetchRecipeById() {
                const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`, {
                });
                const recipes = await res.json();
                setRecipe(recipes
                );
            };
            fetchRecipeById();
        }
    }, [id]);

    return (
        <div className="container mx-auto p-4 mt-5">
      {!recipe?.id ?<div className="flex justify-center items-center h-screen">
  <div className="flex items-center">
    <div className="w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin border-t-blue-500"></div>
    
  </div>
</div> :<>
            <h1 className="text-center text-4xl mb-6">{recipe.title}</h1>
            <div className="flex flex-row items-center mt-20">
                <img
                    src={recipe.image}
                    alt={`${id}`}
                    layout="fill"
                    className="rounded-lg"
                />
                <div className="flex flex-col items-center ml-20">
                <h2 className=" mt-4 text-2xl">Ingredients:</h2>
                <div className="ml-30 "> 
                    {recipe?.extendedIngredients?.map((ingredient) => (
                        <h1 key={ingredient.id}>{'-'}{' '}{ingredient.name}</h1>
                    ))}
                </div>
                </div>
            </div>
            </>
}
        </div>
    );
};


export default RecipeDetail;
