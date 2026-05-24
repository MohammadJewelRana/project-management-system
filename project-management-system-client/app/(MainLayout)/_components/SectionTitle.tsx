// components/landing/section-title.tsx

interface SectionTitleProps {
  title: string;
  description: string;
}

const SectionTitle = ({ title, description }: SectionTitleProps) => {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-7 text-zinc-500 sm:text-base lg:text-lg">
        {description}
      </p>
    </div>
  );
}

export default SectionTitle;