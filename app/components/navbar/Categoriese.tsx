'use client'

import Container from "../Container"

import { BsSnow } from "react-icons/bs"
import { IoDiamond } from "react-icons/io5"
import { TbBeach, TbMountain, TbPool } from "react-icons/tb"
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi"
import { MdOutlineVilla } from "react-icons/md"
import { FaSkiing } from "react-icons/fa"
import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"

export const categories = [
    {
        label : "Beach",
        icon: TbBeach,
        descriptions: "This property is close to the beach"
    },
    {
        label : "Windmills",
        icon: GiWindmill,
        descriptions: "This property has windmills"
    },
    {
        label : "Modern",
        icon: MdOutlineVilla,
        descriptions: "This property is modern"
    },
    {
        label : "Countryside",
        icon: TbMountain,
        descriptions: "This property is in countryside"
    },
    {
        label : "Pools",
        icon: TbPool,
        descriptions: "This property has a pool"
    },
    {
        label : "Islands",
        icon: GiIsland,
        descriptions: "This property is on an island"
    },
    {
        label : "Lake",
        icon: GiBoatFishing,
        descriptions: "This property is close to a lake"
    },
    {
        label : "skiing",
        icon: FaSkiing,
        descriptions: "This property has skiing activites"
    },
    {
        label : "Castles",
        icon: GiCastle,
        descriptions: "This property is in a castle"
    },
    {
        label : "Camping",
        icon: GiForestCamp,
        descriptions: "This property has camping activites"
    },
    {
        label : "Arctic",
        icon: BsSnow,
        descriptions: "This property has camping activites"
    },
    {
        label : "Cave",
        icon: GiCaveEntrance,
        descriptions: "This property is in a cave"
    },
    {
        label : "Desert",
        icon: GiCactus,
        descriptions: "This property is in a desert"
    },
    {
        label : "Barans",
        icon: GiBarn,
        descriptions: "This property is in barn"
    },
    {
        label : "Lux",
        icon: IoDiamond,
        descriptions: "This property is luxurious"
    },
]

const Categoriese = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';
    if(!isMainPage) return null;


    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map(item => (
                    <CategoryBox
                        key={item.label}
                        selected = {category === item.label}
                        label={item.label}
                        description={item.descriptions}
                        icon={item.icon}/>
                ))}
            </div>        
        </Container>
    )
}

export default Categoriese