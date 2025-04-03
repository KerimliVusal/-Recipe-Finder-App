'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Recipes = () => {
    const [recipes, setRecipes] = useState(undefined);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const searchParams = useSearchParams(); 

    const query = searchParams.get('query');
    const cuisine = searchParams.get('cuisine');
    const maxReadyTime = searchParams.get('maxReadyTime');
    useEffect(() => {
        async function fetchRecipes() {
            const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&query=${query}&maxReadyTime=${maxReadyTime}&apiKey=${apiKey}`, {
            });
            const recipes = await res.json();
            setRecipes(recipes?.results
            );
        };
        fetchRecipes();
    }, []);

    return (
        <div className="container mx-auto p-4">
            {recipes ===undefined ? <div className="flex justify-center items-center h-screen">
                <div className="flex items-center">
                    <div className="w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin border-t-blue-500"></div>

                </div>
            </div> : <>
                <h1 className="text-center text-4xl mb-6">Recipes</h1>
                <div className="grid grid-cols-3 gap-4">
                    {recipes?.length?recipes.map((recipe) => (
                        <Link key={recipe.id} href={`/Recipes/${recipe.id}`}>
                            <div key={recipe.id} className="border p-4 rounded">
                                <h2>{recipe.title}</h2>
                                <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
                            </div>
                        </Link>
                    )):
                    <div className="text-center text-2xl ml-50 ">
                    <h2 >No reciepe is found 🙁 ....</h2>

            </div>
                    }
                </div>
            </>}
        </div>
    );
};


export default Recipes;
