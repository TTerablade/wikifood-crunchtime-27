import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface RecipeCardProps {
  title: string;
  description: string;
  image: string;
}

const RecipeCard = ({ title, description, image }: RecipeCardProps) => {
  const { toast } = useToast();

  const handleSeeRecipe = () => {
    toast({
      title: "Recipe Selected",
      description: `You selected ${title}. Full recipe details coming soon!`,
    });
  };

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        <CardDescription className="mb-4">{description}</CardDescription>
        <Button onClick={handleSeeRecipe} variant="outline" className="w-full">See Recipe</Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;