import { ESetting, TSetting } from '@ws-ui/webform-editor';
import { BASIC_SETTINGS, DEFAULT_SETTINGS, load } from '@ws-ui/webform-editor';

const commonSettings: TSetting[] = [
  {
    key: 'position',
    label: 'Position',
    type: ESetting.SELECT,
    options: [
      { value: 'bottom-center', label: 'Bottom Center' },
      { value: 'bottom-left', label: 'Bottom Left' },
      { value: 'bottom-right', label: 'Bottom Right' },
      { value: 'top-center', label: 'Top Center' },
      { value: 'top-left', label: 'Top Left' },
      { value: 'top-right', label: 'Top Right' },
      { value: 'left-center', label: 'Left Center' },
      { value: 'right-center', label: 'Right Center' },
    ],
    defaultValue: 'bottom-center',
  },
  {
    key: 'action',
    label: 'Action',
    type: ESetting.SELECT,
    options: [
      { value: 'click', label: 'Click' },
      { value: 'hover', label: 'Hover' },
    ],
    defaultValue: 'click',
  },
  {
    key: 'isShown',
    label: 'Is Shown in Build Mode',
    type: ESetting.CHECKBOX,
    defaultValue: false,
  },
];

const Settings: TSetting[] = [
  {
    key: 'properties',
    label: 'Properties',
    type: ESetting.GROUP,
    components: commonSettings,
  },
  ...DEFAULT_SETTINGS,
];

export const BasicSettings: TSetting[] = [
  ...commonSettings,
  ...load(BASIC_SETTINGS).filter('style.overflow'),
];

export default Settings;
