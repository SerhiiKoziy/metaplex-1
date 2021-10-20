import React  from 'react';
import { Row, Col, Typography } from 'antd';

const { Text } = Typography;

export const PackView = () => {
  const mockBlocks = Array.from({length: 10}, (v, i) => i);

  return (
    <div className="pack-view">
      <Row>
        <Col md={16}>
          <div className="pack-view__list">
            {
              mockBlocks.map((block, i) => (
                <div key={i} className="pack-view__block">
                  <div className="pack-view__square">
                    <span>{ i === 0 ? '?' : i + 1}</span>
                  </div>
                </div>
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

