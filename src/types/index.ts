export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strArea: string;
  strCategory: string;
  strTags?: string;
  strSource?: string;
  strYoutube?: string;
  [key: string]: any;
};

export type IngredientWithMeasure = {
  index: number;
  ingredient: string;
  measure: string;
};
