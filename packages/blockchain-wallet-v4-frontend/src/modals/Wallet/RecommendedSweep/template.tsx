import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { InjectedFormProps, reduxForm } from 'redux-form'
import styled from 'styled-components'

import { Exchange } from '@core'
import { ImportedAddrType } from '@core/types'
import {
  Button,
  HeartbeatLoader,
  Modal,
  ModalBody,
  ModalHeader,
  SpinningLoader,
  Text,
  TextGroup
} from 'blockchain-info-components'
import Form from 'components/Form/Form'
import { CoinIcon } from 'layouts/Wallet/components'

import { Props as OwnProps } from '.'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin: 20px 0 10px;
  border: 1px solid ${(props) => props.theme.grey200};
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
`

const IconRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  & > :first-child {
    margin-right: 4px;
  }
`

const Body = styled(ModalBody)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 24px 0 24px;
`

const RecommendedImportedSweep = (props: InjectedFormProps<{}, Props> & Props) => {
  const {
    bchAddressHasBalance,
    bchLoading,
    btcAddressHasBalance,
    btcLoading,
    handleSubmit,
    position,
    total
  } = props
  useEffect(() => {
    props.cacheActions.removeNoActionRequiredSweep()
  }, [])
  return (
    <Modal size='large' position={position} total={total}>
      <ModalHeader closeButton={false}>
        <FormattedMessage id='modals.recommendedsweep.title' defaultMessage='Recommended Sweep' />
      </ModalHeader>
      {btcLoading || bchLoading ? (
        <Body>
          <SpinningLoader />
        </Body>
      ) : (
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Text size='14px' weight={400}>
              <FormattedMessage
                id='modals.recommendedsweep.para1'
                defaultMessage='Sweepy Sweep sweep'
              />
            </Text>
            {/* Here I want to create a funciton that maps over each address
                and each balance and displays it */}
            <Container>
              {/* {btcAddressHasBalance && (
                    <Row style={{ marginBottom: '8px' }}>
                      <Text>
                        <FormattedMessage
                          id='modals.recommendedsweep.btcaddress'
                          defaultMessage='BTC'
                        />
                      </Text>

                      <Text>
                        {' '}
                        <FormattedMessage id='copy.balance' defaultMessage='Balance' />
                      </Text>
                    </Row>
                  )} */}
              {btcAddressHasBalance?.map((addr) => (
                <Row key={addr.addr} style={{ marginBottom: '8px' }}>
                  <IconRow>
                    <CoinIcon name='BTC' size='16px' />
                    <Text size='14px' weight={500}>
                      {addr.addr}
                    </Text>
                  </IconRow>
                  <Text size='14px' weight={400}>
                    {Exchange.convertCoinToCoin({
                      baseToStandard: true,
                      coin: 'BTC',
                      value: addr.info.final_balance
                    })}{' '}
                    BTC
                  </Text>
                </Row>
              ))}
              {/* {bchAddressHasBalance && (
                    <Row style={{ marginBottom: '8px' }}>
                      <Text>
                        <FormattedMessage
                          id='modals.recommendedsweep.bchaddress'
                          defaultMessage='BCH'
                        />
                      </Text>
                      <Text>
                        {' '}
                        <FormattedMessage id='copy.balance' defaultMessage='Balance' />
                      </Text>
                    </Row>
                  )} */}
              {bchAddressHasBalance?.map((addr) => (
                <Row key={addr.addr} style={{ marginBottom: '8px' }}>
                  <IconRow>
                    <CoinIcon name='BCH' size='16px' />
                    <Text size='14px' weight={500}>
                      {addr.addr}
                    </Text>
                  </IconRow>
                  <Text size='14px' weight={400}>
                    {Exchange.convertCoinToCoin({
                      baseToStandard: true,
                      coin: 'BCH',
                      value: addr.info.final_balance
                    })}{' '}
                    BCH
                  </Text>
                </Row>
              ))}
            </Container>
            <Button
              data-e2e='recommendedSweepSubmit'
              nature='primary'
              fullwidth
              type='submit'
              disabled={props.submitting}
            >
              {props.submitting ? (
                <HeartbeatLoader height='20px' width='20px' color='white' />
              ) : (
                <FormattedMessage
                  id='modals.transfereth.confirm1'
                  defaultMessage='Transfer Funds'
                />
              )}
            </Button>
          </Form>
        </ModalBody>
      )}
    </Modal>
  )
}

type Props = {
  bchAddressHasBalance?: ImportedAddrType[]
  bchLoading: boolean
  btcAddressHasBalance?: ImportedAddrType[]
  btcLoading: boolean
  position: number
  total: number
} & OwnProps

export default reduxForm<{}, Props>({ form: 'recommendedImportSweep' })(RecommendedImportedSweep)
