import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-4 p-6">
          <h1 className="text-2xl font-bold">SkillSwap</h1>

          <Button className="w-full">
            shadcn is working
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;