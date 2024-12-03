import { createContext, useContext, useState, ReactNode } from 'react';

type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  cuisineType: string;
  mealType: string;
  dietaryRestrictions: string[];
};

type RecipeContextType = {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  filters: {
    cuisineType: string;
    mealType: string;
    dietaryRestrictions: string;
  };
  setFilters: (filters: { cuisineType: string; mealType: string; dietaryRestrictions: string }) => void;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes] = useState<Recipe[]>([
    {
      id: '1',
      title: 'Easy Pancakes',
      description: 'Fluffy and delicious pancakes perfect for breakfast',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800',
      cuisineType: 'american',
      mealType: 'breakfast',
      dietaryRestrictions: ['vegetarian'],
    },
    {
      id: '2',
      title: 'Chicken Stir Fry',
      description: 'A quick and healthy stir-fry loaded with vegetables',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800',
      cuisineType: 'chinese',
      mealType: 'dinner',
      dietaryRestrictions: [],
    },
    {
      id: '3',
      title: 'Vegetarian Pasta',
      description: 'Fresh and flavorful pasta with seasonal vegetables',
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800',
      cuisineType: 'italian',
      mealType: 'lunch',
      dietaryRestrictions: ['vegetarian', 'vegan'],
    },
  ]);

  const [filters, setFilters] = useState({
    cuisineType: '',
    mealType: '',
    dietaryRestrictions: '',
  });

  const filteredRecipes = recipes.filter(recipe => {
    if (filters.cuisineType && recipe.cuisineType !== filters.cuisineType) return false;
    if (filters.mealType && recipe.mealType !== filters.mealType) return false;
    if (filters.dietaryRestrictions && !recipe.dietaryRestrictions.includes(filters.dietaryRestrictions)) return false;
    return true;
  });

  return (
    <RecipeContext.Provider value={{ recipes, filteredRecipes, filters, setFilters }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};