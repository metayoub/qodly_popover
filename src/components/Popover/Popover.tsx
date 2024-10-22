import { FC, useState, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PopoverProps {
  children: ReactNode;
  trigger: ReactNode;
  position?: Position;
  isShown?: boolean;
  handleToggle?: (arg0: boolean) => void;
  dialogRoot?: Element | null;
  action?: 'click' | 'hover';
}
type Position =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'left-center'
  | 'right-center';
const Popover: FC<PopoverProps> = ({
  children,
  trigger,
  position = 'bottom-center',
  isShown = false,
  handleToggle = () => {},
  dialogRoot,
  action = 'click',
}) => {
  const [coords, setCoords] = useState({
    left: 0,
    top: 0,
  });

  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isShown && triggerRef.current && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = contentRef.current.getBoundingClientRect();
      setCoords(getPopoverCoords(triggerRect, popoverRect, position));
    }
  }, [isShown, position, dialogRoot]);

  // Effect to handle clicks outside the popover
  useEffect(() => {
    if (action !== 'click') return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        handleToggle(false);
      }
    };
    if (isShown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    // Cleanup event listener on unmount or when isShown changes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [action, isShown, handleToggle]);

  return (
    <div className="popover">
      <div
        className="trigger"
        ref={triggerRef}
        onClick={() => action === 'click' && handleToggle(!isShown)}
        onMouseEnter={() => action === 'hover' && handleToggle(true)}
      >
        {trigger}
      </div>
      {dialogRoot &&
        isShown &&
        createPortal(
          <div
            onMouseLeave={() => action === 'hover' && handleToggle(false)}
            ref={contentRef}
            className={`popover-content fixed ${position} z-10 bg-white`}
            style={{ ...coords, minWidth: '48px' }}
          >
            {children}
          </div>,
          dialogRoot,
        )}
    </div>
  );
};

export default Popover;

const getPopoverCoords = (triggerRect: DOMRect, popoverRect: DOMRect, position: Position) => {
  const coords = { top: 0, left: 0 };

  switch (position) {
    case 'bottom-center':
      coords.top = triggerRect.bottom;
      coords.left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
      break;
    case 'bottom-left':
      coords.top = triggerRect.bottom;
      coords.left = triggerRect.left;
      break;
    case 'bottom-right':
      coords.top = triggerRect.bottom;
      coords.left = triggerRect.right - popoverRect.width;
      break;
    case 'top-center':
      coords.top = triggerRect.top - popoverRect.height;
      coords.left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
      break;
    case 'top-left':
      coords.top = triggerRect.top - popoverRect.height;
      coords.left = triggerRect.left;
      break;
    case 'top-right':
      coords.top = triggerRect.top - popoverRect.height;
      coords.left = triggerRect.right - popoverRect.width;
      break;
    case 'left-center':
      coords.top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
      coords.left = triggerRect.left - popoverRect.width;
      break;
    case 'right-center':
      coords.top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
      coords.left = triggerRect.right;
      break;
    default:
      break;
  }

  return coords;
};
