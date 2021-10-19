import React from 'react';
import { Button, Typography } from 'antd';

import { ArtContent } from '../../../components/ArtContent';

const { Text, Title } = Typography;

function FinalStep({ attributes, backButton }) {
  const voucher = attributes.vouchersItems[0];
  const packValues = attributes.initPackValues;

  const renderItem = (item, type) => {
    const id = item.metadata.pubkey;
    const { name, uri } = item.metadata?.info?.data;
    const cardCounts = type === 'card' ? attributes.cardsCount.find(card => card[id])[id] : null;

    return (
      <div
        style={{
          paddingBottom: 40,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Title level={5} style={{ color: 'white' }}>Name: {name}</Title>
          {
            cardCounts && (
              <>
                <Text>Count: {cardCounts?.count || 0}</Text>
                <Text>MaxSupply: {cardCounts?.maxSupply || 0}</Text>
              </>
            )
          }
        </div>

        <ArtContent
          pubkey={id}
          uri={uri}
          style={{
            width: '150px',
            height: '150px',
            justifyContent: 'start',
          }}
        />
      </div>
    )
  }

  return (
    <div className="form-box">
      <div>
        <Title level={3} style={{ color: 'white' }}>Pack: </Title>
        {
          packValues && (
            <div
              style={{
                paddingBottom: 40,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Title level={5} style={{ color: 'white' }}>
                  Name: {packValues.name}
                </Title>
                <Title level={5} style={{ color: 'white' }}>
                  Distribution Type: {packValues.distributionType}
                </Title>
                <Title level={5} style={{ color: 'white' }}>
                  Poster URL: {packValues.uri}
                </Title>
                <Title level={5} style={{ color: 'white' }}>
                  Allowed Amount To Redeem: {packValues.allowedAmountToRedeem}
                </Title>
                <Title level={5} style={{ color: 'white' }}>
                  Redeem Start Date: {packValues.redeemStartDate || 'Unselected'}
                </Title>
                <Title level={5} style={{ color: 'white' }}>
                  Redeem End Date: {packValues.redeemEndDate  || 'Unselected'}
                </Title>
                <Title level={5} style={{ color: 'white' }}>
                  Mutable: {packValues.mutable ? 'yes' : 'no'}
                </Title>
              </div>
            </div>
          )
        }

        <Title level={3} style={{ color: 'white' }}>Voucher: </Title>
        {
          voucher && renderItem(voucher, 'voucher')
        }

        <Title level={3} style={{ color: 'white' }}>Cards: </Title>
        {
          attributes.cardsItems.length > 0 && (
            attributes.cardsItems.map((card) => renderItem(card, 'card'))
          )
        }
      </div>
      <div style={{ display: "flex" }}>
        <Button type="primary" htmlType="submit">
          Create pack
        </Button>
        {backButton}
      </div>
    </div>
  );
}

export default FinalStep;
