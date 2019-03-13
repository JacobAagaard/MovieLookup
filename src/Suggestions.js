import React from "react";

const Suggestions = props => {
  const options = props.results.map(r => (
    <li key={r.id}>
      {r.title} ({r.vote_average})
      <br />
      <br />
    </li>
  ));
  return (
    <ul className="unstyled">
      <br />
      {options}
    </ul>
  );
};

export default Suggestions;
