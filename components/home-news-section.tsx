import { PickPartial } from "@/utils";
import HomeNewsSectionItem from "./home-news-section-item";
import { BlogPost } from "@/.contentlayer/generated";
import { map, size } from "lodash";
import { useTranslation } from "next-i18next";
import Link from "next/link";

type BlogPostItem = PickPartial<
  BlogPost,
  "date" | "published" | "slug" | "excerpt" | "title"
>;

interface HomeNewsSectionP {
  heroPost: BlogPostItem;
  extraPosts: BlogPostItem[];
}

export default function HomeNewsSection({
  heroPost,
  extraPosts = [],
}: HomeNewsSectionP) {
  const { t } = useTranslation("home");

  return (
    <nav
      aria-label={t("latest-posts-blog") as string}
      className="flex flex-col gap-4"
    >
      <ol role="list" className="flex flex-col gap-4">
        <li>
          <HomeNewsSectionItem.Hero
            title={heroPost.title}
            slug={heroPost.slug}
            published={heroPost.published}
            date={heroPost.date}
            excerpt={heroPost.excerpt}
          />
        </li>
        {size(extraPosts) > 0 ? (
          <li>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
              {map(extraPosts, (post) => (
                <li className="flex">
                  <HomeNewsSectionItem
                    title={post.title}
                    slug={post.slug}
                    published={post.published}
                    date={post.date}
                    excerpt={post.excerpt}
                  />
                </li>
              ))}
            </ol>
          </li>
        ) : null}
      </ol>
      <div className="flex justify-center">
        <Link
          className="py-1 px-3 bg-teal-600 hover:bg-teal-500 transition-colors text-white font-display font-medium uppercase"
          href="/blog"
        >
          {t("view-all-blog-posts")}
        </Link>
      </div>
    </nav>
  );
}
