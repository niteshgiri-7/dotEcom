import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

import moment from "moment";
import { ICoupon } from "../../types/coupon";
import TableHOC from "./TableHOC";

const CouponTable = ({ data }: { data: ICoupon[] }) => {

    const getDaysLeft = (date: string) => {
        return moment(date).diff(moment(), "days")+1;
    }

    const getColour = (daysLeft: number | string) => {
        if (daysLeft as number < 3)
            daysLeft = 0;
        else if(daysLeft as number >10)
            daysLeft = 10;
        else 
        daysLeft=8;

        const colorSaturation = Number(daysLeft) / 10;

        const red = Math.round((1 - colorSaturation) * 255);
        const green = Math.round((colorSaturation) * 255);
        const blue = Math.round((1-Math.abs(colorSaturation-0.5)*2)*100);
        return `rgb(${red},${green},${blue})`;

    }
     
    const isCouponExpired = (daysLeft:number):boolean=>{
         if(daysLeft<1) return true;
         else return false;
    }

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Consider mobile if width < 768px
        };
        handleResize(); // Initialize state
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMobile]);
    
    const columns = useMemo<ColumnDef<ICoupon, string>[]>(() => {
        const baseColumns: ColumnDef<ICoupon, string>[] = [
            {
                accessorKey: 'code',
                header: 'Coupon Code',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'discountedAmount',
                header: 'Discount',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'maxRedemptionCount',
                header: 'Redem Limit',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'expiresAt',
                header: 'Validity',
                cell: (info) => (
                    <span
                        className="p-2 rounded-2xl font-semibold text-black text-nowrap"
                        style={{ backgroundColor: `${getColour(getDaysLeft(info.getValue()))}` }}
                    >
                        {isCouponExpired(getDaysLeft(info.getValue())) ? "Expired" : getDaysLeft(info.getValue()) + " days Left"}
                    </span>
                ),
            },
        ];
    
        if (!isMobile) {
           const availableReedemption :ColumnDef<ICoupon,string>={
            accessorKey: 'availableRedemptionCount',
            header: 'Available',
            cell: (info) => <span>{info.getValue()}</span>,
           }

           baseColumns.splice(baseColumns.length-1,0,availableReedemption);
        }
    
        return baseColumns;
    }, [isMobile]);
    

    return (
        TableHOC(columns, data, "Coupons List", true)()
    )
}

export default CouponTable
