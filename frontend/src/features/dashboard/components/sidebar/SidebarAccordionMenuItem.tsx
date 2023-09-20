import { useContext, useEffect, useState } from 'react';
import { DashboardContext } from '@/features/dashboard/contexts/Dashboard.context';
import clsx from 'clsx';

import styles from './SidebarAccordionMenuItem.module.scss';
import ItemWrapper from './ItemWrapper';
import { sidebarMenuItems } from './SidebarAccordionMenu';
import { useConsoleLogOnChange } from '@/hooks/utils.hook';

const SidebarAccordionMenuItem = (props) => {
  const {
    label,
    id = '',
    href,
    isTitle = false,
    Icon,
    directDescendants = [],
    currentItem = '',
    onCurrentItemSelect = () => null,
    // noChildren=false,
  } = props;

  const dashboardContext = useContext(DashboardContext);
  const collapseSidebar = dashboardContext?.collapseSidebar;
  const [expand, setExpand] = useState<boolean>(true);

  const numChildren = directDescendants?.length ?? 0;

  const directDescendantItems = sidebarMenuItems.filter((item) => {
    if (directDescendants.includes(item.id)) {
      return item;
    }
  });

  useEffect(() => {
    setExpand(!!!collapseSidebar);
  }, [collapseSidebar]);

  const handleExpandClick = (e, id) => {
    setExpand(!expand);
  };

  useConsoleLogOnChange({ currentItem, id });

  return (
    <li className={styles['accordion-menu-item']}>
      <ItemWrapper
        onClick={(e) => handleExpandClick(e, id)}
        href={href}
        isTitle={isTitle}
        Icon={Icon}
        expand={expand}
        // currentItem={currentItem}
        wrapperClassName={styles['item-wrapper']}
      >
        <span>{label}</span>
        {directDescendants.length > 0 && (
          <span
            className={clsx(styles['expand-icon'], {
              [styles['expand']]: expand,
            })}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='1em'
              viewBox='0 0 320 512'
            >
              <path d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z' />
            </svg>
          </span>
        )}
      </ItemWrapper>

      <ul
        className={styles[`children-wrapper`]}
        style={{
          height: expand
            ? `calc(${70 * numChildren}px - calc(${numChildren} * 1.6px))`
            : 0,
        }}
      >
        {directDescendantItems?.map((item, key) => (
          <ItemWrapper
            {...item}
            expand={expand}
            label={label}
            currentItem={currentItem}
            key={key}
            onItemClick={(id) => onCurrentItemSelect(id)}
          >
            {item.label}
          </ItemWrapper>
        ))}
      </ul>
    </li>
  );
};

// const SidebarAccordionMenuItem = (props) => {

//   const {
//     href,
//     label,
//     directDescendants,
//     isTitle=false,
//     Icon,
//     noChildren=false,
//   } = props;

//   const dashboardContext = useContext(DashboardContext);
//   const collapseSidebar = dashboardContext?.collapseSidebar;
//   const [expand, setExpand] = useState<boolean>(true);
//   const [currentItem, setCurrentItem] = useState<string>('');
//   const numChildren = directDescendants?.length ?? 0;

//   useEffect(() => {
//     setExpand(!!!collapseSidebar);
//   }, [collapseSidebar]);

//   const handleExpandClick = (e, label) => {
//     setExpand(!expand);
//     setCurrentItem(label);
//   }

//   return (
//     <li className={styles['accordion-menu-item']}>
//       <ItemWrapper
//         onClick={(e) => handleExpandClick(e, label)}
//         href={href}
//         isTitle={isTitle}
//         Icon={Icon}
//         expand={expand}
//         currentItem={currentItem}
//         wrapperClassName={styles['item-wrapper']}
//       >
//         <span>{label}</span>
//         {!noChildren && (
//           <span className={clsx(styles['expand-icon'], { [styles['expand']]: expand } )}>
//             <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
//           </span>
//         )}
//       </ItemWrapper>

//       <ul
//         className={styles[`children-wrapper`]}
//         style={{
//           height: expand? `calc(${70 * (numChildren)}px - calc(${numChildren} * 1.6px))`: 0
//         }}
//       >
//         {
//           directDescendants?.map((item, key) => (
//             <ItemWrapper
//               {...item} expand={expand} label={label} currentItem={currentItem} key={key}
//             >
//               {item.label}
//             </ItemWrapper>
//           ))
//         }
//       </ul>
//     </li>
//   );
// }

export default SidebarAccordionMenuItem;
