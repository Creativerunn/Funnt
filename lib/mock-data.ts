export const player = { name: "Alex Morgan", handle: "@alexplays", balance: 2450, joined: "March 2025", avatar: "AM" };
export const games = [
  { id:"orbit", name:"Lucky Number", category:"QUICK PICK", description:"Pick a number. See what the next round brings.", players:"1.2k playing", color:"from-[#263817] to-[#17251c]", icon:"✳", label:"LIVE NOW" },
  { id:"high-low", name:"High & Low", category:"COMING SOON", description:"A little guessing game for your next break.", players:"864 playing", color:"from-[#18283a] to-[#17202a]", icon:"♧", label:"SOON" },
  { id:"daily-draw", name:"Daily Draw", category:"COMING SOON", description:"A fresh surprise to brighten your day.", players:"2.4k playing", color:"from-[#39251e] to-[#231a18]", icon:"✦", label:"SOON" },
];
export const activity = [
  {title:"Round #2841 · Lucky Number",date:"Today, 10:42 AM",change:"+120",positive:true},
  {title:"Round #2838 · Lucky Number",date:"Yesterday, 6:18 PM",change:"−50",positive:false},
  {title:"Welcome tokens",date:"Yesterday, 9:00 AM",change:"+25",positive:true},
];
export const stats = [
  {label:"Total players",value:"12,840",change:"+8.2% this week",icon:"↗"},
  {label:"Active users",value:"1,206",change:"Across all games",icon:"◉"},
  {label:"Current round",value:"#2,842",change:"Draw in progress",icon:"◷"},
  {label:"Tokens played",value:"8.4M",change:"Mock token activity",icon:"✳"},
];
export type Bet = { id:number; number:number; amount:number; user:string };
export type RoundResult = { round:number; number:number; time:string };
export const initialBets: Bet[] = [
  {id:1,number:3,amount:50,user:"Jamie M."},{id:2,number:7,amount:100,user:"Riley K."},{id:3,number:3,amount:25,user:"Taylor S."},
];
export const initialResults: RoundResult[] = [
  {round:2841,number:6,time:"10:41"},{round:2840,number:2,time:"10:40"},{round:2839,number:9,time:"10:39"},{round:2838,number:1,time:"10:38"},{round:2837,number:4,time:"10:37"},
];
export const demoUsers = [
  {initials:"JM",name:"Jamie Miller",handle:"@jamieplays",balance:3840,games:12,status:"Active"},
  {initials:"RK",name:"Riley Kim",handle:"@rileyk",balance:2150,games:8,status:"Active"},
  {initials:"TS",name:"Taylor Singh",handle:"@taylors",balance:5720,games:21,status:"Active"},
  {initials:"AM",name:"Alex Morgan",handle:"@alexplays",balance:2450,games:38,status:"Active"},
];
