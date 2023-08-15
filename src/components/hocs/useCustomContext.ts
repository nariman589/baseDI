import { useContext } from "react";
import { customContext } from "./Context";
export const useCustomContext = () => useContext(customContext);
