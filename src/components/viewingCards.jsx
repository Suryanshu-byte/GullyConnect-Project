import { useEffect, useState } from "react";
import IssueCard from "./cards";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ViewingCards() {
  // states
  const { state } = useLocation();
  const navigate = useNavigate();
  const [data2, setData2] = useState();
  // console.log(state);
  // use effect
  useEffect(() => {
    async function verify() {
      let data = await axios.post(
        "http://localhost:3000/app/v1/users/authorization",
        {},
        {
          headers: {
            authorization: `bearer ${state.state}`,
          },
        }
      );

      if (data.data.status == false) {
        navigate("/login");
      }
    }
    verify();
    let newSearchQuery = state.title.trim().replace(" ", "");
    async function getData() {
      let data = await axios.get(
        `http://localhost:3000/app/v1/userProblems/get${newSearchQuery}Problems`
      );

      let data2 = data.data.data;
      console.log(data2);
      setData2(data2);
    }
    getData();
  }, []);

  return (
    <>
      {data2
        ? data2.map((item) => {
            return (
              <IssueCard
                priority={item.pPriority}
                category={item.pType}
                title={item.Pname}
                description={item.pDescrition}
                location={item.PAddress}
                status={""}
                //image={item.pImage}
              />
            );
          })
        : ""}
    </>
  );
}
