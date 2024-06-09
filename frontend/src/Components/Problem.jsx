import React from 'react';

const Problem = (props) => {
  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <img src={props.image} alt="Problem" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
      <p style={{'color':'#31948e', 'fontWeight':'bold', 'fontSize':'1.4rem'}}>{props.description}</p>
    </div>
  );
}

export default Problem;

