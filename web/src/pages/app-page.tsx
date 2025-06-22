import { MyLinksComponent } from "../components/my-links-component"
import { NewLinkComponent } from "../components/new-link-component"

export function AppPage() {
  return (
    <main className="mx-auto mt-[10vh] flex w-full max-w-[992px] flex-col p-5">
      <img src="/src/assets/logo.svg" alt="brev.ly" className="w-24 pb-8" />

      <div className="flex w-full gap-8">
        <NewLinkComponent />
        <MyLinksComponent />
      </div>
    </main>
  )
}
