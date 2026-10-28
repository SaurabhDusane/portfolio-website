/**
 * Content for the About page that doesn't belong anywhere else.
 * Everything here is drawn from facts already stated on the site.
 */

/** The opening line under the name: one sentence, first person. */
export const aboutLine =
  "I like the part of ML that’s easy to skip: getting messy data into shape, and making sure systems keep working when their inputs don’t cooperate.";

/** Quick facts shown next to the photo. The availability line comes from personalInfo. */
export const aboutFacts: { label: string; detail?: string }[] = [
  { label: "M.S. Computer Engineering", detail: "Arizona State University" },
  { label: "4.0 GPA" },
];

/** Numbers that count up on the About page. `value` animates; `text` is shown as-is. */
export const impactNumbers: { value?: number; text?: string; suffix?: string; label: string }[] = [
  { value: 10000, suffix: "+", label: "SEC filings made queryable" },
  { value: 100, suffix: "GB+", label: "of retail data cleaned" },
  { value: 1500, suffix: "+", label: "club members in three months" },
  { value: 200, suffix: "+", label: "students supported as a TA" },
  { text: "3rd", label: "globally, AVEVA EcoTech Emerge" },
];

/**
 * "Outside work" details. Empty lists are hidden, so fill these in when ready.
 * - exploring: what you're learning or trying right now
 * - interests: things you enjoy outside engineering
 */
export const outsideWork: { exploring: string[]; interests: string[] } = {
  exploring: [],
  interests: [],
};
