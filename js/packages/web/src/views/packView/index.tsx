import React  from 'react';
import { Row, Col } from 'antd';

import { Card } from './components/Card';

export const PackView = () => {
  const mockBlocks = Array.from({length: 10}, (v, i) => i);

  return (
    <div className="pack-view">
      <Row>
        <Col md={16}>
          <div className="pack-view__list">
            {
              mockBlocks.map((block, i) => (
                <Card value={i} />
              ))
            }
          </div>
        </Col>
        <Col md={8} >
          <div className="pack-view__sidebar">
            <h4>Morning</h4>
            <div>

            </div>
          </div>
        </Col>
      </Row>

    </div>
  );
};

