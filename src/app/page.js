
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/component/MapComponent'), {
  ssr: false,
});


import data from '@/data/Stores'


export default function Home() {
  return (
    <>
      <main>
        
         <MapComponent data={data} />
      </main>
    
    </>
  )
}
