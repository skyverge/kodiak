import * as React from 'react'
import { Box, BoxProps } from '../Box'

type IframeProps = BoxProps & React.HTMLProps<HTMLIFrameElement>

export function Iframe({ variantKey = 'iframes', ...props }: IframeProps) {
  return (
    <Box
      __base={{
        boxSizing: 'border-box',
        display: 'block',
        margin: 0,
        minWidth: 0,
      }}
      as="iframe"
      variantKey={variantKey}
      {...props}
    />
  )
}
