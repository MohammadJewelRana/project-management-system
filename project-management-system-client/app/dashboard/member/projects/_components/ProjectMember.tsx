"use client";

interface Props {
  members: any[];
}

export const ProjectMembers = ({
  members,
}: Props) => {
  return (
    <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Team Members
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {members?.map((member) => (
          <div
            key={member?._id}
            className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-black/20 p-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 font-bold text-white">
              {member?.name?.charAt(0)}
            </div>

            <div>
              <h3 className="font-semibold text-white">
                {member?.name}
              </h3>

              <p className="text-sm capitalize text-zinc-500">
                {member?.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};