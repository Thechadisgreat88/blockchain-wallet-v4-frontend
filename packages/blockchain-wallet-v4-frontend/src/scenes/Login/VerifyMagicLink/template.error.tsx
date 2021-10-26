import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { Icon, Text } from 'blockchain-info-components'

const Wrapper = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
`

const Error = (props) => {
  return (
    <Wrapper>
      <Icon color='error' name='close-circle' size='40px' />
      <Text size='20px' weight={600} color='black' style={{ marginTop: '8px' }}>
        <FormattedMessage
          id='scenes.login.device_verification_failed'
          defaultMessage='Device verification failed.'
        />
      </Text>
      <Text style={{ margin: '8px 0 12px 0' }} size='16px' color='red600' weight={500}>
        <FormattedMessage
          id='scenes.authorizelogin.error.msg'
          defaultMessage='Error: {error}'
          values={{ error: props.error }}
        />
      </Text>
    </Wrapper>
  )
}

export default Error