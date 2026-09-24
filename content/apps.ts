export type AppProduct={id:string;name:string;oneLiner:string;category:string;platforms:string[];rating:number|null;downloads:number|null;appStore:string|null;googlePlay:string|null;screen:"finance"|"nature"|"focus";initial:string;status:string};
// Illustrative concepts, not claims of published products. Replace with verified listings.
export const apps:AppProduct[]=[
{id:"folio",name:"Folio",oneLiner:"A little clarity for your everyday money.",category:"Finance",platforms:["iOS","Android"],rating:null,downloads:null,appStore:null,googlePlay:null,screen:"finance",initial:"f",status:"Concept preview"},
{id:"roam",name:"Roam",oneLiner:"Less scrolling. More getting out there.",category:"Lifestyle",platforms:["iOS","Android"],rating:null,downloads:null,appStore:null,googlePlay:null,screen:"nature",initial:"r",status:"Concept preview"},
{id:"still",name:"Still",oneLiner:"Make a little room for a calmer day.",category:"Wellness",platforms:["iOS"],rating:null,downloads:null,appStore:null,googlePlay:null,screen:"focus",initial:"s",status:"Concept preview"}
];
