import Block from "@/components/Block"
import Text from "@/components/Text"
import { numberFormatter } from "@/utils/formatters"
import { useCallback, useMemo, useState } from "react"
import styles from '@/styles/PremiumCalc.module.scss'
import Image from "next/image"

const BASE_RATIO = 1.094827
const PREMIUM_RATIO = 1.098467
const PREMIUM_PERCENTAGE = (PREMIUM_RATIO - BASE_RATIO) / BASE_RATIO * 100
const RATIO_TYPE = PREMIUM_PERCENTAGE > 0 ? 'premium' : 'discount'
const GAS_COST = 0.01

const PremiumCalc = () => {
  const [amount, setAmount] = useState<string>()

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }, [])

  const output = useMemo(() => {
    if (!amount) return 0
    return Number(amount) * PREMIUM_RATIO
  }, [amount])

  const pnl = useMemo(() => {
    if (!amount) return undefined
    const BASE_OUTPUT = BASE_RATIO * Number(amount)
    return output - BASE_OUTPUT
  }, [amount, output])

    return (
        <Block>
          <div className={styles.trade_info}>
            <Text tag="span">there is a current market {RATIO_TYPE} of: </Text>
            <Text color='#83B037' tag="span" title='premium'>{numberFormatter.format(PREMIUM_PERCENTAGE)}%</Text>
          </div>
          <div className={styles.form}>
            <div className={styles.input}>
              <Image alt='rETH' src="/reth.png" width={35} height={35} />
              <input
                title="amount of rETH to unstake"
                onChange={onChange}
                placeholder="Amount of rETH"
                value={amount}
              />
            </div>
            <div className={styles.output}>
              <Image alt='eth' src="/eth.png" width={35} height={35} />
              <Text tag="span">{output ? numberFormatter.format(output, 3) : '0'} ETH</Text>
            </div>
          </div>
          {!!pnl && (
            <div className={styles.trade_info_section}>
              <div className={styles.trade_info}>
                <Text tag="span">premium: </Text>
                <Text color='#83B037' tag="span" title='pnl'>{numberFormatter.compact(pnl)} eth</Text>
              </div>
              <div className={styles.trade_info}>
                <Text tag="span">gas cost: </Text>
                <Text color='#B80012' tag="span" title='gas'>{numberFormatter.compact(GAS_COST, 3)} eth</Text>
              </div>
              <div className={styles.trade_info}>
                <Text tag="span">profit: </Text>
                <Text color='#83B037' tag="span" title='profit'>{numberFormatter.compact(pnl - GAS_COST, 3)} eth</Text>
              </div>
            </div>
          )}
        </Block>
    )
}

export default PremiumCalc
