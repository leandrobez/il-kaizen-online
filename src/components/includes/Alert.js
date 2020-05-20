import React from 'react';

export default function Alert(props) {
  if (props.show) {
    const msg = props.message.value;

    return (
      <div className={'il-alert il-alert--' + props.message.type + ' move'}>
        {msg}
      </div>
    );
  }
  return '';
}
