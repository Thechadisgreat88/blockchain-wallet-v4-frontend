import { lift, map } from 'ramda'
import { selectors } from 'data'

export const getData = state => {
  const formatAccounts = map(x => ({ label: x.label, value: x }))
  const defaultId = selectors.core.kvStore.bch.getDefaultAccountId(state)
  const wallets = selectors.core.common.bch.getAccountsBalances(state).map(formatAccounts)

  const combine = (wallets, defaultId) => ({ wallets, defaultId })

  return lift(combine)(wallets, defaultId)
}
