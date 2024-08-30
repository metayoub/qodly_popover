import config, { IPopoverProps } from './Popover.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Popover.build';
import Render from './Popover.render';

const Popover: T4DComponent<IPopoverProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Popover.craft = config.craft;
Popover.info = config.info;
Popover.defaultProps = config.defaultProps;

export default Popover;
