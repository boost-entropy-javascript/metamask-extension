import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NameType } from '@metamask/name-controller';
import { BigNumber } from 'bignumber.js';

import { parseTypedDataMessage } from '../../../../../../../../shared/modules/transaction.utils';
import { Numeric } from '../../../../../../../../shared/modules/Numeric';
import Name from '../../../../../../../components/app/name/name';
import {
  ConfirmInfoRow,
  ConfirmInfoRowText,
} from '../../../../../../../components/app/confirm/info/row';
import { useI18nContext } from '../../../../../../../hooks/useI18nContext';
import { currentConfirmationSelector } from '../../../../../../../selectors';
import { Box, Text } from '../../../../../../../components/component-library';
import Tooltip from '../../../../../../../components/ui/tooltip';
import {
  BackgroundColor,
  BorderRadius,
  Display,
  TextAlign,
} from '../../../../../../../helpers/constants/design-system';
import { SignatureRequestType } from '../../../../../types/confirm';
import useTokenExchangeRate from '../../../../../../../components/app/currency-input/hooks/useTokenExchangeRate';
import { IndividualFiatDisplay } from '../../../../simulation-details/fiat-display';
import {
  formatAmount,
  formatAmountMaxPrecision,
} from '../../../../simulation-details/formatAmount';
import { ConfirmInfoSection } from '../../../../../../../components/app/confirm/info/row/section';

const PermitSimulation: React.FC<{
  tokenDecimals: number;
}> = ({ tokenDecimals }) => {
  const t = useI18nContext();
  const currentConfirmation = useSelector(
    currentConfirmationSelector,
  ) as SignatureRequestType;

  const {
    domain: { verifyingContract },
    message: { value },
  } = parseTypedDataMessage(currentConfirmation.msgParams?.data as string);

  const exchangeRate = useTokenExchangeRate(verifyingContract);

  const fiatValue = useMemo(() => {
    if (exchangeRate && value) {
      return exchangeRate.times(new Numeric(value, 10)).toNumber();
    }
    return undefined;
  }, [exchangeRate, value]);

  const { tokenValue, tokenValueMaxPrecision } = useMemo(() => {
    const valueBN = new BigNumber(value / Math.pow(10, tokenDecimals));
    return {
      tokenValue: formatAmount('en-US', valueBN),
      tokenValueMaxPrecision: formatAmountMaxPrecision('en-US', valueBN),
    };
  }, [tokenDecimals, value]);

  return (
    <ConfirmInfoSection>
      <ConfirmInfoRow
        label={t('simulationDetailsTitle')}
        tooltip={t('simulationDetailsTitleTooltip')}
      >
        <ConfirmInfoRowText text={t('permitSimulationDetailInfo')} />
      </ConfirmInfoRow>
      <ConfirmInfoRow label={t('spendingCap')}>
        <Box style={{ marginLeft: 'auto' }}>
          <Box display={Display.Flex}>
            <Box display={Display.Inline} marginInlineEnd={1}>
              <Tooltip
                position="bottom"
                title={tokenValueMaxPrecision}
                wrapperStyle={{ minWidth: 0 }}
                interactive
              >
                <Text
                  backgroundColor={BackgroundColor.backgroundAlternative}
                  borderRadius={BorderRadius.XL}
                  paddingInline={2}
                  textAlign={TextAlign.Center}
                >
                  {tokenValue}
                </Text>
              </Tooltip>
            </Box>
            <Name value={verifyingContract} type={NameType.ETHEREUM_ADDRESS} />
          </Box>
          <Box>
            {fiatValue && <IndividualFiatDisplay fiatAmount={fiatValue} />}
          </Box>
        </Box>
      </ConfirmInfoRow>
    </ConfirmInfoSection>
  );
};

export default PermitSimulation;
