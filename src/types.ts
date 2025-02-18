import type { ReactNode } from 'react';
import type { ImageStyle, StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import type { AnimatedStyleProp, SharedValue } from 'react-native-reanimated';
import type { SupportedColorFormats } from './colorKit/types';

export interface returnedResults {
  hex: string;
  rgb: string;
  rgba: string;
  hsl: string;
  hsla: string;
  hsv: string;
  hsva: string;
  hwb: string;
  hwba: string;
}

export type thumbShapeType =
  | 'ring'
  | 'solid'
  | 'hollow'
  | 'line'
  | 'plus'
  | 'pill'
  | 'triangleUp'
  | 'triangleDown'
  | 'doubleTriangle'
  | 'rect'
  | 'circle';

export type RenderThumbProps = {
  /**
   * - This style determines the position of the thumb and is a crucial element that should be included.
   * - It should be tied to an `Reanimated` component, for example, `<Animated.View style={positionStyle} />`.
   */
  positionStyle: StyleProp<ViewStyle | ImageStyle | TextStyle>;

  /**
   * - A `number` that determines the thumb's width in pixels and is important for thumb position calculation.
   * - It's extracted from the `thumbSize` prop.
   */
  width: number;

  /**
   * - A `number` that determines the thumb's height in pixels and is important for thumb position calculation.
   * - It's extracted from the `thumbSize` prop.
   */
  height: number;

  /**
   * - The `adaptiveColor` is a type of `SharedValue<string>` that determines the color to be displayed based on the contrast ratio.
   * - It can either be a `white` or `black` color.
   */
  adaptiveColor: SharedValue<string>;

  /**
   * - A `SharedValue` of type `string` that represents the current color.
   * - This shared value will update whenever the color changes, but without the alpha channel.
   */
  currentColor: SharedValue<string>;

  /** - The initial color value as a `string` */
  initialColor: string;
};

export type RenderThumbType = React.FC<RenderThumbProps>;

export type ThumbProps = {
  thumbColor?: string;
  handleStyle: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  renderThumb?: RenderThumbType;
  vertical?: boolean;
  adaptSpectrum?: boolean;
  channel?: 'h' | 's' | 'v' | 'a';
  thumbShape?: thumbShapeType;
  thumbSize: number;
};

export type BuiltinThumbsProps = {
  width: number;
  height: number;
  borderRadius: number;
  thumbColor?: string;
  adaptiveColor: SharedValue<string>;
  handleStyle: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  solidColor: AnimatedStyleProp<ViewStyle>;
  renderThumb?: RenderThumbType;
  vertical?: boolean;
};

export interface ColorPickerContext {
  /** Color's channels. */
  hueValue: SharedValue<number>;
  saturationValue: SharedValue<number>;
  brightnessValue: SharedValue<number>;
  alphaValue: SharedValue<number>;

  /** A global property that allows the color spectrum to adapt to changes in brightness and saturation for all descendant slider components. */
  adaptSpectrum: boolean;

  /** Apply a color to the color picker. */
  setColor: (color: SupportedColorFormats, duration?: number) => void;

  /** A global prop for all sliders children. */
  sliderThickness: number;

  /** A global prop for all sliders children. */
  thumbSize: number;

  /** A global prop for all sliders children. */
  thumbShape: thumbShapeType;

  /** A global prop for all sliders children. */
  thumbColor: string | undefined;

  /** A global prop for all sliders children. */
  thumbStyle: StyleProp<ViewStyle>;

  /**
   * - Determines whether the slider thumb (or handle) should be constrained to stay within the boundaries of the slider.
   * - When set to true, the thumb will not be allowed to move beyond the edges of the slider.
   * - When set to false, part of it will be outside of the slider bounds.
   */
  boundedThumb: boolean;

  /** A global style for all sliders children. */
  thumbInnerStyle: StyleProp<ViewStyle>;

  /** A global prop for all sliders children. */
  renderThumb: RenderThumbType | undefined;

  /** The initial color value as a `string` */
  value: string;

  /** The returned results of the color picker. */
  returnedResults: (color?: SupportedColorFormats) => returnedResults;

  /** This function is called when the user lifts the finger from the color picker. */
  onGestureEnd: (color?: SupportedColorFormats) => void;

  /** This function is called every time the color is changed. */
  onGestureChange: (color?: SupportedColorFormats) => void;
}

export interface ColorPickerProps {
  /** - a global property that allows the color spectrum to adapt to changes in brightness and saturation for all descendant slider components.*/
  adaptSpectrum?: boolean;

  /**
   * - a global property to change the thickness of all descendant sliders components.
   * - thickness is the width of the slider in vertical mode or the height in horizontal mode.
   */
  sliderThickness?: number;

  /** - a global property to change the duration which the thumbs animate when the value prop changes. */
  thumbAnimationDuration?: number;

  /** - a global property to change the thumb size of all descendant sliders components. */
  thumbSize?: number;

  /** - a global property to change the shape and appearance of the thumb of all descendant sliders components. */
  thumbShape?: thumbShapeType;

  /** - a global property to change the color of the thumb of all descendant sliders components. */
  thumbColor?: string;

  /** - a global property to change the style of the thumb's View for all descendant sliders components */
  thumbStyle?: StyleProp<ViewStyle>;

  /**
   * - a global property for all descendant sliders and panels components
   * - Determines whether the slider thumb (or handle) should be constrained to stay within the boundaries of the slider.
   * - When set to true, the thumb will not be allowed to move beyond the edges of the slider.
   * - When set to false, part of it will be outside of the slider bounds.
   */
  boundedThumb?: boolean;

  /** - a global property to change the color of the thumb's inner View(s) for all descendant sliders components. */
  thumbInnerStyle?: StyleProp<ViewStyle>;

  /** - a global function for rendering a thumb component based on ThumbProps. */
  renderThumb?: RenderThumbType;

  /** - color picker wrapper style. */
  style?: StyleProp<ViewStyle>;

  /**
   * - initial color.
   * - Accepts `hex`, `rgb`, `rgba`, `hsl`, `hsla`, `hsv`, `hsva`, `hwb`, `hwba` and `named color` formats.
   */
  value?: string;

  /** - called when the user moves the sliders. */
  onChange?: (colors: returnedResults) => void;

  /**
   * - called when the user lifts his finger off the sliders.
   * - CAUTION : As of `react-native-gesture-handler@2.9.0` the new web implementation does not support the events which trigger this callback.
   */
  onComplete?: (colors: returnedResults) => void;

  children?: React.ReactNode;
}

export interface ColorPickerRef {
  /** Apply a color to the color picker. */
  setColor: (color: string, duration?: number) => void;
}

export interface SwatchesProps {
  /**
   * - swatch style.
   * - **Note** Certain style properties will be overridden.
   */
  swatchStyle?: StyleProp<ViewStyle>;

  /** - swatches container style. */
  style?: StyleProp<ViewStyle>;

  /** - provide your own swatches colors. */
  colors?: string[];
}

export interface PreviewProps {
  /** - show color preview in specific format. */
  colorFormat?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva' | 'hwb' | 'hwba';

  /** - hide initial color preview and show the picked color preview only. */
  hideInitialColor?: boolean;

  /** - hide color preview text. */
  hideText?: boolean;

  /** - hide the preview background texture image that appears when the color has an opacity less than 1. */
  disableOpacityTexture?: boolean;

  /**
   * - preview container style.
   * - **Note** Certain style properties will be overridden.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * - preview text style.
   * - **Note** Certain style properties will be overridden..
   */
  textStyle?: StyleProp<TextStyle>;
}

export interface PreviewTextProps {
  /** - show color preview in specific format. */
  colorFormat?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva' | 'hwb' | 'hwba';

  /** - preview text style */
  style?: StyleProp<TextStyle>;
}

export interface PanelProps {
  /** - panel handle (thumb) size (height*width). */
  thumbSize?: number;

  /** - panel handle (thumb) color. */
  thumbColor?: string;

  /** - panel handle (thumb) shape. */
  thumbShape?: thumbShapeType;

  /**
   * - Determines whether the slider thumb (or handle) should be constrained to stay within the boundaries of the slider.
   * - When set to true, the thumb will not be allowed to move beyond the edges of the slider.
   * - When set to false, part of it will be outside of the slider bounds.
   */
  boundedThumb?: boolean;

  /** - slider's handle (thumb) outer View style. */
  thumbStyle?: StyleProp<ViewStyle>;

  /** - slider's handle (thumb) inner View style. */
  thumbInnerStyle?: StyleProp<ViewStyle>;

  /** - function which receives ThumbProps and renders slider's handle (thumb). */
  renderThumb?: RenderThumbType;

  /**
   * - panel container style.
   * - **Note** Certain style properties will be overridden.
   */
  style?: StyleProp<ViewStyle>;
}

export interface Panel2Props extends PanelProps {
  /** - reverse (flip) hue direction. */
  reverseHue?: boolean;

  /** - reverse (flip) the direction of the vertical channel's saturation or brightness. */
  reverseVerticalChannel?: boolean;

  /** - determines which color channel to adjust when moving the thumb vertically on the slider. */
  verticalChannel?: 'saturation' | 'brightness';

  /** - color spectrum adapts to changes in brightness and saturation */
  adaptSpectrum?: boolean;
}

export interface Panel3Props extends PanelProps {
  /** - determines which color channel to adjust when moving the thumb towards or away from the center of the circular slider. */
  centerChannel?: 'saturation' | 'brightness';

  /** - color spectrum adapts to changes in brightness and saturation */
  adaptSpectrum?: boolean;

  /** - render a line from the center of the Panel to the thumb (handle). */
  renderCenterLine?: boolean;
}

export interface Panel4Props extends PanelProps {
  /** - reverse (flip) hue direction. */
  reverseHue?: boolean;

  /** - reverse (flip) the horizontal channel's brightness and saturation. */
  reverseHorizontalChannels?: boolean;
}

export interface Panel5Props extends PanelProps {
  /**
   * - panel container style.
   * - **Note** Certain style properties will be overridden.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * - The style of the square that indicates the selected color.
   * - **Note** Certain style properties will be overridden.
   */
  selectionStyle?: StyleProp<ViewStyle>;
}

export interface SliderProps {
  /** - slider's handle (thumb) size (height*width). */
  thumbSize?: number;

  /** - slider's handle (thumb) color. */
  thumbColor?: string;

  /** - slider's handle (thumb) shape. */
  thumbShape?: thumbShapeType;

  /**
   * - Determines whether the slider thumb (or handle) should be constrained to stay within the boundaries of the slider.
   * - When set to true, the thumb will not be allowed to move beyond the edges of the slider.
   * - When set to false, part of it will be outside of the slider bounds.
   */
  boundedThumb?: boolean;

  /** - slider's handle (thumb) outer View style. */
  thumbStyle?: StyleProp<ViewStyle>;

  /** - slider's handle (thumb) inner View style. */
  thumbInnerStyle?: StyleProp<ViewStyle>;

  /** - function which receives ThumbProps and renders slider's handle (thumb). */
  renderThumb?: RenderThumbType;

  /** - thickness is the width of the slider in vertical mode or the height in horizontal mode. */
  sliderThickness?: number;

  /** - reverse slider direction. */
  reverse?: boolean;

  /** - vertical slider. */
  vertical?: boolean;

  /** - color spectrum adapts to changes in brightness and saturation */
  adaptSpectrum?: boolean;

  /**
   * - slider's container style.
   * - **Note** Certain style properties will be overridden.
   */
  style?: StyleProp<ViewStyle>;
}

export type RgbSliderProps = Omit<SliderProps, 'adaptSpectrum'>;

export interface HueCircular extends Omit<SliderProps, 'vertical' | 'reverse' | 'boundedThumb'> {
  children?: ReactNode;

  /** - the style of the container that wraps the given children.*/
  containerStyle?: StyleProp<ViewStyle>;
}

export type InputProps = Omit<
  TextInputProps,
  | 'ref'
  | 'style'
  | 'value'
  | 'maxLength'
  | 'onChangeText'
  | 'onBlur'
  | 'onFocus'
  | 'keyboardType'
  | 'autoComplete'
  | 'autoCorrect'
  | 'defaultValue'
>;

export type WidgetProps = {
  onChange: (color: SupportedColorFormats) => void;
  returnedResults: ColorPickerContext['returnedResults'];
  hueValue: ColorPickerContext['hueValue'];
  saturationValue: ColorPickerContext['saturationValue'];
  brightnessValue: ColorPickerContext['brightnessValue'];
  alphaValue: ColorPickerContext['alphaValue'];
  inputStyle: StyleProp<TextStyle>;
  inputTitleStyle?: StyleProp<TextStyle>;
  inputProps: InputProps;
  disableAlphaChannel: boolean;
};

type defaultFormats = 'HEX' | 'RGB' | 'HSL' | 'HWB' | 'HSV';

export interface InputWidgetProps {
  /**
   * - The initial input widget color format.
   * - You can select one of the following options: `'HEX'`, `'RGB'`, '`HSL'`, `'HWB'`, or `'HSV'`
   */
  defaultFormat?: defaultFormats;

  /**
   * - What input widgets should be included that can be cycled through.
   * - Available options: `'HEX'`, `'RGB'`, '`HSL'`, `'HWB'`, and `'HSV'`
   */
  formats?: readonly defaultFormats[];

  /** - Limit the user's ability to modify the alpha channel of the selected color. */
  disableAlphaChannel?: boolean;

  /** - `InputText` components style. */
  inputStyle?: StyleProp<TextStyle>;

  /** - The props for the `TextInput` components. */
  inputProps?: InputProps;

  /** - The style of the `Text` component for the title located below the inputs. */
  inputTitleStyle?: StyleProp<TextStyle>;

  /** - The style of the `View` component that wraps around all the widgets. */
  containerStyle?: StyleProp<ViewStyle>;

  /** - The color of the cycle button icon (`Image` component). */
  iconColor?: string;

  /** - The style of the cycle button (`Image` component). */
  iconStyle?: StyleProp<ImageStyle>;
}
