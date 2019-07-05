import React from 'react';
import { Col } from 'reactstrap';
import SyncIcon from 'react-icons/lib/md/sync';

export default function Loading(props) {
  return (
    <Col>
      <div align='center'>
        <SyncIcon size={200} color='DimGrey'/>
        <h3>Loading. Please wait.</h3>
      </div>
    </Col>
  );
}
