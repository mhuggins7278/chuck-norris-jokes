import { Outlet } from "remix";
import stylesUrl from "../styles/jokes.css"

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: stylesUrl
    }
  ];
};

export default function JokesRoute() {
  return (
    <div>
      <h1>J🤪KES</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
