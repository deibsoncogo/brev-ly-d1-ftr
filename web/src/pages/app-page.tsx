import { MyLinksComponent } from "../components/my-links-component"
import { NewLinkComponent } from "../components/new-link-component"

export function AppPage() {
  return (
    <main className="mx-auto flex w-full max-w-[992px] flex-col items-center p-5 md:mt-[10vh] md:items-start">
      <img src="/src/assets/logo.svg" alt="brev.ly" className="w-24 pb-8" />

      <div className="flex w-full flex-col gap-8 md:flex-row">
        <NewLinkComponent />
        <MyLinksComponent />
      </div>
    </main>
  )
}
