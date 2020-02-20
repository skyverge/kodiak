import * as React from 'react'
import { Text, Flex, Grid, Box } from '@kodiak-ui/primitives'
import { useThemeUI, Theme } from 'theme-ui'
import { useForm } from 'react-hook-form'
import { parseToRgb, parseToHsl } from 'polished'
import { RgbColor, RgbaColor } from 'polished/lib/types/color'

import { Field, FieldError } from '@kodiak-ui/primitives'

export default {
  title: 'Design System/Colors',
}

export function Intro() {
  return <Text p={4}>The color palette shows the availble color system</Text>
}

type ColorSwatchProps = {
  color: string
  colorName: string | number
} & React.ComponentProps<typeof Flex>

function ColorSwatch({ color, colorName, ...props }: ColorSwatchProps) {
  return (
    <Flex m={4} mr={9} minWidth="initial" flex="1" {...props}>
      <Box
        backgroundColor={color}
        height={96}
        width={96}
        boxShadow="lg"
        borderRadius="default"
      />

      <Flex ml={4} flexDirection="column" justifyContent="center">
        <Box fontWeight="bold">{colorName}</Box>
        <Box color={'gray.5'}>{color}</Box>
      </Flex>
    </Flex>
  )
}

type ColorSwatchesProps = {
  colorsArray: string[]
  colorName: string | number
} & React.ComponentProps<typeof Flex>

function ColorSwatches({ colorsArray, colorName }: ColorSwatchesProps) {
  const borderLeftColor = colorsArray
    .sort(function darkestColorForSort(color1, color2) {
      try {
        const color1Hsl = parseToHsl(color1)
        const color2Hsl = parseToHsl(color2)

        return color1Hsl.lightness - color2Hsl.lightness
      } catch (error) {
        return -1
      }
    })

    .find(color => !!color)

  return (
    <Flex flexDirection="column" key={colorName} width="100%">
      <Box borderLeft="2px solid" borderLeftColor={borderLeftColor} mt={8}>
        <Text
          ml={3}
          variant="text.heading"
          sx={{ textTransform: 'capitalize' }}
        >
          {colorName}
        </Text>
      </Box>
      <Grid gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))">
        {colorsArray.map((value, index) => {
          if (colorsArray[index] === null) {
            return null
          }

          return (
            <ColorSwatch
              key={`${colorName}.${index}`}
              color={value}
              colorName={`${colorName}.${index}`}
              pt={4}
            />
          )
        })}
      </Grid>
    </Flex>
  )
}

type VisitorFunction = ({
  value,
  key,
  parentKeys,
}: {
  value?: any
  key?: string
  parentKeys?: string
}) => void

// lightweight deep map function
function deepMapKeys({
  obj,
  visitorfunction,
  key,
  parentKeys,
}: {
  obj: any
  visitorfunction: VisitorFunction
  key?: string
  parentKeys?: string
}) {
  if (typeof obj !== 'object') {
    visitorfunction({ value: obj, key, parentKeys })
  } else {
    if (obj) {
      Object.keys(obj).map(objectKey => {
        deepMapKeys({
          obj: obj[objectKey],
          visitorfunction,
          key: objectKey,
          parentKeys:
            parentKeys !== undefined ? [parentKeys, key].join('.') : key,
        })
      })
    }
  }
}

type ColorData = {
  color: string
}

function flattenThemeColors({ theme }: { theme: Theme }) {
  const flattenedThemeColors: Array<{
    colorKey: string
    color: string
    rgbColor: RgbColor | RgbaColor
  }> = []

  deepMapKeys({
    obj: theme.colors,
    visitorfunction: ({ value, key, parentKeys }) => {
      const colorKey =
        parentKeys !== undefined ? [parentKeys, key].join('.') : key

      if (!colorKey) {
        return
      }

      try {
        const rgbColor = parseToRgb(value)

        flattenedThemeColors.push({
          colorKey: colorKey,
          color: value,
          rgbColor: rgbColor,
        })
      } catch (error) {
        console.error(`Couldn't parse ${colorKey}:${value}`)
        console.error(error)
      }
    },
  })

  return flattenedThemeColors
}

function findNearestThemeColors({
  theme,
  color,
  count,
}: {
  theme: Theme
  color: string
  count: number
}) {
  try {
    const { red, green, blue } = parseToRgb(color)

    const flattenedThemeColors = flattenThemeColors({ theme })
    const colorsWithDistance = flattenedThemeColors
      .map(color => ({
        ...color,
        distance: Math.sqrt(
          2 * Math.pow(color.rgbColor.red - red, 2) +
            4 * Math.pow(color.rgbColor.green - green, 2) +
            3 * Math.pow(color.rgbColor.blue - blue, 2),
        ),
      }))
      .sort((a, b) => a.distance - b.distance)

    colorsWithDistance.length = count

    return colorsWithDistance
  } catch (e) {
    // couldn't parse the color
    return null
  }
}
export function NearestThemeColor() {
  const { register, watch } = useForm<ColorData>()
  const { theme } = useThemeUI()
  const color = watch('color')

  if (theme.colors === undefined) {
    return null
  }

  const nearestColors = findNearestThemeColors({ theme, color, count: 6 })

  return (
    <>
      <form>
        <Field
          label="Find the nearest theme colors"
          name="color"
          ref={register({ required: false })}
          aria-describedby="error-first-name-required"
        ></Field>
        {color && !nearestColors && (
          <FieldError id="error-first-name-required">
            Please enter a valid color (including # for hex)
          </FieldError>
        )}
      </form>

      {nearestColors && (
        <Flex>
          <Box>
            <ColorSwatch
              key={color}
              color={color}
              colorName={'Your color'}
              pt={4}
            />
          </Box>

          <Box>
            {nearestColors.map((color, index) => (
              <ColorSwatch
                key={index}
                color={color.color}
                colorName={color.colorKey}
                pt={4}
              />
            ))}
          </Box>
        </Flex>
      )}
    </>
  )
}

export function Palette() {
  const { theme } = useThemeUI()

  if (theme.colors === undefined) {
    return null
  }

  return (
    <Flex flexDirection="column" flexWrap="wrap">
      {Object.keys(theme.colors).map(key => {
        if (Array.isArray(theme?.colors?.[key])) {
          if (!theme?.colors?.[key] || key === 'grey') {
            return null
          }

          const colorsArray = theme.colors[key] as string[]
          return <ColorSwatches colorsArray={colorsArray} colorName={key} />
        }

        if (typeof theme.colors?.[key] === 'string') {
          return (
            <ColorSwatch
              key={key}
              color={theme.colors?.[key]}
              colorName={key}
              borderTop="1px solid"
              borderTopColor="gray.2"
              pt={4}
            />
          )
        }

        return null
      })}
    </Flex>
  )
}
