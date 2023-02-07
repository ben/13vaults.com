import BasicLayout from "@/layouts/basic";
import { map } from "lodash";
import Link from "next/link";
import clsx from "clsx";
import ExportedImage from "next-image-export-optimizer";
import heroImage from "@/public/images/camelot-spire-butteredbap.webp";
import Container from "@/components/container";
import { buildNav, Navigation } from "@/lib/navigation";
import { GetStaticPropsResult } from "next";
import {
  allAncestries,
  allClassItems,
  allRulesDocuments,
} from "@/.contentlayer/generated";
import Head from "next/head";

const bottomNavItems = [
  {
    title: "Compendium",
    classes:
      "bg-teal-400/25 hover:bg-teal-400/50 border-teal-400/25 hover:border-teal-400/50",
    large: true,
    body: "All the information you need to play 13th Age games. From combat rules, character creation, to monster stats—it's all here.",
    href: "/compendium/",
  },
  {
    title: "Guides",
    classes: "bg-blue-400/25 cursor-not-allowed border-blue-400/25",
    body: "Coming Soon!",
  },
  {
    title: "Encounter Builder",
    classes: "bg-red-400/25 cursor-not-allowed border-red-400/25",
    body: "Coming Soon!",
  },
];

interface VaultsAppHomeP {
  navigation: Navigation;
}

export default function VaultsAppHome({ navigation }: VaultsAppHomeP) {
  return (
    <>
      <Head>
        <title>
          13 Vaults - An unofficial reference site and toolkit for 13th Age
          roleplaying game (RPG) players and game masters (GMs).
        </title>
      </Head>
      <BasicLayout navigation={navigation}>
        <section className="flex-1 relative min-h-[60vh] text-white grid place-content-center bg-cover bg-top">
          <div className="absolute inset-0 home-hero">
            <ExportedImage
              className="z-[-1] object-top object-cover h-full w-full home-hero bg-neutral-900"
              fill
              src={heroImage}
              alt="Dragon flying near a tower."
              placeholder="blur"
              unoptimized={process.env.NODE_ENV === "development"}
            />
          </div>
          <div className="flex flex-col gap-12 p-4 lg:p-8 pb-14 z-0">
            <h1 className="text-amber-50">
              <span className="sr-only">13 Vaults</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="h-12 md:h-16 mx-auto drop-shadow"
                viewBox="0 0 152 34"
              >
                <path
                  fillRule="evenodd"
                  d="m56 30.7 1.3-4.6-1.5-4.3h3.6l3-8.3-3-2.2h12.3l4.8 12.3h1l1.1 7.1h-6l-1.4-4h-7.6l-1.2 4H56Zm9.5-8.9h4.1l-1.8-5.4h-.6l-1.7 5.4Zm24 9.2c-3.3 0-5.6-.6-7-2-1.5-1.2-2.2-3.3-2.2-6.2v-7.1l-2-4.4h8.3v10.2l.1 2.2c.2.7.5 1.2.9 1.5.4.4 1 .6 2 .6a4 4 0 0 0 2-.5c.3-.3.6-.8.8-1.5l.1-2.3v-5.8l-2-4.4h8.2v11.5c0 2-.3 3.4-1 4.7-.6 1.1-1.6 2-2.9 2.6a13 13 0 0 1-5.3.9Zm12.8-.3-2.8-5.5 2.8 1.1v-9.8l-.8.3.8-5.5h6.1l2.1-.3-2 5.5v5.2l-.4 3.8h.6l5.8 1.5 1.2-2 2.4 4-1.3 1.7h-14.5Zm18.7 0V16.5l-5.7.3-1.3-6.3 1.3.8h17.5l1.2 6.3-1.2-.8-5.7-.3v9.8l1.4-.3-1.4 4.7h-6.2Z"
                />
                <path
                  fillRule="evenodd"
                  d="M142.4 31a17 17 0 0 1-5.7-1 4 4 0 0 1-1.6-.8v-2.9l-2.9-4 2.9 1.2a16.7 16.7 0 0 0 7.6 2c1.1 0 1.7-.2 1.7-.7a1 1 0 0 0-.3-.7l-1.2-.5-2.5-.8-3.2-1.2c-.8-.4-1.5-1-2-1.6-.4-.7-.6-1.6-.6-2.7 0-1.9.8-3.4 2.3-4.6 1.6-1.1 3.8-1.7 6.8-1.7a23.3 23.3 0 0 1 3.5.2l4.3-.7-2.2 2.5v4.7l-7.2-1.8c-.7 0-1 .3-1 .8 0 .3.1.7.6 1l2.6 1c1.7.5 3 1 4 1.6A5 5 0 0 1 151 25a5.7 5.7 0 0 1-2.2 4.4 10.7 10.7 0 0 1-6.5 1.7ZM3.7 30.7V16.9l1-3-2.8.7H0v-5l9.5-1.3.3 1.9-.3 3.1.5 13.9-.5 3.5H3.7Zm16.7.3a27.2 27.2 0 0 1-3.6-.3L13 29l-.4-6.8 2 1.8 6.2 1.8c1.2 0 2-.2 2.6-.6.5-.5.8-1 .8-1.6 0-.6-.2-1-.6-1.2-.4-.3-1-.4-2-.4h-3.8l-4-5h7.5c.7 0 1.2-.2 1.6-.5.5-.3.7-.7.7-1.3 0-.6-.2-1-.6-1.3a3 3 0 0 0-1.7-.5 13.8 13.8 0 0 0-5.5 1.1l-1.9.7-2.6-5.8 2.6.5a16 16 0 0 1 4.6-1.5c1-.2 2.2-.3 3.5-.3 2.3 0 4 .5 5.3 1.6 1.2 1 1.8 2.5 1.8 4.4a5 5 0 0 1-.7 2.7 6 6 0 0 1-1.4 1.7 5.2 5.2 0 0 1 3 5c.1 5-3.1 7.6-9.5 7.6Zm17.9 3-7.8-22.6.4-3.3-1.7-3.2L26 0l11.4 4.9 6 21.6.4 2.6.5-2.6 6-21.6L47 1.6h9.8L60 5l-3 6.5L49.5 34H38.3Z"
                />
              </svg>
            </h1>
            <div className="prose prose-p:font-display prose-p:font-medium prose-invert prose-p:my-1 prose-p:text-justify prose-p:leading-tight prose-p:text-amber-50">
              <p>
                13 Vaults is an unofficial community-driven resource site for
                13th Age&mdash;a fun and exciting RPG that innovates on the
                classic d20 system. Inside you&lsquo;ll find many resources and
                tools for GMs and players alike, from class pages to the full
                SRD rules reference and much more.
              </p>
            </div>
            <div className="grid place-content-center">
              <Link
                className="flex gap-3 focus:bg-teal-500 hover:bg-teal-500 bg-teal-600 border border-teal-400/50 hover:border-teal-400 rounded pl-8 pr-12 py-3 shadow transition-colors font-display font-semibold items-center"
                href="/compendium/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-5 w-5"
                  viewBox="0 0 34 34"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.3 34 4.5 11.4 5 8.1 3.2 4.9 0 0l11.4 4.9 6 21.6.4 2.6.5-2.6 6-21.6L21 1.6h9.8L34 5l-3 6.5L23.5 34H12.3Z"
                  />
                </svg>
                <span>Enter the Vaults</span>
              </Link>
            </div>
          </div>
          <p className="absolute bottom-5 left-5 text-sm text-amber-700/50">
            <a href="https://www.deviantart.com/butteredbap/art/Camelot-spire-358955566">
              Camelot Spire by butteredbap
            </a>
          </p>
        </section>
        <section className="bg-[rgb(27,10,0)] text-white">
          <Container>
            <nav>
              <ul
                role="list"
                className="grid grid-cols-1 md:grid-cols-2 gap-1 p-1"
              >
                {map(bottomNavItems, (item) => (
                  <li
                    key={item.title}
                    className={clsx({
                      "md:col-span-2": item.large,
                      "md:col-span-1": !item.large,
                    })}
                  >
                    {item.href ? (
                      <Link
                        className={clsx(
                          item.classes,
                          "grid place-content-center rounded-sm border h-40 text-center px-4 lg:px-8 transition-colors"
                        )}
                        href={item.href}
                      >
                        <h2 className="text-3xl font-display-serif font-semibold">
                          {item.title}
                        </h2>
                        <p className="text-sm leading-tight font-display text-justify text-align-last-center font-medium text-white/75">
                          {item.body}
                        </p>
                      </Link>
                    ) : (
                      <div
                        className={clsx(
                          item.classes,
                          "grid place-content-center rounded-sm border h-40 text-center px-4 lg:px-8 opacity-60 transition-colors"
                        )}
                      >
                        <h2 className="text-3xl font-display-serif font-semibold">
                          {item.title}
                        </h2>
                        <p className="text-sm leading-tight font-display text-justify text-align-last-center font-medium text-white/75">
                          {item.body}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </section>
      </BasicLayout>
    </>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<VaultsAppHomeP>
> {
  return {
    props: {
      navigation: buildNav({
        rulesDocuments: allRulesDocuments,
        classItems: allClassItems,
        ancestries: allAncestries,
      }),
    },
  };
}
