"use client";

import { useState } from "react";
import CheckMark from "./elements/icons/checkmark-icon";

export default function CustomColorPicker({
  color: initialColor,
  options,
  name,
}: {
  color: string;
  options: { name: string; value: string }[];
  name: string;
}) {
  const [color, setColor] = useState(initialColor || options[0].value);

  if (!options.some((option) => option.value.toLowerCase() == color.toLowerCase())) {
    setColor(options[0].value);
  }

  return (
    <>
      <input
        name={name}
        type="color"
        className="sr-only"
        value={color}
        readOnly
      />

      <ul className="flex gap-4">
        {options.map((option) => {
          const isActive = option.value.toLowerCase() == color.toLowerCase();
          return (
            <li key={option.value}>
              <button
                type="button"
                title={option.name}
                className={`rounded-full grid grid-cols-1 grid-rows-1 place-content-center items-center p-3 w-14 h-14`}
                style={{ background: option.value }}
                onClick={() => setColor(option.value)}
              >
                {isActive ? <CheckMark /> : null}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
