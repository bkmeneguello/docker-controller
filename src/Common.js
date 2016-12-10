import React from 'react';
import { Label, Glyphicon } from 'react-bootstrap';

let SimpleValue = ({text, onEdit, onRemove}) => {
  return (
    <h4>
      <Label>
        <span onClick={onEdit} style={{cursor: 'pointer'}}>{text}</span>
        <Glyphicon glyph="remove" onClick={onRemove} style={{top: '2px', left: '3px', cursor: 'pointer'}}/>
      </Label>
    </h4>
  );
};

export { SimpleValue };
