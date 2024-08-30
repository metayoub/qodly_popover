import { selectResolver, useEnhancedEditor, useRenderer } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useState } from 'react';
import { IPopoverProps } from './Popover.config';
import PopOver from './Popover';
import { Element } from '@ws-ui/craftjs-core';

const Popover: FC<IPopoverProps> = ({ action, position, style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const { resolver } = useEnhancedEditor(selectResolver);
  const dialogRoot = document.getElementById('dialogs-root');
  const [isShown, setIsShown] = useState(false);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <PopOver
        position={position}
        trigger={<Element id="PopoverTrigger" is={resolver.StyleBox} canvas />}
        isShown={isShown}
        action={action}
        handleToggle={setIsShown}
        dialogRoot={dialogRoot}
      >
        <Element id="PopoverContent" is={resolver.StyleBox} canvas />
      </PopOver>
    </div>
  );
};

export default Popover;
