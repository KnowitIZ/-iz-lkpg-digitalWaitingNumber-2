import React, { useState } from "react";

export const Index = () => {
  const initThemes = [
    "info",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "dark",
  ];
  const [themes, setThemes] = useState(initThemes);
  const [selectedTheme, setSelectedTheme] = useState(initThemes[0]);

  return (
    <div className={`bg-${selectedTheme} p-2`} style={{ height: "100vh" }}>
      <div className="form-group text-left">
        <label className="text-white my-3">Theme:</label>
        <select
          className="form-select"
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
        >
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
