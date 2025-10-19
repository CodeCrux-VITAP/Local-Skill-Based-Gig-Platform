import { useState, useRef, useEffect } from "react";

export default function RoleDropdown({ form, setForm }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const options = ["client", "provider"];

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 border rounded-md cursor-pointer bg-white text-gray-800 flex justify-between items-center"
      >
        {form.role}
        <span className="ml-2">&#9662;</span>
      </div>

      {open && (
        <ul className="absolute w-full bg-white border rounded-md mt-1 shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setForm({ ...form, role: option });
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
