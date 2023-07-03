import clsx from 'clsx';
import styles from './SidebarAccordionMenu.module.scss';
import { useState } from 'react';


const menuItems = [
  {
    title: 'Option 1',
    href: '#',
    children: [
      { title: 'Child Option 1', href: '#' }, 
      { title: 'Child Option 2', href: '#' }
    ]
  },
  {
    title: 'Option 2',
    href: '#',
    children: [
      { title: 'Child Option 1', href: '#' }, 
      { title: 'Child Option 2', href: '#' },
      { title: 'Child Option 3', href: '#' },
      { title: 'Child Option 4', href: '#' }, 
      { title: 'Child Option 5', href: '#' },
      { title: 'Child Option 6', href: '#' },
      { title: 'Child Option 7', href: '#' },
      { title: 'Child Option 8', href: '#' },
      { title: 'Child Option 9', href: '#' },
      { title: 'Child Option 10', href: '#' },
    ]
  },
  {
    title: 'Option 3',
    href: '#',
    children: [
      { title: 'Child Option 1', href: '#' }, 
    ]
  },
]


const SidebarAccordionMenu = ({ collapse, onSidebarCollapse }) => {

  // const [expand, setExpand] = useState<boolean>(false);

  return (
    <ul className={styles['accordion-menu']}>
      {
        menuItems.map((item, index) => (
          <AccordionMenuItem 
            key={index} 
            item={item}
            // expand={expand}
            // onExpand={() => setExpand(!expand)}
          />
        ))
      }
    </ul>
  )
}

const AccordionMenuItem = ({ item }) => {
  const [expand, setExpand] = useState<boolean>(false);
  const numChildren = item?.children?.length ?? 0;

  return (
    <li className={styles['accordion-menu-item']} onClick={() => setExpand(!expand)}>
      <a 
        href={item.href}
        style={{
          backgroundColor: expand? 'var(--orange-900)': ''
        }}
      >
        <span>{ item.title }</span>
      </a>
      <ul 
        // className={styles[`children-wrapper${expand? 'open': ''}`]}
        className={styles[`children-wrapper`]}
        style={{
          height: expand? `calc(${50 * (numChildren)}px - calc(${numChildren} * 1.6px))`: 0
        }}
      >
        {
          item?.children?.map((item, key) => (
            <ItemChild key={key} item={item} expand={expand} />
          ))
        }
      </ul>
    </li>
  );
}

const ItemChild = ({ item, expand }) => {
  return (
    <li className={styles['child']}>
      <a 
        href={item.href}
      >
        <span>{ item.title }</span>
      </a>
    </li>
  )
}

export default SidebarAccordionMenu