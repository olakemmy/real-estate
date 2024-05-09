import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";



export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/account",
    name: "My account",
    type: "dropdown",
    isNew: true,
  },

  {
    id: ncNanoId(),
    href: "/my-listings",
    name: "My listings",
    type: "dropdown",

  },
  {
    id: ncNanoId(),
    href: "/account-savelists",
    name: "Wishlist",
    type: "dropdown",
  },


];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    type: "dropdown",
    isNew: true,
  },

  {
    id: ncNanoId(),
    href: "/author",
    name: "Templates",
    type: "dropdown",

  },


];
