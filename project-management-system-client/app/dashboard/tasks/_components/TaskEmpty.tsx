import { HiOutlinePlus } from "react-icons/hi";

interface Props {
  onCreate: () => void;
}

export const TaskEmpty = ({
  onCreate,
}: Props) => {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-[32px]
        border
        border-dashed
        border-white/[0.08]
        bg-[#111113]
        px-6
        py-20
        text-center
      "
    >
      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-[28px]
          bg-blue-500/10
        "
      >
        <HiOutlinePlus className="text-4xl text-blue-400" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-white">
        No Tasks Found
      </h2>

      <p className="mt-3 max-w-md text-sm leading-7 text-zinc-500">
        Create your first task and start managing agile sprint workflow.
      </p>

      <button
        onClick={onCreate}
        className="
          mt-8
          flex
          h-12
          items-center
          gap-2
          rounded-2xl
          bg-gradient-to-r
          from-blue-500
          to-indigo-500
          px-6
          text-sm
          font-medium
          text-white
        "
      >
        <HiOutlinePlus className="text-lg" />

        Create Task
      </button>
    </div>
  );
};