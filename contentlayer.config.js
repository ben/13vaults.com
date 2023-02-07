import {
  defineDocumentType,
  makeSource,
  defineNestedType,
} from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";

const sectionsField = {
  type: "json",
  resolve: (doc) => {
    const slugger = new GithubSlugger();
    const headingsRegex = /\n(##)\s+(?<content>.+)/g;
    const headings = Array.from(doc.body.raw.matchAll(headingsRegex));
    return headings.map(({ groups }) => {
      const content = groups?.content;
      return {
        id: slugger.slug(content),
        title: content,
      };
    });
  },
};

const PageNav = defineNestedType(() => ({
  name: "PageNav",
  fields: {
    label: { type: "string", required: true },
    id: { type: "string", required: true },
    children: { type: "list", of: PageNav, required: false },
  },
}));

const PageDressQuote = defineNestedType(() => ({
  name: "PageDressQuote",
  fields: {
    text: { type: "string", required: true },
    cite: { type: "string", required: true },
  },
}));

const PageDress = defineNestedType(() => ({
  name: "PageDress",
  fields: {
    quote: { type: "nested", of: PageDressQuote, required: false },
    lead: { type: "string", required: false },
  },
}));

const BasicPage = defineDocumentType(() => ({
  name: "BasicPage",
  filePathPattern: "pages/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));

const RulesDocument = defineDocumentType(() => ({
  name: "RulesDocument",
  filePathPattern: "1e/rules/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    source: { type: "string", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    sections: sectionsField,
  },
}));

const Monster = defineDocumentType(() => ({
  name: "Npc",
  filePathPattern: "1e/monsters/*.yml",
  contentType: "data",
  fields: {
    name: { type: "string", required: true },
    system: { type: "json", required: true },
    items: { type: "list", of: { type: "json" }, required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.yml$/, ""),
    },
  },
}));

const Ancestry = defineDocumentType(() => ({
  name: "Ancestry",
  filePathPattern: "1e/ancestries/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    source: { type: "string", required: true },
    page_dress: { type: "nested", of: PageDress, required: false },
    page_nav: { type: "list", of: PageNav, required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    sections: sectionsField,
  },
}));

const ClassItem = defineDocumentType(() => ({
  name: "ClassItem",
  filePathPattern: "1e/classes/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    source: { type: "string", required: true },
    page_dress: { type: "nested", of: PageDress, required: true },
    page_nav: { type: "list", of: PageNav, required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    sections: sectionsField,
  },
}));

const contentLayerConfig = makeSource({
  contentDirPath: "content",
  documentTypes: [BasicPage, ClassItem, Ancestry, RulesDocument],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});

export default contentLayerConfig;
