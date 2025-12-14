import React from "react";
// import CloseIcon from "@/app/components/icons/setting.png";

type AlertType = 'SuccessfulDonation' | 'UnsuccessfulDonation' | 'DonationAccept' | 'DonationReject' |
                 'SuccessfulEdit' | 'UnsuccessfulEdit' | 'SuccessfulDelete' | 'UnsuccessfulDelete' |
                 'SuccessfulEditAcc' | 'UnsuccessfulEditAcc';

type AlertProps = {
    type: AlertType;
    message: string;
    onClose: () => void;
};

const backgroundColours = {
    SuccessfulDonation: "#22C55E", DonationAccept: "#22C55E", SuccessfulEdit: "#22C55E", SuccessfulDelete: "#22C55E",
    SuccessfulEditAcc: "#22C55E",
    UnsuccessfulDonation: "#EF4444", DonationReject: "#EF4444", UnsuccessfulEdit: "#EF4444", UnsuccessfulDelete: "#EF4444",
    UnsuccessfulEditAcc: "#EF4444",
};

const Alert: React.FC<AlertProps> = ({type, message, onClose}) => {
    return (
        <div className="alert-box flex w-full rounded-lg flex-col max-w-[400px] transform items-start justidy-start gap-4 bg-white transition delay-200 duration 500 ease-in-out"
             style={{zIndex: "100"}}>
            <div className="flex w-full items-start justify-between p-3">
                <span className="font-Inter text-[13px] font-medium leading-tight text-black">
                    {message}
                </span>
                <span className="cursor-pointer duration-300 hover:opacity-70"
                      onClick={onClose}>
                    X
                </span>
            </div>
            <div className="flex h-4 w-full items-center justify-center rounded-b-lg"
                 style={{backgroundColor: backgroundColours[type],}}>
            </div>
        </div>
    );
};

export default Alert;