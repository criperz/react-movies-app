import React from "react";

// Component Interface
// Input: liked: boolean
// Output: onClick

// Stateless Functional Component
const Like = ({ liked, onClick }) => {
  return (
    <i
      onClick={onClick}
      className={liked ? "fa fa-heart clickable" : "fa fa-heart-o clickable"}
      aria-hidden="true"
    />
  );
};

export default Like;
