import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import TableHOC from "./TableHOC";
import { ICoupon } from "../types/coupon";
import moment from "moment";

const CouponTable = ({ data }: { data: ICoupon[] }) => {

    const getDaysLeft = (date: string) => {
        return moment(date).diff(moment(), "days")+1;
    }

    const getColour = (daysLeft: number | string) => {
        console.log(daysLeft,"daysLeft")
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
       console.log(`rgb(${red},${green},${blue})`)
        return `rgb(${red},${green},${blue})`;

    }

    const columns = useMemo<ColumnDef<ICoupon, string>[]>(() => [
        {
            accessorKey: 'code',
            header: 'Coupon Code',
            cell: (info) => info.getValue()
        },
        {
            accessorKey: 'discountedAmount',
            header: 'Discount',
            cell: (info) => info.getValue()
        },
        {
            accessorKey: 'maxRedemptionCount',
            header: 'Redem Limit',
            cell: (info) => (info.getValue())
        },
        {
            accessorKey: 'availableRedemptionCount',
            header: 'Available',
            cell: (info) => info.getValue()
        },
        {
            accessorKey: 'expiresAt',
            header: 'Validity',
            cell: (info) => <span className="p-2 rounded-lg font-semibold text-black" style={{backgroundColor:`${getColour(getDaysLeft(info.getValue()))}`}}>{getDaysLeft(info.getValue())} Days left </span>
        }
    ],
        []
    )

    return (
        TableHOC(columns, data, "Coupons List", true)()
    )
}

export default CouponTable
