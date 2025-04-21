

import { LuLayoutDashboard } from "react-icons/lu";
import { LuHandCoins } from "react-icons/lu";
import { LuWalletMinimal } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";



export const SideMenuData=[

    {
        id:"01",
        label:"Dashboard",
        icon:LuLayoutDashboard,
        path:"/dashboard",


    }
,
    {
        id:"02",
        label:"Income",
        icon:LuWalletMinimal,
        path:"/income",


    },

    {
        id:"03",
        label:"Coin",
        icon:LuHandCoins,
        path:"/expense",


    },
    {
        id:"04",
        label:"logout",
        icon:LuLogOut,
        path:"/logout",


    }

]