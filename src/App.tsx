import { useState } from "react";
import lunr from "lunr";
import "./App.css";
import { useLunr } from "./useLunr";
import { useQuery } from "react-query";
import _keyBy from "lodash/keyBy";

function App() {
  const [query, setQuery] = useState<any>("aaa");
  const { data = { users: [] } } = useQuery(
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

  const idx = lunr(function () {
    this.ref("emailId");
    this.field("firstName");
    this.field("lastName");
    this.field("userId");
    this.field("userType");

    data.users.forEach((d: any) => {
      this.add(d);
    });
  });

  console.log(idx);

  const handleSearch = (e: any) => {
    if (e.target.value.length > 2) {
      setQuery(e.target.value);
    }
  };

  const results = useLunr(
    `+userType:NATIVE +userId:90194 +firstName:${query}~3`,
    idx,
    _keyBy(data.users, "emailId")
  );

  return (
    <div className="App">
      <h1>Hello lunr</h1>
      <input
        style={{
          width: "100%",
          height: "30px",
        }}
        onChange={handleSearch}
      />

      <div
        style={{
          marginTop: 20,
          overflow: "auto",
          minHeight: "300px",
          maxHeight: "300px",
        }}
      >
        <ul>
          {results.map((r: any) => (
            <li key={r.ref}>
              {r.firstName} {r.lastName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
