import { callAPI } from "@/utils/api-caller";
import React from "react";

import Tracking from "@/components/tracking";

const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA
const TrackPage = ()=>{


   return (
    <div className="px-20 py-40">
         <Tracking></Tracking>
    </div>
)
}
export default TrackPage
