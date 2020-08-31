import * as React from 'react'
import { VariantProps } from '@kodiak-ui/core'
import { Tag } from './Tag'
import { TagLabel } from './TagLabel'
import { Button } from '../Button'

export type TagWithButtonProps = {
  children: React.ReactNode
  icon: React.ReactNode
  onClick: () => void
} & VariantProps

export function TagWithButton({ children, icon, onClick }: TagWithButtonProps) {
  return (
    <Tag sx={{ p: 0 }}>
      <TagLabel sx={{ borderRight: '1px solid', borderColor: 'muted' }}>
        {children}
      </TagLabel>
      <Button
        variantKey="tags"
        variant="tagButton" // TODO: These variants aren't working for some reason
        onClick={onClick}
        __base={{
          alignItems: 'center',
          bg: 'gray.1',
          color: 'gray.7',
          display: 'flex',
          px: 2,
          py: 0,
        }}
      >
        {icon}
      </Button>
    </Tag>
  )
}