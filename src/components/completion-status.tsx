"use client";
import { updateTask } from "@/server-api";
import { useState } from "react";
import UnCheckedIcon from "./elements/icons/unchecked-icon";
import CheckedIcon from "./elements/icons/checked-icon";

export default function CompletionStatus({
  status: initialStatus,
  id,
}: {
  status: boolean;
  id: number;
}) {
  const [status, setStatus] = useState(initialStatus);
  return (
      <button
        className={`mt-0.5 hover:bg-theme-blue-base hover:bg-opacity-15 rounded-full `}
        onClick={async () => {
          // make it feel instant
          setStatus((s) => !s);
          await updateTask(id, { completed: !status }).catch(() =>
            // set it back if we fail
            setStatus((s) => !s),

          );
        }}
      >
        {status ? <CheckedIcon /> : <UnCheckedIcon />}
      </button>
  );
}
