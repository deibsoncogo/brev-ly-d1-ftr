import { MyLinks } from "../components/my-links"
import { NewLink } from "../components/new-link"

export function App() {
  return (
    <main className="flex flex-col w-full max-w-[992px] p-5 mx-auto mt-[10vh]">
      <img src="/src/assets/logo.svg" alt="brev.ly" className="w-24 pb-8" />

      <div className="flex w-full gap-8">
        <NewLink />
        <MyLinks />
      </div>
    </main>
  )
}
