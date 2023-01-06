import MultiSelect from "./components/MultiSelect";
import React, { useState } from "react";

function App() {
  const data = JSON.parse(localStorage.getItem("savedata")) || {};

  const [name, setName] = useState(data.name || "");
  const [selected, setSelected] = useState(data.selected || []);
  const [terms, setTerms] = useState(data.terms || false);

  const handleChange = (e) => {
    const options = e.target.options;
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        options[i].style.backgroundColor = "#D0C1FC";
        if (selected.length > 0) {
          setSelected([
            ...selected,
            { value: options[i].value, index: i, name: options[i].label },
          ]);
        } else {
          setSelected([
            { value: options[i].value, index: i, name: options[i].label },
          ]);
        }
      }
    }
  };

  const onSubmit = () => {
    const data = {
      name,
      selected,
      terms,
    };
    localStorage.setItem("savedata", JSON.stringify(data));
  };

  return (
    <div className="App p-24 bg-slate-500 min-h-screen">
      <h1 className="text-2xl text-gray-50 mb-3">
        Please enter your name and pick the Sectors you are currently involved
        in.
      </h1>
      <hr className="w-3/4" />
      <div className="mt-4">
        <div className="space-y-1 text-sm">
          <label htmlFor="name" className="block dark:text-gray-50 text-lg">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-1/5 px-4 py-3 rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:dark:border-violet-400"
          />
        </div>
        <div className="space-y-1 text-sm mt-4">
          <label htmlFor="select" className="block dark:text-gray-50 text-lg">
            Sectors
          </label>
          <MultiSelect
            handleChange={handleChange}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className="flex items-center mt-3">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            aria-label="Remember me"
            onChange={(e) => {
              setTerms(e.target.checked);
            }}
            className="mr-1 rounded-sm focus:ring-violet-400 focus:dark:border-violet-400 focus:ring-2 accent-violet-400"
          />
          <label
            htmlFor="remember"
            className="text-md dark:text-gray-50"
            defaultValue={terms}
          >
            Agree to terms
          </label>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          className="px-8 mt-4 py-2 font-semibold rounded bg-violet-400 text-gray-50"
        >
          save
        </button>
      </div>
    </div>
  );
}

export default App;
