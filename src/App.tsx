import { useMemo, useState } from "react";
import lunr from "lunr";
import "./App.css";
import { useLunr } from "./useLunr";
import { useQuery } from "react-query";
import _keyBy from "lodash/keyBy";

function App() {
  const [query, setQuery] = useState<any>("0");
  const [projectId, setProjectId] = useState<any>("0");
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

  const handleSearch = (e: any) => {
    if (e.target.value.length > 2) {
      setQuery(e.target.value);
    }
  };

  // query lunr
  const results = useLunr(
    `+projectId:${projectId} +firstName:${query}~1`,
    idx,
    _keyBy(users, "userId")
  );

  const projectIds = useMemo(
    () => users.map((user: any) => user.projectId),
    [users]
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

     ProjectId: <input
        onChange={(e) => {
          setProjectId(e.target?.value || "0");
        }}
        style={{
          marginTop: 20,
        }}
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
          {results?.length ? (
            results.map((r: any) => (
              <li key={r.userId}>
                {r.firstName} {r.lastName}
              </li>
            ))
          ) : (
            <li>No results</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
