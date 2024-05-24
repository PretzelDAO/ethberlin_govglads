import type { Delegate } from "@/domains/delegate"
import DelegateCard from "./delegate-card"

const delegates: Delegate[] = [
  {
    wallet: '0x1234567890abcdef',
    name: 'Delegate 1',
    logo: 'https://via.placeholder.com/150',
    votingPower: 100
  },
  {
    wallet: '0xabcdef1234567890',
    name: 'Delegate 2',
    logo: 'https://via.placeholder.com/150',
    votingPower: 200
  }
]

const Page = () => {
  return delegates.map((delegate, index) => (<DelegateCard key={index} name={delegate.name}/>))}

export default Page