// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { Fontisto } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return <Ionicons size={20} style={[{ marginBottom: -3 }, style]} {...rest} />;
}

export function TabMapIcon({ style, ...rest }: IconProps<ComponentProps<typeof Fontisto>['name']>) {
  return <Fontisto size={20} style={[{ marginBottom: -3 }, style]} {...rest} />;
}