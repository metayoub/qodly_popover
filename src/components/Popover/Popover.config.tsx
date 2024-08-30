import { EComponentKind, T4DComponentConfig } from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdArrowDropDown } from 'react-icons/md';

import PopoverSettings, { BasicSettings } from './Popover.settings';

type Position =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'left-center'
  | 'right-center';

export default {
  craft: {
    displayName: 'Popover',
    kind: EComponentKind.BASIC,
    props: {
      name: '',
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(PopoverSettings, BasicSettings),
    },
  },
  info: {
    displayName: 'Popover',
    exposed: true,
    icon: MdArrowDropDown,
    events: [],
    datasources: {},
  },
  defaultProps: {
    position: 'bottom-center',
    isShown: false,
    action: 'click',
    style: {
      minWidth: '48px',
      width: 'fit-content',
    },
  },
} as T4DComponentConfig<IPopoverProps>;

export interface IPopoverProps extends webforms.ComponentProps {
  position: Position;
  isShown: boolean;
  action: 'click' | 'hover';
}
