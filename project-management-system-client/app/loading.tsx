"use client";

type Props = {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  text?: string;
};

const LoadingSpinner = ({ size = "md", fullScreen = false, text }: Props) => {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-9 w-9 border-[3px]",
    lg: "h-16 w-16 border-4",
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`animate-spin rounded-full border-slate-200 border-t-indigo-600 shadow-sm ${sizeClasses[size]}`}
      />
      {text && (
        <p className="text-sm text-slate-500 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
