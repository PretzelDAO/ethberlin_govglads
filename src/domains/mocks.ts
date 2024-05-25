export const daos = [
 {
   "id": 1,
   "name": "Uniswap",
   "logo": "https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png"
 },
 {
   "id": 2,
   "name": "MakerDAO",
   "logo": "https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png"
 },
 {
   "id": 3,
   "name": "Aave",
   "logo": "https://assets.coingecko.com/coins/images/12645/large/AAVE.png"
 },
 {
   "id": 4,
   "name": "Compound",
   "logo": "https://assets.coingecko.com/coins/images/10775/large/COMP.png"
 },
 {
   "id": 5,
   "name": "SushiSwap",
   "logo": "https://assets.coingecko.com/coins/images/12271/large/sushiswap-512x512.png"
 },
 {
   "id": 6,
   "name": "Curve DAO",
   "logo": "https://assets.coingecko.com/coins/images/12124/large/Curve.png"
 },
 {
   "id": 7,
   "name": "Yearn Finance",
   "logo": "https://assets.coingecko.com/coins/images/11849/large/yearn-finance-yfi.png"
 },
 {
   "id": 8,
   "name": "Balancer",
   "logo": "https://assets.coingecko.com/coins/images/11683/large/Balancer.png"
 },
 {
   "id": 9,
   "name": "PancakeSwap",
   "logo": "https://assets.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo.png"
 }
];

export const delegates = [
{
       name: "Delegate 1",
       votingPower: 100,
       logo: "https://avatars.githubusercontent.com/u/1",
       wallet: "tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx",
 },
 {
       name: "Delegate 2",
       votingPower: 200,
       logo: "https://avatars.githubusercontent.com/u/2",
       wallet: "tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN",
 },
 {
       name: "Delegate 3",
       votingPower: 300,
       logo: "https://avatars.githubusercontent.com/u/3",
       wallet: "tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU",
 }
];

export const proposalResponse = {
    score: 0.5,
    delegates: [
        {
                wallet: "tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx",
                probability: 0.5
        },
        {
                wallet: "tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN",
                probability: 0.3
        },
        {
                wallet: "tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU",
                probability: -0.2
        }
    ]
};