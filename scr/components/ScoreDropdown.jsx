// ScoreDropdown.jsx

import React from "react";

export default function ScoreDropdown({ value, onChange }) {
  return (
    <label>
      Min Score:
      <select value={value} onChange={e => onChange(Number(e.target.value))}>
        <option value={0}>Show all</option>
        <option value={5}>5+</option>
        <option value={10}>10+</option>
        <option value={15}>15+</option>
        <option value={20}>20+</option>
      </select>
    </label>
  );
}
