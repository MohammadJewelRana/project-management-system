import { HiOutlineSearch } from "react-icons/hi";

interface Props {
  filters: any;

  setFilters: any;

  projects: any[];

  sprints: any[];

  users: any[];
}

export const TaskFilters = ({
  filters,
  setFilters,
  projects,
  sprints,
  users,
}: Props) => {
  return (
    <div
      className="
        grid
        gap-4
        rounded-[32px]
        border
        border-white/[0.06]
        bg-[#111113]
        p-5
        md:grid-cols-2
        xl:grid-cols-6
      "
    >
      {/* SEARCH */}
      <div className="relative xl:col-span-2">
        <HiOutlineSearch
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-xl
            text-zinc-500
          "
        />

        <input
          value={filters.search}
          onChange={(e) =>
            setFilters({
              ...filters,
              search:
                e.target.value,
            })
          }
          placeholder="Search task..."
          className="
            h-12
            w-full
            rounded-2xl
            border
            border-white/[0.06]
            bg-[#18181B]
            pl-12
            pr-4
            text-sm
            text-white
            outline-none
          "
        />
      </div>

      {/* STATUS */}
      <select
        value={filters.status}
        onChange={(e) =>
          setFilters({
            ...filters,
            status:
              e.target.value,
          })
        }
        className="
          h-12
          rounded-2xl
          border
          border-white/[0.06]
          bg-[#18181B]
          px-4
          text-sm
          text-white
          outline-none
        "
      >
        <option value="">
          Status
        </option>

        <option value="todo">
          Todo
        </option>

        <option value="in-progress">
          In Progress
        </option>

        <option value="review">
          Review
        </option>

        <option value="done">
          Done
        </option>
      </select>

      {/* PRIORITY */}
      <select
        value={filters.priority}
        onChange={(e) =>
          setFilters({
            ...filters,
            priority:
              e.target.value,
          })
        }
        className="
          h-12
          rounded-2xl
          border
          border-white/[0.06]
          bg-[#18181B]
          px-4
          text-sm
          text-white
          outline-none
        "
      >
        <option value="">
          Priority
        </option>

        <option value="low">
          Low
        </option>

        <option value="medium">
          Medium
        </option>

        <option value="high">
          High
        </option>

        <option value="urgent">
          Urgent
        </option>
      </select>

      {/* PROJECT */}
      <select
        value={filters.project}
        onChange={(e) =>
          setFilters({
            ...filters,
            project:
              e.target.value,
          })
        }
        className="
          h-12
          rounded-2xl
          border
          border-white/[0.06]
          bg-[#18181B]
          px-4
          text-sm
          text-white
          outline-none
        "
      >
        <option value="">
          Project
        </option>

        {projects?.map(
          (project: any) => (
            <option
              key={project._id}
              value={project._id}
            >
              {project.title}
            </option>
          )
        )}
      </select>

      {/* ASSIGNEE */}
      <select
        value={filters.assignee}
        onChange={(e) =>
          setFilters({
            ...filters,
            assignee:
              e.target.value,
          })
        }
        className="
          h-12
          rounded-2xl
          border
          border-white/[0.06]
          bg-[#18181B]
          px-4
          text-sm
          text-white
          outline-none
        "
      >
        <option value="">
          Assignee
        </option>

        {users?.map(
          (user: any) => (
            <option
              key={user._id}
              value={user._id}
            >
              {user.name}
            </option>
          )
        )}
      </select>
    </div>
  );
};
