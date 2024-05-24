import Image from 'next/image'
import ampelmannGreenPic from '@/images/ampelmann-green.svg'
import ampelmannRedPic from '@/images/ampelmann-red.svg'

interface Props {
  name: string;
}

const DelegateCard = ({name}: Props) => {
  return <div className='grid grid-cols-[1fr,4fr,1fr]'>
    <button>
      <Image src={ampelmannGreenPic} alt=''/>
    </button>
    <div>{name}</div>
    <button>
      <Image src={ampelmannRedPic} alt=''/>
    </button>
  </div>
}

export default DelegateCard