import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

type AuthCardProps = {
  title: string;
  children: ReactNode;
};

const AuthCard = ({
  title,
  children,
}: AuthCardProps) => {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default AuthCard;