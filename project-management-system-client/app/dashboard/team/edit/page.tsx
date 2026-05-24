"use client";

import {
  useSearchParams,
} from "next/navigation";

export default function EditUserPage() {
  const searchParams =
    useSearchParams();

  const id =
    searchParams.get("id");

  return (
    <div className="text-white">
      {id}
    </div>
  );
}