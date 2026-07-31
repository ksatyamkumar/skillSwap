import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PageContainer = ({
  children,
}: Props) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {children}
    </div>
  );
};

export default PageContainer;