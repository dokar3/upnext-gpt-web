import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-black flex min-h-screen flex-col items-center justify-between p-8">
      <div className="flex flex-col items-center">
        <img className="w-24 h-24" src="./icon-web.svg" />
        <div className="mt-4 text-5xl font-bold">UpNext GPT</div>
        <div className="mt-4 text-lg">
          Your playlist, powered by <span className="font-bold">ChatGPT</span>.
        </div>
        <div className="mt-4 text-lg">
          Free and{" "}
          <a
            href="https://github.com/dokar3/upnext-gpt"
            target="_blank"
            className="underline"
          >
            Open Source
          </a>
          !
        </div>

        <div className="mt-12 text-2xl font-bold">Downloads (Android)</div>

        <div className="mt-12 flex items-center">
          <a
            href="https://play.google.com/store/apps/details?id=com.dokar.upnextgpt&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            target="_blank"
          >
            <img
              alt="Get it on Google Play"
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              className="h-16"
            />
          </a>

          <p className="mr-4">OR</p>

          <a
            href="https://github.com/dokar3/upnext-gpt/releases"
            target="_blank"
          >
            <button className="py-2 px-4 flex items-center rounded-md border-2 border-gray-500 hover:bg-primary-darken hover:border-primary-darken">
              <GithubIcon className="mr-2 fill-white" />
              Github
            </button>
          </a>
        </div>

        <div className="mt-12 mb-6 text-2xl font-bold">Screenshots</div>

        <div className="max-w-4xl grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Screenshot
              src="./screenshot-home.jpg"
              title="Home"
              className="mb-6"
            />
            <Screenshot src="./screenshot-settings.jpg" title="Settings" />
          </div>

          <div>
            <Screenshot
              src="./screenshot-players.jpg"
              title="Players"
              className="mb-6"
            />
            <Screenshot src="./screenshot-queue.jpg" title="Queue" />
          </div>
        </div>
      </div>

      <div className="mt-12 w-full flex justify-between">
        <div>
          © 2024 UpNext GPT
          <Link href="/privacy" className="ml-4 hover:underline">
            Privacy
          </Link>
        </div>
        <div className="flex items-center">
          <a
            href="https://twitter.com/EnDeepFour"
            target="_blank"
            className="mr-8 fill-white"
          >
            <TwitterIcon />
          </a>

          <a href="https://github.com/dokar3/upnext-gpt" target="_blank">
            <div className="fill-white">
              <GithubIcon />
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}

function Screenshot({
  src,
  title,
  className,
}: {
  src: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={"relative w-full h-min " + (className ?? "")}>
      <p className="mb-2 text-center text-primary-normal">{title}</p>
      <div className="rounded-2xl border border-gray-600 overflow-hidden">
        <img src={src} />
      </div>
    </div>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
