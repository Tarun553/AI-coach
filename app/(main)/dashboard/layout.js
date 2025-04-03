import React, { Suspense } from 'react'
import {BarLoader} from "react-spinners"

const Layout = ({ children }) => {
  return (
    <div className='px-5'>
      <div className="flex items-center justify-between">
    <h1 className='text-2xl font-bold'>Industry Insights</h1>

    </div>
    <Suspense fallback={<BarLoader color="#000" />}>
    
      {children}
    </Suspense>
     </div>
  );
};

export default Layout