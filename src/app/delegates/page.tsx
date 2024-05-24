import type { Delegate } from "@/domains/delegate"
import DelegateCard from "./delegate-card"
import SearchBar from "./search-bar"

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
  return <div className="max-w-xl mx-auto space-y-6 py-6">
    <SearchBar/>
    {delegates.map((delegate, index) => (<DelegateCard key={index} name={delegate.name}/>))}
  </div>
}

export default Page