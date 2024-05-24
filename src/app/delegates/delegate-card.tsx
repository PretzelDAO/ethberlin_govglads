import Image from 'next/image'
import ampelmannGreenPic from '@/images/ampelmann-green.svg'
import ampelmannRedPic from '@/images/ampelmann-red.svg'

interface Props {
  name: string;
}

const DelegateCard = ({name}: Props) => {
  return <div className='grid grid-cols-[max-content,auto,max-content] items-center gap-10 bg-slate-100 px-10 py-4 rounded-md'>
    <button>
      <Image src={ampelmannGreenPic} alt='' width={40}/>
    </button>
    <div>{name}</div>
    <button>
      <Image src={ampelmannRedPic} alt='' width={40}/>
    </button>
  </div>
}

export default DelegateCard