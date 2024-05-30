import { Cards } from "./Cards";
import { CirclePlus } from 'lucide-react';
import React from "react";
import {Button} from "@nextui-org/react";
import {HeartIcon} from 'lucide-react';


export function GrupoCards() {
    return (
        <>
        <div className="max-w-[1200px] mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
                <div></div>
            <div className="flex justify-content-center gap-4 items-center">
        <Button isIconOnly color="danger" aria-label="Like">
        <CirclePlus />
        </Button>  
        </div>
        </div>
    </>
    );
}
