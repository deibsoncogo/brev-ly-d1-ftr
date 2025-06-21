import { MyLinksComponent } from "../components/my-links-component"
import { NewLinkComponent } from "../components/new-link-component"

export function AppPage() {
  return (
    <main className="flex flex-col w-full max-w-[992px] p-5 mx-auto mt-[10vh]">
      <img src="/src/assets/logo.svg" alt="brev.ly" className="w-24 pb-8" />

      <div className="flex w-full gap-8">
        <NewLinkComponent />
        <MyLinksComponent />
      </div>
    </main>
  )
}
