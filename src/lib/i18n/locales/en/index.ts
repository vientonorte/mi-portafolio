import { nav } from './nav';
import { seo } from './seo';
import { consultoria } from './consultoria';
import { uxAuditBanner } from './a11y-free';
import { servicios } from './servicios';
import { hero } from './hero';
import { contact } from './contact';
import * as portfolio from './portfolio';
import * as evidence from './evidence';
import * as caseStudiesPack from './case-studies';

export default {
  nav,
  seo,
  consultoria,
  uxAuditBanner,
  servicios,
  hero,
  contact,
  ...portfolio,
  ...evidence,
  ...caseStudiesPack,
};
