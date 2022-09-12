import s from './Search.module.scss';
import { ReactNode, FC } from 'react';
import { DesktopView, MobileView } from './components';

interface ISearchExtension {
  MobileView: typeof MobileView
  DesktopView: typeof DesktopView
}


interface ISearchProps {
  children: ReactNode
}

export const Search: FC<ISearchProps> & ISearchExtension= ({children}) => {




  return (
    <div className={s.container}>
      {children}
    </div>
  )
}


Search.MobileView = MobileView
Search.DesktopView = DesktopView