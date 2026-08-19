import { serviceTypes } from "./src/components/Services";
import fs from "fs";

const formatted = JSON.stringify(serviceTypes, null, 2);
fs.writeFileSync("serviceTypes.json", formatted);
console.log("Exported serviceTypes to serviceTypes.json");
