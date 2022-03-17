import React from 'react';

const FlexContainer = props => {
  return (
    <div style={{
        display: "flex",
        flexDirection: props.flexDirection ?? "row",
        flexWrap: "wrap",
        justifyContent: props.alignX ?? "center",
        alignItems: props.alignY ?? "center",
        margin: props.margin,
    }}>
        {props.children}
    </div>
  );
};

export default FlexContainer;
