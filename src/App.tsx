import lunr from "lunr";
import { useQuery } from "react-query";
import { Search } from "./Search";
import "./App.css";

function App() {
  const { data: users = [], isLoading } = useQuery(
    ["users"],
    () => {
      return fetch("http://localhost:3200/mentions/members").then((res) =>
        res.json()
      );
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // create lunr index
  const idx = lunr(function () {
    this.ref("userId");
    this.field("firstName");
    this.field("lastName");
    this.field("userType");
    this.field("projectId");
    users.forEach((d: any) => {
      this.add(d);
    });
  });

  return <Search users={users} idx={idx} />;
}

export default App;
