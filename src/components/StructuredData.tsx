import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getStructuredData } from "@/lib/searchContent";

const StructuredData = () => {
  const { pathname } = useLocation();
  const data = getStructuredData(pathname);
  return data ? <Helmet><script type="application/ld+json">{JSON.stringify(data).replace(/</g, "\\u003c")}</script></Helmet> : null;
};
export default StructuredData;
