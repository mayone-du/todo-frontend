import type { ReactNode, VFC } from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = (props: FallbackProps) => {
  return (
    <div>
      <h2 className="py-4 text-2xl font-bold text-center">ErrorBoundary!</h2>
      <pre>{props.error.message}</pre>
    </div>
  );
};

export const LayoutErrorBoundary: VFC<{ children: ReactNode }> = (props) => {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{props.children}</ErrorBoundary>;
};
