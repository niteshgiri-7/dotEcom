import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import TableHOC from "./TableHOC";

interface CouponDataType {
    code: string;
    discount: number;
    expiresAt: Date;
    couponStatus:"expired"|"used"|"available"
}

const couponData: CouponDataType[] = [
    {
        code: "NITESH1234",
        discount: 100,
        expiresAt: new Date('2025-12-31T23:59:59'),
        couponStatus:"used"
    },
    {
        code: "SUMMERSALE20",
        discount: 20,
        expiresAt: new Date('2025-06-30T23:59:59'),
        couponStatus:"available"
    },
    {
        code: "NEWYEAR2025",
        discount: 50,
        expiresAt: new Date('2025-01-01T23:59:59'),
        couponStatus:"expired"
    },
    {
        code: "FESTIVE10",
        discount: 10,
        expiresAt: new Date('2025-11-15T23:59:59'),
        couponStatus:"available",
    },
    {
        code: "BLACKFRIDAY2025",
        discount: 75,
        expiresAt: new Date('2025-11-27T23:59:59'),
        couponStatus:"used"
    },
    {
        code: "WINTERSALE30",
        discount: 30,
        expiresAt: new Date('2025-02-28T23:59:59'),
        couponStatus:"available"
    }
];



const CouponTable = () => {

    const columns = useMemo<ColumnDef<CouponDataType,string>[]>(() => [
        {
            accessorKey:'code',
            header:'Coupon Code',
            cell:(info)=>info.getValue()
        },
        {
            accessorKey:'discount',
            header:'Discount',
            cell:(info)=>info.getValue()
        },
        {
            accessorKey:'expiresAt',
            header:'Expires At',
            cell:(info)=>String(info.getValue())
        },
        {
            accessorKey:'couponStatus',
            header:'Status',
            cell:(info)=>info.getValue()
        }
    ],
        []
    )

    return (
    TableHOC(columns,couponData,"Coupons List",true)()
  )
}

export default CouponTable
