import Block from "@/components/Block";
import Text from "@/components/Text";
import { numberFormatter } from "@/utils/formatters";
import { useCallback, useMemo, useState } from "react";
import styles from "@/styles/PremiumCalc.module.scss";
import Image from "next/image";
import CollapsibleSection from "../CollapsibleSection";
import useGetRatio from "@/hooks/useGetRatio";

const rETH_PROTOCOL_FEE = 0.0005;
const GAS_COST = 0.00578945;

const GREEN = "#23CE6B";
const RED = "#DB3A34";

const PremiumCalc = () => {
  const [amount, setAmount] = useState<string>();
  const [amountToDisplay, setAmountToDisplay] = useState<string>();

  const { data = {} } = useGetRatio();

  const {
    rate: {
      base: BASE_RATIO,
      market: PREMIUM_RATIO,
      percent: PREMIUM_PERCENTAGE,
      status: RATIO_TYPE,
    } = {} as any,
  } = data;

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const isNumber = e.target.value.match(/^[0-9]*\.?[0-9]*$/);
    const isDecimal = e.target.value.match(/[0.]+/);
    const isValid = isNumber || (isDecimal && isNumber);

    if (!e.target.value) {
      setAmount(undefined);
      setAmountToDisplay(undefined);
      return;
    }
    if (isValid) {
      setAmount(e.target.value);
      isDecimal
        ? setAmountToDisplay(e.target.value)
        : setAmountToDisplay(numberFormatter.format(e.target.value));
    } else {
      const filter = e.target.value.replace(/[^0-9.]/g, "");
      // remove comma
      const commaRemoved = filter.replace(/,/g, "");
      setAmount(commaRemoved);
      setAmountToDisplay(numberFormatter.format(commaRemoved));
    }
  }, []);

  const { output, pnl, ratioPNL } = useMemo(() => {
    const _amount = amount ? Number(amount) : 0;
    const output = _amount * PREMIUM_RATIO;
    const ratioPNL = output - _amount * BASE_RATIO;

    // fees
    // only used when minting rETH
    const deposit_fee = output * rETH_PROTOCOL_FEE;

    const pnl = ratioPNL - GAS_COST;

    return {
      amount,
      deposit_fee,
      output,
      pnl,
      ratioPNL,
    };
  }, [BASE_RATIO, PREMIUM_RATIO, amount]);

  const tradeOutcome = useMemo(() => {
    if (!pnl) return undefined;
    const val = pnl - GAS_COST;
    return val > 0
      ? {
          label: "earn",
          color: GREEN,
        }
      : {
          label: "lose",
          color: RED,
        };
  }, [pnl]);

  const ratioColor = useMemo(() => {
    if (!PREMIUM_PERCENTAGE) return undefined;
    return PREMIUM_PERCENTAGE > 0 ? GREEN : RED;
  }, [PREMIUM_PERCENTAGE]);

  return (
    <Block>
      <div className={styles.trade_info}>
        <Text tag="span">the current market {RATIO_TYPE} is </Text>
        <Text color={ratioColor} tag="span" title="premium">
          {numberFormatter.format(Math.abs(PREMIUM_PERCENTAGE), 4)}%
        </Text>
      </div>
      <div className={styles.form}>
        <div className={styles.input}>
          <Image alt="rETH" src="/reth.png" width={35} height={35} />
          <input
            title="amount of rETH to unstake"
            onChange={onChange}
            placeholder="Amount of rETH"
            value={amountToDisplay}
          />
        </div>
        <div className={styles.output}>
          <Image alt="eth" src="/eth.png" width={35} height={35} />
          <Text tag="span">
            {output ? numberFormatter.format(output, 3) : "0"} eth
          </Text>
        </div>
      </div>
      {!!ratioPNL && (
        <div className={styles.trade_info_section}>
          <div className={styles.trade_info}>
            <CollapsibleSection
              label={
                (
                  <>
                    <Text tag="span">you will {tradeOutcome?.label} </Text>
                    <Text color={tradeOutcome?.color} tag="span" title="profit">
                      {numberFormatter.compact(Math.abs(pnl))} eth
                    </Text>
                    <Text tag="span"> in this trade</Text>
                  </>
                ) as any
              }
            >
              <div className={styles.trade_info}>
                <Text tag="h5">
                  {RATIO_TYPE}:
                  <Text color={GREEN} tag="span" title="pnl">
                    {" "}
                    {numberFormatter.compact(ratioPNL)} eth
                  </Text>
                </Text>
              </div>
              <div className={styles.trade_info}>
                <Text tag="h5">
                  gas fee:
                  <Text color={RED} tag="span" title="gas">
                    {" "}
                    {numberFormatter.compact(GAS_COST)} eth
                  </Text>
                </Text>
              </div>
            </CollapsibleSection>
          </div>
        </div>
      )}
    </Block>
  );
};

export default PremiumCalc;
