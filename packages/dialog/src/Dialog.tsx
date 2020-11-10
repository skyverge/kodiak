import * as React from 'react'
import {
  ReactNode,
  memo,
  forwardRef,
  RefObject,
  HTMLAttributes,
  useRef,
} from 'react'
import { KodiakUIProps } from 'kodiak-ui'
import { Box, Overlay, Underlay } from '@kodiak-ui/primitives'
import { FocusScope } from '@kodiak-ui/a11y'
import { useOverlay } from '@kodiak-ui/primitives/src/Overlay/useOverlay'

export type DialogProps = {
  children: ReactNode
  isOpen: boolean
  onDismiss: () => void
} & KodiakUIProps &
  HTMLAttributes<HTMLDivElement>

export const Dialog = forwardRef(
  (
    { children, isOpen, onDismiss, ...rest }: DialogProps,
    ref: RefObject<HTMLElement>,
  ) => {
    const domRef = useRef<HTMLElement>((ref as unknown) as HTMLElement)
    const { getOverlayProps } = useOverlay({ isOpen, onDismiss }, domRef)

    return isOpen ? (
      <Overlay>
        <Underlay isOpen={isOpen} />
        <FocusScope contain restore>
          <Box
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100vh',
              pointerEvents: 'none',
              width: '100%',
              zIndex: 150,
            }}
          >
            <Box
              ref={domRef}
              {...getOverlayProps()}
              {...rest}
              __base={{
                bg: 'bg',
                borderRadius: 'default',
                maxWidth: '90vw',
                outline: 'none',
                pointerEvents: 'auto',
                position: 'relative',
                width: '600px',
                zIndex: 150,
              }}
            >
              {children}
            </Box>
          </Box>
        </FocusScope>
      </Overlay>
    ) : null
  },
)
