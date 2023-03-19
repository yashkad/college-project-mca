import { useState, Fragment } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function ThemeDropdown({
  options,
  selectedOption,
  setOption,
}: any) {
  return (
    <div className="">
      <Listbox
        value={selectedOption}
        onChange={(val) => {
          setOption(val);
          //   alert(val);
        }}
        multiple={false}
      >
        <Listbox.Button
          className={` bg-white border-2 rounded-lg px-5 py-1 text-xs `}
        >
          <span>{selectedOption.name}</span>
        </Listbox.Button>

        <Listbox.Options
          className={
            "mt-1 max-h-[300px]  overflow-y-scroll rounded-b-3xl border-2 border-gray bg-white p-2 shadow-lg absolute z-50"
          }
        >
          {options.map((option: any) => (
            <Listbox.Option
              key={option}
              value={option}
              // disabled={option.unavailable}
              className={`p-1 text-sm font-normal focus:bg-slate-900 hover:bg-gray-400 hover:text-white ${
                option.name === selectedOption.name &&
                "bg-red-400 text-slate-50"
              }`}
            >
              {option.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
