import React from "react";
import DonorDashboard from "./DonorDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard | SustainWear"
}

export default function Dashboard() {
	let signedAsDonor = true;

	if (signedAsDonor) {
		return <DonorDashboard />
	}
	
	return "Not signed in"
}
