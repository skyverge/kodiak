import {
  variant,
  VariantProps,
  sx,
  Theme,
  css,
  SerializedStyles,
  styled,
  SxStyleProp,
} from '@kodiak-ui/core'

export type MenuListItemProps = {
  children: React.ReactNode
  sx?: SxStyleProp
} & VariantProps

export function base({ theme }: { theme: Theme }): SerializedStyles {
  return css({
    lineHeight: 1,
    py: 3,
    px: 4,
    transition: 'all 0.2s ease-in-out',
  })(theme)
}

export const MenuListItem = styled('li')<MenuListItemProps>(
  {
    boxSizing: 'border-box',
    margin: 0,
    minWidth: 0,
  },
  base,
  ({ variant: variantProp = 'menuListItem', variantKey = 'menus', theme }) =>
    variant({ variant: variantProp, theme, variantKey }),
  sx,
)