import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';

import {
  formatTokenAmount,
  useMint,
  fromLamports,
  CountdownState,
  PriceFloorType,
} from '@oyster/common';
import { AuctionView, AuctionViewState, useBidsForAuction } from '../../hooks';
import { AmountLabel } from '../AmountLabel';
import { useAuctionCountdown } from '../../hooks/useAuctionCountdown';

export const AuctionCountdown = (props: {
  auctionView: AuctionView;
  labels: boolean;
}) => {
  const { auctionView } = props;
  const state = useAuctionCountdown(auctionView);
  const ended = isEnded(state);
  if (!props.labels) {
    return <Countdown state={state} />;
  }
  return (
    <Col span={ended ? 24 : 10}>
      <LabeledCountdown state={state} />
    </Col>
  );
};

export const AuctionNumbers = (props: {
  auctionView: AuctionView;
  hideCountdown?: boolean;
  showAsRow?: boolean;
  displaySOL?: boolean;
}) => {
  const { auctionView } = props;
  const state = useAuctionCountdown(auctionView);
  const bids = useBidsForAuction(auctionView.auction.pubkey);
  const mintInfo = useMint(auctionView.auction.info.tokenMint);

  const participationFixedPrice =
    auctionView.auctionManager.participationConfig?.fixedPrice || 0;
  const participationOnly =
    auctionView.auctionManager.numWinners.toNumber() === 0;
  const priceFloor =
    auctionView.auction.info.priceFloor.type === PriceFloorType.Minimum
      ? auctionView.auction.info.priceFloor.minPrice?.toNumber() || 0
      : 0;
  const isUpcoming = auctionView.state === AuctionViewState.Upcoming;
  const isStarted = auctionView.state === AuctionViewState.Live;

  const ended = isEnded(state);

  return (
    <div style={{ minWidth: 350 }}>
      <Row>
        {(!ended || auctionView.isInstantSale) && (
          <Col span={12}>
            {(isUpcoming || bids.length === 0) && (
              <AmountLabel
                style={{ marginBottom: 10 }}
                containerStyle={{ flexDirection: 'column' }}
                title={auctionView.isInstantSale ? 'Price' : 'Starting bid'}
                amount={fromLamports(
                  participationOnly ? participationFixedPrice : priceFloor,
                  mintInfo,
                )}
              />
            )}
            {isStarted && bids.length > 0 && (
              <AmountLabel
                style={{ marginBottom: 10 }}
                containerStyle={{ flexDirection: 'column' }}
                title="Highest bid"
                amount={formatTokenAmount(bids[0].info.lastBid, mintInfo)}
              />
            )}
          </Col>
        )}

        {!ended && <Col span={ended ? 24 : 12}>
          <Countdown state={state}/>
        </Col>}
      </Row>
    </div>
  );
};

const isEnded = (state?: CountdownState) =>
  state?.days === 0 &&
  state?.hours === 0 &&
  state?.minutes === 0 &&
  state?.seconds === 0;

const Countdown = ({ state }: { state?: CountdownState }) => {
  let localState = state;
  if (!localState) {
    localState = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  return (
    <Row
      style={{ width: '100%', flexWrap: 'nowrap' }}
      className={'no-label-cd'}
    >
      {localState.days > 0 && (
        <Col>
          <div className="cd-number">
            {localState.days}
            <span style={{ opacity: 0.5 }}>days</span>
          </div>
        </Col>
      )}
      <Col>
        <div className="cd-number">
          {localState.hours}
          <span style={{ opacity: 0.5 }}>hours</span>
        </div>
      </Col>
      <Col>
        <div className="cd-number">
          {localState.minutes}
          <span style={{ opacity: 0.5 }}>min</span>
        </div>
      </Col>
      {!localState.days && (
        <Col>
          <div className="cd-number">
            {localState.seconds}
            <span style={{ opacity: 0.5 }}>sec</span>
          </div>
        </Col>
      )}
    </Row>
  );
};

const LabeledCountdown = ({ state }: { state?: CountdownState }) => {
  return (
    <>
      <div style={{ width: '100%' }}>
        <>
          <div
            className="info-header"
            style={{
              margin: '12px 0',
              fontSize: 18,
            }}
          >
            Time left
          </div>
          {state &&
            (isEnded(state) ? (
              <Row style={{ width: '100%' }}>
                <div className="cd-number">This auction has ended</div>
              </Row>
            ) : (
              <Row style={{ width: '100%', flexWrap: 'nowrap' }}>
                {state && state.days > 0 && (
                  <Col>
                    <div className="cd-number">
                      {state.days}
                      <span style={{ opacity: 0.5 }}>:</span>
                    </div>
                    <div className="cd-label">days</div>
                  </Col>
                )}
                <Col>
                  <div className="cd-number">
                    {state.hours}
                    <span style={{ opacity: 0.5 }}>:</span>
                  </div>
                  <div className="cd-label">hour</div>
                </Col>
                <Col>
                  <div className="cd-number">
                    {state.minutes}
                    {state.days === 0 && (
                      <span style={{ opacity: 0.5 }}>:</span>
                    )}
                  </div>
                  <div className="cd-label">mins</div>
                </Col>
                {!state.days && (
                  <Col>
                    <div className="cd-number">{state.seconds}</div>
                    <div className="cd-label">secs</div>
                  </Col>
                )}
              </Row>
            ))}
        </>
      </div>
    </>
  );
};
