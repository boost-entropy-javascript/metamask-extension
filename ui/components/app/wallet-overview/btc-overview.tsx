import React from 'react';

import { useSelector } from 'react-redux';
import {
  getMultichainProviderConfig,
  getMultichainSelectedAccountCachedBalance,
} from '../../../selectors/multichain';
import { CoinOverview } from './coin-overview';

type BtcOverviewProps = {
  className?: string;
};

const BtcOverview = ({ className }: BtcOverviewProps) => {
  const { chainId } = useSelector(getMultichainProviderConfig);
  const balance = useSelector(getMultichainSelectedAccountCachedBalance);

  return (
    <CoinOverview
      balance={balance}
      balanceIsCached
      className={className}
      chainId={chainId}
      isSigningEnabled={false}
      isSwapsChain={false}
      ///: BEGIN:ONLY_INCLUDE_IF(build-main,build-beta,build-flask)
      isBridgeChain={false}
      isBuyableChain
      // TODO: Remove this logic once `isNativeTokenBuyable` has been
      // merged (see: https://github.com/MetaMask/metamask-extension/pull/24041)
      isBuyableChainWithoutSigning
      ///: END:ONLY_INCLUDE_IF
    />
  );
};

export default BtcOverview;
