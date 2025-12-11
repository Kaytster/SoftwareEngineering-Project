'use client'
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { ReportData } from '@/app/reports/page';

interface AcceptedDonationsChartProps {
    data: ReportData;
}

export default function AcceptedDonationsChart({data}: AcceptedDonationsChartProps) {

    return (
        <LineChart style={{width: '100%', aspectRatio: 1.618, maxWidth: 600, backgroundColor:"white", borderRadius: 20, paddingRight: 20, marginTop: 10}}
                   responsive 
                   data={data}
                   margin={{top: 20, right: 20, bottom: 5, left: 0}}>
            <CartesianGrid />    
            <Line dataKey="acceptedDonations" />
            <XAxis dataKey="month" />
            <YAxis width="auto" label={{value: 'Accepted Donations', position: 'insideLeft', angle: -90}} />
            <Legend align='right'/>
            <Tooltip />
        </LineChart>
    )
}