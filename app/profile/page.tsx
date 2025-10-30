"use client";
import React from "react";
import UserMetaCard from "./UserMetaCard";
import UserInfoCard from "./UserInfoCard";
import UserAddressCard from "./UserAddressCard";

export type Profile = {
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  email: string;
  phone: string;
  bio: string;
  country: string;
  cityState: string;
  postalCode: string;
  taxId: string;
};

export const DEFAULT_PROFILE: Profile = {
  firstName: "Aarav",
  lastName: "Patel",
  fullName: "Aarav Patel",
  role: "Software Engineer",
  email: "aarav.patel@techhive.in",
  phone: "+91 91234 56789",
  bio: "Software Engineer at TechHive, passionate about frontend and cloud development.",
  country: "India",
  cityState: "Hyderabad, Telangana, India",
  postalCode: "500081",
  taxId: "GSTIN: 36AAPTP1234G1Z9",
};

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6 lg:col-span-2"//"grid grid-cols-1 gap-6 lg:grid-cols-3"
    >
      {/* Left: Meta info card */}
      <UserMetaCard profile={DEFAULT_PROFILE} />

      {/* Right: User info and address /}
      <div className="flex flex-col gap-6 lg:col-span-2">*/}
        <UserInfoCard profile={DEFAULT_PROFILE} />
        <UserAddressCard profile={DEFAULT_PROFILE} />

    </div>
  );
}
