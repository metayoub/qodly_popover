import {
  useEnhancedNode,
  useEnhancedEditor,
  selectResolver,
  useWebformPath,
} from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';
import { Element } from '@ws-ui/craftjs-core';
import { IPopoverProps } from './Popover.config';
import PopOver from './Popover';
import kebabCase from 'lodash/kebabCase';

const Popover: FC<IPopoverProps> = ({ position, isShown, style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();
  const { resolver } = useEnhancedEditor(selectResolver);
  const path = useWebformPath();
  const dialogRoot = document.querySelector(`#__wf-${kebabCase(path)} .craftjs-renderer`);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <PopOver
        position={position}
        isShown={isShown}
        handleToggle={() => true}
        dialogRoot={dialogRoot}
        trigger={
          <Element id="PopoverTrigger" is={resolver.StyleBox} canvas>
            <Element
              is={resolver.Text}
              doc={[
                {
                  type: 'paragraph',
                  children: [{ text: 'Pop Over Trigger (you can delete this!).' }],
                },
              ]}
            />
          </Element>
        }
      >
        <Element
          id="PopoverContent"
          is={resolver.StyleBox}
          canvas
          style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
        >
          <Element
            is={resolver.Text}
            doc={[
              {
                type: 'paragraph',
                children: [{ text: 'Pop Over Content (you can delete this!).' }],
              },
            ]}
          />
        </Element>
      </PopOver>
    </div>
  );
};

export default Popover;

// TODO: you can choose if the trigger is stylebox, text or button
