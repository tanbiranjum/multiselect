import React, { useState, useRef } from "react";
import Data from "../data/select.json";

const MultiSelect = ({ handleChange, selected, setSelected }) => {
  const deleteItem = (index) => {
    const options = ref.current.options;
    options[index].style.backgroundColor = "transparent";
    options[index].selected = false;
    options[index].style.color = "white";
    const newSelected = selected.filter((item) => item.index !== index);
    setSelected([...newSelected]);
  };

  const ref = useRef();
  return (
    <div className="mt-2">
      <select
        multiple
        size="5"
        onChange={handleChange}
        ref={ref}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/5 p-2.5 bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {Data.map((item, index) => (
          <>
            <option key={index} value={item.value} className="text-lg">
              {item.label}
            </option>
            {item.options.map((option, index) => (
              <>
                <option key={index} value={option.value} className="text-lg">
                  &nbsp;&nbsp;&nbsp;&nbsp;{option.label}
                </option>
                {option.options &&
                  option.options.map((option, index) => (
                    <option
                      key={index}
                      value={option.value}
                      className="text-lg"
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {option.label}
                    </option>
                  ))}
              </>
            ))}
          </>
        ))}
      </select>
      <div className="flex mt-3 gap-x-2">
        {selected?.map((item, index) => (
          <div
            className="bg-violet-400 text-white p-2 flex gap-x-2 rounded-sm"
            key={index}
          >
            {item.name}
            <button
              className="text-gray-700 font-bold"
              onClick={() => {
                deleteItem(item.index);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
