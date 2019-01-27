import React from "react";
const DefaultList = props => {
  return (
    <div>
      {console.log(props.person)}
      {props.person.firstName}
    </div>
  );
};

export default DefaultList;
