import * as React from "react";
import { PropsWithChildren } from "react";

export const MainLayout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div>
      <div className={'wrapper'}>
        <div className={'content'}>
          {children}
        </div>
      </div>
    </div>
  )
}