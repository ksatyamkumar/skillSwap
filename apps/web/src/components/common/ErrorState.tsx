type ErrorStateProps = {
  message: string;
};

const ErrorState = ({
  message,
}: ErrorStateProps) => {
  return (
    <div className="py-20 text-center">
      <p className="text-destructive">
        {message}
      </p>
    </div>
  );
};

export default ErrorState;