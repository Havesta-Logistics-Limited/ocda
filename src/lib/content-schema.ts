// Defines every editable, single-instance content block on the site (the
// admin dashboard renders a form from this shape) plus the draft copy each
// block starts with. News/events and gallery images are their own database
// tables (see Post / GalleryImage in prisma/schema.prisma) because they're
// collections the admin adds to over time, not single blocks.

export type SimpleField = { key: string; label: string; type: "text" | "textarea" | "image"; placeholder?: string };

export type ContentSection = {
  key: string;
  label: string;
  description: string;
  fields: (SimpleField | { key: string; label: string; type: "list"; itemLabel: string; fields: SimpleField[] })[];
};

export const CONTENT_SECTIONS: ContentSection[] = [
  {
    key: "home.hero",
    label: "Home — Hero",
    description: "The first thing visitors see.",
    fields: [
      { key: "eyebrow", label: "Small label above headline", type: "text" },
      { key: "headline", label: "Headline", type: "textarea" },
      { key: "description", label: "Supporting sentence", type: "textarea" },
      { key: "primaryCtaLabel", label: "Primary button label", type: "text" },
      { key: "primaryCtaHref", label: "Primary button link", type: "text" },
      { key: "secondaryCtaLabel", label: "Secondary button label", type: "text" },
      { key: "secondaryCtaHref", label: "Secondary button link", type: "text" },
      { key: "imageUrl", label: "Hero image", type: "image" },
    ],
  },
  {
    key: "home.featureBar",
    label: "Home — Highlights strip",
    description: "The row of short highlights overlapping the bottom of the hero.",
    fields: [
      {
        key: "items",
        label: "Highlights",
        type: "list",
        itemLabel: "Highlight",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "home.stats",
    label: "Home — Quick facts strip",
    description: "The row of numbers under the hero.",
    fields: [
      {
        key: "items",
        label: "Facts",
        type: "list",
        itemLabel: "Fact",
        fields: [
          { key: "value", label: "Number", type: "text", placeholder: "e.g. 500+" },
          { key: "label", label: "Label", type: "text", placeholder: "e.g. Members" },
        ],
      },
    ],
  },
  {
    key: "home.missionTeaser",
    label: "Home — Mission teaser",
    description: "Short 'who we are' block linking to the About page.",
    fields: [
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "headline", label: "Headline", type: "textarea" },
      { key: "body", label: "Paragraph", type: "textarea" },
    ],
  },
  {
    key: "home.programs",
    label: "Home — Programs preview",
    description: "The grid of what OCDA does.",
    fields: [
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "headline", label: "Headline", type: "textarea" },
      {
        key: "items",
        label: "Programs",
        type: "list",
        itemLabel: "Program",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "imageUrl", label: "Photo", type: "image" },
        ],
      },
    ],
  },
  {
    key: "home.spotlight",
    label: "Home — Featured quote",
    description: "One large pull-quote from a leader or long-time member.",
    fields: [
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "quote", label: "Quote", type: "textarea" },
      { key: "name", label: "Name", type: "text" },
      { key: "role", label: "Role", type: "text" },
      { key: "photoUrl", label: "Photo", type: "image" },
    ],
  },
  {
    key: "home.testimonials",
    label: "Home — Testimonials",
    description: "What members and volunteers say about OCDA.",
    fields: [
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "headline", label: "Headline", type: "textarea" },
      {
        key: "items",
        label: "Testimonials",
        type: "list",
        itemLabel: "Testimonial",
        fields: [
          { key: "quote", label: "Quote", type: "textarea" },
          { key: "name", label: "Name", type: "text" },
          { key: "role", label: "Role", type: "text" },
          { key: "photoUrl", label: "Photo", type: "image" },
        ],
      },
    ],
  },
  {
    key: "home.getInvolvedCta",
    label: "Home — Get involved banner",
    description: "The call-to-action band before the footer.",
    fields: [
      { key: "headline", label: "Headline", type: "textarea" },
      { key: "body", label: "Supporting sentence", type: "textarea" },
      { key: "ctaLabel", label: "Button label", type: "text" },
      { key: "ctaHref", label: "Button link", type: "text" },
    ],
  },
  {
    key: "about.story",
    label: "About — Our story",
    description: "History and mission on the About page.",
    fields: [
      { key: "eyebrow", label: "Small label", type: "text" },
      { key: "headline", label: "Headline", type: "textarea" },
      { key: "body", label: "Story (one paragraph per line)", type: "textarea" },
      { key: "imageUrl", label: "Photo", type: "image" },
    ],
  },
  {
    key: "about.pillars",
    label: "About — Values",
    description: "The principles OCDA operates by.",
    fields: [
      {
        key: "items",
        label: "Values",
        type: "list",
        itemLabel: "Value",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "about.team",
    label: "About — Leadership",
    description: "The executive council / leadership team.",
    fields: [
      {
        key: "items",
        label: "Leaders",
        type: "list",
        itemLabel: "Leader",
        fields: [
          { key: "name", label: "Name", type: "text" },
          { key: "role", label: "Role", type: "text" },
          { key: "bio", label: "Short bio", type: "textarea" },
          { key: "photoUrl", label: "Photo", type: "image" },
        ],
      },
    ],
  },
  {
    key: "getInvolved.intro",
    label: "Get Involved — Intro",
    description: "Top of the Get Involved & Donate page.",
    fields: [
      { key: "headline", label: "Headline", type: "textarea" },
      { key: "body", label: "Intro paragraph", type: "textarea" },
    ],
  },
  {
    key: "getInvolved.ways",
    label: "Get Involved — Ways to help",
    description: "Volunteering, membership, partnership options.",
    fields: [
      {
        key: "items",
        label: "Ways to help",
        type: "list",
        itemLabel: "Way to help",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "ctaLabel", label: "Button label (optional)", type: "text" },
          { key: "ctaHref", label: "Button link (optional, e.g. mailto:)", type: "text" },
        ],
      },
    ],
  },
  {
    key: "getInvolved.donate",
    label: "Get Involved — Donate",
    description: "How to give — bank details or instructions.",
    fields: [
      { key: "headline", label: "Headline", type: "text" },
      { key: "body", label: "Instructions", type: "textarea" },
      { key: "bankName", label: "Bank name", type: "text" },
      { key: "accountName", label: "Account name", type: "text" },
      { key: "accountNumber", label: "Account number", type: "text" },
    ],
  },
  {
    key: "contact.info",
    label: "Contact — Details",
    description: "Address, phone, email shown on the Contact page and footer.",
    fields: [
      { key: "headline", label: "Headline", type: "text" },
      { key: "body", label: "Short intro", type: "textarea" },
      { key: "address", label: "Address", type: "textarea" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "officeHours", label: "Office hours", type: "text" },
    ],
  },
  {
    key: "site.footer",
    label: "Footer",
    description: "Org blurb and socials shown in the footer.",
    fields: [
      { key: "tagline", label: "One-line tagline", type: "text" },
      { key: "body", label: "Short description", type: "textarea" },
      { key: "facebookUrl", label: "Facebook link (optional)", type: "text" },
      { key: "instagramUrl", label: "Instagram link (optional)", type: "text" },
      { key: "twitterUrl", label: "X / Twitter link (optional)", type: "text" },
    ],
  },
  {
    key: "site.newsletter",
    label: "Newsletter band",
    description: "The email signup band shown near the footer.",
    fields: [
      { key: "headline", label: "Headline", type: "text" },
      { key: "body", label: "Supporting sentence", type: "textarea" },
    ],
  },
];

export function getSection(key: string): ContentSection | undefined {
  return CONTENT_SECTIONS.find((s) => s.key === key);
}

// Draft content the site ships with, so the CMS is never empty. Everything
// here is meant to be reviewed and rewritten from the admin dashboard.
export const DEFAULT_CONTENT: Record<string, unknown> = {
  "home.hero": {
    eyebrow: "Ojobeda Community Development Association",
    headline: "Building a stronger Ojobeda, together.",
    description:
      "OCDA brings residents, elders, and young people together to invest in the infrastructure, education, and opportunity our community needs to thrive.",
    primaryCtaLabel: "See our programs",
    primaryCtaHref: "/about#programs",
    secondaryCtaLabel: "Get involved",
    secondaryCtaHref: "/get-involved",
    imageUrl: "",
  },
  "home.featureBar": {
    items: [
      {
        title: "Member-led governance",
        description: "Every project is decided by residents, not handed down from outside.",
      },
      {
        title: "Transparent reporting",
        description: "Funds and progress are reported to members on a regular schedule.",
      },
      {
        title: "5 years of local impact",
        description: "Built through years of steady, community-first work in Ojobeda.",
      },
    ],
  },
  "home.stats": {
    items: [
      { value: "500+", label: "Members" },
      { value: "12", label: "Active projects" },
      { value: "200+", label: "Families reached" },
      { value: "5", label: "Years of service" },
    ],
  },
  "home.missionTeaser": {
    eyebrow: "Who we are",
    headline: "A community association run by and for the people of Ojobeda.",
    body:
      "Founded by residents committed to lasting change, OCDA works alongside families, local government, and partners to fund infrastructure, support education and health, and protect the traditions that hold our community together.",
  },
  "home.programs": {
    eyebrow: "What we do",
    headline: "Programs & initiatives",
    items: [
      {
        title: "Infrastructure",
        description: "Roads, boreholes, and public facilities built and maintained for the long term.",
        imageUrl: "",
      },
      {
        title: "Education support",
        description: "Scholarships, school supplies, and a community library and learning center.",
        imageUrl: "",
      },
      {
        title: "Healthcare outreach",
        description: "Free medical camps, essential medicines, and health education for families.",
        imageUrl: "",
      },
      {
        title: "Economic empowerment",
        description: "Skills training and small loans to help residents start and grow businesses.",
        imageUrl: "",
      },
      {
        title: "Youth development",
        description: "Sports, mentorship, and leadership programs for young people in the community.",
        imageUrl: "",
      },
      {
        title: "Cultural heritage",
        description: "Documenting our history and organizing the annual community festival.",
        imageUrl: "",
      },
    ],
  },
  "home.spotlight": {
    eyebrow: "In their words",
    quote:
      "OCDA gave us a way to actually get things done as a community — not just talk about what should happen, but plan it, fund it, and see it through together.",
    name: "Add a real name",
    role: "OCDA member",
    photoUrl: "",
  },
  "home.testimonials": {
    eyebrow: "Community voices",
    headline: "What our members say",
    items: [
      {
        quote: "The borehole project OCDA led means my children no longer walk miles for clean water.",
        name: "Add a real name",
        role: "Resident",
        photoUrl: "",
      },
      {
        quote: "As a volunteer, I've seen firsthand how transparent and organized this association is.",
        name: "Add a real name",
        role: "Volunteer",
        photoUrl: "",
      },
      {
        quote: "The scholarship program changed what was possible for my daughter's education.",
        name: "Add a real name",
        role: "Parent",
        photoUrl: "",
      },
    ],
  },
  "home.getInvolvedCta": {
    headline: "OCDA runs on people who show up.",
    body: "Whichever way you can help — time, skills, or a contribution — there's a place for you.",
    ctaLabel: "See how to help",
    ctaHref: "/get-involved",
  },
  "about.story": {
    eyebrow: "Our story",
    headline: "Rooted in Ojobeda, built for the future",
    body:
      "OCDA was founded by community members who wanted a direct, accountable way to invest in Ojobeda's future.\nWe work alongside residents, local government, and partners to plan and fund the projects our community identifies as priorities.\nEvery initiative — from a borehole to a scholarship — starts with residents, not with us.",
    imageUrl: "",
  },
  "about.pillars": {
    items: [
      {
        title: "Community first",
        body: "Every decision puts the people of Ojobeda at the center. We listen before we act.",
      },
      {
        title: "Transparent governance",
        body: "Funds and projects are reported regularly so members always know where things stand.",
      },
      {
        title: "Sustainable development",
        body: "We build for the long term — infrastructure and programs meant to outlast any one project.",
      },
      {
        title: "Cultural pride",
        body: "We celebrate and protect Ojobeda's traditions while investing in its future.",
      },
    ],
  },
  "about.team": {
    items: [
      { name: "Add your president", role: "President", bio: "Short bio goes here.", photoUrl: "" },
      { name: "Add your vice president", role: "Vice President", bio: "Short bio goes here.", photoUrl: "" },
      { name: "Add your secretary", role: "Secretary General", bio: "Short bio goes here.", photoUrl: "" },
      { name: "Add your treasurer", role: "Director of Finance", bio: "Short bio goes here.", photoUrl: "" },
    ],
  },
  "getInvolved.intro": {
    headline: "Get involved",
    body: "OCDA is powered by volunteers, members, and supporters. Here's how to join in.",
  },
  "getInvolved.ways": {
    items: [
      {
        title: "Become a member",
        description: "Join OCDA and have a direct say in the projects we take on.",
        ctaLabel: "Contact us to join",
        ctaHref: "/contact",
      },
      {
        title: "Volunteer",
        description: "Lend your time and skills to our programs, from teaching to project support.",
        ctaLabel: "Offer your time",
        ctaHref: "/contact",
      },
      {
        title: "Partner with us",
        description: "Organizations and businesses can partner with OCDA on community projects.",
        ctaLabel: "Start a conversation",
        ctaHref: "/contact",
      },
    ],
  },
  "getInvolved.donate": {
    headline: "Donate",
    body:
      "Contributions fund our infrastructure, education, health, and youth programs directly. Replace the details below with your real account information before publishing.",
    bankName: "Add your bank name",
    accountName: "Ojobeda Community Development Association",
    accountNumber: "Add your account number",
  },
  "contact.info": {
    headline: "Contact us",
    body: "Have a question or want to get involved? We usually respond within 48 hours.",
    address: "Ojobeda Community, Kogi State, Nigeria",
    phone: "Add your phone number",
    email: "Add your email address",
    officeHours: "Mon–Fri, 9am–4pm",
  },
  "site.footer": {
    tagline: "Building a stronger, more united Ojobeda.",
    body: "OCDA invests in the infrastructure, education, and opportunity our community needs to thrive.",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
  },
  "site.newsletter": {
    headline: "Stay updated with OCDA news",
    body: "Project updates, upcoming events, and community announcements — straight to your inbox.",
  },
};
