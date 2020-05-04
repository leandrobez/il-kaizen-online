import React from 'react';

const handledLoad = (flag) => {
  let currentClass = flag ? 'il-load il-show' : 'il-load';
    return currentClass;
};
export default function Loanding(props) {
  return (
    <div className={handledLoad(props.flag)}>
      <div className="il-load--wrapper">
        <p>{props.title}...</p>
        <div className="il-load--animate">
          <span className="il-load--line"></span>
          <span className="il-load--line"></span>
          <span className="il-load--line"></span>
        </div>
      </div>
    </div>
  );
}
